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
	config['host'] = req.body['host'];
	config['port'] = req.body['portNumber'];
	config.user = req.body.userName;
	config.password = req.body.password;
	config.database = req.body.dbName;
	console.log(req.body);
	console.log(JSON.stringify(config, null, 2));
	connection = mysql.createConnection(config);
	connection.connect();
	
	connection.query("SELECT table_name FROM information_schema.tables where table_schema='"+ config.database +"'", function (error, results, fields) {
	  if (error) throw error;
	  console.log(JSON.stringify(results, null, 2));
	  connection.end();
	  var response = {
	  	'title': 'MySql Web',
	  	'status': 'SUCCESS',
	  	'result': results
	  };
	  res.render('home', response);
	});	
});



module.exports = router;
