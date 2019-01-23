var opts = {
	            lines: 13 // The number of lines to draw
	           , length: 13 // The length of each line
	           , width: 3 // The line thickness
	           , radius: 11 // The radius of the inner circle
	           , scale: 1 // Scales overall size of the spinner
	           , corners: 1 // Corner roundness (0..1)
	           , color: '#000' // #rgb or #rrggbb or array of colors
	           , opacity: 0.25 // Opacity of the lines
	           , rotate: 0 // The rotation offset
	           , direction: 1 // 1: clockwise, -1: counterclockwise
	           , speed: 1 // Rounds per second
	           , trail: 60 // Afterglow percentage
	           , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
	           , zIndex: 2e9 // The z-index (defaults to 2000000000)
	           , className: 'spinner' // The CSS class to assign to the spinner
	           , top: '45%' // Top position relative to parent
	           , left: '50%' // Left position relative to parent
	           , shadow: false // Whether to render a shadow
	           , hwaccel: false // Whether to use hardware acceleration
	           , position: 'absolute' // Element positioning
	        };

var ReqHandler = function() {
	function ajaxRequest(requestObj, callback) {
		var target = document.getElementById('content');
		var spinner = new Spinner(opts).spin(target);
		var token = '';
        /*if($.session.get('token')){token = $.session.get('token');}
		$.blockUI({
			message: null,
			css: { backgroundColor: '#fff', color: '#fff'}
		 });*/
		 $.blockUI({
			message: null,
			css: { backgroundColor: '#fff', color: '#fff'}
		 });
		$.ajax({
			type: requestObj.type,
			beforeSend: function (request) {
				if(!_.some(['/api/user/login', '/api/user/forgotPassword'], function(url) { return url == requestObj.url; })){
		        	request.setRequestHeader('Authorization', token);
		    	}
		      },
			url: requestObj.url,
			data: requestObj.data,
			success: function(data) {
				spinner.stop();
				$.unblockUI();
				callback(data);
			},
			error: function(data) {
				spinner.stop();
				$.unblockUI();
				callback(data);
			}
		});
	};

	this.post = function(requestObj, callback) {
		requestObj.type = 'POST';
		ajaxRequest(requestObj, callback);
	};

	this.get = function(requestObj, callback) {
		requestObj.type = 'GET';
		ajaxRequest(requestObj, callback);
	};

	this.put = function(requestObj, callback) {
		requestObj.type = 'PUT';
		ajaxRequest(requestObj, callback);
	};

	this.delete = function(requestObj, callback) {
		requestObj.type = 'DELETE';
		ajaxRequest(requestObj, callback);
	};
	return this;
};