const router = require("express").Router();

router.get("/profile", (req, res) => {
  res.render("profile-views/my-profile");
});

router.get("/profile/create", (req, res) => {
  res.render("profile-views/create-profile");
});

router.get("/profile/edit", (req, res) => {
  res.render("profile-views/edit-profile");
});

router.get("/profile/delete", (req, res) => {
  res.render("profile-views/delete-profile");
});

router.get("/profile/create-post", (req, res) => {
  res.render("profile-views/create-post");
});

router.get("/profile/edit-post", (req, res) => {
  res.render("profile-views/edit-post");
});

router.get("/profile/delete-post", (req, res) => {
  res.render("profile-views/delete-post");
});

module.exports = router;
