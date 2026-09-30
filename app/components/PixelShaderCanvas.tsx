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
    // Disable WebGL completely on tablets and mobile screens (< 1024px)
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;

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

    // Fragment Shader: High-density micro-pixels + liquid water ripple refraction
    const fsSource = `
      precision highp float;
      uniform sampler2D uBg;
      uniform sampler2D uMe;
      uniform vec2 uMouse;
      uniform float uHover;
      uniform vec2 uResolution;
      uniform vec2 uTextureSize;
      uniform float uTime;
      varying vec2 vUv;

      // Fit texture inside canvas with 'contain' mode (object-contain object-right)
      vec2 getContainedUv(vec2 uv, vec2 containerRes, vec2 texRes) {
        float containerAspect = containerRes.x / containerRes.y;
        float texAspect = texRes.x / texRes.y;
        vec2 scale = vec2(1.0);
        vec2 offset = vec2(0.0);

        if (containerAspect > texAspect) {
          scale.x = texAspect / containerAspect;
          offset.x = 1.0 - scale.x; // Align right
        } else {
          scale.y = containerAspect / texAspect;
          offset.y = (1.0 - scale.y) * 0.5; // Center vertically
        }

        return (uv - offset) / scale;
      }

      void main() {
        vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
        vec2 delta = (vUv - uMouse) * aspect;
        float dist = length(delta);

        // Interaction radius around cursor (~200px equivalent)
        float radius = 0.22;
        float influence = smoothstep(radius, 0.02, dist) * uHover;

        // ── 1. Liquid Water Ripple Dynamics ──
        // Concentric ripples radiating outward
        float rippleFreq = 36.0;
        float rippleSpeed = 5.5;
        float wave = sin(dist * rippleFreq - uTime * rippleSpeed);
        
        // Attenuate wave height based on distance & hover
        float waveHeight = 0.014 * influence;
        vec2 rippleDir = dist > 0.0005 ? normalize(delta) : vec2(0.0);
        
        // Displace coordinates with water wave
        vec2 waterUv = vUv + rippleDir * (wave * waveHeight);

        // ── 2. Fine High-Density Micro-Pixels ──
        // High density (130 blocks) so pixels feel refined, sleek, and delicate
        float pixelDensity = 135.0;
        vec2 pixelGrid = vec2(pixelDensity * aspect.x, pixelDensity);
        vec2 pixelatedUv = (floor(waterUv * pixelGrid) + 0.5) / pixelGrid;

        // Shimmering blend between liquid ripple and fine micro-pixels
        float pixelStrength = influence * (0.60 + 0.40 * max(0.0, wave));
        vec2 finalUv = mix(waterUv, pixelatedUv, pixelStrength * 0.85);

        // Map to texture space
        vec2 texUv = getContainedUv(finalUv, uResolution, uTextureSize);

        // Outside texture boundaries -> transparent
        if (texUv.x < 0.0 || texUv.x > 1.0 || texUv.y < 0.0 || texUv.y > 1.0) {
          gl_FragColor = vec4(0.0);
          return;
        }

        // ── 3. Chromatic Liquid Refraction & Caustics ──
        float chromaticDispersion = waveHeight * 0.40;
        vec2 rTexUv = getContainedUv(finalUv + rippleDir * chromaticDispersion, uResolution, uTextureSize);
        vec2 bTexUv = getContainedUv(finalUv - rippleDir * chromaticDispersion, uResolution, uTextureSize);

        vec4 bg = texture2D(uBg, texUv);
        vec4 me = texture2D(uMe, texUv);
        vec4 color = vec4(mix(bg.rgb, me.rgb, me.a), max(bg.a, me.a));

        if (influence > 0.01) {
          // Sample chromatic channels along ripple normal
          vec4 bgR = texture2D(uBg, rTexUv);
          vec4 meR = texture2D(uMe, rTexUv);
          vec3 colR = mix(bgR.rgb, meR.rgb, meR.a);

          vec4 bgB = texture2D(uBg, bTexUv);
          vec4 meB = texture2D(uMe, bTexUv);
          vec3 colB = mix(bgB.rgb, meB.rgb, meB.a);

          // Subtle liquid refraction split
          color.r = mix(color.r, colR.r, influence * 0.35);
          color.b = mix(color.b, colB.b, influence * 0.35);

          // Water surface specular sheen along ripple crests
          float crest = pow(max(0.0, wave), 3.0) * influence;
          color.rgb += vec3(1.0, 0.94, 0.82) * (crest * 0.22);
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
    const uTimeLoc = gl.getUniformLocation(program, "uTime");

    // Load textures
    function loadTexture(src: string, textureUnit: number) {
      if (!gl) return null;
      const tex = gl.createTexture();
      gl.activeTexture(textureUnit);
      gl.bindTexture(gl.TEXTURE_2D, tex);

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
    const startTime = performance.now();

    function handleMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      // Active over the right 65% area where the portrait & yellow energy are
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

      // Smooth hover fade in/out
      currentHover += (targetHover - currentHover) * 0.10;

      const elapsed = (performance.now() - startTime) * 0.001;

      gl.useProgram(program);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform2f(uMouseLoc, mouse.x, mouse.y);
      gl.uniform1f(uHoverLoc, currentHover);
      gl.uniform1f(uTimeLoc, elapsed);

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
