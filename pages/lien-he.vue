<template>
  <UContainer class="flex flex-col w-3/5">
    <h2 class="text-center text-3xl pt-10">
      Liên hệ
    </h2>
    <h3 class="w-full py-5">
      Chúng tôi luôn sẵn lòng lắng nghe và hỗ trợ bạn! Hãy liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi, đề xuất hoặc yêu cầu đặc biệt nào. Chúng tôi sẽ cố gắng trả lời bạn trong thời gian sớm nhất có thể.
    </h3>
    <h2 class="text-start text-2xl py-5">
      Thông tin Liên hệ:
    </h2>
    <h3>
      Địa chỉ:<NuxtLink to="Https://linkss.pages.dev">
        Link Interiors
      </NuxtLink>
    </h3>
    <h3> Số điện thoại: <tel>+84 398651198</tel> </h3>
    <h3>
      Email:
      links.cnt@gmail.com
    </h3>

    <h2 class="text-start text-2xl py-5">
      Giờ làm việc:
    </h2>
    <h3>Thứ Hai - Chủ Nhật: 8:00 sáng - 8:00 chiều</h3>
    <h3 class="py-5">
      Ngoài giờ làm việc, bạn có thể gửi email cho chúng tôi hoặc để lại tin nhắn qua biểu mẫu liên hệ dưới đây. Chúng tôi sẽ phản hồi bạn ngay khi có thể.
    </h3>

    <UDivider
      size="sm"
      class="py-5"
    />

    <h2 class="text-center text-2xl py-5">
      Liên Hệ Với chúng tôi:
    </h2>
    <UForm
      :validate="validate"
      class="flex flex-col w-full items-center justify-center space-y-3"
      @submit="onSubmit"
      @error="onError"
    >
      <UFormGroup
        class="w-4/5"
        name="user_name"
        label="Họ và Tên"
      >
        <UInput
          v-model="user_name"
          :ui="{ rounded: 'rounded-xl' }"
          size="lg"
          class="w-full"
          placeholder="Họ và Tên"
        />
      </UFormGroup>
      <div class="flex w-full justify-center space-x-1">
        <UFormGroup
          class="w-3/5"
          name="email"
          label="Email"
        >
          <UInput
            v-model="email"
            :ui="{ rounded: 'rounded-xl' }"
            size="lg"
            class="w-full"
            placeholder="Email"
          />
        </UFormGroup>
        <UFormGroup
          class="w-1/5"
          name="phone_number"
          label="Số Điện Thoại"
        >
          <UInput
            v-model="phone_number"
            type="tel"
            name="phone_number"
            placeholder="Số Điện Thoại"
            class="w-full"
            size="lg"
            :ui="{ rounded: 'rounded-xl' }"
          />
        </UFormGroup>
      </div>

      <UFormGroup
        class="w-4/5"
        name="address"
        label="Nội Dung"
      >
        <UTextarea
          v-model="address"
          resize
          name="address"
          :ui="{ rounded: 'rounded-xl' }"
          size="lg"
          class="w-full"
          placeholder="Nội Dung"
        />
      </UFormGroup>
      <UButton
        size="lg"
        class="w-4/5"
        block
        type="submit"
      >
        Gửi Thông Tin
      </UButton>
    </UForm>
  </UContainer>
</template>

<script setup>
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
</script>

<style>

</style>
