# Poimoe开发文档

---

[TOC]

---

# 前记

> 编写人：谢扬 
编写人邮箱：597055914@qq.com 
最后修改时间：2016-06-06 16:29
文档编写框架：markdown
Poimoe线上体验地址：[poimoe][1]

---

# 整体概述

## 背景

已互联网技术为核心，采用B/S架构。
实现多人协同（Socket技术）、在线绘画（Canvas技术）、多图层、房间聊天、社区讨论、异步上传头像（AJAX、HTTP）、消息监听（Comet技术）、消息广播、缓存等众多功能。

## 开发语言、环境及框架

### 开发语言

**前端：** HTML5 + CSS3 + JavaScript
**后端：** Nodejs
**数据库：** MongoDB

**图片存储服务使用PHP + MySql编写**

### 开发环境

**操作系统：** Mac OS X 
**编辑器：** Sublime Text 3
**版本控制：** Git
**包管理器：** Homebrew、NPM
**其它：MongoDB** Node、

### 开发框架

> Poimoe使用前后端分离开发方式，且除官网以外其它所有页面都为SPA应用。
本文档隐藏了大量实现细节，文档中的代码不到真实代码的5 ％，但能保证您对系统整体有个认识。

**前端：** 

使用MVVM框架：**Vuejs** + **Angularjs**
样式框架主要使用：**Bootstrap**
自动化构建使用：**Webpack**
部分需要ECMAScript功能的地方使用**Babel**进行转换

**后端：** 

RESTful API规范使用**restify**编写
操作MongoDB的使用**Mongoose**框架

### API规范

RESTful API规范

### 网络架构

完全支持TCP/IP协议，以此基础为拓展，实现Socket、Comet通信。

## 运行环境及服务器要求

**服务器操作系统**： CentOS
**负载均衡**：Nginx + php-fpm

### Nginx配置

采用多端口映射多域名方案

## 用户前台功能概述

用户前台包含三大板块：

 1. 官方网站，采用Wordpress架构
 2. Poi社区，使用Vuejs架构，包含Comet服务
 3. Kaku绘画，使用Vuejs架构，包含聊天Socket服务和绘画Socket服务

其中，每个板块都是一个域名，用户登录状态通过Cookie + localStorage同步，安全问题用document.domain解决，意味着，任何非poimoe域名的网站想内嵌进我的网站是不可能的。

### 功能概述

#### 官方网站

#### Poi社区

#### Kaku绘画

### 界面预览

> **以下图片需要联网查看**

#### 官网

![Poimoe官网][2]

----------

#### Poi社区

##### 主页

![Poi主页][3]

##### 时间线

###### 私人

![Poi私人时间线][4]

###### 公共

![Poimoe公共时间线][5]

##### 登录



##### 注册

![Poimoe注册][6]

##### 个人中心

![Poi个人中心面板][7]

##### 个人资料

![Poi个人资料页][8]

##### 新增图片

![Poi新增图片][9]

![Poi标签搜索1][10]

![Poi标签搜索2][11]

##### 粉丝列表
![粉丝列表][12]
##### 消息通知
![消息通知][13]
![右侧消息通知][14]
##### 搜索页面
![搜索页面][15]
##### 移动端页面
![移动端主页][16]
![移动端登录][17]

----------


#### Kaku绘画

##### 主页

![kaku主页][18]

##### 新增房间页面

![新增房间][19]

##### 绘画页面

![绘画页面][20]
 
## 管理员后台功能概述


----------


### 数据统计

统计：本日新增用户、总用户数、投稿数、标签数、被锁用户数、被删用户数、今日新增投稿、被删投稿数、今日新增标签、被删标签数、活跃标签、活跃用户、活跃主题



----------


### 信息管理

#### 用户管理

包含三种选择：

 1. 基本信息
 2. 被删用户
 3. 被锁用户

> 其中基本信息包含以下功能：

 1. 查看详细资料/编辑资料
 2. 查看好友关系列表
 3. 查看投稿列表/删除/查看投稿
 4. 用户组管理
 5. 删除/撤销删除
 6. 锁定/解锁

> 支持多选操作：多选删除/多选锁定/多选撤销删除/多选接触锁定
> 支持分页、搜索

![用户管理][21]

----------

#### 投稿管理

包含两种选择：

 1. 基本信息
 2. 被删投稿

> 其中基本信息包含以下功能

 1. 查看投稿
 2. 作者信息
 3. 删除/撤销删除

> 支持多选操作：多选删除/多选撤销删除
> 支持分页、搜索

----------
 
#### 标签管理

包含两种选择：

 1. 基本信息
 2. 被删标签

> 其中基本信息包含以下功能

 1. 编辑标签
 2. 删除/撤销删除

> 支持多选操作：多选删除/多选撤销删除
> 支持分页、搜索

----------

#### 房间管理

包含两种选择：

 1. 基本信息
 2. 被删房间

> 其中基本信息包含以下功能

 1. 编辑房间
 2. 删除/撤销删除

> 支持多选操作：多选删除/多选撤销删除
> 支持分页、搜索

### 权限管理

#### 用户组管理

包含两个项目：

 1. 查看用户组列表
 2. 新增用户组

每个用户组包含以下功能：

 1. 查看详情/编辑
 2. 分配权限
 3. 删除

> 分配权限时读取所有权限列表
> 支持分页、搜索

----------

#### 用户组权限管理

包含两个项目：

 1. 查看用户权限列表
 2. 新增用户权限

买个用户权限包含以下功能：

 1. 查看详情/编辑
 2. 删除

----------

## 前端工程化方案

### 自动化构建方案

#### 用户前台

用户前台的前端使用Webpack构建方案：

相关代码如下：

``` javascript

var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: './dist/build.js'
    },
    module: {
        loaders: [
            { test: /\.vue$/, loader: 'vue' },
            { test: /\.css$/, loader: "style!css" },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff2" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
        ]
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.css'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            vueStrap: './node_modules/vue-strap/dist/vue-strap.min.js',
            bootstrap: './node_modules/bootstrap/dist/css/bootstrap.min.css'
        }
    }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [ 
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }   
    }), 
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }   
    }), 
    new webpack.optimize.OccurenceOrderPlugin()
  ]
} else {
  module.exports.devtool = '#source-map'
}


```

实现了对JS/CSS/图片/字体文件的打包，同时会构建一个本地测试服务器。

命令说明：

##### 调试

``` shell
npm run dev
```

启动本地服务器，调试，热更新.

##### 构建

``` shell
npm run build
```

开始构建程序

#### 用户后台

使用gulp进行自动化构建，相关代码如下：

> 此份代码仅留下了外围代码，核心代码太长所以去掉了


