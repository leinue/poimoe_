<template>

	<p>{{msg}}</p>
	<ul class="nav">
    	<li><a v-link="{ path: '/index' }">Home</a></li>
    	<li><a v-link="{ path: '/list' }">List</a></li>
    	<li><a v-link="{ path: '/about' }">About</a></li>
	</ul>
	
</template>

<script type="text/javascript">

	export default {
		data() {
			return {
				msg: 'hello ftom header.vue'
			};
		}
	};

	// module.exports = {
	// 	data: function() {
	// 		return {
	// 			msg: 'hello'
	// 		}
	// 	}
	// }

</script>