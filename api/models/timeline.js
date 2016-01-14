
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
      }]
    });

    return timelineSchema;

  }
};
