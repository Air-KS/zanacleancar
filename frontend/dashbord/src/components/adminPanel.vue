<!--
	./components/AdminPanel.vue
-->

<template>
  <div class="admin-container">

    <h1>Panel Admin</h1>

    <button class="logout-btn" @click="logout">Déconnexion</button>

    <div class="admin-links">
      <router-link to="/admin/cards" class="admin-btn">Cartes de Fidélité</router-link>
      <router-link to="/admin/rewards" class="admin-btn">Récompenses</router-link>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

async function logout() {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/admin/logout`, {}, {
      withCredentials: true
    });
    router.push('/admin-login');
  } catch (err) {
    console.error("❌ Erreur déconnexion :", err);
  }
}
</script>

<style scoped>
.admin-container {
  text-align: center;
  padding: 2rem;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background: red;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #b71c1c;
}

.admin-links {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.admin-btn {
  padding: 0.75rem 1.5rem;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
}

.admin-btn:hover {
  background: #2980b9;
}
</style>
