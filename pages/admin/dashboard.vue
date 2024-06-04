<template>
  <div>
    <div
      v-if="isAdmin"
      class="flex"
    >
      <div class="w-1/6 h-screen bg-gray-200 p-2 flex flex-col justify-between">
        <div class="w-full flex flex-col space-y-10 items-center">
          <img
            class="w-40"
            src="~/public/logo.png"
            alt="img"
          >
          <UVerticalNavigation
            :ui="{
              label: 'text-lg',
            }"
            class="w-full"
            :links="links"
          />
        </div>
        <ClientOnly>
          <div>
            <UserCard />
          </div>
        </ClientOnly>
      </div>
      <div class="w-5/6 h-screen overflow-y-auto">
        <NuxtPage />
      </div>
    </div>
    <div v-else>
      <UProgress animation="carousel" />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

const isAdmin = ref(false)

// auth
const supabase = useSupabaseClient()
const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (!error) {
    const router = useRouter()
    router.push('/admin/login')
  }
}

onMounted(async () => {
  const user = useSupabaseUser()
  const name = user.value?.email

  if (name && (name === 'hoanglinh9955@gmail.com' || name === 'ngancyndy@gmail.com')) {
    isAdmin.value = true
    const router = useRouter()
    router.push('/admin/dashboard/home')
  }
  else {
    await logout()
  }
})

const links = [{
  label: 'Trang Chủ',
  icon: 'i-heroicons-home',
  to: '/admin/dashboard/home',
}]
</script>
