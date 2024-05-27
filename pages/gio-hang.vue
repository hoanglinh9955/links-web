<template>
  <UContainer class="flex flex-col justify-between w-full items-center space-y-5 py-10">
    <h1 class="text-4xl font-medium">
      Giỏ Hàng Của Bạn
    </h1>

    <div v-if="isHaveProduct">
      <h4>Bạn Có {{ cartNum }} Sản Phẩm Trong Giỏ Hàng</h4>
      <!-- cart -->
      <div v-if="status">
        <UProgress animation="carousel" />
      </div>
      <div class="w-full flex flex-col space-y-5">
        <!-- <div
          v-for="(product, index) in productList"
          :key="index"
          class="w-full flex justify-between items-center border-2 border-black rounded-lg p-5"
        >
          <div class="flex space-x-5">
            <img
              :src="product.image"
              alt="product"
              class="w-32 h-32"
            >
            <div class="flex flex-col space-y-3">
              <h3 class="text-2xl font-medium">
                {{ product.name }}
              </h3>
              <h4 class="text-lg font-medium">
                {{ product.price }}
              </h4>
            </div>
          </div>
        </div> -->
        <div>{{ displayList }}</div>
      </div>
    </div>
    <div v-else>
      <h4>Chưa Có Sản Phẩm Nào Trong Giỏ Hàng Của Bạn</h4>
      <UButton
        size="lg"
        to="/san-pham"
        block
        class="w-1/2"
      >
        Mua Sắm Ngay
      </UButton>
    </div>
  </UContainer>
</template>

<script setup>
import { reloadState } from '~/stores/storeModal'

const status = ref(false)
const reload = storeToRefs(reloadState()).reloadState
const cartNum = ref(0)
const productList = ref([])
const displayList = ref([])

// check cart in local storage
if (typeof window !== 'undefined') {
  const value = window.localStorage.getItem('cart-links')
  const data = JSON.parse(value)
  if (data != null) {
    cartNum.value = data.length
    productList.value = data
    status.value = true 
  }
}
// reload when user add to cart
watch(reload, async () => {
  const data = JSON.parse(window.localStorage.getItem('cart-links'))
  cartNum.value = data.length
  productList.value = data
})

setTimeout(async () => {
  
  const { data } = await useFetch(`https://linkss.pages.dev/api/products/getListProducts`, {
    method: 'POST',
    body: {
      productList: productList.value,
    },
  })
  console.log(data)
  if (data.value.success) {
    status.value = false
    displayList.value = data.value
  }
}, 1000)

const isHaveProduct = computed(() => cartNum.value > 0)

if (cartNum.value != 0 && productList.value.length > 0) {

  // console.log(data.value)
  // if (data.value.success) {
  //   const item = {
  //     product_id: data.value.product.product_id,
  //     product_name: data.value.product.product_name,
  //     category: data.value.product.category,
  //     price: data.value.product.price,
  //     stock: data.value.product.stock,
  //     imageUrl: data.value.imageUrl[0],
  //     quantity: productList.value[i].quantity,
  //   }
  //   displayList.value.push(item)
  // }
}
// console.log(displayList.value)
</script>

<style>

</style>
