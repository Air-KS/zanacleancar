<!--
	./frontend/src/App.vue
-->

<template>
	<div id="app">
		<Header />
		<div class="app-wrapper">
			<router-view />
			<ContactFloating />
		</div>
		<Footer />
	</div>
</template>

<script>
import Header from "./components/header.vue"
import Footer from "./components/footer.vue"
import ContactFloating from './components/contactFloating.vue'



export default {
	name: "App",
	components: {
		Header,
		Footer,
		ContactFloating
	},

}
</script>
