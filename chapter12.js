/* Chapter 12 plot: https://wonavy.tistory.com/210. Dialogue and balance reconstructed. */
(()=>{
 const x=ARPIA_EXTRA,prior=x.interact,decorate=x.decorate,items=x.questItems;
 Object.assign(x.defaults,{kesnoCare12:false,fruitForFamily12:false,familyLetter:false,firstAid:false,royalReferral:false,royalMedicine:false,exchangeGold:false,exchangePin:0,fairyMedicine:false,pomegranate:false,snakeBlood:false,antonioSample:false,antidote:false,ownPenguin:false,activePenguin:false,penguinLevel:1,penguinXp:0,penguinHp:42,penguinMaxHp:42,penguinMp:12,penguinMaxMp:12,penguinAffection:45,penguinAgility:24});
 Object.assign(x.npcs,{ishubike:{name:'이슈비케',portrait:'teacher/이슈비케.png'},pomegranate:{name:'석류 바구니'},snake12:{name:'롱롱뱀',height:90},waitmonsters:{name:'저택 앞 몬스터'},fruit12:{name:'폭포의 과일'} });
 // Each row is one playable objective. Do not use main-stage state for free missions.
 const rows=[
 [
  "고향에서 온 급보",
  "campus",
  "mina",
  [
   [
    "mina",
    "{name}, 고향마을에서 특급편지가 왔대."
   ],
   [
    "you",
    "고향에서? 무슨 일이 생겼나?"
   ],
   [
    "mina",
    "우체국에 맡겨 놓았대. 빨리 가 봐!"
   ],
   [
    "you",
    "알려 줘서 고마워, 미나."
   ]
  ]
 ],
 [
  "우체국의 속달 편지",
  "shop",
  "conrad",
  [
   [
    "conrad",
    "네 앞으로 온 급한 편지야. 촌장님이 보내셨구나."
   ],
   [
    "narrator",
    "편지에는 할아버지가 몹시 아파 거동하지 못하며, 행동도 심하게 달라졌으니 즉시 고향으로 돌아오라는 내용이 적혀 있었다."
   ],
   [
    "you",
    "거동도 못 하신다고요? 멀리 나무하러 다니실 만큼 건강하셨는데…"
   ],
   [
    "conrad",
    "직접 가서 확인해 보렴. 길에서는 조심하고."
   ]
  ]
 ],
 [
  "멈추지 않는 털",
  "village",
  "family",
  [
   [
    "you",
    "저 왔어요. 어디가 많이 아프세요?"
   ],
   [
    "family",
    "으으… 몸이 답답하다. 이 털 좀 어떻게 해 다오."
   ],
   [
    "narrator",
    "잘라 낸 털이 다시 자라나 몸을 뒤덮고 있었다. 평소와 다른 모습에 선뜻 다가가기 어려웠다."
   ],
   [
    "you",
    "촌장님께 언제부터 이러셨는지 여쭤볼게요. 조금만 기다려 주세요."
   ]
  ]
 ],
 [
  "촌장님의 걱정",
  "village",
  "elder",
  [
   [
    "elder",
    "마을 밖 숲속 호수에서 나무를 하다가 쓰러지셨단다. 그 뒤로 몸에 털이 자라고 정신도 흐려지셨어."
   ],
   [
    "you",
    "거긴 자주 나무를 하러 가시던 곳이잖아요. 무슨 일이 있었을까요?"
   ],
   [
    "elder",
    "가위로 자르는 데도 한계가 있단다. 학교의 도움을 받아야겠어."
   ],
   [
    "you",
    "선생님을 모셔 올게요. 그동안 곁에 있어 주세요."
   ]
  ]
 ],
 [
  "선생님께 도움을",
  "classroom",
  "julia",
  [
   [
    "julia",
    "고향에서 급한 일이 생겼구나. 무엇보다 환자의 상태를 정확히 전해야 해."
   ],
   [
    "you",
    "털이 계속 자라고, 무슨 일이 있었는지 잘 기억하지 못하세요."
   ],
   [
    "julia",
    "이슈비케 선생님께 지금 들은 내용을 말씀드리렴. 약초와 이상 증상에 관해서 잘 아실 거야."
   ]
  ]
 ],
 [
  "응급 약초",
  "classroom",
  "ishubike",
  [
   [
    "ishubike",
    "우선 구급약초를 써 보고 반응을 확인하죠. 겉으로 보이는 털만 잘라서는 원인을 없앨 수 없어요."
   ],
   [
    "you",
    "왜 그런 일이 생겼는지도 알아낼 수 있을까요?"
   ],
   [
    "ishubike",
    "환자가 정신을 차리면 쓰러지기 전 일을 물어보세요. 나도 상태를 살펴보러 갈게요."
   ],
   [
    "narrator",
    "구급약초를 한 개 받았다."
   ]
  ]
 ],
 [
  "함께 가는 친구",
  "campus",
  "kesno",
  [
   [
    "kesno",
    "요즘 많이 바쁜가 봐?"
   ],
   [
    "you",
    "고향에 계신 할아버지가 아프셔. 약을 구하러 왔어."
   ],
   [
    "kesno",
    "그런 일이면 나도 같이 갈게. 네가 혼자 이리저리 뛰어다니면 돌봐 드릴 사람이 없잖아."
   ],
   [
    "you",
    "고마워. 마틸다도 왕국의 약을 알아봐 주겠다고 했어."
   ]
  ]
 ],
 [
  "공주의 소개장",
  "classroom",
  "matilda",
  [
   [
    "matilda",
    "우리 앞으로 친해져 보도록 해요. 아버지께 편지도 써 줄게요."
   ],
   [
    "you",
    "고마워. 학교 약초로 안 되면 왕국에도 도움을 청해 볼게."
   ],
   [
    "narrator",
    "마틸다는 왕실의 약을 부탁하는 소개장을 건넸다. 학교는 재미있지만 제 손으로 해야 할 일이 많아 짜증 난다는 투정도 곁들여 있었다."
   ],
   [
    "you",
    "이런 말까지 적었네… 그래도 도움을 청해 준 마음은 고마워."
   ]
  ]
 ],
 [
  "케스노의 간병",
  "village",
  "kesno",
  [
   [
    "kesno",
    "구급약초는 먹여 드렸어. 하지만 털이 계속 자라는 건 여전해."
   ],
   [
    "you",
    "그럼 마틸다의 소개장을 가지고 데런 왕국에 다녀올게."
   ],
   [
    "kesno",
    "난 여기서 할아버지를 돌보고 있을게. 걱정 말고 다녀와."
   ],
   [
    "you",
    "혼자 남겨 두고 가는 게 걱정이었는데 다행이다. 부탁할게."
   ]
  ]
 ],
 [
  "왕국의 도움",
  "kingdom",
  "caesar",
  [
   [
    "caesar",
    "마틸다가? 허어, 그 녀석 요즘 아비한테 편지 쓰는 건 좋아하니… 어디 줘 보게."
   ],
   [
    "narrator",
    "국왕은 편지를 펼치고 딸의 투정에 잠시 한숨을 쉬었다."
   ],
   [
    "caesar",
    "왕실의 약을 주마. 도움이 되면 좋겠군. 에드워드도 함께 가게 하겠네."
   ],
   [
    "you",
    "약과 호위까지 마련해 주셔서 감사합니다. 서둘러 돌아가겠습니다."
   ]
  ]
 ],
 [
  "에드워드의 동행",
  "kingdom",
  "edward",
  [
   [
    "edward",
    "왕실의 약을 챙겼습니다. 제가 함께 가겠습니다."
   ],
   [
    "you",
    "케스노가 고향에서 기다리고 있어요."
   ],
   [
    "edward",
    "환자가 기다리니 지체하지 맙시다. 필요한 도움이 있다면 말씀하십시오."
   ]
  ]
 ],
 [
  "왕실 약도 듣지 않는다",
  "village",
  "kesno",
  [
   [
    "kesno",
    "데런 왕국의 약도 먹여 드렸어. 그런데 상태가 나아지지는 않았어."
   ],
   [
    "family",
    "으으… 이 맛은 또 뭐냐. 도무지 편해지지를 않는구나."
   ],
   [
    "you",
    "왕실 약이면 괜찮을 줄 알았는데…"
   ],
   [
    "ishubike",
    "모험의 약은 많지만 이런 증상에 맞지 않을 수 있어요. 원인을 계속 찾아야겠어요."
   ],
   [
    "you",
    "요정 레오나 님께도 여쭤볼게요."
   ]
  ]
 ],
 [
  "요정의 약을 찾아서",
  "nymphen",
  "leona",
  [
   [
    "leona",
    "그 증상에 쓸 약을 찾는군요. 내 요정의 약은 귀하고 값비싸서 기욤에게 따로 보관을 부탁했어요."
   ],
   [
    "you",
    "광산에 계신 기욤 아저씨 말씀이시죠?"
   ],
   [
    "leona",
    "그를 찾아가 보세요. 요정의 약을 가져올 수 있을 거예요."
   ],
   [
    "you",
    "이번에는 조금이라도 나아지셨으면 좋겠어요."
   ]
  ]
 ],
 [
  "기욤의 거래",
  "minedepths",
  "guillaume",
  [
   [
    "you",
    "레오나 님의 요정의 약을 찾으러 왔어요. 환자가 급해요."
   ],
   [
    "guillaume",
    "공짜로는 곤란하지. 이 금덩이를 카디쟈에게 가져가 5만 핀으로 바꿔 오게."
   ],
   [
    "edward",
    "사람이 아프다는데 꼭 거래를 해야겠습니까?"
   ],
   [
    "guillaume",
    "이곳에서는 금을 모으고 물건을 바꿔 살아가니 말이오. 돌아올 때까지 기사는 여기서 기다려 주시오."
   ],
   [
    "you",
    "제가 다녀올게요. 약이 어디 있는지도 꼭 알려 주세요."
   ]
  ]
 ],
 [
  "금덩이 환전",
  "cardiahome",
  "cardia",
  [
   [
    "you",
    "기욤 아저씨가 보낸 금덩이에요. 요정의 약을 받으려면 환전해 와야 한대요."
   ],
   [
    "cardia",
    "그러면 양쪽 다 손해 보는 건 아니겠군. 여기 환전한 5만 핀이에요."
   ],
   [
    "you",
    "이 돈은 따로 챙겨서 그대로 전할게요."
   ],
   [
    "cardia",
    "기욤에게 금을 핀으로 바꿨다고 전해 주세요."
   ]
  ]
 ],
 [
  "요정의 약",
  "minedepths",
  "guillaume",
  "약속대로 5만 핀을 가져왔군. 요정의 약을 받게. 에드워드도 이제 함께 가도 좋아."
 ],
 [
  "요정의 약과 되살아난 기억",
  "village",
  "ishubike",
  [
   [
    "ishubike",
    "털도 계속 자라고 거동도 점점 힘들어졌어요. 요정의 약은 가져왔나요?"
   ],
   [
    "you",
    "여기 있어요. 이번에는 부디 효과가 있었으면 좋겠어요."
   ],
   [
    "narrator",
    "요정의 약을 먹은 뒤, 흐려졌던 기억이 조금씩 돌아왔다."
   ],
   [
    "family",
    "생각났다. 나무를 하러 마을 밖으로 나갔다가… 호수 근처에서 뱀에게 물렸어."
   ],
   [
    "you",
    "뱀이요? 그게 원인이었군요."
   ]
  ]
 ],
 [
  "독을 아는 마법사",
  "village",
  "ishubike",
  [
   [
    "ishubike",
    "어디서 이야기로 들은 증상 같더니, 롱롱뱀의 독인 것 같아요."
   ],
   [
    "you",
    "이 그림의 뱀에게 물리신 거군요."
   ],
   [
    "ishubike",
    "오당카 대마사가 이런 독에 대해 잘 알아요. 찾아갈 때는 학교 던전의 석류를 가져가세요."
   ],
   [
    "kesno",
    "이제 나도 함께 갈게. 할아버지는 선생님께 부탁드렸어."
   ],
   [
    "you",
    "좋아. 재료부터 구해서 오당카에게 가자."
   ]
  ]
 ],
 [
  "오당카의 선물",
  "basement",
  "pomegranate",
  [
   [
    "narrator",
    "학교 지하의 상자를 살펴 던전 석류 한 개를 찾았다."
   ],
   [
    "kesno",
    "찾았다. 이걸 먹으면 되는 건 아니겠지?"
   ],
   [
    "you",
    "이건 오당카에게 드릴 선물이야. 해독약은 따로 부탁드려야 해."
   ]
  ]
 ],
 [
  "롱롱뱀의 독",
  "hut",
  "odangka",
  [
   [
    "you",
    "오당카 님이 좋아하신다는 석류예요. 롱롱뱀에게 물린 분을 치료할 방법을 알려 주세요."
   ],
   [
    "odangka",
    "그 독은 점점 온몸에 퍼진다. 서둘러야겠군."
   ],
   [
    "you",
    "잠깐만 치료 방법을 알려 주시면 안 될까요? 할아버지가 기다리세요."
   ],
   [
    "odangka",
    "우선 롱롱뱀의 피로 혈청을 만들어야 해. 그리고 안토니오의 침이 필요하지."
   ],
   [
    "kesno",
    "큐리어스 저택의 안토니오요? 왜 그 사람의 침이죠?"
   ],
   [
    "odangka",
    "큐리어스의 마법 때문에 뱀으로 변하는 저주를 받았거든. 그 사정이 이번 약과 관계가 있다."
   ],
   [
    "you",
    "먼저 뱀을 찾아 피를 구하고, 안토니오에게 부탁할게요."
   ]
  ]
 ],
 [
  "독의 주인을 찾아라",
  "ghostforest",
  "snake12",
  "전투"
 ],
 [
  "안토니오에게 부탁",
  "curiousmansion",
  "antonio",
  [
   [
    "you",
    "오당카 님이 롱롱뱀의 피와 안토니오 님의 침이 필요하다고 하셨어요. 할아버지를 치료하려고요."
   ],
   [
    "antonio",
    "내 침을? 이런 부탁은 처음이야."
   ],
   [
    "kesno",
    "우리도 이상하다고 생각했지만, 네 저주와 관계가 있대."
   ],
   [
    "antonio",
    "사람을 살릴 수 있다면 도와야지. 준비하는 동안 주변 몬스터 열 마리를 정리해 줄래?"
   ],
   [
    "you",
    "알겠어요. 가까이 오지 못하게 막고 돌아올게요."
   ]
  ]
 ],
 [
  "저택 앞의 기다림",
  "ghostforest",
  "waitmonsters",
  "전투"
 ],
 [
  "두 번째 해독 재료",
  "curiousmansion",
  "antonio",
  [
   [
    "you",
    "부탁한 몬스터 열 마리를 모두 물리쳤어요."
   ],
   [
    "antonio",
    "혹시 몰라서 더 진한 걸 준비했어. 가래침으로 말이야."
   ],
   [
    "kesno",
    "더 진한 거라고…?"
   ],
   [
    "you",
    "이제 와서 따질 때가 아니지. 고마워요. 병을 꼭 닫고 가져갈게요."
   ],
   [
    "narrator",
    "안토니오의 침이 든 작은 병을 받았다."
   ]
  ]
 ],
 [
  "해독약을 기다리는 동안",
  "hut",
  "odangka",
  [
   [
    "odangka",
    "잘 받았다. 해독제를 조제하는 데는 시간이 든다."
   ],
   [
    "you",
    "여기서 기다리면 될까요?"
   ],
   [
    "odangka",
    "조제가 끝나면 곧장 마시게 해라. 아주 고약한 맛이 나니 쟈칼의 숲에서 도비엘에게 과일을 좀 얻어 오거라."
   ],
   [
    "kesno",
    "약을 드신 뒤 입가심할 과일이군요."
   ],
   [
    "you",
    "기다리는 동안 준비해 올게요."
   ]
  ]
 ],
 [
  "입가심할 과일",
  "waterfall",
  "dobiel",
  [
   [
    "you",
    "할아버지께 드릴 해독약을 만들고 있어요. 약이 많이 쓰다고 해서 과일을 구하러 왔어요."
   ],
   [
    "dobiel",
    "자, 과일을 드릴게요."
   ],
   [
    "kesno",
    "이렇게 선뜻 줘도 괜찮아요?"
   ],
   [
    "dobiel",
    "아픈 분께 필요한 일이잖아요. 잘 익은 것으로 챙겼으니 조심히 가져가요."
   ],
   [
    "you",
    "정말 고맙습니다. 잘 전해 드릴게요."
   ]
  ]
 ],
 [
  "완성된 해독약",
  "hut",
  "odangka",
  [
   [
    "odangka",
    "해독약이 다 되었다. 늦기 전에 환자에게 먹이거라."
   ],
   [
    "you",
    "도비엘 님께 과일도 받아 왔어요."
   ],
   [
    "odangka",
    "약은 남기지 말고 전부 먹도록 해. 과일은 그 뒤에 드리면 되겠지."
   ],
   [
    "kesno",
    "알겠습니다. {name}, 돌아가자."
   ]
  ]
 ],
 [
  "돌아온 다정한 목소리",
  "village",
  "family",
  [
   [
    "kesno",
    "할아버지, 해독약을 가져왔어요. 조금 쓰더라도 드셔야 해요."
   ],
   [
    "narrator",
    "해독약을 모두 드신 뒤 과일로 입가심을 도왔다. 한참 뒤, 굳어 있던 몸과 표정이 서서히 풀렸다."
   ],
   [
    "family",
    "이제 좀 살겠구나. 너희가 몇 번이나 먼 길을 오갔는지…"
   ],
   [
    "you",
    "괜찮아지셔서 다행이에요. 이슈비케 선생님과 케스노가 계속 곁에 있어 줬어요."
   ],
   [
    "ishubike",
    "회복될 때까지는 무리하지 마세요. 숲에 가실 때도 꼭 조심하시고요."
   ],
   [
    "kesno",
    "이제야 마음이 놓인다."
   ]
  ]
 ],
 [
  "새로운 작은 친구",
  "village",
  "elder",
  [
   [
    "elder",
    "모두 고생했구나. 병을 고치려고 포기하지 않고 뛰어다닌 마음을 잊지 않을 게다."
   ],
   [
    "you",
    "처음 약이 듣지 않았을 때는 겁이 났어요. 그래도 도와주는 사람들이 있었어요."
   ],
   [
    "elder",
    "그 인연을 소중히 하거라. 이 작은 펭귄도 네가 잘 돌봐 주겠니?"
   ],
   [
    "you",
    "네. 새 친구도 소중하게 돌볼게요. 모두 고맙습니다!"
   ]
  ]
 ]
];
 x.quests.splice(140,1,...rows.map(([title,sc,id])=>['제12화 · '+title,(x.npcs[id]?.name||({mina:'미나',conrad:'콘라드',family:'할아버지',elder:'촌장님',julia:'줄리아',kesno:'케스노',matilda:'마틸다',caesar:'세자르 3세',edward:'에드워드',odangka:'오당카'}[id])||title)+' 만나기',sc,id]),['제12화 완료 · 뱀에게 물린 할아버지','고향에 평온이 돌아왔습니다. 프리미션과 펫 육성을 이어가세요.','campus','none']);
 window.ARPIA_EPISODE12={rows};
 const end=182+rows.length;x.chapters.push([182,end,'제12화 뱀에게 물린 할아버지']);
 x.map.push(['ghostforest','데런 근교 유령마의 숲',[180,435]]);
 x.scenes.ghostforest=(s,n,p)=>({id:'ghostforest',name:'데런 근교 · 유령마의 숲',bg:'assets/maps-hires/forest-battle.png',w:1000,h:658,zoom:1.1,nodes:[[180,435],[270,450],[380,440],[490,380],[600,340],[720,305],[780,220],[630,440]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[4,7],[7,2]],entities:[p('back','데런 왕국',180,435,'kingdom',[465,650]),n(s.stage===204?'waitmonsters':'snake12',720,305)]});
 x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);if(s.stage>=182){if(sc.id==='classroom')sc.entities.push(n('ishubike',725,310));if(sc.id==='village'&&s.stage<=210){if(!sc.entities.some(e=>e.id==='ishubike'))sc.entities.push(n('ishubike',342,372));if(!sc.entities.some(e=>e.id==='kesno'))sc.entities.push(n('kesno',355,592));}if(sc.id==='campus'&&!sc.entities.some(e=>e.id==='kesno'))sc.entities.push(n('kesno',747,500));if(sc.id==='kingdom'){if(!sc.entities.some(e=>e.id==='edward'))sc.entities.push(n('edward',465,650));sc.entities.push(p('ghostforest','유령마의 숲',400,600,'ghostforest',[180,435]));}if(sc.id==='basement'&&s.stage===200)sc.entities.push({...n('pomegranate',445,285),type:'fixture'});}};
 x.encounters.snake12={name:'롱롱뱀의 독',bg:'assets/maps-hires/forest-battle.png',intro:'해독약 재료를 구하기 위해 롱롱뱀과 맞섭니다.',next:203,xp:170,gold:95,sp:45,enemies:[{name:'롱롱뱀',element:2,hp:480,maxHp:480,atk:20,atb:10,sprite:'snake12'}]};
 x.encounters.waitmonsters={name:'저택 앞 몬스터 소탕',bg:'assets/maps-hires/curious-mansion.png',intro:'안토니오가 재료를 준비하는 동안 주변을 정리합니다.',next:205,xp:130,gold:80,sp:35,enemies:[{name:'숲의 독뱀',element:2,hp:200,maxHp:200,atk:16,atb:10,sprite:'snake12'},{name:'움직이는 나무 인형',element:0,hp:185,maxHp:185,atk:15,atb:0,sprite:'woodDoll'}]};
 x.questItems=s=>[...items(s),...(s.familyLetter?[['고향의 속달 편지','아픈 할아버지의 소식']]:[]),...(s.firstAid?[['구급약초','이슈비케가 할아버지께 보내는 약초']]:[]),...(s.royalMedicine?[['왕실 치료약','케스노에게 전달할 왕실의 약']]:[]),...(s.fairyMedicine?[['요정의 약','궁전 미로에서 찾아온 약']]:[]),...(s.fruitForFamily12?[['도비엘의 과일','쓴 해독약을 드신 할아버지께 드릴 과일']]:[]),...(s.exchangeGold?[['기욤의 금덩이','카디쟈에게 환전할 미션 물품']]:[]),...(s.exchangePin?[['환전 대금 50,000 핀','기욤에게 전달할 별도 보관금']]:[]),...(s.snakeBlood?[['롱롱뱀의 피','해독약의 첫 재료']]:[]),...(s.antonioSample?[['안토니오의 가래침','해독약의 두 번째 재료']]:[]),...(s.antidote?[['롱롱뱀 해독약','할아버지에게 전할 약']]:[])];
 x.interact=(e,a)=>{const s=a.state,i=s.stage-182,r=rows[i];if(!r||r[1]!==s.scene||r[2]!==e.id)return prior(e,a);if(r[3]==='전투'){a.battle(e.id);return true;}a.talk(Array.isArray(r[3])?r[3]:[[e.id,r[3]]],()=>{const q=s.stage;const flags={183:'familyLetter',187:'firstAid',189:'royalReferral',192:'royalMedicine',195:'exchangeGold',197:'fairyMedicine',200:'pomegranate',205:'antonioSample',208:'antidote'};if(flags[q])s[flags[q]]=true;if(q===188)s.kesnoCare12=true;if(q===190){s.firstAid=false;s.kesnoCare12=true;}if(q===191)s.royalReferral=false;if(q===193)s.royalMedicine=false;if(q===198){s.fairyMedicine=false;s.kesnoCare12=false;}if(q===201)s.pomegranate=false;if(q===207)s.fruitForFamily12=true;if(q===196){s.exchangeGold=false;s.exchangePin=50000;}if(q===197)s.exchangePin=0;if(q===203)s.snakeBlood=true;if(q===206){s.snakeBlood=false;s.antonioSample=false;}if(q===209){s.antidote=false;s.familyLetter=false;s.fruitForFamily12=false;}if(q===210){s.ownPenguin=true;s.sp+=50;s.hp=s.maxHp;s.mp=s.maxMp;}a.advance(q+1,10);a.refresh();a.save();if(q===210)a.finish('제12화 완료 · 뱀에게 물린 할아버지','친구들의 도움으로 해독약을 완성했습니다. 펫 정보에 펭귄이 추가되었습니다.');});return true;};
})();