``` javascript

var args        = require('yargs').argv,
    path        = require('path'),
    flip        = require('css-flip'),
    through     = require('through2'),
    gulp        = require('gulp'),
    $           = require('gulp-load-plugins')(),
    gulpsync    = $.sync(gulp),
    PluginError = $.util.PluginError,
    del         = require('del'),
    connect     = require('gulp-connect');

//---------------
// MAIN TASKS
//---------------

// build for production (minify)
gulp.task('build', gulpsync.sync([
          'prod',
          'vendor',
          'assets'
        ]));

gulp.task('prod', function() { 
  log('Starting production build...');
  isProduction = true; 
});

// build with sourcemaps (no minify)
gulp.task('sourcemaps', ['usesources', 'default']);
gulp.task('usesources', function(){ useSourceMaps = true; });

// default (no minify)
gulp.task('default', gulpsync.sync([
          'vendor',
          'assets',
          'serve',
          'watch'
        ]), function(){

  log('************');
  log('* All Done * You can start editing your code, LiveReload will update your browser after any change..');
  log('************');

});

gulp.task('serve', function () {
  connect.server({
    root: '../',
    livereload: false,
    port: 8080
  });
});

gulp.task('assets',[
  'scripts:app',
  'styles:app',
  'styles:app:rtl',
  'styles:themes',
  'templates:index',
  'templates:views'
]);

```

实现了对js、css、scss、less、jade、html的打包/压缩功能，同时构建起一个本地测试服务器

##### 调试

``` shell
gulp
```

##### 构建

``` shell
gulp build
```

### 自动化部署方案

使用git + ssh

部署脚本如下：

``` shell

echo "请输入commit信息："

read msg 

git add .
git commit -a -m "$msg"
git push -u origin master
rsync -avz -4 --exclude-from "/var/www/poimoe/exclude.md" /var/www/poimoe/ root@poimoe.com:/var/www/poimoe/

```

先从本机同步到github，然后再同步到服务器上。

## Node程序监听方案

使用**Supervisor**命令

## 调试方法

### 用户前台

用户前台包括poi和kaku，可以直接使用:

``` shell
npm run dev
```

这会构建起一个本地服务器，默认端口：8080

### 用户后台

``` shell
gulp
```

这也会构建起一个本地服务器，默认端口：8080

### API、Socket、Comet等服务

服务器开启supervisor服务，同步到服务器上后，supervisor监听到文件改动后自动重启Node程序。

## 部署步骤

### 编译

``` shell
cd /var/www/poimoe/admin/master/ && gulp build
cd /var/www/poimoe/web/kaku && npm run build
cd /var/www/poimoe/web/poi && npm run build
sh p.sh #上面的部署脚本
```

### 启动服务器所需服务

先用supervisor启动Socket服务、API服务

``` shell

screen -S poimoe_api && cd /var/www/poimoe/api && supervisor app.js
screen -S poimoe_socket && cd /var/www/poimoe/socket && supervisor app.js

```

然后启动其它组件

``` shell
nginx
systemctl start mariadb
systemctl start php-fpm
mongod
```

---

# 数据库设计

## 用户表

## 用户组表

## 用户关系表

## 回复表

## 标签表

## 主题表

## 系统设置表

## 时间线表

## 认证表

## kaku画图数据表

---

# 代码编写规范

 - tab键缩进
 - 语句后面接分号
 - 驼峰命名
 - 左大括号写在函数扩后后并空一格
 - 赋值时左右都空一格

---

# 源代码文档

## 文件架构

.
├── README.md
├── admin
│   ├── app
│   ├── index.html
│   ├── master
│   ├── server
│   └── vendor
├── api
│   ├── app.js
│   ├── conf
│   ├── controllers
│   ├── models
│   ├── node_modules
│   ├── package.json
│   ├── routes.js
│   ├── sc.sh
│   └── util
├── build.sh
├── cdn
├── exclude.md
├── image
│   ├── index.php
│   └── upload.php
├── npm-debug.log
├── p.sh
├── r.sh
├── server.sh
├── socket
│   ├── index.html
│   ├── index.js
│   ├── node_modules
│   ├── package.json
│   └── util
└── web
    ├── index
    ├── kaku
    └── poi
Poimoe各个服务都是分开的，由单独的文件夹进行管理。
这些服务分别为：admin（网站后台）、api（api接口）、image（图片服务器）、socket（聊天、协同绘画服务器）、web（网站前台，包含了：官网、绘画系统、社区系统）。

其中
> p.sh为同步到github和服务器脚本
> r.sh为同步到服务器脚本

---

## RESTful API源代码文档

### 文件架构

.
├── app.js
├── conf
├── controllers
├── models
├── node_modules
├── package.json
├── routes.js
├── sc.sh
└── util

api服务负责整套系统所有API接口的提供，各个文件及文件夹说明如下：

**app.js：** api接口启动程序
**conf：** 网站系统配置
**controllers：** 控制器文件夹
**models：** 数据表文件夹
**node_modules：** 依赖的nodejs库
**routes.js：** api系统路由地址
**sc.sh：** 部署脚本
**util：** 常用的函数方法

> 因API服务过多，这里只列出几个重要的服务

### 启动API服务代码

``` javascript

var restify = require('restify');
var mongoose = require('mongoose');
var routes = require('./routes');
var dbconf = require('./conf/db');
var conf = require('./conf/conf');
var models = require('./models/index');

//连接mongodb
mongoose.connect('mongodb://' + dbconf.mongo.host + '/' + dbconf.mongo.database);

var db = mongoose.connection;
var Schema = mongoose.Schema;

db.on('error', console.error.bind(console,'connection error'));

db.once('open', function(callback) {

});

//创建restify服务器
var server = restify.createServer({
	name: 'poimoe'
});

restify.CORS.ALLOW_HEADERS.push('authorization');

server.use(restify.authorizationParser());
server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restify.CORS());

//初始化路由
routes.init(server, mongoose, restify);

//开始监听服务器端口
server.listen(2333, function() {
  console.log('%s listening at %s', server.name, server.url);
});


```

``` shell
supervisor app.js
```

### 开启CORS服务

因为JavaScript有跨源限制，所以需要开启CORS服务，开启CORS服务的代码在路由文件里

``` javascript
    server.pre(function(req, res, next) {
    	res.charSet('utf-8');
        res.setHeader('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    	return next();
    });

```

### restify中间件服务

restify的中间件可以做很多事情，比如权限控制。

``` javascript
server.use(ctrl.userCtrl.auth);
```

这里是使用了user控制器下的auth方法，auth方法如下，其实现了用户组监测，权限控制，登录验证等功能。

