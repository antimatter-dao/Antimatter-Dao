import { NetworkConnector } from './NetworkConnector'
import { Web3Provider } from '@ethersproject/providers'

const MainNetwork = new NetworkConnector({
  urls: { 1: process.env.REACT_APP_NETWORK_URL || 'https://mainnet.infura.io/v3/4bf032f2d38a4ed6bb975b80d6340847' }
})
const RinkebyNetwork = new NetworkConnector({
  urls: { 4: 'https://rinkeby.infura.io/v3/ab440a3a67f74b6b8a0a8e8e13a76a52' }
})
const KovanNetwork = new NetworkConnector({
  urls: { 42: 'https://kovan.infura.io/v3/ab440a3a67f74b6b8a0a8e8e13a76a52' }
})
const BSCNetwork = new NetworkConnector({
  urls: { 56: 'https://bsc-dataseed3.binance.org' }
})

export function getOtherNetworkLibrary(chainId: number) {
  switch (chainId) {
    case 1:
      return new Web3Provider(MainNetwork.provider as any)
    case 4:
      return new Web3Provider(RinkebyNetwork.provider as any)
    case 42:
      return new Web3Provider(KovanNetwork.provider as any)
    case 56:
      return new Web3Provider(BSCNetwork.provider as any)
    default:
      return undefined
  }
}
