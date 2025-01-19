<script setup lang="ts">
import { Wallet } from '@injectivelabs/wallet-ts'

const walletStore = useWalletStore()
const login = async (wallet: Wallet) => {
  await walletStore.getAddress(wallet)
}
</script>

<template>
  <button @click="login(Wallet.Metamask)">log in with Metamask</button>
  <button @click="login(Wallet.Keplr)">log in with Keplr</button>
</template>

<style scoped></style>
