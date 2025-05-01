<template>
	<div v-if="isAllowed">
	  <AdminPanel />
	  <router-view />
	</div>
  </template>

  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  import AdminPanel from '@/components/adminPanel.vue'

  const router = useRouter()
  const isAllowed = ref(false)

  onMounted(async () => {
	try {
	  await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/checkAdmin`, {
		withCredentials: true,
	  })
	  isAllowed.value = true
	} catch (err) {
	  router.push('/admin-login')
	}
  })
  </script>
