var selectedTable;
var query;
const reqHandler = new ReqHandler();

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
				columnsObject.push({data: colName, type: 'text', className: 'htRight'});
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
					var hot = new Handsontable(hotElement, hotSettings);
				}
			}
		}
	});	
}

function loadResultsGrid(hotSettings) {
	var hotElement = document.querySelector('#resultsGrid');
	var hot = new Handsontable(hotElement, hotSettings);
}

function submitQuery() {
	query = $('.queryEditor').html();
	reqHandler.post({url: '/execute', data: {'query': query }}, function(response) {
		console.log(JSON.stringify(response, null, 2));
		var queryType = query.firstWord();
		if ('SUCCESS' == response.status) {
			if (response.result instanceof Array) {
				if (response.result && response.result.length) {
					var dataObject = [];
					var columnsObject = [];
					var colHeaders = _.keys(response.result[0]);
					var colWidths = [];
					var lastIndex = colHeaders.length;
					for (i=0;i<lastIndex;i++) {
						columnsObject.push({data: colHeaders[i], type: 'text', className: 'htLeft'});
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
						columnsObject.push({data: colHeaders[i], type: 'text', className: 'htLeft'});
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
					columnsObject.push({data: colHeaders[i], type: 'text', className: 'htLeft'});
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
				columnsObject.push({data: colHeaders[i], type: 'text', className: 'htLeft'});
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
				}
			}
		}
	});
}


/* Utility functions */

String.prototype.firstWord = function(){return this.replace(/\s.*/,'')}