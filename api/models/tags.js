
module.exports = {
  init: function(mongoose) {

  	var Schema = mongoose.Schema;

    var tagsSchema = Schema({
      name: String,
      description: {
        type: String,
        default: ''
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

    tags.statics._find = function(page, count, deleted, cb) {

      page = page == null ? 1 : page;
      count = count == null ? 20 : count;
      deleted = deleted == null ? false : deleted;

      var skipFrom = (page * count) - count;

      this.find({
        isDeleted: deleted
      }).sort('createdAt').skip(skipFrom).limit(count).exec(cb);

    };

    tags.statics.findAll = function(page, count, cb) {
      this._find(page, count, false, cb);
    };

    tags.statics.findAllRemoved = function(page, count, cb) {
      this._find(page, count, true, cb);
    };

    tags.statics.findById = function(id, cb) {
      return this.find({
        _id: id,
        isDeleted: false
      },cb);
    };

    tags.statics._remove = function(id, cb){
      var query = {
        _id: id
      };

      var options = {
        new: true
      };

      var update = {
        isDeleted: true,
        deletedAt: Date.now
      };

      return this.findOneAndUpdate(query, update, options, cb);
    };

    tags.statics.update = function(obj, cb) {
      var query = {
        _id: id
      };

      var options = {
        new: true
      };

      var update = obj;

      return this.findOneAndUpdate(query, update, options, cb);
    };

    var tags = mongoose.model('tags', tagsSchema);

    return tags;

  }
};
