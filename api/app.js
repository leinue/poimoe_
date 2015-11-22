var restify = require('restify');
var mongoose = require('mongoose');
var routes = require('./routes');
var dbconf = require('./conf/db');
var conf = require('./conf/conf');
var models = require('./models/index');

//shell test
//连接mongodb
mongoose.connect('mongodb://' + dbconf.mongo.host + '/' + dbconf.mongo.database);
var db = mongoose.connection;

db.on('error', console.error.bind(console,'connection error'));

db.once('open', function(callback) {

});

//创建restify服务器
var server = restify.createServer();

//初始化路由
routes.init(server, mongoose);

//开始监听服务器端口
server.listen(2333, function() {
  console.log('%s listening at %s', server.name, server.url);
});

