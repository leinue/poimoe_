
module.exports = {
  init: function(mongoose) {

  	var Schema = mongoose.Schema;

    var userGroupsSchema = Schema({
      name: String,
      description: String,
      code: String,
      createdAt: {
  		  type: Date,
  		  default: Date.now
      },
      updatedAt: {
  		  type: Date,
  		  default: Date.now
      },
      rightsList: [{
        type: Schema.Types.ObjectId,
        ref: 'auths'
      }],
      isDeleted: {
    		type: Boolean,
    		default: false
      },
      deletedAt: {
  		  type: Date,
  		  default: Date.now
      }
    });

    userGroupsSchema.statics.findById = function(id, cb) {
      return this.find({
        _id: id,
        isDeleted: false
      }, cb);
    };

    userGroupsSchema.statics.findByCode = function(code, cb) {
      return this.find({
        code: code,
        isDeleted: false
      }, cb);
    };

    userGroupsSchema.statics.findAll = function(page, count, cb) {

      page = page == null ? 1 : page;
      count = count == null ? 20 : count;

      var skipFrom = (page * count) - count;

      return this.find({
        isDeleted: false
      }).sort('createdAt').populate('rightsList').skip(skipFrom).limit(count).exec(cb);

    };

    userGroupsSchema.statics.findAllRemoved = function(page, count, cb) {

      page = page == null ? 1 : page;
      count = count == null ? 20 : count;

      var skipFrom = (page * count) - count;

      return this.find({
        isDeleted: true
      }).sort('createdAt').skip(skipFrom).limit(count).exec(cb);

    };

    userGroupsSchema.statics._remove = function(id, cb) {

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

    userGroupsSchema.statics.update = function(id, obj, cb) {
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

    return userGroupsSchema;

  }
};
