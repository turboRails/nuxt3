varying vec3 pos;
uniform float u_time;
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}