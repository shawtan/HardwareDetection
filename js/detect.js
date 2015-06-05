function detectPopup() {

	// Try to open a pop-up. Hopefully it triggers pop-up settings
	try {
		window.open("about:blank").close();
	} catch (e) {
		alert("Your pop-up settings probably aren't enabled!");
	}
}

function detectBrowser() {

	properties["browser"].value = bowser.name;
	properties["browser"].version = bowser.version;
	properties["browser"].pass = (bowser.msie !== undefined && parseFloat(bowser.version) >= 8.0);
}

function detectScreen() {
	var screenW = 640, screenH = 480;
	if (parseInt(navigator.appVersion,10)>3) {
		screenW = screen.width;
		screenH = screen.height;
	}
	else if (navigator.appName == "Netscape" 
		&& parseInt(navigator.appVersion,10)==3
		&& navigator.javaEnabled()
		) 
	{
		var jToolkit = java.awt.Toolkit.getDefaultToolkit();
		var jScreenSize = jToolkit.getScreenSize();
		screenW = jScreenSize.width;
		screenH = jScreenSize.height;
	}

	properties["screen"].value = screenW + "x" + screenH;

	properties["screen"].version = screen.colorDepth + "-bit colour"

	properties['screen'].pass = (screenW >= 1280 && screenH >= 800);
}


