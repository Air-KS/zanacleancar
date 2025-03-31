<!--
  ./frontend/portal/src/components/header.vue
-->

<template>
  <header class="header">

    <!-- =============================================
		   MENU PRINCIPAL (PC - en haut de page)
	  ============================================== -->
    <transition name="fade-menu">
      <div class="header-inner" v-if="showFullMenu">
        <nav class="nav-full" aria-label="Navigation principale">
          <ul class="nav-menu">
            <li class="nav-menu-item" v-for="(item, index) in menuItems.filter(i => i.link !== '/login')" :key="index">
              <router-link class="nav-menu-link" :to="item.link">
                {{ item.label }}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </transition>

    <!-- =============================================
		   MENU FLOTTANT (scroll bas, PC uniquement)
	  ============================================== -->
    <transition name="fade-menu">
      <nav v-if="showFloatMenu" class="nav-float" aria-label="Navigation secondaire">
        <ul class="pill-menu">
          <span class="hover-bg" ref="hoverBg"></span>
          <li v-for="(item, index) in menuItems" :key="index" @mouseenter="moveHover(index)">
            <router-link :to="item.link" :data-label="item.label">
              {{ item.label }}
            </router-link>
          </li>
        </ul>
      </nav>
    </transition>

    <!-- =============================================
		   MENU MOBILE (visible en responsive)
	  ============================================== -->
    <transition name="slide-menu">
      <nav v-if="isMobile && showMobileMenu" ref="mobileMenu" class="nav-mobile">
        <ul class="mobile-menu">
          <li v-for="(item, index) in menuItems.filter(i => i.link !== '/login')" :key="index">
            <router-link :to="item.link" @click="closeMobileMenu">
              {{ item.label }}
            </router-link>
          </li>
        </ul>
      </nav>
    </transition>

    <!-- =============================================
		   BOUTON HAMBURGER (menu mobile toggle)
	  ============================================== -->
    <button class="menu-toggle" :class="{ active: showMobileMenu }" @click="toggleMobileMenu" v-if="isMobile">
      <span class="menu-toggle-bar top-bar"></span>
      <span class="menu-toggle-bar middle-bar"></span>
      <span class="menu-toggle-bar bottom-bar"></span>
    </button>

    <!-- =============================================
		   SECTION COMPTE / PROFIL (à droite)
	  ============================================== -->
    <div class="account-section" ref="accountDropdown" v-if="showFullMenu">

      <!-- Utilisateur connecté -->
      <template v-if="userStore.isLoggedIn">
        <button @click="toggleDropdown" class="account-button account-button-x">
          <img src="@/assets/profile-circle.svg" alt="Profile" class="avatar-icon" />
        </button>
      </template>

      <!-- Utilisateur non connecté -->
      <template v-else>
        <router-link to="/login" class="account-button account-button-x">
          <i class="fas fa-user-circle"></i>
          <span>Compte</span>
        </router-link>
      </template>

    </div>

    <!-- =============================================
		   MENU DÉROULANT COMPTE (Dropdown)
	  ============================================== -->
    <transition name="slide-dropdown">
      <ul v-if="showDropdown" class="dropdown-menu">
        <li class="dropdown-item">
          <router-link to="/profil" @click="closeDropdown">Profil</router-link>
        </li>
        <li class="dropdown-item" @click="() => { handleLogout(); closeDropdown(); }">Déconnexion</li>
      </ul>
    </transition>

  </header>
</template>

<script setup>
// =============================================
// IMPORTS & SETUP
// =============================================
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useUserStore } from '@/store';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

// =============================================
// ÉTATS RÉACTIFS (state)
// =============================================
const menuItems = ref([
  { label: 'Accueil', link: '/' },
  { label: 'Services', link: '/register' },
  { label: 'Services', link: '/register' },
  { label: 'Contactez-nous', link: '/register' },
]);

const showFullMenu = ref(true);
const showFloatMenu = ref(false);
const lastScrollY = ref(0);
const isMobile = ref(false);
const showMobileMenu = ref(false);

const showDropdown = ref(false);
const hoverBg = ref(null);
const mobileMenu = ref(null);
const accountDropdown = ref(null);

// =============================================
// AUTH / COMPTE
// =============================================
async function handleLogout() {
  await userStore.logout();
  window.location.href = "/";
}

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function closeDropdown() {
  showDropdown.value = false;
}

