const User = require("../models/User");

// Register a new user (Sign Up)
const signup = async (req, res) => {
  const { email, password, username } = req.body;

  // Check if user already exists
  const Exist = await User.findOne({ email: email });
  if (Exist) {
    console.log("User already exists:", Exist);
    return res.send({ message: "User already exists" });
  }

  const data = await User.create({ email, password, username });
  console.log("New user created:", data);
  res.send(data);
};

// User login
const login = async (req, res) => {
  console.log("Login route hit");
  const { email, password } = req.body;

  // Check if user exists
  const Exist = await User.findOne({ email });
  console.log("User found:", Exist);

  if (!Exist) {
    return res.send({ message: "User not found" });
  }

  // Compare passwords 
  if (Exist.password !== password) {
    return res.send({ message: "Incorrect password" });
  }

  res.send({ message: "Login successful", user: Exist });
};

module.exports = { signup, login };
