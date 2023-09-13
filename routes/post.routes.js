const router = require("express").Router();
const Post = require("../models/Post.model");
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");
const { isLoggedIn } = require("../middleware/route-guard");

// GET route to display form to create post

router.get("/post-create", isLoggedIn, (req, res, next) => {

    res.render("posts/create.hbs", { layout: "layouts/navbar" });
});

// POST route to create post
router.post(
    "/post-create",
    isLoggedIn,
    fileUploader.single("post-file-upload"),
    (req, res, next) => {
        const { _id } = req.session.currentUser;
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
                errorMessage: "Category, title and description must be filled in.",
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
            .then(() => res.redirect("/posts"))
            .catch(error => next(error));
    }
);

// GET route to display form to edit a post
router.get("/post/:postId/edit", isLoggedIn, (req, res, next) => {
    const { postId } = req.params;

    Post.findById(postId)
        .then((postToEdit) => {
            res.render("posts/edit.hbs", { layout: "layouts/navbar", post: postToEdit, postCategory: category });
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
        console.log("category: ", category)

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
        .then(() => res.redirect("/profile"))
        .catch((error) => next(error));
});

// GET route to display single post e.g. via profile or main post page
router.get("/post/:postId", isLoggedIn, (req, res) => {

    const { postId } = req.params;

    Post.findById(postId)
        .populate("author")
        .then((thePost) => {
            res.render("posts/post-details.hbs", { layout: "layouts/navbar", thePost });
        })
        .catch((error) => next(error));
});

// GET route to search all the posts
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
// GET route to display all the posts
router.get("/posts", isLoggedIn, (req, res, next) => {
    Post.find()
        .sort({ createdAt: -1 })
        .populate("author")
        .then((allPosts) => {
            res.render("posts/posts.hbs", { layout: "layouts/navbar", posts: allPosts });
        })
        .catch((error) => next(error));

});

module.exports = router;
