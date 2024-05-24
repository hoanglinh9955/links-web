<template>
  <Header />
  <div>
    <NuxtPage />
  </div>
  <Footer />
  <UNotifications icon="i-heroicons-check-circle" />
</template>

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