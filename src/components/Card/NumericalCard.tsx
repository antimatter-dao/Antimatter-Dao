import { Box, Typography, useTheme } from '@mui/material'
import Card from 'components/Card/Card'

interface Props {
  title: string
  primary?: boolean
  width?: string | number
  height?: string | number
  value?: string
  subValue?: string
  unit?: string
  changeRate?: string
  fontSize?: string
  gray?: boolean
}

export default function NumericalCard(props: Props) {
  const { title, primary, value, subValue, unit, fontSize, gray, width, height } = props
  const theme = useTheme()

  return (
    <Card primary={primary} gray={gray} width={width || '100%'}>
      <Box
        sx={{
          padding: '20px 24px 28px',
          gap: '28px',
          height: height || '132px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          variant="inherit"
          color={primary ? theme.palette.primary.contrastText : theme.palette.text.secondary}
        >
          {title}
        </Typography>
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'end',
              color: primary ? theme.palette.primary.contrastText : theme.palette.text.primary
            }}
          >
            <Typography
              sx={{
                fontSize: fontSize || 24,
                fontWeight: 700
              }}
            >
              {value}
            </Typography>
            {unit && <Typography sx={{ fontSize: 16, fontWeight: 700, ml: 4 }}>{unit}</Typography>}
          </Box>
          {subValue && <Typography sx={{ fontSize: 12, fontWeight: 400, opacity: 0.5 }}>{subValue}</Typography>}
        </Box>
      </Box>
    </Card>
  )
}
