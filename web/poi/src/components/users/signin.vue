<template>

	<div>

		<div class="shadow-page">
		</div>

		<div class="box-center">
			<div class="flex-item">
				<div class="col-md-12">
					<div class="timeline">
						<div class="col-xs-12" style="width:100%;">
							
							<div class="timeline-new content">

								<div class="timeline-content-header">
									<div class="header-left">
										注册
									</div>
									<div class="header-right">
										<span @click="toIndex()" class="glyphicon glyphicon-remove"></span>
									</div>
								</div>

								<div class="timeline-content-footer">
									<div class="timeline-content upload form">
										<div class="input-group">
										  <span class="input-group-addon" id="basic-addon1">邮箱</span>
										  <input type="text" class="form-control" placeholder="请输入邮箱地址" v-model="email" aria-describedby="basic-addon1">
										</div>

										<div class="input-group">
										  <span class="input-group-addon" id="basic-addon1">	密码</span>
										  <input type="password" v-model="password" class="form-control" placeholder="密码" aria-describedby="basic-addon1">
										</div>

										<div class="input-group">
										  <span class="input-group-addon" id="basic-addon1">	确认</span>
										  <input type="password" v-model="passwordConfirm" class="form-control" placeholder="请输入确认密码" aria-describedby="basic-addon1">
										</div>
									</div>

									<div class="timeline-new-section upload" style="background: rgb(237, 247, 253);height:65px;cursor:default;margin-bottom:22px;">
										<div class="timeline-new-section-outer">
											<span>QQ登录</span>
											<span>微信登录</span>
											<span>微博登录</span>
										</div>
									</div>

									<div class="new-cg-confirm">
										<button class="btn btn-default" @click="back()" style="margin-right:10px;">返回</button>
										<button class="btn btn-default" @click="toLogin()" style="margin-right:10px">去登录</button>
										<button class="btn btn-primary" @click="confirmToRegister()">确认注册</button>
									</div>
								</div>

							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>

</template>

<script>

	var util = require('../../commons/scripts/commons.js');

	export default {

		data() {
			return {
				email: '',
				password: '',
				passwordConfirm: ''				
			}
		},

		components: {

		},

		methods: {
			back: function() {
				window.history.go(-1);
			},

			toLogin: function() {
				util.cancelActiveMenu();
				router.go('/login');
			},

			toIndex: function() {
				router.go('/index');
			},

			confirmToRegister: function() {

				if(this.email == '') {
					util.messageBox('请输入注册邮箱');
					return false;
				}

				if(!util.emailCheck(this.email)) {
					util.messageBox('请输入正确格式的邮箱地址！');
					return false;
				}

				if(this.password == '') {
					util.messageBox('请输入注册密码');
					return false;
				}

				if(this.passwordConfirm == '') {
					util.messageBox('请输入确认密码');
					return false;
				}

				if(this.password != this.passwordConfirm) {
					util.messageBox('密码不统一！');
					return false;
				}

				if(this.password.length > 16) {
					util.messageBox('密码长度不能大于16位！');
					return false;
				}

				services.UserService.register(this.email, this.password).then(function(res) {

					var data = res.data;

					if(data.code === 200) {
						util.messageBox(data.message);
						this.toLogin();
						return false;
					}

					util.messageBox(data.message);

                }, function(err) {
                	util.handleError(err);
                });

			}
		}
		
	}

</script>

<style>


</style>