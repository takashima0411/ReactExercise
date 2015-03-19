var championSquareTemplateURL = "http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/<champion>.png ";

$(function(){
	var request = $.get('http://ddragon.leagueoflegends.com/cdn/5.2.1/data/en_US/champion.json');

	request.done(function(json){
		var champions = json.data;
		for( var champion in json.data){
			var img = $("<img>").attr("src",championSquareTemplateURL.replace("<champion>",champion));
			var panelBody = $("<div>").addClass("panel-body").append($("<p>").text(champion)).append(img);
			var panel = $("<div>").addClass("panel panel-default col-xs-6 col-sm-4 col-md-3 col-lg-2").append(panelBody);
			$("#data").append(panel);
		}
	});

	request.fail(function(msg){
		$("#data").text('request failer');
	});
});
