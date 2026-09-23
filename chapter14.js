/* Chapter 14: 숨어든 어둠 - 스콜. Plot order: https://wonavy.tistory.com/212 */
(()=>{
 const x=ARPIA_EXTRA,prior=x.interact,decorate=x.decorate,items=x.questItems;
 Object.assign(x.defaults,{gemInMirror14:false,friedsMirror:false,sunSealChecked:false,mantisDust:false,wingDust14:false,sunGemVerified:false,mirrorReturned:false,morrisStitch:false,stitchMissing:false,puppetFruit:false,isaacFreed:false,odangkaFreed:false,puppetClue:false,sunGemGone:false,scollFreed:false,hungerStoleGem:false});
 Object.assign(x.npcs,{
  friedsMirror:{name:'프리드의 거울',artPath:'assets/frieds-mirror.png',height:78},suncrate14:{name:'태양의 보석 봉인함'},cursedFruit:{name:'꼭두각시 과일',artPath:'assets/cursed-fruit.png',height:52},
  humphrey:{name:'험프리 촌장',anim:'npc_115_도트_케리',portraitPath:'assets/portraits/humphrey.png'},hunger:{name:'헝거',artPath:'assets/original/character/other/헝거.png',portraitPath:'assets/original/character/other/헝거.png',height:92}
 });
 const rows=[
 [
  "교장 선생님의 긴급 호출",
  "campus",
  "mina",
  [
   [
    "mina",
    "{name}, 교장 선생님이 부르셔. 초특급 호출이래."
   ],
   [
    "you",
    "초특급? 이번에는 또 무슨 일이야?"
   ],
   [
    "mina",
    "자세한 건 교장실에서 들어 봐. 기다리고 계실 거야."
   ]
  ]
 ],
 [
  "봉인실의 침입자",
  "principal",
  "morris",
  [
   [
    "morris",
    "누군가 태양의 보석을 숨겨 놓은 지하 던전에 침입한 것 같네."
   ],
   [
    "you",
    "태양의 보석요? 분명히 보관했는데…"
   ],
   [
    "morris",
    "스콜 선생님이 수상한 자를 보았다고 하더구나. 먼저 목격담을 들어 보렴."
   ]
  ]
 ],
 [
  "스콜의 목격담",
  "classroom",
  "scoll",
  [
   [
    "scoll",
    "방 안에서 정체를 알 수 없는 짐승의 울음소리가 들렸다. 평범한 몬스터의 소리는 아니었어."
   ],
   [
    "you",
    "직접 보셨어요?"
   ],
   [
    "scoll",
    "밖으로 나가 보니 검은 그림자가 학교 뒤로 사라지더구나. 용기를 내 뒤따라갔더니 지하로 통하는 문으로 들어갔다."
   ],
   [
    "scoll",
    "어두워서 얼굴은 보이지 않았지. 손님이냐고 물었더니 갑자기 허공으로 솟구쳐 사라져 버렸어."
   ],
   [
    "you",
    "그림자가요? 보석이 무사한지 먼저 확인해야겠어요."
   ]
  ]
 ],
 [
  "프리드의 거울",
  "principal",
  "morris",
  [
   [
    "morris",
    "보일러실 지하, 코볼트가 사는 곳으로 이어지는 던전의 상자에 프리드의 거울이 있단다."
   ],
   [
    "you",
    "거울로 무엇을 확인하나요?"
   ],
   [
    "morris",
    "태양의 보석을 그 거울에 비추고 주문을 외우거라. 진짜 보석을 거울 안에 감출 수 있지."
   ],
   [
    "morris",
    "프리드의 거울 속에 진실이 담기도다. 찰라코사 발거로움."
   ],
   [
    "you",
    "주문을 외운 뒤에는요?"
   ],
   [
    "morris",
    "거울을 원래 있던 곳에 돌려놓아라. 보석을 안전하게 옮겨 두려는 것이니 다른 사람에게 함부로 말하지 말고."
   ]
  ]
 ],
 [
  "지하에 숨겨진 거울",
  "underpass",
  "friedsMirror",
  [
   [
    "you",
    "이 상자 안에 있으려나?"
   ],
   [
    "narrator",
    "뚜껑을 열자 타원형 거울이 모습을 드러냈다. 낡은 테두리와 달리 거울 면에는 티끌 하나 없었다."
   ],
   [
    "you",
    "프리드의 거울이 맞겠지. 이제 태양의 보석을 비춰 보자."
   ]
  ]
 ],
 [
  "닫힌 태양의 봉인함",
  "basement",
  "suncrate14",
  [
   [
    "you",
    "태양의 보석을 넣었던 상자는 그대로 있네. 그런데 뚜껑이 꿈쩍도 안 해."
   ],
   [
    "narrator",
    "상자 주변에 낯선 마력이 남아 있다. 힘으로 열었다가는 안의 보석까지 상할 것 같다."
   ],
   [
    "you",
    "봉인 주문을 아는 료마 선생님께 여쭤봐야겠어."
   ]
  ]
 ],
 [
  "거꾸로 된 주문",
  "classroom",
  "ryoma",
  [
   [
    "you",
    "교장 선생님께서 태양의 보석을 확인하라고 하셨는데 상자가 열리지 않아요."
   ],
   [
    "ryoma",
    "라려열좀발제."
   ],
   [
    "you",
    "네? 선생님, 다시 말씀해 주세요."
   ],
   [
    "ryoma",
    "글자를 거꾸로 읽어 봐. 사마귀 가루도 필요할 테니 칠리에게 받아 가도록 해."
   ],
   [
    "you",
    "제발 좀 열려라… 그런 뜻이었군요!"
   ]
  ]
 ],
 [
  "사마귀 가루",
  "materials",
  "chilli",
  [
   [
    "chilli",
    "음, 제법 강한 마법을 사용한 모양이구나. 자, 여기 사마귀 가루다."
   ],
   [
    "you",
    "감사합니다. 그런데 한 가지 더 여쭤봐도 될까요?"
   ],
   [
    "chilli",
    "급하다더니 이제 제대로 물어볼 생각이 드나 보구나. 무슨 일이냐?"
   ]
  ]
 ],
 [
  "요정의 날개가루",
  "materials",
  "chilli",
  [
   [
    "you",
    "상자 안에도 다른 마법이 걸려 있을 것 같아요. 열고 나서도 조심해야 하잖아요."
   ],
   [
    "chilli",
    "그렇다면 요정의 날개가루도 가져가거라. 님펜까지 다시 갈 필요는 없겠구나."
   ],
   [
    "you",
    "한 번에 여쭤보길 잘했네요. 두 가루를 섞지 않게 챙길게요."
   ]
  ]
 ],
 [
  "봉인의 역순 주문",
  "basement",
  "suncrate14",
  "퍼즐"
 ],
 [
  "거울을 제자리에",
  "underpass",
  "friedsMirror",
  [
   [
    "narrator",
    "보석이 담긴 프리드의 거울을 처음 꺼냈던 상자에 돌려놓았다."
   ],
   [
    "you",
    "이제 거울 속에서 안전하겠지. 교장 선생님께 다녀왔다고 말씀드려야겠어."
   ]
  ]
 ],
 [
  "모리스의 십자수",
  "principal",
  "morris",
  [
   [
    "morris",
    "잘하고 왔구나. 그럼 이것도 좀 봐 주겠니? 이번에 새로 수놓은 십자수란다."
   ],
   [
    "you",
    "또 완성하셨어요? 작은 글씨도 들어 있네요."
   ],
   [
    "morris",
    "마법사의 도시 글루글루에게 우정의 증표로 주려는 것이다. 네가 전해 주렴."
   ],
   [
    "morris",
    "한 가지 중요한 당부가 있네. 다른 사람에게 이 십자수를 보여 주면 안 된다. 알겠지?"
   ],
   [
    "you",
    "네. 글루글루 님께 바로 가져갈게요."
   ]
  ]
 ],
 [
  "스콜과 동행",
  "lobby",
  "scoll",
  [
   [
    "scoll",
    "모리스 교장 선생님의 새 십자수라고? 어떤 작품인지 잠깐 보여 주겠니?"
   ],
   [
    "you",
    "다른 사람에게 보여 주면 안 된다고 하셨어요."
   ],
   [
    "scoll",
    "선생님도 그렇게 취급하면 곤란하지. 아주 잠깐이면 된다."
   ],
   [
    "you",
    "그럼 잠깐만이에요. 보고 바로 돌려주세요."
   ],
   [
    "scoll",
    "오오, 작은 글씨까지 정교하군. 마법사의 도시로 가는 길이라면 나도 함께 가지."
   ]
  ]
 ],
 [
  "데런에서 갈라진 길",
  "kingdom",
  "scoll",
  [
   [
    "scoll",
    "학교에 중요한 일이 있다는 걸 깜빡했군. 나는 돌아가야겠다."
   ],
   [
    "you",
    "벌써요? 글루글루 님께 같이 가시는 줄 알았어요."
   ],
   [
    "scoll",
    "볼일이 생겼으니 어쩔 수 없지. 너는 심부름을 마치고 돌아오거라."
   ],
   [
    "you",
    "네, 선생님. 그런데 아까 보신 십자수는… 가방에 넣었겠지?"
   ]
  ]
 ],
 [
  "사라진 십자수",
  "magecity",
  "gluglu",
  [
   [
    "you",
    "어? 없어! 십자수가 없어!"
   ],
   [
    "narrator",
    "가방을 다시 뒤졌지만 모리스의 십자수는 보이지 않았다."
   ],
   [
    "gluglu",
    "무엇을 그리 찾느냐?"
   ],
   [
    "you",
    "교장 선생님께서 보내신 선물인데 오는 길에 없어졌어요. 먼저 스콜 선생님께 확인해 볼게요."
   ]
  ]
 ],
 [
  "꼭두각시가 된 아이작",
  "classroom",
  "isaac",
  [
   [
    "isaac",
    "스콜 선생님은 안 계신데. 대신 이 과일 좀 먹어 볼래? 선생님이 주고 가셨어."
   ],
   [
    "you",
    "지금은 십자수를 찾아야 해서… 아이작, 눈빛이 왜 그래?"
   ],
   [
    "narrator",
    "아이작이 대답 대신 지팡이를 들었다. 손에 쥔 과일에서 달콤한 향기가 번졌다."
   ],
   [
    "you",
    "아이작! 정신 차려. 내가 누군지 모르겠어?"
   ]
  ]
 ],
 [
  "과일을 먹은 오당카",
  "hut",
  "odangka",
  [
   [
    "narrator",
    "아이작은 싸움이 끝나자 쓰러졌고, 과일을 먹은 뒤의 일을 기억하지 못했다. 수상한 과일을 챙겨 오당카에게 가져갔다."
   ],
   [
    "you",
    "이 과일 좀 봐 주세요. 아이작이 먹고 갑자기 저를 공격했어요."
   ],
   [
    "odangka",
    "흠. 냄새가 제법인데… 도저히 참을 수 없다."
   ],
   [
    "you",
    "먹지 마세요! 방금 제가 뭐라고…!"
   ],
   [
    "narrator",
    "과일을 삼킨 오당카가 갑자기 지팡이를 겨누었다."
   ]
  ]
 ],
 [
  "비어 있는 교장실",
  "principal",
  "hina",
  [
   [
    "odangka",
    "으… 너무 맛있게 보여서 참을 수가 없었어. 남은 과일은 다른 사람이 먹지 못하게 없애야겠다."
   ],
   [
    "you",
    "아이작도 선생님도 먹자마자 이상해졌어요. 교장 선생님께 말씀드릴게요."
   ],
   [
    "narrator",
    "하지만 교장실은 비어 있었다. 문 앞에 있던 히나에게 행방을 물었다."
   ],
   [
    "hina",
    "교장 선생님 찾니? 아까 나가셨어. 조지 아저씨께 물어보면 알지 않을까?"
   ]
  ]
 ],
 [
  "조지가 본 뒷모습",
  "campus",
  "george",
  [
   [
    "george",
    "교장 선생님은 외출하셨단다. 돌아오실 때까지 기다려야 할 것 같은데."
   ],
   [
    "you",
    "큰일 났네. 십자수를 잃어버렸고, 과일 때문에 사람들이 이상해지고 있는데…"
   ],
   [
    "you",
    "그럼 글루글루 님께 전부 말씀드리고 방법을 여쭤봐야겠어."
   ]
  ]
 ],
 [
  "꼭두각시 마법",
  "magecity",
  "gluglu",
  [
   [
    "you",
    "모리스 교장 선생님의 십자수를 잃어버렸어요. 스콜 선생님께 잠깐 보여 드린 다음부터 없어졌고요."
   ],
   [
    "gluglu",
    "그 십자수는 단순한 선물이 아니었다. 태양의 보석을 숨긴 장소와 봉인을 푸는 주문을 수놓기로 했지."
   ],
   [
    "you",
    "보석의 위치가요? 스콜 선생님이 그 글자를 보셨는데…"
   ],
   [
    "gluglu",
    "과일로 사람을 홀리는 일까지 벌어졌다면 우연이 아닐 것이다. 보석을 둔 곳으로 서둘러 가 보거라."
   ]
  ]
 ],
 [
  "먼저 도착한 스콜",
  "basement",
  "suncrate14",
  [
   [
    "scoll",
    "후후… 한발 늦었구나, {name}. 태양의 보석? 내 손에 들고 있는 이것 말이냐?"
   ],
   [
    "you",
    "어떻게 봉인을 푸셨어요?"
   ],
   [
    "scoll",
    "교장 선생님의 십자수에 위치와 주문이 모두 적혀 있었지. 그렇게 강한 보석을 왜 감춰 두려고만 하는지 이해할 수 없어."
   ],
   [
    "you",
    "그래서 십자수를 보여 달라고 하셨군요. 돌려주세요!"
   ],
   [
    "scoll",
    "내가 가장 좋아하는 곳으로 가려면 널 제치고 가는 수밖에 없겠군. 아이스 체인!"
   ],
   [
    "narrator",
    "차가운 사슬이 몸을 휘감았다. 스콜이 사라지고, 얼음 사이로 눈앞이 흐려졌다."
   ]
  ]
 ],
 [
  "나오미의 도움",
  "classroom",
  "naomi",
  [
   [
    "naomi",
    "정신이 들어? 스콜이 어디로 갔는지 들었어?"
   ],
   [
    "you",
    "가장 좋아하는 곳으로 간다고 했어요. 그 말을 하고 저를 공격했어요."
   ],
   [
    "naomi",
    "일단 스콜의 말을 따라 추적해 보자. 고향인 얼음 마을부터 가 보겠어. 나도 함께 갈게."
   ]
  ]
 ],
 [
  "험프리의 오래된 기억",
  "icevillage",
  "humphrey",
  [
   [
    "naomi",
    "험프리 촌장님, 혹시 스콜이 얼음 마을에 찾아오지는 않았나요?"
   ],
   [
    "humphrey",
    "못 봤네. 그 녀석은 눈썰매장을 만들겠다며 산사태를 내더니, 불을 가져와 얼음을 녹이기도 했지. 잊을 수가 있나."
   ],
   [
    "you",
    "그런 일이 있었어요? 그럼 오늘은 아직 안 온 거군요."
   ]
  ]
 ],
 [
  "카디쟈에게 갔을까",
  "icevillage",
  "naomi",
  [
   [
    "naomi",
    "스콜이 말한 가장 좋아하는 곳… 고향이 아니었다면 사람을 만나러 갔을지도 몰라."
   ],
   [
    "you",
    "카디쟈요! 스콜 선생님이 늘 선물도 보내고 편지도 보내시잖아요."
   ],
   [
    "naomi",
    "그렇지. 아수리아로 가 보자. 혹시 연락을 받았을지도 몰라."
   ]
  ]
 ],
 [
  "스콜이 남긴 편지",
  "cardiahome",
  "cardia",
  [
   [
    "cardia",
    "스콜 선생님에게서 편지가 왔어요. 이번에는 꼭 마음을 얻겠다며 태양의 보석을 가져오겠다고 하더군요."
   ],
   [
    "you",
    "편지를 볼 수 있을까요? 지금 그 보석을 가지고 사라지셨어요."
   ],
   [
    "narrator",
    "편지에는 큼직한 태양의 보석을 선물로 준비했으니 웃는 얼굴로 맞아 달라는 내용이 적혀 있었다."
   ],
   [
    "naomi",
    "왕국 밖에서 기다리자. 스콜이 이쪽으로 오고 있어."
   ]
  ]
 ],
 [
  "어둠에 물든 스콜",
  "asuria",
  "scoll",
  [
   [
    "scoll",
    "아직 카디쟈에게 선물을 드리지 않았는데. 이 보석을 보면 내 마음도 알아주겠지."
   ],
   [
    "you",
    "그 선물은 선생님의 것이 아니에요. 다른 사람을 다치게 하면서 주는 선물도 기쁘지 않을 거예요."
   ],
   [
    "naomi",
    "스콜, 더는 못 보내겠어. 보석을 내려놓고 정신 차려."
   ],
   [
    "scoll",
    "또 내 앞을 막겠다는 건가? 그렇다면 비키게 해 주지!"
   ]
  ]
 ],
 [
  "헝거의 기습",
  "asuria",
  "hunger",
  [
   [
    "scoll",
    "으아아… 한 대 더 맞았으면 큰일 날 뻔했군. 여기는 어디지? 머릿속이 흐릿해…"
   ],
   [
    "you",
    "누군가에게 과일을 받거나 드신 적 있어요?"
   ],
   [
    "scoll",
    "과일을 받은 기억이 있어. 그런데 그 뒤로는 아무것도 생각나지 않아."
   ],
   [
    "narrator",
    "그때 기다렸다는 듯 헝거가 나타나 보석을 낚아챘다."
   ],
   [
    "you",
    "헝거!"
   ],
   [
    "hunger",
    "아르피아 학교에 숨겨 둔 태양의 보석을 찾지 못했는데, 마침 좋은 길잡이가 있었군."
   ],
   [
    "naomi",
    "멈춰! 보석을 가지고 어디로 가려는 거야?"
   ],
   [
    "narrator",
    "헝거는 대답 대신 몸을 돌렸다. 스콜이 정신을 추스르기도 전에 태양의 보석을 가지고 달아났다."
   ]
  ]
 ]
];
 window.ARPIA_EPISODE14={rows};
 const start=241,end=start+rows.length;
 x.quests.splice(199,1,...rows.map(([title,scene,id])=>['제14화 · '+title,(x.npcs[id]?.name||title)+' 만나기',scene,id]),['제14화 완료 · 숨어든 어둠','헝거가 태양의 보석을 빼앗아 북쪽으로 달아났습니다.','campus','none']);
 x.chapters.push([start,end,'제14화 숨어든 어둠 · 스콜']);
 x.encounters.isaac14={name:'꼭두각시 아이작',bg:'assets/maps-hires/school-interior.png',intro:'검은 실이 아이작의 움직임을 억지로 끌어당깁니다.',next:257,setFlag:'isaacFreed',xp:170,gold:80,sp:40,enemies:[{name:'꼭두각시 아이작',element:2,hp:500,maxHp:500,atk:21,atb:9,sprite:'isaac14'}]};
 x.encounters.odangka14={name:'꼭두각시 오당카',bg:'assets/maps-hires/witch-hut.png',intro:'과일의 마법에 물든 오당카가 지팡이를 휘두릅니다.',next:258,setFlag:'odangkaFreed',xp:185,gold:90,sp:45,enemies:[{name:'꼭두각시 오당카',element:2,hp:590,maxHp:590,atk:23,atb:12,sprite:'odangka'}]};
 x.encounters.scoll14={name:'어둠에 물든 스콜',bg:'assets/maps-hires/asuria.png',intro:'나오미와 함께 스콜의 꼭두각시 마법을 끊어야 합니다.',next:267,setFlag:'scollFreed',xp:235,gold:140,sp:65,enemies:[{name:'꼭두각시 스콜',element:1,hp:780,maxHp:780,atk:26,atb:16,sprite:'darkScoll'}]};
 x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);if(s.stage<start)return;
  const add=(id,xp,yp,fixture=false)=>{if(!sc.entities.some(e=>e.id===id))sc.entities.push({...n(id,xp,yp),...(fixture?{type:'fixture'}:{})});};
  if(sc.id==='classroom'&&[243,253,256].includes(s.stage))add(s.stage===256?'isaac':'scoll',s.stage===256?530:790,225);
  if(sc.id==='classroom'&&s.stage===247)add('ryoma',646,198);if(sc.id==='classroom'&&s.stage===262)add('naomi',530,185);
  if(sc.id==='underpass'&&[245,251].includes(s.stage))add('friedsMirror',905,375,true);
  if(sc.id==='basement'&&[246,250,261].includes(s.stage)){add('suncrate14',445,285,true);if(s.stage===261)add('scoll',305,305);}
  if(sc.id==='materials'&&[248,249].includes(s.stage))add('chilli',430,290);if(sc.id==='nymphen'&&s.stage===249)add('leona',596,206);
  if(sc.id==='lobby'&&s.stage===253)add('scoll',530,320);if(sc.id==='kingdom'&&s.stage===254)add('scoll',546,590);
  if(sc.id==='magecity'&&[255,260].includes(s.stage))add('gluglu',450,324);if(sc.id==='principal'&&s.stage===258)add('hina',520,260);
  if(sc.id==='icevillage'&&s.stage===263)add('humphrey',397,466);if(sc.id==='icevillage'&&s.stage===264)add('naomi',520,390);
  if(sc.id==='asuria'&&s.stage===266)add('scoll',408,342);if(sc.id==='asuria'&&s.stage===267)add('hunger',408,342);
  if(sc.id==='classroom'&&s.stage===256)add('cursedFruit',646,198,true);
 };
 x.questItems=s=>[...items(s),...(s.friedsMirror?[['프리드의 거울','진짜 물건을 비추면 거울 속에 가두는 오래된 마법 도구']]:[]),...(s.mantisDust?[['사마귀 가루','거꾸로 적힌 봉인 주문을 되돌리는 재료']]:[]),...(s.wingDust14?[['요정의 날개가루','태양의 보석 봉인함을 안전하게 여는 가루']]:[]),...(s.morrisStitch?[['모리스의 십자수','글루글루에게 전할 비밀이 수놓인 우정의 선물']]:[])];
 x.interact=(e,a)=>{const s=a.state,i=s.stage-start,r=rows[i];if(!r||r[1]!==s.scene||r[2]!==e.id)return prior(e,a);
  if([256,257,266].includes(s.stage)){a.talk(r[3],()=>a.battle(s.stage===256?'isaac14':s.stage===257?'odangka14':'scoll14'));return true;}
  if(r[3]==='퍼즐'){a.choicePuzzle(['거꾸로 적힌 봉인 주문','사마귀 가루를 뿌리자 글자가 돌아가기 시작했다. 올바른 주문은?', ['제발 좀 열려라','열려라 태양의 문','라려열 좀 발제'],0,'‘라려열좀발제’를 뒤에서부터 읽어 보자.'],()=>{a.talk([['narrator','사마귀 가루로 바깥의 봉인을 풀고, 요정의 날개가루로 안쪽 상자를 열었다.'],['you','이 아름다운 빛 좀 봐. 어두컴컴했던 방 안에 태양빛이 들어온 것처럼 환하네.'],['you','프리드의 거울 속에 진실이 담기도다. 찰라코사 발거로움.'],['narrator','빛이 거울 안으로 스며들었다. 손에 있던 보석은 사라지고, 거울 면에 작은 태양빛이 맺혔다.'],['you','교장 선생님 말씀대로 됐어. 이제 거울을 제자리에 돌려놓자.']],()=>{s.sunGemVerified=true;s.gemInMirror14=true;s.mantisDust=false;s.wingDust14=false;a.advance(s.stage+1,15);a.refresh();a.save();});});return true;}
  const lines=Array.isArray(r[3])?r[3]:[[e.id,r[3]]];
  a.talk(lines,()=>{const q=s.stage,flags={245:'friedsMirror',246:'sunSealChecked',248:'mantisDust',249:'wingDust14',251:'mirrorReturned',252:'morrisStitch',255:'stitchMissing',260:'puppetClue',261:'sunGemGone',267:'hungerStoleGem'};if(flags[q])s[flags[q]]=true;if(q===251)s.friedsMirror=false;if(q===261)s.gemInMirror14=false;if(q===255)s.morrisStitch=false;if(q===256)s.puppetFruit=true;
   a.advance(q+1,q===267?55:10);a.refresh();a.save();if(q===267)a.finish('제14화 완료 · 숨어든 어둠','꼭두각시 마법에 빠진 스콜을 구했지만 헝거가 태양의 보석을 빼앗아 북쪽으로 달아났습니다.');
  });return true;
 };
})();
