import { defineStore } from 'pinia'
// import { indexerAccountPortfolioApi } from '@shared/Service'
import { transfer } from '@/store/account/message'

type AccountStoreState = {}

const initialStateFactory = (): AccountStoreState => ({})

export const useAccountStore = defineStore('account', {
  state: (): AccountStoreState => initialStateFactory(),
  actions: {
    transfer
  }
})
