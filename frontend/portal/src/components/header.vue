<!--
	./frontend/portal/src/components/header.vue
-->

<template>
	<header class="header">
		<div class="container">

		<nav class="nav-links">
		<ul class="nav-menu">
			<li class="nav-menu-item">
				<router-link to="/" class="nav-menu-link">
					Home
				</router-link>
				</li>
				<li class="nav-menu-item">
				<route-link to="/register" class="nav-menu-link">
					Lien 2
				</route-link>
			</li>
			<li class="nav-menu-item">
				<route-link to="/register" class="nav-menu-link">
					Lien 3
				</route-link>
			</li>
			<li class="nav-menu-item">
				<router-link to="/register" class="nav-menu-link">
					Connectez-vous
				</router-link>
			</li>
		</ul>
		</nav>
	</div>

	</header>
</template>

<script>

</script>

<style scoped>
.header {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	background-color: #ffffff;
	border-bottom: 1px solid #ccc;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	padding: 0;
	z-index: 5;
}

/* Container principal */
.container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	max-width: 1200px;
	height: 70px;
	margin: 0 auto;
	padding: 0 20px;
	position: relative;
}

/* Menu de navigation */
.nav-menu {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-menu .nav-menu-item:not(:last-child) {
  border-right: 3px solid #ccc;
  /* Séparateur entre les éléments */
}

.nav-menu-item {
  font-family: var(--nav-item-font-family);
  font-weight: var(--nav-item-font-weight);
  font-size: 1.1rem;
  padding: 0 20px;
  display: flex;
  align-items: center;
}

.nav-menu-link {
  display: block;
  padding: 0.5rem 0;
  position: relative;
  color: var(--color-text-dark);
  text-decoration: none;
  cursor: pointer;
}

.nav-menu-link:hover {
  color: var(--nav-color-hover);
  text-decoration: none;
  transition: background-color 0.5s, color 0.5s;
}

/* Ajoute une barre horizontale au-dessus du lien avec un effet de transition */
.nav-menu-link::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  /* Commence au centre */
  width: 0;
  height: 3px;
  background-color: var(--nav-color-link);
  /* La couleur de la barre */
  transition: width 0.4s ease, transform 0.4s ease;
  /* Transition pour l'animation */
  transform: translateX(-50%);
  /* Centrer la barre par rapport au lien */
}

/* Animation lors du survol */
.nav-menu-link:hover::before {
  width: 100%;
  /* S'étend à 100% de la largeur du lien */
  transform: translateX(-50%) scaleX(1);
  /* Barre centrée et étendue symétriquement */
}

/* Réinitialisation du transform au départ */
.nav-menu-link::before {
  transform: translateX(-50%) scaleX(0);
  /* La barre est cachée initialement, avec une échelle de 0 */
}

</style>
