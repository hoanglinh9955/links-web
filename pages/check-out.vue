<template>
  <UContainer class="flex">
    <div class="w-3/5 h-screen bg-slate-200">
      <h1 class="text-4xl text-center">
        Links Online Store
      </h1>
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
        <h3>Thông Tin Giao Hàng</h3>
        <UFormGroup
          class="w-4/5"
          name="user_name"
        >
          <UInput
            v-model="user_name"
            :ui="{ rounded: 'rounded-3xl' }"
            size="lg"
            class="w-full"
            placeholder="Họ và Tên"
          />
        </UFormGroup>
        <div class="flex w-full justify-center space-x-1">
          <UFormGroup
            class="w-3/5"
            name="email"
          >
            <UInput
              v-model="email"
              :ui="{ rounded: 'rounded-3xl' }"
              size="lg"
              class="w-full"
              placeholder="Email"
            />
          </UFormGroup>
          <UFormGroup
            class="w-1/5"
            name="phone_number"
          >
            <UInput
              v-model="phone_number"
              type="tel"
              name="phone_number"
              placeholder="Số Điện Thoại"
              class="w-full"
              size="lg"
              :ui="{ rounded: 'rounded-3xl' }"
            />
          </UFormGroup>
        </div>
        <UFormGroup
          class="w-4/5"
          name="selectedCity"
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
        <div class="flex w-4/5 space-x-1">
          <UFormGroup
            class="w-1/2"
            name="selectedDistrict"
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
        >
          <UInput
            v-model="address"
            name="address"
            :ui="{ rounded: 'rounded-3xl' }"
            size="lg"
            class="w-full"
            placeholder="Địa Chỉ"
          />
        </UFormGroup>
        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
    </div>
    <div class="w-2/5 h-screen bg-red-100" />
  </UContainer>
</template>

<script setup>
const links = [{
  label: 'Giỏ Hàng',
  icon: 'i-heroicons-shopping-bag',
  to: '/gio-hang',
}, {
  label: 'Thông Tin Giao Hàng',
  icon: 'i-heroicons-map-pin',
}]

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

const validate = () => {
  const errors = []
  if (!email.value) errors.push({ path: 'email', message: 'Required' })
  if (!user_name.value) errors.push({ path: 'user_name', message: 'Required' })
  if (!phone_number.value) errors.push({ path: 'phone_number', message: 'Required' })
  if (!address.value) errors.push({ path: 'address', message: 'Required' })
  if (!selectedCity.value) errors.push({ path: 'selectedCity', message: 'Required' })
  if (!selectedDistrict.value) errors.push({ path: 'selectedDistrict', message: 'Required' })
  if (!selectedWard.value) errors.push({ path: 'selectedWard', message: 'Required' })
  return errors
}

async function onSubmit(event) {
  // Do something with data
  console.log(event.data)
}

async function onError(event) {
  const element = document.getElementById(event.errors[0].id)
  element?.focus()
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const { data, pending } = useFetch(`https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json`)
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

onMounted(() => {
  getCityList()
})
</script>
