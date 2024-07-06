<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useCartStore } from '@/stores/counter'
import router from '@/router';

const CartStore = useCartStore()
const cart = computed(() => CartStore.cart)
const cartCount = computed(() => CartStore.cartitemscount)

onUnmounted(()=>{
  console.log(CartStore.cart);
})

onMounted(() => {
  CartStore.setCart().then(() => {
    setAddressDetails()
  })
})

const remove = (id: number) => {
  CartStore.decrementid(id)
}

const incrementCount = (id: number, qty: number) => {
  CartStore.incrementid(id, qty + 1)
}

const decrementCount = (id: number, qty: number) => {
  if (qty > 1) {
    CartStore.incrementid(id, qty - 1)
  } else {
    CartStore.decrementid(id)
  }
}

const city = ref('Use current location')
const isAddressDetailsOpen = ref(true)
const isOrderSummaryOpen = ref(false)
const hasPlacedOrder = ref(false)

const toggleAddressDetails = () => {
  isAddressDetailsOpen.value = !isAddressDetailsOpen.value
  hasPlacedOrder.value = true
}

const toggleOrderSummary = () => {
  isOrderSummaryOpen.value = !isOrderSummaryOpen.value
}
const redirect = ()=>{
  router.push('order')
}
const isPlaceOrderDisabled = computed(() => {
  return cartCount.value === 0
})


const fullName = ref('')
const phone = ref('')
const address = ref('')
const addressCity = ref('')
const state = ref('')
const addressType = ref('')

const setAddressDetails = (selectedAddressType = addressType.value) => {
  if (cart.value.length > 0 && cart.value[0].user_id.address.length > 0) {
    const userAddresses = cart.value[0].user_id.address
    const userAddress = userAddresses.find((addr: { addressType: string; }) => addr.addressType === selectedAddressType) || userAddresses[0]
    fullName.value = cart.value[0].user_id.fullName
    phone.value = cart.value[0].user_id.phone
    address.value = userAddress.fullAddress
    addressCity.value = userAddress.city
    state.value = userAddress.state
    addressType.value = userAddress.addressType
  }
}


watch(addressType, (newAddressType) => {
  setAddressDetails(newAddressType)
})
</script>

