
module.exports = {
  init: function(mongoose) {

  	var Schema = mongoose.Schema;

    var themesSchema = Schema({
      user_id: Schema.Types.ObjectId,
      title: String,
      content: {
        type: String,
        default: ''
      },
      tag_list: {
        type: [Schema.types.ObjectId],
        default: []
      },
      image: {
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

    themesSchema.statics.findById = function(id, cb) {
      return this.find({
        _id: id,
        isDeleted: false
      }, cb);
    };

    themesSchema.statics.findAll = function(page, count, cb) {
      page = page || 1;
      count = count || 20;
      var skipFrom = (page * count) - count;

      return this.find({
       isDeleted: false 
      }).sort('createdAt').skip(skipFrom).limit(count).exec(cb);
    };

    themesSchema.statics.findAllRemoved = function(page, count, cb) {
      page = page || 1;
      count = count || 20;
      var skipFrom = (page * count) - count;

      return this.find({
       isDeleted: false 
      }).sort('createdAt').skip(skipFrom).limit(count).exec(cb);
    };

    var themes = mongoose.model('themes', themesSchema);

    return themes;

  }
};
