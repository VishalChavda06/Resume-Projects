const {Router} = require("express");
const {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
} = require("../controllers/blogPostController");
const BlogPostRouter = Router();

BlogPostRouter.post("/", createBlogPost);

BlogPostRouter.get("/", getAllBlogPosts);

BlogPostRouter.get("/:id", getBlogPostById);

BlogPostRouter.patch("/:id", updateBlogPost);

BlogPostRouter.delete("/:id", deleteBlogPost);

module.exports = BlogPostRouter;
