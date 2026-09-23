document.getElementById('test-run').onclick=async()=>{
 const out=document.getElementById('test-output'),logs=[],ok=(v,m)=>{if(!v)throw Error(m);};
 try{
  const G=ARPIA;for(let i=0;!G.ready&&i<100;i++)await new Promise(r=>setTimeout(r,100));G.newGame();const s=G.state;
  const chapters=ARPIA_MIDTERM.chapters.filter(c=>c.number>=36&&c.number<=37);
  Object.assign(s,{stage:chapters[0].start,level:60,maxHp:1000,hp:1000,maxMp:400,mp:400,spell:true,spellLevel:3,mineGateOpen:true,starGateOpen:true});
  const drain=()=>{for(let i=0;G.dialog&&i<150;i++)G.next();ok(!G.dialog,'dialog stalled');};
  for(const c of chapters){
   for(let tries=0;s.stage<c.end&&tries<120;tries++){
    const r=c.steps[s.stage-c.start],at=s.stage;ok(r,'missing stage '+at);G.close();G.travel(r.scene);
    const targets=G.scene.entities.filter(e=>e.id===r.npc);ok(targets.length===1,'target '+r.key);if(G.scene.tilemap||G.scene.walkmask)ok(ARPIA_TILEMAP.plan(G.scene,{x:s.x,y:s.y},targets[0])?.length,'route '+r.key);
    G.interact(r.npc);drain();if(r.choose)document.querySelectorAll('#puzzle-choices button')[r.choose[3]].click();
    if(G.battle){for(let i=0;G.battle&&i<100;i++){G.battle.enemies.forEach(e=>e.hp=Math.min(e.hp,1));G.battle.ready=true;G.battle.lock=0;G.action('attack');}ok(!G.battle,'battle stalled '+r.key);G.close();}
    ok(s.stage===at+1||(r.key==='trial'&&s.stage===at&&s.festivalKills36<20),'advance '+r.key+' '+s.stage);logs.push('PASS '+at+' '+r.key+' '+r.scene);
   }
   ok(s.stage===c.end,'chapter did not end');
   if(c.number===36){ok(s.festivalKills36===20&&s.festivalPoisoned36,'poison or trial');ok(s.inv.mt_cauldron36===1,'borrowed pot');}
  }
  ok(s.festivalCured37&&!s.festivalPoisoned36&&s.sunReturned37&&s.festivalComplete37&&!s.festivalDragon37,'festival state');
  for(const id of ['cauldron36','sun37','dragona37','weed37','mucus37','ore37'])ok(!s.inv['mt_'+id],'unreturned material '+id);
  out.textContent=logs.join('\n')+'\nALL PASS: episodes 36–37, 20-target hunt, two herb rooms, antidote, escorted battle, gem and pot returned.';
 }catch(e){out.textContent=logs.join('\n')+'\nFAIL '+e.stack;}
};
