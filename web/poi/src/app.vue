<template>

	<header>
		<poi-header></poi-header>
		<ul class="nav">
        	<li><a v-link="{ path: '/index' }">Home</a></li>
        	<li><a v-link="{ path: '/list' }">List</a></li>
        	<li><a v-link="{ path: '/about' }">About</a></li>
    	</ul>
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

	console.log(header);


</script>

<style>
	
	p {
		font-size: 2em;
	}

</style>
