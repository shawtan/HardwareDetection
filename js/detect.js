function detectBrowser() {
	var nAgt = navigator.userAgent;

	// In Opera, the true version is after "Opera" or after "Version"
	if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
		browserName = "Opera";
		fullVersion = nAgt.substring(verOffset+6);
		if ((verOffset=nAgt.indexOf("Version"))!=-1) 
			fullVersion = nAgt.substring(verOffset+8);
	}
	// In MSIE, the true version is after "MSIE" in userAgent
	else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
		browserName = "Microsoft Internet Explorer";
		fullVersion = nAgt.substring(verOffset+5);
	}
	// In Chrome, the true version is after "Chrome" 
	else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
		browserName = "Chrome";
		fullVersion = nAgt.substring(verOffset+7);
	}
	// In Safari, the true version is after "Safari" or after "Version" 
	else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
		browserName = "Safari";
		fullVersion = nAgt.substring(verOffset+7);
		if ((verOffset=nAgt.indexOf("Version"))!=-1) 
			fullVersion = nAgt.substring(verOffset+8);
	}
	// In Firefox, the true version is after "Firefox" 
	else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
		browserName = "Firefox";
		fullVersion = nAgt.substring(verOffset+8);
	}
	// In most other browsers, "name/version" is at the end of userAgent 
	else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
		(verOffset=nAgt.lastIndexOf('/')) ) 
	{
		browserName = nAgt.substring(nameOffset,verOffset);
		fullVersion = nAgt.substring(verOffset+1);
		if (browserName.toLowerCase()==browserName.toUpperCase()) {
			browserName = navigator.appName;
		}
	}
		// trim the fullVersion string at semicolon/space if present
	if ((ix=fullVersion.indexOf(";"))!=-1)
	fullVersion=fullVersion.substring(0,ix);
	if ((ix=fullVersion.indexOf(" "))!=-1)
		fullVersion=fullVersion.substring(0,ix);

	majorVersion = parseInt(''+fullVersion,10);
	if (isNaN(majorVersion)) {
		fullVersion  = ''+parseFloat(navigator.appVersion); 
		majorVersion = parseInt(navigator.appVersion,10);
	}

	properties["browser"].value = browserName;
	properties["browser"].version = fullVersion;
	if (browserName == "Microsoft Internet Explorer"){
		properties["browser"].pass = true;
	}
}

function detectScreen() {
	var screenW = 640, screenH = 480;
	if (parseInt(navigator.appVersion)>3) {
		screenW = screen.width;
		screenH = screen.height;
	}
	else if (navigator.appName == "Netscape" 
		&& parseInt(navigator.appVersion)==3
		&& navigator.javaEnabled()
		) 
	{
		var jToolkit = java.awt.Toolkit.getDefaultToolkit();
		var jScreenSize = jToolkit.getScreenSize();
		screenW = jScreenSize.width;
		screenH = jScreenSize.height;
	}

	properties["screen"].value = screenW + "x" + screenH;
	if (screenW >= 1280 && screenH >= 800){
		properties['screen'].pass = true;
	}
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
}

function detectJava() {
	// Requires 1.7.0_71 or above, 32-bit
	if (navigator.javaEnabled()){
		var v = deployJava.getJREs()[0];

		properties["java"].value = "Enabled";
		properties['java'].version = v;

		v = v.substring(v.indexOf('.')+1);
		var major = parseInt(v);

		if (major > 7) {
			properties['java'].pass = true;
			return;
		} else if (major < 7) {
			properties['java'].pass = false;
			return;		
		}

		v = v.substring(v.indexOf('_')+1);
		var rev = parseInt(v);

		if (rev >= 71) {
			properties['java'].pass = true;
			return;
		} else {
			properties['java'].pass = false;
			return;		
		}



	} else {
		properties['java'].value = "Unavailiable";
		properties['java'].pass = false;
	}

}