<template>
  <UContainer class="flex flex-col justify-between w-full items-center space-y-5 py-10">
    <h1 class="text-4xl font-medium">
      Giỏ Hàng Của Bạn
    </h1>

    <div v-if="isHaveProduct">
      <div v-if="status">
        <UProgress animation="carousel" />
      </div>
      <ClientOnly>
        <h4 class="text-center">
          Bạn Có {{ cartNum }} Sản Phẩm Trong Giỏ Hàng
        </h4>
        <!-- cart -->

        <div class="w-full flex flex-col space-y-5 pt-12">
          <div
            v-for="(product, index) in displayList.displayList"
            :key="index"
            class="w-full flex justify-between items-center rounded-3xl p-5 border-2 border-black"
          >
            <div class="flex space-x-8 justify-between">
              <img
                :src="product.imageUrl[0]"
                alt="product"
                class="w-32 h-32 transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
                @click="navigateToProduct(product.product.product_id)"
              >
              <!-- name and price -->
              <div class="flex flex-col space-y-3">
                <h3 class="text-2xl font-medium w-72">
                  {{ product.product.product_name }}
                </h3>
                <!-- price -->
                <h4>
                  {{ Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.product.price) }}
                </h4>
                <h4
                  v-if="product.product.stock == 0"
                  class="text-red-600"
                >
                  Sản Phẩm Hết Hàng
                </h4>
              </div>
              <!-- quantity -->
              <div class="flex w-16 mt-1">
                <UInput
                  v-model="product.quantity"
                  min="1"
                  type="number"
                  class="text-center"
                  @change="updateQuantity(product.product.product_id, product.quantity)"
                />
              </div>
              <!-- thanh tien -->
              <div class="flex flex-col text-center items-end space-y-5 w-36 ">
                <h4 class="text-lg font-medium mt-1">
                  {{ Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.product.price
                    * product.quantity) }}
                </h4>
                <UButton
                  icon="i-heroicons-trash"
                  :color="product.product.stock === 0 ? 'red' : 'white'"
                  variant="ghost"
                  size="lg"
                  :class="[
                    'transition ease-in-out delay-150 duration-300',
                    product.product.stock === 0 ? 'scale-125 hover:-translate-y-1 hover:scale-175' : 'hover:-translate-y-1 hover:scale-125',
                  ]"
                  @click="removeFromCart(product.product.product_id)"
                />
              </div>
            </div>
          </div>
          <UDivider
            size="sm"
            class="py-4"
          />
          <div
            v-if="totalPrice != 0"
            class="text-end text-xl"
          >
            Tổng Tiền: <span class="font-medium"> {{ Intl.NumberFormat('vi-VN', {
              style: 'currency', currency: 'VND',
            }).format(totalPrice) }} </span>
          </div>
          <UDivider
            size="sm"
            class="py-4"
          />
          <div
            v-if="totalPrice != 0"
            class="text-end pt-5"
          >
            <UButton
              size="xl"
              icon="i-heroicons-banknotes"
              class="w-1/4 rounded-3xl"
              to="/thanh-toan"
              :trailing="false"
            >
              Thanh Toán Ngay
            </UButton>
          </div>
        </div>
      </ClientOnly>
    </div>
    <div
      v-else
      class="flex flex-col justify-between items-center space-y-5"
    >
      <h4>Chưa Có Sản Phẩm Nào Trong Giỏ Hàng Của Bạn</h4>
      <UButton
        size="lg"
        to="/san-pham"
        block
        class="w-1/2 rounded-3xl"
        color="white"
      >
        Mua Sắm Ngay
      </UButton>
    </div>
  </UContainer>
</template>

<script setup>
import { reloadState } from '~/stores/storeModal'

const toast = useToast()
const status = ref(false)
const reload = storeToRefs(reloadState()).reloadState
const cartNum = ref(0)
const productList = ref([])
const displayList = ref([])
const totalPrice = ref(0)

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

    // Iterate through the displayList and ensure that quantities are within available stock
    for (let i = 0; i < displayList.value.displayList.length; i++) {
      const product = displayList.value.displayList[i].product
      const maxStock = product.stock
      const currentQuantity = displayList.value.displayList[i].quantity

      // If the current quantity exceeds stock, set it to the maximum available stock
      if (currentQuantity > maxStock) {
        displayList.value.displayList[i].quantity = maxStock
        toast.add({ title: `Rất tiếc, ${product.product_name} không còn đủ hàng (chỉ còn ${maxStock} sản phẩm)`, timeout: 3000 })
      }
    }

    calculatePrice()
  }
}, 200)

