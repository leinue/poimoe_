
module.exports = {
  init: function(mongoose) {

  	var Schema = mongoose.Schema;

    var authSchema = Schema({
      name: String,
      router: String,
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

    authSchema.statics.findById = function(id, cb) {
      return this.find({
        _id: id,
        isDeleted: false
      }, cb);
    };

    authSchema.statics.findByRouter = function(router, cb) {
      return this.find({
        router: router,
        isDeleted: false
      }, cb);
    };

    authSchema.statics.findAll = function(cb) {

      return this.find({
        isDeleted: false
      }).sort('createdAt').exec(cb);

    };

    authSchema.statics._remove = function(id, cb) {

      var query = {
        _id: id,
        isDeleted: false
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

    authSchema.statics.update = function(id, obj, cb) {
      var query = {
        _id: id,
        isDeleted: false
      };

      var options = {
        new: true
      };

      var update = obj;

      return this.findOneAndUpdate(query, update, options, cb);

    };

    return authSchema;

  }
};
