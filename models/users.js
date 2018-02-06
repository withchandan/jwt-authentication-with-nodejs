const mongoose = require("mongoose");

mongoose.connect("mongodb://root:password@ds121118.mlab.com:21118/nodejs");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String
});

module.exports = mongoose.model("User", userSchema);

