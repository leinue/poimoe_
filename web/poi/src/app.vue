<template>

	<header>
		<poi-header></poi-header>
	</header>

	<div id="mymodal">
	
	</div>

	<section>
	    <div class="page">
    	    <router-view transition="expand"></router-view>
    	</div>
	</section>

	<footer>
	    <poi-footer></poi-footer>
	</footer>

</template>

<script>
	import poiHeader from './components/header.vue';
	import poiFooter from './components/footer.vue';

	export default {
		data() {
			return {
				haha: 'fuck',
				showModal: false
			}
		},
		components: {
			poiHeader,
			poiFooter
		},
		methods: {
			showRight: function() {

			}
		}
	};
</script>

<style>
	
	p {
		font-size: 2em;
	}

</style>
