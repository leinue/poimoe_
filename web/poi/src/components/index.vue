<template>
    
    <div>
        <div class="row" style="border-bottom: 1px solid rgb(220, 220, 220);background-color: #eee;">
            <div class="col-md-6 col-md-offset-3" style="padding:10px;">
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
                    <div class="col-md-3 col-sm-3" style="padding-left:0px;padding-right:0px;text-align:center">
                        <div class="profile">
                            <div class="panel-header" style="border-right:1px solid rgb(220, 220, 220)">
                                我的信息
                            </div>
                            <div class="profile-img"></div>
                            <div class="profile-photo"></div>
                            <div class="profile-detail">

                                <div class=" col-md-4 outer-column">
                                    <div class="column">
                                        <p>124</p>
                                        <span>关注</span>
                                    </div>
                                </div>
                                <div class=" col-md-4 outer-column">
                                    <div class="column">
                                        <p>123</p>
                                        <span>粉丝</span>
                                    </div>                                    
                                </div>
                                <div class="clearfix visible-xs-block"></div>
                                <div class=" col-md-4 outer-column">
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
                        </div>
                        <div class="recommend-user" style="margin-top:0px">
                            <div class="panel-header">
                                今日插画推荐
                            </div>
                            <div class="panel-section">

                                <div class="cg-group">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div v-on:mouseenter="showCover" v-on:mouseleave="hideCover" class="cg-img" style="background-image:url('http://i2.hdslb.com/u_user/c143946c2acf6e34e836bd9e24871ad7.jpg')">
                                                <div v-show="cgReco.showCover" transition="cgrecocover" class="cg-img-cover">
                                                    <div class="span">1</div>
                                                    <h4>蛤蛤</h4>
                                                    <p>xieyang</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div v-on:mouseenter="showCover" v-on:mouseleave="hideCover" class="cg-img" style="background-image:url('http://i2.hdslb.com/u_user/c143946c2acf6e34e836bd9e24871ad7.jpg')">
                                                <div v-show="cgReco.showCover" transition="cgrecocover" class="cg-img-cover">
                                                    <div class="span">2</div>
                                                    <h4>蛤蛤</h4>
                                                    <p>xieyang</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div v-on:mouseenter="showCover" v-on:mouseleave="hideCover" class="cg-img" style="background-image:url('http://i2.hdslb.com/u_user/c143946c2acf6e34e836bd9e24871ad7.jpg')">
                                                <div v-show="cgReco.showCover" transition="cgrecocover" class="cg-img-cover">
                                                    <div class="span">3</div>
                                                    <h4>蛤蛤</h4>
                                                    <p>xieyang</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div v-on:mouseenter="showCover" v-on:mouseleave="hideCover" class="cg-img" style="background-image:url('http://i2.hdslb.com/u_user/c143946c2acf6e34e836bd9e24871ad7.jpg')">
                                                <div v-show="cgReco.showCover" transition="cgrecocover" class="cg-img-cover">
                                                    <div class="span">4</div>
                                                    <h4>蛤蛤</h4>
                                                    <p>xieyang</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div v-on:mouseenter="showCover" v-on:mouseleave="hideCover" class="cg-img" style="background-image:url('http://i2.hdslb.com/u_user/c143946c2acf6e34e836bd9e24871ad7.jpg')">
                                                <div v-show="cgReco.showCover" transition="cgrecocover" class="cg-img-cover">
                                                    <div class="span">5</div>
                                                    <h4>蛤蛤</h4>
                                                    <p>xieyang</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div v-on:mouseenter="showCover" v-on:mouseleave="hideCover" class="cg-img" style="background-image:url('http://i2.hdslb.com/u_user/c143946c2acf6e34e836bd9e24871ad7.jpg')">
                                                <div v-show="cgReco.showCover" transition="cgrecocover" class="cg-img-cover">
                                                    <div class="span">6</div>
                                                    <h4>蛤蛤</h4>
                                                    <p>xieyang</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div v-on:mouseenter="showCover" v-on:mouseleave="hideCover" class="cg-img" style="background-image:url('http://i2.hdslb.com/u_user/c143946c2acf6e34e836bd9e24871ad7.jpg')">
                                                <div v-show="cgReco.showCover" transition="cgrecocover" class="cg-img-cover">
                                                    <div class="span">7</div>
                                                    <h4>蛤蛤</h4>
                                                    <p>xieyang</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div v-on:mouseenter="showCover" v-on:mouseleave="hideCover" class="cg-img" style="background-image:url('http://i2.hdslb.com/u_user/c143946c2acf6e34e836bd9e24871ad7.jpg')">
                                                <div v-show="cgReco.showCover" transition="cgrecocover" class="cg-img-cover">
                                                    <div class="span">8</div>
                                                    <h4>蛤蛤</h4>
                                                    <p>xieyang</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div v-on:mouseenter="showCover" v-on:mouseleave="hideCover" class="cg-img" style="background-image:url('http://i2.hdslb.com/u_user/c143946c2acf6e34e836bd9e24871ad7.jpg')">
                                                <div v-show="cgReco.showCover" transition="cgrecocover" class="cg-img-cover">
                                                    <div class="span">9</div>
                                                    <h4>蛤蛤</h4>
                                                    <p>xieyang</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div v-on:mouseenter="showCover" v-on:mouseleave="hideCover" class="cg-img" style="background-image:url('http://i2.hdslb.com/u_user/c143946c2acf6e34e836bd9e24871ad7.jpg')">
                                                <div v-show="cgReco.showCover" transition="cgrecocover" class="cg-img-cover">
                                                    <div class="span">10</div>
                                                    <h4>蛤蛤</h4>
                                                    <p>xieyang</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="col-md-9 col-sm-9" style="padding-left:0px;padding-right:0px;">

                        <div class="newest-cg">
                            <div class="panel-header">
                                最新作品
                            </div>
                        </div>

                        <div class="img-box">
                            <div v-on:mouseenter="showIndexCover" v-on:mouseleave="hideIndexCover" class="img-item img-item2">
                                
                                <div v-show="cgIndex.showCover" transition="cgrecocover" class="cg-img-cover index">
                                    <h4>蛤蛤</h4>
                                    <p>xieyang</p>
                                </div>

                            </div>
                            <div v-on:mouseenter="showIndexCover" v-on:mouseleave="hideIndexCover" class="img-item item3">
                                
                                <div v-show="cgIndex.showCover" transition="cgrecocover" class="cg-img-cover index">
                                    <h4>蛤蛤</h4>
                                    <p>xieyang</p>
                                </div>

                            </div>
                            <div v-on:mouseenter="showIndexCover" v-on:mouseleave="hideIndexCover" class="img-item img-img-item2">
                                <div v-show="cgIndex.showCover" transition="cgrecocover" class="cg-img-cover index">
                                    <h4>蛤蛤</h4>
                                    <p>xieyang</p>
                                </div>
                            </div>
                            <div v-on:mouseenter="showIndexCover" v-on:mouseleave="hideIndexCover" class="img-item">
                                <div v-show="cgIndex.showCover" transition="cgrecocover" class="cg-img-cover index">
                                    <h4>蛤蛤</h4>
                                    <p>xieyang</p>
                                </div>
                            </div>
                            <div v-on:mouseenter="showIndexCover" v-on:mouseleave="hideIndexCover" class="img-item img-item2">
                                <div v-show="cgIndex.showCover" transition="cgrecocover" class="cg-img-cover index">
                                    <h4>蛤蛤</h4>
                                    <p>xieyang</p>
                                </div>
                            </div>
                        </div>

                        <div class="img-box">
                            <div v-on:mouseenter="showIndexCover" v-on:mouseleave="hideIndexCover" class="img-item">
                                <div v-show="cgIndex.showCover" transition="cgrecocover" class="cg-img-cover index">
                                    <h4>蛤蛤</h4>
                                    <p>xieyang</p>
                                </div>
                            </div>
                            <div v-on:mouseenter="showIndexCover" v-on:mouseleave="hideIndexCover" class="img-item img-item2">
                                <div v-show="cgIndex.showCover" transition="cgrecocover" class="cg-img-cover index">
                                    <h4>蛤蛤</h4>
                                    <p>xieyang</p>
                                </div>
                            </div>
                            <div v-on:mouseenter="showIndexCover" v-on:mouseleave="hideIndexCover" class="img-item">
                                <div v-show="cgIndex.showCover" transition="cgrecocover" class="cg-img-cover index">
                                    <h4>蛤蛤</h4>
                                    <p>xieyang</p>
                                </div>
                            </div>
                            <div v-on:mouseenter="showIndexCover" v-on:mouseleave="hideIndexCover" class="img-item">
                                <div v-show="cgIndex.showCover" transition="cgrecocover" class="cg-img-cover index">
                                    <h4>蛤蛤</h4>
                                    <p>xieyang</p>
                                </div>
                            </div>
                            <div v-on:mouseenter="showIndexCover" v-on:mouseleave="hideIndexCover" class="img-item item3">
                                <div v-show="cgIndex.showCover" transition="cgrecocover" class="cg-img-cover index">
                                    <h4>蛤蛤</h4>
                                    <p>xieyang</p>
                                </div>
                            </div>
                        </div>

                        <div class="img-box">
                            <div v-on:mouseenter="showIndexCover" v-on:mouseleave="hideIndexCover" class="img-item">
                                <div v-show="cgIndex.showCover" transition="cgrecocover" class="cg-img-cover index">
                                    <h4>蛤蛤</h4>
                                    <p>xieyang</p>
                                </div>
                            </div>
                            <div v-on:mouseenter="showIndexCover" v-on:mouseleave="hideIndexCover" class="img-item">
                                <div v-show="cgIndex.showCover" transition="cgrecocover" class="cg-img-cover index">
                                    <h4>蛤蛤</h4>
                                    <p>xieyang</p>
                                </div>
                            </div>
                            <div v-on:mouseenter="showIndexCover" v-on:mouseleave="hideIndexCover" class="img-item img-item2">
                                <div v-show="cgIndex.showCover" transition="cgrecocover" class="cg-img-cover index">
                                    <h4>蛤蛤</h4>
                                    <p>xieyang</p>
                                </div>
                            </div>
                            <div v-on:mouseenter="showIndexCover" v-on:mouseleave="hideIndexCover" class="img-item">
                                <div v-show="cgIndex.showCover" transition="cgrecocover" class="cg-img-cover index">
                                    <h4>蛤蛤</h4>
                                    <p>xieyang</p>
                                </div>
                            </div>
                            <div v-on:mouseenter="showIndexCover" v-on:mouseleave="hideIndexCover" class="img-item item3">
                                <div v-show="cgIndex.showCover" transition="cgrecocover" class="cg-img-cover index">
                                    <h4>蛤蛤</h4>
                                    <p>xieyang</p>
                                </div>
                            </div>
                        </div>

                        <div class="img-box">
                            <div v-on:mouseenter="showIndexCover" v-on:mouseleave="hideIndexCover" class="img-item img-item2">
                                <div v-show="cgIndex.showCover" transition="cgrecocover" class="cg-img-cover index">
                                    <h4>蛤蛤</h4>
                                    <p>xieyang</p>
                                </div>
                            </div>
                            <div v-on:mouseenter="showIndexCover" v-on:mouseleave="hideIndexCover" class="img-item">
                                <div v-show="cgIndex.showCover" transition="cgrecocover" class="cg-img-cover index">
                                    <h4>蛤蛤</h4>
                                    <p>xieyang</p>
                                </div>
                            </div>
                            <div v-on:mouseenter="showIndexCover" v-on:mouseleave="hideIndexCover" class="img-item">
                                <div v-show="cgIndex.showCover" transition="cgrecocover" class="cg-img-cover index">
                                    <h4>蛤蛤</h4>
                                    <p>xieyang</p>
                                </div>
                            </div>
                            <div v-on:mouseenter="showIndexCover" v-on:mouseleave="hideIndexCover" class="img-item img-item2">
                                <div v-show="cgIndex.showCover" transition="cgrecocover" class="cg-img-cover index">
                                    <h4>蛤蛤</h4>
                                    <p>xieyang</p>
                                </div>
                            </div>
                            <div v-on:mouseenter="showIndexCover" v-on:mouseleave="hideIndexCover" class="img-item item3">
                                <div v-show="cgIndex.showCover" transition="cgrecocover" class="cg-img-cover index">
                                    <h4>蛤蛤</h4>
                                    <p>xieyang</p>
                                </div>
                            </div>
                        </div>

                        <div class="hot-cg">
                            <div class="panel-header">
                                热门标签
                            </div>

                            <div class="panel-section">
                                <div class="hot-tags-content">
                                    
                                    <div class="row">
                                        <div class="col-md-6 hot-tags-section-padding">
                                            <div class="hot-tags-section">
                                                <div class="hot-tags-header">
                                                    <h4>暗杀教室</h4>
                                                </div>
                                                <div class="hot-tags-img">
                                                    <ul>
                                                        <li></li>
                                                        <li></li>
                                                    </ul>
                                                    <ul>
                                                        <li style="background-image: url(http://tp2.sinaimg.cn/2354504421/180/40057719478/0)"></li>
                                                        <li></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 hot-tags-section-padding">
                                            <div class="hot-tags-section">
                                                <div class="hot-tags-header">
                                                    <h4>暗杀教室</h4>
                                                </div>
                                                <div class="hot-tags-img">
                                                    <ul>
                                                        <li></li>
                                                        <li></li>
                                                    </ul>
                                                    <ul>
                                                        <li style="background-image: url(http://tp2.sinaimg.cn/2354504421/180/40057719478/0)"></li>
                                                        <li></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 hot-tags-section-padding">
                                            <div class="hot-tags-section">
                                                <div class="hot-tags-header">
                                                    <h4>暗杀教室</h4>
                                                </div>
                                                <div class="hot-tags-img">
                                                    <ul>
                                                        <li></li>
                                                        <li></li>
                                                    </ul>
                                                    <ul>
                                                        <li style="background-image: url(http://tp2.sinaimg.cn/2354504421/180/40057719478/0)"></li>
                                                        <li></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 hot-tags-section-padding">
                                            <div class="hot-tags-section">
                                                <div class="hot-tags-header">
                                                    <h4>暗杀教室</h4>
                                                </div>
                                                <div class="hot-tags-img">
                                                    <ul>
                                                        <li></li>
                                                        <li></li>
                                                    </ul>
                                                    <ul>
                                                        <li style="background-image: url(http://tp2.sinaimg.cn/2354504421/180/40057719478/0)"></li>
                                                        <li></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

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
                cgReco: {
                    showCover: false
                },
                cgIndex: {
                    showCover: false
                }
            }
        },

        components: {

        },

        methods: {
            showCover: function() {
                this.cgReco.showCover = true;
            },

            hideCover: function() {
                this.cgReco.showCover = false;
            },

            showIndexCover: function(obj) {
                obj.target.getElementsByTagName('div')[0].setAttribute('style','opacity:1;padding-top:76px;');
            },

            hideIndexCover: function(obj) {
                obj.target.getElementsByTagName('div')[0].setAttribute('style','opacity:0;padding-top:60px;');
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
        display: table-cell;
        margin-right: 10px;
        cursor: pointer;
        border-radius:50%;
        width:60px;
        height:60px;
        background-image: url(http://tp2.sinaimg.cn/2354504421/180/40057719478/0);
        background-size:60px;
    }

    .cg-img {
        width: 100%;
        height: 120px;
        /*background-size: 100% 120px;*/
        background-repeat: no-repeat;
        margin-top: 15px;
        border-radius: 3px;
        cursor: pointer;
        background-position: center;
    }

    .cg-img:hover {
        background-color: rgba(0, 0, 0, 0.4);
    }

    .cg-group .col-md-6:nth-child(odd) {
        padding-right: 6px;
    }

    .cg-group .col-md-6:nth-child(even) {
        padding-left: 6px;
    }

    .cg-img-cover {
        opacity: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        color: rgb(255, 255, 255);
        text-align: left;
        padding-left: 10px;
        font-weight: 200;
    }

    .cg-img-cover .span {
        text-align: right;
        width: 100%;
        font-size: 2.4em;
        padding-right: 5px;
    }

    .cg-img-cover p {
        font-size: 1em!important;
    }

    .cg-img-cover h4 {
        font-weight: 200;
    }

    .cg-img-cover.index {
        padding-top: 60px;
    }

    .cg-img-cover.index h4 {
        margin-top: 0px;
    }

    @media screen and (max-width: 960px) {
        .photo-group ul li {
            width: 30px;
            height: 30px;
            background-size: 30px;
        }

        .img-box {
            display: flex;
            /*flex-wrap: wrap;*/
            flex-direction: column;
            flex: none;
        }

        .img-item {
            width: 100%;
        }

        .img-item2 {
            width: 100%;
        }

    }

    @media screen and (max-width: 1023px) {
        .profile .outer-column {
            border-bottom: 1px solid rgb(220, 220, 220);
            border-right: none;
            padding-top: 5px;
            margin-bottom: 5px;
        }

        .profile .outer-column:last-child {
            border-bottom: none;
        }

        .recommend-user {
            margin-top: 0px;
        }

    }

    .cgrecocover-transition {
        transition: all .3s ease;
        opacity: 1;
    }

    .cgrecocover-enter, .cgrecocover-leave {
        padding: 0 10px;
        opacity: 0;
    }

    .img-box {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
    }

    .img-item {
        flex: 1;
        height: 140px;
        cursor: pointer;
        background-image: url(http://i0.hdslb.com/320_200/video/f2/f2b119b4270f1a7c5bf03716065d35be.jpg);
        /*background-size: 100% 100%;*/
        background-position: center;
    }

    .img-item2 {
        flex: 2;
    }

    .hot-tags-content {
        width: 100%;
    }

    .hot-tags-section {
        width: 100%;
        text-align: center;
        box-shadow: 0 0 1px 1px rgb(220, 220, 220);
    }

    .hot-tags-section h4 {
        font-weight: 200;
        margin-top: 0px!important;
        padding-top: 5px!important;
        margin-bottom: 5px!important;
    }

    .hot-tags-img {
        display: table;
        width: 100%;
    }

    .hot-tags-img ul {
        list-style: none;
        display: table-row;
        margin-left: -40px;
    }

    .hot-tags-img ul li {
        display: table-cell;
        border: 1px solid rgb(255, 255, 255);
        height: 220px;
        background-image: url(http://i2.hdslb.com/u_user/c143946c2acf6e34e836bd9e24871ad7.jpg);
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
    }

    .hot-tags-img ul li:hover {
        transition: all .3s ease;
        padding: 10px;
    }

    .hot-tags-section-padding {
        padding: 7px;
    }

    .hot-cg {
        border-left: 1px solid rgb(220, 220, 220);
    }

    .col-md-6 {
        padding-left: 0px;
        padding-right: 0px;
    }

    .hot-tags-content .col-md-6 {
        padding-left: 10px;
        padding-right: 10px;
    }

</style>
