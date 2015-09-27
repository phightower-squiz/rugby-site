// jshint devel:true


function getTheData(jsonFile,el) {

	$.getJSON(jsonFile, function(data) {

	  var listHtml = "";
	  $.each(data, function(idx, obj){ 

	  		if(obj.Match != "") {
	  			listHtml += "<li>";
		  		if(jsonFile == "convertcsv.json") {
		  			listHtml += "<span class='name'>" + obj.Name + "</span> <span class='bar'><span class='fill'></span></span><span class='score'>" + obj.Score + "</span>";
		  			//var pct = (obj.Score/48) * 100;
		  			//pct = Math.ceil(pct);
		  			//fillBars(pct);
		  			
		  		}
		  		else {
		  			var winnerName = obj.Winner;
		  			var imgTag = "<span class='ctry'><img src='images/flags/" + obj.Ctry + ".png'></span>";
		  			if (obj.Winner == "") {
		  				winnerName = "<span class='muted'>TBD</span>";
		  				imgTag = "";
		  			}
		  			listHtml += "<span class='matchno'>" + obj.Match + "</span> " + imgTag + "<span class='winner'>" + winnerName + "</span>";
		  		}
		  		

		        listHtml += "</li>";
	  		}
	  		
	    });

	  	$(el).append(listHtml);
	  	fillBars();
	  	getModified();
	  });
}
function fillBars() {

	$('.squiz-list li').each(function(el,index){
		var scoreText = $(this).find('.score').text();
		var scorenum = parseInt(scoreText, 10);
		var barWidth = parseInt($('.bar').css('width'),10);
		scorenum = Math.ceil((scorenum/48) * barWidth);

		var targetEl = $(this).find('.fill');
		targetEl.css('width', scorenum + 'px');
	})
	

}
function getModified() {
	$.ajax({
	  url: "convertcsv.json",
	  success: function(data, textStatus, request){
	  	var lastModified = request.getResponseHeader("Last-Modified");
	  	$('.last-modified').text("Last Modified: " + lastModified);
	  }
	});
}
$(document).ready(function(){
	getTheData("convertcsv.json",".squiz-list");
	getTheData("matches.json",".matches-list");

})