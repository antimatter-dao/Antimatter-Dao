import { useState, useCallback } from 'react'
import NumericalCard from 'components/Card/NumericalCard'
import ChartCard from 'components/Card/ChartCard'
import { DefaultButton } from 'components/Button/Button'
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
                <NumericalCard title="Total Locked Value" value="-" unit="$" />
              </Grid>
              <Grid item xs={4}>
                <NumericalCard title="Total Trading Volume" value="-" unit="$" />
              </Grid>
              <Grid item xs={4}>
                <NumericalCard title="MATTER Market Cap" value="-" unit="UST" />
              </Grid>
              <Grid item xs={4}>
                <NumericalCard title="CirculatingSupply" value="-" unit="MATTER" />
              </Grid>
              <Grid item xs={4}>
                <NumericalCard title="Total Locked Value" value="-" unit="%" />
              </Grid>
              <Grid item xs={4}>
                <NumericalCard title="Total Locked Value" value="-" unit="MATTER" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ display: 'flex', gap: '6px', flexDirection: 'column' }}>
              <NumericalCard title="Cumulative Transaction Fees" value="-" unit="USDT" primary />
              <NumericalCard title="Current APY" value="-" unit="%" primary />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ width: '100%', mt: 48 }}>
        <Grid container spacing={20}>
          <Grid item xs={9}>
            <ChartCard title="MATTER PRICE" value="-" unit="$">
              {/* Chart */}
              <Box sx={{ display: 'flex', gap: '12px' }}>
                {[
                  TIME_INTERVAL.TEN_DAYS,
                  TIME_INTERVAL.ONE_MONTH,
                  TIME_INTERVAL.THREE_MONTHS,
                  TIME_INTERVAL.SIX_MONTHS
                ].map((option, idx) => (
                  <DefaultButton
                    key={idx}
                    onClick={() => onPriceTimeInterval(option)}
                    width="80px"
                    height="32px"
                    fontSize="12px"
                    active={priceTimeInterval === option}
                  >
                    {option}
                  </DefaultButton>
                ))}
              </Box>
            </ChartCard>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Box>
      <Box sx={{ width: '100%', mt: 48 }}>
        <ChartCard title="Market Value of Treasury Assets" value="-" unit="$">
          {/* Chart */}
          <Box sx={{ display: 'flex', gap: '12px' }}>
            {[
              TIME_INTERVAL.TEN_DAYS,
              TIME_INTERVAL.ONE_MONTH,
              TIME_INTERVAL.THREE_MONTHS,
              TIME_INTERVAL.SIX_MONTHS
            ].map((option, idx) => (
              <DefaultButton
                key={idx}
                onClick={() => onMktValueTimeInterval(option)}
                width="80px"
                height="32px"
                backgroundColor={mktValueTimeInterval === option ? theme.palette.primary.main : '#FFFFFF'}
                fontSize="12px"
                active={priceTimeInterval === option}
              >
                {option}
              </DefaultButton>
            ))}
          </Box>
        </ChartCard>
      </Box>
    </Box>
  )
}
