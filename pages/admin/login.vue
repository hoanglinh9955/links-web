<template>
  <div class="flex flex-col justify-center items-center h-screen space-y-8">
    <h1 class="text-3xl font-bold">
      Admin Page
    </h1>
    <UButton
      class="bg-primary-300 hover:bg-primary-400 w-60 h-14"
      label="Login with Google"
      block
      @click="login"
    >
      Đăng Nhập Với Google <Icon
        icon="tabler:brand-google-filled"
        width="1.2em"
        height="1.2em"
      />
    </UButton>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const supabase = useSupabaseClient()

const login = async () => {
  const redirectTo = `${window.location.origin}` + '/admin/dashboard'

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo },
  })

  if (error) {
    console.error(error)
  }
}
</script>
