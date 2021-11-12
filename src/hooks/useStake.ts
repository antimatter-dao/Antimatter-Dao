import { useMemo, useCallback } from 'react'
import { useAntiMatterDaoContract } from './useContract'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useActiveWeb3React } from 'hooks'

export function useStakeCallback(): {
  stakeCallback: undefined | ((val: string) => Promise<any>)
  unstakeCallback: undefined | (() => Promise<any>)
} {
  const contract = useAntiMatterDaoContract()

  const stake = useCallback(
    (val): Promise<any> => {
      return contract?.stake(val)
    },
    [contract]
  )
  const unstake = useCallback((options?: any): Promise<any> => contract?.exit(options), [contract])

  const res = useMemo(() => {
    return {
      stakeCallback: stake,
      unstakeCallback: unstake
    }
  }, [stake, unstake])

  return res
}

export function useStakingInfo() {
  const { account } = useActiveWeb3React()
  const contract = useAntiMatterDaoContract()
  const args = useMemo(() => [account ?? undefined], [account])

  const apyRes = useSingleCallResult(contract, 'APY')
  const earnedRes = useSingleCallResult(contract, 'earned', args)
  const stakedBalanceRes = useSingleCallResult(contract, 'balanceOf', args)
  console.log(apyRes, earnedRes, stakedBalanceRes)

  const res = useMemo(() => {
    return {
      apy: apyRes?.result?.[0],
      earned: earnedRes?.result?.[0],
      stakedBalance: stakedBalanceRes?.result?.[0]
    }
  }, [apyRes?.result, earnedRes?.result, stakedBalanceRes?.result])
  console.log(res)
  return res
}
