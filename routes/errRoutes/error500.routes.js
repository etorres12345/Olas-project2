const router = require("express").Router();

router.get("/error500", (req, res) => {
  res.render("error");
});

module.exports = router;
