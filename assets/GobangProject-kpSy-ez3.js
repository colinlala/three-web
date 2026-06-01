import{a as e,c as t,d as n,f as r,g as i,h as a,n as o,o as s,s as c,t as l,u,v as d}from"./index-D9wyV7gN.js";import{D as f,Nt as p,Qt as ee,Rt as te,T as ne,_ as m,bt as h,ft as g,i as _,l as v,r as y,st as b,vt as x,x as S,z as C,zt as w}from"./three.module-CSH3W071.js";var re={class:`gobang-view`},ie={class:`ui-overlay`},ae={key:0,class:`modal choosing`},oe={class:`btn-group`},T={key:1,class:`modal result`},E=15,D=500,O=500,k=10,A=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,se=`
  varying vec2 vUv;
  uniform float boardSize;
  
  void main() {
    vec2 grid = vUv * (boardSize - 1.0);
    vec2 line = abs(fract(grid + 0.5) - 0.5) / fwidth(grid);
    float gridLine = 1.0 - min(line.x, line.y);
    gridLine = smoothstep(0.0, 1.0, gridLine);
    
    // 棋盘底色
    vec3 woodColor = vec3(0.82, 0.66, 0.42);
    vec3 lineColor = vec3(0.1, 0.1, 0.1);
    
    // 绘制定位点 (星位)
    float dots = 0.0;
    vec2 points[5];
    points[0] = vec2(3.0, 3.0);
    points[1] = vec2(11.0, 3.0);
    points[2] = vec2(7.0, 7.0);
    points[3] = vec2(3.0, 11.0);
    points[4] = vec2(11.0, 11.0);
    
    for(int i=0; i<5; i++) {
      float d = distance(grid, points[i]);
      dots += smoothstep(0.15, 0.1, d);
    }
    
    vec3 color = mix(woodColor, lineColor, gridLine * 0.5);
    color = mix(color, lineColor, dots);
    
    // 边缘阴影
    float edge = smoothstep(0.5, 0.48, abs(vUv.x - 0.5)) * smoothstep(0.5, 0.48, abs(vUv.y - 0.5));
    color *= (0.9 + 0.1 * edge);
    
    gl_FragColor = vec4(color, 1.0);
  }
`,j=l(t({__name:`GobangProject`,setup(t){let l=o(),j=a(null),M=a(`choosing`),N=a(null),P=a(`black`),F=a(`black`),I=k/(E-1),L,R,z,B,V,H,U,W,G,K=Array(E).fill(null).map(()=>Array(E).fill(null)),q=0,J=0,ce=()=>{if(!j.value)return;L=new te,L.background=new m(1710618),R=new h(45,window.innerWidth/window.innerHeight,.1,1e3),R.position.set(0,-12,12),R.lookAt(0,0,0),z=new y({antialias:!0}),z.setSize(window.innerWidth,window.innerHeight),z.setPixelRatio(window.devicePixelRatio),j.value.appendChild(z.domElement),B=new p,V=new ee;let e=new _(16777215,.6);L.add(e);let t=new ne(16777215,.8);t.position.set(5,5,10),L.add(t),W=new b(new v(11,11,.2),new w({uniforms:{boardSize:{value:E}},vertexShader:A,fragmentShader:se})),L.add(W);let n=new S(.32,.32,.15,32);n.rotateX(Math.PI/2),H=new C(n,new g({color:1118481,roughness:.2,metalness:.1}),D),H.instanceMatrix.setUsage(f),H.frustumCulled=!1,L.add(H),U=new C(n,new g({color:16777212,roughness:.2,metalness:.1}),O),U.instanceMatrix.setUsage(f),U.frustumCulled=!1,L.add(U);let r=new x;r.position.set(0,0,-100),r.updateMatrix();for(let e=0;e<D;e++)H.setMatrixAt(e,r.matrix);for(let e=0;e<O;e++)U.setMatrixAt(e,r.matrix);H.instanceMatrix.needsUpdate=!0,U.instanceMatrix.needsUpdate=!0,Y()},Y=()=>{G=requestAnimationFrame(Y),z.render(L,R)},X=e=>{P.value=e,M.value=`playing`,e===`white`&&setTimeout(Q,500)},Z=(e,t,n)=>{if(K[e][t])return!1;K[e][t]=n;let r=(t-(E-1)/2)*I,i=((E-1)/2-e)*I,a=new x;return a.position.set(r,i,.175),a.updateMatrix(),n===`black`?(H.setMatrixAt(q++,a.matrix),H.instanceMatrix.needsUpdate=!0,H.computeBoundingSphere()):(U.setMatrixAt(J++,a.matrix),U.instanceMatrix.needsUpdate=!0,U.computeBoundingSphere()),le(e,t,n)?(M.value=`ended`,N.value=n===`black`?`黑方`:`白方`):q+J>=E*E?(M.value=`ended`,N.value=`平局`):(F.value=F.value===`black`?`white`:`black`,F.value!==P.value&&setTimeout(Q,500)),!0},Q=()=>{if(M.value!==`playing`)return;let e=[];for(let t=0;t<E;t++)for(let n=0;n<E;n++)K[t][n]||e.push({r:t,c:n});if(e.length>0){let t=e[Math.floor(Math.random()*e.length)];Z(t.r,t.c,F.value)}},le=(e,t,n)=>{for(let[r,i]of[[1,0],[0,1],[1,1],[1,-1]]){let a=1;for(let o=1;o<5;o++){let s=e+r*o,c=t+i*o;if(s>=0&&s<E&&c>=0&&c<E&&K[s][c]===n)a++;else break}for(let o=1;o<5;o++){let s=e-r*o,c=t-i*o;if(s>=0&&s<E&&c>=0&&c<E&&K[s][c]===n)a++;else break}if(a>=5)return!0}return!1},$=e=>{if(M.value!==`playing`||F.value!==P.value)return;let t=z.domElement.getBoundingClientRect();V.x=(e.clientX-t.left)/t.width*2-1,V.y=-((e.clientY-t.top)/t.height)*2+1,B.setFromCamera(V,R);let n=B.intersectObject(W);if(n.length>0){let e=n[0].point,t=Math.round(e.x/I+(E-1)/2),r=Math.round((E-1)/2-e.y/I);r>=0&&r<E&&t>=0&&t<E&&(console.log(`Click at row: ${r}, col: ${t}`),Z(r,t,P.value))}},ue=()=>{q=0,J=0,F.value=`black`,N.value=null,M.value=`choosing`;for(let e=0;e<E;e++)for(let t=0;t<E;t++)K[e][t]=null;let e=new x;e.position.set(0,0,-100),e.updateMatrix();for(let t=0;t<D;t++)H.setMatrixAt(t,e.matrix);for(let t=0;t<O;t++)U.setMatrixAt(t,e.matrix);H.instanceMatrix.needsUpdate=!0,U.instanceMatrix.needsUpdate=!0},de=()=>{window.history.length<=1?(window.close(),setTimeout(()=>l.push(`/achievements`),100)):l.back()};return u(()=>{ce(),j.value&&z&&z.domElement.addEventListener(`mousedown`,$)}),n(()=>{cancelAnimationFrame(G),z&&(z.domElement.removeEventListener(`mousedown`,$),z.dispose())}),(t,n)=>(r(),c(`div`,re,[e(`div`,{ref_key:`containerRef`,ref:j,class:`canvas-container`},null,512),e(`div`,ie,[e(`button`,{class:`back-btn`,onClick:de},`← 返回`),M.value===`choosing`?(r(),c(`div`,ae,[n[2]||=e(`h2`,null,`选择你的阵营`,-1),e(`div`,oe,[e(`button`,{onClick:n[0]||=e=>X(`black`),class:`choice-btn black`},`执黑 (先行)`),e(`button`,{onClick:n[1]||=e=>X(`white`),class:`choice-btn white`},`执白 (后行)`)])])):s(``,!0),M.value===`ended`?(r(),c(`div`,T,[e(`h2`,null,d(N.value===`平局`?`握手言和`:N.value+` 获胜！`),1),e(`button`,{onClick:ue,class:`restart-btn`},`重新开始`)])):s(``,!0),M.value===`playing`?(r(),c(`div`,{key:2,class:i([`turn-indicator`,F.value])},d(F.value===P.value?`你的回合`:`对方正在落子...`),3)):s(``,!0)])]))}}),[[`__scopeId`,`data-v-80d25a17`]]);export{j as default};