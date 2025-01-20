import { defineStore } from 'pinia'
import { IndexerGrpcAccountPortfolioApi } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'
import { Coin } from '@injectivelabs/ts-types'
import { transfer } from '@/store/account/message'

const endpoints = getNetworkEndpoints(Network.Testnet)
const indexerGrpcAccountPortfolioApi = new IndexerGrpcAccountPortfolioApi(
  endpoints.indexer
)

type AccountStoreState = {
  address: string
  bankDetails: Coin[]
}

const initialStateFactory = (): AccountStoreState => ({
  address: '',
  bankDetails: []
})

export const useAccountStore = defineStore('account', {
  state: (): AccountStoreState => initialStateFactory(),
  getters: {
    isAuthenticated: (state) => !!state.address.length,
    getBankDetails: (state) => state.bankDetails
  },
  actions: {
    setAddress(address: string) {
      this.address = address
    },
    async setPortfolio() {
      const portfolio =
        await indexerGrpcAccountPortfolioApi.fetchAccountPortfolioBalances(
          this.address
        )
      this.bankDetails = [...portfolio.bankBalancesList]
      console.log(portfolio)
    },
    transfer
  }
})
