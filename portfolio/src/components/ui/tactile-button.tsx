import { useMemo, type CSSProperties } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ExternalLink } from "lucide-react";

type FocusRole = "background" | "button" | "visual";
type EffectMode = "light" | "dark";

type FocusTarget = {
  selector: string;
  role: FocusRole;
  fit?: "cover" | "contain-square" | "wide-wordmark" | "portrait-stage";
  preserveTransform?: boolean;
};

type EffectDefinition = {
  title: string;
  source: string;
  background: string;
  targets: readonly FocusTarget[];
  theme?: {
    nativeMode?: EffectMode;
    lightBackground: string;
    darkBackground: string;
    invertBackground?: boolean;
  };
  hiddenTargets?: readonly string[];
};

export type TactileButtonProps = {
  mode?: EffectMode;
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: CSSProperties;
  href?: string;
};

const TACTILE_BUTTON_DEFAULTS = {
  mode: "dark",
  hue: 0,
  saturation: 1,
  brightness: 1,
  href: "#",
} as const;

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link ml-1 opacity-80">
    <path d="M15 3h6v6"/>
    <path d="M10 14 21 3"/>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
  </svg>
);

const NEXUS_TACTILE_SOURCE = (href: string) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>N E X U S &mdash; Tactile Fluidics</title>
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        :root {
            --color-bg: #030303;
            --color-text: #f5f5f5;
            --color-muted: #888888;
            --color-accent: #ffffff;
            --color-surface: #0a0a0a;
            --color-border: #1f1f1f;
        }
    </style>
