$( document ).ready( function() { 
	
	properties = {"js":{str:"JavaScript", value:"Enabled", version:null, pass:true},
		"java":{str:"Java", value:"Unknown", version:null, pass:null},
		"browser":{str:"Browser", value:"Unknown", version:null, pass:false},
		"screen":{str:"Screen Resolution", value:"Unknown", version:null, pass:false},
		"os":{str:"Operating System", value:"Unknown", version:null, pass:false},
		"cpu":{str:"CPU", value:"Unknown", version:null, pass:null},
		"ram":{str:"RAM", value:"Unknown", version:null, pass:null},
		"hd":{str:"Hard Drive", value:"Unknown", version:null, pass:null},
		"gpu":{str:"Video Card", value:"Unknown", version:null, pass:null}};


	drawTable();
	detect();
	drawTable();
} );

function drawTable() {

	$('#property-status').html('');
	for (var p in properties) {
		$('#property-status').append(
			'<tr id="'+p+'"> <th scope="row">' + properties[p].str
			+ '</th> <td class="value">' + properties[p].value 
			+ (properties[p].version?'<div class="version">' + properties[p].version + '</div>':'')
			+ '</td><td class="status '
			+ (properties[p].pass == null? 'neutral">Unknown':(properties[p].pass ?'pass">Passed':'fail">Failed'))
			+ '</td></tr>');
	}
}

function detect() {
	
	detectBrowser();
	detectScreen();
	detectOS();
	detectJava();

}