const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateAuthToken = (userId, email) => {
  return jwt.sign({ id: userId, email },process.env.JWT_SECRET,{expiresIn: "30d",});
};

module.exports = {
  hashPassword,
  comparePasswords,
  generateAuthToken,
};
