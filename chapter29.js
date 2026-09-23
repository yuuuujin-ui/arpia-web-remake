/* Original event order: https://wonavy.tistory.com/226 (episode 29).
   Dialogue and combat are reconstructed from the surviving play record. */
(()=>{
 const x=ARPIA_EXTRA,m=ARPIA_MIDTERM,icon='assets/items/';
 const item=(id,name,desc,path)=>ARPIA_DATA.ITEMS['mt_'+id]={name,desc,kind:'quest',price:0,sell:0,icon:path};
 item('crystal29','수업용 수정구슬','가까운 미래를 비추는 바바라의 오래된 수정구슬',icon+'manastone_plus.png');
 item('brokenCrystal29','깨진 수정구슬','상점가에서 산산조각 난 수업용 수정구슬',icon+'manastone.png');
 item('mirrorOre29','투명한 거울의 원석','우유 피부 마법의 첫 번째 재료',icon+'diamond.png');
 item('eagleHair29','대머리 독수리의 머리털','시바에게서 몰래 얻은 두 번째 재료',icon+'bat_wing.png');
 item('milk29','신선한 우유','대지 마을에서 받은 세 번째 재료',icon+'potion.png');
 Object.assign(x.npcs,{
  aaron29:{name:'아론 선생님'},crystal29:{name:'수업용 수정구슬',artPath:icon+'manastone_plus.png',height:38},brokenCrystal29:{name:'깨진 수정구슬',artPath:icon+'manastone.png',height:34},
  mirrorOre29:{name:'투명한 거울의 원석',artPath:icon+'diamond.png',height:34},milkPail29:{name:'신선한 우유',artPath:icon+'potion.png',height:34}
 });
 const rows=[
  {key:'mina',title:'심심한 쉬는 시간',scene:'campus',npc:'mina',pos:[610,316],lines:[['mina','오늘은 이상할 만큼 조용하네. 수업 시간도 아직 남았으니 잠깐 이야기할까?'],['you','좋아. 이번에는 아무 사건도 안 생기면 좋겠어.']]},
  {key:'hina',title:'아론 선생님의 수업',scene:'campus',npc:'hina',pos:[747,500],lines:[['hina','여기서 뭐 하고 있어! 아론 선생님 수업에 늦었어. 빨리 교실로 가자!'],['you','벌써 시간이 그렇게 됐어?']]},
  {key:'aaronLate',title:'상습 지각생의 벌',scene:'classroom',npc:'aaron29',pos:[530,185],fixture:true,lines:[['aaron29','히나는 어쩌다 한 번이지만 너는 자주 늦는구나. 수업 자료를 직접 가져오렴.'],['aaron29','칠리 선생님께 가서 시청각 자료를 받아 오도록 해.'],['you','이번에는 바로 다녀올게요.']]},
  {key:'chilli',title:'보일러실에 둔 시청각 자료',scene:'materials',npc:'chilli',pos:[530,240],lines:[['chilli','대청소를 하면서 수정구슬을 보일러실 지하 감옥방에 옮겨 두었단다.'],['chilli','깨지기 쉬우니 두 손으로 조심히 가져가렴.']]},
  {key:'crystal',title:'감옥방의 수정구슬',scene:'schoolprison',npc:'crystal29',pos:[768,470],fixture:true,lines:[['narrator','오래된 감옥방 한가운데에서 푸른 수정구슬이 희미하게 빛났다.'],['you','이게 아론 선생님 수업에 쓸 자료구나.']],effect:s=>m.give(s,'crystal29')},
  {key:'lesson',title:'천 년 전 아스티넬의 기록',scene:'classroom',npc:'aaron29',pos:[530,185],fixture:true,lines:[['aaron29','이 수정구슬에는 오래전 마법계의 기록이 남아 있다. 모두 집중해서 보렴.'],['narrator','천 년 전, 아스티넬의 피핀과 다피네는 대마왕 발바도스를 물리쳤다.'],['narrator','오백 년 뒤 아즈카가 아스티넬을 없앴지만, 대마법사 아르피아가 그를 쓰러뜨리고 지금의 학교가 세워졌다.']]},
  {key:'future',title:'가까운 미래를 보는 구슬',scene:'classroom',npc:'hina',pos:[420,290],lines:[['hina','수업 끝났는데 바로 돌려주기는 아깝지 않아? 가까운 미래도 볼 수 있대.'],['you','딱 한 번씩만 보고 칠리 선생님께 가져다드리자.']]},
  {key:'isaacVision',title:'넘어지는 아이작의 미래',scene:'lobby',npc:'hina',pos:[530,335],lines:[['hina','내가 먼저 볼게. 어라? 얼음 고급반 앞에서 아이작이 넘어지는 모습이 보여.'],['you','정말 미래인지 직접 확인해 보자.']]},
  {key:'isaacFalls',title:'정말로 일어난 미래',scene:'classroom',npc:'isaac',pos:[610,290],lines:[['isaac','앗! 누가 여기다 가방을 둔 거야?'],['hina','수정구슬에서 본 그대로야!'],['you','그러면 내가 본 장면도 진짜 미래일 수 있겠네.']]},
  {key:'dogVision',title:'사람들 사이의 강아지',scene:'lobby',npc:'crystal29',pos:[420,335],fixture:true,lines:[['narrator','구슬 안에 작은 강아지 한 마리가 사람들 주변을 서성이는 모습이 비쳤다.'],['you','이게 무슨 미래지? 불량품은 아니겠지?']]},
  {key:'return',title:'바바라에게 직접 반납',scene:'materials',npc:'chilli',pos:[530,240],lines:[['chilli','수업은 잘 끝났니? 그 구슬은 바바라 할머니 물건이야. 직접 가져다드리렴.'],['you','네, 이제 정말 장난치지 않고 반납할게요.']]},
  {key:'break',title:'상점가에서 깨진 수정구슬',scene:'shop',npc:'brokenCrystal29',pos:[385,330],fixture:true,lines:[['hina','바바라 할머니께 가기 전에 딱 한 번만 더 보자.'],['narrator','손끝에서 미끄러진 수정구슬이 바닥에 떨어져 산산조각 났다.'],['you','큰일 났어. 수리할 방법부터 찾아야 해!']],effect:s=>{m.take(s,'crystal29');m.give(s,'brokenCrystal29');}},
  {key:'samuel',title:'수리할 수 있는 단 한 사람',scene:'shop',npc:'sam',pos:[485,265],lines:[['sam','오래된 예지 수정구슬이군. 이걸 고칠 수 있는 사람은 큐리어스 마녀뿐이야.'],['hina','서쪽 저택까지 가야 한다는 뜻이네.']]},
  {key:'curious',title:'끝나 버린 무상 수리 기간',scene:'curiousmansion',npc:'curious',pos:[260,132],lines:[['curious','무상 수리 기간은 백 년이야. 이 구슬은 오백 년 전에 팔았으니 사백 년이나 늦었군.'],['you','돈 말고 다른 방법은 없나요?'],['curious','그럼 내 부탁을 들어. 먼저 저택 주변 몬스터부터 정리해.']]},
  {key:'yard',title:'큐리어스 저택 주변 정리',scene:'curiousmansion',npc:'curiouspet',pos:[420,300],lines:[['narrator','저택 주변으로 큐리어스가 일부러 풀어 둔 듯한 몬스터들이 몰려들었다.'],['you','수정구슬을 고치려면 해내야 해!']],battle:'curiousYard29'},
  {key:'formula',title:'우유 피부 마법',scene:'curiousmansion',npc:'curious',pos:[260,132],lines:[['curious','이번에는 우유 피부 마법 재료를 모아 와. 처음 듣는다고? 조커라면 쓸데없는 지식을 알겠지.'],['hina','분명 또 까다로운 재료일 거야.']]},
  {key:'joker',title:'거울 마법과 대머리 마법',scene:'magecity',npc:'joker',pos:[310,375],lines:[['joker','우유 피부라… 거울 마법과 대머리 마법을 합치면 비슷하게 되겠군!'],['joker','투명한 거울의 원석, 대머리 독수리의 머리털, 신선한 우유를 구해 와.'],['you','하나같이 평범하지 않은 재료네요.']]},
  {key:'baldi',title:'투명한 원석이 있는 갱도',scene:'mine',npc:'baldi',pos:[300,279],lines:[['baldi','투명한 거울 원석은 갱도 안쪽 밝은 광맥에서 가끔 나온다네. 반짝임을 잘 살펴보게.']]},
  {key:'ore',title:'투명한 거울의 원석',scene:'minedepths',npc:'mirrorOre29',pos:[545,390],fixture:true,lines:[['narrator','광맥 사이에서 유리처럼 맑게 빛나는 원석을 찾아냈다.']],effect:s=>m.give(s,'mirrorOre29')},
  {key:'shiva',title:'대머리 독수리의 머리털',scene:'eaglevillage',npc:'shiva',pos:[438,273],lines:[['shiva','왜 내 머리 위만 뚫어져라 보는 거지? 수상한 행동은 하지 마라.'],['narrator','시바가 뒤를 돌아본 순간, 옷깃에 걸린 머리털 한 올을 살짝 챙겼다.'],['you','미안해요. 수정구슬을 고치려면 꼭 필요해서…']],effect:s=>m.give(s,'eagleHair29')},
  {key:'laura',title:'대지 마을의 신선한 우유',scene:'earthvillage',npc:'laura',pos:[397,466],lines:[['laura','마을 목장에서 방금 짠 우유라네. 큐리어스의 마법에 쓴다니 걱정은 되지만 가져가게.']],effect:s=>m.give(s,'milk29')},
  {key:'ingredients',title:'세 가지 재료를 건네다',scene:'curiousmansion',npc:'curious',pos:[260,132],lines:[['curious','원석, 머리털, 우유. 전부 제대로 가져왔군. 이걸로 물약을 만들지.'],['curious','다만 완성된 물약을 마실 실험 대상도 필요해.'],['you','수정구슬 수리와 그건 별개 아닌가요?']],effect:s=>{m.take(s,'mirrorOre29');m.take(s,'eagleHair29');m.take(s,'milk29');s.milkSpellBrewing29=true;}},
  {key:'promise',title:'불안한 수리 약속',scene:'curiousmansion',npc:'hina',pos:[350,315],lines:[['hina','재료는 다 줬으니까 수정구슬은 고쳐 주겠지? 실험 대상 이야기는 못 들은 걸로 하자.'],['you','구슬에서 본 강아지가 자꾸 마음에 걸려.'],['narrator','큐리어스는 대답 대신 깨진 구슬 조각과 물약 냄비를 번갈아 바라보며 웃었다.']],reward:105,ending:'깨진 수정구슬을 고치기 위해 우유 피부 마법의 세 재료를 모았습니다. 큐리어스의 수상한 실험만 남았습니다.'}
 ];
 const captured29={
 "aaronLate": [
  [
   "aaron29",
   "너는 지각이 잦지만 히나는 좀처럼 늦지 않지. 오늘은 무슨 사정이 있을 게다."
  ],
  [
   "you",
   "그래서 히나가 꼭 같이 들어가자고 한 거였구나."
  ],
  [
   "hina",
   "선생님, 수업 자료를 가져오면 되는 거죠?"
  ],
  [
   "aaron29",
   "칠리 선생님께 시청각 자료를 받아 오너라. 이번에는 늦지 말고."
  ]
 ],
 "lesson": [
  [
   "aaron29",
   "지금 보이는 곳이 아스티넬이라는 마법 학교다."
  ],
  [
   "narrator",
   "구슬의 빛 속으로 오래전 학교와 마법사들의 모습이 지나갔다. 천 년 전 피핀과 다피네가 대마왕 발바도스를 물리친 기록이었다."
  ],
  [
   "aaron29",
   "역사는 승리한 순간만 기억해서는 안 된다. 그 뒤에 무슨 일이 일어났는지도 보아라."
  ],
  [
   "narrator",
   "오백 년 뒤 아즈카가 아스티넬을 없앴지만, 대마법사 아르피아가 그를 쓰러뜨리고 지금의 학교가 세워졌다는 이야기가 이어졌다."
  ]
 ],
 "isaacVision": [
  [
   "hina",
   "구슬 안에 사람이 보여. 저 노란 머리는… 아이작?"
  ],
  [
   "you",
   "얼음 마법 고급반 앞이네. 나오다가 넘어졌어!"
  ],
  [
   "hina",
   "아직 일어나지 않은 일이라면, 지금 가 보면 확인할 수 있겠지?"
  ]
 ],
 "isaacFalls": [
  [
   "narrator",
   "얼음 마법 고급반 교실에서 아이작이 나왔다. 몇 걸음 걷던 아이작은 구슬에서 본 모습 그대로 넘어졌다."
  ],
  [
   "isaac",
   "아야! 둘이 거기 서서 뭐 하는 거야?"
  ],
  [
   "hina",
   "수정구슬에서 본 그대로야!"
  ],
  [
   "you",
   "그럼 이 구슬이 정말 미래를 보여 주는 거네."
  ]
 ],
 "dogVision": [
  [
   "narrator",
   "구슬 안에 주인공이 비쳤다. 곧 그 자리에 작은 강아지가 나타났다."
  ],
  [
   "hina",
   "하하하, 이게 뭐야. 네가 강아지로 변했잖아!"
  ],
  [
   "you",
   "웃을 일이 아니야. 아이작에게 일어난 일도 맞혔잖아."
  ],
  [
   "hina",
   "어쩌면 변신 수업을 듣는 모습일지도 모르지."
  ],
  [
   "you",
   "그렇다면 좋겠는데… 구슬은 이제 그만 보자."
  ]
 ],
 "break": [
  [
   "hina",
   "바바라 할머니께 돌려드리기 전에 한 번만 더 보면 안 돼?"
  ],
  [
   "you",
   "조심해! 그렇게 잡으면…"
  ],
  [
   "narrator",
   "수정구슬이 손끝에서 미끄러졌다. 바닥에 닿은 구슬이 산산조각 났다."
  ],
  [
   "you",
   "수… 수정구슬이! 깨졌어."
  ],
  [
   "hina",
   "어떡하지? 수리할 수 있을까?"
  ],
  [
   "you",
   "사무엘 아저씨께 먼저 물어보자. 조각을 버리지 말고 챙겨."
  ]
 ],
 "joker": [
  [
   "joker",
   "우유 피부 마법이라… 그건 모든 것을 거울처럼 매끈하게 만드는 거울 마법과 머리털을 싹 없애 버리는 대머리 마법을 합치면 될 것 같당."
  ],
  [
   "you",
   "피부를 좋게 하는데 왜 대머리 마법이 필요한가요?"
  ],
  [
   "joker",
   "마법은 각 재료의 원소들을 조합해서 쓰는 거당. 서로 다른 성질이 합쳐져 하나의 마법을 이루지."
  ],
  [
   "joker",
   "첫째, 거울 마법의 핵심 원소인 투명한 거울의 원석이 필요하당. 이것은 난쟁이 광산의 깊은 곳에 있당."
  ],
  [
   "joker",
   "둘째, 대머리 독수리의 머리털이당. 구하기가 힘들 거당."
  ],
  [
   "joker",
   "셋째, 우유 성질 마법의 핵심 원소인 신선한 우유가 필요하당."
  ],
  [
   "hina",
   "대머리 독수리라면… 시바가 있잖아!"
  ]
 ],
 "baldi": [
  [
   "baldi",
   "투명거울 원석은 난쟁이 광산 안의 난쟁이 광산 갱도 안에 있다. 반짝거리는 거니까 찾기는 어렵지 않을 거야."
  ],
  [
   "you",
   "깊은 미로까지 가지 않아도 되나요?"
  ],
  [
   "baldi",
   "갱도에 들어서면 바닥과 광맥을 잘 살펴보게."
  ]
 ],
 "ore": [
  [
   "hina",
   "저기 봐. 저게 바로 투명거울 원석이 아닐까? 반짝반짝거린다."
  ],
  [
   "you",
   "맞는 것 같아. 깨지지 않게 조심히 담자."
  ],
  [
   "narrator",
   "갱도 입구 근처에서 맑고 투명한 원석을 챙겼다."
  ]
 ],
 "shiva": [
  [
   "shiva",
   "뭘 그렇게 둘이 쑥덕거리는 거지?"
  ],
  [
   "you",
   "히나, 시바님이 고개를 뒤로 돌릴 때 머리털을 가져가야 해. 나 혼자서는 힘들겠어."
  ],
  [
   "hina",
   "알았어. 시바, 저쪽에 가루다님이 부르시는 것 같은데?"
  ],
  [
   "narrator",
   "시바가 돌아보는 사이 두 사람은 머리털을 조심스럽게 챙겼다."
  ],
  [
   "shiva",
   "앗! 방금 뭘 한 거야?"
  ],
  [
   "you",
   "죄송해요! 꼭 필요한 마법 재료라서요."
  ]
 ]
};
 for(const row of rows)if(captured29[row.key])row.lines=captured29[row.key];
 Object.assign(rows.find(r=>r.key==="ore"),{pos:[400,480]});
 const c=m.register(29,'수정구슬 작전 1부 · 우유 피부 마법',rows,{milkSpellBrewing29:false});
 const items=x.questItems;x.questItems=s=>[...items(s),...(s.inv.mt_crystal29?[['수업용 수정구슬','가까운 미래를 비추는 오래된 구슬']]:[]),...(s.inv.mt_brokenCrystal29?[['깨진 수정구슬','큐리어스에게 수리를 맡기는 중']]:[]),...(s.inv.mt_mirrorOre29?[['투명한 거울의 원석','우유 피부 마법 재료']]:[]),...(s.inv.mt_eagleHair29?[['대머리 독수리 머리털','우유 피부 마법 재료']]:[]),...(s.inv.mt_milk29?[['신선한 우유','우유 피부 마법 재료']]:[])];
 x.encounters.curiousYard29={name:'큐리어스 저택 · 주변 몬스터',bg:'assets/maps-hires/curious-mansion.png',intro:'수정구슬 수리 조건으로 저택 주변 몬스터를 정리하세요.',next:c.keys.formula,xp:420,gold:145,sp:62,enemies:[{name:'마녀숲 늑대',element:2,hp:650,maxHp:650,atk:25,atb:5,sprite:'whiteWolf'},{name:'독이끼 나무인형',element:0,hp:620,maxHp:620,atk:24,atb:18,sprite:'woodDoll'}]};
 for(const [mood,lines]of Object.entries({surprised:['벌써 시간이 그렇게 됐어?','이게 무슨 미래지? 불량품은 아니겠지?','수정구슬 수리와 그건 별개 아닌가요?'],sad:['큰일 났어. 수리할 방법부터 찾아야 해!'],determined:['수정구슬을 고치려면 해내야 해!'],embarrassed:['미안해요. 수정구슬을 고치려면 꼭 필요해서…']}))for(const text of lines)ARPIA_HERO_ART.annotations.set(text,mood);
})();
