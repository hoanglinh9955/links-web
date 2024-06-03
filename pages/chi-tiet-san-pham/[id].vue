<template>
  <UContainer class="flex flex-col space-y-5">
    <UBreadcrumb
      class="pt-3"
      :links="links"
    />
    <UDivider size="xs" />
    <!-- image and price -->
    <div class="flex justify-around w-full space-x-5">
      <!-- image -->
      <div class="w-[450px] h-[450px]">
        <UCarousel
          ref="carouselRef"
          v-slot="{ item }"
          :items="images"
          :ui="{ item: 'basis-full' }"
          class="rounded-lg overflow-hidden"
          indicators
        >
          <img
            :src="item"
            class="w-full"
            draggable="false"
          >
        </UCarousel>
      </div>
      <div class="w-1/2 flex flex-col space-y-5">
        <!-- product name -->
        <h3 class="text-3xl font-medium">
          {{ data.product.product_name }}
        </h3>
        <!-- star  -->
        <div class="flex items-center animate-bounce">
          <div
            v-for="i in numberStar"
            :key="i"
          >
            <Icon
              icon="twemoji:star"
              width="1.2em"
              height="1.2em"
            />
          </div>
          <h3 class="px-2">
            31 reviews
          </h3>
        </div>
        <!-- price  -->
        <div class="flex py-6">
          <h4 class="text-4xl font-medium">
            {{ Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.product.price) }}
          </h4>
        </div>
        <!-- so luong -->
        <div class="flex space-x-7">
          <h3 class="text-xl">
            Số Lượng:
          </h3>
          <div class="bg-parchment-100 flex w-48 h-8 justify-between rounded-lg border-2 border-black">
            <div
              class="flex-1 text-center justify-center cursor-pointer"
              @click="changeQuantity('decrease')"
            >
              -
            </div>
            <div class="border-r-2 border-l-2 border-black w-16 text-center">
              {{ checkedQuantity }}
            </div>
            <div
              class="flex-1 text-center cursor-pointer"
              @click="changeQuantity('increase')"
            >
              +
            </div>
          </div>
        </div>
        <!-- buy now and add -->
        <div class="flex space-x-5 pt-5">
          <UButton
            size="lg"
            label="Mua Ngay"
            class="w-44 rounded-3xl justify-center items-center"
            @click="goToMuaNgay(data.product.product_id)"
            :disabled="isStock"
          />
          <UButton
            size="lg"
            label="Thêm Vào Giỏ Hàng"
            class="w-44 rounded-3xl justify-center items-center"
            :class="{
              'transition ease-in-out delay-150 bg-red-600 -translate-y-5 scale-110 hover:bg-orange-500 duration-300': isAddToCart,
              'transition ease-in-out delay-150 -translate-y-0 duration-300': !isAddToCart, // Return to original position when isAddToCart is false
            }"
            @click="addToCart"
            :disabled="isStock"
          />
        </div>
        <h1 class="text-red-600 text-lg" v-if="isStock">Hiện Tại Sản Phẩm Đã Hết Hàng</h1>
        <h1 v-if="quantityInCart > 0 ">
          <div v-if="!isStock">
          Bạn Đang Có {{ quantityInCart }} Trong Giỏ Hàng
        </div>
        </h1>
      </div>
    </div>
    <h2 class="text-3xl p-3">
      Mô Tả Sản Phẩm
    </h2>
    <!-- descrition -->
    <div class="flex flex-col w-full space-y-3">
      <div
        v-for="(section, index) in sections"
        :key="index"
      >
        <!-- Display the section data here -->
        <p :class="{ 'text-2xl py-5': index === 0 }">
          {{ section }}
        </p>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { reloadState } from '~/stores/storeModal'

const reload = storeToRefs(reloadState()).reloadState
const route = useRoute()
const toast = useToast()
const images = ref([])
const numberStar = ref(5)
const quantity = ref(1)
const quantityInCart = ref(0)
const isAddToCart = ref(false)

const goToMuaNgay = (product_id) => {
  navigateTo(`/mua-ngay/${product_id}`)
}

const isStock = computed(() => {
  if(data.value.product.stock === 0) {
    toast.add({ title: `Rất tiếc, ${data.value.product.product_name} đã hết hàng`, timeout: 9000 })
    return true
  }else{
    return false
  }
})

