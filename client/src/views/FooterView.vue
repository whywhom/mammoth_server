<script lang="ts">
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
  }
</script>

<template>
  <v-footer app class="bg-indigo-lighten-1 text-center d-flex flex-column">
    <div>
      Copyright © 2018 - {{ new Date().getFullYear() }} 悦读书馆. All Rights Reserved.
    </div>
  </v-footer>
</template>

<style>

</style>
