const router = require("express").Router();
const Post = require("../models/Post.model");
const User = require("../models/User.model");

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile-views/my-profile");
});

router.get("/profile/create", (req, res) => {
  res.render("profile-views/create-profile");
});

router.post("/profile/create", (req, res) => {
  const { avatar, username, tallestWave, surfMantra } = req.body;
});

router.get("/profile/edit", (req, res) => {
  res.render("profile-views/edit-profile");
});

router.get("/profile/delete", (req, res) => {
  res.render("profile-views/delete-profile");
});

module.exports = router;
