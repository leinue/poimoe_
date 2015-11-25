
module.exports = {
  init: function(mongoose) {

  	var Schema = mongoose.Schema;

    var userSchema = Schema({
      username: String,
      email: String,
      password: String,
      sex: String,
      photo: String,
      intro: String,
      region: String,
      // group: Schema.Types.ObjectId,
      createdAt: {
      	{
      		type: Date,
      		default: Date.now
      	}
      },
      updatedAt: {
      	{
      		type: Date,
      		default: Date.now
      	}
      },
      isBlocked: {
      	{
      		type: Boolean,
      		default: false
      	}
      },
      blockedAt: {
      	{
      		type: Date,
      		default: Date.now
      	}
      },
      isDeleted: {
      	{
      		type: Boolean,
      		default: false
      	}
      },
      deletedAt: {
      	{
      		type: Date,
      		default: Date.now
      	}
      }
    });     

    var user = mongoose.model('User', userSchema);

    return user;

  }
};

