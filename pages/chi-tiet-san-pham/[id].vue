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
              {{ quantity }}
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
          />
          <UButton
            size="lg"
            label="Thêm Vào Giỏ Hàng"
            class="w-44 rounded-3xl justify-center items-center"
          />
        </div>
      </div>
    </div>
    <h2 class="text-3xl p-3">
      Mô Tả Sản Phẩm
    </h2>
    <!-- descrition -->
    <div class="flex flex-col w-4/5 space-y-3">
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

const route = useRoute()

const images = ref([])
const numberStar = ref(5)
const quantity = ref(1)
const changeQuantity = (type) => {
  if (type === 'increase') {
    quantity.value += 1
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
}
console.log('🚀 ~ data:', data)
const sections = data.value.product.description.split('|')
console.log('🚀 ~ sections:', sections)

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
  }, 7000)
})
</script>
