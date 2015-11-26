var ctrl = require('./controllers/index');
var util = require('./util/index');
var nodemailer = require('nodemailer');

module.exports = {

  mongoose: undefined,
 
  init: function(server, mongo) {
    
    ctrl.init(mongo);
    this.mongoose = mongo;
  
    server.get('/log/', ctrl.userCtrl.logUser);
     
    server.get('/mail', function(req, res) {
    	
    	var smtpTransport = nodemailer.createTransport("SMTP", {
    		host: 'smtp.qq.com',
    		secureConnection: true,
    		port: 465,
    		auth: {
    			user: "597055914@qq.com",
    			pass: 'lanJIA7758'
    		}
    	});

    	var mailOptions = {
		  from: "Fred Foo <597055914@qq.com>", // 发件地址
		  to: "1054639005@qq.com", // 收件列表
		  subject: "Hello world", // 标题
		  html: "<b>thanks a for visiting!</b> 世界，你好！" // html 内容
		};

		smtpTransport.sendMail(mailOptions, function(err, response) {
			if(err) {
				res.send(err);
			}else {
				res.send('message senf:' + response.message);
			}
			smtpTransport.close();
		});


    });
  
  }

};

