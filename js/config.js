
function configureIE() {

	if (!properties['browser'].pass) {
		$('#ie-sites').html('Internet Explorer required');
		$('#ie-sites').addClass('fail');
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

		for (var i=0; i<sites.length; i++) {
			oWSS.RegWrite(Regpath + sites[i].key+"\\","");
			oWSS.RegWrite(Regpath + sites[i].key+"\\"+sites[i].name,sites[i].data, sites[i].type);
			console.log("written"+sites[i].key);
		}
	} catch (e) {
		alert('Error adding sites');
		return;
	}

	alert("Internet Explorer trusted sites successfully added!");

}

function configureJavaExceptions() {

	var sites = ["https://platform.audatex.com/bre",
	"https://cloud.audatex.ca",
	"https://platform.audatex.ca",
	"https://www.apusolutions.com",
	"https://adpclaims.com",
	"https://adpclaims.net",
	"https://audatexsolutions.com",
	"https://*.audatex.ca"];

	if (!properties['browser'].pass) {
		$('#java-sites').html('Internet Explorer required');
		$('#java-sites').addClass('fail');
		return;
	}

	if (!properties['java'].pass) {
		$('#java-sites').html('Java required');
		return;
	}

	try {
		var wshshell = new ActiveXObject("WScript.Shell");
		var dir = wshshell.SpecialFolders("Desktop");
		dir = dir.substring(0,dir.length - "Desktop".length);
		dir += "\\AppData\\LocalLow\\Sun\\Java\\Deployment\\security\\exception.sites";

		var fso = new ActiveXObject("Scripting.FileSystemObject");
		var file = fso.OpenTextFile(dir, 8);

		for (var i=0; i<sites.length; i++){
			file.WriteLine(sites[i]);
		}

		file.close();

		alert("Java exception list successfully added!");

	} catch(e) {
		alert("An error occured");
	}

}
function configureJavaSecurity() {
	
	var p = ["deployment.security.level=HIGH",
	"deployment.security.level=MEDIUM",
	"deployment.webjava.enabled=true",
	"deployment.security.askgrantdialog.show=true",
	"deployment.security.askgrantdialog.notinca=true",
	"deployment.security.sandbox.jnlp.enhanced=true",
	"deployment.security.sandbox.selfsigned=PROMPT",
	"deployment.security.sandbox.casigned=PROMPT",
	//"deployment.user.security.exception.site=%APPDATA%\\\\..\\\\LocalLow\\\\Sun\\\\Java\\\\Deployment\\\\security\\\\exception.sites",
	"deployment.security.SSLv2Hello=false",
	"deployment.security.TLSv1=true",
	"deployment.security.TLSv1.1=false",
	"deployment.security.TLSv1.2=false"];


	if (!properties['browser'].pass) {
		$('#java-security').html('Internet Explorer required');
		$('#java-security').addClass('fail');
		return;
	}

	if (!properties['java'].pass) {
		$('#java-security').html('Java required');
		return;
	}
	try {
		var wshshell = new ActiveXObject("WScript.Shell");
		var dir = wshshell.SpecialFolders("Desktop");
		dir = dir.substring(0,dir.length - "Desktop".length);
		dir += "\\AppData\\LocalLow\\Sun\\Java\\Deployment\\deployment.properties";

		var fso = new ActiveXObject("Scripting.FileSystemObject");
		var file = fso.OpenTextFile(dir, 8);

		for (var i=0; i<p.length; i++){
			file.WriteLine(p[i]);
		}

		file.close();
		alert("Java security settings successfully configured!");

	} catch(e) {
		alert("An error occured");
	}


}


function createShortcut() {

	try {
		var wshshell = new ActiveXObject("WScript.Shell");
		var specDir = wshshell.SpecialFolders("Desktop");
		var shortcut = wshshell.CreateShortcut(specDir + "\\Audatex.lnk");
		shortcut.TargetPath = "C:\\Program Files\\Internet Explorer\\iexplore.exe";
		shortcut.Arguments = "http://platform.audatex.ca";
		shortcut.Save();
		alert("Shortcut creation successful!");
	} catch (err) {
		console.log(err);
		console.log("Shortcut failed");
		alert("Failed to create shortcut");
	}

}
