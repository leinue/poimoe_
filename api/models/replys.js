
module.exports = {
  init: function(mongoose) {

  	var Schema = mongoose.Schema;

    var replysSchema = Schema({
      user_id: Schema.Types.ObjectId,
      theme_id: Schema.Types.ObjectId,
      content: String,
      parent: {
        type: Schema.Types.ObjectId,
        default: []
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

    var replys = mongoose.model('replys', replysSchema);

    return replys;

  }
};
