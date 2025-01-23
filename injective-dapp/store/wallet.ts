import { defineStore } from 'pinia'
import {
  WalletException,
  UnspecifiedErrorCode,
  ErrorType
} from '@injectivelabs/exceptions'
import { Wallet } from '@injectivelabs/wallet-ts'
import { useSharedWalletStore } from '@shared/store/wallet'
import { walletStrategy } from '@/app/Wallet'
import { TRADING_MESSAGES } from '@/types'

type WalletStoreState = {}

const initialStateFactory = (): WalletStoreState => ({})

export const useWalletStore = defineStore('wallet', {
  state: (): WalletStoreState => initialStateFactory(),
  actions: {
    async getAddress(wallet: Wallet) {
      const sharedWalletStore = useSharedWalletStore()
      await sharedWalletStore.connectWallet(wallet)
      await sharedWalletStore.getHWAddresses(wallet)

      const addresses = sharedWalletStore.hwAddresses

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

    async validate() {
      const sharedWalletStore = useSharedWalletStore()

      const isAutoSignEnabled = !!sharedWalletStore.isAutoSignEnabled

      await sharedWalletStore.validateAndQueue()

      if (isAutoSignEnabled) {
        await sharedWalletStore.validateAutoSign(TRADING_MESSAGES)
      }
    },

    async disconnect() {
      const accountStore = useAccountStore()
      const sharedWalletStore = useSharedWalletStore()
      await sharedWalletStore.logout()
      accountStore.$reset()
    }
  }
})
