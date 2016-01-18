
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
      }).select('messageQueue').exec(cb);
    };

    timelineSchema.statics.findPersonalMessageCount = function(uid, cb) {
      return this.findOne({
        user_id: uid
      }).select('personalMessageCount').exec(cb);
    };

    timelineSchema.statics.findPersonalMessage = function(uid, cb) {
      return this.find({
        user_id: uid
      }).select('personalMessageQueue').exec(cb);
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
      }, cb)
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

    return timelineSchema;

  }
};
