<!--
	./frontend/portal/src/components/header.vue
-->


<template>
	<header class="header">
	  <div class="header-line"></div>

	  <div class="header-inner">
		<nav class="nav-links">
		  <ul class="menu-list">
			<li><router-link to="/">Home</router-link></li>
			<li><router-link to="/register">Connectez-vous</router-link></li>
		  </ul>
		</nav>
	  </div>

	  <div class="header-line"></div>
	</header>
  </template>

<script>
export default {
	name: "Header",
	mounted() {
		window.addEventListener("scroll", this.handleScroll);
	},
	unmounted() {
		window.removeEventListener("scroll", this.handleScroll);
	},
	methods: {
		handleScroll() {
			const header = document.querySelector(".header");
			if (window.scrollY > 20) {
				header.classList.add("scrolled");
			} else {
				header.classList.remove("scrolled");
			}
		}
	}
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 20px;
  width: 100%;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
}



/* Barre horizontale */
.header-line {
  height: 2px;
  width: 80%;
  margin: 0 auto;
  background: linear-gradient(to right,
      transparent 0%,
      #000000 20%,
      #000000 80%,
      transparent 100%);
  opacity: 0.9;
}

/* Conteneur du menu */
.header-inner {
  width: 80%;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* Le fond dégradé toujours présent mais invisible au départ */
.header-inner::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to right,
    transparent 0%,
    #ffffff 20%,
    #ffffff 80%,
    transparent 100%);
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
  z-index: 0;
  pointer-events: none;
  border-radius: 10px;
}

/* Quand on scroll, on rend le fond visible en fondu */
.header.scrolled .header-inner::before {
  opacity: 1;
}

/* Menu */
.menu-list {
  position: relative;
  z-index: 1;
  list-style: none;
  display: flex;
  gap: 30px;
  padding: 0;
  margin: 0;
}

.menu-list li a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 1rem;
}

.menu-list li a:hover {
  color: #007bff;
}
</style>
