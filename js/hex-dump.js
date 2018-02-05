var HexDump = {};

HexDump.cleanup = function(hexString) {
	var text = hexString.replace(/\s*/gim,"");
	
	if (text.length % 2 == 1) {
		
	}
	
	return text;
};

HexDump.formatHexDump = function(element, hexString) {
	var outputHtml = "<div class=\"hex-dump-container\"><div class=\"hex-dump-panel\">";
	
	outputHtml += HexDump.formatOffsetPanel(hexString);
	outputHtml += HexDump.formatBodyPanel(hexString);
	//HexDump.formatCharacterPanel();
	
	//outputHtml += hexString;
	
	outputHtml += "<div style=\"clear: both;\" /></div></div>"; 
	
	element.innerHTML = outputHtml;
};

HexDump.formatBodyPanel = function(hexString) {
	var outputHtml = "<div class=\"hex-dump-body-panel\">";
	
	var offset = 0;
	for (var i=0;i<hexString.length;i+=2,offset++) {
		var byte = hexString.substr(i,2);
		
		outputHtml += HexDump.formatBodyCell(offset, byte);
	}
	
	outputHtml += "</div>";
	
	return outputHtml;
};

HexDump.formatBodyCell = function(offset, byte) {
	var classes=[];
	
	if (offset % 8 == 0) {
		classes.push("group8b");
	}
	
	if (offset > 0 && offset % 64 == 0) {
		classes.push("group-row");
	}
	
	var cellClass="";
	if (classes.length > 0) {
		cellClass = "class=\""+classes.join(" ")+"\"";
	}
	
	var out = "<span "+cellClass+" data-offset=\""+offset+"\">"+byte+"</span>";
	
	return out;
};

HexDump.formatOffsetPanel = function(hexString) {
	var outputHtml = "<div class=\"hex-dump-offset-panel\">";
	
	var len = hexString.length / 2;
	
	for (var offset = 0 ; offset < len; offset += 16) {
		outputHtml += HexDump.formatOffsetCell(offset);
	}
	
	outputHtml += "</div>";
	
	return outputHtml;
};

HexDump.formatOffsetCell = function(offsetValue) {
	var hexValue = Utils.Text.intToHex(offsetValue);	
	var decValue = offsetValue;
	
	var nh = ("000000" + hexValue).substr(-6);
	var nd = ("00000000" + decValue).substr(-8);
	
	var cellClass="";
	
	if (offsetValue>0 && offsetValue % 64 == 0) {
		cellClass="class=\"group-row\""
	}
	
	return "<span "+cellClass+" data-offset=\""+offsetValue+"\">"+nh+":"+nd+"</span>";
};
