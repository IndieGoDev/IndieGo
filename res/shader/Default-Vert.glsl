attribute vec3 position;
uniform mat4 Pmatrix;
uniform mat4 Vmatrix;
uniform mat4 Mmatrix;
attribute vec3 color; //the color of the point
varying vec3 vColor;
void main(void) { //pre-built function
	gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.0);
	vColor = color;
}
