/* Actual enemy HP/ATB and normal damage; isolated saves and accelerated clock only. */
document.getElementById('test-run').onclick=async()=>{
 const G=ARPIA,out=document.getElementById('test-output'),logs=[],ok=(v,m)=>{if(!v)throw Error(m);};
 try{for(let i=0;!G.ready&&i<100;i++)await new Promise(r=>setTimeout(r,50));
 for(const hero of [0,1,2])for(const scenario of ['hunger','hina','contest']){
  G.newGame(hero);const s=G.state,level=scenario==='contest'?35:40,c=ARPIA_MIDTERM.chapters.find(c=>c.number===40);
  Object.assign(s,{stage:974,level,xpTotal:30*level*(level-1),maxHp:[100,82,94][hero]+12*(level-1),maxMp:[24,36,29][hero]+5*(level-1),spell:true,spellLevel:3,pet:false,pet2:false});s.hp=s.maxHp;s.mp=s.maxMp;ARPIA_SYS.sp.syncLegacy(s);s.inv.hipotion=10;s.inv.hiether=5;
  let turns=0,enemyTurns=0,seconds=0;
  const drain=()=>{for(let i=0;G.dialog&&i<100;i++)G.next();};
  const fight=()=>{ok(G.battle,'missing battle');const initial=G.battle.enemies.map(e=>e.maxHp);ok(initial.every(n=>n>800),'test altered health');
   for(let tick=0;G.battle&&tick<12000;tick++){
    const b=G.battle;G.stepBattle(.1);seconds+=.1;if(!G.battle)break;
    enemyTurns=Math.max(enemyTurns,b.enemyTurns);if(b.ready&&b.lock<=0){turns++;if(s.hp<s.maxHp*.35&&s.inv.hipotion)G.action('item','hipotion');else if(s.mp<10&&s.inv.hiether)G.action('item','hiether');else if(b.p?.silence||s.mp<3)G.action('attack');else G.action('magic');}
   }
   ok(!G.battle,'combat stalled');ok(!document.getElementById('retry'),'lost battle');G.close();
  };
  if(scenario==='contest'){s.fm_pet_contest2=1;s.errandVersion=4;s.errand_pet_contest2=1;
   for(let i=0;i<5;i++){G.travel('petColosseum');G.interact('petContestRing');drain();fight();ok(s.errand_pet_contest2===i+2,'contest progress');}
  }else{s.stage=c.keys[scenario==='hunger'?'confront':'hinaDuel'];G.travel('hungerHouse40');G.interact(scenario);drain();fight();}
  logs.push('PASS hero '+hero+' '+scenario+' Lv.'+level+' turns='+turns+' elapsed='+Math.round(seconds)+'s hp='+s.hp+'/'+s.maxHp+' usedPotions='+(10-(s.inv.hipotion||0)));out.textContent=logs.join('\n');
 }
 out.textContent+='\nALL PASS: actual HP and damage, natural ATB, three elements, two chapter 40 duels and five contest rounds; no pet assistance. This is targeted combat verification, not a whole-game balance certification.';
 }catch(e){out.textContent=logs.join('\n')+'\nFAIL '+e.stack;}
};
