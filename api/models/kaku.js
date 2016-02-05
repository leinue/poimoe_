
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
      }).populate({
        path: 'people creator',
        select: '_id username photo'
      }).skip(skipFrom).limit(count).select('').exec(cb);
    };

    kakuSchema.statics.findPeopleByRoomId = function(id, cb) {
      return this.findOne({
        isDeleted: false,
        _id: id
      }).exec(cb);
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

    kakuSchema.statics.leave = function(obj, cb) {
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

    kakuSchema.statics.lock = function(id, cb) {
      return this.findOneAndUpdate({
        _id: id,
        isDeleted: false
      }, {
        isLocked: false
      }, {
        new: true
      }, cb);      
    };

    kakuSchema.statics.unlock = function(obj, cb) {
      var roomId = obj.room;
      var passport = obj.passport

      return this.findOneAndUpdate({
        _id: roomId,
        isDeleted: false
      }, {
        isLocked: true,
        passport: passport
      }, {
        new: true
      }, cb);
    };

    kakuSchema.statics.abort = function(roomId, cb) {
      return this.findOneAndUpdate({
        _id: roomId,
        isDeleted: false
      }, {
        isDeleted: true
      }, {
        new: true
      }, cb);
    };

    kakuSchema.statics.alterName = function(obj, cb) {
      return this.findOneAndUpdate({
        _id: obj.room,
        isDeleted: false
      }, {
        name: obj.name
      }, {
        new: true
      }, cb);
    };

    kakuSchema.statics.alterPassport = function(obj, cb) {
      return this.findOneAndUpdate({
        _id: obj.room,
        isDeleted: false
      }, {
        passport: obj.passport
      }, {
        new: true
      }, cb);
    };

    kakuSchema.statics.alterPeopleLimit = function() {
      return this.findOneAndUpdate({
        _id: obj.room,
        isDeleted: false
      }, {
        peopleLimit: obj.peopleLimit
      }, {
        new: true
      }, cb);
    };

    return kakuSchema;

  }
};
