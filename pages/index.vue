<template>
  <div class="flex flex-col space-y-28 font-sans">
    <Carousel />

    <!-- san pham ban chay div -->
    <UContainer class="flex flex-col justify-center items-center ">
      <UDivider
        size="xs"
        :ui="{ label: 'text-4xl' }"
        label="Sản Phẩm Bán Chạy"
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
    </UContainer>
    <!-- combo  -->
    <!-- <div class="flex flex-col bg-primary-100 w-full justify-center items-center pb-4 pt-3">
      <div class="flex justify-between w-1/2 p-3">
        <h3 class="text-4xl font-medium">
          Combo Nhà Bếp
        </h3>
        <div class="w-60 flex flex-col space-y-1">
          <div class="flex justify-around text-xs mr-3">
            <h4 class="bg-orange-500 animate-bounce">
              -15%
            </h4>
            <h4 class="line-through">
              406.000VND
            </h4>
          </div>
          <h4 class="text-3xl ml-8 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300">
            345.000VND
          </h4>
        </div>
      </div>

      <UContainer class="flex justify-center space-x-5 py-5 ">
        <CardContainer />
        <CardContainer />
        <CardContainer />
        <CardContainer />
      </UContainer>


      <div class="flex justify-end w-1/2 space-x-8 items-center py-2">
        <UButton class=" bg-primary-400 hover:bg-primary-600 w-40 rounded-3xl justify-center transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300">
          Mua Ngay
        </UButton>
        <NuxtLink>
          Đọc Thêm <Icon name="i-heroicons-chevron-double-right" />
        </NuxtLink>
      </div>
    </div> -->

    <UContainer class="flex flex-col justify-center items-center w-full space-y-10">
      <UDivider
        size="xs"
        :ui="{ label: 'text-4xl' }"
        label="Bộ Sưu Tập"
      />
      <div class="flex flex-col justify-between items-center w-full space-y-9">
      
        <UContainer class="flex w-3/4 justify-around space-x-8">
          <div>
            <img
              src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lpkyjygwawkb65"
              alt="product"
              class="w-96 h-96"
            >
          </div>
          <div class="flex flex-col justify-center items-center space-y-2">
            <h3 class="text-3xl">
              Nhà Bếp
            </h3>
            <h4 class="text-xl">
              Tiện Lợi, Tinh Tế, Nhỏ Gọn
            </h4>
          </div>
        </UContainer>
      
        <UContainer class="flex w-3/4 justify-around space-x-8">
          <div class="flex flex-col justify-center items-center space-y-2">
            <h3 class="text-3xl">
              Nội Thất
            </h3>
            <h4 class="text-xl">
              Đơn Giản, Đa Năng, Đồng Nhất
            </h4>
          </div>
          <div>
            <img
              src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lt7o1d9soo7tb4"
              alt="product"
              class="w-96 h-96"
            >
          </div>
        </UContainer>
     
        <UContainer class="flex w-3/4 justify-around space-x-8">
          <div>
            <img
              src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lhwo13hh705h3f?fbclid=IwAR22rRZ1ywyIMUsgA_iahryyJF16jH8fRZpH6NpBCgHVbEGfaJXWKG8Z3hs"
              alt="product"
              class="w-96 h-96"
            >
          </div>
          <div class="flex flex-col justify-center items-center space-y-2">
            <h3 class="text-3xl">
              Phòng Ngủ
            </h3>
            <h4 class="text-xl">
              Êm Ái, Phong Cách, Dễ Chịu
            </h4>
          </div>
        </UContainer>
      </div>
    </UContainer>
    <!-- nhà bếp -->
    <UContainer class="flex flex-col justify-center items-center ">
      <UDivider
        size="xs"
        :ui="{ label: 'text-4xl' }"
        label="Nhà Bếp"
      />
      <div class="flex space-x-5 justify-center items-center pt-10">
        <div
          v-for="item in data1.productList.slice(0, 3)"
          :key="item.product_id"
        >
          <BigCardContainer
            :product_id="item.product.product_id"
            :product_name="item.product.product_name"
            :price="item.product.price"
            :image-url="item.imageUrl[0]"
          />
        </div>
      </div>
    </UContainer>

    <!-- service of links -->
    <UContainer class="flex space-x-8 bg-primary-100 w-7/12 p-5 py-14 justify-center rounded-3xl">
      <div class="flex flex-col space-y-3">
        <div class="flex flex-col space-y-3">
          <h3 class="text-3xl">
            Dịch Vụ Của
          </h3>
          <h3 class="ml-32 text-4xl text-pretty font-mono">
            Links
          </h3>
        </div>
        <h4 class="w-64">
          Bên cạnh việc cung cấp các sản phẩm  chính hãng chất lượng cao, LINKS luôn nỗ lực mang đến cho người dùng những dịch vụ hỗ trợ tốt nhất…
        </h4>
        <h4 class="flex items-center font-medium">
          Đọc Thêm  <Icon name="i-heroicons-chevron-double-right" />
        </h4>
      </div>
      <div>
        <img
          class="w-64 h-64 rounded-xl"
          src="../public/service1.jpg"
        >
      </div>
      <div>
        <img
          class="w-40 h-64 rounded-xl"
          src="../public/service2.jpg"
        >
      </div>
    </UContainer>
    <!-- Gia dụng -->
    <UContainer class="flex flex-col justify-center items-center ">
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
