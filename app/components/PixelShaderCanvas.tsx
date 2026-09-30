"use client";

import { useEffect, useRef } from "react";

interface PixelShaderCanvasProps {
  bgSrc: string;
  meSrc: string;
  className?: string;
}

export default function PixelShaderCanvas({ bgSrc, meSrc, className = "" }: PixelShaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    // Vertex Shader
    const vsSource = `
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        vUv.y = 1.0 - vUv.y;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    // Fragment Shader with cursor-radius pixelation
    const fsSource = `
      precision highp float;
      uniform sampler2D uBg;
      uniform sampler2D uMe;
      uniform vec2 uMouse;
      uniform float uHover;
      uniform vec2 uResolution;
      uniform vec2 uTextureSize;
      varying vec2 vUv;

      // Fit texture inside canvas with 'contain' mode (object-contain object-right)
      vec2 getContainedUv(vec2 uv, vec2 containerRes, vec2 texRes) {
        float containerAspect = containerRes.x / containerRes.y;
        float texAspect = texRes.x / texRes.y;
        vec2 scale = vec2(1.0);
        vec2 offset = vec2(0.0);

        if (containerAspect > texAspect) {
          // Container is wider than texture -> aligned right / center
          scale.x = texAspect / containerAspect;
          offset.x = 1.0 - scale.x; // Align to right
        } else {
          // Container is taller than texture -> aligned center
          scale.y = containerAspect / texAspect;
          offset.y = (1.0 - scale.y) * 0.5;
        }

        return (uv - offset) / scale;
      }

      void main() {
        vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
        float dist = length((vUv - uMouse) * aspect);

        // Pixelation effect radius (~140px in screen aspect)
        float radius = 0.16;
        float strength = smoothstep(radius, radius * 0.35, dist) * uHover;

        // Pixel block density inside the interaction zone
        float pixelBlocks = 42.0;
        vec2 pixelGrid = vec2(pixelBlocks * aspect.x, pixelBlocks);
        vec2 pixelatedUv = (floor(vUv * pixelGrid) + 0.5) / pixelGrid;

        vec2 sampleUv = mix(vUv, pixelatedUv, strength);

        // Map to texture UV space
        vec2 texUv = getContainedUv(sampleUv, uResolution, uTextureSize);

        // Check if inside texture boundaries
        if (texUv.x < 0.0 || texUv.x > 1.0 || texUv.y < 0.0 || texUv.y > 1.0) {
          gl_FragColor = vec4(0.0);
          return;
        }

        vec4 bg = texture2D(uBg, texUv);
        vec4 me = texture2D(uMe, texUv);

        // Layer subject (me) over background (bg)
        vec4 color = vec4(mix(bg.rgb, me.rgb, me.a), max(bg.a, me.a));

        // Subtle digital matrix micro-grid inside the pixelated circle
        if (strength > 0.04) {
          vec2 cell = fract(vUv * pixelGrid);
          float gridLine = step(0.07, cell.x) * step(0.07, cell.y);
          color.rgb = mix(color.rgb * 0.86, color.rgb, gridLine);

          // Subtle warm cyber glow on the active pixels
          color.rgb += vec3(0.03, 0.02, 0.0) * strength;
        }

        gl_FragColor = color;
      }
    `;

    function compileShader(source: string, type: number) {
      if (!gl) return null;
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    // Quad geometry covering [-1, -1] to [1, 1]
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uBgLoc = gl.getUniformLocation(program, "uBg");
    const uMeLoc = gl.getUniformLocation(program, "uMe");
    const uMouseLoc = gl.getUniformLocation(program, "uMouse");
    const uHoverLoc = gl.getUniformLocation(program, "uHover");
    const uResolutionLoc = gl.getUniformLocation(program, "uResolution");
    const uTextureSizeLoc = gl.getUniformLocation(program, "uTextureSize");

    // Load textures
    function loadTexture(src: string, textureUnit: number) {
      if (!gl) return null;
      const tex = gl.createTexture();
      gl.activeTexture(textureUnit);
      gl.bindTexture(gl.TEXTURE_2D, tex);

      // Temporary 1x1 transparent pixel while loading
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 0, 0])
      );

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => {
        if (!gl) return;
        gl.activeTexture(textureUnit);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

        if (uTextureSizeLoc && img.width > 0) {
          gl.useProgram(program);
          gl.uniform2f(uTextureSizeLoc, img.width, img.height);
        }
      };
      return tex;
    }

    loadTexture(bgSrc, gl.TEXTURE0);
    loadTexture(meSrc, gl.TEXTURE1);

    gl.uniform1i(uBgLoc, 0);
    gl.uniform1i(uMeLoc, 1);
    gl.uniform2f(uTextureSizeLoc, 1535, 1024);

    let mouse = { x: 0.72, y: 0.45 };
    let currentHover = 0.0;
    let targetHover = 0.0;
    let animId = 0;

    function handleMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      // Only activate when hovering over the right half where the image/person is
      if (x > 0.35 && x <= 1.0 && y >= 0.0 && y <= 1.0) {
        mouse.x = x;
        mouse.y = y;
        targetHover = 1.0;
      } else {
        targetHover = 0.0;
      }
    }

    function handleMouseLeave() {
      targetHover = 0.0;
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    function resize() {
      if (!canvas || !gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.round(canvas.clientWidth * dpr);
      const displayHeight = Math.round(canvas.clientHeight * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }
    }

    function render() {
      if (!gl || !canvas) return;
      resize();

      // Smooth hover interpolation
      currentHover += (targetHover - currentHover) * 0.12;

      gl.useProgram(program);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform2f(uMouseLoc, mouse.x, mouse.y);
      gl.uniform1f(uHoverLoc, currentHover);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (gl && program) {
        gl.deleteProgram(program);
      }
    };
  }, [bgSrc, meSrc]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none ${className}`}
      style={{ touchAction: "none" }}
    />
  );
}
