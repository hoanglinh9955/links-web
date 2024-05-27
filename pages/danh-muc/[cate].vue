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
      v-if="!pending"
      class="flex flex-col justify-center items-center mt-10"
    >
      <div class="grid grid-cols-4 gap-7">
        <div
          v-for="item in data1.productList"
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
  </div>
</template>

<script setup>
import Card from '~/components/ Card.vue'
import BigCardContainer from '~/components/BigCardContainer.vue'
import CardContainer from '~/components/CardContainer.vue'

const route = useRoute()

const { data: data1, pending } = useFetch(`https://linkss.pages.dev/api/products/getProductsByCate`, {
  query: { category: `${route.params.cate}` },
})

const links = [{
  label: 'Trang Chủ',
  icon: 'i-heroicons-home',
  to: '/',
}, {
  label: 'Sản Phẩm',
  to: '/san-pham',
  icon: 'i-heroicons-building-storefront',
}, {
  label: route.params.cate,
  icon: 'i-heroicons-shopping-bag',
}]
// const { data: data2 } =  useFetch(`https://linkss.pages.dev/api/products/getProductsByCate4`, {
//   query: { category: 'Phòng Ngủ' },
// })
// const { data: data3 } =  useFetch(`https://linkss.pages.dev/api/products/getProductsByCate4`, {
//   query: { category: 'Gia Dụng' },
// })
</script>

<style>

</style>
