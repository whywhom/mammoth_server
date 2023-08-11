<template>
  <p>共有{{ books.totalItems }}本书籍</p>
  <v-row>
    <v-col v-for="book in books.books" :key="book.id"  >
      <v-card class="book-card" @click="goToDetailPage(book.id)">
        <!-- Your book grid item content here -->
        <img :src="book.coverUrl" alt="Book Cover" />
        <p>{{ book.title }}</p>
        <!-- <h5>By {{ book.author }}</h5> -->
        <!-- <p class="price">价格：{{ book.price }}</p> -->
      </v-card>
    </v-col>
  </v-row>
  <v-row class="pagination-row">
    <v-col cols="12" class="text-center">
      <v-pagination v-model="currentPage" :length="totalPages" @input="paginateBooks"></v-pagination>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
const books = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/books?page=1&pageSize=10');
    // Assuming the response contains an array of books.
    books.value = response.data;
    console.log(JSON.stringify(books))
  } catch (error) {
    console.error('Error fetching books:', error);
  }
});

const goToDetailPage = (bookId) => {
  router.push(`/book/${bookId}`);
};
</script>

<style>
.book-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* Display four columns in the grid */
  gap: 1rem;
  padding: 1rem;
}

.book-card {
  border: 1px solid #ccc;
  padding: 1rem;
  text-align: center;
  max-width: 200px;
  /* Limit each item to a maximum width of 200px */
}

.book-card img {
  max-width: 100%;
  height: auto;
}

.title {
  font-weight: bold;
}

.author {
  color: #777;
}

.price {
  color: #c00;
}
</style>