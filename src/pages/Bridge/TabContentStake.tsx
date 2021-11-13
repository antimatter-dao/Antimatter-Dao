import { Box, Typography } from '@mui/material'
import { ReactComponent as MatterAndUsdt } from 'assets/svg/matter_and_usdt_lg.svg'
import Button from 'components/Button/Button'
import OutlineButton from 'components/Button/OutlineButton'
import Divider from 'components/Divider'

export default function TabContentBridge() {
  return (
    <Box display="flex">
      <Box width="50%" display="flex" gap={20} mt={42}>
        <MatterAndUsdt />
        <Box>
          <Typography variant="inherit" fontSize={24} fontWeight={700}>
            MATTER-USDT LP
          </Typography>
          <Typography variant="inherit" fontSize={12} fontWeight={400} color="#7D7D7D">
            Ethereum
          </Typography>
        </Box>
      </Box>
      <Box width="50%">
        <Box display="flex" height={44} gap={33} mt={61}>
          <Box>
            <Typography
              variant="inherit"
              sx={{
                color: theme => theme.palette.text.secondary,
                fontSize: 12,
                fontWeight: 500
              }}
            >
              Amount of Quota Provided
            </Typography>
            <Box display="flex" alignItems="end" lineHeight={1}>
              <Typography variant="inherit" fontSize={16} fontWeight={700}>
                -
              </Typography>
              <Typography variant="inherit" fontSize={14} fontWeight={700} ml={4}>
                MATTER
              </Typography>
            </Box>
          </Box>
          <Divider orientation="vertical" color="rgba(0,0,0,0.1)" />
          <Box>
            <Typography
              variant="inherit"
              sx={{
                color: theme => theme.palette.text.secondary,
                fontSize: 12,
                fontWeight: 500
              }}
            >
              My Balance
            </Typography>
            <Box display="flex" alignItems="end" lineHeight={1}>
              <Typography variant="inherit" fontSize={16} fontWeight={700}>
                -
              </Typography>
              <Typography variant="inherit" fontSize={14} fontWeight={700} ml={4}>
                LP
              </Typography>
            </Box>
          </Box>
          <Divider orientation="vertical" color="rgba(0,0,0,0.1)" />
          <Box>
            <Typography
              variant="inherit"
              sx={{
                color: theme => theme.palette.text.secondary,
                fontSize: 12,
                fontWeight: 500
              }}
            >
              My Staked Balance
            </Typography>
            <Box display="flex" alignItems="end" lineHeight={1}>
              <Typography variant="inherit" fontSize={16} fontWeight={700}>
                -
              </Typography>
              <Typography variant="inherit" fontSize={14} fontWeight={700} ml={4}>
                LP
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box display="flex" gap={16} mt={40}>
          <Button disabled>Coming Soon...</Button>
          <OutlineButton disabled>Coming Soon...</OutlineButton>
        </Box>
      </Box>
    </Box>
  )
}
