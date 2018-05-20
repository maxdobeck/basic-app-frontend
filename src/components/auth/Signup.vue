<template>
  <v-stepper v-model="el" id="stepper">
    <v-stepper-header>
      <v-stepper-step step="1" editable :complete="el > 1">Name</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" editable :complete="el > 2">Email</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3" editable :complete="el > 3">Password</v-stepper-step>
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
                  required                  
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
          <v-form v-model="validEmail" ref="form" lazy-validation v-on:submit.prevent>
            <v-layout row justify-center>
              <v-flex xs8>
                <v-text-field
                  label="Email"
                  v-model="email"
                  :rules="nameRules"
                  required                  
                >
                </v-text-field>
                <v-text-field
                  label="Retype your email"
                  v-model="email2"
                  :rules="emailConfirmRules"
                  required                  
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
                  required
                  :append-icon="p1 ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (p1 = !p1)"
                  :type="p1 ? 'password' : 'text'"                  
                >
                </v-text-field>
                <v-text-field
                  label="Please type your password again"
                  v-model="pass2"
                  :rules="passConfirmRules"
                  :counter="10"
                  required
                  :append-icon="p2 ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (p2 = !p2)"
                  :type="p2 ? 'password' : 'text'"
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
const apiURL = 'http://localhost:3131/validate/signup'
export default {
  data () {
    return {
      el: 0,
      p1: true,
      p2: true,
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
      fetch(apiURL + encodeURIComponent('?name=' + this.name + '&email=' + this.email + '&password=' + this.pass), { method: 'POST' })
        .then(res => res.json())
        .then(res => console.log(res.errors))
        .then(res => {
          if (res.errors) {
            this.errors.push(res.errors)
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
  @media screen and (min-width: 990px) {
    .stepper {
      width: 60%;
      margin-left: 20%;
      margin-top: 2%;
    }
  }
</style>
