import { useCallback, useMemo } from 'react'
import { calculateGasMargin } from '../utils'
import { useRewardInvestContract } from './useContract'
import { TransactionResponse } from '@ethersproject/providers'
import { isTransactionRecent, useAllTransactions, useTransactionAdder } from '../state/transactions/hooks'
import { useActiveWeb3React } from 'hooks'

const summary = 'Claim trading rewards'
export function useRewardInvestClaimCallback() {
  const contract = useRewardInvestContract()
  const addTransaction = useTransactionAdder()

  return useCallback(
    (account: string, amountInt: string, nonce: string, signArr: string[]) => {
      if (!account || !contract || !amountInt || !nonce) {
        throw new Error('illegal error')
      }
      const args = [account, amountInt, nonce, [signArr]]
      return contract.estimateGas.claim(...args, { from: account }).then(estimatedGasLimit => {
        return contract
          .claim(...args, {
            gasLimit: calculateGasMargin(estimatedGasLimit),
            from: account
          })
          .then((response: TransactionResponse) => {
            addTransaction(response, {
              summary
            })
            return response.hash
          })
      })
    },
    [addTransaction, contract]
  )
}

export function useIsRewardInvestClaimPending() {
  const allTransactions = useAllTransactions()
  const { account } = useActiveWeb3React()
  return useMemo(
    () =>
      Object.keys(allTransactions).some(hash => {
        const tx = allTransactions[hash]
        if (!tx) return false
        if (tx.receipt) {
          return false
        } else {
          return tx.summary === summary && account === tx.from && isTransactionRecent(tx)
        }
      }),
    [account, allTransactions]
  )
}
