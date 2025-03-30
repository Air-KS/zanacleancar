<template>
	<div ref="animatedBox" class="animated-box">
	  <h2>Zoom dynamique avec Scroll 👇</h2>
	  <p>Cet élément s'anime quand tu scroll vers lui… et inversement.</p>
	</div>
  </template>

  <script>
  import { onMounted, ref } from 'vue'
  import gsap from 'gsap'
  import ScrollTrigger from 'gsap/ScrollTrigger'

  gsap.registerPlugin(ScrollTrigger)

  export default {
	name: 'ZoomScrollComponent',
	setup() {
	  const animatedBox = ref(null)

	  onMounted(() => {
		gsap.fromTo(animatedBox.value,
		  { scale: 0.8, opacity: 0 },
		  {
			scale: 1,
			opacity: 1,
			duration: 0.3,
			ease: 'power2.out',
			scrollTrigger: {
			  trigger: animatedBox.value,
			  start: 'top 10%',
			  end: 'top 85%',
			  toggleActions: 'play reverse play reverse',
			  // play: onEnter
			  // reverse: onLeave
			}
		  }
		)
	  })

	  return { animatedBox }
	}
  }
  </script>

  <style scoped>
  .animated-box {
	margin: 100px auto;
	max-width: 600px;
	background-color: white;
	border-radius: 12px;
	padding: 2rem;
	text-align: center;
	transition: all 0.3s ease-in-out;
	box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
  </style>
