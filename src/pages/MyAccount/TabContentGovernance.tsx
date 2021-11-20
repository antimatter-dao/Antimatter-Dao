import { Box } from '@mui/material'
import Card from 'components/Card/Card'
import TableWithPagination from 'components/Table/TableWithPagination'

export default function TabContentBridge() {
  return (
    <Card>
      <Box display="flex">
        <TableWithPagination
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
