/*

    Adobe PDF Reader detector v0.3.2
    By Eric Gerds   http://www.pinlady.net/PluginDetect/

 Note:
  1) In your web page, load the PluginDetect script BEFORE you load this script.
  2) In your web page, have the output <div> BEFORE this script. The <div> looks like this:
       <div id="detectAdobeRdr_output"></div>
  3) Feel free to modify this script as you wish.


*/


(function(){


 // Object that holds all data on the plugin
 var P = {name:"AdobeReader", status:-1, version:null, minVersion:"8,0,0,0"},
      $ = PluginDetect;

 var out = document.getElementById("detectAdobeRdr_output");  // node for output text

 // The DummyPDF path can be relative or absolute.
 // Only the very first AdobeReader PluginDetect command that is executed
 // needs to have the DummyPDF input argument. You do not have to specify this input arg in
 // any subsequent AdobeReader PluginDetect commands.
 //
 // Note: if the Adobe Reader detection takes too long for you on Internet Explorer,
 // then you might speed up the results by setting DummyPDF = null. However,
 // this may reduce the precision given by PluginDetect.getVersion().
 // It's a tradeoff between speed and precision in this case.
 var DummyPDF = "../files/detectAdobe.pdf";


 // $.onBeforeInstantiate(P.name, function($){alert("[ $.onBeforeInstantiate(...) ]");})


 // Return text message based on plugin detection result
 var getStatusMsg = function(obj)
 {
   var Msg1 = " [PDF documents may be displayed using your browser with the Adobe plugin ";
   var Msg2 = "(but <object>/<embed> tags cannot be used) ";
   var Msg3 = "and/or using the Adobe Reader standalone application.]";

   if (obj.status==1) return "installed & enabled, version is >= " +
          obj.minVersion + Msg1 + Msg3;
   if (obj.status==0) return "installed & enabled, version is unknown" + Msg1 + Msg3;
   if (obj.status == -0.5 || obj.status == 0.5)
          return "detection not completed yet, requires NOTF detection";
   if (obj.status==-0.1) return "installed & enabled, version is < " +
          obj.minVersion + Msg1 + Msg3;
   if (obj.status==-0.15) return "installed but not enabled for <object>/<embed> tags. " +
      "This result occurs for Internet Explorer when the Adobe Reader ActiveX " +
      "control is disabled in the add-ons menu." + Msg1 + Msg2 + Msg3;
   if (obj.status==-1) return "not installed or not enabled " +
      "[The browser plugin is not installed/not enabled. However, it is still possible " +
      "that the Adobe Reader standalone application may be on your computer and can " +
      "display PDF documents. Note: PluginDetect can only detect browser plugins, " +
      "not standalone applications.]";
   if (obj.status==-1.5) return "unknown " +
      "[Unable to determine if the Adobe Reader plugin is installed and able " +
      "to display PDF documents in your browser. " +
      "This result occurs for Internet Explorer when ActiveX is disabled and/or " +
      "ActiveX Filtering is enabled. " +
      "Note: the Adobe Reader plugin can display a PDF document with or without " +
      "ActiveX in Internet Explorer. Without ActiveX, however, we cannot detect " + 
      "the presence of the plugin and we cannot use <object>/<embed> tags to display a PDF.]";

   if (obj.status==-3) return "error...bad input argument to PluginDetect method";
   return "unknown";

 };   // end of getStatusMsg()


 // Add text to output node
 var docWrite = function(text)
 {
     if (out){
        if (text){
          text = text.replace(/&nbsp;/g,"\u00a0");
          out.appendChild(document.createTextNode(text));
        };
        out.appendChild(document.createElement("br"));
     };
 };



var displayResults = function(){

   if ($.getVersion)
   {
      // Detect Plugin Version
      P.version = $.getVersion(P.name);
      docWrite("Adobe plugin version: " + P.version);
      docWrite("");
   };


   if ($.isMinVersion)
   {
      // Detect Plugin Status
      P.status = $.isMinVersion(P.name, P.minVersion);
      docWrite("Adobe plugin status: " + getStatusMsg(P));
      docWrite("");
   };


   if ($.getInfo)
   {
      // Get extra plugin info
      var INFO = $.getInfo(P.name);

      if (INFO)
      {
         var precision = INFO.precision; // 0 - 4
         precision = (["A", "B", "C", "D"].slice(0, precision)).concat(["0", "0", "0", "0"].slice(0,4-precision)).join();
         docWrite("Detected version precision: " + precision);

         if (INFO.OTF===0) docWrite("Detection: completed ON THE FLY (OTF)")
         else if (INFO.OTF==2) docWrite("Detection: completed NOT ON THE FLY (NOTF)")
         else if (INFO.OTF==1) docWrite("Detection: not completed yet, requires NOTF detection.");

         docWrite("DummyPDF file was used for detection in this browser: " +
          (INFO.DummyPDFused ? "true" : "false"));

         docWrite("");
      }

   }


   if ($.browser.isIE)
   {
      docWrite("ActiveX enabled / ActiveX scripting enabled: " +
        ($.browser.ActiveXEnabled ? "true" : "false [this prevents detection of the plugin in Internet Explorer]")
      );
      docWrite("ActiveX Filtering enabled: " +
        ($.browser.ActiveXFilteringEnabled ? "true [this prevents detection of the plugin in Internet Explorer]" : "false")
      );
   };

}; // end of displayResults()


// Display results when detection is completed
$.onDetectionDone(P.name, displayResults, DummyPDF);



})();    // end of function



