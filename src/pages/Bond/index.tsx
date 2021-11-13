import { useState, useCallback } from 'react'
import { Box } from '@mui/system'
import { Typography, useTheme } from '@mui/material'
import Card, { OutlinedCard } from 'components/Card/Card'
import { SwitchTabWrapper, Tab } from 'components/SwitchTab'
import Table from 'components/Table'
import InputNumerical from 'components/Input/InputNumerical'
import NumericalCard from 'components/Card/NumericalCard'
import Button from 'components/Button/Button'

const tabTypes = {
  bond: 'BOND',
  noLockUpBond: 'No lockup Bond'
}

export default function Bond() {
  const theme = useTheme()
  const [currentTab, setCurrentTab] = useState<keyof typeof tabTypes>('bond')

  const handleCurrentTab = useCallback(
    tab => () => {
      setCurrentTab(tab)
    },
    []
  )

  return (
    <Box width="100%" gap="24px" display="grid">
      <Card width="100%" padding="38px 24px">
        <Box display="grid">
          <Box display="grid" gap="8px">
            <Typography fontWeight={700} fontSize={24}>
              Buy MATTER
            </Typography>
            <Typography variant="inherit" color={theme.palette.text.secondary}>
              Use LPT for discounted prices to get MATTER!
            </Typography>
          </Box>
          <Box display="flex" gridTemplateColumns="1fr 1fr 1fr" gap="20px">
            <NumericalCard title="Treasury Balance" value={'-'} unit="%" gray />
            <NumericalCard title="MATTER Price" value={'-'} unit="$" gray />
            <NumericalCard title="Circulating Supply" value={'-'} unit="MATTER" gray />
          </Box>
        </Box>
      </Card>
      <Card width="100%" padding="32px 24px">
        <Box display="grid" gap="34px">
          <SwitchTab currentTab={currentTab} onTabClick={handleCurrentTab} />
          {tabTypes[currentTab] === tabTypes.bond ? (
            <Table header={['Bond', 'Price', 'ROI', 'Purchased', '']} rows={[['Coming Soon...', '', '', '', '']]} />
          ) : (
            <Box display="flex" gap="60px">
              <Box display="grid" width="100%" gap="8px">
                <Typography color={theme.palette.text.secondary}>Note</Typography>
                <OutlinedCard color={'#00000010'}>
                  <Box display="grid" padding="20px 24px" gap="8px">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="9" r="9" fill="#2663FF" />
                      <rect x="8" y="8" width="2" height="6" rx="1" fill="white" />
                      <rect x="8" y="4" width="2" height="2" rx="1" fill="white" />
                    </svg>

                    <p style={{ margin: 0 }}>
                      If you choose to purchase with no lockup,the contract will use half of the fund to direct market
                      buy MATTER from DEX and use the other half of the fund to buy MATTER from treasury at the market
                      price without slippage.
                    </p>
                  </Box>
                </OutlinedCard>
              </Box>
              <Box width="100%" gap="28px" display="grid">
                <InputNumerical
                  unit="USDT"
                  label="Amount you want to purchase"
                  onMax={() => {}}
                  balance={'-'}
                  value={''}
                  onChange={() => {}}
                />
                <Button disabled>Coming Soon...</Button>
              </Box>
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  )
}

function SwitchTab({
  currentTab,
  onTabClick
}: {
  currentTab: keyof typeof tabTypes
  onTabClick: (tab: keyof typeof tabTypes) => () => void
}) {
  return (
    <SwitchTabWrapper>
      {Object.keys(tabTypes).map(tab => {
        const tabName = tabTypes[tab as keyof typeof tabTypes]
        return (
          <Tab key={tab} onClick={onTabClick(tab as keyof typeof tabTypes)} selected={currentTab === tab}>
            {tabName}
          </Tab>
        )
      })}
    </SwitchTabWrapper>
  )
}
