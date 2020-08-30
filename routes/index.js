const express = require('express');
const router = express.Router();
const pages = require("../data/pages.json")
const {checkCredentials} = require("../bin/loginMagister")
pages.forEach(page => {
  router.get("/" + page.url, (req, res) => {
    res.render(page.loc || page.url, {title: page.title})
  })
});
router.post("/api/login", (req, res) => {
  console.log(req.body.data)
  checkCredentials(req.body.data).then(d => {
    res.json(d)
  }).catch(err => {
    console.error(err);
    res.json(400,err)
  })
})
router.post("/login", (req, res) => {
  res.render("login", {title: "Javascript Error", error: "Please enable javascript to continue this site"})
})
module.exports = router;
