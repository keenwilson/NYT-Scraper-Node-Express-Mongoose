var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
  user: { type: String, required: true },
  comment: { type: String, required: true },
  isLiked: { type: Boolean, default: false }
});

module.exports = mongoose.model("Comment", schema);
