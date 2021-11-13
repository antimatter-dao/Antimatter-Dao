import { useState } from 'react'
import ChainSwitch from 'components/ChainSwitch/ChainSwitch'
import { ChainList } from 'constants/chain'
import { Box } from '@mui/material'
import InputNumerical from 'components/Input/InputNumerical'
import Button from 'components/Button/Button'

interface Props {
  balance: string
}

export default function TabContentBridge(props: Props) {
  const { balance } = props
  const [value, setValue] = useState('')

  return (
    <Box display="flex">
      <Box width="50%" height="100%">
        <ChainSwitch key={0} fromChain={ChainList[0]} toChain={ChainList[1]} height={148} />
      </Box>
      <Box padding="22px 32px" display="grid" gap="32px" width="50%">
        <InputNumerical
          label="Amount"
          onMax={() => {
            setValue(balance)
          }}
          balance={balance}
          value={value}
          onChange={e => {
            setValue(e.target.value)
          }}
        />
        <Button disabled>Coming Soon...</Button>
      </Box>
    </Box>
  )
}
