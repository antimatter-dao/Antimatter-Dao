//import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import Card from 'components/Card/Card'
//import InputNumerical from 'components/Input/InputNumerical'
//import Button from 'components/Button/Button'
import { ReactComponent as BSCIcon } from 'assets/svg/bsc_logo.svg'
import TableWithPagination from 'components/Table/TableWithPagination'

interface Props {
  balance: string
}

export default function TabContentHistory(props: Props) {
  const date1 = new Date('Sep 21, 2021 10:42:21 AM').toLocaleString()
  return (
    <Card>
      <Box display="flex">
        <TableWithPagination
          header={['Event', 'Status', 'Date']}
          rows={[
            [
              <Box display="flex" key={0}>
                <BSCIcon key={0} />
                <Typography variant="inherit">Stake</Typography>
              </Box>,
              'Failed',
              date1
            ],
            ['placeholder', 'Success', '29.08.2001'],
            ['placeholder', 'Success', '29.08.2001'],
            ['placeholder', 'Success', '29.08.2001'],
            ['placeholder', 'Success', '29.08.2001'],
            ['placeholder', 'Success', '29.08.2001'],
            ['placeholder', 'Success', '29.08.2001'],
            ['placeholder', 'Success', '29.08.2001'],
            ['placeholder', 'Success', '29.08.2001'],
            ['placeholder', 'Success', '29.08.2001'],
            ['placeholder', 'Success', '29.08.2001'],
            ['placeholder', 'Success', '29.08.2002']
          ]}
        />
      </Box>
    </Card>
  )
}
