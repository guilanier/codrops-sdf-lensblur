import './css/base.css';
import * as THREE from 'three';
// import fragmentShader from './shaders/2024-05-07-11:17:24-sdf-lens-blur-tutorial.frag';

// Scene setup
const scene = new THREE.Scene();

// Orthographic camera setup
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Plane geometry covering the full viewport
const geo = new THREE.PlaneGeometry(2 * aspect, 2);  // Scaled to cover full viewport

// Shader material
const mat = new THREE.ShaderMaterial({
  vertexShader: /* glsl */`
        varying vec2 v_texcoord;
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            v_texcoord = uv;
        }`,
  fragmentShader: /* glsl */`
        varying vec2 v_texcoord;
        void main() {
            vec2 st = v_texcoord;
            vec3 color = vec3(st.x, st.y, 1.0);
            gl_FragColor = vec4(color.rgb, 1.0);
        }`,

});

// Mesh creation
const quad = new THREE.Mesh(geo, mat);
quad.scale.setScalar(0.6)
scene.add(quad);

// Camera position and orientation
camera.position.z = 1;  // Set appropriately for orthographic

// Animation loop using arrow function
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();
