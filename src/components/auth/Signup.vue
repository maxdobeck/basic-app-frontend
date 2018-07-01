<template>
  <v-stepper v-model="el" id="stepper">
    <v-stepper-header>
      <v-stepper-step step="1" editable>Name</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" editable>Email</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3" editable>Password</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-5" height="300px">
          <v-form v-model="validName" ref="form" lazy-validation v-on:submit.prevent>
            <v-layout row justify-center>
              <v-flex xs8>
                <v-text-field
                  label="Name"
                  v-model="name"
                  :rules="nameRules"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card>
        <v-btn color="primary" :disabled="!validName" @click.native="el = 2">Continue</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card height="300px">
          <v-form v-model="validEmail" ref="form" v-on:submit.prevent>
            <v-layout row justify-center>
              <v-flex xs8>
                <v-text-field
                  label="Email"
                  v-model="email"
                  :rules="nameRules"
                >
                </v-text-field>
                <v-text-field
                  label="Retype your email"
                  v-model="email2"
                  :rules="emailConfirmRules"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card>
        <v-btn color="primary" :disabled="!validEmail" @click.native="el = 3">Continue</v-btn>
        <v-btn flat @click.native="el = 1">Back</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card height="300px">
          <v-form v-model="validPassword" ref="form" v-on:submit.prevent>
            <v-layout row justify-center>
              <v-flex xs8>
                <v-text-field
                  label="Password"
                  v-model="pass"
                  :rules="passRules"
                  :counter="10"
                  :type="'password'"
                >
                </v-text-field>
                <v-text-field
                  label="Confirm your password"
                  v-model="pass2"
                  :rules="passConfirmRules"
                  :counter="10"
                  :type="'password'"
                  >
                </v-text-field>
                <v-alert v-model="badDataAlert" type="error">
                  Problem signing you up
                  <p v-if="errors.length">{{errors}}</p>
                </v-alert>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card>
        <v-btn color="primary" :disabled="!validPassword" @click.native="validateSignup">Submit</v-btn>
        <v-btn flat  @click.native="el = 2">Back</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { mapGetters } from 'vuex'
const signupAPI = process.env.DEV_API
export default {
  data () {
    return {
      el: 0,
      validName: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required'
      ],
      validEmail: false,
      email: '',
      email2: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      emailConfirmRules: [
        v => !!v || 'Email is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
        v => v === this.email || 'Emails must match'
      ],
      validPassword: false,
      pass: '',
      passRules: [
        v => v.length >= 10 || 'Password must be 10 characters or longer'
      ],
      pass2: '',
      passConfirmRules: [
        v => v === this.pass || 'Passwords must match'
      ],
      errors: [],
      badDataAlert: false
    }
  },
  methods: {
    validateSignup: function (e) {
      fetch(signupAPI + 'members', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-CSRF-Token': this.token
        },
        body: JSON.stringify({ name: this.name, email: this.email, email2: this.email2, password: this.pass, password2: this.pass2 })
      })
        .then(res => res.json())
        .then(res => {
          if (res['Status'] !== 'Member Created') {
            this.errors.push(res['Errors'])
          } else {
            // redirect to welcome URL and save user values to vuex store
            this.errors = []
            this.pass = ''
            this.pass2 = ''
            this.email = ''
            this.email2 = ''
            this.name = ''
            this.$router.push('/welcome')
          }
        })
    }
  },
  computed: mapGetters({
    token: 'curCSRFToken'
  })
}
</script>

<style scoped>
  @media screen and (min-width: 990px) {
    .stepper {
      width: 60%;
      margin-left: 20%;
      margin-top: 2%;
    }
  }
</style>
