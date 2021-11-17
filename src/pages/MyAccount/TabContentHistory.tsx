//import { useState } from 'react'
import { Box } from '@mui/material'
//import InputNumerical from 'components/Input/InputNumerical'
//import Button from 'components/Button/Button'
import Table from 'components/Table'

interface Props {
  balance: string
}

export default function TabContentHistory(props: Props) {
  //const { balance } = props
  //const [value, setValue] = useState('')

  return (
    <Box display="flex">
      <Table header={['Event', 'Status', 'Date']} rows={[['placeholder', 'placeholder', '', '', '']]} />
    </Box>
  )
}
