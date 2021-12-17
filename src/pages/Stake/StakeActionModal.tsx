import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import Modal from 'components/Modal'
import OutlineButton from 'components/Button/OutlineButton'
import ActionButton from 'components/Button/ActionButton'
import useModal from 'hooks/useModal'
import TransactionSubmittedModal from 'components/Modal/TransactionModals/TransactiontionSubmittedModal'
import { useTransaction } from 'state/transactions/hooks'

export default function StakeActionModal({
  isOpen,
  onDismiss,
  onAction,
  balance,
  title
}: {
  isOpen?: boolean
  onDismiss: () => void
  onAction: (setHash: (hash: string) => void) => () => void
  balance?: string
  title: string
  buttonActionText?: string
  buttonPendingText?: string
}) {
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
      <Box padding="24px 32px" display="grid" gap="32px">
        <Typography fontSize={20} sx={{ color: theme => theme.palette.text.secondary }}>
          {title}
        </Typography>
        <Typography fontWeight="700" fontSize="44px">
          {balance}
          <Typography fontSize="16px" fontWeight="700" component="span">
            Matter
          </Typography>
        </Typography>
        <Box display="flex" gap="16px">
          <OutlineButton onClick={onDismiss} primary>
            Cancel
          </OutlineButton>

          <ActionButton
            onAction={onAction(hash => setHash(hash))}
            pending={pending}
            pendingText="Confirming"
            actionText="Confirm"
          />
        </Box>
      </Box>
    </Modal>
  )
}
