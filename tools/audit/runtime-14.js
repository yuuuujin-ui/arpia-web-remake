document.getElementById('test-run').onclick=async()=>{
 const out=document.getElementById('test-output'),logs=[],ok=(v,m)=>{if(!v)throw Error(m);};
 try{
  const G=ARPIA,x=ARPIA_EXTRA;for(let i=0;!G.ready&&i<100;i++)await new Promise(r=>setTimeout(r,100));G.newGame();const s=G.state;
  Object.assign(s,{stage:241,level:60,maxHp:500,hp:500,maxMp:200,mp:200,spell:true,spellLevel:3,mineGateOpen:true,starGateOpen:true});
  const drain=()=>{for(let i=0;G.dialog&&i<150;i++)G.next();ok(!G.dialog,'dialog stalled');};
  const win=()=>{ok(G.battle.allies.some(a=>a.id==='naomi')===(s.stage===266),'Naomi join timing');for(let i=0;G.battle&&i<60;i++){G.battle.enemies.forEach(e=>e.hp=Math.min(e.hp,1));G.battle.ready=true;G.battle.lock=0;G.action('attack');}ok(!G.battle,'battle stalled');G.close();};
  while(s.stage<268){const at=s.stage,q=x.quests[at-42];G.close();G.travel(q[2]);ok(G.scene.id===q[2],'scene '+at);const targets=G.scene.entities.filter(e=>e.id===q[3]);ok(targets.length===1,'target '+at+' '+q[3]+' '+targets.length);if(G.scene.tilemap||G.scene.walkmask)ok(ARPIA_TILEMAP.plan(G.scene,{x:s.x,y:s.y},targets[0])?.length,'route '+at);
   G.interact(q[3]);drain();if(at===250){document.querySelectorAll('#puzzle-choices button')[0].click();drain();}if(G.battle)win();
   ok(s.stage===at+1,'advance '+at+' '+s.stage);if(at===250)ok(s.gemInMirror14&&!s.mantisDust&&!s.wingDust14,'gem hidden');if(at===251)ok(!s.friedsMirror&&s.gemInMirror14,'mirror returned');if(at===255)ok(!s.morrisStitch&&s.stitchMissing,'stitch stolen');if(at===261)ok(!s.gemInMirror14&&s.sunGemGone,'gem stolen');logs.push('PASS '+at+' '+q[2]+'/'+q[3]);
  }
  out.textContent=logs.join('\n')+'\nALL PASS: 27 episode 14 stages, mirror sealing, materials, theft, companion timing and target routes.';
 }catch(e){out.textContent=logs.join('\n')+'\nFAIL '+e.stack;}
};
