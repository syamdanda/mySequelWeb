var selectedTable;
var query;
const reqHandler = new ReqHandler();
var hotGrid;

function selectTable(tableName) {
	$('.tablesList li').removeClass('active');
	$('#'+tableName).addClass('active');
	selectedTable = tableName;	
	getTableInfo();
}

function getTableInfo() {

	reqHandler.get({url: '/tableInfo/' + selectedTable}, function(response) {
		console.log(JSON.stringify(response, null, 2));
		if (response && response.result && response.result.length) {
			var dataObject = [];
			var columnsObject = [];
			var colHeaders = [];
			var colWidths = [];
			var hotElement = document.querySelector('#resultsGrid');
			var lastIndex = response.result.length;
			for (i=0;i<lastIndex;i++) {
				var colName =response.result[i].COLUMN_NAME;
				columnsObject.push({data: colName, type: 'text', className: 'htRight', readOnly: true});
				colHeaders.push(colName);
				colWidths.push(colName.length * 11);
				if (i == lastIndex - 1) {
					var hotSettings = {
						'data': dataObject,
						'columns': columnsObject,
						'stretchH': 'all',
						'width': 1070,
						'autoWrapRow': true,
						'height': 300,
						'rowHeaders': true,
						'colHeaders': colHeaders,
						'manualColumnResize': true,
						'colWidths': colWidths
					};
					hotGrid = new Handsontable(hotElement, hotSettings);
					$('#msgSpan').addClass('success');
					$('#msgSpan').html('Table information retrieved successfully.');
					$("#msgSpan").fadeIn( 300 ).delay( 2500 ).fadeOut( 400 );
				}
			}
		} else {
			$('#msgSpan').addClass('failure');
			$('#msgSpan').html('Failed to retrieve table information');
			$("#msgSpan").fadeIn( 300 ).delay( 2500 ).fadeOut( 400 );
		}
	});	
}

function loadResultsGrid(hotSettings) {
	var hotElement = document.querySelector('#resultsGrid');
	hotGrid = new Handsontable(hotElement, hotSettings);
}

