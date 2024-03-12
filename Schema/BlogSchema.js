const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      requried: [true,"title is required"]
    },
    discription: {
      type: String,
      requried: [true,"discription is required"]
    },
    image: {
      type: String,
      requried: [true,"image is required"]
    },
    Auther:{
      type:mongoose.Types.ObjectId,
      ref:"Auther",
      requried: [true,"user is required"]
      }
    
  }
);

// create a massage model based on schema
const blogModel = mongoose.model("Blog", BlogSchema);

// export the massage model and massageSchema
module.exports = { blogModel };
