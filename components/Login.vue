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
          />
        </UFormGroup>

        <UButton
          label="Login"
          color="gray"
          block
        />

        <UDivider label="OR" />

        <UButton
          class="bg-primary-200 hover:bg-primary-400"
          label="Login with Google"
          block
          @click="login"
        >
          Login with Google <Icon
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

const form = reactive({ email: 'mail@example.com', password: 'password' })

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const login = async () => {
  const redirectTo = `${window.location.origin}` + '/'
  console.log(redirectTo)

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo },
  })

  // const { data } = await supabase.auth.getUser .from('users').select('user_id, name')
  // console.log("🚀 ~ file: login.vue:74 ~ login ~ data:", data)

  if (error) {
    console.error(error)
  }
}
</script>
