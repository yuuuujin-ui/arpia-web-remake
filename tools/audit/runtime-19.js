document.getElementById('test-run').onclick=async()=>{
 const out=document.getElementById('test-output'),logs=[],ok=(v,m)=>{if(!v)throw Error(m);};
 try{
  const G=ARPIA,x=ARPIA_EXTRA;for(let i=0;!G.ready&&i<100;i++)await new Promise(r=>setTimeout(r,100));G.newGame();const s=G.state,c=ARPIA_MIDTERM.chapters.find(c=>c.number===19);
  Object.assign(s,{stage:c.start,level:60,maxHp:500,hp:500,maxMp:200,mp:200,spell:true,spellLevel:3,mineGateOpen:true,starGateOpen:true});
  const drain=()=>{for(let i=0;G.dialog&&i<150;i++)G.next();ok(!G.dialog,'dialog stalled');};
  for(let attempt=0;s.stage<c.end&&attempt<70;attempt++){const r=c.steps[s.stage-c.start],at=s.stage;G.close();G.travel(r.scene);if(r.key==='keyOne'||r.key==='keyTwo'||r.key==='keyThree'){const k=['keyOne','keyTwo','keyThree'].indexOf(r.key);G.travel('diveroom'+[18,27,0][k]);G.interact('diveKey'+k);drain();ok(s.stage===at+1,'key '+k);logs.push('PASS key '+k);continue;}if(r.key==='friendOne'||r.key==='friendTwo'){const id=r.key==='friendOne'?'isaac':'matilda';G.travel('diveroom'+(id==='isaac'?13:15));G.interact(id);drain();ok(s.stage===at+1,'friend '+id);logs.push('PASS rescued '+id);continue;}const targets=G.scene.entities.filter(e=>e.id===r.npc);ok(targets.length===1,'target '+r.key);if(G.scene.tilemap||G.scene.walkmask)ok(ARPIA_TILEMAP.plan(G.scene,{x:s.x,y:s.y},targets[0])?.length,'route '+r.key);
   G.interact(r.npc);drain();if(r.choose)document.querySelectorAll('#puzzle-choices button')[r.choose[3]].click();if(G.battle){for(let i=0;G.battle&&i<60;i++){G.battle.enemies.forEach(e=>e.hp=Math.min(e.hp,1));G.battle.ready=true;G.battle.lock=0;G.action('attack');}ok(!G.battle,'battle stalled');G.close();}
   ok(s.stage===at+1||(r.key==='golem'&&s.stage===at),'advance '+r.key);logs.push('PASS '+at+' '+r.key+' '+r.scene);
  }
  ok(s.midtermDungeonScore===100,'score');ok(s.diveFriends===3,'both friends');ok(s.diveToolsReturned,'tools returned');out.textContent=logs.join('\n')+'\nALL PASS: episode 19, original key rooms, rescue rooms and expedition.';
 }catch(e){out.textContent=logs.join('\n')+'\nFAIL '+e.stack;}
};
