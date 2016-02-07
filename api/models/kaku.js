
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
      chatting: [{
        sender: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
        content: {
          type: String,
          default: ''
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
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
      }).skip(skipFrom).limit(count).populate({
        path: 'chatting',
        options: {
          skip: skipFrom,
          limit: count
        },
        populate: {
          path: 'sender',
          select: '_id username photo'
        }
      }).exec(cb);
    };

    kakuSchema.statics.findPeopleByRoomId = function(id, cb) {
      return this.findOne({
        isDeleted: false,
        _id: id
      }).populate({
        path: 'people creator',
        select: '_id username photo'
      }).populate({
        path: 'chatting',
        options: {
          skip: 0,
          limit: 10,
        },
        populate: {
          path: 'sender',
          select: '_id username photo'
        }
      }).exec(cb);
    };

    kakuSchema.statics.enter = function(obj, cb) {
      var roomId = obj.roomId;
      var peopleList = obj.peopleList; 

      var _this = this;

      return this.findOneAndUpdate({
        _id: roomId,
        isDeleted: false
      }, {
        people: peopleList
      }, {
        new: true,
        select: '-chatting'
      }, function(err, newRoom) {

          if(err) {
            cb(err, newRoom);
          }

          _this.findOne({
            _id: roomId,
            isDeleted: false
          }).populate({
            path: 'chatting',
            options: {
              limit: 10
            },
            populate: {
              path: 'sender',
              select: '_id username photo'
            }
          }).populate({
            path: 'people creator',
            select: '_id username photo'
          }).exec(cb);

      });
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
        new: true,
        select: '-chatting'
      }, cb);
    };

    kakuSchema.statics.lock = function(id, cb) {
      return this.findOneAndUpdate({
        _id: id,
        isDeleted: false
      }, {
        isLocked: false
      }, {
        new: true,
        select: '-chatting'
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
        new: true,
        select: '-chatting'
      }, cb);
    };

    kakuSchema.statics.abort = function(roomId, cb) {
      return this.findOneAndUpdate({
        _id: roomId,
        isDeleted: false
      }, {
        isDeleted: true
      }, {
        new: true,
        select: '-chatting'
      }, cb);
    };

    kakuSchema.statics.alterName = function(obj, cb) {
      return this.findOneAndUpdate({
        _id: obj.room,
        isDeleted: false
      }, {
        name: obj.name
      }, {
        new: true,
        select: '-chatting'
      }, cb);
    };

    kakuSchema.statics.alterPassport = function(obj, cb) {
      return this.findOneAndUpdate({
        _id: obj.room,
        isDeleted: false
      }, {
        passport: obj.passport
      }, {
        new: true,
        select: '-chatting'
      }, cb);
    };

    kakuSchema.statics.alterPeopleLimit = function() {
      return this.findOneAndUpdate({
        _id: obj.room,
        isDeleted: false
      }, {
        peopleLimit: obj.peopleLimit
      }, {
        new: true,
        select: '-chatting'
      }, cb);
    };

    kakuSchema.statics.storeMessage = function(obj, cb) {

      var roomToSend = obj.room;
      var chattingDetail = {
        sender: obj.sender,
        content: obj.content
      };

      var _this = this;

      return _this.findOne({
        _id: roomToSend,
        isDeleted: false
      }).exec(function(err, room) {

        if(err) {
          cb(err, room);
        }

        var chat = room.chatting;
        chat.unshift(chattingDetail);

        _this.findOneAndUpdate({
          _id: roomToSend,
          isDeleted: false
        }, {
          chatting: chat
        }, {
          new: true
        }, function(err, newRoom) {

          if(err) {
            cb(err, newRoom);
          }

          _this.findOne({
            _id: roomToSend,
            isDeleted: false
          }).populate({
            path: 'chatting',
            options: {
              limit: 1
            },
            populate: {
              path: 'sender',
              select: '_id username photo'
            }
          }).select('chatting').exec(cb);

        });

      });
    };

    kakuSchema.statics.getMessage = function(room, page, count, cb) {

      page = page || 1;
      count = count || 10;
      var skipFrom = (page * count) - count;

      return this.findOne({
        _id: room,
        isDeleted: false
      }).select('chatting').populate({
        path: 'chatting',
        options: {
          skip: skipFrom,
          limit: count
        },
        populate: {
          path: 'sender',
          select: '_id username photo'
        }
      }).exec(cb);

    };

    return kakuSchema;

  }
};
