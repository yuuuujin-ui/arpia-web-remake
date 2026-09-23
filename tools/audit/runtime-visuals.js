document.getElementById('test-run').onclick=async()=>{
 const out=document.getElementById('test-output'),ok=(v,m)=>{if(!v)throw Error(m);};
 try{
  const G=ARPIA;for(let i=0;!G.ready&&i<100;i++)await new Promise(r=>setTimeout(r,50));G.newGame();const s=G.state;
  const c36=ARPIA_MIDTERM.chapters.find(c=>c.number===36),c37=ARPIA_MIDTERM.chapters.find(c=>c.number===37),c40=ARPIA_MIDTERM.chapters.find(c=>c.number===40);
  const files=['assets/chapter36/goblin-form-v1.png','assets/chapter40/hunger-house-v1.png','assets/restored/joker-cutout-v1.png'];
  for(const src of files){const im=new Image();im.src=src;await im.decode();ok(im.naturalWidth>500,'asset resolution '+src);}
  Object.assign(s,{stage:c36.keys.test,level:60,hp:1500,maxHp:1500,mp:500,maxMp:500,spell:true});ARPIA_SYS.inv.add(s,'mt_transform36');
  c36.steps.find(r=>r.key==='test').effect(s);ok(s.festivalPoisoned36&&!s.inv.mt_transform36,'poison transition');
  const motion=createArpiaMotion();await motion.load();const canvas=document.createElement('canvas');canvas.width=160;canvas.height=160;const ctx=canvas.getContext('2d');
  for(let i=0;i<50;i++){motion.drawHero(ctx,s.hero,80,120,1);if(ctx.getImageData(0,0,160,160).data.some((v,k)=>k%4===3&&v))break;await new Promise(r=>setTimeout(r,20));}
  const poisoned=ctx.getImageData(0,0,160,160).data;ok(poisoned.some((v,k)=>k%4===3&&v),'goblin draw blank');
  c37.steps.find(r=>r.key==='antidote').effect(s);ctx.clearRect(0,0,160,160);motion.drawHero(ctx,s.hero,80,120,1);const healed=ctx.getImageData(0,0,160,160).data;
  ok(!s.festivalPoisoned36&&s.festivalCured37,'antidote transition');ok(poisoned.some((v,i)=>v!==healed[i]),'appearance unchanged after cure');
  s.stage=c40.keys.complaint;G.travel('hungerHouse40');ok(G.scene.bg===files[1],'wrong home background');
  const home=G.scene.entities.find(e=>e.id==='hunger');ok(home&&home.x>250&&home.y>150,'missing home NPC');
  ok(ARPIA_EXTRA.npcs.hunger.artPath==='assets/original/character/other/헝거.png','wrong Hunger field art');ok(ARPIA_EXTRA.encounters.hunger40.bg===files[1]&&ARPIA_EXTRA.encounters.hina40.bg===files[1],'outdoor battle backdrop');
  out.textContent='ALL PASS: generated assets decode, poison/cure appearance changes, transformation item consumed, cave home and NPC loaded.';
  for(const [label,fn]of [['Show Joker',()=>{s.stage=974;s.fm_joker_relief=1;s.reliefPhase=0;G.travel('curiousmansion');G.interact('joker');}],['Show goblin',()=>{s.festivalPoisoned36=true;s.stage=c36.keys.suspicion;G.travel('magecity');}],['Show house',()=>{s.festivalPoisoned36=false;s.stage=c40.keys.complaint;G.travel('hungerHouse40');}]]){const b=document.createElement('button');b.textContent=label;b.onclick=fn;out.after(b);}
 }catch(e){out.textContent='FAIL '+e.stack;}
};
