<template>
  <div class="admin-container">
    <h1>Panel Admin</h1>

    <input v-model="search" type="text" placeholder="🔍 Rechercher par nom ou prénom" class="search-bar" />

    <div class="user-card" v-for="user in filteredUsers" :key="user.id">
      <p><strong>Carte :</strong>{{ user.FidelityCard.card_id }}</p>
      <p><strong>Nom :</strong> {{ user.last_name }}</p>
      <p><strong>Prénom :</strong> {{ user.name }}</p>
      <p><strong>Email :</strong> {{ user.email }}</p>
      <p><strong>Téléphone :</strong> {{ user.phone || '-' }}</p>
      <p><strong>Date de naissance :</strong> {{ formatDate(user.date_of_birth) }}</p>
      <p><strong>Points :</strong> {{ user.loyalty_points }}
  <input
    type="number"
    v-model.number="pointsInput[user.id]"
    class="points-input"
    placeholder="Ajout"
  />
  <button @click="addPoints(user)" class="points-btn">+</button>
  <button @click="removePoints(user)" class="points-btn">-</button>
</p>
      <p><strong>Nombre de Tampons :</strong> {{ user.FidelityCard?.Tampons?.length || 0 }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'

const adminEmail = import.meta.env.VITE_ADMIN_EMAIL
const users = ref([])
const search = ref('')
const pointsInput = ref({})

// 🔁 Filtrage des utilisateurs sauf admin
const filteredUsers = computed(() =>
  users.value.filter(user =>
    user.email !== adminEmail &&
    `${user.name} ${user.last_name} ${user.email} ${user.FidelityCard?.card_id || ''}`
    .toLowerCase().includes(search.value.toLowerCase())
  )
)

// ✅ Fonction pour ajouter des points
const addPoints = async (user) => {
  const value = pointsInput.value[user.id] || 0
  if (value <= 0) return

  const newTotal = user.loyalty_points + value

  try {
    await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/user/profil/${user.id}`, {
      loyalty_points: newTotal
    }, { withCredentials: true })

    user.loyalty_points = newTotal
    pointsInput.value[user.id] = 0
  } catch (err) {
    console.error("❌ Erreur MAJ des points :", err)
  }
}

// ✅ Fonction pour retirer des points
const removePoints = async (user) => {
  const value = pointsInput.value[user.id] || 0
  if (value <= 0) return

  const newTotal = Math.max(0, user.loyalty_points - value)

  try {
    await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/admin/user/${user.id}/points`, {
      loyalty_points: newTotal
    }, { withCredentials: true })

    user.loyalty_points = newTotal
    pointsInput.value[user.id] = 0
  } catch (err) {
    console.error("❌ Erreur MAJ des points :", err)
  }
}

onMounted(async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/admin/users`, {
      withCredentials: true,
    })
    users.value = data
  } catch (error) {
    console.error("Erreur chargement des utilisateurs :", error)
  }
})

const formatDate = (date) => {
  if (!date) return '-'
  const d = new Date(date)
  return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`
}
</script>

<style scoped>
.admin-container {
  max-width: 1000px;
  margin: auto;
  padding: 30px;
  font-family: sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #f5f5f5;
}

.search-bar {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.user-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  background-color: #f9f9f9;
}

.user-card p {
  margin: 5px 0;
}
</style>
