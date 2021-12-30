import { useEffect, useMemo, useState } from 'react'
import { UTCTimestamp } from 'lightweight-charts'
import { Axios } from 'utils/axios'
import { LineSeriesData } from 'components/Chart'
import { TIME_INTERVAL } from 'pages/Dashboard'
import { getContract } from 'utils'
import { getOtherNetworkLibrary } from 'connectors/MultiNetworkConnector'
import ERC20_ABI from 'constants/abis/erc20.json'
import { Token, TokenAmount } from 'constants/token'

const oneDayInMs = 86400000
interface StatisticsRaw {
  APY: string
  Circulating_Supply: string
  Matter_Buyback: string
  Total_Supply: string
  Total_Trading_Volume: string
  Total_Value_Locked: string
  Total_fee_earned: string
  Total_matter_stake: string
}

interface Statistics {
  totalSupply: string
  totalValueLocked: string
  circulatingSupply: string
  matterBuyback: string
  apy: string
  totalMatterStake: string
  totalTradingVolume: string
  totalFeeEarned: string
}

interface MatterPriceRaw {
  chain_id: number
  contract: string
  from_address: string
  hash: string
  id: string
  price: string
  rate: number
  timestamp: string
  to_address: string
  trades_amount: string
}

interface LineDataResponse {
  [TIME_INTERVAL.ONE_DAY]: LineSeriesData
  [TIME_INTERVAL.TEN_DAYS]: LineSeriesData
  [TIME_INTERVAL.ONE_MONTH]: LineSeriesData
}

const trim = (string: string, toDecimal?: number) => {
  const digitIndex = string.indexOf('.')
  if (digitIndex === -1) return string

  if ((toDecimal || toDecimal === 0) && toDecimal >= 0)
    return toDecimal === 0 ? string.slice(0, digitIndex) : string.slice(0, digitIndex + toDecimal + 1)

  const zeroIndex = string.indexOf('0', digitIndex)
  if (zeroIndex === -1) return string
  if (zeroIndex - 1 === digitIndex) return string.slice(0, digitIndex)

  return string.slice(0, zeroIndex)
}

export function useDashboardData(): Statistics & { matterPriceData: LineDataResponse | undefined } {
  const [statistics, setStatistics] = useState<Statistics>({
    totalSupply: '-',
    totalValueLocked: '-',
    circulatingSupply: '-',
    matterBuyback: '-',
    apy: '-',
    totalMatterStake: '-',
    totalTradingVolume: '-',
    totalFeeEarned: '-'
  })
  const [matterPriceData, setMatterPriceData] = useState<LineDataResponse | undefined>(undefined)
  useEffect(() => {
    Axios.get<StatisticsRaw>('getMatterDao')
      .then(r => {
        if (r.data.code === 200) {
          const data = r.data.data
          setStatistics({
            totalSupply: trim(data.Total_Supply, 0),
            totalValueLocked: data.Total_Value_Locked,
            circulatingSupply: trim(data.Circulating_Supply, 0),
            matterBuyback: data.Matter_Buyback,
            apy: trim(+data.APY * 100 + '', 2),
            totalMatterStake: trim(+data.Total_matter_stake * 100 + '', 2),
            totalTradingVolume: data.Total_Trading_Volume,
            totalFeeEarned: data.Total_fee_earned
          })
        }
      })
      .catch()
    Axios.get<MatterPriceRaw[]>('getMatterPriceRecord')
      .then(r => {
        if (r.data.code === 200) {
          const data = r.data.data
          const firstIndex = data.length - 1
          const formatted = data.reduceRight(
            (acc, item: MatterPriceRaw, idx) => {
              const {
                [TIME_INTERVAL.ONE_DAY]: oneDayArr,
                [TIME_INTERVAL.TEN_DAYS]: tenDayArr,
                [TIME_INTERVAL.ONE_MONTH]: oneMonthArr
              } = acc
              if (idx < firstIndex && data[idx + 1]?.timestamp === item.timestamp) {
                oneDayArr.pop()
              }
              const res = {
                time: +item.timestamp as UTCTimestamp,
                value: +item.price,
                rate: trim(item.rate + '', 2) + '%'
              }
              oneDayArr.push(res)

              if (idx === firstIndex) {
                tenDayArr.push(res)
                oneMonthArr.push(res)

                return acc
              }

              if (res.time >= +tenDayArr[tenDayArr.length - 1].time + oneDayInMs * 10) {
                const prev = +tenDayArr[tenDayArr.length - 1].value
                console.log(prev, res.value, (res.value - prev) / prev)
                acc[TIME_INTERVAL.TEN_DAYS].push({
                  ...res,
                  rate: trim(((res.value - prev) / prev) * 100 + '', 2) + '%'
                })
              }
              if (res.time >= +oneMonthArr[oneMonthArr.length - 1].time + oneDayInMs * 30) {
                const prev = +oneMonthArr[tenDayArr.length - 1].value
                oneMonthArr.push({ ...res, rate: trim(((res.value - prev) / prev) * 100 + '', 2) + '%' })
              }

              return acc
            },
            {
              [TIME_INTERVAL.ONE_DAY]: [] as LineSeriesData,
              [TIME_INTERVAL.TEN_DAYS]: [] as LineSeriesData,
              [TIME_INTERVAL.ONE_MONTH]: [] as LineSeriesData
            }
          )

          setMatterPriceData(formatted)
          console.log(formatted)
        }
      })
      .catch()
  }, [])

  return useMemo(() => {
    return { ...statistics, matterPriceData }
  }, [statistics, matterPriceData])
}

