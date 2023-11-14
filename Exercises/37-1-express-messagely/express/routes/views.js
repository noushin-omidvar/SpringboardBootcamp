const Router = require("express").Router;

const router = new Router();

router.get("/", (req, res) => {
  res.render("index.html");
});

router.get("/register", (req, res) => {
  return res.render("registration.html");
});

// GET route for rendering the login page
router.get("/login", (req, res) => {
  res.render("login.html");
});

module.exports = router;
