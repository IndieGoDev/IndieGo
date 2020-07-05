/* *********************************************************************************************|
|------╔╦╗---------------------╔═══╗----╔╦╗----------------╔╦╗-╔╦╗--------------╔╦╦╗------------|
|------╠╬╣--------------------╔╝---╚╗---╠╬╣----------------╠╬╣-╠╬╣-------------╔╬╬╬╣------------|
|------╠╬╣-------------------╔╝-----╚╗--╚╩╝----------------╠╬╣-╚╩╝------------╔╬╬╩╩╝------------|
|--╔╦╗-╠╬╣---╔╦╦╦╗-╔╦╗--╔╦╗-╔╝--╔═╗--║--╔╦╗----╔╦╗-----╔╦╗-╠╬╣-╔╦╗---╔╦╦╦╗---╔╬╬╝--------╔╦╦╦╗--|
|-╔╬╬╣-╠╬╣--╔╬╬╬╬╬╗╚╬╬╗╔╬╬╝-║--╔╝-╚╗-║--╠╬╣---╔╬╬╬╗---╔╬╬╣-╠╬╣-╠╬╣--╔╬╬╬╬╬╗--╠╬╣--------╔╬╬╬╬╬╗-|
|╔╬╬╩╝-╠╬╣-╔╬╬╩╩╩╬╬╗╠╬╬╬╬╣--║-╔╝--╔╝╔╝--╠╬╣--╔╬╬╩╬╬╗-╔╬╬╩╝-╠╬╣-╠╬╣-╔╬╬╩╩╩╬╬╗-╠╬╣--╔╦╗--╔╬╬╩╩╩╬╬╗|
|╠╬╣---╠╬╣-╠╬╣--╔╬╬╣╚╬╬╬╬╝--║-╚╗-╔╣╔╝---╠╬╣--╠╬╣-╠╬╣-╠╬╣---╠╬╣-╠╬╣-╠╬╣--╔╬╬╣-╠╬╣--╚╬╬╗-╠╬╣---╠╬╣|
|╠╬╣---╠╬╣-╠╬╣-╚╩╩╩╝-╠╬╬╣---║--╚═╝╚╝----╠╬╣--╠╬╣-╠╬╣-╠╬╣---╠╬╣-╠╬╣-╠╬╣-╚╩╩╩╝-╚╬╬╗--╠╬╣-╠╬╣---╠╬╣|
|╚╬╬╦╦╦╬╬╝-╚╬╬╦╗-----╚╬╬╝---╚╗----------╠╬╣--╠╬╣-╠╬╣-╚╬╬╦╦╦╬╬╝-╠╬╣-╚╬╬╦╗------╚╬╬╦╦╬╬╝-╚╬╬╦╦╦╬╬╝|
|-╚╬╬╬╬╬╝---╚╬╬╬╗-----╠╣-----╚╗----╔╝---╠╬╣--╠╬╣-╠╬╣--╚╬╬╬╬╬╝--╠╬╣--╚╬╬╬╗------╚╬╬╬╬╝---╚╬╬╬╬╬╝-|
|--╚╩╩╩╝-----╚╩╩╩╝----╚╝------╚════╝----╚╩╝--╚╩╝-╚╩╝---╚╩╩╩╝---╚╩╝---╚╩╩╩╝------╚╩╩╝-----╚╩╩╩╝--|
|***********************************************************************************************|
| File     	- 3D-Program.js
| Overview 	- WebGL Program
| Version  	- 0.0.1
| Copyright	- © 2019, Huda Makruf.
| License  	- Under the MIT License
| Author   	- Huda Makruf (huda_makruf@outlook.com | hudamaruf@gmail.com)
| Website  	- http://indiego.heliohost.org (dev@indiego.heliohost.org)
| Made with	- ♡ and javascript based on ES2018
| Sections 	- DECLARATIONS
|          	- MAIN PROGRAM
|          	- RENDER PROGRAM
|          	- EVENT HANDLER
|          	- INPUT HANDLER
|***********************************************************************************************/
(async () => { 'use strict';
	await include('Utilities.js');
	await include('3D-Utilities.js');
	/*__________________________________________________________________________

		DECLARATIONS
	__________________________________________________________________________*/
	// Needs of WebGL Context
	const WebGL = {
		src: {}, // Shader & Buffer sources
		config: {
			alpha: true,
			depth: true,
			stencil: false,
			antialias: true,
			powerPreference: 'default',
			premultipliedAlpha: false,
			preserveDrawingBuffer: false,
			failIfMajorPerformanceCaveat: false,
		}
	}
	// Buffer & Shader sources
	WebGL.src.buff = await include('Box-Buff.js');
	WebGL.src.vert = await include('Default-Vert.glsl',true);
	WebGL.src.frag = await include('Default-Frag.glsl',true);
	/*__________________________________________________________________________

		MAIN PROGRAM
	__________________________________________________________________________*/
	const main = () => {
		let e = Event.e;
		let canvas = root.canvas;
		e.width = e.old_width = canvas.width;
		e.height = e.old_height = canvas.height;
		let gl = initContext(canvas, WebGL.config);
		let buffers = createBuffer(gl, WebGL.src.buff);
		let program = createProgram(gl, WebGL.src.vert, WebGL.src.frag);
		initScene(e, gl, program, [buffers]);
		reqAnimation(e, gl, 40);
		postMessage({type:'loading_finish'});
	}
	/*__________________________________________________________________________

		RENDER PROGRAM
	__________________________________________________________________________*/
	/*	INIT SCENE
	--------------------------------------------*/
	const initScene = (E, gl, program, buffers) => {
		// Use the combined buffers object
		buffers.forEach(buffs => {
			if (buffs.vertex) {
				gl.bindBuffer(gl.ARRAY_BUFFER, buffs.vertex);
				const position = gl.getAttribLocation(program, "position");
				gl.vertexAttribPointer(position, 3, gl.FLOAT, false,0,0);
				gl.enableVertexAttribArray(position);
			}
			if (buffs.color) {
				gl.bindBuffer(gl.ARRAY_BUFFER, buffs.color);
				const color = gl.getAttribLocation(program, "color");
				gl.vertexAttribPointer(color, 3, gl.FLOAT, false,0,0) ;
				gl.enableVertexAttribArray(color);
			}
			if (buffs.index) {
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffs.index);
			}
		});
		gl.useProgram(program);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
		gl.clearDepth(1.0);
		gl.clearColor(0, 0, 0, 1);
		gl.viewport(0, 0, E.width, E.height);
		// Set matrix
		E.projMatrix = Matrix.getProjection(40, E.width/E.height, 1, 100);
		E.viewMatrix = [ 1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1 ];
		E.moMatrix = [ 1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1 ];
		E.viewMatrix[14] -= 6;
		E.pMatrix = gl.getUniformLocation(program, "Pmatrix");
		E.vMatrix = gl.getUniformLocation(program, "Vmatrix");
		E.mMatrix = gl.getUniformLocation(program, "Mmatrix");
		gl.uniformMatrix4fv(E.pMatrix, false, E.projMatrix);
		gl.uniformMatrix4fv(E.vMatrix, false, E.viewMatrix);
	}
	/*	UPDATE SCENE (RENDERER)
	--------------------------------------------*/
	self.updateScene = (E, gl, deltaTime) => {
		// Update the Projection
		if (E.old_width != E.width || E.old_height != E.height) {
			gl.canvas.width = E.old_width = E.width;
			gl.canvas.height = E.old_height = E.height;
			gl.viewport(0, 0, E.width, E.height);
			E.projMatrix = Matrix.getProjection(40, E.width/E.height, 1, 100);
			gl.uniformMatrix4fv(E.pMatrix, false, E.projMatrix);
		}
		if (E.down) {
			E.old_x = E.x;
			E.old_y = E.y;
			E.down = false;
		}
		if (E.down1) {
			E.old_x1 = E.x1;
			E.old_y1 = E.y1;
			E.down = false;
		}
		if (E.drag1) {
			E.dX1 = (E.x-E.old_x1)*2*Math.PI/E.width;
			E.dY1 = (E.y-E.old_y1)*2*Math.PI/E.height;
			E.THETA1 += E.dX1;
			E.PHI1 += E.dY1;
			E.old_x1 = E.x1;
			E.old_y1 = E.y1;
			//E.viewMatrix[14] = E.THETA1*0.01;
		}
		else {
			E.dX1 *= E.AMORTIZATION;
			E.dY1 *= E.AMORTIZATION;
			E.THETA1 += E.dX1;
			E.PHI1 += E.dY1;
		}
		if (E.drag && !E.drag1) {
			E.dX = (E.x-E.old_x)*2*Math.PI/E.width;
			E.dY = (E.y-E.old_y)*2*Math.PI/E.height;
			E.THETA += E.dX;
			E.PHI += E.dY;
			E.old_x = E.x;
			E.old_y = E.y;
		}
		else {
			E.dX *= E.AMORTIZATION;
			E.dY *= E.AMORTIZATION;
			E.THETA += E.dX;
			E.PHI += E.dY;
		}
		//set model matrix to I4
		E.moMatrix[0] = 1, E.moMatrix[1] = 0, E.moMatrix[2] = 0, E.moMatrix[3] = 0,
		E.moMatrix[4] = 0, E.moMatrix[5] = 1, E.moMatrix[6] = 0, E.moMatrix[7] = 0,
		E.moMatrix[8] = 0, E.moMatrix[9] = 0, E.moMatrix[10] = 1, E.moMatrix[11] = 0,
		E.moMatrix[12] = 0, E.moMatrix[13] = 0, E.moMatrix[14] = 0, E.moMatrix[15] = 1;

		Matrix.rotateY(E.moMatrix, E.THETA);
		Matrix.rotateX(E.moMatrix, E.PHI);

		gl.uniformMatrix4fv(E.vMatrix, false, E.viewMatrix);
		gl.uniformMatrix4fv(E.mMatrix, false, E.moMatrix);

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.drawElements(gl.TRIANGLES, WebGL.src.buff.indices.length, gl.UNSIGNED_SHORT, 0);
		if (gl.commit) gl.commit();
	}
	/*__________________________________________________________________________

		EVENT HANDLER
	__________________________________________________________________________*/
	Event.e = {
		width: 0, height: 0,
		old_width: 0, old_height: 0,
		drag: false, drag1: false,
		down: false, down1: false,
		x: 0, y: 0,
		x1: 0, y1: 0,
		old_x: 0, old_y: 0,
		old_x1: 0, old_y1: 0,
		dX: 0, dY: 0,
		dX1: 0, dY1: 0,
		AMORTIZATION: 0.9,
		THETA: 0, PHI: 0,
		THETA1: 0, PHI1: 0,
	}
	Event.__proto__.resize = function(e) {
		this.e.width = e.width;
		this.e.height = e.height;
	}
	Event.__proto__.mouseDown = function(e) {
		this.e.drag = this.e.down = true;
		this.e.x = e.x;
		this.e.y = e.y;
	}
	Event.__proto__.mouseUp = function(e) {
		this.e.drag = false;
	}
	Event.__proto__.mouseMove = function(e) {
		this.e.x = e.x;
		this.e.y = e.y;
	}
	Event.__proto__.touchStart = function(e) {
		if(e.id === 0) {
			this.e.drag = this.e.down = true;
			this.e.x = e.x;
			this.e.y = e.y;
		}
		if(e.id === 1) {
			this.e.drag1 = this.e.down1 = true;
			this.e.x1 = e.x;
			this.e.y1 = e.y;
		}
	}
	Event.__proto__.touchEnd = function(e) {
		if(e.id === 0) this.e.drag = this.e.down = false;
		if(e.id === 1) this.e.drag1 = this.e.down1 = false;
	}
	Event.__proto__.touchMove = function(e) {
		if(e.id === 0) {
			this.e.x = e.x;
			this.e.y = e.y;
		}
		if(e.id === 1) {
			this.e.x1 = e.x;
			this.e.y1 = e.y;
		}
	}
	/*__________________________________________________________________________

		INPUT HANDLER
	__________________________________________________________________________*/
	const mainInput = e => {
		switch(e.data.type) {
			case 'resize':
				Event.resize(e.data.event);
				break;
			case 'mousedown':
				Event.mouseDown(e.data.event);
				break;
			case 'mouseup':
			case 'mouseout':
				Event.mouseUp(e.data.event);
				break;
			case 'mousemove':
				Event.mouseMove(e.data.event);
				break;
			case 'touchstart':
				Event.touchStart(e.data.event);
				break;
			case 'touchend':
			case 'touchcancel':
				Event.touchEnd(e.data.event);
				break;
			case 'touchmove':
				Event.touchMove(e.data.event);
				break;
			default: break;
		}
	}
	addEventListener('message', mainInput);
	// Run program
	main();
})();