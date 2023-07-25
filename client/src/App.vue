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
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>悦读书馆 &nbsp;</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tabs v-model="tab" align-tabs="end">
          <v-tab :value="1"><RouterLink to="/">悦读书馆</RouterLink></v-tab>
          <v-tab :value="2"><RouterLink to="/about">关于</RouterLink></v-tab>
        </v-tabs>
    </v-toolbar>
      <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<style scoped></style>
