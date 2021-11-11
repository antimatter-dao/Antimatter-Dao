import NumericalCard from 'components/Card/NumericalCard'
import ChartCard from 'components/Card/ChartCard'
import { Box, Grid } from '@mui/material'

export default function Dashboard() {
  return (
    <Box sx={{ padding: '0 42px 0 38px' }}>
      <Box width="100%">
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
      <Box sx={{ width: '100%', mt: 48 }}>
        <Grid container spacing={20}>
          <Grid item xs={9}>
            <ChartCard title="MATTER PRICE" value="2.817" unit="$" height="430px" />
          </Grid>
          <Grid item xs={3}>
            <ChartCard title="MATTER PRICE" value="2.817" unit="$" height="430px" />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ width: '100%', mt: 48 }}>
        <ChartCard title="Market Value of Treasury Assets" value="2,498,436.00" unit="$" height="430px" />
      </Box>
    </Box>
  )
}
