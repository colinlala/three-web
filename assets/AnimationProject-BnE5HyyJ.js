import{a as e,c as t,d as n,f as r,h as i,n as a,s as o,t as s,u as c}from"./index-DBUjE5BP.js";import{Qt as l,Rt as u,St as d,_ as f,g as p,r as m,st as h,yt as g,zt as _}from"./three.module-CSH3W071.js";import{t as v}from"./lil-gui.esm-BsdZdNnU.js";var y={class:`animation-view`},b=`
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
    }
`,x=`
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uBgColor;
    uniform float uSpeed;
    uniform float uComplexity;
    uniform float uDensity;
    uniform float uIntensity;
    uniform vec2 uMouse;
    uniform float uHoverEffect;

    varying vec2 vUv;

    mat2 rot(float a) {
        float s = sin(a), c = cos(a);
        return mat2(c, -s, s, c);
    }

    void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);
        vec2 original_p = p;
        
        vec3 finalColor = vec3(0.0);
        float time = uTime * uSpeed * 0.5;
        
        p *= rot(0.2);
        
        if (uHoverEffect > 0.0) {
            vec2 m = uMouse;
            m.x *= uResolution.x / min(uResolution.x, uResolution.y);
            m.y *= uResolution.y / min(uResolution.x, uResolution.y);
            m *= rot(0.2);
            float mouseDist = length(p - m);
            float force = smoothstep(1.5, 0.0, mouseDist) * uHoverEffect;
            p += (p - m) * force * 0.15;
            p *= rot(force * 0.12);
        }
        
        float iterations = floor(uComplexity);
        
        for (float i = 1.0; i <= 20.0; i++) {
            if (i > iterations) break;
            
            p *= rot(sin(time * 0.05) * 0.1 + 0.08);
            
            vec2 q = p;
            float dist = length(p);
            q *= rot(dist * uDensity * 0.25 - time * 0.3);
            
            float freq = uDensity * 0.8;
            q.x += sin(q.y * freq + time * 0.5 + i * 0.15) * 0.5;
            q.y += cos(q.x * freq - time * 0.5 - i * 0.15) * 0.5;
            
            vec2 r = q;
            r.x += sin(q.y * freq * 2.0 - time * 0.8) * 0.25;
            r.y += cos(q.x * freq * 2.0 + time * 0.8) * 0.25;
            
            float wave = sin(r.x * freq * 1.5 + time) * 0.6 
                       + cos(r.y * freq * 0.5 - time * 0.7) * 0.4;
            
            float d = abs(r.y - wave);
            float core = 0.005 / max(d, 0.002);
            float soft1 = exp(-d * 8.0) * 0.6; 
            float soft2 = exp(-d * 2.0) * 0.2; 
            
            float mixFactor = sin(r.x * 3.0 + r.y * 2.0 + time + i * 1.6) * 0.5 + 0.5;
            vec3 layerColor = mix(uColor1, uColor2, mixFactor);
            
            float attenuation = 1.0 / (i * 0.6 + 1.0);
            finalColor += layerColor * (core + soft1 + soft2) * uIntensity * attenuation * 30.0;
            p = r * 1.05; 
        }
        
        finalColor += uBgColor * 0.5;
        float vignette = 1.0 - smoothstep(0.5, 2.5, length(original_p));
        finalColor *= vignette;
        finalColor = finalColor * (2.51 * finalColor + 0.03) / (finalColor * (2.43 * finalColor + 0.59) + 0.14);

        gl_FragColor = vec4(finalColor, 1.0);
    }
`,S=s(t({__name:`AnimationProject`,setup(t){let s=a(),S=i(null),C,w,T,E,D,O=()=>{if(!S.value)return;C=new u,w=new g(-1,1,1,-1,0,1),T=new m({antialias:!0,alpha:!1}),T.setSize(window.innerWidth,window.innerHeight),T.setPixelRatio(window.devicePixelRatio),S.value.appendChild(T.domElement);let e={uTime:{value:0},uResolution:{value:new l(window.innerWidth*window.devicePixelRatio,window.innerHeight*window.devicePixelRatio)},uColor1:{value:new f(`#0055ff`)},uColor2:{value:new f(`#ff00aa`)},uBgColor:{value:new f(`#05030a`)},uSpeed:{value:.3},uComplexity:{value:8},uDensity:{value:3.2535},uIntensity:{value:.03758},uMouse:{value:new l(0,0)},uHoverEffect:{value:0}},t=new _({vertexShader:b,fragmentShader:x,uniforms:e,depthWrite:!1,depthTest:!1}),n=new h(new d(2,2),t);C.add(n);let r=new l(0,0),i=e=>{r.x=e.clientX/window.innerWidth*2-1,r.y=-(e.clientY/window.innerHeight)*2+1},a=e=>{e.touches.length>0&&(r.x=e.touches[0].clientX/window.innerWidth*2-1,r.y=-(e.touches[0].clientY/window.innerHeight)*2+1)};window.addEventListener(`mousemove`,i),window.addEventListener(`touchmove`,a,{passive:!0});let o={speed:.3,complexity:8,density:3.2535,intensity:.03758,hoverEffect:!1,color1:`#0055ff`,color2:`#ff00aa`,bgColor:`#05030a`};D=new v({title:`Shader Settings`}),D.close();let s=D.addFolder(`Complex Formula Settings`);s.add(o,`speed`,0,3).name(`Speed`).onChange(t=>e.uSpeed.value=t),s.add(o,`complexity`,1,20,1).name(`Math Iterations`).onChange(t=>e.uComplexity.value=t),s.add(o,`density`,.5,5).name(`Space Folding`).onChange(t=>e.uDensity.value=t),s.add(o,`intensity`,.001,.05).name(`Neon Exposure`).onChange(t=>e.uIntensity.value=t),D.addFolder(`Interaction`).add(o,`hoverEffect`).name(`Hover Effect`).onChange(t=>{e.uHoverEffect.value=+!!t});let c=D.addFolder(`Colors`);c.addColor(o,`color1`).name(`Primary Color`).onChange(t=>e.uColor1.value.set(t)),c.addColor(o,`color2`).name(`Secondary Color`).onChange(t=>e.uColor2.value.set(t)),c.addColor(o,`bgColor`).name(`Background Color`).onChange(t=>e.uBgColor.value.set(t));let y=new p,O=()=>{E=requestAnimationFrame(O),e.uMouse.value.x+=(r.x-e.uMouse.value.x)*.05,e.uMouse.value.y+=(r.y-e.uMouse.value.y)*.05,e.uTime.value=y.getElapsedTime(),T.render(C,w)};O();let k=()=>{T.setSize(window.innerWidth,window.innerHeight),e.uResolution.value.set(window.innerWidth*window.devicePixelRatio,window.innerHeight*window.devicePixelRatio)};return window.addEventListener(`resize`,k),()=>{window.removeEventListener(`mousemove`,i),window.removeEventListener(`touchmove`,a),window.removeEventListener(`resize`,k)}},k;c(()=>{k=O()||(()=>{})}),n(()=>{k&&k(),cancelAnimationFrame(E),D&&D.destroy(),T&&T.dispose()});let A=()=>{window.history.length<=1?(window.close(),setTimeout(()=>{s.push(`/achievements`)},100)):s.back()};return(t,n)=>(r(),o(`div`,y,[e(`div`,{ref_key:`containerRef`,ref:S,class:`canvas-container`},null,512),e(`div`,{class:`ui-overlay`},[e(`button`,{class:`back-btn`,onClick:A},`← 返回`),n[0]||=e(`div`,{class:`project-info`},[e(`h1`,null,`前端动画`),e(`p`,null,`Harmonic Vortex Fluid Shader System`),e(`div`,{class:`tech-tags`},[e(`span`,null,`Three.js`),e(`span`,null,`GLSL Shader`),e(`span`,null,`Fluid Physics`)])],-1)])]))}}),[[`__scopeId`,`data-v-005675c0`]]);export{S as default};