<!--
	./frontend/portal/src/components/cardFidelity.vue
-->


<template>
	<div class="card-container">
		<div class="carte-fidelite">
			<img src="@/assets/card/card-background.png" class="carte-fond" alt="Carte de fond" />

			<div
  v-for="(slot, index) in 7"
  :key="index"
  class="slot"
  :style="getPositionStyle(index)"
>
				<!-- Slot vide ou plein -->
				<img :src="isActive(index) ? getSlotFullImage(index) : emptyStamp" class="tampon" alt="tampon" />
				<!-- Icon -->
				<img v-if="isActive(index)" :src="getIcon(index)" class="icon" alt="icon" />
			</div>
		</div>
	</div>
</template>

<script setup>
import emptyStamp from '@/assets/card/tampon-vide.png';
import fullStamp from '@/assets/card/tampon-plein.png';
import goldStamp from '@/assets/card/tampon-gold.png';

import icon1 from '@/assets/card/tete1-2.png';
import icon2 from '@/assets/card/tete3-4.png';
import icon3 from '@/assets/card/tete5-6.png';
import iconGold from '@/assets/card/tete7.png';

// Props ou données simulées
const props = defineProps({
	stamps: Number // nombre de tampons (entre 0 et 6)
});

// Détermine si un slot est actif
const isActive = (index) => index < props.stamps;

// Position des tampons (ex. ajusté en px ou %)
const getPositionStyle = (index) => {
	const positions = [
		{ top: '24%', left: '56%' },
		{ top: '24%', left: '66%' },
		{ top: '24%', left: '76%' },
		{ top: '44%', left: '56%' },
		{ top: '44%', left: '66%' },
		{ top: '44%', left: '76%' },
		{ top: '34%', left: '85%' },
	];
	return {
		top: positions[index].top,
		left: positions[index].left,
	};
};

// Icon selon le slot
const getIcon = (index) => {
	if (index <= 1) return icon1;
	if (index <= 3) return icon2;
	if (index <= 6) return icon3;
	return iconGold;
};

// Slot plein ou gold
const getSlotFullImage = (index) => (index === 6 ? goldStamp : fullStamp);
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
  border: 4px solid #1f2937; /* exemple d’une bordure sombre */
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15); /* soft shadow */
  background-color: #fff; /* ou ton fond clair */
}

.carte-fidelite {
	position: relative;
	width: 100%;
	aspect-ratio: 850 / 530;
	max-width: 850px;
	margin: auto;
	z-index: 1;
}

.carte-fond {
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
}

/* Slots tampons */
.slot {
  position: absolute;
  width: 9.5%;
  height: auto;
}

.tampon {
	width: 100%;
	height: auto;
	animation: spin 6s linear infinite;
}

.icon {
  position: absolute;
  width: 60%;
  height: auto;
  top: 20%;
  left: 20%;
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
</style>
