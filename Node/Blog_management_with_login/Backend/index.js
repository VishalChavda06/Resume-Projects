const express=require("express");
const dbconnect = require("./config/db");
const userRouter = require("./routes/userRoutes");
const BlogPostRouter = require("./routes/blogPostRoutes");
const commentRouter = require("./routes/commentRoutes");

const app=express();

const cors = require("cors");
app.use(cors());


app.use(express.json());

app.use("/users",userRouter)

app.use("/blogPosts",BlogPostRouter)

app.use("/comments",commentRouter)

app.listen(5000, () => {
    console.log("App running at http://localhost:5000");
    dbconnect()
  });
  