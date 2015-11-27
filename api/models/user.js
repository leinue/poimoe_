
module.exports = {
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
      // group: Schema.Types.ObjectId,
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

    userSchema.statics.findByEmail = function(e, cb) {
    	return this.find({
    		email: e
    	}, cb);
    };

    userSchema.statics.findByUsername = function(e, cb) {
    	return this.find({
    		username: e
    	}, cb);
    };

    userSchema.statics.findByAccessToken = function(at, cb) {
      return this.find({
        accessToken: at
      },cb);
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

    var user = mongoose.model('users', userSchema);

    return user;

  }
};
