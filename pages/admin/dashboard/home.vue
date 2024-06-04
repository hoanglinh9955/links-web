<template>
  <div>
    <UCard
      class="w-full"
      :ui="{
        base: '',
        ring: '',
        divide: 'divide-y divide-gray-200 dark:divide-gray-700',
        header: { padding: 'px-4 py-5' },
        body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
        footer: { padding: 'p-4' },
      }"
    >
      <template #header>
        <div class="flex items-center justify-between gap-3 px-4 py-3">
          <UInput
            v-model="q"
            placeholder="Tìm Kiếm..."
            trailing
            icon="i-heroicons-magnifying-glass-20-solid"
          />
          <USelectMenu
            v-model="selectedColumns"
            class="w-40"
            :options="columns"
            multiple
          >
            <UButton
              class="w-40"
              icon="i-heroicons-view-columns"
              color="gray"
              size="xs"
            >
              Chọn Cột Để Hiển Thị
            </UButton>
          </USelectMenu>
        </div>
      </template>

      <UTable
        v-model="selected"
        :rows="filteredRows"
        :columns="selectedColumns"
        @select="select"
        :ui="{ tr: {selected: 'bg-primary-100', active:'hover:bg-gray-100'} }"
      >
        <template #order_id-data="{ row }">
          <UButton
            :label="row.order_id"
            :icon="getIcon(row.status)"
            size="2xs"
            :color="getColor(row.status)"
            variant="outline"
            :ui="{ rounded: 'rounded-full' }"
            square
            @click="openOrderDetail(row.order_id)"
          />
        </template>

        <!-- <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
          />
        </UDropdown>
      </template> -->

        <template #status-data="{ row }">
          <UBadge
            size="xs"
            :label="row.status"
            :color="getColor(row.status)"
            variant="subtle"
          />
        </template>

        <template #actions-data="{ row }">
          <UButton
            :icon="getIcon(row.status)"
            size="2xs"
            :color="getColor(row.status)"
            variant="outline"
            :ui="{ rounded: 'rounded-full' }"
            square
            @click="update(row)"
            :disabled="checkStatus(row.status)"
          />
        </template>
      </UTable>
    </UCard>
    <UModal v-model="isOpen">
      <h3 class="text-center pt-4 text-xl">Cập Nhật Trạng Thái Đơn Hàng</h3>
      <div class="p-4 pb-6 flex space-x-2 justify-center items-center">
        <USelect
          v-model="statusModel"
          class="w-40"
          icon="i-heroicons-magnifying-glass-20-solid"
          color="white"
          size="sm"
          :options="orderStatus"
          placeholder="Tìm Kiếm..."
        />
        <UButton
        block
        class="w-40"
        icon="i-heroicons-truck"
          label="Cập Nhật"
          color="primary"
          @click="isOpen = false"
        />
      </div>
    </UModal>
    <UModal v-model="isOpenDetail">
      <div class="p-6">
        <OrderDetail />
      </div>
    </UModal>
  </div>
</template>

<script setup>
import { reloadState } from '~/stores/storeModal'
import OrderDetail from '~/components/orderDetail.vue'
const order_id = storeToRefs(reloadState()).order_id

const isOpen = ref(false)
const isOpenDetail = ref(false)
const orderStatus = ['Xử Lý', 'Giao Hàng', 'Hoàn Thành', 'Hủy']
const statusModel = ref(orderStatus[0])
const orderList = reactive([])
const { data, pending } = await useFetch(`https://linkss.pages.dev/api/orders/getOrder`)

  watch(data, () =>{
    orderList.splice(0, orderList.length)
    orderList.push(data.value.results.reverse())
})

