import React, { useCallback } from 'react'
import { Tabs as MuiTabs, Tab, Typography, Box } from '@mui/material'

interface Props {
  tabContents: React.ReactNode[]
}

function TabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
  return <div hidden={value !== index}>{value === index && <Typography>{children}</Typography>}</div>
}

export default function Tabs(props: Props) {
  const { tabContents } = props
  const [value, setValue] = React.useState(0)

  const onChange = useCallback((e: React.ChangeEvent<any>, value: any) => {
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
      {tabContents.map((content, idx) => (
        <TabPanel value={value} index={idx} key={idx}>
          {content}
        </TabPanel>
      ))}
    </Box>
  )
}