``` javascript
  auth: function(req, res, next) {

    var reqRoute = req.route.path;
    var routesNoneAuth = [
      '/themes/hot', '/tags/select/hotTags', 
      '/user/recommended', '/user/register/:email/:password', 
      '/user/login/:email/:password', '/themes/select/:tid', 
      '/user/profile/get/:uid', '/site/search/:val/:page/:count', '/timeline/message/personal/count/:uid',
      '/timeline/message/index/count/:uid', '/timeline/message/index/count/:uid',
      '/kaku/room/all/:page/:count'
    ];

    if(req.username == 'anonymous') {

      var reqRouteList = reqRoute.split('/');

      var isHasNoneAuthRoute = false;

      for (var i = routesNoneAuth.length - 1; i >= 0; i--) {
        var currRoute = routesNoneAuth[i];
        if(currRoute == reqRoute) {
          isHasNoneAuthRoute = true;
          break;
        }
      };

      //  

      if(!isHasNoneAuthRoute) {
        res.send(util.retMsg(4001, "用户未登录或无权限，请重新登录"));         
      }else {
        return next();
      }

    }else {
      var User = ctrlInitial.models.User();
      User.findByAccessToken(req.authorization.credentials, function(err, u) {

        if(err) {
          res.send(util.retMsg(400, err.toString()));
        }

        if(u.length === 0) {
          res.send(util.retMsg(4001, "access_token非法，请重新登录"));
        }

        if(u[0].tokenCreatedAt == undefined || u[0].tokenDestoriedAt == undefined) {
          res.send(util.retMsg(4001, "access_token非法或用户登录已失效，请重新登录"));
        }

        var currentTimestamp = Date.now();
        if(currentTimestamp > u[0].tokenDestoriedAt) {
          res.send(util.retMsg(4001, "access_token已过期，请重新登录"));
        }

        if(u[0].isBlocked === true) {
          res.send(util.retMsg(400, "账号为：" + thisEmail + " 的用户已被锁定"));
        }

        if(u[0].isDeleted === true) {
          res.send(util.retMsg(400, "账号为：" + thisEmail + " 的用户已被删除"));
        }

        global.currentUserId = u[0]._id;

        var group = u[0].group;

        if(group.length === 0) {
          res.send(util.retMsg(401, "无权限访问当前资源"));
        }

        var group = group[0];

        if(group.name == 'root' && group.code == 100) {
          //为root用户组
          next();
        }else {

          var ug = ctrlInitial.models.UserGroups();

          ug.findById(group._id, function(err, auth) {

            if(err) {
              res.send(util.retMsg(400, err.toString()));
            }

            if(auth.length === 0) {
              res.send(util.retMsg(401, "无权限访问当前资源"));
            }else {

              var authList = auth[0].rightsList;

              var hadAuth = false;
              var AuthName = '';

              for (var i = 0; i < authList.length; i++) {
                var currentAuth = authList[i];
                var router = currentAuth.router;

                if(router == reqRoute) {
                  hadAuth  = true;
                  break;
                }
              };

              if(!hadAuth) {
                res.send(util.retMsg(401, "无权限访问当前资源"));
              }else {
                next();
              }

            }

          });

        }

      });
    }

  },

```

### OAuth用户登录

Poimoe采用的登录验证使用OAuth技术，每个用户都有一个AccessToken和token的过期时间。auth方法接收到用户请求后会先检测用户登录状态有没有过期，然后会进行反馈。

### 权限控制

Poimoe的用户权限控制分为两大块：

用户组
用户组权限

默认的用户组有三种：

root用户，超级管理员
管理员，拥有部分权限
普通用户，权限范围更小

管理员可在此基础上继续拓展其它用户组

> **每个用户组的权限都可以自由开关**

设置的时候，前台直接传过来一串权限json，然后存入数据库，相关代码如下：

``` javascript

  applyAuthority: function(req, res, next) {

    var rights = req.params.rights;
    var id = req.params.id;

    if(rights == undefined || rights == '') {
      res.send(util.retMsg(401, "权限列表不能为空"));
    }

    if(id == undefined || id == '') {
      res.send(util.retMsg(401, "缺少参数：用户组id"));
    }

    if(rights.length === 0) {
      res.send(util.retMsg(401, "权限列表不能为空"));
    }

    var UG = ctrlInitial.models.UserGroups();

    UG.findById(id, function(err, ug) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      if(ug.length === 0) {
        res.send(util.retMsg(401, '无此用户组'));
      }

      ug = ug[0];

      if(ug.code == '100') {
        // res.send(util.retMsg(401, '系统默认用户组，禁止更改'));
      }

      UG.update(id, {
        rightsList: rights
      }, function(err, ug) {

        if(err) {
          res.send(util.retMsg(401, err.toString()));
        }

        res.send(util.retMsg(200, '分配用户权限成功', ug));

      });

    });

  },

  applyToUser: function(req, res, next) {

    var aid = req.params.aid;
    var uid = req.params.uid;

    if(uid == undefined || uid == '') {
      res.send(util.retMsg(401, "缺少参数：用户id"));
    }

    if(aid == undefined || aid == '') {
      res.send(util.retMsg(401, "缺少参数：用户组id"));
    }

    var UG = ctrlInitial.models.UserGroups();

    UG.findById(aid, function(err, ug) {

      if(err) {
        res.send(util.retMsg(401, err.toString()));
      }

      if(ug.length === 0) {
        res.send(util.retMsg(401, '无此用户组'));
      }

      ug = ug[0];

      var User = ctrlInitial.models.User();

      User.updateGroup(aid, uid, function(err, user) {

        if(err) {
          res.send(util.retMsg(401, err.toString()));
        }

        res.send(util.retMsg(200, '修改成功', user));

      });

    });

  }

```

### Comet服务

用户转发了某个CG，那么该CG的作者要**立即**得到通知；用户喜欢了某个CG，该CG的作者需要**立即**得到通知；在时间线内，有关注好友发送了新CG时，关注者也需要立即得到通知。因为客户端推技术AJAX比较耗费资源，所以我们采用Comet服务器推技术。

结合自身业务需要，Poimoe将Comet分为以下几个服务：

 1. 获得被转发数量 
 2. 获得被收藏数辆 
 3. 获得公共时间线最新数据量 
 4. 获得私人时间线最新数据量 
 5. 获得被转发数据 
 6. 获得被收藏数据
 7. 获得公共时间线最新数据 
 8. 获得私人时间线最新数据

结合Timeline数据表，Poimoe的逻辑如下：

对于转发、收藏等数据的统计，Poimoe的Timeline表中有单独的字段进行存储：
``` javascript
      personalMessageQueue: [{
        operator: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
        targetUser: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
        targetTheme: {
          type: Schema.Types.ObjectId,
          ref: 'themes'
        },
        did: {
          type: String,
          default: 'repost' //repost || favourite
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }]
```

这里面包含了操作者id、目标用户id、目标CG id、做了什么事、创建时间

2. 对于时间线，仅仅是一个简单的数组进行存储

``` javascript

      messageQueue: [{
        type: Schema.Types.ObjectId,
        ref: 'themes'
      }],

```

其中一个服务代码如下：（全列的话代码太长）

``` javascript

  getMessageCount: function(req, res, next) {

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    });

    var count = 0;

    var loadMessageCount = function() {
      
      var uid = req.params.uid;

      if(uid == '' || uid == undefined) {
        res.write(util.retESMsg(401, '用户id不能为空'));
      }

      var User = ctrlInitial.models.User();

      var Timeline = ctrlInitial.models.Timeline();

      Timeline.findMessageCount(uid, function(err, tl_messageCount) {

        if(err) {
          res.write(util.retESMsg(401, err.toString()));        
        }

        if(tl_messageCount == null) {

          var tline = new Timeline({
            user_id: uid
          });

          tline.save(function(err, new_tl) {

            if(err) {
              res.write(util.retESMsg(401, err.toString()));
            }

            res.write(util.retESMsg(200, new_tl.messageCount));

          });

        }else {
          res.write(util.retESMsg(200, tl_messageCount.messageCount));
        }

      });

    };

    console.log('user start index message count comet service');

    global.currentCountInterval = setInterval(function() {
      loadMessageCount();
    }, 500);

    res.connection.on('end', function(){
      console.log('user exit index message count comet service');
      clearInterval(currentCountInterval);
    });

  },

```

要使用Comet服务，必须设置HTTP header头，相关说明如下：

content-type必须为：text/event-stream

### 客户端使用EventSource调用Comet服务：

客户端调用Comet服务非常简单，使用HTML5的EventSource即可：

