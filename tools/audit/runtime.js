const out=document.getElementById('test-output'),faults=[];
window.addEventListener('error',e=>faults.push(e.message));
const check=(ok,msg)=>{if(!ok)throw Error(msg);};
document.getElementById('test-run').onclick=async()=>{
 const logs=[];
 try{
  const G=ARPIA,x=ARPIA_EXTRA,m=ARPIA_MIDTERM,c=n=>m.chapters.find(v=>v.number===n);
  for(let i=0;!G.ready&&i<100;i++)await new Promise(r=>setTimeout(r,200));check(G.ready,'load');
  G.newGame();const s=G.state;Object.assign(s,{level:60,maxHp:500,hp:500,maxMp:200,mp:200,spell:true,spellLevel:3,starGateOpen:true,enemyPrisonAccess:true,diveActive:false});
  const drain=()=>{for(let i=0;G.dialog&&i<100;i++)G.next();};
  const win=()=>{for(let i=0;G.battle&&i<50;i++){const b=G.battle;b.enemies.forEach(e=>{if(e.hp>0)e.hp=1;});b.ready=true;b.lock=0;G.action('attack');}check(!G.battle,'victory stalled');G.close();};
  function step(n,r){
   const start=s.stage;G.close();s.hp=s.maxHp;s.mp=s.maxMp;G.travel(r.scene);check(G.scene.id===r.scene,'travel denied '+n+'/'+r.key);
   const targets=G.scene.entities.filter(e=>e.id===r.npc);check(targets.length===1,'goal '+n+'/'+r.key+' count '+targets.length);
   const target=targets[0];if(G.scene.tilemap||G.scene.walkmask){const route=ARPIA_TILEMAP.plan(G.scene,{x:s.x,y:s.y},target);check(route?.length,'route '+n+'/'+r.key);}
   for(let repeat=0;s.stage===start&&repeat<12;repeat++){
    G.interact(r.npc);drain();
    if(r.choose){document.querySelectorAll('#puzzle-choices button')[r.choose[3]].click();drain();}
    if(r.battle){check(G.battle?.encounter===r.battle,'encounter '+r.key);win();}
   }
   check(s.stage===start+1,'advance '+n+'/'+r.key+' '+s.stage+'/'+start);logs.push('PASS '+n+'/'+r.key);out.textContent=logs.join('\n');
  }
  s.stage=112;
  while(s.stage<133){
   const at=s.stage,q=x.quests[at-42];G.close();G.travel(q[2]);check(G.scene.id===q[2],'9 scene '+at);
   check(G.scene.entities.filter(e=>e.id===q[3]).length===1,'9 goal '+at);
   G.interact(q[3]);drain();if(at===125){document.querySelector('#puzzle-choices button').click();drain();}
   check(s.stage===at+1,'9 advance '+at);logs.push('PASS 9/stage'+at);
  }
  s.stage=197;s.exchangePin=50000;G.close();G.travel('minedepths');G.interact('guillaume');drain();check(s.fairySearch12&&!s.fairyMedicine&&s.stage===197,'12 premature medicine');
  G.travel('dwarfpalace');check(G.scene.entities.some(e=>e.id==='fairyMedicine12'),'12 medicine location');G.interact('fairyMedicine12');drain();check(s.fairyFound12&&s.stage===197,'12 search');
  G.travel('minedepths');G.interact('guillaume');drain();check(s.fairyMedicine&&s.stage===198,'12 return');logs.push('PASS 12/fairy medicine search and return');
  // Complete each changed encounter through the same UI/engine callbacks as normal play.
  s.stage=204;step(12,{key:'waitmonsters',scene:'ghostforest',npc:'waitmonsters',battle:'waitmonsters'});check(s.huntCount12===10,'12 count');
  for(const [n,key]of [[18,'golem'],[19,'edwardChallenge'],[20,'beginner'],[20,'beginner2'],[20,'beginner3'],[20,'captureBattle'],[20,'advanced'],[20,'golem'],[23,'trap'],[24,'glugluBattle'],[26,'monster']]){
   const r=c(n).steps.find(r=>r.key===key);check(r,'unknown row '+n+'/'+key);s.stage=c(n).keys[key];step(n,r);
  }
  s.stage=c(28).start;for(const r of c(28).steps)step(28,r);check(s.searchRooms28===31,'search mask');check(s.dobielRescued28,'rescue');
  s.stage=c(29).keys.yard;step(29,c(29).steps.find(r=>r.key==='yard'));check(s.huntCount29===10,'29 count');
  for(const key of ['dobiel','waterfallBypass','seaweed']){const r=c(30).steps.find(r=>r.key===key);s.stage=c(30).keys[key];s.dogForm30=true;step(30,r);}
  s.dogForm30=false;s.inv.mt_lavaLadle34=1;s.stage=c(34).keys.returnLadle;step(34,c(34).steps.find(r=>r.key==='returnLadle'));
  check(faults.length===0,faults.join('; '));out.textContent='PASS: capture correction gameplay\n'+logs.join('\n');
 }catch(e){out.textContent='FAIL: '+e.message+'\n'+logs.join('\n');}
};
