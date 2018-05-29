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
        <v-btn :ripple="false" flat raised to="/signup" v-if="!loggedIn" id="signup">Sign Up</v-btn>
        <v-btn :ripple="false" flat raised to="/login" v-if="!loggedIn" id="logInOut">Log In</v-btn>
        <v-btn :ripple="false" flat raised to="/logout" v-if="loggedIn" id="logInOut">Log Out</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
        <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      loggedIn: false
    }
  },
  name: 'App'
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
