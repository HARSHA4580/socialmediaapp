const Post = require('../models/Post');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    console.error("Create Post Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "username")
      .populate("comments.userId", "username");
    res.status(200).json(posts);
  } catch (err) {
    console.error("Get Posts Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Like/Unlike a post
exports.likePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const likedIndex = post.likes.findIndex(id => id.toString() === userId);
    if (likedIndex === -1) post.likes.push(userId);
    else post.likes.splice(likedIndex, 1);

    const updatedPost = await post.save();

    const populatedPost = await Post.findById(req.params.id)
      .populate("userId", "username")
      .populate("comments.userId", "username");

    res.status(200).json(populatedPost);
  } catch (err) {
    console.error("Like Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add comment
exports.commentPost = async (req, res) => {
  try {
    const { userId, comment } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ userId, text: comment });
    await post.save();

    const populatedPost = await Post.findById(req.params.id)
      .populate("userId", "username")
      .populate("comments.userId", "username");

    res.status(200).json(populatedPost);
  } catch (err) {
    console.error("Comment Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
