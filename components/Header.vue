<template>
  <div class="flex mx-10 px-5">
    <div class="flex items-center p-3">
      <NuxtLink
        to="/"
      >
        <img src="../public/logo.png">
      </NuxtLink>
    </div>
    <ClientOnly>
      <UHorizontalNavigation
        :links="links"
      >
        <template #default="{ link }">
          <span class="group-hover:text-primary-200 relative">{{ link.label }}</span>
        </template>
      </UHorizontalNavigation>
    </ClientOnly>
    <UModal v-model="isOpen">
      <div class="p-4">
        <Login />
      </div>
    </UModal>
    <UModal v-model="isSearch">
      <div class="p-4">
        <UInput
          v-model="searchValue"
          icon="i-heroicons-magnifying-glass-20-solid"
          placeholder="Nhập Tên Sản Phẩm Để Tìm Kiếm"
          @keyup.enter="goToSearch"
        />
      </div>
    </UModal>
  </div>
</template>

<script setup>
import { reloadState } from '~/stores/storeModal'

const route = useRoute()
const reload = storeToRefs(reloadState()).reloadState
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const cartNum = ref('')
const searchValue = ref('')
const goToSearch = () => {
  isSearch.value = false
  navigateTo(`/tim-kiem/${searchValue.value}`)
}
// check cart in local storage
if (typeof window !== 'undefined') {
  const value = window.localStorage.getItem('cart-links')
  const data = JSON.parse(value)
  if (data != null) {
    const num = data.length
    cartNum.value = num.toString()
  }
}
// reload when user add to cart
watch(reload, async () => {
  const data = JSON.parse(window.localStorage.getItem('cart-links'))
  const num = data.length
  cartNum.value = num.toString()
})

const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error(error)
    return
  }

  await navigateTo(route.fullPath)
}

const name = computed(
  () => user.value?.user_metadata.full_name,
)
const profile = computed(
  () => user.value?.user_metadata.avatar_url,
)

const isOpen = ref(false)
const isSearch = ref(false)
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
  }, {
    label: '',
    icon: 'i-heroicons-magnifying-glass',
    click: () => {
      isSearch.value = true
    },
  }],
  [{
    label: 'Giỏ Hàng',
    icon: 'i-heroicons-shopping-bag',
    badge: cartNum.value,
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
      }, {
        label: '',
        icon: 'i-heroicons-magnifying-glass',
        click: () => {
          isSearch.value = true
        },
      }],
      [{
        label: 'Giỏ Hàng',
        icon: 'i-heroicons-shopping-bag',
        badge: cartNum.value,
        to: '/gio-hang',
      },
      {
        label: name.value,
        avatar: {
          src: profile,
        },
        to: `/lich-su-mua-hang/${user.value.id}`,
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
      }, {
        label: '',
        icon: 'i-heroicons-magnifying-glass',
        click: () => {
          isSearch.value = true
        },
      }],
      [{
        label: 'Giỏ Hàng',
        icon: 'i-heroicons-shopping-bag',
        badge: cartNum.value,
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
