
module.exports = {
  init: function(mongoose) {

  	var Schema = mongoose.Schema;

    var userGroupsSchema = Schema({
      name: String,
      description: String,
      createdAt: {
  		  type: Date,
  		  default: Date.now
      },
      updatedAt: {
  		  type: Date,
  		  default: Date.now
      },
      rightsList: {
        type: Schema.Types.Mixed,
        default: {}
      },
      isDeleted: {
    		type: Boolean,
    		default: false
      },
      deletedAt: {
  		  type: Date,
  		  default: Date.now
      }
    });

    var userGroups = mongoose.model('userGroups', userGroupsSchema);

    return userGroups;

  }
};
