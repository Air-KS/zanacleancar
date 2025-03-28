<!-- frontend/portal/src/views/RegisterPage.vue-->

<template>
	<div class="auth-container">
		<!-- Colonne gauche : Infos -->
		<div class="auth-info-col">
			<div class="separator"></div>
			<h2 class="auth-title">Pourquoi se Connecter ?</h2>
			<ul class="auth-info-list starred-list">
				<li> 🔐 Accéder à ton espace personnel </li>
				<li> 📊 Voir ton historique ou ta progression </li>
				<li> 💎 Utiliser tes points de fidélité </li>
				<li> ✨ Profiter de tes avantages exclusifs </li>
			</ul>
			<div class="separator"></div>
		</div>

		<!-- Colonne droite : Formulaire -->
		<div class="form-wrapper">
			<h2 class="form-title">⚡Connecte-toi</h2>

			<section>
				<form class="fade-in-up" @submit.prevent="handleRegister">

					<!-- Email -->
					<div class="forms-input-container">
						<input v-model="email" type="email" autocomplete="email" id="email" required
							placeholder="Veuillez entrer un mail valide" class="forms-input-style" />
						<label for="email" class="forms-input-label">Adresse E-mail</label>
					</div>

					<!-- Mot de passe -->
					<div class="forms-input-container">
						<input v-model="password" type="password" autocomplete="new-password" id="password" required
							placeholder=" " class="forms-input-style" />
						<label for="password" class="forms-input-label">Mot de passe</label>
					</div>

					<!-- Bouton Créer un Compte -->
					<button type="submit" class="forms-button">Se connecter</button>

					<p class="">
						T'as pas de Compte ?
					<router-link to="/" class="">
							Inscris-toi
						</router-link>
					</p>
				</form>
			</section>

		</div>
	</div>
</template>

<script>
export default {
	name: "RegisterPage",
	data() {
		return {
			name: '',
			email: '',
			password: '',
			confirmPassword: ''
		};
	},
	methods: {
		handleRegister() {
			if (this.password !== this.confirmPassword) {
				alert("Les mots de passe ne correspondent pas !");
				return;
			}
			// Envoi du formulaire ici
			console.log("Formulaire envoyé !");
		}
	}
};
</script>
