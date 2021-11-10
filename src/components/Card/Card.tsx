import { Box, Typography, styled, useTheme } from '@mui/material'

interface Props {
  title: string
  primary?: boolean
  width?: string | number
  height?: string | number
  value?: string
  unit?: string
  value2?: string
}

const Root = styled(Box)(({ theme }) => ({
  borderRadius: 20,
  padding: '24px 24px 28px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}))

export default function Card(props: Props) {
  const { title, width, height, primary, value, unit, value2 } = props
  const theme = useTheme()
  return (
    <Root
      sx={{
        width: width || '260px',
        height: height || '132px',
        background: primary ? theme.gradient.gradient1 : theme.textColor.text1,
        color: primary ? theme.textColor.text1 : theme.bgColor.bg1
      }}
    >
      <Box>
        <Typography sx={{ fontSize: 16, opacity: primary ? 1 : 0.4 }}>{title}</Typography>
      </Box>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'end' }}>
          <Typography sx={{ fontSize: 24, fontWeight: 700 }}>{value}</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 700, ml: 4 }}>{unit}</Typography>
        </Box>
        <Typography sx={{ fontSize: 12, fontWeight: 400, opacity: 0.4 }}>{value2}</Typography>
      </Box>
    </Root>
  )
}
