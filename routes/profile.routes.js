const router = require("express").Router();
const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard");
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const fileUploader = require("../config/cloudinary.config");


router.get("/profile", (req, res) => {
  res.render("profile-views/my-profile", { layout: "layouts/navbar", user: req.session.currentUser });
});

// router.get("/profile", isLoggedOut, async(req, res) => {
//   try {
//     const username = req.query.username;
//     const avatar = req.query.avatar;
//     const userId = req.session.user._id;
//     // const userPosts = Post.find({ author: userId });
//     const hasPosts = userPosts.length > 0;

//     res.render("profile-views/my-profile", {
//       user: req.session.user,
//       username: username,
//       avatar: avatar,
//       userPosts: userPosts,
//       hasPosts: hasPosts,
//     });
//   } catch (error) {
//     console.error(error);
//   }
// });

// router.get("/profile", isLoggedOut, async (req, res) => {
//   try {
//     const userId = req.session.user._id;
//     const userPosts = await Post.find({ author: userId });
//     const hasPosts = userPosts.length > 0;

//     res.render("profile-views/my-profile", {
//       user: req.session.user,
//       userPosts: userPosts,
//       hasPosts: hasPosts,
//     });
//   } catch (error) {
//     console.error(error);


  User.findById(_id)
    .populate("posts")
    .then((user) => {
      let hasPosts;
      if (user.posts.length > 0) {
        hasPosts = true;
        console.log("Yeessssss")
      }
      res.render("profile-views/my-profile.hbs", { user, hasPosts });
    })
    .catch((error) => next(error));
});

// router.get("/profile/:id/edit", (req, res) => {
//   const {_id} = req.session.user;
//     console.log("----- the user id-----",_id)
//   res.render("profile-views/my-profile");
// });

router.post("/profile", isLoggedIn, fileUploader.single("user-image"), (req, res, next) => {
  const { _id } = req.session.currentUser;
  const { username } = req.body;

  const avatar = req.file ? req.file.path : undefined;

  User.findByIdAndUpdate(_id, { username, avatar }, { new: true })

    // avatar: newImg || req.session.user.avatar,
    .then((user) => {
      req.session.currentUser = user;
      res.redirect("/profile");
    })

    .catch((error) => next(error));
});

// router.post("/profile/delete", isLoggedOut, async (req, res) => {
//   try {
//     const userId = req.session.user._id;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.redirect("/profile");
//     }

//     // if user has post we can also delele them?

//     await User.findByIdAndRemove(userId);

//     req.session.destroy();

//     res.redirect("/");
//   } catch (error) {
//     console.error(error);
//   }
// });

module.exports = router;
