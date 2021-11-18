import { useMemo } from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { useTheme, Box, styled, Typography } from '@mui/material'
import { NetworkContextName } from '../../constants'
import useENSName from '../../hooks/useENSName'
import { useWalletModalToggle } from '../../state/application/hooks'
import { isTransactionRecent, useAllTransactions } from '../../state/transactions/hooks'
import { TransactionDetails } from '../../state/transactions/reducer'
import { shortenAddress } from '../../utils'
import WalletModal from 'components/Modal/WalletModal/index'
import Spinner from 'components/Spinner'
import { BlackButton } from 'components/Button/Button'
import { SUPPORTED_WALLETS } from 'constants/index'
import { injected } from 'connectors/'
import { useActiveWeb3React } from 'hooks/'
import { ReactComponent as Web3StatusIcon } from 'assets/svg/web3status_icon.svg'

const ActionButton = styled(BlackButton)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  fontSize: '14px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: 320,
    width: '100%',
    borderRadius: 49,
    height: '40px'
  }
}))

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

function Web3StatusInner() {
  const { account, error } = useWeb3React()
  const { ENSName } = useENSName(account ?? undefined)
  const allTransactions = useAllTransactions()
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])
  const pending = sortedRecentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash)
  const hasPendingTransactions = !!pending.length
  const toggleWalletModal = useWalletModalToggle()
  const theme = useTheme()
  const { connector } = useActiveWeb3React()

  function formatConnectorName() {
    const { ethereum } = window
    const isMetaMask = !!(ethereum && ethereum.isMetaMask)
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        k =>
          SUPPORTED_WALLETS[k].connector === connector && (connector !== injected || isMetaMask === (k === 'METAMASK'))
      )
      .map(k => SUPPORTED_WALLETS[k].name)[0]
    return <Typography sx={{ fontSize: 12, opacity: 0.6 }}>Connected with {name}</Typography>
  }

  if (account) {
    return (
      <Box sx={{ cursor: 'pointer' }} style={{ marginBottom: 15 }} onClick={toggleWalletModal}>
        {formatConnectorName()}
        <Box
          sx={{
            width: 160,
            height: 32,
            borderRadius: '46px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: theme.palette.background.default,
            mt: 8
          }}
        >
          <Web3StatusIcon />
          {hasPendingTransactions ? (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 8 }}>
              <Spinner color={theme.textColor.text1} size="16px" />
              <Box component="span" sx={{ ml: 3 }}>
                <Typography sx={{ fontSize: 14, ml: 8 }}>{pending?.length} Pending</Typography>
              </Box>
            </Box>
          ) : (
            <Typography sx={{ fontSize: 14, ml: 8 }}>{ENSName || shortenAddress(account)}</Typography>
          )}
        </Box>
      </Box>
    )
  } else if (error) {
    return (
      <ActionButton width="140px" height="36px" style={{ marginBottom: 15 }} onClick={toggleWalletModal}>
        {error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error'}
      </ActionButton>
    )
  } else {
    return (
      <ActionButton width="140px" height="36px" style={{ marginBottom: 15 }} onClick={toggleWalletModal}>
        Connect Wallet
      </ActionButton>
    )
  }
}

export default function Web3Status() {
  const { active, account } = useWeb3React()
  const contextNetwork = useWeb3React(NetworkContextName)

  const { ENSName } = useENSName(account ?? undefined)

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash)
  const confirmed = sortedRecentTransactions.filter(tx => tx.receipt).map(tx => tx.hash)

  if (!contextNetwork.active && !active) {
    return null
  }

  return (
    <>
      <Web3StatusInner />
      <WalletModal ENSName={ENSName ?? undefined} pendingTransactions={pending} confirmedTransactions={confirmed} />
    </>
  )
}
