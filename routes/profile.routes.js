const router = require("express").Router();
const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard");
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const fileUploader = require("../config/cloudinary.config");


// GET route to display only current user's posts
router.get("/profile", isLoggedIn, (req, res) => {
  const { _id } = req.session.currentUser;
  console.log("+++++ the user: ", req.session.currentUser);
  console.log("+++++ ID +++:", _id);
  User.findById(_id)
    .populate("posts")
    .then((user) => {
      // console.log("/The user from DB/:", user);
      res.render("profile-views/my-profile.hbs", { user });
    })
    .catch((error) => next(error));
});

// router.get("/profile", isLoggedIn, (req, res) => {
//   res.render("profile-views/my-profile");
// });

router.get("/profile/create", (req, res) => {
  res.render("profile-views/create-profile");
});

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

//   }
// });

// router.get("/profile/:id/edit", (req, res) => {
//   const {_id} = req.session.user;
//     console.log("----- the user id-----",_id)
//   res.render("profile-views/my-profile");
// });

router.post("/profile", fileUploader.single("user-image"), (req, res, next) => {
  const { _id } = req.session.currentUser;
  console.log("----- the user id-----", _id);
  const { username } = req.body;
  console.log("----- the user name-----", username);

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
