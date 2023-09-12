const router = require("express").Router();
const { isLoggedOut } = require('../middleware/route-guard');
const User = require("../models/User.model");
// const fileUploader = require('../../config/cloudinary.config');

router.get("/profile", isLoggedOut, (req, res) => {
  res.render("profile-views/my-profile");
});

// router.get("/profile/:profileId", isLoggedOut, (req, res) => {
//   const {userId} = req.params;

//   User.findById(userId) 
//     .then(theUser => res.render("profile-views/my-profile", {user: theUser}))
//     .catch(error => {
//       next(error);
//     });
// });

// router.post("/profile",  isLoggedOut, (req, res, next) => {
//   // const {_id} = currentUser;
//   const { username, avatar } = req.body;

//   User.create({ username, avatar } )
  
// });


// router.get("/profile/edit", isLoggedOut, (req, res) => {
//   res.render("profile-views/edit-profile");
// });

// router.post("/profile/edit", isLoggedOut, fileUploader.single("user-image"), (req, res, next) => {
//   const newImg = req.file.path;   
//   const {_id} = currentUser;

// })

router.get("/profile/delete", (req, res) => {
  res.render("profile-views/delete-profile");
});

// router.get("/profile/create-post", (req, res) => {
//   res.render("profile-views/create-post");
// });

// router.get("/profile/edit-post", (req, res) => {
//   res.render("profile-views/edit-post");
// });

// router.get("/profile/delete-post", (req, res) => {
//   res.render("profile-views/delete-post");
// });

module.exports = router;
