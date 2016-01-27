
module.exports = {
  init: function(mongoose) {

  	var Schema = mongoose.Schema;

    var kakuRoomSchema = Schema({
      name: {
        type: String,
        default: ''
      },
      peopleLimit: {
        type: Number,
        default: 0
      },
      passport: {
        type: String,
        default: ''
      },
      creator: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      people: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
      }],
      isDeleted: {
        type: Boolean,
        default: false
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
    });

    var kakuSchema = Schema({
      user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      room: [kakuRoomSchema],
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
      }
    });

    return kakuSchema;

  }
};
