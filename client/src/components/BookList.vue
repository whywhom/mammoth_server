<template>
  <h1>Book List</h1>
  <div class="book-grid">
    <div v-for="book in books.books" :key="book.id" class="book-card" @click="goToDetailPage(book.id)">
      <img :src="book.coverUrl" alt="Book Cover" />
      <p class="title">{{ book.title }}</p>
      <p class="author">作者：{{ book.author }}</p>
      <p class="price">价格：{{ book.price }}</p>
    </div>
  </div>
  <br>共有{{books.total}}本书籍
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
const books = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/books');
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
  grid-template-columns: repeat(4, 1fr); /* Display four columns in the grid */
  gap: 1rem;
  padding: 1rem;
}

.book-card {
  border: 1px solid #ccc;
  padding: 1rem;
  text-align: center;
  max-width: 200px; /* Limit each item to a maximum width of 200px */
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