const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requried: [true,"title is required"]
    },
    blogId: {
      type: String,
      requried: [true,"discription is required"]
    },
    comments: {
      type: String,
      requried: [true,"image is required"]
    },
    date: {
        type: String,
        requried: [true,"image is required"]
      }
    }
);

// create a massage model based on schema
const CommentModel = mongoose.model("Comment", CommentSchema);

// export the massage model and massageSchema
module.exports = { CommentModel };
