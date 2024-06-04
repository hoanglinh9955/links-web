<template>
  <div class="flex flex-col space-y-4">
    <div
      v-for="(item, index) in data.products"
      :key="index"
      class="flex space-x-4"
    >
      <img
        :src="item.image_url"
        class="w-28 h-28 transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
        @click="navigateToProduct(item.product_id)"
      >
      <div class="flex flex-col w-52">
        <h3 class="text-lg text-wrap font-medium">
          {{ item.product_name }}
        </h3>
        <h4 class="w-52 text-sm truncate">
          {{ item.product_description }}
        </h4>
      </div>

      <h4 class="p-3">
        {{ item.quantity }}
      </h4>
      <h4 class="py-3 font-medium">
        {{ Intl.NumberFormat('vi-VN', {
          style: 'currency', currency: 'VND',
        }).format(item.product_price * item.quantity) }}
      </h4>
    </div>
  </div>
</template>

<script setup>
import { reloadState } from '~/stores/storeModal'

const order_id = storeToRefs(reloadState()).order_id
console.log('🚀 ~ order_id:', order_id.value)

const { data } = await useFetch(`https://linkss.pages.dev/api/orders/getProductList`, {
  query: { order_id: `${order_id.value}` },
})
// const data = ref()
// data.value = { "success": true, "products": [ { "order_id": "ORDER1717429717241", "product_id": "UI06", "product_name": "Quạt Điện Kaimeidi", "product_description": "Chào mừng đến với cửa hàng của chúng tôi \"|\"\n🍀 Nếu quan tâm đến giá bán buôn , bạn có thể trò chuyện riêng với chúng tôi \"|\"\n🍀 Khi bạn nhận được sản phẩm , xin vui lòng nhấn chấp nhận \"|\"\n🍀Đánh giá 5 sao rất khuyến khích cho cửa hàng của chúng tôi \"|\"\n🍀 Nếu khách hàng không hài lòng với hệ thống giao hàng . Vui lòng tách dịch vụ khỏi các cửa hàng và công ty vận tải. bởi vì cửa hàng không thể thực sự kiểm soát việc vận chuyển \"|\"\n🍀 Nếu sản phẩm có vấn đề hoặc đang được vận chuyển . Xin vui lòng liên hệ với cửa hàng của chúng tôi để được trợ giúp và sửa chữa \"|\"\n🍀 Sản phẩm của chúng tôi có chất lượng cao và giá rẻ . Vì vậy , bạn không phải lo lắng rằng sản phẩm sẽ không khớp với sản phẩm thật . Các sản phẩm có chất lượng cao và chắc chắn rẻ \"|\"", "product_price": 135000, "quantity": 1, "image_url": "https://down-vn.img.susercontent.com/file/sg-11134201-7qver-lhzm1aur8cb64a" }, { "order_id": "ORDER1717429717241", "product_id": "UI15", "product_name": "Nafenai Đèn led Để Bàn", "product_description": "Đặc điểm kỹ thuật: Nút 3W [ánh sáng ấm] Giao diện USB, |\nĐiện áp: 220V |\nKính gửi quý khách hàng ♥ ： |\n【🌿Lưu ý 1 ” |\nDo màn hình và hiệu ứng ánh sáng khác nhau, màu sắc thực tế của mặt hàng có thể hơi khác so với hình ảnh. Vui lòng cho phép lỗi (± 3 cm) do đo lường thủ công |\n【🌿Lưu ý 2 \" |\nTrước khi đặt hàng, vui lòng kiểm tra xem thông tin có chính xác không. Vui lòng chọn đúng kích thước, màu sắc và sản phẩm. Vui lòng ghi rõ họ tên, địa chỉ, số điện thoại của người nhận khi đặt hàng |", "product_price": 190000, "quantity": 2, "image_url": "https://down-vn.img.susercontent.com/file/sg-11134201-7rbkq-lpuk1e2nmo1xec" } ] }

const navigateToProduct = (product_id) => {
  navigateTo(`/chi-tiet-san-pham/${product_id}`)
}
</script>

<style>

</style>
