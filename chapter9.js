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
  ['없어진 편지','학교 지하 스콜에게 돌아가기','basement','scoll'],
  ['빵을 전하는 소피아','학교 식당의 소피아 만나기','dining','sofia'],
  ['코볼트의 선물','코볼트 방에 빵을 전하고 다이아 원석 받기','koboldroom','kobold'],
  ['새 편지의 대필','학교 식당의 소피아에게 도움 청하기','dining','sofia'],
  ['슬쩍 받은 서명','학교 지하 스콜에게 새 편지에 서명 받기','basement','scoll'],
  ['편지를 붙이는 가루','마법 재료실 칠리에게 접착 방법 묻기','materials','chilli'],
  ['잊힌 주문을 찾아서','학교 도서관의 멜리에게 주문 묻기','library','meli'],
  ['쥬다의 개구리 가루','항구마을 쥬다의 압둘라와 거래하기','judah','abdullah'],
  ['감쪽같은 편지','도서관 필사대에서 편지와 서명 붙이기','library','letterdesk'],
  ['아수리아의 신뢰 서약서','아수리아 국왕에게 서약서 받기','asuria','kingAsuria'],
  ['카디쟈에게 전한 편지','카디쟈의 집에서 완성한 편지 건네기','cardiahome','cardia'],
  ['답장을 기다리며','아수리아 거리의 써니와 이야기하기','asuria','sunny'],
  ['왕국 사람들이 보는 학교','아수리아 거리의 제니아와 이야기하기','asuria','xenia'],
  ['카디쟈의 답장','카디쟈의 집으로 돌아가 답장 받기','cardiahome','cardia'],
  ['두 왕국의 약속','학교 4층 모리스에게 서약서 두 장 전달하기','principal','morris'],
  ['스콜에게 온 답장','학교 앞 스콜에게 카디쟈의 답장 건네기','campus','scoll'],
  ['제9화 완료 · 신뢰와 진심','두 왕국의 신뢰를 되찾고 엇갈린 편지도 무사히 전했습니다','campus','none']
 );
 x.chapters.push([112,133,'제9화 잃어버린 러브레터']);
 x.map.push(['library','아르피아 도서관',[275,390]],['judah','항구마을 쥬다',[492,183]]);
 x.scenes.library=(s,n,p)=>({id:'library',name:'아르피아 도서관 · 잊힌 주문',bg:'assets/maps-hires/library.webp',w:559,h:431,zoom:1.42,nodes:[[275,390],[205,360],[125,330],[72,285],[133,250],[215,260],[285,300],[365,335],[445,322],[500,270],[455,225],[390,205],[340,155],[285,120]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[6,11],[5,12]],entities:[p('back','학교 2층',275,390,'classroom',[935,260]),n('meli',455,225),{...n('letterdesk',133,250),type:'fixture'}]});
 x.scenes.judah=(s,n,p)=>({id:'judah',name:'항구마을 쥬다 · 개구리 가루 상점',bg:'assets/maps-hires/judah-harbor.webp',w:559,h:431,zoom:1.42,nodes:[[492,183],[430,168],[365,150],[305,135],[245,130],[180,124],[120,112],[68,92],[265,188],[205,208],[140,220],[82,198]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[3,8],[8,9],[9,10],[10,11],[11,6]],entities:[p('back','학교 앞으로',492,183,'campus',[866,621]),n('abdullah',245,130)]});
 x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);
  if(sc.id==='classroom')sc.entities.push({...p('library','도서관',935,260,'library',[275,390]),minStage:123});
  if(sc.id==='campus')sc.entities.push({...p('judah','항구마을 쥬다',866,621,'judah',[492,183]),minStage:124});
  if(sc.id==='basement'&&[115,117,121].includes(s.stage))sc.entities.push(n('scoll',505,300));
  if(sc.id==='dining'&&[118,120].includes(s.stage))sc.entities.push(n('sofia',550,270));
  if(sc.id==='koboldroom'&&s.stage===119)sc.entities.push(n('sofia',550,280));
  if(sc.id==='asuria'&&s.stage>=128&&s.stage<=130)sc.entities.push(n('sunny',364,490),n('xenia',517,351));
 };
 x.questItems=s=>[...items(s),
  ...(s.pledgeMine?[['난쟁이 왕국 신뢰 서약서','광산 사건을 함께 해결한 아르피아를 신뢰한다는 발디의 서약']]:[]),
  ...(s.pledgeAsuria?[['아수리아 신뢰 서약서','오염된 철의 원인을 밝힌 아르피아를 신뢰한다는 국왕의 서약']]:[]),
  ...(s.scollLetter&&!s.letterLost?[['스콜의 편지','카디쟈에게 전해 달라고 받은 봉인 편지']]:[]),
  ...(s.diamondOre?[['코볼트의 다이아 원석','쥬다의 희귀 재료와 바꿀 만한 맑은 원석']]:[]),
  ...(s.replacementLetter&&!s.letterSealed?[['소피아가 쓴 새 편지','원래 편지의 뜻을 살려 정갈하게 다시 쓴 편지']]:[]),
  ...(s.scollSignature&&!s.letterSealed?[['스콜의 서명 조각','새 편지에 붙여야 할 진짜 서명']]:[]),
  ...(s.attachSpell?[['도서관의 주문 기록','개구리 가루를 뿌리고 “붙여라”라고 외운다']]:[]),
  ...(s.frogPowder?[['개구리 가루','종이를 흔적 없이 붙이는 쥬다의 마법 재료']]:[]),
  ...(s.letterSealed&&!s.cardiaReply?[['완성된 편지','소피아의 글과 스콜의 서명을 마법으로 이은 편지']]:[]),
  ...(s.cardiaReply?[['카디쟈의 답장','스콜에게 직접 전해 달라는 짧고 단정한 답장']]:[])
 ];
 const ev={
  112:['classroom','julia',[['julia','광산 사건의 보고는 두 왕국에도 전해졌다. 이제 마지막으로 신뢰를 확인할 때란다.'],['you','제가 할 일이 있나요?'],['julia','모리스 교장 선생님이 자세히 말씀해 주실 거야. 교장실로 가 보렴.']]],
  113:['principal','morris',[['morris','광산과 아수리아가 다시 다투지 않으려면 서로의 약속이 필요하단다.'],['morris','두 왕국에서 아르피아를 신뢰한다는 서약서를 한 장씩 받아 오겠니?'],['you','직접 만나서 이번 사건의 결과도 다시 설명하겠습니다.']]],
  114:['bathroom','douglas',[['douglas','{name}, 지하 창고 쪽에서 스콜 선생님이 자네를 기다리더군.'],['you','왜 직접 올라오지 않으셨을까요?'],['douglas','남에게 들키고 싶지 않은 부탁이 있는 눈치였어. 조심해서 내려가 보렴.']]],
  115:['basement','scoll',[['scoll','쉿, 이 편지를 카디쟈에게 전해 주게. 이번에는 요구르트가 아니라 내 진심을 글로 썼네.'],['you','먼저 광산의 서약서를 받고 아수리아로 갈 예정이에요. 함께 전할게요.'],['scoll','고맙네. 누구에게도 보여 주지 말고 꼭 직접 건네게.']]],
  116:['mine','baldi',[['baldi','레인보우 웜의 원인까지 밝혀 주었으니 우리도 아르피아를 믿네. 여기 서약서일세.'],['you','두 왕국이 다시 좋은 물건을 주고받을 수 있도록 전할게요.'],['narrator','광산을 나서는 길, 가방의 끈이 바위에 걸렸다. 스콜의 편지는 떨어진 줄도 모르게 깊은 틈으로 사라졌다.']]],
  117:['basement','scoll',[['scoll','편지는 잘 가지고 있겠지? 배가 고프면 중요한 걸 잊기 쉬운 법이네.'],['you','그럼요… 우선 식당에서 빵을 먹고 출발하려고요.'],['narrator','잃어버렸다는 말을 차마 꺼내지 못했다. 식당에 가서 방법을 생각해 보자.']]],
  118:['dining','sofia',[['sofia','머피 아저씨가 코볼트에게 빵을 전해 달라고 하셨어. 같이 갈래?'],['you','좋아. 나도 생각을 정리할 시간이 필요했어.'],['sofia','무슨 일인지 모르지만, 혼자 끙끙대면 더 복잡해져. 걸으면서 이야기해.']]],
  119:['koboldroom','kobold',[['kobold','빵을 가져와 줬구려. 소피아 양은 말투는 차가워도 마음은 따뜻한 사람이오.'],['sofia','빵이 식겠어요. 그런 평가는 나중에 하세요.'],['kobold','하하! {name}에게는 이 다이아 원석을 주겠소. 언젠가 꼭 쓸 곳이 있을 거요.']]],
  120:['dining','sofia',[['you','사실 스콜 선생님의 편지를 광산에서 잃어버렸어.'],['sofia','솔직히 말했으면 더 쉬웠겠지만, 지금이라도 고치면 돼. 내용을 기억하지?'],['you','카디쟈에게 진심을 전하고 싶다는 편지였어.'],['sofia','내가 비슷하게 다시 써 줄게. 스콜 선생님의 진짜 서명만 받아 와.']]],
  121:['basement','scoll',[['you','선생님, 서약서 전달 확인서에 서명이 필요해요. 여기 아래에 부탁드릴게요.'],['scoll','흠, 외교 임무라면 당연히 도와야지. 자, 또 필요한 건 없나?'],['narrator','새 편지와 꼭 맞는 크기의 스콜 서명을 받았다. 이제 종이를 자연스럽게 이어야 한다.']]],
  122:['materials','chilli',[['chilli','종이를 흔적 없이 붙이려면 개구리 가루를 쓰면 된다. 주문도 하나 외워야 하는데…'],['you','또 주문을 잊으신 건가요?'],['chilli','도서관의 멜리라면 기록을 찾아 줄 게다. 이번에는 나도 적어 두마.']]],
  123:['library','meli',[['meli','개구리 가루의 접착 주문을 찾는다고? 오래된 재료 사전에 적혀 있어.'],['meli','가루를 얇게 뿌린 뒤 “붙여라”라고 또렷하게 말하면 돼.'],['you','붙여라. 이번에는 제가 꼭 기억할게요.'],['meli','가루가 없다면 쥬다 항구의 압둘라가 취급한단다.']]],
  124:['judah','abdullah',[['abdullah','개구리 가루는 흔하지 않지. 돈보다 반짝이는 원석과 바꾸고 싶군.'],['you','코볼트에게 받은 다이아 원석은 어떤가요?'],['abdullah','아주 맑은 원석이군! 거래 성립이오. 가루는 습기에 약하니 봉지를 잘 닫으시오.']]],
  126:['asuria','kingAsuria',[['kingAsuria','오염된 철의 원인을 밝혀 두 왕국의 오해를 풀어 주었네. 아수리아는 아르피아를 신뢰하네.'],['you','이 서약을 광산에도 전하겠습니다. 두 왕국이 다시 좋은 관계가 되길 바라요.'],['kingAsuria','좋은 뜻이로군. 카디쟈는 서쪽 집에 있네. 전할 것이 있다면 찾아가 보게.']]],
  127:['cardiahome','cardia',[['you','스콜 선생님이 직접 쓴 편지를 전해 달라고 하셨어요.'],['cardia','지난번에 내 뜻을 분명히 전했는데도 편지를 보냈군요. 그래도 읽어 보겠습니다.'],['sofia','답장을 재촉하지 않겠습니다. 저희는 왕국을 둘러보다 다시 올게요.']]],
  128:['asuria','sunny',[['sunny','광산의 검이 다시 안전해졌다니 다행이에요. 왕국 사람들도 아르피아 학생들을 믿어요.'],['you','두 곳이 다투기 전에 원인을 찾을 수 있어서 다행이에요.'],['sunny','서약서보다 그런 행동이 더 큰 믿음을 주는 것 같아요.']]],
  129:['asuria','xenia',[['xenia','마법학교 학생이 사건을 해결했다는 이야기를 들었네. 힘만 센 줄 알았더니 남의 말도 잘 듣는구먼.'],['you','처음부터 한쪽 말만 믿었다면 진짜 원인을 못 찾았을 거예요.'],['xenia','그 마음을 잊지 말게. 카디쟈 님의 답장도 준비됐을 거야.']]],
  130:['cardiahome','cardia',[['cardia','스콜 선생님의 마음은 알겠습니다. 하지만 서로의 뜻을 존중하는 것이 먼저라고 답장에 썼어요.'],['you','그대로 전하겠습니다.'],['cardia','소피아와도 이야기를 나누었어요. 차분하고 분명한 친구더군요. 둘이 함께 와 줘서 고마워요.']]],
  131:['principal','morris',[['you','난쟁이 광산과 아수리아의 신뢰 서약서 두 장을 받아 왔습니다.'],['morris','훌륭하구나. 글로 남긴 약속도 소중하지만, 너희가 보인 신중함이 이 신뢰를 만든 것이란다.'],['morris','이제 두 왕국은 오염된 철을 함께 조사하기로 했단다. 수고했다.']]],
  132:['campus','scoll',[['you','카디쟈의 답장이에요. 직접 전해 달라고 했어요.'],['scoll','드디어 답장이! 그런데 내 편지의 접힌 자리가 조금 달라 보이는군…'],['you','광산 길이 험해서 그랬을 거예요. 답장부터 읽어 보세요.'],['scoll','서로의 뜻을 존중하라… 알겠네. 이번에는 카디쟈의 말을 제대로 듣도록 하지. 고맙네, {name}.'],['sofia','다음에는 잃어버린 물건도 바로 말하는 게 좋겠어.'],['you','응. 이번에 정말 배웠어.']]]
 };
 x.interact=(e,a)=>{const s=a.state,q=s.stage;
  if(q===125&&s.scene==='library'&&e.id==='letterdesk'){
   if(!(s.replacementLetter&&s.scollSignature&&s.attachSpell&&s.frogPowder)){a.toast('편지·서명·주문·개구리 가루를 모두 준비하세요.');return true;}
   a.choicePuzzle(['감쪽같은 편지','멜리가 알려 준 순서대로 종이를 붙이려면?',['가루를 뿌리고 “붙여라”라고 외친다','종이를 물에 적셔 겹친다','불꽃으로 가장자리를 녹인다'],0,'개구리 가루를 얇게 뿌리고 “붙여라”라고 외워야 해.'],()=>{s.letterSealed=true;s.frogPowder=false;a.advance(126,15);a.refresh();a.talk([['narrator','스콜의 서명이 편지 끝에 감쪽같이 붙었다. 접힌 자국만 아주 희미하게 남았다.']]);a.save();});return true;
  }
  const row=ev[q];if(row&&s.scene===row[0]&&e.id===row[1]){a.talk(row[2],()=>{
   if(q===115)s.scollLetter=true;
   if(q===116){s.pledgeMine=true;s.scollLetter=false;s.letterLost=true;}
   if(q===119)s.diamondOre=true;
   if(q===120)s.replacementLetter=true;
   if(q===121)s.scollSignature=true;
   if(q===123)s.attachSpell=true;
   if(q===124){s.frogPowder=true;s.diamondOre=false;}
   if(q===126)s.pledgeAsuria=true;
   if(q===127)s.letterSealed=false;
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
