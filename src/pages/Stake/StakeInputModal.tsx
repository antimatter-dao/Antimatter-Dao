import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { parsedGreaterThan, tryParseAmount } from 'utils/parseAmount'
import Modal from 'components/Modal'
import InputNumerical from 'components/Input/InputNumerical'
import OutlineButton from 'components/Button/OutlineButton'
import ActionButton from 'components/Button/ActionButton'
import { useApproveCallback, ApprovalState } from 'hooks/useApproveCallback'
import { Matter, ANTIMATTER_DAO_ADDRESS } from 'constants/index'
import useModal from 'hooks/useModal'
import TransactionSubmittedModal from 'components/Modal/TransactionModals/TransactiontionSubmittedModal'
import TransacitonPendingModal from 'components/Modal/TransactionModals/TransactionPendingModal'
import { useTransaction } from 'state/transactions/hooks'
import { CurrencyAmount } from 'constants/token'

export enum StakeType {
  DEPOSIT,
  WITHDRAW
}

export default function StakeInputModal({
  type,
  isOpen,
  onDismiss,
  onAction,
  balance
}: {
  type: StakeType
  isOpen: boolean
  balance: CurrencyAmount | undefined
  onDismiss: () => void
  onAction: (val: string | undefined, setHash: (hash: string) => void) => () => void
}) {
  const [value, setValue] = useState('')
  const [approvalState, approveCallback] = useApproveCallback(tryParseAmount(value, Matter), ANTIMATTER_DAO_ADDRESS)
  const { showModal, hideModal } = useModal()
  const [pending, setPending] = useState(false)
  const [hash, setHash] = useState('')
  const balanceStr = balance !== undefined ? balance.toFixed(4) : '0'

  const txn = useTransaction(hash)

  useEffect(() => {
    if (hash && !txn?.receipt) {
      setPending(true)
    }
    if (txn?.receipt) {
      if (txn?.receipt?.status === 1) {
        setPending(false)
        setHash('')
        setValue('')
        onDismiss()
        showModal(<TransactionSubmittedModal hash={txn.receipt.transactionHash} header="Successful" />)
      }
      if (txn?.receipt?.status !== 1) {
        setPending(false)
        setHash('')
      }
    }
  }, [hash, onDismiss, showModal, txn])

  useEffect(() => {
    if (approvalState === ApprovalState.APPROVED) {
      hideModal()
    }
  }, [approvalState, hideModal])

  return (
    <Modal closeIcon customIsOpen={isOpen} customOnDismiss={onDismiss}>
      <Box padding="22px 32px" display="grid" gap="32px">
        <Typography fontSize={20} sx={{ color: theme => theme.palette.text.secondary }}>
          {type === StakeType.DEPOSIT ? 'Deposit MATTER Tokens' : 'Withdraw MATTER Tokens'}
        </Typography>
        <Box>
          <InputNumerical
            label="Amount"
            onMax={() => {
              setValue(balanceStr)
            }}
            balance={balanceStr}
            value={value}
            onChange={e => {
              setValue(e.target.value)
            }}
          />
          {parsedGreaterThan(value, balance?.raw.toString() ?? '0') && (
            <Typography fontSize={14} color="primary" sx={{ height: 21 }}>
              Insufficient balance
            </Typography>
          )}
        </Box>
        <Box display="flex" gap="16px">
          <OutlineButton onClick={onDismiss} primary>
            Cancel
          </OutlineButton>
          {approvalState !== ApprovalState.APPROVED && (
            <ActionButton
              pending={approvalState === ApprovalState.PENDING}
              pendingText="Approving"
              error={value ? undefined : 'Amount required'}
              onAction={() => {
                showModal(<TransacitonPendingModal />)
                approveCallback()
              }}
              actionText="Approve"
            />
          )}
          {approvalState === ApprovalState.APPROVED && (
            <ActionButton
              error={value ? undefined : 'Amount required'}
              onAction={onAction(tryParseAmount(value, Matter)?.raw.toString(), hash => {
                setHash(hash)
              })}
              pending={pending}
              pendingText="Pending Confirmat..."
              actionText={type === StakeType.DEPOSIT ? 'Stake' : 'Unstake'}
            />
          )}
        </Box>
      </Box>
    </Modal>
  )
}
