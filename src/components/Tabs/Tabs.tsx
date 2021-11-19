import React, { useCallback } from 'react'
import { Tabs as MuiTabs, Tab, Box } from '@mui/material'

interface Props {
  titles: string[]
  contents: React.ReactNode[]
  custom?: boolean
  tabStyle?: React.CSSProperties
}
interface TabPanelProps {
  children?: React.ReactNode
  value: number
  index: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props

  return <div hidden={value !== index}>{value === index && children}</div>
}

export default function Tabs(props: Props) {
  const { titles, contents, tabStyle, custom } = props
  const [value, setValue] = React.useState(0)

  const onChange = useCallback((e: React.ChangeEvent<any>, value: any) => {
    setValue(value)
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MuiTabs value={value} onChange={onChange}>
          {titles.map(function(tab) {
            if (custom) {
              return <Tab key={tab} label={tab} sx={tabStyle} />
              //if not custom then default design:
            } else {
              return (
                <Tab
                  key={tab}
                  label={tab}
                  sx={{
                    fontWeight: 700,
                    textTransform: 'none',
                    color: theme => theme.palette.text.primary,
                    opacity: 0.4,
                    '&.Mui-selected': {
                      color: theme => theme.palette.text.primary,
                      opacity: 1
                    }
                  }}
                />
              )
            }
          })}
        </MuiTabs>
      </Box>
      {contents.map((content, idx) => (
        <TabPanel value={value} index={idx} key={idx}>
          {content}
        </TabPanel>
      ))}
    </Box>
  )
}
