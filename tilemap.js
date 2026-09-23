/* Tile map runtime: chunked ground, y-sorted object sprites, 16px walk grid,
   A* movement, darkness and minimap. Map data is built by tools/build_maps.py
   from the supplied RPG Maker VX Ace style tilesets in assets/tiles. */
(()=>{
 const MAPS=window.ARPIA_MAPS||{};
 const CELL=16;
 const pictures=new Map();
 function picture(src){let im=pictures.get(src);if(!im){im=new Image();im.src=src;pictures.set(src,im);}return im;}
 const sheetSrc=name=>name==='objects'?'assets/tiles/objects.png':name==='doors'?'assets/tiles/doors.png':`assets/tiles/${name}.png`;
 const cache=new Map();
 function prep(id){
  if(cache.has(id))return cache.get(id);
  const d=MAPS[id];if(!d)return null;
  const rows=d.rows.length,grid=new Uint8Array(d.cols*rows);
  d.rows.forEach((runs,y)=>{for(let j=0;j<runs.length;j+=2)grid.fill(1,y*d.cols+runs[j],y*d.cols+runs[j+1]+1);});
  const bucket=new Map(),B=512;
  for(const o of d.objects){const k=Math.floor(o[7]/B)*4096+Math.floor((o[5]+o[3]/2)/B);if(!bucket.has(k))bucket.set(k,[]);bucket.get(k).push(o);}
  const info={d,grid,rows,bucket,B,cell:d.cell||CELL};cache.set(id,info);return info;
 }
 function data(sc){return MAPS[sc.tilemap];}
 // picture scenes carry a walk mask (sc.walkmask, 8px cells) instead of a full tile map
 const gid=sc=>sc.tilemap||sc.walkmask;
 function free(sc,x,y){const m=prep(gid(sc));if(!m)return true;const cx=Math.floor(x/m.cell),cy=Math.floor(y/m.cell);return cx>=0&&cy>=0&&cx<m.d.cols&&cy<m.rows&&m.grid[cy*m.d.cols+cx]===1;}
 // feet occupy a small box; test both sides so the hero cannot clip into trunks and walls
 function standable(sc,x,y){return free(sc,x-5,y-3)&&free(sc,x+5,y-3)&&free(sc,x-5,y+2)&&free(sc,x+5,y+2);}
 function line(sc,a,b){const n=Math.ceil(Math.hypot(b.x-a.x,b.y-a.y)/5);for(let i=0;i<=n;i++){const t=i/(n||1);if(!standable(sc,a.x+(b.x-a.x)*t,a.y+(b.y-a.y)*t))return false;}return true;}
 function nearest(sc,p,limit=60){
  const m=prep(gid(sc));if(!m)return{x:p.x,y:p.y};const CELL=m.cell;
  if(standable(sc,p.x,p.y))return{x:p.x,y:p.y};
  const cx=Math.floor(p.x/CELL),cy=Math.floor(p.y/CELL);
  for(let r=1;r<limit;r++){let best=null,bd=Infinity;for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){if(Math.max(Math.abs(dx),Math.abs(dy))!==r)continue;const q={x:(cx+dx)*CELL+CELL/2,y:(cy+dy)*CELL+CELL/2};if(standable(sc,q.x,q.y)){const dd=(q.x-p.x)**2+(q.y-p.y)**2;if(dd<bd){bd=dd;best=q;}}}if(best)return best;}
  return null;
 }
 class Heap{constructor(){this.a=[];}push(n){const a=this.a;let i=a.length;a.push(n);while(i){const p=(i-1)>>1;if(a[p][1]<=n[1])break;a[i]=a[p];i=p;}a[i]=n;}pop(){const a=this.a,top=a[0],n=a.pop();if(a.length){let i=0;for(;;){let c=i*2+1;if(c>=a.length)break;if(c+1<a.length&&a[c+1][1]<a[c][1])c++;if(a[c][1]>=n[1])break;a[i]=a[c];i=c;}a[i]=n;}return top;}get size(){return this.a.length;}}
 function plan(sc,from,to){
  const m=prep(gid(sc));if(!m)return[{x:to.x,y:to.y}];const CELL=m.cell;
  const start=nearest(sc,from),goal=nearest(sc,to);if(!start||!goal)return[];
  if(line(sc,start,goal))return[goal];
  const cols=m.d.cols,rows=m.rows,id=p=>Math.floor(p.y/CELL)*cols+Math.floor(p.x/CELL),pt=i=>({x:(i%cols)*CELL+CELL/2,y:Math.floor(i/cols)*CELL+CELL/2});
  const a=id(start),z=id(goal),size=cols*rows;
  // bounded search window keeps huge maps responsive
  const ax=a%cols,ay=Math.floor(a/cols),zx=z%cols,zy=Math.floor(z/cols),pad=80;
  const x0=Math.max(0,Math.min(ax,zx)-pad),x1=Math.min(cols-1,Math.max(ax,zx)+pad),y0=Math.max(0,Math.min(ay,zy)-pad),y1=Math.min(rows-1,Math.max(ay,zy)+pad);
  const g=new Map([[a,0]]),prev=new Map,closed=new Set,open=new Heap;open.push([a,0]);let found=false,steps=0;
  const ok=i=>{const x=i%cols,y=Math.floor(i/cols);if(x<x0||x>x1||y<y0||y>y1)return false;const q=pt(i);return standable(sc,q.x,q.y);};
  while(open.size&&steps++<120000){const[u]=open.pop();if(closed.has(u))continue;if(u===z){found=true;break;}closed.add(u);const ux=u%cols,uy=Math.floor(u/cols);
   for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]){const nx=ux+dx,ny=uy+dy;if(nx<0||ny<0||nx>=cols||ny>=rows)continue;const v=ny*cols+nx;if(closed.has(v)||!ok(v))continue;if(dx&&dy&&(!ok(uy*cols+nx)||!ok(ny*cols+ux)))continue;const ng=g.get(u)+(dx&&dy?1.4142:1);if(ng<(g.get(v)??Infinity)){g.set(v,ng);prev.set(v,u);open.push([v,ng+Math.hypot(nx-zx,ny-zy)]);}}}
  if(!found)return[];
  const cells=[];for(let u=z;u!==undefined&&u!==a;u=prev.get(u))cells.push(pt(u));cells.reverse();cells[cells.length-1]=goal;
  const out=[];let pos=start,i=0;while(i<cells.length){let j=i;while(j+1<cells.length&&j<i+60&&line(sc,pos,cells[j+1]))j++;pos=cells[j];out.push(pos);i=j+1;}
  return out;
 }
 function draw(ctx,sc,camera,zoom){
  const m=prep(sc.tilemap);if(!m)return;const d=m.d,hw=560/zoom,hh=290/zoom,t=performance.now()/1000;
  ctx.fillStyle=d.bg||'#0b0f14';ctx.fillRect(camera.x-hw-40,camera.y-hh-40,hw*2+80,hh*2+80);
  const frame=d.frames>1?Math.floor(t*2.2)%d.frames:0,cs=d.chunk,anim=m.anim||(m.anim=new Set(d.anim||[]));
  ctx.imageSmoothingEnabled=false;
  for(let cy=Math.max(0,Math.floor((camera.y-hh)/cs));cy<=Math.min(d.cy-1,Math.floor((camera.y+hh)/cs));cy++)
   for(let cx=Math.max(0,Math.floor((camera.x-hw)/cs));cx<=Math.min(d.cx-1,Math.floor((camera.x+hw)/cs));cx++){
    let im=picture(`assets/maps/${d.id}/${cx}-${cy}${frame&&anim.has(cx+'-'+cy)?'_'+frame:''}.webp`);
    if(!(im.complete&&im.naturalWidth))im=picture(`assets/maps/${d.id}/${cx}-${cy}.webp`);
    if(im.complete&&im.naturalWidth)ctx.drawImage(im,cx*cs,cy*cs);
   }
  for(const[sx,sy]of d.safe||[]){if(Math.abs(sx-camera.x)>hw+80||Math.abs(sy-camera.y)>hh+80)continue;ctx.save();ctx.translate(sx,sy+26);ctx.scale(1,.42);ctx.globalAlpha=.8;ctx.strokeStyle='#bfe8ff';ctx.shadowColor='#8fd4ff';ctx.shadowBlur=10;ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,44,0,7);ctx.stroke();ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,36,0,7);ctx.stroke();ctx.rotate(t*.25);for(const o of[0,Math.PI/3]){ctx.beginPath();for(let i=0;i<3;i++){const q=o+i*2*Math.PI/3;ctx[i?'lineTo':'moveTo'](Math.cos(q)*36,Math.sin(q)*36);}ctx.closePath();ctx.stroke();}ctx.restore();}
  if(frame===0&&d.frames>1)for(const k of anim){const[cx,cy]=k.split('-').map(Number);if(Math.abs(cx*cs+cs/2-camera.x)<hw+cs&&Math.abs(cy*cs+cs/2-camera.y)<hh+cs)for(let f=1;f<d.frames;f++)picture(`assets/maps/${d.id}/${cx}-${cy}_${f}.webp`);}
 }
 function visible(sc,camera,zoom){
  const m=prep(sc.tilemap);if(!m)return[];const hw=560/zoom+260,hh=300/zoom+300,out=[];
  const bx0=Math.floor((camera.x-hw)/m.B),bx1=Math.floor((camera.x+hw)/m.B),by0=Math.floor((camera.y-hh)/m.B),by1=Math.floor((camera.y+hh)/m.B);
  for(let by=by0;by<=by1;by++)for(let bx=bx0;bx<=bx1;bx++){const list=m.bucket.get(by*4096+bx);if(!list)continue;for(const o of list)if(o[5]<camera.x+hw&&o[5]+o[3]>camera.x-hw&&o[6]<camera.y+hh&&o[6]+o[4]>camera.y-hh)out.push({type:'tileobj',o,x:o[5]+o[3]/2,y:o[7]});}
  return out;
 }
 function drawObject(ctx,e){const o=e.o,im=picture(sheetSrc(o[0]));if(im.complete&&im.naturalWidth)ctx.drawImage(im,o[1],o[2],o[3],o[4],o[5],o[6],o[3],o[4]);}
 const shade=document.createElement('canvas');shade.width=1080;shade.height=540;const sctx=shade.getContext('2d');
 function after(ctx,sc,s,camera,zoom){
  const d=data(sc);if(!d||!d.dark)return;
  const px=(s.x-camera.x)*zoom+540,py=(s.y-20-camera.y)*zoom+270;
  sctx.globalCompositeOperation='source-over';sctx.clearRect(0,0,1080,540);sctx.fillStyle=`rgba(4,6,14,${d.dark})`;sctx.fillRect(0,0,1080,540);
  sctx.globalCompositeOperation='destination-out';
  const light=(x,y,r,k)=>{const g=sctx.createRadialGradient(x,y,r*.15,x,y,r);g.addColorStop(0,`rgba(0,0,0,${k})`);g.addColorStop(1,'rgba(0,0,0,0)');sctx.fillStyle=g;sctx.beginPath();sctx.arc(x,y,r,0,7);sctx.fill();};
  light(px,py,230*zoom,1);
  for(const l of d.lights||[]){const x=(l[0]-camera.x)*zoom+540,y=(l[1]-camera.y)*zoom+270;if(x>-200&&x<1280&&y>-200&&y<740)light(x,y,(l[2]||120)*zoom,.85);}
  ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.drawImage(shade,0,0);ctx.restore();
 }
 function minimap(mini,sc,s,entities,isGoal){
  const d=data(sc);mini.fillStyle='#0c1418';mini.fillRect(0,0,148,92);if(!d)return;
  const im=picture(`assets/maps/${d.id}/overview.webp`),span=Math.min(1,Math.max(2400/d.w,1500/d.h)),vw=Math.min(d.w,Math.max(2400,d.w*span)),vh=vw*92/148;
  const l=Math.max(0,Math.min(d.w-vw,s.x-vw/2)),t=Math.max(0,Math.min(Math.max(0,d.h-vh),s.y-vh/2));
  if(im.complete&&im.naturalWidth){const k=im.naturalWidth/d.w;mini.drawImage(im,l*k,t*k,vw*k,vh*k,0,0,148,92);}
  for(const e of entities){if(e.type==='tileobj')continue;const x=(e.x-l)/vw*148,y=(e.y-t)/vh*92;if(x<0||y<0||x>148||y>92)continue;mini.fillStyle=isGoal(e)?'#ffcf3c':e.type==='roaming'?'#c58cff':e.type==='portal'?'#b2f3f0':'#fff0a5';mini.beginPath();mini.arc(x,y,isGoal(e)?3:1.8,0,7);mini.fill();}
  mini.fillStyle='#fd6256';mini.strokeStyle='white';mini.beginPath();mini.arc((s.x-l)/vw*148,(s.y-t)/vh*92,3,0,7);mini.fill();mini.stroke();
 }
 function onIce(sc,x,y){const m=prep(sc.tilemap);if(!m||!m.d.ice)return false;if(!m.iceSet)m.iceSet=new Set(m.d.ice.map(p=>p[0]+','+p[1]));return m.iceSet.has(Math.floor(x/32)+','+Math.floor((y-4)/32));}
 function spot(id,key){const d=MAPS[id];return d?.spots?.[key]||null;}
 // Remap an old node-graph scene onto its tile map: spots by entity id, portal target, or proportional position.
 function adopt(sc){
  const d=MAPS[sc.tilemap||sc.id];if(!d)return sc;
  const ow=sc.w,oh=sc.h;sc.tilemap=d.id;sc.w=d.w;sc.h=d.h;sc.zoom=1;sc.bg=null;sc.tint=null;sc.name=sc.name||d.name;
  for(const e of sc.entities){
   if(e.type==='tileobj'||e.fixedTile)continue;
   const key=(e.fixedSpot&&d.spots[e.fixedSpot])||d.spots[e.id]||(e.type==='portal'&&(d.spots['to_'+e.to]||d.spots[e.to]));
   let p=key?{x:key[0],y:key[1]}:{x:e.x/ow*d.w,y:e.y/oh*d.h};
   const q=nearest(sc,p);if(q)p=q;e.x=p.x;e.y=p.y;
   const edge=d.spots['edge_'+e.id]||(e.type==='portal'&&d.spots['edge_to_'+e.to]);if(edge)e.edge=edge[2]||26;
  }
  const back=d.spots.back||d.spots.start;sc.nodes=[back?[back[0],back[1]]:[d.w/2,d.h/2]];sc.edges=[];
  return sc;
 }
 // Portals that lead into a tile map land on that map's entry spot for the scene they come from.
 function link(sc){for(const e of sc.entities){if(e.type!=='portal'||!MAPS[e.to]||e.to===sc.id)continue;const sp=MAPS[e.to].spots,q=sp['from_'+sc.id]||(!e.spawn?sp.back||sp.start:null);if(q)e.spawn=[q[0],q[1]];}return sc;}
 function scene(id,entities=[]){const d=MAPS[id];const back=d.spots.back||d.spots.start||[d.w/2,d.h/2];return{id,name:d.name,tilemap:id,w:d.w,h:d.h,zoom:1,bg:null,nodes:[[back[0],back[1]]],edges:[],entities};}
 window.ARPIA_TILEMAP={maps:MAPS,has:id=>!!MAPS[id],free,standable,line,nearest,plan,draw,visible,drawObject,after,minimap,adopt,link,scene,spot,onIce};
})();
