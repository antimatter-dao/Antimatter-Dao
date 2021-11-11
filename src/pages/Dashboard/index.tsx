import NumericalCard from 'components/Card/NumericalCard'
import { Box, Grid } from '@mui/material'

export default function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1, padding: '0 42px 0 38px' }}>
      <Grid container spacing={20}>
        <Grid item xs={9}>
          <Grid container spacing={6}>
            <Grid item xs={4}>
              <NumericalCard title="Total Locked Value" value="12345.00" unit="$" height={132} />
            </Grid>
            <Grid item xs={4}>
              <NumericalCard title="Total Trading Volume" value="12345.00" unit="$" height={132} />
            </Grid>
            <Grid item xs={4}>
              <NumericalCard title="MATTER Market Cap" value="125,345,868" unit="UST" height={132} />
            </Grid>
            <Grid item xs={4}>
              <NumericalCard title="CirculatingSupply" value="125,345,869" unit="MATTER" height={132} />
            </Grid>
            <Grid item xs={4}>
              <NumericalCard title="Total Locked Value" value="56" unit="%" height={132} />
            </Grid>
            <Grid item xs={4}>
              <NumericalCard
                title="Total Locked Value"
                value="10,800.00"
                subValue="~12345.00$"
                unit="MATTER"
                height={132}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', gap: '6px', flexDirection: 'column' }}>
            <NumericalCard title="Cumulative Transaction Fees" value="12345.00" unit="USDT" primary height={132} />
            <NumericalCard title="Current APY" value="1000%" primary height={132} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
