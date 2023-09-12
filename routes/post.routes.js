const router = require("express").Router();
const Post = require("../models/Post.model");

// GET route to display form to create post
router.get("/post-create", (req, res, next) => {
  res.render("posts/create.hbs");
});

// GET route to display all the posts
router.get("/posts", (req, res, next) => {
  Post.find()
    // .populate('author')
    .then((allPosts) => {
      console.log("All posts in DB:", allPosts);
      res.render("posts/posts.hbs", { posts: allPosts });
    })
    .catch((error) => next(error));
});

router.get("/posts/filter/:category", (req, res) => {
  const selectedCategory = req.params.category;

  Post.find({ category: selectedCategory })
    .then((filteredPosts) => {
      res.render("posts/filtered-posts", {
        posts: filteredPosts,
        selectedCategory: selectedCategory,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error fetching filtered posts.");
    });
});

router.post("/posts/filter", (req, res) => {
  const selectedCategory = req.body.category;
  const filteredPosts = [];
  res.render("posts/filtered-posts", {
    posts: filteredPosts,
    selectedCategory,
  });
});

module.exports = router;
