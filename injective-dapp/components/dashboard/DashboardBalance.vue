<script setup lang="ts">
import { BigNumber } from '@injectivelabs/utils'
import { toBalanceInToken } from '@/app/utils/formatters'
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
      </div>
    </div>
  </div>
</template>

<style scoped></style>
