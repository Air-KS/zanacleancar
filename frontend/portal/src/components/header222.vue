<!--
	./frontend/portal/src/components/header.vue
-->


<template>
	<header class="header">
	  <transition name="fade-menu">
		<div class="header-inner" v-if="showFullMenu">
		  <nav class="nav-full" aria-label="Navigation principale">
			<ul class="nav-menu">
			  <li class="nav-menu-item" v-for="(item, index) in menuItems.filter(i => i.link !== '/login')" :key="index">
				<router-link class="nav-menu-link" :to="item.link">{{ item.label }}</router-link>
			  </li>
			</ul>
			<div class="account-section">
			  <router-link to="/login" class="account-button">
				<i class="fas fa-user-circle"></i>
				<span>Mon compte</span>
			  </router-link>
			</div>
		  </nav>
		</div>
	  </transition>

	  <transition name="fade-menu">
		<nav v-if="showFloatMenu" class="nav-float" aria-label="Navigation secondaire">
		  <ul class="pill-menu">
			<span class="hover-bg" ref="hoverBg"></span>
			<li v-for="(item, index) in menuItems" :key="index" @mouseenter="moveHover(index)">
			  <router-link :to="item.link" :data-label="item.label">{{ item.label }}</router-link>
			</li>
		  </ul>
		</nav>
	  </transition>

	  <!-- Menu Mobile -->
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

	  <!-- Bouton Hamburger animé -->
	  <button class="menu-toggle" :class="{ active: showMobileMenu }" @click="toggleMobileMenu" v-if="isMobile">
		<span class="menu-toggle-bar top-bar"></span>
		<span class="menu-toggle-bar middle-bar"></span>
		<span class="menu-toggle-bar bottom-bar"></span>
	  </button>
	</header>
  </template>

  <script>
  export default {
	name: "Header",
	data() {
	  return {
		menuItems: [
		  { label: "Accueil", link: "/" },
		  { label: "Services", link: "/register" },
		],
		showFullMenu: true,
		showFloatMenu: false,
		lastScrollY: 0,
		isMobile: false,
		showMobileMenu: false,
	  };
	},
	mounted() {
	  window.addEventListener("scroll", this.handleScroll);
	  window.addEventListener("resize", this.checkIsMobile);
	  document.addEventListener("click", this.handleClickOutside);
	  this.checkIsMobile();
	},
	unmounted() {
	  window.removeEventListener("scroll", this.handleScroll);
	  document.removeEventListener("click", this.handleClickOutside);
	},
	methods: {
	  handleScroll() {
		const currentY = window.scrollY;

		if (this.isMobile) {
		  // Sur mobile, on garde le menu visible tout le temps
		  this.showFullMenu = true;
		  this.showFloatMenu = false;
		  this.lastScrollY = currentY;
		  return;
		}


		const scrollingDown = currentY > this.lastScrollY;
		const scrollingUp = currentY < this.lastScrollY;

		// Cacher le menu complet dès qu’on scroll vers le bas
		this.showFullMenu = currentY <= 250;

		// Afficher le menu flottant uniquement si on remonte et qu’on a dépassé 250px
		this.showFloatMenu = scrollingUp && currentY > 250;

		this.lastScrollY = currentY;
	  },
	  moveHover(index) {
		this.$nextTick(() => {
		  const listItems = this.$el.querySelectorAll(".pill-menu li");
		  const hoverBg = this.$refs.hoverBg;
		  const target = listItems[index];

		  if (target && hoverBg) {
			const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = target;
			hoverBg.style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;
			hoverBg.style.width = `${offsetWidth}px`;
			hoverBg.style.height = `${offsetHeight}px`;
			hoverBg.style.opacity = 1;
		  }
		});
	  },
	  checkIsMobile() {
		this.isMobile = window.innerWidth <= 768;
	  },
	  toggleMobileMenu() {
		this.showMobileMenu = !this.showMobileMenu;
	  },
	  handleClickOutside(event) {
		if (
		  this.showMobileMenu &&
		  this.$refs.mobileMenu &&
		  !this.$refs.mobileMenu.contains(event.target) &&
		  !event.target.closest(".menu-toggle") // ← permet de ne pas fermer en cliquant sur le bouton
		) {
		  this.closeMobileMenu();
		}
	  },
	  closeMobileMenu() {
		this.showMobileMenu = false;
	  },
	}
  };
  </script>

  <style scoped>
  /* Header */

  /*
  .router-link-exact-active {
	  border-bottom: 2px solid #007bff;
  }
  */

  .fade-menu-enter-active,
  .fade-menu-leave-active {
	transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .fade-menu-enter-from,
  .fade-menu-leave-to {
	opacity: 0;
	transform: translateY(-10px);
  }

  /* ================================
		Header Container
		================================ */
  .header {
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 100;
	display: flex;
	flex-direction: column;
	align-items: center;
  }

  .header-inner {
	width: 100%;
	height: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
  }

  /* ================================
		Menu Full
		================================ */
  /* Menu principal */
  .nav-full {
	background: linear-gradient(to right, #c8ddebe0, #ffffffb0, #c8ddebe0);
	backdrop-filter: blur(5px);
	width: 100%;
	padding: 20px 0;
	display: flex;
	justify-content: center;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
	border-bottom: solid 2px white;
  }

  .nav-menu {
	display: flex;
	align-items: center;
	list-style: none;
	margin: 0;
	padding: 0;
  }

  .nav-menu a {
	color: #1a1a3a;
	font-weight: 600;
	text-decoration: none;
  }

  .nav-menu a:hover {
	color: var(--nav-color-hover);
	text-decoration: none;
	transition: background-color 0.5s, color 0.5s;
  }

  .nav-menu .nav-menu-item:not(:last-child) {
	border-right: 3px solid #ccc;
  }

  .nav-menu-item {
	font-family: var(--nav-item-font-family);
	font-weight: var(--nav-item-font-weight);
	font-size: 1.1rem;
	padding: 0 20px;
	display: flex;
	align-items: center;
  }

  /* Ajoute une barre horizontale au-dessus du lien avec un effet de transition */
  .nav-menu-link::before {
	content: "";
	position: absolute;
	bottom: 0;
	left: 50%;
	width: 0;
	height: 3px;
	background-color: var(--nav-color-link);
	transition: width 0.4s ease, transform 0.4s ease;
	transform: translateX(-50%);
  }

  .nav-menu-link {
	display: block;
	padding: 0.5rem 0;
	position: relative;
	color: var(--color-text-dark);
	text-decoration: none;
	cursor: pointer;
  }

  /* Animation lors du survol */
  .nav-menu-link:hover::before {
	width: 100%;
	transform: translateX(-50%) scaleX(1);
  }

  /* ================================
		Menu Float
		================================ */
  .nav-float {
	position: fixed;
	top: 20px;
	left: 50%;
	transform: translateX(-50%);
	background-color: var(--nav-float);
	padding: 10px 20px;
	border-radius: 9999px;
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
	backdrop-filter: blur(3px);
	z-index: 1;
	border: 2px solid rgba(255, 255, 255, 0.5);
  }

  .pill-menu {
	display: flex;
	list-style: none;
	gap: 30px;
	margin: 0;
	padding: 0;
	position: relative;
  }

  .pill-menu li {
	position: relative;
	padding: 6px 12px;
	border-radius: 9999px;
	z-index: 1;
  }

  .pill-menu li a {
	position: relative;
	font-weight: 500;
	text-decoration: none;
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
	color: rgb(255, 255, 255);
	transition: color 0.3s ease;

	line-height: 1.5rem;
	/* ← centrage vertical du texte */
  }

  .pill-menu li a::before,
  .pill-menu li a::after {
	content: attr(data-label);
	position: absolute;
	left: 0;
	width: 100%;
	text-align: center;
	transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
	pointer-events: none;
  }

  .pill-menu li a::after {
	top: -2px;
	color: #a0dcff;
	transform: translateY(100%);
	opacity: 0;
  }

  /* Hover effet saut vers le haut */
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

  /* Hover animé */
  .hover-bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 0;
	height: 0;
	background-color: rgba(255, 255, 255, 0.199);
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
	border: 2px solid rgba(255, 255, 255, 0.5);
	border-radius: 9999px;
	transition: all 0.3s ease;
	pointer-events: none;
	opacity: 0;
	z-index: 0;
  }

  /* ================================
		Section mon Compte
		================================ */
  .account-section {
	position: absolute;
	right: 2rem;
	top: 50%;
	transform: translateY(-50%);
  }

  .account-button {
	display: flex;
	align-items: center;
	gap: 0.4rem;
	font-weight: 600;
	color: var(--color-text-dark);
	text-decoration: none;
	transition: color 0.3s ease;
  }

  .account-button:hover {
	color: var(--nav-color-hover);
	transform: scale(1.05);
  }

  .account-button i {
	font-size: 1.3rem;
  }


  /* ================================
		Menu Humburger
		================================ */

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
	  width: 50%;
	  padding: 1rem;
	  position: absolute;
	  top: 98%;
	  left: 0;
	  z-index: -1;
	  border-right: solid 2px white;
	  border-top: solid 2px white;
	  border-bottom: solid 2px white;
	  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
	  border-radius: 0 0 999px 0;
	  backdrop-filter: blur(6px);
	  background: #c8ddebe0;
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

	.slide-menu-enter-active,
	.slide-menu-leave-active {
	  transition: transform 0.3s ease-out, opacity 0.3s ease;
	}

	.slide-menu-enter-from {
	  transform: translateX(-100%);
	  opacity: 0;
	}

	.slide-menu-leave-to {
	  transform: translateX(-100%);
	  opacity: 0;
	}

	.menu-toggle {
	  display: block;
	  position: absolute;
	  left: 1rem;
	  top: 50%;
	  transform: translateY(-50%);
	  z-index: 102;
	  background: none;
	  border: none;
	  cursor: pointer;
	  padding: 0;
	  box-shadow: none;
	  outline: none;
	}

	.menu-toggle-bar {
	  display: block;
	  width: 30px;
	  height: 5px;
	  margin: 5px 0;
	  border-radius: 10px;
	  background-color: #266097;
	  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	  transition: 0.4s ease;
	  border: solid 0.1px white;
	}

	/* Animations en mode actif */
	.menu-toggle.active .top-bar {
	  transform: translateY(8px) rotate(45deg);
	}

	.menu-toggle.active .middle-bar {
	  opacity: 0;
	}

	.menu-toggle.active .bottom-bar {
	  transform: translateY(-12px) rotate(-45deg);
	}
  }
  </style>
