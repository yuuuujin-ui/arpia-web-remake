/* Investigation arc: wonavy.tistory.com/215. Dialogue and room navigation rebuilt. */
(()=>{
 const x=ARPIA_EXTRA,m=ARPIA_MIDTERM,D=ARPIA_DIVE;
 for(const id of ['gluglu','shaiya']){x.npcs[id].portraitPath='assets/investigation/'+id+'.png';ARPIA_PORTRAITS[id]=x.npcs[id].portraitPath;}
 const item=(id,name,desc,art)=>ARPIA_DATA.ITEMS['mt_'+id]={name,desc,kind:'quest',price:0,sell:0,icon:art};
 item('invitation23','히나의 마나스톤 초대장','중간고사가 끝난 기념 파티의 초대장','assets/investigation/invitation.png');
 item('letter23','익명의 제보 편지','복면 괴인의 정체를 알려 주겠다며 수중 던전으로 부른다.','assets/midterm/certificate.png');
 item('fur23','신전의 하얀 털','글루글루의 신전에서 발견한 헝거의 털','assets/midterm/fur23.png');
 Object.assign(x.npcs,{letter23:{name:'셀레스틴이 건넨 편지',artPath:'assets/midterm/certificate.png',height:35},fur23:{name:'하얀 털',artPath:'assets/midterm/fur23.png',height:30},templeSearch:{name:'신전 안 살펴보기'},crab23:{name:'얼음 던전의 몬스터 게',artPath:'assets/original/pet-images/crab/idle1.gif',height:67}});
 const room=(id,name,file,to,entry)=>(s,n,p)=>({id,name,bg:'assets/investigation/'+file+'.webp',w:1536,h:1024,zoom:1.05,nodes:[[768,960],[768,810],[768,650],[768,470],[520,650],[1030,650],[500,820],[1030,820],[1150,460]],edges:[[0,1],[1,2],[2,3],[2,4],[2,5],[4,6],[5,7],[6,1],[7,1],[5,8]],entities:[p('back','밖으로',768,960,to,entry)]});
 x.scenes.gluglutemple=room('gluglutemple','글루글루의 신전','temple','magecity',[450,324]);
 x.scenes.shaiyatower=room('shaiyatower','샤이아의 탑','tower','magecity',[555,490]);
 x.scenes.schoolprison=room('schoolprison','학교 지하 감옥','prison','woodhall',[656,730]);
 x.map.push(['gluglutemple','글루글루의 신전',[768,960]],['shaiyatower','샤이아의 탑',[768,960]],['schoolprison','학교 지하 감옥',[768,960]]);
 const rows=[
 {key:'invitation',title:'시험이 끝난 기념 파티',scene:'campus',npc:'hina',lines:[['hina','중간고사가 끝났으니 파티하자! 이 마나스톤이 초대장이야.'],['you','복면 괴인을 쫓느라 갈 수 있을지 모르겠어. 그래도 고마워.'],['hina','료마 선생님도 널 찾고 계셨어. 1층에 가 봐.']],effect:s=>{m.give(s,'invitation23');s.enemyInvitationReceived=true;}},
 {key:'recovered',title:'학교로 돌아온 료마',scene:'lobby',npc:'ryoma',pos:[530,335],lines:[['ryoma','치료약 덕분에 나았다. 카디쟈 님께 계속 신세를 질 수는 없지.'],['scoll','그분의 도도한 매력이 대단하지 않던가?'],['ryoma','아주 예의 바르신 분이었다. 교장 선생님께 먼저 보고하거라.']]},
 {key:'absent',title:'비어 있는 교장실',scene:'principal',npc:'templeSearch',fixture:true,lines:[['narrator','교장 선생님은 잠시 자리를 비우셨다.'],['you','얼음 던전에서 만나겠다는 말을 놓칠 수 없어. 먼저 확인하자.']]},
 {key:'scarlet',title:'순식간에 지나간 그림자',scene:'icevillage',npc:'scarlet',pos:[510,410],lines:[['scarlet','던전 쪽으로 무언가 빠르게 지나가긴 했어요. 얼굴은 보지 못했어요.'],['you','아직 안에 있을지도 몰라. 조심해서 들어가 볼게요.']]},
 {key:'crabs',title:'입구를 가로막은 게',scene:'icedungeon',npc:'crab23',pos:[340,465],fixture:true,lines:[['you','길을 막고 있네. 먼저 이 몬스터들을 물리쳐야겠어.']],battle:'enemyCrabs23'},
 {key:'listen',title:'거울 미로와 침묵의 검',scene:'icedungeon',npc:'masked21',pos:[621,346],lines:[['masked21','거울 속 미로가 너무 넓다. 몇 번을 들어가도 태양의 보석을 찾을 수 없었어.'],['hunger','쥬다에서 침묵의 검은 훔쳐 왔다. 이번에는 스콜 같은 꼭두각시 없이 직접 하지.'],['you','역시 지난 사건도 너희 짓이었구나!']]},
 {key:'hunger',title:'얼음 던전의 헝거',scene:'icedungeon',npc:'hunger',pos:[621,346],lines:[['hunger','또 네 녀석이냐!'],['you','이번에는 그냥 보내지 않겠어!']],battle:'enemyHunger23'},
 {key:'lost',title:'사라진 초대장',scene:'icedungeon',npc:'templeSearch',pos:[500,400],fixture:true,lines:[['narrator','헝거가 물러난 사이 복면 괴인은 사라졌다. 주머니를 살피자 히나의 초대장도 없었다.'],['you','싸우다가 떨어뜨렸나 봐. 지금은 먼저 학교에 알려야 해.']],effect:s=>{m.take(s,'invitation23');s.enemyInvitationLost=true;}},
 {key:'evidence',title:'심증만으로는 부족하다',scene:'principal',npc:'morris',lines:[['you','글루글루 마법사님이 날개가루의 사용처를 숨기셨어요. 혹시 그분이…'],['morris','짐작만으로 누군가를 범인이라 단정해서는 안 된다. 사실을 뒷받침할 증거를 찾아오거라.']]},
 {key:'temple',title:'신전에서 찾아보는 단서',scene:'gluglutemple',npc:'templeSearch',pos:[520,650],fixture:true,lines:[['narrator','책상 주변과 선반 아래를 살펴보던 중 발소리가 들렸다.'],['gluglu','허락도 없이 여기서 무엇을 하는 건가?']]},
 {key:'refusal',title:'신전에서 쫓겨나다',scene:'gluglutemple',npc:'gluglu',pos:[768,470],lines:[['you','날개가루를 어디에 쓰셨는지 알려 주세요.'],['gluglu','이미 말할 수 없다고 했다. 지금은 돌아가게!']],effect:(s,a)=>a.travel('magecity',[450,324])},
 {key:'joker',title:'조커가 아는 것',scene:'magecity',npc:'joker',pos:[310,375],lines:[['joker','신전을 보좌하는 건 샤이아지. 난 그분의 개인적인 일까지 알지는 못해.'],['you','샤이아님께 여쭤볼게요.']]},
 {key:'shaiya',title:'글루글루를 감싸는 샤이아',scene:'shaiyatower',npc:'shaiya',pos:[768,470],lines:[['shaiya','그분은 악의 마법사들과 싸우느라 지쳐 계세요. 근거 없는 의심으로 괴롭히지 말아 주세요.'],['you','하지만 뭔가 숨기고 계시는 건 분명해요.']]},
 {key:'again',title:'다시 닫힌 대화',scene:'gluglutemple',npc:'gluglu',pos:[768,470],lines:[['gluglu','지금은 너에게 해 줄 이야기가 없다.'],['you','알겠습니다. 다른 단서부터 찾아볼게요.']]},
 {key:'letter',title:'셀레스틴의 전갈',scene:'magecity',npc:'letter23',pos:[310,375],fixture:true,lines:[['narrator','셀레스틴이 불러 세워 누군가 맡기고 간 편지를 건넸다. 복면 괴인의 정체를 알려 주겠다는 제보였다.'],['you','수중 던전에서 만나자고? 발신자도 분명하지 않지만 확인은 해 봐야겠어.']],effect:s=>m.give(s,'letter23')},
 {key:'dive',title:'수중 던전으로 온 초대',scene:'divefoyer',npc:'diveEntrance',pos:[700,405],fixture:true,lines:[['you','편지에 적힌 곳은 셋째 줄 셋째 방이야. 공기를 챙겨서 들어가자.']],effect:(s,a)=>{s.diveActive=true;s.diveOxygen=120;a.travel('divehall',D.exitPos);}},
 {key:'trap',title:'편지가 이끈 함정',scene:'diveroom0',npc:'hunger',pos:[500,385],lines:[['hunger','제 발로 찾아오다니 어리석군!'],['you','헝거! 역시 함정이었어.'],['shaiya','물러서요! 함께 싸우겠어요.']],battle:'enemyDive23'},
 {key:'doubt',title:'샤이아가 들었던 질문',scene:'diveroom0',npc:'shaiya',pos:[500,385],lines:[['hunger','물속이라 힘을 제대로 쓸 수가 없군. 두고 보자!'],['you','글루글루님의 행동이 이상해서 조사하고 있었어요.'],['shaiya','그분이 웨일라와 아즈카 중 어느 쪽을 택하겠냐고 물으셨어요. 웨일라라고 하니 언짢아하셨죠.'],['shaiya','제가 따로 만나 볼게요. 그동안 신전을 살펴보세요.']],effect:s=>s.enemyShaiyaTrust=true},
 {key:'exit',title:'함정을 빠져나오기',scene:'divehall',npc:'diveExit',pos:D.exitPos,fixture:true,lines:[['you','서둘러 신전으로 돌아가자.']],effect:(s,a)=>{s.diveActive=false;a.travel('divefoyer',[500,590]);}},
 {key:'fur',title:'신전에 남은 하얀 털',scene:'gluglutemple',npc:'fur23',pos:[520,650],fixture:true,lines:[['narrator','바닥 틈에서 길고 흰 털을 발견했다. 헝거의 털과 똑같았다.'],['you','왜 이 털이 신전에 있지? 샤이아님께 알려야겠어.']],effect:s=>{m.give(s,'fur23');s.enemyFurFound=true;}},
 {key:'mirror',title:'거울 방으로 간 글루글루',scene:'shaiyatower',npc:'shaiya',pos:[768,470],lines:[['shaiya','글루글루님은 프리드의 거울이 있는 곳으로 가셨어요.'],['you','학교 지하요? 무슨 일을 하려는 거지?']]},
 {key:'attack',title:'어둠 속에서 날아온 마법',scene:'underpass',npc:'gluglu',pos:[905,375],lines:[['gluglu','드디어 왔군! 더는 도망칠 수 없다!'],['you','잠깐만요, 저는…!'],['narrator','설명할 틈도 없이 강한 마법이 날아왔다. 의식이 흐려지는 가운데 코볼트의 다급한 목소리가 들렸다.']],effect:s=>{s.enemyMirrorInjured=true;s.hp=Math.max(1,Math.floor(s.maxHp*.2));},reward:45,ending:'글루글루의 신전에서 헝거의 털을 찾았지만, 거울 방에서 그의 공격을 받았습니다. 사건의 진실은 아직 밝혀지지 않았습니다.'}
 ];
 const captured23={
 "invitation": [
  [
   "hina",
   "오늘 밤에 중간고사가 끝난 걸 축하하기 위해서 파티가 있어. 너도 와."
  ],
  [
   "you",
   "와… 정말이야. 어, 이건 마나스톤이잖아."
  ],
  [
   "hina",
   "그게 초대장이야. 잃어버리지 말고 가져와야 해."
  ],
  [
   "you",
   "응, 잘 간직할게. 지금은 복면 괴인 때문에 조금 바쁘지만…"
  ],
  [
   "hina",
   "또 혼자 뛰어다니는 거야? 료마 선생님도 찾으셨으니 먼저 들러 봐."
  ]
 ],
 "recovered": [
  [
   "ryoma",
   "덕분에 상처가 많이 나았다. 치료약을 가져와 주어 고맙구나."
  ],
  [
   "you",
   "카디쟈님 댁에서 더 쉬셔도 됐을 텐데요. 정말 괜찮으세요?"
  ],
  [
   "ryoma",
   "이제 움직일 만하다. 마냥 신세만 질 수는 없지."
  ],
  [
   "you",
   "아무래도 카디쟈님이 료마 선생님께 관심이 있는 것 같아요."
  ],
  [
   "ryoma",
   "흠흠. 그건 네가 걱정할 일이 아니다. 먼저 교장 선생님께 보고하거라."
  ]
 ],
 "scarlet": [
  [
   "scarlet",
   "뭔가가 빠른 속도로 휙 하고 스쳐 지나가는 걸 느꼈어. 너무 빨라서 볼 수가 없을 정도였지."
  ],
  [
   "you",
   "얼음 던전 쪽이었죠? 아직 멀리 가지 않았을지도 몰라요."
  ],
  [
   "narrator",
   "험프리 가의 문장을 대자 얼음 던전의 문이 열렸다."
  ]
 ],
 "listen": [
  [
   "you",
   "조심조심… 발견했다. 둘이 무슨 이야기를 하는 거지?"
  ],
  [
   "hunger",
   "나의 이름을 부르지 말라니. 그럼 뭐라고 부르면 좋겠나? 이름이 있어야 얘기를 할 수 있지."
  ],
  [
   "masked21",
   "목소리를 낮춰라. 태양의 보석을 프리드의 거울 속 미로에 옮겨 숨긴 모양이다."
  ],
  [
   "masked21",
   "몇 번 프리드의 거울 속 미로로 들어갔었지만, 그 속은 워낙 넓고 깊어 도저히 찾을 수 없었어."
  ],
  [
   "hunger",
   "저번에는 스콜이라는 멍청한 녀석을 꼭두각시로 부리는 바람에 자칫 대왕의 분노를 불러올 뻔했지만…"
  ],
  [
   "hunger",
   "그래도 내가 직접 쥬다 마을에서 빼앗은 침묵의 검은 잘 보관하고 있지. 크르르르."
  ],
  [
   "you",
   "너희가 여기서 만날 거라는 줄 알았지. 바보들, 헤헤."
  ],
  [
   "masked21",
   "누가 엿듣고 있었다! 헝거, 저 아이를 막아라!"
  ]
 ],
 "hunger": [
  [
   "hunger",
   "너는 오늘 늑대 밥이 된다. 기대해라. 크르르르."
  ],
  [
   "you",
   "또 남의 것을 훔쳐 놓고 큰소리야? 침묵의 검도 돌려줘!"
  ]
 ],
 "lost": [
  [
   "masked21",
   "헝거… 이런 꼬마에게 지는 걸 보니 너의 실력도 뻔하구나."
  ],
  [
   "you",
   "아직 끝나지 않았어. 이번에는 네가 상대해!"
  ],
  [
   "masked21",
   "꼬마야, 너와의 대결은 다음 번으로 미뤄야겠구나. 나도 바쁜 몸이 있어서…"
  ],
  [
   "narrator",
   "복면 괴인이 어둠 속으로 사라지고 몬스터 게가 출구를 가로막았다."
  ],
  [
   "you",
   "아니, 몬스터 게가 또 길을 막고 있잖아. 이대로 놓칠 수는 없는데!"
  ]
 ],
 "evidence": [
  [
   "you",
   "주머니가 허전해… 히나의 초대장이 없어! 으… 싸움 도중에 흘려버렸나 봐."
  ],
  [
   "narrator",
   "초대장을 찾으려다 결국 학교로 돌아왔다. 교장 선생님께 바로 보고할 수 없어 들은 이야기를 정리했다."
  ],
  [
   "you",
   "지금 가장 의심이 가는 건 글루글루 마법사님이야. 그렇지만 의심만으로는 부족해. 신전에서 직접 단서를 찾아보자."
  ]
 ],
 "refusal": [
  [
   "you",
   "날개가루를 어디에 쓰셨는지 한 번만 더 알려 주세요. 거울의 봉인에 쓰인 흔적이 있어요."
  ],
  [
   "gluglu",
   "남의 방을 뒤져 놓고 그걸 질문이라고 하는가? 허락도 없이 들어오지 말라고 했네."
  ],
  [
   "you",
   "죄송해요. 하지만 복면 괴인이…"
  ],
  [
   "gluglu",
   "더 들을 말이 없네. 나가게."
  ],
  [
   "you",
   "휴우… 방을 뒤지고 있는 걸 들킬 뻔했네. 다른 방법을 찾아야겠어."
  ]
 ],
 "letter": [
  [
   "narrator",
   "셀레스틴이 누군가 맡긴 메시지를 건넸다. 발신인은 이름 대신 “제보자, 아우”라고 적혀 있었다."
  ],
  [
   "you",
   "아르피아 마법학교의 마법사 학생에게. 복면 괴인을 추적하는 문제로 머리가 아프시죠."
  ],
  [
   "you",
   "제가 복면 괴인이 누군지 확실한 정보를 드릴 테니 쟈칼의 폭포에 있는 수중 던전에서 만납시다. 제보자, 아우…"
  ],
  [
   "you",
   "참 이상한 일이네요. 나를 알고 있는 사람인가? 함정일 수도 있지만 그냥 버릴 단서도 아니야."
  ]
 ],
 "dive": [
  [
   "you",
   "출구 바로 옆, 셋째 줄 셋째 방을 살펴보자. 공기 방울도 챙겨야겠어."
  ]
 ],
 "trap": [
  [
   "hunger",
   "크르르… 기다리고 있었어, {name}."
  ],
  [
   "you",
   "헝거! 아우라는 제보자가 설마 너였어?"
  ],
  [
   "shaiya",
   "일단 얘기는 다음으로 미루고, 힘을 합쳐 저 늑대들을 무찌르도록 해요."
  ],
  [
   "you",
   "샤이아님! 조심하세요. 둘이나 있어요!"
  ]
 ],
 "doubt": [
  [
   "you",
   "도와주셔서 고맙습니다. 저는 글루글루 마법사님을 조사하다가 여기까지 왔어요."
  ],
  [
   "you",
   "아, 샤이아님은 글루글루 마법사님을 정말 믿고 따르나 봐. 충격이 크실 것 같아…"
  ],
  [
   "shaiya",
   "그분이 얼마 전 이상한 질문을 하셨어요. 대마왕 아즈카와 웨일라 대륙 중에서 택해야 한다면 어떤 쪽이냐고요."
  ],
  [
   "shaiya",
   "나는 당연히 웨일라 대륙을 택한다고 했더니 글루글루 마법사님은 언짢은 표정으로 바뀌셨어요."
  ],
  [
   "you",
   "그런 질문을 왜 하셨을까요?"
  ],
  [
   "shaiya",
   "아직 단정할 수는 없어요. 글루글루 마법사님을 신전에서 불러내어 따로 만날 테니, 그 사이에 신전 안에서 단서를 찾아보세요."
  ]
 ],
 "fur": [
  [
   "narrator",
   "책상과 벽 사이를 살피던 손끝에 길고 하얀 털이 걸렸다."
  ],
  [
   "you",
   "전에 분명히 본 적이 있는 건데… 낯익은 털인데. 헝거의 털이잖아!"
  ],
  [
   "you",
   "여기에 헝거가 왔었다면… 샤이아님께 바로 보여 드려야겠어."
  ]
 ],
 "mirror": [
  [
   "shaiya",
   "글루글루님이 자리를 급히 뜨셨어요. 학교 지하의 프리드의 거울이 있는 방으로 가셨어요."
  ],
  [
   "you",
   "저도 알아냈어요. 신전에서 헝거의 털을 찾았어요!"
  ],
  [
   "shaiya",
   "그 털만으로 모든 걸 판단할 수는 없지만, 그냥 넘길 수도 없겠군요."
  ],
  [
   "you",
   "전 되겠어요. 얼른 프리드의 거울이 있는 방으로 가야겠어."
  ]
 ]
};
 for(const r of rows)if(captured23[r.key])r.lines=captured23[r.key];
 Object.assign(rows.find(r=>r.key==='lost'),{npc:'crab23',fixture:true,battle:'enemyCrabsExit23'});
 Object.assign(rows.find(r=>r.key==='evidence'),{scene:'lobby',npc:'templeSearch',fixture:true,title:'의심과 증거 사이'});
 for(const r of rows)if(['trap','doubt'].includes(r.key))r.scene='diveroom14';
 const c=m.register(23,'내부의 적 2부 · 글루글루',rows,{enemyInvitationReceived:false,enemyInvitationLost:false,enemyShaiyaTrust:false,enemyFurFound:false,enemyMirrorInjured:false});ARPIA_ENEMY_CHAPTERS.push(c);
 const mon=(name,hp,atk,sprite)=>({name,element:1,hp,maxHp:hp,atk,atb:0,sprite});
 for(const[id,name,next,enemies]of[
 ['enemyCrabs23','얼음 던전의 몬스터 게','listen',[mon('몬스터 게',380,24,'crab'),mon('몬스터 게',380,24,'crab')]],
 ['enemyHunger23','침묵의 검을 훔친 헝거','lost',[{...mon('헝거',1150,29,'whiteWolf'),artPath:'assets/original/character/other/헝거.png',height:155}]],
 ['enemyDive23','수중 던전의 매복','doubt',[{...mon('헝거',850,23,'whiteWolf'),artPath:'assets/original/character/other/헝거.png',height:155}]]
 ])x.encounters[id]={name,bg:id==='enemyDive23'?'assets/underwater/room.webp':'assets/maps-hires/forest-battle.png',intro:id==='enemyDive23'?'샤이아의 지원으로 약해진 헝거와 맞섭니다.':name,next:c.keys[next],xp:280,gold:100,sp:40,enemies};
 x.encounters.enemyCrabsExit23={...x.encounters.enemyCrabs23,name:'도주로를 막은 몬스터 게',next:c.keys.evidence,onWin:s=>{m.take(s,'invitation23');s.enemyInvitationLost=true;},enemies:x.encounters.enemyCrabs23.enemies.map(e=>({...e}))};
 const deco=x.decorate;x.decorate=(sc,s,n,p)=>{deco(sc,s,n,p);if(s.stage>=c.start&&sc.id==='magecity')sc.entities.push(p('templeDoor','글루글루의 신전',490,350,'gluglutemple',[768,960]),p('towerDoor','샤이아의 탑',595,530,'shaiyatower',[768,960]));if(sc.id==='woodhall'&&s.stage>=c.end)sc.entities.push({...p('prisonDoor','학교 지하 감옥',656,730,'schoolprison',[768,960]),fixedSpot:'prison'});};
 const prior=x.interact;x.interact=(e,a)=>{const s=a.state;if(s.stage>=c.keys.dive&&s.stage<=c.keys.exit){if(e.id==='diveExit'&&D.inside(s.scene)&&s.stage!==c.keys.exit){s.diveActive=false;a.travel('divefoyer',[500,590]);a.save();return true;}if(e.id==='diveEntrance'&&s.scene==='divefoyer'&&s.stage>c.keys.dive){s.diveActive=true;s.diveOxygen=120;a.travel('divehall',D.exitPos);a.save();return true;}}return prior(e,a);};
 const oldTick=D.tick;D.tick=(a,dt)=>{const v=oldTick(a,dt),s=a.state;if(s.stage>=c.keys.trap&&s.stage<=c.keys.exit&&D.inside(s.scene)){document.querySelector('#dive-key-text').textContent='제보 편지 조사';document.querySelector('#dive-signal-text').textContent=s.stage===c.keys.exit?'중앙 출구로 돌아가자.':'편지에 적힌 셋째 줄 셋째 방을 살펴보자.';}return v;};
})();
