import{_ as e,a as t,c as n,d as r,f as i,g as a,h as o,i as s,n as c,o as l,p as u,s as d,t as f,u as ee,v as p}from"./index-D9wyV7gN.js";import{$t as m,Dt as h,Ft as te,J as ne,L as re,M as ie,P as ae,Rt as oe,St as g,Tt as se,_,bt as ce,ct as le,d as v,f as y,g as b,m as ue,r as de,st as x,u as S,vt as fe,wt as pe,z as me,zt as C}from"./three.module-CSH3W071.js";import{t as he}from"./OrbitControls-4RLldrDa.js";var w={class:`xlogo-view`},T={id:`ui-panel`},ge=[`onClick`],_e={id:`theme-label`},ve={key:0,id:`loading`},ye={id:`stats`},E=300,D=12,be=1.1,O=6.5,k=55,A=14,j=32,M=f(n({__name:`XLogoProject`,setup(n){let f=c(),M=o(null),N=o(!0),P=o(`NEON MAGENTA`),F=o(0),I=o(0),L=[{name:`NEON MAGENTA`,base:new _(16711765),core:new _(16711731),hex:`#FF0055`},{name:`CYBER CYAN`,base:new _(58879),core:new _(48093),hex:`#00E5FF`},{name:`ACID LIME`,base:new _(12123968),core:new _(8969496),hex:`#B8FF40`},{name:`SOLAR GOLD`,base:new _(16758528),core:new _(16749056),hex:`#FFB700`}],R,z,B,V,xe,Se=new b,H,U,W,G,K,q,J,Y,Ce=[],X=[],we=[],Te=[],Ee=[];function De(){let e=window.innerWidth/window.innerHeight;return e<.75?64:e<1?54:e<1.4?46:40}function Oe(e){let t=document.createElement(`canvas`);t.width=t.height=512;let n=t.getContext(`2d`);if(e){let e=n.createRadialGradient(512/2,512/2,0,512/2,512/2,512*.38);e.addColorStop(0,`rgba(255,255,255,0.20)`),e.addColorStop(.55,`rgba(255,255,255,0.05)`),e.addColorStop(1,`rgba(255,255,255,0.0)`),n.fillStyle=e,n.fillRect(0,0,512,512)}return n.save(),n.scale(512/512,512/512),n.fillStyle=`#ffffff`,n.fill(new Path2D(`M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z`)),n.restore(),new y(t)}let ke=()=>{if(!M.value)return;R=new oe,R.fog=new ie(0,.011),z=new ce(De(),window.innerWidth/window.innerHeight,.1,1e3),z.position.set(0,0,38),B=new de({antialias:!0}),B.setSize(window.innerWidth,window.innerHeight),B.setPixelRatio(Math.min(window.devicePixelRatio,2)),B.toneMapping=4,B.toneMappingExposure=.82,M.value.appendChild(B.domElement),V=new he(z,B.domElement),V.enableDamping=!0,V.dampingFactor=.04,V.autoRotate=!0,V.autoRotateSpeed=.5,V.enablePan=!1,V.minDistance=18,V.maxDistance=70;let e=Oe(!1),t=Oe(!0),n=new C({vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec4 mv = modelViewMatrix * vec4(0.0,0.0,0.0,1.0);
        mv.xy += position.xy;
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      varying vec2 vUv;
      void main() {
        float d = length(vUv - 0.5) * 2.0;
        float a = smoothstep(1.0, 0.55, d) * 0.90;
        gl_FragColor = vec4(0.0, 0.0, 0.0, a);
      }
    `,transparent:!0,depthWrite:!1,side:2}),r=new x(new ue(O*.72,64),n);r.position.z=-.3,r.renderOrder=2,R.add(r),Y=new C({uniforms:{uTime:{value:0},uGlowColor:{value:L[0].core.clone()}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec4 mv = modelViewMatrix * vec4(0.0,0.0,-0.15,1.0);
        mv.xy += position.xy;
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      uniform float uTime;
      uniform vec3 uGlowColor;
      varying vec2 vUv;
      void main() {
        float d = length(vUv - 0.5);
        float inner = smoothstep(0.38, 0.12, d) * 0.35;
        float outer = smoothstep(0.50, 0.28, d) * 0.10;
        float pulse = sin(uTime * 1.4) * 0.5 + 0.5;
        float a = (inner + outer) * (0.65 + pulse * 0.22);
        gl_FragColor = vec4(uGlowColor, a);
      }
    `,transparent:!0,blending:2,depthWrite:!1});let i=new x(new g(O*2.6,O*2.6),Y);i.position.z=-.15,i.renderOrder=3,R.add(i),J=new C({uniforms:{uTexture:{value:t},uTime:{value:0},uGlowColor:{value:L[0].core.clone()}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec4 mv = modelViewMatrix * vec4(0.0,0.0,0.0,1.0);
        mv.xy += position.xy;
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      uniform sampler2D uTexture;
      uniform float uTime;
      uniform vec3 uGlowColor;
      varying vec2 vUv;
      void main() {
        vec4 tex = texture2D(uTexture, vUv);
        if (tex.a < 0.03) discard;
        float pulse = sin(uTime * 1.7) * 0.5 + 0.5;
        vec3 col = mix(uGlowColor * 0.9, vec3(0.88,0.88,0.88), pulse * 0.28 + 0.18);
        gl_FragColor = vec4(col, tex.a * 0.90);
      }
    `,transparent:!0,blending:2,depthWrite:!1});let a=new x(new g(O,O),J);a.position.z=.1,a.renderOrder=4,R.add(a);let o=A*33,s=new Float32Array(o*3),c=new Float32Array(o);U=new v,U.setAttribute(`position`,new S(s,3)),U.setAttribute(`aAlpha`,new S(c,1));let l=[];for(let e=0;e<A;e++){let t=e*33;for(let e=0;e<j;e++)l.push(t+e,t+e+1)}U.setIndex(l),W=new C({uniforms:{uBaseColor:{value:L[0].base.clone()},uTime:{value:0}},vertexShader:`
      attribute float aAlpha;
      varying float vAlpha;
      void main() {
        vAlpha = aAlpha;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 uBaseColor;
      uniform float uTime;
      varying float vAlpha;
      void main() {
        if (vAlpha < 0.01) discard;
        vec3 col = mix(uBaseColor * 1.4, vec3(1.0, 1.0, 1.0), vAlpha * 0.80);
        col += uBaseColor * 0.35;
        gl_FragColor = vec4(col, vAlpha * 1.0);
      }
    `,transparent:!0,blending:2,depthWrite:!1});let u=new ne(U,W);for(let e=0;e<A;e++){let e=Math.acos(2*Math.random()-1),t=Math.random()*Math.PI*2;we.push(new m(Math.sin(e)*Math.cos(t),Math.sin(e)*Math.sin(t),Math.cos(e)).normalize()),Te.push(Math.random()*Math.PI*2)}G=new v;let d=new Float32Array(k*3);G.setAttribute(`position`,new S(d,3));let f=new Float32Array(k);for(let e=0;e<k;e++)f[e]=.06+Math.random()*.2;G.setAttribute(`size`,new S(f,1));for(let e=0;e<k;e++){let e=new m(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize(),t=new m(Math.random()-.5,Math.random()-.5,Math.random()-.5).cross(e).normalize();Ee.push({axis:e,perp:t,speed:.35+Math.random()*.8,phase:Math.random()*Math.PI*2,radius:D*(.91+Math.random()*.1)})}K=new C({uniforms:{uBaseColor:{value:L[0].base.clone()}},vertexShader:`
      attribute float size;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (420.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      uniform vec3 uBaseColor;
      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);
        float spot = smoothstep(0.5, 0.0, d);
        if (spot < 0.01) discard;
        vec3 col = mix(uBaseColor * 0.9, vec3(1.0), spot * 0.55);
        gl_FragColor = vec4(col, spot * 0.95);
      }
    `,transparent:!0,blending:2,depthWrite:!1});let ee=new pe(G,K),p=new g(be,be),h=new Float32Array(E);for(let e=0;e<E;e++)h[e]=Math.random()*Math.PI*2;p.setAttribute(`aPhase`,new re(h,1)),q=new C({uniforms:{uTexture:{value:e},uTime:{value:0},uBaseColor:{value:L[0].base.clone()}},vertexShader:`
      attribute float aPhase;
      uniform float uTime;
      varying vec2 vUv;
      varying float vPhase;
      varying vec3 vWorldPos;
      varying float vDepth;
      void main() {
        vUv = uv;
        vPhase = aPhase;
        vec3 iPos = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
        float scale = length(vec3(instanceMatrix[0][0], instanceMatrix[0][1], instanceMatrix[0][2]));
        iPos += normalize(iPos) * sin(uTime * 1.2 + aPhase) * 0.38;
        vWorldPos = iPos;
        vec4 camP = viewMatrix * modelMatrix * vec4(iPos, 1.0);
        vDepth = clamp(-camP.z / 38.0, 0.0, 1.0);
        vec4 mv = viewMatrix * modelMatrix * vec4(iPos, 1.0);
        mv.xy += position.xy * scale;
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      uniform sampler2D uTexture;
      uniform float uTime;
      uniform vec3 uBaseColor;
      varying vec2 vUv;
      varying float vPhase;
      varying vec3 vWorldPos;
      varying float vDepth;
      void main() {
        vec4 tex = texture2D(uTexture, vUv);
        float dist = length(vUv - 0.5);
        float aura = smoothstep(0.5, 0.10, dist) * 0.22;
        float a = tex.a + aura;
        if (a < 0.04) discard;
        float pulse = sin(uTime * 1.8 + vPhase) * 0.5 + 0.5;
        float w1 = sin(vWorldPos.y * 0.35 + vWorldPos.x * 0.20 - uTime * 3.2);
        float w2 = sin(vWorldPos.z * 0.30 - vWorldPos.y * 0.25 + uTime * 2.6);
        float hit = smoothstep(0.68, 1.0, w1) * 0.65 + smoothstep(0.72, 1.0, w2) * 0.45;
        vec3 col = mix(uBaseColor * 0.85, uBaseColor * 1.3 + vec3(0.45), pulse * 0.38);
        col += uBaseColor * hit * 1.4 + vec3(1.0) * hit * 0.35;
        float depthFade = 0.52 + 0.48 * (1.0 - vDepth);
        float bright = tex.a > 0.1 ? 1.15 : 0.55;
        gl_FragColor = vec4(col * bright * depthFade, a * (0.48 + 0.36 * pulse + hit * 0.38) * depthFade);
      }
    `,transparent:!0,blending:2,depthWrite:!1});let _=new me(p,q,E),y=new fe,b=Math.PI*(3-Math.sqrt(5));for(let e=0;e<E;e++){let t=1-e/(E-1)*2,n=Math.sqrt(1-t*t),r=b*e,i=D+(Math.random()-.5)*1.5;y.position.set(Math.cos(r)*n*i,t*i,Math.sin(r)*n*i);let a=.45+Math.random()*.72;y.scale.set(a,a,a),y.updateMatrix(),_.setMatrixAt(e,y.matrix)}[[Math.PI/2,0],[Math.PI/5,Math.PI/4],[-Math.PI/7,Math.PI/2]].forEach(([e,t])=>{let n=new le({color:L[0].base.clone(),transparent:!0,opacity:.07,blending:2,side:2,depthWrite:!1}),r=new x(new te(D*.91,D*.935,128),n);r.rotation.x=e,r.rotation.y=t,X.push(r),Ce.push(n)});let w=new Float32Array(900*3);for(let e=0;e<900*3;e++)w[e]=(Math.random()-.5)*300;let T=new v;T.setAttribute(`position`,new S(w,3)),R.add(new pe(T,new se({size:.18,color:16777215,transparent:!0,opacity:.22,blending:2,depthWrite:!1,sizeAttenuation:!0}))),H=new ae,H.add(_,u,ee,...X),R.add(H),N.value=!1,Ne()},Z=new h;function Ae(e){let t=G.attributes.position.array;Ee.forEach((n,r)=>{let i=e*n.speed+n.phase;Z.setFromAxisAngle(n.axis,i);let a=n.perp.clone().applyQuaternion(Z).multiplyScalar(n.radius);t[r*3]=a.x,t[r*3+1]=a.y,t[r*3+2]=a.z}),G.attributes.position.needsUpdate=!0}function je(e){let t=U.attributes.position.array,n=U.attributes.aAlpha.array;for(let r=0;r<A;r++){let i=we[r],a=Te[r],o=r*33,s=(e*.75+a*.55)%1.6/1.6;for(let e=0;e<=j;e++){let r=e/j,a=r*D,c=o+e;t[c*3]=i.x*a,t[c*3+1]=i.y*a,t[c*3+2]=i.z*a;let l=Math.max(0,1-Math.abs(r-s)/.16),u=r<s?Math.max(0,1-(s-r)/.62)*.55:0;n[c]=Math.min(1,l+u)}}U.attributes.position.needsUpdate=!0,U.attributes.aAlpha.needsUpdate=!0}let Q=0,Me=performance.now(),Ne=()=>{xe=requestAnimationFrame(Ne);let e=Se.getElapsedTime();Q++;let t=performance.now();t-Me>=1e3&&(I.value=Q,Q=0,Me=t);let n=L[F.value];q.uniforms.uBaseColor.value.lerp(n.base,.04),J.uniforms.uGlowColor.value.lerp(n.core,.04),Y.uniforms.uGlowColor.value.lerp(n.core,.04),W.uniforms.uBaseColor.value.lerp(n.base,.04),K.uniforms.uBaseColor.value.lerp(n.base,.04),Ce.forEach(e=>e.color.lerp(n.base,.04)),J.uniforms.uTime.value=e,Y.uniforms.uTime.value=e,q.uniforms.uTime.value=e,je(e),Ae(e),H.rotation.y=e*.09,H.rotation.z=Math.sin(e*.035)*.08,X[0].rotation.y=e*.12,X[1].rotation.y=-e*.08,V.update(),B.render(R,z)},Pe=e=>{F.value=e,P.value=L[e].name},$=()=>{z.aspect=window.innerWidth/window.innerHeight,z.fov=De(),z.updateProjectionMatrix(),B.setSize(window.innerWidth,window.innerHeight),B.setPixelRatio(Math.min(window.devicePixelRatio,2))};ee(()=>{ke(),window.addEventListener(`resize`,$)}),r(()=>{cancelAnimationFrame(xe),window.removeEventListener(`resize`,$),B&&B.dispose(),V&&V.dispose()});let Fe=()=>{window.history.length<=1?(window.close(),setTimeout(()=>f.push(`/achievements`),100)):f.back()};return(n,r)=>(i(),d(`div`,w,[r[0]||=t(`div`,{id:`scanlines`},null,-1),t(`div`,T,[t(`div`,{id:`theme-selector`,style:e({boxShadow:`0 0 0 1px rgba(0,0,0,0.5), 0 8px 28px rgba(0,0,0,0.7), 0 0 15px -3px ${L[F.value].hex}`,borderColor:`rgba(255,255,255,0.08)`})},[(i(),d(s,null,u(L,(n,r)=>t(`div`,{key:r,class:a([`theme-swatch`,{active:F.value===r}]),style:e({background:n.hex,color:n.hex}),onClick:e=>Pe(r)},null,14,ge)),64))],4),t(`div`,_e,p(P.value),1)]),N.value?(i(),d(`div`,ve,`INITIALIZING CORE`)):l(``,!0),t(`div`,ye,[t(`span`,null,`NODES — `+p(E)),t(`span`,null,`THEME — 0`+p(F.value+1)+` / 04`,1),t(`span`,null,`FPS — `+p(I.value),1)]),t(`div`,{class:`back-overlay`},[t(`button`,{class:`back-btn`,onClick:Fe},`← 返回`)]),t(`div`,{ref_key:`containerRef`,ref:M,id:`canvas-container`},null,512)]))}}),[[`__scopeId`,`data-v-353ffb02`]]);export{M as default};