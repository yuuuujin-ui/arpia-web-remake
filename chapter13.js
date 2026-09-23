/* Chapter 13: 웨일라 특선. Plot order: https://wonavy.tistory.com/211 */
(()=>{
 const x=ARPIA_EXTRA,prior=x.interact,decorate=x.decorate,items=x.questItems;
 Object.assign(x.defaults,{golems13:0,mercenaries13:0,sunnyLetter:false,scollGift:false,recipeBook:false,soySauce:false,peaceFire:false,cookingPot:false,caveCrab:false,soyCrabDish:false,dishAging:false,dishStolen:false,dishRecovered:false,crabLeg:false,sunnyCured:false});
 Object.assign(x.npcs,{
  rudolph:{name:'루돌프',portrait:'other/루돌프.png'},meli:{name:'멜리',anim:'npc_038_도트_멜리',portrait:'worker/멜리.png'},joker:{name:'조커',portrait:'other/조커.png'},
  sunny:{name:'써니',anim:'npc_008_도트_나오미',portraitPath:'assets/sunny.png'},soyjar:{name:'500년 묵은 간장 항아리',artPath:'assets/soy-jar.png'},peacefire:{name:'평온의 불',artPath:'assets/peace-fire.png'},
  cookingpot:{name:'쥬다의 큰 솥',artPath:'assets/cooking-pot.png'},cavecrab13:{name:'학교 지하의 큰 게',artPath:'assets/cave-crab.png',height:72},agingroom:{name:'숙성할 바위방'}
 });
 const rows=[
 [
  "오당카의 특별한 솜씨",
  "principal",
  "morris",
  [
   [
    "morris",
    "오당카의 요리를 한 번 맛본 사람은 그 맛을 잊을 수 없지. 마법 솜씨 못지않게 요리 솜씨도 대단하단다."
   ],
   [
    "you",
    "그 무서운 오당카 님이요? 요리하시는 모습은 상상이 안 되는데요."
   ],
   [
    "morris",
    "사람에게는 여러 모습이 있지. 찾아가서 요리 이야기를 한번 꺼내 보렴."
   ]
  ]
 ],
 [
  "기분이 좋지 않은 요리사",
  "hut",
  "rudolph",
  [
   [
    "rudolph",
    "오당카 님께 요리를 부탁하러 왔니? 오늘은 조금 조심하는 게 좋겠어."
   ],
   [
    "you",
    "무슨 일이 있었어요?"
   ],
   [
    "rudolph",
    "귀족들이 자꾸 이래라저래라 했나 봐. 아까부터 기분이 영 좋지 않으셔."
   ]
  ]
 ],
 [
  "거절당한 부탁",
  "hut",
  "odangka",
  [
   [
    "odangka",
    "내가 요리사라고 귀족들의 명령이나 듣고 있을 줄 아느냐? 내 요리는 내가 만들고 싶을 때 만드는 거다."
   ],
   [
    "you",
    "교장 선생님께서 말씀하시기에 한번 여쭤보려고…"
   ],
   [
    "odangka",
    "약속? 흥, 지금은 요리할 기분이 아니다. 모리스에게도 그렇게 전해라."
   ]
  ]
 ],
 [
  "교장 선생님의 다른 길",
  "principal",
  "morris",
  [
   [
    "morris",
    "허허, 오당카가 단단히 화가 났구나. 억지로 시킬 수는 없지."
   ],
   [
    "you",
    "요리 이야기를 꺼내기도 어려웠어요."
   ],
   [
    "morris",
    "다음에 기회가 있겠지. 아이작도 너에게 할 말이 있다던데 만나 보렴."
   ]
  ]
 ],
 [
  "아이작의 실수와 소식",
  "principal",
  "isaac",
  [
   [
    "isaac",
    "나 지금 교장 선생님을 뵈러 가는 길이야. 불꽃 마법을 연습하다가 선생님의 십자수를 태워 버렸거든."
   ],
   [
    "you",
    "요리 이야기보다 더 혼날 일이잖아…"
   ],
   [
    "isaac",
    "그러게 말이야. 아, 우편함에 네가 받을 편지가 있더라. 콘라드 아저씨께 가 봐."
   ]
  ]
 ],
 [
  "아수리아에서 온 편지",
  "shop",
  "conrad",
  [
   [
    "conrad",
    "아수리아의 써니가 보낸 편지다. 오당카에게 전해 달라는 부탁이 적혀 있구나."
   ],
   [
    "narrator",
    "편지에는 오당카의 음식을 먹으면 병도 낫는다는 소문을 들었다며, 자신 같은 평범한 백성도 그 요리를 먹을 수 있겠느냐는 간절한 부탁이 적혀 있다."
   ],
   [
    "you",
    "아픈 사람의 부탁이라면 오당카 님도 들어주실까요? 먼저 써니를 만나 봐야겠어요."
   ]
  ]
 ],
 [
  "스콜의 작은 부탁",
  "shop",
  "scoll",
  [
   [
    "scoll",
    "아수리아에 가는 길이라고? 마침 잘 됐구나. 카디쟈에게 이 선물 좀 전해 주렴."
   ],
   [
    "you",
    "선생님, 또 제가 사랑의 메신저가 되는 건가요?"
   ],
   [
    "scoll",
    "오오, 좋아, 좋아. 부탁한다. 이번에는 꼭 내 마음이 전해졌으면 좋겠구나."
   ]
  ]
 ],
 [
  "카디쟈에게 전한 선물",
  "cardiahome",
  "cardia",
  [
   [
    "cardia",
    "스콜 선생님의 선물이군요. 왕실 재정을 맡은 제게 이런 값진 선물은 조금 부담스럽습니다."
   ],
   [
    "you",
    "그럼 다시 가져갈까요?"
   ],
   [
    "cardia",
    "일단 받아 두겠습니다. 다만 선물을 받았다는 것과 선생님의 마음에 답한다는 것은 다른 일이에요."
   ]
  ]
 ],
 [
  "감기에 걸린 써니",
  "asuria",
  "sunny",
  [
   [
    "sunny",
    "사람들 말로는 오당카 마법사의 요리를 먹고 병이 나은 사람도 있대요. 저 같은 백성에게는 무리한 부탁일까요? 콜록…"
   ],
   [
    "you",
    "편지는 받았어요. 직접 전해 드릴게요. 써니도 그 요리를 드실 수 있으면 좋겠어요."
   ],
   [
    "sunny",
    "고마워요. 이렇게 찾아와 주신 것만으로도 기운이 나네요."
   ]
  ]
 ],
 [
  "마음을 움직인 편지",
  "hut",
  "odangka",
  [
   [
    "you",
    "오당카 님, 써니의 편지를 읽어 주세요. 선생님의 요리를 맛보지 못하면 슬플 것 같다고 했어요."
   ],
   [
    "odangka",
    "백성이라고 내 요리를 못 먹을 이유가 있느냐. 다만 준비가 필요한 요리다."
   ],
   [
    "you",
    "재료를 구하는 일이라면 제가 돕겠어요."
   ],
   [
    "odangka",
    "그럼 학교 도서관에서 「웨일라 특선」이라는 요리책을 빌려 와라. 내가 쓴 책이지."
   ]
  ]
 ],
 [
  "웨일라 특선",
  "library",
  "meli",
  [
   [
    "meli",
    "「웨일라 특선」을 찾으시는군요. 오당카 마법사께서 쓰신 책이에요."
   ],
   [
    "you",
    "저자께서 자기 책을 빌려 오라고 하셨어요."
   ],
   [
    "meli",
    "그럴 수도 있지요. 여기 있어요. 요리가 끝나면 훼손하지 말고 돌려주세요."
   ]
  ]
 ],
 [
  "기분이 풀린 오당카",
  "hut",
  "rudolph",
  [
   [
    "rudolph",
    "다녀왔구나! 오당카 님 기분이 조금 풀리셨어."
   ],
   [
    "you",
    "책도 구해 왔어요. 이번에는 쫓겨나지 않겠죠?"
   ],
   [
    "rudolph",
    "여기는 그대로니까 안으로 들어가 봐. 요리 이야기를 하실 때는 표정부터 달라지신다니까."
   ]
  ]
 ],
 [
  "첫 재료, 500년 간장",
  "hut",
  "odangka",
  [
   [
    "odangka",
    "책을 가져왔군. 만들 요리는 간장게장이다. 먼저 오백 년 묵은 간장이 필요해."
   ],
   [
    "you",
    "오백 년이나요? 그런 간장은 어디서 구해요?"
   ],
   [
    "odangka",
    "학교 지하, 코볼트가 있는 곳에서 통하는 항아리 방을 찾아라. 아무 항아리나 건드리지 말고 코볼트에게 물어보도록 해."
   ]
  ]
 ],
 [
  "코볼트의 숫자",
  "koboldroom",
  "kobold",
  [
   [
    "kobold",
    "간장을 찾으시오? 항아리가 많으니 하나씩 다 뒤지면 고생할 거요."
   ],
   [
    "you",
    "어느 항아리인지 알려주실 수 있어요?"
   ],
   [
    "kobold",
    "내가 좋아하는 숫자를 기억하시오. 구, 사. 순서도 잊지 마시오."
   ],
   [
    "you",
    "9 다음에 4… 엉뚱한 항아리는 건드리지 않을게요."
   ]
  ]
 ],
 [
  "94번 항아리",
  "koboldroom",
  "soyjar",
  "퍼즐"
 ],
 [
  "평온의 불",
  "firevillage",
  "elder",
  [
   [
    "you",
    "간장을 구했어요. 방에 함정이 있다는 말씀도 해 주셨어야죠!"
   ],
   [
    "odangka",
    "구해 왔으니 됐지. 다음은 평온의 불이다. 불꽃 마을에서 받아 오너라."
   ],
   [
    "elder",
    "평온의 불? 저기에 준비해 둔 것이 있단다. 요리하는 동안 불길을 고르게 유지해 줄 거야."
   ],
   [
    "you",
    "감사합니다. 조심해서 가져갈게요."
   ]
  ]
 ],
 [
  "쥬다의 큰 솥",
  "judah",
  "abdullah",
  [
   [
    "abdullah",
    "솥을 찾으시오? 이걸 쓰시오. 요리를 해도 좋고, 다 먹은 뒤에는 과일을 담아 두어도 아주 그만이라오."
   ],
   [
    "you",
    "솥이 정말 묵직하네요. 오당카 님이 쓰실 거예요."
   ],
   [
    "abdullah",
    "그분 요리라면 좋은 솥이 필요하지. 들고 가다가 발등에 떨어뜨리지는 마시오."
   ]
  ]
 ],
 [
  "게를 찾는 조커의 힌트",
  "magecity",
  "joker",
  [
   [
    "joker",
    "솥이랑 불까지 구했다고? 남은 것은 게겠군. 학교 지하 던전에 몬스터게가 있지."
   ],
   [
    "you",
    "게를 잡으러 바닷가로 갈 생각이었는데요."
   ],
   [
    "joker",
    "그 녀석은 덩치가 크다. 네 실력으로 잡을 수 있을지 모르겠어. 준비를 단단히 하고 가라."
   ]
  ]
 ],
 [
  "학교 지하의 큰 게",
  "basement",
  "cavecrab13",
  "전투"
 ],
 [
  "간장게장 만들기",
  "hut",
  "odangka",
  [
   [
    "odangka",
    "몬스터게, 평온의 불, 오백 년 묵은 간장, 솥. 재료는 빠짐없이 가져왔군."
   ],
   [
    "you",
    "이제 요리를 시작하시는 건가요? 구경해도 돼요?"
   ],
   [
    "odangka",
    "간장게장을 준비하는 동안 넌 몬스터를 사냥하고 와라. 골렘 다섯, 용병 다섯이면 되겠군."
   ],
   [
    "you",
    "요리 구경보다 훨씬 힘든 일이잖아요… 다녀올게요."
   ]
  ]
 ],
 [
  "요리가 익는 동안",
  "ghostforest",
  "waitmonsters13",
  "전투"
 ],
 [
  "광산의 숙성 방",
  "hut",
  "odangka",
  [
   [
    "odangka",
    "아직 요리를 끝낸 게 아니란 말이야. 게장을 제대로 숙성시켜야 한다."
   ],
   [
    "you",
    "재료도 다 모으고 사냥까지 했는데요?"
   ],
   [
    "odangka",
    "기다리는 것도 요리의 일부다. 난쟁이 궁전 미로의 서늘한 방을 쓰도록 하지. 나도 함께 가겠다."
   ]
  ]
 ],
 [
  "게장을 내려놓다",
  "dwarfpalace",
  "agingroom",
  [
   [
    "narrator",
    "서늘한 방에 간장게장 항아리를 조심스럽게 내려놓았다."
   ],
   [
    "you",
    "여기다 두면 되겠죠?"
   ],
   [
    "odangka",
    "음. 온도도 적당하고 맛이 잘 들겠어. 숙성이 끝나기 전에 함부로 열지 마라."
   ],
   [
    "narrator",
    "숙성 기간을 기다린 뒤, 오당카와 함께 항아리를 찾으러 가기로 했다."
   ]
  ]
 ],
 [
  "사라진 간장게장",
  "hut",
  "rudolph",
  [
   [
    "rudolph",
    "제가 마법서점에 잠시 나간 사이에 누가 찾아왔었대요. 데런 왕국에서 온 기사라면서요."
   ],
   [
    "you",
    "기사가 왜 여기까지 왔어요?"
   ],
   [
    "rudolph",
    "오당카 님의 간장게장 이야기를 했나 봐요. 겁을 줘서 숙성하는 장소를 말해 버렸어요. 죄송해요…"
   ],
   [
    "odangka",
    "뭐라고? 당장 가 보자!"
   ]
  ]
 ],
 [
  "에드워드가 가져간 요리",
  "minedepths",
  "guillaume",
  [
   [
    "narrator",
    "숙성 방에 돌아왔지만 항아리가 사라져 있었다."
   ],
   [
    "odangka",
    "내 간장게장을! 아직 숙성도 덜 된 것을 누가 감히!"
   ],
   [
    "you",
    "기욤, 우리가 나간 후 누가 미로의 방에 들어왔어요?"
   ],
   [
    "guillaume",
    "말씀드리는 대신 나중에 게장을 찾으면 뒷다리 하나라도 맛보게 해 주시오. 에드워드 경이 금을 내놓으며 위치를 물었소."
   ],
   [
    "you",
    "거래할 때가 아니지만… 알겠어요. 오당카 님, 왕궁으로 가요!"
   ]
  ]
 ],
 [
  "왕국의 책임",
  "kingdom",
  "caesar",
  [
   [
    "odangka",
    "나 몰래 그 소중한 간장게장을 훔쳐가다니, 이런 법이 있소?"
   ],
   [
    "caesar",
    "맛보고 싶은 마음이 앞섰구려. 미안하오. 하지만 황제로서 체면도 있지 않겠소."
   ],
   [
    "you",
    "써니에게 드릴 음식이에요. 아픈 사람이 기다리고 있어요."
   ],
   [
    "caesar",
    "그렇다면 간장게장을 걸고 대결합시다. 우리 데런 왕국의 기사단장 에드워드 경과 겨뤄 보시오."
   ],
   [
    "odangka",
    "좋다. 내가 만든 음식을 되찾는데 가만히 있을 수는 없지."
   ]
  ]
 ],
 [
  "에드워드와의 대련",
  "royalarena",
  "edward",
  "전투"
 ],
 [
  "되찾은 간장게장",
  "royalarena",
  "caesar",
  [
   [
    "odangka",
    "까불고 있어. 감히. 나 화났다구."
   ],
   [
    "caesar",
    "마법사들이 이겼군. 약속대로 간장게장을 돌려주도록 하지."
   ],
   [
    "you",
    "드디어 되찾았네요. 써니에게 가져가기 전에 기욤과 한 약속도 지켜야 해요."
   ],
   [
    "odangka",
    "내 요리에 입맛 다시는 사람이 왜 이렇게 많으냐. 뒷다리 하나만 떼어 주고 어서 가자."
   ]
  ]
 ],
 [
  "기욤과의 약속",
  "minedepths",
  "guillaume",
  [
   [
    "guillaume",
    "약속을 잊지 않았구려! 뒷다리 하나만 받겠소."
   ],
   [
    "you",
    "나머지는 써니에게 가져갈 거예요. 다음에는 금을 준다고 남의 물건이 있는 곳을 알려주지 마세요."
   ],
   [
    "guillaume",
    "알겠소, 알겠소. 남은 것은 새지 않게 잘 싸 두었소."
   ]
  ]
 ],
 [
  "써니에게 전한 웨일라의 맛",
  "asuria",
  "sunny",
  [
   [
    "sunny",
    "이게 오당카 마법사의 간장게장이에요? 저 같은 사람의 부탁도 들어주셨군요."
   ],
   [
    "you",
    "오당카 님도 직접 도와주셨어요. 힘들게 구한 음식이니 천천히 드세요."
   ],
   [
    "sunny",
    "이 맛을 어떻게 말해야 할까요… 몸도 한결 가벼워진 것 같아요. 정말 고마워요."
   ],
   [
    "you",
    "기침이 멎었네요! 오당카 님께 써니가 좋아하셨다고 꼭 전할게요."
   ]
  ]
 ]
];
 window.ARPIA_EPISODE13={rows};
 const start=211,end=start+rows.length;
 x.quests.splice(169,1,...rows.map(([title,scene,id])=>['제13화 · '+title,(x.npcs[id]?.name||title)+' 만나기',scene,id]),['제13화 완료 · 웨일라 특선','오당카의 요리로 써니가 건강을 되찾았습니다.','campus','none']);
 x.chapters.push([start,end,'제13화 웨일라 특선']);
 x.encounters.cavecrab13={name:'지하의 큰 게',bg:'assets/maps-hires/basement-open.png',intro:'간장게장의 주재료가 될 큰 게가 집게를 세웁니다.',next:230,setFlag:'caveCrab',xp:175,gold:90,sp:45,enemies:[{name:'백년 동굴게',element:2,hp:520,maxHp:520,atk:21,atb:8,sprite:'caveCrab'}]};
 x.encounters.waitmonsters13={name:'오두막 주변 소탕',bg:'assets/maps-hires/forest-battle.png',intro:'요리가 완성되는 동안 주변 몬스터를 물리칩니다.',next:232,setFlag:'soyCrabDish',xp:150,gold:80,sp:35,enemies:[{name:'숲의 애플링',element:2,hp:215,maxHp:215,atk:16,atb:12,sprite:'appling'},{name:'그림자 정령',element:0,hp:190,maxHp:190,atk:17,atb:0,sprite:'shadow'}]};
 x.encounters.edward13={name:'왕국 기사 에드워드',bg:'assets/maps-hires/colosseum.png',intro:'간장게장을 되찾기 위한 정정당당한 대련입니다.',next:238,setFlag:'dishRecovered',xp:210,gold:120,sp:55,enemies:[{name:'에드워드 경',element:0,hp:680,maxHp:680,atk:23,atb:18,sprite:'edward13'}]};
 x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);if(s.stage<start)return;
  if(sc.id==='principal'&&s.stage===215)sc.entities.push(n('isaac',520,260));if(sc.id==='shop'&&s.stage===217)sc.entities.push(n('scoll',525,310));if(sc.id==='magecity'&&s.stage===228)sc.entities.push(n('joker',470,250));
  if(sc.id==='hut'&&!sc.entities.some(e=>e.id==='rudolph'))sc.entities.push(n('rudolph',380,330));if(sc.id==='library'&&!sc.entities.some(e=>e.id==='meli'))sc.entities.push(n('meli',440,280));if(sc.id==='asuria'&&!sc.entities.some(e=>e.id==='sunny'))sc.entities.push(n('sunny',314,375));
  if(sc.id==='koboldroom'&&s.stage===225)sc.entities.push({...n('soyjar',650,252),type:'fixture'});if(sc.id==='firevillage'&&s.stage===226)sc.entities.push({...n('peacefire',397,466),type:'fixture'});
  if(sc.id==='judah'&&s.stage===227)sc.entities.push({...n('cookingpot',420,215),type:'fixture'});if(sc.id==='basement'&&s.stage===229)sc.entities.push(n('cavecrab13',445,285));
  if(sc.id==='ghostforest'&&s.stage===231)sc.entities.push(n('waitmonsters13',600,340));if(sc.id==='dwarfpalace'&&s.stage===233)sc.entities.push({...n('agingroom',700,340),type:'fixture'});
  if(sc.id==='royalarena'&&s.stage===238&&!sc.entities.some(e=>e.id==='caesar'))sc.entities.push(n('caesar',550,290));if(sc.id==='royalarena'&&s.stage===237&&!sc.entities.some(e=>e.id==='edward'))sc.entities.push(n('edward',610,330));
 };
 x.questItems=s=>[...items(s),...(s.sunnyLetter?[['써니의 편지','오당카의 요리를 부탁하는 아수리아의 편지']]:[]),...(s.scollGift?[['스콜의 선물','카디쟈에게 전할 작은 꾸러미']]:[]),...(s.recipeBook?[['웨일라 특선','오당카가 직접 쓴 요리책']]:[]),...(s.soySauce?[['500년 묵은 간장','94번 항아리에서 찾은 간장']]:[]),...(s.peaceFire?[['평온의 불','오랫동안 일정하게 타는 불꽃']]:[]),...(s.cookingPot?[['쥬다의 큰 솥','압둘라가 빌려준 조리 도구']]:[]),...(s.caveCrab?[['백년 동굴게','학교 지하에서 구한 주재료']]:[]),...(s.soyCrabDish?[['오당카의 간장게장','써니에게 전할 특별한 요리']]:[])];
 x.interact=(e,a)=>{const s=a.state,i=s.stage-start,r=rows[i];if(!r||r[1]!==s.scene||r[2]!==e.id)return prior(e,a);
  if(r[3]==='전투'){a.battle(e.id==='edward'?'edward13':e.id);return true;}
  if(r[3]==='퍼즐'){a.choicePuzzle(['94번 항아리','코볼트가 좋아하는 두 숫자를 차례로 누르면?', ['49','94','99'],1,'코볼트가 말한 순서는 9, 4였다.'],()=>{s.soySauce=true;a.advance(s.stage+1,15);a.refresh();a.save();});return true;}
  a.talk(Array.isArray(r[3])?r[3]:[[e.id==='agingroom'?'narrator':e.id,r[3]]],()=>{
   const q=s.stage,flags={216:'sunnyLetter',217:'scollGift',221:'recipeBook',226:'peaceFire',227:'cookingPot',233:'dishAging',234:'dishStolen',239:'crabLeg',240:'sunnyCured'};if(flags[q])s[flags[q]]=true;
   if(q===218)s.scollGift=false;if(q===220)s.sunnyLetter=false;if(q===223)s.recipeBook=false;if(q===233)s.soyCrabDish=false;if(q===238)s.soyCrabDish=true;if(q===230){s.soySauce=false;s.peaceFire=false;s.cookingPot=false;s.caveCrab=false;}if(q===238)s.dishStolen=false;if(q===239)s.crabLeg=false;if(q===240)s.soyCrabDish=false;
   a.advance(q+1,q===240?50:10);a.refresh();a.save();if(q===240)a.finish('제13화 완료 · 웨일라 특선','오당카의 간장게장을 되찾아 써니에게 전했습니다. 웨일라 최고의 맛이 아픈 마음까지 위로했습니다.');
  });return true;
 };
})();
