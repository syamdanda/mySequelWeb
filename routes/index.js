var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var config = {
  'host': '',
  'port':  '',
  'user': '',
  'password': '',
  'database': ''
}
var connection;



/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'MySql Web' });
});

router.post('/home', function(req, res) {
	config.host = req.body.host;
	config.port = req.body.port;
	config.user = req.body.user;
	config.password = req.body.password;
	config.database = req.body.database;
	console.log(JSON.stringify(config, null, 2));
	connection = mysql.createConnection(config);
	connection.connect();
	console.log(req.body);
	connection.query("SELECT table_name FROM information_schema.tables where table_schema='your_database_name'", function (error, results, fields) {
	  if (error) throw error;
	  console.log('The solution is: ', results[0].solution);
	  connection.end();
	  res.render('home', { title: 'MySql Web' });
	});	
});



module.exports = router;
