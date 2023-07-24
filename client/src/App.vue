<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'

export default {
  data: () => ({
    tab: null,
  }),
}
</script>

<template>
  <v-app>
    <v-app-bar app>
      <v-tabs v-model="tab" align-tabs="center">
          <v-tab :value="1"><RouterLink to="/">悦读书馆</RouterLink></v-tab>
          <v-tab :value="2"><RouterLink to="/about">关于</RouterLink></v-tab>
        </v-tabs>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style scoped></style>
