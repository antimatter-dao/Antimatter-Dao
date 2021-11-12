import { Box, Typography, useTheme } from '@mui/material'
import Card from './index'

interface Props {
  title: string
  primary?: boolean
  width?: string | number
  value?: string
  subValue?: string
  unit?: string
  changeRate?: string
}

export default function NumericalCard(props: Props) {
  const { title, primary, value, subValue, unit } = props
  const theme = useTheme()

  return (
    <Card primary={primary}>
      <Box padding="20px 24px" gap="28px" height="132px">
        <Typography variant="inherit" color={theme.palette.text.secondary}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'end', mt: 30 }}>
          <Typography sx={{ fontSize: 24, fontWeight: 700 }}>{value}</Typography>
          {unit && <Typography sx={{ fontSize: 16, fontWeight: 700, ml: 4 }}>{unit}</Typography>}
        </Box>
        {subValue && <Typography sx={{ fontSize: 12, fontWeight: 400, opacity: 0.5 }}>{subValue}</Typography>}
      </Box>
    </Card>
  )
}
