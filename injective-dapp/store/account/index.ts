import { defineStore } from 'pinia'
import { IndexerGrpcAccountPortfolioApi } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'
import { Coin } from '@injectivelabs/ts-types'
import { BigNumber, BigNumberInBase } from '@injectivelabs/utils'
import { transfer } from '@/store/account/message'
import { toBalanceInToken, formatPrice } from '@/app/utils/formatters'

const endpoints = getNetworkEndpoints(Network.Testnet)
const indexerGrpcAccountPortfolioApi = new IndexerGrpcAccountPortfolioApi(
  endpoints.indexer
)

type AccountStoreState = {
  address: string
  bankDetails: Coin[]
  addressValue: number
}

const initialStateFactory = (): AccountStoreState => ({
  address: '',
  bankDetails: [],
  addressValue: 0
})

export const useAccountStore = defineStore('account', {
  state: (): AccountStoreState => initialStateFactory(),
  getters: {
    isAuthenticated: (state) => !!state.address.length,
    getBankDetails: (state) => state.bankDetails,
    getAddressValue: (state) => {
      const tokenStore = useTokenStore()
      const totalUsd = state.bankDetails.reduce((acc, item) => {
        const token = tokenStore.tokenByDenomOrSymbol(item.denom)

        const coinGeckoId = token?.coinGeckoId || 'injective-protocol'

        const tokenPriceUsd = Number(tokenStore.tokenPrice(coinGeckoId) || 0)

        const amountAsFloat = Number(
          toBalanceInToken({
            value: item.amount,
            decimalPlaces: token?.decimals ?? 18, // fallback to 18 decimals if unknown
            fixedDecimals: 4,
            roundingMode: BigNumber.ROUND_DOWN
          })
        )

        // Multiply by the token's USD price
        return acc + tokenPriceUsd * amountAsFloat
      }, 0)

      return '$' + formatPrice(new BigNumberInBase(totalUsd), 2)
    }
  },
  actions: {
    setAddress(address: string) {
      this.address = address
    },
    async initiatePortfolio() {
      const stakeStore = useStakingStore()

      // get unlocked INJ
      const portfolio =
        await indexerGrpcAccountPortfolioApi.fetchAccountPortfolioBalances(
          this.address
        )
      // get delegated INJ
      console.log(portfolio.bankBalancesList, 'portfolio.bankBalancesList')
      const delegations = await stakeStore.fetchDelegations()
      this.bankDetails = [...portfolio.bankBalancesList, ...delegations]
    },
    transfer
  }
})
