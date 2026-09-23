document.getElementById('test-run').onclick=async()=>{
 const out=document.getElementById('test-output'),logs=[],ok=(v,m)=>{if(!v)throw Error(m);};
 try{
  const G=ARPIA,x=ARPIA_EXTRA;for(let i=0;!G.ready&&i<100;i++)await new Promise(r=>setTimeout(r,100));
  G.newGame();const s=G.state;Object.assign(s,{stage:182,level:60,maxHp:500,hp:500,maxMp:200,mp:200,spell:true,spellLevel:3,mineGateOpen:true,starGateOpen:true});
  const drain=()=>{for(let i=0;G.dialog&&i<150;i++)G.next();ok(!G.dialog,'dialog stalled');};
  const win=()=>{ok(G.battle.allies.some(a=>a.id==='kesno')&&!G.battle.allies.some(a=>a.id==='edward'),'12 companions');for(let i=0;G.battle&&i<60;i++){G.battle.enemies.forEach(e=>e.hp=Math.min(e.hp,1));G.battle.ready=true;G.battle.lock=0;G.action('attack');}ok(!G.battle,'battle stalled');G.close();};
  const meet=(scene,id)=>{G.close();G.travel(scene);ok(G.scene.id===scene,'scene '+s.stage);const targets=G.scene.entities.filter(e=>e.id===id);ok(targets.length===1,'target '+s.stage+' '+id+' '+targets.length);if(G.scene.tilemap||G.scene.walkmask)ok(ARPIA_TILEMAP.plan(G.scene,{x:s.x,y:s.y},targets[0])?.length,'route '+s.stage+' '+id);G.interact(id);drain();if(G.battle)win();};
  while(s.stage<211){
   const at=s.stage,q=x.quests[at-42];meet(q[2],q[3]);
   if(at===197){ok(s.fairySearch12&&!s.fairyMedicine&&s.stage===197,'payment');meet('dwarfpalace','fairyMedicine12');ok(s.fairyFound12&&s.stage===197,'pickup');meet('minedepths','guillaume');}
   if(at===204)for(let i=0;s.stage===204&&i<10;i++)meet(q[2],q[3]);
   ok(s.stage===at+1,'advance '+at+' '+s.stage);
   if(at===190)ok(!s.firstAid&&s.kesnoCare12,'herb handoff');
   if(at===193)ok(!s.royalMedicine,'royal medicine consumed');
   if(at===198)ok(!s.fairyMedicine,'fairy medicine consumed');
   if(at===204)ok(s.huntCount12===10,'10 monsters');
   if(at===206)ok(!s.snakeBlood&&!s.antonioSample,'ingredients consumed');
   if(at===207)ok(s.fruitForFamily12,'fruit for patient');
   if(at===209)ok(!s.fruitForFamily12&&!s.antidote,'treatment');
   logs.push('PASS '+at+' '+q[2]+'/'+q[3]);
  }
  out.textContent=logs.join('\n')+'\nALL PASS: 29 episode 12 steps, treatment items, search, 10 monsters and companion departure.';
 }catch(e){out.textContent=logs.join('\n')+'\nFAIL '+e.stack;}
};
