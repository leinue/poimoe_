
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
        select: '_id username photo posts',
        populate: {
          path: 'posts',
          select: '_id image',
          match: {
            isDeleted: false,
            limit: 3
          }
        }
      }).exec(cb);

    };

    relationsSchema.statics.getFollowingWithoutPopulate = function(uid, cb) {
      return this.find({
        user_id: uid
      }).select('follow').exec(cb);
    }

    relationsSchema.statics.updateFollower = function(obj, cb) {

      var user_id = obj.user_id;
      var follower = obj.follower;

      return this.findOneAndUpdate({
        user_id: user_id
      }, {
        follower: follower
      }, {
        new: true,
        upsert: true
      }, function(err, new_follower) {

        if(err) {
          cb(err, new_follower);
        }

        cb(err, new_follower);

      });

    };

    relationsSchema.statics.updateFollowing = function(obj, cb) {

      var user_id = obj.user_id;
      var unfollower = obj.unfollower;

      return this.findOneAndUpdate({
        user_id: user_id
      }, {
        follower: unfollower
      }, {
        new: true
      }, function(err, new_unfollower) {

        if(err) {
          cb(err, new_unfollower);
        }

        cb(err, new_unfollower);

      });

    };

    relationsSchema.statics.followHasId = function(uid, id_find, cb) {

      if(typeof id_find == 'string') {
        id_find = [id_find];
      }else {
        if(typeof id_find.length !== 'undefined') {
          id_find = id_find;
        }else {
          id_find = [id_find];
        }
      }

      if(uid === id_find[0]) {
        cb(false, [], false);
      }

      this.findOne({
        user_id: uid,
        follow: {
          '$in': id_find
        }
      }, function(err, u) {

        if(err) {
          cb(err, u);
        }

        if(u == null) {
          cb(err, u, false);
        }else {
          var followList = u.follow;

          if(typeof followList == 'undefined') {
            cb(err, u, false);
          }else {
            cb(err, u, followList.length > 0);
          }
        }

      });
    };

    relationsSchema.statics.followerHasId = function(uid, id_find, cb) {

      if(typeof id_find == 'string') {
        id_find = [id_find];
      }else {
        if(typeof id_find.length !== 'undefined') {
          id_find = id_find;
        }else {
          id_find = [id_find];
        }
      }

      if(uid === id_find[0]) {
        cb(false, [], false);
      }

      this.findOne({
        user_id: uid,
        follower: {
          '$in': id_find
        }
      }, function(err, u) {

        if(err) {
          cb(err, u);
        }

        if(u == null) {
          cb(err, u, false);
        }else {
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
