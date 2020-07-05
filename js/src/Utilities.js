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
| File     	- Utilities.js
| Overview 	- Context Utilities
| Version  	- 0.0.1
| Copyright	- © 2019, Huda Makruf.
| License  	- Under the MIT License
| Author   	- Huda Makruf (huda_makruf@outlook.com | hudamaruf@gmail.com)
| Website  	- http://indiego.heliohost.org (dev@indiego.heliohost.org)
| Made with	- ♡ and javascript based on ES2018
| Sections 	- PREFIXES
|          	- REQUEST ANIMATION FRAME
|***********************************************************************************************/
'use strict';
/*__________________________________________________________________________

	PREFIXES
__________________________________________________________________________*/
self.requestAnimationFrame = self.requestAnimationFrame || self.mozRequestAnimationFrame || self.webkitRequestAnimationFrame || self.msRequestAnimationFrame;
/*__________________________________________________________________________

	REQUEST ANIMATION FRAME
__________________________________________________________________________*/
self.reqAnimation = (evt, ctx, fps) => {
	// See if a reqAnimationFrame in worker is supported
	if (typeof requestAnimationFrame != 'undefined') {
		fps = 1/fps;
		let oldTime = 0;
		let deltaTime = 0;
		const animation = time => {
			time *= 0.001	// Convert to second
			if (oldTime === 0) oldTime = time;
			deltaTime += time - oldTime;
			oldTime = time;
			if (deltaTime >= fps) {
				updateScene(evt, ctx, fps);
				deltaTime -= fps;
			};
			requestAnimationFrame(animation);
		};
		animation(0);
	}
	else {
		Event.__proto__.update = () => updateScene(evt, ctx, fps);
		addEventListener('message', e => { if(e.data.type === 'update') Event.update() });
		postMessage({ type:'request_animation', fps:fps });
	};
};
/*__________________________________________________________________________

	TESTING
__________________________________________________________________________*/
self.createControl = data => {
	Event.__proto__.control = e => {

	}
	addEventListener('message', e => { if(e.data.type === 'control') Event.control(e.data.e) });
	postMessage({ type:'create_control', data:data });
};