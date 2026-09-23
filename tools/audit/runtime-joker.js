document.getElementById('test-run').onclick=async()=>{
 const logs=[],out=document.getElementById('test-output'),ok=(v,m)=>{if(!v)throw Error(m);};
 try{
 const G=ARPIA;for(let i=0;!G.ready&&i<100;i++)await new Promise(r=>setTimeout(r,100));G.newGame();const s=G.state,J=ARPIA_CAPTURE_JOKER;
 Object.assign(s,{stage:974,level:60,maxHp:1200,hp:1200,maxMp:400,mp:400,spell:true,spellLevel:3,mineGateOpen:true,starGateOpen:true,diveLocationKnown:true});
 const drain=()=>{for(let i=0;G.dialog&&i<100;i++)G.next();ok(!G.dialog,'dialog stalled');};
 const visit=(scene,id)=>{G.close();G.travel(scene);const e=G.scene.entities.find(e=>e.id===id);ok(e,'missing '+id);if(G.scene.tilemap||G.scene.walkmask)ok(ARPIA_TILEMAP.plan(G.scene,{x:s.x,y:s.y},e)?.length,'path '+id);G.interact(id);if(!document.querySelector('[data-choice="accept"]'))drain();};
 visit('curiousmansion','joker');document.querySelector('[data-choice="accept"]').click();drain();ok(s.fm_joker_relief===1,'accept');
 visit('curiousmansion','joker');ok(s.reliefPhase===0,'shortage skipped');ok(!ARPIA_EXTRA.questItems(s).some(i=>i[0]==='마법 휴지'),'phantom tissue');logs.push('PASS acceptance, shortage, no phantom item');
 for(const r of J.gather){for(let n=0;n<r.total;n++)visit(r.scene,r.id);ok(ARPIA_SYS.inv.count(s,r.id)===r.total,'count '+r.id);G.travel(r.scene);ok(!G.scene.entities.some(e=>e.id===r.id),'gather cap '+r.id);logs.push('PASS '+r.id+' '+r.total);}
 visit('curiousmansion','joker');ok(s.reliefPhase===1,'mix');ok(J.gather.every(r=>!ARPIA_SYS.inv.count(s,r.id)),'consumption');
 visit('gluglutemple','gluglu');ok(s.reliefPhase===2,'temple');visit('reliefArena','reliefMeteor');ok(G.battle,'Meteor missing');
 for(let i=0;G.battle&&i<90;i++){G.battle.enemies.forEach(e=>e.hp=Math.min(1,e.hp));G.battle.ready=true;G.battle.lock=0;G.action('attack');}ok(!G.battle&&s.reliefPhase===3&&s.inv.reliefTissue===1,'tissue reward');
 const sp=s.sp;visit('curiousmansion','joker');ok(s.sp===sp+150&&!s.inv.reliefTissue&&s.fd_joker_relief===1&&s.fm_joker_relief===0,'finish');ok(s.stage===974,'main altered');logs.push('PASS recipe consumed, Meteor, tissue, 150 SP, main preserved');
 visit('curiousmansion','joker');document.querySelector('[data-choice="accept"]').click();drain();ok(s.reliefPhase===0&&J.gather.every(r=>!s.inv[r.id]),'repeat state');logs.push('PASS repeat starts without previous materials');
 out.textContent=logs.join('\n')+'\nALL PASS';
 }catch(e){out.textContent=logs.join('\n')+'\nFAIL '+e.stack;}
};