</head>
<body class="text-[var(--color-text)] h-screen w-screen overflow-hidden font-['Inter',sans-serif] selection:bg-[var(--color-accent)] selection:text-black relative" style="background: transparent !important; background-color: transparent !important;">

    <!-- Ambient WebGL Background -->
    <canvas id="bg-canvas" class="absolute inset-0 w-full h-full block pointer-events-none z-0 opacity-0" aria-hidden="true"></canvas>

    <!-- Main Content Layer -->
    <main class="content-layer relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
        
        <!-- CTA Component -->
        <div class="intro opacity-0 transform translate-y-[-20px] scale-95 will-change-transform">
            <!-- Subtle Gradient Border Wrapper -->
            <div class="p-[1px] rounded-[19px] bg-gradient-to-b from-neutral-500/30 via-neutral-800/20 to-neutral-950/40 shadow-2xl">
                <a href="${href}" target="${href === '#' ? '_self' : '_blank'}" rel="noreferrer" class="relative flex items-center justify-center w-[210px] h-[55px] border-0 p-0 rounded-[18px] overflow-hidden cursor-pointer bg-[var(--color-surface)] transition-all duration-300 ease-out shadow-[0_22px_44px_rgba(4,24,36,0.35),0_3px_9px_rgba(5,10,15,0.4),inset_0_0_0_1px_rgba(255,255,255,0.05)] hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(255,255,255,0.1),0_4px_11px_rgba(5,10,15,0.45)] active:translate-y-[1px] active:scale-[0.985] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-[5px]" id="btn">
                    <canvas id="gl" aria-hidden="true" class="absolute inset-0 w-full h-full block"></canvas>
                    <span class="relative z-10 pointer-events-none font-normal text-sm tracking-[0.3em] indent-[0.3em] text-[var(--color-text)] drop-shadow-[0_1px_10px_rgba(0,18,25,0.85)] flex items-center gap-2">
                        LIVE DEMO
                        ${renderToStaticMarkup(<ExternalLinkIcon />)}
                    </span>
                </a>
            </div>
        </div>
    </main>

    <script>
        // --------------------------------------------------------
        // GSAP Animations
        // --------------------------------------------------------
        document.addEventListener("DOMContentLoaded", () => {
            const tl = gsap.timeline();
            tl.to("#bg-canvas", { opacity: 1, duration: 2, ease: "power2.inOut" }, 0);
            tl.to(".intro", {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 1.2,
                ease: "elastic.out(1, 0.6)"
            }, 0.2);
        });

        // --------------------------------------------------------
        // Interactive Liquid Button WebGL (from reference)
        // --------------------------------------------------------
        (function initButtonWebGL() {
            var btn = document.getElementById('btn');
            var canvas = document.getElementById('gl');
            var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            var gl = canvas.getContext('webgl');
            
            if (!gl) { 
                btn.style.background = 'var(--color-surface)';
                canvas.style.display = 'none';
                return; 
            }

            var VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
            var FS = [
                'precision highp float;',
                'uniform vec2 u_res;',
                'uniform float u_time;',
                'uniform float u_level;',
                'uniform float u_tilt;',
                'uniform float u_slosh;',
                'float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}',
                'float noise(vec2 p){',
                '  vec2 i=floor(p), f=fract(p);',
                '  vec2 u=f*f*(3.0-2.0*f);',
                '  return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),',
                '             mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);',
                '}',
                'float fbm(vec2 p){',
                '  float v=0.0; float a=0.5;',
                '  for(int i=0;i<4;i++){ v+=a*noise(p); p=p*2.04+vec2(11.3,7.1); a*=0.5; }',
                '  return v;',
                '}',
                'void main(){',
                '  vec2 uv = gl_FragCoord.xy / u_res;',
                '  float ar = u_res.x / u_res.y;',
                '  float x = uv.x * ar;',
                '  float t = u_time;',
                '  float amp = 0.012 + u_slosh * 0.045;',
                '  float surf = u_level',
                '    + u_tilt * (uv.x - 0.5) * 0.34',
                '    + amp * sin(x * 5.1 + t * 4.6)',
                '    + amp * 0.62 * sin(x * 9.7 + t * (-6.8) + 1.7)',
                '    + amp * 0.38 * sin(x * 14.3 + t * 8.9 + 4.2);',
                '  float d = surf - uv.y;',
                '  float inside = smoothstep(0.0, 0.012, d);',
                '  float depth = clamp(d / max(u_level, 0.001), 0.0, 1.0);',
                '  vec3 liq = mix(vec3(0.2, 0.2, 0.2), vec3(0.1, 0.1, 0.1), depth);',
                '  float caust = fbm(vec2(x * 4.2, (uv.y + t * 0.14) * 4.2));',
                '  liq *= 0.8 + 0.42 * caust;',
                '  liq += vec3(0.3, 0.3, 0.3) * pow(max(0.0, d * 3.0), 1.5) * u_slosh;',
                '  vec3 col = liq;',
                '  float glow = exp(-abs(d) * 80.0) * 0.85 + exp(-abs(d) * 220.0) * 0.5;',
                '  col += vec3(1.0) * glow;',
                '  vec2 e = uv * (1.0 - uv);',
                '  col *= 0.55 + 0.45 * pow(e.x * e.y * 16.0, 0.22);',
                '  float alpha = clamp(inside + glow, 0.0, 1.0);',
                '  gl_FragColor = vec4(col * alpha, alpha);',
                '}'
            ].join('\\n');

            function compile(type, src) {
                var s = gl.createShader(type);
                gl.shaderSource(s, src);
                gl.compileShader(s);
                return s;
            }
            
            var prog = gl.createProgram();
            gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
            gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
            gl.linkProgram(prog);
            gl.useProgram(prog);

            var buf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buf);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
            var locP = gl.getAttribLocation(prog, 'p');
            gl.enableVertexAttribArray(locP);
            gl.vertexAttribPointer(locP, 2, gl.FLOAT, false, 0, 0);

            var uRes = gl.getUniformLocation(prog, 'u_res');
            var uTime = gl.getUniformLocation(prog, 'u_time');
            var uLevel = gl.getUniformLocation(prog, 'u_level');
            var uTilt = gl.getUniformLocation(prog, 'u_tilt');
            var uSlosh = gl.getUniformLocation(prog, 'u_slosh');

            function resize() {
                var dpr = Math.min(window.devicePixelRatio || 1, 2);
                var w = Math.max(1, Math.round(canvas.clientWidth * dpr));
                var h = Math.max(1, Math.round(canvas.clientHeight * dpr));
                if (canvas.width !== w || canvas.height !== h) {
                    canvas.width = w;
                    canvas.height = h;
                    gl.viewport(0, 0, w, h);
                }
            }
            window.addEventListener('resize', resize);
            resize();

            var BASE = 0.56;
            var level = BASE, gulp = 0;
            var slosh = 0.4, tilt = 0, tiltTarget = 0;
            var lastX = null;
            var last = performance.now();

            btn.addEventListener('mousemove', function (e) {
                var rect = btn.getBoundingClientRect();
                var x = (e.clientX - rect.left) / Math.max(1, rect.width);
                if (lastX !== null) {
                    slosh = Math.min(1.4, slosh + Math.abs(x - lastX) * 2.6);
                }
                lastX = x;
                tiltTarget = Math.max(-1, Math.min(1, (x - 0.5) * 2));
            });
            btn.addEventListener('mouseleave', function () { lastX = null; tiltTarget = 0; });
            btn.addEventListener('focus', function () { slosh = Math.min(1.4, slosh + 0.5); });
            btn.addEventListener('click', function () {
                gulp = 1;
                slosh = Math.min(1.4, slosh + 0.7);
            });

            function frame(now) {
                var dt = Math.min(0.05, (now - last) / 1000);
                last = now;
                slosh *= Math.exp(-1.5 * dt);
                gulp *= Math.exp(-1.1 * dt);
                tilt += (tiltTarget - tilt) * Math.min(1, dt * 5);
                var levelTarget = BASE - 0.36 * gulp;
                level += (levelTarget - level) * Math.min(1, dt * 5.5);
                
                resize();
                gl.uniform2f(uRes, canvas.width, canvas.height);
                gl.uniform1f(uTime, reduced ? 2.0 : now / 1000);
                gl.uniform1f(uLevel, level);
                gl.uniform1f(uTilt, tilt);
                gl.uniform1f(uSlosh, reduced ? 0.25 : slosh);
                gl.drawArrays(gl.TRIANGLES, 0, 3);
                requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
        })();
    </script>
