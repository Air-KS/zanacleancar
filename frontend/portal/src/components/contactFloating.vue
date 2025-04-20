<template>
  <div ref="menuContainer">
    <button class="floating-btn" @click="toggleMenu">
      ☎️
    </button>

    <transition name="fade">
      <div v-show="isOpen" class="contact-menu">
        <p>📞 <strong>Téléphone :</strong> 06.10.42.12.72</p>
        <p>📍 <strong>Zone :</strong> Roubaix & Alentours</p>
        <p>📧 <strong>Email :</strong> zanacleancar@gmail.com</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isOpen = ref(false)
const menuContainer = ref(null)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const handleClickOutside = (e) => {
  if (menuContainer.value && !menuContainer.value.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;

}

.floating-btn {
  position: fixed;
  top: -5px;
  left: 120px;
  padding: 12px 15px;
  font-size: 50px;
  cursor: pointer;
  z-index: 1000;
  transition: background-color 0.2s ease;
  background-color: transparent; /* ou #fff si tu veux un fond clair */
  border: none;
  box-shadow: none; /* supprime l'ombre */
  outline: none;
  text-shadow: 2px 2px 8px #0a0a0a;
}

.contact-menu {
  position: fixed;
  top: 50px;
  left: 20px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 30px 0px 0px 15px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
  z-index: 999;
  transition: opacity 0.2s ease;
  text-shadow: 2px 2px 8px #0a0a0a9d;
}

.contact-menu.show {
  opacity: 1;
  pointer-events: auto;
}

.contact-menu p {
  margin: 15px 0;
  font-size: 14px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .floating-btn {
    left: 50%;
    transform: translateX(-50%);
    top: -10px;
  }

  .contact-menu {
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
