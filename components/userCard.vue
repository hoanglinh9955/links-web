<template>
  <div
    v-if="user"
    class="rounded p-3 flex justify-between space-x-3 bg-gray-100"
  >
    <img
      class="rounded-full w-12 h-12 border-2 border-primary-500 "
      :src="profile"
    >
    <div class="text-right">
      <h1 class="font-medium">
        {{ name }}
      </h1>
      <button
        class="text-sm underline text-slate-500"
        @click="logout"
      >
        Log out
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error(error)
    return
  }

  await navigateTo('/admin/login')
}

const name = computed(
  () => user.value?.user_metadata.full_name,
)
const profile = computed(
  () => user.value?.user_metadata.avatar_url,
)
</script>
