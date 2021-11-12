import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import Modal from 'components/Modal'
import InputNumerical from 'components/Input/InputNumerical'
import OutlineButton from 'components/Button/OutlineButton'
import ActionButton from 'components/Button/ActionButton'
import useModal from 'hooks/useModal'
import TransactionSubmittedModal from 'components/Modal/TransactionModals/TransactiontionSubmittedModal'
import { useTransaction } from 'state/transactions/hooks'

export default function StakeCompoundModal({
  isOpen,
  onDismiss,
  onAction
}: {
  isOpen: boolean
  onDismiss: () => void
  onAction: () => void
}) {
  const [value, setValue] = useState('')
  const { showModal } = useModal()
  const [pending, setPending] = useState(false)
  const [hash, setHash] = useState('')

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

  return (
    <Modal closeIcon customIsOpen={isOpen} customOnDismiss={onDismiss}>
      <Box padding="20px 32px" display="grid" gap="32px">
        <Typography fontSize={20} sx={{ color: theme => theme.palette.text.secondary }}>
          MATTER Compound
        </Typography>
        <InputNumerical
          label="Amount"
          onMax={() => {}}
          balance="100.00"
          value={value}
          onChange={e => {
            setValue(e.target.value)
          }}
        />
        <Box display="flex" gap="16px">
          <OutlineButton onClick={onDismiss}>Cancel</OutlineButton>

          <ActionButton
            error={value ? undefined : 'Amount required'}
            onAction={onAction}
            pending={pending}
            pendingText="Confirming"
            actionText="Confirm"
          />
        </Box>
      </Box>
    </Modal>
  )
}
