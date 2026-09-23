/* Playable corrections verified against 8/12/18/19/20/23/24/26/28/29/30/33/34 captures.
   Counts and event order follow the captures; combat balance remains reconstructed. */
(()=>{
 const x=ARPIA_EXTRA,m=ARPIA_MIDTERM,chapter=n=>m.chapters.find(c=>c.number===n);
 const basePeople={scoll:{name:'스콜',anim:'npc_007_도트_스콜'},isaac:{name:'아이작',anim:'npc_005_도트_아이작'},edward:{name:'에드워드',anim:'npc_013_도트_에드워드 장군'},matilda:{name:'마틸다',sprite:'assets/original/character/friend/마틸다.png'}};
 const person=id=>x.npcs[id]||basePeople[id];
 const ally=(id,hp,atk,skill='attack')=>{const p=person(id);return{id,npc:id,name:p.name,hp,maxHp:hp,atk,skill,sprite:p.sprite||'assets/original/animation/'+p.anim+'/idle.gif'};};
 const fight=(id,name,n,next,enemies,allies=[])=>x.encounters[id]={name,intro:name,next:chapter(n).keys[next],bg:'assets/maps-hires/colosseum.png',xp:200,gold:0,sp:25,enemies,allies};
 const mon=(name,hp,atk,sprite,element=2)=>({name,hp,maxHp:hp,atk,atb:10,sprite,element});
 const people=(id,hp,atk)=>({...mon(person(id).name,hp,atk,null),npc:id});
 Object.assign(x.npcs,{emptyWaterfallAudit:{name:'폭포 주변 살펴보기'},dogBypass30:{name:'물보라 뒤의 좁은 길'},diveSearch28:{name:'수중 방 살펴보기'}});
 x.npcs.fairyMedicine12={name:'미로에 보관된 요정의 약',artPath:'assets/items/hipotion.png',height:36};
 Object.assign(x.defaults,{fairySearch12:false,fairyFound12:false});
 const fairyQuest=x.quests[197-42];
 fairyQuest[1]='기욤에게 5만 핀 전달 → 궁전 미로에서 요정의 약 찾기 → 기욤에게 돌아가기';
 const priorInteract=x.interact;
 x.interact=(e,a)=>{
  const s=a.state;
  if(s.stage===197&&e.id==='guillaume'&&s.scene==='minedepths'){
   if(!s.fairySearch12){
    a.talk([['guillaume','5만 핀을 가져왔군. 약은 난쟁이 궁전 미로의 보관함에 넣어 두었네.'],['edward','돈까지 받아 놓고 약도 직접 찾으라는 겁니까?'],['guillaume','귀한 약이니 안전한 곳에 둬야지. 미로에서 찾은 다음 여기로 돌아오게.'],['you','할아버지가 기다리고 계세요. 다투는 것보다 찾아오는 게 빠르겠어요.']],()=>{s.exchangePin=0;s.fairySearch12=true;a.refresh();a.save();});
   }else if(!s.fairyFound12)a.talk([['guillaume','궁전 미로의 보관함을 살펴보게. 약을 찾으면 에드워드와 함께 돌아가면 되겠군.']]);
   else a.talk([['you','요정의 약을 찾았어요. 이제 할아버지께 돌아갈게요.'],['edward','여기서 우리는 헤어지세. 나는 왕궁으로 돌아가야 하네. 할아버지께서 쾌차하시길 바라겠네.'],['you','함께 와 주셔서 감사해요. 이 약으로 꼭 나으셨으면 좋겠어요.'],['guillaume','약은 제대로 챙겼겠지? 병을 깨뜨리지 않도록 조심하게.']],()=>{s.fairyMedicine=true;a.advance(198,10);a.refresh();a.save();});
   return true;
  }
  if(s.stage===197&&e.id==='fairyMedicine12'&&s.scene==='dwarfpalace'){
   a.talk([['narrator','보관함 안에서 요정의 약을 찾았다. 병을 기울이자 은은한 빛이 흔들렸다.'],['you','이제 기욤에게 돌아가서 에드워드와 함께 출발하자.']],()=>{s.fairyFound12=true;a.refresh();a.save();});return true;
  }
  return priorInteract(e,a);
 };
 Object.assign(x.defaults,{huntCount12:0,huntCount18:0,huntCount26:0,huntCount29:0,huntCount30:0,huntCount34:0,searchRooms28:0,dogBypass30:false,familyProof31:false,bandMoleRoomKnown26:false});
 const counted=[];
 // Episode 13: two different five-target hunts, not a single generic skirmish.
 const cookingHunt=x.encounters.waitmonsters13;
 delete cookingHunt.setFlag;
 cookingHunt.prepare=s=>{const golem=(s.golems13||0)<5,remaining=5-(s[golem?'golems13':'mercenaries13']||0);return{enemies:Array.from({length:Math.max(1,Math.min(3,remaining))},()=>mon(golem?'골렘':'떠돌이 용병',golem?250:220,golem?18:19,golem?'examGolem':'flameSoldier'))};};
 cookingHunt.onWin=(s,b)=>{for(const e of b.enemies.filter(e=>e.hp<=0)){const key=e.name==='골렘'?'golems13':'mercenaries13';s[key]=Math.min(5,(s[key]||0)+1);}if(s.golems13===5&&s.mercenaries13===5)s.soyCrabDish=true;};
 cookingHunt.next=s=>s.golems13===5&&s.mercenaries13===5?232:231;
 cookingHunt.progress=s=>`골렘 ${s.golems13||0}/5마리 · 용병 ${s.mercenaries13||0}/5명`;
 cookingHunt.intro='오당카가 요리를 준비하는 동안 골렘 다섯 마리와 용병 다섯 명을 물리치세요.';
 x.npcs.waitmonsters13={name:'골렘과 용병 사냥'};
 x.encounters.edward13.enemies[0].npc='edward';
 x.encounters.edward13.allies=[{id:'odangka',npc:'odangka',name:'오당카',hp:550,maxHp:550,atk:40,skill:'attack',sprite:'assets/original/animation/npc_017_도트_오당카/idle.gif'}];
 function hunt(id,field,total,stage,next,label){
  const e=x.encounters[id],originalWin=e.onWin,flag=e.setFlag,pool=e.enemies;
  delete e.setFlag;e.prepare=s=>({enemies:pool.slice(0,Math.max(1,Math.min(pool.length,total-(s[field]||0))))});
  e.onWin=(s,b)=>{s[field]=Math.min(total,(s[field]||0)+b.enemies.filter(e=>e.hp<=0).length);if(s[field]===total){if(flag)s[flag]=true;originalWin?.(s,b);}};
  e.next=s=>(s[field]||0)>=total?next:stage;
  e.progress=s=>label+' · '+(s[field]||0)+'/'+total+'마리';
  e.intro=label+' · 승리한 전투에서 쓰러뜨린 수가 누적됩니다.';
  counted.push({field,total,stage,label});
 }
 hunt('waitmonsters','huntCount12',10,204,205,'안토니오의 부탁 10마리');
 x.encounters.midtermIce18.enemies.push({...x.encounters.midtermIce18.enemies[0],atb:24});
 hunt('midtermIce18','huntCount18',10,chapter(18).keys.golem,chapter(18).keys.ice,'아이스 골렘 10마리');
 x.encounters.moleFire26.enemies=[mon('들쥐',340,18,'moll'),mon('나무토막',390,19,'woodDoll')];
 x.encounters.moleFire26.name='불꽃 마을 길목 · 몬스터 다섯 마리';
 hunt('moleFire26','huntCount26',5,chapter(26).keys.monster,chapter(26).keys.kobi,'빌리의 부탁 5마리');
 hunt('curiousYard29','huntCount29',10,chapter(29).keys.yard,chapter(29).keys.formula,'저택 주변 몬스터 10마리');
 hunt('rubyHunt30','huntCount30',10,chapter(30).keys.hunt,chapter(30).keys.ruby,'쥬다 바깥길 몬스터 10마리');
 x.encounters.fireLessonGolem34.enemies=Array.from({length:3},(_,i)=>({...x.encounters.fireLessonGolem34.enemies[0],hp:620,maxHp:620,atb:i*10}));
 hunt('fireLessonGolem34','huntCount34',10,chapter(34).keys.golem,chapter(34).keys.sevrano,'불꽃 실습 · 아이스 골렘 10마리');
 fight('edwardDive19','수중 시험 전 · 에드워드',19,'waterfall',[people('edward',780,23)],[ally('isaac',400,22),ally('matilda',380,21)]);
 fight('glugluArrest24','글루글루 체포 작전',24,'capture',[people('gluglu',1450,28)],[ally('ryoma',800,35)]);
 x.encounters.glugluArrest24.bg='assets/forgotten-palace.png';
 const e20=x.encounters.examBeginner20;
 e20.enemies=[mon('우드 고블린',190,14,'curseDoll'),mon('거미',170,13,'spider'),mon('나무토막',180,13,'woodDoll')];
 e20.next=chapter(20).keys.beginner2;delete e20.setFlag;
 fight('examBeginner220','초급 시험 · 두 번째 조',20,'beginner3',[mon('들쥐',175,14,'moll'),mon('몬스터 버섯',180,14,'flower'),mon('박쥐',155,13,'moth')]);
 fight('examBeginner320','초급 시험 · 세 번째 조',20,'captureOrder',[mon('집쥐',190,14,'moll'),mon('집쥐',190,14,'moll'),mon('웜',210,15,'snail')]);
 x.encounters.examBeginner320.setFlag='combatBeginnerWon';
 x.encounters.examCapture20.enemies=[mon('곰인형',230,17,'ragDoll'),mon('늑대',245,18,'fightDog'),mon('뱀',220,17,'snake12')];
 x.encounters.examAdvanced20.enemies=[mon('오크',390,21,'curseDoll'),mon('전갈',330,20,'scorpion'),mon('떠돌이 용병',420,22,'flameSoldier')];
 x.encounters.examAdvanced20.enemies[2].artPath='assets/midterm/mercenary21.png';
 x.encounters.examIce20.enemies=Array.from({length:3},(_,i)=>({...x.encounters.examIce20.enemies[0],atb:i*12}));
 x.encounters.enemyDive23.enemies.push({...x.encounters.enemyDive23.enemies[0],atb:20});
 x.encounters.enemyDive23.allies=[ally('shaiya',850,27,'heal')];
 x.encounters.rainbowworm.allies=[ally('scoll',550,30),ally('jackal',780,35)];
 // 11.png / 11-2.png / 11-3.png: a spirit dog trial and Edward + Ryoma's escort.
 Object.assign(x.defaults,{wingDust11:0,sunBox11:false});
 x.npcs.codedchest.artPath='assets/midterm/chest21.png';
 x.npcs.suncrate.artPath='assets/midterm/chest21.png';
 x.npcs.whitewolf.name='헝거';
 x.npcs.whitewolf.portraitPath='assets/original/character/other/헝거.png';
 x.npcs.whitewolf.artPath='assets/original/character/other/헝거.png';
 Object.assign(x.encounters.curiouspet,{intro:'큐리어스가 보낸 혼령강아지가 시험을 시작합니다.',enemies:[mon('혼령강아지',220,15,'fightDog',1)]});
 x.encounters.wolf1.enemies[0].name='헝거';
 x.encounters.wolf2.enemies[0].name='헝거';
 x.encounters.wolf1.enemies[0].artPath='assets/original/character/other/헝거.png';
 x.encounters.wolf2.enemies[0].artPath='assets/original/character/other/헝거.png';
 x.encounters.wolf2.bg='assets/dwarf-mine-depths.png';
 x.encounters.wolf2.intro='보석을 둔 광산 방 앞을 헝거가 가로막았습니다. 에드워드와 료마가 함께 맞섭니다.';
 x.encounters.wolf2.allies=[ally('edward',520,25),ally('ryoma',620,30,'heal')];
 // Keep absent people out of both their home and any legacy decorators.
 const decorate=x.decorate;
 x.decorate=(sc,s,n,p)=>{
  decorate(sc,s,n,p);
  if(sc.id==='dwarfpalace'&&s.stage===197&&s.fairySearch12&&!s.fairyFound12)sc.entities.push({...n('fairyMedicine12',555,470),type:'fixture'});
  const c23=chapter(23),c24=chapter(24),c27=chapter(27),c28=chapter(28),c30=chapter(30);
  if(sc.id==='principal'&&s.stage===c23.keys.absent)sc.entities=sc.entities.filter(e=>e.id!=='morris');
  const missing=s.stage>=c27.keys.waterfall&&s.stage<c28.keys.jackalFarewell;
  if(missing){
   const allowed=(id)=>id==='jackal'&&((s.stage===c28.keys.jackal&&sc.id==='dwarfpalace')||(s.stage>=c28.keys.hungerTell&&['palaceStairs','dwarfpalace','palacechamber'].includes(sc.id)));
   sc.entities=sc.entities.filter(e=>!['jackal','dobiel'].includes(e.id)||allowed(e.id));
  }
  if(s.enemyGlugluArrested&&!s.enemyCaseSolved&&!['principal','schoolprison'].includes(sc.id))sc.entities=sc.entities.filter(e=>e.id!=='gluglu');
  if(sc.id==='palacechamber'&&s.stage===chapter(26).keys.bandFight)sc.entities=sc.entities.filter(e=>!['rainbowworm','skeleton'].includes(e.id));
  if(sc.id==='dwarfpalace'&&s.stage>=c28.keys.jackal&&s.stage<=c28.keys.dobiel){
   sc.entities=sc.entities.filter(e=>!['hint1','hint2','stargate'].includes(e.id)&&!(e.type==='portal'&&e.to==='palacechamber'));
   if(s.jarDoorOpen28)sc.entities.push(p('rescueJar28','열린 단지의 방',635,255,'palacechamber',[125,520]));
  }
  if(sc.id==='palacechamber'&&s.stage>=c28.keys.jackal&&s.stage<=c28.keys.dobiel)sc.entities=sc.entities.filter(e=>!['rainbowworm','skeleton'].includes(e.id));
  if(sc.id==='waterfall'&&s.stage===c30.keys.waterfallBypass){
   const e=sc.entities.find(e=>e.id==='dogBypass30');if(e&&sc.nodes.length>3){const q=sc.nodes[sc.nodes.length-2];e.x=q[0];e.y=q[1];}
  }
  // Earlier layers must not leave a second copy of a person at the same location.
  const seen=new Set();sc.entities=sc.entities.filter(e=>{const key=e.type+':'+e.id;if(seen.has(key))return false;seen.add(key);return true;});
 };
 const gates=ARPIA_STORY_GATES.allowTravel;
 ARPIA_STORY_GATES.allowTravel=(s,to)=>{
  const c28=chapter(28),c30=chapter(30);
  if(to==='palacechamber'&&s.stage>=c28.keys.jackal&&s.stage<=c28.keys.riddle&&!s.jarDoorOpen28)return '미로에서 새 힌트를 모아 단지의 방을 여세요.';
  if((to==='divefoyer'||ARPIA_DIVE.inside(to))&&s.stage===c30.keys.waterfallBypass&&!s.dogBypass30)return '물보라 뒤의 좁은 길을 먼저 살펴보세요.';
  return gates(s,to);
 };
 const items=x.questItems;
 x.questItems=s=>[...items(s),...counted.filter(r=>s.stage===r.stage).map(r=>[r.label,(s[r.field]||0)+'/'+r.total+'마리']),...(s.stage>=chapter(28).keys.underwater&&s.stage<=chapter(28).keys.underwater5?[['수중 던전 수색',((s.searchRooms28||0).toString(2).match(/1/g)||[]).length+'/5개 방']]:[])];
 window.ARPIA_CAPTURE_AUDIT={counted,objective(s){
  if(s.stage===231)return cookingHunt.progress(s);
  const hunt=counted.find(r=>s.stage===r.stage);if(hunt)return hunt.label+' · '+(s[hunt.field]||0)+'/'+hunt.total+'마리';
  if(s.stage===197)return !s.fairySearch12?'기욤에게 5만 핀 전달하기':!s.fairyFound12?'난쟁이 궁전 미로의 보관함에서 요정의 약 찾기':'약을 가지고 기욤과 에드워드에게 돌아가기';
  const c28=chapter(28);if(s.stage>=c28.keys.underwater&&s.stage<=c28.keys.underwater5){const r=c28.steps[s.stage-c28.start];return '수색 '+((s.searchRooms28||0).toString(2).match(/1/g)||[]).length+'/5 · '+(r.scene==='divehall'?'중앙 출구 주변':(Math.floor(+r.scene.slice(8)/6)+1)+'행 '+(+r.scene.slice(8)%6+1)+'열 방')+' 살펴보기';}
  return null;
 }};
})();

