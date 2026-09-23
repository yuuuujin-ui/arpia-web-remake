/* Original event order: https://wonavy.tistory.com/229 (episode 34).
   Dialogue, field tasks and the memorial are reconstructed. */
(()=>{
 const x=ARPIA_EXTRA,m=ARPIA_MIDTERM,icon='assets/items/';
 const item=(id,name,desc,path)=>ARPIA_DATA.ITEMS['mt_'+id]={name,desc,kind:'quest',price:0,sell:0,icon:path};
 item('flareShard34','라이징 플레어 조각','큐리어스가 보관하던 불꽃 마법의 조각',icon+'scroll_fireburst.png');
 item('lavaLadle34','용암 국자','발디에게 빌린 내열 국자',icon+'staff.png');
 item('lavaSample34','불꽃 마을의 용암','파이티어의 주문을 시험할 용암',icon+'firewood.png');
 item('fireKey34','파이티어 기념관 열쇠','세 불꽃 몬스터의 마력이 합쳐진 열쇠',icon+'pendant.png');
 Object.assign(x.npcs,{
  dungeonPomegranate34:{name:'던전 석류',artPath:icon+'grape.png',height:38},lava34:{name:'마을의 용암',artPath:'assets/peace-fire.png',height:54},
  sevrano34:{name:'세브라노'},memorialKey34:{name:'기념관의 마법 자물쇠',artPath:icon+'pendant.png',height:42},
  paitierFlame34:{name:'파이티어의 불꽃',artPath:'assets/peace-fire.png',height:92}
 });
 const rows=[
  {key:'show',title:'쇼우가 전한 보충 수업',scene:'lobby',npc:'show',pos:[470,335],lines:[['show','줄리아 선생님이 찾으셔. 예전에 수업을 빠진 일 때문에 보충 수업을 받아야 한대.'],['you','태양의 보석을 찾던 때였지. 이번에는 빠지지 않을게.']]},
  {key:'julia',title:'에스타 선생님의 불꽃 마법 수업',scene:'classroom',npc:'julia',pos:[530,185],lines:[['julia','태양의 보석 사건 때 놓친 불꽃 마법 수업을 보충해야 한단다. 아이작도 함께 들어야 해.'],['julia','먼저 아이작을 찾아 에스타 선생님께 가렴.']]},
  {key:'kesno',title:'지하로 내려간 아이작',scene:'lobby',npc:'kesno',pos:[530,335],lines:[['kesno','아이작이라면 학교 지하로 내려가는 걸 봤어. 비밀 통로를 또 찾은 건 아니겠지?'],['you','지하 창고부터 확인해 볼게.']]},
  {key:'isaac',title:'던전 석류를 나눠 먹다',scene:'basement',npc:'isaac',pos:[520,340],lines:[['isaac','비밀 통로가 아니라 던전 석류를 먹으러 왔어. 이것만 먹고 보충 수업에 가자.'],['narrator','두 사람은 새콤한 석류를 나눠 먹고 서둘러 교실로 올라갔다.']]},
  {key:'lesson',title:'불꽃 마법의 창시자 파이티어',scene:'classroom',npc:'esta',pos:[790,225],fixture:true,lines:[['esta','오늘 배울 인물은 불꽃 마법의 시초를 연 파이티어다.'],['esta','더 오래된 이야기는 마법사의 도시 글루글루에게 직접 들어 보렴.']]},
  {key:'gluglu',title:'용암에서 건져 낸 최초의 불씨',scene:'magecity',npc:'gluglu',pos:[450,324],lines:[['gluglu','땅과 하늘의 경계가 모호하던 시절, 파이티어는 용암에서 불꽃을 건져 냈다네.'],['gluglu','작은 불씨에 마법의 문장을 새겨 불꽃 마법을 시작했지. 큐리어스가 라이징 플레어 조각을 보관하고 있다네.']]},
  {key:'curious',title:'한 사람에게만 주는 마법 조각',scene:'curiousmansion',npc:'curious',pos:[260,132],lines:[['curious','라이징 플레어 조각은 하나뿐이야. 너와 아이작 중 이긴 사람에게만 주지.'],['isaac','이번에는 꼭 내가 가져갈 거야!'],['you','콜로세움에서 정정당당하게 정하자.']]},
  {key:'duel',title:'아이작과의 라이징 플레어 대결',scene:'arena',npc:'isaac',pos:[535,402],lines:[['isaac','불꽃 마법이라면 나도 자신 있어. 봐주지 않을 거야!'],['you','나도 최선을 다할게. 시작하자!']],battle:'flareDuel34'},
  {key:'shard',title:'라이징 플레어 조각을 얻다',scene:'curiousmansion',npc:'curious',pos:[260,132],lines:[['curious','약속대로 이긴 네 몫이다. 조각의 불꽃을 함부로 깨우지는 마.'],['you','파이티어의 마법을 배우는 데 사용하겠습니다.']],effect:s=>m.give(s,'flareShard34')},
  {key:'theory',title:'용암에서 직접 확인할 문장',scene:'magecity',npc:'gluglu',pos:[450,324],lines:[['gluglu','조각의 문장은 진짜 용암 앞에서만 완전히 읽을 수 있다네.'],['esta','그럼 불꽃 마을로 가서 파이티어가 했던 방식을 직접 확인해 보자.']]},
  {key:'delphin',title:'광산에 있는 용암 국자',scene:'firevillage',npc:'delphin',pos:[260,440],lines:[['delphin','용암을 뜰 국자는 난쟁이 광산의 발디가 가져갔어. 맨손으로는 절대 가까이 가지 마.']]},
  {key:'baldi',title:'발디가 빌려준 내열 국자',scene:'mine',npc:'baldi',pos:[300,279],lines:[['baldi','파이티어의 수업이라면 이 내열 국자를 빌려주지. 용암을 담고 오래 들고 있지는 말게.']],effect:s=>m.give(s,'lavaLadle34')},
  {key:'lava',title:'불꽃 마을의 용암을 뜨다',scene:'firevillage',npc:'lava34',pos:[420,180],fixture:true,lines:[['narrator','내열 국자를 용암 가장자리에 넣어 붉은 용암을 조심스럽게 떠 올렸다.'],['you','이제 에스타 선생님의 주문을 기다리자.']],effect:s=>m.give(s,'lavaSample34')},
  {key:'spell',title:'이슈가리움 파이티어 프로타',scene:'firevillage',npc:'esta',pos:[397,466],fixture:true,lines:[['esta','이슈가리움 파이티어 프로타!'],['narrator','용암 위로 여러 갈래 불꽃이 솟아올랐다가 두 학생의 지팡이 속으로 스며들며 사라졌다.'],['esta','이 불꽃들이 너희 마법을 강하게 해 줄 거다. 국자는 발디에게 돌려준 뒤 쥬다 근처 아이스 골렘으로 힘을 시험하렴.']],effect:s=>{m.take(s,'lavaSample34');m.take(s,'flareShard34');m.take(s,'lavaLadle34');s.fireMagicAwakened34=true;}},
  {key:'golem',title:'불꽃 마법 실전 과제',scene:'judah',npc:'iceGolem18',pos:[365,150],fixture:true,lines:[['narrator','항구 외곽의 차가운 바람 속에서 아이스 골렘이 길을 막았다.'],['you','새로 배운 불꽃의 힘을 여기서 시험하겠어!']],battle:'fireLessonGolem34'},
  {key:'sevrano',title:'잠긴 파이티어 기념관',scene:'firevillage',npc:'sevrano34',pos:[450,205],fixture:true,lines:[['sevrano34','파이티어의 불꽃을 보려면 기념관 열쇠가 필요합니다. 열쇠는 에머리 촌장님께 물어보세요.']]},
  {key:'emery',title:'세 몬스터에게 나눈 열쇠 마법',scene:'firevillage',npc:'emery',pos:[295,255],lines:[['emery','기념관 열쇠는 마법 형태로 나누어 두었단다. 파이어 골렘, 화염 전갈, 화염 고블린이 한 조각씩 지니고 있지.'],['emery','모두 칼라마 사막에 있다. 열린 동문을 지나되 방심하지 마라.']]},
  {key:'golemKey',title:'파이어 골렘의 열쇠 조각',scene:'kalama31',npc:'fireGolemKey35',pos:[1110,490],fixture:true,lines:[['narrator','오아시스 동쪽의 바위밭에서 불붙은 골렘이 모래를 녹이며 다가왔다.']],battle:'fireGolem34'},
  {key:'scorpionKey',title:'화염 전갈의 열쇠 조각',scene:'kalama31',npc:'fireScorpionKey35',pos:[1030,690],fixture:true,lines:[['narrator','남쪽 모래 언덕 아래에서 거대한 화염 전갈이 꼬리를 치켜들었다.']],battle:'fireScorpion34'},
  {key:'goblinKey',title:'화염 고블린의 열쇠 조각',scene:'kalama31',npc:'fireGoblinKey35',pos:[1320,310],fixture:true,lines:[['narrator','마지막 조각을 든 화염 고블린 무리가 오아시스 입구를 가로막았다.']],battle:'fireGoblin34'},
  {key:'merge',title:'파페파시타 파이어펠리',scene:'firevillage',npc:'emery',pos:[295,255],lines:[['emery','세 마력이 모두 모였구나. 파페파시타 파이어펠리!'],['narrator','흩어진 세 불빛이 소용돌이치며 하나의 붉은 열쇠로 굳어졌다.']],effect:s=>m.give(s,'fireKey34')},
  {key:'open',title:'파이티어 기념관 개방',scene:'paitierMemorial34',npc:'memorialKey34',pos:[430,440],fixture:true,lines:[['narrator','마법 열쇠를 자물쇠에 대자 기념관의 돌문과 안쪽 제단이 함께 열렸다.']],effect:s=>m.take(s,'fireKey34')},
  {key:'flame',title:'수천 년을 타오른 파이티어의 불꽃',scene:'paitierMemorial34',npc:'paitierFlame34',pos:[700,220],fixture:true,lines:[['narrator','횃불처럼 보이는 작은 불꽃이 바람도 연료도 없이 고요하게 타오르고 있었다.'],['esta','이것이 수천 년 동안 꺼지지 않은 파이티어의 불꽃이다. 오늘 배운 힘의 시작을 기억하렴.'],['you','불꽃을 크게 만드는 것보다 오래 지키는 뜻도 함께 기억할게요.']],effect:s=>s.paitierLessonComplete34=true,reward:180,ending:'불꽃 마법의 기원을 따라 용암의 문장을 배우고, 세 열쇠 조각을 모아 수천 년의 파이티어 불꽃을 직접 확인했습니다.'}
 ];
 const captured34={
 "isaac": [
  [
   "isaac",
   "여기 던전 석류가 있어. 전에 오당카님께 가져다드렸던 거 기억나?"
  ],
  [
   "you",
   "또 비밀 통로라도 찾은 줄 알았잖아. 수업에 가야지."
  ],
  [
   "isaac",
   "한 입만 먹고! 너도 먹을래? 새콤해서 정신이 번쩍 든다."
  ],
  [
   "narrator",
   "아이작과 던전 석류를 나누어 먹었다."
  ],
  [
   "you",
   "이제 에스타 선생님의 불꽃 마법 교실로 가자. 더 늦으면 정말 혼날 거야."
  ]
 ],
 "lesson": [
  [
   "esta",
   "태양의 보석을 찾느라 빠진 수업부터 보충하자. 오늘은 불꽃 마법의 시작을 배울 거야."
  ],
  [
   "narrator",
   "에스타가 흰 머리에 붉은 옷을 입은 마법사의 초상을 펼쳤다."
  ],
  [
   "isaac",
   "이분이 파이티어예요? 선생님께 직접 배울 수는 없나요?"
  ],
  [
   "esta",
   "아이작, 파이티어 마법사는 몇 천 년 전의 인물이야. 풋풋."
  ],
  [
   "you",
   "그렇게 오래된 불꽃이 지금도 남아 있다는 건가요?"
  ],
  [
   "esta",
   "글루글루님을 찾아가 보렴. 그 불꽃에 얽힌 이야기를 들을 수 있을 거야."
  ]
 ],
 "gluglu": [
  [
   "gluglu",
   "파이티어 님은 아직 땅과 하늘의 경계가 모호하던 시절에 용암에서 불꽃을 건져내어 그 작은 불씨에 마법의 문장을 집어넣어 불꽃 마법을 시작하셨다네."
  ],
  [
   "you",
   "불을 피우는 것과 불꽃 마법은 다른 거군요."
  ],
  [
   "gluglu",
   "그렇지. 문장에 뜻을 담아 힘을 다루는 것이 마법일세. 큐리어스가 간직한 라이징 플레어 조각을 받아 오게."
  ]
 ],
 "curious": [
  [
   "curious",
   "둘이 함께 왔구나. 그런데 줄 수 있는 조각은 하나야."
  ],
  [
   "isaac",
   "그럼 누가 가져가죠?"
  ],
  [
   "curious",
   "대련으로 정해 보렴. 보호 마법 안에서 겨뤄야 한다."
  ],
  [
   "you",
   "이긴 사람이 조각을 맡고 둘이 같이 수업을 들으면 되겠네요."
  ],
  [
   "isaac",
   "좋아! 이번에는 쉽게 안 질 거야."
  ]
 ],
 "shard": [
  [
   "curious",
   "자 받아라. 약속한 라이징 플레어 조각이다."
  ],
  [
   "isaac",
   "으으, 졌지만 수업은 같이 듣는 거야!"
  ],
  [
   "you",
   "당연하지. 이 조각에 담긴 문장을 함께 확인하자."
  ]
 ],
 "baldi": [
  [
   "baldi",
   "용암을 뜨려고? 보통 국자를 가져가면 손잡이까지 녹아 버린다네."
  ],
  [
   "you",
   "에스타 선생님의 실습에 쓸 거예요."
  ],
  [
   "baldi",
   "이 용암 국자를 빌려 가게. 불 가까이에서 장난치지 말고, 다 쓰면 반드시 돌려주게."
  ]
 ],
 "spell": [
  [
   "esta",
   "이슈가리움 파이티어 프로타!"
  ],
  [
   "narrator",
   "용암의 불빛이 작은 문장을 그리며 일어났다. 불씨는 학생들의 지팡이 끝으로 모였다."
  ],
  [
   "esta",
   "정말 신기한 불꽃은 너희의 불꽃 마법을 강하게 해 줄 거란다."
  ],
  [
   "isaac",
   "손잡이까지 뜨거워진 것 같아요. 빨리 써 보고 싶다!"
  ],
  [
   "esta",
   "서두르지 말고 빌린 국자부터 돌려드려. 그다음 쥬다 근처의 아이스 골렘 열 마리를 잡아 오너라."
  ]
 ],
 "golem": [
  [
   "isaac",
   "열 마리나 잡으려면 새 불꽃을 잘 써야겠어."
  ],
  [
   "you",
   "골렘의 얼음이 갈라질 때를 노려 보자. 서로 너무 가까이 붙지는 말고!"
  ]
 ],
 "emery": [
  [
   "emery",
   "파이티어 기념관 열쇠는 마법의 형태로 분산시켜 두었단다. 부서진 것이 아니라 여러 몬스터에게 나누어 놓은 거야."
  ],
  [
   "you",
   "어떤 몬스터에게 가야 하나요?"
  ],
  [
   "emery",
   "파이어 골렘, 화염 고블린, 화염 전갈이란다."
  ],
  [
   "emery",
   "칼라마 사막 입구 근처에 화염 전갈이 있고, 마우스캐슬 입구 근처에는 화염 고블린이 있지. 파이어 골렘은 지도에 표시된 사막을 살펴보렴."
  ],
  [
   "isaac",
   "셋을 찾아서 열쇠의 이빨, 몸통, 고리를 모으면 되는군요."
  ]
 ],
 "merge": [
  [
   "emery",
   "셋을 모두 모아 왔구나. 이제 하나로 되돌려 주마. 파페파시타 파이어펠리!"
  ],
  [
   "narrator",
   "열쇠의 이빨과 몸통, 고리가 맞물리며 금빛으로 빛났다."
  ],
  [
   "you",
   "마법으로 나눠 두었던 열쇠가 원래 모습을 찾았어요."
  ],
  [
   "emery",
   "기념관에서 불꽃을 보고 오렴. 손대거나 밖으로 가져오면 안 된다."
  ]
 ]
};
 for(const row of rows)if(captured34[row.key])row.lines=captured34[row.key];
 Object.assign(rows.find(r=>r.key==="isaac"),{scene:"underpass",pos:[740,386]});
 Object.assign(rows.find(r=>r.key==="golem"),{title:"쥬다 근처 아이스 골렘 열 마리",goal:"불꽃 마법으로 아이스 골렘 10마리 제압하기"});
 const c=m.register(34,'불꽃 마법 입문 · 파이티어의 불꽃',rows,{fireMagicAwakened34:false,paitierLessonComplete34:false});
 x.map.push(['paitierMemorial34','파이티어 기념관',[180,650]]);
 x.scenes.paitierMemorial34=(s,n,p)=>({id:'paitierMemorial34',name:'불꽃 마을 · 파이티어 기념관',bg:'assets/maps-hires/fire-village.png',w:1000,h:760,zoom:.96,tint:'#2b080840',nodes:[[180,650],[290,570],[430,440],[540,350],[620,275],[700,220],[800,300],[850,430],[720,520],[540,590]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,0],[3,8]],entities:[p('back','불꽃 마을',180,650,'firevillage',[300,744]) ]});
 const items=x.questItems;x.questItems=s=>[...items(s),...(s.inv.mt_flareShard34?[['라이징 플레어 조각','파이티어의 문장이 담긴 조각']]:[]),...(s.inv.mt_lavaLadle34?[['용암 국자','발디에게 반납해야 할 내열 국자']]:[]),...(s.inv.mt_lavaSample34?[['불꽃 마을의 용암','보충 수업의 실습 재료']]:[]),...(s.inv.mt_fireKey34?[['파이티어 기념관 열쇠','세 불꽃 몬스터의 마력이 합쳐진 열쇠']]:[])];
 const mon=(name,hp,atk,art='assets/flame-soldier.png')=>({name,element:0,hp,maxHp:hp,atk,atb:10,artPath:art,height:145});
 x.encounters.flareDuel34={name:'라이징 플레어 조각 대결 · 아이작',bg:'assets/maps-hires/colosseum.png',intro:'큐리어스의 보호 마법 안에서 아이작과 겨룹니다.',next:c.keys.shard,xp:470,gold:0,sp:75,enemies:[{name:'아이작',element:2,hp:1060,maxHp:1060,atk:27,atb:8,npc:'isaac',height:155}]};
 x.encounters.fireLessonGolem34={name:'쥬다 외곽 · 아이스 골렘 과제',bg:'assets/maps-hires/judah-harbor.png',intro:'새로 깨운 불꽃 마법으로 아이스 골렘을 쓰러뜨리세요.',next:c.keys.sevrano,xp:520,gold:185,sp:82,enemies:[{name:'아이스 골렘',element:1,hp:1320,maxHp:1320,atk:28,atb:12,sprite:'cubic',height:165}]};
 x.encounters.fireGolem34={name:'칼라마 · 파이어 골렘',bg:'assets/chapter31/kalama-oasis.png',intro:'첫 번째 기념관 열쇠 조각을 지닌 파이어 골렘입니다.',next:c.keys.scorpionKey,xp:540,gold:200,sp:84,enemies:[mon('파이어 골렘',1380,29)]};
 x.encounters.fireScorpion34={name:'칼라마 · 화염 전갈',bg:'assets/chapter31/kalama-oasis.png',intro:'두 번째 열쇠 조각을 지닌 화염 전갈입니다.',next:c.keys.goblinKey,xp:550,gold:205,sp:85,enemies:[mon('화염 전갈',1220,29,'assets/items/scorpion_tail.png')]};
 x.encounters.fireGoblin34={name:'칼라마 · 화염 고블린 무리',bg:'assets/chapter31/kalama-oasis.png',intro:'마지막 열쇠 조각을 지닌 화염 고블린 무리입니다.',next:c.keys.merge,xp:570,gold:220,sp:88,enemies:[mon('화염 고블린',760,26),mon('화염 고블린 주술사',680,25)]};
 for(const [mood,lines]of Object.entries({determined:['콜로세움에서 정정당당하게 정하자.','새로 배운 불꽃의 힘을 여기서 시험하겠어!'],happy:['불꽃을 크게 만드는 것보다 오래 지키는 뜻도 함께 기억할게요.']}))for(const text of lines)ARPIA_HERO_ART.annotations.set(text,mood);
})();
