<template>
  <div>
    <img
      :src="imageUrl"
      alt="QR Code"
    >
  </div>
</template>

<script setup>
import { reloadState } from '~/stores/storeModal'

const description = storeToRefs(reloadState()).description
const totalAmount = storeToRefs(reloadState()).totalAmountGlobal

const My_Bank = {
  BANK_ID: '970423',
  ACCOUNT_NO: '98651198044',
  TEMPLATE: 'czSs4yJ',
  ACCOUNT_NAME: 'LE HOANG LINH',
  DESCRIPTION: description.value,
}

const { BANK_ID, ACCOUNT_NO, TEMPLATE, ACCOUNT_NAME, DESCRIPTION } = My_Bank
const imageUrl = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-${TEMPLATE}.jpg?accountName=${ACCOUNT_NAME}&amount=${totalAmount.value}&addInfo=${DESCRIPTION}`
// const url = `https://api.vietqr.io/image/970423-98651198044-czSs4yJ.jpg?accountName=LE%20HOANG%20LINH&amount=2000&addInfo=CK%20Thanh%20Toan%20Don%20Hang`
</script>

<style>

</style>
