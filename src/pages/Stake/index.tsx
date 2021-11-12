import { useState, useCallback } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import Card from 'components/Card'
import { ReactComponent as MatterCircle } from 'assets/svg/stake_matter_circle.svg'
import SmallButton from 'components/Button/SmallButton'
import StakeInputModal, { StakeType } from './StakeInputModal'
import { useStakeCallback, useStakingInfo } from 'hooks/useStake'
import useModal from 'hooks/useModal'
import { useTransactionAdder } from 'state/transactions/hooks'
import TransacitonPendingModal from 'components/Modal/TransactionModals/TransactionPendingModal'
import MessageBox from 'components/Modal/TransactionModals/MessageBox'
import { useActiveWeb3React } from 'hooks'
import { useWalletModalToggle } from 'state/application/hooks'
import { parseBalance } from 'utils/parseAmount'
import { Matter } from 'constants/index'
import { useCurrencyBalance } from 'state/wallet/hooks'

export default function Stake() {
  const [depositModalOpen, setDepositModalOpen] = useState(false)
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)

  const theme = useTheme()
  const { showModal, hideModal } = useModal()
  const toggleWalletModal = useWalletModalToggle()

  const { account } = useActiveWeb3React()
  const { stakeCallback, unstakeCallback } = useStakeCallback()
  const addTransaction = useTransactionAdder()
  const { apy, earned, stakedBalance } = useStakingInfo()
  const MatterBalance = useCurrencyBalance(account ?? undefined, Matter)

  const onDismiss = useCallback(() => {
    setDepositModalOpen(false)
    setWithdrawModalOpen(false)
  }, [])

  const handleStake = useCallback(
    (val: string | undefined, setHash: (hash: string) => void) => () => {
      if (!stakeCallback || !val || !account) return
      showModal(<TransacitonPendingModal />)
      stakeCallback(val)
        .then(r => {
          hideModal()
          setHash(r.hash)
          addTransaction(r, {
            summary: `Stake ${val} MATTER`
          })
        })
        .catch(e => {
          showModal(<MessageBox type="error">{e.message}</MessageBox>)
        })
    },
    [addTransaction, hideModal, showModal, stakeCallback, account]
  )

  const handleUnStake = useCallback(
    (val: string | undefined, setHash: (hash: string) => void) => () => {
      if (!unstakeCallback) return
      showModal(<TransacitonPendingModal />)
      unstakeCallback()
        .then(r => {
          hideModal()
          setHash(r.hash)
          addTransaction(r, {
            summary: `Unstake MATTER`
          })
        })
        .catch(e => {
          showModal(<MessageBox type="error">{e.message}</MessageBox>)
        })
    },
    [addTransaction, hideModal, showModal, unstakeCallback]
  )

  return (
    <>
      <Box
        display="grid"
        alignContent="flex-start"
        sx={{ minHeight: theme => `calc(100vh - ${theme.height.header})`, width: '100%' }}
        gap="20px"
      >
        <Card>
          <Box display="grid" padding="34px 24px 30px" gap="40px">
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" gap="20px">
                <MatterCircle />
                <Box display="grid" gap="8px">
                  <Typography fontWeight={700} fontSize={24}>
                    Stake MATTER
                  </Typography>
                  <Typography variant="inherit" color={theme.palette.text.secondary}>
                    Stake MATTER and get exponentially growing returns!
                  </Typography>
                </Box>
              </Box>
              <Box display="grid">
                <Typography>04 h : 55 m : 02 s to next rebase</Typography>
                <Typography sx={{ color: theme => theme.palette.primary.main }}>Get MATTER at a discount</Typography>
              </Box>
            </Box>
            <Box display="flex" gap="20px">
              <Card gray style={{ width: '100%' }}>
                <Box padding="20px 24px" gap="28px">
                  <Typography variant="inherit" color={theme.palette.text.secondary}>
                    APY
                  </Typography>
                  <Typography fontWeight={700} fontSize={24}>
                    {apy && apy.toString()}%
                  </Typography>
                </Box>
              </Card>
              <Card gray style={{ width: '100%' }}>
                <Box padding="20px 24px" gap="28px">
                  <Typography variant="inherit" color={theme.palette.text.secondary}>
                    Total Value Deposited
                  </Typography>
                  <Typography fontWeight={700} fontSize={24}>
                    3,835,616.00$
                  </Typography>
                </Box>
              </Card>
            </Box>
          </Box>
        </Card>
        <Box display="grid" gridTemplateColumns="1.5fr 2fr 1fr" gap="20px" maxWidth="100%" sx={{ width: '100%' }}>
          <Card>
            <Box padding="20px 24px" gap="152px" display="grid">
              <Typography variant="inherit" color={theme.palette.text.secondary}>
                My Balance
              </Typography>
              <Typography fontWeight={700} fontSize={24}>
                {MatterBalance ? parseBalance(MatterBalance.toExact(), Matter) : 0}Matter
              </Typography>
            </Box>
          </Card>
          <Card>
            <Box padding="20px 24px" gap="152px" display="grid">
              <Box display="flex" justifyContent="space-between" width="100%">
                <Typography variant="inherit" color={theme.palette.text.secondary}>
                  sMATTER Earned
                </Typography>
                <SmallButton variant="outlined">Compound</SmallButton>
              </Box>
              <Box display="flex" justifyContent="space-between" width="100%">
                <Typography fontWeight={700} fontSize={24}>
                  {parseBalance(earned, Matter)}sMatter
                </Typography>
                {account ? (
                  <SmallButton
                    onClick={() => {
                      setDepositModalOpen(true)
                    }}
                  >
                    +Stake
                  </SmallButton>
                ) : (
                  <SmallButton onClick={toggleWalletModal}>Connect</SmallButton>
                )}
              </Box>
            </Box>
          </Card>
          <Card>
            <Box padding="20px 24px" gap="152px" display="grid">
              <Typography variant="inherit" color={theme.palette.text.secondary}>
                Your Staked Balance:
              </Typography>
              <Typography fontWeight={700} fontSize={24}>
                {parseBalance(stakedBalance, Matter)}sMATTER
              </Typography>
            </Box>
          </Card>
        </Box>
      </Box>
      <StakeInputModal
        type={StakeType.DEPOSIT}
        isOpen={depositModalOpen}
        onDismiss={onDismiss}
        onAction={handleStake}
      />
      <StakeInputModal
        type={StakeType.WITHDRAW}
        isOpen={withdrawModalOpen}
        onDismiss={onDismiss}
        onAction={handleUnStake}
      />
    </>
  )
}
