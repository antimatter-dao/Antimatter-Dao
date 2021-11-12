import { useMemo, useCallback } from 'react'
import { useAntiMatterDaoContract } from './useContract'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useActiveWeb3React } from 'hooks'
import { Matter } from 'constants/index'
import { parseBalance } from 'utils/parseAmount'

export function useStakeCallback(): {
  stakeCallback: undefined | ((val: string) => Promise<any>)
  unstakeCallback: undefined | (() => Promise<any>)
  compoundCallback: undefined | (() => Promise<any>)
} {
  const contract = useAntiMatterDaoContract()

  const stake = useCallback(
    (val): Promise<any> => {
      return contract?.stake(val)
    },
    [contract]
  )
  const unstake = useCallback((): Promise<any> => contract?.exit(), [contract])
  const compound = useCallback((): Promise<any> => contract?.compound(), [contract])

  const res = useMemo(() => {
    return {
      stakeCallback: stake,
      unstakeCallback: unstake,
      compoundCallback: compound
    }
  }, [stake, unstake, compound])

  return res
}

export function useStakingInfo() {
  const { account } = useActiveWeb3React()
  const contract = useAntiMatterDaoContract()
  const args = useMemo(() => [account ?? undefined], [account])

  // const apyRes = useSingleCallResult(contract, 'APY')
  // const totalDepositedRes = useSingleCallResult(contract, 'TVL')
  const earnedRes = useSingleCallResult(contract, 'earned', args)
  const stakedBalanceRes = useSingleCallResult(contract, 'balanceOf', args)

  const res = useMemo(() => {
    return {
      // apy: apyRes?.result?.[0],
      //totalDeposited: totalDepositedRes?.result?.[0],
      apy: '10',
      totalDeposited: '3,835,616.00',
      earned: parseBalance(earnedRes?.result?.[0], Matter),
      stakedBalance: parseBalance(stakedBalanceRes?.result?.[0], Matter)
    }
  }, [earnedRes?.result, stakedBalanceRes?.result])
  return res
}
