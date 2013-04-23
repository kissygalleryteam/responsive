KISSY.ready(function(S){
	var D = S.DOM, E = S.Event;
	S.use('ua', function(S){
		var ie = S.UA.ie;
		if(ie > 8){
			return;
		}
		E.on(window, "load resize", function(){
			var w = D.width(document);
			var view = '';
			if(w <= 990) {
				view = "maxwidth990";
			}

			if(w <= 700) {
				view = "maxwidth700";
			}

			D.attr("body", "class", view);
		});
	});
});