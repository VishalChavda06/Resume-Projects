const BlogPost = require("../models/BlogPost");

// Create a new blog post
const createBlogPost = async (req, res) => {
  const { title, content, author } = req.body;

  // Check if all fields are provided
  if (!title || !content || !author) {
    return res.send({ message: "All fields are required" });
  }

  // Create the blog post
  const newPost = await BlogPost.create(req.body);
  res.send(newPost);
};

// Get all blog posts
const getAllBlogPosts = async (req, res) => {
  const blogPosts = await BlogPost.find();
  res.send(blogPosts);
};

// Get a single blog post by ID
const getBlogPostById = async (req, res) => {
  const { id } = req.params;

  const blogPost = await BlogPost.findById(id);
  if (!blogPost) {
    return res.send({ message: "Blog post not found" });
  }

  res.send(blogPost);
};

// Update a blog post
const updateBlogPost = async (req, res) => {
  const { id } = req.params;

  const updatedPost = await BlogPost.findByIdAndUpdate(id,req.body,{new: true});

  if (!updatedPost) {
    return res.send({ message: "Blog post not found" });
  }

  res.send({ message: "Blog post updated successfully", post: updatedPost });
};

// Delete a blog post
const deleteBlogPost = async (req, res) => {
  const { id } = req.params;

  const deletedPost = await BlogPost.findByIdAndDelete(id);

  if (!deletedPost) {
    return res.send({ message: "Blog post not found" });
  }

  res.send({ message: "Blog post deleted successfully", post: deletedPost });
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
};
