<template>
  <div ref="menuContainer">
    <button class="floating-btn" @click="toggleMenu">
      <img src="@/assets/phone-menu.png" alt="Téléphone" class="phone-icon" />
    </button>

    <transition name="fade">
      <div v-show="isOpen" class="contact-menu">
        <!-- <p>📞 <strong>Téléphone :</strong> <a href="tel:0610421272">06.07.08.09.00</a></p> -->
        <p>📧 <strong>Email :</strong> <a href="mailto:contact@zanacleancar.fr">contact@zanacleancar.fr</a></p>
        <p>📍 <strong>Zone :</strong> Roubaix & Alentours</p>
        <div class="map">
          <iframe src="https://www.google.com/maps?q=Roubaix,France&output=embed" allowfullscreen="" loading="lazy">
          </iframe>
        </div>
        <p style="font-size: 15px; color: #555;">🚗 Basé à Roubaix — Déplacements dans toute la métropole Lilloise</p>
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

.map {
  width: 95%;
  height: 250px;
  border: 1px solid #ccc;
  border-radius: 6px;
  overflow: hidden;
  margin: 10px 0;
}

.map iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

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
  top: 5px;
  left: 100px;
  padding: 12px 15px;
  cursor: pointer;
  z-index: 1000;
  transition: background-color 0.2s ease;
  background-color: transparent;
  border: none;
  box-shadow: none;
  outline: none;
  text-shadow: 2px 2px 8px #0a0a0a;
}

.phone-icon {
  width: 90px;
  height: auto;
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
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
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
    top: 0px;
  }

  .contact-menu {
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
