$(document).ready(function(){
	$("#plotsContainer").on("click","div.plotIcon", function(){
		var id = $(this).attr('id');
		var name = $(this).find("h3").text();
		sessionStorage.setItem("plotID", id);
		sessionStorage.setItem("plotName", name)
		location.href = "../main/main.html"
    })
})