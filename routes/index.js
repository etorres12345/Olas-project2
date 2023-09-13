const router = require("express").Router();
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

/* GET home page */
// router.get("/", (req, res) => {

//   // res.render("index");

//   res.render("index", isLoggedIn ? {layout: 'navbar'} :   {layout: 'main'} );
// });

router.get("/", (req, res) => {
  res.render("index", { layout: 'layouts/main' });
});




module.exports = router;