function submitQuery() {
	query = $('.queryEditor').html();
	query.replaceAll('<div>', '').replaceAll('</div>', '').replaceAll('<span>', '').replaceAll('</span>', '');	
	reqHandler.post({url: '/execute', data: {'query': query }}, function(response) {
		console.log(JSON.stringify(response, null, 2));
		if ('SUCCESS' == response.status) {
			if (response.result instanceof Array) {
				if (response.result && response.result.length) {
					var dataObject = [];
					var columnsObject = [];
					var colHeaders = _.keys(response.result[0]);
					var colWidths = [];
					var lastIndex = colHeaders.length;
					for (i=0;i<lastIndex;i++) {
						columnsObject.push({data: colHeaders[i], type: 'text', className: 'htLeft', readOnly: true});
						if (i == lastIndex - 1) {
							var hotSettings = {
								'data': response.result,
								'columns': columnsObject,
								'stretchH': 'all',
								'width': 1070,
								'autoWrapRow': true,
								'height': 300,
								'rowHeaders': true,
								'colHeaders': colHeaders
							};
							loadResultsGrid(hotSettings);
							$('#msgSpan').addClass('success');
							$('#msgSpan').html('Query executed successfully and no. of records retrieved are: ' + response.result.length);
							$("#msgSpan").fadeIn( 300 ).delay( 2500 ).fadeOut( 400 );
						}
					}
				} else {
					// no records found, but display the headers
					var dataObject = [];
					var columnsObject = [];
					var colHeaders = response.fields;
					var colWidths = [];
					var lastIndex = colHeaders.length;
					for (i=0;i<lastIndex;i++) {
						columnsObject.push({data: colHeaders[i], type: 'text', className: 'htLeft', readOnly: true});
						if (i == lastIndex - 1) {
							var hotSettings = {
								'data': response.result,
								'columns': columnsObject,
								'stretchH': 'all',
								'width': 1070,
								'autoWrapRow': true,
								'height': 300,
								'rowHeaders': true,
								'colHeaders': colHeaders
							};
							loadResultsGrid(hotSettings);
							$('#msgSpan').addClass('success');
							$('#msgSpan').html('Query executed successfully, but do not match any records.');
							$("#msgSpan").fadeIn( 300 ).delay( 2500 ).fadeOut( 400 );
						}
					}
				}
			} else {
				// change in rows count
				var dataObject = [];
				var columnsObject = [];
				var colHeaders = _.keys(response.result);
				var colWidths = [];
				var lastIndex = colHeaders.length;
				for (i=0;i<lastIndex;i++) {
					columnsObject.push({data: colHeaders[i], type: 'text', className: 'htLeft', readOnly: true});
					if (i == lastIndex - 1) {
						var hotSettings = {
							'data': [response.result],
							'columns': columnsObject,
							'stretchH': 'all',
							'width': 1070,
							'autoWrapRow': true,
							'height': 300,
							'rowHeaders': true,
							'colHeaders': colHeaders
						};
						loadResultsGrid(hotSettings);
						$('#msgSpan').addClass('success');
						$('#msgSpan').html('Query executed successfully.');
						$("#msgSpan").fadeIn( 300 ).delay( 2500 ).fadeOut( 400 );
					}
				}
			}
		} else {
			//error while executing query
			var dataObject = [];
			var columnsObject = [];
			var colHeaders = _.keys(response.error);
			var lastIndex = colHeaders.length;
			for (i=0;i<lastIndex;i++) {
				columnsObject.push({data: colHeaders[i], type: 'text', className: 'htLeft', readOnly: true});
				if (i == lastIndex - 1) {
					var hotSettings = {
						'data': [response.error],
						'columns': columnsObject,
						'stretchH': 'all',
						'width': 1070,
						'autoWrapRow': true,
						'height': 300,
						'rowHeaders': true,
						'colHeaders': colHeaders,
						'manualColumnResize': true
					};
					loadResultsGrid(hotSettings);
					$('#msgSpan').addClass('failure');
					$('#msgSpan').html('Query execution failed, please check the syntax.');
					$("#msgSpan").fadeIn( 300 ).delay( 2500 ).fadeOut( 400 );
				}
			}
		}
	});
}


function cancleQuery() {
	$('.queryEditor').html('');
}

function selectQuery() {
	if (selectedTable) {
		reqHandler.get({url: '/tableInfo/' + selectedTable}, function(response) {
			console.log(JSON.stringify(response, null, 2));
			if (response && response.result && response.result.length) {
				var querySnippet = 'SELECT '
				var lastIndex = response.result.length;
				for (i=0;i<lastIndex;i++) {
					var colName =response.result[i].COLUMN_NAME;
					if (i==0) {
						querySnippet = querySnippet + ' ' + colName;
					} else {
						querySnippet = querySnippet + ', ' + colName;
					}
					
					if (i == lastIndex - 1) {						
						querySnippet = querySnippet + ' FROM ' + selectedTable;
						$('.queryEditor').html(querySnippet);
						$('#msgSpan').addClass('success');
						$('#msgSpan').html('insert query snippet placed successfully.');
						$("#msgSpan").fadeIn( 300 ).delay( 2500 ).fadeOut( 400 );
					}
				}
			} else {
				$('#msgSpan').addClass('failure');
				$('#msgSpan').html('Failed to retrieve table information');
				$("#msgSpan").fadeIn( 300 ).delay( 2500 ).fadeOut( 400 );
			}
		});

	} else {
		$('#msgSpan').addClass('warning');
		$('#msgSpan').html('Please select a table first');
		$("#msgSpan").fadeIn( 300 ).delay( 2500 ).fadeOut( 400 );
	}
}

