var selectedTable;

function selectTable(tableName) {
	$('.tablesList li').removeClass('active');
	$('#'+tableName).addClass('active');
	selectedTable = tableName;
}