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
| File     	- 3D-Utilities.js
| Overview 	- WebGL Utilities
| Version  	- 0.0.1
| Copyright	- © 2019, Huda Makruf.
| License  	- Under the MIT License
| Author   	- Huda Makruf (huda_makruf@outlook.com | hudamaruf@gmail.com)
| Website  	- http://indiego.heliohost.org (dev@indiego.heliohost.org)
| Made with	- ♡ and javascript based on ES2018
| Sections 	- CREATE CONTEXT
|          	- SHADER PROGRAM
|          	- BUFFER PROGRAM
|          	- MATRIX PROGRAM
|***********************************************************************************************/
'use strict';
/*__________________________________________________________________________

	CREATE CONTEXT
__________________________________________________________________________*/
self.initContext = (canvas, config = null) => {
	let gl = null;
	let UA = navigator.userAgent.search('Firefox');
	let ctx = ['webgl2', 'webgl', 'experimental-webgl'];
	for (let i = 0, len = ctx.length; i<len; i++) {
		try {
			if (UA != -1 && ctx[i] === 'webgl2') continue; // Skip using a WebGL2 Context for Firefox
			else {
				gl = canvas.getContext(ctx[i], config);
				let msg = 'Using OffscreenCanvas with Context : ' + ctx[i].toUpperCase();
				notify('Welcome Back, Guest !', msg);
				console.style('info',msg,'indiego');
				break;
			}
		}
		catch(err) {
			console.style('error',err,'error');
			continue;
		}
	}
	if (!gl.canvas) return alert('This Browser not support WebGL2 and WebGL API !');
	else return gl;
}
/*__________________________________________________________________________

	SHADER PROGRAM
__________________________________________________________________________*/

/*	CREATE PROGRAM
--------------------------------------------*/
self.createProgram = (gl, vertSource, fragSource) => {
	let vertShader = loadShader(gl, gl.VERTEX_SHADER, vertSource);
	let fragShader = loadShader(gl, gl.FRAGMENT_SHADER, fragSource);
	let shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertShader);
	gl.attachShader(shaderProgram, fragShader);
	gl.linkProgram(shaderProgram);
	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
		return null;
	}
	return shaderProgram;
}
/*	SHADER COMPILER
--------------------------------------------*/
const loadShader = (gl, type, source) => {
	let shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return null;
	}
	return shader;
}
/*__________________________________________________________________________

	BUFFER PROGRAM
__________________________________________________________________________*/

/*	CREATE BUFFER
--------------------------------------------*/
self.createBuffer = (gl, buffSource) => {
	let vertexBuffer = null;
	let colorBuffer = null;
	let indexBuffer = null;
	let vertices = buffSource.vertices;
	let colors = buffSource.colors;
	let indices = buffSource.indices;
	if(vertices) vertexBuffer = loadBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(vertices));
	if(colors) colorBuffer = loadBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(colors));
	if(indices) indexBuffer = loadBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices));
	return {
		vertex: vertexBuffer,
		color: colorBuffer,
		index: indexBuffer,
	}
}
/*	BUFFER COMPILER
--------------------------------------------*/
const loadBuffer = (gl, target, source) => {
	let buffers = gl.createBuffer();
	gl.bindBuffer(target, buffers);
	gl.bufferData(target, source, gl.STATIC_DRAW);
	gl.bindBuffer(target, null);
	return buffers;
}
/*__________________________________________________________________________

	MATRIX PROGRAM
__________________________________________________________________________*/
self.Matrix = {
	__proto__: {
		getProjection: (angle, a, zMin, zMax) => {
			let ang = Math.tan((angle*.5)*Math.PI/180);	//angle*.5
			return [
				0.5/ang, 0 , 0, 0,
				0, 0.5*a/ang, 0, 0,
				0, 0, -(zMax+zMin)/(zMax-zMin), -1,
				0, 0, (-2*zMax*zMin)/(zMax-zMin), 0
			];
		},
		rotateX: (m, angle) => {
			let c = Math.cos(angle);
			let s = Math.sin(angle);
			let mv1 = m[1], mv5 = m[5], mv9 = m[9];

			m[1] = m[1]*c-m[2]*s;
			m[5] = m[5]*c-m[6]*s;
			m[9] = m[9]*c-m[10]*s;

			m[2] = m[2]*c+mv1*s;
			m[6] = m[6]*c+mv5*s;
			m[10] = m[10]*c+mv9*s;
		},
		rotateY: (m, angle) => {
			const c = Math.cos(angle);
			const s = Math.sin(angle);
			const mv0 = m[0], mv4 = m[4], mv8 = m[8];

			m[0] = c*m[0]+s*m[2];
			m[4] = c*m[4]+s*m[6];
			m[8] = c*m[8]+s*m[10];

			m[2] = c*m[2]-s*mv0;
			m[6] = c*m[6]-s*mv4;
			m[10] = c*m[10]-s*mv8;
		}
	}
}
