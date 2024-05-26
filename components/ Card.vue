<template>
  <div class="shadow-2xl w-auto h-auto rounded-lg p-2 bg-white">
    <!-- div container -->
    <div class="flex flex-col">
      <img
        class="p-4 w-48 h-48 transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
        :src="imageUrl"
        @click="navigateToProduct(product_id)"
      >
      <!-- product name -->
      <h3 class="text-lg px-5">
        {{ product_name }}
      </h3>
      <!-- star -->
      <div class="flex px-5 py-1">
        <div
          v-for="i in numberStar"
          :key="i"
        >
          <Icon
            icon="twemoji:star"
            width="1em"
            height="1em"
          />
        </div>
      </div>
      <!-- price -->
      <div class="w-3/4 py-2 px-5">
        <h3 class="text-lg font-medium">
          {{ Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price) }}
        </h3>
      </div>

      <!-- Buy now and add -->
      <div class="flex space-x-2 justify-around items-center w-full py-3">
        <UButton class="bg-primary-300 hover:bg-primary-400 w-3/4 justify-center items-center rounded-2xl">
          Mua Ngay
        </UButton>
        <div
          class="cursor-pointer rounded-3xl justify-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          @click="addToCart(product_id)"
        >
          <Icon
            icon="tabler:shopping-cart"
            style="font-size: 25px;"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { reloadState } from '~/stores/storeModal'

const toast = useToast()
const numberStar = ref(5)
const reload = storeToRefs(reloadState()).reloadState
const status = ref(false)

const addToCart = (product_id) => {
  const item = {
    product_id: product_id,
    quantity: 1,
  }

  const value = window.localStorage.getItem('cart-links')
  if (value == null) {
    const array = []
    array.push(item)
    window.localStorage.setItem('cart-links', JSON.stringify(array))
  }
  else {
    const cart = JSON.parse(value) || []
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product_id == product_id) {
        console.log('inloop')
        cart[i].quantity++
        window.localStorage.setItem('cart-links', JSON.stringify(cart))
        status.value = true
      }
    }
    if (!status.value) {
      cart.push(item)
      window.localStorage.setItem('cart-links', JSON.stringify(cart))
    }
  }

  reload.value++
  toast.add({ title: 'Add To Cart Success !', timeout: 2000 })
}

defineProps({
  product_id: String,
  product_name: String,
  price: Number,
  imageUrl: String,
})

const navigateToProduct = (product_id) => {
  console.log(product_id)
  navigateTo(`/chi-tiet-san-pham/${product_id}`)
}
</script>
