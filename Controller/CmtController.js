const { CommentModel } = require("../Schema/CmtSchema");

const Comment = async (req, res) => {
    try {
        // Destructure fields from the request body
        const { name, blogId, comments, date } = req.body;

        // Validate that all required fields exist and are not empty
        if (!(name && blogId && comments && date)) {
            console.log("All fields are compulsory");
            return res.status(400).send({ status: false, message: "All fields are compulsory" });
        } else {
            // Save the comment in the database
            const comment = await CommentModel.create({ name, blogId, comments, date });
            return res.status(201).json(comment);
        }
    } catch (error) {
        console.error("Error occurred:", error.message);
        return res.status(500).send({ status: false, message: "Internal Server Error" });
    }
};

//Gett All Comments from DataBase
const GetAllComments = async (req, res) => {
    try {
      const CommentData = await CommentModel.find();
      console.log(CommentData);
      return res.status(201).json(CommentData);
    } catch (error) {
      res.status(500).send({ msg: "Something went wrong" });
    }
  };
module.exports = { Comment,GetAllComments };
