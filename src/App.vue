<template>
  <v-app>
    <v-toolbar
    app
    >
      <v-toolbar-items>
        <v-btn flat to="/" >Home</v-btn>
        <v-btn flat to="/scheduling" >Scheduling</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
</style>
