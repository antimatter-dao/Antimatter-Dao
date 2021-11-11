import React from 'react'
import { Box, Typography, styled, useTheme } from '@mui/material'

interface Props {
  title: string
  primary?: boolean
  width?: string | number
  height?: string | number
  children?: React.ReactNode
}

const Root = styled(Box)(({ theme }) => ({
  borderRadius: 20,
  padding: '20px 24px 28px'
}))

export default function Card(props: Props) {
  const { title, primary, children, width, height } = props
  const theme = useTheme()
  return (
    <Root
      sx={{
        background: primary ? theme.gradient.gradient1 : theme.textColor.text1,
        color: primary ? theme.textColor.text1 : theme.bgColor.bg1,
        width,
        height
      }}
    >
      <Box>
        <Typography sx={{ fontSize: 16, opacity: primary ? 1 : 0.5 }}>{title}</Typography>
      </Box>
      {children}
    </Root>
  )
}
