<template>
    
    <div>
        <div class="row" style="border-bottom: 1px solid rgb(220, 220, 220);background-color: #eee;">
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

        <div class="row" style="border-bottom: 1px solid rgb(220, 220, 220)">
            <div class="col-xs-12" style="padding-left:0px;padding-right:0px">
                
                <div class="row">
                    <div class="col-xs-6 col-sm-3" style="border-right: 1px solid rgb(220, 220, 220);padding-left:0px;padding-right:0px;text-align:center">
                        <div class="profile">
                            <div class="profile-img"></div>
                            <div class="profile-photo"></div>
                            <div class="profile-detail">

                                <div class="col-xs-6 col-md-4 outer-column">
                                    <div class="column">
                                        <p>124</p>
                                        <span>关注</span>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-md-4 outer-column">
                                    <div class="column">
                                        <p>123</p>
                                        <span>粉丝</span>
                                    </div>                                    
                                </div>
                                <div class="clearfix visible-xs-block"></div>
                                <div class="col-xs-6 col-md-4 outer-column">
                                    <div class="column none">
                                        <p>1234</p>
                                        <span>投稿</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="recommend-user">
                            <div class="panel-header">
                                推荐用户
                            </div>
                            <div class="panel-section">
                                    
                                <div class="photo-group">
                                     <ul>
                                         <li></li>
                                         <li></li>
                                         <li></li>
                                         <li></li>
                                         <li></li>
                                     </ul>
                                     <ul>
                                         <li></li>
                                         <li></li>
                                         <li></li>
                                         <li></li>
                                         <li></li>
                                     </ul>
                                </div>

                            </div>
                            <div class="panel-footer">
                                查看更多
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-6 col-sm-9">
                        
                    </div>
                    <div class="clearfix visible-xs-block"></div>
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

    .profile-img {
        width: 100%;
        height: 75px;
        background-image: url(http://img.t.sinajs.cn/t5/skin/public/profile_cover/015_s.jpg?version=f26b055ccf71bd78);
    }

    .profile-photo {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-image: url(http://tp2.sinaimg.cn/2354504421/180/40057719478/0);
        background-size: 60px;
        cursor: pointer;
        margin: 0 auto;
        margin-top: -30px;
    }

    p {
        font-size: 1.4em!important;
        margin-bottom: 3px;
        line-height: .7;
    }

    .profile-detail {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .profile .outer-column {
        border-right: 1px solid rgb(220, 220, 220);
    }

    .profile .outer-column:last-child {
        border-right: none;
    }

    .profile .column {
        margin-bottom: 5px;
        cursor: pointer;
        text-align: center;
    }

    .profile .column:hover {
        color: rgb(0, 124, 246);
    }

    .profile .column span {
        color: rgb(170, 170, 170);
    }

    .recommend-user {
        border-top: 1px solid rgb(220, 220, 220);
        margin-top: 60px;
    }

    .panel-header{
        background: rgb(245, 245, 245);
        padding: 10px 15px;
        font-size: 14px;
        font-weight: 400;
        border-bottom: 1px solid rgb(220, 220, 220);
    }

    .panel-footer {
        font-size: 14px;
    }

    .panel-section {
        padding: 10px;
    }

    .media-body {
        text-align: left;
        padding-left: 10px;
    }

    .photo-group {
        display: table;
        margin: 0 auto;
    }

    .photo-group ul {
        list-style: none;
        margin-left: -40px;
        display: table-row;
        margin-bottom: 5px;
    }

    .photo-group ul li {
        /*float: left;*/
        display: table-cell;
        margin-right: 10px;
        cursor: pointer;
        border-radius:50%;
        width:60px;
        height:60px;
        background-image: url(http://tp2.sinaimg.cn/2354504421/180/40057719478/0);
        background-size:60px;
    }

</style>
