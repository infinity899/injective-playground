import { WalletStrategy } from '@injectivelabs/wallet-ts'
import { EthereumChainId, ChainId } from '@injectivelabs/ts-types'

const chainId = ChainId.Testnet // The Injective Chain chainId
export const alchemyRpcEndpoint = `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`
export const walletStrategy = new WalletStrategy({
  chainId,
  ethereumOptions: {
    ethereumChainId: EthereumChainId.Sepolia,
    rpcUrl: alchemyRpcEndpoint
  }
})
