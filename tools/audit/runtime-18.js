document.getElementById('test-run').onclick=async()=>{
 const out=document.getElementById('test-output'),logs=[],ok=(v,m)=>{if(!v)throw Error(m);};
 try{
  const G=ARPIA,x=ARPIA_EXTRA;for(let i=0;!G.ready&&i<100;i++)await new Promise(r=>setTimeout(r,100));G.newGame();const s=G.state,c=ARPIA_MIDTERM.chapters.find(c=>c.number===18);
  Object.assign(s,{stage:c.start,level:60,maxHp:500,hp:500,maxMp:200,mp:200,spell:true,spellLevel:3,mineGateOpen:true,starGateOpen:true});
  const stoneRow=c.steps.find(r=>r.key==='lastStone'), prepRow=c.steps.find(r=>r.key==='incomplete');ok(stoneRow.lines(s).some(l=>l[1].includes('못 구했어')),'missing stone branch');ARPIA_SYS.inv.add(s,'manastone_plus',1);ok(stoneRow.lines(s).some(l=>l[1].includes('챙겨 두길')),'owned stone branch');ok(prepRow.lines(s).some(l=>l[1].includes('미리 챙겨')),'owned stone preparation');s.midtermRecipe=true;ok(x.questItems(s).find(l=>l[0]==='마법 고급 물약 조제서')[1].includes('✓ 강화 마나스톤'),'recipe stone indicator');
  const drain=()=>{for(let i=0;G.dialog&&i<150;i++)G.next();ok(!G.dialog,'dialog stalled');};
  for(let attempt=0;s.stage<c.end&&attempt<70;attempt++){const r=c.steps[s.stage-c.start],at=s.stage;G.close();G.travel(r.scene);const targets=G.scene.entities.filter(e=>e.id===r.npc);ok(targets.length===1,'target '+r.key);if(G.scene.tilemap||G.scene.walkmask)ok(ARPIA_TILEMAP.plan(G.scene,{x:s.x,y:s.y},targets[0])?.length,'route '+r.key);
   G.interact(r.npc);drain();if(r.choose)document.querySelectorAll('#puzzle-choices button')[r.choose[3]].click();if(G.battle){for(let i=0;G.battle&&i<60;i++){G.battle.enemies.forEach(e=>e.hp=Math.min(e.hp,1));G.battle.ready=true;G.battle.lock=0;G.action('attack');}ok(!G.battle,'battle stalled');G.close();}
   ok(s.stage===at+1||(r.key==='golem'&&s.stage===at),'advance '+r.key);logs.push('PASS '+at+' '+r.key+' '+r.scene);
  }
  ok(s.midtermPotionScore===100,'score');ok(s.huntCount18===10,'ten golems');ok(ARPIA_SYS.inv.count(s,'mt_potion-certificate')===1,'certificate');out.textContent=logs.join('\n')+'\nALL PASS: episode 18, ten golems, dungeon targets, materials and rescue exam.';
 }catch(e){out.textContent=logs.join('\n')+'\nFAIL '+e.stack;}
};
