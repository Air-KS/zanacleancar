<template>
	<div class="card">
	  <img :src="item.images[0]" alt="image" class="card-img" v-if="item.images?.length" />
	  <div class="card-body">
		<h3 class="title">{{ truncate(item.name, 75) }}</h3>
		<p class="desc">{{ truncate(item.description, 200) }}</p>
		<div class="footer">
		  <span class="price">{{ item.price }} <span class="diamond">💎</span></span>
		  <div class="actions">
			<button class="btn edit" @click="$emit('edit', item)">✏️</button>
			<button class="btn delete" @click="$emit('delete', item.id)">🗑</button>
		  </div>
		</div>
	  </div>
	</div>
  </template>

  <script setup>
  defineProps({ item: Object })
  defineEmits(['edit', 'delete'])

  const truncate = (text, max) => {
	if (!text) return ''
	return text.length > max ? text.substring(0, max) + '…' : text
  }
  </script>

  <style scoped>
  .card {
    display: block;
    margin: 0 auto;
	border: 1px solid #ddd;
	border-radius: 12px;
	overflow: hidden;
	background: white;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
	width: 300px;
	height: 400px;
	transition: transform 0.2s ease;
  }

  .card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.card-img {
  border-bottom: 1px solid #dbdbdb;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  height: 200px; /* fixe la hauteur */
  object-fit: fill; /* déforme pour remplir l’espace */
}

  .card-body {
	padding: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex-grow: 1;
	overflow: hidden;
  }

  .title {
  font-size: 1rem;
  color: #222;
  margin: 0px; /* encore moins d’espace */
  height: 45px;
  overflow: hidden;
}

.desc {
  font-size: 0.85rem;
  color: #666;
  height: 90px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

  .footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
  }

  .price {
	color: #3498db;
	font-weight: bold;
  }
  .diamond {
  position: relative;
  top: -2px;
}

  .actions {
	display: flex;
	gap: 6px;
  }

  .btn {
	border: none;
	padding: 6px 10px;
	border-radius: 6px;
	font-size: 0.85rem;
	cursor: pointer;
	color: white;
  }

  .edit {
	background: #f1c40f;
  transition: transform 0.2s ease;
  }

  .delete {
	background: #e74c3c;
  transition: transform 0.2s ease;
  }

  .edit:hover, .delete:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  filter: brightness(0.7);
}
  </style>
