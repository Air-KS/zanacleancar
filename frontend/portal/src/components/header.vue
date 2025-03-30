<!--
	./frontend/portal/src/components/header.vue
-->


<template>
	<header class="header">
		<transition name="fade-menu">
			<div class="header-inner" v-if="showFullMenu">
				<nav class="nav-full" aria-label="Navigation principale">
					<ul class="nav-menu">
						<li class="nav-menu-item" v-for="(item, index) in menuItems.filter(i => i.link !== '/login')"
							:key="index">
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
		};
	},
	mounted() {
		window.addEventListener("scroll", this.handleScroll);
		window.addEventListener("resize", this.checkIsMobile);
		this.checkIsMobile();
	},
	unmounted() {
		window.removeEventListener("scroll", this.handleScroll);
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
	background: #f2f2f2;
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
.hamburger {
	position: absolute;
	left: 1rem;
	top: 50%;
	transform: translateY(-50%);
	background: none;
	border: none;
	font-size: 1.8rem;
	color: var(--color-text-dark);
	cursor: pointer;
	display: none;
	/* par défaut caché */
	z-index: 101;
}

@media (max-width: 768px) {
	.hamburger {
		display: block;
	}

	.nav-menu-link {
		display: none;
	}

	.nav-full {
		padding: 40px;
	}
}
</style>
