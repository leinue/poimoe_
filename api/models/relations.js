
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

    relationsSchema.statics.findByUid = function(uid, cb) {
      return this.find({
        user_id: uid
      },cb);
    };

    relationsSchema.statics.hasId = function(uid, id_find, cb) {
      this.findByUid(uid, function(err, u) {

        if(err) {
          cb(err, u);
        }

        if(u.length === 0) {
          cb(err, u, false);
        }
 
        var followList = u.follow;

        for (var i = 0; i < followList.length; i++) {
          var curr = followList[i];
          if(curr === id_find) {
            cb(err, u, true);
            break;
          }
        };

      });
    };

    var relations = mongoose.model('relations', relationsSchema);

    return relations;

  }
};
