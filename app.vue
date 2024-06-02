<template>
  <Header v-if="!isAdmin" />
  <div>
    <NuxtPage />
  </div>
  <Footer v-if="!isAdmin" />
  <UNotifications icon="i-heroicons-check-circle" />
</template>

<script setup>
const route = useRoute()

const isAdmin = computed(() => {
  return route.path.includes('/admin')
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
