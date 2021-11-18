import { Web3Provider } from '@ethersproject/providers'
import { ChainId, SUPPORTED_NETWORKS } from 'constants/chain'

export function triggerSwitchChain(library: Web3Provider | undefined, chainId: ChainId, account: string) {
  if ([ChainId.MAINNET, ChainId.ROPSTEN, ChainId.RINKEBY, ChainId.KOVAN].includes(chainId)) {
    library?.send('wallet_switchEthereumChain', [{ chainId: SUPPORTED_NETWORKS[chainId as ChainId]?.chainId }, account])
  } else {
    const params = SUPPORTED_NETWORKS[chainId as ChainId]
    library?.send('wallet_addEthereumChain', [params, account])
  }
}
