<script setup lang="ts">
import HeaderView from "./views/HeaderView.vue"
import ContentView from "./views/ContentView.vue"
import FooterView from "./views/FooterView.vue"
</script>

<template>
  <v-app>
    <HeaderView app/>
    <ContentView app/>
    <FooterView app/>
  </v-app>
</template>

<style scoped></style>
