
module.exports = {
  init: function(mongoose) {

  	var Schema = mongoose.Schema;

    var replysSchema = Schema({
      user_id: Schema.Types.ObjectId,
      theme_id: Schema.Types.ObjectId,
      content: String,
      child: {
        type: [Schema.Types.Mixed],
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

    replysSchema.statics.findById = function(id, cb) {
      return this.find({
        _id: id,
        isDeleted: false
      }, cb);
    };

    replysSchema.statics.findByThemeId = function(id, cb) {
      return this.find({
        theme_id: id,
        isDeleted: false 
      }).sort('createdAt').exec(cb);

    };

    replysSchema.statics.findByUid = function(id, cb) {
      return this.find({
        user_id: id,
        isDeleted: false
      }, cb);
    };

    replysSchema.statics.findAll = function(page, count, cb) {
      page = page || 1;
      count = count || 20;
      var skipFrom = (page * count) - count;

      return this.find({
       isDeleted: false 
      }).sort('createdAt').skip(skipFrom).limit(count).exec(cb);
    };

    replysSchema.statics.findAllRemoved = function(page, count, cb) {
      page = page || 1;
      count = count || 20;
      var skipFrom = (page * count) - count;

      return this.find({
       isDeleted: true 
      }).sort('createdAt').skip(skipFrom).limit(count).exec(cb);
    };

    replysSchema.statics._remove = function(id, cb) {
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

    replysSchema.statics.updateChild = function(tid, cid, cb) {
      var query = {
        _id: id
      };

      var options = {
        new: true
      };

      var child = [];

      var update = {
        child: child,
        updatedAt: Date.now()
      };

      return this.findOneAndUpdate(query, update, options, cb);
    };

    var replys = mongoose.model('replys', replysSchema);

    //

    return replys;

  }
};
