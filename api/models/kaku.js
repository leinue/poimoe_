
module.exports = {
  init: function(mongoose) {

  	var Schema = mongoose.Schema;

    var kakuSchema = Schema({
      name: {
        type: String,
        default: ''
      },
      peopleLimit: {
        type: Number,
        default: 4
      },
      isLocked: {
        type: Boolean,
        default: false
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

    kakuSchema.statics.indexAll = function(page, count, cb) {
      page = page || 1;
      count = count || 10;
      var skipFrom = (page * count) - count;

      return this.find({
        isDeleted: false
      }).skip(skipFrom).limit(count).exec(cb);
    };

    kakuSchema.statics.findPeopleByRoomId = function(id, cb) {
      return this.findOne({
        isDeleted: false,
        _id: id
      }).exec(cb);
    };

    kakuSchema.statics.create = function() {

    };

    kakuSchema.statics.enter = function(obj, cb) {
      var roomId = obj.roomId;
      var peopleList = obj.peopleList; 

      return this.findOneAndUpdate({
        _id: roomId,
        isDeleted: false
      }, {
        people: peopleList
      }, {
        new: true
      }, cb);
    };

    kakuSchema.statics.leave = function() {
      var roomId = obj.roomId;
      var peopleList = obj.peopleList; 

      return this.findOneAndUpdate({
        _id: roomId,
        isDeleted: false
      }, {
        people: peopleList
      }, {
        new: true
      }, cb);
    };

    kakuSchema.statics.lock = function() {

    };

    kakuSchema.statics.unlock = function() {

    };

    return kakuSchema;

  }
};
