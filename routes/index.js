var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FROM INDEX.JS' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'CodeCollab - Google Docs for your code.' });
});

module.exports = router;
