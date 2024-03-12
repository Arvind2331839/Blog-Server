const mongoose=require('mongoose')

const AutherSchema=new mongoose.Schema({
    firstName:{
        type: String,
        requried: [true,"firstName is required"]
      },
    lastName:{
        type: String,
        requried: [true,"lastName is required"]
      },
    email:{
        type: String,
        requried: [true,"email is required"]
      },
    //  role: {
    //     type: String,
    //     enum: ['user', 'admin', 'F-150', 'Silverado']
    //   },
    password:{
        type: String,
        requried: [true,"password is required"]
      },
    confirmPassword:{
        type: String,
        requried: [true,"confirmPassword is required"]
      },
    blogs: [{
        type: mongoose.Types.ObjectId,
        ref: "Blog",
       }]
   })


// create a massage model based on schema
const AutherModel=mongoose.model('Auther',AutherSchema)


// export the massage model and massageSchema
module.exports={AutherModel}

