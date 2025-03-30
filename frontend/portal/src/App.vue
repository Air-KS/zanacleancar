<!--
	./frontend/src/App.vue
-->

<template>
	<div id="app">
		<Header />
		<div class="app-wrapper">
			<router-view />
		</div>
		<Footer />
	</div>
</template>

<script>
import Header from "./components/header.vue"
import Footer from "./components/footer.vue"



export default {
	name: "App",
	components: {
		Header,
		Footer
	},

}
</script>
