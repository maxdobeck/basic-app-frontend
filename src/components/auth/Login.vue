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
          :type="'password'"
          required
        >
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-btn
        @click="loginMember"
        :disabled="!valid"
      >
        Login
      </v-btn>
    </v-layout>
  </v-form>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'
const apiURL = 'http://localhost:3000/login'
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
      valid: false
    }
  },
  methods: {
    loginMember: function (e) {
      fetch(apiURL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-CSRF-Token': this.token
        },
        body: JSON.stringify({email: this.email, password: this.password})
      })
        .then(response => response.json())
        .then(response => {
          if (response['Status'] !== 'OK') {
            console.log(response)
            this.errors = response['Status']
          } else {
            // redirect to signup URL and save user values to vuex store
            this.errors = []
            this.logMemberIn()
            this.$router.push('/')
          }
        })
    },
    logMemberIn () {
      this.$store.dispatch('logMemberIn')
    }
  },
  computed: mapGetters({
    token: 'curCSRFToken',
    loggedIn: 'logInStatus'
  })
}
</script>

<style scoped>
</style>
