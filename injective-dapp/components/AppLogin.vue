<script setup lang="ts">
import { Wallet } from '@injectivelabs/wallet-ts'

const walletStore = useWalletStore()
const login = async (wallet: Wallet) => {
  await walletStore.getAddress(wallet)
}
</script>

<template>
  <SharedButton
    class="mr-2"
    label="log in with Keplr"
    @click="login(Wallet.Keplr)"
  />
  <SharedButton label="log in with Metamask" @click="login(Wallet.Metamask)" />
</template>

<style scoped></style>
