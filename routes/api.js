var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var query;
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

router.get('/tableInfo/:tableName', function(req, res) {
	connection = mysql.createConnection(config);
	connection.connect();
	query = "SELECT COLUMN_NAME, ORDINAL_POSITION FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '" + config.database + "' AND TABLE_NAME ='" + req.params.tableName + "'";
	console.log('query ::: ', query);
	connection.query(query, function (error, results, fields) {
	  if (error) throw error;
	  console.log(JSON.stringify(results, null, 2));
	  connection.end();
	  var response = {
	  	'title': 'MySql Web',
	  	'status': 'SUCCESS',
	  	'result': results
	  };
	  console.log(JSON.stringify(results, null, 2));
	  res.json(response);
	});
});



module.exports = router;
