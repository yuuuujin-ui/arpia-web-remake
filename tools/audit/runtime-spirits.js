document.getElementById('test-run').onclick=async()=>{
 const out=document.getElementById('test-output'),logs=[],ok=(v,m)=>{if(!v)throw Error(m);};
 try{const G=ARPIA;for(let i=0;!G.ready&&i<100;i++)await new Promise(r=>setTimeout(r,100));G.newGame();const s=G.state,S=ARPIA_CAPTURE_SPIRITS,I=ARPIA_SYS.inv;
 Object.assign(s,{stage:974,level:60,hp:1400,maxHp:1400,mp:500,maxMp:500,spell:true});
 const drain=()=>{for(let i=0;G.dialog&&i<100;i++)G.next();ok(!G.dialog,'dialog stuck');};
 const visit=(scene,id)=>{G.close();G.travel(scene);const e=G.scene.entities.find(e=>e.id===id);ok(e,'missing '+scene+'/'+id);if(G.scene.tilemap||G.scene.walkmask)ok(ARPIA_TILEMAP.plan(G.scene,{x:s.x,y:s.y},e)?.length,'unreachable '+id+' '+e.x+','+e.y);G.interact(id);if(!document.querySelector('[data-choice="accept"]'))drain();};
 const accept=()=>{document.querySelector('[data-choice="accept"]').click();drain();};
 const win=()=>{ok(G.battle,'battle missing');for(let i=0;G.battle&&i<90;i++){G.battle.enemies.forEach(e=>e.hp=Math.min(1,e.hp));G.battle.ready=true;G.battle.lock=0;G.action('attack');}ok(!G.battle,'battle stuck');G.close();};
 const field=(name,n)=>ARPIA_FREE.victory(s,{spec:{repeatable:true},enemies:Array.from({length:n},()=>({name,hp:0}))});
 visit('earthvillage','laura');accept();ok(I.count(s,'earthLoanKey')===1,'borrow key');visit('earthdungeon','rotiFree');ok(s.earthPhase===1,'Roti trial');visit('earthdungeon','rotiFree');ok(s.earthPhase===1,'trial skipped');
 for(const[key,,id,name]of S.trials){field(name,14);visit('earthdungeon',id);ok(G.battle.enemies.length===1,'trial final count');win();ok(s[key]===15,'trial counter '+key);}
 visit('earthdungeon','rotiFree');ok(s.earthPhase===2,'permission');const soil=I.count(s,'spirit_soil');visit('earthdungeon','earthSpiritKing');win();ok(s.earthPhase===3&&I.count(s,'spirit_soil')===soil,'soil entry toll');visit('earthdungeon','earthSpiritKing');visit('earthdungeon','rotiFree');const sp=s.sp;visit('earthvillage','laura');ok(s.fm_earth_king===0&&s.fd_earth_king===1&&s.sp===sp+10&&!I.count(s,'earthLoanKey')&&!I.count(s,'spirit_soil'),'earth completion');logs.push('PASS borrowed key, three 15-kill trials, final remainder, no soil toll, king thanks, Roti, return key/soil, repeat');
 visit('icevillage','iceChief');accept();visit('icedungeon','claudieFree');ok(s.icePhase===1,'Claudie');visit('hut','odangka');ok(s.icePhase===1,'recipe shortage');
 visit('icedungeon','iceTrialPatrol');win();visit('forest','grapeDragonPatrol');win();ok(I.count(s,'spiritGrape')===1,'hunted grape');
 s.gold=999;visit('campus','spiritGrapeMerchant');accept();ok(s.gold===999&&I.count(s,'spiritGrape')===1,'insufficient money charged');s.gold=1000;visit('campus','spiritGrapeMerchant');accept();ok(s.gold===0&&I.count(s,'spiritGrape')===6,'five grapes/1000');
 s.inv.icepiece=19;s.inv.iceblood=16;visit('hut','odangka');ok(s.icePhase===2&&I.count(s,'iceJewel')===16&&I.count(s,'icepiece')===3&&!I.count(s,'iceblood')&&I.count(s,'spiritGrape')===1,'paired recipe');logs.push('PASS material battles, hunt or purchase grapes, shortage guard, 5/1000 shop, 19+16 → 16 jewels, leftovers');
 visit('icedungeon','iceSpiritKing');ok(G.battle&&s.iceJewelOffered===16&&!I.count(s,'iceJewel'),'jewel offering');
 // Re-entering the same challenge after a failed attempt must not consume another offering.
 const fake={state:s,save(){},refresh(){},talk(lines,done){done?.();},battle(){this.entered=true;}};ARPIA_FREE.interact({id:'iceSpiritKing'},fake);ok(fake.entered&&s.iceJewelOffered===16,'retry requires second offering');win();ok(s.icePhase===3,'ice battle');visit('icedungeon','iceSpiritKing');const iceSp=s.sp;visit('icevillage','iceChief');ok(s.fm_ice_king===0&&s.fd_ice_king===1&&s.sp===iceSp+10&&s.stage===974,'ice completion');logs.push('PASS one-time jewel offering, retry, king dialogue, chief report, 10 SP, main preserved');
 const old={...JSON.parse(JSON.stringify(s)),spiritRouteVersion:0,inv:{},fm_earth_king:1,fo_earth_king:1,fm_ice_king:2,fo_ice_king:1};S.migrate(old);ok(old.inv.spirit_soil===2&&old.inv.icepiece===1&&old.inv.iceblood===1&&old.icePhase===4,'legacy refund');S.migrate(old);ok(old.inv.spirit_soil===2,'duplicate refund');logs.push('PASS legacy entry-fee refund occurs once');
 out.textContent=logs.join('\n')+'\nALL PASS';
 }catch(e){out.textContent=logs.join('\n')+'\nFAIL '+e.stack;}
};
