<template>

	<p>hello,ooooooooo</p>
	<ul class="nav">
    	<li><a v-link="{ path: '/index' }">Home</a></li>
    	<li><a v-link="{ path: '/list' }">List</a></li>
    	<li><a v-link="{ path: '/about' }">About</a></li>
	</ul>
	
</template>

<script type="text/javascript">

	module.exports = {
		fuck: function() {
			console.log('fuck');
		}
	}

</script>