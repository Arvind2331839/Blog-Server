const   mongoose  = require("mongoose");
const { blogModel } = require("../Schema/BlogSchema");
const { AutherModel } = require("../Schema/AutherSchema");
const  populate  = require("dotenv");

const createBlog = async (req, res) => {
  //get all data from
  const { title, discription,image,Auther } = req.body;
  console.log(req.body)
  try {
    
    //all data should exists
    if (!(title && discription && image && Auther)) {
      console.log("All feilds are compalsory");
      return res
        .status(400)
        .send({ status: false, messsage: "All feilds are compalsory" });
    }

 //check if Auther already exists - email
 const existingAuther = await AutherModel.findById(Auther);
 if (!existingAuther) {
   return res.status(400).send({status: false,messsage: "Unable to find Auther"});
 } 

// Creating a new blog object using the blogModel
const newBlog = new blogModel({ title, discription, image, Auther});
const session = await mongoose.startSession();
session.startTransaction();
await newBlog.save({ session });
existingAuther.blogs.push(newBlog);
await existingAuther.save({ session });
await session.commitTransaction();
await newBlog.save();

//save the Auther in DB
//  const Blog = await blogModel.create({title, discription,image, Auther});
 
return res.status(201).json(await newBlog.save());
   } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};

//Get One Blog from DataBase
const GetAutherBlog = async (req, res) => {
  try {
    const id = req.params.id;

    // const {AutherBlog} = await blogModel.findById(id).populate('blogs');
    const  AutherBlog  = await blogModel.find({Auther:`${id}`});
    console.log(AutherBlog)
       return res.status(201).send(AutherBlog)
 } catch (error) {
    console.log(error);
    return res.status(201).send({message:"error in Auther Blog"});
  }
};

//Gett All Blog from DataBase
const GetAllBlog = async (req, res) => {
  try {
    const AutherData = await blogModel.find();
    console.log(AutherData);
    return res.status(201).json(AutherData);
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong" });
  }
};

// UpdateBlog
const UpdateBlog =async(req,res)=>{
  try{
const id = req.params.id; 
// console.log(id)
const AutherExist =await blogModel.findById(id)
if(!AutherExist){
return res.status(500).send({msg: "Auther not found" });
}
const updatedData = await blogModel.findByIdAndUpdate(id,req.body,{new:true})
res.status(200).json(updatedData);
console.log("Data updated Sucessfully")
// console.log(updatedData)
 return
  }catch(error){
console.log(error)
  }
}

// Delete Blog

const DeleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
   
    // Find and delete the blog by ID, and populate the "Auther" field
    const blog = await blogModel.findByIdAndDelete(id).populate("Auther");

    // Check if the blog exists before proceeding
    if (!blog) {
      return res.status(404).send({ success: false, msg: "Blog not found" });
    }

    // Remove the blog from the Auther's array
    await blog.Auther.blogs.pull(blog)

    // Save the Auther to persist the removal of the blog from the Auther's array
    await blog.Auther.save();

    return res.status(200).send({ success: true, msg: "Successfully deleted" });
    
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, msg: "Internal Server Error" });
  }
};

const GetsingleBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
console.log(blogId)
    // const {AutherBlog} = await blogModel.findById(id).populate('blogs');
    const  singleBlog  = await blogModel.findById(blogId);
    console.log(singleBlog)
       return res.status(201).send(singleBlog)
 } catch (error) {
    console.log(error);
    return res.status(201).send({message:"error in Auther Blog"});
  }
};
module.exports = { createBlog,GetAutherBlog, GetAllBlog, UpdateBlog, DeleteBlog, GetsingleBlog};
