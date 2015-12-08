<template>

	<header>
		<poi-header></poi-header>
	</header>

	<div id="mymodal">
	
	<button class="btn btn-default btn-lg" @click="showModal = true">Show modal</button>
      <modal title="蛤蛤" :show.sync="showModal" effect="fade" :width="400">
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
		{{haha}}

		<button class="btn btn-success btn-lg" @click="showRight = true">Show Aside on right</button>

	      <sidebar :show.sync="showRight" placement="right" header="蛤蛤蛤蛤" :width="350">
	        <h4>的颠三倒四的</h4>
	          <pre><code class="language-javascript">
	if (talk === cheap){
	  code.style.display = 'block'
	}
	        </code></pre>
	        <div class="aside-footer">
	          <button type="button" class="btn btn-default" @click="showRight=false">关闭</button>
	        </div>
	      </sidebar>

	    <div class="page">
    	    <router-view></router-view>
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
				showModal: false,
				showRight: false
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