``` javascript

startIndexTimelineComet: function() {
	var _this = this;

	var es = new EventSource('http://api.poimoe.com//timeline/message/index/count/' + localStorage._id);

	es.onmessage = function(e) {
		_this.indexMesssageCount = JSON.parse(e.data).message;
		console.log(_this.indexMesssageCount);
	};

	es.onerror = function(e) {
		util.handleError('comet服务出错');
	};

	es.onopen = function(e) {}
}

```

---

## 协同画图服务源代码文档

### 文件架构

.
├── index.html
├── index.js
├── node_modules
│   ├── express
│   ├── express-mongoose
│   ├── mongoose
│   ├── request
│   └── socket.io
├── package.json
└── util
    └── index.js

### 基础功能实现

#### 进入房间

进入房间的逻辑较为复杂，步骤如下：

1. 发起socket连接，告知服务器，我要进入某个房间了，发送的数据包括，用户id，房间id，房间密码（如果有的话），用户名，accessToken；
2. 如果服务器验证通过，会返回一个“enter chatting room succeed”的消息，如果失败会返回”enter chatting room failed“，此时需要告知用户进入失败；
3. 进入成功后，服务器会返回当前房间的聊天记录、历史绘画数据，以及UI状态（几个图层、离开时选的是哪个颜色等）；
4. 得到数据后，初始化画板和UI，并且根据上次离开的状态，开启同步绘画、同步保存图像、UI状态线程（这两个线程也很复杂，下面会讲）；
初始化聊天服务；
5. 进入成功。

相关代码如下：

``` javascript
enterRoom: function(id) {

	var _this = this;

    var chatSocket = io('ws://socket.poimoe.com/chat');
	chatSocket.emit('enter chatting room', {
		people: localStorage._id,
		roomId: id,
		passport: sessionStorage[id],
		username: localStorage.username,
		accessToken: localStorage.accessToken
	});

	window.chatSocket = chatSocket;

	chatSocket.on('enter chatting room succeed', function(res) {

		var code = res.code;
        var data = res.message;

        if(code != 200) {
            util.messageBox(data);
            router.go('/index');
            return false;
        }

        _this.room = data[0];

        _this.room.chatting.reverse();

        if(_this.room.paint != null) {
            _this.paint = _this.room.paint;

            // 将字符串的false或true转换为真实的false或true
            for(var key in _this.paint) {

            	_this.paint[key] = _this.paint[key] == 'false' ? false : (_this.paint[key] == 'true' ? true : _this.paint[key]);

            	if(key == 'layer' || key == 'currentLayer') {
        			if(typeof _this.paint[key].length == 'number') {

        				for (var i = 0; i < _this.paint[key].length; i++) {
        					var curr = _this.paint[key][i];
        					for(var k in curr) {
        						_this.paint[key][i][k] = _this.paint[key][i] == 'false' ? false : ( _this.paint[key][i][k] == 'true' ? true : _this.paint[key][i][k] );
        					}
        				};

        			}
            	}

            }

            //初始化
            // toggleLayer(key, layer.id, paint.currentLayer.index);

            _this.paint.x = [];
            _this.paint.y = [];
            _this.paint.clickDrag = [];
        }
        // _this.paintUI = _this.room.paintUI;

        setTimeout(function() {
            _this.initPaint();
            _this.initBasePaint();

            //初始化用户图像

            //先将图片转换为dataURL，否则在使用toDataURL时会产生跨域问题

            _this.drawImageOnCanvas(_this.paint.dataURL, _this.paint.baseCxt);
            _this.drawImageOnCanvas(_this.paint.dataURL, _this.paint.cxt);

            var activeLayerIndex = _this.paint.currentLayer.index;
            var activeLayerId = _this.paint.layer[activeLayerIndex].id;
            var activeLayer = {
            	cxt: '',
            	url: ''
            };

            for (var i = 0; i < _this.paint.layer.length; i++) {
            	var currentLayer = _this.paint.layer[i];
            	var tmpCxt = document.getElementById(currentLayer.id).getContext('2d');
            	if(currentLayer.dataURL != '') {
            		console.log(currentLayer.dataURL);
                	_this.drawImageOnCanvas(currentLayer.dataURL, tmpCxt);
                	if(activeLayerId == currentLayer.id) {
                		activeLayer.cxt = tmpCxt;
                		activeLayer.url = currentLayer.dataURL;
                	}
            	}
            };

            // //重新设置当前活跃图层的dataURL
            // console.log(activeLayer);
        	// _this.drawImageOnCanvas(activeLayer.url, activeLayer.cxt);

            _this.isLoaded = true;

            setTimeout(function() {
	        	common.adjustUI();
            }, 400);

			_this.initKakuMQSocket();
			_this.initKakuInstantSavingThread();

        }, 10);

        //// _this.initKakuSocket(id);

	});

	chatSocket.on('enter chatting room failed', function(msg) {
		util.handleError(msg, 'socket');
	});

	chatSocket.on('leave room failed', function(msg) {
		util.handleError(msg, 'socket');
	});

	chatSocket.on('leave room succeed', function(msg) {
		console.log(msg);
	});

	chatSocket.on('sys', function(msg) {
		util.handleError(msg, 'socket');
	});

    chatSocket.on('chat message', function(msg) {

		if(typeof msg === 'string') {
			msg = JSON.parse(msg);
		}

		var code = msg.code;
		var data = msg.message;

		if(code != 200) {
			util.messageBox(data);
			return false;
		}

		_this.room.chatting.push(data.chatting[0]);
		_this.message = '';
	});
},

```

#### 离开房间

离开房间时自动保存

``` javascript
chatSocket.emit('leave', {
	leaver: localStorage._id,
	roomId: router._currentRoute.params.id,
	accessToken: localStorage.accessToken
});
```
#### 保存绘画状态

##### 保存成品

``` javascript
var dataURL = this.paint.baseCanvas.toDataURL();
```

Poimoe的绘画系统在每一笔在画的时候，都会自动在baseCanvas上绘制所有图层数据，所以一行代码就可以解决，难点在单个图层的保存上。

#####  保存单个图层数据

逻辑如下：

1. 将单个图层数据保存到数组里，这里面就包括了获取单个图层数据；
2. 异步上传图片数据（base64格式）到服务器，然后服务器转码成png进行保存。

难点：

数组深复制
获得单个图层数据，这不是一句toDataURL就能解决的，因为会和底下的图层冲突


数组深复制很简单：

``` javascript
cloneObject: function(original, ignoreList) {

	ignoreList = ignoreList || false;

	var tmp = {};

	for(var key in original) {
		if(ignoreList) {
			if(ignoreList.indexOf(key) === -1) {
				tmp[key] = original[key];
			}
		}else {
			tmp[key] = original[key];
		}
	}

	return tmp;

},

```

获得单层数据，Poimoe使用了一个取巧的方法：

``` javascript
getLayerDataURL: function(canvas) {
	var cxt = canvas.getContext('2d');
	var oldData = cxt.getImageData(0, 0, canvas.width, canvas.height);
	var newCanvas = document.createElement("canvas");
	newCanvas.width = canvas.width;
	newCanvas.height = canvas.height;
	newCanvas.id = "tmpLayer";
	document.body.appendChild(newCanvas);
	var newCxt = newCanvas.getContext("2d");
	newCxt.putImageData(oldData, 0 ,0);
	var data = newCanvas.toDataURL();
	newCanvas.parentNode.removeChild(newCanvas);
	return data;
}
```

