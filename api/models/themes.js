
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

    var themes = mongoose.model('themes', themesSchema);

    return themes;

  }
};
