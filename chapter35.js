/* Original order: https://wonavy.tistory.com/229 (episode 35). */
(()=>{
 const x=ARPIA_EXTRA,m=ARPIA_MIDTERM,I='assets/items/';
 const item=(id,name,desc,path)=>ARPIA_DATA.ITEMS['mt_'+id]={name,desc,kind:'quest',price:0,sell:0,icon:path};
 item('fairyDust35','요정의 날개가루','스칼렛이 부탁한 레오나의 날개가루',I+'ghost_dust.png');
 item('peaceFlame35','평온의 불','파이티어 불꽃을 빌리기 위한 칼라마의 성화',I+'firewood.png');
 item('memorialKey35','파이티어 기념관 열쇠','세 불꽃 몬스터에게서 다시 모은 열쇠',I+'pendant.png');
 item('paitierFlame35','파이티어의 불꽃','꺼져 가는 학교 보일러를 살릴 태초의 불꽃',I+'scroll_firedragon.png');
 Object.assign(x.npcs,{buma35:{name:'부마'},billy35:{name:'빌리'},devileye35:{name:'데빌아이',artPath:'assets/devileye35.png',portraitPath:'assets/devileye35.png',height:125},peaceFlame35:{name:'평온의 불',artPath:'assets/peace-fire.png',height:58},boilerFlame35:{name:'꺼져 가는 보일러 불씨',artPath:'assets/peace-fire.png',height:58}});
 ARPIA_PORTRAITS.devileye35='assets/devileye35.png';
 const rows=[
  {key:'mina',title:'차가워진 건강센터',scene:'campus',npc:'mina',pos:[610,316],lines:[['mina','건강센터의 부마 아저씨가 널 찾고 있어. 온수가 나오지 않아 모두 곤란한가 봐.']]},
  {key:'buma',title:'멈춰 가는 학교 보일러',scene:'infirmary',npc:'buma35',pos:[500,360],fixture:true,lines:[['buma35','따뜻한 물이 끊겼어. 머피 영감이 보일러에 이상한 짓을 한 게 분명해.'],['you','먼저 보일러실에서 확인할게요.']]},
  {key:'murphy',title:'보일러실을 떠난 아이작',scene:'boiler',npc:'murphy',pos:[500,350],lines:[['murphy','화장실에서 돌아오니 아이작이 놀란 얼굴로 나가더구나. 그 뒤부터 불씨가 약해졌어.']]},
  {key:'show',title:'얼음 마을로 간 아이작',scene:'lobby',npc:'show',pos:[470,335],lines:[['show','아이작은 서둘러 얼음 마을로 갔어. 평소보다 얼굴이 하얗던데?'],['you','보일러 불씨와 관련된 것 같아. 따라가 볼게.']]},
  {key:'scarlet',title:'스칼렛의 조건',scene:'icevillage',npc:'scarlet',pos:[510,410],lines:[['scarlet','아이작이 어디 갔는지 알아. 대신 님펜의 레오나에게 요정 날개가루를 받아다 줘.']]},
  {key:'leona',title:'레오나의 날개가루',scene:'nymphen',npc:'leona',pos:[596,206],lines:[['leona','스칼렛이 또 부탁했군요. 흩날리지 않게 조심하세요.']],effect:s=>m.give(s,'fairyDust35')},
  {key:'scarletBack',title:'얼음 던전으로 숨다',scene:'icevillage',npc:'scarlet',pos:[510,410],lines:[['scarlet','아이작은 동상 아래 얼음 던전으로 들어갔어.']],effect:s=>m.take(s,'fairyDust35')},
  {key:'isaac',title:'호기심이 부른 사고',scene:'icedungeon',npc:'isaac',pos:[621,346],lines:[['isaac','따라오지 마! 그냥 혼자 있고 싶어.'],['you','보일러 불씨에 무슨 짓을 했는지 말해!'],['isaac','호기심에 얼음 마법을 썼을 뿐이야…']],battle:'isaacIce35'},
  {key:'schoolCold',title:'퇴학을 말하는 학생들',scene:'campus',npc:'mina',pos:[610,316],lines:[['mina','학교가 점점 추워져. 범인을 퇴학시켜야 한다는 말까지 나와.'],['you','아이작의 잘못은 나중에 이야기하고 먼저 불씨부터 살려야 해.']]},
  {key:'remedy',title:'파이티어 불꽃만이 살릴 수 있다',scene:'boiler',npc:'murphy',pos:[500,350],lines:[['murphy','오백 년 이어 온 불씨라 보통 불로는 못 살려. 파이티어의 불꽃이라면 가능하다.']]},
  {key:'sevrano',title:'평온의 불을 가져오라',scene:'firevillage',npc:'sevrano34',pos:[450,205],fixture:true,lines:[['sevrano34','파이티어의 불꽃은 귀중합니다. 칼라마의 평온의 불을 가져오면 빌려드릴지 생각해 보죠.']]},
  {key:'peace',title:'할라할라의 평온의 불',scene:'kalama31',npc:'halahala31',pos:[760,305],lines:[['halahala31','학교의 오래된 불씨를 살릴 일이라면 이 평온의 불을 내어드리겠습니다.']],effect:s=>m.give(s,'peaceFlame35')},
  {key:'emeryReturn',title:'다시 필요한 기념관 열쇠',scene:'firevillage',npc:'emery',pos:[295,255],lines:[['emery','평온의 불을 구해 왔구나. 기념관을 열려면 전에 나누어 두었던 열쇠 조각을 다시 모아야 한단다.'],['you','칼라마의 세 몬스터에게 가 볼게요.']],effect:s=>m.take(s,'peaceFlame35')},
  {key:'keyHunt',title:'열쇠의 이빨 · 파이어 골렘',scene:'kalama31',npc:'fireGolemKey35',pos:[1110,490],fixture:true,lines:[['you','파이어 골렘에게 첫 번째 열쇠 조각이 있어.']],battle:'fireGolemKey35'},
  {key:'scorpionKey',title:'열쇠의 몸통 · 화염 전갈',scene:'kalama31',npc:'fireScorpionKey35',pos:[1030,690],fixture:true,lines:[['you','이번에는 화염 전갈이야. 꼬리의 공격을 조심하자.']],battle:'fireScorpionKey35'},
  {key:'goblinKey',title:'열쇠의 고리 · 화염 고블린',scene:'kalama31',npc:'fireGoblinKey35',pos:[1320,310],fixture:true,lines:[['you','마지막 조각까지 모아야 기념관에 들어갈 수 있어.']],battle:'fireGoblinKey35'},
   {key:'firstLoss',title:'불꽃 마을 앞의 괴인',scene:'firevillage',npc:'devileye35',pos:[300,650],lines:[['devileye35','나는 데빌아이. 네가 모은 기념관 열쇠를 내놓아라.'],['you','누군지 모르겠지만 이 열쇠는 줄 수 없어!']],battle:'devileyeAmbush35'},
   {key:'memorialRaid',title:'사라진 파이티어의 불꽃',scene:'firevillage',npc:'sevrano34',pos:[450,205],fixture:true,lines:[['narrator','기념관 앞에는 세브라노가 쓰러져 있었고 파이티어 불꽃은 사라졌다.'],['you','데빌아이가 먼저 습격했어. 반드시 되찾아야 해.']]},
  {key:'emptyMemorial',title:'불꽃이 사라진 제단',scene:'paitierMemorial34',npc:'emptyAltar35',pos:[700,350],fixture:true,lines:[['narrator','기념관 안에는 불꽃이 있어야 할 자리가 비어 있었다.'],['you','정말 가져가 버렸어. 마을에서 데빌아이를 본 사람이 있는지 찾아보자.']]},
  {key:'billy',title:'광산으로 향한 수상한 일행',scene:'firevillage',npc:'billy35',pos:[397,466],fixture:true,lines:[['billy35','눈이 많은 괴인과 헝거가 난쟁이 광산 쪽으로 가는 걸 봤어.']]},
  {key:'baldi',title:'별문으로 들어간 데빌아이',scene:'mine',npc:'baldi',pos:[300,279],lines:[['baldi','괴인과 헝거가 기욤을 지나 옛 궁전의 별문 안으로 들어갔네.']]},
  {key:'palace',title:'다이아몬드 문 너머의 목소리',scene:'diamondRoom35',npc:'devileye35',pos:[650,320],lines:[['devileye35','이 불꽃을 금단의 서문 너머로 가져가 미노타우로스님께 바칠 것이다.'],['hunger','그 꼬마가 쫓아올지도 모른다.'],['you','둘이 여기 있었구나. 불꽃을 돌려줘!'],['devileye35','내 마흔네 번째 눈을 속일 수 있을 줄 알았느냐?']],battle:'devileyePalace35'},
   {key:'hungerTalk',title:'헝거가 남긴 경고',scene:'diamondRoom35',npc:'hunger',pos:[530,235],lines:[['hunger','데빌아이는 나보다 훨씬 강하다. 내 말을 듣지도 않는 녀석이지.'],['hunger','오늘은 더 공격하지 않겠다. 목숨부터 추슬러라.']]},
  {key:'allies',title:'아이작과 나오미의 합류',scene:'mine',npc:'naomi',pos:[430,320],lines:[['naomi','혼자 두 번이나 맞선 거니? 이제 아이작과 내가 함께하겠다.'],['isaac','보일러는 내 잘못이야. 불꽃을 꼭 되찾을게.']]},
  {key:'hunger',title:'늑대 도시의 기습',scene:'wolfcity31',npc:'hunger',pos:[970,230],lines:[['hunger','여기까지 쫓아오다니! 데빌아이는 이미 서문으로 갔다!'],['naomi','말만으로는 믿기 어렵군요. 움직이지 못하게 제압해요!']],battle:'hungerTrail35'},
  {key:'hungerClue',title:'서문 너머의 지하궁전 크노스',scene:'wolfcity31',npc:'hunger',pos:[970,230],lines:[['hunger','알았다! 데빌아이는 지하궁전 크노스로 돌아갈 것이다.'],['naomi','큐리어스 저택 위쪽의 금단의 서문이야. 아직 늦지 않았을 거야.'],['isaac','어서 따라가자!']],effect:s=>s.devileyeKnossosClue35=true},
  {key:'west',title:'금단의 서문 앞 데빌아이',scene:'westgate35',npc:'devileye35',pos:[790,230],lines:[['devileye35','세 명이 모여도 결과는 같다. 크노스의 문은 곧 열린다!'],['isaac','이번에는 혼자가 아니야. 눈이 빛나는 순서를 내가 알릴게!'],['naomi','{name}, 빈틈이 생기면 불꽃부터 회수하렴!']],battle:'devileyeFinal35'},
  {key:'boiler',title:'되살아난 오백 년의 불씨',scene:'boiler',npc:'boilerFlame35',pos:[600,330],fixture:true,lines:[['murphy','파이티어의 불꽃을 보일러 제단 가까이 대 보거라.'],['narrator','꺼져 가던 불씨가 황금빛으로 되살아나며 학교 벽에 온기가 번졌다.'],['you','다행이다. 완전히 꺼지기 전에 돌아왔어.']],effect:s=>s.boilerRestored35=true},
  {key:'returnFlame',title:'제자리로 돌아온 불꽃',scene:'paitierMemorial34',npc:'paitierFlame34',pos:[700,220],fixture:true,lines:[['sevrano34','불꽃을 되찾아 학교까지 살려 주셨군요. 다시 제단에 모시겠습니다.']],effect:s=>m.take(s,'paitierFlame35')},
  {key:'apology',title:'머피에게 사과한 부마',scene:'infirmary',npc:'buma35',pos:[500,360],fixture:true,lines:[['buma35','머피 영감이 망가뜨렸다고 단정해서 미안하군. 온수도 다시 잘 나와.'],['you','아이작도 잘못을 인정했어요. 모두 함께 고쳐서 다행이에요.']],effect:s=>s.paitierArcComplete35=true,reward:210,ending:'데빌아이에게 빼앗긴 파이티어의 불꽃을 서문 앞에서 되찾아 학교의 오백 년 보일러 불씨와 기념관을 모두 되살렸습니다.'}
 ];
 const captured35={
 "buma": [
  [
   "buma35",
   "온수가 나오지 않아 다들 떨고 있어. 보일러가 이상한 모양이야."
  ],
  [
   "you",
   "머피 아저씨께 원인을 물어볼게요."
  ],
  [
   "buma35",
   "아니라니까. 분명히 머피 영감의 짓이야. 흥."
  ],
  [
   "you",
   "아직 본 게 없잖아요. 먼저 확인하고 올게요."
  ]
 ],
 "murphy": [
  [
   "murphy",
   "잠깐 화장실에 다녀왔는데, 들어올 때 아이작이 놀란 눈을 하고 나가더구나. 생각해 보니 그 이후부터 불이 이상했던 것 같아."
  ],
  [
   "you",
   "장작이 부족한 게 아니었군요. 아이작에게 물어볼게요."
  ],
  [
   "murphy",
   "이 불은 아무 불이나 붙인다고 살아나는 게 아니야. 완전히 꺼지기 전에 서둘러야 한다."
  ]
 ],
 "scarletBack": [
  [
   "scarlet",
   "왔다. 말해 드려야죠. 아이작 그 사람은 얼음 던전으로 숨었다고."
  ],
  [
   "you",
   "보일러실을 나와서 여기까지 도망친 거였구나."
  ],
  [
   "scarlet",
   "가루는 잘 받았어요. 동상 아래로 내려가 보세요."
  ]
 ],
 "isaac": [
  [
   "isaac",
   "여기까지 어떻게 찾아왔어? 난 할 말 없어."
  ],
  [
   "you",
   "넌 보일러실의 머피 아저씨 집으로 잠숨어들었지. 자백해!"
  ],
  [
   "isaac",
   "얼음 마법이 얼마나 세졌는지 시험해 보려던 거야. 오래 타는 불이라 괜찮을 줄 알았어."
  ],
  [
   "you",
   "학교 전체가 추워지고 있어. 지금이라도 같이 돌아가자."
  ],
  [
   "isaac",
   "싫어! 다들 날 탓할 거라고!"
  ]
 ],
 "peace": [
  [
   "halahala31",
   "그 학교의 불씨가 꺼져 간다니 큰일이군요. 우리를 구해 주신 분들이 곤란하다면 도와드려야지요."
  ],
  [
   "you",
   "평온의 불을 가져가야 파이티어의 불꽃을 빌릴 수 있대요."
  ],
  [
   "halahala31",
   "자, 여기 있소. 길에서 꺼지지 않도록 잘 담아 두었습니다."
  ],
  [
   "you",
   "정말 감사합니다. 아이작과 함께 꼭 보일러를 살릴게요."
  ]
 ],
 "emeryReturn": [
  [
   "emery",
   "그럼, 저번처럼 파이티어 기념관의 열쇠를 찾아오시오. 불의 속성을 가진 몬스터들, 즉 파이어 골렘과 화염 고블린, 화염 전갈이 가지고 있소."
  ],
  [
   "you",
   "지난번에 썼던 열쇠가 다시 흩어졌군요. 이번에는 헤매지 않고 찾아올게요."
  ],
  [
   "isaac",
   "내가 만든 사고야. 열쇠를 찾는 것도 나눠서 하자."
  ]
 ],
 "firstLoss": [
  [
   "narrator",
   "불꽃 마을 앞에서 수많은 눈이 달린 괴인이 길을 막았다."
  ],
  [
   "devileye35",
   "이 녀석들, 이쪽을 봐라."
  ],
  [
   "you",
   "누구지? 눈을 마주치지 마, 아이작!"
  ],
  [
   "devileye35",
   "하찮은 생명들. 나는 너희를 없애 버릴 수 있다. 잠깐 놀아 주지."
  ],
  [
   "isaac",
   "열쇠를 노리는 거야? 피할 틈이 없어!"
  ]
 ],
 "memorialRaid": [
  [
   "sevrano34",
   "으윽… 어떻게 된 거냐. 이상한 녀석이 와서는 날 쓰러뜨린 뒤 파이티어 기념관으로 들어갔어."
  ],
  [
   "you",
   "우리 열쇠도 빼앗겼어요. 아직 안에 있나요?"
  ],
  [
   "sevrano34",
   "모르겠구나. 안쪽에서 아무 소리도 들리지 않아."
  ],
  [
   "isaac",
   "불꽃부터 확인하자!"
  ]
 ],
 "emptyMemorial": [
  [
   "narrator",
   "빈 제단 위에는 불꽃이 사라진 흔적만 남아 있었다."
  ],
  [
   "you",
   "앗! 파이티어의 불꽃이 없어. 이미 데빌아이도 사라지고 말았어."
  ],
  [
   "isaac",
   "보일러를 살릴 유일한 불꽃인데… 내 탓에 이렇게 됐어."
  ],
  [
   "you",
   "아직 포기할 때는 아니야. 마을에서 간 방향을 물어보자."
  ]
 ],
 "billy": [
  [
   "billy35",
   "생각만 해도 소름이 돋지만, 난쟁이 광산 쪽으로 향하는 걸 봤어. 분명히 그쪽으로 간 것이 틀림없어."
  ],
  [
   "you",
   "헝거도 함께였나요?"
  ],
  [
   "billy35",
   "그래. 수상한 녀석들이었어. 따라가려거든 조심해."
  ]
 ],
 "palace": [
  [
   "narrator",
   "다이아몬드 문 안에서 데빌아이와 헝거의 목소리가 들렸다. 두 사람은 벽 뒤에 몸을 숨겼다."
  ],
  [
   "devileye35",
   "크으으으. 이렇게 쉽게 파이티어의 불꽃을 손에 넣다니. 이걸 가지고 지하궁전 크노스로 돌아간다면 나의 대왕님 미노타우로스가 무척이나 좋아하겠어."
  ],
  [
   "hunger",
   "미노타우로스! 그 악랄한 악마."
  ],
  [
   "devileye35",
   "잠깐만. 내 마흔네 번째 눈에 누군가가 보인다."
  ],
  [
   "you",
   "들켰어! 아이작, 뒤로 물러서!"
  ],
  [
   "devileye35",
   "또 네놈들이냐. 이번에도 무사할 줄 알았느냐?"
  ]
 ],
 "hungerTalk": [
  [
   "hunger",
   "그 데빌아이가 누구인지 아느냐. 지하궁전 크노스의 대마왕 미노타우로스의 부하이지."
  ],
  [
   "you",
   "그런 자가 불꽃을 가져가게 둘 수는 없어…"
  ],
  [
   "hunger",
   "넌 지금 제대로 서 있지도 못하는군. 오늘은 더 공격하지 않겠다."
  ],
  [
   "narrator",
   "헝거가 떠난 뒤에야 두 사람은 벽을 짚고 일어섰다."
  ],
  [
   "isaac",
   "이번엔 선생님께 도움을 청하자. 혼자서는 안 돼."
  ]
 ],
 "allies": [
  [
   "naomi",
   "다쳤구나. 우선 숨부터 고르렴. 두 번이나 그 괴인에게 맞섰다니."
  ],
  [
   "isaac",
   "보일러는 제가 망가뜨렸어요. 바로 말씀드렸어야 했는데…"
  ],
  [
   "naomi",
   "책임지는 건 혼자 모든 일을 떠안는다는 뜻이 아니야. 이제부터 함께 해결하자."
  ],
  [
   "you",
   "나오미 선생님, 어서 늑대의 도시로 가요."
  ],
  [
   "naomi",
   "그래. 움직일 수 있겠니? 내가 곁에서 지켜 주마."
  ]
 ],
 "hungerClue": [
  [
   "hunger",
   "데빌아이는 자기가 출발한 곳, 즉 지하궁전 크노스로 돌아가려 하고 있다."
  ],
  [
   "naomi",
   "그건 내가 알아. 지하궁전 크노스는 큐리어스 저택 위쪽에 있는 금단의 서문 지역이야. 분명히 그리로 갔을 거야."
  ],
  [
   "you",
   "서문을 넘기 전에 붙잡아야겠어요."
  ],
  [
   "isaac",
   "이번에는 다 같이야. 불꽃을 되찾자!"
  ]
 ]
};
 for(const row of rows)if(captured35[row.key])row.lines=captured35[row.key];
 const c=m.register(35,'파이티어의 불꽃 · 보일러를 살려라',rows,{devileyeKeyStolen35:false,devileyeKnossosClue35:false,boilerRestored35:false,paitierArcComplete35:false});
 x.map.push(['westgate35','금단의 서문',[170,530]]);
 x.scenes.westgate35=(s,n,p)=>({id:'westgate35',name:'큐리어스 저택 북쪽 · 금단의 서문',bg:'assets/maps-hires/forest-battle.png',w:1000,h:658,zoom:1.08,tint:'#260b3544',nodes:[[170,530],[285,490],[400,445],[520,390],[640,330],[790,230],[850,300]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[3,6]],entities:[p('back','큐리어스 저택',170,530,'curiousmansion',[470,370])]});
 const items=x.questItems;x.questItems=s=>[...items(s),...(s.inv.mt_fairyDust35?[['요정의 날개가루','스칼렛에게 가져갈 가루']]:[]),...(s.inv.mt_peaceFlame35?[['평온의 불','기념관 불꽃을 빌리기 위한 성화']]:[]),...(s.inv.mt_memorialKey35?[['기념관 열쇠','다시 모은 세 불꽃 마력']]:[]),...(s.inv.mt_paitierFlame35?[['파이티어의 불꽃','학교 보일러를 살릴 태초의 불꽃']]:[])];
 const mon=(name,hp,atk,art='assets/flame-soldier.png')=>({name,element:0,hp,maxHp:hp,atk,atb:10,artPath:art,height:145});
 x.encounters.isaacIce35={name:'얼음 던전 · 아이작',bg:'assets/maps-hires/forest-battle.png',intro:'아이작을 진정시키고 사고를 확인하세요.',next:c.keys.schoolCold,xp:500,gold:0,sp:80,enemies:[{name:'아이작',element:1,hp:1180,maxHp:1180,atk:28,atb:8,npc:'isaac',height:155}]};
 x.encounters.hungerTrail35={name:'늑대의 도시 · 헝거 추격전',bg:'assets/chapter31/wolf-city.png',intro:'동료들과 헝거를 제압하세요.',next:c.keys.hungerClue,xp:640,gold:240,sp:96,enemies:[{name:'헝거',element:1,hp:1760,maxHp:1760,atk:30,atb:12,artPath:'assets/original/character/other/헝거.png',height:180}]};
 x.encounters.devileyeFinal35={name:'금단의 서문 · 데빌아이',bg:'assets/maps-hires/forest-battle.png',intro:'아이작이 점멸을 읽고 나오미가 방어하는 동안 빈틈을 노리세요.',next:c.keys.boiler,xp:760,gold:300,sp:115,onWin:s=>m.give(s,'paitierFlame35'),enemies:[{name:'데빌아이',element:3,hp:2500,maxHp:2500,atk:34,atb:10,artPath:'assets/devileye35.png',height:210}]};
 for(const [mood,lines]of Object.entries({determined:['아이작의 잘못은 나중에 이야기하고 먼저 불씨부터 살려야 해.','헝거보다 강한 마력… 그래도 넘길 수 없어!','그 불꽃을 돌려줘!'],happy:['다행이다. 완전히 꺼지기 전에 돌아왔어.']}))for(const text of lines)ARPIA_HERO_ART.annotations.set(text,mood);
})();