canvas有一个cxt.getImageData的方法，只获得当前图层的数据，其它图层不会获得。所以我们先获得想获得的canvas数据，然后创建一个新的canvas，这个canvas独立于Poimoe的主画板，再将getImageData的数据重新画上去，最后再使用toDataURL获得数据即可。

#### 分享当前绘画

分享当前绘画的意思是将当前CG上传至服务器后，再链接到Poi社区进行上传。
主要还是进行异步上传图片，相关代码如下：

``` javascript
shareThisCG: function(obj, cb) {

	var navToPoi;

	if(obj != undefined) {
		navToPoi = obj.navToPoi == false ? obj.navToPoi : true;
	}else {
		navToPoi = true;
		obj = {
			isLayer: false,
			nodel: 'no'
		}
	}

	var _this = this;

	//上传图片
	//存到cookie
	//加载poi新增CG页面
	var base64 = obj.base64 || this.paint.baseCanvas.toDataURL();

	var requestParams = navToPoi ? localStorage._id + '/roomCG/' + this.room._id + '/sharing' : localStorage._id + '/roomCG/' + this.room._id + '/painting';

	requestParams = obj.isLayer ? requestParams + '/layers' : requestParams;

	services.KakuService.uploadBase64ToServer({
		uid: requestParams,
		nodel: obj.nodel || 'no'
	}, {
		base64Image: base64
	}).then(function(res) {

        var code = res.data.status;
        var data = res.data.message;

        if(code != 200) {
            util.messageBox(data, true);
            return false;
        }

        var imageUrl = data.origin;

        if(navToPoi) {
        	var split = imageUrl.split('/');
        	var name = split[split.length - 1];
            window.location.href = 'http://poi.poimoe.com/#!/cg/new/' + _this.room._id + '/' + name;
        }else {
        	cb(imageUrl);
        }

	}, function(err) {
		util.handleError(err);
	});
},

```

绘画服务用到的图片上传技术主要还是canvas转图片到base64，post到服务器后，服务器对base64进行转码。

#### 关闭/开启自动保存

``` javascript
toggleSyncPaintingStatus: function() {
	if(this.instantSaving.startInstantSavingThread) {
		clearInterval(this.instantSaving.instantSavingThreadFlag);
		this.instantSaving.tips = '开启自动保存';
		util.messageBox('关闭自动保存成功');
		this.instantSaving.startInstantSavingThread = false;
	}else {
		util.messageBox('开启自动保存成功');
		_this.instantSaving.tips = '关闭自动保存';
		this.instantSaving.startInstantSavingThread = true;
		this.initKakuInstantSavingThread();
	}
}
```
#### 绘画服务数据结构

``` javascript
myId: localStorage._id,

room: {},
message: '',

isLoaded: false,

paint: {
	x: [], //鼠标移动时x坐标
	y: [], //鼠标移动时y坐标
	lock: false, //鼠标移动前，判断鼠标是否按下
	isEraser: false,
	eraserRadius: 15,
	isColorPicker: false,
	canvas: '',
	cxt: '',
	baseCanvas: '',
	baseCxt: '',
	lineWidth: 5,
	strokeStyle: 'rgba(0, 0, 0, 0)',
	width: 0,
	height: 0,

	clickDrag: [],

	touch: ('createTouch' in document),
	startEvent: this.touch ? 'touchstart' : 'mousedown',
	moveEvent: this.touch ? 'touchmove' : 'mousemove',
	endEvent: this.touch ? 'touchend' : 'mouseup',

	layer: [{
		name: '背景',
		opacity: 100,
		display: 'block',
		zindex: 1,
		id: 'layer-bg',
		active: true,
		editable: false,
		marginTop: 0,
		dataURL: ''
	}],

	currentLayer: {
		id: 'layer-bg',
		index: 0
	},

	picData: '',
	dataURL: ''
},

paintUI: {
	colorPickerCursorPosition: '',
	colorPicker: {}
},

instantSaving: {
	instantSavingThreadFlag: 0,
	startInstantSavingThread: false,
	tips: '开启自动保存'
}
```

各项键说明如下；

myId:：用户id
room：房间数据
message：聊天记录
isLoaded：是否加载完毕
paint：绘画数据
paint.x：鼠标移动时x坐标
paint.y；鼠标移动时y坐标
paint.lock：鼠标移动前，判断鼠标是否按下
paint.isEraser：是否使用了橡皮
paint.eraserRadius：橡皮直径
paint.canvas：画图画版
paint.cxt：canvas绘图环境上下文
paint.baseCanvas：底部画板，在canvas上画图时自动同步到此画版上
paint.baseCxt：底部画板画图环境上下文
paint.lineWidth：画笔粗细
paint.strokeStyle：画笔描边风格
paint.width：画板宽度
paint.height：画板高度
paint.clickDrag：按住鼠标在画板上拖动时经过的坐标
paint.touch：兼容移动端的touch
paint.startEvent：兼容移动端的鼠标移动事件开始
paint.moveEvent：兼容移动端的鼠标移动事件
paint.endEvent：兼容移动端的事件结束
paint.layer：保存着所有图层数据
paint.currentLayer：保存着当前图层数据
paint.picData：图片数据

#### 多图层功能实现

多图层就是多canvas，只要将多个canvas覆盖到上部即可实现多图层功能。

> 和图层有关的数据结构

``` javascript
layer: [{
	name: '背景',
	opacity: 100,
	display: 'block',
	zindex: 1,
	id: 'layer-bg',
	active: true,
	editable: false,
	marginTop: 0,
	dataURL: ''
}],

currentLayer: {
	id: 'layer-bg',
	index: 0
}
```

layer.name：图层名称
layer.opacity：图层透明度
layer.display：display方式
layer.zindex：层级数
layer.id：canvas在dom中的id
layer.active：是否活跃
layer.editable：是否时编辑状态
layer.marginTop：位置
layer.dataURL：图像数据

##### 添加新图层

``` javascript
addNewLayer: function(layer, noSocket) {
	noSocket = noSocket || false;

	var thisPaint = this.paint;
	var thisPaintLayer = thisPaint.layer;

	var currentLayerIndex = thisPaint.currentLayer.index;

	thisPaintLayer[currentLayerIndex].active = false;
	thisPaintLayer[currentLayerIndex].zindex = -1;

	var layerId = 'LAYER' + util.randomString(8);
	var layerCount = thisPaintLayer.length;
	var layer = layer || {
		name: '背景' + layerCount,
		opacity: 100,
		display: 'block',
		zindex: 1,
		id: layerId,
		active: true,
		editable: false,
		marginTop: '-800px',
		dataURL: ''
	};
	thisPaintLayer.push(layer);

	this.toggleLayer(layerCount, layerId, currentLayerIndex);

	layer.people = localStorage._id;

	if(!noSocket) {
		chatSocket.emit('new layer', layer);        			
	}
},
```

##### 删除图层

``` javascript
removeThisLayer: function(index, noSocket) {
	noSocket = noSocket || false;

	var thisPaint = this.paint;
	var thisPaintLayer = thisPaint.layer;
	var currentLayer = thisPaint.currentLayer;

	var currentLayerIndex = index || currentLayer.index;
	var tmpIndex = currentLayerIndex;

	if(currentLayerIndex === 0) {
		util.messageBox('不允许删除的图层');
		return false;
	}

	thisPaintLayer.splice(currentLayerIndex);

	this.toggleLayer(currentLayerIndex - 1, thisPaintLayer[currentLayerIndex - 1].id);

	if(!noSocket) {
		chatSocket.emit('remove layer', {
			index: tmpIndex,
			people: localStorage._id
		});        			
	}
},
```
##### 切换图层
	
