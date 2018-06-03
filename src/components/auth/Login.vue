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
          'X-CSRF-Token': 'oEyCpkMglHlI4h9h8T0J6ido+8SRtk+w2+JK54RZKkO7hAQNol2IaqoePfkPB65eq+fLFwRzfy2dm3sZlom5sw=='
        },
        body: JSON.stringify({email: this.email, password: this.password})
      })
        .then(response => response.json())
        .then(response => {
          if (response.errors) {
            this.errors.push(response.errors)
          } else {
            // redirect to signup URL and save user values to vuex store
            this.errors = []
          }
        })
    }
  }
}
</script>

<style scoped>
</style>
