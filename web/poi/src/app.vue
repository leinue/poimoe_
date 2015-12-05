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
		<dropdown>
  <button type="button" class="btn btn-default" data-toggle="dropdown">
    Action
    <span class="caret"></span>
  </button>
  <ul class="dropdown-menu">
    <li><a href="#">Action</a></li>
    <li><a href="#">Another action</a></li>
    <li><a href="#">Something else here</a></li>
    <li role="separator" class="divider"></li>
    <li><a href="#">Separated link</a></li>
  </ul>




</dropdown>

<v-select>
  <v-option value="Apple"></v-option>
  <v-option value="Banana"></v-option>
  <v-option value="Cherry"></v-option>
  <v-option value="Orange"></v-option>
  <v-option value="Grape"></v-option>
</v-select>

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
	
</script>

<style>
	
	p {
		font-size: 2em;
	}

</style>
