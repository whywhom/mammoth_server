<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const email = ref('');
const password = ref('');

const login = async () => {
    // Your login logic here
    console.log('Name:', email.value);
    console.log('Password:', password.value);

    try {
        const response = await axios.post('http://localhost:3000/user/login', {
            name: email.value,
            password: password.value,
        });

        // For demonstration purposes, assuming the server returns the user object
        const userInfo = response.data;
        store.dispatch('setUser', userInfo);
        // After successful login, get the redirect route from the query parameters
        const redirect = router.currentRoute.value || "/"; // Use '/' as the default fallback route
        // Navigate to the main page (Home.vue)
        router.push(redirect);

    } catch (error) {
        console.error('Error fetching books:', error);
    }
};
</script>

<template>
    <v-container fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" md="8" lg="4">
                <v-card class="elevation-12">
                    <v-card-title class="text-center">
                        <h2>Login</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="login">
                            <v-text-field v-model="email" label="Email" required></v-text-field>
                            <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
                            <v-btn type="submit" color="primary" block>Login</v-btn>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="text-center">
                        <router-link to="/register">Don't have an account? Register</router-link>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

