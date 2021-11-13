import { ChangeEvent } from 'react'
import Card from 'components/Card/Card'
import Button from 'components/Button/Button'
import { useTheme, Box, Typography, styled } from '@mui/material'
import { Chain } from 'models/chain'
import InputNumericalSimple from 'components/Input/InputNumericalSimple'
import { useWalletModalToggle } from 'state/application/hooks'
import { useActiveWeb3React } from 'hooks'
import ChainSwitch from 'components/ChainSwitch/ChainSwitch'

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

        <ChainSwitch fromChain={fromChain} toChain={toChain} />
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