``` javascript

toggleLayer: function(activeIndex, activeId, unactiveIndex, noSocket) {
	if(activeIndex == unactiveIndex) {
		return false;
	}

	noSocket = noSocket || false;

	var thisPaint = this.paint;
	var thisPaintLayer = thisPaint.layer;
	var currentLayer = thisPaint.currentLayer;

	currentLayer.index = activeIndex;
	currentLayer.id = activeId;
	thisPaintLayer[activeIndex].active = true;
	thisPaintLayer[activeIndex].zindex = 1;
	if(typeof unactiveIndex != 'undefined') {
		thisPaintLayer[unactiveIndex].active = false;
		thisPaintLayer[unactiveIndex].zindex = -1;  			
	}
	this.initPaintInterval(activeId);
	if(!noSocket) {
		chatSocket.emit('toggle layer', {
			activeIndex: activeIndex,
			activeId: activeId,
			unactiveIndex: unactiveIndex,
			people: localStorage._id
		});
	}
},
```

##### 显示这个图层

``` javascript
showThisLayer: function(id, noSocket) {
	noSocket = noSocket || false;
	this.paint.layer[id].display = 'block';
	if(!noSocket) {
		chatSocket.emit('show layer', {
			index: id,
			people: localStorage._id
		});        			
	}
},
```

##### 隐藏这个图层

``` javascript

hideThisLayer: function(id, noSocket) {
	noSocket = noSocket || false;
	this.paint.layer[id].display = 'none';
	if(!noSocket) {
		chatSocket.emit('hide layer', {
			index: id,
			people: localStorage._id
		});        			
	}
},
```

##### 使这个图层可编辑

``` javascript
makeThisLayerEditable: function(id, makeFalse) {
	makeFalse = makeFalse || true;
	this.paint.layer[id].editable = !this.paint.layer[id].editable;
	if(!makeFalse) {
		setTimeout(function() {
			this.paint.layer[id].editable = false;        				
		}, 10);
	}
},
```

##### 确认编辑图层名称

``` javascript
confirmEditThisLayerName: function(index, name) {
	this.paint.layer[index].editable = false;
	var layer = this.paint.layer[index];
	layer.people = localStorage._id;
	layer.index = index;
	chatSocket.emit('modify layer', layer);
},
```
#### 画笔粗细调整

因为食用了MVVM框架，所以this.paint.lineWidth和dom进行了绑定，只要移动DOM上的slider即可改变粗细。

#### 画笔颜色调整

使用canvas重新完成了一个ColorPicker，主要利用渐变色，其文件在
> kaku/src/commons/scripts/ColorPicker.js

初始化代码：

``` javascript
_this.colorPicker = ColorPicker.init({
	onColorChange: function(color) {
		_this.paint.strokeStyle = color;

		chatSocket.emit('color change', {
			people: localStorage._id,
			color: _this.paint.strokeStyle
		});

	},
	defaultColor: 'rgba(0, 0, 0, 255)'
});
var panel = _this.colorPicker.getPanel();
document.getElementById('color-picker-area').appendChild(panel);
```

#### 橡皮擦实现

橡皮擦本质上就是画白色的圆。

``` javascript
resetErase: function(_x, _y, touch) {
	var t = this.paint;
	var cxt = t.cxt;
	for (var i = 0; i < 2; i++) {
		if(i === 1) {
			cxt = t.baseCxt;
		}
		cxt.globalCompositeOperation = "destination-out";
        cxt.beginPath();
        cxt.arc(_x, _y, t.eraserRadius, 0, Math.PI * 2);
        cxt.strokeStyle = "rgba(250,250,250,0)";
        cxt.fill();
        cxt.globalCompositeOperation = "source-over";
	};
}
```

#### 上传图片到Canvas上

利用HTML的FileReader即可快读读取图片到canvas上，相关代码如下：

``` javascript
getPicFile: function() {

	var file = document.getElementById('upfile');

    var reader = new FileReader();

    var _this = this;

    reader.readAsDataURL(file.files[0]);  
    reader.onload = function(e){
    	_this.drawImage(this.result);
    };

    reader.onerror = function(e) {
    	console.log(e);
    };

    reader.onabort = function(e) {
    	console.log(e);
    };
}
```

drawImage是canvas自带的函数

#### 下载图片

下载图片之遥生成底层canvas的dataURL即可：

``` javascript
window.open(this.paint.baseCanvas.toDataURL());
```

#### 聊天功能实现

##### 后端Socket服务

使用Socket.io ＋ express框架，将socket服务分为聊天服务和绘画服务。相关代码如下：

``` javascript
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var request = require('request');
var lib = require('./util/index.js');

app.get('/', function(req, res){
  res.send('welcome to poimoe socket server');
});

var chat = io.of('/chat');
var kaku = io.of('/kaku');
```

聊天服务Socket主要监听‘chat message’，所有消息都通过这个接口进行分发：

``` javascript
socket.on('chat message', function(msg){
	console.log('msg reveived: ');

	if(!roomInfo[roomId]) {
		roomInfo[roomId] = [];
	}

	if (roomInfo[roomId].indexOfA(user) === -1) {  
      return false;
    }

	request.post({
	        url: 'http://api.poimoe.com/kaku/room/chat/send',
	        encoding: 'utf8',
	        headers: {
	        	'Authorization': 'Basic ' + msg.accessToken 
	        },
	        form: msg
	    },
	    function(error, response, body){
	        if(!error && response.statusCode == 200){
	            console.log(body);
			    chat.to(roomId).emit('chat message', body);
	        }else{
	            console.log(response.statusCode);
        	    chat.to(roomId).emit('chat message', {
        	    	code: response.statusCode,
        	    	message: response.body,
        	    	error: error,
        	    	headers: response.headers,
        	    	request: response.request
        	    });
	        }
	    }
	);
});
```
##### 前端调用发送消息

``` javascript
confirmToSendChattingMessage: function() {
	var _this = this;

	if(_this.message == '') {
		util.messageBox('请输入发送内容');
		return false;
	}

	var chatMessage = {
		sender: localStorage._id,
		roomId: _this.room._id,
		message: _this.message,
		accessToken: localStorage.accessToken
	};
	chatSocket.emit('chat message', chatMessage);
},
```
除了消息外，还要发送当前用户id，房间id，用户的accessToken

##### 前端调用接收消息

``` javascript
chatSocket.on('chat message', function(msg) {

	if(typeof msg === 'string') {
		msg = JSON.parse(msg);
	}

	var code = msg.code;
	var data = msg.message;

	if(code != 200) {
		util.messageBox(data);
		return false;
	}

	_this.room.chatting.push(data.chatting[0]);
	_this.message = '';
});
```

### 协同绘画功能实现

#### 基本原理

用户在画线的时候，利用Socket传输点，广播给房间内的所有人，其他人收到后，系统自动按照点进行绘画。

#### 代码实现

socket服务监听‘start draw kaku’进行点的分发：

