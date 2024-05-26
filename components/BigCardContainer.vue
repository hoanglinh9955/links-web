<template>
  <div class="shadow-2xl w-auto h-auto rounded-lg p-2 bg-white">
    <!-- div container -->
    <div class="flex flex-col">
      <img
        class="p-4 w-64 h-64 transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
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
        </UButton><div class="cursor-pointer rounded-3xl justify-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
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

const numberStar = ref(5)

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

<style>

</style>
