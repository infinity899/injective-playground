<script setup lang="ts">
import { formatWalletAddress } from '@/app/utils/formatters'
const accountStore = useAccountStore()
const walletStore = useWalletStore()
</script>

<template>
  <div class="mb-12">
    <h1>
      {{
        $t('home.welcome', {
          address: formatWalletAddress(accountStore.address)
        })
      }}
    </h1>
    <SharedButton label="logout" @click="walletStore.disconnect()" />
  </div>
</template>

<style scoped></style>
