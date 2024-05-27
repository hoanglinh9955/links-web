<template>
  <div class="flex flex-col space-y-20">
    <!-- nhà bếp -->
    <UContainer class="flex flex-col justify-center items-center mt-24">
      <UDivider
        size="xs"
        :ui="{ label: 'text-4xl' }"
        label="Nhà Bếp"
      />
      <div class="flex space-x-5 justify-center items-center pt-10">
        <div
          v-for="item in data3.productList.slice(0, 4)"
          :key="item.product_id"
        >
          <Card
            :product_id="item.product.product_id"
            :product_name="item.product.product_name"
            :price="item.product.price"
            :image-url="item.imageUrl[0]"
          />
        </div>
      </div>
      <NuxtLink
        class="pt-5 w-full flex justify-end mr-8 items-center font-medium transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
        to="/danh-muc/Nhà Bếp"
      >
        Xem Thêm  <Icon
          class="m-1"
          name="i-heroicons-chevron-double-right"
        />
      </NuxtLink>
    </UContainer>
    <!-- Phong ngu -->
    <UContainer class="flex flex-col justify-center items-center ">
      <UDivider
        size="xs"
        :ui="{ label: 'text-4xl' }"
        label="Phòng Ngủ"
      />
      <div class="flex space-x-5 justify-center items-center pt-10">
        <div
          v-for="item in data2.productList.slice(0, 4)"
          :key="item.product_id"
        >
          <Card
            :product_id="item.product.product_id"
            :product_name="item.product.product_name"
            :price="item.product.price"
            :image-url="item.imageUrl[0]"
          />
        </div>
      </div>
      <NuxtLink
        class="pt-5 w-full flex justify-end mr-8 items-center font-medium transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
        to="/danh-muc/Phòng Ngủ"
      >
        Xem Thêm  <Icon
          class="m-1"
          name="i-heroicons-chevron-double-right"
        />
      </NuxtLink>
    </UContainer>
    <!-- Gia dụng -->
    <UContainer class="flex flex-col justify-center items-center mt-24">
      <UDivider
        size="xs"
        :ui="{ label: 'text-4xl' }"
        label="Gia Dụng"
      />
      <div class="flex space-x-5 justify-center items-center pt-10">
        <div
          v-for="item in data3.productList.slice(0, 4)"
          :key="item.product_id"
        >
          <Card
            :product_id="item.product.product_id"
            :product_name="item.product.product_name"
            :price="item.product.price"
            :image-url="item.imageUrl[0]"
          />
        </div>
      </div>
      <NuxtLink
        class="pt-5 w-full flex justify-end mr-8 items-center font-medium transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
        to="/danh-muc/Gia Dụng"
      >
        Xem Thêm  <Icon
          class="m-1"
          name="i-heroicons-chevron-double-right"
        />
      </NuxtLink>
    </UContainer>
  </div>
</template>

<script setup>
import Card from '~/components/ Card.vue'
import BigCardContainer from '~/components/BigCardContainer.vue'
import CardContainer from '~/components/CardContainer.vue'

const { data: data1 } = useFetch(`https://linkss.pages.dev/api/products/getProductsByCate4`, {
  query: { category: 'Nhà Bếp' },
})
const { data: data2 } = useFetch(`https://linkss.pages.dev/api/products/getProductsByCate4`, {
  query: { category: 'Phòng Ngủ' },
})
const { data: data3 } = useFetch(`https://linkss.pages.dev/api/products/getProductsByCate4`, {
  query: { category: 'Gia Dụng' },
})
</script>

<style>

</style>
