<template>
  <div>
    <v-list>
      <v-list-item v-for="item in items" :key="item.id" @click="handleItemClick(item)">
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const router = useRouter();
const store = useStore();
const isLoggedIn = store.getters.isLoggedIn;
const user = store.getters.getUser;

const items = [
  { id: 1, name: '图书管理', description: '添加/修改/删除 图书' },
  { id: 2, name: '文章管理', description: '添加/修改/删除 文章' },
  { id: 3, name: '客户管理', description: '添加/修改/删除 客户' },
];

const handleItemClick = (item) => {
  // Handle the click event for the selected item
  console.log('Item clicked:', item);
  switch (item.id) {
    case 1:
      router.push("/admin/books");
      break;
    case 2:
      router.push("/admin/articles");
      break;
    case 3:
      router.push("/admin/users");
      break;
    default:
      break;
  }
};
</script>

<style></style>