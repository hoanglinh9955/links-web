<template>
  <div class="shadow-2xl w-auto h-auto rounded-lg p-2 bg-white">
    <!-- div container -->
    <div class="flex flex-col justify-center items-center">
      <img class="p-4 w-48 h-48 transition-transform duration-500 ease-in-out transform hover:scale-105"
        src="https://down-vn.img.susercontent.com/file/cn-11134207-7r98o-lnb8glkv1y8r43?fbclid=IwAR1tZvmG9THnLfHaI-endjNmNeK5AYw9fheg7mYVYp71kT6znSKzeIWw99g"
        @click="navigateToProduct"
        />
      <!-- product name -->
      <h3 class="text-lg">
        Tủ quần áo lắp ghép
      </h3>
      <!-- price -->
      <div class="w-3/4 py-2 mr-3">
        <h3 class="text-lg font-medium">
          269.000VND
        </h3>
      </div>
      <!-- Buy now and add -->
      <div class="flex space-x-2 justify-around items-center w-full py-3">
        <UButton class="bg-primary-200 hover:bg-primary-400 w-3/4 justify-center items-center rounded-2xl">
          Mua Ngay
        </UButton>
        <div>
          <Icon icon="tabler:shopping-cart" style="font-size: 25px;" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'


const navigateToProduct = async () => {
  await navigateTo('/chi-tiet-san-pham/1')
}
// export default {
//   props: {
//     product: Object,
//   },
// }
</script>

<style></style>
