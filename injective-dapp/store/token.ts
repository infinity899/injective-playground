import { defineStore } from 'pinia'
import { TokenStatic } from '@injectivelabs/sdk-ts'
import { tokenPriceService } from '@shared/Service'
import { tokenFactoryStatic } from '@/app/Service'

type TokenStoreState = {
  tokens: TokenStatic[]
  tokenUsdPriceMap: Record<string, number>
}

const initialStateFactory = (): TokenStoreState => ({
  tokens: [],
  tokenUsdPriceMap: {}
})

export const useTokenStore = defineStore('token', {
  state: (): TokenStoreState => initialStateFactory(),
  getters: {
    tokenByDenomOrSymbol:
      () =>
      (denomOrSymbol: string): TokenStatic | undefined => {
        if (!denomOrSymbol) {
          return
        }

        return tokenFactoryStatic.toToken(denomOrSymbol)
      },
    tokenPrice:
      (state) =>
      (coinGeckoId: string): number | undefined => {
        return state.tokenUsdPriceMap[coinGeckoId]
      }
  },
  actions: {
    async fetchTokensUsdPrices() {
      const pricesMap = await tokenPriceService.fetchUsdTokensPrice([
        'injective-protocol'
      ])
      this.tokenUsdPriceMap = pricesMap
    }
  }
})
