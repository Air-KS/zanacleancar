<template>
	<div class="before-after-container" @mousemove="drag && moveSlider($event)" @mousedown="drag = true"
		@mouseup="drag = false" @mouseleave="drag = false" @touchstart="drag = true"
		@touchmove="drag && moveSlider($event, true)" @touchend="drag = false">
		<img :src="after" class="img full" alt="Après" />
		<div class="overlay" :style="{ '--slider-x': sliderX + '%' }">
			<img :src="before" class="img full" alt="Avant" />
		</div>
		<div class="slider-bar" :style="{ left: sliderX + '%' }" @mousedown.prevent="drag = true">
			<div class="handle"></div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		before: { type: String, required: true },
		after: { type: String, required: true },
	},
	data() {
		return {
			sliderX: 50,
			drag: false,
		};
	},
	methods: {
		moveSlider(e, isTouch = false) {
			const rect = e.currentTarget.getBoundingClientRect();
			const clientX = isTouch ? e.touches[0].clientX : e.clientX;
			const x = ((clientX - rect.left) / rect.width) * 100;
			this.sliderX = Math.min(100, Math.max(0, x));
		},
	},
	mounted() {
		window.addEventListener('mouseup', () => this.drag = false);
		window.addEventListener('touchend', () => this.drag = false);
	},
};
</script>

<style>
.before-after-container {
	position: relative;
	width: 100%;
	max-width: 500px;
	aspect-ratio: 4 / 3;
	margin: auto;
	overflow: hidden;
	border-radius: 15px;
	user-select: none;
}

.img.full {
	width: 100%;
	height: 100%;
	object-fit: fill;
	display: block;
}

.overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	z-index: 2;
}

.overlay img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	clip-path: inset(0 calc(100% - var(--slider-x)) 0 0);
	transition: clip-path 0s;
}

.slider-bar {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 3px;
	background: white;
	z-index: 3;
	cursor: ew-resize;
	transform: translateX(-50%);
}

.handle {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 24px;
	height: 24px;
	background: #ff5252;
	border-radius: 50%;
	border: 2px solid white;
	z-index: 4;
}

.beforeAfter {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	/* espace entre les blocs */
	justify-content: center;
	/* centre le tout */
}

/* Responsive - plus petit écran */
@media (max-width: 600px) {
	.before-after-container {
		max-width: 100%;
		aspect-ratio: 4 / 4;
		/* carré par exemple */
	}
}
</style>
