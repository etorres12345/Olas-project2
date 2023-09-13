const router = require("express").Router();
const Post = require("../models/Post.model");
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");
const { isLoggedIn } = require("../middleware/route-guard");

// GET route to display form to create post

router.get("/post-create", isLoggedIn, (req, res, next) => {
  res.render("posts/create.hbs",  { layout: "layouts/navbar"} );
  
});

// POST route to create post
router.post(
  "/post-create",
  isLoggedIn,
  fileUploader.single("post-file-upload"),
  (req, res, next) => {
    const { _id } = req.session.currentUser;
    console.log("+++++ ID:", _id);
    const { title, category, description } = req.body;

    let mediaUrl;
    if (req.file) {
      mediaUrl = req.file.path;
    } else {
      mediaUrl = null;
    }
    // make sure users fill all mandatory fields:
    if (!title || !category || !description) {
      res.render("posts/create.hbs", {
        errorMessage: "Category, title and descritpion must be filled in.",
      });
      return;
    }

    Post.create({ author: _id, title, category, description, mediaUrl })
      .then((newPost) => {
        // update user's posts array
        return User.findByIdAndUpdate(newPost.author, {
          $push: { posts: newPost._id },
        });
      })
      //TODO: or take user back to their own list of posts instead?
      .then(() => res.redirect("/posts"))
      .catch((error) => next(error));
  }
);

// GET route to display form to edit a post
router.get("/post/:postId/edit", isLoggedIn, (req, res, next) => {
  const { postId } = req.params;

  Post.findById(postId)
    .then((postToEdit) => {
      res.render("posts/edit.hbs", { layout: "layouts/navbar", post: postToEdit });
    })
    .catch((error) => next(error));
});

// POST route to edit post
router.post(
  "/post/:postId/edit",
  isLoggedIn,
  fileUploader.single("post-file-upload"),
  (req, res, next) => {
    const { postId } = req.params;
    const { title, category, description, existingMedia } = req.body;

    let mediaUrl;
    if (req.file) {
      mediaUrl = req.file.path;
    } else {
      mediaUrl = existingMedia;
    }

    Post.findByIdAndUpdate(
      postId,
      { title, category, description, mediaUrl },
      { new: true }
    )
      .then((updatedPost) => res.redirect(`/post/${updatedPost.id}`))
      .catch((error) => next(error));
  }
);

// POST route to delete a post
router.post("/post/:postId/delete", isLoggedIn, (req, res, next) => {
  const { postId } = req.params;

  Post.findByIdAndDelete(postId)
    //TODO: or take user back to their own list of posts instead?
    .then(() => res.redirect("/posts"))
    .catch((error) => next(error));
});

// GET route to display single post e.g. via profile or main post page
router.get("/post/:postId", isLoggedIn, (req, res) => {
  const { postId } = req.params;

  Post.findById(postId)
    .populate("author")
    .then((thePost) => {
      res.render("posts/post-details.hbs",  { layout: "layouts/navbar", thePost });
    })
   .catch((error) => next(error));
});

// GET route to display only current user's posts
router.get("/posts/user/:id", (req, res) => {
  const { _id } = req.session.currentUser;
  console.log("+++++ the user: ", req.session.currentUser);
  console.log("+++++ ID +++:", _id);
  // posts/user/65005b04c40770270a18e809
  User.findById(_id)
    .populate("posts")
    .then((user) => {
      // console.log("/The user from DB/:", user);
      res.render("profile-views/my-profile.hbs",  { layout: "layouts/navbar", user });
    })
    .catch((error) => next(error));
});

// GET route to display all the posts

router.post("/posts/search", isLoggedIn, (req, res) => {
  const keyword = req.body.keyword;

  Post.find({ $text: { $search: keyword } })
    .then((posts) => {
      console.log("Found this!");
      res.render("posts/posts.hbs", { posts });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});

router.get("/posts", isLoggedIn, (req, res, next) => {
  Post.find()
    .populate("author")
    .then((allPosts) => {
      res.render("posts/posts.hbs", { layout: "layouts/navbar", posts: allPosts });
    })
    .catch((error) => next(error));
});

module.exports = router;
