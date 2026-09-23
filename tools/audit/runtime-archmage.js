document.getElementById('test-run').onclick=async()=>{
 const out=document.getElementById('test-output'),logs=[],ok=(v,m)=>{if(!v)throw Error(m);};
 try{
  const G=ARPIA;for(let i=0;!G.ready&&i<100;i++)await new Promise(r=>setTimeout(r,100));G.newGame();const s=G.state,A=ARPIA_CAPTURE_ARCHMAGE;
  Object.assign(s,{stage:ARPIA_MIDTERM.chapters.find(c=>c.number===40).end,level:60,rank:3,maxHp:1500,hp:1500,maxMp:500,mp:500,spell:true,spellLevel:3,mineGateOpen:true,starGateOpen:true});
  const mainStage=s.stage,drain=()=>{for(let i=0;G.dialog&&i<100;i++)G.next();ok(!G.dialog,'dialog stalled');};
  for(let loops=0;s.fm_archmage!==9&&loops<90;loops++){
   const at=s.archmageRoute,r=A.rows[at];ok(r,'no route '+at);G.close();G.travel(r.scene);
   const target=G.scene.entities.find(e=>e.id===r.npc);ok(target,'target '+r.key);if(G.scene.tilemap||G.scene.walkmask)ok(ARPIA_TILEMAP.plan(G.scene,{x:s.x,y:s.y},target)?.length,'route '+r.key);
   if(r.key==='stones'){
    s.inv.manastone=30;s.inv.manastone_plus=19;G.interact(r.npc);drain();ok(s.archmageRoute===at&&s.inv.manastone===30&&s.inv.manastone_plus===19,'insufficient materials consumed');s.inv.manastone_plus=20;
   }
   G.interact(r.npc);if(!s.fm_archmage)document.querySelector('[data-choice="accept"]').click();drain();
   if(G.battle){for(let i=0;G.battle&&i<150;i++){G.battle.enemies.forEach(e=>e.hp=Math.min(e.hp,1));G.battle.ready=true;G.battle.lock=0;G.action('attack');}ok(!G.battle,'battle stalled');G.close();}
   ok(s.stage===mainStage,'changed main quest');
   if(!['ghosts','ice','report'].includes(r.key))ok(s.archmageRoute===at+1,'advance '+r.key);
   logs.push('PASS '+at+' '+r.key+' '+s.archmageGhosts+'/'+s.archmageIce);
  }
  ok(s.fm_archmage===9&&s.rank===4&&s.archmage&&s.fd_archmage===1,'promotion');
  ok(s.archmageGhosts===50&&s.archmageIce===30,'hunt counts');
  for(const id of ['manastone','manastone_plus','archCertificate','archFragment','archImmortal','archLife'])ok(!s.inv[id],'unconsumed '+id);
  A.migrate(s);ok(s.rank===4&&s.fm_archmage===9,'completed save migration');
  out.textContent=logs.join('\n')+'\nALL PASS: promotion route, 50/30 hunts, material shortage and consumption, three life gems, Meteor, rank, main quest preservation.';
 }catch(e){out.textContent=logs.join('\n')+'\nFAIL '+e.stack;}
};
