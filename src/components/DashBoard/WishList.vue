<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getWishllistItems, removeWishItems } from '../Services/Wishlist'

const Wishlistitems = ref([])

const wishcCall = async () => {
  try {
    const data = await getWishllistItems()
    Wishlistitems.value = data.data.result.reverse().filter((item) => item.product_id != null)
  } catch (error) {
    console.error('Error fetching wishlist items:', error)
  }
}

const removewishlist = async (id: string) => {
  removeWishItems(id)
  wishcCall();
}
onMounted(() => {
  wishcCall()
})
</script>

<template>
  <v-breadcrumbs :items="['Home', 'My WishList']"></v-breadcrumbs>
  <div class="w-100 pb-5">
    <div class="border-sm d-flex align-center" style="height: 55px; background-color: #f5f5f5">
      <h3 class="ml-5"><strong>My Wishlist (0)</strong></h3>
    </div>
    <div class="d-flex pl-8 pt-8 pb-8 border-sm w-100" v-for="item in Wishlistitems">
      <img height="85" width="65" src="../../assets/Image 11@2x.png" alt="" />
      <div class="w-75">
        <div class="d-flex flex-column pl-12 pt-0">
          <span class="text-subtitle-1"
            ><strong> {{ item.product_id.bookName }} </strong></span
          >
          <span class="u-smalltext-cart"> {{ 'by ' + item.product_id.author }} </span>
          <div class="d-flex align-center text-subtitle-1">
            <span
              ><strong> {{ 'Rs.' + item.product_id.discountPrice }} </strong></span
            >
            <span class="u-smalltext-cart pl-1"
              ><strike> {{ 'Rs.' + item.product_id.price }} </strike></span
            >
          </div>
        </div>
      </div>
      <div class="w-25 d-flex justify-end pr-5">
        <v-btn @click="removewishlist(item.product_id._id)" variant="plain" append-icon="mdi-trash-can-outline"></v-btn>
      </div>
    </div>
  </div>
</template>

<style>
.u-smalltext-cart {
  font-size: 0.7em;
  color: #878787;
}
.w-75 {
  width: 65% !important;
}
</style>
