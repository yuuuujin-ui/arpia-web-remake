/* Additional original free missions layered on ARPIA_FREE: rank exams, teleport coordinates,
   험프리가의 문장, 학교 주변 몬스터, 장작 모으기, 좀비 세자매, 왕국경기장, 아론 심부름 2,
   spirit-king material requirements and item rewards. */
window.ARPIA_MISSIONS2=(()=>{
 const x=ARPIA_EXTRA,F=ARPIA_FREE,D=ARPIA_DATA;const SYS=()=>window.ARPIA_SYS;
 const defs=[
  {id:'school_pests',title:'학교 주변 몬스터 퇴치',giver:'george',scene:'campus',minStage:14,kind:'hunt',max:10,summary:'학교 주변 필드를 어지럽히는 몬스터 10마리를 물리친다.',reward:'선행 점수 30 · 회복약 2개',sp:30,gift:{potion:2},repeatable:true},
  {id:'exam_novice',title:'초보 마법사 계급 시험',giver:'morris',scene:'principal',minStage:14,minLevel:10,rank:1,kind:'boss',target:'examSeal',targetScene:'principal',summary:'교장실의 시험의 문에서 견습 마법사 졸업 시험을 치른다. 합격하면 초보 마법사 계급을 받는다.',reward:'초보 마법사 계급 · 선행 점수 20',sp:20},
  {id:'exam_skilled',title:'숙련 마법사 계급 시험',giver:'morris',scene:'principal',minStage:14,minLevel:20,rank:2,kind:'boss',target:'examSeal',targetScene:'principal',summary:'시험의 문에서 세 마리 시험 정령을 상대한다. 합격하면 숙련 마법사 계급을 받는다.',reward:'숙련 마법사 계급 · 선행 점수 40',sp:40},
  {id:'exam_mage',title:'마도사 계급 시험',giver:'morris',scene:'principal',minStage:14,minLevel:35,rank:3,kind:'boss',target:'examSeal',targetScene:'principal',summary:'시험의 문에서 시험관 골렘을 쓰러뜨린다. 합격하면 마도사 계급을 받는다.',reward:'마도사 계급 · 선행 점수 80',sp:80},
  {id:'tp_fire',title:'불꽃 마을 주변 텔레포트 좌표 받기',giver:'barbara',scene:'shop',minStage:272,kind:'visit',target:'tpFire',targetScene:'firevillage',summary:'불꽃 마을 촌장 집 앞 좌표 표식을 조사해 바바라에게 좌표를 전한다.',reward:'텔레포트 · 불꽃 마을 등록',sp:10,flag:'tp_fire'},
  {id:'tp_ice',title:'얼음 마을 주변 텔레포트 좌표 받기',giver:'barbara',scene:'shop',minStage:272,kind:'visit',target:'tpIce',targetScene:'icevillage',summary:'얼음 마을 촌장 집 앞 좌표 표식을 조사해 바바라에게 좌표를 전한다.',reward:'텔레포트 · 얼음 마을 등록',sp:10,flag:'tp_ice'},
  {id:'tp_earth',title:'대지 마을 주변 텔레포트 좌표 받기',giver:'barbara',scene:'shop',minStage:272,kind:'visit',target:'tpEarth',targetScene:'earthvillage',summary:'대지 마을 촌장 집 앞 좌표 표식을 조사해 바바라에게 좌표를 전한다.',reward:'텔레포트 · 대지 마을 등록',sp:10,flag:'tp_earth'},
  {id:'humphrey_crest',title:'험프리가의 문장',giver:'humphrey',scene:'icevillage',minStage:265,kind:'hunt',max:15,summary:'얼음 마을 주변의 몬스터 15마리를 물리쳐 험프리가의 문장을 되찾는 데 힘을 보탠다.',reward:'선행 점수 60 · 험프리가의 문장',sp:60,flag:'humphreyCrest'},
  {id:'firewood',title:'장작 모으기',giver:'murphy',scene:'boiler',minStage:156,kind:'collect',need:{firewood:5},summary:'보일러실에 쓸 장작 5개를 모아 머피에게 가져다준다. 장작은 웨일라 남쪽 숲과 나무 창고에서 주울 수 있다.',reward:'선행 점수 40 · 회복약 2개',sp:40,gift:{potion:2},repeatable:true},
  {id:'zombie_sisters',title:'좀비 세자매',giver:'edward',scene:'kingdom',minStage:126,kind:'boss',target:'zombieSisters',targetScene:'ghostforest',summary:'유령의 숲에 나타난 좀비 세자매를 물리친다. 독에 대비해 해독제를 챙기자.',reward:'선행 점수 70 · 성수 2개',sp:70,gift:{holywater:2}},
  {id:'royal_arena',title:'왕국경기장 대전',giver:'edward',scene:'kingdom',minStage:36,kind:'boss',target:'arenaChampion',targetScene:'royalarena',summary:'왕국경기장의 챔피언에게 도전한다. 이길 때마다 상금을 받는다.',reward:'선행 점수 50 · 200 핀',sp:50,gold:200,repeatable:true},
  {id:'aron_errand2',title:'아론의 심부름 2 · 재료 수집',giver:'aron',scene:'lobby',minStage:62,kind:'collect',need:{spider_silk:3,snake_scale:2,herb:2},summary:'수업 재료로 쓸 거미줄 3개, 뱀 비늘 2개, 약초 2개를 모아 아론 선생님께 드린다.',reward:'선행 점수 60 · 사파이어 목걸이',sp:60,item:'pendant'},
 ];
 for(const d of defs){x.defaults['fm_'+d.id]=0;x.defaults['fc_'+d.id]=0;x.defaults['fd_'+d.id]=0;F.defs.push(d);}
 // spirit kings need offerings before the challenge (원작: 얼음 조각·몬스터의 피 / 정령의 흙)
 Object.assign(F.defs.find(d=>d.id==='ice_king'),{need:{icepiece:1,iceblood:1},gift:'spirit'});
 Object.assign(F.defs.find(d=>d.id==='earth_king'),{need:{spirit_soil:2},gift:'spirit'});
 Object.assign(F.defs.find(d=>d.id==='ryoma_staff'),{staff:true});
 Object.assign(x.npcs,{examSeal:{name:'시험의 문',artPath:'assets/objects/exam-seal.png',height:96},tpFire:{name:'텔레포트 좌표 표식',artPath:'assets/objects/teleport-mark.png',height:56},tpIce:{name:'텔레포트 좌표 표식',artPath:'assets/objects/teleport-mark.png',height:56},tpEarth:{name:'텔레포트 좌표 표식',artPath:'assets/objects/teleport-mark.png',height:56},zombieSisters:{name:'좀비 세자매',anim:'npc_new_좀비세자매',height:72},arenaChampion:{name:'경기장 챔피언 가르시아',anim:'npc_new_가르시아'}});
 const enc=(id,name,intro,bg,enemies,xp,gold)=>x.encounters['free_'+id]={name,intro,bg,freeMission:id,freeBattle:true,xp,gold,sp:0,enemies};
 const E=(name,element,hp,atk,sprite,atb=0)=>({name,element,hp,maxHp:hp,atk,atb,sprite});
 enc('exam_novice','계급 시험 · 초보 마법사','교장실의 문이 시험장으로 이어집니다. 두 마리 시험 정령을 물리치세요.','assets/maps-hires/school-interior.png',[E('시험 정령',0,150,12,'examFire'),E('시험 정령',1,150,12,'examIce',12)],90,60);
 enc('exam_skilled','계급 시험 · 숙련 마법사','세 마리 시험 정령이 속성을 바꿔 가며 공격합니다.','assets/maps-hires/school-interior.png',[E('시험 정령',0,300,18,'examFire'),E('시험 정령',1,300,18,'examIce',10),E('시험 정령',2,300,18,'examEarth',20)],220,120);
 enc('exam_mage','계급 시험 · 마도사','시험관 골렘이 버티고 섭니다. 상태이상과 펫 스킬을 총동원하세요.','assets/maps-hires/school-interior.png',[E('시험관 골렘',2,900,26,'examGolem'),E('골렘의 핵',2,260,16,'golemCore',15)],480,240);
 enc('zombie_sisters','좀비 세자매','세 자매가 독 안개를 내뿜으며 다가옵니다.','assets/maps-hires/forest-battle.png',[E('좀비 첫째',2,260,20,'zombieSisters'),E('좀비 둘째',2,240,19,'zombieSisters',10),E('좀비 셋째',2,220,18,'zombieSisters',20)],210,90);
 enc('royal_arena','왕국경기장 대전','관중의 함성 속에 챔피언 가르시아가 등장합니다.','assets/maps-hires/colosseum.png',[E('경기장 챔피언 가르시아',0,520,24,'garcia'),E('경기장 검투사',2,300,18,'woodDoll',15)],200,200);
 const needText=(s,d)=>Object.entries(d.need).map(([id,n])=>`${D.ITEMS[id].name} ${SYS().inv.count(s,id)}/${n}`).join(' · ');
 const hasNeed=(s,d)=>Object.entries(d.need).every(([id,n])=>SYS().inv.count(s,id)>=n);
 const val=(s,d)=>s['fm_'+d.id]||0;
 function onFinish(d,s,a){const sys=SYS();if(d.flag)s[d.flag]=true;if(d.rank)s.rank=Math.max(s.rank||0,d.rank);if(d.id==='archmage')s.rank=4;if(d.gold)s.gold+=d.gold;if(d.staff)s.own_staff_plus=true;
  if(d.gift&&typeof d.gift==='object')for(const[id,n]of Object.entries(d.gift))sys.inv.add(s,id,n);
  if(d.gift==='spirit'){const pick=['hipotion','hiether','manastone','holywater'][Math.floor(Math.random()*4)];sys.inv.add(s,pick,1);a.toast(`정령의 선물: ${D.ITEMS[pick].name}`);}
  if(d.id==='pet_contest1'||d.id==='pet_contest2'){for(const p of s.pets)p.aff=Math.min(100,p.aff+(d.id==='pet_contest1'?10:20));sys.pets.syncPets(s);}
  if(d.rank)a.toast(`${D.RANKS[s.rank]} 계급이 되었습니다!`);}
 const orig=F.interact;
 F.interact=(e,a)=>{const s=a.state;
  for(const d of F.defs){const v=val(s,d);
   if(v===1&&d.kind==='collect'&&e.id===d.giver){if(!hasNeed(s,d)){a.talk([[d.giver,`아직 재료가 모자라구나. ${needText(s,d)}`]]);return true;}for(const[id,n]of Object.entries(d.need))SYS().inv.remove(s,id,n);s['fm_'+d.id]=2;}
   if(v===1&&d.kind==='boss'&&d.need&&e.id===d.target&&!s['fo_'+d.id]&&!hasNeed(s,d)){a.talk([['narrator',`정령왕 앞에 바칠 제물이 부족하다. ${needText(s,d)}`]]);return true;}
   if(v===1&&d.kind==='boss'&&d.need&&e.id===d.target&&hasNeed(s,d)&&!s['fo_'+d.id]){for(const[id,n]of Object.entries(d.need))SYS().inv.remove(s,id,n);s['fo_'+d.id]=1;}
  }
  const before=Object.fromEntries(F.defs.map(d=>[d.id,s['fd_'+d.id]||0]));
  const r=orig(e,a);
  for(const d of F.defs)if((s['fd_'+d.id]||0)>before[d.id]){delete s['fo_'+d.id];onFinish(d,s,a);a.save();a.refresh();}
  return r;};
 const prevDecorate=x.decorate;
 x.decorate=(sc,s,n,p)=>{prevDecorate(sc,s,n,p);
  const add=(id,xx,yy,fixture)=>{if(!sc.entities.some(e=>e.id===id))sc.entities.push({...n(id,xx,yy),...(fixture?{type:'fixture'}:{})});};
  const place=(id,xx,yy)=>{const e=sc.entities.find(e=>e.id===id);if(e){e.x=xx;e.y=yy;}};
  if(sc.id==='icevillage'&&s.stage>=265)add('humphrey',397,466);
  if(sc.id==='kingdom'&&s.stage>=36)add('edward',600,560);
  if(sc.id==='principal')place('examSeal',760,300);
  if(sc.id==='firevillage')place('tpFire',300,520);if(sc.id==='icevillage')place('tpIce',300,520);if(sc.id==='earthvillage')place('tpEarth',300,520);
  if(sc.id==='ghostforest')place('zombieSisters',720,305);if(sc.id==='royalarena')place('arenaChampion',520,330);
 };
 return{defs,onFinish};
})();
