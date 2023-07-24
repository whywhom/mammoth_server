<template>
    <div>
      <h1>Book Detail</h1>
      <p>ID: {{ bookId }}</p>
      <!-- Add other book details here -->
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const bookId = ref(null);
  const router = useRouter();
  
  onMounted(() => {
    bookId.value = router.currentRoute.value.params.id;
    // Fetch the book details based on the bookId
    // Example: fetchBookDetails(bookId.value);
  });
  </script>
  
  <style>
  /* Styles for the book detail page */
  </style>