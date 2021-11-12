import React from 'react'
import Card from 'components/Card/Card'
import { Box, Typography, useTheme } from '@mui/material'

interface Props {
  title: string
  width?: string | number
  value?: string | number
  unit?: string
  changeRate?: string
  children?: React.ReactNode
}

export default function ChartCard(props: Props) {
  const { title, width, children, value, unit } = props
  const theme = useTheme()

  return (
    <Card width={width}>
      <Box
        sx={{
          padding: '20px 24px 28px',
          gap: '28px',
          height: '430px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Box>
          <Typography variant="inherit" color={theme.palette.text.secondary}>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'end', mt: 12 }}>
            <Typography sx={{ fontSize: 44, fontWeight: 700 }}>{value}</Typography>
            {unit && <Typography sx={{ fontSize: 16, fontWeight: 700, ml: 4 }}>{unit}</Typography>}
          </Box>
        </Box>
        <Box>{children}</Box>
      </Box>
    </Card>
  )
}
