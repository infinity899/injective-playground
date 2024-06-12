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
      }
  },
  actions: {
    async fetchTokensUsdPrices() {
      const tokenStore = useTokenStore()

      tokenStore.tokenUsdPriceMap =
        await tokenPriceService.fetchUsdTokensPrice()
    }
  }
})