<template>
  <v-breadcrumbs :items="['Home', 'My Cart']"></v-breadcrumbs>
  <div class="w-100 d-flex align-content-center justify-center justify-md-start">
    <div class="w-75 border-sm">
      <div class="d-flex pl-8 pr-5 pt-5">
        <span><strong>My Cart ({{ cartCount }})</strong></span>
        <v-spacer></v-spacer>
        <v-select
          max-width="275px"
          v-model="city"
          density="compact"
          prepend-icon="mdi-map-marker"
          variant="outlined"
        ></v-select>
      </div>
      <div class="d-flex pl-8" v-for="item in cart" :key="item.product_id.id">
        <img height="85" width="65" src="../../assets/Image 11@2x.png" alt="" />
        <div>
          <div class="d-flex flex-column pl-12 pt-0">
            <span class="text-subtitle-1"><strong>{{ item.product_id.bookName }}</strong></span>
            <span class="u-smalltext-cart">{{ 'by ' + item.product_id.author }}</span>
            <div class="d-flex align-center text-subtitle-1">
              <span><strong>{{ 'Rs.' + item.product_id.discountPrice }}</strong></span>
              <span class="u-smalltext-cart pl-1"><strike>{{ 'Rs.' + item.product_id.price }} </strike></span>
            </div>
            <div class="pt-5 mb-5 d-flex align-center">
              <!-- cart button logic -->
              <div>
                <div>
                  <div v-if="item.quantityToBuy === 0">
                    <v-btn class="w-100" max-height="40" max-width="170" color="#A03037">Add to Bag</v-btn>
                  </div>
                  <div v-else>
                    <div class="d-flex w-100 align-center justify-space-between">
                      <v-btn density="comfortable" icon="mdi-minus" @click="decrementCount(item._id, item.quantityToBuy)"></v-btn>
                      <span class="d-flex align-center justify-center u-box-cart">{{ item.quantityToBuy }}</span>
                      <v-btn density="comfortable" icon="mdi-plus" @click="incrementCount(item._id, item.quantityToBuy)"></v-btn>
                    </div>
                  </div>
                </div>
              </div>
              <v-btn @click="remove(item._id)" class="ml-10 text-none" variant="plain">Remove</v-btn>
            </div>
          </div>
        </div>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <div v-if="cartCount > 0 && !hasPlacedOrder" class="mr-3 mb-5">
          <v-btn color="#3371B5" variant="elevated" @click="toggleAddressDetails" :disabled="isPlaceOrderDisabled">Place Order</v-btn>
        </div>
      </v-card-actions>
    </div>
  </div>
  <div class="w-75 pt-5">
    <div class="border-sm p-3 justify-center" :style="{ height: isAddressDetailsOpen ? '60px' : '496px' }">
      <div class="d-flex mt-4 ml-4" v-if="isAddressDetailsOpen">
        <h3>Address Details</h3>
      </div>
      <div v-else>
        <div class="d-flex mt-5 ml-5 mr-5">
          <h3>Customer Details</h3>
          <v-spacer></v-spacer>
          <v-btn v-if="!isOrderSummaryOpen" class="text-none" color="#A03037" variant="outlined">Add New Address</v-btn>
        </div>
        <div class="w-75 ml-12">
          <div class="mt-5 d-flex">
            <div class="w-50">
              <label for="">Full Name</label>
              <v-text-field v-model="fullName" density="compact" label="" variant="outlined"></v-text-field>
            </div>
            <div class="ml-2 w-50">
              <label for="">Mobile Number</label>
              <v-text-field v-model="phone" density="compact" label="" variant="outlined"></v-text-field>
            </div>
          </div>
          <div>
            <label for="">Address</label>
            <v-textarea v-model="address" density="compact" rows="3" label="" variant="outlined"></v-textarea>
          </div>
          <div class="d-flex">
            <div class="w-50">
              <label for="">City/Town</label>
              <v-text-field v-model="addressCity" density="compact" label="" variant="outlined"></v-text-field>
            </div>
            <div class="ml-2 w-50">
              <label for="">State</label>
              <v-text-field v-model="state" density="compact" label="" variant="outlined"></v-text-field>
            </div>
          </div>
          <div>
            <label for="">Type</label>
            <v-radio-group v-model="addressType" inline>
              <v-radio color="red" label="Home" value="Home"></v-radio>
              <v-radio color="red" label="Work" value="Office"></v-radio>
              <v-radio color="red" label="Other" value="Other"></v-radio>
            </v-radio-group>
          </div>
        </div>
        <div class="d-flex pr-5 pb-10">
          <v-spacer></v-spacer>
          <v-btn v-if="!isOrderSummaryOpen" color="#3371B5" variant="elevated" @click="toggleOrderSummary">Continue</v-btn>
        </div>
      </div>
    </div>
  </div>
  <div class="w-75 pt-5">
    <div class="border-sm p-3 justify-center" :style="{ height: isOrderSummaryOpen ? '' : '60px' }">
      <div class="d-flex mt-4 ml-4" v-if="!isOrderSummaryOpen">
        <h3>Order Summary</h3>
      </div>
      <div v-else>
        <div class="mt-5 ml-5 mr-5">
          <h3>Order Summary</h3>
          <div class="d-flex pl-8 pt-5" v-for="item in cart" :key="item.product_id.id">
            <img height="85" width="65" src="../../assets/Image 11@2x.png" alt="" />
            <div>
              <div class="d-flex flex-column pl-12 pt-0">
                <span class="text-subtitle-1"><strong>{{ item.product_id.bookName }}</strong></span>
                <span class="u-smalltext-cart">{{ 'by ' + item.product_id.author }}</span>
                <div class="d-flex align-center text-subtitle-1">
                  <span><strong>{{ 'Rs.' + item.product_id.discountPrice * item.quantityToBuy }}</strong></span>
                  <span class="u-smalltext-cart pl-1"><strike>{{ 'Rs.' + item.product_id.price * item.quantityToBuy }}</strike></span>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex pt-5 pb-5">
            <v-spacer></v-spacer>
            <v-btn color="#3371B5" variant="elevated" @click="redirect">Checkout</v-btn>
          </div>
        </div>
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
