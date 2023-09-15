const router = require("express").Router();

router.get("/error500", (req, res) => {
  res.render("error",  { layout: "layouts/main" });
});

module.exports = router;
