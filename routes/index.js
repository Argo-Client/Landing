var express = require('express');
var router = express.Router();
var pages = require("../data/pages.json")

pages.forEach(page => {
  router.get("/" + page.url, (req, res) => {
    res.render(page.loc || page.url, {title: page.title})
  })
});
router.post("/api/login", (req, res) => {
  res.end("Loggedin")
  console.log(req.body.data)
})
router.post("/login", (req, res) => {
  res.render("login", {title: "Javascript Error", error: "Please enable javascript to continue this site"})
})
module.exports = router;
