<template>
  <UContainer class="flex h-auto flex-col justify-center">
    <UBreadcrumb
      class="py-5 items-start"
      :links="links"
    />
    <div
      v-if="data.results.length > 0"
      :class="`flex flex-col items-center space-y-5 pt-5 ${data.results.length === 1 ? 'h-[250px]' : ''}`"
    >
      <div
        v-for="(item, index) in [...data.results].reverse()"
        :key="index"
        class="flex space-x-6 items-center justify-between border-black border-2 rounded-xl p-6 w-4/5"
      >
        <div class="flex space-x-6">
          <Icon
            size="25px"
            name="i-heroicons-shopping-bag"
          />
          <div class="flex flex-col">
            <h3 class="font-medium">
              #{{ index + 1 }}-{{ item.order_id }}
            </h3>
            <h4 class="text-sm">
              {{ item.time }} - {{ item.date }}
            </h4>
          </div>

          <h4 class="mb-5">
            {{ item.method }}
          </h4>
        </div>
        <h4 class="mb-5 font-medium">
          {{ Intl.NumberFormat('vi-VN', {
            style: 'currency', currency: 'VND',
          }).format(item.total) }}
        </h4>
        <UButtonGroup
          class="mb-4 pl-40"
          size="sm"
          orientation="horizontal"
        >
          <UButton
            block
            class="w-36 text-justify"
            :label="item.status"
            :color="getColor(item.status)"
          />
          <UButton
            icon="i-heroicons-chevron-down-20-solid"
            color="gray"
            @click="openOrderDetail(item.order_id)"
          />
        </UButtonGroup>
      </div>
    </div>
    <div
      v-else
      class="h-[250px]"
    >
      <h3 class="text-3xl font-medium text-center">
        Không có lịch sử mua hàng
      </h3>
    </div>
    <UModal v-model="isOpen">
      <div class="p-6">
        <OrderDetail />
      </div>
    </UModal>
  </UContainer>
</template>

<script setup>
import OrderDetail from '~/components/orderDetail.vue'
import { reloadState } from '~/stores/storeModal'

const order_id = storeToRefs(reloadState()).order_id

const route = useRoute()
const isOpen = ref(false)

const openOrderDetail = (id) => {
  isOpen.value = true
  order_id.value = id
}
const { data } = await useFetch(`https://linkss.pages.dev/api/orders/getOrdersById`, {
  query: { user_id: `${route.params.id}` },

})

const getColor = (status) => {
  if (status == 'Đang Xử Lý') {
    return 'orange'
  }
  else if (status == 'Đang Giao Hàng') {
    return 'blue'
  }
  else if (status == 'Đã Hoàn Thành') {
    return 'emerald'
  }
  else if (status == 'Đã Hủy') {
    return 'red'
  }
}

const links = [{
  label: 'Trang Chủ',
  icon: 'i-heroicons-home',
  to: '/',
}, {
  label: 'Lịch Sử Mua Hàng',
  icon: 'i-heroicons-building-storefront',
  to: `/lich-su-mua-hang/${route.params.id}`,
}]
</script>
