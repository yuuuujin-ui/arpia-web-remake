/* Episode 9: two pledges and a lost love letter. Plot outline sourced; dialogue and interactions rebuilt. */
(()=>{
 const x=window.ARPIA_EXTRA,decorate=x.decorate,interact=x.interact,items=x.questItems;
 Object.assign(x.defaults,{pledgeMine:false,pledgeAsuria:false,scollLetter:false,letterLost:false,diamondOre:false,replacementLetter:false,scollSignature:false,attachSpell:false,frogPowder:false,letterSealed:false,cardiaReply:false});
 Object.assign(x.npcs,{
  sofia:{name:'소피아',anim:'npc_004_도트_소피아',portrait:'friend/소피아.png',height:70},
  meli:{name:'멜리',anim:'npc_038_도트_멜리',portrait:'worker/멜리.png',height:68},
  abdullah:{name:'압둘라',anim:'npc_040_도트_압둘라',height:70},
  sunny:{name:'써니',anim:'npc_002_도트_히나',height:60},xenia:{name:'제니아',anim:'npc_073_도트_조지',height:60},
  letterdesk:{name:'도서관 필사대'}
 });
 x.quests.splice(70,1,
  ['제9화 · 잃어버린 러브레터','학교 2층 줄리아에게 다음 임무 듣기','classroom','julia'],
  ['두 왕국의 신뢰','학교 4층 모리스에게 서약서 임무 받기','principal','morris'],
  ['지하에서 기다리는 사람','학교 화장실의 더글라스에게 전갈 듣기','bathroom','douglas'],
  ['스콜의 은밀한 부탁','학교 지하에서 스콜의 편지 받기','basement','scoll'],
  ['광산의 신뢰 서약서','난쟁이 광산의 발디에게 서약서 받기','mine','baldi'],
  ['없어진 편지','얼음 마법 교실의 스콜에게 돌아가기','classroom','scoll'],
  ['빵을 전하는 소피아','보일러실에서 소피아·머피에게 빵 심부름 듣기','boiler','sofia'],
  ['코볼트의 선물','코볼트 방에 빵을 전하고 다이아 원석 받기','koboldroom','kobold'],
  ['새 편지의 대필','학교 식당의 소피아에게 도움 청하기','dining','sofia'],
  ['슬쩍 받은 서명','얼음 마법 교실의 스콜에게 새 편지에 서명 받기','classroom','scoll'],
  ['편지를 붙이는 가루','마법 재료실 칠리에게 접착 방법 묻기','materials','chilli'],
  ['잊힌 주문을 찾아서','학교 도서관의 멜리에게 주문 묻기','library','meli'],
  ['쥬다의 개구리 가루','항구마을 쥬다의 압둘라와 거래하기','judah','abdullah'],
  ['감쪽같은 편지','도서관 필사대에서 편지와 서명 붙이기','library','letterdesk'],
  ['아수리아의 신뢰 서약서','아수리아 국왕에게 서약서 부탁하기','asuria','kingAsuria'],
  ['카디쟈가 작성한 서약서','카디쟈의 집에서 신뢰 서약서 받기','cardiahome','cardia'],
  ['왕국의 도장','아수리아 국왕에게 서약서 확인받기','asuria','kingAsuria'],
  ['사과와 협력의 편지','카디쟈에게 소피아가 고쳐 쓴 편지 건네기','cardiahome','cardia'],
  ['카디쟈의 답장','카디쟈의 집으로 돌아가 답장 받기','cardiahome','cardia'],
  ['두 왕국의 약속','학교 4층 모리스에게 서약서 두 장 전달하기','principal','morris'],
  ['스콜에게 온 답장','지하 창고의 스콜에게 카디쟈의 답장 건네기','basement','scoll'],
  ['제9화 완료 · 신뢰와 진심','두 왕국의 신뢰를 되찾고 엇갈린 편지도 무사히 전했습니다','campus','none']
 );
 x.chapters.push([112,133,'제9화 잃어버린 러브레터']);
 x.map.push(['library','아르피아 도서관',[275,390]],['judah','항구마을 쥬다',[492,183]]);
 x.scenes.library=(s,n,p)=>({id:'library',name:'아르피아 도서관 · 잊힌 주문',bg:'assets/maps-hires/library.png',w:559,h:431,zoom:1.42,nodes:[[275,390],[205,360],[125,330],[72,285],[133,250],[215,260],[285,300],[365,335],[445,322],[500,270],[455,225],[390,205],[340,155],[285,120]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[6,11],[5,12]],entities:[p('back','학교 2층',275,390,'classroom',[935,260]),n('meli',455,225),{...n('letterdesk',133,250),type:'fixture'}]});
 x.scenes.judah=(s,n,p)=>({id:'judah',name:'항구마을 쥬다 · 개구리 가루 상점',bg:'assets/maps-hires/judah-harbor.png',w:559,h:431,zoom:1.42,nodes:[[492,183],[430,168],[365,150],[305,135],[245,130],[180,124],[120,112],[68,92],[265,188],[205,208],[140,220],[82,198]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[3,8],[8,9],[9,10],[10,11],[11,6]],entities:[p('back','학교 앞으로',492,183,'campus',[866,621]),n('abdullah',245,130)]});
 x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);
  if(sc.id==='classroom')sc.entities.push({...p('library','도서관',935,260,'library',[275,390]),minStage:123});
  if(sc.id==='campus')sc.entities.push({...p('judah','항구마을 쥬다',866,621,'judah',[492,183]),minStage:124});
  if(sc.id==='basement'&&[115,132].includes(s.stage))sc.entities.push(n('scoll',540,350));
  if(sc.id==='classroom'&&[117,121].includes(s.stage)&&!sc.entities.some(e=>e.id==='scoll'))sc.entities.push(n('scoll',505,300));
  if(sc.id==='dining'&&s.stage===120)sc.entities.push(n('sofia',550,270));
  if(sc.id==='boiler'&&s.stage===118)sc.entities.push(n('sofia',490,300));
  if(sc.id==='koboldroom'&&s.stage===119)sc.entities.push(n('sofia',550,280));

 };
 x.questItems=s=>[...items(s),
  ...(s.pledgeMine?[['난쟁이 왕국 신뢰 서약서','광산 사건을 함께 해결한 아르피아를 신뢰한다는 발디의 서약']]:[]),
  ...(s.pledgeAsuria?[['아수리아 신뢰 서약서','오염된 철의 원인을 밝힌 아르피아를 신뢰한다는 국왕의 서약']]:[]),
  ...(s.scollLetter&&!s.letterLost?[['스콜의 편지','카디쟈에게 전해 달라고 받은 봉인 편지']]:[]),
  ...(s.diamondOre?[['코볼트의 다이아 원석','쥬다의 희귀 재료와 바꿀 만한 맑은 원석']]:[]),
  ...(s.replacementLetter&&!s.letterSealed?[['소피아가 쓴 새 편지','사과와 웨일라의 위기에 대한 협력을 담은 편지. 스콜의 연애편지와는 내용이 다르다.']]:[]),
  ...(s.scollSignature&&!s.letterSealed?[['스콜의 서명 조각','새 편지에 붙여야 할 진짜 서명']]:[]),
  ...(s.attachSpell?[['도서관의 주문 기록','개구리 가루를 뿌리고 “붙어라”라고 외운다']]:[]),
  ...(s.frogPowder?[['개구리 가루','종이를 흔적 없이 붙이는 쥬다의 마법 재료']]:[]),
  ...(s.letterSealed&&!s.cardiaReply?[['완성된 편지','소피아의 글과 스콜의 서명을 마법으로 이은 편지']]:[]),
  ...(s.cardiaReply?[['카디쟈의 답장','스콜에게 직접 전해 달라는 짧고 단정한 답장']]:[])
 ];
 const ev={
  112:['classroom','julia',[['julia','광산 사건의 보고는 두 왕국에도 전해졌다. 이제 마지막으로 신뢰를 확인할 때란다.'],['you','제가 할 일이 있나요?'],['julia','모리스 교장 선생님이 자세히 말씀해 주실 거야. 교장실로 가 보렴.']]],
  113:['principal','morris',[['morris','난쟁이 광산의 발디와 아수리아 왕국의 무함마드 알리 4세에게 가서 신뢰의 서약서를 받아오너라.'],['you','두 분을 직접 만나고 오겠습니다.'],['morris','이번 사건으로 생긴 오해를 풀 기회이기도 하단다. 상대의 이야기도 잘 듣고 오거라.']]],
  114:['bathroom','douglas',[['douglas','지하실의 창고로 가면 기다리는 사람이 있을 거야.'],['you','누가 저를 기다리는데요?'],['douglas','내가 먼저 말하면 재미없지. 가 보면 알게 될 거야.']]],
  115:['basement','scoll',[['scoll','{name} 내 가슴에 도둑이 들어왔구나. 바로 카디쟈라는 도도한 도둑이.'],['you','도둑이라기에 큰일이 난 줄 알았잖아요.'],['scoll','내게는 큰일이지. 아수리아에 간다니 이 편지를 전하고 답장을 받아다 주게.'],['you','광산에 먼저 들른 다음 전해 드릴게요.'],['scoll','봉인은 열지 말게. 마음에도 지켜야 할 비밀이 있는 법이니까.']]],
  116:['mine','baldi',[['baldi','음… 괜찮은 생각이군. 우리 난쟁이 족은 신용 빼면 시체니까. (속삭속삭) 자 여기있다.'],['you','감사합니다. 서약서는 잘 전할게요.'],['narrator','광산을 빠져나와 가방을 정리하다 손이 멎었다. 서약서는 있는데, 스콜이 맡긴 봉인 편지가 보이지 않았다.'],['you','아까 바위에 가방이 걸렸을 때인가? 돌아가는 길도 찾아봐야겠어.']]],
  117:['classroom','scoll',[['scoll','카디쟈가 뭐라고 하디? 역시 나의 감수성 넘치는 글 솜씨에 넘어갔겠지? 표정은 어땠어? 같이 온 건 아니겠지?'],['you','그게… 아직 전하지 못했어요. 광산에서 편지를 잃어버려서요.'],['scoll','뭐라고? 밤새 고른 말들이었는데! 그 마음을 똑같이 다시 쓰란 말인가?'],['you','돌아오는 길도 찾아봤어요. 정말 죄송해요.'],['narrator','낙담한 스콜 앞에서 더 말을 잇지 못했다. 식당의 소피아라면 방법을 함께 생각해 줄지도 모른다.']]],
  118:['dining','sofia',[['sofia','머피 아저씨가 코볼트에게 빵을 전해 달라고 하셨어. 같이 갈래?'],['you','좋아. 나도 생각을 정리할 시간이 필요했어.'],['sofia','무슨 일인지 모르지만, 혼자 끙끙대면 더 복잡해져. 걸으면서 이야기해.']]],
  119:['koboldroom','kobold',[['kobold','빵을 가져와 줬구려. 소피아 양은 말투는 차가워도 마음은 따뜻한 사람이오.'],['sofia','빵이 식겠어요. 그런 평가는 나중에 하세요.'],['kobold','하하! {name}에게는 이 다이아 원석을 주겠소. 언젠가 꼭 쓸 곳이 있을 거요.']]],
  120:['dining','sofia',[['you','스콜 선생님의 편지를 잃어버렸어. 다시 써 달라고 했지만 많이 낙담하셨어.'],['sofia','카디쟈에게 보내는 편지라면 내가 써 줄게.'],['you','그런데 원래 내용을 모르잖아. 연애편지였는데…'],['sofia','지난번 실례를 사과하고, 웨일라와 아수리아를 위해 힘을 합치자는 이야기로 쓰면 돼. 지금은 모두에게 중요한 일이니까.'],['you','선생님이 부탁한 편지와는 많이 달라지는 것 같은데.'],['sofia','우선 스콜 선생님의 서명을 받아 와. 서명이 있어야 완성할 수 있어.'],['narrator','소피아는 망설임 없이 펜을 들었다. 편지는 다시 생겼지만, 그 안에 담기는 뜻은 처음과 달라지고 있었다.']]],
  121:['classroom','scoll',[['you','선생님, 종이 한 장에 서명을 해 주실 수 있나요?'],['scoll','내 서명을 갖고 싶다는 건가? 이런, 부탁받으니 기분은 좋군.'],['you','아래쪽에 적어 주시면 돼요. 감사합니다.'],['narrator','스콜은 새 편지에 붙일 서명이라는 사실을 모른 채 이름을 적었다. 서명 조각과 소피아의 편지를 자연스럽게 이을 방법이 필요했다.']]],
  122:['materials','chilli',[['chilli','종이를 흔적 없이 붙이려면 개구리 가루를 쓰면 된다. 주문도 하나 외워야 하는데…'],['you','또 주문을 잊으신 건가요?'],['chilli','도서관의 멜리라면 기록을 찾아 줄 게다. 이번에는 나도 적어 두마.']]],
  123:['library','meli',[['meli','개구리 가루의 접착 주문을 찾는다고? 오래된 재료 사전에 적혀 있어.'],['meli','가루를 얇게 뿌린 뒤 “붙어라”라고 또렷하게 말하면 돼.'],['you','붙어라. 이번에는 제가 꼭 기억할게요.'],['meli','가루가 없다면 쥬다 항구의 압둘라가 취급한단다.']]],
  124:['judah','abdullah',[['abdullah','개구리 가루는 흔하지 않지. 돈보다 반짝이는 원석과 바꾸고 싶군.'],['you','코볼트에게 받은 다이아 원석은 어떤가요?'],['abdullah','아주 맑은 원석이군! 거래 성립이오. 가루는 습기에 약하니 봉지를 잘 닫으시오.']]],
  126:['asuria','kingAsuria',[['kingAsuria','오염된 철의 원인을 밝혀 두 왕국의 오해를 풀어 주었네. 아수리아는 아르피아를 신뢰하네.'],['you','이 서약을 광산에도 전하겠습니다. 두 왕국이 다시 좋은 관계가 되길 바라요.'],['kingAsuria','좋은 뜻이로군. 카디쟈는 서쪽 집에 있네. 전할 것이 있다면 찾아가 보게.']]],
  127:['cardiahome','cardia',[['you','스콜 선생님의 편지를 가져왔어요.'],['narrator','카디쟈는 편지를 펼쳐 읽었다. 지난번 실례에 대한 사과, 대마왕의 음모, 젊은 마법사들이 힘을 합쳐야 한다는 이야기가 이어졌다.'],['cardia','아수리아의 안녕과 웨일라의 앞날을 생각한 편지군요. 답장을 준비하겠습니다.'],['you','네. 기다리고 있을게요.'],['narrator','소피아가 고른 말은 잘 전해졌다. 하지만 스콜이 기다리는 답장도 이런 내용일까?']]],
  128:['asuria','sunny',[['sunny','광산의 검이 다시 안전해졌다니 다행이에요. 왕국 사람들도 아르피아 학생들을 믿어요.'],['you','두 곳이 다투기 전에 원인을 찾을 수 있어서 다행이에요.'],['sunny','서약서보다 그런 행동이 더 큰 믿음을 주는 것 같아요.']]],
  129:['asuria','xenia',[['xenia','마법학교 학생이 사건을 해결했다는 이야기를 들었네. 힘만 센 줄 알았더니 남의 말도 잘 듣는구먼.'],['you','처음부터 한쪽 말만 믿었다면 진짜 원인을 못 찾았을 거예요.'],['xenia','그 마음을 잊지 말게. 카디쟈 님의 답장도 준비됐을 거야.']]],
  130:['cardiahome','cardia',[['cardia','답장을 준비했습니다. 나는 앞으로도 웨일라 대륙과 아수리아 왕국을 위해 헌신하겠다고 전해 주세요.'],['cardia','스콜 마법사님도 자신의 자리에서 힘써 주시기 바랍니다. 좋은 뜻을 나누어 주셔서 감사하다고요.'],['you','꼭 전하겠습니다.'],['narrator','단정하게 봉해진 답장에는 공동의 책임과 헌신이 담겨 있었다. 스콜이 기대하던 고백의 답과는 다른 방향이었다.']]],
  131:['principal','morris',[['you','난쟁이 광산과 아수리아의 신뢰 서약서 두 장을 받아 왔습니다.'],['morris','훌륭하구나. 글로 남긴 약속도 소중하지만, 너희가 보인 신중함이 이 신뢰를 만든 것이란다.'],['morris','이제 두 왕국은 오염된 철을 함께 조사하기로 했단다. 수고했다.']]],
  132:['basement','scoll',[['you','카디쟈의 답장을 가져왔어요.'],['scoll','드디어! 어디 보자… 뜻과 이상이 높다? 웨일라를 위해 헌신하겠다?'],['narrator','스콜은 앞장을 다시 읽고, 마지막 서명을 한 번 더 들여다보았다.'],['scoll','내 마음을 전했는데 왜 왕국의 앞날 이야기가 돌아온 거지?'],['you','편지에 쓰인 뜻을 진지하게 받아들이신 것 같아요.'],['scoll','진지하게… 그래, 그건 좋은 일이겠지. 그런데 어쩐지 내가 하려던 말과는…'],['narrator','두 왕국의 서약서는 무사히 전했고 답장도 받아 왔다. 다만 사랑의 메신저가 전한 것은, 어느새 조금 다른 약속이 되어 있었다.']]]
 };
 // Additional dialogue verified against 9-2, 9-3 and 9-4. No stage renumbering.
 Object.assign(ev,{
 "118": [
  "boiler",
  "sofia",
  [
   [
    "sofia",
    "난 보일러실에 계신 아저씨 말씀을 듣고 왔어. 너는 말을 좀 가려서 하도록 해."
   ],
   [
    "you",
    "알았어. 그보다 무슨 심부름을 하려고?"
   ],
   [
    "murphy",
    "지하에 사는 코볼트에게 빵을 가져다주겠니? 소피아는 아직 코볼트를 모르지."
   ],
   [
    "you",
    "먼저 코볼트에게 빵을 주라고요? 소피아, 나랑 같이 가자."
   ],
   [
    "murphy",
    "지하실로 내려가 보렴. 겉모습만 보고 놀라지는 말고."
   ]
  ]
 ],
 "119": [
  "koboldroom",
  "kobold",
  [
   [
    "you",
    "머피 아저씨가 보내신 빵이에요."
   ],
   [
    "kobold",
    "고맙소. 이 은혜는 꼭 갚겠소."
   ],
   [
    "sofia",
    "이게 코볼트? 말로만 듣던 것보다 대단하지 않네."
   ],
   [
    "kobold",
    "옆에 그 차가운 꼬마는 누구예요? 무서워요. 코볼트 몸이 얼어 버릴 것 같아요."
   ],
   [
    "you",
    "소피아야. 같이 빵을 가져왔어."
   ],
   [
    "kobold",
    "보답으로 다이아 원석을 주겠소. 두 사람 모두 수고했어요."
   ],
   [
    "sofia",
    "여긴 다이아몬드 밭이잖아. 정말 신기해."
   ]
  ]
 ],
 "121": [
  "classroom",
  "scoll",
  [
   [
    "you",
    "선생님, 서명 하나만 해 주세요."
   ],
   [
    "scoll",
    "허허, 내 브로마이드라도 좀 사렴."
   ],
   [
    "you",
    "오늘은 종이에 해 주시면 돼요."
   ],
   [
    "scoll",
    "자, 여기다. 잘 간수해. 10년 후에는 돈 주고도 살 수 없는 이 이름이 될 테니까."
   ],
   [
    "narrator",
    "스콜이 적어 준 서명을 조심스럽게 잘랐다. 새 편지에 흔적 없이 붙일 방법을 찾아야 했다."
   ]
  ]
 ],
 "126": [
  "asuria",
  "kingAsuria",
  [
   [
    "kingAsuria",
    "스콜? 사랑에 빠진 도둑? 그건 됐네. 지금 내가 무슨 말을 하려고 했더라."
   ],
   [
    "you",
    "모리스 교장 선생님이 신뢰의 서약서를 부탁하셨어요."
   ],
   [
    "kingAsuria",
    "서약서를 쓰라고? 카디쟈를 찾아가게. 글 쓰는 일은 그 아이에게 맡겼거든."
   ],
   [
    "you",
    "카디쟈에게 서약서를 받아 다시 오겠습니다."
   ]
  ]
 ],
 "127": [
  "cardiahome",
  "cardia",
  [
   [
    "cardia",
    "국왕 폐하의 전갈을 받고 기다리고 있었어요. 자, 여기 아수리아 왕국이 난쟁이 광산을 신뢰한다는 서약서예요."
   ],
   [
    "you",
    "감사합니다. 국왕님께 도장도 받아 올게요."
   ],
   [
    "cardia",
    "스콜에게서 온 편지도 있다고요? 돌아오면 읽어 보겠어요."
   ]
  ]
 ],
 "128": [
  "asuria",
  "kingAsuria",
  [
   [
    "kingAsuria",
    "자, 도장을 꺼내서… 하아… 졸려."
   ],
   [
    "you",
    "여기에 찍어 주시면 됩니다. 서약서를 작성해 주신 카디쟈에게도 감사 인사를 전할게요."
   ],
   [
    "narrator",
    "왕의 도장이 찍힌 서약서를 광산의 서약서와 함께 보관했다."
   ]
  ]
 ],
 "129": [
  "cardiahome",
  "cardia",
  [
   [
    "you",
    "이번에는 스콜 선생님이 부탁하신 편지예요."
   ],
   [
    "narrator",
    "카디쟈가 편지를 펼쳤다. “지난번에는 실례가 많았습니다. 사과 편지를 드립니다. 현재 웨일라 대륙에는 대마왕의 음모가 따르고 있습니다. 이러한 시기에 우리 젊은 사람들이 힘을 합쳐야 할 때라고 생각합니다.”"
   ],
   [
    "cardia",
    "정말 마음에 와닿는 처음 보는 편지네요."
   ],
   [
    "you",
    "그렇게 읽어 주시니 다행이에요."
   ],
   [
    "cardia",
    "그 스콜인가 하는 한가한 마법사를 보다니, 여러 일들을 보니 아르피아 마법학교의 저력이 느껴집니다. 답장을 쓰겠어요."
   ]
  ]
 ]
});
 x.interact=(e,a)=>{const s=a.state,q=s.stage;
  if(q===125&&s.scene==='library'&&e.id==='letterdesk'){
   if(!(s.replacementLetter&&s.scollSignature&&s.attachSpell&&s.frogPowder)){a.toast('편지·서명·주문·개구리 가루를 모두 준비하세요.');return true;}
   a.choicePuzzle(['감쪽같은 편지','멜리가 알려 준 순서대로 종이를 붙이려면?',['가루를 뿌리고 “붙어라”라고 외친다','종이를 물에 적셔 겹친다','불꽃으로 가장자리를 녹인다'],0,'개구리 가루를 얇게 뿌리고 “붙어라”라고 외워야 해.'],()=>{s.letterSealed=true;s.frogPowder=false;a.advance(126,15);a.refresh();a.talk([['narrator','스콜의 서명이 편지 끝에 감쪽같이 붙었다. 접힌 자국만 아주 희미하게 남았다.']]);a.save();});return true;
  }
  const row=ev[q];if(row&&s.scene===row[0]&&e.id===row[1]){a.talk(row[2],()=>{
   if(q===115)s.scollLetter=true;
   if(q===116){s.pledgeMine=true;s.scollLetter=false;s.letterLost=true;}
   if(q===119)s.diamondOre=true;
   if(q===120)s.replacementLetter=true;
   if(q===121)s.scollSignature=true;
   if(q===123)s.attachSpell=true;
   if(q===124){s.frogPowder=true;s.diamondOre=false;}
   if(q===127)s.pledgeAsuria=true;
   if(q===129)s.letterSealed=false;
   if(q===130)s.cardiaReply=true;
   if(q===132)s.cardiaReply=false;
   a.advance(q+1,q===132?40:10);a.refresh();
   if(q===132)a.finish('제9화 완료 · 두 왕국의 신뢰','광산과 아수리아의 서약서를 모으고, 잃어버린 편지도 친구들의 도움으로 다시 전했습니다.');
   a.save();
  });return true;}
  if(q>=112){const small={sofia:'말하지 않은 고민은 혼자서 점점 무거워져. 필요하면 같이 생각해 줄게.',meli:'도서관 기록은 주문을 정확히 기억하는 가장 좋은 방법이란다.',abdullah:'쥬다에는 먼 나라의 마법 재료가 모두 모인다오.',letterdesk:'낡았지만 종이를 반듯하게 펴고 주문을 쓰기 좋은 필사대다.',sunny:'왕국 사람들도 다시 광산의 물건을 기다리고 있어요.',xenia:'서로 한 약속은 오래 기억해야 하는 법이지.'};if(small[e.id]){a.talk([[e.id==='letterdesk'?'narrator':e.id,small[e.id]]]);return true;}}
  return interact(e,a);
 };
})();
