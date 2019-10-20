'use strict';
var generatedData;
var data;
var flag;
/* Array for starting date,ending date e.t.c */
var startArr=[],endArr=[],col=[],availableDates=[];

/* function call is on page load which will fetch data from json file */
function displayData() {

	let Link = "https://totalcloud-static.s3.amazonaws.com/intern.json";

	var proxyURL = 'https://cors-anywhere.herokuapp.com';

	var request = new XMLHttpRequest();
	request.open('GET', proxyURL + '/' + Link, true);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
		generatedData = request.response;
		data=generatedData;
		CreateTableFromJSON();
	}
}
/* function to display json data in tabular form */
function CreateTableFromJSON() {
    for (var i = 0; i < data.length; i++) {
        for (var key in data[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

	// CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }
    var arr=[];
    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < data.length; i++) {
        tr = table.insertRow(-1);
    	for (var j = 0; j < col.length; j++) {
        	var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = data[i][col[j]];
            if(j==0){
            	tabCell.innerHTML=data[i][col[j]]-1;
            }
            if(j==2 || j==3){
	            arr.push(data[i][col[j]]);	
            }
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    checkAvailability(col,arr);
 }
/* function to find available dates */
 function checkAvailability(col,arr) {

 	for(var i=1;i<=30;i++){
		var startDate;
 		var endDate;
 		var d1="09/" + i.toString()+"/2019";
 		var d1=new Date(d1);
 		flag=0;//check for next date

 		for (var j = 0; j < arr.length; j+=2) {
		 	startDate=arr[j];
		 	endDate=arr[j+1];
		 	startDate=startDate.split("/");
		 	startArr.push(startDate[2]);
		 	startDate=new Date(+startDate[2],startDate[1]-1, +startDate[0]);

		 	endDate=endDate.split("/");
		 	endArr.push(endDate[2]);
		 	endDate=new Date(+endDate[2],endDate[1]-1, +endDate[0]);

 			if((d1>=startDate) && (d1<=endDate)){
				flag++;
				j=arr.length;
			}
 		}

 		if(flag==0){
 			availableDates.push(d1);
 		}
 	}//end for loop outer	

 }

 //Draw chart

function drawChart() {
	var nameArr=[];
	for(var i=0;i<data.length;i++){
		nameArr.push(data[i][col[1]]);
	}
	var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	exportEnabled: true,
	title: {
		text: "Working Dates"
	},
	axisX: {
		title: "Employees",
		includeZero:true,
	},
	axisY: {
		title: "Sept",		
		includeZero: true,
		interval: 1,//Date
	}, 
	data: [{
		type: "rangeBar",
		showInLegend: true,
		yValueFormatString: "",
		indexLabel: "{y[#index]}",
		color:"#ff8080",
		dataPointWidth:50,
		toolTipContent: "<b>{label}</b>: {y[0]} to {y[1]}",
		dataPoints: [
			{ y:[1, 7], label: "Shubham" },
			{ y:[26,28], label: "Shubham" },
			{ y:[9, 12], label: "Vivek" },
			{ y:[10,12], label: "Priya" },
			{ y:[17,19], label: "Rohan" },
			{ y:[27,29], label: "Rohan" },
			{ y:[13,14], label: "Swati" },
			{ y:[29,29], label: "Swati" },
			{ y:[3,7], label: "Prakash" },
			{ y:[11,11], label: "Abhishek" },
			{ y:[9,13], label: "Pradeeep" },
			{ y:[28,28], label: "Pradeeep" },
			{ y:[20,23], label: "Suhas" },
			{ y:[25,27], label: "Vishnu" },
			{ y:[25,28], label: "Neha" }
		],

	}]
});
chart.render();
document.getElementById('showDates').style.display="block";
}
/* function to display available dates on button click */
function showDates() {
	for (var i = 0; i < availableDates.length; i++) {
		document.getElementById('Dates').innerHTML+=availableDates[i]+"<br>";
	}
}