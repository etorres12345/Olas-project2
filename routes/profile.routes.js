const router = require("express").Router();
const { isLoggedOut } = require('../middleware/route-guard');
const User = require("../models/User.model");
const fileUploader = require('../config/cloudinary.config');

// router.get("/profile", isLoggedOut, (req, res) => {
//   res.render("profile-views/my-profile");
// });

router.get("/profile", isLoggedOut, async (req, res) => {
  try {
    const userId = req.session.user._id;
    const userPosts = await Post.find({ author: userId });
    const hasPosts = userPosts.length > 0;

    res.render("profile-views/my-profile", {
      user: req.session.user,
      userPosts: userPosts,
      hasPosts: hasPosts, 
    });
  } catch (error) {
    console.error(error);

  }
});

router.get("/profile/edit", isLoggedOut, (req, res) => {
  res.render("profile-views/my-profile");
});

router.post("/profile/edit", isLoggedOut, fileUploader.single("user-image"), async (req, res) => {
  try {
    const userId = req.session.user._id; 
    const updatedData = req.body; 
    const newImg = req.file ? req.file.path : undefined; 

    await User.findByIdAndUpdate(userId, {
      ...updatedData,
      avatar: newImg || req.session.user.avatar, 
    });

    res.redirect("/profile");
  } catch (error) {
    
    console.error(error);
    
  }
});

router.get("/profile/delete", (req, res) => {
  res.render("profile-views/my-profile");
});

  // should we add here a confirmation message or page?
router.post("/profile/delete", isLoggedOut, async (req, res) => {
  try {
    const userId = req.session.user._id; 
    const user = await User.findById(userId);

    if (!user) {
      return res.redirect("/profile");
    }

    // if user has post we can also delele them?

    await User.findByIdAndRemove(userId);

    req.session.destroy();

    res.redirect("/");
  } catch (error) {
    console.error(error);  
  }
});




module.exports = router;
