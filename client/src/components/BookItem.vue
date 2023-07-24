<script lang = "ts" setup>
const props = defineProps({
  bookId: String
})
</script>

<template>
  <div class="book-card">
    <img :src="book.coverUrl" alt="Book Cover" />
      <p class="title">{{ book.name }}</p>
      <p class="author">作者：{{ book.auth }}</p>
      <p class="price">价格：{{ book.price }}</p>
  </div>
</template>

<style scoped>
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
