var HexDump = {};

HexDump.cleanup = function(hexString) {
	var text = hexString.replace(/\s*/gim,"");
	
	if (text.length % 2 == 1) {
		
	}
	
	return text;
};

HexDump.formatHexDump = function(element, hexString) {
	HexDump.formatOffsetPanel();
	HexDump.formatDataPanel();
	HexDump.formatCharacterPanel();
};

HexDump.formatOffsetPanel = function(hexString) {
	
};

HexDump.formatOffsetCell = function(offsetValue) {
	var hexValue = 0;	
	
	return "<span data-offset=\""+offsetValue+"\">"+hexValue+":"+offsetValue+"</span>";
};
