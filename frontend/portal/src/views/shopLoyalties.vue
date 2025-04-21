<!--
  ./frontend/portal/src/views/shopLoyalties.vue
-->

<template>
  <div class="page-container">
    <section class="intro-section">
      <h1 class="page-title">Tes points, tes cadeaux 🎁</h1>
      <div class="sub-title-desc">Accumule, choisis, savoure. Simple comme bonjour.</div>

      <!-- Condition selon la connexion -->
      <p class="info-user" v-if="isLoggedIn">
        Hey <strong>{{ user?.name }}</strong>, tu as <span class="nb-loyalties"><strong>{{ loyaltyPoints }}
            <span class="diamond">💎</span></strong></span>
      </p>
      <p class="info-user" v-else>
        Tu n'es pas
        <router-link class="shop-link" to="/login">
          connecté.
        </router-link>
      </p>
      <p class="description">
        Ici, pas de paiement, pas de panier : seulement des récompenses à débloquer grâce à ta fidélité.<br>
        Accumule des 💎 en utilisant nos services et échange-les contre des avantages réservés, des
        réductions, ou de petites surprises rien que pour toi.
        Tout est pensé pour te remercier.
      </p>
    </section>
    <div class="separator-gradient"></div>

    <h2 class="reward">📦 Récompenses existantes</h2>
    <div cclass="reward" v-if="rewards.length === 0">Aucune récompense pour le moment.</div>
    <div v-else class="reward-grid">
      <ShopCard v-for="item in rewards" :key="item.id" :item="item" />
    </div>


  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/store';
import ShopCard from '@/components/shopCard.vue';

const store = useUserStore();
const isLoggedIn = computed(() => store.isLoggedIn);
const user = computed(() => store.user); // 👈 manquant

const loyaltyPoints = ref(0);
const rewards = ref([])

const fetchUserProfile = async () => {
  try {
    const userId = store.user?.id;
    if (!userId) return;

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/user/profil/${userId}`,
      { withCredentials: true }
    );

    loyaltyPoints.value = data.loyalty_points || 0;
  } catch (error) {
    console.error("❌ Erreur récupération des points :", error);
  }
};

const fetchRewards = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/reward`, {
      withCredentials: true
    })
    rewards.value = data
  } catch (err) {
    console.error('❌ Erreur récupération récompenses :', err)
  }
}

onMounted(async () => {
  await store.checkLoginState();
  if (store.isLoggedIn) {
    await fetchUserProfile();
  }
  await fetchRewards()
});

</script>

<style scoped>
.page-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

.sub-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  padding: 50px 50px;
}

.sub-title-desc {
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  padding-bottom: 50px;
}

.info-user {
  font-size: 25px;
  text-align: center;
  padding-bottom: 50px;
}

.nb-loyalties {
  color: #3498db;
  font-weight: bold;
}

.diamond {
  position: relative;
  top: -3px;
}

.shop-link {
  text-decoration: none;
  text-shadow: 1px 1px 9px var(--color-border-shadow);
}

.shop-link:hover {
  color: var(--nav-color-hover);

  text-decoration: none;
}

.reward {
  text-align: center;
}

.reward-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
</style>
