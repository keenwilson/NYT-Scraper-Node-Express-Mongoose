var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
  username: { type: String, required: true },
  commentBody: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  articleId: { type: String, required: true }
});

module.exports = mongoose.model("Comment", schema);
