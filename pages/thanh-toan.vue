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
          <div
            v-for="(product, index) in displayList.displayList"
            :key="index"
            class="flex w-full justify-between"
          >
            <UChip
              :text="product.quantity"
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
              {{ Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.quantity * product.product.price) }}
            </h2>
          </div>
        </div>
        <h3 :class="['text-2xl pt-8', totalPrice > 400000 ? 'line-through': '' ]">
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
import { reloadState } from '~/stores/storeModal'

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
const status = ref(false)
const cartNum = ref(0)
const productList = ref([])
const displayList = ref([])
const totalPrice = ref(0)
const totalAndShip = ref(0)

const finalPrice = computed(() => {
  if(totalPrice.value > 400000) {
    totalAndShip.value = totalPrice.value
    return totalAndShip.value
  }
  else if(totalPrice.value < 400000) {
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
  }else{
    order_id.value = 'ORDER' + Date.now().toString()
    addOrder()
    clearCart();
    reload.value++
    toast.add({ title: 'Order Thành Công !', timeout: 5000 })
    navigateTo(`/lich-su-mua-hang/${user_id.value}`)
  
  }
}

const handleClose = async () => {
  addOrder()
  clearCart();
  reload.value++
  toast.add({ title: 'Order Thành Công !', timeout: 5000 })
  navigateTo(`/lich-su-mua-hang/${user_id.value}`)
}

const clearCart = () => {
  window.localStorage.setItem('cart-links', JSON.stringify([])); // Set 'cart-links' to an empty array
};

const addOrder = async () => {
  const now = new Date()
  const date = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })

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
        revenue: totalPrice.value - totalRevenue.value,
      },
      products: displayList.value.displayList,
    },
  })
  console.log(data)
}

