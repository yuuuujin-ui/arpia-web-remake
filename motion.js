/* Directional pixel animation and a ground-based, trailing pet. No world artwork is modified. */
window.createArpiaMotion=()=>{
 const dirs=['down','left','right','up'],vectors={down:{x:0,y:1},left:{x:-1,y:0},right:{x:1,y:0},up:{x:0,y:-1}};
 const frames=[],metrics=[],clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const dog={};for(const [key,file]of Object.entries({idle:'stand1.gif',front:'moveFront1.gif',back:'moveBack1.gif',side:'moveSide1.gif',spell:'spellCast1.gif'})){const im=new Image();im.src='assets/original/pet-images/dog/'+file;dog[key]=im;}
 const forms={};for(const [key,path]of Object.entries({festivalPoisoned36:'assets/chapter36/goblin-form-v1.png',festivalDragon37:'assets/midterm/earth-dragon.png',devileyeDisguise39:'assets/restored/devileye-sprite.png'})){const im=new Image();im.src=path;forms[key]=im;}
 let direction='down',heading={x:0,y:1},moving=false,distance=0,frame=0,trail=[],pet={x:0,y:0,hop:0,phase:0,moving:false,direction:'down'},hadPet=false;
 const length=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
 function behind(s){return{x:s.x-heading.x*34-heading.y*9,y:s.y-heading.y*34+heading.x*9};}
 function reset(s){direction=dirs.includes(s.direction)?s.direction:'down';heading={...vectors[direction]};moving=false;distance=0;frame=0;const p=behind(s);pet={...p,hop:0,phase:0,moving:false,direction};trail=[p,{x:s.x,y:s.y}];hadPet=!!s.pet;}
 function face(dx,dy,s){const len=Math.hypot(dx,dy);if(len<.001)return;heading={x:dx/len,y:dy/len};const ax=Math.abs(dx),ay=Math.abs(dy);if(ax>ay*1.12)direction=dx<0?'left':'right';else if(ay>ax*1.12)direction=dy<0?'up':'down';else if(['left','right'].includes(direction))direction=dx<0?'left':'right';else direction=dy<0?'up':'down';s.direction=direction;}
 function sampleTrail(s,gap){let prev={x:s.x,y:s.y};for(let i=trail.length-1;i>=0;i--){const p=trail[i],d=length(prev,p);if(d>=gap&&d>0)return{x:prev.x+(p.x-prev.x)*gap/d,y:prev.y+(p.y-prev.y)*gap/d};gap-=d;prev=p;}return behind(s);}
 function step(s,dx,dy,dt){
  const travel=Math.hypot(dx,dy);moving=travel>.015;
  if(moving){face(dx,dy,s);distance+=travel;frame=Math.floor(distance/13)%4;const last=trail.at(-1);if(!last||length(last,s)>=1.2)trail.push({x:s.x,y:s.y});if(trail.length>180)trail.splice(0,trail.length-180);}else{frame=0;distance=0;}
  if(!s.pet){hadPet=false;return;}
  if(!hadPet){Object.assign(pet,behind(s),{hop:0,phase:0});hadPet=true;}
  let target=moving?sampleTrail(s,34):behind(s);
  // At a U-turn the old trail briefly lies ahead. Move around the hero to the new rear side.
  const tx=target.x-s.x,ty=target.y-s.y;if(tx*heading.x+ty*heading.y>-8)target=behind(s);
  const before={x:pet.x,y:pet.y},rx=pet.x-s.x,ry=pet.y-s.y,forward=rx*heading.x+ry*heading.y;
  if(forward>-7&&Math.hypot(rx,ry)<62){
   const angle=Math.atan2(ry,rx),goal=Math.atan2(target.y-s.y,target.x-s.x),delta=Math.atan2(Math.sin(goal-angle),Math.cos(goal-angle));
   const next=angle+clamp(delta,-dt*10,dt*10),radius=clamp(Math.hypot(rx,ry),26,42);pet.x=s.x+Math.cos(next)*radius;pet.y=s.y+Math.sin(next)*radius;
  }else{const d=length(pet,target),amount=Math.min(d,dt*(85+d*4));if(d>.3){pet.x+=(target.x-pet.x)/d*amount;pet.y+=(target.y-pet.y)/d*amount;}}
  const px=pet.x-before.x,py=pet.y-before.y,speed=Math.hypot(px,py)/Math.max(.001,dt);pet.moving=speed>7;
  if(pet.moving){pet.direction=Math.abs(px)>Math.abs(py)?px<0?'left':'right':py<0?'up':'down';pet.phase=(pet.phase+dt*3.4)%1;}
  else if(pet.phase>0){pet.phase+=dt*3.4;if(pet.phase>=1)pet.phase=0;}
  pet.hop=Math.max(0,Math.sin(Math.PI*pet.phase))*6.5;
 }
 async function load(){
  await Promise.all(window.ARPIA_WALKS.map(async(data,hero)=>{
   const source=new Image();source.src=data;await source.decode();const sheet=document.createElement('canvas');sheet.width=source.width;sheet.height=source.height;
   const c=sheet.getContext('2d',{willReadFrequently:true});c.drawImage(source,0,0);const pix=c.getImageData(0,0,sheet.width,sheet.height),p=pix.data;
   for(let i=0;i<p.length;i+=4){if(p[i]>135&&p[i+2]>120&&p[i+1]<Math.min(p[i],p[i+2])*.55)p[i+3]=0;}
   c.putImageData(pix,0,0);const cells=[];
   for(let row=0;row<4;row++)for(let col=0;col<4;col++){
    const sx=Math.round(col*sheet.width/4),sy=Math.round(row*sheet.height/4),w=Math.round((col+1)*sheet.width/4)-sx,h=Math.round((row+1)*sheet.height/4)-sy;
    let left=w,top=h,right=0,bottom=0,count=0;
    for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(p[((sy+y)*sheet.width+sx+x)*4+3]>100){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);count++;}
    if(count<100)throw Error('Missing hero walk frame '+hero+':'+row+':'+col);
    let sum=0,weight=0;for(let y=Math.floor(top+(bottom-top)*.88);y<=bottom;y++)for(let x=left;x<=right;x++)if(p[((sy+y)*sheet.width+sx+x)*4+3]>100){const a=(y-top)*(y-top);sum+=x*a;weight+=a;}
    cells.push({sx,sy,w,h,left,top,right,bottom,footX:sum/weight,height:bottom-top+1,count});
   }
   const scale=49/Math.max(...cells.map(f=>f.height));frames[hero]=[];
   // A common horizontal anchor per direction avoids staff/cape changes making the body slide.
   for(let row=0;row<4;row++){
    const anchor=cells.slice(row*4,row*4+4).reduce((n,f)=>n+f.footX,0)/4;frames[hero][row]=[];
    for(let col=0;col<4;col++){const f=cells[row*4+col],out=document.createElement('canvas');out.width=144;out.height=144;const oc=out.getContext('2d');oc.imageSmoothingEnabled=false;
     oc.drawImage(sheet,f.sx+f.left,f.sy+f.top,f.right-f.left+1,f.height,Math.round((36+(f.left-anchor)*scale)*2),136-Math.round(f.height*scale*2),Math.round((f.right-f.left+1)*scale*2),Math.round(f.height*scale*2));frames[hero][row][col]=out;
    }
   }
   metrics[hero]={sourceWidth:source.width,sourceHeight:source.height,frames:cells.length,groundY:68,visibleHeight:49};
  }));
 }
 function drawHero(ctx,hero,x,y,scale=1,battle=false){
  const state=window.ARPIA?.state,form=Object.keys(forms).find(key=>state?.[key]);if(form){const im=forms[form];if(im.complete&&im.naturalWidth){const box=form==='festivalPoisoned36'?[152,131,787,1188]:[0,0,im.naturalWidth,im.naturalHeight];const h=(form==='festivalPoisoned36'?58:form==='festivalDragon37'?90:84)*scale,w=h*box[2]/box[3];ctx.save();ctx.imageSmoothingEnabled=false;ctx.drawImage(im,...box,Math.round(x-w/2),Math.round(y-h),w,h);ctx.restore();return;}}

  if(window.ARPIA?.state?.dogForm30){const key=battle?'spell':moving?(direction==='up'?'back':direction==='down'?'front':'side'):'idle',sprite=dog[key];if(!sprite?.complete)return;const w=60*scale,h=60*scale;ctx.save();ctx.imageSmoothingEnabled=false;ctx.translate(Math.round(x),Math.round(y));if(direction==='right'&&!battle)ctx.scale(-1,1);ctx.drawImage(sprite,-w/2,-h,w,h);ctx.restore();return;}
  const row=battle?2:dirs.indexOf(direction),sprite=frames[hero]?.[row]?.[battle?0:frame];if(!sprite)return;ctx.save();ctx.imageSmoothingEnabled=false;ctx.drawImage(sprite,Math.round(x-36*scale),Math.round(y-68*scale),72*scale,72*scale);ctx.restore();
 }
 function snapshot(){return{direction,heading:{...heading},moving,frame,distance,pet:{...pet},trailLength:trail.length,metrics};}
 return{load,reset,face,step,drawHero,snapshot,get pet(){return pet;},get moving(){return moving;}};
};
