<template>
  <div class="login-container">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFetch } from 'nuxt/app';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleSubmit = async () => {
  errorMessage.value = '';
  try {
    const { data, error } = await useFetch('/api/login', {
      method: 'POST',
      body: { username: username.value, password: password.value },
    });

    if (error.value) {
      errorMessage.value = error.value.message;
    } else if (data.value.success) {
      router.push('/');
    } else {
      errorMessage.value = data.value.message;
    }
  } catch (err) {
    errorMessage.value = 'An error occurred. Please try again.';
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 1em;
}

label {
  display: block;
  margin-bottom: 0.5em;
}

input {
  width: 100%;
  padding: 0.5em;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 0.7em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 1em;
}
</style>