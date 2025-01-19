<script lang="ts" setup>
const accountStore = useAccountStore()
</script>

<template>
  <SharedConfetti v-if="accountStore.isAuthenticated" />
  <AppLogin v-if="!accountStore.isAuthenticated" />
  <AppDashboard v-if="accountStore.isAuthenticated" />
</template>
