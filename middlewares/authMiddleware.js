const jwt = require("jsonwebtoken");
const { AutherModel } = require("../Schema/AutherSchema");

// Middleware for token verification
const verifyToken = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Unauthorized token' });
    }
  };

// Is Admin 
const isAdmin = async(req, res, next) => {
    try {
        const user= await AutherModel.findById(req.author._id);
        if(user.role != 1){
            return res.status(401).send({
                success:false,
                message:"Unauthorized Access"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Not Admin" });
    }
};

module.exports = { verifyToken,isAdmin };
