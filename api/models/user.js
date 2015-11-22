
module.exports = {
  init: function(mongoose) {
    var userSchema = mongoose.Schema({
      name: String
    });     

    var user = mongoose.model('user', userSchema);

    return user;

  }
};

