
var util = require('../util/index.js');
var tagsModel = require('./tags.js');
var relationsModel = require('./relations.js');
var timelineModel = require('./timeline.js');

module.exports = {

  userModel: undefined,
  themesModel: undefined,
  tagsModel: undefined,
  relationsModel: undefined,
  timelineModel: undefined,

  init: function(mongoose) {

  	var Schema = mongoose.Schema;

    var userSchema = Schema({
      username: String,
      email: String,
      password: String,
      sex: {
      	type: String,
      	default: ''
      },
      photo: {
      	type: String,
      	default: ''
      },
      intro: {
      	type: String,
      	default: ''
      },
      region: {
      	type: String,
      	default: '天朝'
      },
      group: Schema.Types.ObjectId,
      favourites: [{
        type: Schema.Types.ObjectId,
        ref: 'themes'
      }],
      posts: [{
        type: Schema.Types.ObjectId,
        ref: 'themes'
      }],
      favouritedCount: {
        type: Number,
        default: 0
      },
      followedByMe: {
        type: Boolean,
        default: false
      },
      followedMe: {
        type: Boolean,
        default: false
      },
      accessToken: {
        type: String,
        default: 'undefined'
      },
      tokenExpire: {
        type: Number,
        default: 77760000000 //15天
      },
      tokenCreatedAt: {
        type: Date,
        default: undefined
      },
      tokenDestoriedAt: {
        type: Date,
        default: undefined
      },
      createdAt: {
  		  type: Date,
  		  default: Date.now
      },
      updatedAt: {
  		  type: Date,
  		  default: Date.now
      },
      isBlocked: {
  		  type: Boolean,
  		  default: false
      },
      blockedAt: {
  		  type: Date,
  		  default: Date.now
      },
      isDeleted: {
    		type: Boolean,
    		default: false
      },
      deletedAt: {
  		  type: Date,
  		  default: Date.now
      }
    });

    userSchema.statics.findAll = function(page, count, cb) {
      page = page || 10;
      count = count || 20;

      var skipFrom = (page * count) - count;

      return this.find({
        isDeleted: false
      }).sort({
        createdAt: -1
      }).skip(skipFrom).limit(count).exec(cb);
    };

    userSchema.statics.findById = function(id, cb) {
      return this.find({
        _id: id,
        isDeleted: false
      },cb);
    };

    userSchema.statics.findByEmail = function(e, cb) {
    	return this.find({
    		email: e,
        isDeleted: false
    	}, cb);
    };

    userSchema.statics.findByUsername = function(e, cb) {
    	return this.find({
    		username: e,
        isDeleted: false
    	}, cb);
    };

    userSchema.statics.findByAccessToken = function(at, cb) {
      return this.find({
        accessToken: at,
        isDeleted: false
      },cb);
    };

    userSchema.statics.findFavouritesByAccessToken = function(at, cb) {
      return this.find({
        accessToken: at,
        isDeleted:false
      }).select({
        favourites: 1
      }).exec(cb);
    }

    userSchema.statics.findFavouritesByUid = function(uid, page, count, cb) {
      page = page || 1;
      count = count || 10;
      var skipFrom = (page * count) - count;

      return this.find({
        isDeleted: false,
        _id: uid
      }).select({
        favourites: 1
      }).populate({
        path: 'favourites',
        populate: {
          path: 'tag_list user_id',
          select: '_id email username photo'
        }
      }).sort({
        createdAt: -1
      }).skip(skipFrom).limit(count).exec(cb);
    };

    userSchema.statics.removeFavouritesByUid = function(uid, obj, cb) {

      if(obj.faCnt < 0) {
        obj.faCnt = 0;
      }

      return this.findOneAndUpdate({
        _id: uid,
        isDeleted: false
      }, {
        favourites: obj.fa,
        favouritedCount: obj.faCnt
      }, {
        new: true
      }, cb);
    };

    userSchema.statics.isFavouritesExist = function(o, fa, cb) {
      var flag = false;
      for (var i = 0; i < o.length; i++) {
        var curr = o[i];

        if(curr == fa) {
          flag = true;
          break;
        }
      };
      cb(flag);
    };

    userSchema.statics.addFavouriteByUid = function(uid, tid, cb) {

    };

    userSchema.statics.updateAccessToken = function(e, at, cAt, cb) {

      var createdAt = cAt;
      var destoriedAt = createdAt + 77760000000;

      var query = {
        email: e
      };

      var options = {
        new: true
      };

      var update = {
        accessToken: at,
        tokenCreatedAt: createdAt,
        tokenDestoriedAt: destoriedAt
      };

      return this.findOneAndUpdate(query, update, options, cb);

    };

    userSchema.statics.updatePosts = function(uid, posts, cb) {

      var query = {
        _id: uid
      };

      var options = {
        new: true
      };

      var update = {
        posts: posts
      };

      return this.findOneAndUpdate(query, update, options, cb);

    };

    userSchema.statics.rollbackAccessToken = function(e, cb) {

      var createdAt = undefined;
      var destoriedAt = undefined;

      var query = {
        accessToken: e
      };

      var options = {
        new: true
      };

      var update = {
        tokenCreatedAt: createdAt,
        tokenDestoriedAt: destoriedAt
      };

      return this.findOneAndUpdate(query, update, options, cb);

    };

    var themesSchema = Schema({
      user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      title: String,
      content: {
        type: String,
        default: ''
      },
      tag_list: [{
        type: Schema.Types.ObjectId,
        ref: 'tags'
      }],
      favourited: {
        type: Schema.Types.Boolean,
        default: false
      },
      image: {
        type: String,
        default: ''
      },
      favouritesCount: {
        type: Number,
        default: 0
      },
      repostCount: {
        type: Number,
        default: 0
      },
      repost: {
        type: Schema.Types.ObjectId,
        red: 'themes'
      },
      isRepost: {
        type: Schema.Types.Boolean,
        default: false
      },
      reposter: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
      }],
      reposterName: {
        type: String,
        default: ''
      },
      reposted: {
        type: Schema.Types.Boolean,
        default: false
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      },
      isDeleted: {
        type: Boolean,
        default: false
      },
      deletedAt: {
        type: Date,
        default: Date.now
      }
    });

    themesSchema.statics.findById = function(id, cb) {
      return this.find({
        _id: id,
        isDeleted: false
      }).populate({
        path: 'user_id',
        select: '_id username email photo'
      }).populate({
        path: 'tag_list',
        select: '_id name description'
      }).populate({
        path: 'user_id',
        select: '_id username email photo',
        populate: 'reposter tag_list user_id'
      }).populate('repost').exec(cb);
    };

    themesSchema.statics.search = function(name, page, count, cb) {

      page = page || 1;
      count = count || 20;
      var skipFrom = (page * count) - count;

      return this.find({
        content: new RegExp(name),
        isDeleted: false,
        isRepost: false
      }).populate({
        path: 'tag_list',
        select: '_id name description'
      }).populate({
        path: 'user_id',
        select: '_id username email photo'
      }).sort({
        createdAt: -1
      }).skip(skipFrom).limit(count).exec(cb);

    };

    themesSchema.statics.findByUid = function(uid, page, count, cb) {
      page = page || 1;
      count = count || 20;
      var skipFrom = (page * count) - count;

      return this.find({
        user_id: uid,
        isDeleted: false
      }).populate({
        path: 'user_id',
        select: '-accessToken -password'
      }).populate('tag_list').populate({
        path: 'reposter',
        select: '-accessToken -password'
      }).populate({
        path: 'repost'
      }).sort({
        createdAt: -1
      }).skip(skipFrom).limit(count).exec(cb);
    };

    themesSchema.statics.findAll = function(page, count, cb) {
      page = page || 1;
      count = count || 20;
      var skipFrom = (page * count) - count;

      return this.find({
       isDeleted: false 
      }).populate('user_id').populate('tag_list').populate('reposter').populate('repost').sort({
        createdAt: -1
      }).skip(skipFrom).limit(count).exec(cb);
    };

    themesSchema.statics.getHotThemes = function(cb) {

      var count = 6;
      return this.find({
        isDeleted: false
        // isRepost: false
      }).sort({
        favouritesCount: -1,
        repostCount: -1
      }).populate('user_id').limit(count).exec(cb);

    };

    themesSchema.statics.getHotThemesByTagId = function(tags, cb) {

      var tagCnt = 3;//counting from zero
      var _this = this;

      var result = [];

      tags.forEach(function(tag, key) {

        var tagId = tag._id;
        var citeCnt = tag.citeCount;
        var name = tag.name;

        var tmp = {};

        _this.find({
          isDeleted: false,
          tag_list: {
            '$in': [tagId]
          },
          isRepost: false
        }).sort({
          favouritesCount: -1
        }).limit(4).select('_id image').exec(function(err, themes) {

          if(err) {
            cb(err, themes);
          }

          tmp.tagId = tagId;
          tmp.names = name;
          tmp.themes = themes;
          result.push(tmp);

          if(key === tagCnt) {
            cb(err, result);
          }

        });

      });

    };

    themesSchema.statics.findAllRemoved = function(page, count, cb) {
      page = page || 1;
      count = count || 20;
      var skipFrom = (page * count) - count;

      return this.find({
       isDeleted: true
      }).populate('user_id').populate('tag_list').sort({
        createdAt: -1
      }).skip(skipFrom).limit(count).exec(cb);
    };

    themesSchema.statics._remove = function(id, cb) {
      var query = {
        _id: id
      };

      var options = {
        new: true
      };

      var update = {
        isDeleted: true,
        deletedAt: Date.now()
      };

      return this.findOneAndUpdate(query, update, options, cb);
    };

    themesSchema.statics.update = function(id, obj, cb) {
      var query = {
        _id: id
      };

      var options = {
        new: true
      };

      var update = obj;

      return this.findOneAndUpdate(query, update, options, cb);
    };

    var tagsSchema = tagsModel.init(mongoose);
    var relationsSchema = relationsModel.init(mongoose);
    var timelineSchema = timelineModel.init(mongoose);

    this.userModel = util.cacheMongooseModel(mongoose, userSchema, 'users', this.userModel);
    this.themesModel = util.cacheMongooseModel(mongoose, themesSchema, 'themes', this.themesModel);
    this.tagsModel = util.cacheMongooseModel(mongoose, tagsSchema, 'tags', this.tagsModel);
    this.relationsModel = util.cacheMongooseModel(mongoose, relationsSchema, 'relations', this.relationsModel);
    this.timelineModel = util.cacheMongooseModel(mongoose, timelineSchema, 'timeline', this.timelineModel);

    var _this = this;

    return {
      users: _this.userModel,
      themes: _this.themesModel,
      tags: _this.tagsModel,
      relations: _this.relationsModel
    };

  }
};