function insertQuery() {
	if (selectedTable) {
		reqHandler.get({url: '/tableInfo/' + selectedTable}, function(response) {
			console.log(JSON.stringify(response, null, 2));
			if (response && response.result && response.result.length) {
				var querySnippet = 'INSERT INTO ' + selectedTable + ' (';
				var lastIndex = response.result.length;
				for (i=0;i<lastIndex;i++) {
					var colName =response.result[i].COLUMN_NAME;
					if (i==0) {
						querySnippet = querySnippet + ' ' + colName;
					} else {
						querySnippet = querySnippet + ', ' + colName;
					}
					
					if (i == lastIndex - 1) {						
						querySnippet = querySnippet + ' VALUES (' + getQuestionMarks(response.result.length) + ' )';
						$('.queryEditor').html(querySnippet);
						$('#msgSpan').addClass('success');
						$('#msgSpan').html('insert query snippet placed successfully.');
						$("#msgSpan").fadeIn( 300 ).delay( 2500 ).fadeOut( 400 );
					}
				}
			} else {
				$('#msgSpan').addClass('failure');
				$('#msgSpan').html('Failed to retrieve table information');
				$("#msgSpan").fadeIn( 300 ).delay( 2500 ).fadeOut( 400 );
			}
		});

	} else {
		$('#msgSpan').addClass('warning');
		$('#msgSpan').html('Please select a table first');
		$("#msgSpan").fadeIn( 300 ).delay( 2500 ).fadeOut( 400 );
	}
}

function updateQuery() {
	if (selectedTable) {
		reqHandler.get({url: '/tableInfo/' + selectedTable}, function(response) {
			console.log(JSON.stringify(response, null, 2));
			if (response && response.result && response.result.length) {
				var querySnippet = 'UPDATE ' + selectedTable + ' SET ';
				var lastIndex = response.result.length;
				for (i=0;i<lastIndex;i++) {
					var colName =response.result[i].COLUMN_NAME;
					if (i==0) {
						querySnippet = querySnippet + ' ' + colName + '=? ';
					} else {
						querySnippet = querySnippet + ', ' + colName + '=? ';
					}
					
					if (i == lastIndex - 1) {						
						querySnippet = querySnippet + ' WHERE ' + response.result[0].COLUMN_NAME + '=?';
						$('.queryEditor').html(querySnippet);
						$('#msgSpan').addClass('success');
						$('#msgSpan').html('insert query snippet placed successfully.');
						$("#msgSpan").fadeIn( 300 ).delay( 2500 ).fadeOut( 400 );
					}
				}
			} else {
				$('#msgSpan').addClass('failure');
				$('#msgSpan').html('Failed to retrieve table information');
				$("#msgSpan").fadeIn( 300 ).delay( 2500 ).fadeOut( 400 );
			}
		});

	} else {
		$('#msgSpan').addClass('warning');
		$('#msgSpan').html('Please select a table first');
		$("#msgSpan").fadeIn( 300 ).delay( 2500 ).fadeOut( 400 );
	}
}

function deleteQuery() {
	if (selectedTable) {
		reqHandler.get({url: '/tableInfo/' + selectedTable}, function(response) {
			console.log(JSON.stringify(response, null, 2));
			if (response && response.result && response.result.length) {
				
				var querySnippet = 'DELETE FROM ' + selectedTable + ' WHERE  ' + response.result[0].COLUMN_NAME + ' = ? ';				
				$('.queryEditor').html(querySnippet);
				$('#msgSpan').addClass('success');
				$('#msgSpan').html('insert query snippet placed successfully.');
				$("#msgSpan").fadeIn( 300 ).delay( 2500 ).fadeOut( 400 );
				
			} else {
				$('#msgSpan').addClass('failure');
				$('#msgSpan').html('Failed to retrieve table information');
				$("#msgSpan").fadeIn( 300 ).delay( 2500 ).fadeOut( 400 );
			}
		});

	} else {
		$('#msgSpan').addClass('warning');
		$('#msgSpan').html('Please select a table first');
		$("#msgSpan").fadeIn( 300 ).delay( 2500 ).fadeOut( 400 );
	}
}

/* Utility functions */

function getQuestionMarks(noOfChars) {
	var returnString = '';
	for (i=0; i<noOfChars; i++) {
		if (i==0) {
			returnString = returnString + '?';
		} else {
			returnString = returnString + ', ?';
		}
		if (i == noOfChars-1) {
			return returnString;
		}
	}
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};