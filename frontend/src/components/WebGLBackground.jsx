import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WebGLBackground = ({ isDark }) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");

    if (!gl) {
      console.warn("WebGL not supported in this browser.");
      return;
    }

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.clientHeight * (window.devicePixelRatio || 1);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const vsSource = `
      attribute vec3 aPosition;
      uniform mat4 uProjectionMatrix;
      uniform mat4 uViewMatrix;
      uniform float uTime;
      uniform vec2 uMouse;
      varying vec3 vPosition;

      void main() {
        vec3 pos = aPosition;
        float dist = distance(pos.xy, uMouse * 3.0);
        float wave1 = sin(pos.x * 2.0 + uTime * 0.8) * cos(pos.y * 2.0 + uTime * 0.8) * 0.25;
        float wave2 = sin(pos.y * 5.0 - uTime * 1.2) * 0.12;
        float mouseInterference = sin(dist * 4.0 - uTime * 3.0) * 0.15 * max(0.0, 1.5 - dist);
        
        pos.z = wave1 + wave2 + mouseInterference;
        vPosition = pos;

        gl_Position = uProjectionMatrix * uViewMatrix * vec4(pos, 1.0);
        gl_PointSize = 3.5;
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec3 vPosition;
      uniform vec3 uColor;

      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        if (length(coord) > 0.5) discard;

        float depthColor = (vPosition.z + 0.35) * 1.5;
        gl_FragColor = vec4(uColor * (0.6 + depthColor * 0.4), 0.7);
      }
    `;

    const loadShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = loadShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl.FRAGMENT_SHADER, fsSource);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("WebGL program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const points = [];
    const rows = 45;
    const cols = 45;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c / (cols - 1)) * 5.0 - 2.5;
        const y = (r / (rows - 1)) * 5.0 - 2.5;
        points.push(x, y, 0);
      }
    }

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    const uProjectionMatrix = gl.getUniformLocation(program, "uProjectionMatrix");
    const projectionMatrix = new Float32Array([
      1.2, 0, 0, 0,
      0, 1.2, 0, 0,
      0, 0, -1.01, -1,
      0, 0, -0.2, 0
    ]);
    gl.uniformMatrix4fv(uProjectionMatrix, false, projectionMatrix);

    const uViewMatrix = gl.getUniformLocation(program, "uViewMatrix");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uColor = gl.getUniformLocation(program, "uColor");

    const darkColor = [0.10, 0.725, 0.50];
    const lightColor = [0.08, 0.40, 0.28];
    gl.uniform3fv(uColor, isDark ? darkColor : lightColor);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let cameraRotationY = 0;
    let cameraRotationX = -0.55;

    const scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        cameraRotationY = self.progress * 1.5;
        cameraRotationX = -0.55 + self.progress * 0.3;
      }
    });

    let startTime = Date.now();
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    // Pre-allocated matrix buffer to prevent GC thrashing
    const viewMatrix = new Float32Array(16);

    const render = () => {
      const time = (Date.now() - startTime) * 0.001;

      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      const cosY = Math.cos(cameraRotationY);
      const sinY = Math.sin(cameraRotationY);
      const cosX = Math.cos(cameraRotationX);
      const sinX = Math.sin(cameraRotationX);

      // Mutate viewMatrix in place
      viewMatrix[0] = cosY;
      viewMatrix[1] = sinX * sinY;
      viewMatrix[2] = -cosX * sinY;
      viewMatrix[3] = 0;
      
      viewMatrix[4] = 0;
      viewMatrix[5] = cosX;
      viewMatrix[6] = sinX;
      viewMatrix[7] = 0;
      
      viewMatrix[8] = sinY;
      viewMatrix[9] = -sinX * cosY;
      viewMatrix[10] = cosX * cosY;
      viewMatrix[11] = 0;
      
      viewMatrix[12] = 0;
      viewMatrix[13] = 0;
      viewMatrix[14] = -2.2;
      viewMatrix[15] = 1;

      gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform3fv(uColor, isDark ? darkColor : lightColor);

      gl.drawArrays(gl.POINTS, 0, rows * cols);

      requestRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (scrollTrigger) scrollTrigger.kill();
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      
      // Cleanup WebGL resources to prevent GPU memory leaks
      try {
        if (gl) {
          gl.bindBuffer(gl.ARRAY_BUFFER, null);
          if (vertexBuffer) gl.deleteBuffer(vertexBuffer);
          if (vertexShader) gl.deleteShader(vertexShader);
          if (fragmentShader) gl.deleteShader(fragmentShader);
          if (program) gl.deleteProgram(program);
        }
      } catch (err) {
        console.error("Error cleaning up WebGL resources", err);
      }
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-40 dark:opacity-[0.25]"
      style={{ mixBlendMode: "normal" }}
    />
  );
};

export default WebGLBackground;
