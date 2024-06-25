<script>
export default {
  data: () => ({
    visible: false
  })
}
</script>
<template>
  <div>
    <div class="u-title">Full Name</div>
    <v-text-field
      class="u-input"
      density="compact"
      placeholder="Enter Full Name"
      variant="outlined"
    ></v-text-field>
  </div>
  <div class="u-passdiv">
    <div class="u-title-pass">Email</div>
    <v-text-field
      density="compact"
      placeholder="Enter your Email"
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

  </div>
  <div class="u-passdiv">
    <div class="u-title-pass">Mobile Number</div>
    <v-text-field
      density="compact"
      placeholder="Enter your Mobile"
      variant="outlined"
    ></v-text-field>

  </div>

  <div>
    <v-btn class="u-btn-s" color="#A03037" size="large" variant="elevated" block> Signup </v-btn>
  </div>

</template>
