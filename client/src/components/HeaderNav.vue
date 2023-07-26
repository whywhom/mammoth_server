<script lang="ts">
export default {
  data: () => ({
    tab: null,
  }),
}
</script>

<template>
  <v-toolbar-title class="headline text-uppercase">
    <!-- <span>悦读书馆 &nbsp;</span> -->
    <span class="font-weight-light">MATERIAL DESIGN</span>
  </v-toolbar-title>
  <v-spacer></v-spacer>
  <v-tabs v-model="tab" align-tabs="end">
    <RouterLink to="/"><v-tab :value="1">图书</v-tab></RouterLink>
    <RouterLink to="/login"><v-tab :value="2">Login</v-tab></RouterLink>
  </v-tabs>
</template>

<style scoped>
</style>