const isHaveProduct = computed(() => cartNum.value > 0)

const removeFromCart = (product_id) => {
  const value = window.localStorage.getItem('cart-links')
  if (value != null) {
    let cart = JSON.parse(value) || []

    // Remove the item with matching product_id from the cart
    cart = cart.filter(item => item.product_id !== product_id)

    window.localStorage.setItem('cart-links', JSON.stringify(cart))
    setTimeout(() => {
      displayList.value.displayList = displayList.value.displayList.filter(item => item.product.product_id !== product_id)
      reload.value++
      toast.add({ title: 'Xóa Sản Phẩm Thành Công !', timeout: 3000 })
      calculatePrice()
    }, 200)
  }
}

// const updateQuantity = (product_id, newQuantity) => {
//   // Find the product in the displayList and update its quantity
//   const index = displayList.value.displayList.findIndex(item => item.product.product_id === product_id)
//   if (index !== -1) {
//     if (newQuantity < 1) {
//       newQuantity = 1
//     }
//     // Check if newQuantity exceeds stock, set it to the maximum available stock
//     const maxStock = displayList.value.displayList[index].product.stock
//     if (newQuantity > maxStock) {
//       newQuantity = maxStock
//       toast.add({ title: `Rất tiếc, ${displayList.value.displayList[index].product.product_name} không còn đủ hàng (chỉ còn ${maxStock} sản phẩm) `, timeout: 3000 })
//     }
//     displayList.value.displayList[index].quantity = newQuantity
//     calculatePrice() // Recalculate total price after updating quantity
//   }
// }

const updateQuantity = (product_id, newQuantity) => {
  // Find the product in the displayList and update its quantity
  const index = displayList.value.displayList.findIndex(item => item.product.product_id === product_id)
  if (index !== -1) {
    if (newQuantity < 1) {
      newQuantity = 1
    }
    // Check if newQuantity exceeds stock, set it to the maximum available stock
    const maxStock = displayList.value.displayList[index].product.stock
    if (newQuantity > maxStock) {
      newQuantity = maxStock
      toast.add({ title: `Rất tiếc, ${displayList.value.displayList[index].product.product_name} không còn đủ hàng (chỉ còn ${maxStock} sản phẩm) `, timeout: 3000 })
    }
    displayList.value.displayList[index].quantity = newQuantity
    calculatePrice() // Recalculate total price after updating quantity

    // Update the local storage with the new quantity
    const cart = JSON.parse(window.localStorage.getItem('cart-links')) || []
    const updatedCart = cart.map((item) => {
      if (item.product_id === product_id) {
        item.quantity = newQuantity
      }
      return item
    })
    window.localStorage.setItem('cart-links', JSON.stringify(updatedCart))
  }
}

const calculatePrice = () => {
  let total = 0
  for (let i = 0; i < displayList.value.displayList.length; i++) {
    total += displayList.value.displayList[i].product.price * displayList.value.displayList[i].quantity
  }
  totalPrice.value = total
}

const navigateToProduct = (product_id) => {
  console.log(product_id)
  navigateTo(`/chi-tiet-san-pham/${product_id}`)
}

