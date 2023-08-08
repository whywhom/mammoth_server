<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const user = store?.getters?.getUser;

const name = ref('');
const title = ref('');
const author = ref('');
const price = ref('');
const publisher = ref('');
const book_description = ref('');
const author_description = ref('');
const note = ref('');
const rank = ref('');
const format = ref('');
const downloadUri = ref('');
const code = ref('');
const coverUrl = ref('');
const isbn = ref('');
const uploader_id = ref('');
const download_times = ref('');
const category = ref('');
const tag = ref('');

const addBook = async () => {
  try {
    const downloadInfo = [{
    siteUrl: downloadUri.value,
    siteCode: code.value,
    siteName: "城通网盘"
    }]
    const response = await axios.post(`http://localhost:3000/books`, {
      name: name.value,
      title: title.value,
      author: author.value,
      price: price.value != null? price.value:"0",
      publisher: publisher.value != null? publisher.value:"",
      publish_date: new Date().toLocaleString(),
      book_description: book_description.value != null? book_description.value:"",
      author_description: author_description.value != null? author_description.value:"",
      note: note.value != null? note.value:"",
      rank: rank.value != null? rank.value:"",
      format: format.value != null? format.value:"",
      downloadUri: downloadInfo != null? downloadInfo:[{}],
      code: code.value,
      coverUrl: coverUrl.value,
      isbn: isbn.value != null? isbn.value:"",
      download_times: download_times.value != null? download_times.value:"",
      uploader_id: user?.user.uid != null? user?.user.uid:"",
      category: category.value != null? category.value.split(";"):"",
      tag: tag.value != null? tag.value.split(";"):"",
    });

    console.log('Book added successfully');
  } catch (error) {
    console.error('Error adding book:', error);
  }
};
</script>

<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" lg="8">
        <v-form @submit.prevent="addBook">
          <v-text-field v-model="name" label="name" required></v-text-field>
          <v-text-field v-model="title" label="title" required></v-text-field>
          <v-text-field v-model="author" label="author"></v-text-field>
          <v-text-field v-model="price" label="price"></v-text-field>
          <v-text-field v-model="publisher" label="publisher"></v-text-field>
          <!-- <v-text-field v-model="publish_date" label="publish_date"></v-text-field> -->
          <v-text-field v-model="book_description" label="book_description"></v-text-field>
          <v-text-field v-model="author_description" label="author_description"></v-text-field>
          <v-text-field v-model="note" label="note"></v-text-field>
          <v-text-field v-model="rank" label="rank"></v-text-field>
          <v-text-field v-model="format" label="format"></v-text-field>
          <v-text-field v-model="downloadUri" label="downloadUri"></v-text-field>
          <v-text-field v-model="code" label="code"></v-text-field>
          <v-text-field v-model="coverUrl" label="coverUrl"></v-text-field>
          <v-text-field v-model="isbn" label="isbn"></v-text-field>
          <v-text-field v-model="download_times" label="download_times"></v-text-field>
          <v-text-field v-model="uploader_id" label="uploader_id"></v-text-field>
          <v-text-field v-model="category" label="isbn"></v-text-field>
          <v-text-field v-model="tag" label="tag"></v-text-field>
          <v-btn type="submit">添加</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>