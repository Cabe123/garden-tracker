var PLOT_ID = sessionStorage.getItem('plotID');

var rowNumber = 1;

document.getElementById('plotName').innerHTML = sessionStorage.getItem('plotName');

// Valdates user input in order to add a new row
$(document).ready(function(){
	
	var rowColor;
	var nameInputText;
	var dateInputText; 
	var emtpyCB = document.getElementById("modalAddEmptyCB");

	$("#colorDropDown li button").click(function(){
		rowColor = $(this).attr('value');
		console.log(rowColor);
		var dropDownBtn = document.getElementById("colorDropDownBtn"); 
		var backgroundColor = $(this).attr('style');
		dropDownBtn.setAttribute('style', backgroundColor);
	})

	$("#modalAddRowBtn").click(function(){
		
		if(emtpyCB.checked != true){
		
			nameInputText = document.getElementById("nameInput").value;
			dateInputText = document.getElementById("dateInput").value;

			if(validateAddRowInput()){
			
				insertRowIntoDatabase(nameInputText, dateInputText, rowColor, PLOT_ID);

				$('[data-toggle="popover"]').popover();
				
				// Hides the modal
				$("#addRowModal").removeClass("in");
				$("#addRowModal").hide();
				$(".modal-backdrop").remove();
				// Clears the row input boxes
				clearAddRowInputs();
				
			}
		}else{
			insertRowIntoDatabase("Empty","yyyy-mm-dd", "rowColorBlue", PLOT_ID);
	
			$('[data-toggle="popover"]').popover();
			
			// Hides the modal
			$("#addRowModal").removeClass("in");
			$("#addRowModal").hide();
			$(".modal-backdrop").remove();
			// Clears the row input boxes
			clearAddRowInputs();
		}

		

	})

})

// This function insures that all of the input fields for the add row modal are valid.
function validateAddRowInput(){
	var validInput = [false, false, false];

	var nameInputText = document.getElementById("nameInput").value;
	var dateInputText = document.getElementById("dateInput").value;

	if(nameInputText != "" && nameInputText.length <= 25){
		validInput[0] = true;
	}
	
	if(dateInputText != ""){
		validInput[1] = true;
	}

	if($("#colorDropDownBtn").attr('style') != null){		
		validInput[2] = true;
	}

	if(validInput[0] && validInput[1] && validInput[2]){
		return true;
	}

	return false;

}

// Clears Inputs for the add row modal
function clearAddRowInputs(){
	document.getElementById("colorDropDownBtn").removeAttribute('style');
	document.getElementById("nameInput").value = "";
	document.getElementById("dateInput").value = "";
}


// function used to add a row
function addRow(name, eta, color, id){
    var PLOT = document.querySelector("#plot");
	var row = document.createElement("div");
	
	var num = document.createElement("h5");
	num.classList.add("rowNumber");
	num.innerHTML = rowNumber;
	row.appendChild(num);
	
	row.classList.add("gardenRow");
	row.classList.add(color);

	var datesString = "ETA: " + formatDate(eta);

	// sets id attribute
	row.setAttribute("id", id);
	
	// sets data-toggle attribute for popover
	row.setAttribute("data-toggle", "popover");
	
	// sets data-html attribute for popover
	row.setAttribute("data-html", "true");
	
	// sets title attribute for popover
	row.setAttribute("title", name);

	// sets data-content attribue for popover
	row.setAttribute("data-content", datesString);

	// sets data-trigger for popover
	row.setAttribute("data-trigger", "hover");
	
	PLOT.appendChild(row);

	rowNumber++;
}



/* INSERT/RETRIEVE ROW DATA*/

// This function retrieves row data from a database and adds it to the plot
(function addRowsFromDatabase(){
    $.post("retrieveRows.php", {PlotID: PLOT_ID}, function(data){    
		var rowArray = JSON.parse(data); 
		
		var i;
		for(i = 0; i < rowArray.length; i++){
			var rowName = String(rowArray[i].RowName);
			var rowETA = String(rowArray[i].RowETA);
			var rowColor = String(rowArray[i].RowColor);
			var rowID = String(rowArray[i].RowID);

			addRow(rowName, rowETA, rowColor, rowID);
		}  
		$('[data-toggle="popover"]').popover();
    })
})();


