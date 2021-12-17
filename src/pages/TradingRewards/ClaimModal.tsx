import { useMemo } from 'react'
import { Typography, Box } from '@mui/material'
import OutlineButton from 'components/Button/OutlineButton'
import ActionButton from 'components/Button/ActionButton'
import Modal from 'components/Modal'
import useModal from 'hooks/useModal'

interface Props {
  amount: string
  currency: string
  pending: boolean
  onAction: () => void
  actionText: string
  pendingText: string
}

export default function ClaimModal(props: Props) {
  const { amount, currency, actionText, pending, onAction, pendingText } = props

  const { hideModal } = useModal()

  const getAction = useMemo(() => {
    return (
      <Box display="flex" justifyContent="space-between" gap={16}>
        <OutlineButton onClick={hideModal} primary>
          Cancel
        </OutlineButton>
        <ActionButton onAction={onAction} actionText={actionText} pendingText={pendingText} pending={pending} />
      </Box>
    )
  }, [])

  return (
    <Modal padding="20px 32px 36px" closeIcon>
      <Typography fontSize={20} sx={{ opacity: 0.6 }}>
        Claim Matter Tokens
      </Typography>
      <Box display="flex" alignItems="flex-end" mt={32} mb={36} gap={4}>
        <Typography fontSize={44} fontWeight={700} lineHeight={1}>
          {amount}
        </Typography>
        <Typography fontSize={16} fontWeight={700}>
          {currency}
        </Typography>
      </Box>
      {getAction}
    </Modal>
  )
}
