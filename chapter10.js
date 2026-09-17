/* Episode 10: the missing Silent Sword. Plot outline sourced; dialogue and investigation rebuilt. */
(()=>{
 const x=window.ARPIA_EXTRA,decorate=x.decorate,interact=x.interact,items=x.questItems;
 Object.assign(x.defaults,{merchantOrder:false,whiteFurClue:false,silenceSwordMissing:false,sunGemClue:false,sunChestFound:false,fairyWingDust:false,sunChestGone:false,sunGemStolen:false});
 Object.assign(x.npcs,{
  esta:{name:'에스타',anim:'npc_010_도트_에스타',portrait:'teacher/에스타.png',height:67},
  gluglu:{name:'글루글루',anim:'npc_053_도트_글루글루',height:72},
  joker:{name:'조커',portraitPath:'assets/joker.webp',height:74},
  silentSword:{name:'침묵의 검',portraitPath:'assets/silent-sword.webp'},
  sunbox:{name:'태양 문양의 돌상자'}
 });
 x.quests.splice(91,1,
  ['제10화 · 미지의 적','마법 재료실 칠리에게 압둘라의 편지 받기','materials','chilli'],
  ['침묵의 검 주문서','학교 4층 모리스에게 주문 품목 묻기','principal','morris'],
  ['사라진 침묵의 검','쥬다 항구의 압둘라에게 주문서 건네기','judah','abdullah'],
  ['하얀 털의 범인','학교 4층 모리스에게 단서 보고하기','principal','morris'],
  ['독수리 마을의 조언','독수리 마을 시바에게 수상한 털 보여 주기','eaglevillage','shiva'],
  ['가루다의 명상','마을 꼭대기의 가루다에게 단서 묻기','eaglevillage','garuda'],
  ['폭포에 사는 동물','쟈칼의 폭포에서 도비엘에게 털 보여 주기','waterfall','dobiel'],
  ['늑대의 흔적','폭포 안쪽의 쟈칼에게 털의 주인 묻기','waterfall','jackal'],
  ['대마왕의 그림자','독수리 마을 가루다에게 조사 결과 전하기','eaglevillage','garuda'],
  ['에스타와 함께','학교 앞에서 기다리는 에스타 만나기','campus','esta'],
  ['침묵의 검과 태양의 보석','마법사의 도시에서 글루글루 만나기','magecity','gluglu'],
  ['조커가 숨긴 보물','도시의 조커에게 태양의 보석 위치 묻기','magecity','joker'],
  ['태양 문양의 돌상자','난쟁이 광산 깊은 갱도에서 돌상자 찾기','minedepths','sunbox'],
  ['상자를 여는 방법','마법사의 도시 조커에게 다시 묻기','magecity','joker'],
  ['요정의 날개 가루','님펜의 레오나에게 상자 열 가루 받기','nymphen','leona'],
  ['사라진 돌상자','광산 깊은 갱도에서 돌상자 자리 확인하기','minedepths','sunbox'],
  ['또 기욤의 거래','광산 안쪽 기욤에게 목격담 묻기','minedepths','guillaume'],
  ['금덩이 세 개를 다시','광산 갱도에서 금덩이 3개 찾기','minedepths','gold1'],
  ['보석을 문 늑대','금덩이를 기욤에게 주고 목격담 듣기','minedepths','guillaume'],
  ['제10화 완료 · 침묵의 검','하얀 늑대가 침묵의 검과 태양의 보석을 노린다는 사실을 밝혔습니다','campus','none']
 );
 x.chapters.push([133,152,'제10화 미지의 적 · 침묵의 검']);
 x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);
  if(sc.id==='eaglevillage'&&s.stage>=137&&s.stage<=141){sc.entities.push(n('shiva',219,233),n('garuda',296,140));}
  if(sc.id==='waterfall'&&s.stage>=139&&s.stage<=140){sc.entities.push(n('dobiel',305,374),n('jackal',488,149));}
  if(sc.id==='campus'&&s.stage===142)sc.entities.push(n('esta',747,500));
  if(sc.id==='magecity'&&s.stage>=143&&s.stage<=146)sc.entities.push(n('gluglu',450,324),n('joker',310,375));
  if(sc.id==='minedepths'&&s.stage>=145&&s.stage<=151){
   sc.entities.push({...n('sunbox',340,275),type:'fixture'},n('guillaume',650,270));
   if(s.stage===150)sc.entities.push(...[{...n('gold1',235,265),type:'fixture'},{...n('gold2',475,435),type:'fixture'},{...n('gold3',670,430),type:'fixture'}].filter(e=>!s.goldFound.includes(e.id)));
  }
 };
 x.questItems=s=>[...items(s),
  ...(s.merchantOrder?[['모리스의 주문서','쥬다의 압둘라에게 침묵의 검을 포함한 물품을 주문하는 문서']]:[]),
  ...(s.whiteFurClue?[['침묵의 검 자리의 하얀 털','거칠고 긴 털. 평범한 항구 동물의 것은 아닌 듯하다']]:[]),
  ...(s.sunGemClue?[['글루글루의 기록','침묵의 검은 태양의 보석 가까이에서 반응한다']]:[]),
  ...(s.fairyWingDust?[['요정의 날개 가루','태양 문양 돌상자의 봉인을 푸는 님펜의 마법 가루']]:[]),
  ...(s.goldNuggets&&s.stage>=150?[['광산의 금덩이',`기욤과 다시 거래하기 위해 모은 금덩이 ${s.goldNuggets}/3`]]:[])
 ];
 const ev={
  133:['materials','chilli',[['chilli','압둘라가 지난 거래의 차액이라며 고급 마력약을 보내왔단다. 네 몫이야.'],['you','다이아 원석의 가치가 그렇게 컸군요.'],['chilli','그리고 내가 항구에서 사 와야 할 물건이 있었는데 또 잊었구나. 모리스 교장 선생님이 주문서를 가지고 계셔.']]],
  134:['principal','morris',[['morris','칠리가 주문하려던 물건 중에는 “침묵의 검”이라는 오래된 마법검이 있단다.'],['you','왜 학교에서 그런 검이 필요한가요?'],['morris','소리를 삼키는 성질을 연구하려는 것이지. 이 주문서를 압둘라에게 전해 다오.']]],
  135:['judah','abdullah',[['abdullah','이런, 주문이 조금 늦었소. 침묵의 검은 어젯밤 누군가 훔쳐 갔지.'],['silentSword','검이 있던 상자 주변에는 길고 하얀 털이 여러 올 남아 있었다.'],['you','범인이 흘린 털일 수 있겠어요. 교장 선생님께 가져가 볼게요.'],['abdullah','보통 도둑이 다룰 물건이 아니오. 아주 조심하시오.']]],
  136:['principal','morris',[['morris','침묵의 검을 훔치고 이 털만 남겼다라… 범상한 상대는 아니구나.'],['you','누구에게 털을 보여 주면 좋을까요?'],['morris','독수리 마을의 가루다라면 먼 땅의 동물을 많이 알지. 직접 추적해 보는 것도 좋은 공부가 될 게다.']]],
  137:['eaglevillage','shiva',[['shiva','다시 만났구나. 가루다는 명상 중이지만 모리스의 부탁이라면 깨워도 괜찮을 게다.'],['you','침묵의 검을 훔친 범인의 털을 알아봐야 해요.'],['shiva','먼 여행이 필요하면 내가 바람길을 열어 주마. 우선 가루다에게 가 보렴.']]],
  138:['eaglevillage','garuda',[['garuda','하얀 털의 짐승이라… 내 영역의 동물은 아니로군.'],['you','그럼 누가 알 수 있을까요?'],['garuda','쟈칼은 짐승들의 냄새와 흔적을 잘 안다. 시바를 타고 폭포로 가 보게.']]],
  139:['waterfall','dobiel',[['dobiel','이 냄새는 폭포 근처에서 사는 동물과 달라. 차갑고 아주 불길해.'],['you','쟈칼 님이라면 알까요?'],['dobiel','털을 보자마자 화낼지도 몰라. 그래도 안쪽에서 기다리고 계셔.']]],
  140:['waterfall','jackal',[['jackal','이 털… 그 늑대가 돌아온 것이로군. 냄새만 맡아도 기분이 나빠지는 놈이지.'],['you','침묵의 검을 가져간 이유도 아세요?'],['jackal','대마왕 아즈카를 섬기던 무리와 닿아 있을 수 있다. 가루다에게 그대로 전하게.']]],
  141:['eaglevillage','garuda',[['garuda','아즈카의 부활과 직접 관련된 자라면 검 하나로 끝나지 않을 게다.'],['you','다른 목표가 있다는 뜻인가요?'],['garuda','마법사의 도시의 글루글루가 오래된 마법 도구를 연구한다. 그에게 검의 반응을 물어보게.'],['shiva','나는 여러 번 날아 지쳤구나. 학교 앞 에스타 선생님과 함께 가렴.']]],
  142:['campus','esta',[['esta','네가 글루글루를 찾아갈 거라는 소식을 이미 들었단다.'],['you','어떻게 아셨어요?'],['esta','마법의 흐름이 한곳으로 모이고 있어. 혼자 가지 말고 내가 동행하마. 마법사의 도시로 출발하자.']]],
  143:['magecity','gluglu',[['gluglu','침묵의 검이 가장 크게 반응하는 물건은 태양의 보석이야. 두 물건이 만나면 봉인도 흔들릴 수 있지.'],['you','늑대가 그 보석까지 찾고 있을까요?'],['gluglu','가능성이 높아. 어디 숨었는지는 보물 장수 조커가 안다고 들었어.']]],
  144:['magecity','joker',[['joker','태양의 보석? 예전에 난쟁이 광산 깊은 곳 돌상자에 숨겼지.'],['you','정확히 어느 길이에요?'],['joker','초승달 문 너머였던 건 확실한데… 마름모 바위 전인지 뒤인지 헷갈리네. 태양 문양을 찾으면 될 거야.']]],
  146:['magecity','joker',[['joker','상자가 잠겨 있었어? 아, 맞다! 요정의 날개 가루를 뿌려야 열려.'],['you','그 중요한 말을 왜 이제 하세요?'],['joker','잊지 않으려고 지도에도 그려 뒀는데 지도 둔 곳을 잊었거든. 님펜의 레오나에게 가 봐.']]],
  147:['nymphen','leona',[['leona','태양 문양의 봉인이라면 이 날개 가루가 필요하겠구나.'],['you','늑대가 보석을 먼저 찾기 전에 서둘러야 해요.'],['leona','가루는 문양 전체에 고르게 뿌리렴. 하지만 급할수록 주변의 흔적도 잘 살펴야 한단다.']]],
  149:['minedepths','guillaume',[['guillaume','사라진 상자 말인가? 목격담은 있지만 이번에도 공짜로 말할 수는 없지.'],['you','또 금덩이 세 개죠?'],['guillaume','이제 거래 방식을 잘 아는군! 갱도에 드러난 작은 금덩이만 모아 오게.']]],
  151:['minedepths','guillaume',[['guillaume','약속한 금덩이가 맞군. 날개 가루를 찾으러 간 사이 하얀 늑대가 왔네.'],['you','그 늑대가 상자를 가져갔나요?'],['guillaume','상자를 깨고 노란 보석을 물고 달아났지. 북쪽 숲으로 향했네.'],['esta','침묵의 검에 이어 태양의 보석까지… 학교로 돌아가 다음 추적을 준비하자.']]]
 };
 x.interact=(e,a)=>{const s=a.state,q=s.stage;
  if(q===145&&s.scene==='minedepths'&&e.id==='sunbox'){a.talk([['narrator','바위 사이에 태양 문양이 새겨진 돌상자가 있다. 뚜껑은 마법으로 굳게 봉인되어 있다.'],['you','억지로 열면 보석이 상할 수 있어. 조커에게 봉인을 푸는 법을 물어보자.']],()=>{s.sunChestFound=true;a.advance(146,10);a.refresh();a.save();});return true;}
  if(q===148&&s.scene==='minedepths'&&e.id==='sunbox'){a.talk([['narrator','돌상자가 있던 자리에는 긁힌 자국과 하얀 털만 남아 있다.'],['you','가루를 구하러 간 사이 누군가 상자를 가져갔어! 기욤이라면 무언가 봤을지도 몰라.']],()=>{s.sunChestGone=true;a.advance(149,10);a.refresh();a.save();});return true;}
  if(q===150&&s.scene==='minedepths'&&/^gold[123]$/.test(e.id)){if(s.goldFound.includes(e.id))return true;s.goldFound.push(e.id);s.goldNuggets=s.goldFound.length;a.refresh();a.toast(`금덩이 ${s.goldNuggets} / 3`);if(s.goldNuggets===3){a.advance(151,15);a.talk([['you','세 개를 모두 모았어. 기욤에게 늑대의 행방을 듣자.']]);}a.save();return true;}
  const row=ev[q];if(row&&s.scene===row[0]&&e.id===row[1]){a.talk(row[2],()=>{
   if(q===133){s.ethers+=2;a.toast('고급 마력약 2개를 받았습니다.');}
   if(q===134)s.merchantOrder=true;
   if(q===135){s.whiteFurClue=true;s.silenceSwordMissing=true;}
   if(q===143)s.sunGemClue=true;
   if(q===147)s.fairyWingDust=true;
   if(q===149){s.goldFound=[];s.goldNuggets=0;}
   if(q===151){s.sunGemStolen=true;s.goldNuggets=0;}
   a.advance(q+1,q===151?35:10);a.refresh();
   if(q===151)a.finish('제10화 완료 · 미지의 적','침묵의 검과 태양의 보석을 훔친 하얀 늑대의 정체가 대마왕 아즈카의 세력과 이어져 있음을 알아냈습니다.');
   a.save();
  });return true;}
  if(q>=133){const small={gluglu:'침묵의 검과 태양의 보석이 가까워지면 아주 오래된 봉인이 흔들릴 수 있어.',joker:'지도를 잃어버린 건 아니야. 어디에 두었는지만 모르는 거지.',sunbox:s.sunChestGone?'상자가 있던 자리에는 깊은 발톱 자국만 남았다.':'태양 문양의 돌상자는 마법으로 봉인되어 있다.'};if(small[e.id]){a.talk([[e.id==='sunbox'?'narrator':e.id,small[e.id]]]);return true;}}
  return interact(e,a);
 };
})();