</body>
</html>`;

const getTactileEffect = (href: string): EffectDefinition => ({
  title: "Nexus tactile fluidics button",
  source: NEXUS_TACTILE_SOURCE(href),
  background: "transparent",
  theme: {
    nativeMode: "dark",
    lightBackground: "transparent",
    darkBackground: "transparent",
    invertBackground: true,
  },
  targets: [
    { selector: "#bg-canvas", role: "background" },
    { selector: "#btn", role: "button" },
  ],
});

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function effectBackground(definition: EffectDefinition, mode: EffectMode) {
  return definition.theme?.[`${mode}Background`] ?? definition.background;
}

function buildFocusedDocument(definition: EffectDefinition, mode: EffectMode) {
  const background = effectBackground(definition, mode);
  const invertBackground =
    definition.theme?.invertBackground === true &&
    definition.theme.nativeMode !== mode;
  const source = definition.source;
  const targetJson = JSON.stringify(definition.targets).replace(
    /</g,
    "\\u003c",
  );
  const hiddenTargetJson = JSON.stringify(
    definition.hiddenTargets ?? [],
  ).replace(/</g, "\\u003c");
  const modeJson = JSON.stringify(mode);
  const backgroundFilter = invertBackground
    ? "filter: invert(1) hue-rotate(180deg) saturate(.92) brightness(1.02) !important;"
    : "";
  const focusStyle = `<style data-threeui-focus>
