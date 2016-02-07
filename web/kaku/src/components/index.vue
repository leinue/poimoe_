<template>
    
    <div style="">
        <div class="row a-bounceinT">
            <div class="col-md-8 col-md-offset-2">
                <div class="col-md-12">
                    <div class="col-md-6" v-for="room in kakuRoomList">
                        <div class="room-rect">
                            <h2 style="cursor:pointer" @click="toSkecthRoom(room._id, room.isLocked)">{{room.name | nullRoomNameFilter}}</h2>
                            <div class="room-enter" @click="toSkecthRoom(room._id)">
                                <span v-show="room.isLocked == false" class="glyphicon glyphicon-hand-up"></span>
                                <span v-show="room.isLocked == true" class="glyphicon glyphicon-lock"></span>
                            </div>
                            <span class="glyphicon glyphicon-user"> {{room.creator.username}}</span>
                            <span style="margin-left:15px;" class="glyphicon glyphicon-flag"> {{room.people.length}}/{{room.peopleLimit}}</span>
                            <div class="room-member">
                                <div class="row">
                                    <div class="col-md-2" style="padding:0px;height:30px;padding-top:5px;">
                                        <span>成员：</span>                                    
                                    </div>
                                    <div class="col-md-10" style="padding:0px;">
                                        <div @click="viewProfile(people._id)" class="room-photo" v-for="people in room.people" style="background-image: url({{people.photo}});"></div>                              
                                        <div class="room-photo more" v-show="room.people.length > 5">7+</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="load-more">
                        加载更多
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import util from '../commons/scripts/commons.js';

    export default {
        data() {
            return {
                kakuRoomList: []
            }
        },

        components: {

        },

        methods: {

            toSkecthRoom: function(id, isLocked) {
                if(isLocked) {
                    var pw = prompt('请输入房间密码');
                    sessionStorage[id] = pw;
                    router.go('/sketch/' + id);
                }else {
                    sessionStorage[id] = '';
                    router.go('/sketch/' + id);
                }
            },

            loadKakuRoom: function() {

                var _this = this;

                window.services.KakuService.indexAll(1, 10).then(function(res) {

                    var code = res.data.code;
                    var data = res.data.message;

                    if(code != 200) {
                        util.messageBox(data);
                        return false;
                    }

                    _this.kakuRoomList = data;

                    console.log(_this.kakuRoomList);

                }, function(err) {
                    util.handleError(err);
                });
            },

            viewProfile: function(id) {
                window.location.href = 'http://poi.poimoe.com/#!/profile/' + id;
            }

        },

        created() {
            var _this = this;

            var servicesInterval = setInterval(function() {
                if(typeof window.services != 'undefined') {

                    _this.$get('loadKakuRoom')();

                    clearInterval(servicesInterval);

                }
            }, 1);
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

    .room-rect {
        background: rgb(255, 255, 255);
        padding: 15px;
        border-top: 2px solid rgb(0, 149, 219);
        margin-bottom: 15px;
    }

    .room-rect.grey {
        background: rgb(234, 234, 234);
    }

    .room-rect span {
        color: rgb(159, 167, 167);
    }

    .room-rect h2 {
        font-weight: 200;
        margin-top: 0px!important;
    }

    .room-rect .room-member {
        margin-top: 15px;
    }

    .room-photo {
        width: 30px;
        height: 30px;
        background-size: cover;
        background-position: center;
        border-radius: 50%;
        float: left;
        margin-right: 6px;
        cursor: pointer;
    }

    .room-photo.more {
        background: rgb(179, 179, 179);
        text-align: center;
        color: rgb(255, 255,255);
        line-height: 30px;
        cursor: default;
    }

    .room-enter {
        position: absolute;
        right: 30px;
        top: 26px;
        font-size: 1.4em;
        cursor: pointer;
    }

    .room-enter span:hover {
        color: rgb(0, 149, 219)!important;
    }

    .load-more {
        text-align: center;
        margin-top: 15px;
        padding: 10px;
        cursor: pointer;
        margin-left: 15px;
        margin-right: 15px;
        background: rgb(255, 255, 255);
    }

</style>
