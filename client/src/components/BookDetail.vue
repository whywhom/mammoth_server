<script lang = "ts" setup>

const props = defineProps({
  bookId: String
})

import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const book = ref({});
const router = useRouter();

onMounted(async () => {
  const bookId = router.currentRoute.value.params.id;
  try {
    const response = await axios.get(`http://localhost:3000/books/${bookId}`);
    book.value = response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
  }
});

</script>

<template>
  <div class="book-detail">
    <div class="book-cover">
      <img :src="book.coverUrl" alt="Book Cover" class="cover-image" />
    </div>
    <div class="book-info">
      <h1>{{ book.title }}</h1>
      <p class="author">By {{ book.author }}</p>
      <p class="format">格式： {{ book.format }}</p>
      <p class="rank">评价： {{ book.rank }}🌟</p>
      <p class="book_intro">图书介绍：</p>
      <p class="description">{{ book.book_description }}</p>
      <p class="author_intro">作者简介：</p>
      <p class="author_description">{{ book.author_description }}</p>
      <p class="downloadUrl">下载地址:</p>
      <li v-for="item in book.downloadUri" :key="item.id">
        <a :href="item.siteUrl" target="_blank">{{ item.siteName }}</a>
      </li>
      <!-- Add other book details here, like ISBN, published date, etc. -->
    </div>
    </div>
</template>

<style scoped>
.book-detail {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  padding: 20px;
}

.book-cover {
  flex: 1;
  display: flex;
  align-items: start;
  justify-content: center;
}

.cover-image {
  max-width: 200px;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.book-info {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.author {
  color: #777;
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
}
</style>
