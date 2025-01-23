<script lang="ts" setup>
const accountStore = useAccountStore()
</script>

<template>
  <SharedConfetti v-if="accountStore.isAuthenticated" />
  <AppLogin v-if="!accountStore.isAuthenticated" />
  <AppDashboard v-if="accountStore.isAuthenticated" />
  <SharedNotifications
    class="z-[1110] fixed inset-0 flex flex-col gap-2 justify-end items-end p-6 pointer-events-none"
  >
    <template #notification="{ notification }">
      <SharedNotification
        :notification="notification"
        class="pointer-events-auto bg-brand-900"
        wrapper-class="bg-brand-900 border-brand-700 border"
      >
        <template #close="{ closeNotification }">
          <SharedIcon
            name="close-bold"
            class="min-w-4 hover:text-blue-500 text-white w-4 h-4"
            @click="closeNotification"
          />
        </template>
      </SharedNotification>
    </template>
  </SharedNotifications>
</template>
