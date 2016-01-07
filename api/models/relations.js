
module.exports = {
  init: function(mongoose) {

  	var Schema = mongoose.Schema;

    var relationsSchema = Schema({
      user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      follow: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
      }],
      follower: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
      }]
    });

    relationsSchema.statics.findByUid = function(uid, cb) {
      return this.find({
        user_id: uid
      }).populate({
        path: 'user_id follow follower'
      }).exec(cb);
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

    // var relations = mongoose.model('relations', relationsSchema);

    return relationsSchema  ;

  }
};
