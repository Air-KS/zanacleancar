<template>
  <div class="admin-container">
    <button class="logout-btn" @click="logout">Déconnexion</button>

    <h1>Panel Admin</h1>

    <input v-model="search" type="text" placeholder="🔍 Rechercher" class="search-bar" />

    <div class="user-card" v-for="user in filteredUsers" :key="user.id">
      <p><strong>🪪 </strong>{{ user.FidelityCard.card_id }}</p>
      <p><strong>Email :</strong> {{ user.email }}</p>
      <p><strong>Nom :</strong> {{ user.name }} {{ user.last_name }}</p>
      <p><strong>Téléphone :</strong> {{ user.phone || '-' }}</p>
      <p><strong>💎</strong> {{ user.loyalty_points }}
        <input type="number" v-model.number="pointsInput[user.id]" class="points-input" placeholder="Ajout" />
        <button @click="addPoints(user)" class="points-btn">+</button>
        <button @click="removePoints(user)" class="points-btn">-</button>
      </p>
      <div class="tampons-container">
        <div class="tampon-actions">
          <button @click="addTampon(user)" class="points-btn">➕</button>
          <button @click="resetTampons(user)" class="points-btn reset">♻️</button>
        </div>
        <div class="tampons-icon">
          <img v-for="i in 7" :key="i" :src="getTamponImage(i, user)" class="tampon-image" alt="tampon" />
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import tamponPlein from '@/assets/tampon-plein.png'
import tamponVide from '@/assets/tampon-vide.png'
import tamponGold from '@/assets/tampon-gold.png'

const adminEmail = import.meta.env.VITE_ADMIN_EMAIL
const users = ref([])
const search = ref('')
const router = useRouter()
const pointsInput = ref({})

// 🔁 Filtrage des utilisateurs sauf admin
const filteredUsers = computed(() =>
  users.value.filter(user =>
    user.email !== adminEmail &&
    `${user.name} ${user.last_name} ${user.email} ${user.FidelityCard?.card_id || ''}`
      .toLowerCase().includes(search.value.toLowerCase())
  )
)

onMounted(async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/admin/users`, {
      withCredentials: true,
    })
    users.value = data
  } catch (error) {
    if (error.response?.status === 401) {
      router.push('/admin-login')
    }
  }
})

const logout = async () => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/admin/logout`, {}, {
      withCredentials: true
    });
    router.push('/admin-login');
  } catch (err) {
    console.error("❌ Erreur déconnexion :", err);
  }
};

// ✅ Fonction pour ajouter des points
const addPoints = async (user) => {
  const value = pointsInput.value[user.id] || 0
  if (value <= 0) return

  const newTotal = user.loyalty_points + value

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

const getTamponImage = (index, user) => {
  const count = user.FidelityCard?.Tampons?.length || 0;
  if (index <= count) {
    return index === 7 ? tamponGold : tamponPlein;
  }
  return tamponVide;
};

const addTampon = async (user) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/admin/user/${user.id}/tampons`, {}, {
      withCredentials: true
    });
    await reloadUsers(); // Pour mettre à jour les tampons affichés
  } catch (error) {
    console.error("❌ Erreur ajout tampon :", error);
  }
};

const resetTampons = async (user) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/admin/user/${user.id}/tampons`, {
      withCredentials: true
    });
    await reloadUsers();
  } catch (error) {
    console.error("❌ Erreur reset tampons :", error);
  }
};

const reloadUsers = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/admin/users`, {
      withCredentials: true
    });
    users.value = data;
  } catch (error) {
    console.error("Erreur rechargement des utilisateurs :", error);
  }
};
</script>

<style scoped>
.admin-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  font-family: sans-serif;
}

.logout-btn {
  margin: 0 auto;
  display: block;
  padding: 8px 14px;
  background-color: #d62828;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.logout-btn:hover {
  background-color: #b71c1c;
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
  width: 80%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 50px auto;
  display: block;
}

.separator-card {
  border: solid 2px;
  height: 2px;
}

.user-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;
  background-color: #f9f9f9;
}

.user-card p {
  margin: 10px 0;
}

.tampon-actions {
  margin: 20px;
  display: flex;
  gap: 10px;
  text-align: center;
}

.tampons-icon {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.tampon-image {
  width: 40px;
  height: 40px;
}

@media (max-width: 600px) {
  .search-bar {
    width: 80%;
  }
}
</style>
