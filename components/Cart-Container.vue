<template>
  <div class="shadow-2xl w-auto h-auto rounded-lg p-2">
    <!-- div container -->
      <div class="flex flex-col justify-center items-center">
        <img
          class="p-4 w-48 h-64"
          src="https://s4.shopbay.vn/files/23/dx118c-2-64128b47edf7b.png"
        >
        <!-- product name -->
        <h3 class="text-xl">
          Tủ quần áo lắp ghép
        </h3>
        <!-- price -->
        <div class="w-3/4 justify-start">
          <h3>269.000VND</h3>
        </div>
        <!-- Buy now and add -->
        <div class="flex space-x-2 justify-around items-center w-full py-3">
          <UButton class="w-3/4 justify-center items-center rounded-2xl">
            Buy Now
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

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
</script>

<style>

</style>
