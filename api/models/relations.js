
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

    relationsSchema.statics.findByUid = function(uid, page, count, cb) {

      page = page || 1;
      count = count || 10;
      var skipFrom = (page * count) - count;

      return this.find({
        user_id: uid
      }).populate({
        path: 'user_id follow follower',
        populate: {
          path: 'posts'
        },
        select: '_id username photo posts'
      }).exec(cb);

    };

    relationsSchema.statics.followHasId = function(uid, id_find, cb) {
      this.findOne({
        user_id: uid,
        follow: {
          '$in': [id_find]
        }
      }, function(err, u) {

        if(err) {
          cb(err, u);
        }

        if(u == null) {
          cb(err, u, false);
        }else {
          if(u.length === 0) {
            cb(err, u, false);
          }

          var followList = u.follow;

          if(typeof followList == 'undefined') {
            cb(err, u, false);
          }else {
            cb(err, u, followList.length > 0);
          }
        }

      });
    };

    return relationsSchema;

  }
};
