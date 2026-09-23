/* Original event order: https://wonavy.tistory.com/227 (episode 31).
   Kalama uses new project-local exploration art; dialogue and combat are reconstructed. */
(()=>{
 const x=ARPIA_EXTRA,m=ARPIA_MIDTERM,icon='assets/items/';
 const item=(id,name,desc,path)=>ARPIA_DATA.ITEMS['mt_'+id]={name,desc,kind:'quest',price:0,sell:0,icon:path};
 item('silkFruit31','누에 열매','할아버지가 부탁한 큐리어스의 주문품',icon+'lala.png');
 item('navinium31','네비니움 광석','바바라의 장거리 텔레포트에 필요한 광석',icon+'manastone_plus.png');
 item('fatherCrystal31','되찾은 수정구슬','늑대의 도시에서 회수한 미래 수정구슬',icon+'manastone_plus.png');
 Object.assign(x.npcs,{
  bundleMerchant31:{name:'데런의 보따리 상인'},jjullu31:{name:'쭐루쭐루'},halahala31:{name:'할라할라 촌장'},desertArrival31:{name:'낯선 사막의 모래바람'},
  wolfCrystal31:{name:'늑대의 도시 수정구슬',artPath:icon+'manastone_plus.png',height:40},fatherShadow31:{name:'수정구슬 속 희미한 형체',artPath:icon+'manastone.png',height:42}
 });
 const rows=[
  {key:'friends',title:'파파데이를 준비하는 친구들',scene:'lobby',npc:'matilda',pos:[470,335],lines:[['matilda','오늘은 파파데이야. 아버지께 감사 선물을 드리는 날이지.'],['hina','다들 무슨 선물을 준비했어? 넌 왜 아무 말이 없어?'],['you','나는 아버지 얼굴도 모르거든. 그냥 교실에 갈게.']]},
  {key:'julia',title:'비어 있는 부모님 이름칸',scene:'classroom',npc:'julia',pos:[530,185],lines:[['julia','생활 기록표에 아버지와 어머니 이름이 비어 있구나. 이유를 물어봐도 될까?'],['you','부모님 없이 할아버지 손에서 자랐어요. 이름도 얼굴도 몰라요.'],['julia','그랬구나. 말해 줘서 고맙다. 서두르지 않아도 괜찮아.']]},
  {key:'grandpa',title:'지금은 말할 수 없는 아버지',scene:'village',npc:'family',pos:[480,250],lines:[['you','할아버지, 제 아버지는 어떤 분이에요?'],['family','살아 계신다. 하지만 지금은 더 말해 줄 수 없구나. 때가 되면 알게 될 게다.'],['family','대신 데런 왕국의 보따리 상인에게 물건을 받아 큐리어스에게 전해 주렴.']]},
  {key:'merchant',title:'가족임을 증명하라',scene:'kingdom',npc:'bundleMerchant31',pos:[546,590],fixture:true,lines:[['bundleMerchant31','맡긴 분의 가족이라는 증거가 없으면 물건을 드릴 수 없습니다.'],['you','할아버지께 다시 확인해 봐야겠어.']]},
  {key:'proof',title:'가족의 약속 주문',scene:'village',npc:'family',pos:[480,250],lines:[['family','상인에게 “달빛 아래 세 번 맺은 약속”이라고 말하거라. 우리 가족만 아는 확인 주문이다.'],['narrator','아이가 떠난 뒤, 할아버지는 아버지의 정체를 알면 큰 충격을 받을 거라며 길게 한숨을 쉬었다.']]},
  {key:'fruit',title:'보따리 속 누에 열매',scene:'kingdom',npc:'bundleMerchant31',pos:[546,590],fixture:true,lines:[['you','달빛 아래 세 번 맺은 약속.'],['bundleMerchant31','확인했습니다. 큐리어스 마녀에게 보낼 누에 열매입니다.']],effect:s=>m.give(s,'silkFruit31')},
  {key:'curious',title:'수정구슬이라면 알 수도 있어',scene:'curiousmansion',npc:'curious',pos:[260,132],lines:[['curious','누에 열매는 잘 받았어. 그런데 얼굴에 고민이 가득하군.'],['you','사생활이에요.'],['curious','흥, 수정구슬이라면 네가 궁금한 사람의 모습을 보여 줄지도 모르지.']],effect:s=>m.take(s,'silkFruit31')},
  {key:'barbara',title:'사라진 수정구슬',scene:'barbarahouse',npc:'barbara',pos:[579,299],lines:[['barbara','사람을 텔레포트하다가 수정구슬까지 같이 빨려 들어가 버렸단다. 아론 선생님이 뒤를 쫓았지.'],['you','저도 그곳으로 보내 주세요.'],['barbara','네비니움 광석이 모자라. 난쟁이 광산의 코비에게 받아 오렴.']]},
  {key:'kobi',title:'텔레포트용 네비니움',scene:'minedepths',npc:'kobi',pos:[430,320],lines:[['kobi','바바라 할머니의 부탁이라면 이 네비니움 광석을 가져가시오. 좌표가 멀수록 많이 필요하오.']],effect:s=>m.give(s,'navinium31')},
  {key:'teleport',title:'금단의 동문 너머로',scene:'barbarahouse',npc:'teleportCompass',pos:[376,281],fixture:true,lines:[['barbara','네비니움을 끼우면 수정구슬과 아론 선생님이 사라진 좌표를 따라갈 수 있어.'],['barbara','돌아오는 좌표도 열어 둘 테니 모래바람을 조심하렴.']],effect:s=>{m.take(s,'navinium31');s.kalamaLocated31=true;}},
  {key:'arrival',title:'끝없이 펼쳐진 칼라마 사막',scene:'kalama31',npc:'desertArrival31',pos:[815,785],fixture:true,lines:[['narrator','텔레포트 빛이 사라지자 사방이 모래와 바위뿐인 낯선 땅이었다. 북서쪽에 푸른 오아시스가 보였다.'],['you','우선 사람이 있는 곳으로 가 보자.']]},
  {key:'jjullu',title:'오아시스의 쭐루쭐루',scene:'kalama31',npc:'jjullu31',pos:[560,430],lines:[['jjullu31','나는 쭐루쭐루다. 낯선 마법사 한 명이 남쪽 모래길로 내려가는 걸 봤다.'],['you','아론 선생님일 거야. 바로 찾아볼게요.']]},
  {key:'aaron',title:'사막 남쪽의 아론 선생님',scene:'kalama31',npc:'aaron29',pos:[1030,690],fixture:true,lines:[['aaron29','여기까지 따라왔구나. 이곳은 금단의 동문 너머 칼라마 사막이다.'],['aaron29','수정구슬을 찾으려면 오아시스 주민들의 도움을 받아야 해. 할라할라 촌장께 가자.']]},
  {key:'chief',title:'늑대의 도시로 간 수정구슬',scene:'kalama31',npc:'halahala31',pos:[760,305],lines:[['halahala31','수정구슬은 북쪽 늑대의 도시로 가져갔습니다. 그 도시는 헝거가 지배하고 있지요.'],['you','헝거라면 몰래 들어가서 구슬부터 찾아야 해요.']]},
  {key:'infiltrate',title:'늑대의 도시 잠입',scene:'wolfcity31',npc:'wolfCrystal31',pos:[805,130],fixture:true,lines:[['narrator','무너진 성벽과 뒷길을 돌아 헝거의 요새 앞 수정 제단에 닿았다.'],['aaron29','저 구슬이 맞다. 경비가 오기 전에 회수하자.']],effect:s=>m.give(s,'fatherCrystal31')},
  {key:'hunger',title:'도시의 지배자 헝거',scene:'wolfcity31',npc:'hunger',pos:[970,230],lines:[['hunger','어떻게 이곳까지 찾아왔지? 늑대의 도시를 본 이상 살아서 돌려보낼 수 없다!'],['aaron29','혼자가 아니다. 함께 길을 열자!'],['you','수정구슬도, 오아시스 사람들의 자유도 네 것이 아니야!']],battle:'hungerWolf31'},
  {key:'vision',title:'수정구슬 속 아버지',scene:'kalama31',npc:'fatherShadow31',pos:[760,305],fixture:true,lines:[['aaron29','원한다면 여기서 아버지의 모습을 확인해 보렴. 마음을 집중해.'],['you','수정구슬이여, 제 아버지의 모습을 보여 줘.'],['narrator','희미한 사람의 형체가 떠올랐지만 구슬 표면이 갈라질 듯 떨려 더는 볼 수 없었다.'],['you','살아 계신다는 것만은 알았어. 언젠가 반드시 직접 만날 거야.']]},
  {key:'plea',title:'칼라마를 구해 달라는 부탁',scene:'kalama31',npc:'halahala31',pos:[760,305],lines:[['halahala31','헝거는 금단의 동문 열쇠를 가지고 드나듭니다. 우리도 문 너머로 나갈 수 있게 꼭 구해 주세요.'],['halahala31','오늘은 바바라의 귀환 좌표가 닫히기 전에 돌아가십시오.']]},
  {key:'return',title:'아버지는 살아 계신다',scene:'classroom',npc:'aaron29',pos:[530,185],fixture:true,lines:[['you','수정구슬을 돌려드릴게요. 아버지 얼굴은 보지 못했지만 형체는 분명히 보였어요.'],['aaron29','구슬에 비칠 수 있다면 분명 살아 계신다. 너무 걱정하지 말거라.'],['you','언젠가는 만날 수 있다고 생각하니 마음이 조금 가벼워졌어요.']],effect:s=>{m.take(s,'fatherCrystal31');s.kalamaFirstVisit31=true;},reward:130,ending:'금단의 동문 너머 칼라마와 늑대의 도시를 발견하고, 수정구슬에서 살아 있는 아버지의 흔적을 확인했습니다.'}
 ];
 const captured31={
 "grandpa": [
  [
   "you",
   "할아버지, 제 아버지는 어떤 분이에요? 파파데이인데 저는 얼굴도 모르잖아요."
  ],
  [
   "family",
   "살아 계신다. 하지만 지금은 더 말해 줄 수 없구나. 때가 되면 알게 될 게다."
  ],
  [
   "you",
   "다들 아버지께 드릴 선물을 고르는데, 저는 뭘 해야 할지도 모르겠어요."
  ],
  [
   "family",
   "데런 왕국에 가면 잘 아는 상인 반다람이가 있다. 그 사람한테 맡겨 놓은 우리 마을 특산품이 있어. 그걸 큐리어스 마녀에게 가져다주렴."
  ],
  [
   "narrator",
   "할아버지는 더 묻지 못하게 먼저 일어섰다. 주인공은 남은 질문을 삼켰다."
  ]
 ],
 "merchant": [
  [
   "bundleMerchant31",
   "맡긴 물건을 달라고? 정말 그분의 가족인지 어떻게 알지?"
  ],
  [
   "you",
   "저를 보내셨다니까요."
  ],
  [
   "bundleMerchant31",
   "확인할 말도 전해 들었을 텐데. 그걸 모르면 물건을 줄 수 없어."
  ],
  [
   "you",
   "할아버지께 다시 다녀와야겠네."
  ]
 ],
 "curious": [
  [
   "curious",
   "누에 열매는 잘 받았어. 그런데 얼굴에 고민이 가득하군."
  ],
  [
   "you",
   "제 아버지를 보고 싶어요. 할아버지는 살아 계신다고만 하세요."
  ],
  [
   "curious",
   "수정구슬은 자신이 원하는 것을 보여 주지. 정말 답답하면 수정구슬에 물어보면 이름을 알 수 있을지도 몰라."
  ],
  [
   "you",
   "전에 미래를 봤던 그 구슬이요? 바바라 할머니께 가 볼게요."
  ]
 ],
 "barbara": [
  [
   "barbara",
   "손님을 텔레포트시키다가 그 와중에 수정구슬이 같이 들어가서 엉뚱한 곳으로 날아가 버렸지 뭐니."
  ],
  [
   "you",
   "수정구슬에 꼭 물어보고 싶은 게 있는데요."
  ],
  [
   "barbara",
   "아론 선생님이 찾으러 가셨어. 널 보내려면 네비니움 광석이 더 필요하구나. 난쟁이 광산의 코비에게 받아 오렴."
  ]
 ],
 "kobi": [
  [
   "kobi",
   "마침 좀 전 거야. 가져가라고. 흐흐. 간다."
  ],
  [
   "you",
   "바바라 할머니의 텔레포트에 쓸 거예요. 고맙습니다."
  ],
  [
   "narrator",
   "손바닥에 올린 네비니움 안에서 작은 빛들이 움직였다."
  ]
 ],
 "teleport": [
  [
   "barbara",
   "서둘러라. 곧 사라진단다. 수정구슬을 향해 길이 열린 것은 잠깐이야."
  ],
  [
   "you",
   "아론 선생님을 만나서 함께 찾아올게요."
  ],
  [
   "narrator",
   "네비니움을 끼우자 마법진이 낯선 모래빛으로 바뀌었다."
  ]
 ],
 "arrival": [
  [
   "you",
   "이곳이 어디지? 처음 보는 데야. 뜨거운 바람이 불어."
  ],
  [
   "narrator",
   "사막 위로 모래바람이 길게 흘렀다. 멀리 물과 나무가 아른거렸다."
  ],
  [
   "you",
   "오아시스인가? 일단 물이 보이는 곳으로 가 보자."
  ]
 ],
 "jjullu": [
  [
   "jjullu31",
   "쭐루쭐루. 사막의 끝으로 불리는 마을이란 곳이에요."
  ],
  [
   "you",
   "혹시 저처럼 생긴 마법사를 보셨나요? 아론 선생님이라고 해요."
  ],
  [
   "jjullu31",
   "남쪽 모래길에서 보았어요. 바람이 세니 길을 잃지 않도록 조심해요."
  ]
 ],
 "chief": [
  [
   "halahala31",
   "오아시스 칼라마의 오른쪽으로 가면 낡은, 폐허가 된 도시가 있네. 그 도시 위쪽의 지역에서 찾아보려무나."
  ],
  [
   "you",
   "그 도시는 이름이 없나요?"
  ],
  [
   "halahala31",
   "늑대의 도시라고 불린다네. 헝거가 그곳을 차지하고 있지."
  ],
  [
   "aaron29",
   "주변을 잘 살피며 가자. 구슬을 찾으면 오래 머무르지 말아야 한다."
  ]
 ],
 "hunger": [
  [
   "hunger",
   "오랜만의 대결이구나. 간다앗!"
  ],
  [
   "you",
   "수정구슬은 원래 주인에게 돌려줄 거야. 길을 비켜!"
  ],
  [
   "aaron29",
   "혼자가 아니다. 함께 길을 열자!"
  ]
 ]
};
 for(const row of rows)if(captured31[row.key])row.lines=captured31[row.key];
 const c=m.register(31,'파파데이 1부 · 오아시스 사람들',rows,{kalamaLocated31:false,kalamaFirstVisit31:false});
 x.map.push(['kalama31','칼라마 오아시스',[830,850]],['wolfcity31','늑대의 도시',[820,840]]);
 x.scenes.kalama31=(s,n,p)=>({id:'kalama31',name:'칼라마 사막 · 오아시스',bg:'assets/chapter31/kalama-oasis.png',w:1672,h:941,zoom:.72,tint:'#e9b24a12',nodes:[[830,850],[690,760],[520,680],[420,560],[560,430],[760,305],[950,360],[1120,490],[1030,690],[900,790],[1320,310],[1450,180]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,0],[6,10],[10,11],[5,10]],entities:[...(s.stage>=c.keys.arrival?[n('jjullu31',560,430),n('halahala31',760,305)]:[]),...(s.stage>=c.keys.chief?[p('wolfroad31','북쪽 · 늑대의 도시',1450,180,'wolfcity31',[820,840])]:[])]});
 x.scenes.wolfcity31=(s,n,p)=>({id:'wolfcity31',name:'칼라마 북쪽 · 늑대의 도시',bg:'assets/chapter31/wolf-city.png',w:1672,h:941,zoom:.72,tint:'#421c1d20',nodes:[[820,840],[720,740],[580,650],[430,560],[520,430],[690,350],[805,260],[805,130],[970,230],[1120,340],[1260,470],[1120,620],[980,730]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[6,8],[8,9],[9,10],[10,11],[11,12],[12,0],[5,9]],entities:[p('back','칼라마 오아시스',820,840,'kalama31',[1450,180]) ]});
 const items=x.questItems;x.questItems=s=>[...items(s),...(s.inv.mt_silkFruit31?[['누에 열매','큐리어스에게 전할 주문품']]:[]),...(s.inv.mt_navinium31?[['네비니움 광석','장거리 텔레포트 동력']]:[]),...(s.inv.mt_fatherCrystal31?[['되찾은 수정구슬','아버지의 모습을 확인할 수 있는 구슬']]:[])];
 x.encounters.hungerWolf31={name:'늑대의 도시 · 헝거',bg:'assets/chapter31/wolf-city.png',intro:'아론 선생님과 함께 늑대의 도시를 빠져나갈 길을 여세요.',next:c.keys.vision,xp:520,gold:185,sp:78,enemies:[{name:'헝거',element:1,hp:1680,maxHp:1680,atk:32,atb:14,artPath:'assets/original/character/other/헝거.png',height:180},{name:'도시의 늑대',element:2,hp:640,maxHp:640,atk:25,atb:2,artPath:'assets/white-wolf.png',height:130}]};
 for(const [mood,lines]of Object.entries({sad:['나는 아버지 얼굴도 모르거든. 그냥 교실에 갈게.'],surprised:['사생활이에요.'],determined:['수정구슬도, 오아시스 사람들의 자유도 네 것이 아니야!','살아 계신다는 것만은 알았어. 언젠가 반드시 직접 만날 거야.'],happy:['언젠가는 만날 수 있다고 생각하니 마음이 조금 가벼워졌어요.']}))for(const text of lines)ARPIA_HERO_ART.annotations.set(text,mood);
})();
