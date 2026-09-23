/* Archived Arpia free-mission routes reconstructed from the original mission records. */
window.ARPIA_FREE=(()=>{
 const x=ARPIA_EXTRA,decorate=x.decorate,items=x.questItems;
 const defs=[
  {id:'mail',title:'콘라드의 잃어버린 우편물',giver:'hina',scene:'campus',minStage:86,kind:'chain',summary:'배달 중 사라진 다이아몬드 원석을 찾아 콘라드에게 돌려준다.',reward:'선행 점수 50',sp:50},
  {id:'egg',title:'부마의 알 구하기',giver:'buma',scene:'infirmary',minStage:86,kind:'chain',summary:'건강센터의 알을 구하기 위해 압둘라와 가루다를 돕는다.',reward:'선행 점수 50 · 회복약 3개',sp:50},
  {id:'aron_catalog',title:'아론의 심부름 1 · 몬스터 도감',giver:'aron',scene:'lobby',minStage:62,kind:'hunt',max:10,summary:'서로 다른 몬스터를 관찰할 수 있도록 필드 전투에서 표본 기록을 모은다.',reward:'선행 점수 50 · 메탈 슈즈',sp:50,item:'boots'},
  {id:'earth_king',title:'화가 난 대지정령',giver:'laura',scene:'earthvillage',minStage:170,kind:'boss',target:'earthSpiritKing',targetScene:'earthdungeon',summary:'대지 던전을 어지럽히는 정령왕을 진정시킨다.',reward:'선행 점수 10 · 정령의 선물',sp:10,repeatable:true},
  {id:'joker_relief',title:'조커의 변비약',giver:'joker',scene:'curiousmansion',minStage:169,kind:'hunt',max:12,summary:'누에열매·랄라열매·루비 원석·수중초를 모아 조커의 약을 만든다.',reward:'선행 점수 40 · 마력약 2개',sp:40,ethers:2,repeatable:true},
  {id:'flame_hunt',title:'불꽃군을 찾아라',giver:'esta',scene:'classroom',minStage:62,kind:'hunt',target:'flamePatrol',targetScene:'firevillage',max:10,summary:'거인의 오두막 근처를 배회하는 불꽃병사를 10마리 물리친다.',reward:'선행 점수 50',sp:50},
  {id:'fish_village',title:'물고기 마을을 도와줘',giver:'puki',scene:'judah',minStage:126,kind:'hunt',max:100,summary:'상어방 주변의 문어와 오징어를 각각 50마리씩 쫓아낸다.',reward:'선행 점수 200 · 독나방 펫',sp:200,pet:true},
  {id:'octopus',title:'난폭한 문어',giver:'julia',scene:'classroom',minStage:126,kind:'hunt',max:30,summary:'마틸다를 습격한 난폭한 문어 30마리를 물리친다.',reward:'선행 점수 80',sp:80},
  {id:'hubert1',title:'휴버트의 환자 1',giver:'hubert',scene:'petcenter',minStage:126,kind:'visit',target:'ugauga',targetScene:'icevillage',summary:'북문 근처에서 다친 우가우가를 찾아 펫 병원으로 안내한다.',reward:'선행 점수 50',sp:50},
  {id:'deren_ghost',title:'데런 미로의 귀신 소동',giver:'matilda',scene:'kingdom',minStage:126,kind:'boss',target:'ghostHorse',targetScene:'ghostforest',summary:'데런 미로의 귀신 소문을 확인하고 소동의 원인을 밝힌다.',reward:'선행 점수 50',sp:50},
  {id:'ryoma_staff',title:'료마 선생님의 지팡이',giver:'ryoma',scene:'classroom',minStage:126,kind:'hunt',max:100,summary:'희귀한 뚫어나무를 찾기 위해 몬스터 100마리를 조사한다.',reward:'선행 점수 50 · 새 지팡이',sp:50},
  {id:'hubert2',title:'휴버트의 환자 2',giver:'hubert',scene:'petcenter',minStage:126,kind:'visit',target:'bandMole',targetScene:'kingdom',summary:'데런 근처에서 길을 잃은 두더지 악단의 여자친구를 찾아 준다.',reward:'선행 점수 50',sp:50},
  {id:'ice_king',title:'얼음정령왕의 분노',giver:'iceChief',scene:'icevillage',minStage:170,kind:'boss',target:'iceSpiritKing',targetScene:'icedungeon',summary:'얼음 조각과 몬스터의 피를 준비해 얼음정령왕을 진정시킨다.',reward:'선행 점수 10 · 정령의 선물',sp:10,repeatable:true},
  {id:'pet_contest1',title:'펫 대회 1차전',giver:'contestMaster',scene:'petcenter',minStage:86,minLevel:10,kind:'boss',target:'petGate1',targetScene:'petcenter',summary:'펫과 함께 조련사의 부두 인형·봉제 인형을 상대로 첫 대결에 도전한다.',reward:'선행 점수 100 · 보유 펫 친밀도 10 상승(최대 100)',sp:100},
  {id:'pet_contest2',title:'펫 대회 2차전',giver:'contestMaster',scene:'petcenter',minStage:126,minLevel:20,kind:'boss',target:'petGate2',targetScene:'petcenter',summary:'부두인형·봉제인형·닌자거북이 조련사를 포함한 결승전에 도전한다.',reward:'선행 점수 200 · 펫 친밀도 상승',sp:200},
  {id:'archmage',title:'대마도사 전직시험',giver:'morris',scene:'principal',minStage:169,minLevel:50,kind:'boss',target:'archmageSeal',targetScene:'principal',summary:'글루글루 신전과 정령 던전의 시련을 넘어 대마도사의 자격을 증명한다.',reward:'대마도사 칭호 · 선행 점수 300',sp:300}
 ];
 for(const d of defs){x.defaults['fm_'+d.id]=0;x.defaults['fc_'+d.id]=0;x.defaults['fd_'+d.id]=0;}
 Object.assign(x.defaults,{freeMail:0,freeEgg:0,freeEggKills:0,poisonMoth:false,archmage:false});
 Object.assign(x.npcs,{
  buma:{name:'부마',anim:'npc_039_도트_부마',portrait:'worker/부마.png'},mailDiamond:{name:'잃어버린 다이아몬드 원석'},eggStone:{name:'건강센터 납품용 마나석'},
  laura:{name:'라우라 촌장',anim:'npc_078_도트_아다'},joker:{name:'조커',portrait:'other/조커.png'},flameTeacher:{name:'에스타',anim:'npc_010_도트_에스타',portrait:'teacher/에스타.png'},
  puki:{name:'푸키',anim:'npc_103_도트_푸키'},hubert:{name:'휴버트',anim:'npc_023_도트_발디'},ugauga:{name:'다친 우가우가',anim:'npc_026_도트_도비엘'},
  ryoma:{name:'료마',anim:'npc_009_도트_아론'},bandMole:{name:'두더지 악단의 단원',anim:'npc_024_도트_코비'},iceChief:{name:'얼음마을 촌장',anim:'npc_115_도트_케리',portraitPath:'assets/portraits/humphrey.png'},
  contestMaster:{name:'펫 대회 진행자',anim:'npc_038_도트_멜리'},earthSpiritKing:{name:'대지정령왕',artPath:'assets/earth-spirit-king.png',height:105},
  iceSpiritKing:{name:'얼음정령왕',artPath:'assets/ice-spirit-king.png',height:105},flamePatrol:{name:'불꽃병사 무리',artPath:'assets/flame-soldier.png',height:78},ghostHorse:{name:'데런 미로의 귀신'},petGate1:{name:'펫 대회 1차 접수'},petGate2:{name:'펫 대회 2차 접수'},archmageSeal:{name:'대마도사 시험의 문'}
 });
 const mailSteps=['히나에게 의뢰받기','상점가 콘라드에게 사정 듣기','독수리 마을에서 원석 찾기','콘라드에게 원석 돌려주기','완료'];
 const eggSteps=['부마에게 의뢰받기','쥬다 항구 압둘라 찾아가기','필드 몬스터 30마리 처치','독수리 마을 가루다에게 알 부탁하기','시바에게 마나석 소식 묻기','학교 지하에서 마나석 챙기기','가루다에게 마나석 전하기','압둘라에게 알 배송 부탁하기','부마에게 납품 완료 보고하기','완료'];
 const val=(s,d)=>s['fm_'+d.id]||0,count=(s,d)=>s['fc_'+d.id]||0;
 const available=(s,d)=>s.stage>=d.minStage&&s.level>=(d.minLevel||1)&&val(s,d)===0&&(!d.rank||(s.rank||0)===d.rank-1);
 function migrate(s){
  if(s.freeMail&&val(s,defs[0])===0)s.fm_mail=s.freeMail===4?9:s.freeMail;
  if(s.freeEgg&&val(s,defs[1])===0)s.fm_egg=s.freeEgg===9?9:s.freeEgg;
  if(s.freeEggKills>s.fc_egg)s.fc_egg=s.freeEggKills;
 }
 function progress(s,d){const v=val(s,d),c=count(s,d);if(d.progress&&v>0&&v!==9)return d.progress(s);if(d.id==='mail')return mailSteps[Math.min(v,4)];if(d.id==='egg')return eggSteps[Math.min(v,9)]+(v===2?` · ${c}/30`:``);if(v===9)return d.repeatable?`완료 ${s['fd_'+d.id]||1}회 · 다시 의뢰 가능`:'완료';if(v===2)return `${d.giver==='morris'?'교장실':'의뢰인'}에게 완료 보고`;if(!v)return available(s,d)?'의뢰를 받을 수 있음':d.unlockLabel?'잠김 · '+d.unlockLabel:`잠김 · ${d.minLevel?`Lv.${d.minLevel} · `:''}제${d.minStage>=169?'11':d.minStage>=126?'8':d.minStage>=86?'6':'4'}화 이후`;if(d.kind==='hunt')return `${d.summary} · ${c}/${d.max}`;if(d.kind==='collect')return `${d.summary} · `+Object.entries(d.need).map(([id,n])=>`${window.ARPIA_DATA.ITEMS[id].name} ${window.ARPIA_SYS?window.ARPIA_SYS.inv.count(s,id):0}/${n}`).join(', ');if(d.kind==='visit')return `${x.npcs[d.target]?.name} 찾기 · ${d.targetScene}`;return `${x.npcs[d.target]?.name}에게 도전 · ${d.targetScene}`;}
 function category(s,d){const v=val(s,d);if(v===9)return'complete';if(v>0)return'active';return available(s,d)?'available':'locked';}
 function panel(s){migrate(s);const totals={active:defs.filter(d=>category(s,d)==='active').length,available:defs.filter(d=>category(s,d)==='available').length,complete:defs.filter(d=>category(s,d)==='complete').length};return `<div class="free-head"><div><h2>프리 미션</h2><p>메인 미션과 별도로 의뢰인을 만나 시작합니다.</p></div><strong>${totals.active} 진행 · ${totals.complete}/${defs.length} 완료</strong></div><div class="subtabs free-filters"><button data-free-filter="all" class="active">전체 ${defs.length}</button><button data-free-filter="available">받기 ${totals.available}</button><button data-free-filter="active">진행 ${totals.active}</button><button data-free-filter="complete">완료 ${totals.complete}</button></div><div class="free-list">${defs.map(d=>{const cat=category(s,d);return `<article class="free-card ${cat}" data-free-status="${cat}"><span class="mission-stamp">${cat==='complete'?'완료':cat==='active'?'진행':cat==='available'?'NEW':'잠김'}</span><strong>${d.title}</strong><p>${progress(s,d)}</p><small>${d.summary}<br>보상 · ${d.reward}${d.repeatable?' · 반복 가능':''}</small></article>`;}).join('')}</div>`;}
 function bind(){document.querySelectorAll('[data-free-filter]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-free-filter]').forEach(x=>x.classList.toggle('active',x===b));document.querySelectorAll('[data-free-status]').forEach(card=>card.hidden=b.dataset.freeFilter!=='all'&&card.dataset.freeStatus!==b.dataset.freeFilter);});}
 function add(sc,n,id,xp,yp,fixture=false){if(!sc.entities.some(e=>e.id===id))sc.entities.push({...n(id,xp,yp),...(fixture?{type:'fixture'}:{})});}
 x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);migrate(s);
  if(s.stage>=62){if(sc.id==='lobby')add(sc,n,'aron',530,320);if(sc.id==='classroom')add(sc,n,'esta',710,215);}
  if(s.stage>=86&&sc.id==='infirmary')add(sc,n,'buma',255,204);
  if(s.stage>=defs.find(d=>d.id==='pet_contest1').minStage&&sc.id==='petcenter')add(sc,n,'contestMaster',260,365);
  if(s.stage>=126){if(sc.id==='judah')add(sc,n,'puki',365,150);if(sc.id==='petcenter')add(sc,n,'hubert',480,430);if(sc.id==='classroom')add(sc,n,'ryoma',646,198);if(sc.id==='kingdom')add(sc,n,'matilda',546,590);}
  if(s.stage>=169&&sc.id==='curiousmansion')add(sc,n,'joker',395,120);
  if(s.stage>=170){if(sc.id==='earthvillage')add(sc,n,'laura',397,466);if(sc.id==='icevillage')add(sc,n,'iceChief',397,466);}
  if(val(s,defs[0])===2&&sc.id==='eaglevillage')add(sc,n,'mailDiamond',363,234,true);
  if(val(s,defs[1])===5&&sc.id==='basement')add(sc,n,'eggStone',445,285,true);
  for(const d of defs){if(val(s,d)!==1)continue;if(d.kind==='visit'&&sc.id===d.targetScene)add(sc,n,d.target,...(d.target==='ugauga'?[480,390]:[587,468]));if(d.kind==='hunt'&&d.target&&sc.id===d.targetScene)add(sc,n,d.target,520,390);if(d.kind==='boss'&&sc.id===d.targetScene){const pos={earthSpiritKing:[650,270],iceSpiritKing:[650,430],ghostHorse:[720,305],petGate1:[420,320],petGate2:[420,320],archmageSeal:[760,268]}[d.target]||[500,300];add(sc,n,d.target,pos[0],pos[1],d.target.includes('Gate')||d.target==='archmageSeal');}}
 };
 function chainTarget(s,e){if(window.ARPIA_CAPTURE_ERRANDS)return false;const m=val(s,defs[0]),g=val(s,defs[1]);return(m===1&&e.id==='conrad')||(m===2&&e.id==='mailDiamond')||(m===3&&e.id==='conrad')||(g===1&&e.id==='abdullah')||(g===2&&e.id==='abdullah')||(g===3&&e.id==='garuda')||(g===4&&e.id==='shiva')||(g===5&&e.id==='eggStone')||(g===6&&e.id==='garuda')||(g===7&&e.id==='abdullah')||(g===8&&e.id==='buma');}
 function objective(s,e){migrate(s);if(chainTarget(s,e))return true;return defs.some(d=>{const v=val(s,d);return(available(s,d)&&s.scene===d.scene&&e.id===d.giver)||(v===2&&s.scene===d.scene&&e.id===d.giver)||(v===1&&['visit','boss','hunt'].includes(d.kind)&&e.id===d.target);});}
 function marker(s,e){if(!objective(s,e))return'';return defs.some(d=>val(s,d)===2&&e.id===d.giver)?'?':'!';}
 function accept(d,a){const s=a.state;s['fm_'+d.id]=1;s['fc_'+d.id]=0;a.save();a.refresh();a.toast(`프리 미션 시작 · ${d.title}`);}
 function finish(d,a){const s=a.state;s.sp+=d.sp||0;s.ethers+=(d.ethers||0);if(d.item)s['own_'+d.item]=true;if(d.pet){s.poisonMoth=true;s.pet2=true;}if(d.id==='archmage')s.archmage=true;s['fd_'+d.id]=(s['fd_'+d.id]||0)+1;s['fm_'+d.id]=d.repeatable?0:9;s['fc_'+d.id]=0;a.save();a.refresh();a.talk([[d.giver,`${d.title} 의뢰를 훌륭히 마쳤구나. ${d.reward} 보상을 받으렴.`],['you','도움이 되어서 기뻐요. 다음 의뢰도 맡겨 주세요!']]);}
 function handleMail(e,a){if(window.ARPIA_CAPTURE_ERRANDS)return false;const s=a.state,v=val(s,defs[0]);if(available(s,defs[0])&&e.id==='hina'){a.missionOffer(defs[0].title,'hina','우체국에서 없어진 우편물을 찾고 있대. 콘라드 아저씨를 도와드릴래?',()=>accept(defs[0],a));return true;}let next=0,msg='';if(v===1&&e.id==='conrad'){next=2;msg='배달하던 다이아몬드 원석을 북쪽에서 잃어버렸단다. 독수리 마을 근처를 찾아봐 주렴.';}if(v===2&&e.id==='mailDiamond'){next=3;msg='풀 사이에서 우편물 꼬리표가 붙은 다이아몬드 원석을 찾았다.';}if(v===3&&e.id==='conrad'){finish(defs[0],a);return true;}if(!next)return false;a.talk([[e.id==='mailDiamond'?'narrator':e.id,msg]],()=>{s.fm_mail=next;s.freeMail=next;a.save();a.refresh();});return true;}
 function handleEgg(e,a){if(window.ARPIA_CAPTURE_ERRANDS)return false;const s=a.state,v=val(s,defs[1]);if(available(s,defs[1])&&e.id==='buma'){a.missionOffer(defs[1].title,'buma','건강센터에 쓸 알이 떨어졌어요. 압둘라에게 공급을 부탁해 주시겠어요?',()=>accept(defs[1],a));return true;}if(!chainTarget(s,e)||v===0)return false;if(v===2&&count(s,defs[1])<30){a.talk([['abdullah',`아직 ${count(s,defs[1])}/30마리요. 필드의 몬스터를 더 물리치고 오시오.`]]);return true;}if(v===8&&e.id==='buma'){s.potions+=3;finish(defs[1],a);return true;}const msgs={1:'일을 도와줄 사람이 필요했소. 주변 필드 몬스터 30마리를 물리쳐 주시오.',2:'수고했소. 알은 독수리 마을의 가루다에게 부탁하면 되오.',3:'알을 내어주고 싶지만 마나석이 부족하구나. 시바에게 물어보렴.',4:'학교 지하의 납품 상자에 마나석이 남아 있을 거야.',5:'지하 상자에서 건강센터 납품용 마나석을 챙겼다.',6:'고맙구나. 이 알을 압둘라에게 전해 주렴.',7:'알을 건강센터로 안전하게 보내겠소. 부마에게 알려 주시오.'};a.talk([[e.id==='eggStone'?'narrator':e.id,msgs[v]]],()=>{s.fm_egg=v+1;s.freeEgg=v+1;a.save();a.refresh();});return true;}
 function interact(e,a){const s=a.state;migrate(s);if(handleMail(e,a)||handleEgg(e,a))return true;for(const d of defs.slice(2).sort((left,right)=>Number(val(s,right)===2)-Number(val(s,left)===2))){const v=val(s,d);if(available(s,d)&&s.scene===d.scene&&e.id===d.giver){a.missionOffer(d.title,d.giver,d.summary+` 보상은 ${d.reward}${d.repeatable?'이며 완료 후 다시 도전할 수 있어.':'이야.'}`,()=>accept(d,a));return true;}if(v===2&&s.scene===d.scene&&e.id===d.giver){finish(d,a);return true;}if(v===1&&d.kind==='visit'&&e.id===d.target){a.talk([[d.target,`찾아와 줘서 고마워. 이제 ${x.npcs[d.giver].name}에게 무사하다고 전해 줘.`]],()=>{s['fm_'+d.id]=2;a.save();a.refresh();});return true;}if(v===1&&d.kind==='hunt'&&d.target===e.id){a.talk([[d.giver,`현재 ${count(s,d)}/${d.max}마리를 물리쳤어. 남은 무리도 조심하렴.`],['you','이번 무리도 맡겨 주세요!']],()=>a.battle('free_patrol_'+d.id));return true;}if(v===1&&d.kind==='boss'&&e.id===d.target){a.talk([[d.giver,'마력의 흐름을 읽고 펫과 함께 침착하게 맞서렴.'],['you','준비됐어요. 시작할게요!']],()=>a.battle('free_'+d.id));return true;}}
  return false;
 }
 function victory(s,b){
  migrate(s);
  const enemies=(b.enemies||[]).filter(e=>e.hp<=0),field=!!b.spec?.repeatable;
  // Friendly duels and unrelated story bosses must not complete every active hunt.
  if(field&&val(s,defs[1])===2){s.fc_egg=Math.min(30,count(s,defs[1])+enemies.length);s.freeEggKills=s.fc_egg;}
  for(const d of defs)if(d.kind==='hunt'&&val(s,d)===1){
   let killed=field?enemies.length:0;
   if(d.id==='flame_hunt')killed=enemies.filter(e=>/불꽃병사/.test(e.name)).length;
   if(d.id==='octopus')killed=enemies.filter(e=>/문어/.test(e.name)).length;
   if(d.id==='school_pests'&&!/campus|weila_school|forest/.test(s.scene+' '+(b.spec?.fieldKey||'')))killed=0;
   if(d.id==='humphrey_crest'&&!/ice|snow/.test(s.scene+' '+(b.spec?.fieldKey||'')))killed=0;
   if(d.id==='fish_village'){
    s.freeFishOctopus=Math.min(50,(s.freeFishOctopus||0)+enemies.filter(e=>/문어/.test(e.name)).length);
    s.freeFishSquid=Math.min(50,(s.freeFishSquid||0)+enemies.filter(e=>/오징어/.test(e.name)).length);
    s.fc_fish_village=s.freeFishOctopus+s.freeFishSquid;
   }else s['fc_'+d.id]=Math.min(d.max,count(s,d)+killed);
   if(s['fc_'+d.id]>=d.max)s['fm_'+d.id]=2;
  }
  const id=b.spec?.freeMission;if(id){const d=defs.find(x=>x.id===id);if(d&&val(s,d)===1)s['fm_'+id]=2;}
 }
 const battle=(id,name,sprite,hp,atk,bg='assets/maps-hires/forest-battle.png',enemies)=>x.encounters['free_'+id]={name,intro:`프리 미션 · ${name}`,bg,freeMission:id,freeBattle:true,xp:Math.round(hp/3),gold:45,sp:0,enemies:enemies||[{name,element:id==='ice_king'?1:id==='earth_king'?2:0,hp,maxHp:hp,atk,atb:5,sprite}]};
 battle('earth_king','분노한 대지정령왕','earthSpiritKing',720,24);
 battle('ice_king','얼음정령왕','iceSpiritKing',680,23);
 battle('deren_ghost','유령마 니그로','shadow',520,21);
 battle('pet_contest1','펫 대회 1차전','woodDoll',480,18,undefined,[{name:'부두 인형',element:0,hp:230,maxHp:230,atk:16,atb:0,sprite:'fire'},{name:'봉제 인형',element:2,hp:250,maxHp:250,atk:17,atb:10,sprite:'woodDoll'}]);
 battle('pet_contest2','펫 대회 결승전','earth',760,24,undefined,[{name:'닌자거북이',element:2,hp:380,maxHp:380,atk:21,atb:8,sprite:'earth'},{name:'마력 인형',element:1,hp:310,maxHp:310,atk:19,atb:0,sprite:'ice'}]);
 battle('archmage','대마도사 전직의 운석','meteorMonster',980,28);
 x.encounters.free_patrol_flame_hunt={name:'불꽃병사 순찰대',intro:'거인의 오두막 근처를 지키는 불꽃병사들이 달려듭니다.',bg:'assets/maps-hires/forest-battle.png',freeBattle:true,xp:85,gold:35,sp:0,enemies:[{name:'불꽃병사',element:0,hp:170,maxHp:170,atk:15,atb:0,sprite:'flameSoldier'},{name:'불꽃병사',element:0,hp:170,maxHp:170,atk:15,atb:10,sprite:'flameSoldier'},{name:'불꽃병사 대장',element:0,hp:230,maxHp:230,atk:18,atb:18,sprite:'flameSoldier'}]};
 x.questItems=s=>[...items(s),...(val(s,defs[0])===3?[['잃어버린 우편물','콘라드에게 돌려줄 다이아몬드 원석']]:[]),...(val(s,defs[1])===6?[['납품용 마나석','가루다에게 전할 재료']]:[]),...(val(s,defs[1])===7?[['건강센터의 알','압둘라에게 배송을 부탁하자']]:[])];
 return{defs,panel,bind,interact,objective,marker,victory};
})();
