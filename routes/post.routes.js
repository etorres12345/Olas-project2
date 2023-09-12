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

router.post("/posts/search", (req, res) => {
  const keyword = req.body.keyword;

  Post.find({ $text: { $search: keyword } })
    .then((posts) => {
      res.render("posts/posts.hbs", { posts });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});

module.exports = router;
