$( document ).ready( function() { 
	
	// The requirements, and what software/hardware the user has
	properties = {"js":{str:"JavaScript", req:"Enabled", value:"Enabled", version:null, pass:true, url:"https://support.microsoft.com/en-ca/gp/howtoscript"},
		"java":{str:"Java", req:"1.7.71+, 32-bit", value:"Unknown", version:null, pass:null, url:"https://java.com/en/download/"},
		"browser":{str:"Browser", req:"Internet Explorer 8.0+", value:"Unknown", version:null, pass:null, url:"http://windows.microsoft.com/en-ca/internet-explorer/download-ie"},
		"screen":{str:"Screen Resolution", req:"1280x800 or better", value:"Unknown", version:null, pass:null, url:null},
		"os":{str:"Operating System", req:"Windows XP or better", value:"Unknown", version:null, pass:null, url:null},
		"cpu":{str:"CPU", req:"2.0+ GHz", value:"Unknown", version:null, pass:null, url:null},
		"ram":{str:"RAM", req:"2+ GB", value:"Unknown", version:null, pass:null, url:null},
		"hd":{str:"Hard Drive", req:"5+ GB available", value:"Unknown", version:null, pass:null, url:null},
		"gpu":{str:"Video Card", req:"Intel 945/965, ATL Radeon R300 (9xxx), Nvidia Geforce FX (5xxx), OpenGL 1.5", value:"Unknown", version:null, pass:null, url:"http://www.videocardbenchmark.net/gpu_list.php"},
		"pdf":{str:"PDF Reader", req:"Adobe Reader 9.0+", value:"Unknown", version:null, pass:null, url:"https://get.adobe.com/reader/"},
		"lang":{str:"Language", req:"English (CA)", value:"Unknown", version:null, pass:null, url:"http://windows.microsoft.com/en-ca/windows-vista/change-your-internet-explorer-language-settings"}};


	drawTable();
	detect();
	drawTable();

	$('tr').click(function() {
		var id = $(this).attr('id');
		 // console.log(id);
		if (id === null){
			return;
		} else if (properties[id].pass) {
			return;
		} else if (properties[id].url != null ){
			window.open(properties[id].url);
		} else {
			alert("Please contact Audatex Canada to complete your desktop set up. A technical support representative can be reached from Monday to Friday, 8 a.m. to 7 p.m. ET at 1-866-420-2048.");
		}
	});

	// console.log(properties);


	$('#ie-sites').click(configureIE);
	$('#java-sites').click(configureJavaExceptions);
	$('#java-security').click(configureJavaSecurity);

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
	detectPopup();
	detectBrowser();
	detectScreen();
	detectOS();
	detectLang();
	detectPDF();

	detectUsingJava();

	if (properties["browser"].value === 'Microsoft Internet Explorer') { //ActiveX enabled
	console.log("here");
		detectCPU();
		detectGPU();
	}
	// } catch  (e) {
	// 	console.log(e);
	// }

	// drawTable();
	// detectPorts();

}