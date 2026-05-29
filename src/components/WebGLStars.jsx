import { useEffect, useRef } from "react";

export function WebGLStars({ canvasRef, animRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vert = `
      attribute vec2 a_pos; attribute float a_size; attribute float a_bright;
      varying float v_bright;
      void main(){ gl_Position=vec4(a_pos,0.,1.); gl_PointSize=a_size; v_bright=a_bright; }`;
    
    const frag = `
      precision mediump float; varying float v_bright;
      void main(){
        vec2 c=gl_PointCoord-.5; float d=length(c);
        float a=smoothstep(.5,.0,d)*v_bright;
        vec3 col=mix(vec3(.72,.65,.45),vec3(1.,.97,.85),v_bright);
        gl_FragColor=vec4(col,a);
      }`;

    const makeShader = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, makeShader(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, makeShader(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const N = 380;
    const pos = new Float32Array(N * 2);
    const sizes = new Float32Array(N);
    const brights = new Float32Array(N);
    const speeds = new Float32Array(N);
    const phases = new Float32Array(N);

    for (let i = 0; i < N; i++) {
      pos[i * 2] = Math.random() * 2 - 1;
      pos[i * 2 + 1] = Math.random() * 2 - 1;
      sizes[i] = Math.random() * 2.4 + 0.5;
      brights[i] = Math.random() * 0.7 + 0.3;
      speeds[i] = Math.random() * 0.4 + 0.1;
      phases[i] = Math.random() * Math.PI * 2;
    }

    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);

    const sizeBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuf);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);

    const brightBuf = gl.createBuffer();

    const aPos = gl.getAttribLocation(prog, "a_pos");
    const aSize = gl.getAttribLocation(prog, "a_size");
    const aBright = gl.getAttribLocation(prog, "a_bright");

    gl.enableVertexAttribArray(aPos);
    gl.enableVertexAttribArray(aSize);
    gl.enableVertexAttribArray(aBright);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    const resize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      // keep CSS size at device pixels to avoid layout shifts
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = (t) => {
      t *= 0.001;
      gl.clearColor(0.012, 0.016, 0.052, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const tb = new Float32Array(N);
      for (let i = 0; i < N; i++)
        tb[i] = brights[i] * (0.55 + 0.45 * Math.sin(t * speeds[i] + phases[i]));

      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuf);
      gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, brightBuf);
      gl.bufferData(gl.ARRAY_BUFFER, tb, gl.DYNAMIC_DRAW);
      gl.vertexAttribPointer(aBright, 1, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.POINTS, 0, N);
      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef, animRef]);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", display: "block", pointerEvents: "none", zIndex: 0 }} />;
}
