const router = require("express").Router();

router.get("/about-us", (req, res) => {
  console.log("going to about us page");
  res.render("about", { layout: "layouts/main" });
});

module.exports = router;
