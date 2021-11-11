import { useState, useCallback } from 'react'
import NumericalCard from 'components/Card/NumericalCard'
import ChartCard from 'components/Card/ChartCard'
import Card from 'components/Card/Card'
import Button from 'components/Button/Button'
import { Box, Grid, useTheme } from '@mui/material'

enum TIME_INTERVAL {
  TEN_DAYS = '10 Days',
  ONE_MONTH = '1 month',
  THREE_MONTHS = ' 3 months',
  SIX_MONTHS = '6 months'
}

export default function Dashboard() {
  const theme = useTheme()
  const [priceTimeInterval, setPriceTimeInterval] = useState(TIME_INTERVAL.TEN_DAYS)
  const [mktValueTimeInterval, setMktValueTimeInterval] = useState(TIME_INTERVAL.TEN_DAYS)

  const onPriceTimeInterval = useCallback(option => {
    setPriceTimeInterval(option)
  }, [])

  const onMktValueTimeInterval = useCallback(option => {
    setMktValueTimeInterval(option)
  }, [])

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
            <ChartCard title="MATTER PRICE" value="2.817" unit="$" height="430px">
              {/* Chart */}
              <Box sx={{ display: 'flex', gap: '12px' }}>
                {[
                  TIME_INTERVAL.TEN_DAYS,
                  TIME_INTERVAL.ONE_MONTH,
                  TIME_INTERVAL.THREE_MONTHS,
                  TIME_INTERVAL.SIX_MONTHS
                ].map((option, idx) => (
                  <Button
                    key={idx}
                    onClick={() => onPriceTimeInterval(option)}
                    width="80px"
                    height="32px"
                    backgroundColor={priceTimeInterval === option ? theme.palette.primary.main : '#FFFFFF'}
                    color={
                      priceTimeInterval === option ? theme.palette.primary.contrastText : theme.palette.text.primary
                    }
                    style={{
                      border: `1px solid ${priceTimeInterval === option ? 'transparent' : 'rgba(0,0,0,0.1)'}`
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </Box>
            </ChartCard>
          </Grid>
          <Grid item xs={3}>
            <Card title="MATTER PRICE" />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ width: '100%', mt: 48 }}>
        <ChartCard title="Market Value of Treasury Assets" value="2,498,436.00" unit="$" height="430px">
          {/* Chart */}
          <Box sx={{ display: 'flex', gap: '12px' }}>
            {[
              TIME_INTERVAL.TEN_DAYS,
              TIME_INTERVAL.ONE_MONTH,
              TIME_INTERVAL.THREE_MONTHS,
              TIME_INTERVAL.SIX_MONTHS
            ].map((option, idx) => (
              <Button
                key={idx}
                onClick={() => onMktValueTimeInterval(option)}
                width="80px"
                height="32px"
                backgroundColor={mktValueTimeInterval === option ? theme.palette.primary.main : '#FFFFFF'}
                color={
                  mktValueTimeInterval === option ? theme.palette.primary.contrastText : theme.palette.text.primary
                }
                style={{
                  border: `1px solid ${mktValueTimeInterval === option ? 'transparent' : 'rgba(0,0,0,0.1)'}`
                }}
              >
                {option}
              </Button>
            ))}
          </Box>
        </ChartCard>
      </Box>
    </Box>
  )
}
