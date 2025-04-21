<!--
  ./frontend/portal/src/views/shopLoyalties.vue
-->

<template>
  <div class="page-container">
    <section class="intro-section">
      <h1 class="page-title">Tes points, tes cadeaux 🎁</h1>
      <div class="sub-title-desc">Accumule, choisis, savoure. Simple comme bonjour.</div>

      <!-- Condition selon la connexion -->
      <p class="nb-loyalties" v-if="isLoggedIn">
        Hey <strong>{{ user?.name }}</strong>, tu as <strong>{{ loyaltyPoints }}</strong> 💎
      </p>
      <p class="nb-loyalties" v-else>
        Tu n'es pas
        <router-link class="shop-link" to="/login">
          connecté.
        </router-link>
      </p>
      <p class="description">
        Ton espace Loyauté, où chaque 💎 a de la valeur !<br>
        Ici, pas de paiement, pas de panier : seulement des récompenses à débloquer grâce à ta fidélité.<br>
        Accumule des 💎 en utilisant nos services et échange-les contre des avantages réservés, des
        réductions, ou de petites surprises rien que pour toi.
        Tout est pensé pour te remercier.
      </p>
    </section>

    <section class="shop-grid">
    <ShopCard
      v-for="(item, index) in items"
      :key="index"
      v-bind="item"
    />
  </section>

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

onMounted(async () => {
  await store.checkLoginState();
  if (store.isLoggedIn) {
    await fetchUserProfile();
  }
});

// Item
const items = [
  {
    title:
    "Sapin en forme de sapin Sapin en forme de sapin \
    Sapin en forme de sapin Sapin en forme de sapin \
    Sapin en forme de sapin",
    description: "Parfum voiture Parfum voiture Parfum voiture Parfum voiture \
    Parfum voiture Parfum voiture Parfum voiture Parfum voiture",
    price: 12,
    image: "img/shop/sapin/sapin1.png"
  },

  {
    title: "Capsule en forme de coeur, Capsule en forme de coeur, Capsule en forme de coeur \
    Capsule en forme de coeur, Capsule en forme de coeur, Capsule en forme de coeur ",
    description: "Parfum voiture, Parfum voiture, Parfum voiture, Parfum voiture, \
    Parfum voiture, Parfum voiture, Parfum voiture, Parfum voiture, Parfum voiture, ",
    price: 12,
    image: "img/shop/capsule/capsule1.png"
  },
  {
    title: "Sapin",
    description: "Parfum voiture.",
    price: 12,
    image: "img/shop/sapin/sapin1.png"
  },

  {
    title: "Capsule en forme de coeur",
    description: "Parfum voiture.",
    price: 12,
    image: "img/shop/capsule/capsule1.png"
  },
  {
    title: "Sapin",
    description: "Parfum voiture.",
    price: 12,
    image: "img/shop/sapin/sapin1.png"
  },

  {
    title: "Capsule en forme de coeur",
    description: "Parfum voiture.",
    price: 12,
    image: "img/shop/capsule/capsule1.png"
  },
  {
    title: "Sapin",
    description: "Parfum voiture.",
    price: 12,
    image: "img/shop/sapin/sapin1.png"
  },

  {
    title: "Capsule en forme de coeur",
    description: "Parfum voiture.",
    price: 12,
    image: "img/shop/capsule/capsule1.png"
  },
  {
    title: "Sapin",
    description: "Parfum voiture.",
    price: 12,
    image: "img/shop/sapin/sapin1.png"
  },

  {
    title: "Capsule en forme de coeur",
    description: "Parfum voiture.",
    price: 12,
    image: "img/shop/capsule/capsule1.png"
  },
  {
    title: "Sapin",
    description: "Parfum voiture.",
    price: 12,
    image: "img/shop/sapin/sapin1.png"
  },

  {
    title: "Capsule en forme de coeur",
    description: "Parfum voiture.",
    price: 12,
    image: "img/shop/capsule/capsule1.png"
  },
  {
    title: "Sapin",
    description: "Parfum voiture.",
    price: 12,
    image: "img/shop/sapin/sapin1.png"
  },

  {
    title: "Capsule en forme de coeur",
    description: "Parfum voiture.",
    price: 12,
    image: "img/shop/capsule/capsule1.png"
  },
  {
    title: "Sapin",
    description: "Parfum voiture.",
    price: 12,
    image: "img/shop/sapin/sapin1.png"
  },
];


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

.nb-loyalties {
  font-size: 25px;
  text-align: center;
  padding-bottom: 50px;
}
.shop-link {
  text-decoration: none;
  text-shadow: 1px 1px 9px var(--color-border-shadow);
}

.shop-link:hover {
  color: var(--nav-color-hover);

  text-decoration: none;
}

.shop-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 5rem;
}
</style>
