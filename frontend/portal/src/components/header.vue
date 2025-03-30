<!--
	./frontend/portal/src/components/header.vue
-->


<template>
	<header class="header">
	  <transition name="fade-menu">
		<div class="header-inner" v-if="showFullMenu">
		  <nav class="nav-full" aria-label="Navigation principale">
			<ul class="full-menu">
			  <li v-for="(item, index) in menuItems" :key="index">
				<router-link :to="item.link">{{ item.label }}</router-link>
			  </li>
			</ul>
		  </nav>
		</div>
	  </transition>

	  <transition name="fade-menu">
		<nav v-if="showFloatMenu" class="nav-float" aria-label="Navigation secondaire">
		  <ul class="pill-menu">
			<span class="hover-bg" ref="hoverBg"></span>
			<li v-for="(item, index) in menuItems" :key="index" @mouseenter="moveHover(index)">
			  <router-link :to="item.link">{{ item.label }}</router-link>
			</li>
		  </ul>
		</nav>
	  </transition>
	</header>
  </template>

<script>
export default {
	name: "Header",
	data() {
		return {
			menuItems: [
				{ label: "Home", link: "/" },
				{ label: "Connectez-vous", link: "/register" },
			],
			showFullMenu: true,
			showFloatMenu: false,
			lastScrollY: 0,
		};
	},
	mounted() {
		window.addEventListener("scroll", this.handleScroll);
	},
	unmounted() {
		window.removeEventListener("scroll", this.handleScroll);
	},
	methods: {
		handleScroll() {
  const currentY = window.scrollY;

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
	/* au lieu de 80% */
	height: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
}

/* Menu principal */
.nav-full {
	background: #f2f2f2;
	width: 100%;
	padding: 20px 0;
	display: flex;
	justify-content: center;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
	border-bottom: solid 2px white ;
}

.full-menu {
	list-style: none;
	display: flex;
	gap: 40px;
	padding: 0;
	margin: 0;
}

.full-menu li a {
	color: #1a1a3a;
	font-weight: 600;
	text-decoration: none;
}

/* Menu flottant */
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
	font-weight: 500;
	text-decoration: none;
	text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
	color: white;
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
	background-color: rgba(255, 255, 255, 0.1);
	border-radius: 9999px;
	transition: all 0.3s ease;
	pointer-events: none;
	opacity: 0;
	z-index: 0;
}
</style>
