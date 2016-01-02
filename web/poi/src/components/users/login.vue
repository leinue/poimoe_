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
										登录
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
										<button class="btn btn-default" @click="toRegister()" style="margin-right:10px">注册</button>
										<button class="btn btn-primary" @click="confirmToLogin()">确认登录</button>
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
				password: ''
			}

		},

		components: {

		},

		methods: {
			back: function() {
				window.history.go(-1);
			},

			toRegister: function() {
				util.cancelActiveMenu();
				router.go('/register');
			},

			toIndex: function() {
				router.go('/index');
			},

			confirmToLogin: function() {

				if(this.email === '') {
					util.messageBox('请输入邮箱地址');
					return false;
				}

				if(this.password === '') {
					util.messageBox('请输入密码');
					return false;
				}

				services.UserService.login(this.email, this.password).then(function(res) {

					var data = res.data;
					util.messageBox(data.message);

					if(data.code === 200) {

						var real = data.data;

						util.login(real);

						router.go('/index');
						
					}else {

						localStorage.login = 'false';

					}

				}, function(err) {

					localStorage.login = 'false';

					util.handleError(err);

				});

			}

		},

		created() {
			setTimeout(function() {
			}, 1000);
		}
		
	}

</script>

<style>

	.timeline-content.form {
		font-size: 14px;
		padding-top: 0px;
	}

	.input-group-addon {
		border: 1px solid rgb(249, 245, 239);
		border-radius: 0px;
		font-size: 14px!important;
	}

	.form-control {
		border: 1px solid rgb(249, 245, 239);
		box-shadow: none;
		border-radius: 0px;
	}

	.input-group {
		margin-top: -1px;
	}

</style>