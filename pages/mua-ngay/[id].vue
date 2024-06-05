<template>
  <UContainer class="flex">
    <div class="w-3/5 h-auto">
      <UBreadcrumb
        class="p-5"
        size="xs"
        :links="links"
      />

      <UForm
        :validate="validate"
        class="flex flex-col w-full items-center justify-center space-y-3"
        @submit="onSubmit"
        @error="onError"
      >
        <h3 class="py-5 text-2xl font-medium">
          Thông Tin Giao Hàng
        </h3>
        <UFormGroup
          class="w-4/5"
          name="user_name"
          label="Họ và Tên"
        >
          <UInput
            v-model="user_name"
            :ui="{ rounded: 'rounded-3xl' }"
            size="lg"
            class="w-full"
          />
        </UFormGroup>
        <div class="flex w-4/5 justify-center space-x-1">
          <UFormGroup
            class="w-1/2"
            name="email"
            label="Email"
          >
            <UInput
              v-model="email"
              :ui="{ rounded: 'rounded-3xl' }"
              size="lg"
              class="w-full"
            />
          </UFormGroup>
          <UFormGroup
            class="w-1/2"
            name="phone_number"
            label="Số Điện Thoại"
          >
            <UInput
              v-model="phone_number"
              type="tel"
              name="phone_number"
              class="w-full"
              size="lg"
              :ui="{ rounded: 'rounded-3xl' }"
            />
          </UFormGroup>
        </div>
        <UFormGroup
          class="w-4/5"
          name="selectedCity"
          label="Tỉnh Thành"
        >
          <USelect
            v-model="selectedCity"
            :ui="{ rounded: 'rounded-3xl' }"
            class="w-full"
            size="lg"
            :options="cities"
            option-attribute="Name"
            placeholder="Chọn tỉnh thành"
          />
        </UFormGroup>
        <div class="flex w-4/5 space-x-2">
          <UFormGroup
            class="w-1/2"
            name="selectedDistrict"
            label="Quận Huyện"
          >
            <USelect
              v-model="selectedDistrict"
              :ui="{ rounded: 'rounded-3xl' }"
              size="lg"
              class="w-full"
              :options="districts"
              option-attribute="Name"
              placeholder="Chọn quận huyện"
            />
          </UFormGroup>
          <UFormGroup
            class="w-1/2"
            name="selectedWard"
            label="Phường Xã"
          >
            <USelect
              v-model="selectedWard"
              :ui="{ rounded: 'rounded-3xl' }"
              size="lg"
              class="w-full"
              :options="wards"
              option-attribute="Name"
              placeholder="Chọn phường xã"
            />
          </UFormGroup>
        </div>
        <UFormGroup
          class="w-4/5"
          name="address"
          label="Địa Chỉ"
        >
          <UInput
            v-model="address"
            name="address"
            :ui="{ rounded: 'rounded-3xl' }"
            size="lg"
            class="w-full"
          />
        </UFormGroup>
        <UFormGroup
          class="w-4/5"
          name="selectedCity"
          label="Phương Thức Thanh Toán"
        >
          <USelect
            v-model="paymentMethod"
            :ui="{ rounded: 'rounded-3xl' }"
            class="w-full"
            size="lg"
            :options="methodList"
            placeholder="Chọn phương thức thanh toán"
          />
        </UFormGroup>
        <UButton
          class="w-4/5"
          size="lg"
          block
          type="submit"
        >
          Đặt Hàng
        </UButton>
      </UForm>
    </div>
    <div class="w-2/5 h-auto bg-primary-100 rounded-3xl">
      <UContainer class="flex flex-col justify-between w-full items-center space-y-5 py-10">
        <h1 class="text-3xl font-medium py-5">
          Giỏ Hàng Của Bạn
        </h1>
        <div class="flex flex-col w-full items-center space-y-5">
          <div class="flex w-full justify-between">
            <UChip
              :text="1"
              size="2xl"
            >
              <img
                :src="product.imageUrl[0]"
                alt="product"
                class="w-20 h-20 rounded-lg"
              >
            </UChip>
            <h2> {{ product.product.product_name }} </h2>
            <h2 class="font-medium">
              {{ Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.product.price) }}
            </h2>
          </div>
        </div>
        <h3 :class="['text-2xl pt-8', totalPrice > 500000 ? 'line-through': '']">
          Phí Ship: <span class="font-medium"> {{ Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(25000) }}</span>
        </h3>
        <h3 class="text-2xl pt-4">
          Thành Tiền: <span class="font-medium"> {{ Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(finalPrice) }}</span>
        </h3>
      </UContainer>
    </div>
    <UModal
      v-model="qrState"
      :prevent-close="preventClose"
      @close="handleClose"
    >
      <div class="flex flex-col space-y-2 items-center justify-center p-4">
        <h2 class="text-xl">
          Quét Mã QR Để Thanh Toán
        </h2>
        <QrCode />
        <h2 class="text-xl">
          Mã Đơn Hàng : {{ description }}
        </h2>
        <h2 class="text-xl">
          Tổng Tiền : <span class="text-red-600"> {{ Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount) }} </span>
        </h2>
        <div
          v-if="qrState && displayTimer"
          class="flex flex-col justify-center items-center space-y-3 w-full"
        >
          <UProgress
            size="lg"
            class="w-3/4"
            :value="timer"
            :max="120"
          />
          <h2 class="text-xl">
            Thời Gian Còn Lại {{ timer }} Giây
          </h2>
        </div>
      </div>
    </UModal>
    <!-- <UModal v-model="isOpen">
        <div class="p-4">
          <Login />
        </div>
      </UModal> -->
  </UContainer>
