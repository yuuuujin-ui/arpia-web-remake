document.getElementById('test-run').onclick=async()=>{
 const out=document.getElementById('test-output'),logs=[],ok=(v,m)=>{if(!v)throw Error(m);};
 try{
  const G=ARPIA,x=ARPIA_EXTRA;for(let i=0;!G.ready&&i<100;i++)await new Promise(r=>setTimeout(r,100));G.newGame();const s=G.state,c=ARPIA_MIDTERM.chapters.find(c=>c.number===30);
  Object.assign(s,{stage:c.start,inv:{mt_brokenCrystal29:1},enemyPrisonAccess:true,enemyCaseSolved:true,level:60,maxHp:500,hp:500,maxMp:200,mp:200,spell:true,spellLevel:3,mineGateOpen:true,starGateOpen:true});
  const drain=()=>{for(let i=0;G.dialog&&i<150;i++)G.next();ok(!G.dialog,'dialog stalled');};
  for(let tries=0;s.stage<c.end&&tries<70;tries++){const r=c.steps[s.stage-c.start],at=s.stage;G.close();G.travel(r.scene);const targets=G.scene.entities.filter(e=>e.id===r.npc);ok(targets.length===1,'target '+r.key);if(G.scene.tilemap||G.scene.walkmask)ok(ARPIA_TILEMAP.plan(G.scene,{x:s.x,y:s.y},targets[0])?.length,'route '+r.key);
   G.interact(r.npc);drain();if(r.choose)document.querySelectorAll('#puzzle-choices button')[r.choose[3]].click();if(G.battle){for(let i=0;G.battle&&i<60;i++){G.battle.enemies.forEach(e=>e.hp=Math.min(e.hp,1));G.battle.ready=true;G.battle.lock=0;G.action('attack');}ok(!G.battle,'battle stalled');G.close();}
   ok(s.stage===at+1||(r.key==='hunt'&&s.stage===at),'advance '+r.key);logs.push('PASS '+at+' '+r.key+' '+r.scene);
  }
  ok(s.huntCount30===10,'ten monsters');ok(s.dogBypass30&&s.crystalReturned30&&s.crystalArcComplete30&&!s.dogForm30,'returned to human');ok(!s.inv.mt_ruby30&&!s.inv.mt_banana30&&!s.inv.mt_seaweed30,'ingredients used');out.textContent=logs.join('\n')+'\nALL PASS: episode 30, transformation, waterfall bypass, ten monsters and restoration.';
 }catch(e){out.textContent=logs.join('\n')+'\nFAIL '+e.stack;}
};