// const data = ref()
// data.value = { "success": true, "meta": { "served_by": "v3-prod", "duration": 0.3144, "changes": 0, "last_row_id": 0, "changed_db": false, "size_after": 159744, "rows_read": 14, "rows_written": 0 }, "results": [ { "order_id": "ORDER1717398680386", "user_id": "8f37e58c-d3dc-4ffd-8b52-961871bf3030", "user_name": "Le Hoang Linh", "phone_number": "0398651198", "email": "hoanglinh9955@gmail.com", "total": 112000, "method": "Thanh Toán Khi Nhận Hàng", "address": "vietname, Xã Cách Bi, Huyện Quế Võ, Tỉnh Bắc Ninh", "status": "Đã Hoàn Thành", "date": "03/06/2024", "time": "14:11", "revenue": "22000.0", "month": "06-2024" }, { "order_id": "ORDER1717403124716", "user_id": "8f37e58c-d3dc-4ffd-8b52-961871bf3030", "user_name": "Le Hoang Linh", "phone_number": "0398651198", "email": "hoanglinh9955@gmail.com", "total": 300000, "method": "Thanh Toán Khi Nhận Hàng", "address": "vietname, Xã Long Châu, Huyện Yên Phong, Tỉnh Bắc Ninh", "status": "Đã Hủy", "date": "03/06/2024", "time": "15:25", "revenue": "40000.0", "month": "06-2024" }, { "order_id": "ORDER1717405291984", "user_id": "f0869a2f-a55d-40a0-985c-8e85a2a39307", "user_name": "Le Hoang Linh", "phone_number": "0398651198", "email": "hoanglinh9955@gmail.com", "total": 145000, "method": "Chuyển Khoản Ngân Hàng", "address": "vietname, Xã Xuân Hiệp, Huyện Xuân Lộc, Tỉnh Đồng Nai", "status": "Đang Giao Hàng", "date": "03/06/2024", "time": "16:02", "revenue": "15000.0", "month": "06-2024" }, { "order_id": "ORDER1717407622908", "user_id": "f0869a2f-a55d-40a0-985c-8e85a2a39307", "user_name": "Le Hoang Linh", "phone_number": "0398651198", "email": "hoanglinh9955@gmail.com", "total": 135000, "method": "Thanh Toán Khi Nhận Hàng", "address": "vietname, Xã Khánh Xuân, Huyện Bảo Lạc, Tỉnh Cao Bằng", "status": "Đang Xử Lý", "date": "03/06/2024", "time": "16:40", "revenue": "32000.0", "month": "06-2024" }, { "order_id": "ORDER1717429717241", "user_id": "f0869a2f-a55d-40a0-985c-8e85a2a39307", "user_name": "Ngan Ngo", "phone_number": "0398651198", "email": "hoanglinh9955@gmail.com", "total": 515000, "method": "Thanh Toán Khi Nhận Hàng", "address": "vietname, Phường Hoàng Quế, Thị xã Đông Triều, Tỉnh Quảng Ninh", "status": "Đang Xử Lý", "date": "03/06/2024", "time": "22:48", "revenue": "72000.0", "month": "06-2024" }, { "order_id": "ORDER1717440098364", "user_id": "f0869a2f-a55d-40a0-985c-8e85a2a39307", "user_name": "Le Hoang Linh", "phone_number": "0398651198", "email": "hoanglinh9955@gmail.com", "total": 325000, "method": "Chuyển Khoản Ngân Hàng", "address": "vietname, Xã Tri Phương, Huyện Tiên Du, Tỉnh Bắc Ninh", "status": "Đang Xử Lý", "date": "04/06/2024", "time": "01:42", "revenue": "40000.0", "month": null }, { "order_id": "ORDER1717440432182", "user_id": "f0869a2f-a55d-40a0-985c-8e85a2a39307", "user_name": "Ngan Ngo", "phone_number": "0398651198", "email": "hoanglinh9955@gmail.com", "total": 138000, "method": "Chuyển Khoản Ngân Hàng", "address": "vietname, Phường Trưng Nhị, Thành phố Phúc Yên, Tỉnh Vĩnh Phúc", "status": "Đang Xử Lý", "date": "04/06/2024", "time": "01:48", "revenue": "23000.0", "month": null }, { "order_id": "ORDER1717440883668", "user_id": "f0869a2f-a55d-40a0-985c-8e85a2a39307", "user_name": "Ngan Ngo", "phone_number": "0398651198", "email": "hoanglinh9955@gmail.com", "total": 160000, "method": "Chuyển Khoản Ngân Hàng", "address": "vietname, Xã Đại Đồng, Huyện Tiên Du, Tỉnh Bắc Ninh", "status": "Đang Xử Lý", "date": "04/06/2024", "time": "01:55", "revenue": "32000.0", "month": null }, { "order_id": "ORDER1717441017980", "user_id": "f0869a2f-a55d-40a0-985c-8e85a2a39307", "user_name": "asdfasdf", "phone_number": "0398651198", "email": "hoanglinh9955@gmail.com", "total": 325000, "method": "Thanh Toán Khi Nhận Hàng", "address": "vietname, Xã Long Cốc, Huyện Tân Sơn, Tỉnh Phú Thọ", "status": "Đang Xử Lý", "date": "04/06/2024", "time": "01:56", "revenue": "40000.0", "month": null }, { "order_id": "ORDER1717441060389", "user_id": "f0869a2f-a55d-40a0-985c-8e85a2a39307", "user_name": "Ngan Ngo", "phone_number": "0398651198", "email": "hoanglinh9955@gmail.com", "total": 423000, "method": "Chuyển Khoản Ngân Hàng", "address": "vietname, Xã Đại Đồng, Huyện Tiên Du, Tỉnh Bắc Ninh", "status": "Đang Xử Lý", "date": "04/06/2024", "time": "01:57", "revenue": "23000.0", "month": null }, { "order_id": "ORDER1717441772221", "user_id": "f0869a2f-a55d-40a0-985c-8e85a2a39307", "user_name": "Le Hoang Linh", "phone_number": "0398651198", "email": "hoanglinh9955@gmail.com", "total": 94500, "method": "Chuyển Khoản Ngân Hàng", "address": "vietname, Xã Hồng Phong, Huyện Ninh Giang, Tỉnh Hải Dương", "status": "Đang Xử Lý", "date": "04/06/2024", "time": "02:09", "revenue": "14500.0", "month": null }, { "order_id": "ORDER1717441906545", "user_id": "f0869a2f-a55d-40a0-985c-8e85a2a39307", "user_name": "Ngan Le", "phone_number": "0398651198", "email": "hoanglinh9955@gmail.com", "total": 500000, "method": "Chuyển Khoản Ngân Hàng", "address": "vietname, Xã Đồng Trung, Huyện Thanh Thuỷ, Tỉnh Phú Thọ", "status": "Đang Xử Lý", "date": "04/06/2024", "time": "02:12", "revenue": "20000.0", "month": null }, { "order_id": "ORDER1717442129989", "user_id": "f0869a2f-a55d-40a0-985c-8e85a2a39307", "user_name": "Le Hoang Linh", "phone_number": "0398651198", "email": "hoanglinh9955@gmail.com", "total": 138000, "method": "Thanh Toán Khi Nhận Hàng", "address": "vietname, Xã Đông Phong, Huyện Yên Phong, Tỉnh Bắc Ninh", "status": "Đang Xử Lý", "date": "04/06/2024", "time": "02:15", "revenue": "23000.0", "month": null }, { "order_id": "ORDER1717442196970", "user_id": "f0869a2f-a55d-40a0-985c-8e85a2a39307", "user_name": "Ngan Ngo", "phone_number": "0398651198", "email": "hoanglinh9955@gmail.com", "total": 2342500, "method": "Thanh Toán Khi Nhận Hàng", "address": "vietname, Xã Yên Giả, Huyện Quế Võ, Tỉnh Bắc Ninh", "status": "Đang Xử Lý", "date": "04/06/2024", "time": "02:16", "revenue": "234500.0", "month": null } ] }
// orderList.splice(0, orderList.length)
// orderList.push(data.value.results.reverse())

