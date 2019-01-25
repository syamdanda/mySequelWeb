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
			var dataObject = [{},{},{},{},{},{},{},{},{},{},{}];
			var columnsObject = [];
			var colHeaders = [];
			var colWidths = [];
			var hotElement = document.querySelector('#resultsGrid');
			var hotElementContainer = hotElement.parentNode;			
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
						'height': 487,
						'maxRows': 22,
						'rowHeaders': true,
						'colHeaders': colHeaders,
						'colWidths': colWidths
					};
					var hot = new Handsontable(hotElement, hotSettings);
				}
			}
		}
	});	
}