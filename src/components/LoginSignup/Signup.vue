<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signin } from '../Services/Login';

const router = useRouter();
const visible = ref(false);
const fname = ref('');
const email = ref('');
const pass = ref('');
const mobile = ref('');

const signinbtn = () => {
  console.log('clicked...');
  const signupobj = {
    fullName: fname.value,
    email: email.value,
    password: pass.value,
    phone: mobile.value
  };
  signin(signupobj)
    .then((data) => {
      console.log(data);
      router.push('/login');
    })
    .catch((err) => {
      console.log(err);
      alert('please enter correct details');
    });
};
</script>

<template>
  <div>
    <div class="u-title">Full Name</div>
    <v-text-field
      v-model="fname"
      class="u-input"
      density="compact"
      placeholder="Enter Full Name"
      variant="outlined"
    ></v-text-field>
  </div>
  <div class="u-passdiv">
    <div class="u-title-pass">Email</div>
    <v-text-field
      type="email"
      v-model="email"
      density="compact"
      placeholder="Enter your Email"
      variant="outlined"
    ></v-text-field>
  </div>
  <div class="u-passdiv">
    <div class="u-title-pass">Password</div>
    <v-text-field
      v-model="pass"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Enter your password"
      variant="outlined"
      @click:append-inner="visible = !visible"
    ></v-text-field>
  </div>
  <div class="u-passdiv">
    <div class="u-title-pass">Mobile Number</div>
    <v-text-field
      type="number"
      v-model="mobile"
      density="compact"
      placeholder="Enter your Mobile"
      variant="outlined"
    ></v-text-field>
  </div>

  <div>
    <v-btn @click="signinbtn" class="u-btn-s" color="#A03037" size="large" variant="elevated" block>
      Signup
    </v-btn>
  </div>
</template>
