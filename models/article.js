var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
  imagePath: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: "No Description Available" },
  link: { type: String, required: true },
  isSaved: { type: Boolean, default: false },
  buttonStatus: { type: String, default: " Save " },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

module.exports = mongoose.model("Article", schema);
