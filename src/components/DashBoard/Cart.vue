<script setup lang="ts">
import { ref,onMounted,computed } from 'vue';
import {getCartItems} from '../../components/Services/Cart'
import { useCartStore } from '@/stores/counter'
const CartStore = useCartStore();
const cartCount = computed(() => CartStore.cartbookcount);
onMounted(() => {
  getCartItems().then((data)=>console.log()).catch((err)=>console.log(err))
});


const addToCart = () => {
  CartStore.addtocart();
};

const incrementCount = () => {
  CartStore.increment();
  
};

const decrementCount = () => {
  if (cartCount.value > 0) {
    CartStore.decrement();
  };
  }
   
</script>

<template>
  <div>
    <div v-if="cartCount === 0">
      <v-btn @click="addToCart" class="w-100" max-height="40" max-width="170" color="#A03037">
        Add to Bag
      </v-btn>
    </div>
    <div v-else>
      <div class="d-flex w-100 align-center justify-space-between">
        <v-btn density="comfortable" icon="mdi-minus" @click="decrementCount"></v-btn>
        <span class="d-flex align-center justify-center u-box-cart">{{ cartCount }}</span>
        <v-btn density="comfortable" icon="mdi-plus" @click="incrementCount"></v-btn>
      </div>
    </div>
  </div>
</template>



<style>
.u-box-cart {
  font-size: 1.2em;
  width: 66px;
  height: 38px;
  border: 1px solid #dbdbdb;
}
</style>
