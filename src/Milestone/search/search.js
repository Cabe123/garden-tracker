var tableHead = "<tr><th>Name</th><th>ETA</th><th>Yield</th><th>Plot</th></tr>";

$(document).ready(function(){
    $("#modalSearchInput").keyup(function(){
        
        var value = $(this).val();

        $.post("../search/searchDB.php", {searchField: value}, function(data){            
            if(value != ""){
                document.getElementById("modalSearchTable").innerHTML = data;
            }else{
                document.getElementById("modalSearchTable").innerHTML = tableHead;
            }
        })
    })

})

$(document).ready(function(){
    $("#modalSearchTable").on("click","tr", function(){
        
        var id = $(this).attr('class');

        var name = $(this).children(".searchPlotData").text();

        if(id != "searchHeader"){
		    sessionStorage.setItem("plotID", id);
		    sessionStorage.setItem("plotName", name)
            location.href = "../main/main.html";
        }
    })
})