import { useEffect, useMemo, useState } from 'react'
import { UTCTimestamp } from 'lightweight-charts'
import { Axios } from 'utils/axios'
import { LineSeriesData } from 'components/Chart'
import { TIME_INTERVAL } from 'pages/Dashboard'

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
                rate: trim(item.rate * 100 + '', 2) + '%'
              }
              oneDayArr.push(res)

              if (idx === firstIndex) {
                tenDayArr.push(res)
                oneMonthArr.push(res)

                return acc
              }

              if (res.time >= +tenDayArr[tenDayArr.length - 1].time + oneDayInMs * 10) {
                acc[TIME_INTERVAL.TEN_DAYS].push(res)
              }
              if (res.time >= +oneMonthArr[oneMonthArr.length - 1].time + oneDayInMs * 30) {
                oneMonthArr.push(res)
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
