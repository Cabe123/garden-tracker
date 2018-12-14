var table = document.getElementById("modalDeletePlotsTable");
$(document).ready(function(){
    $("#deletePlotsBtn").click(function(){

       $("#deletePlotsModal").modal('show');

        retrievePlotData();
    })

})

$(document).ready(function(){
    $("#modalDeletePlotsTable").on("click",".tableDeleteBtn", function(){
        var id = $(this).attr('id');
        $.post("deletePlot.php",{PlotID: id}, function(data){
            location.reload(); // TODO: Find a better solution
        })
    })
})

function retrievePlotData(){
    $.post("retrievePlotDataForModal.php", function(data){
            table.innerHTML = data;
    })
}