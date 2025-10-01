const {Router } = require("express");
const { createComment, getCommentsByBlogPost, deleteComment } = require("../controllers/commentController");


const commentRouter = Router();

commentRouter.post("/",createComment);

commentRouter.get("/:blogPostId", getCommentsByBlogPost);

commentRouter.delete("/:id", deleteComment);

module.exports = commentRouter;
