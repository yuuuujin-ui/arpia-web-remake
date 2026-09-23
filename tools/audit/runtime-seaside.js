document.getElementById('test-run').onclick=async()=>{
 const out=document.getElementById('test-output'),logs=[],ok=(v,m)=>{if(!v)throw Error(m);};
 try{const G=ARPIA;for(let i=0;!G.ready&&i<100;i++)await new Promise(r=>setTimeout(r,100));G.newGame();const s=G.state;
 Object.assign(s,{stage:974,level:60,hp:1200,maxHp:1200,mp:400,maxMp:400});
 const drain=()=>{for(let i=0;G.dialog&&i<100;i++)G.next();ok(!G.dialog,'dialog stalled');};
 const visit=(scene,id)=>{G.close();G.travel(scene);const e=G.scene.entities.find(e=>e.id===id);ok(e,'missing '+scene+'/'+id);if(G.scene.tilemap||G.scene.walkmask)ok(ARPIA_TILEMAP.plan(G.scene,{x:s.x,y:s.y},e)?.length,'path '+id);G.interact(id);if(!document.querySelector('[data-choice="accept"]'))drain();};
 const accept=()=>{document.querySelector('[data-choice="accept"]').click();drain();};
 const win=()=>{ok(G.battle,'battle missing');for(let i=0;G.battle&&i<90;i++){G.battle.enemies.forEach(e=>e.hp=Math.min(1,e.hp));G.battle.ready=true;G.battle.lock=0;G.action('attack');}ok(!G.battle,'battle stalled');G.close();};
 const field=(name,n)=>ARPIA_FREE.victory(s,{spec:{repeatable:true},enemies:Array.from({length:n},()=>({name,hp:0}))});
 visit('judah','puki');accept();visit('classroom','julia');accept();field('포악한 문어',3);ok(!s.fc_octopus&&!s.freeFishOctopus,'counted before instruction');
 visit('freeNorthLake','nakkeFree');ok(s.fishPhase===1,'Nakke');visit('freeSharkRoom','sharkFree');ok(s.fishPhase===2,'Shark');visit('kingdom','matilda');ok(s.octopusPhase===1,'Matilda');logs.push('PASS Puki → Nakke → Shark and Julia → Matilda, no pre-hunt credit');
 visit('freeSharkRoom','sharkFree');ok(s.fishPhase===2,'early report');visit('kingdom','matilda');ok(s.fm_octopus===1,'early octopus finish');
 visit('fishshoreRelief','seaOctopus');ok(G.battle.enemies.length===3,'first patrol size');win();ok(s.fc_octopus===3&&s.freeFishOctopus===3,'actual fight not counted for both');
 field('포악한 문어',26);ok(s.fc_octopus===29&&s.freeFishOctopus===29,'count drift');const sp=s.sp;
 visit('fishshoreRelief','seaOctopus');win();ok(s.fc_octopus===30&&s.freeFishOctopus===32,'caps');visit('kingdom','matilda');ok(s.fm_octopus===9&&s.sp===sp+80,'Matilda reward');logs.push('PASS shared live battle credit, missing guard, 30 octopuses, Matilda 80 SP');
 field('포악한 문어',17);visit('fishshoreRelief','seaOctopus');ok(G.battle.enemies.length===1,'last octopus remainder');win();ok(s.freeFishOctopus===50&&s.freeFishSquid===0,'species separation');
 field('포악한 오징어',49);visit('fishshoreRelief','seaSquid');ok(G.battle.enemies.length===1,'last squid remainder');win();ok(s.freeFishSquid===50&&s.fc_fish_village===100,'squid count');
 visit('freeSharkRoom','sharkFree');ok(s.fishPhase===3&&s.fm_fish_village===1,'Shark report');const rewardSp=s.sp;visit('petcenter','woody');ok(s.fm_fish_village===9&&s.sp===rewardSp+200,'Woody reward');const moth=s.pets.find(p=>p.id==='moth');ok(moth&&moth.lv===1,'lv1 pet missing');ok(s.stage===974,'main changed');logs.push('PASS 50+50, one-enemy final groups, Shark → Woody, level-1 moth, 200 SP, main preserved');
 const old={fm_fish_village:2,freeFishOctopus:50,freeFishSquid:50,fm_octopus:2,fc_octopus:30};ARPIA_CAPTURE_SEASIDE.migrate(old);ok(old.fishPhase===0&&old.fm_fish_village===1&&old.fc_octopus===30,'legacy migration');const done={fm_fish_village:9,fm_octopus:9};ARPIA_CAPTURE_SEASIDE.migrate(done);ok(done.fm_fish_village===9&&done.fm_octopus===9,'completed history');logs.push('PASS old counters retained; NPC route restored; completed saves preserved');
 for(const src of ['assets/story-icons/star-cake.svg','assets/story-icons/broken-star-cake.svg','assets/original/pet-images/poisonFish/idle1.gif']){const image=new Image();image.src=src;await image.decode();ok(image.naturalWidth>0,'decode '+src);}logs.push('PASS cake icons and sea creature art decode');
 out.textContent=logs.join('\n')+'\nALL PASS';
 }catch(e){out.textContent=logs.join('\n')+'\nFAIL '+e.stack;}
};
