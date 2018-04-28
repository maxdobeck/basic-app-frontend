<template>
  <v-app>
    <v-toolbar
    flat
    app
    >
      <v-toolbar-items>
        <v-btn :ripple="false" flat to="/">Home</v-btn>
        <v-btn :ripple="false" flat to="/schedules" v-if="loggedIn">Schedules</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn :ripple="false" flat raised to="/signup" v-if="!loggedIn">Sign Up</v-btn>
        <v-btn :ripple="false" flat raised to="/login" v-if="!loggedIn">Log In</v-btn>
        <v-btn :ripple="false" flat raised to="/logout" v-if="loggedIn">Log Out</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
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
</style>
