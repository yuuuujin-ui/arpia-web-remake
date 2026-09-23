const errors=[];window.addEventListener('error',e=>errors.push(e.message));
document.getElementById('test-run').onclick=async()=>{
 const out=document.getElementById('test-output'),logs=[],ok=(v,msg)=>{if(!v)throw Error(msg);};
 try{
  const G=ARPIA,C=ARPIA_CAPTURE_FREE;for(let i=0;!G.ready&&i<100;i++)await new Promise(r=>setTimeout(r,100));ok(G.ready,'ready');
  G.newGame();const s=G.state;Object.assign(s,{stage:832,level:60,rank:2,maxHp:2000,hp:2000,maxMp:500,mp:500,spell:true,mineGateOpen:true,starGateOpen:true});
  const drain=()=>{for(let i=0;G.dialog&&i<150;i++)G.next();ok(!G.dialog,'dialog stuck');};
  const win=()=>{for(let i=0;G.battle&&i<60;i++){G.battle.enemies.forEach(e=>{if(e.hp>0)e.hp=1;});G.battle.ready=true;G.battle.lock=0;G.action('attack');}ok(!G.battle,'battle stuck');G.close();};
  for(const kind of ['wood','mage']){
   const rows=C[kind],field=kind+'Route',id=kind==='wood'?'firewood':'exam_mage';
   let rounds=0;
   do{
    const before=s[field]||0,r=rows[before];ok(r,'bad route '+kind+before);G.close();G.travel(r[0]);
    const e=G.scene.entities.find(e=>e.id===r[1]);ok(e,'missing '+kind+' '+before+' '+r[1]);
    ok(ARPIA_FREE.objective(s,e),'missing objective '+kind+before);
    if(G.scene.tilemap||G.scene.walkmask)ok(ARPIA_TILEMAP.plan(G.scene,{x:s.x,y:s.y},e)?.length,'unreachable '+kind+before);
    G.interact(r[1]);const accept=document.querySelector('[data-choice="accept"]');if(accept)accept.click();drain();
    if(G.battle){if(kind==='mage'&&before===5){ok(G.battle.enemies.length===Math.min(3,10-(s.mageGolems||0)),'remaining golems');}win();}
    ok(s.stage===832,'free mission changed main stage');
    if(s['fd_'+id]){logs.push('PASS '+kind+' complete');break;}
    ok(s[field]===before+1||(kind==='mage'&&before===5&&s[field]===5),'stuck '+kind+before+' => '+s[field]);
    logs.push('PASS '+kind+' '+before+' '+r[2]);out.textContent=logs.join('\n');
    ok(++rounds<40,'loop');
   }while(true);
   if(kind==='wood'){
    ok(['fw_ore','fw_axe','fw_sharpaxe','fw_bundle'].every(id=>!ARPIA_SYS.inv.count(s,id)),'wood consumed');
    ok(s.fm_firewood===0&&s.fd_firewood===1,'repeatable completed');
   }else{
    ok(s.rank===3&&s.fm_exam_mage===9&&s.fd_exam_mage===1,'rank result');ok(s.mageGolems===10,'ten golems');
    ok(['mage_letter','mage_supplies','mage_recommendation'].every(id=>!ARPIA_SYS.inv.count(s,id)),'exam consumed');
   }
  }
  const old={fm_exam_mage:2,fm_firewood:1,rank:2,fd_firewood:3};C.migrate(old);ok(old.mageRoute===1&&old.woodRoute===1&&old.fd_firewood===3,'old active migration');
  const complete={fm_exam_mage:9,rank:3,fd_exam_mage:1};C.migrate(complete);ok(complete.rank===3&&complete.fm_exam_mage===9,'completed migration');
  ok(!errors.length,errors.join('; '));out.textContent=logs.join('\n')+'\nALL PASS: both free mission routes, actual 10 golems, item lifecycle, rank and repeat rewards, save migration, routes.';
 }catch(e){out.textContent=logs.join('\n')+'\nFAIL '+e.stack;}
};
