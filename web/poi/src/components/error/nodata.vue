<template>

	<div class="error-content">
		<h1>{{content}}</h1>
	</div>

</template>

<script>
	

	export default {

		created() {

		},

		props: {
			content: {
				type: String,
				default: 'Data Not Found'
			}
		}

	}

</script>

<style>

	.error-content {
		font-size: 56px;
		font-weight: 200!important;
		font-family: "Source Sans Pro", sans-serif;
		color: #525252;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.error-content h1{
		font-size: 56px;
		font-weight: 100;
	}
	
</style>