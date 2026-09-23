document.getElementById('test-run').onclick=async()=>{
 const out=document.getElementById('test-output'),logs=[],ok=(v,m)=>{if(!v)throw Error(m);};
 try{
  const G=ARPIA,x=ARPIA_EXTRA;for(let i=0;!G.ready&&i<100;i++)await new Promise(r=>setTimeout(r,100));G.newGame();const s=G.state;
  Object.assign(s,{level:60,maxHp:500,hp:500,maxMp:200,mp:200,spell:true,mineGateOpen:true,starGateOpen:true});
  const drain=()=>{for(let i=0;G.dialog&&i<150;i++)G.next();};
  const win=()=>{for(let i=0;G.battle&&i<60;i++){G.battle.enemies.forEach(e=>e.hp=Math.min(e.hp,1));G.battle.ready=true;G.battle.lock=0;G.action('attack');}ok(!G.battle,'battle stalled');G.close();};
  s.stage=105;G.travel('palaceTrapRoom8');
  for(let i=0;i<2;i++){G.interact('palaceTrapChest'+i);drain();ok(G.battle,'missing trap');win();ok(s.stage===105,'trap advanced story');G.interact('palaceTrapChest'+i);drain();ok(!G.battle,'trap repeated');}
  logs.push('PASS two independent chest traps, no story skip, no repeated farming');
  s.stage=154;G.travel('vault11');G.interact('codedchest');document.querySelectorAll('#puzzle-choices button')[0].click();ok(s.stage===154,'wrong chest skipped');document.querySelectorAll('#puzzle-choices button')[5].click();drain();ok(s.stage===155&&s.codedLetter,'letter missing');logs.push('PASS letter search');
  s.stage=200;G.travel('schoolChests');ok(G.scene.entities.filter(e=>/^schoolChest/.test(e.id)).length===7,'seven chests');G.interact('schoolChest0');drain();ok(s.stage===200,'empty chest skipped');G.interact('schoolChest5');drain();ok(s.stage===201&&s.pomegranate,'fruit missing');logs.push('PASS seven-chest room and pomegranate');
  s.stage=225;G.travel('koboldroom');G.interact('soyjar');document.querySelectorAll('#puzzle-choices button')[0].click();drain();ok(G.battle,'jar trap missing');win();ok(s.stage===225&&s.jarTrapCleared13,'jar trap skipped story');G.interact('soyjar');document.querySelectorAll('#puzzle-choices button')[1].click();ok(s.stage===226&&s.soySauce,'soy sauce missing');logs.push('PASS wrong jar fight and correct jar');
  const f={...s,inv:{},errand_flame_hunt:1,fishPhase:2,octopusPhase:1,fm_flame_hunt:1,fm_octopus:1,fm_fish_village:1,fm_aron_catalog:1,fc_flame_hunt:0,fc_octopus:0,fc_fish_village:0,fc_aron_catalog:0,freeFishOctopus:0,freeFishSquid:0};
  ARPIA_FREE.victory(f,{spec:{},enemies:[{name:'아이작',hp:0}]});ok(f.fc_flame_hunt===0&&f.fc_octopus===0&&f.fc_aron_catalog===0,'friendly duel counted');
  ARPIA_FREE.victory(f,{spec:{repeatable:true},enemies:[{name:'포악한 문어',hp:0},{name:'먹물 오징어',hp:0},{name:'불꽃군',hp:0}]});ok(f.fc_octopus===1&&f.fc_flame_hunt===1&&f.freeFishOctopus===1&&f.freeFishSquid===1,'species counts');logs.push('PASS hunt species and friendly duel exclusion');
  G.close();s.stage=311;G.travel('oldlibrary');const target=x.quests[311-42][3];G.interact(target);ok(document.querySelectorAll('[data-difference]').length===6,'portrait controls');out.textContent=logs.join('\n')+'\nALL PASS; portrait left open for visual inspection.';
 }catch(e){out.textContent=logs.join('\n')+'\nFAIL '+e.stack;}
};
