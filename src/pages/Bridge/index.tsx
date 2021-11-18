import Card from 'components/Card/Card'
import { Box, useTheme, Typography } from '@mui/material'
import { ReactComponent as EthToBsc } from 'assets/svg/eth_to_bsc.svg'
import { ReactComponent as MatterAndUsdt } from 'assets/svg/matter_and_usdt.svg'
import Tabs from 'components/Tabs/Tabs'
import TabContentBridge from './TabContentBridge'
import TabContentStake from './TabContentStake'

export default function Bridge() {
  const theme = useTheme()

  return (
    <Box width="100%" display="grid" gap="22px">
      <Card width="100%">
        <Box display="grid" gap="8px" padding="38px 24px">
          <Typography fontWeight={700} fontSize={24}>
            Stake and Crosschain
          </Typography>
          <Typography variant="inherit" color={theme.palette.text.secondary}>
            MATTER crosschain and increase your quota
          </Typography>
          <Box display="grid" gridTemplateColumns=" 1fr 1fr 1fr" mt={36} gap={20}>
            <Card gray>
              <Box padding="20px 24px" height={146}>
                <Box display="flex" justifyContent="space-between">
                  <Typography color={theme.palette.text.secondary}>Quota per address</Typography>
                  <EthToBsc />
                </Box>
                <Box>
                  <Box display="flex" alignItems="end" mt={28}>
                    <Typography fontSize={24} fontWeight={700} lineHeight={1}>
                      -
                    </Typography>
                    <Typography fontSize={16} fontWeight={700} lineHeight={1}>
                      MATTER
                    </Typography>
                    <Typography fontSize={12} fontWeight={400} color={theme.palette.text.secondary} lineHeight={1}>
                      /~-$
                    </Typography>
                  </Box>
                  <Typography mt={8} fontSize={12} color="#7D7D7D">
                    Obtain quota by stake of designated LP
                  </Typography>
                </Box>
              </Box>
            </Card>
            <Card gray>
              <Box padding="20px 24px" height={146}>
                <Box display="flex" justifyContent="space-between">
                  <Typography color={theme.palette.text.secondary}>Quota per address</Typography>
                  <EthToBsc />
                </Box>
                <Typography fontSize={24} fontWeight={700} lineHeight={1} mt={28}>
                  Not Limited
                </Typography>
              </Box>
            </Card>
            <Card primary>
              <Box padding="20px 24px" height={146}>
                <Typography color={theme.palette.primary.contrastText}>Your stake</Typography>
                <Box mt={28} display="flex">
                  <Typography
                    color={theme.palette.primary.contrastText}
                    fontSize={24}
                    fontWeight={700}
                    lineHeight={1}
                    mr={8}
                  >
                    -
                  </Typography>
                  <MatterAndUsdt />
                </Box>
                <Typography fontSize={12} color={theme.palette.primary.contrastText}>
                  MATTER-USDT LP (Ethereum)
                </Typography>
              </Box>
            </Card>
          </Box>
        </Box>
      </Card>
      <Card width="100%">
        <Box padding="32px 24px">
          <Tabs
            titles={['Brige', 'Stake']}
            contents={[<TabContentBridge key={0} balance={'-'} />, <TabContentStake key={1} />]}
          />
        </Box>
      </Card>
    </Box>
  )
}
