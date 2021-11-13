import React, { useCallback } from 'react'
import { Tabs as MuiTabs, Tab, Typography, Box } from '@mui/material'

function TabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
  return <div hidden={value !== index}>{value === index && <Typography>{children}</Typography>}</div>
}

export default function Tabs() {
  const [value, setValue] = React.useState(0)

  const onChange = useCallback((e: React.ChangeEvent<any>, value: any) => {
    console.log(value)
    setValue(value)
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MuiTabs value={value} onChange={onChange}>
          <Tab label="Bridge" />
          <Tab label="Stake" />
        </MuiTabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </Box>
  )
}
