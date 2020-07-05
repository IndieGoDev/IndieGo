/* *********************************************************************************************|
|------╔╦╗---------------------╔═══╗----╔╦╗----------------╔╦╗-╔╦╗--------------╔╦╦╗------------|
|------╠╬╣--------------------╔╝---╚╗---╠╬╣----------------╠╬╣-╠╬╣-------------╔╬╬╬╣------------|
|------╠╬╣-------------------╔╝-----╚╗--╠╬╣----------------╠╬╣-╚╩╝------------╔╬╬╩╩╝------------|
|--╔╦╗-╠╬╣---╔╦╦╦╗-╔╦╗--╔╦╗-╔╝--╔═╗--║--╠╬╣----╔╦╗-----╔╦╗-╠╬╣-╔╦╗---╔╦╦╦╗---╔╬╬╝--------╔╦╦╦╗--|
|-╔╬╬╣-╠╬╣--╔╬╬╬╬╬╗╚╬╬╗╔╬╬╝-║--╔╝-╚╗-║--╠╬╣---╔╬╬╬╗---╔╬╬╣-╠╬╣-╠╬╣--╔╬╬╬╬╬╗--╠╬╣--------╔╬╬╬╬╬╗-|
|╔╬╬╩╝-╠╬╣-╔╬╬╩╩╩╬╬╗╠╬╬╬╬╣--║-╔╝--╔╝╔╝--╠╬╣--╔╬╬╩╬╬╗-╔╬╬╩╝-╠╬╣-╠╬╣-╔╬╬╩╩╩╬╬╗-╠╬╣--╔╦╗--╔╬╬╩╩╩╬╬╗|
|╠╬╣---╠╬╣-╠╬╣--╔╬╬╣╚╬╬╬╬╝--║-╚╗-╔╣╔╝---╠╬╣--╠╬╣-╠╬╣-╠╬╣---╠╬╣-╠╬╣-╠╬╣--╔╬╬╣-╠╬╣--╚╬╬╗-╠╬╣---╠╬╣|
|╠╬╣---╠╬╣-╠╬╣-╚╩╩╩╝-╠╬╬╣---║--╚═╝╚╝----╠╬╣--╠╬╣-╠╬╣-╠╬╣---╠╬╣-╠╬╣-╠╬╣-╚╩╩╩╝-╚╬╬╗--╠╬╣-╠╬╣---╠╬╣|
|╚╬╬╦╦╦╬╬╝-╚╬╬╦╗-----╚╬╬╝---╚╗----------╠╬╣--╠╬╣-╠╬╣-╚╬╬╦╦╦╬╬╝-╠╬╣-╚╬╬╦╗------╚╬╬╦╦╬╬╝-╚╬╬╦╦╦╬╬╝|
|-╚╬╬╬╬╬╝---╚╬╬╬╗-----╠╣-----╚╗----╔╝---╠╬╣--╠╬╣-╠╬╣--╚╬╬╬╬╬╝--╠╬╣--╚╬╬╬╗------╚╬╬╬╬╝---╚╬╬╬╬╬╝-|
|--╚╩╩╩╝-----╚╩╩╩╝----╚╝------╚════╝----╚╩╝--╚╩╝-╚╩╝---╚╩╩╩╝---╚╩╝---╚╩╩╩╝------╚╩╩╝-----╚╩╩╩╝--|
|***********************************************************************************************|
| File     	- Connection.js
| Overview 	- Server & Database Input-Output process
| Version  	- 0.0.1
| Copyright	- © 2019, Huda Makruf.
| License  	- Under the MIT License
| Author   	- Huda Makruf (huda_makruf@outlook.com | hudamaruf@gmail.com)
| Website  	- http://indiego.heliohost.org (dev@indiego.heliohost.org)
| Made with	- ♡ and javascript based on ES2018
| Sections 	- PREFIXES
|          	- SCRIPT EXECUTER
|          	- OPEN DATABASE
|          	- RES DATABASE
|          	- STREAM IO
|          	- SERVER IO
|          	- FILE IO
|          	- DATA IO
|          	- EVENT HANDLER
|          	- INPUT HANDLER
|***********************************************************************************************/
(() => { 'use strict';
	/*__________________________________________________________________________

		PREFIXES
	__________________________________________________________________________*/
	self.root = {};
	self.Event = {};
	root.indexedDB = self.indexedDB || self.mozIndexedDB || self.webkitIndexedDB || self.msIndexedDB;
	self.IDBTransaction = self.IDBTransaction || self.webkitIDBTransaction || self.msIDBTransaction;
	self.IDBKeyRange = self.IDBKeyRange || self.webkitIDBKeyRange || self.msIDBKeyRange;
	self.reload = () => postMessage({ type:'reload' });
	self.alert = message => postMessage({ type:'alert', message:message });
	self.notify = (title, body) => postMessage({ type:'notify', title:title, body:body });
	self.console.style = (mode, msg, style) => postMessage({ type:'console', mode:mode, msg:msg, style:style });
	// Declaration
	const PROGRAM = '3D-Program.js';
	const KB = 2**10, MB = 2**20, GB = 2**30;
	let DB = null, DB_RES_KEY = null, ENC = new Encryption();
	/*__________________________________________________________________________

		SCRIPT EXECUTER
	__________________________________________________________________________*/
	self.include = (link, notJS) => {
		ENC.setKey(DB_RES_KEY);
		return new Promise((solve, eject) => {
			let get = DB.transaction('res', 'readonly').objectStore('res').get(ENC.encode(link));
			get.onsuccess = e => {
				let val = ENC.decode(e.target.result.value);
				if(notJS) solve(val);
				else solve(Function(val)());
			};
			get.onerror = e => {
				alert('File not found: '+link);
				eject();
			};
		});
	};
	/*__________________________________________________________________________

		OPEN DATABASE
	__________________________________________________________________________*/
	const openDatabase = (dbName, dbVer) => {
		let isUpdate = false;
		let dbOpenRequest = root.indexedDB.open(dbName, dbVer);
		dbOpenRequest.onerror = e => { alert('Error loading database.'), reload() };
		dbOpenRequest.onupgradeneeded = e => {
			isUpdate = true;
			DB = e.target.result;
			if (e.oldVersion > 1) {
				DB.deleteObjectStore('res');
				DB.deleteObjectStore('tmp');
				console.style('warn','Updating database...','warn');
			} else console.style('warn','Creating database...','warn');
			let db_res = DB.createObjectStore('res', { keyPath: 'key', autoIncrement: false });
			let db_tmp = DB.createObjectStore('tmp', { keyPath: 'key', autoIncrement: false });
			db_res.createIndex('value', 'value', { unique: false, multiEntry: true });
			db_tmp.createIndex('value', 'value', { unique: false, multiEntry: true });
			let key = ENC.getKey;
			db_res.add({ key:'IndieGo', value:ENC.u8_str(key) });
		};
		dbOpenRequest.onsuccess = e => {
			isUpdate = true; // For testing
			DB = e.target.result;
			DB.transaction('res', 'readwrite')
				.objectStore('res')
				.get('IndieGo')
				.onsuccess = e => {
					DB_RES_KEY = e.target.result.value;
					ENC.setKey(DB_RES_KEY);
					if(!isUpdate) include(PROGRAM);
					else dataIO('res');
				};
		};
	};
	/*__________________________________________________________________________

		RES DATABASE
	__________________________________________________________________________*/
	const resDownloader = data => {
		if(!data) serverIO('res', ENC.pack('GET|RES'));
		else {
			data = ENC.unpack(data)[0];
			let link = JSON.parse(data);
			data = null;
			addResDB(link).then(()=>include(PROGRAM));
		};
	};
	const addResDB = async link => {
		for (let i=0, len=link.length; i<len; i++) {
			await new Promise(solve => {
				let es = new EventSource('\x3F'+link[i]);
				let ping = e => { es.close(), solve() };
				let msg = e => {
					let unpack = ENC.unpack(atob(e.data));
					ENC.setKey(DB_RES_KEY);
					let dbKey = ENC.encode(unpack[0]);
					let dbVal = ENC.encode(ENC.u8_str(unpack[1]));
					let db_res = DB.transaction('res', 'readwrite').objectStore('res');
					db_res.put({ key:dbKey, value:dbVal });
					unpack = dbKey = dbVal = null;
				};
				es.addEventListener('message', msg);
				es.addEventListener('ping', ping);
			});
		};
		console.style('info','Database finish.','indiego');
		return;
	};
	/*__________________________________________________________________________

		STREAM IO
	__________________________________________________________________________*/
	const reqEventSource = (fps, id, offset) => {
		let buff = new ArrayBuffer(8);
		let u32 = new Uint32Array(buff);
		u32[0] = id, u32[1] = offset;
		let cmd = [fps].concat(Array.from(new Uint8Array(buff)));
		buff = u32 = null;
		ENC.getKey;
		cmd = ENC.pack(cmd,0,1);
		let close = false;
		let es = new EventSource('?E'+cmd);
		const msg = e => atob(e.data);
		const ping = (e,x=0) => x?es.close():x=1;
		es.addEventListener('message', msg);
		es.addEventListener('ping', ping);
	};
	const webEvent = data => {
			let unpack = ENC.unpack(atob(e.data));
			let dbKey = ENC.encode(unpack[0]);
			let dbVal = ENC.encode(ENC.u8_str(unpack[1]));
			let es = new EventSource('\x3F'+link[i]);
			let ping = e => { es.close(), solve() };
			let msg = e => {
			};
			es.addEventListener('message', msg);
			es.addEventListener('ping', ping);
	}
	const webSocket = id => {
		let link = location.origin + location.pathname + id;
		link = link.replace('https:', 'wss:');
		link = link.replace('http:', 'ws:');
		let ws = new WebSocket(link, ["one","two"]);
		ws.onopen = e => ws.send("Here's some text that the server is urgently awaiting!");
		ws.onmessage = e => console.log(e.data);
	};
	/*__________________________________________________________________________

		SERVER IO
	__________________________________________________________________________*/
	const serverIO = (mode, file) => {
		let formData = new FormData();
		formData.append(file.name, file);
		let xhr = new XMLHttpRequest();
		xhr.open('POST','',true);
		xhr.timeout = 1000*60;
		xhr.responseType = 'arraybuffer';
		xhr.onload = e => {
			if (e.target.status >= 200 && e.target.status <= 300) {
				dataIO(mode, e.target.response);
			}
			else {
				if(mode === 'upload') Event.file.upload.status = 2; //0:complete, 1:progress, 2:errors
				if(mode === 'download') Event.file.download.status = 2; //0:complete, 1:progress, 2:errors
			};
			xhr = formData = null;
		};
		xhr.send(formData);
	};
	/*__________________________________________________________________________

		FILE IO
	__________________________________________________________________________*/
	const fileReader = file => {
		return new Promise(solve => {
			let reader = new FileReader();
			reader.onloadend = e => {
				let u8 = new Uint8Array(e.target.result);
				solve(u8);
			};
			reader.readAsArrayBuffer(file);
		});
	};
	const fileUploader = data => {
		let file = Event.file.upload.list[0];
		let history = {
			name: file.name,
			size: file.size,
			type: file.type,
			lastModified: file.lastModified,
			status: Event.file.upload.status,
		};
		let blob = files[0].slice(0);
		file = new File([blob], files[0].name, {
			lastModified: files[0].lastModified,
			type: files[0].type,
		});
		let reader = new FileReader();
		reader.onload = e => {
			console.info(e.target.result);
		};
		reader.onerror = e => {
			alert(e.target.error);
		};
		reader.readAsArrayBuffer(file);
	};
	/*__________________________________________________________________________

		DATA IO
	__________________________________________________________________________*/
	const dataIO = (mode, data) => {
		switch(mode) {
			case 'res':
				resDownloader(data);
				break;
			case 'upload':
				fileUploader(data);
				break;
			default: break;
		}
	};
	/*__________________________________________________________________________

		EVENT HANDLER
	__________________________________________________________________________*/
	Event.file = {
		mode: 'none',
		upload: {
			list: [],
			progress: [0, 0, 0], // [offset, length, bytes_total]
			status: 0, // 0 = complete, 1 = progress, 2 = errors
			history: [],
		},
		download: {
			list: [],
			progress: [0, 0, 0], // [offset, length, bytes_total]
			status: 0, // 0 = complete, 1 = progress, 2 = errors
			history: [],
		},
	}
	Event.__proto__.files = function(files) {
		postMessage({ type:'unselect_files' });
		alert(files[0].name);
		if(this.file.mode === 'none') return;
		if(this.file.mode === 'upload') this.file.upload.list.concat(files);
		dataIO(this.file.mode, false);
	};
	/*__________________________________________________________________________

		INPUT HANDLER
	__________________________________________________________________________*/
	const connection_message = e => {
		switch(e.data.type) {
			case 'files':
				Event.files(e.data.files);
				break;
			case 'canvas':
				root.canvas = e.data.canvas;
				break;
			default: break;
		};
	};
	addEventListener('message', connection_message);

	// Connection Respond
	postMessage({ type:'respond' });

	// Run a program
	openDatabase('IndieGo', 2);
})();