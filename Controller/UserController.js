const { hashPassword, comparePasswords, generateAuthToken,verifyToken } = require("../helper/authHelper");
const { AutherModel } = require("../Schema/AutherSchema");

const Register = async (req, res) => {
  try {
    //get all data from
    const { firstName, lastName, email, password, confirmPassword, blogs } = req.body;
    console.log(req.body);
    //all data should exist
    if (!(firstName && lastName && email && password && confirmPassword)) {
      console.log("All fields are compulsory");
      return res.status(400).send({ status: false, message: "All fields are compulsory" });
    }

    //check if user already exists - email
    const existingAuther = await AutherModel.findOne({ email });
    if (existingAuther) {
      return res.status(400).send({
        status: false,
        message: "User already exists with this email",
      });
    } else if (password !== confirmPassword) {
      console.log("Password and confirmPassword are not the same");
    } else {
      // encrypt the password
      const myEncPassword = await hashPassword  (password);
      const myconfirmPassword = await hashPassword(confirmPassword);

      //save the user in DB
      const user = await AutherModel.create({
        firstName,
        lastName,
        email,
        password: myEncPassword,
        confirmPassword: myconfirmPassword,
        blogs,
      });
      return res.status(201).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    // Get data from the frontend
    const { email, password } = req.body;

    // Validation check
    if (!email || !password) {
      return res.status(400).send("Please provide both email and password");
    }

    // Find user in DB
    const auther = await AutherModel.findOne({ email });

    // Check if user exists and password matches
    if (auther && (await comparePasswords(password, auther.password))) {
      // Generate a JWT token
      const token = generateAuthToken(auther._id, auther.email);

      // Send the token in the response headers
      res.setHeader('Authorization', `Bearer ${token}`);

      // Send the user data without the password and the token
      const autherWithoutPasswordAndToken = { ...auther.toObject() };
      delete autherWithoutPasswordAndToken.password;
      delete autherWithoutPasswordAndToken.token;

      res.status(200).json({
        auther: autherWithoutPasswordAndToken,
        token,
      });
    } else {
      res.status(401).send("Incorrect email or password");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

const GetOneAuther = async (req, res) => {
  try {
    const id = req.params.id;
    const existingUser = await AutherModel.findById(id).populate('blogs');

    if (!existingUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(existingUser);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

const TestController= async (req, res) => {
 console.log("Protected routes")
 res.send("Protected routes responce")
};

// Middleware function to verify JWT tokens
const Protected = (req, res) => {
  res.json({ message: 'Protected route', user: req.user });
};

module.exports = { Register, login, GetOneAuther,TestController,Protected};
