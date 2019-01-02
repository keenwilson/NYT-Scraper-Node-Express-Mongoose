var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
  imagePath: { type: String, required: true },
  // Define  an index and a unique index on 'title' property
  title: { type: String, required: true, index: true, unique: true },
  description: { type: String, default: "No Description Available" },
  link: { type: String, required: true },
  isSaved: { type: Boolean, default: false },
  buttonStatus: { type: String, default: " Save " },
  date: { type: Date, default: Date.now },
  section: { type: String },
  comments: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

module.exports = mongoose.model("Article", schema);
