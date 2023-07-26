<template>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" md="12" lg="12" xl="12" xxl="12">
          <v-card class="elevation-12" lg="12" xl="12" xxl="12">
            <v-card-title class="text-center">
              <h2>Login</h2>
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field
                  v-model="email"
                  label="Email"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  required
                ></v-text-field>
                <v-btn type="submit" color="primary" block>Login</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const email = ref('');
  const password = ref('');
  
  const login = () => {
    // Your login logic here
    console.log('Email:', email.value);
    console.log('Password:', password.value);
  };
  </script>