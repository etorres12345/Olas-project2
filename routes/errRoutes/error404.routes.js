const router = require("express").Router();

router.get("/error404", (req, res) => {
  res.render("not-found");
});

module.exports = router;
