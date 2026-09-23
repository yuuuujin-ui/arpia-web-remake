/* Original event order: https://wonavy.tistory.com/217 (episode 27).
   Dialogue, item presentation and battle balance are reconstructed. */
(()=>{
 const x=ARPIA_EXTRA,m=ARPIA_MIDTERM,icon='assets/midterm/';
 const item=(id,name,desc,path)=>ARPIA_DATA.ITEMS['mt_'+id]={name,desc,kind:'quest',price:0,sell:0,icon:path};
 item('wand27','에스타의 주문 지팡이','사무엘에게 받아 에스타 선생님께 전할 주문품','assets/art-revision/items/staff.png');
 item('tax27','얼음 마을 세금 50,000핀','떠돌이 용병에게서 되찾은 데런 왕국의 세금',icon+'certificate.png');
 item('gold27','되찾은 금덩이','좀비 세자매가 가져간 기욤의 금덩이','assets/items/goldnugget.png');
 item('letter27','쟈칼의 편지','도비엘을 찾으러 떠난다는 쟈칼의 편지',icon+'diary25.png');
 item('paper27','아르피아 신문 창간호','마틸다와 함께 완성한 다섯 가지 인터뷰 기사',icon+'certificate.png');
 Object.assign(x.npcs,{jackalLetter27:{name:'쟈칼의 편지',artPath:icon+'diary25.png',height:34},newspaper27:{name:'완성된 아르피아 신문',artPath:icon+'certificate.png',height:40}});
 const rows=[
  {key:'kesno',title:'마틸다를 찾는 케스노',scene:'campus',npc:'kesno',pos:[747,500],lines:[['kesno','혹시 또 선생님께 혼날까 걱정했어? 이번에는 네가 아니라 마틸다를 찾고 있어.'],['kesno','마틸다가 콜로세움에서 널 기다리더라.'],['you','무슨 일을 꾸미는지 가 봐야겠어.']]},
  {key:'recruit',title:'아르피아 신문의 기자',scene:'arena',npc:'matilda',pos:[710,375],lines:[['matilda','좋아, 지금부터 넌 아르피아 신문의 기자야! 내가 편집을 맡을 테니 넌 특종을 찾아와.'],['you','잠깐, 제가 왜 기자가 된 거예요?'],['matilda','화장실에 있는 아이작에게 물어보면 알게 될걸?']]},
  {key:'isaac',title:'개구리와 기자 자리',scene:'bathroom',npc:'isaac',pos:[320,310],lines:[['isaac','나도 하기 싫다고 했지. 그랬더니 마틸다가 내가 개구리를 던진 걸 선생님께 말해 버렸어.'],['you','그러면 난 거절하면 어떻게 되는 거야?'],['isaac','줄리아 선생님께 가 보면 알겠지. 행운을 빌어!']]},
  {key:'julia',title:'기자 임명을 축하해요',scene:'classroom',npc:'julia',pos:[530,185],lines:[['julia','아르피아 신문 기자가 되었다면서? 축하해.'],['julia','참, 개구리를 던진 학생은 화장실 청소를 맡게 됐단다.'],['you','생각해 보니 기자 일이 아주 재미있을 것 같아요!']]},
  {key:'editor',title:'다섯 개의 인터뷰 기사',scene:'arena',npc:'matilda',pos:[710,375],lines:[['matilda','태도가 빨리 바뀌었네. 우리는 웨일라를 돌며 인터뷰 기사 다섯 개를 모을 거야.'],['matilda','먼저 도서관의 멜리 언니에게 기삿거리를 물어봐. 편집은 내가 할게.']]},
  {key:'meli',title:'상점가의 알리고 싶은 일',scene:'library',npc:'meli',pos:[455,225],lines:[['meli','가구점의 버비 아저씨가 모두에게 알리고 싶은 일이 있다고 했어요. 상점가에 가 보세요.']]},
  {key:'bubby',title:'가구점 바겐세일',scene:'shop',npc:'bubby',pos:[291,365],lines:[['bubby','이달의 가구 바겐세일이오! 꼭 신문 첫 면에 크게 써 주시오.'],['you','인터뷰라기보다 광고 같은데… 일단 기록해 둘게요.']]},
  {key:'samuel',title:'마법 도구점 바겐세일',scene:'shop',npc:'sam',pos:[485,265],lines:[['sam','우리 마법 도구점도 바겐세일 중이야. 그리고 에스타 선생님이 주문한 지팡이를 전해 주겠니?'],['you','신문 메모와 지팡이, 둘 다 챙길게요.']],effect:s=>m.give(s,'wand27')},
  {key:'abdullah',title:'필요 없는 물건 삽니다',scene:'judah',npc:'abdullah',pos:[245,130],lines:[['abdullah','쓰지 않는 물건이 있다면 내게 파시오. 좋은 값은 물건을 보고 정하겠소.'],['you','이것도 광고에 더 가까운 것 같은데요.']]},
  {key:'esta',title:'광고가 아닌 기사',scene:'classroom',npc:'esta',pos:[790,225],lines:[['esta','지팡이는 잘 받았다. 그런데 지금까지 모은 것은 전부 광고에 가깝구나.'],['esta','아수리아 왕국이 평화와 번영을 누리는 비법처럼, 사람들이 정말 궁금해할 것을 물어보렴.']],effect:s=>m.take(s,'wand27')},
  {key:'asuriaKing',title:'아수리아 번영의 비법',scene:'asuria',npc:'kingAsuria',pos:[650,283],lines:[['kingAsuria','비법은 간단하오. 카디쟈에게 맡기면 모든 것이 이루어지지.'],['you','그게 기사 한 줄의 전부인가요?'],['kingAsuria','짧지만 진실이라오.']]},
  {key:'cardia',title:'바다와 상업 우대 정책',scene:'cardiahome',npc:'cardia',pos:[579,299],lines:[['cardia','인터뷰는 사양하겠습니다.'],['you','무함마드 알리 4세께서는 이미 답해 주셨어요.'],['cardia','그렇다면 말씀드리죠. 바다를 낀 왕국의 장점을 살려 상업을 우대하는 것이 핵심입니다.']]},
  {key:'edward',title:'얼음 마을의 공무',scene:'kingdom',npc:'edward',pos:[342,304],lines:[['edward','인터뷰 전에 얼음 마을의 세금 문제를 확인하러 가야 합니다.'],['matilda','그 일은 우리가 대신 다녀올게. 에드워드 경은 여기서 인터뷰해 줘!'],['you','험프리 촌장님께 상황을 듣고 올게요.']]},
  {key:'humphrey',title:'도둑맞은 세금',scene:'icevillage',npc:'humphrey',pos:[397,466],lines:[['humphrey','데런 왕국에 낼 세금 50,000핀을 떠돌이 용병이 훔쳐 달아났네. 마을 밖 길을 찾아보게.']]},
  {key:'mercenary',title:'얼음 길의 떠돌이 용병',scene:'icevillage',npc:'mercenary21',pos:[610,355],lines:[['mercenary21','이 돈은 이제 내 것이다. 돌려받고 싶다면 힘으로 가져가라!'],['you','마을 사람들이 모은 세금이에요. 반드시 돌려받겠어요.']],battle:'taxMercenary27'},
  {key:'taxReturn',title:'되찾은 50,000핀',scene:'kingdom',npc:'edward',pos:[342,304],lines:[['edward','세금을 무사히 되찾아 주셔서 감사합니다. 마틸다 공주님께 제 인터뷰도 마쳤습니다.'],['matilda','에드워드 경 몸짱의 비결은 매일 검을 백 번 휘두르는 거래!'],['edward','기사가 사실인지 확인하려면 한 번 대련해 보시겠습니까?']],effect:s=>m.take(s,'tax27')},
  {key:'edwardDuel',title:'기사와 기자의 대련',scene:'royalarena',npc:'edward',pos:[535,402],lines:[['edward','정정당당히 겨루겠습니다. 인터뷰에 쓸 만큼 멋진 승부를 보여 주시지요.'],['you','이번에도 최선을 다할게요!']],battle:'edward27'},
  {key:'guillaumeIdea',title:'기욤의 사연을 취재하자',scene:'kingdom',npc:'matilda',pos:[546,590],lines:[['matilda','다음은 난쟁이 광산의 기욤이야. 어쩌다 그곳에서 살게 됐는지 궁금하지 않아?'],['you','이번에도 금덩이를 요구할 것 같은 예감이 들어.']]},
  {key:'guillaume',title:'좀비 세자매가 훔친 금',scene:'minedepths',npc:'guillaume',pos:[650,270],lines:[['guillaume','인터뷰도 공짜는 아니지. 좀비 세자매가 훔쳐 간 금덩이 세 개를 찾아오게.'],['matilda','나는 여기서 인터뷰를 시작할 테니 넌 안쪽 방을 살펴봐!']]},
  {key:'zombies',title:'금덩이를 가진 세 자매',scene:'molemaze26',npc:'zombieSisters',pos:[805,300],lines:[['narrator','광산 안쪽 방에서 좀비 세자매가 금덩이 자루를 둘러싸고 있었다.'],['you','기욤의 금덩이를 돌려줘!']],battle:'zombieNews27'},
  {key:'goldBack',title:'기욤의 광산 이야기',scene:'minedepths',npc:'guillaume',pos:[650,270],lines:[['guillaume','세 개 모두 되찾았군. 난 태어날 때부터 고아라 이 광산에서 자랐네. 이곳이 집이자 가족이지.'],['matilda','좋아, 이건 제법 사람 냄새 나는 기사가 되겠어.'],['you','금덩이도 돌려드릴게요.']],effect:s=>m.take(s,'gold27',3)},
  {key:'waterfall',title:'텅 빈 쟈칼의 폭포',scene:'waterfall',npc:'dobiel',pos:[305,374],lines:[['narrator','늘 먼저 반겨 주던 도비엘도, 동굴 안의 쟈칼도 보이지 않았다.'],['matilda','이건 정말 특종일지도 몰라. 안쪽을 더 살펴보자.']]},
  {key:'letter',title:'쟈칼이 남긴 편지',scene:'waterfall',npc:'jackalLetter27',pos:[488,149],fixture:true,lines:[['narrator','쟈칼은 사라진 도비엘을 찾으러 떠난다는 편지를 남겼다.'],['you','특종보다 두 분의 안전이 먼저야. 에스타 선생님께 알려야 해.']],effect:s=>m.give(s,'letter27')},
  {key:'report',title:'사라진 현자의 소식',scene:'classroom',npc:'esta',pos:[790,225],lines:[['you','쟈칼님과 도비엘이 모두 사라졌어요. 이 편지만 남아 있었어요.'],['esta','웨일라의 현자가 자리를 비운 일은 가볍게 볼 수 없구나. 내가 알아보마. 마틸다는 어디 있니?'],['you','신문을 완성하러 복사실에 갔어요.']],effect:s=>m.take(s,'letter27')},
  {key:'press',title:'아르피아 신문 창간호',scene:'copyroom27',npc:'newspaper27',pos:[455,225],fixture:true,lines:[['matilda','광고 세 개, 왕국의 정책, 에드워드 경과 기욤의 인터뷰, 그리고 쟈칼 실종 속보까지!'],['you','처음보다 훨씬 신문 같아졌네.'],['matilda','이제 인쇄한 신문을 여러 곳에 돌리고 올게!']],effect:s=>{m.give(s,'paper27');s.newspaperFirstIssue27=true;},reward:100,ending:'마틸다와 웨일라를 돌며 인터뷰와 속보를 모아 아르피아 신문 창간호를 완성했습니다.'}
 ];
 const captured27={
 "abdullah": [
  [
   "abdullah",
   "우수 고객만을 위한 가격이지요. 좋은 물건을 싼 값에 사는 거지요."
  ],
  [
   "you",
   "필요 없는 물건도 사 주신다고요? 그것도 적어 둘게요."
  ],
  [
   "matilda",
   "가구점에 도구점, 이번엔 항구 상인이네. 메모가 꽤 모였어."
  ]
 ],
 "esta": [
  [
   "esta",
   "지팡이는 잘 받았다. 그런데 이것을 기사라고 가져온 거니?"
  ],
  [
   "you",
   "가게 주인들을 만나서 직접 들은 말인데요."
  ],
  [
   "esta",
   "물건을 팔기 위한 홍보 글이잖니. 사람을 만났다고 모두 인터뷰 기사가 되는 것은 아니란다."
  ],
  [
   "matilda",
   "그럼 처음부터 다시 취재하라는 말씀이세요?"
  ],
  [
   "esta",
   "아수리아 왕국이 번영하는 까닭처럼, 독자가 궁금해할 일을 물어보렴."
  ]
 ],
 "cardia": [
  [
   "cardia",
   "인터뷰는 사양하겠습니다."
  ],
  [
   "you",
   "무함마드 알리 4세께서는 카디쟈님께 맡기는 것이 번영의 비법이라고 하셨어요."
  ],
  [
   "cardia",
   "그렇다면 말씀드리죠. 바다를 낀 왕국의 장점을 살려 상업을 우대하는 것이 핵심입니다."
  ],
  [
   "matilda",
   "제목은 “상업이 부흥해야 나라도 부흥”으로 정할게!"
  ],
  [
   "you",
   "그냥 하신 말씀을 옮겨 적는 것과는 조금 다른 것 같은데… 이게 맞는 건지 모르겠다."
  ]
 ],
 "edward": [
  [
   "edward",
   "인터뷰 전에 얼음 마을의 세금 문제를 확인하러 가야 합니다."
  ],
  [
   "matilda",
   "그 일은 우리가 대신 다녀올게. 에드워드 경은 여기서 인터뷰해 줘!"
  ],
  [
   "you",
   "우리가 간다면서 공주님은 여기 남는 거예요?"
  ],
  [
   "matilda",
   "누군가는 인터뷰를 해야 하잖아. 험프리 촌장님께 다녀와!"
  ]
 ],
 "mercenary": [
  [
   "mercenary21",
   "내가 얼음 마을의 세금을 데런 왕국으로 수송하는 걸 맡기로 했다. 어서 내놔라!"
  ],
  [
   "you",
   "그럴듯한 말로 세금을 가져간 게 당신이군요. 촌장님께 확인하고 왔어요."
  ],
  [
   "mercenary21",
   "이미 늦었다. 이 돈은 내 것이다!"
  ],
  [
   "you",
   "마을 사람들이 모은 돈이에요. 돌려주세요!"
  ]
 ],
 "taxReturn": [
  [
   "edward",
   "세금을 무사히 되찾아 주셔서 감사합니다. 마틸다 공주님께 제 인터뷰도 마쳤습니다."
  ],
  [
   "matilda",
   "“하루 백 번씩 무식하게 칼 휘두르면 몸짱 돼!” 에드워드 경 몸짱 비결 공개!"
  ],
  [
   "you",
   "우왓, 뭘 그깟 일로 폼 잡아요. 나에게는 구리한 일도 시켰으면서."
  ],
  [
   "edward",
   "그렇다면 직접 검을 맞대 보시겠습니까? 대련으로 확인하는 편이 빠르겠군요."
  ]
 ],
 "guillaume": [
  [
   "guillaume",
   "인터뷰도 공짜는 아니지. 좀비 세자매가 훔쳐 간 금덩이 세 개를 찾아오게."
  ],
  [
   "matilda",
   "들었지? 좀비 세자매의 방은 우리가 지난 난쟁이 광산 안에 있다는 거 잊지 말고."
  ],
  [
   "you",
   "이번에도 저 혼자 다녀오라고요?"
  ],
  [
   "matilda",
   "인터뷰 중이잖아."
  ]
 ],
 "goldBack": [
  [
   "you",
   "금덩이 세 개, 여기 있어요. 이제 인터뷰를 시작하면 되나요?"
  ],
  [
   "guillaume",
   "난 태어날 때부터 고아라 이 광산에서 자랐네. 이곳이 집이자 가족이지."
  ],
  [
   "matilda",
   "응, 됐어. “인생은 금덩이 세 개!”로 제목을 붙이면 되겠다."
  ],
  [
   "you",
   "제가 돌아오기 전에 다 들으신 거예요?"
  ],
  [
   "matilda",
   "너는 금을 찾고 나는 취재를 했잖아. 자, 다음 장소로 가자."
  ]
 ],
 "press": [
  [
   "matilda",
   "왕국의 정책, 에드워드 경과 기욤의 인터뷰, 그리고 쟈칼 실종 소식까지! 이제 인쇄할 수 있어."
  ],
  [
   "you",
   "가게 홍보 메모는요?"
  ],
  [
   "matilda",
   "그건 기사에서 뺐어. 에스타 선생님께 또 혼날 수는 없잖아."
  ],
  [
   "you",
   "신문을 읽고 두 분에 관한 단서를 아는 사람이 찾아오면 좋겠다."
  ],
  [
   "matilda",
   "인쇄한 신문을 여러 곳에 돌리고 올게!"
  ]
 ]
};
 for(const row of rows)if(captured27[row.key])row.lines=captured27[row.key];
 const c=m.register(27,'아르피아 신문 만들기 · 특종을 잡아라',rows,{newspaperFirstIssue27:false});
 x.scenes.copyroom27=(s,n,p)=>({id:'copyroom27',name:'마법학교 · 신문 복사실',bg:'assets/maps-hires/library.png',w:559,h:431,zoom:1.42,tint:'#e7c98518',nodes:[[275,390],[205,360],[125,330],[215,260],[285,300],[365,335],[455,225]],edges:[[0,1],[1,2],[1,3],[3,4],[4,5],[5,6]],entities:[p('back','학교 2층',275,390,'classroom',[935,260])]});
 const decorate=x.decorate;x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);if(sc.id==='classroom'&&s.stage>=c.keys.press&&!sc.entities.some(e=>e.id==='copyroom27'))sc.entities.push(p('copyroom27','신문 복사실',935,260,'copyroom27',[275,390]));};
 const items=x.questItems;x.questItems=s=>[...items(s),...(s.inv.mt_wand27?[['에스타의 주문 지팡이','사무엘에게 받아 전달 중']]:[]),...(s.inv.mt_tax27?[['얼음 마을 세금','되찾은 50,000핀']]:[]),...(s.inv.mt_gold27?[['기욤의 금덩이',`${s.inv.mt_gold27}/3개`]]:[]),...(s.inv.mt_letter27?[['쟈칼의 편지','사라진 도비엘을 찾으러 떠났다는 내용']]:[]),...(s.inv.mt_paper27?[['아르피아 신문 창간호','마틸다와 완성한 첫 신문']]:[])];
 x.encounters.taxMercenary27={name:'얼음 길 · 세금 도둑',bg:'assets/maps-hires/ice-village.png',intro:'험프리 촌장이 맡긴 50,000핀을 되찾으세요.',next:c.keys.taxReturn,xp:310,gold:80,sp:45,enemies:[{name:'떠돌이 용병',element:0,hp:1050,maxHp:1050,atk:27,atb:8,artPath:'assets/midterm/mercenary21.png',height:165}],onWin:s=>m.give(s,'tax27')};
 x.encounters.edward27={name:'신문 인터뷰 · 에드워드 경',bg:'assets/maps-hires/colosseum.png',intro:'검을 백 번 휘두르는 기사의 실력을 다시 확인합니다.',next:c.keys.guillaumeIdea,xp:330,gold:130,sp:55,enemies:[{name:'에드워드 경',element:0,hp:1120,maxHp:1120,atk:28,atb:20,npc:'edward',height:155}]};
 x.encounters.zombieNews27={name:'광산 안쪽 방 · 좀비 세자매',bg:'assets/dwarf-mine-depths.png',intro:'기욤의 금덩이 세 개를 되찾으세요.',next:c.keys.goldBack,xp:350,gold:105,sp:52,enemies:[{name:'좀비 첫째',element:2,hp:420,maxHp:420,atk:23,atb:0,npc:'zombieSisters'},{name:'좀비 둘째',element:2,hp:390,maxHp:390,atk:22,atb:12,npc:'zombieSisters'},{name:'좀비 셋째',element:2,hp:360,maxHp:360,atk:21,atb:24,npc:'zombieSisters'}],onWin:s=>m.give(s,'gold27',3)};
 for(const [mood,lines]of Object.entries({surprised:['잠깐, 제가 왜 기자가 된 거예요?','그게 기사 한 줄의 전부인가요?'],embarrassed:['생각해 보니 기자 일이 아주 재미있을 것 같아요!'],determined:['마을 사람들이 모은 세금이에요. 반드시 돌려받겠어요.','특종보다 두 분의 안전이 먼저야. 에스타 선생님께 알려야 해.'],happy:['처음보다 훨씬 신문 같아졌네.']}))for(const text of lines)ARPIA_HERO_ART.annotations.set(text,mood);
})();
