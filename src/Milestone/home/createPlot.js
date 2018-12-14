
$(document).ready(function(){
    $("#modalCreatePlotBtn").click(function(){
        if(validateName()){
            var textBox = document.getElementById("plotNameInput");
            var nameText = textBox.value;
            insertPlotIntoDatabase(nameText);
            textBox.value = "";
            
        }
    })
})

function validateName(){
    var nameText = document.getElementById("plotNameInput").value;
    
    if(nameText != "" && nameText.length <= 25){
        return true;
    }
}

function addPlot(name, id){
    var PLOTS_CONTAINER = document.querySelector("#plotsContainer");
    var PLOT_ICON = "image/plotIcon.png";

    // Creates a div tag for the plot
    var plot = document.createElement("div");
    plot.classList.add("plotIcon");
    
    // Sets the id attribute
    plot.setAttribute("id", id);

    // Creates a h3 tag for the name header
    var plotName = document.createElement("h3");
    plotName.innerHTML = name;
    plot.appendChild(plotName);

    // Creates an img tag for the plot icon
    var plotImageTag = document.createElement("img");
    plotImageTag.setAttribute("src", PLOT_ICON)
    plot.appendChild(plotImageTag);

    // Appends the plot in plot container
    PLOTS_CONTAINER.appendChild(plot);
    
    // Places the plot in front of the create plot icon
    var createPlotIcon = document.getElementById("createPlotIcon");
    createPlotIcon.insertAdjacentElement("beforebegin", plot);

};

// Retrieves plot data from a database and adds it to the page
(function addPlotsFromDatabase(){
    $.post("retrievePlot.php",  function(data){    
        var plotArray = JSON.parse(data); 

        var i;
        for(i = 0; i < plotArray.length; i++){
            addPlot(plotArray[i].PlotName, plotArray[i].PlotID);
        }  
    })
})();


function insertPlotIntoDatabase(plotName){	
	$.post("insertPlot.php", {PlotName: plotName}, function(data){
        location.reload(); // TODO: Find a better solution
	})
}



