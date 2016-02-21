
module.exports = {
  init: function(mongoose) {

  	var Schema = mongoose.Schema;

    var tagsSchema = Schema({
      name: String,
      description: {
        type: String,
        default: ''
      },
      citeCount: {
        type: Number,
        default: 0
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

    tagsSchema.statics.updateCiteCount = function(tagList, add, cb) {

      add = add || true;

      var _this = this;
      var tagCount = tagList.length - 1;

      if(tagCount < 0) {
        cb(false, null, true);
      }else {
        tagList.forEach(function(tagId, key) {

          _this.findOne({
            _id: tagId,
            isDeleted: false
          }, function(err, tag) {

            if(err) {
              cb(err, tag, false);
            }

            if(add) {
              var cnt = tag.citeCount + 1;
            }else {
              var cnt = tag.citeCount - 1;
            }

            _this.findOneAndUpdate({
              _id: tag._id,
              isDeleted: false
            }, {
              citeCount: cnt
            }, {
              new: true
            }, function(err, tagNew) {

              if(key === tagCount) {
                cb(err, tagNew, true);                
              }

            });

          });

        });
      }

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
      this.search(name, page, count, cb);
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

    tagsSchema.statics.getHotTags = function(cb) {
      return this.find({
        isDeleted: false
      }).sort({
        citeCount: -1
      }).select('_id name citeCount').limit(4).exec(cb);
    }

    // var tags = mongoose.model('tags', tagsSchema);

    return tagsSchema;

  }
};