// const mockData = { success: true, displayList: [{ product: { product_id: 'UI06', product_name: 'Quạt Điện Kaimeidi', description: 'Chào mừng đến với cửa hàng của chúng tôi "|"\n🍀 Nếu quan tâm đến giá bán buôn , bạn có thể trò chuyện riêng với chúng tôi "|"\n🍀 Khi bạn nhận được sản phẩm , xin vui lòng nhấn chấp nhận "|"\n🍀Đánh giá 5 sao rất khuyến khích cho cửa hàng của chúng tôi "|"\n🍀 Nếu khách hàng không hài lòng với hệ thống giao hàng . Vui lòng tách dịch vụ khỏi các cửa hàng và công ty vận tải. bởi vì cửa hàng không thể thực sự kiểm soát việc vận chuyển "|"\n🍀 Nếu sản phẩm có vấn đề hoặc đang được vận chuyển . Xin vui lòng liên hệ với cửa hàng của chúng tôi để được trợ giúp và sửa chữa "|"\n🍀 Sản phẩm của chúng tôi có chất lượng cao và giá rẻ . Vì vậy , bạn không phải lo lắng rằng sản phẩm sẽ không khớp với sản phẩm thật . Các sản phẩm có chất lượng cao và chắc chắn rẻ "|"', category: 'Phòng Ngủ', price: 135000, stock: 20 }, imageUrl: ['https://down-vn.img.susercontent.com/file/sg-11134201-7qvfh-lhzm1abc260k27', 'https://down-vn.img.susercontent.com/file/sg-11134201-7qver-lhzm1aur8cb64a', 'https://down-vn.img.susercontent.com/file/sg-11134201-7qvf8-lhzm1bp9zo9f54'], quantity: 1 }, { product: { product_id: 'UI07', product_name: 'Kệ Gỗ 4 Tầng', description: 'Kích thước: |\n- Kệ GM05: Dài 50cm x Rộng 30cm x Cao 100cm |\n- Kệ GM06: Dài 50cm x Rộng 30cm x Cao 97cm |\nChất liệu: Gỗ công nghiệp MDF phủ Melamine chống nước, chống xước, chống mối mọt. Khung thép sơn tĩnh điện. |\nMàu sắc: Khung trắng/Khung đen |\nVẬN CHUYỂN & LẮP ĐẶT: Sản phẩm được giao chưa lắp đặt sẵn, chúng tôi có kèm theo sách + video hướng dẫn lắp đặt. Nếu có thắc mắc về lắp đặt và sử dụng sản phẩm, liên hệ ngay cho chúng tôi để được nhân viên hổ trợ. |', category: 'Phòng Ngủ', price: 292000, stock: 20 }, imageUrl: ['https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lnmozxk0fzsde5', 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lnmozxk0fzsde5', 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lua80i32dmvz39'], quantity: 2 }, { product: { product_id: 'UI05', product_name: 'Đèn Led Để Bàn', description: 'MÔ TẢ SẢN PHẨM|\nThông số kĩ thuật:|\n- Trang bị cảm biến tự động điều chỉnh tông màu và cường độ ánh sáng theo môi trường . |\n- Sử dụng pin sạc 3000mAh cho thời gian sử dụng lên đến 13 giờ . |\n- Máng đèn thiết kế thông minh có thể xếp gấp gọn gàng, phản chiếu ánh sáng đồng đều hơn. |\n- Trang bị hệ thống đèn LED Full-Spectrum cao cấp giúp tái tạo ánh sáng tốt hơn, chống rung - nhiễu , không gây chói mắt . |\n- Kích thước: 290 * 75/350 * 45 mm |\n- Vật liệu: Nhựa ABS, PC và hợp kim nhôm |\n- Dung lượng pin: 2200mAh |\n- Nhiệt độ màu: 3000k - 4000k - 6000k |\n- Thời gian sạc: ~3 tiếng |\nCổng sạc: Type C|\n\n\nNếu bạn đang cần tìm một chiếc đèn để bàn chất lượng cao phục vụ cho nhu cầu học tập, làm việc hay đọc sách với thời gian dài mà không gây hại cho mắt thì Baseus Smart Eye Series là một chiếc đèn cao cấp dành riêng cho bạn . Baseus Smart Eye Series là một chiếc đèn để bàn cao cấp với thiết kế sang trọng, hiện đại đi cùng với nhiều tính năng thông minh có thể đáp tất cả các nhu cầu học tập, làm việc và đọc sách|\n\n\nTính năng cơ bản Đèn để bàn thông minh Baseus Smart Eye Series Charging Folding Reading Desk Lamp |\n- Đèn để bàn thông minh Baseus Smart Eye Series sỡ hữu một thiết kế trẻ trung hiện đại. Sản phẩm được làm bằng hợp kim nhôm chắc chắn , bề mặt được sơn tỉnh điện chống bám vân tay với 2 tông màu xám và trắng . Kiểu dáng thon dài đơn giản nhưng không kém phần tinh tế và sang trọng , phù hợp cho bàn làm việc và nhiều không gian sinh hoạt khác nhau kể cả phòng ngủ . |\n- Sản phẩm sử dụng đèn LED cao cấp thế hệ mới giúp tiết kiệm pin, tần số quét cực cao, khả năng chông rung - chống nhiểu cực tốt đáp ứng full dãy phổ màu ánh sáng (full - spectrum) với dãy nhiệt độ màu đáp ứng 3000k - 6000k.|\n- Ngoài ra đèn để bàn thông minh Baseus Smart Eye Series còn được trang bị cảm biến ánh sáng giúp cho chiếc đèn có thể tự nhận biết và đo lường được tông màu và cường độ ánh sáng của môi trường xung quanh để điều chỉnh tông màu và cường độ ánh sáng của đèn sao cho mang đến hiệu quả bảo vệ mắt tối ưu. |\n- Đèn để bàn thông minh Baseus Smart Eye Series có máng đèn thon dài, hệ thống thấu kính được thiết kế thông minh đảm bảo ánh sáng phản chiếu tối ưu và đồng đều nhất ở các vùng chiếu sáng và không gây chói mắt . Sản phẩm còn được trang bị pin sạc tiện dụng dung lượng 2,200mAh cho thời gian sử dụng liên tục lên đến 13h (tuỳ chế độ) .|', category: 'Phòng Ngủ', price: 145000, stock: 20 }, imageUrl: ['https://down-vn.img.susercontent.com/file/8429ee631166829664460ed28b688ee7', 'https://down-vn.img.susercontent.com/file/38fa7462b31a432ecc6c201926d34788', 'https://down-vn.img.susercontent.com/file/99163a79d3cddb93b428f20d53ffc2cb'], quantity: 3 }, { product: { product_id: 'UI02', product_name: 'Nồi Điện Đa Năng', description: 'Đây là một sản phẩm nồi điện đa năng mini với nhiều tính năng nổi bật: |\n\n✔️ Tay cầm cách nhiệt, không bị nóng hay bỏng tay khi di chuyển nồi |\n✔️ Lồng hấp gia cố dày, chống dínhvà dễ vệ sinh |\n✔️ Nguồn điện và dây điện có thể tách rời, tiện lợi sử dụng |\n✔️ Ca điện nấu có hấp . thích hợp cho cá nhân,ít người,nấu và hấp đồ ăn nhanh hoặc cho trẻ con và người già. |\n✔️ Có 2 chế độ điều khiển nhiệt phù hợp cho từng nhu cầu |\n\nCác thông số kỹ thuật chính của sản phẩm bao gồm: |\n✔️ Tên sản phẩm: Nồi điện đa năng mini chống dính Takora và SZHCN |\n✔️ Nguồn điện sử dụng: 220V – 50Hz |\n✔️ Công suất: 300W - 600W |\n✔️ Dây điện 2 chân |\n✔️ Trọng lượng: 0.7 |\n✔️ Kích thước : 20 x 19 x 29 cm |\n✔️ Màu sắc: Hồng, Trắng |\n✔️ Dung tích bình chứa nước : 1.5 lít + khay hấp |\n✔️ Bộ sản phẩm bao gồm: Full Box gồm: 1 nồi đa năng, 1 khay hấp, 1 HDSD, 1 dây điện, 1 hộp |\n✔️ Xuất Xứ: Trung Quốc |\n\nCam kết của Shop: |\n✔️ Shop luôn chọn các nhà sản xuất uy tín, chất lượng bên để hợp tác. Các sản phẩm bên Shop cung cấp luôn được tuyển chọn kỹ lưỡng về mẫu mã cũng như chất lượng để mang đến những sản phẩm đẹp, chất lượng tốt, theo xu hướng thời trang nhằm mang đến sự thỏa mãn và hài lòng của khách hàng. |\n✔️ Shop cam kết Sản phẩm y như hình ảnh, cam kết đổi trả miễn phí khi sản phẩm bị lỗi hoặc không giống như mô tả |\n=> GIÁ CẢ HỢP LÝ - CHẤT LƯỢNG HÀNG ĐẦU - VẬN CHUYỂN NHANH NHẤT. |', category: 'Nhà Bếp', price: 112000, stock: 14 }, imageUrl: ['https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lhpp2vn0nnb52b', 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-li1fq64mhvut10', 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lhpobotvasg504'], quantity: 1 }, { product: { product_id: 'UI21', product_name: 'Bình đun siêu tốc 2 lớp', description: 'THÔNG TIN KỸ THUẬT: |\n1.Thương hiệu : Comet |\n2.Sản phẩm : Bình đun siêu tốc |\n3.Mã sản phẩm : CM8226 |\n4.Điện áp : 220V - 50Hz |\n5.Công suất: 1500W |\n6.Dung tích: 1.8L |\n7.Kích thước : 200180263 – cân nặng : 0.7 kg |\n8.Bảo hành : 12 tháng |\n9.Công dụng : nấu nước |\n10.Xuất xứ : Trung Quốc |\nMÔ TẢ : |\n\nBình đun siêu tốc Comet CM8226 với những tính năng hữu ích, mang vẻ ngoài đẹp mắt, tạo tính thẩm mỹ cao, phù hợp với mọi không gian bày trí trong gian bếp. |\nDung tích 1.8 lít giúp bạn đun được một lượng nước vừa đủ để chế cà phê, pha trà hay chế mì tôm, pha nước nóng, đáp ứng nhanh chóng và kịp thời yêu cầu của người sử dụng. Chỉ từ 4 - 6 phút là phần nước đã sôi và tự động ngắt. |\nCác bộ phận bình đun siêu tốc CM8226 có sò nhiệt đôi bảo vệ chống quá tải, tự động nhảy công tắc ngắt điện chính xác, tránh các tình trạng chập điện xảy ra gây nguy hiểm cho người dùng. |\nBình đun siêu tốc CM8226 được thiết kế mâm nhiệt rời, có khe cài dây điện dưới đáy, dễ sử dụng và vệ sinh, chống cháy. Bình có lớp inox không truyền nhiệt - không truyền điện, không gỉ sét, chống bỏng nóng trong quá trình sử dụng hay di chuyển, bảo đảm an toàn cho người sử dụng. |\nSản phẩm bảo hành 12 tháng |\nGiao hàng màu ngẫu nhiên |', category: 'Gia Dụng', price: 300000, stock: 32 }, imageUrl: ['https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lhpz0q80k0w5ba', 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lhpz0q80o8lh48', 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lhpz0q80lfgla9'], quantity: 1 }, { product: { product_id: 'UI03', product_name: 'Nồi Lẩu Điện Mini', description: 'Nồi lẩu điện mini đa năng, ca nấu mì, cốc ăn lẩu Cô Đơn hotrend Trung Quốc dung tích 1.5L công suất. | \nlẩu điện mini đa năng, ca nấu mì, cốc ăn lẩu Cô Đơn hotrend Trung Quốc dung tích 1.5L công suất 500W phủ chống dính. | \n✅ Cam kết về chất lượng sản phẩm, hoàn tiền 💯% nếu hàng không đạt yêu cầu, kém chất lượng, sai mẫu mã. | \n✅ Quy trình | \n\nĐiểm nổi bật của nồi lẩu mini: | \n\nCông suất mạnh: Nấu ăn nhanh chóng, tiện lợi. | \nThiết kế an toàn, chất liệu cao cấp: Chịu được nhiệt độ cao, khung inox, vỏ cách nhiệt 3 lớp chống cháy, lõi nồi chống dính giúp nấu nướng cực kỳ tiện lợi. | \nĐáy bền: Được thiết kế bằng chất liệu cao cấp hút nhiệt nhanh chóng, khả năng chống bí mật cao giúp bạn dễ dàng nấu nướng và dễ dàng vệ sinh. | \nNồi được cắm 220v (cắm để sử dụng), có sức chứa 1,5 lít dây nguồn có thể tháo rời nên vệ sinh nồi cực kỳ tiện lợi. |', category: 'Nhà Bếp', price: 69500, stock: 30 }, imageUrl: ['https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgn67eznbx9u70', 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgn67ezndbuad5', 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgn67ezneqeqc5', 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lgn67eznhjjma2'], quantity: 1 }, { product: { product_id: 'UI22', product_name: 'Ấm siêu tốc KANGJIA', description: '🍀Chào mừng đến với cửa hàng của chúng tôi: |\n🍀 Nếu quan tâm đến giá sỉ, bạn có thể chat riêng với chúng tôi. |\n🍀 Khi bạn nhận được sản phẩm, vui lòng nhấn chấp nhận. |\n🍀Đánh giá 5 sao rất khuyến khích cho cửa hàng của chúng tôi. |\n🍀 Nếu khách hàng không hài lòng với hệ thống giao hàng. Vui lòng tách dịch vụ khỏi các cửa hàng và công ty vận tải. bởi vì cửa hàng không thể thực sự kiểm soát việc vận chuyển. |\n🍀 Nếu sản phẩm có vấn đề hoặc đang được vận chuyển. Xin vui lòng liên hệ với cửa hàng của chúng tôi để được trợ giúp và sửa chữa. |\n🍀 Sản phẩm của chúng tôi có chất lượng cao và giá rẻ. Vì vậy, bạn không phải lo lắng rằng sản phẩm sẽ không khớp với sản phẩm thật. Các sản phẩm có chất lượng cao và chắc chắn rẻ. |', category: 'Gia Dụng', price: 200000, stock: 32 }, imageUrl: ['https://down-vn.img.susercontent.com/file/sg-11134201-7qvd6-ljdkhfk67cb12f', 'https://down-vn.img.susercontent.com/file/sg-11134201-7qvfl-ljdkhgkiq5u52e', 'https://down-vn.img.susercontent.com/file/sg-11134201-7qvdx-ljdkhh161spba1'], quantity: 1 }] }
</script>
