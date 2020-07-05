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
| File     	- IndieGo-Client.js
| Overview 	- Interface of main process
| Version  	- 0.0.1
| Copyright	- © 2019, Huda Makruf.
| License  	- Under the MIT License
| Author   	- Huda Makruf [ huda_makruf@outlook.com | hudamaruf@gmail.com ]
| Website  	- http://indiego.heliohost.org (dev@indiego.heliohost.org)
| Made with	- ♡ and javascript based on ES2018
| Sections 	- PREFIXES
|          	- INIT WORKER
|          	- REQUEST ANIMATION
|          	- ERROR HANDLER
|          	- EVENT HANDLER
|          	- INPUT HANDLER
|***********************************************************************************************/
((Win, Doc, Root) => { 'use strict';
	/*__________________________________________________________________________

		PREFIXES
	__________________________________________________________________________*/
	Win.requestAnimationFrame = Win.requestAnimationFrame || Win.mozRequestAnimationFrame || Win.webkitRequestAnimationFrame || Win.msRequestAnimationFrame;
	Element.prototype.requestFullscreen || Element.prototype.mozRequestFullscreen || Element.prototype.webkitRequestFullscreen;
	Element.prototype.newChild = function(element, ...attributes) {
		let el = document.createElement(element);
		attributes.forEach(attr => {
			attr = attr.split('|');
			let name = attr[0];
			let value = attr[1]
			if (!value) value = '';
			el.setAttribute(name, value);
		});
		Object.defineProperty(el, 'css', {
			set: function(css) {
				Object.entries(css).forEach(([key, value]) => {
					let fix = ['', '-ms-', '-moz-', '-webkit-'];
					for(let i=0, len=fix.length; i<len; i++) {
						if(typeof this.style[fix[i]+key] === 'string') {
							this.style[fix[i]+key] = value;
							break;
						}
					}
				});
			}
		});
		this.append(el);
		return el;
	}
	Object.prototype.clone = e => {
		let result = {};
		for (let x in e) {
			if (x == x.toUpperCase()) continue;
			var prop = e[x];
			if (typeof prop === 'number' || typeof prop === 'string') result[x] = prop;
		}
		return result;
	}
	console.style = function(mode, msg, style) {
		let css = 'padding:2px; font-size:10px; font-family:"Segoe Script";';
		let color = {
			indiego:'color:white; background-color:indigo;',
			error:'color:white; background-color:crimson;',
			warn:'color:saddleBrown; background-color:sandyBrown;',
			auto:'color:auto; background-color:none;',
		}
		return this[mode]('%c'+msg, color[style]+css);
	}
	const notify = (title,body) => {
		if(!"Notification" in Win) console.style('error','Notification not supported!','error');
		else if(Notification.permission === 'granted') {
			new Notification(title, { icon:'favicon.ico', body:body });
			Win.navigator.vibrate([300,100,200]);
		}
		else if(Notification.permission !== 'denied') {
			Notification.requestPermission(permission => {
				if(!('permission' in Notification)) Notification.permission = permission;
				if(permission === 'granted') {
					new Notification(title, { icon:'favicon.ico', body:body });
					Win.navigator.vibrate([300,100,200]);
				}
			});
		}
		else if(Notification.permission === 'denied') {
			console.style('error','Notification permission denied!','error');
		}
	};
	/*__________________________________________________________________________

		INIT WORKER
	__________________________________________________________________________*/
	Win.onload = () => {
		Win.onload = null;
		init();
	}
	const init = () => {
		try {
			// Just Welcome
			console.log('%c\u0F17', 'color:white; font-size:30px; background-color:indigo; padding:10px');
			const canvas = Doc.body.newChild('canvas');
			canvas.width = canvas.clientWidth;
			canvas.height = canvas.clientHeight;
			let importJS = Doc.scripts[0].text.split('\x52');
			const worker = new Worker('\x3F'+importJS.shift());
			const offscreen = canvas.transferControlToOffscreen();
			initEventHander(worker, canvas);
			initInputWorker(worker, canvas, offscreen);
			worker.postMessage({ type:'init', import:importJS });
		}
		catch(err) { errorHandler(err) }
	}
	/*__________________________________________________________________________

		REQUEST ANIMATION
	__________________________________________________________________________*/
	const requestAnimation = (worker, fps) => {
		fps = 1/fps;
		let oldTime = 0;
		let deltaTime = 0;
		const animation = time => {
			time *= 0.001	// Convert to second
			if (oldTime === 0) oldTime = time;
			deltaTime += time - oldTime;
			oldTime = time;
			if (deltaTime >= fps) {
				worker.postMessage({
					type: 'update',
					deltaTime: fps,
				});
				deltaTime -= fps;
			}
			requestAnimationFrame(animation);
		}
		animation(0);
	}
	/*__________________________________________________________________________

		ERROR HANDLER
	__________________________________________________________________________*/
	const errorHandler = err => {
		let offscreenError = err.message.search('transferControlToOffscreen');
		let supportList = supportBrowser();
		let firefoxAgent = supportList.search('Firefox');
		// Firefox error
		if (firefoxAgent != -1 && offscreenError != -1) {
			let message =
				'"OffscreenCanvas()" feature is disabled\n'+
				'Please visit [about:config], then change\n'+
				'a "gfx.offscreencanvas.enabled" to "true"';
			if (confirm(message)) open('about:blank');
			else location.reload();
		}
		// Other errors
		else alert(err.name+':\n'+err.message);
	}
	const supportBrowser = () => {
		let browserList = '';
		let isSupported = false;
		let userAgent = navigator.userAgent.split(' ');
		userAgent.forEach((data, i) => {
			data = data.split('/');
			if(data.length > 1) {
				let appName = data[0];
				let version = data[1];
				let ver = parseInt(version);
				let subVer = data[2] ? version+'/'+data[2] : null;
				switch (appName) {
					case 'Firefox':
					case 'Chrome':
					case 'Opera':
					case 'AppleWebKit':
					case 'Mozilla':
					case 'Safari':
					case 'XiaoMi':
					case 'Edge':
						browserList += '-> '+appName+'/'+(ver?version:subVer)+'\n';
						if (appName === 'Firefox' && ver >= 46) return isSupported = true;
						if (appName === 'Chrome' && ver >= 69) return isSupported = true;
						if (appName === 'Opera' && ver >= 56) return isSupported = true;
						break;
					default: break;
				}
			}
		});
		if (!isSupported) {
			alert(
				'Your Browser not Supported !\n\n'+
				'# Your Based Browser:\n'+browserList+
				'\n# Supported Browser :\n'+
				'-> Firefox/46 or higher\n'+
				'-> Chrome/69 or higher\n'+
				'-> Opera/56 or higher'
			);
			CONNECTION_RESPOND = true;
		}
		return browserList;
	}
	/*__________________________________________________________________________

		EVENT HANDLER
	__________________________________________________________________________*/
	const initEventHander = (worker, canvas) => {
		const sendEvent = (type, event) => worker.postMessage({ type:type, event:event });
		let fullscreen = () => {
			if(!document.fullscreenElement) canvas.requestFullscreen();
			else document.exitFullscreen();
		}
		let resize = e => {
			e.preventDefault();
			sendEvent(e.type,{ width:canvas.clientWidth, height:canvas.clientHeight });
		}
		let keyPress = e => {
			e.preventDefault();
			sendEvent(e.type, { key:e.key });
			switch(e.key) {
				case 'F10':
					fullscreen();
					break;
				default: break;
			}
		}
		let mouseDown = e => {
			e.preventDefault();
			sendEvent(e.type, { x:e.pageX, y:e.pageY });
		}
		let mouseUp = e => {
			e.preventDefault();
			sendEvent(e.type, {});
		}
		let mouseMove = e => {
			e.preventDefault();
			sendEvent(e.type,{ x:e.pageX, y:e.pageY });
		}
		let touchStart = e => {
			e.preventDefault();
			let t = e.changedTouches;
			for(let i = 0, len = t.length; i < len; i++) {
				sendEvent(e.type,{ id:t[i].identifier, x:t[i].pageX, y:t[i].pageY });
			}
		}
		let touchEnd = e => {
			e.preventDefault();
			let t = e.changedTouches;
			for(let i = 0, len = t.length; i < len; i++) {
				sendEvent(e.type,{ id:t[i].identifier });
				if(t[i].identifier === 4) fullscreen();
			}
		}
		let touchMove = e => {
			e.preventDefault();
			let t = e.changedTouches;
			for(let i = 0, len = t.length; i < len; i++) {
				sendEvent(e.type,{ id:t[i].identifier, x:t[i].pageX, y:t[i].pageY });
			}
		}
		let dragOver = e => {
			e.preventDefault();
			e.dataTransfer.dropEffect = 'move';
		}
		let drop = e => {
			e.preventDefault();
			sendEvent(e.type, Array.from(e.dataTransfer.files));
		}
		Win.addEventListener('resize', resize);
		Doc.addEventListener('keydown', keyPress);
		Doc.addEventListener('keyup', keyPress);
		canvas.addEventListener('mousedown', mouseDown);
		canvas.addEventListener('mouseup', mouseUp);
		canvas.addEventListener('mouseout', mouseUp);
		canvas.addEventListener('mousemove', mouseMove);
		canvas.addEventListener("touchstart", touchStart);
		canvas.addEventListener("touchend", touchEnd);
		canvas.addEventListener("touchcancel", touchEnd);
		canvas.addEventListener("touchmove", touchMove);
		canvas.addEventListener('dragover', dragOver);
		canvas.addEventListener('drop', drop);
	}
	const fileSelector = e => {
		e.preventDefault()
		let fileInput = Doc.createElement('input');
		fileInput.multiple = true;
		fileInput.type = 'file';
		fileInput.accept = '*';
		fileInput.onchange = e => {
			let files = Array.from(e.target.files);
			worker.postMessage({
				type: 'files',
				files: files
			});
			fileInput.remove();
		};
		fileInput.click();
	};
	/*__________________________________________________________________________

		INPUT HANDLER
	__________________________________________________________________________*/
	const initInputWorker = (worker, canvas, offscreen) => {
		worker.onmessage = e => {
			switch(e.data.type) {
				case 'request_animation':
					requestAnimation(worker, e.data.fps);
					break;
				case 'loading_finish':
					canvas.style.background = 'transparent';
					break;
				case 'select_files':
					canvas.addEventListener('click', fileSelector);
					canvas.addEventListener('touchend', fileSelector);
					break;
				case 'unselect_files':
					canvas.removeEventListener('click', fileSelector);
					canvas.removeEventListener('touchend', fileSelector);
					break;
				case 'open_url':
					open(e.data.url);
					URL.revokeObjectURL(e.data.url);
					break;
				case 'console':
					console.style(e.data.mode, e.data.msg, e.data.style);
					break
				case 'alert':
					alert(e.data.message);
					break
				case 'notify':
					notify(e.data.title, e.data.body);
					break
				case 'reload':
					location.reload();
					break
				case 'respond':
					CONNECTION_RESPOND = true;
					worker.postMessage({ type:'canvas', canvas:offscreen }, [offscreen]);
					break
				case 'create_control':
					control.create = [worker, e.data.data];
					break;
				default: break;
			}
		};
	}
})(window, document, {});