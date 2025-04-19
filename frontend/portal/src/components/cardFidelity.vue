<!--
	./frontend/portal/src/components/cardFidelity.vue
-->


<template>
  <div class="card-container">
    <div class="carte-fidelite">
      <img src="@/assets/card/card-background.png" class="carte-fond" alt="Carte de fond" />

      <!-- Infos utilisateur -->
      <div class="name">{{ name }} {{ lastName }}</div>

      <div v-if="props.cardId" class="card_number">
        Carte de Fidélité : #{{ props.cardId }}
      </div>

      <!-- Points loyalty -->
      <div class="points_loyalties">
        💎 {{ loyalty_points }}
      </div>

      <!-- Date de création -->
      <div v-if="formattedCreationDate" class="create_date">
        📅 {{ formattedCreationDate }}
      </div>

      <!-- Tampons -->
      <div v-for="(slot, index) in 7" :key="index" class="slot" :style="getPositionStyle(index)">
        <img :src="isActive(index) ? getSlotFullImage(index) : emptyStamp"
          :class="['tampon', { 'animate-spin-slow': isActive(index) }]" alt="tampon" />
        <img v-if="isActive(index)" :src="getIcon(index)" class="icon" alt="icon" />
      </div>
    </div>
  </div>

  <!-- Actions points -->
  <div class="points-actions">
    <input v-model.number="pointsToChange" type="number" placeholder="Points" class="input" />
    <button @click="addPoints">➕</button>
    <button @click="removePoints">➖</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';

import emptyStamp from '@/assets/card/tampon-vide.png';
import fullStamp from '@/assets/card/tampon-plein.png';
import goldStamp from '@/assets/card/tampon-gold.png';

import icon1 from '@/assets/card/tete1-2.png';
import icon2 from '@/assets/card/tete3-4.png';
import icon3 from '@/assets/card/tete5-6.png';
import iconGold from '@/assets/card/tete7.png';

const props = defineProps({
  stamps: Number,
  name: String,
  lastName: String,
  dateOfBirth: String,
  loyalty_points: [String, Number],
  userId: [String, Number],
  cardId: String,
  cardCreatedAt: String
});

const formattedCreationDate = computed(() => {
  if (!props.cardCreatedAt) return '';
  const date = new Date(props.cardCreatedAt);
  return date.toLocaleDateString('fr-FR');
});

const formattedBirthDate = computed(() => {
  if (!props.dateOfBirth) return '';
  const [year, month, day] = props.dateOfBirth.split('-');
  return `${day}/${month}/${year}`;
});

const isActive = (index) => index < props.stamps;

const getPositionStyle = (index) => {
  const positions = [
    { top: '27.5%', left: '28%' },
    { top: '27.5%', left: '40%' },
    { top: '27.5%', left: '52%' },
    { top: '44%', left: '28%' },
    { top: '44%', left: '40%' },
    { top: '44%', left: '52%' },
    { top: '35.6%', left: '63%' },
  ];
  return positions[index];
};

const getIcon = (index) => {
  if (index <= 1) return icon1;
  if (index <= 3) return icon2;
  if (index <= 5) return icon3;
  return iconGold;
};

const getSlotFullImage = (index) => (index === 6 ? goldStamp : fullStamp);

// Valeur à modifier
const pointsToChange = ref(0);

// Ajoute des points
const addPoints = async () => {
  await updateLoyalty(props.loyalty_points + pointsToChange.value);
};

// Retire des points (sans aller en négatif)
const removePoints = async () => {
  const newValue = Math.max(0, props.loyalty_points - pointsToChange.value);
  await updateLoyalty(newValue);
};

// Appelle l’API avec la nouvelle valeur
const updateLoyalty = async (newTotal) => {
  try {
    await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/user/profil/${props.userId}`, {
      loyalty_points: newTotal
    }, { withCredentials: true });

    window.location.reload();
  } catch (err) {
    console.error("❌ Erreur MAJ des points :", err);
  }
};
</script>

<style scoped>
.animate-spin-slow {
  animation: spin 6s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}


.card-container {
  border: 4px solid #1f2937;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  background-color: #fff;
}

.carte-fidelite {
  position: relative;
  width: 100%;
  aspect-ratio: 850 / 530;
  margin: auto;
  z-index: 1;
}

.carte-fond {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.name,
.card_number,
.points_loyalties,
.create_date {
  position: absolute;
  width: 100%;
  margin: 0 auto;
  color: #ffffff;
  text-shadow: 2px 2px 4px #0a0a0a;
  font-weight: bold;
  text-align: center;
}

.name {
  top: 3%;
  font-size: clamp(1rem, 2vw, 2.5rem);
  color: #ffffff;
  text-shadow: 2px 2px 4px #4787a1;
}

.card_number {
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  top: 14%;

}

.points_loyalties {
  font-size: clamp(1rem, 1.5vw, 2rem);
  text-align: right;
  top: 3%;
  right: 2%
}

.create_date {
  font-size: clamp(1rem, 1.5vw, 2rem);
  text-align: left;
  bottom: 5%;
  left: 15%
}

/* Slots tampons */
.slot {
  position: absolute;
  width: 10%;
  height: auto;
}

.tampon {
  width: 100%;
  height: auto;
}

.icon {
  position: absolute;
  width: 100%;
  height: auto;
  top: 0%;
  left: 0%;
}

/* Position spécifique des tampons */
.slot-0 {
  top: 130px;
  left: 450px;
}

.slot-1 {
  top: 130px;
  left: 550px;
}

.slot-2 {
  top: 130px;
  left: 650px;
}

.slot-3 {
  top: 230px;
  left: 450px;
}

.slot-4 {
  top: 230px;
  left: 550px;
}

.slot-5 {
  top: 230px;
  left: 650px;
}

/* Animation lente */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin 6s linear infinite;
}

/* =============================================
   RESPONSIVE : MOBILE (<768px)
============================================= */
@media (max-width: 600px) {
  .name {
  font-size: clamp(1rem, 1.5vw, 2.5rem);
}

.card_number {
  font-size: clamp(0.8rem, 1.3vw, 1.5rem);

}

.points_loyalties {
  font-size: clamp(0.8rem, 1.3vw, 1.8rem);
}

.create_date {
  font-size: clamp(0.8rem, 1.3vw, 1.8rem);
}
}

/* =============================================
   RESPONSIVE : TABLETTE (769px à 1200px)
============================================= */
@media (min-width: 768px) and (max-width: 1200px) {

  .name {
    font-size: clamp(1rem, 2vw, 2.5rem);
  }

  .card_number {
    font-size: clamp(0.7rem, 2vw, 1.5rem);
  }

}
</style>
