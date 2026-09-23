document.getElementById('test-run').onclick=async()=>{
 const out=document.getElementById('test-output'),logs=[],ok=(v,m)=>{if(!v)throw Error(m);};
 try{
  const G=ARPIA,x=ARPIA_EXTRA;for(let i=0;!G.ready&&i<100;i++)await new Promise(r=>setTimeout(r,100));G.newGame();const s=G.state;
  Object.assign(s,{stage:293,level:60,maxHp:500,hp:500,maxMp:200,mp:200,spell:true,spellLevel:3,mineGateOpen:true,starGateOpen:true});
  const drain=()=>{for(let i=0;G.dialog&&i<150;i++)G.next();ok(!G.dialog,'dialog stalled');};
  const win=()=>{for(let i=0;G.battle&&i<60;i++){G.battle.enemies.forEach(e=>e.hp=Math.min(e.hp,1));G.battle.ready=true;G.battle.lock=0;G.action('attack');}ok(!G.battle,'battle stalled');G.close();};
  while(s.stage<320){const at=s.stage,q=x.quests[at-42];G.close();G.travel(q[2]);ok(G.scene.id===q[2],'scene '+at);const targets=G.scene.entities.filter(e=>e.id===q[3]);ok(targets.length===1,'target '+at+' '+q[3]+' '+targets.length);if(G.scene.tilemap||G.scene.walkmask)ok(ARPIA_TILEMAP.plan(G.scene,{x:s.x,y:s.y},targets[0])?.length,'route '+at);
   G.interact(q[3]);drain();if(at===311){for(const id of ['staff','shoulder','hand'])document.querySelector('[data-difference="'+id+'"]').click();document.querySelector('#puzzle-choices button').click();}if(at===312){document.querySelectorAll('#puzzle-choices button')[3].click();}if(G.battle){win();G.interact(q[3]);drain();}
   ok(s.stage===at+1,'advance '+at+' '+s.stage);if(at===307)ok(s.iceGuardianWon16&&s.coolstoneTainted,'stone after battle');if(at===311)ok(s.portraitDifferences16.length===3,'three differences');if(at===316)ok(s.scene==='icevillage','Shiva travel');if(at===317)ok(s.iceCake,'cake received');if(at===319)ok(!s.iceCake&&ARPIA_SYS.inv.count(s,'manastone_plus')===1,'cake delivered reward');logs.push('PASS '+at+' '+q[2]+'/'+q[3]);
  }
  out.textContent=logs.join('\n')+'\nALL PASS: 27 episode 16 stages, cave fight, portrait comparison, book selection, teleport, cake delivery and reward.';
 }catch(e){out.textContent=logs.join('\n')+'\nFAIL '+e.stack;}
};
