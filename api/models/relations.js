
module.exports = {
  init: function(mongoose) {

  	var Schema = mongoose.Schema;

    var relationsSchema = Schema({
      user_id: Schema.Types.ObjectId,
      follow: {
        type: [Schema.Types.ObjectId],
        default: []
      },
      follower: {
        type: [Schema.Types.ObjectId],
        default: []
      }
    });

    var relations = mongoose.model('relations', relationsSchema);

    return relations;

  }
};
