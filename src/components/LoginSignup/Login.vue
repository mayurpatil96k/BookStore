<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../Services/Login';

const router = useRouter();
const visible = ref(false);
const email = ref('');
const password = ref('');

const emailRules = [
  (value: string) => {
    if (!value) return 'Must be a valid email address.';
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(value) || 'Must be a valid email address.';
  }
];

const passRules = [
  (value: string) => {
    if (value.length >= 8) return true;
    return 'Enter valid Password';
  }
];

const loginbtn = () => {
  const loginobj = {
    email: email.value,
    password: password.value
  };
  console.log(loginobj);
  login(loginobj)
    .then((data) => {
      localStorage.setItem("API_KEY", data.data.result.accessToken);
      router.push('/dashboard/books');
    })
    .catch((err) => console.log(err));
};
</script>

<template>
  <div>
    <div class="u-title">Email Id</div>
    <v-text-field
      v-model="email"
      class="u-input"
      density="compact"
      placeholder="Email address"
      variant="outlined"
      :rules="emailRules"
    ></v-text-field>
  </div>

  <div class="u-passdiv">
    <div class="u-title-pass">Password</div>
    <v-text-field
      v-model="password"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      :rules="passRules"
      placeholder="Enter your password"
      variant="outlined"
      @click:append-inner="visible = !visible"
    ></v-text-field>

    <a class="u-forgetpass" href="#" rel="noopener noreferrer" target="_blank">
      Forgot password?
    </a>
  </div>

  <div>
    <v-btn @click="loginbtn" class="u-btn" color="#A03037" size="large" variant="elevated" block>
      Login
    </v-btn>
  </div>

  <div class="d-flex justify-center align-center or-container">
    <div class="or-line"></div>
    <span class="or-text"><strong>OR</strong></span>
    <div class="or-line"></div>
  </div>
  <div class="social-login d-flex justify-space-between">
    <v-btn class="u-s-btn" color="#4266B2">Facebook</v-btn>
    <v-btn class="u-s-btn" color="#E4E4E4">Google</v-btn>
  </div>
</template>
