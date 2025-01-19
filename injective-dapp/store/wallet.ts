import { defineStore } from 'pinia'
import {
  WalletException,
  UnspecifiedErrorCode,
  ErrorType
} from '@injectivelabs/exceptions'
import { Wallet } from '@injectivelabs/wallet-ts'
import { walletStrategy } from '@/app/Wallet'

type WalletStoreState = {}

const initialStateFactory = (): WalletStoreState => ({})

export const useWalletStore = defineStore('wallet', {
  state: (): WalletStoreState => initialStateFactory(),
  actions: {
    async getAddress(wallet: Wallet) {
      walletStrategy.setWallet(wallet)

      const addresses = await walletStrategy.getAddresses()

      if (addresses.length === 0) {
        throw new WalletException(
          new Error('There are no addresses linked in this wallet.'),
          {
            code: UnspecifiedErrorCode,
            type: ErrorType.WalletError
          }
        )
      }

      if (!addresses.every((address) => !!address)) {
        throw new WalletException(
          new Error('There are no addresses linked in this wallet.'),
          {
            code: UnspecifiedErrorCode,
            type: ErrorType.WalletError
          }
        )
      }
      const accountStore = useAccountStore()
      accountStore.setAddress(addresses[0])
    },

    async validateAndQueue() {
      const walletStore = useSharedWalletStore()
      await walletStore.validateAndQueue()
    },

    async disconnect() {
      const accountStore = useAccountStore()
      await walletStrategy.disconnect()
      accountStore.setAddress('')
    }
  }
})
