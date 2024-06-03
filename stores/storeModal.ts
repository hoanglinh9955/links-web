import { defineStore } from 'pinia'

export const reloadState = defineStore('state', () => {
  const reloadState = ref(1)
  const totalAmountGlobal = ref(0)
  const description = ref('')
  const order_id = ref('')
  return { reloadState, totalAmountGlobal, description, order_id }
})
