<!--
	./frontend/dashbord/src/views/adminReward
-->

<template>
	<div class="admin-rewards">
		<form @submit.prevent="handleCreate" class="form">
			<h2>{{ editingId ? '✏️ Modifier la récompense' : '➕ Ajouter une récompense' }}</h2>
			<input v-model="name" placeholder="Nom du produit" maxlength="65"/>
			<textarea v-model="description" placeholder="Description" maxlength="200" />
			<input v-model.number="price" type="number" placeholder="Prix en 💎" />
			<input v-model.number="stock" type="number" placeholder="Stock disponible" />
			<input v-model="imagesInput" placeholder="URLs des images séparées par des virgules" />
			<div class="form-actions">
				<button type="submit">{{ editingId ? '💾 Enregistrer' : 'Créer' }}</button>
				<button v-if="editingId" type="button" @click="cancelEdit">❌ Annuler</button>
			</div>
		</form>

		<hr />

		<h2>📦 Récompenses existantes</h2>
		<div v-if="rewards.length === 0">Aucune récompense pour le moment.</div>
		<div v-else class="reward-grid">
			<RewardCard v-for="item in rewards" :key="item.id" :item="item" @edit="editReward" @delete="deleteReward" />
		</div>
	</div>
</template>

<script setup>
import RewardCard from '@/components/shopCard.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const name = ref('')
const description = ref('')
const price = ref(0)
const stock = ref(0)
const imagesInput = ref('')
const rewards = ref([])
const editingId = ref(null)

const fetchRewards = async () => {
	try {
		const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/reward`, {
			withCredentials: true
		})
		rewards.value = data
	} catch (err) {
		console.error('❌ Erreur récupération récompenses :', err)
	}
}

const handleCreate = async () => {
	try {
		const images = imagesInput.value.split(',').map(img => img.trim()).filter(Boolean)

		const payload = {
			name: name.value,
			description: description.value,
			price: price.value,
			stock: stock.value,
			images
		}

		if (editingId.value) {
			await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/reward/${editingId.value}`, payload, {
				withCredentials: true
			})
			alert('✅ Récompense modifiée avec succès !')
		} else {
			await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/reward`, payload, {
				withCredentials: true
			})
			alert('🎉 Récompense créée avec succès !')
		}

		resetForm()
		await fetchRewards()
	} catch (err) {
		console.error('❌ Erreur lors de la sauvegarde :', err)
		alert('Erreur lors de la sauvegarde.')
	}
}

const editReward = (item) => {
	name.value = item.name
	description.value = item.description
	price.value = item.price
	stock.value = item.stock
	imagesInput.value = item.images.join(', ')
	editingId.value = item.id
}

const deleteReward = async (id) => {
	if (!confirm('⚠️ Tu es sûr de vouloir supprimer cette récompense ?')) return
	try {
		await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/reward/${id}`, {
			withCredentials: true
		})
		await fetchRewards()
	} catch (err) {
		console.error('❌ Erreur suppression :', err)
		alert('Erreur lors de la suppression.')
	}
}

const cancelEdit = () => {
	resetForm()
}

const resetForm = () => {
	name.value = ''
	description.value = ''
	price.value = 0
	stock.value = 0
	imagesInput.value = ''
	editingId.value = null
}

onMounted(fetchRewards)
</script>

<style scoped>
.admin-rewards {
	max-width: 80%;
	margin: 0 auto;
	padding: 30px;
}

.form {
	width: 50%;
	margin: auto;
	display: flex;
	flex-direction: column;
	gap: 10px;
}

input,
textarea {
	padding: 10px;
	font-size: 1rem;
	resize: none;
}
textarea {
	height: 60px;
}

.form-actions {
	display: flex;
	gap: 10px;
}

button {
	padding: 10px;
	background: #3498db;
	color: white;
	border: none;
	border-radius: 6px;
	cursor: pointer;
}

button:hover {
	background: #2980b9;
}

.reward-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 20px;
	margin-top: 20px;
}
</style>
