<script setup lang="ts">
import { BigNumber } from '@injectivelabs/utils'
import { toBalanceInToken } from '@/app/utils/formatters'
import { getInjUsdtPerpOraclePrice } from '@/app/Service'

async function getInjUsdPrice() {
  const price = await getInjUsdtPerpOraclePrice()
  return price.price
}

const price = await getInjUsdPrice()

const accountStore = useAccountStore()
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
          Number(price) *
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
