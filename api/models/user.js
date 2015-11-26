
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

    var user = mongoose.model('users', userSchema);

    return user;

  }
};

