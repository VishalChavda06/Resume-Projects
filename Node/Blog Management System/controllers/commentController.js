const BlogPost = require("../models/BlogPost");
const Comment = require("../models/Comment");

// Create a new comment
const createComment = async (req, res) => {
  const { content, author, blogPost } = req.body;

  // Validate required fields
  if (!content || !author || !blogPost) {
    return res.send({ message: "All fields are required." });
  }

  // Check if the blog post exists
  const blogExists = await BlogPost.findById(blogPost);
  if (!blogExists) {
    return res.send({ message: "Blog post not found." });
  }

  // Create the comment
  const newComment = await Comment.create(req.body);
  res.send(newComment);
};

// Get all comments for a specific blog post
const getCommentsByBlogPost = async (req, res) => {
  const { blogPostId } = req.params;

  // Fetch comments for the given blog post
  const comments = await Comment.find({ blogPost: blogPostId }).populate("author", "name email");
  res.send(comments);
};

// Delete a comment
const deleteComment = async (req, res) => {
  const { id } = req.params;

  // Find and delete the comment
  const deletedComment = await Comment.findByIdAndDelete(id);
  if (!deletedComment) {
    return res.send({ message: "Comment not found." });
  }

  res.send(deletedComment);
};

module.exports = {
  createComment,
  getCommentsByBlogPost,
  deleteComment,
};
