document.getElementById('test-run').onclick=async()=>{
 const out=document.getElementById('test-output'),logs=[],ok=(v,m)=>{if(!v)throw Error(m);};
 try{const G=ARPIA;for(let i=0;!G.ready&&i<100;i++)await new Promise(r=>setTimeout(r,100));G.newGame();const s=G.state,C=ARPIA_CAPTURE_CATALOG;
 Object.assign(s,{stage:974,level:60});G.travel('classroom');const e=G.scene.entities.find(e=>e.id==='aron');ok(e,'teacher missing');ok(ARPIA_TILEMAP.plan(G.scene,{x:s.x,y:s.y},e)?.length,'teacher path');
 G.interact('aron');document.querySelector('[data-choice="accept"]').click();const drain=()=>{for(let i=0;G.dialog&&i<100;i++)G.next();};drain();
 const field=names=>ARPIA_FREE.victory(s,{spec:{repeatable:true},enemies:names.map(name=>({name,hp:0}))});
 ARPIA_FREE.victory(s,{spec:{},enemies:[{name:'들쥐',hp:0}]});ok(s.catalogMask===0,'non-field counted');field(Array(10).fill('들쥐'));ok(s.fc_aron_catalog===1&&s.fm_aron_catalog===1,'duplicate species');
 const wild=createArpiaEncounters(),names=new Set(Object.values(wild.tables).flatMap(t=>t.groups.flatMap(g=>g.map(m=>C.aliases[m[0]]||m[0]))));ok(C.species.every(n=>names.has(n)),'species unavailable in fields');logs.push('PASS all 15 species obtainable, duel excluded, repeats counted once');
 field(C.species.slice(0,14));ok(s.fm_aron_catalog===1&&s.fc_aron_catalog===14,'incomplete prematurely ready');G.interact('aron');drain();ok(s.fm_aron_catalog===1,'report skipped missing species');field(['아이스 골렘']);ok(s.fm_aron_catalog===2,'all species not ready');
 const sp=s.sp;G.interact('aron');drain();ok(s.sp===sp+50&&s.own_boots&&s.fm_aron_catalog===9&&s.stage===974,'completion');logs.push('PASS 15 unique samples, report guard, 50 SP, metal shoes, main preserved');
 const old={fm_aron_catalog:2,catalogVersion:0,catalogMask:0};C.migrate(old);ok(old.fm_aron_catalog===1,'old numeric progress migration');const done={fm_aron_catalog:9,catalogVersion:0};C.migrate(done);ok(done.fm_aron_catalog===9,'completed history erased');logs.push('PASS old incomplete and completed saves');
 out.textContent=logs.join('\n')+'\nALL PASS';
 }catch(e){out.textContent=logs.join('\n')+'\nFAIL '+e.stack;}
};