/* The captures show two trapped palace chests and the school's seven-chest room.
   Room geometry, empty-chest responses and trap enemy rosters are reconstructed. */
(()=>{
 const x=ARPIA_EXTRA,m=ARPIA_MIDTERM;
 Object.assign(x.defaults,{openedLetterChests11:[],palaceTrapChests8:[],schoolChests12:[],jarTrapCleared13:false});
 const chest='assets/midterm/chest21.png';
 for(let i=0;i<7;i++)x.npcs['schoolChest'+i]={name:(i+1)+'번 상자',artPath:chest,height:42};
 for(let i=0;i<2;i++)x.npcs['palaceTrapChest'+i]={name:(i?'오른쪽':'왼쪽')+' 보물상자',artPath:chest,height:42};
 x.map.push(['schoolChests','학교 지하 · 일곱 상자의 방',[180,430]]);
 x.scenes.schoolChests=(s,n,p)=>({id:'schoolChests',name:'학교 지하 · 일곱 상자의 방',bg:'assets/maps-hires/basement-open.png',w:800,h:480,zoom:1.25,nodes:[[180,430],[270,375],[380,360],[485,355],[600,380],[650,300],[550,240],[435,210],[325,220],[225,280]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,1],[2,8],[3,6]],entities:[p('back','학교 지하 통로',180,430,'underpass',[740,386]),...[ [225,280],[325,220],[435,210],[550,240],[650,300],[600,380],[380,360] ].map((pos,i)=>({...n('schoolChest'+i,...pos),type:'fixture'}))]});
 x.scenes.palaceTrapRoom8=(s,n,p)=>({id:'palaceTrapRoom8',name:'난쟁이 미로 · 두 상자의 방',bg:'assets/restored/diamond-room.png',w:1000,h:667,zoom:1.05,nodes:[[150,555],[285,500],[410,425],[530,385],[650,320],[740,405]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,3]],entities:[p('back','난쟁이 미로',150,555,'dwarfpalace',[210,300]),...[[530,385],[740,405]].map((pos,i)=>({...n('palaceTrapChest'+i,...pos),type:'fixture'}))]});
 const fruit=ARPIA_EPISODE12.rows[18];fruit[1]='schoolChests';
 x.quests[200-42][2]='schoolChests';x.quests[200-42][1]='학교 지하 일곱 상자의 방에서 던전 석류 찾기';
 for(const number of [34,36]){const c=m.chapters.find(c=>c.number===number);if(!c)continue;const r=c.steps.find(r=>r.key===(number===34?'isaac':'fruit'));r.scene='schoolChests';r.pos=[485,355];x.quests[c.keys[r.key]-42][2]='schoolChests';}
 const decorate=x.decorate;
 x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);
  if(sc.id==='underpass'&&s.stage>=200)sc.entities.push(p('sevenChests','일곱 상자의 방',740,386,'schoolChests',[180,430]));
  if(sc.id==='schoolChests'&&s.stage===200)sc.entities.push({...n('pomegranate',485,355),type:'fixture'});
  if(sc.id==='dwarfpalace'&&s.stage>=105&&s.stage<=108)sc.entities.push(p('trapRoom8','두 상자의 방',210,300,'palaceTrapRoom8',[150,555]));
 };
 const monster=(name,sprite)=>({name,sprite,hp:180,maxHp:180,atk:15,element:2,atb:12});
 for(let i=0;i<2;i++)x.encounters['palaceChestTrap8_'+i]={name:'보물상자에 숨은 몬스터',intro:'상자를 열자 안에 숨어 있던 몬스터가 뛰쳐나왔습니다.',bg:'assets/restored/diamond-room.png',freeBattle:true,xp:70,gold:10,sp:0,enemies:[monster(i?'해골 전사':'동굴 지렁이',i?'shadow':'snail')],onWin:s=>{if(!s.palaceTrapChests8.includes(i))s.palaceTrapChests8.push(i);}};
 x.encounters.soyJarTrap13={name:'잘못 연 항아리의 수호 마법',intro:'항아리의 봉인이 흔들리며 수호 정령이 나타났습니다.',bg:'assets/maps-hires/materials-room.png',freeBattle:true,xp:60,gold:0,sp:0,enemies:[monster('항아리 수호 정령','shadow')],onWin:s=>s.jarTrapCleared13=true};
 const prior=x.interact;
 x.interact=(e,a)=>{const s=a.state;
  if(s.stage===154&&s.scene==='vault11'&&e.id==='codedchest'){
   a.choicePuzzle(['광산의 보물상자','상자에 번호가 새겨져 있다. 편지가 있는 상자를 찾아보자.',Array.from({length:7},(_,i)=>(i+1)+'번 상자'),5,'여기는 비어 있다. 아직 살펴보지 않은 상자를 확인하자.','편지 수색'],()=>prior(e,a));
   document.querySelectorAll('#puzzle-choices button').forEach((b,i)=>{const click=b.onclick;b.onclick=()=>{if(!s.openedLetterChests11.includes(i))s.openedLetterChests11.push(i);a.save();click();};});return true;
  }
  if(s.scene==='palaceTrapRoom8'&&/^palaceTrapChest[01]$/.test(e.id)){
   const i=Number(e.id.slice(-1));if(s.palaceTrapChests8.includes(i))a.talk([['you','몬스터가 숨어 있던 상자야. 힌트는 없었어. 다른 방을 찾아보자.']]);
   else a.talk([['you','쪽지가 들어 있을까? 조심해서 열어 보자.'],['narrator','뚜껑 아래에서 소리가 났다. 상자에 숨어 있던 몬스터가 튀어나왔다!']],()=>a.battle('palaceChestTrap8_'+i));return true;
  }
  if(s.scene==='schoolChests'&&s.stage===200&&(e.id==='pomegranate'||/^schoolChest\d$/.test(e.id))){
   const inspect=i=>{if(!s.schoolChests12.includes(i))s.schoolChests12.push(i);a.save();if(i===5)prior({id:'pomegranate'},a);else a.talk([['kesno','여기에는 석류가 없네. 다른 상자도 확인해 보자.']]);};
   if(e.id!=='pomegranate'){inspect(Number(e.id.slice(-1)));return true;}
   a.choicePuzzle(['일곱 상자의 방','오당카에게 가져갈 석류를 찾아보자.',Array.from({length:7},(_,i)=>(i+1)+'번 상자'),5,'여기에는 석류가 없다. 다른 상자를 살펴보자.','케스노와 함께'],()=>inspect(5));return true;
  }
  if(s.stage===225&&s.scene==='koboldroom'&&e.id==='soyjar'){
   const handled=prior(e,a);if(!s.jarTrapCleared13)document.querySelectorAll('#puzzle-choices button').forEach((b,i)=>{if(i!==1)b.onclick=()=>{document.getElementById('modal-close').click();a.talk([['narrator','엉뚱한 항아리를 열자 검은 연기가 솟구쳤다.'],['you','코볼트가 말한 번호가 아니야. 먼저 이 정령을 막자!']],()=>a.battle('soyJarTrap13'));};});return handled;
  }
  if(s.scene==='schoolChests'&&/^schoolChest\d$/.test(e.id)){a.talk([['narrator','오래된 보관 상자다. 안쪽에서 희미한 흙냄새가 난다.']]);return true;}
  return prior(e,a);
 };
})();
