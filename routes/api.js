const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const { Client } = require('pg');
const _ = require('underscore');
var query;
var config = {
  'host': '',
  'port':  '',
  'user': '',
  'password': '',
  'database': '',
  'dbServer': ''
};
var connection;



/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'MySql Web' });
});

router.post('/home', function(req, res) {
	config['host'] = req.body['host'];
	config['port'] = parseInt(req.body['portNumber']);
	config.user = req.body.userName;
	config.password = req.body.password;
	config.database = req.body.dbName;
	config.dbServer = req.body['dbServer'];

	if ('MySQL' == config.dbServer) {
		connection = mysql.createConnection(config);
		query = "SELECT table_name FROM information_schema.tables where table_schema='"+ config.database +"'";
	} else {
		connection = new Client(config);
		query = "SELECT table_name FROM information_schema.tables WHERE table_type='BASE TABLE' AND table_schema='public'";
	}

	connection.connect();		
	
	connection.query(query, function (error, results, fields) {
	  connection.end();
	  if (error) {
	  	console.log('errors exists');
	  	var response = {
	  		'title': 'MySql Web',
	  		'status': 'ERROR',
	  		'error': error
	  	};
	  	console.log(JSON.stringify(error, null, 2));
	  	res.json(response);
	  } else {
	  	var response = {
	  		'title': 'MySql Web',
	  		'status': 'SUCCESS',
	  		'result': 'MySQL' == config.dbServer ? results : results.rows
	  	};
	  	res.render('home', response);
	  }	  
	});
});

router.get('/tableInfo/:tableName', function(req, res) {
	if ('MySQL' == config.dbServer) {
		connection = mysql.createConnection(config);
		query = "SELECT COLUMN_NAME, ORDINAL_POSITION FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '" + config.database + "' AND TABLE_NAME ='" + req.params.tableName + "'";
	} else {
		connection = new Client(config);
		query = "SELECT COLUMN_NAME  FROM information_schema.columns WHERE  TABLE_NAME ='" + req.params.tableName + "'";
	}
	connection.connect();
	
	console.log('query ::: ', query);
	connection.query(query, function (error, results, fields) {
		connection.end();
		if (error) {
			console.log('errors exists');
			var response = {
				'title': 'MySql Web',
				'status': 'ERROR',
				'error': error
			};
			console.log(JSON.stringify(error, null, 2));
			res.json(response);
		} else { 
			var response = {
				'title': 'MySql Web',
				'status': 'SUCCESS',
				'result': 'MySQL' == config.dbServer ? results : results.rows
			};
			console.log(JSON.stringify(results, null, 2));
			res.json(response);
		}	  
	});
});

router.post('/execute/', function(req, res) {
	connection = mysql.createConnection(config);
	connection.connect();
	var queryObj = req.body;
	query = queryObj.query.replace(';', '');
	console.log('query ::: ', query);
	connection.query(query, function (error, results, fields) {
		connection.end();
		if (error)  {
			console.log('errors exists');
			var response = {
				'title': 'MySql Web',
				'status': 'ERROR',
				'error': error
			};
			console.log(JSON.stringify(error, null, 2));
			res.json(response);
		} else {
			var response = {
				'title': 'MySql Web',
				'status': 'SUCCESS',
				'fields': _.pluck(fields, 'name'),
				'result': results
			};
			//console.log(JSON.stringify(results, null, 2));
			res.json(response);
		}		
	});
});


module.exports = router;
