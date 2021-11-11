import { Box, Typography } from '@mui/material'
import Card from './Card'

interface Props {
  title: string
  primary?: boolean
  width?: string | number
  height?: string | number
  value?: string
  subValue?: string
  unit?: string
  changeRate?: string
}

export default function NumericalCard(props: Props) {
  const { title, primary, width, height, value, subValue, unit } = props

  return (
    <Card title={title} width={width} height={height} primary={primary}>
      <Box sx={{ display: 'flex', alignItems: 'end', mt: 30 }}>
        <Typography sx={{ fontSize: 24, fontWeight: 700 }}>{value}</Typography>
        {unit && <Typography sx={{ fontSize: 16, fontWeight: 700, ml: 4 }}>{unit}</Typography>}
      </Box>
      {subValue && <Typography sx={{ fontSize: 12, fontWeight: 400, opacity: 0.5 }}>{subValue}</Typography>}
    </Card>
  )
}
