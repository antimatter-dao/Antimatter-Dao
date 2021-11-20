import { Box } from '@mui/material'
import Card from 'components/Card/Card'
import NumericalCard from 'components/Card/NumericalCard'
import { Matter, sMatter } from 'constants/index'
import { useActiveWeb3React } from 'hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import Tabs from 'components/Tabs/Tabs'
import TabContentHistory from './TabContentHistory'
import TabContentGovernance from './TabContentGovernance'
import { ReactComponent as ETHIcon } from 'assets/svg/eth_logo.svg'
/* import { ReactComponent as BSCIcon } from 'assets/svg/bsc_logo.svg' */
import { ReactComponent as MatterUsdtIcon } from 'assets/svg/matter_and_usdt.svg'

//TO DO: change to matter_and_busd.svg
import { ReactComponent as MatterBusdIcon } from 'assets/svg/matter_and_usdt.svg'

export default function MyAccount() {
  /* const theme = useTheme() */

  const { account } = useActiveWeb3React()
  const matterBalance = useCurrencyBalance(account ?? undefined, Matter)
  const sMatterBalance = useCurrencyBalance(account ?? undefined, sMatter)
  /* const accountStyle = {
    marginBottom: '30px',
    fontWeight: 700,
    fontSize: '24px',
    textTransform: 'none' as const,
    color: theme.palette.text.primary,
    opacity: 0.4,
    '&.Mui-selected': {
      color: theme.palette.text.primary,
      opacity: 1
    }
  } */

  return (
    <>
      <Box
        display="grid"
        alignContent="flex-start"
        sx={{ minHeight: theme => `calc(100vh - ${theme.height.header})`, width: '100%' }}
        gap="24px"
      >
        <Box display="grid" gap="20px" gridTemplateColumns="1fr 2fr " gridTemplateRows="1fr">
          <Box display="flex" gap="8px" flexDirection="column">
            <Box display="flex" gap="20px" flexDirection="column">
              <NumericalCard
                title="My Total Balance"
                value={matterBalance !== undefined ? matterBalance.toFixed(4) : '-'}
                unit="MATTER"
                icon1={<ETHIcon />}
              />
            </Box>
            <Box display="flex" gap="20px" flexDirection="column">
              <NumericalCard
                title="My Total Value"
                value={matterBalance !== undefined ? matterBalance.toFixed(4) : '-'}
                unit="MATTER"
              />
            </Box>
          </Box>
          <Card>
            <Box
              display="grid"
              padding="22px 22px 22px"
              gap="9px"
              gridTemplateColumns="1fr 1fr 1fr"
              gridTemplateRows="1fr 1fr"
            >
              <Box display="flex" gap="20px" flexDirection="column">
                <NumericalCard
                  title="Trading Rewards"
                  height="110px"
                  gray
                  value={matterBalance !== undefined ? matterBalance.toFixed(4) : '-'}
                  unit="MATTER"
                  unitFontSize="12px"
                  fontSize="16px"
                />
              </Box>
              <Box display="flex" gap="20px" flexDirection="column">
                <NumericalCard
                  title="LP Staking"
                  height="110px"
                  gray
                  value={matterBalance !== undefined ? matterBalance.toFixed(4) : '-'}
                  unit="MATTER-USDT LP"
                  unitFontSize="12px"
                  icon1={<MatterUsdtIcon />}
                  fontSize="16px"
                />
              </Box>
              <Box display="flex" gap="20px" flexDirection="column">
                <NumericalCard
                  title="Voting"
                  height="110px"
                  gray
                  value={matterBalance !== undefined ? matterBalance.toFixed(4) : '-'}
                  unit="MATTER"
                  unitFontSize="12px"
                  fontSize="16px"
                />
              </Box>
              <Box display="flex" gap="20px" flexDirection="column">
                <NumericalCard
                  title="sMATTER Staking"
                  height="110px"
                  gray
                  value={sMatterBalance !== undefined ? sMatterBalance.toFixed(4) : '-'}
                  unit="sMATTER"
                  unitFontSize="12px"
                  fontSize="16px"
                />
              </Box>
              <Box display="flex" gap="20px" flexDirection="column">
                <NumericalCard
                  title="LP Staking"
                  height="110px"
                  gap="0px"
                  gray
                  value={matterBalance !== undefined ? matterBalance.toFixed(4) : '-'}
                  unit="MATTER-BUSD LP"
                  unitFontSize="12px"
                  icon1={<MatterBusdIcon />}
                  fontSize="16px"
                />
              </Box>
            </Box>
          </Card>
        </Box>
        <Card>
          <Box display="flex" padding="20px 20px 0px">
            <Tabs
              titles={['History', 'Governance']}
              contents={[<TabContentHistory key={0} balance={'-'} />, <TabContentGovernance key={1} />]}
              /* custom
          tabStyle={accountStyle} */
            />
          </Box>
        </Card>
      </Box>
    </>
  )
}