// This function inserts garden row data into a database
function insertRowIntoDatabase(rowName, rowETA, rowColor, plotID){	
	$.post("insertRow.php", {RowName: rowName, RowETA: rowETA, RowColor: rowColor, PlotID: plotID}, function(data){
		location.reload(); // TODO: Find a better solution
	})
}





/* UPDATE/DELETE ROW DATA */

$(document).ready(function(){
	// Row data variables
	var rowColor
	var id;
	var name;
	var dateStr;
	var date;
	var color;

	// Input variables
	var nameInput = document.getElementById("updateNameInput");
	var dateInput = document.getElementById("updateDateInput");
	var colorInput = document.getElementById("updateColorDropDownBtn");
	var updateEmptyCB = document.getElementById("modalUpdateEmptyCB");

	// Displays the update row modal when the user double clicks a row
	$("#plot").on("dblclick",".gardenRow", function(){
		
		row = $(this); // The row that was clicked

		// Assigns the clicked row's data to the row data variables 
		id = row.attr('id');
		name = row.attr('data-original-title');
		dateStr = row.attr('data-content');
		date = dbFormatDate(dateStr.slice(5, 15));
		rowColor = document.getElementById(id).className.split(' ')[1];

		// Sets the correct color corresponding to the class name
		switch (rowColor) {
			case 'rowColorGreen':
				color = 'background-color:rgb(0, 255, 42)';
				break;
			case 'rowColorYellow':
			    color =	'background-color:rgb(224, 211, 32)';
				break;
			case 'rowColorRed':
				color = 'background-color:rgb(224, 32, 64)';
				break;
			default:
				break;
		}

		// Assigns the row's data to the input fields
		nameInput.value = name;
		dateInput.value = date;
		colorInput.setAttribute('style', color);

		$('#updateRowModal').modal('show'); // Shows the update/delete row modal

	})


	$("#updateColorDropDown li button").click(function(){
		rowColor = $(this).attr('value');
		var dropDownBtn = document.getElementById("updateColorDropDownBtn"); 
		var backgroundColor = $(this).attr('style');
		dropDownBtn.setAttribute('style', backgroundColor);
	})

	// This validates the user's input when they click the update row button. If the input is valid it posts the updated data.
	$('#modalUpdateBtn').click(function(){
		if(updateEmptyCB.checked != true){
			if(validateUpdateRowInput()){
				console.log(id);
				$.post("updateRow.php", {RowName: nameInput.value, RowETA: dateInput.value, RowColor: rowColor, RowID: id, PlotID: PLOT_ID}, function(data){

					location.reload(); // TODO: Find a better solution
			
				})
			}
		}else{
			$.post("updateRow.php", {RowName: "Empty", RowETA: "yyyy-mm-dd", RowColor: "rowColorBlue", RowID: id, PlotID: PLOT_ID}, function(data){

				location.reload(); // TODO: Find a better solution
		
			})
		}
	})

	// Deletes the row 
	$('#modalDeleteBtn').click(function(){
		$.post("deleteRow.php", {RowID: id, PlotID: PLOT_ID}, function(data){		
			
			location.reload(); // TODO: Find a better solution

		})
	})
	
})

// This function insures that all of the input fields for the update/delete row modal are valid.
function validateUpdateRowInput(){
	var validInput = [false, false, false];
	var nameInputText = document.getElementById("updateNameInput").value;
	var dateInputText = document.getElementById("updateDateInput").value;

	if(nameInputText != "" && nameInputText.length <= 25){
		validInput[0] = true;
	}
	
	if(dateInputText != ""){
		validInput[1] = true;
	}

	if($("#updateColorDropDownBtn").attr('style') != null){		
		validInput[2] = true;
	}

	if(validInput[0] && validInput[1] && validInput[2]){
		return true;
	}

	return false;

}

// Formats a date to make it more user friendly MM/DD/YYYY
function formatDate(date){
	var dates = date.split('-');
	return dates[1] + "/" + dates[2] + "/" + dates[0];
}

// Formats a date for database storage YYYY-MM-DD
function dbFormatDate(date){
	var dates = date.split('/');
	return dates[2] + "-" + dates[0] + "-" + dates[1];
}



