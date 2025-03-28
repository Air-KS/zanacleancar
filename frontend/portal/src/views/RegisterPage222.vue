<!-- frontend/portal/src/views/RegisterPage.vue-->

<template>
	<div class="
				fixed inset-0 flex justify-center
				bg-gradient-to-b to-blue-100">

	  <div class="
	  			w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 px-4 py-12">

		<!-- Colonne gauche : Infos -->
		<div class="flex flex-col justify-center space-y-4">
		  <img src="@/assets/logo.png" alt="Logo" class="w-12 h-12" />
		  <h2 class="text-2xl font-bold text-gray-800">Pourquoi s'inscrire ?</h2>
		  <ul class="text-gray-600 space-y-2 list-disc list-inside">
			<li>Avoir un compte chez nous</li>
			<li>Obtenir des tampo de fidelité</li>
			<li>Avoir des point de loyauté</li>
			<li>C'est gratuit !</li>
		  </ul>
		  <img src="@/assets/logo.png" alt="Illustration" class="w-full max-w-sm mt-4" />
		</div>

		<!-- Colonne droite : Formulaire -->
		<div class="bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 relative">
		  <!-- Logo au centre (optionnel) -->
		  <div class="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-full shadow-md">
			<img src="@/assets/logo.png" alt="Logo" class="w-10 h-10" />
		  </div>

		  <h2 class="text-3xl font-extrabold text-center text-gray-800 mt-8 mb-6">
			Crée ton compte
		  </h2>

		  <form class="space-y-6" @submit.prevent="handleRegister">
			<!-- Nom -->
			<div class="relative">
			  <input
				v-model="name"
				type="text"
				id="name"
				required
				placeholder=" "
				class="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl text-gray-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
			  />
			  <label
				for="name"
				class="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
			  >
				Nom complet
			  </label>
			</div>

			<!-- Email -->
			<div class="relative">
			  <input
				v-model="email"
				type="email"
				id="email"
				required
				placeholder=" "
				class="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl text-gray-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
			  />
			  <label
				for="email"
				class="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
			  >
				Adresse e-mail
			  </label>
			</div>

			<!-- Password -->
			<div class="relative">
			  <input
				v-model="password"
				type="password"
				id="password"
				required
				placeholder=" "
				class="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl text-gray-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
			  />
			  <label
				for="password"
				class="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
			  >
				Mot de passe
			  </label>
			</div>

			<!-- Confirm Password -->
			<div class="relative">
			  <input
				v-model="confirmPassword"
				type="password"
				id="confirmPassword"
				required
				placeholder=" "
				class="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl text-gray-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
			  />
			  <label
				for="confirmPassword"
				class="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
			  >
				Confirmer mot de passe
			  </label>
			</div>

			<!-- Bouton -->
			<button
			  type="submit"
			  class="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-lg font-semibold rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
			>
			  S'inscrire
			</button>

			<p class="text-center text-sm text-gray-600">
			  Tu as déjà un compte ?
			  <router-link to="/login" class="text-indigo-600 hover:underline font-medium">
				Connecte-toi
			  </router-link>
			</p>
		  </form>
		</div>
	  </div>
	</div>
  </template>

  <script>
  export default {
	name: "RegisterPage",
	data() {
	  return {
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	  };
	},
	methods: {
	  handleRegister() {
		if (this.password !== this.confirmPassword) {
		  alert("Les mots de passe ne correspondent pas.");
		  return;
		}
		console.log("Registering:", this.name, this.email, this.password);
	  },
	},
  };
  </script>

  <style scoped></style>