export function useDualinvestDashboardData() {
  const [dualData, setDualData] = useState<{
    totalBtcDeposit: number
    totalUsdtDeposit: number
    totalInvestAmount: number
  }>({
    totalBtcDeposit: 0,
    totalUsdtDeposit: 0,
    totalInvestAmount: 0
  })
  const [btcPrice, setBtcPrice] = useState(0)
  const [btcFree, setBtcFree] = useState(0)
  const [usdtFree, setUsdtFree] = useState(0)
  const library = useMemo(() => getOtherNetworkLibrary(56), [])
  const feeAddress = '0x538e72209a0b9e7d2ef46E6EcAa3E70C0a0EfC88'

  useEffect(() => {
    if (!library) return
    const btcAddress = '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c'
    const contract = getContract(btcAddress, ERC20_ABI, library)
    contract.balanceOf(feeAddress).then((res: any) => {
      const _amount = new TokenAmount(new Token(56, btcAddress, 18), res.toString()).toSignificant()
      setBtcFree(Number(_amount))
    })
  }, [library])

  useEffect(() => {
    if (!library) return
    const usdtAddress = '0x55d398326f99059ff775485246999027b3197955'
    const contract = getContract(usdtAddress, ERC20_ABI, library)
    contract.balanceOf(feeAddress).then((res: any) => {
      const _amount = new TokenAmount(new Token(56, usdtAddress, 18), res.toString()).toSignificant()
      setUsdtFree(Number(_amount))
    })
  }, [library])

  useEffect(() => {
    Axios.get('https://openapi.debank.com/v1/token?chain_id=eth&id=0x2260fac5e5542a773aa44fbcfedf7c193bc2c599').then(
      (res: any) => {
        setBtcPrice(res.data.price)
      }
    )
  }, [])

  useEffect(() => {
    ;(async () => {
      const res = await Axios.get('https://dualinvest-api.antimatter.finance/web/getDashboard')
      const data = res.data.data
      setDualData({
        totalBtcDeposit: Number(data.totalBtcDeposit),
        totalUsdtDeposit: Number(data.totalUsdtDeposit),
        totalInvestAmount: Number(data.totalInvestAmount)
      })
    })()
  }, [])

  return useMemo(
    () => ({
      depositAmount: dualData.totalBtcDeposit * btcPrice + dualData.totalUsdtDeposit,
      tradingVolume: dualData.totalInvestAmount,
      transactionFee: btcFree * btcPrice + usdtFree
    }),
    [btcFree, btcPrice, dualData.totalBtcDeposit, dualData.totalInvestAmount, dualData.totalUsdtDeposit, usdtFree]
  )
}
