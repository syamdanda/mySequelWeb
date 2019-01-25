var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/*var config = {
  'host': '',
  'port':  '',
  'user': '',
  'password': '',
  'database': ''
}
var connection;*/



/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'MySql Web' });
});

router.post('/home', function(req, res) {
	/*config['host'] = req.body['host'];
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
	});	*/
	
	var results = [
			{'table_name' : 'ACCEPTED_DOCUMENTS'},
			{'table_name' : 'COMPANY'},
			{'table_name' : 'COMPANY_ADDRESSES'},
			{'table_name' : 'DEPARTMENTS'},
			{'table_name' : 'DESIGNATIONS'},
			{'table_name' : 'ENTRY_POINTS'},
			{'table_name' : 'MEETINGS'},
			{'table_name' : 'MEETING_APPROVALS'},
			{'table_name' : 'MEETING_APPROVAL_WORKFLOW'},
			{'table_name' : 'MEETING_CO_VISITORS'},
			{'table_name' : 'MEETING_INVITATIONS'},
			{'table_name' : 'MEETING_ROOMS'},
			{'table_name' : 'MEETING_VISITORS'},
			{'table_name' : 'MODULES_M'},
			{'table_name' : 'NOTIFICATIONS'},
			{'table_name' : 'PAYMENT_PROCESS'},
			{'table_name' : 'PERMISSIONS_M'},
			{'table_name' : 'ROLES'},
			{'table_name' : 'ROLE_PERMISSIONS'},
			{'table_name' : 'SUBSCRIPTION_PLAN'},
			{'table_name' : 'SUB_MODULES_M'},
			{'table_name' : 'SUPPORT_TICKETS'},
			{'table_name' : 'TOKEN'},
			{'table_name' : 'USERS'},
			{'table_name' : 'USER_ROLES'},
			{'table_name' : 'VISITORS'},
			{'table_name' : 'VISITOR_BELONGINGS'},
			{'table_name' : 'VISITOR_DOCS'},
			{'table_name' : 'VISITOR_VEHICLES'},
			{'table_name' : 'WORKSPACE_DETAILS'}			 
	];
	var response = {
		'title': 'MySql Web',
		'status': 'SUCCESS',
		'result': results
	};
	res.render('home', response);
});

router.get('/tableInfo', function(req, res) {
  res.render('index', { title: 'MySql Web' });
});



module.exports = router;
