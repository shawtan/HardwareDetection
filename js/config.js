
function configureIE() {

	if (!properties['browser'].pass) {
		$('#ie-sites').html('Internet Explorer required');
		return;
	}

	Regpath = "HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Domains";

	sites = [
	{key:          "\\adpclaims.com",
	name:            "https",
	type:            "REG_DWORD",
	data:            0x2},
	// {key:          "\\apusolutions.com"},
	{key:          "\\apusolutions.com\\www",
	// value: 0,
	name:            "https",
	type:            "REG_DWORD",
	data:            0x2},
	{key:          "\\audatex.ca",
	// value: 0,
	name:            "*",
	type:            "REG_DWORD",
	data:            0x2},
	{key:          "\\audatexsolutions.com",
	name:            "https",
	type:            "REG_DWORD",
	data:            0x2}
	];

	try {
		var oWSS = new ActiveXObject("WScript.Shell");
		oWSS.RegWrite(Regpath + "\\apusolutions.com" +"\\","");
		var errorFree = true;

		for (var i=0; i<sites.length; i++) {
			oWSS.RegWrite(Regpath + sites[i].key+"\\","");
			oWSS.RegWrite(Regpath + sites[i].key+"\\"+sites[i].name,sites[i].data, sites[i].type);
			console.log("written"+sites[i].key);
		}
	} catch (e) {
		alert('Error trying to write "' + sites[i].key );
		errorFree = false;
	}

	oWSS = null;

	if (errorFree){
		alert("IE trusted sites successfully added!");
	}
}

function configureJavaExceptions() {
	try {
		javaApp.writeExceptions();
		alert("Java Exception List successfully added!");
	} catch(e) {
		$('#java-sites').html('You need to allow Java to run!');
		// console.log(e);
	}

}
function configureJavaSecurity() {
	try {
		javaApp.writeJavaProperties();
		alert("Java security settings successfully configured!");
	} catch(e) {
		$('#java-security').html('You need to allow Java to run!');
		// console.log(e);
	}

}
