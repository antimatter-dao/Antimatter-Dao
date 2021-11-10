import Card from 'components/Card/Card'
import { Box } from '@mui/material'

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 21 }}>
      <Card title="Total Locked Value" value="123456.00" unit="$" />
      <Card title="Total Locked Value" value="123456.00" unit="$" />
      <Card title="Total Locked Value" value="123456.00" unit="$" />
      <Card title="Total Locked Value" value="123456.00" unit="$" primary />
      <Card title="Total Locked Value" value="123456.00" unit="$" />
      <Card title="Total Locked Value" value="123456.00" unit="$" />
      <Card title="Total Locked Value" value="123456.00" unit="$" value2="~123456 $" />
      <Card title="Total Locked Value" value="123456.00" unit="$" primary />
    </Box>
  )
}
