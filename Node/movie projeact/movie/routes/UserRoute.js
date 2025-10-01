const { Router } = require("express");


const { signupUser, loginUser, getAllUsers, deleteUser } = require("../controller/UserController");

const UserRoute = Router();

UserRoute.post("/signup", signupUser);
UserRoute.post("/login", loginUser);
UserRoute.get("/", getAllUsers);
UserRoute.delete("/delete/:id", deleteUser);

module.exports = UserRoute;
