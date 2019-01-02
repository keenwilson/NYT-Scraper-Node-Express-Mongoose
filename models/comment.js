var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
  user: { type: String, required: true },
  body: { type: String, required: true },
  isLiked: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", schema);
