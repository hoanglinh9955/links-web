<template>
  <div class="flex flex-col space-y-20 justify-between items-center">
    <!-- Gia dụng -->
    <div
      v-if="pending"
      class="w-3/4 mt-5"
    >
      <UProgress animation="carousel" />
    </div>
    <UContainer
      v-else
      class="w-3/4 py-2 mt-5"
    >
      <UBreadcrumb
        class="pt-3 items-start justify-start"
        :links="links"
      />
    </UContainer>
    <UContainer
      v-if="isHaveData"
      class="flex flex-col justify-center items-center mt-10"
    >
      <h1 class="text-2xl font-medium p-5">
        Có {{ data.productList.length }} Sản Phẩm
      </h1>
      <div class="grid grid-cols-4 gap-7">
        <div
          v-for="item in data.productList"
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
    </UContainer>
    <UContainer
      v-else
      class="h-[300px]"
    >
      <div class="flex flex-col justify-center items-center mt-10">
        <UHeading
          level="h2"
          class="text-center text-xl font-medium"
        >
          Không Tìm Thấy Sản Phẩm
        </UHeading>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
import Card from '~/components/ Card.vue'

const route = useRoute()

const { data, pending } = useFetch(`https://linkss.pages.dev/api/products/getProductsByName`, {
  query: { product_name: `${route.params.product_name}` },
})

const isHaveData = computed(() => {
  return data.value.productList.length > 0 || !pending
})

const links = [{
  label: 'Trang Chủ',
  icon: 'i-heroicons-home',
  to: '/',
}, {
  label: 'Tìm Kiếm',
  icon: 'i-heroicons-building-storefront',
}]
</script>

  <style>

  </style>
