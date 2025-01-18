import { defineStore } from 'pinia'
import { Wallet } from '@injectivelabs/wallet-ts'

type WalletStoreState = {}

const initialStateFactory = (): WalletStoreState => ({})

export const useWalletStore = defineStore('wallet', {
  state: (): WalletStoreState => initialStateFactory(),
  actions: {
    async connect(wallet: Wallet) {
      const sharedWalletStore = useSharedWalletStore()

      if (wallet === Wallet.Metamask) {
        await sharedWalletStore.connectMetamask()
      }

      // add keplr wallet connection here

      /*
        overrides the connected injective address with one that has balances for implementation/testing 
      */
      // sharedWalletStore.injectiveAddress = 'inj1995xnrrtnmtdgjmx0g937vf28dwefhkhy6gy5e'
    },

    async validateAndQueue() {
      const walletStore = useSharedWalletStore()

      await walletStore.validateAndQueue()
    },

    async disconnect() {
      const walletStore = useSharedWalletStore()

      await walletStore.logout()
    }
  }
})
