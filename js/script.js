$( document ).ready( function() { 

	addButtons();

	drawTable();
	detect();
	drawTable();

	// $('tr').click(clickHandler);
	$('table').on('click', 'tr', clickHandler);

	$('#ie-sites').click(configureIE);
	$('#java-sites').click(configureJavaExceptions);
	$('#java-security').click(configureJavaSecurity);
	$('#ie-shortcut').click(createShortcut);
	$('#printer').click(function() {window.print()});

	// javaApp.onLoad(detectUsingJava);

} );

function clickHandler() {

	var id = $(this).attr('id');
	// console.log(id);
	if (!id){
		return;
	} else if (properties[id].pass) {
		return;
	} else if (id == 'java') {
		// deployJava.installLatestJRE();
		window.open(properties[id].url);
	} else if (properties[id].url != null ){
		window.open(properties[id].url);
	} else {
		alert("Please contact Audatex Canada to complete your desktop set up. A technical support representative can be reached from Monday to Friday, 8 a.m. to 7 p.m. ET at 1-866-420-2048.");
	}
	
}

function addButtons() {
	$('#configure').html("Click the following buttons to configure your security settings.<br><button id='ie-sites'>Internet Explorer Trusted Sites </button><button id='java-sites'>Java Exception list</button><button id='java-security'>Java Security settings</button><button id='ie-shortcut'>Create Shortcut</button><button id='printer'>Test Printer</button>");
}

/*
 * Populates the table based on the detected settings
 */
function drawTable() {

	 // console.log( properties["java"]);
	$('#property-status').html('');
	for (var p in properties) {
		$('#property-status').append(
			'<tr id="'+p+'"> <th scope="row">' + properties[p].str
			+ (properties[p].req?'<div class="version small">Requirement: ' + properties[p].req + '</div>':'')
			+ '</th> <td class="value">' + properties[p].value 
			+ (properties[p].version?'<div class="version small">' + properties[p].version + '</div>':'')
			+ '</td><td class="status '
			+ (properties[p].pass == null? 'neutral">Unknown':(properties[p].pass ?'pass">Passed':'fail">Failed'))
			+ '</td></tr>');
	}

}

/*
 * Gets the user information and updates the properties variable
 */
function detect() {

	// try {
	// detectPopup();
	detectBrowser();
	detectScreen();
	detectOS();
	detectLang();
	detectPDF();
	detectJava();


	// detectUsingJava();

	// if (properties["browser"].value === 'Microsoft Internet Explorer') { //ActiveX enabled
	if ("ActiveXObject" in window && detectActiveX()) {
		detectHD();
		detectRAM();
		// detectServicePack();
		detectCPU();
		detectGPU();
	}

	
	detectSpeed();
	// }
	// } catch  (e) {
	// 	console.log(e);
	// }

	// drawTable();
	// detectPorts();

}