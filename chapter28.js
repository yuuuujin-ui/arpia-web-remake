/* Original event order: https://wonavy.tistory.com/217 (episode 28).
   Dialogue, maze placement and combat balance are reconstructed. */
(()=>{
 const x=ARPIA_EXTRA,m=ARPIA_MIDTERM,icon='assets/midterm/';
 const item=(id,name,desc,path)=>ARPIA_DATA.ITEMS['mt_'+id]={name,desc,kind:'quest',price:0,sell:0,icon:path};
 item('potion28','데런 왕국의 마법 물약','구조 대상의 기력을 회복시키는 왕실 물약','assets/items/potion.png');
 item('clueA28','미로의 첫 번째 힌트','종이에 그려진 몸을 굽힌 뱀',icon+'diary25.png');
 item('clueB28','미로의 두 번째 힌트','A 다음, F 다음, B 다음, J에서 네 번째 앞 글자',icon+'diary25.png');
 item('paper28','아르피아 신문 후속호','쟈칼과 도비엘 구조 사건을 기록한 후속 기사',icon+'certificate.png');
 Object.assign(x.npcs,{
  emptyDive28:{name:'비어 있는 수중 던전 입구'},clueA28:{name:'첫 번째 수수께끼 종이',artPath:icon+'diary25.png',height:34},clueB28:{name:'두 번째 수수께끼 종이',artPath:icon+'diary25.png',height:34},
  riddleDoor28:{name:'단지의 방 수수께끼문'},dobielCell28:{name:'잠든 도비엘',anim:'npc_026_도트_도비엘',height:60},newspaper28:{name:'아르피아 신문 후속호',artPath:icon+'certificate.png',height:40}
 });
 const rows=[
  {key:'show',title:'건강센터 앞의 마틸다',scene:'campus',npc:'show',pos:[493,390],lines:[['show','마틸다가 건강센터 앞에서 널 찾고 있어. 에스타 선생님이 신문 때문에 할 말씀이 있으시대.'],['you','쟈칼님 소식 때문일 거야. 바로 갈게.']]},
  {key:'matilda',title:'후속 기사를 쓰자',scene:'infirmary',npc:'matilda',pos:[470,255],lines:[['matilda','에스타 선생님이 창간호를 보시고 우리를 찾으셨어. 쟈칼 실종 사건 때문인 것 같아.']]},
  {key:'esta',title:'쟈칼을 찾는 후속 취재',scene:'classroom',npc:'esta',pos:[790,225],lines:[['esta','쟈칼님이 사라졌다는 소식이 퍼지고 있다. 최초 발견자인 너희가 직접 찾으며 후속 기사를 써 보겠니?'],['matilda','좋아요! 먼저 데런 왕국에 잠깐 들렀다가 출발하자.'],['you','사라진 두 분을 꼭 찾아올게요.']]},
  {key:'caesar',title:'구조용 마법 물약',scene:'kingdom',npc:'caesar',pos:[390,215],lines:[['caesar','위험한 수색이 되겠군. 이 왕실 마법 물약을 가져가게. 도움이 필요한 이를 발견하면 쓰도록 하게.']],effect:s=>m.give(s,'potion28')},
  {key:'waterfall',title:'아무도 없는 폭포',scene:'waterfall',npc:'jackal',pos:[488,149],lines:[['narrator','쟈칼의 폭포는 여전히 텅 비어 있었다. 물소리만 동굴 안에서 되울렸다.'],['you','혹시 수중 던전에 단서가 있을지 확인해 보자.']]},
  {key:'underwater',title:'수중 던전도 비었다',scene:'divefoyer',npc:'emptyDive28',pos:[700,405],fixture:true,lines:[['narrator','수중 던전 입구와 가까운 방들을 살펴보았지만 쟈칼도 도비엘도 없었다.'],['matilda','쟈칼님에게는 이곳이 앞마당이나 다름없으니 다른 길로 갔나 봐.']]},
  {key:'shiva',title:'젖어 버린 시바의 날개',scene:'waterfall',npc:'shiva',pos:[438,273],lines:[['shiva','가루다님이 너희를 데려오라고 하셨다. 하지만 물에 뛰어드는 바람에 날개가 젖었군.'],['matilda','그러면 독수리 마을까지 같이 걸어가자.']]},
  {key:'garuda',title:'현자가 향한 대지 마을',scene:'eaglevillage',npc:'garuda',pos:[296,140],lines:[['garuda','세 현자 중 한 명인 쟈칼이 자리를 비운 것은 마법계의 중심이 흔들리는 일이다.'],['garuda','쟈칼은 떠나기 전 대지 마을로 간다고 했다. 그곳에서 흔적을 찾아라.']]},
  {key:'lauraRequest',title:'라우라의 훌라 버섯 부탁',scene:'earthvillage',npc:'laura',pos:[397,466],lines:[['laura','쟈칼의 이야기는 훌라 버섯을 물리쳐 주면 해 주마. 요즘 길목을 몹시 어지럽히고 있거든.'],['you','먼저 마을의 위험부터 해결할게요.']]},
  {key:'hula',title:'대지 마을의 훌라 버섯',scene:'earthvillage',npc:'hula17',pos:[530,700],fixture:true,lines:[['narrator','거대한 훌라 버섯이 길목을 막고 포자를 뿜었다.']],battle:'hulaSearch28'},
  {key:'lauraClue',title:'쟈칼을 쫓던 이상한 늑대',scene:'earthvillage',npc:'laura',pos:[397,466],lines:[['laura','쟈칼은 난쟁이 광산으로 간다고 했네. 이상한 늑대 같은 것이 뒤를 쫓고 있었지.'],['you','헝거일지도 몰라. 서둘러 광산으로 가자.']]},
  {key:'baldi',title:'갱도로 향한 쟈칼',scene:'mine',npc:'baldi',pos:[300,279],lines:[['baldi','쟈칼님은 난쟁이 광산 갱도 안으로 들어가셨네. 기욤에게 물어보게.']]},
  {key:'guillaume',title:'궁전 계단으로',scene:'minedepths',npc:'guillaume',pos:[650,270],lines:[['guillaume','금덩이를 요구할 때가 아니야. 무서운 놈이 쫓아와서 쟈칼님은 난쟁이 궁전 쪽으로 가셨어.']]},
  {key:'hunger',title:'궁전 계단의 헝거',scene:'palaceStairs',npc:'hunger',pos:[464,314],lines:[['hunger','쟈칼은 미로 안에 들어갔다. 그 복잡한 곳에서 쉽게 나오지는 못할 거다.'],['you','도비엘에게 무슨 짓을 했는지 말해!']],battle:'hungerMaze28'},
  {key:'jackal',title:'미로에서 찾은 쟈칼',scene:'molemaze26',npc:'jackal',pos:[900,250],lines:[['jackal','마침 잘 왔다. 헝거의 함정을 쫓다가 길이 뒤틀렸구나. 함께 밖으로 나가자.'],['you','도비엘은 어디 있나요?']]},
  {key:'hungerTell',title:'단지의 방에 갇힌 도비엘',scene:'palaceStairs',npc:'hunger',pos:[464,314],lines:[['hunger','도비엘은 단지의 방에 숨겨 두었다. 수수께끼도 바꿔 놨으니 찾지 못할걸?'],['jackal','미로의 힌트를 다시 모아야겠구나.']]},
  {key:'door',title:'바뀌어 버린 수수께끼',scene:'molemaze26',npc:'riddleDoor28',pos:[1110,350],fixture:true,lines:[['narrator','오른쪽 끝의 단지 문에는 전에 보지 못한 네 칸의 문자 자물쇠가 달려 있었다.'],['you','미로 안에서 새 힌트를 찾아야 해.']]},
  {key:'clueA',title:'기호로 적힌 첫 힌트',scene:'molemaze26',npc:'clueA28',pos:[320,610],fixture:true,lines:[['narrator','첫 번째 종이에는 “_--_”라는 기호가 적혀 있었다.']],effect:s=>m.give(s,'clueA28')},
  {key:'clueB',title:'알파벳으로 적힌 두 번째 힌트',scene:'molemaze26',npc:'clueB28',pos:[640,290],fixture:true,lines:[['narrator','두 번째 종이에는 “A의 다음 글자, F의 다음 글자, B의 다음 글자, J에서 앞으로 네 번째 글자”라고 적혀 있었다.']],effect:s=>m.give(s,'clueB28')},
  {key:'riddle',title:'단지의 방 암호',scene:'molemaze26',npc:'riddleDoor28',pos:[1110,350],fixture:true,lines:[['jackal','두 힌트를 합치면 네 글자를 고를 수 있을 게다.'],['you','차례대로 B, G, C, F야.']],choose:['헝거가 바꾼 수수께끼','문자 자물쇠에 입력할 네 글자는?',['BGCF','AFBJ','BCDF'],0,'A 다음은 B, F 다음은 G, B 다음은 C, J에서 네 번째 앞은 F입니다.'],effect:s=>{m.take(s,'clueA28');m.take(s,'clueB28');s.jarDoorOpen28=true;}},
  {key:'snakes',title:'문 안의 룡룡뱀 세 마리',scene:'molemaze26',npc:'snake12',pos:[1040,500],lines:[['narrator','문이 열리자 룡룡뱀 세 마리가 한꺼번에 덮쳐 왔다.'],['you','도비엘이 바로 안쪽에 있어. 여기서 물러설 수 없어!']],battle:'snakes28'},
  {key:'dobiel',title:'잠든 도비엘을 구하다',scene:'molemaze26',npc:'dobielCell28',pos:[1110,420],lines:[['narrator','단지의 방 안에서 깊이 잠든 도비엘을 찾았다.'],['jackal','데런 왕국의 마법 물약을 조금 먹이면 깨어날 게다.'],['dobiel','쟈칼님… 찾아오셨군요.'],['you','다행이에요. 이제 모두 밖으로 나가요.']],effect:s=>{m.take(s,'potion28');s.dobielRescued28=true;}},
  {key:'jackalFarewell',title:'현자의 뒷정리',scene:'waterfall',npc:'jackal',pos:[488,149],lines:[['jackal','도비엘은 내가 돌보마. 헝거가 남긴 흔적도 정리해야 하니 너희는 학교로 돌아가거라.'],['you','두 분 모두 무사해서 다행이에요.']]},
  {key:'report',title:'에스타에게 전한 구조 소식',scene:'classroom',npc:'esta',pos:[790,225],lines:[['you','쟈칼님과 도비엘을 찾았어요. 헝거가 미로와 단지의 방에 가둬 두었어요.'],['esta','둘 다 무사하다니 다행이구나. 이번 일은 웨일라 모두에게 정확히 알려야겠다.']]},
  {key:'followup',title:'아르피아 신문 후속호',scene:'copyroom27',npc:'newspaper28',pos:[455,225],fixture:true,lines:[['matilda','쟈칼 실종부터 미로 수수께끼, 도비엘 구조까지 전부 기사로 썼어.'],['matilda','다음에도 내 기자가 되어 줄 거지?'],['you','이번 한 번으로 충분해. 다음에는 다른 친구에게 부탁해 줘.'],['narrator','마틸다는 아쉬워하면서도 완성된 후속호를 높이 들어 보였다. 쟈칼의 폭포에도 다시 평온한 물소리가 돌아왔다.']],effect:s=>{m.give(s,'paper28');s.newspaperArcComplete28=true;},reward:120,ending:'헝거의 미로 수수께끼를 풀고 도비엘을 구했습니다. 아르피아 신문 후속호까지 완성했습니다.'}
 ];
 const captured28={
 "matilda": [
  [
   "matilda",
   "당연하지. 이렇게 반응이 좋은데 그만둘 수 없지. 이 신문으로 난 유명인이 됐다구."
  ],
  [
   "you",
   "취재하러 뛰어다닌 건 대부분 저였는데요."
  ],
  [
   "matilda",
   "그러니까 다음 호도 같이 만들어야지! 에스타 선생님부터 찾아가자."
  ]
 ],
 "garuda": [
  [
   "garuda",
   "웨일라 삼대 현자 중 하나인 쟈칼이 자리를 비운 것은 마법계의 중심이 무너진 것과 같은 위험한 일이오."
  ],
  [
   "you",
   "수중 던전의 방 다섯 곳을 살펴봤지만 흔적조차 없었어요."
  ],
  [
   "garuda",
   "쟈칼은 떠나기 전 대지 마을로 간다고 했소. 작은 단서라도 놓치지 말고 찾아보시오."
  ]
 ],
 "lauraClue": [
  [
   "laura",
   "약속대로 알려드리죠. 쟈칼님은 난쟁이 광산으로 갔어요."
  ],
  [
   "you",
   "도비엘도 같이 있었나요?"
  ],
  [
   "laura",
   "아뇨. 쟈칼님이 말씀하시길, 지금 나를 유인하고 있는 것은 커다란 늑대라고 하셨어요."
  ],
  [
   "you",
   "헝거겠군요. 도비엘을 이용해서 쟈칼님을 불러낸 거야."
  ]
 ],
 "guillaume": [
  [
   "guillaume",
   "크고 하얀 호랑이와 커다란 늑대도 난쟁이 궁전으로 들어갔습니다. 그리고 최근에는 소리가 울리고 불길한 소리도 들렸어요."
  ],
  [
   "you",
   "이번에는 금덩이 이야기를 안 하시네요."
  ],
  [
   "guillaume",
   "지금 그런 걸 따질 때입니까? 계단 너머를 조심하세요."
  ]
 ],
 "hunger": [
  [
   "hunger",
   "크크. 멍청한 고양이 녀석은 난쟁이 미로에 갇혀 빠져나오지 못할 것이다. 무슨 제 놈의 앞마당인 줄 알아."
  ],
  [
   "you",
   "쟈칼님과 도비엘을 어디 가뒀어?"
  ],
  [
   "hunger",
   "너희까지 미로에 들어가고 싶으냐? 먼저 나를 지나가 봐라!"
  ]
 ],
 "jackal": [
  [
   "jackal",
   "잘 왔다. 헝거를 쫓아 들어왔다가 미로가 바뀐 것을 알았구나."
  ],
  [
   "you",
   "헝거를 물리쳤어요. 오른쪽 문으로 오라고 알려 줬어요."
  ],
  [
   "jackal",
   "그 자가 순순히 보내 주지는 않을 게다. 나도 함께 가마."
  ],
  [
   "you",
   "그럼 도비엘이 갇힌 곳도 꼭 알아내요."
  ]
 ],
 "hungerTell": [
  [
   "hunger",
   "그 고양이까지 데리고 나왔느냐? 이것으로 끝난 줄 알았겠지."
  ],
  [
   "narrator",
   "계단을 막아선 헝거 옆으로 또 다른 헝거가 나타났다."
  ],
  [
   "jackal",
   "뒤로 물러서지 마라. 이번에는 나도 함께 싸우겠다."
  ],
  [
   "you",
   "둘이 함께 덮쳐 와도 도비엘을 두고 갈 수는 없어!"
  ]
 ],
 "door": [
  [
   "hunger",
   "그 고양이 녀석은 수수께끼처럼 머리 아픈 일에는 재주가 없지. 크크… 으윽."
  ],
  [
   "narrator",
   "물러나는 헝거는 도비엘을 가둔 방의 수수께끼도 바꿔 두었다고 비웃었다."
  ],
  [
   "you",
   "도비엘은 단지의 방 안에 있대요. 쟈칼님, 찾아볼까요?"
  ],
  [
   "jackal",
   "먼저 미로에 남은 두 힌트를 가져오너라. 문을 여는 법을 다시 알아내야겠구나."
  ]
 ],
 "clueA": [
  [
   "narrator",
   "첫 번째 종이에는 길게 몸을 굽힌 뱀의 그림이 그려져 있었다."
  ],
  [
   "you",
   "단지 안의 뱀을 뜻하는 걸까? 다른 종이와 함께 봐야겠어."
  ]
 ],
 "riddle": [
  [
   "jackal",
   "글자를 가리키는 힌트와 뱀 그림을 모두 찾았구나. 이제 문 앞에서 답을 맞춰 보자."
  ],
  [
   "you",
   "그림은 들어간 뒤에 조심하라는 뜻 같아요. 자물쇠에는 글자 네 개를 넣으면 되겠어요."
  ]
 ],
 "dobiel": [
  [
   "narrator",
   "단지의 방 안에서 깊이 잠든 도비엘을 찾았다."
  ],
  [
   "jackal",
   "왕궁에서 받아 온 마법 물약을 조금 먹여 보거라."
  ],
  [
   "you",
   "에드워드 경이 준 물약이 여기서 도움이 되네요."
  ],
  [
   "dobiel",
   "쟈칼님… 찾아오셨군요."
  ],
  [
   "you",
   "다행이에요. 이제 모두 밖으로 나가요."
  ]
 ]
};
 for(const row of rows)if(captured28[row.key])row.lines=captured28[row.key];
 rows.find(r=>r.key==="hungerTell").battle="hungerReturn28";
 const c=m.register(28,'쟈칼의 외출 · 행방불명 된 쟈칼',rows,{jarDoorOpen28:false,dobielRescued28:false,newspaperArcComplete28:false});
 const items=x.questItems;x.questItems=s=>[...items(s),...(s.inv.mt_potion28?[['데런 왕국의 마법 물약','구조 대상에게 사용할 왕실 물약']]:[]),...(s.inv.mt_clueA28?[['미로 첫 힌트','몸을 굽힌 뱀 그림']]:[]),...(s.inv.mt_clueB28?[['미로 둘째 힌트','A→?, F→?, B→?, J에서 네 번째 앞']]:[]),...(s.inv.mt_paper28?[['아르피아 신문 후속호','쟈칼과 도비엘 구조 특집']]:[])];
 x.encounters.hulaSearch28={name:'대지 마을 · 훌라 버섯',bg:'assets/maps-hires/earth-village.png',intro:'라우라 촌장에게 쟈칼의 행방을 듣기 위해 길목을 정리하세요.',next:c.keys.lauraClue,xp:300,gold:100,sp:45,enemies:[{name:'훌라 버섯',element:2,hp:980,maxHp:980,atk:26,atb:15,artPath:'assets/midterm/hula-large.png',height:160}]};
 x.encounters.hungerMaze28={name:'난쟁이 궁전 계단 · 헝거',bg:'assets/forgotten-palace.png',intro:'쟈칼과 도비엘의 행방을 알아내기 위해 헝거를 제압하세요.',next:c.keys.jackal,xp:390,gold:130,sp:58,enemies:[{name:'헝거',element:1,hp:1280,maxHp:1280,atk:29,atb:15,artPath:'assets/original/character/other/헝거.png',height:175}]};
 x.encounters.hungerReturn28={...x.encounters.hungerMaze28,name:'궁전 계단 · 헝거의 재습격',intro:'쟈칼과 함께 헝거 두 마리를 물리치세요.',next:c.keys.door,enemies:[{...x.encounters.hungerMaze28.enemies[0],hp:990,maxHp:990},{...x.encounters.hungerMaze28.enemies[0],hp:990,maxHp:990,atb:28}],allies:[{id:'jackal',npc:'jackal',name:'쟈칼',hp:1100,maxHp:1100,atk:42,skill:'attack',sprite:x.npcs.jackal.artPath||x.npcs.jackal.sprite||'assets/original/animation/'+x.npcs.jackal.anim+'/idle.gif'}]};
 x.encounters.snakes28={name:'단지의 방 · 룡룡뱀 세 마리',bg:'assets/dwarf-mine-depths.png',intro:'잠든 도비엘을 지키는 룡룡뱀 무리를 돌파하세요.',next:c.keys.dobiel,xp:410,gold:145,sp:60,enemies:[{name:'룡룡뱀',element:2,hp:460,maxHp:460,atk:24,atb:0,sprite:'snake12'},{name:'룡룡뱀',element:2,hp:440,maxHp:440,atk:23,atb:12,sprite:'snake12'},{name:'룡룡뱀',element:2,hp:420,maxHp:420,atk:22,atb:24,sprite:'snake12'}]};
 for(const [mood,lines]of Object.entries({sad:['쟈칼님 소식 때문일 거야. 바로 갈게.'],surprised:['도비엘은 어디 있나요?'],determined:['사라진 두 분을 꼭 찾아올게요.','도비엘이 바로 안쪽에 있어. 여기서 물러설 수 없어!'],happy:['두 분 모두 무사해서 다행이에요.'],embarrassed:['이번 한 번으로 충분해. 다음에는 다른 친구에게 부탁해 줘.']}))for(const text of lines)ARPIA_HERO_ART.annotations.set(text,mood);
})();
