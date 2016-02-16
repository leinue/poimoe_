<template>

	<div>
        <div class="row">
            <div class="col-md-6 col-md-offset-3" style="padding:10px;">
                <div class="search-area">
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="keywords" v-on:focus="loadThisSearchNav" v-on:blur="hideThisSearchNav" id="index-search-input" placeholder="请输入搜索内容">
                        <span class="input-group-btn">
                            <button class="btn btn-default" @click="toSearchPage()" type="button">搜索</button>
                        </span>
                    </div>

                    <div class="nav-search" v-bind:class="{'nav-search-display': displayNavSearch == true, 'nav-search-hide': displayNavSearch == false}" id="index-nav-search">
                        <ul>
                            <li @click="pipeToSearchInput(tag.names)" v-for="tag in hotTags">{{tag.names}}</li>
                        </ul>
                    </div>
                </div>
            </div>
       	</div>
    </div>

</template>

<script>

	import util from '../../commons/scripts/commons.js';

	export default {
		data() {

			return {
                displayNavSearch: false
			}

		},

		methods: {

			loadThisSearchNav: function() {
                util.resetNavSearchSize();
                this.displayNavSearch = true;
            },

            hideThisSearchNav: function() {
                this.displayNavSearch = false;
            },

            pipeToSearchInput: function(key) {
                this.keywords = key;
            },

            toSearchPage: function() {
                util.cancelActiveMenu();
                var key = this.keywords;
                var route = {
                    name: 'search-key',
                    params: {
                        keywords: key
                    }
                };
                router.replace(route);
                window.location.reload();
            }

		},

        props: {
            keywords: {
                type: String,
                default: ''
            },

            hotTags: {
                type: Array,
                default: []
            }
        },

		created() {

		}
	}

</script>

<style>



</style>