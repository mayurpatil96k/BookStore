<script>
import { RouterView } from 'vue-router';
import Books from '../components/DashBoard/Books.vue'

export default {
  components: {
    Books
  }
}
</script>
<template>
  <v-card class="u-lrmargin" style="z-index: 1;">
    <v-layout class="u-lrmargin">
      <v-app-bar color="#A03037">
        <img class="u-margin pl-xs-5 pl-md-15 pl-sm-10" src="../assets/education.svg" alt="..." />
        <v-toolbar-title class="u-dnone">Bookstore</v-toolbar-title>
        <div width="450px" class="u-dnone w-25">
          <v-text-field
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
        <div class="border-s-sm h-100 d-flex flex-column justify-center align-center">
          <v-icon class="pl-10 pr-10" icon="mdi-account-outline"></v-icon>
          <span class="text-caption u-dnone">Profile</span>
        </div>
        <div
          class="mr-10 u-i-margin border-s-sm border-e-sm h-100 d-flex flex-column justify-center align-center"
        >
          <v-icon class="pl-10 pr-10" icon="mdi-cart-outline"></v-icon>
          <span class="text-caption u-dnone">Cart</span>
        </div>
      </v-app-bar>
    </v-layout>
  </v-card>
  <!-- router here  -->
  <div class="mt-16 u-lrmargin ">
   <RouterView/>
  </div>

  <footer class="d-flex align-center">
    <span class="u-f-text">Copyright © 2024, Bookstore Private Limited. All Rights Reserved</span>
  </footer>
</template>
<style>
.u-i-margin{
  margin-right: 237px !important;
}
.u-margin{
  margin-left: 177px;
}
.u-lrmargin{
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
  background: #2e1d1e 0% 0% no-repeat padding-box;
  opacity: 1;
}
@media only screen and (max-width: 600px) {
  .u-lrmargin{
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
