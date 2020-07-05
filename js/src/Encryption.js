/* Author: Huda Makruf (huda_makruf@outlook.com | hudamaruf@gmail.com) */
self.Encryption = class Encryption {
	constructor(key) {
		if(typeof key === 'string') key = this.str_u8(key);
		this.key = !key ? this.hex2key(this.getHex()) : Array.from(key);
	};
	get getKey() {
		return this.key = this.hex2key(this.getHex(1));
	};
	setKey(key) {
		if(typeof key === 'string') key = this.str_u8(key);
		this.key = Array.from(key);
	};
	getHex(mode) {
		let hex = '0123456789ABCDEF';
		if(!mode) return hex;
		else {
			hex = hex.split('');
			for (let i = hex.length, r, t; i > 0; i--) {
				r = Math.trunc(Math.random()*i);
				t = hex[i], hex[i] = hex[r], hex[r] = t;
			};
			return hex.join().replace(/,/g,'');
		};
	};
	u8_str(u8) {
		let str = '';
		u8.forEach(dec => str += String.fromCharCode(dec));
		return str;
	};
	str_u8(u8) {
		u8 = u8.split('');
		u8.forEach((str,i) => u8[i] = str.charCodeAt());
		return u8;
	};
	str_bin(data) {
		let val = [];
		for(let i = 0, len = data.length; i < len; i+=4) {
			val.push(parseInt('0x'+data.substr(i,4)));
		};
		return val;
	};
	hex_u32(data) {
		let val = [];
		for(let i = 0, len = data.length; i < len; i+=8) {
			val.push(parseInt('0x'+data.substr(i,8)));
		};
		return val;
	};
	hex2key(hex) {
		let buff = new ArrayBuffer(8);
		let u32 = new Uint32Array(buff);
		u32[0] = parseInt('0x'+hex.substr(0,8));
		u32[1] = parseInt('0x'+hex.substr(8));
		let u8 = new Uint8Array(buff);
		buff = u32 = null;
		return Array.from(u8);
	};
	key2hex(key) {
		let hex = this.getHex(), val = '';
		let buff = new ArrayBuffer(8);
		let u8 = new Uint8Array(buff);
		key.forEach((dec, i) => u8[i] = dec);
		let u32 = new Uint32Array(buff);
		u32.forEach(dec => val += this.convert(dec, hex, 32));
		hex = buff = u32 = u8 = null;
		return val;
	};
	convert(dec, hex, uInt) {
		let byte = hex.length, pos = [], mask = [], val = '';
		for (let i = 0, lim = 0, len = uInt/4; i < len; lim = 0, i++) {
			for (let ii = 0; ii < i; ii++) lim += pos[ii]*mask[ii];
			mask[i] = byte**(len-1-i);
			pos[i] = Math.trunc((dec-lim)/mask[i]);
			val += hex[pos[i]];
		};
		return val;
	};
	encode(u8) {
		let mode = (typeof u8 === 'string') ? 1 : 0;
		if(mode) u8 = this.str_u8(u8);
		let key = this.key2hex(this.key);
		for (let i = 0, len = u8.length; i < len; i++) {
			u8[i] = parseInt('0x' + this.convert(u8[i], key, 8));
		};
		if(mode) return this.u8_str(u8);
	};
	decode(u8) {
		let mode = (typeof u8 === 'string') ? 1 : 0;
		if(mode) u8 = this.str_u8(u8);
		let hex = this.getHex();
		let key = this.key2hex(this.key);
		for (let i = 0, hex2, hex3, len = u8.length; i < len; i++) {
			hex2 = this.convert(u8[i], hex, 8);
			hex3 = hex[key.indexOf(hex2[0])];
			hex3 += hex[key.indexOf(hex2[1])];
			u8[i] = parseInt('0x' + hex3);
		};
		if(mode) return this.u8_str(u8);
	};
	pack(cmd, data) {
		if(typeof cmd === 'string') cmd = this.str_u8(cmd);
		if(data) data = new Uint8Array(data), this.encode(data);
		let val = Array.from(this.key);
		this.encode(cmd), cmd = Array.from(cmd), cmd.unshift(cmd.length);
		val = val.concat(cmd);
		if(data) val = val.concat(Array.from(data));
		cmd = data = null;
		return new File([new Uint8Array(val)],'IGX');
	};
	unpack(data) {
		data = (typeof data === 'string')
			? this.str_u8(data)
			: new Uint8Array(data);
		this.key = Array.from(data.slice(0,8));
		let cmd = data.slice(9, 9 + data[8]);
		data = data.slice(9 + data[8]);
		this.decode(cmd), this.decode(data);
		return [this.u8_str(cmd), data];
	};
};