<script>
import { RouterView } from 'vue-router';
import Login from '../components/LoginSignup/Login.vue'
import Signup from '../components/LoginSignup/Signup.vue'
import router from '@/router';
export default {
  data: () => ({
    visible: false,
    ulines: true
  }),
  methods: {
    togglecolortrue() {
      this.ulines = true;
      router.push('/login')
    },
    togglecolorfalse() {
      this.ulines = false
      router.push('/signup')
    }
  },
  components: {
    Login,
    Signup
  }
}
</script>

<template>
  <div class="card-container">
    <v-card
      class="mx-auto d-flex flex-column pa-12 pb-8 u-cardimage "
      elevation="8"
      width="624"
      rounded="50px"
    >
      <img
        style="width: 245px; height: 245px; border-radius: 50%"
        src="../assets/logincart.png"
        alt="Loading..."
      />
      <span class="u-box-n"><strong>ONLINE BOOK SHOPPING</strong></span>
    </v-card>

    <v-card class="mx-auto pa-12 pb-8 u-login" elevation="8" width="389" rounded="5px">
      <div>
        <div class="d-flex align-center justify-space-between brdr" style="height: 33px">
          <div class="d-flex flex-column justify-center align-center">
            <button
              @click="togglecolortrue"
              class="u-unclicked"
              :class="{ toggletruecolor: ulines }"
            >
              <strong>LOGIN</strong>
            </button>
            <div class="u-line" :class="{ toggletrue: ulines }"></div>
          </div>
          <div class="d-flex flex-column justify-center align-center">
            <button
              @click="togglecolorfalse"
              class="u-unclicked"
              :class="{ toggletruecolor: !ulines }"
            >
              <strong>SIGNUP</strong>
            </button>
            <div class="u-line" :class="{ toggletrue: !ulines }"></div>
          </div>
        </div>
        <RouterView/>
      </div>
    </v-card>
  </div>
</template>

<style>
.toggletrue {
  opacity: 1 !important;
}
.toggletruecolor {
  color: #0a0102 !important;
}

.u-s-btn {
  width: 48%;
}
.social-login {
  margin-top: 28px;
}
.or-container {
  margin-top: 26px;
}
.or-line {
  width: 64px;
  height: 0px;
  margin-left: 21px;
  margin-right: 21px;
  /* UI Properties */
  border: 1px solid #e1e4ea;
}
.v-input--density-compact {
  --v-input-control-height: 35px;
  --v-input-padding-top: 2px;
}
.u-btn {
  width: 252px !important;
  height: 37px !important;
  margin-top: 15px;
}
.u-btn-s {
  width: 252px !important;
  height: 37px !important;
}
.u-passdiv {
  position: relative;
  border: 1px ssolid red;
}
.u-forgetpass {
  position: absolute;
  bottom: 0;
  right: 0;
  font: normal normal normal 10px/13px Roboto;
  letter-spacing: 0px;
  color: #9d9d9d;
  opacity: 1;
}
.u-title-pass {
  width: 100px;
  height: 13px;
  /* UI Properties */
  text-align: left;
  font: normal normal normal 10px/13px Roboto;
  letter-spacing: 0px;
  color: #0a0102;
  text-transform: capitalize;
  opacity: 1;
}
.u-title {
  margin-top: 30px;
  width: 50px;
  height: 13px;
  /* UI Properties */
  text-align: left;
  font: normal normal normal 10px/13px Roboto;
  letter-spacing: 0px;
  color: #0a0102;
  text-transform: capitalize;
  opacity: 1;
}
.u-line {
  width: 22px;
  height: 5px;
  /* UI Properties */
  background: #a03037 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 0;
}
.brdr {
  position: absolute;
  top: 28px;
  width: 285px;
}

.u-unclicked {
  text-align: left;
  font-size: 25px;
  font: normal normal medium 25px/33px Roboto;
  letter-spacing: 0px;
  color: #878787;
  text-transform: uppercase;
  opacity: 1;
}

.card-container {
  width: 726px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.u-cardimage {
  position: absolute;
  left: 0%;
  z-index: 1;
  width: 624px;
  height: 391px;
  background: #ffffff;
  border-radius: 21px;
  opacity: 1;
}

.u-login {
  right: -23%;
  z-index: 2;
  width: 389px;
  height: 425px;
  background: #ffffff;
  box-shadow: 0px 5px 15px #00000029;
  border: 1px solid #e4e4e4;
  border-radius: 6px;
  opacity: 1;
}

.u-box-n {
  margin-top: 31px;
  margin-left: 30px;
  width: 209px;
  height: 30px;
  text-align: left;
  font: normal normal medium 18px/24px Roboto;
  letter-spacing: 0px;
  color: #0a0102;
  text-transform: uppercase;
  opacity: 1;
}
.v-input--density-compact .v-field--variant-outlined,
.v-input--density-compact .v-field--single-line,
.v-input--density-compact .v-field--no-label {
  --v-field-padding-bottom: 0px;
}

@media only screen and (max-width: 600px) {
  .u-cardimage{
    display: none !important;
  }
  .u-login{
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