</template>

<script setup>
import QrCode from '~/components/qr-code.vue'
import { set } from '~/node_modules/nuxt/dist/app/compat/capi'
import { reloadState } from '~/stores/storeModal'

const route = useRoute()
const links = [{
  label: 'Giỏ Hàng',
  icon: 'i-heroicons-shopping-bag',
  to: '/gio-hang',
}, {
  label: 'Thông Tin Giao Hàng',
  icon: 'i-heroicons-map-pin',
}]

const toast = useToast()
const description = storeToRefs(reloadState()).description
const totalAmount = storeToRefs(reloadState()).totalAmountGlobal
const reload = storeToRefs(reloadState()).reloadState
const totalRevenue = ref(0)
const qrState = ref(false)
const preventClose = ref(false)
const displayTimer = ref(false)
const isOpen = ref(false)
const timer = ref(0)
let intervalId

const totalPrice = ref(0)
const totalAndShip = ref(0)

const finalPrice = computed(() => {
  if (totalPrice.value > 500000) {
    totalAndShip.value = totalPrice.value
    return totalAndShip.value
  }
  else if (totalPrice.value < 500000) {
    totalAndShip.value = totalPrice.value + 25000
    return totalAndShip.value
  }
})
const order_id = ref('')
const dataList = ref([])
const cities = ref([])
const districts = ref([])
const wards = ref([])

const selectedCity = ref('')
const selectedDistrict = ref('')
const selectedWard = ref('')
const user_name = ref('')
const email = ref('')
const phone_number = ref('')
const address = ref('')
const user_id = ref('')
const paymentMethod = ref('')
const methodList = ['Thanh Toán Khi Nhận Hàng', 'Chuyển Khoản Ngân Hàng']


const validate = () => {
  const errors = []
  if (!email.value) errors.push({ path: 'email', message: 'Required' })
  if (!user_name.value) errors.push({ path: 'user_name', message: 'Required' })
  if (!phone_number.value) errors.push({ path: 'phone_number', message: 'Required' })
  if (!address.value) errors.push({ path: 'address', message: 'Required' })
  if (!selectedCity.value) errors.push({ path: 'selectedCity', message: 'Required' })
  if (!selectedDistrict.value) errors.push({ path: 'selectedDistrict', message: 'Required' })
  if (!selectedWard.value) errors.push({ path: 'selectedWard', message: 'Required' })
  if (!paymentMethod.value) errors.push({ path: 'paymentMethod', message: 'Required' })
  return errors
}

