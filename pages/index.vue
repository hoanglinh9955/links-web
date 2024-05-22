<template>
  <div>
    <UContainer class="flex justify-center space-x-5 py-5">
      <CartContainer />
      <CartContainer />
      <CartContainer />
      <CartContainer />
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
import CartContainer from '~/components/Cart-Container.vue'

const supabase = useSupabaseClient()
const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error(error)
    return
  }

  await navigateTo('/login')
}
const user = useSupabaseUser()
console.log('🚀 ~ user:', user)
const name = user.value?.user_metadata.full_name
console.log('🚀 ~ name:', name)
</script>

<style>

</style>