// =============================================
// SCROLL & RESPONSIVE
// =============================================
function handleScroll() {
  const currentY = window.scrollY;

  if (isMobile.value) {
    showFullMenu.value = true;
    showFloatMenu.value = false;
    lastScrollY.value = currentY;
    return;
  }

  const scrollingUp = currentY < lastScrollY.value;
  showFullMenu.value = currentY <= 250;
  showFloatMenu.value = scrollingUp && currentY > 250;
  lastScrollY.value = currentY;
  showDropdown.value = false;
}

function checkIsMobile() {
  isMobile.value = window.innerWidth <= 768;
}

// =============================================
// MENU MOBILE
// =============================================
function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value;
}

function closeMobileMenu() {
  showMobileMenu.value = false;
}

// =============================================
// INTERACTION : CLIQUE EXTÉRIEUR
// =============================================
function handleClickOutside(event) {
  // Fermer menu mobile si clic extérieur
  if (
    showMobileMenu.value &&
    mobileMenu.value &&
    !mobileMenu.value.contains(event.target) &&
    !event.target.closest('.menu-toggle')
  ) {
    closeMobileMenu();
  }

  // Fermer dropdown utilisateur si clic extérieur
  if (
    showDropdown.value &&
    accountDropdown.value &&
    !accountDropdown.value.contains(event.target) &&
    !event.target.closest('.dropdown-menu')
  ) {
    closeDropdown();
  }
}

// =============================================
// ANIMATION MENU FLOTTANT
// =============================================
function moveHover(index) {
  nextTick(() => {
    const listItems = document.querySelectorAll('.pill-menu li');
    const target = listItems[index];
    if (target && hoverBg.value) {
      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = target;
      hoverBg.value.style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;
      hoverBg.value.style.width = `${offsetWidth}px`;
      hoverBg.value.style.height = `${offsetHeight}px`;
      hoverBg.value.style.opacity = 1;
    }
  });
}