async function onSubmit(event) {
  // Do something with data
  console.log(event.data)
  if (paymentMethod.value == 'Chuyển Khoản Ngân Hàng') {
    order_id.value = 'ORDER' + Date.now().toString()
    description.value = order_id.value
    totalAmount.value = totalAndShip.value
    openModal()
  }
  else {
    order_id.value = 'ORDER' + Date.now().toString()
    addOrder()

    reload.value++
    toast.add({ title: 'Order Thành Công !', timeout: 5000 })
    navigateTo(`/lich-su-mua-hang/${user_id.value}`)
  }
}

const handleClose = async () => {
  addOrder()
  reload.value++
  toast.add({ title: 'Order Thành Công !', timeout: 5000 })
  navigateTo(`/lich-su-mua-hang/${user_id.value}`)
}

const addOrder = async () => {
  const now = new Date()
const day = now.getDate().toString().padStart(2, '0');
const month = (now.getMonth() + 1).toString().padStart(2, '0');
const year = now.getFullYear();
const date = `${day}-${month}-${year}`;
const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
const monthYear = `${month}-${year}`;
  const { data } = await useFetch(`https://linkss.pages.dev/api/orders/addOrder`, {
    method: 'POST',
    body: {
      order: {
        order_id: order_id.value,
        user_id: user_id.value,
        user_name: user_name.value,
        phone_number: phone_number.value,
        email: email.value,
        total: totalAndShip.value,
        method: paymentMethod.value,
        address: address.value + ', ' + selectedWard.value + ', ' + selectedDistrict.value + ', ' + selectedCity.value,
        status: 'Đang Xử Lý',
        date: date,
        time: time,
        month: monthYear,
        revenue: totalPrice.value - totalRevenue.value,
      },
      products: [{
        product: product.value.product,
        quantity: 1,
        imageUrl: [product.value.imageUrl[0]],

      }],
    },
  })
  console.log(data)
}

const startTimer = () => {
  intervalId = setInterval(async () => {
    if (timer.value > 0) {
      timer.value--
      if (timer.value < 50) {
        qrState.value = false
        clearInterval(intervalId)
        displayTimer.value = false
        addOrder()

        reload.value++
        toast.add({ title: 'Order Thành Công !', timeout: 5000 })
        navigateTo(`/lich-su-mua-hang/${user_id.value}`)
      }
    }
    else {
      clearInterval(intervalId)
      displayTimer.value = false
    }
  }, 1000)
}

const openModal = () => {
  preventClose.value = true
  qrState.value = true
  setTimeout(() => {
    timer.value = 120 // Reset timer to initial value
    startTimer()
    displayTimer.value = true
  }, 500) // 2 seconds

  setTimeout(() => {
    preventClose.value = false
  }, 12000) // 15 seconds
}

async function onError(event) {
  const element = document.getElementById(event.errors[0].id)
  element?.focus()
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const { data, pending } = await useFetch(`https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json`)
dataList.value = JSON.parse(data.value)

const getCityList = () => {
  cities.value = dataList.value.map((item) => {
    return {
      Name: item.Name,
      Districts: item.Districts,
    }
  })
}

watch(selectedCity, (newVal) => {
  if (newVal) {
    getListDistrict(newVal)
  }
})
watch(selectedDistrict, (newVal) => {
  if (newVal) {
    getListWard(newVal)
  }
})

const getListDistrict = (cityName) => {
  districts.value = cities.value.find(item => item.Name === cityName).Districts.map((item) => {
    return {
      Name: item.Name,
      wards: item.Wards,
    }
  })
}
const getListWard = (districtName) => {
  wards.value = districts.value.find(item => item.Name === districtName).wards.map((item) => {
    return {
      Name: item.Name,
    }
  })
}

const { data: product } = await useFetch(`https://linkss.pages.dev/api/products/getProduct`, {
  query: { product_id: `${route.params.id}` },

})
if (product.value.success) {
  totalPrice.value = product.value.product.price
  totalRevenue.value = product.value.product.cost
}

const supabase = useSupabaseClient()

const login = async () => {
  // const redirectTo = `${window.location.origin} ${query.redirectTo}`;
  const redirectTo = `${window.location.origin}` + route.fullPath

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo },
  })

  if (error) {
    console.error(error)
  }
}

onMounted(() => {
  const user = useSupabaseUser()
  if (user.value == null) {
    login()
  }
  if (user.value != null) {
    user_id.value = user.value.id
  }
  getCityList()
})
</script>
