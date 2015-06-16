$( document ).ready( function() { 

	addButtons();

	// The requirements, and what software/hardware the user has
	// properties = {"js":{str:"JavaScript", req:"Enabled", value:"Enabled", version:null, pass:true, url:"http://activatejavascript.org/en/instructions/ie"},
	// 	"java":{str:"Java", req:"1.7.71+, 32-bit", value:"Unknown", version:null, pass:null, url:"http://java.com/en/download/"},
	// 	"browser":{str:"Browser", req:"Internet Explorer 10+", value:"Unknown", version:null, pass:null, url:"http://windows.microsoft.com/en-ca/internet-explorer/download-ie"},
	// 	"screen":{str:"Screen Resolution", req:"1280x800 or better", value:"Unknown", version:null, pass:null, url:null},
	// 	"os":{str:"Operating System", req:"Windows 7 or better", value:"Unknown", version:null, pass:null, url:null},
	// 	"cpu":{str:"CPU", req:"2.0+ GHz", value:"Unknown", version:null, pass:null, url:null},
	// 	"ram":{str:"RAM", req:"2+ GB", value:"Unknown", version:null, pass:null, url:null},
	// 	"hd":{str:"Hard Drive", req:"5+ GB available", value:"Unknown", version:null, pass:null, url:null},
	// 	"gpu":{str:"Video Card", req:"Intel 945/965, ATL Radeon R300 (9xxx), Nvidia Geforce FX (5xxx), OpenGL 1.5", value:"Unknown", version:null, pass:null, url:"http://www.videocardbenchmark.net/gpu_list.php"},
	// 	"speed":{str:"Internet Speed", req:"128 kb/s or higher", value:"Unknown", version:null, pass:null, url:null},
	// 	"pdf":{str:"PDF Reader", req:"Adobe Reader 9.0+", value:"Unknown", version:null, pass:null, url:"http://get.adobe.com/reader/"},
	// 	"lang":{str:"Language", req:"Canadian English or French", value:"Unknown", version:null, pass:null, url:"http://windows.microsoft.com/en-ca/windows-vista/change-your-internet-explorer-language-settings"}};

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