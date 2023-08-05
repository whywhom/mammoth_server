<script lang="ts" setup>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import userIcon from './icons/IconUser.vue'
const store = useStore();
const isLoggedIn = computed(() => store.getters.isLoggedIn);

const userAvatar = ref('path-to-default-avatar.jpg'); // Provide a default avatar path
const showUserMenu = ref(false);

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};
</script>

<template>
  <v-toolbar-title class="headline text-uppercase">
    <!-- <span>悦读书馆 &nbsp;</span> -->
    <!-- <span class="font-weight-light">MATERIAL DESIGN</span> -->
    <span class="font-weight-light">悦读书馆</span>
  </v-toolbar-title>
  <v-spacer></v-spacer>
  <v-tabs v-model="tab" align-tabs="end">
    <RouterLink to="/"><v-tab :value="1">图书</v-tab></RouterLink>
    <RouterLink to="/login"><v-tab :value="2">{{ isLoggedIn ? '登录' : '退出' }}</v-tab></RouterLink>    
  </v-tabs>
</template>

<style scoped>
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}

.user-menu {
  position: absolute;
  top: 60px; /* Adjust the distance from the avatar as needed */
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
}
</style>
