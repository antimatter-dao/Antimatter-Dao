import React from 'react'
import Card from './Card'
import { Box, Typography } from '@mui/material'

interface Props {
  title: string
  width?: string | number
  height?: string | number
  value?: string | number
  unit?: string
  changeRate?: string
  children?: React.ReactNode
}

export default function ChartCard(props: Props) {
  const { title, width, height, children, value, unit } = props

  return (
    <Card title={title} width={width} height={height}>
      <Box sx={{ display: 'flex', alignItems: 'end', mt: 12 }}>
        <Typography sx={{ fontSize: 44, fontWeight: 700 }}>{value}</Typography>
        {unit && <Typography sx={{ fontSize: 16, fontWeight: 700, ml: 4 }}>{unit}</Typography>}
      </Box>
      {children}
    </Card>
  )
}
