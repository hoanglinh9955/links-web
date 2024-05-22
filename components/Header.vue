<template>
  <div class="flex mx-10 px-5">
    <div class="flex items-center p-3">
      <UAvatar
        size="sm"
        src="https://avatars.githubusercontent.com/u/739984?v=4"
        alt="Avatar"
      />
    </div>
    <UHorizontalNavigation
      :links="links"
    >
      <template #default="{ link }">
        <span class="group-hover:text-primary relative">{{ link.label }}</span>
      </template>
    </UHorizontalNavigation>
  </div>
  <UModal v-model="isOpen">
    <div class="p-4">
      <Login />
    </div>
  </UModal>
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

  await navigateTo('/')
}

const name = computed(
  () => user.value?.user_metadata.full_name,
)
const profile = computed(
  () => user.value?.user_metadata.avatar_url,
)

const isOpen = ref(false)
const links = ref()

links.value = [
  [{
    label: 'Trang Chủ',
    // icon: 'i-heroicons-home',
    to: '/',
  }, {
    label: 'Sản Phẩm',
    // icon: 'i-heroicons-shopping-bag',
    to: '/san-pham',
  }, {
    label: 'Liên Hệ',
    // icon: 'i-heroicons-user-group',
    to: '/lien-he',
  }],
  [{
    label: 'Giỏ Hàng',
    icon: 'i-heroicons-shopping-bag',
    badge: '1',
    to: '/gio-hang',
  }, {
    label: 'Đăng Nhập',
    icon: 'i-heroicons-users',
    click: () => {
      isOpen.value = true
    },
  }],
]

watchEffect(() => {
  if (user.value) {
    links.value = [
      [{
        label: 'Trang Chủ',
        // icon: 'i-heroicons-home',
        to: '/',
      }, {
        label: 'Sản Phẩm',
        // icon: 'i-heroicons-shopping-bag',
        to: '/san-pham',
      }, {
        label: 'Liên Hệ',
        // icon: 'i-heroicons-user-group',
        to: '/lien-he',
      }],
      [{
        label: 'Giỏ Hàng',
        icon: 'i-heroicons-shopping-bag',
        badge: '1',
        to: '/gio-hang',
      },
      {
        label: name.value,
        avatar: {
          src: profile,
        },
      }, {
        label: '',
        icon: 'i-heroicons-arrow-right-start-on-rectangle',
        click: () => {
          console.log('logout')
          logout()
        },
      }],
    ]
  }
})

watchEffect(() => {
  if (!user.value) {
    links.value = [
      [{
        label: 'Trang Chủ',
        // icon: 'i-heroicons-home',
        to: '/',
      }, {
        label: 'Sản Phẩm',
        // icon: 'i-heroicons-shopping-bag',
        to: '/san-pham',
      }, {
        label: 'Liên Hệ',
        // icon: 'i-heroicons-user-group',
        to: '/lien-he',
      }],
      [{
        label: 'Giỏ Hàng',
        icon: 'i-heroicons-shopping-bag',
        badge: '1',
        to: '/gio-hang',
      }, {
        label: 'Đăng Nhập',
        icon: 'i-heroicons-users',
        click: () => {
          isOpen.value = true
        },
      }],
    ]
  }
})
</script>
