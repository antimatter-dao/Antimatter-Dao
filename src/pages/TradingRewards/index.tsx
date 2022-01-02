import { useState, useCallback, useMemo } from 'react'
import { useActiveWeb3React } from 'hooks'
import useModal from 'hooks/useModal'
import Card from 'components/Card/Card'
import NumericalCard from 'components/Card/NumericalCard'
import { ReactComponent as BullAndBear } from 'assets/svg/bull_and_bear_icon.svg'
import { Typography, Box, Grid } from '@mui/material'
import Button, { BlackButton } from 'components/Button/Button'
import TextButton from 'components/Button/TextButton'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import StakeActionModal from 'pages/Stake/StakeActionModal'
import { getInvestRewardSignByNonce, useGetRewardClaimNonces, useInvestRewardData } from 'hooks/useInvestReward'
import { CURRENT_SUPPORTED_CHAINS, REWARD_INVEST_ADDRESS } from '../../constants'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { Dots, ExternalLink } from 'theme/components'
import { useWalletModalToggle } from 'state/application/hooks'
import { triggerSwitchChain } from 'utils/triggerSwitchChain'
import { ChainListMap } from 'constants/chain'
import { useIsRewardInvestClaimPending, useRewardInvestClaimCallback } from 'hooks/useRewardInvestClaimCallback'
import TransacitonPendingModal from 'components/Modal/TransactionModals/TransactionPendingModal'
import MessageBox from 'components/Modal/TransactionModals/MessageBox'
import TransactionSubmittedModal from 'components/Modal/TransactionModals/TransactiontionSubmittedModal'

const Tag = ({ k, v }: { k: string; v: string }) => {
  return (
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
  )
}

