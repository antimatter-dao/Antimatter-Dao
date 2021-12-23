import { useEffect, useState } from 'react'
import { Axios } from '../utils/axios'
import { useActiveWeb3React } from '.'
import { useBlockNumber } from 'state/application/hooks'
import { tryParseAmount } from 'utils/parseAmount'
import { Matter } from '../constants'
import { CurrencyAmount, TokenAmount } from 'constants/token'
import { useRewardInvestContract } from './useContract'
import { useSingleCallResult } from '../state/multicall/hooks'

export function getInvestRewardSignByNonce(account: string, amountInt: string, chainId: number, nonce: string) {
  return Axios.post('https://dualinvest-testapi.antimatter.finance:8081/web/getInvestRewardSign', {
    account,
    amount: amountInt,
    chainId,
    nonce
  })
}

export function useInvestRewardData() {
  const { account } = useActiveWeb3React()
  const [rewardBalance, setRewardBalance] = useState<{
    rewards: CurrencyAmount | TokenAmount | undefined
    totalInvest: CurrencyAmount | TokenAmount | undefined
  }>()
  const blockNumber = useBlockNumber()

  useEffect(() => {
    ;(async () => {
      if (!account) return
      try {
        const res = await Axios.get('https://dualinvest-testapi.antimatter.finance/web/getInvestReward', { account })
        const zeroMatter = new TokenAmount(Matter, '0')
        if (!res.data?.data?.rewards) {
          setRewardBalance({
            rewards: zeroMatter,
            totalInvest: zeroMatter
          })
        } else {
          setRewardBalance({
            rewards: Number(res.data.data.rewards) ? tryParseAmount(res.data.data.rewards, Matter) : zeroMatter,
            totalInvest: Number(res.data.data.totalInvest)
              ? tryParseAmount(res.data.data.totalInvest, Matter)
              : zeroMatter
          })
        }
      } catch (error) {
        setRewardBalance(undefined)
        console.error('useInvestReward error', error)
      }
    })()
  }, [account, blockNumber])

  return rewardBalance
}

export function useGetRewardClaimNonces() {
  const contract = useRewardInvestContract()
  const { account } = useActiveWeb3React()
  const res = useSingleCallResult(contract, 'claimNonces', [account || undefined])

  return {
    loading: res.loading,
    result: res.result?.withdraw_nonces.toString()
  }
}
