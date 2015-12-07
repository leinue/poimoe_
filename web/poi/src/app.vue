<template>

	<header>
		<poi-header></poi-header>
	</header>

	<div id="mymodal">
	
	<button class="btn btn-default btn-lg" @click="showModal = true">Show modal</button>
      <modal title="Modal title" :show.sync="showModal" effect="fade" :width="400">
        <div class="modal-header">
          <h4 class="modal-title">Modal <b>Title</b></h4>
        </div>
        <div class="modal-body">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </modal>

	</div>

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

	module.exports = {

		created: function(b) {

			if(b === 'q') {


				var a = new vue({
					el: '#mymodal',
					data: {
						showModal: false
					}
				});

				console.log('=========');
				console.log(document.getElementById('mymodal'));
				console.log('=========');

				console.log(a.showModal);

			}

		},

		data: function() {
			return {

			}
		}

	};

</script>

<style>
	
	p {
		font-size: 2em;
	}

</style>