html, body { width: 100% !important; height: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: transparent !important; background-color: transparent !important; }
body { position: relative !important; display: flex !important; align-items: center !important; justify-content: center !important; }
body > * { visibility: hidden !important; }
body[data-threeui-ready] > [data-threeui-role] { visibility: visible !important; }
[data-threeui-residual] { display: none !important; }
[data-threeui-hidden] { display: none !important; }
[data-threeui-role="background"] { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; max-width: none !important; max-height: none !important; z-index: 0 !important; opacity: 1 !important; pointer-events: none !important; ${backgroundFilter} }
[data-threeui-role="button"] { position: relative !important; z-index: 2 !important; opacity: 1 !important; flex: none !important; }
[data-threeui-role="button"]:not([data-threeui-preserve-transform]) { transform: none !important; }
</style>`;
  const focusScript = `<script data-threeui-focus>
(function () {
  document.documentElement.dataset.sfMode = ${modeJson};
  var isolated = false;
  function isolate() {
    if (isolated) return;
    var specs = ${targetJson};
    var hiddenSelectors = ${hiddenTargetJson};
    var roots = [];
    hiddenSelectors.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (element) {
        element.setAttribute('data-threeui-hidden', '');
        element.setAttribute('aria-hidden', 'true');
        if ('inert' in element) element.inert = true;
      });
    });
    specs.forEach(function (spec) {
      var element = document.querySelector(spec.selector);
      if (!element) return;
      element.setAttribute('data-threeui-role', spec.role);
      if (spec.fit) element.setAttribute('data-threeui-fit', spec.fit);
      if (spec.preserveTransform) element.setAttribute('data-threeui-preserve-transform', '');
      if (!roots.some(function (root) { return root.contains(element); })) roots.push(element);
    });
    if (!roots.length) return;
    isolated = true;
    roots.forEach(function (root) {
      var placeholderLink = root.matches('a[href="#"]') ? root : root.querySelector('a[href="#"]');
      if (placeholderLink) placeholderLink.addEventListener('click', function (event) { event.preventDefault(); });
      document.body.appendChild(root);
    });
    Array.from(document.body.children).forEach(function (element) {
      if (roots.indexOf(element) !== -1) return;
      element.setAttribute('data-threeui-residual', '');
      element.setAttribute('aria-hidden', 'true');
      if ('inert' in element) element.inert = true;
    });
    document.body.setAttribute('data-threeui-ready', '');
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
  }
  function scheduleIsolation() { setTimeout(isolate, 100); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleIsolation, { once: true });
  else scheduleIsolation();
  window.addEventListener('load', isolate, { once: true });
})();
</script>`;
  return source
    .replace(/<\/head>/i, `${focusStyle}</head>`)
    .replace(/<\/body>/i, `${focusScript}</body>`);
}

function NeuformIsolatedEffect({
  mode = TACTILE_BUTTON_DEFAULTS.mode,
  hue = TACTILE_BUTTON_DEFAULTS.hue,
  saturation = TACTILE_BUTTON_DEFAULTS.saturation,
  brightness = TACTILE_BUTTON_DEFAULTS.brightness,
  href = TACTILE_BUTTON_DEFAULTS.href,
  className,
  style,
}: TactileButtonProps) {
  const definition = getTactileEffect(href);
  const safeMode: EffectMode = mode === "light" ? "light" : "dark";
  const background = effectBackground(definition, safeMode);
  const source = useMemo(
    () => buildFocusedDocument(definition, safeMode),
    [safeMode, href],
  );
  const safeHue = clamp(hue, -180, 180);
  const safeSaturation = clamp(saturation, 0, 2);
  const safeBrightness = clamp(brightness, 0.35, 1.65);
  const filter =
    safeHue === 0 && safeSaturation === 1 && safeBrightness === 1
      ? undefined
      : `hue-rotate(${safeHue}deg) saturate(${safeSaturation}) brightness(${safeBrightness})`;

  return (
    <iframe
      className={className}
      data-mode={safeMode}
      title={definition.title}
      srcDoc={source}
      sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-same-origin"
      loading="eager"
      allowTransparency={true}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        border: 0,
        background: "transparent",
        backgroundColor: "transparent",
        filter,
        ...style,
      }}
    />
  );
}

export default function TactileButton(props: TactileButtonProps) {
  return <NeuformIsolatedEffect {...props} />;
}
