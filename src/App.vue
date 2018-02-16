<template>
  <v-app>
    <v-toolbar
    app
    >
      <v-toolbar-items>
        <v-btn flat>Home</v-btn>
        <v-btn flat>Scheduling</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <router-view>
        </router-view>
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
