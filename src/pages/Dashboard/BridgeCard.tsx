import Card from 'components/Card/Card'
import Button from 'components/Button/Button'
import { useTheme, Box, Typography } from '@mui/material'

interface Props {
  title: string
}

export default function BridgeCard(props: Props) {
  const theme = useTheme()
  const { title } = props

  return (
    <Card>
      <Box padding="20px 24px" gap="28px" height="430px">
        <Typography variant="inherit" color={theme.palette.text.secondary}>
          MATTER Bridge
        </Typography>
        <Button>Connect Wallet</Button>
      </Box>
    </Card>
  )
}
