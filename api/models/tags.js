
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

    tagsSchema.statics._find = function(page, count, deleted, cb) {

      page = page == null ? 1 : page;
      count = count == null ? 20 : count;
      deleted = deleted == null ? false : deleted;

      var skipFrom = (page * count) - count;

      return this.find({
        isDeleted: deleted
      }).sort({
        createdAt: -1
      }).skip(skipFrom).limit(count).exec(cb);

    };

    tagsSchema.statics.findAll = function(page, count, cb) {
      return this._find(page, count, false, cb);
    };

    tagsSchema.statics.findAllRemoved = function(page, count, cb) {
      return this._find(page, count, true, cb);
    };

    tagsSchema.statics.search = function(name, page, count, cb) {

      page = page || 1;
      count = count || 10;

      var skipFrom = (page * count) - count;

      return this.find({
        name: new RegExp(name),
        isDeleted: false
      }).sort({
        createdAt: -1
      }).skip(skipFrom).limit(count).exec(cb);

    };

    tagsSchema.statics.searchSite = function(name, page, count, cb) {

      page = page || 1;
      count = count || 10;

      var skipFrom = (page * count) - count;

      return this.find({

      }).sort({
        createdAt: -1
      }).skip(skipFrom).limit(count).exec(cb);

    }

    tagsSchema.statics.findById = function(id, cb) {
      return this.find({
        _id: id,
        isDeleted: false
      },cb);
    };

    tagsSchema.statics._remove = function(id, cb){
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

    tagsSchema.statics.update = function(id, obj, cb) {
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

    var tags = mongoose.model('tags', tagsSchema);

    return tags;

  }
};