// =============================================
// MONTAGE / DEMONTAGE
// =============================================
onMounted(() => {
  userStore.checkLoginState();
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', checkIsMobile);
  document.addEventListener('click', handleClickOutside);
  checkIsMobile();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', checkIsMobile);
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* =============================================
   GLOBAL / UTILITAIRES
============================================= */
.avatar-icon {
  width: 60px;
  height: 60px;
  border-radius: 9999px;
  object-fit: cover;
}

/* =============================================
   TRANSITIONS (menu, dropdowns...)
============================================= */
.fade-menu-enter-active,
.fade-menu-leave-active,
.slide-dropdown-enter-active,
.slide-dropdown-leave-active,
.slide-menu-enter-active,
.slide-menu-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.fade-menu-enter-from,
.fade-menu-leave-to,
.slide-dropdown-enter-from,
.slide-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.slide-menu-enter-from,
.slide-menu-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Variante mobile : animation inverse */
@media (max-width: 768px),
(min-width: 769px) and (max-width: 1200px) {

  .slide-dropdown-enter-from,
  .slide-dropdown-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }
}

/* =============================================
   HEADER (structure principale)
============================================= */
.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-inner {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 10;
}

/* =============================================
   NAVIGATION PRINCIPALE (PC)
============================================= */
.nav-full {
  background: linear-gradient(to right, #c8ddebe0, #ffffffb0, #c8ddebe0);
  backdrop-filter: blur(5px);
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  border-bottom: 2px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.nav-menu {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-menu-item {
  font-family: var(--nav-item-font-family);
  font-weight: var(--nav-item-font-weight);
  font-size: 1.1rem;
  padding: 0 20px;
  display: flex;
  align-items: center;
}

.nav-menu-item:not(:last-child) {
  border-right: 3px solid #ccc;
}

.nav-menu-link,
.nav-menu a {
  color: #1a1a3a;
  font-weight: 600;
  text-decoration: none;
}

.nav-menu-link {
  display: block;
  position: relative;
  padding: 0.5rem 0;
  color: var(--color-text-dark);
  cursor: pointer;
}

.nav-menu a:hover,
.nav-menu-link:hover {
  color: var(--nav-color-hover);
  transition: background-color 0.5s, color 0.5s;
}

.nav-menu-link::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 3px;
  background-color: var(--nav-color-link);
  transform: translateX(-50%);
  transition: width 0.4s ease, transform 0.4s ease;
}

.nav-menu-link:hover::before {
  width: 100%;
}

/* =============================================
   NAVIGATION FLOTTANTE (PC)
============================================= */
.nav-float {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--nav-float);
  padding: 10px 20px;
  border-radius: 9999px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(3px);
  z-index: 1;
}

.pill-menu {
  display: flex;
  gap: 30px;
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
}

.pill-menu li {
  position: relative;
  padding: 6px 12px;
  border-radius: 9999px;
}

.pill-menu li a {
  font-weight: 500;
  color: white;
  text-decoration: none;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
  transition: color 0.3s ease;
  position: relative;
}

.pill-menu li a::before,
.pill-menu li a::after {
  content: attr(data-label);
  position: absolute;
  width: 100%;
  left: 0;
  text-align: center;
  pointer-events: none;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.pill-menu li a::after {
  top: -2px;
  color: #a0dcff;
  transform: translateY(100%);
  opacity: 0;
}

.pill-menu li:hover a::before {
  transform: translateY(-100%);
  opacity: 0;
}

.pill-menu li:hover a::after {
  transform: translateY(0);
  opacity: 1;
}

.pill-menu li:hover a {
  color: transparent;
}

.pill-menu li:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.hover-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  background-color: rgba(255, 255, 255, 0.199);
  border-radius: 9999px;
  pointer-events: none;
  opacity: 0;
  border: 2px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

/* =============================================
   BOUTON COMPTE + DROPDOWN (PC)
============================================= */
.account-section {
  position: absolute;
  right: 150px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
}

.account-button {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  color: var(--color-text-dark);
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  box-shadow: none;
  transition: color 0.3s ease;
}

.account-button:hover {
  color: var(--nav-color-hover);
  transform: scale(1.05);
}

.account-button i {
  font-size: 2.5rem;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 165px;
  background: #c8ddebe0;
  backdrop-filter: blur(5px);
  padding: 10px 20px;
  border-radius: 0 0 25px 25px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  border: solid 2px white;
  list-style: none;
  margin-top: -15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 1;
}

.dropdown-menu.show {
  transform: translateX(0);
  opacity: 1;
}

.dropdown-item {
  color: #1a1a3a;
  font-weight: 600;
  cursor: pointer;
  padding: 8px;
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
}

/* Classe de décalage visuel manuel */
.account-button-x {
  margin-right: 50px;
}

/* =============================================
   RESPONSIVE : MOBILE (<768px)
============================================= */
@media (max-width: 768px) {
  .nav-menu-link {
    display: none;
  }

  .nav-full {
    padding: 40px;
    background: linear-gradient(to right, #c8ddebe0, #ffffffb0, #c8ddebe0);
    backdrop-filter: blur(5px);
  }

  .nav-mobile {
    padding: 0 1rem;
    position: absolute;
    top: 98%;
    left: 0;
    z-index: -1;
    border: solid 2px white;
    border-radius: 0 0 25px 0;
    background: #c8ddebe0;
    backdrop-filter: blur(6px);
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
  }

  .mobile-menu {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .mobile-menu li {
    padding: 1rem 0;
  }

  .mobile-menu a {
    color: #1a1a3a;
    font-weight: 600;
    text-decoration: none;
  }

  .mobile-menu li:hover {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
  }

  .menu-toggle {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 102;
    outline: none;
    box-shadow: none;
  }

  .menu-toggle-bar {
    display: block;
    width: 30px;
    height: 5px;
    margin: 5px 0;
    border-radius: 10px;
    background-color: #266097;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    border: solid 0.1px white;
    transition: 0.4s ease;
  }

  .menu-toggle.active .top-bar {
    transform: translateY(8px) rotate(45deg);
  }

  .menu-toggle.active .middle-bar {
    opacity: 0;
  }

  .menu-toggle.active .bottom-bar {
    transform: translateY(-12px) rotate(-45deg);
  }

  .account-section,
  .dropdown-menu {
    right: 0;
  }

  .dropdown-menu {
    border-radius: 0 0 0 25px;
  }

  .dropdown-item {

    background-color: transparent;
  }
}

/* =============================================
   RESPONSIVE : TABLETTE (769px à 1200px)
============================================= */
@media (min-width: 768px) and (max-width: 1200px) {

  .account-section,
  .dropdown-menu,
  .dropdown-item {
    right: 0;
    border-radius: 0 0 0 25px;

  }

  .nav-full {
    justify-content: flex-start;
    padding-left: 3rem;
  }
}
</style>
