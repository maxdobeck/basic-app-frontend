<template>
  <v-app>
    <v-toolbar
    flat
    app
    id="navbar"
    >
      <v-toolbar-items>
        <v-btn :ripple="false" flat to="/" id="home" >Home</v-btn>
        <v-btn :ripple="false" flat to="/schedules" v-if="loggedIn" id="schedules">Schedules</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn :ripple="false" flat raised to="/settings" v-if="loggedIn" id="settings">Settings</v-btn>
        <v-btn :ripple="false" flat raised to="/signup" v-if="!loggedIn" id="signup">Sign Up</v-btn>
        <v-btn :ripple="false" flat raised to="/login" v-if="!loggedIn" id="logInOut">Log In</v-btn>
        <v-btn @click="logMemberOut" :ripple="false" flat raised v-if="loggedIn" id="logInOut">Log Out</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
let api // Need to find a way to turn all this into a function
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev') {
  api = process.env.DEV_API
} else if (process.env.NODE_ENV === 'test') {
  api = process.env.TEST_API
} else {
  api = process.env.PROD_API
}
const apiURL = api + 'csrftoken'
export default {
  data () {
    return {
      errors: []
    }
  },
  name: 'App',
  methods: {
    setCSRFToken (token) {
      this.$store.dispatch('setCSRFToken', token)
    },
    logMemberOut () {
      this.$router.push('/')
      this.$store.dispatch('logMemberOut')
    }
  },
  computed: mapGetters({
    token: 'curCSRFToken',
    loggedIn: 'logInStatus',
    memberName: 'memberName',
    memberEmail: 'memberEmail'
  }),
  created:
    function () {
      fetch(apiURL, {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => this.setCSRFToken(response.headers.get('X-CSRF-Token')))
    }
}
</script>

<style scoped>
  #home {
    margin-left: 5%;
  }
  #schedules {
    margin-left: 5%;
  }
  #signup {
    margin-right: 5%;
  }
  #logInOut {
    margin-right: 5%;
  }
  #navbar {
    background-color: white;
  }
</style>