function detectOS() {
	var os = 'unknown';
	var clientStrings = [
	{s:'Windows 3.11', r:/Win16/, pass:false},
	{s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/, pass:false},
	{s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/, pass:false},
	{s:'Windows 98', r:/(Windows 98|Win98)/, pass:false},
	{s:'Windows CE', r:/Windows CE/, pass:false},
	{s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/, pass:false},
	{s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/, pass:true},
	{s:'Windows Server 2003', r:/Windows NT 5.2/, pass:false},
	{s:'Windows Vista', r:/Windows NT 6.0/, pass:true},
	{s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/, pass:true},
	{s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/, pass:true},
	{s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/, pass:true},
	{s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/, pass:false},
	{s:'Windows ME', r:/Windows ME/, pass:false},
	{s:'Android', r:/Android/, pass:false},
	{s:'Open BSD', r:/OpenBSD/, pass:false},
	{s:'Sun OS', r:/SunOS/, pass:false},
	{s:'Linux', r:/(Linux|X11)/, pass:false},
	{s:'iOS', r:/(iPhone|iPad|iPod)/, pass:false},
	{s:'Mac OS X', r:/Mac OS X/, pass:false},
	{s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/, pass:false},
	{s:'QNX', r:/QNX/, pass:false},
	{s:'UNIX', r:/UNIX/, pass:false},
	{s:'BeOS', r:/BeOS/, pass:false},
	{s:'OS/2', r:/OS\/2/, pass:false},
	{s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
	];
	for (var id in clientStrings) {
		var cs = clientStrings[id];
		if (cs.r.test(navigator.userAgent)) {
			properties["os"].value = cs.s;
			properties["os"].pass = cs.pass;
			return;
		}
	}
	properties["os"].pass = false;

}

function detectServicePack() {

	// var sp = javaApp.getServicePack();

	var loc = new ActiveXObject("WbemScripting.SWbemLocator");
	var svc = loc.ConnectServer(".", "root\\cimv2");
	coll = svc.ExecQuery("select * from Win32_OperatingSystem");
	var items = new Enumerator(coll);

	var sp = items.item().ServicePackMajorVersion;

	if (sp > 0){
		properties["os"].version = "Service Pack " + sp;
	}

	switch (properties["os"].value) {
		case 'Windows XP':
			properties["os"].pass = (sp >= 3);
			break;
		case 'Windows Vista':
			properties["os"].pass = (sp >= 2);
			break;
	}

}

function detectPDF() {

	var p = navigator.mimeTypes["application/pdf"];
	if (p == null) {

		var o = new ActiveXObject('AcroPDF.PDF');
		if (o == null) {
			properties["pdf"].value = "Not detected";
			properties["pdf"].pass = false;
			return;
		}

		var v = o.GetVersions();
		var ver = parseFloat(v.substring(v.indexOf('=')+1));
		properties["pdf"].value = 'Adobe Reader';
		properties["pdf"].version = ver;
		properties["pdf"].pass = (ver >= 9);
		return;

	}
	p = p.enabledPlugin;

	if (p == null) {
		properties["pdf"].value = "Not detected";
		properties["pdf"].pass = false;
		return;
	}

	properties["pdf"].value = p.name;
	properties["pdf"].version = p.version;

	if (p.name.toUpperCase().indexOf('ADOBE') >=0) {
		properties["pdf"].pass = (parseInt(p.version,10) >= 9);
	} else {
		properties["pdf"].pass = false;

	}
}

function detectLang() {

	var lang = navigator.userLanguage || navigator.language;
	
	properties["lang"].value = lang;
	properties["lang"].pass = (lang == 'en-CA');
	
}

function detectJava() {
// Requires 1.7.0_71 or above, 32-bit
// 'Java(TM)'

	if (!navigator.javaEnabled()) {

		properties['java'].value = "Not Enabled";
		properties['java'].pass = false;
		return;
	}

	// var v = javaApp.getJRE();
	var v = deployJava.getJREs()[0];

	properties["java"].value = "Enabled";
	properties['java'].version = v;

	v = v.substring(v.indexOf('.')+1);
	var major = parseInt(v,10);

	// var arch = javaApp.getBit();

	// if (arch.indexOf("64")<0){
	// 	properties['java'].version += ', 32-bit';
	// 	properties['java'].pass = true;
	// } else {
	// 	properties['java'].version += ', 64-bit';
	// 	properties['java'].pass = false;
	// 	return;
	// }

	if (major > 7) {
		properties['java'].pass = true;
		return;
	} else if (major < 7) {
		properties['java'].pass = false;
		return;		
	}

	v = v.substring(v.indexOf('_')+1);
	var rev = parseInt(v,10);

	if (rev >= 71) {
		properties['java'].pass = true;
		return;
	} else {
		properties['java'].pass = false;
		return;		
	}
} 

function detectUsingJava() {

	if (navigator.javaEnabled()){

		try {
			javaApp.getNum();
		} catch (e) {	// When the app is not loaded
    		// console.log(e);
			properties['java'].value = "Unavailiable";
			properties['java'].version = "Try refreshing the page";
			properties['java'].pass = false;
			return;
		}

		detectJava();
		detectRAM();
		detectHD();

		if (properties['os'].pass){
			detectServicePack();
		}

	} else {
		properties['java'].value = "Not Enabled";
		properties['java'].pass = false;
	}

	drawTable();

}

function detectCPU() {

	var WshShell = new ActiveXObject("WScript.Shell");
	var cpu = WshShell.RegRead("HKLM\\HARDWARE\\DESCRIPTION\\System\\CentralProcessor\\0\\~MHz");
	var cpuName = WshShell.RegRead("HKLM\\HARDWARE\\DESCRIPTION\\System\\CentralProcessor\\0\\ProcessorNameString");

	properties["cpu"].value = cpuName;

	if (cpuName.indexOf('GHz') < 0){
		properties["cpu"].version = ((cpu+5)/1000).toPrecision(3) + " GHz";
	}
	// console.log("cpu= "+cpu);
	properties["cpu"].pass = (cpu >= 1990); //Rounding*/

}


function detectRAM() {

	// var ram = javaApp.getRAM();

	var loc = new ActiveXObject("WbemScripting.SWbemLocator");
	var svc = loc.ConnectServer(".", "root\\cimv2");
	coll = svc.ExecQuery("select * from Win32_ComputerSystem");
	var items = new Enumerator(coll);

	var ram = items.item().TotalPhysicalMemory;


	properties["ram"].value = (ram / 1073741824 ).toFixed(1) + " GB";

	properties["ram"].pass = (ram >= 2147483648);	//2^30

}


function detectHD() {

	fso = new ActiveXObject("Scripting.FileSystemObject");

	var d = fso.getDrive(fso.getDriveName("C:\\"));

	var hd =  d.AvailableSpace;
	var total = d.TotalSize;

	// var hd = javaApp.getHardDrive();
	// console.log(hd);

	properties["hd"].value = (hd / 1000000000).toPrecision(3) + " GB Available";

	properties["hd"].pass = (hd >= 5000000000);

	// var total = javaApp.getHardDriveTotal();
	properties["hd"].version = (total / 1000000000).toPrecision(3) + " GB Hard Drive"

}


function detectGPU() {

	var WshShell = new ActiveXObject("WScript.Shell");
	var path = "HKLM\\HARDWARE\\DEVICEMAP\\VIDEO\\";
    // var keyRegex = /HKLM\\SYSTEM\\CurrentControlSet\\Control\\Video\\(.*?)\\0000\AdapterDesc/
    //"HKLM\\HARDWARE\\DEVICEMAP\\VIDEO\\Device\\Video";
    var rtn = regGetSubKeys(".","SYSTEM\\CurrentControlSet\\Control\\Video");

    for (var i = 0; i < rtn.length; i++) {
    	try {
    		var gpu = WshShell.RegRead("HKLM\\SYSTEM\\CurrentControlSet\\Control\\Video\\"+rtn[i]+"\\0000\\AdapterDesc");
    		properties["gpu"].value = gpu;
    		return;

    	} catch (e) {
    		console.log(e);
    		continue;
    	}
    };

	// var gpu = javaApp.getGPUName();


}

var HKLM = 0x80000002; 
//------------------------------------------------------------- 
// function : regGetSubKeyNames(strComputer, strRegPath) 
// 
//  purpose : return an array with names of any subKeys 
//------------------------------------------------------------- 
function regGetSubKeys(strComputer, strRegPath) 
{ 
	var aNames = null; 
	var objLocator     = new ActiveXObject("WbemScripting.SWbemLocator"); 
	var objService     = objLocator.ConnectServer(strComputer, "root\\default"); 
	var objReg         = objService.Get("StdRegProv"); 
	var objMethod      = objReg.Methods_.Item("EnumKey"); 
	var objInParam     = objMethod.InParameters.SpawnInstance_(); 
	objInParam.hDefKey = HKLM; 
	objInParam.sSubKeyName = strRegPath; 
	var objOutParam = objReg.ExecMethod_(objMethod.Name, objInParam); 
	switch(objOutParam.ReturnValue) 
	{ 
      case 0:          // Success 
      aNames = (objOutParam.sNames != null) ? objOutParam.sNames.toArray(): null; 
      break; 

      case 2:        // Not Found 
      aNames = null; 
      break; 
  } 
  return aNames;
}

function detectPorts() {

	//Requires ports 80 and 443

    var isAccessible = null;

    function checkConnection(port) {
        var url = "http://101.212.33.60:"+port+"/test/hello.html" ;
        $.ajax({
            url: url,
            type: "get",
            cache: false,
            dataType: 'jsonp', // it is for supporting crossdomain
            crossDomain : true,
            asynchronous : false,
            jsonpCallback: 'deadCode',
            timeout : 1500, // set a timeout in milliseconds
            complete : function(xhr, responseText, thrownError) {
                if(xhr.status == "200") {
                   isAccessible = true;
                   console.log(port+" pass");
                   properties['port'].value += port;
                }
                else {
                   isAccessible = false;
                   console.log(port+" fail");
                }
            }
       });
    }

    checkConnection(80);
    checkConnection(443);
}

function detectSpeed() {
	// Thank you stack overflow

	properties['speed'].value = "Starting speed test... Please wait";

	var startTime, endTime; 
	var download = new Image();
	download.onload = function() {
		endTime = (new Date()).getTime();
		calculateSpeed();
	}

	download.onerror = function (err, msg) {
        properties['speed'].value = "Speed test failed. Try using another speed test.";
    }

	startTime = (new Date()).getTime();
	var cacheBuster = "?nnn="+startTime;

	download.src = "test.jpg"+cacheBuster;
	// download.src = "http://www.kenrockwell.com/contax/images/g2/examples/31120037-5mb.jpg"+cacheBuster;

	setTimeout(function () {
		if (!endTime){
			properties['speed'].value = "Too slow";
			properties['speed'].pass = false;
			drawTable();
		}
	}, 20000);

	function calculateSpeed() {
		var duration = (endTime - startTime) /1000;
		var size = 200 * 1000 * 8;
		// var size = 4995374 * 1000 * 8;


		var speed = (size/duration);

		var speedValue;

		if (speed > 1000000000) {
			speedValue = (speed/1000000000).toFixed(2) + "Gb/s";
		} else if (speed > 1000000) {
			speedValue = (speed/1000000).toFixed(2) + "Mb/s";
		} else if (speed > 1000) {
			speedValue = (speed/1000).toFixed(2) + "kb/s";
		} else {
			speedValue = speed.toFixed(2) + "b/s"
		}
		properties['speed'].value = speedValue;

		properties['speed'].pass = (speed > 128*1000);

		drawTable();
	}

}