<script setup lang="ts">
import { BigNumber } from '@injectivelabs/utils'
import { injToken } from '@shared/data/token'
import { toBalanceInToken } from '@/app/utils/formatters'

const tokenStore = useTokenStore()

const accountStore = useAccountStore()
onMounted(async () => {
  await tokenStore.fetchTokensUsdPrices()
})
</script>

<template>
  <div>
    <div>
      <h1>{{ $t('home.balance') }}</h1>
    </div>
    <div v-for="(item, index) in accountStore.getBankDetails" :key="index">
      <div>
        {{ item.denom }}
        {{
          toBalanceInToken({
            value: item.amount,
            decimalPlaces: 18,
            fixedDecimals: 4,
            roundingMode: BigNumber.ROUND_DOWN
          })
        }}
        {{
          '$' +
          Number(tokenStore.tokenPrice(injToken.coinGeckoId)) *
            Number(
              toBalanceInToken({
                value: item.amount,
                decimalPlaces: 18,
                fixedDecimals: 4,
                roundingMode: BigNumber.ROUND_DOWN
              })
            )
        }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
