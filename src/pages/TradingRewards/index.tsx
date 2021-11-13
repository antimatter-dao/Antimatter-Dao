import Card from 'components/Card/Card'
import NumericalCard from 'components/Card/NumericalCard'
import { ReactComponent as BullAndBear } from 'assets/svg/bull_and_bear_icon.svg'
import { Typography, Box, Grid } from '@mui/material'
import Button, { BlackButton } from 'components/Button/Button'
import TextButton from 'components/Button/TextButton'
import { ReactComponent as ArrowRight } from 'assets/componentsIcon/arrow_right.svg'

const Tag = ({ k, v }: { k: string; v: string }) => {
  return (
    <>
      <Box display="flex" alignItems="center" gap={12}>
        <Box
          sx={{
            backgroundColor: theme => theme.palette.background.default,
            borderRadius: 50,
            display: 'flex',
            alignItems: 'center',
            padding: '9px 16px'
          }}
        >
          <Typography color="#7D7D7D" fontSize={12}>
            {k}
          </Typography>
          <Typography fontSize={12} ml={2}>
            {v}
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default function TradingRewards() {
  return (
    <>
      <Card width="100%">
        <Box display="flex" justifyContent="space-between" height={132} padding="26px 24px">
          <Box display="flex" alignItems="center">
            <BullAndBear />
            <Typography fontSize={24} fontWeight={700} ml={20}>
              BNB Bull & BNB Bear
            </Typography>
          </Box>
          <Box display="flex" gap="12px">
            <Tag k="Estimated APRR" v="-%" />
            <Tag k="Rewards in" v="Matter" />
          </Box>
        </Box>
      </Card>
      <Box display="flex" gap={20} mt={24}>
        <NumericalCard
          title="Total Claimable Rewards"
          value="45.00"
          fontSize="44px"
          unit="MATTER"
          height={344}
          width={388}
          actions={
            <Button height="60px" disabled>
              Coming Soon...
            </Button>
          }
        />
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <NumericalCard
              title="Countdown"
              value="-"
              unit="$"
              height={168}
              actions={
                <Typography fontSize={12} fontWeight={500} color="#7D7D7D">
                  until the next epoch on October 26
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumericalCard
              title="Reward Pool"
              value="-"
              height={168}
              actions={
                <Typography fontSize={12} fontWeight={500} color="#7D7D7D">
                  will be distributed this epoch
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumericalCard title="My total value of trade" value="-" unit="MATTER" height={168} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <Box padding="22px 24px" height={168}>
                <Typography
                  sx={{
                    color: theme => theme.palette.text.primary,
                    fontSize: 14,
                    fontWeight: 500
                  }}
                >
                  Trading Rewards
                </Typography>
                <Typography
                  sx={{
                    color: theme => theme.bgColor.bg1,
                    opacity: 0.5,
                    fontSize: 14,
                    mt: 16
                  }}
                >
                  Rewards are based on your total fees paid and open interest on the dYdX exchange
                </Typography>
                <Box display="flex" alignItems="center" gap="20px" mt={23}>
                  <BlackButton width="144px" height="32px" style={{ borderRadius: '50px' }} disabled>
                    Coming Soon...
                  </BlackButton>
                  <TextButton>
                    <Box display="flex" alignItems="center">
                      <Typography fontSize={14} fontWeight={500}>
                        Learn more
                      </Typography>
                      <Box ml={6}>
                        <ArrowRight />
                      </Box>
                    </Box>
                  </TextButton>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
