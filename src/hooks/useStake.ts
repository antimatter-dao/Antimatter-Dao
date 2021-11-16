import { useMemo, useCallback } from 'react'
// import JSBI from 'jsbi'
import { useAntiMatterDaoContract } from './useContract'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useActiveWeb3React } from 'hooks'
import { Matter } from 'constants/index'
import { parseBalance } from 'utils/parseAmount'
import { Token } from 'constants/token'

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
  const { account, chainId } = useActiveWeb3React()
  const contract = useAntiMatterDaoContract()
  const args = useMemo(() => [account ?? undefined], [account])

  const apyRes = useSingleCallResult(contract, 'APR')
  const totalDepositedRes = useSingleCallResult(contract, 'TVL')
  const earnedRes = useSingleCallResult(contract, 'earned', args)
  const stakedBalanceRes = useSingleCallResult(contract, 'balanceOf', args)

  const res = useMemo(() => {
    const USDC = new Token(chainId ?? 1, '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', 6, 'USDC')

    return {
      apy: apyRes?.result?.[0] ? (+parseBalance(apyRes?.result?.[0], Matter) * 100).toString() : '-',
      totalDeposited: totalDepositedRes?.result?.[0] ? parseBalance(totalDepositedRes?.result?.[0], USDC) : '-',
      earned: earnedRes?.result?.[0] ? parseBalance(earnedRes.result?.[0], Matter, 4) : '-',
      stakedBalance: earnedRes?.result?.[0] ? parseBalance(stakedBalanceRes.result?.[0], Matter, 4) : '-'
    }
  }, [apyRes?.result, chainId, earnedRes.result, stakedBalanceRes.result, totalDepositedRes?.result])
  return res
}
// ? JSBI.exponentiate(
//     JSBI.exponentiate(JSBI.BigInt(Math.E), JSBI.BigInt(apyRes?.result?.[0])),
//     JSBI.BigInt(-1)
//   ).toString()
