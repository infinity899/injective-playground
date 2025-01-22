<script setup lang="ts">
import { BigNumber } from '@injectivelabs/utils'
import { toBalanceInToken } from '@/app/utils/formatters'

const tokenStore = useTokenStore()

const accountStore = useAccountStore()
onMounted(async () => {
  await tokenStore.fetchTokensUsdPrices()
})
</script>

<template>
  <div class="p-4 space-y-4">
    <div>
      <h1 class="text-xl font-bold text-primary-500">
        {{ $t('home.balance') }}
      </h1>
      <h2 class="text-sm text-primary-500 font-bold">
        {{ accountStore.getAddressValue }}
      </h2>
    </div>

    <div>
      <h2 class="text-lg font-semibold text-indigo-300">
        {{ $t('home.assets') }}
      </h2>
    </div>

    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <div
        v-for="(item, index) in accountStore.getBankDetails"
        :key="index"
        class="rounded border shadow p-4 hover:shadow-md transition-shadow"
      >
        <div class="text-indigo-300 font-medium mb-2">
          {{ tokenStore.tokenByDenomOrSymbol(item.denom)?.name || item.denom }}
        </div>

        <div class="text-sm text-indigo-300 mb-1">
          <span class="font-semibold mr-1">Amount:</span>
          {{
            toBalanceInToken({
              value: item.amount,
              decimalPlaces:
                tokenStore.tokenByDenomOrSymbol(item.denom)?.decimals ?? 18,
              fixedDecimals: 4,
              roundingMode: BigNumber.ROUND_DOWN
            })
          }}
        </div>

        <div class="text-sm text-indigo-300">
          <span class="font-semibold mr-1">{{ $t('home.value') }}</span>
          {{
            '$' +
            Number(
              tokenStore.tokenPrice(
                tokenStore.tokenByDenomOrSymbol(item.denom)?.coinGeckoId ??
                  'injective-protocol'
              )
            ) *
              Number(
                toBalanceInToken({
                  value: item.amount,
                  decimalPlaces:
                    tokenStore.tokenByDenomOrSymbol(item.denom)?.decimals ?? 18,
                  fixedDecimals: 4,
                  roundingMode: BigNumber.ROUND_DOWN
                })
              )
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
