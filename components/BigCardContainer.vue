<template>
  <div class="shadow-2xl w-auto h-auto rounded-lg p-2 bg-white">
    <!-- div container -->
    <div class="flex flex-col justify-center items-center">
      <img
        class="p-4 w-64 h-64 transition-transform duration-500 ease-in-out transform hover:scale-105"
        :src="imageUrl"
        @click="navigateToProduct(product_id)"
      >
      <!-- product name -->
      <h3 class="text-lg mr-12">
        {{ product_name }}
      </h3>
      <!-- price -->
      <div class="w-3/4 py-2 mr-3">
        <h3 class="text-lg font-medium">
          {{ Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price) }}
        </h3>
      </div>
      <!-- Buy now and add -->
      <div class="flex space-x-2 justify-around items-center w-full py-3">
        <UButton class="bg-primary-200 hover:bg-primary-400 w-3/4 justify-center items-center rounded-2xl">
          Mua Ngay
        </UButton><div>
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
