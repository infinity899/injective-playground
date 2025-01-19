<script setup lang="ts">
const accountStore = useAccountStore()
const walletStore = useWalletStore()
</script>

<template>
  <h1>{{ $t('home.welcome', { address: accountStore.address }) }}</h1>
  <button @click="walletStore.disconnect()">logout</button>
</template>

<style scoped></style>