const updateQuantityInCart = () => {
  if (typeof window !== 'undefined') {
    const value = window.localStorage.getItem('cart-links')
    const data = JSON.parse(value)
    if (data != null) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].product_id == route.params.id) {
          quantityInCart.value = data[i].quantity
        }
      }
    }
  }
}

const changeQuantity = (type) => {
  if (type === 'increase') {
    if (quantity.value < data.value.product.stock) {
      quantity.value += 1
    }
    else {
      // Set quantity to available stock if it exceeds
      quantity.value = data.value.product.stock
      toast.add({ title: `Rất tiếc, ${data.value.product.product_name} không còn đủ hàng (chỉ còn ${data.value.product.stock} sản phẩm)`, timeout: 9000 })
    }
  }
  else if (type === 'decrease' && quantity.value > 1) {
    quantity.value -= 1
  }
}

const { data } = await useFetch(`https://linkss.pages.dev/api/products/getProduct`, {
  query: { product_id: `${route.params.id}` },

})
if (data.value.success) {
  images.value = data.value.imageUrl
  // get quantity in cart
  updateQuantityInCart()
}

const checkedQuantity = computed(() => {
  let checkedValue = quantityInCart.value
  if (checkedValue > data.value.product.stock) {
    checkedValue = data.value.product.stock
    if (typeof window !== 'undefined') {
      const value = window.localStorage.getItem('cart-links')
      const data = JSON.parse(value)
      if (data != null) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].product_id === route.params.id) {
            data[i].quantity = checkedValue
          }
        }
        window.localStorage.setItem('cart-links', JSON.stringify(data))
      }
    }
  }
  return quantity.value
})

const addToCart = () => {
  if (typeof window !== 'undefined') {
    // Get the cart links from local storage
    const cartLinks = JSON.parse(window.localStorage.getItem('cart-links')) || []

    // Check if the product already exists in the cart
    const existingProductIndex = cartLinks.findIndex(item => item.product_id === route.params.id)

    if (existingProductIndex !== -1) {
      // Product already exists in the cart, update its quantity
      const existingProduct = cartLinks[existingProductIndex]
      const totalQuantity = existingProduct.quantity + quantity.value

      if (totalQuantity <= data.value.product.stock) {
        existingProduct.quantity = totalQuantity
        isAddToCart.value = true
        toast.add({ title: `Bạn Đã Thêm ${quantity.value} ${data.value.product.product_name} Vào Giỏ Hàng, Hiện Có ${totalQuantity} Trong Giỏ Hàng`, timeout: 9000 })
      }
      else {
        if (existingProduct.quantity < data.value.product.stock) {
          isAddToCart.value = true
        }
        existingProduct.quantity = data.value.product.stock
        toast.add({ title: `Rất Tiếc, ${data.value.product.product_name} Không Còn Đủ Hàng (chỉ còn ${data.value.product.stock} sản phẩm)`, timeout: 9000 })
      }
    }
    else {
      // Product does not exist in the cart, add it
      if (quantity.value <= data.value.product.stock) {
        cartLinks.push({ product_id: route.params.id, quantity: quantity.value })
        isAddToCart.value = true
        reload.value++
        toast.add({ title: `Bạn Đã Thêm ${data.value.product.product_name} ${quantity.value} Sản Phẩm Vào Giỏ Hàng`, timeout: 9000 })
      }
      else {
        toast.add({ title: `Rất tiếc, ${data.value.product.product_name} Không Còn Đủ Hàng (chỉ còn ${data.value.product.stock} sản phẩm)`, timeout: 9000 })
      }
    }

    // Update the cart-links in local storage
    window.localStorage.setItem('cart-links', JSON.stringify(cartLinks))
    // update quantity after add to cart
    updateQuantityInCart()
    setTimeout(() => {
      console.log(isAddToCart.value)
      isAddToCart.value = false
      console.log(isAddToCart.value)
    }, 500)
  }
}

const sections = data.value.product.description.split('|')

const links = [{
  label: 'Trang Chủ',
  icon: 'i-heroicons-home',
  to: '/',
}, {
  label: 'Sản Phẩm',
  to: '/san-pham',
  icon: 'i-heroicons-building-storefront',
}, {
  label: data.value.product.category,
  icon: 'i-heroicons-shopping-bag',
}]

const carouselRef = ref()

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 9000)
})
</script>
