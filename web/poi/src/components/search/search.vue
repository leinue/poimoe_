<template>

	<div>
        <div class="row" style="border-bottom: 1px solid rgb(220, 220, 220);background-color: #eee;">
            <div class="col-md-6 col-md-offset-3" style="padding:10px;">
                <div class="search-area">
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="keywords" v-on:focus="loadThisSearchNav" v-on:blur="hideThisSearchNav" id="index-search-input" placeholder="请输入搜索内容">
                        <span class="input-group-btn">
                            <button class="btn btn-default" @click="toSearchPage" type="button">搜索</button>
                        </span>
                    </div>

                    <div class="nav-search" v-bind:class="{'nav-search-display': displayNavSearch == true, 'nav-search-hide': displayNavSearch == false}" id="index-nav-search">
                        <ul>
                            <li @click="pipeToSearchInput(tag.names)" v-for="tag in hotTags">{{tag.names}}</li>
                        </ul>
                    </div>
<!-- 
                    <div class="tag-list">
                        <span class="glyphicon glyphicon-tags" style="color: rgb(175, 175, 175);cursor:auto"> 标签：</span>
                        <span @click="show" class="label label-default">谈笑风生</span>
                        <span class="label label-primary">蛤蛤</span>
                        <span class="label label-success">毕竟还图样</span>
                        <span class="label label-info">搞个大新闻</span>
                        <span class="label label-warning">华莱士</span>
                        <span class="label label-danger">excited</span>
                        <span class="label label-default">续命</span>
                        <span class="label label-primary">一颗赛艇</span>
                        <span class="label label-success">船能载舟</span>
                    </div> -->
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