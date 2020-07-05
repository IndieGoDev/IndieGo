(async () => { 'use strict';

	await include('Utilities.js');
	await include('3D-Utilities.js');

	const buff = await include('Test-Buff.js');
	const vert = await include('Test-Vert.glsl',true);
	const frag = await include('Test-Frag.glsl',true);

	const main = () => {

		let gl = initContext(root.canvas);
		let buffers = initBuffers(gl, buff);
		let program = initShaderProgram(gl, vert, frag);
		let posAttribLocation = gl.getAttribLocation(program, 'a_position');
		let resUniformLocation = gl.getUniformLocation(program, 'u_resolution');
		let colUniformLocation = gl.getUniformLocation(program, 'u_color');

		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		gl.clearColor(0, 0, 0, 0);
		gl.clear(gl.COLOR_BUFFER_BIT);

		gl.useProgram(program);
		gl.enableVertexAttribArray(posAttribLocation);

		gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertex);
		{
			let size = 2;
			let type = gl.FLOAT;
			let normalize = false;
			let stride = 0;
			let offset = 0;
			gl.vertexAttribPointer(posAttribLocation, size, type, normalize, stride, offset);
		}
		gl.uniform2f(resUniformLocation, gl.canvas.width, gl.canvas.height);

		for (let i = 0; i < 50; ++i) {
			setRectangle(gl, randomInt(300) ,randomInt(300), randomInt(300), randomInt(300));
			gl.uniform4f(colUniformLocation, Math.random(), Math.random(), Math.random(), 1);
			{
				let primitiveType = gl.TRIANGLES;
				let offset = 0;
				let count = 6;
				gl.drawArrays(primitiveType, offset, count);
			}
		}
		if(gl.commit) gl.commit();
		function randomInt(range) {
			return Math.trunc(Math.random() * range);
		}
		function setRectangle(gl, x, y, width, height) {
			let x1 = x;
			let x2 = x + width;
			let y1 = y;
			let y2 = y + height;
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
				x1, y1,
				x2, y1,
				x1, y2,
				x1, y2,
				x2, y1,
				x2, y2,
			]), gl.STATIC_DRAW);
		}
	}
	try {main()}
	catch(e) {alert(e)}
})();