<template>
    <div id="app">
        <Banner/>
        <ChopOrder/>
    </div>
</template>

<script>
	import Banner from './components/Banner.vue'
	import ChopOrder from "./components/ChopOrder";
	export default {
		name: 'App',
		components: {
			ChopOrder,
			Banner
		}
	}
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