``` javascript
socket.on('start draw kaku', function(msg) {

	if(!roomInfo[roomId]) {
		roomInfo[roomId] = [];
	}

	if (roomInfo[roomId].indexOfA(user) === -1) {  
      return false;
    }

    chat.to(roomId).emit('get kaku path', msg);

});
```

接收到分发数据后会emit消息’get kaku path‘。

画图客户端这么发送：

``` javascript
chatSocket.emit('start draw kaku', {
	x: t.x,
	y: t.y,
	strokeStyle: t.strokeStyle,
	clickDrag: t.clickDrag,
	lineWidth: t.lineWidth,
	eraserRadius: t.eraserRadius,
	people: localStorage._id
});
```

发送的数据包括：当前x点、当前y点、画笔描边、经过的点、橡皮擦半径、当前用户id。

客户端接收到消息后：

``` javascript
chatSocket.on('get kaku path', function(data) {
	if(!(data.people.toString() == localStorage._id)) {
		_this.paint.strokeStyle = data.strokeStyle;
		_this.paint.lineWidth = data.lineWidth;
		_this.paint.x = data.x;
		_this.paint.y = data.y;
		_this.paint.clickDrag = data.clickDrag;
		_this.paint.eraserRadius = data.eraserRadius;
		_this.drawPoint();
		_this.drawPoint(false, _this.paint.baseCxt);
	}
});
```

其中第三行在判断如果接收到的消息发送人id等于当前用户id，则跳过。
第九、十行是自动画图的调用。

drawPoint的实现如下：

``` javascript
drawPoint: function(sendSocket, cxt) {

	sendSocket = sendSocket || false;

	var t = this.paint;
	var cxt = cxt || t.cxt;
	cxt.fillStyle = "#000000";

	if(sendSocket) {
		chatSocket.emit('start draw kaku', {
			x: t.x,
			y: t.y,
			strokeStyle: t.strokeStyle,
			clickDrag: t.clickDrag,
			lineWidth: t.lineWidth,
			eraserRadius: t.eraserRadius,
			people: localStorage._id
		});
	}

	for(var i=0; i < t.x.length; i++) {   
        cxt.beginPath();//context.beginPath() , 准备绘制一条路径	                
        if(t.clickDrag[i] && i){//当是拖动而且i!=0时，从上一个点开始画线。
            cxt.moveTo(t.x[i-1], t.y[i-1]);//context.moveTo(x, y) , 新开一个路径，并指定路径的起点
        }else{
            cxt.moveTo(t.x[i] - 1, t.y[i]);
        }

        cxt.lineTo(t.x[i], t.y[i]);//context.lineTo(x, y) , 将当前点与指定的点用一条笔直的路径连接起来
        cxt.closePath();//context.closePath() , 如果当前路径是打开的则关闭它
        cxt.stroke();//context.stroke() , 绘制当前路径
    }

    cxt.save();
}
```

#### 其它说明

在画图界面的每一个操作都会进行socket转发，比如图层的增删查改，橡皮、画笔的切换，上传图片等等。每一个操作都涉及到一个服务。

---

## Poi源代码文档

### 文件架构

.
├── 448c34a56d699c29117adc64c43affeb.woff2
├── 89889688147bd7575d6327160d64e760.svg
├── README.md
├── dist
├── e18bbf611f2a2e43afc071aa2f4e1512.ttf
├── f4769f9bdb7466be65088239c12046d1.eot
├── fa2772327f55d8198301fdb8bcfc8158.woff
├── index.html
├── node_modules
├── package.json
├── remove.sh
├── src
├── upload.html
└── webpack.config.js

---

Poi是随kaku的社区，为用户提供一个交流的场所。包含了**发布、转发、收藏、关注、消息通知、标签搜索、全文搜索、资料修改查看、热门标签推荐、推荐用户等功能**。使用了MVVM框架VueJS进行开发，支持响应式布局。

### src目录

.
├── 404.vue
├── app.vue
├── commons
├── components
├── config.js
├── filters
├── index.js
├── npm-debug.log
├── routes.js
└── services

app.vue 程序界面入口文件
404.vue 找不到页面时显示的页面
commons 公用的js、css、images
components 组件，头部，底部，搜索框等，这些组件组成了整个程序
filters 过滤器
index.js 程序逻辑入口文件
routes.js 路由文件
services api接口文件夹

### 异步图片上传

这里的异步上传图片用了iframe进行了伪异步。

upload.html里的代码如下：

``` html
<script type="text/javascript">
	
	function getQueryString(name) {
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	}

	localStorage.pictureUploadedJSON = getQueryString('data');

	document.write(localStorage.pictureUploadedJSON);

</script>
```

上传的DOM结构如下：

``` html
<div @click="uploadCG()" class="timeline-new-section-outer" id="my-cg-viewer">
	<h1 v-show="isCGShow === false" style="line-height: 14">上传CG</h1>
	<div id="cg-outer">
		<img style="display:none" id="sharing-viewer" class="cg-viewer" width="100" height="100" border="0">
	</div>
	<form style="display:none" enctype="multipart/form-data" method="post" target="upload" v-bind:action="cgUploadAction" > 
		<input type="file" id="cg-source" name="upfile" v-on:change="previewImage()"/>
		<input id="submit-cg-btn" type="submit" /> 
	</form>
	<iframe style="display:none" id="ifr" name="upload"></iframe>
</div>
```

uploadCG方法实现如下：

``` javascript
document.getElementById("cg-source").click();
```

这就相当于点了form里的按钮，之后会触发previewImage事件，其实现方法如下：

``` javascript
previewImage: function() {

	var width = document.getElementById('my-cg-viewer').style.width;
	var height = document.getElementById('my-cg-viewer').offsetHeight - 2;

	util.previewImage('cg-source', 'cg-outer', 'cg-viewer', '', 'width:100%;height:' + height + 'px;');
	this.isCGShow = true;

	var _this = this;

	util.syncUploadPic('submit-cg-btn', 'ifr', function(picJSON) {
    	_this.cg.image = picJSON.message.preview;
	});
}
```

第11行是封装了异步上传的一个接口，其实现方法如下：

``` javascript
syncUploadPic: function(submitBtnId, ifrId, cb) {
	document.getElementById(submitBtnId).click();

	var _this = this;

    var getJSON = function() {
    	var picJSON = JSON.parse(localStorage.pictureUploadedJSON);

    	if(picJSON.status != 200) {
    		_this.messageBox('上传失败，请重试');
    		return false;
    	}

    	cb(picJSON);
    };

    var oFrm = document.getElementById(ifrId);

	oFrm.onload = oFrm.onreadystatechange = function() {
	     if (this.readyState && this.readyState != 'complete') {
	     	return false;
	     }
	     else {
	         getJSON();
	     }
	}
},
```

这个方法会先点击form内的submit按钮，然后将其重定向到iframe内，之后服务器会上传图片，并重定向回来，地址参数里带有图片的url地址，这时再用一个回调函数就获取到地址了。

##### 服务端实现

服务端是用php实现的，主要代码如下：

``` php
if(!$cors) {

        returnMessage(200, array('origin' => 'http://image.poimoe.com/'.$destination_folder.$fname, 'preview' => 'http://image.poimoe.com/'.$destination));

}else {

        header('Location:'.$corsurl.'?data='.returnMessage(200, array('origin' => 'http://image.poimoe.com/'.$destination_folder.$fname, 'preview' => 'http://image.poimoe.com/'.$destination), true));
        
    }

```

