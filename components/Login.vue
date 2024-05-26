<template>
  <div class="p-3">
    <UCard>
      <div class="space-y-4">
        <UFormGroup
          label="Email"
          name="email"
        >
          <UInput
            v-model="form.email"
            placeholder="Links@gmail.com"
            color="primary"
          />
        </UFormGroup>

        <UFormGroup
          label="Password"
          name="password"
        >
          <UInput
            v-model="form.password"
            type="password"
            placeholder="********"
          />
        </UFormGroup>

        <UButton
          label="Đăng Nhập"
          color="gray"
          block
        />

        <UDivider label="OR" />

        <UButton
          class="bg-primary-300 hover:bg-primary-400"
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
    </UCard>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const form = reactive({ email: '', password: '' })

const supabase = useSupabaseClient()

const login = async () => {
  const redirectTo = `${window.location.origin}` + '/'
  console.log(redirectTo)

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo },
  })

  if (error) {
    console.error(error)
  }
}
</script>
