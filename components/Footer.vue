<template>
  <div class="flex flex-col space-y-6 bg-primary-300 py-12 font-sans">
    <div class="flex justify-around ">
      <!-- col 1 -->
      <div class="flex flex-col space-y-2">
        <NuxtLink to="/trang-chu">
          Trang Chủ
        </NuxtLink>
        <NuxtLink to="/san-pham">
          Sản Phẩm
        </NuxtLink>
        <NuxtLink to="/gioi-thieu">
          Giới Thiệu
        </NuxtLink>
        <NuxtLink to="/lien-he">
          Liên Hệ
        </NuxtLink>
      </div>
      <!-- col 2 -->
      <div class="flex flex-col space-y-2">
        <NuxtLink to="/">
          Hướng Dẫn Mua Hàng
        </NuxtLink>
        <NuxtLink to="/">
          Chính Sách Đổi Trả
        </NuxtLink>
        <NuxtLink to="/">
          Câu Hỏi Thường Gặp
        </NuxtLink>
      </div>
      <!-- col 3 -->
      <div class="flex flex-col space-y-2">
        <h3>Phương Thức Thanh Toán</h3>
        <div class="flex space-x-3 items-center">
          <Icon
            icon="tabler:credit-card"
            style="font-size: 30px;"
          />
          <h3>COD</h3>
        </div>
      </div>
      <!-- col4 -->
      <div class="flex flex-col space-y-2">
        <h3>Liên Hệ Với Chúng Tôi</h3>
        <div class="flex">
          <NuxtLink to="/">
            <Icon
              icon="tabler:brand-facebook"
              style="font-size: 30px;"
            />
          </NuxtLink>
          <NuxtLink to="/">
            <Icon
              icon="tabler:brand-instagram"
              style="font-size: 30px;"
            />
          </NuxtLink>
        </div>
      </div>
      <!-- col 5 -->
      <div class="flex flex-col space-y-2">
        <h3>Nhận Ưu Đãi Mới Nhất</h3>
        <UInput placeholder="Links@gmail.com" />
      </div>
    </div>
    <UDivider class="px-10" />
    <!-- bottom footer -->
    <div class="flex justify-center space-x-3">
      <h3>
        Copyright © 2024 Links Interior
      </h3>
      <UDivider orientation="vertical" />
      <h3>
        Chính Sách
      </h3>
      <UDivider orientation="vertical" />
      <h3>
        Điều Khoản
      </h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
</script>

<style>

</style>
