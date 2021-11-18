import { useEffect, useMemo, useState } from 'react'
import { UTCTimestamp } from 'lightweight-charts'
import { Axios } from 'utils/axios'
import { LineSeriesData } from 'components/Chart'

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

const trim = (string: string) => {
  const digitIndex = string.indexOf('.')
  if (digitIndex === -1) return string

  const zeroIndex = string.indexOf('0', digitIndex)
  if (zeroIndex === -1) return string
  if (zeroIndex - 1 === digitIndex) return string.slice(0, digitIndex)

  return string.slice(0, zeroIndex)
}

export function useDashboardData(): Statistics & { matterPriceData: LineSeriesData | undefined } {
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
  const [matterPriceData, setMatterPriceData] = useState<LineSeriesData | undefined>(undefined)
  useEffect(() => {
    Axios.get<StatisticsRaw>('getMatterDao')
      .then(r => {
        if (r.data.code === 200) {
          const data = r.data.data
          setStatistics({
            totalSupply: trim(data.Total_Supply),
            totalValueLocked: data.Total_Value_Locked,
            circulatingSupply: trim(data.Circulating_Supply),
            matterBuyback: data.Matter_Buyback,
            apy: data.APY,
            totalMatterStake: data.Total_matter_stake,
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
          const formatted = data.reduce((acc, item: MatterPriceRaw, idx) => {
            if (idx > 0 && data[idx - 1]?.timestamp === item.timestamp) {
              acc.shift()
            }
            acc.unshift({
              time: +item.timestamp as UTCTimestamp,
              value: +item.price,
              rate: item.rate + '%'
            })
            return acc
          }, [] as LineSeriesData)
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
