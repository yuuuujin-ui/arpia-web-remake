document.getElementById('test-run').onclick=async()=>{
 const out=document.getElementById('test-output'),logs=[],ok=(v,m)=>{if(!v)throw Error(m);};
 try{
  const G=ARPIA;for(let i=0;!G.ready&&i<100;i++)await new Promise(r=>setTimeout(r,100));G.newGame();const s=G.state;
  const chapters=ARPIA_MIDTERM.chapters.filter(c=>c.number>=38&&c.number<=40);
  Object.assign(s,{stage:chapters[0].start,level:65,maxHp:1500,hp:1500,maxMp:500,mp:500,spell:true,spellLevel:3,mineGateOpen:true,starGateOpen:true});
  const drain=()=>{for(let i=0;G.dialog&&i<150;i++)G.next();ok(!G.dialog,'dialog stalled');};
  for(const c of chapters){
   for(let tries=0;s.stage<c.end&&tries<180;tries++){
    const r=c.steps[s.stage-c.start],at=s.stage;ok(r,'missing stage '+at);G.close();G.travel(r.scene);
    const targets=G.scene.entities.filter(e=>e.id===r.npc);ok(targets.length===1,'target '+r.key+' '+targets.length);
    if(G.scene.tilemap||G.scene.walkmask)ok(ARPIA_TILEMAP.plan(G.scene,{x:s.x,y:s.y},targets[0])?.length,'route '+r.key);
    if(c.number===39&&['cardiaDelivery','derenDelivery'].includes(r.key)){
     s.inv.hipotion=9;G.interact(r.npc);drain();ok(s.stage===at&&s.inv.hipotion===9,'accepted short delivery');s.inv.hipotion=10;
    }
    G.interact(r.npc);drain();if(r.choose)document.querySelectorAll('#puzzle-choices button')[r.choose[3]].click();
    if(G.battle){
     if(r.battle==='hungerFinal39')ok(G.battle.allies.length>=2,'final witnesses missing');
     for(let i=0;G.battle&&i<150;i++){G.battle.enemies.forEach(e=>e.hp=Math.min(e.hp,1));G.battle.ready=true;G.battle.lock=0;G.action('attack');}
     ok(!G.battle,'battle stalled '+r.key);G.close();
    }
    const repeated=c.number===40&&['fireHunt','dragonHunt','iceHunt','waterfallHunt'].includes(r.key);
    ok(s.stage===at+1||(repeated&&s.stage===at),'advance '+r.key+' '+s.stage);
    if(c.number===39&&['cardiaDelivery','derenDelivery'].includes(r.key))ok(!s.inv.hipotion,'potion not consumed');
    if(c.number===39&&r.key==='disguise')ok(s.devileyeDisguise39,'disguise missing');
    logs.push('PASS '+at+' '+r.key+' '+r.scene);
   }
   ok(s.stage===c.end,'chapter did not end '+c.number);
   if(c.number===39)ok(s.asuriaTruce39&&s.derenTruce39&&s.warConfession39&&s.warEnded39&&!s.devileyeDisguise39&&!s.inv.mt_seal39,'war state');
  }
  for(const field of ['fireKills40','dragonKills40','iceKills40','waterfallKills40'])ok(s[field]===20,field+' '+s[field]);
  ok(s.hinaRescued40&&s.chapter40Complete&&!s.inv.mt_letter40,'rescue state');
  out.textContent=logs.join('\n')+'\nALL PASS: 38–40, potion shortage/consumption, witness battle, four 20-monster hunts, Hina returned.';
 }catch(e){out.textContent=logs.join('\n')+'\nFAIL '+e.stack;}
};
