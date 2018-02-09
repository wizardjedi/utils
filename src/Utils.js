const Utils = {};
Utils.Text = {};
Utils.Text.isPrint=function(val) {
	if (val > 0x20 && val <= 0x7f) {
		return true;
	} else {
		return false;
	}
};

Utils.Text.HexSymbols = "0123456789ABCDEF";
Utils.Text.intToHex = function(val) {
	if (val > 255) {
		//var H = Utils.Text.byteToHex(val >> 8);
		var H = Utils.Text.intToHex(val >> 8);
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
	for (var i=0;i<s.length;i++) {
		result.push(Utils.Text.intToHex(s.charCodeAt(i)));
	}
	
	return result.join('');
};

Utils.Text.hexToIntArray=function(hexString) {
	var upperHexString = hexString.toUpperCase();
	
	var result=[];
	var currentValue=0;
	for (var i=0;i<upperHexString.length;i++) {
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
	
	for (var i=0;i<intArray.length;i++) {
		result.push(String.fromCharCode(intArray[i]));
	}
			 
	return result.join('');	 
};

Utils.Buffer = {};

Utils.Buffer.create = function(intArray) {
	var buffer = {
		data: intArray,
		length: intArray.length,
		position:0,
		cap:function() {
			return this.length - this.position;
		},
		readByte:function() {
			var b = this.data[this.position];
			this.position++;
			
			return b;
		},
		readShort:function() {
		  var res = 0;
			for (var i=0;i<2;i++) {
				res = (res << 8) + this.readByte();
			}

			return res;	
		},
		readInt:function() {
			var res = 0;
			for (var i=0;i<4;i++) {
				res = (res << 8) + this.readByte();
			}

			return res;
		}
	};
	
	return buffer;
};

Utils.Bytes = {};

Utils.Bytes.readLong=function(array) {
	var res = 0;
	for (var i=0;i<4;i++) {
		res = (res << 8) + array[i];
	}
	
	return res;
}

Utils.Smpp = {};

Utils.Smpp.DataTypes = {};

Utils.Smpp.DataTypes.Integer = {
	read:function(buf) {
		return buf.readInt();
	}
};
Utils.Smpp.DataTypes.CString = {};
Utils.Smpp.DataTypes.String = {};
Utils.Smpp.DataTypes.Integer = {};
/*
var hexDumpStr="0000007500000004000000000000000200010131393438000000313233343536373839000000000000000003000568656C6C6F000500010000070001010006000101000800020000042400000019000100020F000101020E0001010421000101000D000100000F000101000E000101001000020000";

var intArr = Utils.Text.hexToIntArray(hexDumpStr);

var buf = Utils.Buffer.create(intArr);

console.log("Length:" + buf.readInt() +":" + buf.cap());
console.log("Command ID:" + buf.readInt() +":" + buf.cap());
console.log("Status:" + buf.readInt() +":" + buf.cap());
console.log("Sequence number:"+buf.readInt() +":" + buf.cap());*/


export {Utils}