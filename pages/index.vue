<template>
  <div>
    trang chu
    <img src="https://s4.shopbay.vn/files/23/dx118c-64128b376a7b6.jpg">
  </div>
</template>

<script lang="ts" setup>
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
