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
let api // Need to find a way to turn all this into a function
if (process.env.NODE_ENV === 'dev') {
  api = 'http://localhost:3000/'
} else {
  api = 'https://shielded-stream-75107.herokuapp.com/'
}
const apiURL = api + 'login'
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
      valid: false,
      errors: []
    }
  },
  methods: {
    loginMember: function (e) {
      let self = this
      fetch(apiURL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-CSRF-Token': this.token
        },
        body: JSON.stringify({email: this.email, password: this.password})
      })
        .then(function (response) {
          self.setCSRFToken(response.headers.get('X-CSRF-Token'))
          return response.json()
        })
        .then(response => {
          console.log(response)
          if (response['Status'] !== 'OK') {
            this.errors = response['Status']
          } else {
            // redirect to signup URL and save user values to vuex store
            console.log(response['ID'])
            this.errors = []
            this.password = ''
            this.logMemberIn()
            this.setMemberId(response['ID'])
            this.$router.push('/')
          }
        })
    },
    logMemberIn () {
      this.$store.dispatch('logMemberIn')
    },
    setMemberId (memberId) {
      this.$store.dispatch('setMemberId', memberId)
    },
    setCSRFToken (token) {
      this.$store.dispatch('setCSRFToken', token)
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
