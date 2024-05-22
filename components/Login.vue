<template>
  <!-- <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <img
      class="mx-auto h-40 w-auto"
      src="https://i.postimg.cc/yxBNZ775/1stlogo.jpg"
      alt="Your Company"
    >
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      Links Interior
    </h2>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        class="space-y-6"
        action="#"
        method="POST"
      >
        <div>
          <button
            type="button"
            class="flex w-full justify-center rounded-md bg-primary-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            @click="login"
          >
            Login
          </button>
        </div>
      </form>

    </div>
  </div> -->
  <div class="p-3">
    <UCard>
      <div class="space-y-4">
        <UFormGroup
          label="Email"
          name="email"
        >
          <UInput v-model="form.email" />
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

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const form = reactive({ email: 'mail@example.com', password: 'password' })
const { query } = useRoute()

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
