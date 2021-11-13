import { useState, useCallback } from 'react'
import { Box } from '@mui/system'
import Card from 'components/Card/Card'
import { SwitchTabWrapper, Tab } from 'components/SwitchTab'
import Table from 'components/Table'

const tabTypes = {
  bond: 'BOND',
  noLockUpBond: 'No lockup Bond'
}

export default function Bond() {
  const [currentTab, setCurrentTab] = useState<keyof typeof tabTypes>('bond')

  const handleCurrentTab = useCallback(
    tab => () => {
      setCurrentTab(tab)
    },
    []
  )

  return (
    <Box>
      <Card width="100%"></Card>
      <Card width="100%">
        <Box display="grid">
          <SwitchTab currentTab={currentTab} onTabClick={handleCurrentTab} />
          <Table header={['Bond', 'Price', 'ROI', 'Purchased', '']} rows={[[1, 1, 1, 1]]} />
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
