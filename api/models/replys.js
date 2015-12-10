
module.exports = {
  init: function(mongoose) {

  	var Schema = mongoose.Schema;

    var replysSchema = Schema({
      user_id: Schema.Types.ObjectId,
      theme_id: Schema.Types.ObjectId,
      content: String,
      child: {
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

    replysSchema.statics.findById = function() {

    };

    replysSchema.statics.findByThemeId = function() {

    };

    replysSchema.statics.findByUid = function() {

    };

    replysSchema.statics._remove = function() {

    };

    replysSchema.statics.add = function() {

    };

    replysSchema.statics.replyTo = function() {

    };

    var replys = mongoose.model('replys', replysSchema);

    return replys;

  }
};
