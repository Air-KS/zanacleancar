<template>
	<div class="login-admin">
		<h1>Connexion Admin</h1>
		<input v-model="email" type="email" placeholder="Email" class="input" />
		<input v-model="password" type="password" placeholder="Mot de passe" class="input" />
		<button @click="login" class="btn">Se connecter</button>
		<p v-if="error" class="error">{{ error }}</p>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = async () => {
	try {
		const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/admin/login`, {
			email: email.value,
			password: password.value
		}, { withCredentials: true })

		// stocker le token si on en reçois un
		// localStorage.setItem('admin_token', data.token)

		router.push('/dashboard')
	} catch (err) {
		error.value = err.response?.data?.message || 'Erreur lors de la connexion'
	}
}
</script>

<style scoped>
.login-admin {
	max-width: 400px;
	margin: auto;
	padding: 30px;
	border: 1px solid #ccc;
	border-radius: 12px;
	background: #f9f9f9;
	text-align: center;
}

.input {
	display: block;
	width: 100%;
	padding: 10px;
	margin-bottom: 15px;
	font-size: 1rem;
	border-radius: 6px;
	border: 1px solid #ccc;
}

.btn {
	padding: 10px 20px;
	font-size: 1rem;
	background: #222;
	color: white;
	border: none;
	border-radius: 6px;
	cursor: pointer;
}

.error {
	color: red;
	margin-top: 10px;
}
</style>
