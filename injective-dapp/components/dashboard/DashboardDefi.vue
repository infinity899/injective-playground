<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { BigNumberInBase } from '@injectivelabs/utils'
import { useSharedNotificationStore } from '@shared/store/notification'
import { sharedDelayPromiseCall } from '@shared/utils/async'
const sharedNotificationStore = useSharedNotificationStore()

const accountStore = useAccountStore()
const tokenStore = useTokenStore()

const selectedDenom = ref('')
const transferAmount = ref('')
const destinationAddress = ref('')

const availableDenoms = computed(() =>
  accountStore.getBankDetails.map((detail) => detail.denom)
)

const clearDefiState = () => {
  selectedDenom.value = ''
  transferAmount.value = ''
  destinationAddress.value = ''
}
const handleTransfer = async () => {
  if (!selectedDenom.value) {
    sharedNotificationStore.error({
      title: 'Please select a token.'
    })
    return
  }
  if (!transferAmount.value) {
    sharedNotificationStore.error({
      title: 'Please enter an amount.'
    })
    return
  }
  if (!destinationAddress.value) {
    sharedNotificationStore.error({
      title: 'Please enter a recipient address (inj1...).'
    })
    return
  }

  try {
    const token = tokenStore.tokenByDenomOrSymbol(selectedDenom.value)
    if (!token) {
      sharedNotificationStore.error({
        title: 'Could not find matching token in store.'
      })
      return
    }

    const amountAsBigNumber = new BigNumberInBase(transferAmount.value)

    await accountStore.transfer({
      amount: amountAsBigNumber,
      denom: selectedDenom.value,
      token,
      destination: destinationAddress.value
    })

    sharedNotificationStore.success({ title: 'Transfer has been successfully' })
    clearDefiState()
    await sharedDelayPromiseCall(
      () => accountStore.initiatePortfolio(),
      2 * 1000
    )
  } catch (error) {
    sharedNotificationStore.error({ title: 'Transfer failed.' })
  }
}

onMounted(async () => {
  await tokenStore.fetchTokensUsdPrices()

  // Default the selectedDenom to the first available in bank details:
  if (accountStore.getBankDetails.length > 0) {
    selectedDenom.value = accountStore.getBankDetails[0].denom
  }
})
</script>

<template>
  <div class="p-4 space-y-4">
    <h2 class="text-lg font-bold text-primary-500">Transfer Tokens</h2>

    <label class="block space-y-1">
      <span class="text-sm font-semibold text-gray-700">Select Coin</span>
      <select
        v-model="selectedDenom"
        class="block w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-400"
      >
        <option v-for="denom in availableDenoms" :key="denom" :value="denom">
          {{ tokenStore.tokenByDenomOrSymbol(denom)?.name || denom }}
        </option>
      </select>
    </label>

    <label class="block space-y-1">
      <span class="text-sm font-semibold text-gray-700">Amount</span>
      <input
        v-model="transferAmount"
        type="number"
        min="0"
        step="0.0001"
        class="block w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-400"
      />
    </label>

    <label class="block space-y-1">
      <span class="text-sm font-semibold text-gray-700"
        >Destination Address</span
      >
      <input
        v-model="destinationAddress"
        type="text"
        placeholder="inj1..."
        class="block w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-400"
      />
    </label>

    <div>
      <button
        class="px-4 py-2 bg-primary-500 text-white font-semibold rounded hover:bg-primary-600"
        @click="handleTransfer"
      >
        Transfer
      </button>
    </div>
  </div>
</template>

<style scoped></style>
