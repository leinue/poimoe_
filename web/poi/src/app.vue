<template>

	<header>
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
	    <p>footer</p>		
	</footer>

</template>

<script>
	
	console.log('hello poimoe kaku');

</script>

<style>
	
	p {
		font-size: 2em;
	}

</style>
