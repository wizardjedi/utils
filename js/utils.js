var Utils = {};
Utils.Text = {};
Utils.Text.isPrint=function(val) {
	if (val > 0x1f && val != 0x7f) {
		return true;
	} else {
		return false;
	}
};

Utils.Text.HexSymbols = "0123456789ABCDEF";
Utils.Text.intToHex = function(val) {
	if (val > 255) {
		var H = Utils.Text.byteToHex(val >> 8);
		var L = Utils.Text.byteToHex(val & 0xFF);
				
		return ""+H+L;
	} else {
		return Utils.Text.byteToHex(val);
	}
};
Utils.Text.byteToHex = function(val) {
	var H = Utils.Text.halfByteToHex(val >> 4);
	var L =	Utils.Text.halfByteToHex(val & 0xF);
	
	return ""+H+L;
};
Utils.Text.halfByteToHex = function(val) {
	return Utils.Text.HexSymbols.charAt(val & 0xF);
};

Utils.Text.stringToHex=function(s) {
	var result=[];
	for (i=0;i<s.length;i++) {
		result.push(Utils.Text.intToHex(s.charCodeAt(i)));
	}
	
	return result.join('');
};

Utils.Text.hexToIntArray=function(hexString) {
	var upperHexString = hexString.toUpperCase();
	
	var result=[];
	var currentValue=0;
	for (i=0;i<upperHexString.length;i++) {
		if (i % 2 == 1) {
			currentValue |= Utils.Text.HexSymbols.indexOf(upperHexString.charAt(i)); 
			result.push(currentValue);						
		} else {
			currentValue = Utils.Text.HexSymbols.indexOf(upperHexString.charAt(i)) << 4; 
		}
	}
			 
	return result;	 
};

Utils.Text.intArrayToString=function(intArray) {
	var result=[];
	
	for (i=0;i<intArray.length;i++) {
		result.push(String.fromCharCode(intArray[i]));
	}
			 
	return result.join('');	 
};

console.log(Utils.Text.intArrayToString([0x31,0x32,0x33]));
