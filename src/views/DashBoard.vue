<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import Books from '../components/DashBoard/Books.vue';
import { useCounterStore } from '@/stores/counter';
import { useCartStore } from '@/stores/counter';
import router from '@/router';

export default defineComponent({
  components: {
    Books,
    RouterView
  },
  data() {
    return {
      searchtext: '',
      cartcount: 0
    };
  },
  computed: {
    cartcountfun(): number {
      return this.cartStore.cartitemscount;
    },
    validationForLogin(): boolean {
      const key = localStorage.getItem('API_KEY');
      console.log(key);
      return !!key;
    }
  },
  mounted() {
    this.cartStore = useCartStore();
    this.cartStore.setCartItemsCount().then(() => {
      this.cartcount = this.cartStore.cartitemscount;
    });
  },
  created() {
    this.counterStore = useCounterStore();
    this.searchtext = this.counterStore.searchtext;
  },
  methods: {
    cartredirect() {
      this.$router.push('cartdetail');
    },
    changesearch() {
      this.counterStore.setSearchText(this.searchtext);
    },
    logoutFun() {
      localStorage.clear();
    },
    redirecttologin() {
      this.$router.push({ path: '/login' });
    },
    wishlist() {
      this.$router.push('wishlist');
    }
  }
});
</script>

<template>
  <v-card class="u-lrmargin" style="z-index: 1">
    <v-layout class="u-lrmargin">
      <v-app-bar color="#A03037">
        <img
          class="u-margin pl-xs-5 pl-md-15 pl-sm-10"
          src="../assets/education.svg"
          alt="Bookstore Logo"
        />
        <v-toolbar-title class="u-dnone">Bookstore</v-toolbar-title>
        <div width="450px" class="u-dnone w-25">
          <v-text-field
            v-model="searchtext"
            @input="changesearch"
            class="w-100"
            bg-color="#FCFCFC"
            density="compact"
            label="Search ..."
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            hide-details
            single-line
          ></v-text-field>
        </div>
        <v-spacer></v-spacer>
        <v-menu min-width="200px" rounded>
          <template v-slot:activator="{ props }">
            <!-- profile div -->

            <div
              v-bind="props"
              class="border-s-sm h-100 d-flex flex-column justify-center align-center"
            >
              <v-icon class="pl-10 pr-10" icon="mdi-account-outline"></v-icon>
              <span class="text-caption u-dnone">Profile</span>
            </div>
          </template>
          <v-card v-if="!validationForLogin">
            <v-card-text>
              <div class="mx-auto">
                <h3>Welcome</h3>
                <p class="text-caption mt-1">To access account and manage orders</p>
                <v-btn @click="redirecttologin" color="#A03037" variant="outlined">
                  login/signup
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <div class="d-flex flex-column align-start">
                  <v-btn
                    prepend-icon="mdi-order-bool-descending-variant"
                    class="text-none"
                    variant="plain"
                  >
                    My Orders
                  </v-btn>
                  <v-btn
                    @click="wishlist"
                    prepend-icon="mdi-cards-heart-outline"
                    class="text-none"
                    variant="plain"
                  >
                    Wishlist
                  </v-btn>
                </div>
              </div>
            </v-card-text>
          </v-card>

          <!-- logout -->
          <v-card v-else>
            <v-card-text>
              <div class="mx-auto">
                <h3>Welcome Mayur,</h3>
                <div class="d-flex flex-column align-start">
                  <v-btn
                    prepend-icon="mdi-account-outline"
                    class="text-none"
                    variant="plain"
                  >
                    Profile
                  </v-btn>
                  <v-btn
                    prepend-icon="mdi-order-bool-descending-variant"
                    class="text-none"
                    variant="plain"
                  >
                    My Orders
                  </v-btn>
                  <v-btn
                    @click="wishlist"
                    prepend-icon="mdi-cards-heart-outline"
                    class="text-none"
                    variant="plain"
                  >
                    Wishlist
                  </v-btn>
                  <v-btn @click="logoutFun" color="#A03037" variant="outlined"> logout </v-btn>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>

        <div
          @click="cartredirect"
          class="mr-10 u-i-margin border-s-sm border-e-sm h-100 d-flex flex-column justify-center align-center"
        >
          <div class="pl-7 pr-7">
            <v-badge size="small" :content="cartcountfun" color="white" class="small-badge">
              <v-icon icon="mdi-cart-outline"></v-icon>
            </v-badge>
          </div>
          <span class="text-caption u-dnone">Cart</span>
        </div>
      </v-app-bar>
    </v-layout>
  </v-card>
  <!-- router view -->
  <div class="mt-16 u-lrmargin">
    <RouterView />
  </div>
  <footer class="d-flex align-center">
    <span class="u-f-text">Copyright © 2024, Bookstore Private Limited. All Rights Reserved</span>
  </footer>
</template>

<style scoped>
.w-25 {
  width: 35% !important;
}
.u-i-margin {
  margin-right: 237px !important;
}
.u-margin {
  margin-left: 177px;
}
.u-lrmargin {
  margin-left: 230px !important;
  margin-right: 230px !important;
}
.u-f-text {
  margin-left: 3vw;
  color: white;
}
footer {
  width: 100vw;
  height: 50px;
  background: #2e1d1e;
  opacity: 1;
}
@media only screen and (max-width: 600px) {
  .u-lrmargin {
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
  .u-f-text {
    margin-left: 0vw;
  }
  .u-i-margin {
    margin-right: 0px !important;
  }
  .u-margin {
    margin-left: 10px;
  }
  .u-dnone {
    display: none !important;
  }
}
</style>
