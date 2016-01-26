
module.exports = {
  init: function(mongoose) {

  	var Schema = mongoose.Schema;

    var timelineSchema = Schema({
      user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      messageCount: {
        type: Number,
        default: 0
      },
      messageQueue: [{
        type: Schema.Types.ObjectId,
        ref: 'themes'
      }],
      personalMessageCount: {
        type: Number,
        default: 0
      },
      personalMessageQueue: [{
        operator: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
        targetUser: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
        targetTheme: {
          type: Schema.Types.ObjectId,
          ref: 'themes'
        },
        did: {
          type: String,
          default: 'repost' //repost || favourite
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }]
    });

    timelineSchema.statics.findMessageCount = function(uid, cb) {
      return this.findOne({
        user_id: uid
      }).select('messageCount').exec(cb);
    };

    timelineSchema.statics.findMessage = function(uid, cb) {
      return this.find({
        user_id: uid
      }).select('messageQueue').populate({
        path: 'messageQueue',
        match: {
          isDeleted: false,
          populate: {
            path: 'user_id tag_list',
            select: '_id email username photo favourites'
          }
        }
      }).exec(cb);
    };

    timelineSchema.statics.findPersonalMessageCount = function(uid, cb) {
      return this.findOne({
        user_id: uid
      }).select('personalMessageCount').exec(cb);
    };

    timelineSchema.statics.findPersonalMessage = function(uid, page, count, cb) {

      page = page || 1;
      count = count || 10;
      var skipFrom = (page * count) - count;

      return this.find({
        user_id: uid
      }).select('personalMessageQueue').populate({
        path: 'personalMessageQueue',
        match: {
          isDeleted: false
        },
        options: {
          skip: skipFrom,
          limit: count
        },
        populate: {
          path: 'operator targetUser targetTheme',
          match: {
            isDeleted: false
          },
          select: '-password -accessToken -blockedAt -deletedAt -createdAt -favourites -followerByMe -followedMe -posts'
        }
      }).exec(cb);
    };

    timelineSchema.statics.resetMessageCount = function(uid, cb) {
      return this.findOneAndUpdate({
        user_id: uid
      }, {
        messageCount: 0
      }, {
        new: true
      }, cb);
    };

    timelineSchema.statics.resetPersonalMessageCount = function(uid, cb) {
      return this.findOneAndUpdate({
        user_id: uid
      }, {
        personalMessageCount: 0
      }, {
        new: true
      }, cb);
    };

    timelineSchema.statics.resetMessageQueue = function(uid, cb) {
      return this.findOneAndUpdate({
        user_id: uid
      }, {
        messageQueue: []
      }, {
        new: true
      }, cb);
    };

    timelineSchema.statics.resetMessage = function(uid, cb) {
      return this.findOneAndUpdate({
        user_id: uid
      }, {
        messageQueue: [],
        messageCount: 0
      }, {
        new: true
      }, cb)
    };

    timelineSchema.statics.resetPersonalMessage = function(uid, cb) {
      return this.findOneAndUpdate({
        user_id: uid
      }, {
        personalMessageQueue: [],
        personalMessageCount: 0
      }, {
        new: true
      }, cb);
    };

    timelineSchema.statics.resetPersonalMessageQueue = function(uid, cb) {
      return this.findOneAndUpdate({
        user_id: uid
      }, {
        personalMessageQueue: []
      }, {
        new: true
      }, cb);
    };

    timelineSchema.statics.updateMessageQueue = function(obj, cb) {

      var uid = obj.uid;
      var message = obj.message;

      var _this = this;

      return _this.findOne({
        user_id: uid
      }).exec(function(err, timeline) {

        if(err) {
          cb(err, timeline);
        }

        if(timeline == null ){
          var mq = [message];
          var mc = 1;
        }else {
          var mq = timeline.messageQueue;
          mq.unshift(message);

          var mc = timeline.messageCount + 1;
        }

        _this.findOneAndUpdate({
          user_id: uid
        }, {
            messageCount: mc,
            messageQueue: mq
        }, {
          new: true,
          upsert: true
        }, cb);

      });
    };

    timelineSchema.statics.updatePersonalMessageQueue = function(obj, cb) {

      var uid = obj.uid;
      var pmq = obj.pmq;

      var _this = this;

      return _this.findOne({
        user_id: uid
      }, function(err, timeline) {

        if(err) {
          cb(err, timeline);
        }

        if(timeline == null) {
          var pmc = 1;
          var pmqList = [pmq];
        }else {
          var pmc = timeline.personalMessageCount + 1;
          var pmqList = timeline.personalMessageQueue;
          pmqList.unshift(pmq);
        }

        _this.findOneAndUpdate({
          user_id: uid
        }, {
          personalMessageCount: pmc,
          personalMessageQueue: pmqList
        }, {
          new: true,
          upsert: true
        }, cb);

      });

    };

    return timelineSchema;

  }
};
