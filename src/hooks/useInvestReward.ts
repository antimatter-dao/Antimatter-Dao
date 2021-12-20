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
  const [rewardBalance, setRewardBalance] = useState<CurrencyAmount | TokenAmount | undefined>()
  const blockNumber = useBlockNumber()

  useEffect(() => {
    ;(async () => {
      if (!account) return
      try {
        const res = await Axios.get('https://dualinvest-testapi.antimatter.finance/web/getInvestReward', { account })
        if (!res.data?.data?.rewardBalance) {
          setRewardBalance(new TokenAmount(Matter, '0'))
        } else {
          setRewardBalance(tryParseAmount(res.data.data.rewardBalance, Matter))
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
