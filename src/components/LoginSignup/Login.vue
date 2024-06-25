<script>
export default {
  data: () => ({
    visible: false
  })
}
</script>
<template>
  <div>
    <div class="u-title">Email Id</div>
    <v-text-field
      class="u-input"
      density="compact"
      placeholder="Email address"
      variant="outlined"
    ></v-text-field>
  </div>

  <div class="u-passdiv">
    <div class="u-title-pass">Password</div>
    <v-text-field
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Enter your password"
      variant="outlined"
      @click:append-inner="visible = !visible"
    ></v-text-field>

    <a class="u-forgetpass" href="#" rel="noopener noreferrer" target="_blank">
      Forgot password?
    </a>
  </div>

  <div>
    <v-btn class="u-btn" color="#A03037" size="large" variant="elevated" block> Login </v-btn>
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
