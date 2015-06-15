properties = {

	"js":{
		str:"JavaScript",
		req:"Enabled",
		value:"Enabled",
		version:null,
		pass:true,
		url:"http://activatejavascript.org/en/instructions/ie"
	},
	"java":{
		str:"Java",
		req:"1.7.71+, 32-bit",
		value:"Unknown",
		version:null,
		pass:null,
		url:"http://java.com/en/download/",
		requires: {
			majorVersion: 7,
			minorVersion: 71
		}
	},
	"browser":{
		str:"Browser",
		req:"Internet Explorer 10+",
		value:"Unknown",
		version:null,
		pass:null,
		url:"http://windows.microsoft.com/en-ca/internet-explorer/download-ie",
		requires: {
			'version': 10
		}
	},
	"screen":{
		str:"Screen Resolution",
		req:"1280x800 or better",
		value:"Unknown",
		version:null,
		pass:null,
		url:null,
		requires: {
			'height': 800,
			'width': 1280
		}
	},
	"os":{
		str:"Operating System",
		req:"Windows 7 or better",
		value:"Unknown",
		version:null,
		pass:null,
		url:null,
		requires: [
			'Windows 7',
			'Windows 8',
			'Windows 8.1'
		]
	},
	"cpu":{
		str:"CPU",
		req:"2.0+ GHz",
		value:"Unknown",
		version:null,
		pass:null,
		url:null,
		requires: {
			MHz: 2000
		}
	},
	"ram":{
		str:"RAM",
		req:"2+ GB",
		value:"Unknown",
		version:null,
		pass:null,
		url:null,
		requires: {
			'size':2147483648
		}
	},
	"hd":{
		str:"Hard Drive",
		req:"5+ GB available",
		value:"Unknown",
		version:null,
		pass:null,
		url:null,
		requires: {
			free: 5000000000	//In bytes
		}
	},
	"gpu":{
		str:"Video Card",
		req:"Intel 945/965, ATL Radeon R300 (9xxx),	Nvidia Geforce FX (5xxx), OpenGL 1.5",
		value:"Unknown",
		version:null,
		pass:null,
		url:"http://www.videocardbenchmark.net/gpu_list.php"
	},
	"speed":{
		str:"Internet Speed",
		req:"128 kb/s or higher",
		value:"Unknown",
		version:null,
		pass:null,
		url:null,
		requires: {
			speed: 128000
		}
	},
	"pdf":{
		str:"PDF Reader",
		req:"Adobe Reader 9.0+",
		value:"Unknown",
		version:null,
		pass:null,
		url:"http://get.adobe.com/reader/",
		requires: {
			'version': 9
		}
	},
	"lang":{
		str:"Language",
		req:"Canadian English or French",
		value:"Unknown",
		version:null,
		pass:null,
		url:"http://windows.microsoft.com/en-ca/windows-vista/change-your-internet-explorer-language-settings",
		requires: [
			'en-ca',
			'fr-ca'
		]
	}
};
