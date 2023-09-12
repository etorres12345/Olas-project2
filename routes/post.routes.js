const router = require("express").Router();
const Post = require("../models/Post.model");

// GET route to display form to create post
router.get('/post-create', (req, res, next) => {
    res.render('posts/create.hbs')
});

// GET route to display form to create post
/* <form action="/post-create" method="POST"> */
router.post('/post-create', (req, res, next) => {
    // const { author } = req.session.currentUser
    const { title, category, description } = req.body;
    console.log("req body:", req.body);

    Post.create({ title, category, description })
        .then(newPost => {
            // when the new post is created, the user needs to be found and its posts updated with the
            // ID of newly created post
            // return User.findByIdAndUpdate(author._id, { $push: { posts: newPost._id } });
            console.log("===Post details===:", newPost)
        })
        .then(() => res.redirect('/posts')) // if everything is fine, redirect to list of posts
        .catch(err => {
            console.log(`Err while creating the post in the DB: ${err}`);
            next(err);
        });
});



// GET route to display all the posts
router.get("/posts", (req, res, next) => {
    Post.find()
        // .populate('author')
        .then(allPosts => {
            // console.log("All posts in DB:", allPosts);
            res.render('posts/posts.hbs', { posts: allPosts })
        })
        .catch(error => next(error));
});


module.exports = router;