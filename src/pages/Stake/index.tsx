import { useState, useCallback } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import Card from 'components/Card/Card'
import { ReactComponent as MatterCircle } from 'assets/svg/stake_matter_circle.svg'
import SmallButton from 'components/Button/SmallButton'
import StakeInputModal, { StakeType } from './StakeInputModal'
import StakeActionModal from './StakeActionModal'
import { useStakeCallback, useStakingInfo } from 'hooks/useStake'
import useModal from 'hooks/useModal'
import { useTransactionAdder } from 'state/transactions/hooks'
import TransacitonPendingModal from 'components/Modal/TransactionModals/TransactionPendingModal'
import MessageBox from 'components/Modal/TransactionModals/MessageBox'
import { useActiveWeb3React } from 'hooks'
import { useWalletModalToggle } from 'state/application/hooks'
import { Matter } from 'constants/index'
import { useCurrencyBalance } from 'state/wallet/hooks'

export default function Stake() {
  const [depositModalOpen, setDepositModalOpen] = useState(false)
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)
  const [compoundModalOpen, setCompoundModalOpen] = useState(false)

  const theme = useTheme()
  const { showModal, hideModal } = useModal()
  const toggleWalletModal = useWalletModalToggle()

  const { account } = useActiveWeb3React()
  const { stakeCallback, unstakeCallback, compoundCallback } = useStakeCallback()
  const addTransaction = useTransactionAdder()
  const { apy, earned, stakedBalance, totalDeposited } = useStakingInfo()
  const matterBalance = useCurrencyBalance(account ?? undefined, Matter)

  const onDismiss = useCallback(() => {
    setDepositModalOpen(false)
    setWithdrawModalOpen(false)
    setCompoundModalOpen(false)
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
    (setHash: (hash: string) => void) => () => {
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

  const handleCompound = useCallback(
    (setHash: (hash: string) => void) => () => {
      if (!compoundCallback) return
      showModal(<TransacitonPendingModal />)
      compoundCallback()
        .then(r => {
          hideModal()
          setHash(r.hash)
          addTransaction(r, {
            summary: `Compound MATTER`
          })
        })
        .catch(e => {
          showModal(<MessageBox type="error">{e.message}</MessageBox>)
        })
    },
    [addTransaction, compoundCallback, hideModal, showModal]
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
              {/* <Box display="grid">
                <Typography>04 h : 55 m : 02 s to next rebase</Typography>
                <Typography sx={{ color: theme => theme.palette.primary.main }}>Get MATTER at a discount</Typography>
              </Box> */}
            </Box>
            <Box display="flex" gap="20px">
              <Card gray style={{ width: '100%' }}>
                <Box padding="20px 24px" gap="28px">
                  <Typography variant="inherit" color={theme.palette.text.secondary}>
                    APY
                  </Typography>
                  <Typography fontWeight={700} fontSize={24}>
                    {apy}%
                  </Typography>
                </Box>
              </Card>
              <Card gray style={{ width: '100%' }}>
                <Box padding="20px 24px" gap="28px">
                  <Typography variant="inherit" color={theme.palette.text.secondary}>
                    Total Value Deposited
                  </Typography>
                  <Typography fontWeight={700} fontSize={24}>
                    {totalDeposited}$
                  </Typography>
                </Box>
              </Card>
            </Box>
          </Box>
        </Card>
        <Box display="grid" gridTemplateColumns=" 2fr 1.5fr 1.5fr" gap="20px" maxWidth="100%" sx={{ width: '100%' }}>
          <Card>
            <Box padding="20px 24px" gap="152px" display="grid" height="100%">
              <Box display="flex" justifyContent="space-between" width="100%">
                <Typography variant="inherit" color={theme.palette.text.secondary}>
                  MATTER Earned
                </Typography>
                {earned && earned !== '0' && (
                  <SmallButton
                    variant="outlined"
                    onClick={() => {
                      setCompoundModalOpen(true)
                    }}
                  >
                    Compound
                  </SmallButton>
                )}
              </Box>
              <Box display="flex" justifyContent="space-between" width="100%">
                <Typography fontWeight={700} fontSize={24}>
                  {earned}Matter
                </Typography>
                {account ? (
                  <>
                    {stakedBalance && +stakedBalance > 0 ? (
                      <Box display="flex" gap="8px">
                        <SmallButton
                          sx={{ height: 44, width: 44, borderRadius: '12px', padding: 0 }}
                          onClick={() => {
                            setDepositModalOpen(true)
                          }}
                        >
                          <svg viewBox="0 0 10 10" width="10" height="10">
                            <rect y="4" width="10" height="2" fill="white" />
                            <rect x="6" width="10" height="2" transform="rotate(90 6 0)" fill="white" />
                          </svg>
                        </SmallButton>
                        <SmallButton
                          sx={{ height: 44, width: 44, borderRadius: '12px', padding: 0 }}
                          onClick={() => {
                            setWithdrawModalOpen(true)
                          }}
                        >
                          <svg viewBox="0 0 10 2" width="10" height="2">
                            <rect width="10" height="2" fill="white" />
                          </svg>
                        </SmallButton>
                      </Box>
                    ) : (
                      <SmallButton
                        onClick={() => {
                          setDepositModalOpen(true)
                        }}
                      >
                        + Stake
                      </SmallButton>
                    )}
                  </>
                ) : (
                  <SmallButton onClick={toggleWalletModal}>Connect</SmallButton>
                )}
              </Box>
            </Box>
          </Card>
          <Card>
            <Box padding="20px 24px" gap="152px" display="grid" height="100%">
              <Typography variant="inherit" color={theme.palette.text.secondary}>
                My Balance
              </Typography>
              <Typography fontWeight={700} fontSize={24}>
                {matterBalance !== undefined ? matterBalance.toFixed(4) : '-'}Matter
              </Typography>
            </Box>
          </Card>

          <Card>
            <Box padding="20px 24px" gap="152px" display="grid" height="100%">
              <Typography variant="inherit" color={theme.palette.text.secondary}>
                Your Staked Balance:
              </Typography>
              <Typography fontWeight={700} fontSize={24}>
                {stakedBalance}MATTER
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
        balance={matterBalance}
      />
      <StakeActionModal
        title="Withdraw sMATTER Tokens"
        buttonActionText="Unstake"
        buttonPendingText="Pending Confirmat..."
        isOpen={withdrawModalOpen}
        onDismiss={onDismiss}
        onAction={handleUnStake}
        balance={stakedBalance}
      />
      <StakeActionModal
        title="MATTER Compound"
        buttonActionText="Comfirm"
        buttonPendingText="Confirming"
        isOpen={compoundModalOpen}
        onDismiss={onDismiss}
        onAction={handleCompound}
        balance={earned}
      />
    </>
  )
}
