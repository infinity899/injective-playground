<script setup lang="ts">
import {
  BigNumber,
  BigNumberInBase,
  BigNumberInWei
} from '@injectivelabs/utils'
import {
  toBalanceInToken,
  formatPrice,
  formatAmount
} from '@/app/utils/formatters'

const tokenStore = useTokenStore()

const accountStore = useAccountStore()
onMounted(async () => {
  await tokenStore.fetchTokensUsdPrices()
})
</script>

<template>
  <div class="p-4 space-y-4">
    <div>
      <h2 class="text-md font-bold text-primary-500">
        {{ $t('home.balance') }}
      </h2>
      <h1 class="text-xl text-primary-500 font-bold">
        {{ accountStore.getAddressValue }}
      </h1>
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
            formatAmount(
              new BigNumberInWei(item.amount).toBase(
                tokenStore.tokenByDenomOrSymbol(item.denom)?.decimals ?? 18
              ),
              4
            )
          }}
        </div>

        <div class="text-sm text-indigo-300">
          <span class="font-semibold mr-1">{{ $t('home.value') }}</span>
          {{
            '$' +
            formatPrice(
              new BigNumberInBase(
                tokenStore.tokenPrice(
                  tokenStore.tokenByDenomOrSymbol(item.denom)?.coinGeckoId ??
                    'injective-protocol'
                ) || 0
              ).times(
                new BigNumberInBase(
                  toBalanceInToken({
                    value: item.amount,
                    decimalPlaces:
                      tokenStore.tokenByDenomOrSymbol(item.denom)?.decimals ??
                      18,
                    fixedDecimals: 2,
                    roundingMode: BigNumber.ROUND_DOWN
                  })
                )
              ),
              2 // 2 decimals
            )
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
