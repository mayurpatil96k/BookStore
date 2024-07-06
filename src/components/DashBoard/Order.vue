<script setup lang="ts">
import router from '@/router'
import { useCartStore } from '@/stores/counter'
import { computed } from 'vue'
const CartStore = useCartStore()
const cart = computed(() => {
  CartStore.cart
})
const redirect = () => {
  router.push('books')
}
</script>
<template>
  <div class="w-100 d-flex align-center justify-center">
    <img src="../../assets/Screenshot 2024-07-06 114937.png" alt="" />
  </div>
  <div class="w-100 d-flex align-center justify-center">
    <span class="w-25 text-center mt-5"
      >hurray!!! your order is confirmed the order id is #123456 save the order id for further
      communication..</span
    >
  </div>
  <table class="mt-8 mb-8">
    <thead>
      <tr>
        <th>Email Us</th>
        <th>Contact Us</th>
        <th>Address</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>admin@bookstore.com</td>
        <td>+91 8163475881</td>
        <td>
          42, 14th Main, 15th Cross, Sector 4 ,opp to BDA complex, near Kumarakom restaurant, HSR
          Layout, Bangalore 560034
        </td>
      </tr>
    </tbody>
  </table>
  <div class="d-flex w-100 align-center justify-center mb-6">
    <v-btn @click="redirect" color="#3371B5">Continue Shopping</v-btn>
  </div>
</template>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 8px 12px;
  border: 1px solid #ddd;
  text-align: center;
}
th {
  background-color: #f4f4f4;
  width: 33.33%;
}
td {
  width: 33.33%;
}
</style>
