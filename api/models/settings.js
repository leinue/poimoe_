
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
        type: Schema.Types.Mixed,
        default: {}
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

    var settings = mongoose.model('settings', settingsSchema);

    return settings;

  }
};
