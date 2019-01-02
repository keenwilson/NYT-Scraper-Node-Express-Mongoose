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
  // `comments` is an object that stores a Comment id
  // The ref property links the ObjectId to the Comment model
  // This allows us to populate the Article with an associated Comment
  comments: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the Note model
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Article", schema);
