<template>

	<header>
		<poi-header></poi-header>
		<alert type="danger">
		  <strong>Oh snap!</strong> Change a few things up and try submitting again.
		</alert>
		<alert type="danger" dismissable>
		  <strong>Oh snap!</strong> Change a few things up and try submitting again.
		</alert>
		<button class="btn btn-danger btn-lg">
		  Click to toggle alert on right
		</button>
	</header>

	<section>
	    <div class="page">
    	    <router-view></router-view>
    	</div>
	</section>

	<footer>
	    <poi-footer></poi-footer>
	</footer>

</template>

<script>
	var vue = require('vue');
	var util = require('./commons/scripts/commons.js');
	var header = require('./components/header.vue');
	var footer = require('./components/footer.vue');

	util.registerComponent({
		name: 'poi-header',
		template: header.template
	});

	util.registerComponent({
		name: 'poi-footer',
		template: footer.template
	});

	var alert = vueStrap.alert;
	vue.component('alert',alert);
	
</script>

<style>
	
	p {
		font-size: 2em;
	}

</style>
