import { defineStore } from 'pinia'
// import { indexerAccountPortfolioApi } from '@shared/Service'
import { transfer } from '@/store/account/message'

type AccountStoreState = {
  address: string
}

const initialStateFactory = (): AccountStoreState => ({
  address: ''
})

export const useAccountStore = defineStore('account', {
  state: (): AccountStoreState => initialStateFactory(),
  getters: {
    isAuthenticated: (state) => !!state.address.length
  },
  actions: {
    setAddress(address: string) {
      this.address = address
    },
    transfer
  }
})
