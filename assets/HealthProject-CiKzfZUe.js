import{a as e,c as t,d as n,f as r,h as i,n as a,s as o,t as s,u as c}from"./index-DBUjE5BP.js";import{$t as l,Dt as u,Qt as d,Rt as f,St as p,_ as m,at as h,g,ot as _,r as v,st as y,yt as b,zt as x}from"./three.module-CSH3W071.js";import{t as S}from"./lil-gui.esm-BsdZdNnU.js";var C={class:`health-project-view`},w=`
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
    }
`,T=`
    #ifdef GL_ES
    precision highp float;
    #endif

    uniform vec2 uResolution;
    uniform float uTime;
    uniform int uMaxSteps;
    uniform int uFoldSteps;
    uniform float uKifsScale;
    uniform float uKifsOffset;
    uniform float uTextureScale;
    uniform float uBrightness;
    uniform float uSphereRadius;
    uniform float uInnerRadius;
    uniform vec3 uSphereCenter;
    uniform vec3 uBaseColor;
    uniform float uLightSpeed;
    uniform float uAutoRotationSpeed;
    uniform mat3 uInverseRotationMatrix;
    uniform float uZoom;

    varying vec2 vUv;

    mat2 rotate2D(float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat2(c, -s, s, c);
    }

    vec2 intersectSphere(vec3 rayOrigin, vec3 rayDir, vec3 center, float radius) {
        vec3 oc = rayOrigin - center;
        float b = dot(oc, rayDir);
        float c = dot(oc, oc) - radius * radius;
        float h = b * b - c;
        
        if(h < 0.0) return vec2(-1.0);
        h = sqrt(h);
        return vec2(-b - h, -b + h);
    }

    void main() {
        vec2 uvCenter = (2.0 * gl_FragCoord.xy - uResolution.xy) / uResolution.y;
        
        vec3 rayOriginWorld = vec3(0.0, 0.0, 0.0);
        vec3 rayDirectionWorld = normalize(vec3(uvCenter * uZoom, -1.0));
        
        vec3 localRayOrigin = rayOriginWorld - uSphereCenter;
        localRayOrigin = uInverseRotationMatrix * localRayOrigin;
        vec3 localRayDirection = uInverseRotationMatrix * rayDirectionWorld;
        
        vec2 hitOuter = intersectSphere(localRayOrigin, localRayDirection, vec3(0.0), uSphereRadius);
        
        if (hitOuter.x < 0.0) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
            return;
        }
        
        float tStart = max(0.0, hitOuter.x);
        float tEnd = hitOuter.y;
        
        float stepSize = (tEnd - tStart) / float(uMaxSteps);
        float currentDistance = tStart;
        
        vec4 accumulatedColor = vec4(0.0);
        
        for (int i = 0; i < 250; i++) {
            if (i >= uMaxSteps) break;
            
            vec3 localPos = localRayOrigin + localRayDirection * currentDistance;
            float distFromCenter = length(localPos);
            
            float wallMask = smoothstep(uInnerRadius, uInnerRadius + 1.0, distFromCenter) * smoothstep(uSphereRadius, uSphereRadius - 0.2, distFromCenter);
            
            if (wallMask > 0.01) {
                vec3 currentPos = localPos * uTextureScale;
                currentPos.xy *= rotate2D(uTime * 0.15 * uAutoRotationSpeed);
                currentPos.xz *= rotate2D(uTime * 0.10 * uAutoRotationSpeed);
                currentPos = abs(currentPos);
                
                float timeVal = 2.6 + float(i) * 0.356;
                vec3 reflectionAxis = normalize(tan(timeVal + vec3(2.5, 1.0, 0.0)));
                currentPos = reflect(-currentPos, reflectionAxis) - vec3(-2.6, -1.0, 0.2);
                
                float accumulatedScale = 0.1;
                if (currentPos.x < currentPos.z) currentPos = currentPos.zyx;
                
                for (int k = 0; k < 16; k++) {
                    if (k >= uFoldSteps) break;
                    currentPos *= uKifsScale;
                    accumulatedScale *= uKifsScale;
                    currentPos.y += uKifsOffset;
                    if (currentPos.y > currentPos.z) currentPos = currentPos.xzy;
                    currentPos *= uKifsScale;
                    accumulatedScale *= uKifsScale;
                    currentPos.y += uKifsOffset;
                    if (currentPos.x < currentPos.y) currentPos = currentPos.yxz;
                }
                
                float currentDensity = max(length(currentPos.xz) / accumulatedScale, 0.001);
                vec3 spatialPhase = currentPos.xyz;
                vec3 lightIntensity = exp(sin(uTime * uLightSpeed + spatialPhase)) / currentDensity;
                accumulatedColor.rgb += uBaseColor * lightIntensity * stepSize * uBrightness * wallMask;
            }
            currentDistance += stepSize;
        }
        
        gl_FragColor.rgb = tanh(accumulatedColor.rgb);
        gl_FragColor.a = 1.0;
        
        vec3 localHitPoint = localRayOrigin + localRayDirection * hitOuter.x;
        vec3 surfaceNormalLocal = normalize(localHitPoint);
        float edgeHighlight = 0.7 - max(dot(-localRayDirection, surfaceNormalLocal), 0.5);
        gl_FragColor.rgb += vec3(0.05, 0.1, 0.3) * pow(edgeHighlight, 4.0);
    }
`,E=s(t({__name:`HealthProject`,setup(t){let s=a(),E=i(null),D,O,k,A,j,M=()=>{if(!E.value)return;D=new f,O=new b(-1,1,1,-1,0,1),k=new v({canvas:E.value,antialias:!1,powerPreference:`high-performance`});let e={maxSteps:148,foldSteps:6,kifsScale:1.26,kifsOffset:8.9,textureScale:1.45,brightness:1.423,coreColor:`#7780ff`,colorBoost:3,lightSpeed:5.5,sphereRadius:15,innerRadius:14,sphereCenterZ:-25,autoRotationSpeed:1,dpr:window.devicePixelRatio||1},t={uResolution:{value:new d(window.innerWidth,window.innerHeight)},uTime:{value:0},uMaxSteps:{value:e.maxSteps},uFoldSteps:{value:e.foldSteps},uKifsScale:{value:e.kifsScale},uKifsOffset:{value:e.kifsOffset},uTextureScale:{value:e.textureScale},uBrightness:{value:e.brightness},uSphereRadius:{value:e.sphereRadius},uInnerRadius:{value:e.innerRadius},uSphereCenter:{value:new l(0,0,e.sphereCenterZ)},uBaseColor:{value:new l},uLightSpeed:{value:e.lightSpeed},uAutoRotationSpeed:{value:e.autoRotationSpeed},uInverseRotationMatrix:{value:new h},uZoom:{value:1}},n=()=>{let n=new m(e.coreColor);t.uBaseColor.value.set(n.r*e.colorBoost,n.g*e.colorBoost,n.b*e.colorBoost)};n();let r=new y(new p(2,2),new x({vertexShader:w,fragmentShader:T,uniforms:t,depthWrite:!1,depthTest:!1}));D.add(r);let i=!1,a={x:0,y:0},o=0,s=0,c=1,C=1,M=new u,N=new u,P=new l(1,0,0),F=new l(0,1,0),I=e=>{e.target.closest(`.lil-gui`)||(i=!0,a={x:e.clientX,y:e.clientY},o=0,s=0)},L=e=>{if(!i)return;let t=e.clientX-a.x,n=e.clientY-a.y;o=t*.0035,s=n*.0035;let r=new u().setFromAxisAngle(F,o),c=new u().setFromAxisAngle(P,s);M.premultiply(c).premultiply(r),M.normalize(),a={x:e.clientX,y:e.clientY}},R=()=>{i=!1},z=e=>{e.target.closest(`.lil-gui`)||(C+=e.deltaY*.001,C=Math.max(.3,Math.min(4,C)))};window.addEventListener(`pointerdown`,I),window.addEventListener(`pointermove`,L),window.addEventListener(`pointerup`,R),window.addEventListener(`wheel`,z,{passive:!0});let B=new _,V=new h,H=()=>{if(!i){o*=.95,s*=.95;let e=new u().setFromAxisAngle(F,o),t=new u().setFromAxisAngle(P,s);M.premultiply(t).premultiply(e),M.normalize()}N.slerp(M,.1),c+=(C-c)*.15,B.makeRotationFromQuaternion(N),B.invert(),V.setFromMatrix4(B),t.uInverseRotationMatrix.value.copy(V),t.uZoom.value=c};j=new S({title:`控制面板`}),j.close();let U=j.addFolder(`几何形态`);U.add(e,`foldSteps`,1,15,1).name(`迭代步数`).onChange(e=>t.uFoldSteps.value=e),U.add(e,`kifsScale`,1,1.8,.01).name(`KIFS 缩放`).onChange(e=>t.uKifsScale.value=e),U.add(e,`kifsOffset`,1,15,.1).name(`KIFS 偏移`).onChange(e=>t.uKifsOffset.value=e),U.add(e,`textureScale`,.1,4,.05).name(`纹理缩放`).onChange(e=>t.uTextureScale.value=e);let W=j.addFolder(`光影效果`);W.add(e,`brightness`,.1,4,.01).name(`亮度`).onChange(e=>t.uBrightness.value=e),W.addColor(e,`coreColor`).name(`基础色调`).onChange(n),W.add(e,`colorBoost`,.5,6,.1).name(`光晕强度`).onChange(n),W.add(e,`lightSpeed`,0,15,.1).name(`脉冲速度`).onChange(e=>t.uLightSpeed.value=e);let G=j.addFolder(`外层球体`);G.add(e,`sphereRadius`,5,25,.1).name(`外径`).onChange(n=>{t.uSphereRadius.value=n,e.innerRadius>=n&&(e.innerRadius=n-1,t.uInnerRadius.value=e.innerRadius,G.controllers.find(e=>e.property===`innerRadius`)?.updateDisplay())}),G.add(e,`innerRadius`,4,24,.1).name(`内径`).onChange(n=>{n>=e.sphereRadius?(e.innerRadius=e.sphereRadius-1,t.uInnerRadius.value=e.innerRadius,G.controllers.find(e=>e.property===`innerRadius`)?.updateDisplay()):t.uInnerRadius.value=n}),G.add(e,`maxSteps`,20,250,1).name(`光线步进精度`).onChange(e=>t.uMaxSteps.value=e);let K=j.addFolder(`系统设置`);K.add(e,`autoRotationSpeed`,0,3,.05).name(`自动旋转`).onChange(e=>t.uAutoRotationSpeed.value=e),K.add(e,`dpr`,.25,2,.25).name(`屏幕倍率`).onChange(e=>k.setPixelRatio(e));let q=()=>{let e=window.innerWidth,n=window.innerHeight;k.setSize(e,n),t.uResolution.value.set(e,n)};window.addEventListener(`resize`,q),q(),k.setPixelRatio(e.dpr);let J=new g,Y=()=>{A=requestAnimationFrame(Y),t.uTime.value=J.getElapsedTime(),H(),k.render(D,O)};return Y(),()=>{window.removeEventListener(`pointerdown`,I),window.removeEventListener(`pointermove`,L),window.removeEventListener(`pointerup`,R),window.removeEventListener(`wheel`,z),window.removeEventListener(`resize`,q)}},N;c(()=>{N=M()||(()=>{})}),n(()=>{N&&N(),cancelAnimationFrame(A),j&&j.destroy(),k&&k.dispose()});let P=()=>{window.history.length<=1?(window.close(),setTimeout(()=>{s.push(`/achievements`)},100)):s.back()};return(t,n)=>(r(),o(`div`,C,[e(`canvas`,{ref_key:`canvasRef`,ref:E,class:`webgl-canvas`},null,512),e(`div`,{class:`ui-overlay`},[e(`button`,{class:`back-btn`,onClick:P},`← 返回`),n[0]||=e(`div`,{class:`project-info`},[e(`h1`,null,`健康生活社区 App`),e(`p`,null,`Fractal Volumetric Visualization Engine`),e(`div`,{class:`tech-tags`},[e(`span`,null,`Three.js`),e(`span`,null,`Raymarching`),e(`span`,null,`KIFS Fractal`)])],-1)])]))}}),[[`__scopeId`,`data-v-be4973d3`]]);export{E as default};