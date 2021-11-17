import { Box, Typography, useTheme } from '@mui/material'
import Card from 'components/Card/Card'
import NumericalCard from 'components/Card/NumericalCard'
import { Matter } from 'constants/index'
import { useActiveWeb3React } from 'hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import Tabs from 'components/Tabs/Tabs'
import TabContentHistory from './TabContentHistory'
import TabContentGovernance from './TabContentGovernance'

//Icons
//import { ReactComponent as ETHIcon } from 'assets/svg/eth_logo.svg'

export default function MyAccount() {
  const theme = useTheme()

  const { account } = useActiveWeb3React()
  const matterBalance = useCurrencyBalance(account ?? undefined, Matter)

  return (
    <>
      <Box
        display="grid"
        alignContent="flex-start"
        sx={{ minHeight: theme => `calc(100vh - ${theme.height.header})`, width: '100%' }}
        gap="20px"
      >
        <Card>
          <Box display="grid" padding="34px 24px 0px" gap="8px">
            <Typography fontWeight={400} fontSize={16} color={theme.palette.text.secondary}>
              Your Balance
            </Typography>
          </Box>
          <Box
            display="grid"
            padding="0px 24px 30px"
            gap="40px"
            gridTemplateColumns="repeat(4, 1fr)"
            gridTemplateRows="1fr"
          >
            <Box display="flex" gap="40px" justifyContent="space-between" flexDirection="column">
              <Box display="flex" gap="20px">
                {/* <Box display="grid" gap="8px">
                  <Typography fontWeight={400} fontSize={16} color={theme.palette.text.secondary}>
                    Your Balance
                  </Typography>
                </Box> */}
              </Box>
              <Box display="flex" gap="20px" flexDirection="column">
                <NumericalCard
                  title="Total Balance on BSC"
                  value={matterBalance !== undefined ? matterBalance.toFixed(4) : '-'}
                  unit="MATTER"
                  gray
                  bscicon
                />
              </Box>
              <Box display="flex" gap="20px" flexDirection="column" gridArea="totalbalancee">
                <NumericalCard
                  title="Total Balance on ETH"
                  value={matterBalance !== undefined ? matterBalance.toFixed(4) : '-'}
                  unit="MATTER"
                  gray
                  ethicon
                />
              </Box>
            </Box>

            <Box display="flex" gap="40px" justifyContent="space-between" flexDirection="column">
              <Box display="flex" gap="20px"></Box>
              <Box display="flex" gap="20px" flexDirection="column">
                <NumericalCard
                  title="Trading Rewards"
                  value={matterBalance !== undefined ? matterBalance.toFixed(4) : '-'}
                  unit="MATTER"
                />
              </Box>
              <Box display="flex" gap="20px" flexDirection="column" gridArea="totalbalancee">
                <NumericalCard
                  title="sMATTER Staking"
                  value={matterBalance !== undefined ? matterBalance.toFixed(4) : '-'}
                  unit="sMATTER"
                />
              </Box>
            </Box>
            <Box display="flex" gap="40px" justifyContent="space-between" flexDirection="column">
              <Box display="flex" gap="20px"></Box>
              <Box display="flex" gap="20px" flexDirection="column">
                <NumericalCard
                  unitFontSize="10px"
                  title="LP Staking"
                  value={matterBalance !== undefined ? matterBalance.toFixed(4) : '-'}
                  unit="MATTER-USDT LP"
                  matterusdticon
                />
              </Box>
              <Box display="flex" gap="20px" flexDirection="column" gridArea="totalbalancee">
                <NumericalCard
                  unitFontSize="10px"
                  title="Bond Staking"
                  value={matterBalance !== undefined ? matterBalance.toFixed(4) : '-'}
                  unit="MATTER-BUSD LP"
                  matterbusdicon
                />
              </Box>
            </Box>
            <Box display="flex" gap="40px" justifyContent="space-between" flexDirection="column">
              <Box display="flex" gap="20px"></Box>
              <Box display="flex" gap="20px" flexDirection="column">
                <NumericalCard
                  title="Voting"
                  value={matterBalance !== undefined ? matterBalance.toFixed(4) : '-'}
                  unit="MATTER"
                />
              </Box>
            </Box>
          </Box>
        </Card>
        <Card width="100%">
          <Box padding="32px 24px">
            <Tabs tabContents={[<TabContentHistory key={0} balance={'-'} />, <TabContentGovernance key={1} />]} />
          </Box>
        </Card>
      </Box>
    </>
  )
}
