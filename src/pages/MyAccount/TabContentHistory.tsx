//import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import Card from 'components/Card/Card'
//import InputNumerical from 'components/Input/InputNumerical'
//import Button from 'components/Button/Button'
import Table from 'components/Table'
import { ReactComponent as BSCIcon } from 'assets/svg/bsc_logo.svg'

interface Props {
  balance: string
}

export default function TabContentHistory(props: Props) {
  //const { balance } = props
  //const [value, setValue] = useState('')

  return (
    <Card>
      <Box display="flex">
        <Table
          header={['Event', 'Status', 'Date']}
          rows={[
            [
              <Box display="flex" key={0}>
                <BSCIcon key={0} />
                <Typography variant="inherit">Stake</Typography>
              </Box>,
              'Failed',
              'Sep 21, 2021  10:42:21 AM '
            ],
            ['placeholder', 'Success', '29.08.2001']
          ]}
        />
      </Box>
    </Card>
  )
}
