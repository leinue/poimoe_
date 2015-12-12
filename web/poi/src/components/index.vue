<template>
    
    <div class="row" style="border-bottom: 1px solid rgb(220, 220, 220);">
        <div class="col-md-6 col-md-offset-3">
            <div class="search-area">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="请输入搜索内容">
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="button">搜索</button>
                    </span>
                </div>

                <div class="tag-list">
                    <span class="glyphicon glyphicon-tags" style="color: rgb(175, 175, 175);cursor:auto"> 标签：</span>
                    <span @click="show" class="label label-default">Default</span>
                    <span class="label label-primary">Primary</span>
                    <span class="label label-success">Success</span>
                    <span class="label label-info">Info</span>
                    <span class="label label-warning">Warning</span>
                    <span class="label label-danger">Danger</span>
                    <span class="label label-default">Default</span>
                    <span class="label label-primary">Primary</span>
                    <span class="label label-success">Success</span>
                    <span class="label label-info">Info</span> 
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        data() {
            return {
                msg: 'Hello World!!'
            }
        },

        components: {

        },

        methods: {
            show: function() {
                alert('sdfghj');
            }
        }
    };

</script>

<style>
    .nav {
        margin: 10px;
    }
    .nav li {
        display: inline-block;
        font-size: 25px;
    }
</style>
