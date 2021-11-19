import { Box } from '@mui/material'
import Card from 'components/Card/Card'
import Table from 'components/Table'

export default function TabContentBridge() {
  return (
    <Card>
      <Box display="flex">
        <Table
          header={['Your Proposal', 'Status', '']}
          rows={[
            ['placeholder', 'Failed', 'Create Pool'],
            ['placeholder', 'Success', 'Create Pool']
          ]}
        />
      </Box>
    </Card>
  )
}
