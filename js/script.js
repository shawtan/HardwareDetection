$( document ).ready( function() { 
	
	// The requirements, and what software/hardware the user has
	properties = {"js":{str:"JavaScript", req:"Enabled", value:"Enabled", version:null, pass:true},
		"java":{str:"Java", req:"1.7.71+, 32-bit", value:"Unknown", version:null, pass:null},
		"browser":{str:"Browser", req:"Internet Explorer 8.0+", value:"Unknown", version:null, pass:null},
		"screen":{str:"Screen Resolution", req:"1280x800 or better", value:"Unknown", version:null, pass:null},
		"os":{str:"Operating System", req:"Windows XP or better", value:"Unknown", version:null, pass:null},
		"cpu":{str:"CPU", req:"2.0+ GHz", value:"Unknown", version:null, pass:null},
		"ram":{str:"RAM", req:"2+ GB", value:"Unknown", version:null, pass:null},
		"hd":{str:"Hard Drive", req:"5+ GB available", value:"Unknown", version:null, pass:null},
		"gpu":{str:"Video Card", req:null, value:"Unknown", version:null, pass:null}};


	drawTable();
	detect();
	drawTable();

	// detectDevices();

function whatClicked(evt) {
    console.log('click');
    var num = document.getElementById("javaApp").getNum();
    console.log(num);
    drawTable();
}

document.getElementById("outer").addEventListener("click", whatClicked, false);

} );

/*
 * Populates the table based on the detected settings
 */
function drawTable() {
	 // console.log( properties["java"]);
	$('#property-status').html('');
	for (var p in properties) {
		$('#property-status').append(
			'<tr id="'+p+'"> <th scope="row">' + properties[p].str
			+ (properties[p].req?'<div class="version">Requirement: ' + properties[p].req + '</div>':'')
			+ '</th> <td class="value">' + properties[p].value 
			+ (properties[p].version?'<div class="version">' + properties[p].version + '</div>':'')
			+ '</td><td class="status '
			+ (properties[p].pass == null? 'neutral">Unknown':(properties[p].pass ?'pass">Passed':'fail">Failed'))
			+ '</td></tr>');
	}
}

/*
 * Gets the user information and updates the properties variable
 */
function detect() {
	
	detectBrowser();
	detectScreen();
	detectOS();
	detectJava();

	drawTable();

	if (properties["java"].pass){
		console.log("GetNum: " + javaApp.getNum());
		detectUsingJava();
	}

}