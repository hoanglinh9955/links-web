<template>
  <div class="flex flex-col space-y-28">
    <!-- san pham ban chay div -->
    <UContainer class="flex flex-col justify-center items-center pt-16">
      <UDivider size="xs" :ui="{label :'text-4xl'}" label="Sản Phẩm Bán Chạy" />
      <div class="flex flex-col justify-center items-center pt-10">
        <div class="flex space-x-5">
          <CardContainer />
          <CardContainer />
          <CardContainer />
          <CardContainer />
        </div>
        <NuxtLink class="pt-5 w-full flex justify-end mr-8 items-center font-medium" to="/san-pham">
          Xem Thêm  <Icon class="m-1" name="i-heroicons-chevron-double-right"/>
        </NuxtLink>
      </div>
    </UContainer>
    <!-- san pham ban chay div -->
    <UContainer class="flex flex-col justify-center items-center">
      <UDivider size="xs" :ui="{label :'text-4xl'}" label="Sản Phẩm Bán Chạy" />
      <div class="flex flex-col justify-center items-center pt-10">
        <div class="flex space-x-5">
          <CardContainer />
          <CardContainer />
          <CardContainer />
          <CardContainer />
        </div>
        <NuxtLink class="pt-5 w-full flex justify-end mr-8 items-center font-medium" to="/san-pham">
          Xem Thêm  <Icon class="m-1" name="i-heroicons-chevron-double-right"/>
        </NuxtLink>
      </div>
    </UContainer>

    <!-- san pham ban chay div -->
    <UContainer class="flex flex-col justify-center items-center">
      <UDivider size="xs" :ui="{label :'text-4xl'}" label="Sản Phẩm Bán Chạy" />
      <div class="flex flex-col justify-center items-center pt-10">
        <div class="flex space-x-5">
          <CardContainer />
          <CardContainer />
          <CardContainer />
          <CardContainer />
        </div>
        <NuxtLink class="pt-5 w-full flex justify-end mr-8 items-center font-medium" to="/san-pham">
          Xem Thêm  <Icon class="m-1" name="i-heroicons-chevron-double-right"/>
        </NuxtLink>
      </div>
    </UContainer>

    <!-- san pham ban chay div -->
    <UContainer class="flex flex-col justify-center items-center pb-8">
      <UDivider size="xs" :ui="{label :'text-4xl'}" label="Sản Phẩm Bán Chạy" />
      <div class="flex flex-col justify-center items-center pt-10">
        <div class="flex space-x-5">
          <CardContainer />
          <CardContainer />
          <CardContainer />
          <CardContainer />
        </div>
        <NuxtLink class="pt-5 w-full flex justify-end mr-8 items-center font-medium" to="/san-pham">
          Xem Thêm  <Icon class="m-1" name="i-heroicons-chevron-double-right"/>
        </NuxtLink>
      </div>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>
