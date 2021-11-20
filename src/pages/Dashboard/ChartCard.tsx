import React from 'react'
import Card from 'components/Card/Card'
import { Box, Typography, useTheme } from '@mui/material'

interface Props {
  title: string
  width?: string | number
  value?: string | number
  unit?: string
  rate?: string
  children?: React.ReactNode
}

export default function ChartCard(props: Props) {
  const { title, width = '100%', children, value, unit, rate } = props
  const theme = useTheme()

  return (
    <Card width={width} style={{ height: '100%' }}>
      <Box
        sx={{
          width: '100%',
          padding: '20px 24px 28px',
          gap: '28px',
          height: '100%',
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
            {rate && (
              <Box
                sx={{
                  ml: 15,
                  backgroundColor: 'rgba(17, 191, 45, 0.16)',
                  display: 'flex',
                  minWidth: '56px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '49px',
                  padding: '5px 12px'
                }}
              >
                <Typography
                  sx={{
                    color: '#11BF2D'
                  }}
                >
                  {rate}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        {children}
      </Box>
    </Card>
  )
}
