var selectedTable;
var query;

function selectTable(tableName) {
	$('.tablesList li').removeClass('active');
	$('#'+tableName).addClass('active');
	selectedTable = tableName;
	query = 'SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = "VMS" AND TABLE_NAME ="products"';
	getTableInfo();
}

function getTableInfo() {
	var dataObject = [];
	var hotElement = document.querySelector('#resultsGrid');
	var hotElementContainer = hotElement.parentNode;
	var hotSettings = {
	  data: dataObject,
	  columns: [
	    {
	      data: 'id',
	      type: 'numeric',
	      width: 40
	    },
	    {
	      data: 'currencyCode',
	      type: 'text'
	    },
	    {
	      data: 'currency',
	      type: 'text'
	    },
	    {
	      data: 'level',
	      type: 'numeric',
	      numericFormat: {
	        pattern: '0.0000'
	      }
	    },
	    {
	      data: 'units',
	      type: 'text'
	    },
	    {
	      data: 'asOf',
	      type: 'date',
	      dateFormat: 'MM/DD/YYYY'
	    },
	    {
	      data: 'onedChng',
	      type: 'numeric',
	      numericFormat: {
	        pattern: '0.00%'
	      }
	    },
	    {
	      data: 'units',
	      type: 'text'
	    },
	    {
	      data: 'asOf',
	      type: 'date',
	      dateFormat: 'MM/DD/YYYY'
	    },
	    {
	      data: 'onedChng',
	      type: 'numeric',
	      numericFormat: {
	        pattern: '0.00%'
	      }
	    }
	  ],
	  stretchH: 'all',
	  width: 1070,
	  autoWrapRow: true,
	  height: 487,
	  maxRows: 22,
	  rowHeaders: true,
	  colHeaders: [
	    'ID',
	    'Code',
	    'Currency',
	    'Level',
	    'Units',
	    'Date',
	    'Change',
	    'Units',
	    'Date',
	    'Change'
	  ]
	};
	var hot = new Handsontable(hotElement, hotSettings);
}