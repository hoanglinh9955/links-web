<script setup>
const links = [{
  label: 'Trang Chủ',
  icon: 'i-heroicons-home',
  to: '/'
}, {
  label: 'Sản Phẩm',
  to: '/san-pham',
  icon: 'i-heroicons-building-storefront'
}, {
  label: 'Chi Tiết Sản Phẩm',
  icon: 'i-heroicons-shopping-bag',
}]

const items = [
  'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgn67eznbx9u70',
  'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgn67ezndbuad5',
  'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgn67ezneqeqc5',
  'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgn67eznhjjma2'
]

// const { data } = await useFetch(`https://linkss.pages.dev/api/products/getProduct`, {
//       query: { product_id: 'pro1' }
//     })
//     if (data.value.success) {
//       orderList.splice(0, orderList.length);
//       orderList.push(data.value.results)
//     }
</script>

<template>
    <UContainer class="flex flex-col space-y-5"> 
        <UBreadcrumb class="pt-3" :links="links" />
        <UDivider size="xs" />
        <div class="flex w-full space-x-5">
            <div class="w-[500px] h-[500px]">
                <UCarousel v-slot="{ item }" :items="items" :ui="{ item: 'basis-full' }" class="rounded-lg overflow-hidden" indicators>
                    <img :src="item" class="w-full" draggable="false">
                  </UCarousel>
            </div>
            <div class="w-1/2 flex flex-col space"> 
                <h3 class="text-4xl">Nồi lẩu điện mini</h3>
                <h4 class="text-5xl">69.000VND</h4>
            </div>
        </div>

    </UContainer>
  
</template>