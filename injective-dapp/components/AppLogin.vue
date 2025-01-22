<script setup lang="ts">
import { Wallet } from '@injectivelabs/wallet-ts'

const walletStore = useWalletStore()
const accountStore = useAccountStore()
const connectToChain = async (wallet: Wallet) => {
  await walletStore.getAddress(wallet)
  await accountStore.initiatePortfolio()
}
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <SharedButton
      class="mr-2"
      label="log in with Keplr"
      @click="connectToChain(Wallet.Keplr)"
    />
    <SharedButton
      label="log in with Metamask"
      @click="connectToChain(Wallet.Metamask)"
    />
  </div>
</template>

<style scoped></style>
