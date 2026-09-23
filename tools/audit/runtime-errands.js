document.getElementById('test-run').onclick=async()=>{
 const out=document.getElementById('test-output'),logs=[],ok=(v,m)=>{if(!v)throw Error(m);};
 try{const G=ARPIA;for(let i=0;!G.ready&&i<100;i++)await new Promise(r=>setTimeout(r,100));const E=ARPIA_CAPTURE_ERRANDS;
 for(const id of Object.keys(E.routes)){
  G.newGame();const s=G.state;Object.assign(s,{stage:974,level:60,hp:1200,maxHp:1200,mp:400,maxMp:400,spell:true});if(id==='hubert2')s.fm_hubert1=9;
  const drain=()=>{for(let i=0;G.dialog&&i<100;i++)G.next();ok(!G.dialog,'dialog stalled');};
  const win=()=>{ok(G.battle,'battle missing');for(let i=0;G.battle&&i<90;i++){G.battle.enemies.forEach(e=>e.hp=Math.min(e.hp,1));G.battle.ready=true;G.battle.lock=0;G.action('attack');}ok(!G.battle,'battle stalled');G.close();};
  const startSp=s.sp; const startPotions=s.potions;
  for(let loop=0;s['fm_'+id]!==9&&loop<30;loop++){
   const at=s['errand_'+id]||0,r=E.routes[id][at];G.close();G.travel(r.scene);const e=G.scene.entities.find(e=>e.id===r.npc);ok(e,'missing '+id+'/'+r.npc);if(G.scene.tilemap||G.scene.walkmask)ok(ARPIA_TILEMAP.plan(G.scene,{x:s.x,y:s.y},e)?.length,'unreachable '+r.npc+' '+e.x+','+e.y);
   if(r.hunt){
    if(id==='flame_hunt'){const keep=s.fc_flame_hunt;ARPIA_FREE.victory(s,{spec:{repeatable:true},enemies:[{name:'불꽃 골렘',hp:0},{name:'불꽃군',hp:10}]});ok(s.fc_flame_hunt===keep,'wrong species or living enemy counted');}
    const before=s[r.hunt.field];ARPIA_FREE.victory(s,{spec:{},enemies:[{name:'연잎니그로',hp:0}]});ok(s[r.hunt.field]===before,'duel counted');
    const names=id==='deren_ghost'?Array(14).fill('연잎니그로').concat(Array(14).fill('유령마')):Array(r.hunt.max-1).fill(r.hunt.species||'들쥐');
    ARPIA_FREE.victory(s,{spec:{repeatable:true},enemies:names.map(name=>({name,hp:0}))});ok(s['errand_'+id]===at,'hunt advanced early');
   }
   G.interact(r.npc);const accept=document.querySelector('[data-choice="accept"]');if(accept)accept.click();drain();
   if(G.battle){if(r.hunt)ok(G.battle.enemies.length===(r.hunt.second?2:1),'remaining enemies');win();}
   ok(s['errand_'+id]===at+1,'double or missing advance '+id+'/'+at+' → '+s['errand_'+id]);ok(s.stage===974,'main changed');logs.push('PASS '+id+'/'+at+' '+r.title);
  }
  ok(s['fm_'+id]===9&&s['fd_'+id]===1&&s.sp===startSp+E.defs[id].sp,'completion '+id);
  if(id==='mail')ok(!s.inv.mailRoughDiamond,'mail item consumed');if(id==='egg')ok(!s.inv.eggManaStone&&s.potions===startPotions,'egg item consumed, exact reward');
  if(id==='ryoma_staff')ok(s.staffFirstKills===100&&s.staffSecondKills===50&&!s.inv.staffWood&&!s.inv.ryomaNewStaff&&!s.own_staff_plus,'staff lifecycle');
 }
 const old={fm_ryoma_staff:2,fc_ryoma_staff:100,fm_hubert1:2,fm_hubert2:9,fm_deren_ghost:1};E.migrate(old);ok(old.errand_ryoma_staff===3&&old.staffFirstKills===100&&old.errand_hubert1===3&&old.fm_hubert2===9,'migration');
 for(const id of ['mail','egg'])for(let v=1;v<(id==='mail'?4:9);v++){const legacy=JSON.parse(JSON.stringify(G.state));Object.assign(legacy,{errandVersion:1,['fm_'+id]:v,fc_egg:0});delete legacy.inv.mailRoughDiamond;delete legacy.inv.eggManaStone;E.migrate(legacy);ok(legacy['fm_'+id]===1,'legacy state '+id+'/'+v);if(id==='mail'&&v===3)ok(legacy.inv.mailRoughDiamond===1,'legacy diamond');if(id==='egg'&&v===6)ok(legacy.inv.eggManaStone===1,'legacy stone');const snapshot=JSON.stringify(legacy);E.migrate(legacy);ok(JSON.stringify(legacy)===snapshot,'migration repeated');}for(const v of [1,2,9]){const legacy={errandVersion:3,fm_flame_hunt:v,fc_flame_hunt:v===1?4:10};E.migrate(legacy);ok(v===9?legacy.fm_flame_hunt===9:legacy.errand_flame_hunt===(v===2?2:1),'flame save migration');}logs.push('PASS mail/egg legacy phases and one-time item recovery; flame progress preserved');
 out.textContent=logs.join('\n')+'\nALL PASS: staff 100/50 hunts, item delivery, two patients, 15+15 maze, Edward, eight rewards, mail/egg item lifecycles, five contest rounds, paths, save migration.';
 }catch(e){out.textContent=logs.join('\n')+'\nFAIL '+e.stack;}
};