### components文件架构

.
├── error
│   └── nodata.vue
├── favourites
│   └── index.vue
├── footer.vue
├── header.vue
├── index.vue
├── loading
│   └── loading.vue
├── search
│   └── search.vue
├── search.vue
├── timeline
│   ├── index.vue
│   ├── personal.vue
│   └── public.vue
├── users
│   ├── login.vue
│   ├── notifications.vue
│   ├── profile.vue
│   ├── relations
│   └── signin.vue
└── works
    ├── index.vue
    ├── new.vue
    └── view.vue

error 在系统出错的时候显示的信息
favourites 查看用户收藏的cg
footer 程序页脚
header 程序页头
loading 进行ajax请求时显示的部分
search 搜索页面
timeline 时间线，分为私人时间线和公共时间线
uses 一切关于用户的操作
works 查看自己的work、发布新的work

poi还使用了很多消息监听、comet服务等，在api里都有说明，不再赘述。

## 图片服务源代码文档

### 文件架构
.
├── index.php
└── upload.php

图片服务器使用PHP编写，服务器使用Nginx + php-fpm架构，同时开启了CORS服务，客户端使用跨源请求进行图片上传。

``` php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Authorization');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Credentials: true');
header("Content-type: text/html; charset=utf-8");
```
---

## 后台源代码文档

### 文件架构

.
├── app
│   ├── css
│   ├── documentation
│   ├── i18n
│   ├── img
│   ├── js
│   ├── vendor
│   └── views
├── index.html
├── master
│   ├── bower.json
│   ├── bower_components
│   ├── gulpfile.js
│   ├── jade
│   ├── js
│   ├── less
│   ├── node_modules
│   ├── package.json
│   ├── sass
│   ├── vendor.base.json
│   └── vendor.json
├── server
│   └── sidebar-menu.json
└── vendor
    ├── angular-datatables
    ├── angular-ui-map
    ├── datatables
    ├── fontawesome
    ├── modernizr
    ├── simple-line-icons
    └── weather-icons

后台的架构为angularjs架构，使用jade编写html、用less编写css。

对源文件的修改集中在master文件夹内。

代码片段：

``` jade
// START widgets box
.row(ng-controller="DashboardController as dash")
  .col-lg-3.col-sm-6
    // START widget
    .panel.widget.bg-primary
      .row.row-table
        .col-xs-4.text-center.bg-primary-dark.pv-lg
          em.icon-user.fa-3x
        .col-xs-8.pv-lg
          .h2.mt0 {{dash.dashboardInfo.usersAddedToday}}
          .text-uppercase 今日新增用户
  .col-lg-3.col-sm-6
    // START widget
    .panel.widget.bg-purple
      .row.row-table
        .col-xs-4.text-center.bg-purple-dark.pv-lg
          em.icon-users.fa-3x
        .col-xs-8.pv-lg
          .h2.mt0 {{dash.dashboardInfo.usersCount}}
          .text-uppercase 总用户数
  .col-lg-3.col-md-6.col-sm-12
    // START widget
    .panel.widget.bg-green
      .row.row-table
        .col-xs-4.text-center.bg-green-dark.pv-lg
          em.icon-bubbles.fa-3x
        .col-xs-8.pv-lg
          .h2.mt0 {{dash.dashboardInfo.themesCount}}
          .text-uppercase 投稿数
  .col-lg-3.col-md-6.col-sm-12
    // START date widget
    .panel.widget
      .row.row-table
        .col-xs-4.text-center.bg-green.pv-lg
          // See formats: https://docs.angularjs.org/api/ng/filter/date
          em.icon-tag.fa-3x
        .col-xs-8.pv-lg
          .h2.mt0 {{dash.dashboardInfo.tagsCount}}
          .text-uppercase 标签数
    // END date widget    
// END widgets box
```

``` javascript
UserService.getAll(1, 1000)
.success(function(res, status, headers, config) {
    if(res.code != 200) {
        var toast = $mdToast.simple()
              .content(res.message)
              .action('我知道了')
              .highlightAction(false)
              .position('top right');
        $mdToast.show(toast).then(function() {
        });
    }
    vm.usersList = res.message;
})
.error(function(res, status, headers, config) {
    var toast = $mdToast.simple()
          .content('出错了，错误代码：' + status)
          .action('我知道了')
          .highlightAction(false)
          .position('top right');
    $mdToast.show(toast).then(function() {
    });
});
```

后台的开发用到了javascript的很多特性，比如promise，异步编程，结合gulp等工程话工具，大大简化了开发流程。

---


  [1]: http://poimoe.com
  [2]: http://ww4.sinaimg.cn/large/0060lm7Tgw1f4k3u1im7wj313z0m6n8n.jpg
  [3]: http://ww4.sinaimg.cn/large/0060lm7Tgw1f4k3xlkfejj313z0m6jxi.jpg
  [4]: http://ww4.sinaimg.cn/large/0060lm7Tgw1f4k40fq9jxj313z0m5tbh.jpg
  [5]: http://ww2.sinaimg.cn/large/0060lm7Tgw1f4k450az8gj313z0m640t.jpg
  [6]: http://ww2.sinaimg.cn/large/0060lm7Tgw1f4k4dshpkxj313z0m20u9.jpg
  [7]: http://ww1.sinaimg.cn/large/0060lm7Tgw1f4k46c8a5tj313z0m5tak.jpg
  [8]: http://ww1.sinaimg.cn/large/0060lm7Tgw1f4k48x3t4lj313o0m3di2.jpg
  [9]: http://ww4.sinaimg.cn/large/0060lm7Tgw1f4k49b64rtj313n0m475p.jpg
  [10]: http://ww3.sinaimg.cn/large/0060lm7Tgw1f4k49pdz2dj313z0m6q4g.jpg
  [11]: http://ww1.sinaimg.cn/large/0060lm7Tgw1f4k4ac39skj313z0m8wg7.jpg
  [12]: http://ww1.sinaimg.cn/large/0060lm7Tgw1f4lne02ti8j313g0m1wfn.jpg
  [13]: http://ww4.sinaimg.cn/large/0060lm7Tgw1f4lnelbe4gj313y0m540n.jpg
  [14]: http://ww4.sinaimg.cn/large/0060lm7Tgw1f4lnf1ihhxj30g40d2q4a.jpg
  [15]: http://ww2.sinaimg.cn/large/0060lm7Tgw1f4lnfhuw5gj313z0m70up.jpg
  [16]: http://ww2.sinaimg.cn/large/0060lm7Tgw1f4lnh8ffkuj308k0d0mz2.jpg
  [17]: http://ww4.sinaimg.cn/large/0060lm7Tgw1f4lnhl546nj309u0hct9k.jpg
  [18]: http://ww4.sinaimg.cn/large/0060lm7Tgw1f4lni9wgyzj313z0m5jua.jpg
  [19]: http://ww2.sinaimg.cn/large/0060lm7Tgw1f4lnim8eyqj313x0m70tv.jpg
  [20]: http://ww2.sinaimg.cn/large/0060lm7Tgw1f4lnj032t3j313z0m7whh.jpg
  [21]: http://ww3.sinaimg.cn/large/0060lm7Tgw1f4lnjqxzzbj313z0m50ve.jpg
