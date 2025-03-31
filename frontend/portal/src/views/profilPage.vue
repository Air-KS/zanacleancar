<template>
	<div class="page-container">
	  <div class="auth-container">

		<!-- Colonne gauche : Infos de confiance -->
		<div class="auth-info-col">
		  <h2 class="auth-title">Confidentialité des informations !</h2>
		  <p>
			Les données personnelles renseignées ici sont uniquement visibles par vous et les administrateurs du site.
			Elles ne seront jamais partagées, ni utilisées à des fins commerciales.<br /><br />
			Toutes les informations sont stockées de manière sécurisée et restent strictement à but informatif.
			Votre vie privée est notre priorité. 🤝
		  </p>
		</div>

		<!-- Formulaire de profil -->
		<div class="form-wrapper">
		  <h2 class="form-title">Ton Profil</h2>

		  <section>
			<form class="fade-in-up" @submit.prevent="handleSave">

			  <!-- Nom -->
			  <div class="forms-input-container">
				<input v-model="name" type="text" autocomplete="family-name" id="name" required
				  placeholder="Ton nom de famille" class="forms-input-style" />
				<label for="name" class="forms-input-label">Nom</label>
			  </div>

			  <!-- Prénom -->
			  <div class="forms-input-container">
				<input v-model="firstname" type="text" autocomplete="given-name" id="firstname" required
				  placeholder="Ton prénom" class="forms-input-style" />
				<label for="firstname" class="forms-input-label">Prénom</label>
			  </div>

			  <!-- E-mail -->
			  <div class="forms-input-container">
				<input v-model="email" type="email" autocomplete="email" id="email" required
				  placeholder="Ton adresse e-mail" class="forms-input-style" disabled />
				<label for="email" class="forms-input-label">E-mail</label>
			  </div>

			  <!-- Téléphone -->
			  <div class="forms-input-container">
				<input v-model="phone" type="tel" autocomplete="tel" id="phone"
				  placeholder="Ton numéro de téléphone" class="forms-input-style" />
				<label for="phone" class="forms-input-label">Téléphone</label>
			  </div>

			  <!-- Date de naissance -->
			  <div class="forms-input-container">
				<input v-model="birthdate" type="date" id="birthdate" class="forms-input-style" />
				<label for="birthdate" class="forms-input-label">Date de naissance</label>
			  </div>

			  <!-- Bouton -->
			  <button type="submit" class="forms-button">Enregistrer</button>

			</form>
		  </section>
		</div>
	  </div>
	</div>
  </template>

  <script>
  export default {
	name: "Profil",
	data() {
	  return {
		name: '',
		firstname: '',
		email: '',
		phone: '',
		birthdate: '',
	  };
	},
	methods: {
	  handleSave() {
		console.log("Données enregistrées :", {
		  name: this.name,
		  firstname: this.firstname,
		  email: this.email,
		  phone: this.phone,
		  birthdate: this.birthdate,
		});
		alert("Données enregistrées (fictivement) !");
	  }
	}
  };
  </script>

  <style scoped>
  .page-container {
	background: transparent !important;
	box-shadow: none;
	width: 100%;
  }

  .auth-info-col {
	margin: 0 !important;
  }
  </style>
