import { ChangeEvent } from 'react'
import Card from 'components/Card/Card'
import Button from 'components/Button/Button'
import { useTheme, Box, Typography, styled } from '@mui/material'
import { OutlinedCard } from 'components/Card/Card'
import Image from 'components/Image'
import { Chain } from 'models/chain'
import SwitchButton from 'components/Select/ChainSwap/SwitcherButton'
import InputNumericalSimple from 'components/Input/InputNumericalSimple'
import { useWalletModalToggle } from 'state/application/hooks'
import { useActiveWeb3React } from 'hooks'

const Label = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 12,
  fontWeight: 500
}))

interface Props {
  fromChain: Chain | null
  toChain: Chain | null
  onApprove?: () => void
  quota?: string
  approx?: string
  available?: string
  value?: string
  onMax?: () => void
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function BridgeCard(props: Props) {
  const theme = useTheme()
  const { fromChain, toChain, quota, approx, available, value, onMax, onChange, onApprove } = props
  const { account } = useActiveWeb3React()

  const toggleWalletModal = useWalletModalToggle()

  return (
    <Card>
      <Box padding="20px 24px" height="430px" width="100%">
        <Typography variant="inherit" color={theme.palette.text.secondary}>
          MATTER Bridge
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            position: 'relative',
            gap: 8,
            mt: 14
          }}
        >
          <Box width="100%">
            <Label sx={{ mb: 8 }}>Send</Label>
          </Box>
          <Box width="100%">
            <Label sx={{ mb: 8 }}>To</Label>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            position: 'relative',
            gap: 8
          }}
        >
          <Box width="100%">
            <OutlinedCard width="100%" color={theme.textColor.text4}>
              <Box display="grid" gap="8px" padding="12px 16px" width="100%" height="92px">
                <Image src={fromChain?.logo || ''} style={{ height: 28, width: 28, objectFit: 'contain' }} />
                <Typography variant="inherit" sx={{ fontSize: 12 }}>
                  {fromChain?.name || ''}
                </Typography>
              </Box>
            </OutlinedCard>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          >
            <SwitchButton />
          </Box>
          <Box width="100%">
            <OutlinedCard width="100%" color={theme.textColor.text4}>
              <Box display="grid" gap="8px" padding="12px 16px" width="100%" height="92px">
                <Image src={toChain?.logo || ''} style={{ height: 28, width: 28, objectFit: 'contain' }} />
                <Typography variant="inherit" sx={{ fontSize: 12 }}>
                  {toChain?.name || ''}
                </Typography>
              </Box>
            </OutlinedCard>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" mt="24px">
          <Label>Quota per address</Label>
          <Typography variant="inherit" sx={{ color: '#11BF2D', fontSize: 12 }}>
            Increase
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="inherit" sx={{ fontSize: 16, fontWeight: 500 }}>
            {quota || '-'}MATTER
          </Typography>
          <Typography
            variant="inherit"
            sx={{
              fontSize: 12,
              fontWeight: 400,
              color: theme.bgColor.bg1,
              opacity: 0.5,
              ml: 4
            }}
          >
            ~{approx || '-'}$
          </Typography>
        </Box>
        <Box sx={{ mt: 24, mb: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Label>Amount</Label>
          <Typography sx={{ fontSize: 12, fontWeight: 400, opacity: 0.5 }} variant="inherit">
            Available: {available}MATTER
          </Typography>
        </Box>
        <Box mb="28px">
          <InputNumericalSimple placeholder="Enter Amount" value={value || ''} onMax={onMax} onChange={onChange} />
        </Box>
        {account ? (
          <Button height="44px" onClick={onApprove} disabled>
            {/* Approve */}
            Coming Soon...
          </Button>
        ) : (
          <Button height="44px" onClick={toggleWalletModal} disabled>
            {/* Connect Wallet */}
            Coming Soon...
          </Button>
        )}
      </Box>
    </Card>
  )
}
