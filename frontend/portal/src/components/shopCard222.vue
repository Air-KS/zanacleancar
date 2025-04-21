<!-- ./components/ShopCard.vue -->
<template>
	<div class="shop-card">
	  <img :src="image" alt="Image article" class="card-image" />
	  <div class="card-content">
		<h3 class="card-title">{{ title }}</h3>
		<p class="card-description">{{ description }}</p>
		<div class="card-footer">
		  <span class="price">{{ price }} 💎</span>
		  <button class="claim-btn">Obtenir</button>
		</div>
	  </div>
	</div>
  </template>

  <script setup>
  defineProps({
	title: String,
	description: String,
	image: String,
	price: Number
  });
  </script>

  <style scoped>
  .shop-card {
	width: 250px;
	max-height: 400px;
	border: 1px solid #ccc;
	border-radius: 10px;
	overflow: hidden;
	box-shadow: 0 2px 10px rgba(0,0,0,0.1);
	transition: transform 0.2s ease;
	background: white;
  }
  .shop-card:hover {
	transform: translateY(-5px);
  }
  .card-image {
	width: 100%;
	height: 150px;
	object-fit: cover;
  }
  .card-content {
	padding: 1rem;
  }
  .card-title {
	font-weight: bold;
	font-size: 1.1rem;
  }
  .card-description {
	font-size: 0.9rem;
	color: #555;
  }
  .card-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 10px;
  }
  .price {
	font-weight: bold;
	color: #2d7f0b;
  }
  .claim-btn {
	background: #2d7f0b;
	color: white;
	padding: 0.3rem 0.6rem;
	border: none;
	border-radius: 5px;
	cursor: pointer;
  }
  </style>