export default function TradingRewards() {
  const { chainId, library, account } = useActiveWeb3React()
  const [rewardsCurrency] = useState('Matter')
  // const [rewardPool] = useState('-')
  const [claimed, setClaimed] = useState(false)

  const { showModal, hideModal } = useModal()

  const onInvest = useCallback(() => {}, [])
  const toggleWalletModal = useWalletModalToggle()

  const claimPending = useIsRewardInvestClaimPending()

  const rewardMatter = useInvestRewardData()
  const [approvalState, approveCallback] = useApproveCallback(
    rewardMatter?.rewards,
    REWARD_INVEST_ADDRESS[chainId || 1] || undefined
  )
  const { result: claimNonce } = useGetRewardClaimNonces()

  const onClaimRewardCallback = useRewardInvestClaimCallback()
  const onClaimReward = useCallback(
    (setHash: (hash: string) => void) => async () => {
      if (!rewardMatter?.rewards || !rewardMatter.rewards.greaterThan('0') || !account || !chainId) {
        return
      }

      showModal(<TransacitonPendingModal />)

      const args = {
        account: '',
        amount: '',
        nonce: ''
      }
      const signArr: string[] = []
      try {
        const signData = await getInvestRewardSignByNonce(
          account,
          rewardMatter.rewards.raw.toString(),
          chainId,
          claimNonce
        )
        if (signData.data.code !== 0) {
          showModal(<MessageBox type="error">Fetch sign faild</MessageBox>)
          return
        }
        signArr.push(signData.data.data.signatory)
        signArr.push(signData.data.data.signV)
        signArr.push(signData.data.data.signR)
        signArr.push(signData.data.data.signS)

        args.account = signData.data.data.account
        args.amount = signData.data.data.amount
        args.nonce = signData.data.data.nonce.toString()
      } catch (error) {
        showModal(<MessageBox type="error">Fetch sign faild</MessageBox>)
        return
      }
      onClaimRewardCallback(args.account, args.amount, args.nonce, signArr)
        .then(r => {
          hideModal()
          setHash(r.hash)
          showModal(<TransactionSubmittedModal hash={r.hash} />)
          setClaimed(true)
        })
        .catch(e => {
          console.error(e)
          showModal(<MessageBox type="error">{e.message}</MessageBox>)
        })
    },
    [account, chainId, claimNonce, hideModal, onClaimRewardCallback, rewardMatter, showModal]
  )

  const onClaim = useCallback(() => {
    showModal(
      <StakeActionModal
        title="MATTER Compound"
        buttonActionText="Comfirm"
        buttonPendingText="Confirming"
        onDismiss={() => hideModal()}
        onAction={onClaimReward}
        balance={rewardMatter?.rewards?.toSignificant()}
      />
    )
  }, [showModal, onClaimReward, rewardMatter, hideModal])

  const currentSupportChain = CURRENT_SUPPORTED_CHAINS.reward[0] || 1
  const [supportChain, switchToSupportChain] = useMemo(() => {
    if (!chainId || !account || !library) return [false, () => {}]
    if (CURRENT_SUPPORTED_CHAINS.reward.includes(chainId)) {
      return [true, () => {}]
    }
    return [
      false,
      () => {
        triggerSwitchChain(library, currentSupportChain, account)
      }
    ]
  }, [account, chainId, currentSupportChain, library])

  const getActions = useMemo(() => {
    if (!account) {
      return (
        <Button onClick={toggleWalletModal} height="60px">
          Connect Wallet
        </Button>
      )
    }
    if (!supportChain) {
      return (
        <Button onClick={switchToSupportChain} height="60px">
          Switch to {ChainListMap[currentSupportChain as number]?.symbol}
        </Button>
      )
    }
    if (claimPending) {
      return (
        <Button disabled height="60px">
          Claim
          <Dots />
        </Button>
      )
    }
    if (claimed) {
      return (
        <Button disabled height="60px">
          Claim All Rewards
        </Button>
      )
    }
    if (!rewardMatter?.rewards || !rewardMatter.rewards.greaterThan('0')) {
      return (
        <Box display="flex" gap={8}>
          <Button disabled height="60px">
            Claim All Rewards
          </Button>
        </Box>
      )
    }
    if (approvalState !== ApprovalState.APPROVED) {
      if (approvalState === ApprovalState.PENDING) {
        return (
          <Button disabled>
            Approve
            <Dots />
          </Button>
        )
      } else if (approvalState === ApprovalState.NOT_APPROVED) {
        return (
          <Button onClick={approveCallback} height="60px">
            Approve
          </Button>
        )
      } else {
        return (
          <Button disabled>
            Loading
            <Dots />
          </Button>
        )
      }
    }

    return (
      <Box display="flex" gap={8}>
        <Button onClick={onClaim} height="60px">
          Claim All Rewards
        </Button>
      </Box>
    )
  }, [
    account,
    approvalState,
    approveCallback,
    claimPending,
    claimed,
    currentSupportChain,
    onClaim,
    rewardMatter,
    supportChain,
    switchToSupportChain,
    toggleWalletModal
  ])

  return (
    <>
      <Card width="100%">
        <Box display="flex" justifyContent="space-between" height={132} padding="26px 24px">
          <Box display="flex" alignItems="center">
            <BullAndBear />
            <Typography fontSize={24} fontWeight={700} ml={20}>
              Dual Investment
            </Typography>
          </Box>
          <Box display="flex" gap="12px">
            {/* <Tag k="Estimated APR" v={`${apr}%`} /> */}
            <Tag k="Rewards in" v={rewardsCurrency} />
          </Box>
        </Box>
      </Card>
      <Box display="flex" gap={20} mt={24}>
        <NumericalCard
          title="Total Claimable Rewards"
          value={rewardMatter?.rewards?.toSignificant() || '--'}
          fontSize="44px"
          unit="MATTER"
          height={344}
          width={388}
          actions={getActions}
        />
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <NumericalCard
              title="My total volume of invested"
              value={rewardMatter?.totalInvest ? rewardMatter.totalInvest.toSignificant() : '--'}
              unit="$"
              height={168}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumericalCard
              title="My total amount of invested"
              value={'16'}
              height={168}
              actions={
                <Typography fontSize={12} fontWeight={500} color="#7D7D7D">
                  25 MATTER rewards for every investment subscribed
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Card>
              <Box padding="22px 24px" height={168}>
                <Typography
                  sx={{
                    color: theme => theme.palette.text.primary,
                    fontSize: 14,
                    fontWeight: 500
                  }}
                >
                  Investing Rewards
                </Typography>
                <Typography
                  sx={{
                    color: theme => theme.bgColor.bg1,
                    opacity: 0.5,
                    fontSize: 14,
                    mt: 16
                  }}
                >
                  Rewards are calculated based on your investment amount in &quot;Dual Investment&quot;
                </Typography>
                <Box display="flex" alignItems="center" gap="20px" mt={23}>
                  <ExternalLink href="https://invest.antimatter.finance/">
                    <BlackButton
                      onClick={onInvest}
                      width="100px"
                      height="32px"
                      style={{ borderRadius: '50px', fontSize: 14 }}
                    >
                      Invest
                    </BlackButton>
                  </ExternalLink>
                  <TextButton>
                    <ExternalLink href="https://dao.antimatter.finance/#/" style={{ color: 'inherit' }}>
                      <Box display="flex" alignItems="center">
                        <Typography fontSize={14} fontWeight={500}>
                          Learn more
                        </Typography>
                        <ArrowForwardIosIcon sx={{ fontSize: 12, ml: 2 }} />
                      </Box>
                    </ExternalLink>
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
