const router = require("express").Router();
const Post = require("../models/Post.model");
const User = require("../models/User.model");
const fileUploader = require('../config/cloudinary.config');


// GET route to display form to create post
router.get('/post-create', (req, res, next) => {
    res.render('posts/create.hbs')
});

// GET route to display form to create post
router.post('/post-create', fileUploader.single('post-file-upload'), (req, res, next) => {
    const { _id } = req.session.currentUser;
    const { title, category, description } = req.body;
    const mediaUrl = req.file.path;

    Post.create({ author: _id, title, category, description, mediaUrl })
        .then(newPost => {
            // update user's posts array
            return User.findByIdAndUpdate(newPost.author, { $push: { posts: newPost._id } });
        })
        .then(() => res.redirect('/posts'))
        .catch(err => {
            console.log(`Err while creating the post in the DB: ${err}`);
            next(err);
        });
});

// GET route to display all the posts
router.get("/posts", (req, res, next) => {
    Post.find()
        .populate('author')
        .then(allPosts => {
            res.render('posts/posts.hbs', { posts: allPosts })
        })
        .catch(error => next(error));
});


module.exports = router;