const selected = ref([])

function select(row) {
  selected.value.splice(0, selected.value.length)
  selected.value.push(row)
}

const openOrderDetail = (id) => {
  isOpenDetail.value = true
  order_id.value = id
}

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
const getIcon = (status) => {
  if (status == 'Đang Xử Lý') {
    return 'i-heroicons-arrow-path'
  }
  else if (status == 'Đang Giao Hàng') {
    return 'i-heroicons-truck'
  }
  else if (status == 'Đã Hoàn Thành') {
    return 'i-heroicons-check'
  }
  else if (status == 'Đã Hủy') {
    return 'i-heroicons-x-circle'
  }
}

const checkStatus = (status) => {
  if (status == 'Đang Xử Lý') {
    return false
  }
  else if (status == 'Đang Giao Hàng') {
    return false
  }
  else if (status == 'Đã Hoàn Thành') {
    return true
  }
  else if (status == 'Đã Hủy') {
    return true
  }
}

const update = (row) => {
  isOpen.value = true
}

const columns = [
  {
    key: 'order_id',
    label: 'Mã Đơn Hàng',
  }, {
    key: 'user_name',
    label: 'Tên Khách Hàng',
  }, {
    key: 'phone_number',
    label: 'Số Điện Thoại',
  }, {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'method',
    label: 'Phương Thức',
  },
  {
    key: 'time',
    label: 'Time',
    sortable: true,
  },
  {
    key: 'date',
    label: 'Date',
    sortable: true,
  },
  {
    key: 'status',
    label: 'Trạng Thái',
  },
  {
    key: 'total',
    label: 'Thành Tiền',
  },
  {
    key: 'revenue',
    label: 'Lợi Nhuận',
  },
  {
    key: 'address',
    label: 'Địa Chỉ',
  },
  {
    key: 'actions',
    label: 'Actions',
  }]

const excludedColumns = ['time', 'phone_number', 'address']
const selectedColumns = ref(columns.filter(column => !excludedColumns.includes(column.key)))

const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return orderList[0]
  }

  return orderList[0].filter((item) => {
    return Object.values(item).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})


</script>