const startTimer = () => {
  intervalId = setInterval( async() => {
    if (timer.value > 0) {
      timer.value--
      if (timer.value < 60) {
        qrState.value = false
        clearInterval(intervalId)
        displayTimer.value = false
        addOrder();
        clearCart();
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


// // check cart in local storage
if (typeof window !== 'undefined') {
  const value = window.localStorage.getItem('cart-links')
  const data = JSON.parse(value)
  if (data != null) {
    cartNum.value = data.lengthqrState
    productList.value = data
    status.value = true
  }
}
// // reload when user add to cart
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

    // Iterate through the displayList and ensure that quantities are within available stock
    for (let i = 0; i < displayList.value.displayList.length; i++) {
      const product = displayList.value.displayList[i].product
      const maxStock = product.stock
      const currentQuantity = displayList.value.displayList[i].quantity

      // If the current quantity exceeds stock, set it to the maximum available stock
      if (currentQuantity > maxStock) {
        displayList.value.displayList[i].quantity = maxStock
        toast.add({ title: `Rất tiếc, ${product.product_name} không còn đủ hàng (chỉ còn ${maxStock} sản phẩm)`, timeout: 5000 })
      }
    }

    calculatePrice()
  }
}, 200)

const calculatePrice = () => {
  let total = 0
  let totalRe = 0
  for (let i = 0; i < displayList.value.displayList.length; i++) {
    total += displayList.value.displayList[i].product.price * displayList.value.displayList[i].quantity
    totalRe += displayList.value.displayList[i].product.cost * displayList.value.displayList[i].quantity
  }
  totalRevenue.value = totalRe
  totalPrice.value = total
}

const supabase = useSupabaseClient()
const route = useRoute()
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

const mockData = { success: true, displayList: [{ product: { product_id: 'UI06', product_name: 'Quạt Điện Kaimeidi', description: 'Chào mừng đến với cửa hàng của chúng tôi "|"\n🍀 Nếu quan tâm đến giá bán buôn , bạn có thể trò chuyện riêng với chúng tôi "|"\n🍀 Khi bạn nhận được sản phẩm , xin vui lòng nhấn chấp nhận "|"\n🍀Đánh giá 5 sao rất khuyến khích cho cửa hàng của chúng tôi "|"\n🍀 Nếu khách hàng không hài lòng với hệ thống giao hàng . Vui lòng tách dịch vụ khỏi các cửa hàng và công ty vận tải. bởi vì cửa hàng không thể thực sự kiểm soát việc vận chuyển "|"\n🍀 Nếu sản phẩm có vấn đề hoặc đang được vận chuyển . Xin vui lòng liên hệ với cửa hàng của chúng tôi để được trợ giúp và sửa chữa "|"\n🍀 Sản phẩm của chúng tôi có chất lượng cao và giá rẻ . Vì vậy , bạn không phải lo lắng rằng sản phẩm sẽ không khớp với sản phẩm thật . Các sản phẩm có chất lượng cao và chắc chắn rẻ "|"', category: 'Phòng Ngủ', price: 135000, stock: 20 }, imageUrl: ['https://down-vn.img.susercontent.com/file/sg-11134201-7qvfh-lhzm1abc260k27', 'https://down-vn.img.susercontent.com/file/sg-11134201-7qver-lhzm1aur8cb64a', 'https://down-vn.img.susercontent.com/file/sg-11134201-7qvf8-lhzm1bp9zo9f54'], quantity: 1 }, { product: { product_id: 'UI07', product_name: 'Kệ Gỗ 4 Tầng', description: 'Kích thước: |\n- Kệ GM05: Dài 50cm x Rộng 30cm x Cao 100cm |\n- Kệ GM06: Dài 50cm x Rộng 30cm x Cao 97cm |\nChất liệu: Gỗ công nghiệp MDF phủ Melamine chống nước, chống xước, chống mối mọt. Khung thép sơn tĩnh điện. |\nMàu sắc: Khung trắng/Khung đen |\nVẬN CHUYỂN & LẮP ĐẶT: Sản phẩm được giao chưa lắp đặt sẵn, chúng tôi có kèm theo sách + video hướng dẫn lắp đặt. Nếu có thắc mắc về lắp đặt và sử dụng sản phẩm, liên hệ ngay cho chúng tôi để được nhân viên hổ trợ. |', category: 'Phòng Ngủ', price: 292000, stock: 20 }, imageUrl: ['https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lnmozxk0fzsde5', 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lnmozxk0fzsde5', 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lua80i32dmvz39'], quantity: 2 }, { product: { product_id: 'UI05', product_name: 'Đèn Led Để Bàn', description: 'MÔ TẢ SẢN PHẨM|\nThông số kĩ thuật:|\n- Trang bị cảm biến tự động điều chỉnh tông màu và cường độ ánh sáng theo môi trường . |\n- Sử dụng pin sạc 3000mAh cho thời gian sử dụng lên đến 13 giờ . |\n- Máng đèn thiết kế thông minh có thể xếp gấp gọn gàng, phản chiếu ánh sáng đồng đều hơn. |\n- Trang bị hệ thống đèn LED Full-Spectrum cao cấp giúp tái tạo ánh sáng tốt hơn, chống rung - nhiễu , không gây chói mắt . |\n- Kích thước: 290 * 75/350 * 45 mm |\n- Vật liệu: Nhựa ABS, PC và hợp kim nhôm |\n- Dung lượng pin: 2200mAh |\n- Nhiệt độ màu: 3000k - 4000k - 6000k |\n- Thời gian sạc: ~3 tiếng |\nCổng sạc: Type C|\n\n\nNếu bạn đang cần tìm một chiếc đèn để bàn chất lượng cao phục vụ cho nhu cầu học tập, làm việc hay đọc sách với thời gian dài mà không gây hại cho mắt thì Baseus Smart Eye Series là một chiếc đèn cao cấp dành riêng cho bạn . Baseus Smart Eye Series là một chiếc đèn để bàn cao cấp với thiết kế sang trọng, hiện đại đi cùng với nhiều tính năng thông minh có thể đáp tất cả các nhu cầu học tập, làm việc và đọc sách|\n\n\nTính năng cơ bản Đèn để bàn thông minh Baseus Smart Eye Series Charging Folding Reading Desk Lamp |\n- Đèn để bàn thông minh Baseus Smart Eye Series sỡ hữu một thiết kế trẻ trung hiện đại. Sản phẩm được làm bằng hợp kim nhôm chắc chắn , bề mặt được sơn tỉnh điện chống bám vân tay với 2 tông màu xám và trắng . Kiểu dáng thon dài đơn giản nhưng không kém phần tinh tế và sang trọng , phù hợp cho bàn làm việc và nhiều không gian sinh hoạt khác nhau kể cả phòng ngủ . |\n- Sản phẩm sử dụng đèn LED cao cấp thế hệ mới giúp tiết kiệm pin, tần số quét cực cao, khả năng chông rung - chống nhiểu cực tốt đáp ứng full dãy phổ màu ánh sáng (full - spectrum) với dãy nhiệt độ màu đáp ứng 3000k - 6000k.|\n- Ngoài ra đèn để bàn thông minh Baseus Smart Eye Series còn được trang bị cảm biến ánh sáng giúp cho chiếc đèn có thể tự nhận biết và đo lường được tông màu và cường độ ánh sáng của môi trường xung quanh để điều chỉnh tông màu và cường độ ánh sáng của đèn sao cho mang đến hiệu quả bảo vệ mắt tối ưu. |\n- Đèn để bàn thông minh Baseus Smart Eye Series có máng đèn thon dài, hệ thống thấu kính được thiết kế thông minh đảm bảo ánh sáng phản chiếu tối ưu và đồng đều nhất ở các vùng chiếu sáng và không gây chói mắt . Sản phẩm còn được trang bị pin sạc tiện dụng dung lượng 2,200mAh cho thời gian sử dụng liên tục lên đến 13h (tuỳ chế độ) .|', category: 'Phòng Ngủ', price: 145000, stock: 20 }, imageUrl: ['https://down-vn.img.susercontent.com/file/8429ee631166829664460ed28b688ee7', 'https://down-vn.img.susercontent.com/file/38fa7462b31a432ecc6c201926d34788', 'https://down-vn.img.susercontent.com/file/99163a79d3cddb93b428f20d53ffc2cb'], quantity: 3 }, { product: { product_id: 'UI02', product_name: 'Nồi Điện Đa Năng', description: 'Đây là một sản phẩm nồi điện đa năng mini với nhiều tính năng nổi bật: |\n\n✔️ Tay cầm cách nhiệt, không bị nóng hay bỏng tay khi di chuyển nồi |\n✔️ Lồng hấp gia cố dày, chống dínhvà dễ vệ sinh |\n✔️ Nguồn điện và dây điện có thể tách rời, tiện lợi sử dụng |\n✔️ Ca điện nấu có hấp . thích hợp cho cá nhân,ít người,nấu và hấp đồ ăn nhanh hoặc cho trẻ con và người già. |\n✔️ Có 2 chế độ điều khiển nhiệt phù hợp cho từng nhu cầu |\n\nCác thông số kỹ thuật chính của sản phẩm bao gồm: |\n✔️ Tên sản phẩm: Nồi điện đa năng mini chống dính Takora và SZHCN |\n✔️ Nguồn điện sử dụng: 220V – 50Hz |\n✔️ Công suất: 300W - 600W |\n✔️ Dây điện 2 chân |\n✔️ Trọng lượng: 0.7 |\n✔️ Kích thước : 20 x 19 x 29 cm |\n✔️ Màu sắc: Hồng, Trắng |\n✔️ Dung tích bình chứa nước : 1.5 lít + khay hấp |\n✔️ Bộ sản phẩm bao gồm: Full Box gồm: 1 nồi đa năng, 1 khay hấp, 1 HDSD, 1 dây điện, 1 hộp |\n✔️ Xuất Xứ: Trung Quốc |\n\nCam kết của Shop: |\n✔️ Shop luôn chọn các nhà sản xuất uy tín, chất lượng bên để hợp tác. Các sản phẩm bên Shop cung cấp luôn được tuyển chọn kỹ lưỡng về mẫu mã cũng như chất lượng để mang đến những sản phẩm đẹp, chất lượng tốt, theo xu hướng thời trang nhằm mang đến sự thỏa mãn và hài lòng của khách hàng. |\n✔️ Shop cam kết Sản phẩm y như hình ảnh, cam kết đổi trả miễn phí khi sản phẩm bị lỗi hoặc không giống như mô tả |\n=> GIÁ CẢ HỢP LÝ - CHẤT LƯỢNG HÀNG ĐẦU - VẬN CHUYỂN NHANH NHẤT. |', category: 'Nhà Bếp', price: 112000, stock: 14 }, imageUrl: ['https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lhpp2vn0nnb52b', 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-li1fq64mhvut10', 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lhpobotvasg504'], quantity: 1 }, { product: { product_id: 'UI21', product_name: 'Bình đun siêu tốc 2 lớp', description: 'THÔNG TIN KỸ THUẬT: |\n1.Thương hiệu : Comet |\n2.Sản phẩm : Bình đun siêu tốc |\n3.Mã sản phẩm : CM8226 |\n4.Điện áp : 220V - 50Hz |\n5.Công suất: 1500W |\n6.Dung tích: 1.8L |\n7.Kích thước : 200180263 – cân nặng : 0.7 kg |\n8.Bảo hành : 12 tháng |\n9.Công dụng : nấu nước |\n10.Xuất xứ : Trung Quốc |\nMÔ TẢ : |\n\nBình đun siêu tốc Comet CM8226 với những tính năng hữu ích, mang vẻ ngoài đẹp mắt, tạo tính thẩm mỹ cao, phù hợp với mọi không gian bày trí trong gian bếp. |\nDung tích 1.8 lít giúp bạn đun được một lượng nước vừa đủ để chế cà phê, pha trà hay chế mì tôm, pha nước nóng, đáp ứng nhanh chóng và kịp thời yêu cầu của người sử dụng. Chỉ từ 4 - 6 phút là phần nước đã sôi và tự động ngắt. |\nCác bộ phận bình đun siêu tốc CM8226 có sò nhiệt đôi bảo vệ chống quá tải, tự động nhảy công tắc ngắt điện chính xác, tránh các tình trạng chập điện xảy ra gây nguy hiểm cho người dùng. |\nBình đun siêu tốc CM8226 được thiết kế mâm nhiệt rời, có khe cài dây điện dưới đáy, dễ sử dụng và vệ sinh, chống cháy. Bình có lớp inox không truyền nhiệt - không truyền điện, không gỉ sét, chống bỏng nóng trong quá trình sử dụng hay di chuyển, bảo đảm an toàn cho người sử dụng. |\nSản phẩm bảo hành 12 tháng |\nGiao hàng màu ngẫu nhiên |', category: 'Gia Dụng', price: 300000, stock: 32 }, imageUrl: ['https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lhpz0q80k0w5ba', 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lhpz0q80o8lh48', 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lhpz0q80lfgla9'], quantity: 1 }, { product: { product_id: 'UI03', product_name: 'Nồi Lẩu Điện Mini', description: 'Nồi lẩu điện mini đa năng, ca nấu mì, cốc ăn lẩu Cô Đơn hotrend Trung Quốc dung tích 1.5L công suất. | \nlẩu điện mini đa năng, ca nấu mì, cốc ăn lẩu Cô Đơn hotrend Trung Quốc dung tích 1.5L công suất 500W phủ chống dính. | \n✅ Cam kết về chất lượng sản phẩm, hoàn tiền 💯% nếu hàng không đạt yêu cầu, kém chất lượng, sai mẫu mã. | \n✅ Quy trình | \n\nĐiểm nổi bật của nồi lẩu mini: | \n\nCông suất mạnh: Nấu ăn nhanh chóng, tiện lợi. | \nThiết kế an toàn, chất liệu cao cấp: Chịu được nhiệt độ cao, khung inox, vỏ cách nhiệt 3 lớp chống cháy, lõi nồi chống dính giúp nấu nướng cực kỳ tiện lợi. | \nĐáy bền: Được thiết kế bằng chất liệu cao cấp hút nhiệt nhanh chóng, khả năng chống bí mật cao giúp bạn dễ dàng nấu nướng và dễ dàng vệ sinh. | \nNồi được cắm 220v (cắm để sử dụng), có sức chứa 1,5 lít dây nguồn có thể tháo rời nên vệ sinh nồi cực kỳ tiện lợi. |', category: 'Nhà Bếp', price: 69500, stock: 30 }, imageUrl: ['https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgn67eznbx9u70', 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgn67ezndbuad5', 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgn67ezneqeqc5', 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgn67eznhjjma2'], quantity: 1 }, { product: { product_id: 'UI22', product_name: 'Ấm siêu tốc KANGJIA', description: '🍀Chào mừng đến với cửa hàng của chúng tôi: |\n🍀 Nếu quan tâm đến giá sỉ, bạn có thể chat riêng với chúng tôi. |\n🍀 Khi bạn nhận được sản phẩm, vui lòng nhấn chấp nhận. |\n🍀Đánh giá 5 sao rất khuyến khích cho cửa hàng của chúng tôi. |\n🍀 Nếu khách hàng không hài lòng với hệ thống giao hàng. Vui lòng tách dịch vụ khỏi các cửa hàng và công ty vận tải. bởi vì cửa hàng không thể thực sự kiểm soát việc vận chuyển. |\n🍀 Nếu sản phẩm có vấn đề hoặc đang được vận chuyển. Xin vui lòng liên hệ với cửa hàng của chúng tôi để được trợ giúp và sửa chữa. |\n🍀 Sản phẩm của chúng tôi có chất lượng cao và giá rẻ. Vì vậy, bạn không phải lo lắng rằng sản phẩm sẽ không khớp với sản phẩm thật. Các sản phẩm có chất lượng cao và chắc chắn rẻ. |', category: 'Gia Dụng', price: 200000, stock: 32 }, imageUrl: ['https://down-vn.img.susercontent.com/file/sg-11134201-7qvd6-ljdkhfk67cb12f', 'https://down-vn.img.susercontent.com/file/sg-11134201-7qvfl-ljdkhgkiq5u52e', 'https://down-vn.img.susercontent.com/file/sg-11134201-7qvdx-ljdkhh161spba1'], quantity: 1 }] }
</script>
