<template>
    
    <div style="">
        <div class="row a-bounceinT">
            <div class="col-md-8 col-md-offset-2">
                <div class="new-room-container">
                    <div class="new-room-header">
                        <span>新建房间</span>                        
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon" id="sizing-addon3">房间名称<span class="required">*</span></span>
                        <input type="text" v-model="room.name" class="form-control">
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon" id="sizing-addon3">人数限制<span class="required">*</span></span>
                        <input type="text" v-model="room.peopleLimit" class="form-control">
                    </div>
                    <div class="row">
                        <div class="col-md-6" style="padding-left: 0px">
                            <div class="input-group">
                                <span class="input-group-addon" id="sizing-addon3">是否加密<span class="required"></span></span>
                                <input v-on:change="enablePassport()" v-model="room.isLocked" type="checkbox" class="form-control">
                            </div>                            
                        </div>
                        <div class="col-md-6" style="padding-right: 0px">
                            <div class="input-group">
                                <span class="input-group-addon" id="sizing-addon3">加密口令<span class="required" v-show="room.isLocked">*</span></span>
                                <input type="text" v-model="room.passport" class="form-control" disabled="{{!room.isLocked}}">
                            </div>                            
                        </div>                        
                    </div>
                    <div class="msg-btn-wrap" style="border:none">
                        <button @click="back()">取消</button>
                        <button @click="submitNewRoom()">提交</button>
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
                room: {
                    name: '',
                    peopleLimit: 5,
                    isLocked: false,
                    passport: '',
                    creator: localStorage._id
                }
            }
        },

        components: {

        },

        methods: {

            enablePassport: function() {
                console.log(this.room.isLocked);
            },

            submitNewRoom: function() {

                if(this.room.name == '' || this.room.isLocked == '') {
                    util.messageBox('请完整填写必要信息');
                    return false;
                }

                if(this.room.isLocked && this.room.passport == '') {
                    util.messageBox('请填写口令');
                    return false;
                }

                window.services.KakuService.create(this.room).then(function(res) {

                    var code = res.data.code;
                    var data = res.data.message;

                    if(code != 200) {
                        util.messageBox(data);
                        return false;
                    }

                    util.messageBox(data);

                }, function(err) {
                    util.handleError(err);
                });
            },

            back: function() {
                window.history.back();
            }

        },

        created() {
            var _this = this;

            var servicesInterval = setInterval(function() {
                if(typeof window.services != 'undefined') {

                    clearInterval(servicesInterval);

                }
            }, 1);
        }

    };

</script>

<style>

    .new-room-container {
        padding: 25px;
        background: rgb(255, 255, 255);
        box-shadow: 0 2px 3px 2px rgba(0, 0, 0, .03);
        border-radius: 2px;
    }

    .new-room-header {
        border-bottom: 1px solid rgb(238, 238, 238);
        padding-bottom: 15px;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    .new-room-header span {
        font-size: 18px;
        line-height: 18px;
        color: rgb(0, 149, 219);
    }

    .input-group {
        margin-bottom: 20px;        
    }

    .input-group input {
        border: none;
        border-bottom: 1px solid rgb(193, 201, 207);
        box-shadow: none;
        transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    }

    .input-group input:focus {
        border-color: #93a1bb;
    }

    .required {
        color: #e02222;
        font-size: 12px;
        padding-left: 2px;
        position: absolute;
    }

    .input-group .input-group-addon {
        background: rgb(255, 255, 255);
        border: none;
        color: rgb(136, 136, 136);
        font-size: 14px;
    }

    .form-control[disabled], fieldset[disabled] .form-control {
        background: rgb(255, 255, 255);
        border-bottom: 1px dashed rgb(193, 201, 207);
    }

</style>
