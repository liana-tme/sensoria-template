/*
 * A small fluid simulation on the GPU (WebGL 1) that bends a photo where the cursor moves.
 * Same behaviour and settings as the original design:
 * the cursor pushes the "liquid", ripples spread and fade, the photo is sampled through them.
 * Settings come from tokens.css (--liquid-*). No libraries.
 */

const VERTEX = `
precision highp float;
attribute vec2 a_position;
uniform vec2 u_texel;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
void main () {
  vUv = 0.5 * (a_position + 1.0);
  vL = vUv - vec2(u_texel.x, 0.0);
  vR = vUv + vec2(u_texel.x, 0.0);
  vT = vUv + vec2(0.0, u_texel.y);
  vB = vUv - vec2(0.0, u_texel.y);
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

/* Adds a soft round "push" at the pointer. */
const SPLAT = `
precision highp float;
varying vec2 vUv;
uniform sampler2D u_input;
uniform float u_ratio;
uniform vec3 u_value;
uniform vec2 u_point;
uniform float u_size;
void main () {
  vec2 p = vUv - u_point;
  p.x *= u_ratio;
  vec3 splat = 0.6 * pow(2.0, -dot(p, p) / u_size) * u_value;
  gl_FragColor = vec4(texture2D(u_input, vUv).xyz + splat, 1.0);
}`;

const DIVERGENCE = `
precision highp float;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D u_velocity;
void main () {
  float l = texture2D(u_velocity, vL).x;
  float r = texture2D(u_velocity, vR).x;
  float t = texture2D(u_velocity, vT).y;
  float b = texture2D(u_velocity, vB).y;
  gl_FragColor = vec4(0.25 * (r - l + t - b), 0.0, 0.0, 1.0);
}`;

const PRESSURE = `
precision highp float;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D u_pressure;
uniform sampler2D u_divergence;
void main () {
  float l = texture2D(u_pressure, vL).x;
  float r = texture2D(u_pressure, vR).x;
  float t = texture2D(u_pressure, vT).x;
  float b = texture2D(u_pressure, vB).x;
  float d = texture2D(u_divergence, vUv).x;
  gl_FragColor = vec4((l + r + b + t - d) * 0.25, 0.0, 0.0, 1.0);
}`;

const GRADIENT = `
precision highp float;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D u_pressure;
uniform sampler2D u_velocity;
void main () {
  float l = texture2D(u_pressure, vL).x;
  float r = texture2D(u_pressure, vR).x;
  float t = texture2D(u_pressure, vT).x;
  float b = texture2D(u_pressure, vB).x;
  vec2 v = texture2D(u_velocity, vUv).xy - vec2(r - l, t - b);
  gl_FragColor = vec4(v, 0.0, 1.0);
}`;

/* Moves a field along the velocity and lets it fade. */
const ADVECT = `
precision highp float;
varying vec2 vUv;
uniform sampler2D u_velocity;
uniform sampler2D u_input;
uniform vec2 u_texel;
uniform float u_dt;
uniform float u_fade;
vec4 bilerp (sampler2D sam, vec2 uv, vec2 ts) {
  vec2 st = uv / ts - 0.5;
  vec2 i = floor(st);
  vec2 f = fract(st);
  vec4 a = texture2D(sam, (i + vec2(0.5, 0.5)) * ts);
  vec4 b = texture2D(sam, (i + vec2(1.5, 0.5)) * ts);
  vec4 c = texture2D(sam, (i + vec2(0.5, 1.5)) * ts);
  vec4 d = texture2D(sam, (i + vec2(1.5, 1.5)) * ts);
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
void main () {
  vec2 from = vUv - u_dt * bilerp(u_velocity, vUv, u_texel).xy * u_texel;
  gl_FragColor = u_fade * bilerp(u_input, from, u_texel);
}`;

/* Draws the photo (object-fit: cover) through the ripples. The canvas is larger than the
   photo frame (overscan), so ripples can push the edges outward.
   u_text: an optional text mask (the hero title); under it the photo is inverted,
   which is exactly "difference" blending of white letters over the photo. */
const DISPLAY = `
precision highp float;
varying vec2 vUv;
uniform float u_ratio;
uniform float u_img_ratio;
uniform float u_power;
uniform float u_inner;
uniform sampler2D u_offset;
uniform sampler2D u_velocity;
uniform sampler2D u_image;
uniform sampler2D u_text;
uniform float u_text_on;
uniform vec4 u_text_rect;
vec2 frameUv () {
  return (vUv - 0.5) / u_inner + 0.5;
}
vec2 imageUv () {
  vec2 uv = (vUv - 0.5) / u_inner;
  vec2 scale = vec2(1.0);
  if (u_ratio > u_img_ratio) scale.y = u_img_ratio / u_ratio;
  else scale.x = u_ratio / u_img_ratio;
  return uv * scale + 0.5;
}
vec3 sampleImage (vec2 uv) {
  vec2 c = clamp(uv, 0.0, 1.0);
  if (uv.x > 0.0 && uv.x < 1.0 && uv.y > 0.0 && uv.y < 1.0) {
    return texture2D(u_image, vec2(c.x, 1.0 - c.y)).rgb;
  }
  // Outside the photo: a small blur instead of stretched edge pixels.
  float d = 0.002;
  vec3 sum = vec3(0.0);
  for (int x = -1; x <= 1; x++) {
    for (int y = -1; y <= 1; y++) {
      vec2 p = clamp(c + vec2(float(x), float(y)) * d, 0.0, 1.0);
      sum += texture2D(u_image, vec2(p.x, 1.0 - p.y)).rgb;
    }
  }
  return sum / 9.0;
}
float edge (vec2 uv, float w) {
  return smoothstep(0.0, w, uv.x) * smoothstep(1.0, 1.0 - w, uv.x)
       * smoothstep(0.0, w, uv.y) * smoothstep(1.0, 1.0 - w, uv.y);
}
void main () {
  float offset = texture2D(u_offset, vUv).r;
  vec2 dir = normalize(texture2D(u_velocity, vUv).xy + 0.001);
  vec2 shift = u_power * dir * offset;
  vec3 img = sampleImage(imageUv() - 2.0 * shift);
  float alpha = edge(frameUv() - shift, 0.002);
  vec2 t = (vUv - u_text_rect.xy) / u_text_rect.zw;
  float inside = step(0.0, t.x) * step(t.x, 1.0) * step(0.0, t.y) * step(t.y, 1.0);
  float letters = u_text_on * inside * texture2D(u_text, vec2(t.x, 1.0 - t.y)).a;
  img = mix(img, 1.0 - img, letters);
  gl_FragColor = vec4(img * alpha, alpha);
}`;

type Target = { fbo: WebGLFramebuffer; tex: WebGLTexture; w: number; h: number };
type Double = { read: Target; write: Target; swap: () => void };
type Program = { program: WebGLProgram; u: Record<string, WebGLUniformLocation> };

export type FluidSettings = {
  resolution: number;
  cursorSize: number;
  cursorPower: number;
  distortion: number;
  overscan: number;
};

/**
 * Starts the effect on `canvas`, sized from `frame`. Returns a stop function, or null if WebGL can't run it.
 * `title` (optional): white text that should look "difference"-blended over the photo. Browsers may draw a
 * busy WebGL canvas on its own layer, where CSS blending no longer sees it (the letters turn plain white),
 * so from the first frame the canvas shows, the title is drawn here instead (following it while it appears)
 * and its own text is made transparent.
 */
export function startFluid(
  canvas: HTMLCanvasElement,
  frame: HTMLElement,
  imageSrc: string,
  s: FluidSettings,
  onReady: () => void,
  title: HTMLElement | null = null,
): (() => void) | null {
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true });
  if (!gl || !gl.getExtension("OES_texture_float")) return null;
  gl.getExtension("OES_texture_float_linear");
  gl.clearColor(0, 0, 0, 0);

  const compile = (src: string, type: number) => {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) ?? "shader");
    return sh;
  };
  const program = (fragment: string): Program => {
    const p = gl.createProgram()!;
    gl.attachShader(p, compile(VERTEX, gl.VERTEX_SHADER));
    gl.attachShader(p, compile(fragment, gl.FRAGMENT_SHADER));
    gl.bindAttribLocation(p, 0, "a_position");
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) ?? "program");
    const u: Record<string, WebGLUniformLocation> = {};
    const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < n; i++) {
      const info = gl.getActiveUniform(p, i);
      if (info) u[info.name] = gl.getUniformLocation(p, info.name)!;
    }
    return { program: p, u };
  };

  let programs: Record<"splat" | "divergence" | "pressure" | "gradient" | "advect" | "display", Program>;
  try {
    programs = {
      splat: program(SPLAT),
      divergence: program(DIVERGENCE),
      pressure: program(PRESSURE),
      gradient: program(GRADIENT),
      advect: program(ADVECT),
      display: program(DISPLAY),
    };
  } catch {
    return null;
  }

  const quad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
  const index = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);

  const draw = (target: Target | null) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);
    if (target) {
      gl.viewport(0, 0, target.w, target.h);
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    } else {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  };
  const target = (w: number, h: number): Target => {
    const tex = gl.createTexture()!;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, w, h, 0, gl.RGB, gl.FLOAT, null);
    const fbo = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return { fbo, tex, w, h };
  };
  const double = (w: number, h: number): Double => {
    const d = { read: target(w, h), write: target(w, h), swap: () => ([d.read, d.write] = [d.write, d.read]) };
    return d;
  };
  const free = (t: Target) => {
    gl.deleteFramebuffer(t.fbo);
    gl.deleteTexture(t.tex);
  };
  const bind = (t: Target, unit: number) => {
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, t.tex);
    return unit;
  };

  let velocity!: Double;
  let offset!: Double;
  let pressure!: Double;
  let divergence!: Target;
  let simW = 2;
  let simH = 2;
  let image: WebGLTexture | null = null;
  let imageRatio = 1;
  const pointer = { x: 0, y: 0, dx: 0, dy: 0, moved: false };
  let framesLeft = 1;
  let raf: number | null = null;
  let last = 0;
  let onScreen = true;
  let stopped = false;

  const size = () => {
    const w = frame.clientWidth;
    const h = frame.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(2, Math.round(w * s.overscan * dpr));
    canvas.height = Math.max(2, Math.round(h * s.overscan * dpr));
    simH = Math.round(s.resolution);
    simW = Math.round(s.resolution * (w / Math.max(1, h)));
    for (const d of [velocity, offset, pressure]) if (d) { free(d.read); free(d.write); }
    if (divergence) free(divergence);
    velocity = double(simW, simH);
    offset = double(simW, simH);
    pressure = double(simW, simH);
    divergence = target(simW, simH);
    pointer.x = 0.65 * w;
    pointer.y = 0.5 * h;
  };
  size();
  if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) return null;

  /** Pointer position in canvas UV (the canvas is overscanned around the frame). */
  const pointUv = () => {
    const w = frame.clientWidth * s.overscan;
    const h = frame.clientHeight * s.overscan;
    return {
      u: (pointer.x + 0.5 * (w - frame.clientWidth)) / w,
      v: 1 - (pointer.y + 0.5 * (h - frame.clientHeight)) / h,
    };
  };

  const kick = (frames = 120) => {
    if (stopped || !onScreen || document.visibilityState !== "visible") return;
    framesLeft = Math.max(framesLeft, frames);
    if (raf === null) raf = requestAnimationFrame(step);
  };

  const step = (t: number) => {
    raf = null;
    if (stopped || !onScreen || document.visibilityState !== "visible") return;
    const dt = last ? Math.min((t - last) / 1000, 1 / 30) : 1 / 60;
    last = t;
    const ratio = frame.clientWidth / Math.max(1, frame.clientHeight);
    const texel: [number, number] = [1 / simW, 1 / simH];

    if (pointer.moved) {
      pointer.moved = false;
      const p = pointUv();
      const { splat } = programs;
      gl.useProgram(splat.program);
      gl.uniform1f(splat.u.u_ratio, ratio);
      gl.uniform2f(splat.u.u_point, p.u, p.v);
      gl.uniform1f(splat.u.u_size, s.cursorSize);
      gl.uniform1i(splat.u.u_input, bind(velocity.read, 1));
      gl.uniform3f(splat.u.u_value, pointer.dx, -pointer.dy, 0);
      draw(velocity.write);
      velocity.swap();
      gl.uniform1i(splat.u.u_input, bind(offset.read, 1));
      gl.uniform3f(splat.u.u_value, s.cursorPower, 0, 0);
      draw(offset.write);
      offset.swap();
    }

    const { divergence: div, pressure: pre, gradient, advect, display } = programs;
    gl.useProgram(div.program);
    gl.uniform2f(div.u.u_texel, ...texel);
    gl.uniform1i(div.u.u_velocity, bind(velocity.read, 1));
    draw(divergence);

    gl.useProgram(pre.program);
    gl.uniform2f(pre.u.u_texel, ...texel);
    gl.uniform1i(pre.u.u_divergence, bind(divergence, 1));
    for (let i = 0; i < 16; i++) {
      gl.uniform1i(pre.u.u_pressure, bind(pressure.read, 2));
      draw(pressure.write);
      pressure.swap();
    }

    gl.useProgram(gradient.program);
    gl.uniform2f(gradient.u.u_texel, ...texel);
    gl.uniform1i(gradient.u.u_pressure, bind(pressure.read, 1));
    gl.uniform1i(gradient.u.u_velocity, bind(velocity.read, 2));
    draw(velocity.write);
    velocity.swap();

    gl.useProgram(advect.program);
    gl.uniform2f(advect.u.u_texel, ...texel);
    gl.uniform1i(advect.u.u_velocity, bind(velocity.read, 1));
    gl.uniform1i(advect.u.u_input, bind(velocity.read, 1));
    gl.uniform1f(advect.u.u_dt, dt);
    gl.uniform1f(advect.u.u_fade, 0.97);
    draw(velocity.write);
    velocity.swap();

    gl.uniform1i(advect.u.u_velocity, bind(velocity.read, 1));
    gl.uniform1i(advect.u.u_input, bind(offset.read, 2));
    gl.uniform1f(advect.u.u_dt, 8 * dt);
    gl.uniform1f(advect.u.u_fade, 0.98);
    draw(offset.write);
    offset.swap();

    gl.useProgram(display.program);
    gl.uniform1f(display.u.u_ratio, ratio);
    gl.uniform1f(display.u.u_img_ratio, imageRatio);
    gl.uniform1f(display.u.u_power, s.distortion);
    gl.uniform1f(display.u.u_inner, 1 / s.overscan);
    gl.uniform1i(display.u.u_velocity, bind(velocity.read, 2));
    gl.uniform1i(display.u.u_offset, bind(offset.read, 1));
    if (image) {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, image);
      gl.uniform1i(display.u.u_image, 0);
    }
    gl.uniform1f(display.u.u_text_on, textOn ? 1 : 0);
    gl.uniform4f(display.u.u_text_rect, ...textRect);
    if (textTex) {
      gl.activeTexture(gl.TEXTURE3);
      gl.bindTexture(gl.TEXTURE_2D, textTex);
      gl.uniform1i(display.u.u_text, 3);
    }
    draw(null);

    framesLeft = Math.max(0, framesLeft - 1);
    if (framesLeft > 0) kick(0);
  };

  /* --- Title mask --------------------------------------------------------------------------- */
  let textTex: WebGLTexture | null = null;
  let textOn = false;
  /** Where the mask sits on the canvas, in canvas UV (x, y from the bottom, width, height). */
  let textRect: [number, number, number, number] = [0, 0, 1, 1];
  let lastLook = "";
  let watch: number | null = null;
  const mask = document.createElement("canvas");

  /** Opacity of the title as seen on screen (its own and its wrappers', up to the photo's section). */
  const titleOpacity = (el: HTMLElement) => {
    let o = 1;
    for (let n: HTMLElement | null = el; n && !n.contains(frame); n = n.parentElement) {
      o *= Number.parseFloat(getComputedStyle(n).opacity);
    }
    return o;
  };

  /**
   * Paints the title's words (at its current opacity) into a mask covering just the title and uploads it.
   * Skipped when nothing changed since the last paint. Returns true if it painted.
   */
  const paintMask = (force = false) => {
    if (!title) return false;
    const box = canvas.getBoundingClientRect();
    const a = title.getBoundingClientRect();
    const opacity = titleOpacity(title);
    const look = [a.left - box.left, a.top - box.top, a.width, a.height, box.width, box.height, opacity]
      .map((v) => v.toFixed(2))
      .join();
    if (!force && look === lastLook) return false;
    lastLook = look;
    if (!box.width || !box.height) return false;
    const cs = getComputedStyle(title);
    const pad = Number.parseFloat(cs.fontSize) * 0.25; // room for letters reaching past the line box
    const x = a.left - box.left - pad;
    const y = a.top - box.top - pad;
    const w = a.width + 2 * pad;
    const h = a.height + 2 * pad;
    const sx = canvas.width / box.width;
    const sy = canvas.height / box.height;
    mask.width = Math.max(1, Math.round(w * sx));
    mask.height = Math.max(1, Math.round(h * sy));
    const ctx = mask.getContext("2d");
    if (!ctx) return false;
    ctx.setTransform(mask.width / w, 0, 0, mask.height / h, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = opacity;
    ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    ctx.letterSpacing = cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing;
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "black"; // only the mask's alpha is used
    const upper = cs.textTransform === "uppercase";
    const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const text = node.textContent ?? "";
      for (const word of text.matchAll(/\S+/g)) {
        range.setStart(node, word.index);
        range.setEnd(node, word.index + word[0].length);
        const r = range.getBoundingClientRect();
        const shown = upper ? word[0].toUpperCase() : word[0];
        const left = r.left - box.left - x;
        const top = r.top - box.top - y;
        ctx.fillText(shown, left, top + ctx.measureText(shown).fontBoundingBoxAscent);
      }
    }
    textRect = [x / box.width, 1 - (y + h) / box.height, w / box.width, h / box.height];
    textTex ??= gl.createTexture();
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, textTex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, mask);
    return true;
  };

  /** Follows the title while it appears (it drops and fades in; the photo settles), then rests. */
  const followTitle = () => {
    if (!title) return;
    let still = 0;
    const tick = () => {
      watch = null;
      if (stopped) return;
      if (paintMask()) {
        still = 0;
        kick(1);
      } else if (titleOpacity(title) >= 1) {
        still += 1;
      }
      // Rest once the title is fully shown and nothing has changed for a second
      // (it may wait hidden behind the preloader first); resizes repaint on their own.
      if (still < 60) watch = requestAnimationFrame(tick);
    };
    watch = requestAnimationFrame(tick);
  };

  let rect = frame.getBoundingClientRect();
  const measure = () => (rect = frame.getBoundingClientRect());
  const onMove = (e: PointerEvent) => {
    // Measured on every move: the photo moves (appear effect, slower scrolling), so a stored
    // position would put the ripples below or above the cursor.
    measure();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
      pointer.moved = false;
      return;
    }
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    pointer.moved = true;
    pointer.dx = 6 * (x - pointer.x);
    pointer.dy = 6 * (y - pointer.y);
    pointer.x = x;
    pointer.y = y;
    kick();
  };
  const onResize = () => {
    measure();
    size();
    if (textOn) paintMask(true);
    kick(1);
  };
  const onVisibility = () => kick(1);

  window.addEventListener("pointermove", onMove);
  window.addEventListener("resize", onResize);
  window.addEventListener("scroll", measure, true);
  document.addEventListener("visibilitychange", onVisibility);
  const ro = new ResizeObserver(onResize);
  ro.observe(frame);
  const io = new IntersectionObserver((entries) => {
    onScreen = entries[entries.length - 1]?.isIntersecting ?? true;
    if (onScreen) kick(1);
  });
  io.observe(frame);

  const img = new Image();
  img.onload = () => {
    if (stopped) return;
    imageRatio = img.naturalWidth / Math.max(1, img.naturalHeight);
    image = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    // The title needs its font for the mask. Then, in one go: draw a frame with the title in it,
    // hide the title's own text and show the canvas, so the CSS blend is never shown over the canvas.
    document.fonts.ready.then(() => {
      if (stopped) return;
      if (title) {
        paintMask(true);
        textOn = true;
      }
      framesLeft = Math.max(framesLeft, 1);
      step(performance.now());
      if (title) title.style.color = "transparent";
      canvas.style.visibility = "visible";
      onReady();
      followTitle();
    });
  };
  img.src = imageSrc;

  return () => {
    stopped = true;
    if (raf !== null) cancelAnimationFrame(raf);
    if (watch !== null) cancelAnimationFrame(watch);
    if (title) title.style.color = "";
    canvas.style.visibility = "";
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("scroll", measure, true);
    document.removeEventListener("visibilitychange", onVisibility);
    ro.disconnect();
    io.disconnect();
    for (const d of [velocity, offset, pressure]) { free(d.read); free(d.write); }
    free(divergence);
    if (image) gl.deleteTexture(image);
    if (textTex) gl.deleteTexture(textTex);
    gl.deleteBuffer(quad);
    gl.deleteBuffer(index);
    for (const p of Object.values(programs)) gl.deleteProgram(p.program);
  };
}
