/* Episode 19. Verified events and map topology: wonavy.tistory.com/214.
   Dialogue and room locations additionally compared with local 19.png; oxygen timing is reconstructed. */
(()=>{
 const x=ARPIA_EXTRA,m=ARPIA_MIDTERM,root='assets/underwater/';
 const {give,take}=m,ITEM=ARPIA_SYS.inv;
 for(const [id,name,desc,art]of [
  ['dive-tablet','시험용 찰흙판','세 마을의 표식을 모으면 시험 장소를 가리킨다.','tablet'],
  ['dive-fire','불꽃 마을 표식','델핀이 웨일라 강가에서 잃어버린 표식','fire-mark'],
  ['dive-ore','네비니움 탐지 광석','열쇠가 가까울수록 밝아지는 광석','navinium'],
  ['dive-key','수중 던전 열쇠','쇠창살을 열려면 세 개를 모아야 한다.','keys'],
  ['dive-certificate','던전 탐험 확인증','동료들을 구해 함께 탈출한 책임감 · 100점','tablet']
 ])ARPIA_DATA.ITEMS['mt_'+id]={name,desc,kind:'quest',price:0,sell:0,icon:root+art+'.png'};
 Object.assign(x.npcs,{
  diveTablet:{name:'시험용 찰흙판',artPath:root+'tablet.png',height:42},
  diveFireMark:{name:'불꽃 마을 표식',artPath:root+'fire-mark.png',height:30},
  diveEntrance:{name:'폭포 뒤 공간'},diveExit:{name:'출구의 쇠창살'},
  diveAir:{name:'공기 방울',artPath:root+'air.png',height:37},
  diveInspect:{name:'방 안 살펴보기'},
  diveKey0:{name:'수중 던전 열쇠',artPath:root+'keys.png',height:27},
  diveKey1:{name:'수중 던전 열쇠',artPath:root+'keys.png',height:27},
  diveKey2:{name:'수중 던전 열쇠',artPath:root+'keys.png',height:27}
 });
 const hallDoorX=[115,375,637,895,1159,1420],hallLaneY=[155,366,576,792,1000];
 const exitPos=[637,576],airPos=[695,576],roomEntry=[500,611];
 const keyRooms=[18,27,0],friendRooms={isaac:13,matilda:15};
 const inside=id=>id==='divehall'||/^diveroom\d+$/.test(id);
 const roomNumber=id=>/^diveroom\d+$/.test(id)?+id.slice(8):-1;
 const countBits=n=>[0,1,2].filter(i=>(n||0)&(1<<i)).length;
 const hasKey=(s,i)=>!!(s.diveKeys&(1<<i));
 const visited=(s,i)=>!!((i<15?s.diveVisited:s.diveVisitedUpper)&(1<<(i%15)));
 const hallPoint=i=>[hallDoorX[i%6],hallLaneY[Math.floor(i/6)]];
 const roomLabel=i=>(Math.floor(i/6)+1)+'행 '+(i%6+1)+'열';
 const fixture=(n,id,p)=>({...n(id,p[0],p[1]),type:'fixture'});
 const rows=[
  {key:'call',title:'세 번째 시험의 호출',scene:'lobby',npc:'sofia',pos:[470,335],lines:[['sofia','이제 던전 탐험 시험이에요. 나오미 선생님이 찾으시니 교실로 가 보세요.'],['you','이번에는 어떤 곳으로 가게 될까?']]},
  {key:'team',title:'퀴즈포켓의 조 편성',scene:'classroom',npc:'naomi',pos:[530,185],lines:[['naomi','퀴즈포켓에서 종이를 뽑아 같은 조의 친구를 확인하렴.'],['quizpocket','함께할 학생은… 아이작, 그리고 마틸다 공주입니다!'],['you','둘 다 자기 의견이 강한데… 힘을 합칠 수 있겠지?']]},
  {key:'summons',title:'교장 선생님의 전언',scene:'lobby',npc:'hina',pos:[530,335],lines:[['hina','마틸다와 아이작이 너를 기다려. 그런데 먼저 교장 선생님께 가 봐. 꼭 할 말씀이 있으시대.'],['you','시험 전에 무슨 일이 생긴 걸까?']]},
  {key:'twinsRequest',title:'모리스가 알고 있는 사실',scene:'principal',npc:'morris',lines:[['morris','퀴즈포켓에게는 쌍둥이 동생이 있다. 오당카의 오두막에 있지.'],['morris','시험이 끝난 뒤 그 동생을 데려오너라. 잊지 말고.'],['you','네… 기억하고 있을게요.']],effect:s=>s.diveTwinRequest=true},
  {key:'leaderPlan',title:'바벨 신전 앞의 약속',scene:'campus',npc:'matilda',pos:[590,450],lines:[['matilda','조장은 내가 맡는 게 좋겠어. 왕실에서도 이런 탐험은…'],['isaac','나도 할 수 있거든! 마법 실력으로 정하자.'],['you','콜로세움에서 정정당당하게 겨루자. 누가 되든 조장의 말을 듣기로 해.']]},
  {key:'leaderBattle',title:'조장을 정하는 대결',scene:'arena',npc:'isaac',pos:[535,402],lines:[['isaac','이번에는 내가 이길 거야!'],['matilda','좋아. 결과에 승복하기로 했으니 시작하자.'],['you','서로 다치지 않도록 보호 마법 안에서 겨루는 거야.']],battle:'midtermLeader19'},
  {key:'clue',title:'장소도 찾아내는 시험',scene:'classroom',npc:'naomi',pos:[530,185],lines:[['naomi','{name}, 네가 조장이 되었구나. 이제 시험 장소를 찾아오렴.'],['quizpocket','데런 왕국에서 찰흙판을 얻고 세 마을의 표식을 끼우면 됩니다. 위치는 스스로 알아내세요!'],['you','처음부터 협력이 필요한 시험이군요.']]},
  {key:'king',title:'왕국 경기장의 찰흙판',scene:'kingdom',npc:'caesar',lines:[['caesar','시험용 찰흙판은 왕국 경기장에 준비되어 있다. 세 사람이 함께 찾아보거라.'],['you','허락해 주셔서 감사합니다.']]},
  {key:'tablet',title:'세 개의 홈',scene:'royalarena',npc:'diveTablet',pos:[710,455],fixture:true,lines:[['narrator','갈라진 찰흙판에 불꽃, 얼음, 대지의 표식을 넣을 홈이 보인다.'],['matilda','내가 얼음 마을을 맡을게.'],['isaac','그럼 나는 대지 마을!'],['you','나는 불꽃 마을로 갈게. 표식을 얻으면 데런 왕국에서 다시 만나자.']],effect:s=>give(s,'dive-tablet')},
  {key:'emery',title:'델핀에게 맡긴 표식',scene:'firevillage',npc:'emery',pos:[295,255],lines:[['emery','중간고사 표식은 델핀에게 맡겨 두었단다. 저쪽에서 만나 보렴.'],['you','이번에도 델핀을 찾아가면 되겠네요.']]},
  {key:'lostMark',title:'강가에서 잃어버린 물건',scene:'firevillage',npc:'delphin',pos:[260,440],lines:[['delphin','표식을 가져오다가 떨어뜨린 것 같아. 웨일라 강가를 지나왔는데 그 근처를 찾아보겠니?'],['you','강가의 길을 따라 살펴볼게요.']]},
  {key:'riverHula',title:'표식 위에 앉은 버섯',scene:'weila',npc:'hula17',pos:[7110,9600],fixture:true,goal:'불꽃 마을 동쪽 강가에서 훌라 버섯 제압하기',lines:[['narrator','표식이 떨어진 곳을 훌라 버섯이 차지하고 있었다. 손을 뻗자 버섯이 몸을 일으킨다.'],['you','표식을 돌려받아야 해. 이번에도 물러설 수 없어!']],battle:'midtermRiverHula19'},
  {key:'fireMark',title:'되찾은 불꽃 표식',scene:'weila',npc:'diveFireMark',pos:[7110,9600],fixture:true,lines:[['narrator','훌라 버섯 아래에서 불꽃 무늬가 새겨진 표식을 찾았다.'],['you','친구들도 돌아왔을까? 데런 왕국에서 모이자.']],effect:s=>give(s,'dive-fire')},
  {key:'assemble',title:'폭포를 가리키는 찰흙판',scene:'kingdom',npc:'matilda',pos:[587,468],lines:[['matilda','얼음 표식은 가져왔어. 아이작도 대지 표식을 구했대.'],['isaac','세 개를 끼우면… 어? 지도에 빛이 생겼어!'],['you','쟈칼의 폭포를 가리키고 있어. 함께 가 보자.']],effect:s=>{take(s,'dive-fire');s.diveLocationKnown=true;}},
  {key:'waterfall',title:'폭포 뒤에 숨은 공간',scene:'waterfall',npc:'diveEntrance',pos:[571,217],fixture:true,lines:[['narrator','물줄기 너머에 좁은 틈이 보였다. 찰흙판이 가리키는 곳과 일치한다.'],['you','안쪽에서 선생님의 목소리가 들려. 들어가 보자.']],effect:(s,a)=>a.travel('divefoyer',[500,590])},
  {key:'briefing',title:'세 열쇠와 네비니움',scene:'divefoyer',npc:'naomi',pos:[500,385],lines:[['naomi','이곳이 수중 던전이다. 들어가면 쇠창살이 잠기고 세 개의 열쇠를 찾아야 나올 수 있어.'],['naomi','숨이 부족해지면 출구 앞 공기 방울로 보충하렴. 이 네비니움은 열쇠가 가까워지면 빛난다.'],['naomi','서두르는 것보다 동료를 챙기는 일이 중요해. 준비됐다면 들어가렴.'],['you','세 열쇠, 공기 방울, 그리고 친구들. 모두 잊지 않을게요.']],effect:s=>{give(s,'dive-ore');s.diveOxygen=120;}},
  {key:'enter',title:'닫히는 쇠창살',scene:'divefoyer',npc:'diveEntrance',pos:[700,405],fixture:true,lines:[['narrator','세 사람이 들어서자 등 뒤의 쇠창살이 천천히 내려왔다. 물속에 숨겨진 방들이 이어진다.'],['you','우선 함께 움직이자. 광석이 반응하는 곳부터 살펴봐.']],effect:(s,a)=>{s.diveActive=true;s.diveOxygen=120;a.travel('divehall',exitPos);}},
  {key:'keyOne',title:'첫 번째 열쇠 탐색',scene:'divehall',npc:'none',goal:'방을 돌아보며 네비니움이 반응하는 곳 조사하기',lines:[]},
  {key:'keyTwo',title:'두 번째 열쇠 탐색',scene:'divehall',npc:'none',goal:'공기를 보충하며 두 번째 열쇠 찾기',lines:[]},
  {key:'split',title:'더 빨리 나가려는 친구들',scene:'divehall',npc:'isaac',pos:[598,576],lines:[['isaac','두 개나 찾았잖아. 이제 따로 찾으면 더 빠를 거야!'],['matilda','그래. 마지막 열쇠를 찾은 사람이 문으로 돌아오면 돼.'],['you','그럼 출구에서 꼭 만나자. 숨이 부족하면 바로 돌아와야 해.']],effect:s=>s.diveSeparated=true},
  {key:'keyThree',title:'마지막 열쇠',scene:'divehall',npc:'none',goal:'네비니움의 빛을 따라 마지막 열쇠 찾기',lines:[]},
  {key:'emptyGate',title:'아무도 없는 출구',scene:'divehall',npc:'diveExit',pos:exitPos,fixture:true,lines:[['you','열쇠는 전부 모았는데… 아이작? 마틸다?'],['narrator','약속한 문 앞에는 아무도 없었다. 먼저 밖으로 나가 선생님께 알리기로 했다.']],effect:(s,a)=>{s.diveActive=false;s.diveFirstExit=true;a.travel('divefoyer',[500,590]);}},
  {key:'returnForFriends',title:'조장의 책임',scene:'divefoyer',npc:'naomi',pos:[500,385],lines:[['naomi','나머지 두 사람은 어디 있니? 안에서 흩어졌다고? 내가 찾아보마.'],['you','제가 다시 들어갈게요. 조장은 저예요. 친구들을 두고 끝낼 수는 없어요.'],['naomi','공기를 충분히 보충하고 가렴. 절대로 다시 무리하지 말고.']],effect:(s,a)=>{s.diveActive=true;s.diveOxygen=120;a.travel('divehall',exitPos);}},
  {key:'friendOne',title:'다시 수중 던전으로',scene:'divehall',npc:'none',goal:'미처 살피지 못한 방에서 친구의 흔적 찾기',lines:[]},
  {key:'friendTwo',title:'남은 한 친구',scene:'divehall',npc:'none',goal:'공기를 보충하며 남은 친구 찾기',lines:[]},
  {key:'togetherExit',title:'세 사람이 함께 나가는 길',scene:'divehall',npc:'diveExit',pos:exitPos,fixture:true,lines:[['isaac','먼저 나갔을 줄 알았어… 나를 찾으러 다시 온 거야?'],['matilda','고마워. 이제 흩어지지 말고 함께 나가자.'],['you','셋이 들어왔으니까 셋이 나가는 거야.']],effect:(s,a)=>{s.diveActive=false;a.travel('divefoyer',[500,590]);}},
  {key:'returnItems',title:'시험 도구 반납',scene:'divefoyer',npc:'naomi',pos:[500,385],lines:[['naomi','셋 다 무사해서 다행이다. 광석과 찰흙판, 열쇠를 돌려주렴.'],['naomi','바로 양호실로 가서 치료를 받아. 평가는 몸을 살핀 뒤에 하자.'],['you','네. 친구들과 같이 다녀올게요.']],effect:s=>{take(s,'dive-tablet');take(s,'dive-ore');take(s,'dive-key',3);s.diveToolsReturned=true;}},
  {key:'infirmary',title:'아멜라의 진찰',scene:'infirmary',npc:'amela',lines:[['amela','큰 이상은 없구나. 조금 쉬면서 호흡을 가라앉히렴.'],['isaac','다음에는 혼자 앞서가지 않을게.'],['you','모두 무사한 게 제일 다행이야.']],effect:s=>{s.hp=s.maxHp;s.mp=s.maxMp;}},
  {key:'grade',title:'동료를 위한 100점',scene:'classroom',npc:'quizpocket',pos:[610,290],lines:[['quizpocket','아이작과 마틸다는 각각 25점. 빨리 탈출하려다 협력을 잊었군요.'],['quizpocket','조장은… 인정하기 싫지만 100점입니다. 친구를 위해 위험 속으로 되돌아간 책임감을 보였습니다.'],['you','혼자 나오는 것보다 함께 나오는 게 더 중요하다는 걸 배웠어요.']],effect:s=>{s.midtermDungeonScore=100;s.midtermIsaacDungeonScore=25;s.midtermMatildaDungeonScore=25;give(s,'dive-certificate');s.diveActive=false;},reward:70,ending:'세 열쇠를 찾고 두 친구를 구해 함께 탈출했습니다. 던전 탐험 100점을 받았습니다. 다음은 마법 전투 시험입니다.'}
 ];
 // Capture dialogue anchors; connective lines are reconstruction.
 const captured19={
 "call": [
  [
   "you",
   "나오미 선생님? 아, 맞다. 세 번째 과목인 던전 탐험은 나오미 선생님의 담당이지."
  ],
  [
   "sofia",
   "이번에는 혼자서 잘하는 것만으로는 안 될 거예요. 같은 조 친구들과 힘을 합쳐야 해요."
  ],
  [
   "you",
   "어떤 친구와 한 조가 될까? 교실로 가 봐야겠어."
  ]
 ],
 "team": [
  [
   "naomi",
   "퀴즈포켓으로 조를 정하겠다. 같은 조가 된 학생은 시험을 마칠 때까지 함께 움직이도록."
  ],
  [
   "quizpocket",
   "쳇, 이제 시험도 안 봤지만 {name} 녀석이 웃겠네."
  ],
  [
   "you",
   "시험은 공정하게 진행해야죠! 제 조원부터 알려 주세요."
  ],
  [
   "quizpocket",
   "아이작, 마틸다 공주. 셋이 한 조다."
  ],
  [
   "you",
   "데런 왕국 마틸다 공주네요. 둘 다 자기주장이 강한데… 잘해 보자."
  ]
 ],
 "leaderPlan": [
  [
   "matilda",
   "탐험에는 지휘할 사람이 필요하겠지. 내가 조장을 맡겠어."
  ],
  [
   "isaac",
   "내가 하려고 했는데? 마틸다 공주, 우리 둘이 연합해서 저 건방진 {name} 녀석부터 꺾어 주자구."
  ],
  [
   "you",
   "잠깐, 왜 둘이 한꺼번에 덤비는데?"
  ],
  [
   "matilda",
   "어쨌든 조장을 정해야 하잖아. 콜로세움에서 실력을 보여 줘."
  ],
  [
   "you",
   "좋아. 대신 결과가 나오면 조장의 말을 따라 주기야."
  ]
 ],
 "clue": [
  [
   "isaac",
   "조장은 {name}. 인정…"
  ],
  [
   "matilda",
   "나도 지금 이 순간만은 조장이 아니어서 참 편하네. 인정."
  ],
  [
   "you",
   "설마 어려운 일은 전부 조장에게 맡기려는 건 아니지?"
  ],
  [
   "quizpocket",
   "흥흥, 계속하도록 하지. 지금부터는 시험 장소로 가서 인간의 지혜를 알려 주는 찰흙판 아이템을 얻도록."
  ],
  [
   "naomi",
   "찰흙판의 표식을 완성하면 탐험 장소를 찾을 수 있다. 왕국에서 시작해 보렴."
  ]
 ],
 "lostMark": [
  [
   "delphin",
   "어머, 뽀득 수세미를 주우러 갔던 강가인가 봐요. 표식을 옮기다가 거기서 떨어뜨렸나 봐요."
  ],
  [
   "you",
   "네, 알겠어요. 뽀득 수세미를 주웠던 강가로 가볼게요."
  ],
  [
   "delphin",
   "표식에는 불꽃 무늬가 있어요. 그냥 돌이라고 생각하고 지나치면 안 돼요."
  ]
 ],
 "riverHula": [
  [
   "you",
   "저 녀석, 뽀득 수세미가 있던 자리에 앉아 있는 게 의심스러워."
  ],
  [
   "narrator",
   "다가서자 훌라 버섯이 갑자기 몸을 튕겨 공격했다."
  ],
  [
   "you",
   "아이코 깜짝이야! 치사한 버섯 같으니라고. 버섯찌개를 해 먹을까 보다!"
  ]
 ],
 "fireMark": [
  [
   "narrator",
   "쓰러진 훌라 버섯 아래에서 불꽃의 표식을 찾았다."
  ],
  [
   "you",
   "찾았다! 이제 친구들이 구한 표식과 맞춰 보면 돼."
  ]
 ],
 "briefing": [
  [
   "naomi",
   "이것이 바로 중간고사 세 번째 시험 장소인 수중 던전이다."
  ],
  [
   "naomi",
   "첫 번째 던전 탐험의 기본과 두 번째 던전에서의 생존 방법을 자세히 설명하겠다."
  ],
  [
   "naomi",
   "문 앞에는 커다란 공기 방울이 있다. 그것에 붙어서 숨을 쉬면 공기 방울을 마시게 돼. 그러면 일정 시간 수중에 있어도 버틸 수 있다."
  ],
  [
   "naomi",
   "여길 나가는 쇠창살은 잠겨 있다. 수중 던전 안에서 탈출하기 위해선 세 개의 열쇠가 필요하다."
  ],
  [
   "naomi",
   "열쇠 곁에 지나고 있으면 광석이 빛을 낼 테니 신호를 잘 보도록."
  ],
  [
   "you",
   "광석을 살피면서 세 열쇠를 찾고, 숨이 모자라기 전에 문 앞에 돌아오기. 알겠습니다."
  ]
 ],
 "split": [
  [
   "you",
   "두 번째 열쇠도 찾았어. 이제 하나 남았다."
  ],
  [
   "isaac",
   "그럼 이제 따로 찾아보자. 마지막 하나를 찾는 건 금방이잖아."
  ],
  [
   "matilda",
   "나도 다른 방을 보겠어. 열쇠를 찾으면 출구에서 만나."
  ],
  [
   "you",
   "혼자 멀리 가면 위험해. 숨이 차면 꼭 공기 방울로 돌아와!"
  ]
 ],
 "emptyGate": [
  [
   "you",
   "마지막 열쇠를 찾았어. 휴우, 이제 탈출만 하면 되는데…"
  ],
  [
   "narrator",
   "문 앞에 있어야 할 아이작과 마틸다는 보이지 않았다."
  ],
  [
   "you",
   "일단 닫힌 쇠창살을 열고 밖에 수중 던전 출구로 가 봐야겠어. 먼저 나가 있는 걸까?"
  ]
 ]
};
 for(const r of rows)if(captured19[r.key])r.lines=captured19[r.key];
 const c=m.register(19,'아르피아 중간고사 3부 · 수중 던전',rows,{diveTwinRequest:false,diveLocationKnown:false,diveActive:false,diveSeparated:false,diveFirstExit:false,diveToolsReturned:false,diveKeys:0,diveFriends:0,diveVisited:0,diveVisitedUpper:0,diveOxygen:120,diveAirReturns:0,midtermDungeonScore:0,midtermIsaacDungeonScore:0,midtermMatildaDungeonScore:0,diveLeaderWon:false,diveRiverWon:false});
 const enemy=(name,element,hp,atk,npc)=>({name,element,hp,maxHp:hp,atk,atb:10,npc,height:130});
 x.encounters.midtermLeader19={name:'조장 결정전 · 아이작과 마틸다',bg:'assets/maps-hires/colosseum.png',intro:'동료와 겨루는 보호 마법 안의 대결입니다.',next:c.keys.clue,setFlag:'diveLeaderWon',xp:180,gold:0,sp:30,enemies:[enemy('아이작',0,270,17,'isaac'),enemy('마틸다',1,250,16,'matilda')]};
 x.encounters.midtermRiverHula19={name:'웨일라 강가의 훌라 버섯',bg:'assets/maps-hires/forest-battle.png',intro:'불꽃 표식을 차지한 훌라 버섯이 공격합니다.',next:c.keys.fireMark,setFlag:'diveRiverWon',xp:205,gold:110,sp:40,enemies:[{name:'훌라 버섯',element:2,hp:590,maxHp:590,atk:23,atb:20,sprite:'midtermHula',artPath:'assets/midterm/hula-large.png',height:158}]};

 x.scenes.divefoyer=(s,n,p)=>({id:'divefoyer',name:'쟈칼의 폭포 뒤 · 수중 던전 입구',bg:root+'room.webp',w:1000,h:667,zoom:1.25,nodes:[[500,590],[500,385],[700,405]],edges:[[0,1],[1,2]],entities:[p('back','폭포 밖으로',500,611,'waterfall',[571,217]),n('naomi',500,385),fixture(n,'diveEntrance',[700,405])]});
 x.scenes.divehall=(s,n,p)=>({id:'divehall',name:'수중 던전 · 30개의 방',bg:root+'hall.webp',w:1536,h:1024,zoom:1.45,nodes:[exitPos],edges:[],entities:[fixture(n,'diveExit',exitPos),fixture(n,'diveAir',airPos),...Array.from({length:30},(_,i)=>i===14?null:{...p('diveDoor'+i,roomLabel(i)+' 방',...hallPoint(i),'diveroom'+i,roomEntry),diveDoor:true}).filter(Boolean)]});
 for(let i=0;i<30;i++)x.scenes['diveroom'+i]=(s,n,p)=>{
  const entities=[p('back','회랑으로',...roomEntry,'divehall',hallPoint(i)),fixture(n,'diveInspect',[500,420])];
  const ki=keyRooms.indexOf(i);
  if(ki>=0&&!hasKey(s,ki)&&[c.keys.keyOne,c.keys.keyTwo,c.keys.keyThree].includes(s.stage))entities.push(fixture(n,'diveKey'+ki,[720,390]));
  if([c.keys.friendOne,c.keys.friendTwo].includes(s.stage))for(const [id,ri]of Object.entries(friendRooms))if(i===ri&&!(s.diveFriends&(id==='isaac'?1:2)))entities.push(n(id,310,400));
  return{id:'diveroom'+i,name:'수중 던전 · '+roomLabel(i)+' 방',bg:root+'room.webp',w:1000,h:667,zoom:1.25,nodes:[roomEntry,[500,420],[720,390],[310,400]],edges:[[0,1],[1,2],[1,3]],entities};
 };
 const decorate=x.decorate,prior=x.interact,oldItems=x.questItems;
 x.decorate=(sc,s,n,p)=>{
  decorate(sc,s,n,p);
  if(sc.id==='waterfall'&&s.diveLocationKnown&&!sc.entities.some(e=>e.id==='diveEntrance'))sc.entities.push(fixture(n,'diveEntrance',[571,217]));
  if(sc.id==='divehall'&&s.stage===c.keys.togetherExit){sc.entities.push(n('isaac',550,576),n('matilda',735,576));}
  if(sc.id==='divefoyer'&&s.diveFriends===3){sc.entities.push(n('isaac',380,430),n('matilda',625,435));}
 };
 x.interact=(e,a)=>{
  const s=a.state,ri=roomNumber(s.scene);
  // Chapter-specific exit conditions are checked before the ordinary scripted rows.
  if(e.id==='diveExit'&&inside(s.scene)){
   if(s.stage===c.keys.emptyGate||s.stage===c.keys.togetherExit)return prior(e,a);
   a.talk([['narrator',countBits(s.diveKeys)<3?'쇠창살에는 세 개의 열쇠 구멍이 있다. 아직 모두 채워지지 않았다.':'열쇠는 모두 모았다. 하지만 친구들과 함께 나가야 한다.']]);return true;
  }
  if(e.id==='diveAir'){
   s.diveOxygen=120;a.chime('heal');a.save();a.toast('공기를 가득 보충했습니다.');renderHUD(s);return true;
  }
  if(e.id==='diveEntrance'&&s.scene==='divefoyer'&&s.stage!==c.keys.enter){
   if(s.stage<c.keys.enter){a.toast('먼저 나오미 선생님의 설명을 들으세요.');return true;}
   if(s.stage>=c.keys.returnItems){a.toast('시험을 마쳤습니다. 먼저 치료와 평가를 받으세요.');return true;}
   s.diveActive=true;a.travel('divehall',exitPos);return true;
  }
  if(e.id==='diveEntrance'&&s.scene==='waterfall'&&s.stage!==c.keys.waterfall){a.travel('divefoyer',[500,590]);return true;}
  if(e.id==='diveInspect'&&ri>=0){
   const ki=keyRooms.indexOf(ri),near=ki>=0&&!hasKey(s,ki);
   a.talk([['narrator',near?'네비니움이 밝게 빛난다. 벽 가까이 떨어진 작은 금속 물체를 살펴보자.':'바닥과 벽을 살펴보았지만 열쇠는 보이지 않는다. 다른 방을 찾아보자.']]);return true;
  }
  if(/^diveKey[0-2]$/.test(e.id)&&ri>=0){
   const ki=+e.id.slice(-1),at=s.stage;
   if(hasKey(s,ki)||keyRooms[ki]!==ri||![c.keys.keyOne,c.keys.keyTwo,c.keys.keyThree].includes(at))return true;
   a.talk([['narrator','광석이 빛나는 곳에서 차가운 은빛 열쇠를 찾았다.'],['you',countBits(s.diveKeys)===2?'세 개를 모두 모았어. 약속한 출구로 돌아가자.':'열쇠 하나를 찾았어! 숨이 부족해지기 전에 공기도 챙기자.']],()=>{
    if(s.stage!==at||hasKey(s,ki))return;
    s.diveKeys|=1<<ki;give(s,'dive-key');a.advance(at+1,12);a.refresh();a.save();renderHUD(s);
   });return true;
  }
  if(ri>=0&&friendRooms[e.id]===ri&&[c.keys.friendOne,c.keys.friendTwo].includes(s.stage)){
   const bit=e.id==='isaac'?1:2,at=s.stage;if(s.diveFriends&bit)return true;
   a.talk([[e.id,e.id==='isaac'?'미로 길을 잃어버리고 말았어. 자꾸 헤매다 숨도 다 떨어져서 죽는 줄 알았어. 정말…':'숨이 차서 더 움직일 수가 없었어. 나를 찾으러 온 거야?'],['you','찾아서 다행이야. 이제 내 옆에서 함께 움직이자.']],()=>{
    if(s.stage!==at||s.diveFriends&bit)return;
    s.diveFriends|=bit;a.advance(at+1,15);a.refresh();a.save();renderHUD(s);
   });return true;
  }
  return prior(e,a);
 };
 x.questItems=s=>[...oldItems(s),...(s.diveLocationKnown&&!s.diveToolsReturned?[['수중 던전 탐험 기록','열쇠 '+countBits(s.diveKeys)+'/3 · 친구 '+((s.diveFriends&1?1:0)+(s.diveFriends&2?1:0))+'/2 · 공기 방울은 출구 앞']]:[]),...(s.midtermDungeonScore?[['던전 탐험 성적','100점 · 동료 구조 완료 / 아이작 25점 · 마틸다 25점']]:[])];

 const hud=document.createElement('div');hud.id='dive-hud';hud.hidden=true;hud.setAttribute('aria-label','수중 던전 상태');
 hud.innerHTML='<div class="dive-hud-top"><img src="'+root+'air.png" alt=""><strong>남은 공기 <span id="dive-air-text"></span></strong><span id="dive-key-text"></span></div><div class="dive-air-track"><span id="dive-air-fill"></span></div><div class="dive-signal"><img src="'+root+'navinium.png" alt="네비니움"><span id="dive-signal-text"></span></div>';
 document.querySelector('#view').appendChild(hud);
 function signal(s){
  const ri=roomNumber(s.scene),open=keyRooms.filter((_,i)=>!hasKey(s,i));
  if(!open.length)return s.diveFirstExit&&s.diveFriends<3?'열쇠는 모두 찾았다. 아직 돌아오지 않은 친구를 찾자.':'열쇠 세 개가 모두 모였다. 출구로 돌아가자.';
  if(ri>=0)return open.includes(ri)?'광석이 눈부시게 빛난다! 이 방을 자세히 살펴보자.':'광석은 희미하다. 이 방에는 열쇠가 없는 듯하다.';
  const nearest=Math.min(...open.map(i=>{const p=hallPoint(i);return Math.hypot(s.x-p[0],s.y-p[1]);}));
  return nearest<160?'광석이 강하게 빛난다. 가까운 방을 살펴보자.':nearest<430?'광석에 푸른빛이 돈다. 이 근처에 단서가 있다.':'광석의 빛이 약하다. 다른 갈래를 탐색해 보자.';
 }
 function renderHUD(s){
  hud.hidden=!inside(s.scene);if(hud.hidden)return;
  const ratio=Math.max(0,Math.min(1,s.diveOxygen/120));
  document.querySelector('#dive-air-text').textContent=Math.ceil(ratio*100)+'%';
  document.querySelector('#dive-air-fill').style.width=ratio*100+'%';
  hud.classList.toggle('low',ratio<.25);
  document.querySelector('#dive-key-text').textContent='열쇠 '+countBits(s.diveKeys)+'/3';
  document.querySelector('#dive-signal-text').textContent=signal(s);
 }
 function tick(a,dt){
  const s=a.state;renderHUD(s);if(!inside(s.scene)||!s.diveActive)return false;
  const ri=roomNumber(s.scene);if(ri>=0)s[ri<15?'diveVisited':'diveVisitedUpper']|=1<<(ri%15);
  s.diveOxygen=Math.max(0,s.diveOxygen-dt);
  if(s.diveOxygen>0)return false;
  s.diveOxygen=120;s.diveAirReturns++;a.travel('divehall',airPos);a.save();
  a.talk([['narrator','숨이 가빠져 더 탐색할 수 없었다. 입구의 공기 방울로 돌아와 호흡을 가다듬었다.'],['you','다음에는 공기가 떨어지기 전에 돌아와야겠어.']]);return true;
 }
 function allowTravel(s,to){
  if(s.diveActive&&inside(s.scene)&&!inside(to))return '수중 시험 중에는 출구의 쇠창살로 나가야 합니다.';
  if(inside(to)&&(s.stage<c.keys.enter||(s.stage===c.keys.enter&&!s.diveActive)))return '나오미 선생님의 설명을 듣고 입구로 들어가세요.';
  if(!inside(to))hud.hidden=true;
  return null;
 }
 function mapHTML(s){
  const ri=roomNumber(s.scene),p=ri>=0?hallPoint(ri):[s.x,s.y];
  const marks=Array.from({length:30},(_,i)=>{const xy=hallPoint(i),seen=visited(s,i);return '<span class="dive-room-mark '+(seen?'visited':'')+'" style="left:'+xy[0]/1536*100+'%;top:'+xy[1]/1024*100+'%">'+(i===14?'출구':seen?'✓':'·')+'</span>';}).join('');
  return '<span class="badge">수중 던전 · 탐험 지도</span><h2>여섯 갈래, 서른 개의 방</h2><p>✓는 방문한 방입니다. 네비니움의 반응을 따라 열쇠를 찾으세요.</p><div class="dive-map"><img src="'+root+'hall.webp" alt="6열 5행으로 연결된 수중 회랑">'+marks+'<b style="left:'+p[0]/1536*100+'%;top:'+p[1]/1024*100+'%">▼</b></div><p class="note">중앙 출구 옆 공기 방울에서 숨을 보충할 수 있습니다. 지도를 보는 동안에는 공기가 줄지 않습니다.</p>';
 }
 function isGoal(s,e){const ri=roomNumber(s.scene);if(ri<0)return false;if(/^diveKey[0-2]$/.test(e.id))return [c.keys.keyOne,c.keys.keyTwo,c.keys.keyThree].includes(s.stage);return friendRooms[e.id]===ri&&[c.keys.friendOne,c.keys.friendTwo].includes(s.stage);}
 window.ARPIA_DIVE={inside,roomNumber,keyRooms,friendRooms,hallPoint,exitPos,airPos,roomEntry,countBits,signal,tick,renderHUD,allowTravel,mapHTML,isGoal,visited,chapter:c};
 for(const [mood,texts]of Object.entries({embarrassed:['네… 기억하고 있을게요.'],surprised:['둘 다 자기 의견이 강한데… 힘을 합칠 수 있겠지?','열쇠는 전부 모았는데… 아이작? 마틸다?'],determined:['표식을 돌려받아야 해. 이번에도 물러설 수 없어!','제가 다시 들어갈게요. 조장은 저예요. 친구들을 두고 끝낼 수는 없어요.'],happy:['셋이 들어왔으니까 셋이 나가는 거야.','모두 무사한 게 제일 다행이야.']}))for(const text of texts)ARPIA_HERO_ART.annotations.set(text,mood);
})();
