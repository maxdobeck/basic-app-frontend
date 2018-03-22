<template>
<v-container align-center>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-layout row justify-center>
      <v-flex xs8>
        <v-text-field
          label="Email"
          v-model="email"
          :rules="emailRules"
          required
          autofocus
          
        >
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs8>
        <v-text-field
          label="Password"
          v-model="password"
          :rules="passwordRules"
          required
          :append-icon="e3 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e3 = !e3)"
          :type="e3 ? 'password' : 'text'"
        >
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-btn
        @click="submit"
        :disabled="!valid"
      >
        Login
      </v-btn>
    </v-layout>
  </v-form>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      e3: true,
      valid: false
    }
  }
}
</script>

<style scoped>
</style>
