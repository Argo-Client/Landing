var express = require('express');
var router = express.Router();
var pages = require("../data/pages.json")
/* GET home page. */
pages.forEach(page => {
  router.get("/" + page.url, (req, res) => {
    res.render(page.loc, {title: page.title})
  })
});
module.exports = router;
