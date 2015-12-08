
module.exports = {
  init: function(mongoose) {

  	var Schema = mongoose.Schema;

    var settingsSchema = Schema({
      title: {
        type: String,
        default: 'poimoe'
      },
      logo: {
        type: String,
        default: ''
      },
      footer: {
        type: String,
        default: 'poimoe'
      },
      other: {
        type: String,
        default: ''
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

    settingsSchema.statics.findAll = function(cb) {
      return this.find(cb);
    };

    // settingsSchema.statics.add = function(, cb) {

    // };

    // settingsSchema.statics.modify = function(, cb) {
    //   this.getAll();

    //   var createdAt = Date.now();

    //   var query = {
    //     email: e
    //   };

    //   var options = {
    //     new: true
    //   };

    //   var update = {
    //     createdAt: createdAt
    //   };

    //   return this.findOneAndUpdate(query, update, options, cb);
    // };

    var settings = mongoose.model('settings', settingsSchema);

    return settings;

  }
};
