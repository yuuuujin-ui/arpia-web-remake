/* Original game systems layered on the engine: inventory & drops, spell book & lessons,
   rank exams, pets (roster, evolution, skills, facilities), status effects & allies,
   facilities (my room, codex, colosseum, mailbox, teleport, quiz), migrations.
   game.js delegates battle actions and panels here through ARPIA_SYS. */
window.ARPIA_SYS=(()=>{
 const D=window.ARPIA_DATA,X=window.ARPIA_EXTRA,A='assets/original/';
 const ELS=['불꽃','얼음','대지'],COLORS=['#f28b45','#70cee2','#9acc69'];
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const esc=t=>String(t).replace(/[<>&]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]));
 // ------------------------------------------------------------ save migration
 Object.assign(X.defaults,{rank:0,colWins:0,colBest:0,quizAt:0,quizScore:0,spaAt:0,licenseUntil:0,tp_fire:false,tp_ice:false,tp_earth:false,studyAt:0,plantStage:0,plantAt:0,examNovice:false,examSkilled:false,examMage:false,humphreyCrest:false});
 function migrate(d,src){
  src=src||d;
  d.inv=(src.inv&&typeof src.inv==='object'&&!Array.isArray(src.inv))?Object.fromEntries(Object.entries(src.inv).filter(([k,v])=>D.ITEMS[k]&&Number.isFinite(v)&&v>0).map(([k,v])=>[k,Math.min(9999,Math.floor(v))])):{};
  d.spells=(src.spells&&typeof src.spells==='object')?Object.fromEntries(Object.entries(src.spells).filter(([k,v])=>D.SPELL[k]&&v&&typeof v==='object').map(([k,v])=>[k,{lv:clamp(Math.floor(v.lv||0),0,3),prog:clamp(Math.floor(v.prog||0),0,20)}])):{};
  d.room=(src.room&&typeof src.room==='object'&&Array.isArray(src.room.placed))?{placed:src.room.placed.filter(x=>x===null||D.ITEMS[x]).slice(0,8)}:{placed:[]};
  while(d.room.placed.length<8)d.room.placed.push(null);
  d.codex=(src.codex&&typeof src.codex==='object')?{mon:{...(src.codex.mon||{})},items:{...(src.codex.items||{})}}:{mon:{},items:{}};
  d.pets=Array.isArray(src.pets)?src.pets.filter(p=>p&&D.PET[p.id]).map(p=>normPet(p)):[];
  d.party=Array.isArray(src.party)?src.party.filter(i=>Number.isInteger(i)&&i>=0&&i<d.pets.length).slice(0,2):[];
  d.mailRead=Array.isArray(src.mailRead)?src.mailRead.filter(x=>typeof x==='string'):[];
  d.gatherAt=(src.gatherAt&&typeof src.gatherAt==='object')?{...src.gatherAt}:{};
  d.exams=(src.exams&&typeof src.exams==='object')?{...src.exams}:{};
  // legacy scalar fields -> new structures (only once)
  if(!d.sysRev){
   if(src.spell){d.spells[D.BASIC[d.element]]={lv:clamp(src.spellLevel||1,1,3),prog:0};}
   if(src.advanced)d.spells[D.AOE_STORY[d.element]]={lv:1,prog:0};
   if(src.healing)d.spells.healing={lv:1,prog:0};
   if(src.pet&&!d.pets.some(p=>p.id.startsWith('spirit_'))){d.pets.push(petFromLegacy(src,1,['spirit_fire','spirit_ice','spirit_earth'][d.element]));}
   if(src.pet2&&!d.pets.some(p=>p.id==='babyEagle')){d.pets.push(petFromLegacy(src,src.activePenguin?null:2,'babyEagle'));}
   if(src.ownPenguin&&!d.pets.some(p=>p.id==='penguin')){const p=petFromLegacy(src,src.activePenguin?2:null,'penguin');if(!src.activePenguin){p.lv=src.penguinLevel||1;p.xp=src.penguinXp||0;p.hp=src.penguinHp||42;p.maxHp=src.penguinMaxHp||42;p.mp=src.penguinMp||12;p.maxMp=src.penguinMaxMp||12;p.aff=src.penguinAffection||45;p.agi=src.penguinAgility||24;}d.pets.push(p);}
   if(src.poisonMoth&&!d.pets.some(p=>p.id==='moth'))d.pets.push(newPet('moth'));
   d.party=[];const first=d.pets.findIndex(p=>p.id.startsWith('spirit_'));if(first>=0)d.party.push(first);
   const second=d.pets.findIndex(p=>p.id===(src.activePenguin?'penguin':'babyEagle'));if(second>=0&&src.pet2)d.party.push(second);
   d.rank=Math.max(d.rank||0,rankByLevel(d.level||1));
   if(src.archmage)d.rank=4;
   if(!d.inv.potion&&!d.inv.ether){/* potions/ethers stay on s.potions/s.ethers */}
   d.sysRev=1;
  }
  reconcile(d);
  return d;
 }
 function rankByLevel(l){let r=0;D.RANK_LEVEL.forEach((v,i)=>{if(l>=v)r=i;});return r;}
 // ------------------------------------------------------------ inventory
 const inv={
  count:(s,id)=>id==='potion'?s.potions:id==='ether'?s.ethers:(s.inv[id]||0),
  add(s,id,n=1){if(!D.ITEMS[id])return;if(id==='potion'){s.potions+=n;return;}if(id==='ether'){s.ethers+=n;return;}s.inv[id]=Math.min(9999,(s.inv[id]||0)+n);s.codex.items[id]=true;},
  remove(s,id,n=1){if(inv.count(s,id)<n)return false;if(id==='potion')s.potions-=n;else if(id==='ether')s.ethers-=n;else{s.inv[id]-=n;if(s.inv[id]<=0)delete s.inv[id];}return true;},
  list(s){const out=[];if(s.potions>0)out.push(['potion',s.potions]);if(s.ethers>0)out.push(['ether',s.ethers]);for(const[k,v]of Object.entries(s.inv))if(v>0)out.push([k,v]);return out;},
  gearOwned(s,id){return id==='staff'?!!s.wand:(s['own_'+id]||(s.inv[id]||0)>0);},
 };
 function useItem(s,id,api,inBattle){const it=D.ITEMS[id];if(!it||inv.count(s,id)<1)return null;let msg='';
  if(it.hp){if(s.hp>=s.maxHp)return{fail:'체력이 가득합니다.'};s.hp=Math.min(s.maxHp,s.hp+it.hp);msg=`${it.name} · HP +${it.hp}`;}
  else if(it.mp){if(s.mp>=s.maxMp)return{fail:'마력이 가득합니다.'};s.mp=Math.min(s.maxMp,s.mp+it.mp);msg=`${it.name} · MP +${it.mp}`;}
  else if(it.cure){const b=api?.battle;const cured=[];if(b&&b.p)for(const c of it.cure)if(b.p[c]){delete b.p[c];cured.push(D.STATUS[c].name);}if(!cured.length&&!b)return{fail:'지금은 치료할 상태이상이 없습니다.'};msg=`${it.name} · ${cured.length?cured.join('·')+' 해제':'효과 없음'}`;}
  else if(it.petHp){const slot=s.party.length?s.pets[s.party[0]]:null;if(!slot)return{fail:'동행 중인 펫이 없습니다.'};slot.hp=Math.min(slot.maxHp,slot.hp+it.petHp);slot.aff=Math.min(100,slot.aff+(it.petAff||0));syncPets(s);msg=`${slot.name||D.PET[slot.id].name} HP +${it.petHp}`;}
  else return{fail:'사용할 수 없는 아이템입니다.'};
  inv.remove(s,id,1);return{msg};}
 // ------------------------------------------------------------ spells
 const sp={
  data:id=>D.SPELL[id],
  lv:(s,id)=>s.spells[id]?.lv||0,
  known:(s,id)=>(s.spells[id]?.lv||0)>0,
  mp:(s,id)=>{const d=D.SPELL[id],l=Math.max(1,sp.lv(s,id));return d.mp[Math.min(d.mp.length-1,l-1)];},
  power:(s,id)=>{const d=D.SPELL[id],l=Math.max(1,sp.lv(s,id));return (d.power||[1])[Math.min((d.power||[1]).length-1,l-1)];},
  mine:s=>D.SPELLS.filter(d=>d.el===null||d.el===s.element),
  learnable(s,id,teacher){const d=D.SPELL[id],t=D.TEACHERS[teacher];if(!d||!t||!t.spells.includes(id))return{ok:false,why:'이 선생님은 가르치지 않는 마법'};if(d.el!==null&&d.el!==s.element&&!d.basic)return{ok:false,why:'다른 속성의 고급 마법은 배울 수 없습니다'};const cur=s.spells[id]||{lv:0,prog:0};if(d.rank>s.rank)return{ok:false,why:`${D.RANKS[d.rank]} 계급부터`};if(cur.lv>=(d.basic?3:1))return{ok:false,why:'최고 숙련'};if(d.scroll&&cur.lv===0&&cur.prog===0&&inv.count(s,d.scroll)<1)return{ok:false,why:`${D.ITEMS[d.scroll].name} 필요`};if(s.sp<d.sp)return{ok:false,why:`선행 점수 ${d.sp} 필요`};return{ok:true};},
  lesson(s,id,teacher){const r=sp.learnable(s,id,teacher);if(!r.ok)return r;const d=D.SPELL[id];const cur=s.spells[id]||(s.spells[id]={lv:0,prog:0});s.sp-=d.sp;if(d.scroll&&cur.lv===0&&cur.prog===0)inv.remove(s,d.scroll,1);cur.prog++;let done=false;const need=cur.lv===0?d.lessons:d.lessons+cur.lv;if(cur.prog>=need){cur.prog=0;cur.lv++;done=true;}
   // keep legacy flags in step for older chapter scripts
   if(id===D.BASIC[s.element]){s.spell=true;s.spellLevel=cur.lv;}if(id===D.AOE_STORY[s.element]&&cur.lv)s.advanced=true;if(id==='healing'&&cur.lv)s.healing=true;
   return{ok:true,done,lv:cur.lv,prog:cur.prog,need};},
  grant(s,id,lv=1){const cur=s.spells[id]||(s.spells[id]={lv:0,prog:0});cur.lv=Math.max(cur.lv,lv);cur.prog=0;if(id===D.BASIC[s.element]){s.spell=true;s.spellLevel=Math.max(s.spellLevel||0,cur.lv);}if(id===D.AOE_STORY[s.element])s.advanced=true;if(id==='healing')s.healing=true;},
  syncLegacy(s){const b=D.BASIC[s.element];if(s.spell&&!sp.known(s,b))sp.grant(s,b,Math.max(1,s.spellLevel||1));else if(sp.known(s,b)&&(s.spellLevel||0)<sp.lv(s,b))s.spellLevel=sp.lv(s,b);if(s.advanced&&!sp.known(s,D.AOE_STORY[s.element]))sp.grant(s,D.AOE_STORY[s.element]);if(s.healing&&!sp.known(s,'healing'))sp.grant(s,'healing');},
 };
 // ------------------------------------------------------------ pets
 function newPet(id){const d=D.PET[id];return{id,lv:1,xp:0,hp:d.hp,maxHp:d.hp,mp:d.mp,maxMp:d.mp,aff:50,agi:d.agi,skill:d.skills[0]};}
 function normPet(p){const d=D.PET[p.id];const n=newPet(p.id);for(const k of ['lv','xp','hp','maxHp','mp','maxMp','aff','agi'])if(Number.isFinite(p[k]))n[k]=Math.max(0,Math.floor(p[k]));n.lv=clamp(n.lv,1,d.maxLevel);n.maxHp=Math.max(10,n.maxHp);n.maxMp=Math.max(4,n.maxMp);n.hp=clamp(n.hp,0,n.maxHp);n.mp=clamp(n.mp,0,n.maxMp);n.aff=clamp(n.aff,0,100);n.agi=clamp(n.agi,5,80);if(typeof p.name==='string')n.name=p.name.slice(0,10);n.skill=petSkills(n).includes(p.skill)?p.skill:petSkills(n)[0];return n;}
 function petFromLegacy(src,slot,id){const p=newPet(id);if(slot){p.lv=src['petLevel'+slot]||1;p.xp=src['petXp'+slot]||0;p.hp=src['petHp'+slot]||p.hp;p.maxHp=src['petMaxHp'+slot]||p.maxHp;p.mp=src['petMp'+slot]||p.mp;p.maxMp=src['petMaxMp'+slot]||p.maxMp;p.aff=src['petAffection'+slot]||50;p.agi=src['petAgility'+slot]||p.agi;}return normPet(p);}
 const petEvolvedP=p=>p.lv>=D.PET[p.id].evolveAt;
 const petSkills=p=>{const d=D.PET[p.id];return petEvolvedP(p)?[...d.skills,...d.evolved]:d.skills;};
 const petDisplayName=p=>p.name||(petEvolvedP(p)&&D.PET[p.id].evolvedName)||D.PET[p.id].name;
 const partyPet=(s,slot)=>{const i=s.party[slot-1];return Number.isInteger(i)?s.pets[i]:null;};
 // legacy mirror: game.js battle/motion code reads petLevel1.. fields
 function syncPets(s){for(const slot of[1,2]){const p=partyPet(s,slot);s['pet'+(slot===1?'':'2')]=!!p;if(!p)continue;s['petLevel'+slot]=p.lv;s['petXp'+slot]=p.xp;s['petHp'+slot]=p.hp;s['petMaxHp'+slot]=p.maxHp;s['petMp'+slot]=p.mp;s['petMaxMp'+slot]=p.maxMp;s['petAffection'+slot]=p.aff;s['petAgility'+slot]=p.agi;}}
 function pullPets(s){for(const slot of[1,2]){const p=partyPet(s,slot);if(!p)continue;const d=D.PET[p.id];p.lv=clamp(Math.max(p.lv,s['petLevel'+slot]||1),1,d.maxLevel);p.xp=s['petXp'+slot];p.hp=clamp(s['petHp'+slot],0,s['petMaxHp'+slot]);p.maxHp=s['petMaxHp'+slot];p.mp=clamp(s['petMp'+slot],0,s['petMaxMp'+slot]);p.maxMp=s['petMaxMp'+slot];p.aff=clamp(s['petAffection'+slot],0,100);p.agi=s['petAgility'+slot];
   // level-ups computed here with the pet's own cap (levelPet in game.js is capped by petMax)
   while(p.lv<d.maxLevel&&p.xp>=p.lv*35){p.xp-=p.lv*35;p.lv++;p.maxHp+=6;p.maxMp+=2;p.hp=p.maxHp;p.mp=p.maxMp;p.aff=Math.min(100,p.aff+4);}
   if(!petSkills(p).includes(p.skill))p.skill=petSkills(p)[0];}
  syncPets(s);}
 function petWalk(s,slot,anim){const p=partyPet(s,slot);if(!p)return null;const d=D.PET[p.id],file=petEvolvedP(p)?anim.replace(/1\.gif$/,'2.gif'):anim;return A+'pet-images/'+d.sprite+'/'+file;}
 // story scripts still flip legacy flags (s.pet, s.pet2, s.ownPenguin, s.poisonMoth, s.spell...) — fold them into the roster/spell book
 function reconcile(s){if(!s.pets)return s;if(!s.spells)s.spells={};if(!s.party)s.party=[];sp.syncLegacy(s);
  if(s.pet&&!partyPet(s,1)){let i=s.pets.findIndex(p=>p.id.startsWith('spirit_'));if(i<0){s.pets.push(petFromLegacy(s,1,['spirit_fire','spirit_ice','spirit_earth'][s.element]));i=s.pets.length-1;}s.party[0]=i;}
  if(s.ownPenguin&&!s.pets.some(p=>p.id==='penguin'))s.pets.push(petFromLegacy(s,s.activePenguin?2:null,'penguin'));
  if(s.poisonMoth&&!s.pets.some(p=>p.id==='moth'))s.pets.push(newPet('moth'));
  if(s.pet2&&!partyPet(s,2)){const want=s.activePenguin?'penguin':'babyEagle';let i=s.pets.findIndex(p=>p.id===want);if(i<0){s.pets.push(petFromLegacy(s,2,want));i=s.pets.length-1;}if(s.party.length<1)s.party.push(s.pets.findIndex(p=>p.id.startsWith('spirit_'))>=0?s.pets.findIndex(p=>p.id.startsWith('spirit_')):i);if(s.party[0]!==i)s.party[1]=i;}
  s.party=s.party.filter((i,k)=>Number.isInteger(i)&&s.pets[i]&&s.party.indexOf(i)===k).slice(0,2);syncPets(s);return s;}
 function petMax(s,slot){const p=partyPet(s,slot);return p?D.PET[p.id].maxLevel:10;}
 function petEvolved(s,slot){const p=partyPet(s,slot);return p?petEvolvedP(p):false;}
 function petName(s,slot){const p=partyPet(s,slot);return p?petDisplayName(p):(slot===1?ELS[s.element]+' 정령':'아기 독수리');}
 function petSprite(s,slot,pose='idle'){const p=partyPet(s,slot);if(!p)return null;const d=D.PET[p.id];return A+'pet-images/'+d.sprite+'/'+pose+(petEvolvedP(p)?'2':'1')+'.gif';}
 function licenseOk(s){return s.party.length<2||s.licenseUntil>s.seconds;}
 function addPet(s,id){if(s.pets.some(p=>p.id===id)&&D.PET[id].story)return s.pets.findIndex(p=>p.id===id);s.pets.push(newPet(id));const i=s.pets.length-1;if(s.party.length<2&&(s.party.length<1||licenseOk(s)))s.party.push(i);syncPets(s);return i;}
 // ------------------------------------------------------------ status effects
 function applyStatus(t,id,turns=3){t.st=t.st||{};if(id==='random')id=['poison','paralyze','atkdown','defdown'][Math.floor(Math.random()*4)];if(id==='curse'){t.st.curse=Math.min(5,(t.st.curse||0)+1);return id;}if(t.immune&&t.immune.includes(id))return null;t.st[id]=Math.max(t.st[id]||0,turns);return id;}
 function statusText(t){return Object.entries(t.st||{}).filter(([k,v])=>v>0).map(([k,v])=>{const st=D.STATUS[k];if(!st)return'';const icon=st.icon.startsWith('assets/')?`<img class="status-icon" src="${st.icon}" alt="${st.name}">`:st.icon;return`<i style="color:${st.color}" title="${st.name}">${icon}${k==='curse'?v:''}</i>`;}).join('');}
 const atkMul=t=>(t.st?.atkdown?.75:1)*(t.st?.power?1.3:1)*(1-.15*(t.st?.curse||0));
 const defMul=t=>(t.st?.defdown?1.3:1)*(1+.15*(t.st?.curse||0));
 const speedMul=t=>(t.st?.slow?.55:1)*(1-.1*(t.st?.curse||0));
 // returns {skip:boolean, log:string}; decrements timed effects
 function beginTurn(t,name,hpKey='hp'){t.st=t.st||{};let log='',skip=false;const hp=()=>t[hpKey];const set=v=>{t[hpKey]=v;};
  for(const id of ['bleed','poison','burn']){if(t.st[id]>0){const d=id==='bleed'?Math.max(2,Math.round(t.maxHp*.04*t.st[id]/3)):id==='poison'?Math.max(3,Math.round(t.maxHp*.05)):Math.max(4,Math.round(t.maxHp*.06));set(Math.max(0,hp()-d));t.st[id]--;log+=` ${name} ${D.STATUS[id].name} 피해 ${d}.`;}}
  if(t.st.regen>0){const h=Math.round(t.maxHp*.08);set(Math.min(t.maxHp,hp()+h));t.st.regen--;log+=` ${name} 오토 리스토어 +${h}.`;}
  if(t.st.paralyze>0){t.st.paralyze--;skip=true;log+=` ${name}은(는) 마비되어 움직이지 못한다.`;}
  else if(t.st.sleep>0){t.st.sleep--;skip=true;log+=` ${name}은(는) 잠들어 있다.`;}
  for(const id of ['silence','blind','slow','atkdown','defdown','power','lucky','reflect'])if(t.st[id]>0)t.st[id]--;
  return{skip,log};}
 function onHit(t,physical){if(physical&&t.st?.sleep){delete t.st.sleep;return ' 잠에서 깨어났다.';}return '';}
 function damageTo(t,raw){if((t.st?.curse||0)>=5)return t.hp;return Math.max(1,Math.round(raw*defMul(t)));}
 // ------------------------------------------------------------ allies (story companions fighting alongside)
 function alliesFor(s,encounter,spec){if(spec?.allies)return spec.allies.map(a=>({...a,atb:30,st:{}}));
  if(encounter==='odangka')return[{id:'aron',name:'아론',sprite:A+'animation/npc_009_도트_아론/idle.gif',hp:300,maxHp:300,atk:30,atb:35,skill:'guard',st:{}},{id:'isaac',name:'아이작',sprite:A+'animation/npc_005_도트_아이작/idle.gif',hp:200,maxHp:200,atk:14,atb:35,skill:'mana',st:{}}];
  const stage=s.stage;const list=[];
  if(['wolf1','wolf2','queenspider'].includes(encounter))list.push({id:'ryoma',name:'료마',sprite:A+'animation/npc_011_도트_료마/idle.gif',hp:420,maxHp:420,atk:34,atb:30,skill:'attack',st:{}});
  if(['hunger15'].includes(encounter))list.push({id:'jackal',name:'쟈칼',sprite:A+'animation/npc_025_도트_쟈칼/idle.gif',hp:800,maxHp:800,atk:48,atb:30,skill:'attack',st:{}},{id:'sofia',name:'소피아',sprite:A+'animation/npc_004_도트_소피아/idle.gif',hp:320,maxHp:320,atk:20,atb:20,skill:'heal',st:{}});
  if(['scoll14','odangka14','isaac14'].includes(encounter))list.push({id:'naomi',name:'나오미',sprite:A+'animation/npc_008_도트_나오미/idle.gif',hp:380,maxHp:380,atk:30,atb:30,skill:'attack',st:{}});
  if(['rainbowworm'].includes(encounter))list.push({id:'naomi',name:'나오미',sprite:A+'animation/npc_008_도트_나오미/idle.gif',hp:380,maxHp:380,atk:26,atb:30,skill:'heal',st:{}});
  if(['snake12'].includes(encounter))list.push({id:'edward',name:'에드워드',sprite:A+'animation/npc_013_도트_에드워드 장군/idle.gif',hp:500,maxHp:500,atk:32,atb:30,skill:'attack',st:{}});
  return list.slice(0,2);}
 // ------------------------------------------------------------ drops, codex, victory
 function onVictory(s,b){const got={};for(const e of b.enemies){s.codex.mon[e.name]=true;for(const[id,ch,q]of (D.DROPS[e.name]||[])){if(Math.random()<ch){const n=1+Math.floor(Math.random()*q);inv.add(s,id,n);got[id]=(got[id]||0)+n;}}}
  pullPets(s);
  const parts=Object.entries(got).map(([id,n])=>`${D.ITEMS[id].name} ×${n}`);return parts.length?`<p class="sub">획득: ${parts.join(' · ')}</p>`:'';}
 // ------------------------------------------------------------ battle (replaces the engine's action/tick/ui)
 function petAct(c,slot,target){const s=c.s,b=c.b,p=partyPet(s,slot);if(!p)return;const gauge=slot===1?'petAtb':'pet2Atb';if(b[gauge]<100||p.hp<=0)return;
  const sk=D.PSK[p.skill]||D.PSK[petSkills(p)[0]];if(p.mp<sk.mp){b.log=`${petDisplayName(p)}의 MP가 부족합니다 (${sk.name} MP ${sk.mp}).`;b[gauge]=60;c.render();return;}
  const t=beginTurn(p,petDisplayName(p));if(t.skip){b.log=t.log.trim();b[gauge]=0;syncPets(s);c.finish();return;}
  const elem=sk.el!==undefined?sk.el:D.PET[p.id].el;const base=9+p.lv*3+Math.floor(p.aff/20);let log='';
  const hit=(e,pw)=>{const mul=elem===null||elem===undefined?1:c.multiplier(elem,e.element);const d=damageTo(e,base*pw*mul*atkMul(p));c.hit(e,d,elem==null?'#f4d37d':COLORS[elem]);log+=` ${e.name}에게 ${d}.`;log+=onHit(e,!sk.magic);if(sk.status&&e.hp>0){const st=applyStatus(e,sk.status,3);if(st)log+=` ${D.STATUS[st].name}!`;}};
  if(sk.kind==='attack')hit(target,sk.power);
  else if(sk.kind==='aoe')b.enemies.filter(e=>e.hp>0).forEach(e=>hit(e,sk.power));
  else if(sk.kind==='debuff'){const st=applyStatus(target,sk.status,3);log+=st?` ${target.name}에게 ${D.STATUS[st].name} 부여.`:' 효과가 없다.';}
  else if(sk.kind==='debuffall'){b.enemies.filter(e=>e.hp>0).forEach(e=>{const st=applyStatus(e,sk.status,2);if(st)log+=` ${e.name} ${D.STATUS[st].name}.`;});}
  else if(sk.kind==='healall'){s.hp=Math.min(s.maxHp,s.hp+sk.heal);for(const q of s.party.map(i=>s.pets[i]))if(q.hp>0)q.hp=Math.min(q.maxHp,q.hp+sk.heal);log+=` 아군 전체 HP +${sk.heal}.`;}
  else if(sk.kind==='buff'){b.p=b.p||{};b.p[sk.status]=4;log+=` ${D.STATUS[sk.status].name}!`;}
  p.mp-=sk.mp;p.aff=Math.min(100,p.aff+1);b[gauge]=0;b.log=`${petDisplayName(p)}의 ${sk.name}!${log}`;b.lock=.45;syncPets(s);c.finish();}
 function castSpell(c,id,target){const s=c.s,b=c.b,d=D.SPELL[id];if(!sp.known(s,id))return c.toast('아직 배우지 않은 마법입니다.');const cost=sp.mp(s,id);if(s.mp<cost)return c.toast(`MP ${cost}가 필요합니다.`);if(b.p?.silence){b.log=`${d.name}… 침묵 상태라 주문이 나오지 않는다! 대기로 숨을 고르자.`;c.toast('침묵 상태에서는 마법을 쓸 수 없습니다.');return c.done();}
  const stats=c.stats();s.mp-=cost;let log=`${d.name}${d.basic?' Lv.'+sp.lv(s,id):''}!`;const power=sp.power(s,id);
  const strike=(e,pw)=>{const mul=c.multiplier(s.element,e.element),crit=Math.random()<stats.critical*(b.p?.lucky?2:.65),dmg=damageTo(e,stats.magic*pw*mul*(crit?1.55:1)*atkMul({st:b.p}));c.hit(e,dmg,COLORS[s.element]);log+=` ${e.name}에게 ${dmg}${crit?' 치명타':''}.`;if(d.status&&e.hp>0){const st=applyStatus(e,d.status,3);if(st)log+=` ${D.STATUS[st].name}!`;}};
  if(d.kind==='single'){let t=target;if(b.p?.blind&&Math.random()<.5){const p1=partyPet(s,1);if(p1){const dmg=Math.round(stats.magic*.5);p1.hp=Math.max(0,p1.hp-dmg);syncPets(s);b.log=`${d.name}! 앞이 보이지 않아 ${petDisplayName(p1)}를 맞혔다 (${dmg}).`;c.done();return;}}strike(t,power);}
  else if(d.kind==='aoe')b.enemies.filter(e=>e.hp>0).forEach(e=>strike(e,power*.75));
  else if(d.kind==='heal'){const h=d.heal+s.level*2;s.hp=Math.min(s.maxHp,s.hp+h);log+=` HP +${h}.`;c.burst('#abe9a0');}
  else if(d.kind==='healall'){const h=d.heal+s.level*2;s.hp=Math.min(s.maxHp,s.hp+h);for(const q of s.party.map(i=>s.pets[i]))if(q.hp>0)q.hp=Math.min(q.maxHp,q.hp+h);for(const a of b.allies||[])if(a.hp>0)a.hp=Math.min(a.maxHp,a.hp+h);syncPets(s);log+=` 아군 전체 HP +${h}.`;}
  else if(d.kind==='cure'){b.p=b.p||{};const cured=[];for(const k of d.cure)if(b.p[k]){delete b.p[k];cured.push(D.STATUS[k].name);}for(const q of s.party.map(i=>s.pets[i]))for(const k of d.cure)if(q.st?.[k]){delete q.st[k];}log+=cured.length?` ${cured.join('·')} 해제.`:' 해제할 상태가 없다.';}
  else if(d.kind==='buff'){b.p=b.p||{};b.p[d.buff]=4;log+=' 공격력이 올랐다.';}
  b.log=log;c.done();}
 function actionList(c){const s=c.s,b=c.b;const spells=sp.mine(s).filter(d=>sp.known(s,d.id));return{spells,items:inv.list(s).filter(([id])=>D.ITEMS[id].kind==='consume')};}
 function battleAction(c,action,arg){const s=c.s,b=c.b;const target=b.enemies[c.sel()]?.hp>0?b.enemies[c.sel()]:b.enemies.find(e=>e.hp>0);if(!target)return;
  if(action==='pet'||action==='pet2')return petAct(c,action==='pet'?1:2,target);
  if(!b.ready)return;const stats=c.stats();b.p=b.p||{};
  if(action==='attack'){let t=target;if(b.p.blind&&Math.random()<.5){const p1=partyPet(s,1);if(p1){const dmg=Math.round(stats.physical*.5);p1.hp=Math.max(0,p1.hp-dmg);syncPets(s);b.log=`앞이 보이지 않아 ${petDisplayName(p1)}를 때렸다 (${dmg}).`;return c.done();}}
   const crit=Math.random()<stats.critical*(b.p.lucky?2:1),d=damageTo(t,stats.physical*(crit?1.7:1)*atkMul({st:b.p}));c.hit(t,d,'#f2dda1');b.log=`지팡이 공격! ${t.name}에게 ${d} 피해.${crit?' 치명타!':''}${onHit(t,true)}`;return c.done();}
  if(action==='magic')return castSpell(c,arg||D.BASIC[s.element],target);
  if(action==='advanced')return castSpell(c,D.AOE_STORY[s.element],target);
  if(action==='heal')return castSpell(c,'healing',target);
  if(action==='spell')return castSpell(c,arg,target);
  if(action==='potion')return useIn(c,'potion');if(action==='ether')return useIn(c,'ether');if(action==='item')return useIn(c,arg);
  if(action==='guard'){b.guard=true;s.mp=Math.min(s.maxMp,s.mp+7);if(b.p.silence)delete b.p.silence;b.log='숨을 고르며 다음 공격을 방어합니다. MP +7 · 침묵 해제';c.chime('heal');return c.done();}
  if(action==='flee'){if(b.boss||b.spec&&!b.spec.repeatable)return c.toast('이 전투에서는 도망갈 수 없습니다.');b.fleeTimer=2.4;b.atb=0;b.ready=false;b.log='퇴각 주문을 외웁니다. 2.4초 동안 공격받지 않아야 합니다.';c.render();return;}
  if(action==='ally'){return allyAct(c,arg||0);}
 }
 function useIn(c,id){const s=c.s,b=c.b;const r=useItem(s,id,{battle:b},true);if(!r)return c.toast('아이템이 없습니다.');if(r.fail)return c.toast(r.fail);b.log=r.msg;c.burst('#abe9a0');c.chime('heal');c.done();}
 function allyAct(c,i){const b=c.b,s=c.s,a=(b.allies||[])[i];if(!a||a.atb<100||a.hp<=0)return;const target=b.enemies[c.sel()]?.hp>0?b.enemies[c.sel()]:b.enemies.find(e=>e.hp>0);const t=beginTurn(a,a.name);a.atb=0;if(t.skip){b.log=t.log.trim();b.lock=.5;c.finish();return;}
  if(a.skill==='heal'){const h=Math.round(a.atk*1.5);s.hp=Math.min(s.maxHp,s.hp+h);b.log=`${a.name}의 치유! HP +${h}`;c.burst('#abe9a0');}
  else if(a.skill==='mana'){const d=damageTo(target,a.atk);c.hit(target,d,'#bfe3ff');s.mp=Math.min(s.maxMp,s.mp+4);b.log=`${a.name}의 지원! ${target.name}에게 ${d}, 내 MP +4`;}
  else if(a.skill==='guard'){const d=damageTo(target,a.atk);c.hit(target,d,'#ffc97e');b.guard=true;b.log=`${a.name}의 보호 마법! ${target.name}에게 ${d}, 다음 공격을 방어합니다.`;}
  else{const d=damageTo(target,a.atk*atkMul(a));c.hit(target,d,'#ffe0a0');b.log=`${a.name}의 공격! ${target.name}에게 ${d}.`;}
  b.lock=.55;c.finish();}
 // enemy turn: returns true if battle ended
 function enemyTurn(c,e){const s=c.s,b=c.b;b.enemyTurns++;const t=beginTurn(e,e.name);if(e.hp<=0){b.log=t.log.trim();c.finish();return true;}if(t.skip){b.log=t.log.trim();b.lock=.5;c.render();return false;}
  const magic=D.MAGIC_ATTACKERS.has(e.name)||!!e.magic;if(magic&&e.st?.silence){b.log=`${e.name}은(는) 침묵 상태라 마법을 쓰지 못한다.`;b.lock=.5;c.render();return false;}
  const focus=b.boss&&e.sprite==='kesno'&&b.turn%3===0?8:0;const raw=Math.max(1,Math.round((e.atk+focus)*atkMul(e)*(b.spec?.mustLose?99:1)));
  // target: allies/pets/player. blind enemies may hit their own side.
  if(e.st?.blind&&Math.random()<.5){const other=b.enemies.find(o=>o!==e&&o.hp>0);if(other){const d=damageTo(other,raw*.6);other.hp=Math.max(0,other.hp-d);b.log=`${e.name}이(가) 앞을 못 보고 ${other.name}을(를) 공격했다 (${d}).`;b.lock=.6;c.render();if(other.hp<=0)c.finish();return false;}}
  const pets=s.party.map((i,k)=>({p:s.pets[i],slot:k+1})).filter(x=>x.p.hp>0),allies=(b.allies||[]).filter(a=>a.hp>0);
  const pick=b.enemyTurns%4===0&&pets[1]?pets[1]:b.enemyTurns%3===0&&pets[0]?pets[0]:(b.enemyTurns%5===0&&allies[0]?{ally:allies[0]}:null);
  let log=t.log;
  if(pick&&pick.ally){const a=pick.ally,d=damageTo(a,raw-2);a.hp=Math.max(0,a.hp-d);log+=` ${e.name}의 공격! ${a.name}이(가) ${d} 피해.${a.hp<=0?' 쓰러졌다.':''}`;}
  else if(pick){const p=pick.p,def=3+p.lv;let d=damageTo(p,Math.max(1,raw-Math.floor(def*.35)));if(b.p?.reflect){log+=` 오토 반사! ${e.name}에게 ${Math.round(d*.5)} 반사.`;e.hp=Math.max(0,e.hp-Math.round(d*.5));}p.hp=Math.max(0,p.hp-d);log+=` ${e.name}의 공격! ${petDisplayName(p)}가 ${d} 피해.${p.hp<=0?' 쓰러졌지만 승리 후 다시 일어납니다.':''}`;const stt=enemyStatusFor(e);if(stt&&p.hp>0){const st=applyStatus(p,stt,3);if(st)log+=` ${petDisplayName(p)} ${D.STATUS[st].name}.`;}syncPets(s);}
  else{const stats=c.stats();let d=b.guard?Math.ceil(raw*.38):Math.max(1,raw-Math.floor((magic?stats.magicDefense:stats.physicalDefense)*.18));d=damageTo({st:b.p,hp:s.hp},d);if(b.spec?.mustLose)d=Math.max(d,s.hp);if(b.p?.reflect&&!b.guard){const r=Math.round(d*.5);e.hp=Math.max(0,e.hp-r);log+=` 오토 반사 ${r}.`;}s.hp=Math.max(0,s.hp-d);b.guard=false;log+=` ${e.name}의 ${magic?'마법':'공격'}! ${d} 피해.`;
   const stt=enemyStatusFor(e);if(stt&&s.hp>0&&!(b.p[stt])){const st=applyStatus({st:b.p},stt,3);if(st)log+=` ${D.STATUS[st].name} 상태가 되었다.`;}
   c.effect('−'+d,'#ffb5a1');c.burst('#f2b17f');}
  b.log=log.trim();if(b.fleeTimer>0){b.fleeTimer=0;b.log+=' 퇴각 주문이 끊겼다.';}
  if(s.hp<=0){c.end(false);return true;}if(e.hp<=0){c.finish();return true;}
  b.lock=.6;c.chime('hit');c.hud();c.render();return false;}
 function enemyStatusFor(e){const n=e.name;const map={'거미':'poison','전갈':'poison','뱀':'paralyze','여왕거미':'poison','룡룡뱀':'poison','늑대':'bleed','아즈카의 하얀 늑대':'silence','침묵의 검을 문 늑대':'silence','버섯':'poison','독나방':'poison','검은 나무토막':'paralyze','크리스탈 거미':'slow','얼음 유령마':'slow','아이스 골렘':'slow','불꽃병사':'burn','불꽃 정령':'burn','유령마':'curse','좀비':'poison','해골 전자':'bleed','대지 유령마':'defdown','카우보이 인형':'bleed','포악한 문어':'atkdown','먹물 오징어':'blind','박쥐':'blind'};const st=map[n];if(!st)return null;return Math.random()<((n.includes('늑대')||n==='보스')?.6:.35)?st:null;}
 function tickBattle(c,dt){const b=c.b,s=c.s;
  for(const a of b.allies||[]){if(a.hp<=0)continue;a.atb=Math.min(100,a.atb+dt*30*speedMul(a));if(a.atb>=100){allyAct(c,b.allies.indexOf(a));return;}}
  const agility=c.stats().agility;b.atb=Math.min(100,b.atb+dt*(27+agility*.45)*speedMul({st:b.p}));
  for(const slot of[1,2]){const p=partyPet(s,slot);if(p&&p.hp>0)b[slot===1?'petAtb':'pet2Atb']=Math.min(100,b[slot===1?'petAtb':'pet2Atb']+dt*(12+p.agi*.55)*speedMul(p));}
  if(b.atb>=100){b.p=b.p||{};const proxy={st:b.p,hp:s.hp,maxHp:s.maxHp};const t=beginTurn(proxy,'나');s.hp=Math.max(1,Math.min(s.maxHp,proxy.hp));if(t.log){b.log=t.log.trim();c.hud();}if(t.skip){b.atb=0;b.turn++;b.lock=.6;c.render();return;}b.ready=true;c.render();return;}
  for(const e of b.enemies){if(e.hp<=0)continue;e.atb+=dt*(b.boss?23:21)*speedMul(e);if(e.atb>=100){e.atb=0;enemyTurn(c,e);break;}}}
 function renderBattleUI(c){const b=c.b,s=c.s,$=c.$;const list=actionList(c);
  const states=statusText({st:b.p||{}});
  $('battle-round').innerHTML=(b.allies?.length?b.allies.map(a=>`${a.name} ${Math.floor(a.atb)}%`).join(' · ')+' · ':'')+'행동 '+b.turn+' · '+(b.fleeTimer>0?'퇴각 주문 '+b.fleeTimer.toFixed(1)+'초':b.ready?'내 차례 — 행동을 선택하세요':'행동 게이지를 모으는 중')+(states?' · 상태 '+states:'');
  $('battle-log').textContent=b.log;$('enemy-cards').innerHTML='';
  b.enemies.forEach((e,i)=>{const bt=document.createElement('button');bt.className='enemy-card'+(i===c.sel()?' selected':'');bt.disabled=e.hp<=0;bt.innerHTML=`<strong>${e.name}</strong><small>${ELS[e.element]} · ${e.hp}/${e.maxHp} ${statusText(e)}</small><div class="meter"><i style="width:${e.hp/e.maxHp*100}%"></i></div>`;bt.onclick=()=>{c.select(i);renderBattleUI(c);};$('enemy-cards').appendChild(bt);});
  const p1=partyPet(s,1),p2=partyPet(s,2);const basic=D.BASIC[s.element];
  const acts=[['attack','1 · 때리기','지팡이 공격',''],['magic','2 · '+D.SPELL[basic].name,sp.known(s,basic)?`MP ${sp.mp(s,basic)} · Lv.${sp.lv(s,basic)}`:'미습득','magic'],['pet','3 · '+(p1?petDisplayName(p1):'펫 없음'),p1?`${D.PSK[p1.skill].name} · HP ${p1.hp} ${statusText(p1)} · ${Math.floor(b.petAtb)}%`:'-','pet'],['potion','4 · 회복약',s.potions+'개 · HP +55',''],['guard','5 · 대기','방어 · MP +7',''],['flee','6 · 도망','공격 없이 2.4초',''],...(p2?[['pet2','7 · '+petDisplayName(p2),`${D.PSK[p2.skill].name} · HP ${p2.hp} ${statusText(p2)} · ${Math.floor(b.pet2Atb)}%`,'pet']]:[])];
  $('battle-actions').innerHTML='';acts.forEach(([id,name,desc,cls])=>{const bt=document.createElement('button');bt.className='battle-btn '+cls;bt.innerHTML=name+'<small>'+desc+'</small>';const pg=id==='pet'?b.petAtb:id==='pet2'?b.pet2Atb:null,ps=id==='pet'?p1?.hp:id==='pet2'?p2?.hp:null;bt.disabled=(pg!==null?(!(id==='pet'?p1:p2)||pg<100||ps<=0):!b.ready)||b.lock>0||(id==='flee'&&(b.boss||b.spec&&!b.spec.repeatable))||(id==='potion'&&s.potions===0)||(id==='magic'&&!sp.known(s,basic));bt.onclick=()=>c.act(id);$('battle-actions').appendChild(bt);});
  const ex=$('battle-extras');ex.innerHTML='';const add=(label,fn,dis)=>{const bt=document.createElement('button');bt.textContent=label;bt.disabled=!b.ready||b.lock>0||!!dis;bt.onclick=fn;ex.appendChild(bt);};
  for(const d of list.spells){if(d.id===basic)continue;add(`${d.name} · MP ${sp.mp(s,d.id)}`,()=>c.act('spell',d.id),s.mp<sp.mp(s,d.id)||b.p?.silence);}
  for(const[id,n]of list.items){if(id==='potion')continue;add(`${D.ITEMS[id].name} ${n}`,()=>c.act('item',id));}
  (b.allies||[]).forEach((a,i)=>{if(a.hp>0&&a.atb>=100)add(`동료 ${a.name} 행동`,()=>c.act('ally',i));});}
 function startBattleHook(s,b,encounter,spec){reconcile(s);b.allies=alliesFor(s,encounter,spec);b.p={};for(const e of b.enemies){e.st={};if(spec?.immune)e.immune=spec.immune;}b.petAtb=partyPet(s,1)?40:0;b.pet2Atb=partyPet(s,2)?25:0;for(const p of s.pets)p.st={};}
 // ------------------------------------------------------------ panels & npc services
 const kinds=['inventory','magic','pet','shop','room','codex','colosseum','petshop','vet','trainer','teleport','mail','lessons','quiz','spa','exchange','license'];
 const ctx={};
 const itemArt=id=>`<img class="inline-item-icon" src="${D.ITEMS[id].icon}" alt="${esc(D.ITEMS[id].name)}">`;
 function itemCell(id,n,s,mode){const it=D.ITEMS[id];const img=it.icon.startsWith('assets/')?`<img src="${it.icon}" alt="">`:`<span class="i-icon">${it.icon}</span>`;return `<button class="item-cell" data-item="${id}" data-mode="${mode}" title="${esc(it.name)} · ${esc(it.desc||'')}">${img}<small>${esc(it.name)}${n>1?' ×'+n:''}</small></button>`;}
 function inventoryPanel(a){const s=a.state,c=a.stats();const gear=Object.entries(D.ITEMS).filter(([id,it])=>it.kind==='gear'&&inv.gearOwned(s,id));const slots=['무기','머리','몸통','손','목','신발'];
  const filter=ctx.itemFilter||'all';const cells=[];
  for(const[id,it]of gear)if(filter==='all'||filter==='gear'){const icon=it.icon.startsWith('assets/')?`<img src="${it.icon}" alt="">`:`<span class="i-icon">${it.icon}</span>`;cells.push(`<button class="item-cell${s['equip_'+id]?' on':''}" data-gear="${id}" title="${esc(it.name)} · Lv.${it.lv} · ${gearDesc(it)}">${icon}<small>${esc(it.name)}${s['equip_'+id]?' · 장착':''}</small></button>`);}
  for(const[id,n]of inv.list(s)){const it=D.ITEMS[id];if(it.kind==='gear')continue;const cat=it.kind==='consume'?'consume':it.kind==='furniture'?'mission':it.kind==='scroll'?'mission':'material';if(filter!=='all'&&filter!==cat)continue;cells.push(itemCell(id,n,s,'use'));}
  if(filter==='all'||filter==='mission')for(const[name,desc]of a.questItems())cells.push(`<button class="item-cell quest-cell" title="${esc(name)} · ${esc(desc)}"><span>✧</span><small>${esc(name)}</small></button>`);
  const doll=slots.map((sl,i)=>{const eq=gear.find(([id,it])=>it.slot===sl&&s['equip_'+id]);const icon=eq?(eq[1].icon.startsWith('assets/')?`<img src="${eq[1].icon}" alt="">`:`<span class="i-icon">${eq[1].icon}</span>`):sl;return `<button class="equip-slot slot-${i}" data-unequip="${eq?eq[0]:''}" title="${sl} · ${eq?esc(eq[1].name):'비어 있음'}">${icon}</button>`;}).join('');
  return `<div class="inventory-layout"><div class="paperdoll"><img src="${a.portrait('you')}" alt="장비 착용 인물">${doll}</div><div class="inventory-right"><div class="compact-stats">HP ${s.hp}/${s.maxHp}　MP ${s.mp}/${s.maxMp}<br>물리 공격 ${c.physical}　마법 공격 ${c.magic}<br>물리 방어 ${c.physicalDefense}　마법 방어 ${c.magicDefense}　민첩 ${c.agility}</div><div class="subtabs">${[['all','전체'],['gear','장비'],['consume','소비'],['material','재료'],['mission','미션·주문서']].map(([id,l])=>`<button data-filter="${id}" class="${filter===id?'active':''}">${l}</button>`).join('')}</div><div class="item-grid">${cells.join('')}${Array.from({length:Math.max(0,24-cells.length)},()=>'<span class="item-cell empty"></span>').join('')}</div><div id="item-detail">아이템을 누르면 사용하거나 장착합니다. 재료는 상점에서 팔 수 있습니다.</div></div></div>`;}
 function gearDesc(it){return Object.entries(it).filter(([k])=>['physical','magic','physicalDefense','magicDefense','agility'].includes(k)).map(([k,v])=>({physical:'물공',magic:'마공',physicalDefense:'물방',magicDefense:'마방',agility:'민첩'}[k])+' +'+v).join(' ');}
 function bonuses(s){const b={physical:0,magic:0,physicalDefense:0,magicDefense:0,agility:0};for(const[id,it]of Object.entries(D.ITEMS)){if(it.kind!=='gear'||!s['equip_'+id]||!inv.gearOwned(s,id))continue;for(const k of Object.keys(b))b[k]+=it[k]||0;}return b;}
 function equip(s,id,api){const it=D.ITEMS[id];if(s.level<(it.lv||1))return api.toast(`Lv.${it.lv}부터 장착할 수 있습니다.`);for(const[oid,o]of Object.entries(D.ITEMS))if(o.kind==='gear'&&o.slot===it.slot)s['equip_'+oid]=false;s['equip_'+id]=true;}
 function magicPanel(a){const s=a.state;const rows=sp.mine(s).map(d=>{const cur=s.spells[d.id]||{lv:0,prog:0};const teacher=Object.entries(D.TEACHERS).find(([k,t])=>t.spells.includes(d.id));const need=cur.lv===0?d.lessons:d.lessons+cur.lv;const state=cur.lv?`Lv.${cur.lv}${d.basic?'/3':''}`:cur.prog?`수업 ${cur.prog}/${need}`:'미습득';const kind={single:'단일',aoe:'광역',heal:'회복',healall:'전체 회복',cure:'해제',buff:'강화'}[d.kind];
   return `<div class="item-row ${cur.lv?'':'dim'}"><div><b>${d.name}</b> <small>${d.el===null?'비속성':ELS[d.el]} · ${kind} · MP ${d.mp[0]}${d.status?' · '+(d.status==='random'?'랜덤 디버프':D.STATUS[d.status].name):''}${d.scroll?' · 주문서':''}</small><small>${D.RANKS[d.rank]}부터 · ${teacher?teacher[1].name+' 선생님':''} · 수업당 선행 ${d.sp}점 × ${need}회</small></div><span>${state}</span></div>`;}).join('');
  return `<div class="magic-summary"><div>마력 ${s.mp} / ${s.maxMp}<div class="meter mp"><i style="width:${s.mp/s.maxMp*100}%"></i></div></div><div><label>계급 <b>${D.RANKS[s.rank]}</b></label><label>익힌 마법 <b>${Object.values(s.spells).filter(v=>v.lv>0).length}</b></label></div></div><p class="sub">마법은 교실에서 선생님에게 선행 점수를 내고 <b>여러 번 수업</b>을 받아야 익힙니다. 광역 마법은 주문서를 고급 교실에서 해독합니다. 불꽃 → 얼음 → 대지 → 불꽃.</p>${rows}`;}
 function lessonsPanel(a,teacher){const s=a.state,t=D.TEACHERS[teacher];return `<span class="badge">${t.desc} · 선행 점수 ${s.sp}</span><h2>${t.name} 선생님의 수업</h2>`+t.spells.map(id=>{const d=D.SPELL[id],cur=s.spells[id]||{lv:0,prog:0},r=sp.learnable(s,id,teacher),need=cur.lv===0?d.lessons:d.lessons+cur.lv;return `<div class="item-row"><div><b>${d.name}</b><small>${d.kind==='aoe'?'적 전체':d.kind==='single'?'적 하나':d.kind}${d.status?' · '+(d.status==='random'?'랜덤 디버프':D.STATUS[d.status].name):''} · MP ${d.mp[0]} · ${D.RANKS[d.rank]}부터${d.scroll?' · '+D.ITEMS[d.scroll].name:''}</small><small>${cur.lv?`Lv.${cur.lv}`:'미습득'} · 진척 ${cur.prog}/${need}</small></div>${r.ok?`<button class="action" data-lesson="${id}">${d.sp}점 수업</button>`:`<span>${r.why}</span>`}</div>`;}).join('');}
 function petPanel(a){const s=a.state;const card=(p,i)=>{const d=D.PET[p.id],inParty=s.party.indexOf(i);return `<div class="item-row pet-row"><img src="${A}pet-images/${d.sprite}/idle${petEvolvedP(p)?2:1}.gif" alt=""><div><b>${esc(petDisplayName(p))}</b> <small>${d.el===null?'비속성':ELS[d.el]} · Lv.${p.lv}/${d.maxLevel}${petEvolvedP(p)?' · 진화':' · '+d.evolveAt+'레벨에 진화'}</small><small>HP ${p.hp}/${p.maxHp} · MP ${p.mp}/${p.maxMp} · 호감도 ${p.aff}% · 민첩 ${p.agi} · 경험치 ${p.xp}/${p.lv*35}</small><small>스킬: ${petSkills(p).map(k=>`<button class="mini ${p.skill===k?'on':''}" data-petskill="${i}:${k}" title="MP ${D.PSK[k].mp}">${D.PSK[k].name}</button>`).join(' ')}</small></div><button class="action" data-party="${i}">${inParty>=0?'집에 두기':'동행'}</button></div>`;};
  return `<span class="badge">펫 · 동행 ${s.party.length}/2 · 자격증 ${licenseOk(s)||s.party.length<2?'유효':'만료'}</span><h2>나의 펫</h2>${s.pets.length?s.pets.map(card).join(''):'<p>아직 펫이 없습니다. 펫 센터의 우디에게서 핀으로 살 수 있습니다.</p>'}<p class="note">동행 펫은 전투 경험치의 70%를 얻고, 만렙의 절반에서 모습과 스킬이 바뀝니다. 두 마리를 데리고 다니려면 펫 관리 자격증이 필요합니다(펫 센터 · 200핀 · 플레이 2시간). 펫 병원 휴버트(핀 치료), 육성소 바니(선행 점수 훈련), 펫 교실 펠리타(스킬).</p>`;}
 function shopPanel(a,shop){const s=a.state,sh=D.SHOPS[shop];const tab=ctx.shopTab||'buy';const buy=sh.buy.filter(id=>!(D.ITEMS[id].kind==='gear'&&inv.gearOwned(s,id))).map(id=>{const it=D.ITEMS[id];return `<div class="item-row"><div>${itemArt(id)} <b>${it.name}</b><small>${esc(it.desc||gearDesc(it))}${it.lv?' · Lv.'+it.lv:''} · 보유 ${inv.count(s,id)}</small></div><button class="action" data-buy="${id}">${it.price} 핀</button></div>`;}).join('');
  const sell=inv.list(s).filter(([id])=>D.ITEMS[id].sell>0&&D.ITEMS[id].kind!=='gear').map(([id,n])=>`<div class="item-row"><div>${itemArt(id)} <b>${D.ITEMS[id].name}</b> ×${n}<small>${esc(D.ITEMS[id].desc||'')}</small></div><button class="action" data-sell="${id}">${D.ITEMS[id].sell} 핀에 팔기</button><button class="action" data-sellall="${id}">전부</button></div>`).join('')||'<p>팔 수 있는 아이템이 없습니다.</p>';
  return `<span class="badge">${sh.name} · ${s.gold} 핀</span><h2>${tab==='buy'?'구매':'판매'}</h2>${sh.sellAll?`<div class="subtabs"><button data-shoptab="buy" class="${tab==='buy'?'active':''}">사기</button><button data-shoptab="sell" class="${tab==='sell'?'active':''}">팔기</button></div>`:''}${tab==='buy'?buy:sell}`;}
 function roomPanel(a){const s=a.state;const owned=inv.list(s).filter(([id])=>D.ITEMS[id].kind==='furniture');const grid=s.room.placed.map((id,i)=>`<button class="room-slot" data-slot="${i}" title="${id?esc(D.ITEMS[id].name):'빈 자리'}">${id?`<img src="${window.ARPIA_ROOM_ART?.[id]||'assets/room/'+id+'.png'}" alt="${esc(D.ITEMS[id].name)}">`:'·'}</button>`).join('');
  const has=id=>s.room.placed.includes(id);const plant=has('fur_plant')?`<div class="item-row"><div>${itemArt('fur_plant')} 마법 화분 · ${['씨앗','새싹','꽃봉오리','활짝'][s.plantStage]||'활짝'}<small>물을 주면 자랍니다. 다 자라면 약초를 얻습니다.</small></div><button class="action" id="room-water">${s.plantStage>=3?'약초 수확':'물 주기'}</button></div>`:'';
  return `<span class="badge">기숙사 마이룸</span><h2>마이룸</h2><img class="room-image" src="assets/maps-hires/mini-room.webp" alt="아르피아 기숙사 방"><div class="room-grid">${grid}</div><p class="sub">가구는 상점가 버비 가구점에서 삽니다. 자리를 누르면 가방의 가구를 놓거나 치웁니다.</p><div class="room-inv">${owned.map(([id,n])=>`<button class="mini" data-place="${id}">${itemArt(id)} ${D.ITEMS[id].name}${n>1?' ×'+n:''}</button>`).join('')||'<small>가방에 가구가 없습니다.</small>'}</div>${plant}<button class="action" id="room-rest">방에서 쉬기${has('fur_bed')?' · 포근한 침대':''}</button>${has('fur_desk')?'<button class="action" id="room-study">책상에서 공부 (선행 +5)</button>':''}${has('fur_bookcase')?'<button class="action" id="room-read">마법 복습 (MP 회복)</button>':''}<button class="action" id="room-go">기숙사로 가기</button>`;}
 function codexPanel(a){const s=a.state;const tab=ctx.codexTab||'mon';const MON=window.ARPIA_MONSTERS||{};const mons=Object.values(MON).map(m=>{const seen=s.codex.mon[m[0]];return `<div class="item-row ${seen?'':'dim'}"><div><b>${seen?m[0]:'???'}</b><small>${seen?`${ELS[m[1]]} 속성 · HP ${m[2]} · ${(D.DROPS[m[0]]||[]).map(([id,c])=>D.ITEMS[id].name+' '+Math.round(c*100)+'%').join(', ')||'드롭 없음'}`:'아직 만나지 못한 몬스터'}</small></div></div>`;}).join('');
  const items=Object.entries(D.ITEMS).filter(([id,it])=>it.kind!=='gear').map(([id,it])=>`<div class="item-row ${s.codex.items[id]||inv.count(s,id)?'':'dim'}"><div>${itemArt(id)} <b>${s.codex.items[id]||inv.count(s,id)?it.name:'???'}</b><small>${s.codex.items[id]||inv.count(s,id)?esc(it.desc||''):''}</small></div></div>`).join('');
  const spells=D.SPELLS.map(d=>`<div class="item-row ${sp.known(s,d.id)?'':'dim'}"><div><b>${d.name}</b><small>${d.el===null?'비속성':ELS[d.el]} · ${d.kind} · ${D.RANKS[d.rank]}</small></div></div>`).join('');
  const pets=D.PETS.map(d=>{const own=s.pets.some(p=>p.id===d.id);return `<div class="item-row ${own?'':'dim'}"><img src="${A}pet-images/${d.sprite}/idle1.gif" style="height:44px" alt=""><div><b>${d.name}</b><small>${d.el===null?'비속성':ELS[d.el]} · 만렙 ${d.maxLevel} · 진화 ${d.evolveAt} · ${d.price?d.price+'핀':d.story?'이야기':'미션'} · 스킬 ${[...d.skills,...d.evolved].map(k=>D.PSK[k].name).join('·')}</small></div></div>`;}).join('');
  return `<span class="badge">도서관 멜리의 도감</span><h2>도감</h2><div class="subtabs">${[['mon','몬스터'],['items','아이템'],['spells','마법서'],['pets','펫']].map(([id,l])=>`<button data-codex="${id}" class="${tab===id?'active':''}">${l}</button>`).join('')}</div><div class="codex-list">${{mon:mons,items,spells,pets}[tab]}</div>`;}
 function colosseumPanel(a){const s=a.state;return `<span class="badge">콜로세움 · 딕 · 연승 ${s.colWins} (최고 ${s.colBest})</span><h2>NPC 대전</h2><p class="sub">원작의 유저 대전 대신 학교 친구와 명사들이 상대합니다. 이길 때마다 핀을 받고 연승이 쌓입니다. 지면 연승이 끊깁니다.</p>${D.COLOSSEUM.map(o=>`<div class="item-row"><div><b>${o.name}</b><small>권장 Lv.${o.lv} · 상대 ${o.enemies.map(e=>e.name).join(', ')} · 보상 ${o.gold} 핀</small></div><button class="action" data-col="${o.id}" ${s.level<o.lv-5?'disabled':''}>도전</button></div>`).join('')}`;}
 function petshopPanel(a){const s=a.state;return `<span class="badge">펫 샵 · 우디 · ${s.gold} 핀</span><h2>펫 구매</h2>${D.PET_SHOP.map(id=>{const d=D.PET[id];const own=s.pets.some(p=>p.id===id);return `<div class="item-row"><img src="${A}pet-images/${d.sprite}/idle1.gif" style="height:52px" alt=""><div><b>${d.name}</b><small>${d.el===null?'비속성':ELS[d.el]} · 만렙 ${d.maxLevel} · 스킬 ${d.skills.map(k=>D.PSK[k].name).join('·')} → 진화 ${d.evolved.map(k=>D.PSK[k].name).join('·')}</small></div><button class="action" data-buypet="${id}" ${own?'disabled':''}>${own?'보유 중':d.price+' 핀'}</button></div>`;}).join('')}<p class="note">펫은 가방이 아니라 펫 정보 창에서 동행을 정합니다. 두 마리 동행에는 자격증이 필요합니다.</p>`;}
 function vetPanel(a){const s=a.state;const hurt=s.pets.filter(p=>p.hp<p.maxHp||p.mp<p.maxMp);const cost=hurt.length*10;return `<span class="badge">펫 병원 · 휴버트 · ${s.gold} 핀</span><h2>펫 치료</h2>${s.pets.map(p=>`<div class="item-row"><div><b>${esc(petDisplayName(p))}</b><small>HP ${p.hp}/${p.maxHp} · MP ${p.mp}/${p.maxMp}</small></div></div>`).join('')||'<p>펫이 없습니다.</p>'}<button class="action" id="vet-heal" ${cost?'':'disabled'}>전부 치료 · ${cost} 핀</button><div class="item-row"><div><b>펫 관리 자격증</b><small>${licenseOk(s)&&s.licenseUntil>s.seconds?`유효 · 남은 시간 ${Math.ceil((s.licenseUntil-s.seconds)/60)}분`:'없음 또는 만료 · 두 마리 동행에 필요'}</small></div><button class="action" id="vet-license">200 핀 갱신</button></div>`;}
 function trainerPanel(a){const s=a.state;return `<span class="badge">펫 육성소 · 바니 · 선행 점수 ${s.sp}</span><h2>펫 훈련</h2>${s.party.map(i=>s.pets[i]).map((p,k)=>`<div class="item-row"><div><b>${esc(petDisplayName(p))}</b><small>민첩 ${p.agi} · 최대 HP ${p.maxHp} · 최대 MP ${p.maxMp} · 호감도 ${p.aff}%</small></div><span>${[['agi','민첩 +2',15],['hp','체력 +6',15],['mp','마력 +2',15],['aff','교감 +8',10]].map(([t,l,c])=>`<button class="mini" data-train="${s.party[k]}:${t}:${c}">${l} (${c}점)</button>`).join(' ')}</span></div>`).join('')||'<p>동행 중인 펫이 없습니다.</p>'}<p class="note">원작처럼 훈련은 선행 점수를 씁니다. 민첩은 행동 게이지 속도입니다.</p>`;}
 function teleportPanel(a){const s=a.state;const spots=[['tp_fire','불꽃 마을','firevillage'],['tp_ice','얼음 마을','icevillage'],['tp_earth','대지 마을','earthvillage']];return `<span class="badge">바바라의 텔레포트 항아리</span><h2>어디로 갈까?</h2><p class="sub">각 마을 촌장에게 좌표를 받은 곳으로만 보낼 수 있어. 마을 앞 마법진에 내려 줄게.</p>${spots.map(([f,n,id])=>`<div class="item-row"><div><b>${n}</b><small>${s[f]?'좌표 등록됨':'프리 미션 「'+n+' 주변 텔레포트 좌표 받기」 필요'}</small></div><button class="action" data-tp="${id}" ${s[f]?'':'disabled'}>이동</button></div>`).join('')}`;}
 function mailPanel(a){const s=a.state;const letters=D.LETTERS.filter(l=>s.stage>=l.stage);return `<span class="badge">콘라드의 우체국 · 편지함</span><h2>받은 편지</h2>${letters.map(l=>`<div class="item-row ${s.mailRead.includes(l.id)?'dim':''}"><div><b>${l.title}</b><small>${l.from}</small><small>${l.body}</small></div>${l.gift&&!s.mailRead.includes(l.id)?`<button class="action" data-mail="${l.id}">선물 받기</button>`:s.mailRead.includes(l.id)?'<span>읽음</span>':`<button class="action" data-mail="${l.id}">읽음</button>`}</div>`).join('')||'<p>편지가 없습니다.</p>'}`;}
 function quizPanel(a){const s=a.state;const ready=s.seconds-s.quizAt>600||!s.quizAt;if(!ready)return `<span class="badge">퀴즈포켓</span><h2>퀴즈 시간</h2><p>다음 퀴즈는 ${Math.ceil((600-(s.seconds-s.quizAt))/60)}분 뒤에 낼 수 있어!</p>`;const q=D.QUIZ[Math.floor(Math.random()*D.QUIZ.length)];ctx.quiz=q;return `<span class="badge">퀴즈포켓 · 정답이면 선행 점수 +5</span><h2>${q[0]}</h2>${q[1].map((c,i)=>`<button class="action" data-quiz="${i}">${c}</button>`).join('')}`;}
 function spaPanel(a){const s=a.state;return `<span class="badge">건강센터 · 부마</span><h2>흙찜질과 샤워</h2><p class="sub">원작처럼 무료지만 1%씩 천천히 회복됩니다. 창을 닫지 말고 기다리세요.</p><div class="meter hp"><i id="spa-hp" style="width:${s.hp/s.maxHp*100}%"></i></div><div class="meter mp"><i id="spa-mp" style="width:${s.mp/s.maxMp*100}%"></i></div><p id="spa-text">HP ${s.hp}/${s.maxHp} · MP ${s.mp}/${s.maxMp}</p><button class="action" id="spa-start">찜질 시작</button>`;}
 function exchangePanel(a,who){const s=a.state;if(who==='kobi')return `<span class="badge">코비의 교환소</span><h2>마나스톤 교환 · 지팡이 강화</h2><div class="item-row"><div><b>마나스톤 7개 → 강화 마나스톤 1개</b><small>보유 마나스톤 ${inv.count(s,'manastone')}</small></div><button class="action" id="ex-mana" ${inv.count(s,'manastone')>=7?'':'disabled'}>교환</button></div><div class="item-row"><div><b>지팡이 강화</b><small>강화 마나스톤 3개 + 500핀 → 강화 지팡이 (물공 12 · 마공 14 · Lv.15)</small></div><button class="action" id="ex-staff" ${inv.count(s,'manastone_plus')>=3&&s.gold>=500&&!inv.gearOwned(s,'staff_plus')?'':'disabled'}>${inv.gearOwned(s,'staff_plus')?'완료':'강화'}</button></div>`;
  return `<span class="badge">오당카의 매입</span><h2>얼음 재료 매입</h2>${[['icepiece',1000],['iceblood',800]].map(([id,pr])=>`<div class="item-row"><div>${itemArt(id)} <b>${D.ITEMS[id].name}</b><small>보유 ${inv.count(s,id)}</small></div><button class="action" data-odsell="${id}:${pr}" ${inv.count(s,id)?'':'disabled'}>${pr} 핀에 팔기</button></div>`).join('')}`;}
 function panel(kind,a,arg){reconcile(a.state);switch(kind){case'inventory':return inventoryPanel(a);case'magic':return magicPanel(a);case'pet':return petPanel(a);case'shop':return shopPanel(a,arg||'sam');case'room':return roomPanel(a);case'codex':return codexPanel(a);case'colosseum':return colosseumPanel(a);case'petshop':return petshopPanel(a);case'vet':return vetPanel(a);case'trainer':return trainerPanel(a);case'teleport':return teleportPanel(a);case'mail':return mailPanel(a);case'lessons':return lessonsPanel(a,arg);case'quiz':return quizPanel(a);case'spa':return spaPanel(a);case'exchange':return exchangePanel(a,arg);}return null;}
 function bind(kind,a,arg){const s=a.state,$=id=>document.getElementById(id);const q=sel=>document.querySelectorAll(sel);const re=(k=kind,g=arg)=>a.openPanel(k,g);
  q('[data-filter]').forEach(b=>b.onclick=()=>{ctx.itemFilter=b.dataset.filter;re();});
  q('[data-item][data-mode="use"]').forEach(b=>b.onclick=()=>{const id=b.dataset.item,it=D.ITEMS[id];if(it.kind!=='consume'){$('item-detail').textContent=`${it.name}: ${it.desc||'재료입니다.'}`;return;}const r=useItem(s,id,null,false);if(r?.fail)return a.toast(r.fail);a.toast(r.msg);a.chime('heal');a.save();a.update();re();});
  q('[data-gear]').forEach(b=>b.onclick=()=>{equip(s,b.dataset.gear,a);a.save();a.update();re();});
  q('[data-unequip]').forEach(b=>b.onclick=()=>{if(b.dataset.unequip){s['equip_'+b.dataset.unequip]=false;a.save();a.update();re();}});
  q('[data-lesson]').forEach(b=>b.onclick=()=>{const r=sp.lesson(s,b.dataset.lesson,arg);if(!r.ok)return a.toast(r.why);a.chime(r.done?'win':'magic');a.toast(r.done?`${D.SPELL[b.dataset.lesson].name}${r.lv>1?' Lv.'+r.lv:''}을(를) 익혔습니다!`:`수업 ${r.prog}/${r.need} · 조금 더 연습하자.`);a.save();a.update();re();});
  q('[data-party]').forEach(b=>b.onclick=()=>{const i=+b.dataset.party,k=s.party.indexOf(i);if(k>=0){if(s.party.length===1)return a.toast('펫은 최소 한 마리 동행합니다.');s.party.splice(k,1);}else{if(s.party.length>=2)return a.toast('두 마리까지만 동행할 수 있습니다.');if(s.party.length===1&&s.licenseUntil<=s.seconds)return a.toast('두 마리 동행에는 펫 관리 자격증이 필요합니다 (펫 병원 휴버트).');s.party.push(i);}syncPets(s);a.save();a.update();re();});
  q('[data-petskill]').forEach(b=>b.onclick=()=>{const[i,k]=b.dataset.petskill.split(':');s.pets[+i].skill=k;a.save();re();});
  q('[data-shoptab]').forEach(b=>b.onclick=()=>{ctx.shopTab=b.dataset.shoptab;re();});
  q('[data-buy]').forEach(b=>b.onclick=()=>{const id=b.dataset.buy,it=D.ITEMS[id];if(s.gold<it.price)return a.toast('핀이 부족합니다.');s.gold-=it.price;if(it.kind==='gear')s['own_'+id]=true;else inv.add(s,id,1);a.chime();a.save();a.update();re();});
  q('[data-sell]').forEach(b=>b.onclick=()=>{const id=b.dataset.sell;if(inv.remove(s,id,1)){s.gold+=D.ITEMS[id].sell;a.chime();a.save();a.update();re();}});
  q('[data-sellall]').forEach(b=>b.onclick=()=>{const id=b.dataset.sellall,n=inv.count(s,id);if(inv.remove(s,id,n)){s.gold+=D.ITEMS[id].sell*n;a.chime();a.save();a.update();re();}});
  q('[data-odsell]').forEach(b=>b.onclick=()=>{const[id,pr]=b.dataset.odsell.split(':');if(inv.remove(s,id,1)){s.gold+=+pr;a.chime();a.save();a.update();re();}});
  q('[data-slot]').forEach(b=>b.onclick=()=>{const i=+b.dataset.slot;if(s.room.placed[i]){inv.add(s,s.room.placed[i],1);s.room.placed[i]=null;}else if(ctx.placing){s.room.placed[i]=ctx.placing;inv.remove(s,ctx.placing,1);ctx.placing=null;}else return a.toast('먼저 아래에서 놓을 가구를 고르세요.');a.save();re();});
  q('[data-place]').forEach(b=>b.onclick=()=>{ctx.placing=b.dataset.place;a.toast(`${D.ITEMS[ctx.placing].name}: 놓을 자리를 누르세요.`);});
  if($('room-rest'))$('room-rest').onclick=()=>{s.hp=s.maxHp;s.mp=s.maxMp;if(s.room.placed.includes('fur_bed')){s.bedBuff=s.seconds+300;}a.save();a.update();a.close();a.toast('푹 쉬었습니다. HP · MP 완전 회복');};
  if($('room-study'))$('room-study').onclick=()=>{if(s.seconds-s.studyAt<1800&&s.studyAt)return a.toast('공부는 30분에 한 번만 됩니다.');s.studyAt=s.seconds;s.sp+=5;a.toast('선행 점수 +5');a.save();a.update();re();};
  if($('room-read'))$('room-read').onclick=()=>{s.mp=s.maxMp;a.toast('마법을 복습했습니다. MP 회복');a.save();a.update();re();};
  if($('room-water'))$('room-water').onclick=()=>{if(s.plantStage>=3){s.plantStage=0;inv.add(s,'herb',2);a.toast('약초 2개를 수확했습니다.');}else{if(s.seconds-s.plantAt<600&&s.plantAt)return a.toast('아직 흙이 촉촉합니다. 10분 뒤에 다시 주세요.');s.plantAt=s.seconds;s.plantStage++;a.toast('물을 주었습니다.');}a.save();re();};
  if($('room-go'))$('room-go').onclick=()=>{a.close();a.travel('room',[200,340]);};
  q('[data-codex]').forEach(b=>b.onclick=()=>{ctx.codexTab=b.dataset.codex;re();});
  q('[data-col]').forEach(b=>b.onclick=()=>{const o=D.COLOSSEUM.find(x=>x.id===b.dataset.col);X.encounters['col_'+o.id]={name:'콜로세움 · '+o.name,intro:`딕의 진행으로 ${o.name}와 대전합니다.`,bg:'assets/maps-hires/colosseum.webp',colosseum:o.id,freeBattle:true,xp:Math.round(o.enemies.reduce((t,e)=>t+e.hp,0)/4),gold:o.gold,sp:0,enemies:o.enemies.map((e,j)=>({...e,maxHp:e.hp,atb:j*10}))};a.close();a.battle('col_'+o.id);});
  q('[data-buypet]').forEach(b=>b.onclick=()=>{const d=D.PET[b.dataset.buypet];if(s.gold<d.price)return a.toast('핀이 부족합니다.');s.gold-=d.price;addPet(s,d.id);a.chime('win');a.toast(`${d.name}이(가) 가족이 되었습니다!`);a.save();a.update();re();});
  if($('vet-heal'))$('vet-heal').onclick=()=>{const hurt=s.pets.filter(p=>p.hp<p.maxHp||p.mp<p.maxMp),cost=hurt.length*10;if(s.gold<cost)return a.toast('핀이 부족합니다.');s.gold-=cost;for(const p of hurt){p.hp=p.maxHp;p.mp=p.maxMp;}syncPets(s);a.chime('heal');a.save();a.update();re();};
  if($('vet-license'))$('vet-license').onclick=()=>{if(s.gold<200)return a.toast('핀이 부족합니다.');s.gold-=200;s.licenseUntil=Math.max(s.seconds,s.licenseUntil)+7200;a.toast('자격증을 갱신했습니다 (플레이 2시간).');a.save();a.update();re();};
  q('[data-train]').forEach(b=>b.onclick=()=>{const[i,t,c]=b.dataset.train.split(':');if(s.sp<+c)return a.toast(`선행 점수 ${c}가 필요합니다.`);const p=s.pets[+i];s.sp-=+c;if(t==='agi')p.agi=Math.min(80,p.agi+2);if(t==='hp'){p.maxHp+=6;p.hp+=6;}if(t==='mp'){p.maxMp+=2;p.mp+=2;}if(t==='aff')p.aff=Math.min(100,p.aff+8);syncPets(s);a.chime();a.save();a.update();re();});
  q('[data-tp]').forEach(b=>b.onclick=()=>{const id=b.dataset.tp;a.close();a.travel(id,window.ARPIA_TILEMAP?.has(id)?window.ARPIA_TILEMAP.spot(id,'back'):undefined);a.toast('바바라의 항아리가 마을 앞 마법진으로 데려다 주었습니다.');});
  q('[data-mail]').forEach(b=>b.onclick=()=>{const l=D.LETTERS.find(x=>x.id===b.dataset.mail);if(!s.mailRead.includes(l.id)){s.mailRead.push(l.id);if(l.gift)for(const[id,n]of Object.entries(l.gift))inv.add(s,id,n);if(l.gift)a.toast('선물을 받았습니다.');}a.save();a.update();re();});
  q('[data-quiz]').forEach(b=>b.onclick=()=>{const ok=+b.dataset.quiz===ctx.quiz[2];s.quizAt=s.seconds;if(ok){s.sp+=5;s.quizScore++;a.chime('win');a.toast('정답! 선행 점수 +5');}else{a.chime('hit');a.toast(`아쉽다! 정답은 ${ctx.quiz[1][ctx.quiz[2]]}.`);}a.save();a.update();a.close();});
  if($('spa-start'))$('spa-start').onclick=()=>{$('spa-start').disabled=true;const tick=()=>{if(!document.getElementById('spa-text'))return;s.hp=Math.min(s.maxHp,s.hp+Math.max(1,Math.round(s.maxHp*.01)));s.mp=Math.min(s.maxMp,s.mp+Math.max(1,Math.round(s.maxMp*.01)));$('spa-hp').style.width=s.hp/s.maxHp*100+'%';$('spa-mp').style.width=s.mp/s.maxMp*100+'%';$('spa-text').textContent=`HP ${s.hp}/${s.maxHp} · MP ${s.mp}/${s.maxMp}`;a.update();if(s.hp<s.maxHp||s.mp<s.maxMp)setTimeout(tick,1500);else{a.save();a.toast('개운하다! 완전 회복');}};tick();};
  if($('ex-mana'))$('ex-mana').onclick=()=>{if(inv.remove(s,'manastone',7)){inv.add(s,'manastone_plus',1);a.chime();a.save();re();}};
  if($('ex-staff'))$('ex-staff').onclick=()=>{if(inv.remove(s,'manastone_plus',3)&&s.gold>=500){s.gold-=500;s.own_staff_plus=true;equip(s,'staff_plus',a);a.chime('win');a.toast('지팡이가 강화되었습니다!');a.save();a.update();re();}};
 }
 // ------------------------------------------------------------ npc services & extra field objects
 function interact(e,a,goal){const s=a.state;const id=e.id;reconcile(s);const open=(k,g)=>{a.openPanel(k,g);return true;};
  if(e.type==='gather'){const it=D.ITEMS[e.item];const until=s.gatherAt[e.gid]||0;if(until>s.seconds)return a.talk([['narrator',`${it.name}은(는) 아직 다시 자라지 않았다. (${Math.ceil((until-s.seconds)/60)}분)`]]),true;s.gatherAt[e.gid]=s.seconds+(e.respawn||600);inv.add(s,e.item,e.qty||1);a.toast(`${it.name} ×${e.qty||1} 획득`);a.chime('win');a.save();a.refresh();return true;}
  const teacherOf={esta:'esta',scoll:'scoll',ishubike:'ishubike',aron:'aron',naomi:'naomi',ryoma:'ryoma',rie:'rie',flameTeacher:'esta'};
  if(teacherOf[id]&&['classroom','lobby'].includes(s.scene)&&(s.spell||s.stage>=11))return a.talk([[id,'오늘도 수업을 들으러 왔구나. 선행 점수를 준비했니? 마법은 반복해서 익히는 거란다.']],()=>a.openPanel('lessons',teacherOf[id])),true;
  if(id==='sam')return open('shop','sam');if(id==='bubby')return open('shop','bubby');if(id==='abdullah'&&s.stage>=126)return open('shop','abdullah');
  if(id==='woody')return open('petshop');if(id==='hubert'&&!goal)return open('vet');if(id==='bani')return open('trainer');
  if(id==='felita')return a.talk([['felita','펫은 각자 체력과 마력, 호감도와 민첩도를 가진 소중한 친구야. 만렙의 절반이 되면 모습과 스킬이 달라져.'],['felita','스킬은 펫 정보 창에서 고를 수 있어. 두 마리를 데리고 다니려면 휴버트에게 자격증을 받으렴.']],()=>a.openPanel('pet')),true;
  if(id==='dick')return open('colosseum');if(id==='meli'&&!goal)return a.talk([['meli','도감을 열어 볼래? 만난 몬스터와 얻은 물건, 마법서와 펫이 정리되어 있단다.']],()=>a.openPanel('codex')),true;
  if(id==='conrad'&&!goal)return open('mail');if(id==='barbara'&&s.stage>=272&&!goal)return open('teleport');if(id==='teleshop')return open('teleport');
  if(id==='quizpocket'||id==='quizpocket2')return open('quiz');if(id==='buma'&&!goal)return open('spa');
  if(id==='kobi'&&s.stage>=96&&!goal)return a.talk([['kobi','마나스톤 7개를 모아 오면 강화 마나스톤으로 바꿔 주지. 강화 마나스톤 3개면 지팡이도 강화해 줄 수 있어.']],()=>a.openPanel('exchange','kobi')),true;
  if(id==='odangka'&&s.stage>=170&&!goal)return a.talk([['odangka','얼음조각이나 얼음 몬스터의 피가 있으면 내가 비싸게 사 주지. 연구에 필요하거든.']],()=>a.openPanel('exchange','odangka')),true;
  if(id==='amela'&&!goal){const cost=Math.min(10,s.sp);if(s.hp>=s.maxHp&&s.mp>=s.maxMp)return a.talk([['amela','지금은 아주 건강하구나. 다치면 언제든 오렴.']]),true;return a.talk([['amela',`치료에는 선행 점수 ${cost}점이 들어. 괜찮지?`]],()=>{s.sp-=cost;s.hp=s.maxHp;s.mp=s.maxMp;for(const p of s.pets){p.hp=p.maxHp;p.mp=p.maxMp;}syncPets(s);a.chime('heal');a.toast(`HP · MP 회복 · 선행 점수 −${cost}`);a.save();a.refresh();}),true;}
  return false;}
 function decorate(sc,s,n,p){const add=(id,x,y,fixture)=>{if(!sc.entities.some(e=>e.id===id))sc.entities.push({...n(id,x,y),...(fixture?{type:'fixture'}:{})});};
  if(sc.id==='classroom'&&s.stage>=11)add('rie',860,150);
  if(sc.id==='shop'){add('bubby',150,440);add('teleshop',640,470);if(s.stage>=272)add('barbara',700,380);}
  if(sc.id==='petcenter'){add('woody',560,300);add('hubert',480,430);add('bani',360,470);}
  if(sc.id==='arena')add('dick',470,300);
  if(sc.id==='principal')add('quizpocket',700,200);if(sc.id==='hut')add('quizpocket2',600,470);
  if(sc.id==='infirmary')add('buma',255,204);
  if(sc.id==='library')add('meli',455,225);
  // gather points
  const gather=(gid,item,x,y,qty=1,respawn=600)=>{if(!sc.entities.some(e=>e.gid===gid))sc.entities.push({id:'gather_'+gid,gid,type:'gather',item,qty,respawn,x,y,label:D.ITEMS[item].name});};
  if(sc.id==='weila'){gather('lala1','lala',7470,2950,2);gather('lala2','lala',7900,2620,2);gather('dia1','diamond',640,5440,1,1800);gather('fish1','manastone',8720,7350,1,900);gather('wood1','firewood',7040,9420,3);gather('herb1','herb',5600,5900,2);gather('herb2','herb',9800,4600,2);}
  if(sc.id==='woodhall')gather('wood2','firewood',2160,540,2,900);if(sc.id==='koboldroom')gather('coal1','charcoal',850,250,1,900);
  if(sc.id==='minedepths'&&s.stage>=101)gather('gold_old','goldnugget',0,0,1,3600);
 }
 {const prevDec=X.decorate;X.decorate=(sc,s,n,p)=>{prevDec(sc,s,n,p);decorate(sc,s,n,p);};}
 Object.assign(X.npcs,{rie:{name:'리에',anim:'npc_new_리에',portrait:'teacher/리에.png'},bubby:{name:'버비',anim:'npc_new_버비'},woody:{name:'우디',anim:'npc_new_우디'},bani:{name:'바니',anim:'npc_new_바니'},dick:{name:'딕',anim:'npc_new_딕'},quizpocket:{name:'퀴즈포켓',anim:'npc_new_퀴즈포켓'},quizpocket2:{name:'퀴즈포켓 동생',anim:'npc_new_퀴즈포켓2'},teleshop:{name:'텔레포트 점',artPath:'assets/objects/teleport-jar.png',height:60},meli:{name:'멜리',anim:'npc_038_도트_멜리'},hubert:{name:'휴버트',anim:'npc_new_휴버트'}});
 // ------------------------------------------------------------ misc
 function recall(a){const s=a.state;if(s.scene==='campus')return a.toast('이미 학교 앞입니다.');a.toast('학생 반지의 힘으로 아르피아로 돌아갑니다.');a.travel('campus',[515,450]);}
 function rankName(s){return D.RANKS[clamp(s.rank||0,0,4)];}
 function examReady(s,rank){return s.level>=D.RANK_LEVEL[rank]&&s.rank===rank-1;}
 return{D,migrate,inv,useItem,sp,pets:{newPet,addPet,reconcile,partyPet,petSkills,petEvolved,petName,petSprite,petWalk,petMax,syncPets,pullPets,licenseOk,display:petDisplayName},status:{apply:applyStatus,text:statusText,begin:beginTurn},alliesFor,onVictory,battleAction,tickBattle,renderBattleUI,startBattleHook,panel,bind,kinds,interact,decorate,bonuses,equip,recall,rankName,examReady,ctx};
})();
