var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'MySql Web' });
});

router.get('/home', function(req, res) {
  res.render('home', { title: 'MySql Web' });
});



module.exports = router;
