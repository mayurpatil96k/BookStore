<template>
  <v-card>
    <v-layout>
      <v-app-bar color="#A03037">
        <img class="u-margin pl-xs-5 pl-md-15 pl-sm-10" src="../assets/education.svg" alt="..." />
        <v-toolbar-title class="u-dnone">Bookstore</v-toolbar-title>
        <div class="u-dnone w-50">
          <v-text-field
            class="w-75"
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


  <footer class="d-flex align-center">
    <span class="u-f-text">Copyright © 2024, Bookstore Private Limited. All Rights Reserved</span>
  </footer>
</template>
<style>
.u-f-text{
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
  .u-f-text{
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
