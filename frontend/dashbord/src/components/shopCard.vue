<!--
	./frontend/dashbord/src/components/shopCard.vue
-->

<template>
  <div class="card">
    <div class="image-wrapper">
      <img
  :src="item.images[currentIndex]"
  alt="image"
  class="card-img"
  @click="openModal"
/>
<!-- Flèches dans la carte -->
<button class="arrow left" @click="prevImage">◀</button>
<button class="arrow right" @click="nextImage">▶</button>
    </div>
    <div class="card-body">
      <h3 class="title">{{ truncate(item.name, 75) }}</h3>
      <p class="desc">{{ truncate(item.description, 200) }}</p>
      <div class="footer">
        <span class="price">{{ item.price }} <span class="diamond">💎</span></span>
        <div class="actions">
          <button class="btn edit" @click="$emit('edit', item)">✏️</button>
          <button class="btn delete" @click="$emit('delete', item.id)">🗑</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Flèches dans le modal (NOUVELLE CLASSE) -->
  <div v-if="isModalOpen" class="modal" @click.self="closeModal">
  <div class="modal-content">
    <button class="modal-arrow left" @click.stop="prevImage">◀</button>
    <img :src="item.images[currentIndex]" class="modal-img" />
    <button class="modal-arrow right" @click.stop="nextImage">▶</button>
    <button class="close-btn" @click="closeModal">✖</button>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue' // ← ajoute cette ligne ✅

const { item } = defineProps({ item: Object })
defineEmits(['edit', 'delete'])

const currentIndex = ref(0)
const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}
const closeModal = () => {
  isModalOpen.value = false
}

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % item.images.length
}
const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + item.images.length) % item.images.length
}

const truncate = (text, max) => {
  if (!text) return ''
  return text.length > max ? text.substring(0, max) + '…' : text
}
</script>

<style scoped>
.card {
  display: block;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 400px;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.image-wrapper {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-img {
  border-bottom: 1px solid #dbdbdb;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  height: 200px;
  object-fit: fill;
  opacity: 0.8;
  transition: opacity 0.4s ease-in-out;
}
.card:hover .card-img {
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);

  border: none;
  font-size: 1.5rem;
  border-radius: 25px;
  padding: 70px 8px;
  cursor: pointer;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  color: #0000009f;
}
.card:hover .arrow {
  opacity: 1;
  transition: opacity 0.5s ease-in-out;

}

.left {
  left: 8px;
}

.right {
  right: 8px;
}

.card-body {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  overflow: hidden;
}

.title {
  font-size: 1rem;
  color: #222;
  margin: 0px;
  /* encore moins d’espace */
  height: 45px;
  overflow: hidden;
}

.desc {
  font-size: 0.85rem;
  color: #666;
  height: 90px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  color: #3498db;
  font-weight: bold;
}

.diamond {
  position: relative;
  top: -2px;
}

.actions {
  display: flex;
  gap: 6px;
}

.btn {
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  color: white;
}

.edit {
  background: #f1c40f;
  transition: transform 0.2s ease;
}

.delete {
  background: #e74c3c;
  transition: transform 0.2s ease;
}

.edit:hover,
.delete:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  filter: brightness(0.7);
}


.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  animation: fadeIn 0.3s ease-in-out;
}

.modal-content {
  position: relative;
  max-width: 80%;
  max-height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-img {
  max-width: 80%;
  max-height: 800px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
}

.modal-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  font-size: 2rem;
  border-radius: 50%;
  padding: 15px;
  color: white;
  cursor: pointer;
  z-index: 1001;
  opacity: 0.7;
  transition: opacity 0.2s ease-in-out;
}
.modal-arrow:hover {
  opacity: 1;
}
.modal-arrow.left {
  left: -10px;
}
.modal-arrow.right {
  right: -10px;
}

.close-btn {
  position: absolute;
  top: 0px;
  right: 0px;
  background: transparent;
  color: white;
  font-size: 2rem;
  border: none;
  cursor: pointer;
}

@keyframes fadeIn {
  from { opacity: 0 }
  to   { opacity: 1 }
}

@media(max-width: 800px) {
  .modal-arrow.left {
  left: -35px;
}
.modal-arrow.right {
  right: -35px;
}
.close-btn {
  right: -10px;
}
}
</style>
