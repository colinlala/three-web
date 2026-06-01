import{a as e,c as t,d as n,f as r,h as i,n as a,s as o,t as s,u as c}from"./index-DBUjE5BP.js";import{$t as l,F as u,J as d,P as f,Qt as p,Rt as m,Zt as h,_ as g,bt as _,ct as v,d as y,f as b,g as x,j as ee,jt as S,k as C,n as w,nn as T,r as E,v as D,wt as te,zt as O}from"./three.module-CSH3W071.js";import{t as k}from"./lil-gui.esm-BsdZdNnU.js";import{a as A,i as j,n as M,o as N,t as P}from"./RenderPass-C9Qfmz7C.js";var F={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new g(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},I=class e extends A{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new p(256,256):new p(e.x,e.y),this.clearColor=new g(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new T(i,a,{type:u}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new T(i,a,{type:u});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new T(i,a,{type:u});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=F;this.highPassUniforms=h.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new O({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new p(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new l(1,1,1),new l(1,1,1),new l(1,1,1),new l(1,1,1),new l(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=h.clone(N.uniforms),this.blendMaterial=new O({uniforms:this.copyUniforms,vertexShader:N.vertexShader,fragmentShader:N.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new g,this._oldClearAlpha=1,this._basic=new v,this._fsQuad=new j(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new p(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);return new O({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new p(.5,.5)},direction:{value:new p(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new O({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};I.BlurDirectionX=new p(1,0),I.BlurDirectionY=new p(0,1);var L={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},R=class extends A{constructor(){super(),this.isOutputPass=!0,this.uniforms=h.clone(L.uniforms),this.material=new S({name:L.name,uniforms:this.uniforms,vertexShader:L.vertexShader,fragmentShader:L.fragmentShader}),this._fsQuad=new j(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},D.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},z={class:`tunnel-view`},B=s(t({__name:`TunnelProject`,setup(t){let s=a(),u=i(null),v={flightSpeed:8.7,tunnelRadius:20.9,tunnelLength:50,chunkCount:6,strandsPerChunk:38,displacement:.4802,radialNoise:1.5,twistAmount:0,detailLevel:6,branchProbability:.25,numberSize:5,numbersDensity:.5439,baseColor:`#5099dc`,flashColor:`#88ccff`,flashIntensity:4,minFlashInterval:.6,maxFlashInterval:2,flashDuration:.36955,doubleFlashProbability:.4,bloomStrength:.97,bloomRadius:.6,bloomThreshold:.3},S,T,D,A,j,N,F,L=[],B=[],V=[],H=0,U=0,W=new x,G=new g(v.flashColor).clone().multiplyScalar(v.flashIntensity),K=null,q=()=>{if(K)return K;let e=document.createElement(`canvas`);e.width=512,e.height=64;let t=e.getContext(`2d`);t.clearRect(0,0,e.width,e.height),t.fillStyle=`#ffffff`,t.font=`bold 48px monospace`,t.textAlign=`center`,t.textBaseline=`middle`;for(let e=0;e<10;e++)t.fillText(e.toString(),e*51.2+25.6,32);return K=new b(e),K},J=e=>new O({uniforms:h.merge([w.fog,{digitMap:{value:q()},uColor:{value:new g(e)},uOpacity:{value:1},uSize:{value:v.numberSize}}]),fog:!0,vertexShader:`
      attribute float digitIndex;
      attribute float aProgress;
      varying float vDigitIndex;
      varying float vProgress;
      uniform float uSize;
      #include <fog_pars_vertex>
      void main() {
        vDigitIndex = digitIndex;
        vProgress = aProgress;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float taper = smoothstep(0.0, 0.05, aProgress) * smoothstep(1.0, 0.95, aProgress);
        gl_PointSize = uSize * (100.0 / -mvPosition.z) * max(taper, 0.01);
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }
    `,fragmentShader:`
      uniform sampler2D digitMap;
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vDigitIndex;
      varying float vProgress;
      #include <fog_pars_fragment>
      void main() {
        vec2 uv = vec2((gl_PointCoord.x + vDigitIndex) / 10.0, 1.0 - gl_PointCoord.y);
        vec4 texColor = texture2D(digitMap, uv);
        if (texColor.a < 0.1) discard;
        float taper = smoothstep(0.0, 0.05, vProgress) * smoothstep(1.0, 0.95, vProgress);
        gl_FragColor = vec4(uColor, uOpacity * texColor.a * taper);
        #include <fog_fragment>
      }
    `,transparent:!0,depthWrite:!1,blending:1}),Y=e=>new O({uniforms:h.merge([w.fog,{uColor:{value:e.clone()},uOpacity:{value:0}}]),fog:!0,vertexShader:`
      attribute float aProgress;
      varying float vProgress;
      #include <fog_pars_vertex>
      void main() {
        vProgress = aProgress;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }
    `,fragmentShader:`
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vProgress;
      #include <fog_pars_fragment>
      void main() {
        float taper = smoothstep(0.0, 0.05, vProgress) * smoothstep(1.0, 0.95, vProgress);
        gl_FragColor = vec4(uColor, uOpacity * taper);
        #include <fog_fragment>
      }
    `,transparent:!0,depthWrite:!1,blending:2}),X=e=>{let t=Math.random()*Math.PI*2,n=t+(Math.random()-.5)*e.twistAmount,r=[{start:new l(Math.cos(t)*e.tunnelRadius,Math.sin(t)*e.tunnelRadius,0),end:new l(Math.cos(n)*e.tunnelRadius,Math.sin(n)*e.tunnelRadius,-e.tunnelLength),generation:0,tStart:0,tEnd:1}];for(let t=0;t<e.detailLevel;t++){let t=[];for(let n of r){let r=n.start.clone().lerp(n.end,.5),i=n.end.clone().sub(n.start).normalize(),a=n.start.distanceTo(n.end),o=n.tStart+(n.tEnd-n.tStart)*.5,s=new l(Math.random()-.5,Math.random()-.5,Math.random()-.5).cross(i).normalize();r.add(s.multiplyScalar((Math.random()-.5)*a*e.displacement));let c=(e.tunnelRadius+(Math.random()-.5)*e.radialNoise)/Math.sqrt(r.x*r.x+r.y*r.y);if(r.x*=c,r.y*=c,t.push({start:n.start,end:r,generation:n.generation+1,tStart:n.tStart,tEnd:o}),t.push({start:r,end:n.end,generation:n.generation+1,tStart:o,tEnd:n.tEnd}),Math.random()<e.branchProbability&&n.generation<e.detailLevel-2){let s=i.clone().applyAxisAngle(new l(0,0,1),(Math.random()-.5)*1.5).applyAxisAngle(i,Math.random()*Math.PI*2),c=r.clone().add(s.multiplyScalar(a*(.6+Math.random()*.4))),u=(e.tunnelRadius+(Math.random()-.5)*e.radialNoise)/Math.sqrt(c.x*c.x+c.y*c.y);c.x*=u,c.y*=u,t.push({start:r,end:c,generation:n.generation+1,tStart:o,tEnd:1})}}r=t}let i=[],a=[];for(let e of r)i.push(e.start.x,e.start.y,e.start.z,e.end.x,e.end.y,e.end.z),a.push(e.tStart,e.tEnd);let o=new y;return o.setAttribute(`position`,new C(i,3)),o.setAttribute(`aProgress`,new C(a,1)),o},Z=e=>{let t=e.attributes.position.array,n=e.attributes.aProgress.array,r=[],i=[],a=[];for(let e=0;e<t.length;e+=6){let o=new l(t[e],t[e+1],t[e+2]),s=new l(t[e+3],t[e+4],t[e+5]),c=n[e/3],u=n[e/3+1],d=Math.max(1,Math.floor(o.distanceTo(s)*v.numbersDensity));for(let e=0;e<d;e++){let t=e/d,n=o.clone().lerp(s,t);r.push(n.x,n.y,n.z),i.push(Math.floor(Math.random()*10)),a.push(c+(u-c)*t)}}let o=new y;return o.setAttribute(`position`,new C(r,3)),o.setAttribute(`digitIndex`,new C(i,1)),o.setAttribute(`aProgress`,new C(a,1)),o},Q=e=>{let t=new f;t.position.z=e;for(let e=0;e<v.strandsPerChunk;e++){let e=X(v),n=new d(e,Y(G)),r=new te(Z(e),J(v.baseColor)),i=new f;i.add(n),i.add(r),i.userData={flashValue:0,lineMesh:n,pointMesh:r},t.add(i),B.push(i)}S.add(t),L.push({group:t})},ne=e=>{e.group.children.forEach(e=>{let{lineMesh:t,pointMesh:n}=e.userData;t.geometry.dispose(),n.geometry.dispose();let r=X(v);t.geometry=r,n.geometry=Z(r),e.userData.flashValue=0,t.material.uniforms.uOpacity.value=0,n.material.uniforms.uOpacity.value=1})},re=()=>{if(B.length===0)return;let e=B[Math.floor(Math.random()*B.length)];e.userData.flashValue=1,Math.random()<v.doubleFlashProbability&&V.push({triggerTime:W.getElapsedTime()+v.flashDuration*.45,strand:e}),U=v.minFlashInterval+Math.random()*(v.maxFlashInterval-v.minFlashInterval),H=0},ie=()=>{if(!u.value)return;S=new m,S.background=new g(0),S.fog=new ee(0,v.tunnelLength*2,v.tunnelLength*(v.chunkCount-1)),T=new _(70,window.innerWidth/window.innerHeight,.1,1e3),D=new E({antialias:!1}),D.setSize(window.innerWidth,window.innerHeight),D.setPixelRatio(Math.min(window.devicePixelRatio,2)),D.toneMapping=2,u.value.appendChild(D.domElement),A=new M(D),A.addPass(new P(S,T)),j=new I(new p(window.innerWidth,window.innerHeight),v.bloomStrength,v.bloomRadius,v.bloomThreshold),A.addPass(j),A.addPass(new R);for(let e=0;e<v.chunkCount;e++)Q(-e*v.tunnelLength);U=v.minFlashInterval+Math.random()*(v.maxFlashInterval-v.minFlashInterval),F=new k({title:`Tunnel Settings`}),F.close(),F.addFolder(`Movement`).add(v,`flightSpeed`,0,150),F.addFolder(`Bloom`).add(v,`bloomStrength`,0,5).onChange(e=>j.strength=e);let e=()=>{N=requestAnimationFrame(e);let t=W.getDelta(),n=W.getElapsedTime();T.position.z-=v.flightSpeed*t,T.position.x=Math.sin(n*.5)*2,T.position.y=Math.cos(n*.4)*2,L.forEach(e=>{e.group.position.z>T.position.z+v.tunnelLength&&(e.group.position.z-=v.tunnelLength*v.chunkCount,ne(e))}),H+=t,H>=U&&re();for(let e=V.length-1;e>=0;e--)n>=V[e].triggerTime&&(V[e].strand.userData.flashValue=1,V.splice(e,1));B.forEach(e=>{e.userData.flashValue>0&&(e.userData.flashValue-=t/v.flashDuration,e.userData.lineMesh.material.uniforms.uOpacity.value=Math.max(0,e.userData.flashValue),e.userData.pointMesh.material.uniforms.uOpacity.value=1-Math.max(0,e.userData.flashValue)*.5)}),A.render()};e();let t=()=>{T.aspect=window.innerWidth/window.innerHeight,T.updateProjectionMatrix(),D.setSize(window.innerWidth,window.innerHeight),A.setSize(window.innerWidth,window.innerHeight)};return window.addEventListener(`resize`,t),()=>window.removeEventListener(`resize`,t)},$;c(()=>$=ie()||(()=>{})),n(()=>{$&&$(),cancelAnimationFrame(N),F&&F.destroy(),D&&D.dispose(),K&&K.dispose()});let ae=()=>{window.history.length<=1?(window.close(),setTimeout(()=>s.push(`/achievements`),100)):s.back()};return(t,n)=>(r(),o(`div`,z,[e(`div`,{ref_key:`containerRef`,ref:u,class:`canvas-container`},null,512),e(`div`,{class:`ui-overlay`},[e(`button`,{class:`back-btn`,onClick:ae},`← 返回`),n[0]||=e(`div`,{class:`project-info`},[e(`h1`,null,`赛博朋克闪电隧道`),e(`p`,null,`Cybernetic Data Stream & Lightning Visualization`),e(`div`,{class:`tech-tags`},[e(`span`,null,`Three.js`),e(`span`,null,`Post-processing`),e(`span`,null,`VFX`)])],-1)])]))}}),[[`__scopeId`,`data-v-5636981e`]]);export{B as default};