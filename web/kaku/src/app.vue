<template>

<p>hello vue seeds</p>


	<ul class="nav">
        <li><a v-link="{ path: '/index' }">Home</a></li>
        <li><a v-link="{ path: '/list' }">List</a></li>
        <li><a v-link="{ path: '/about' }">About</a></li>
    </ul>
    <div class="page">
        <router-view></router-view>
    </div>
hello,poimoe kaku
</template>

<script>
	
	console.log('hello poimoe kaku');

</script>

<style>
	
	p {
		font-size: 2em;
	}

</style>
