/* Episode 10: the missing Silent Sword. Plot outline sourced; dialogue and investigation rebuilt. */
(()=>{
 const x=window.ARPIA_EXTRA,decorate=x.decorate,interact=x.interact,items=x.questItems;
 Object.assign(x.defaults,{merchantOrder:false,whiteFurClue:false,silenceSwordMissing:false,sunGemClue:false,sunChestFound:false,fairyWingDust:false,sunChestGone:false,sunGemStolen:false});
 Object.assign(x.npcs,{
  esta:{name:'에스타',anim:'npc_010_도트_에스타',portrait:'teacher/에스타.png',height:67},
  gluglu:{name:'글루글루',anim:'npc_053_도트_글루글루',height:72},
  joker:{name:'조커',portraitPath:'assets/joker.png',height:74},
  silentSword:{name:'침묵의 검',portraitPath:'assets/silent-sword.png'},
  sunbox:{name:'태양 문양의 돌상자'}
 });
 x.quests.splice(91,1,
  ['제10화 · 미지의 적','마법 재료실 칠리에게 압둘라의 편지 받기','materials','chilli'],
  ['칠리의 주문서','마법 재료실 칠리에게 기초 세트 주문서 받기','materials','chilli'],
  ['사라진 침묵의 검','쥬다 항구의 압둘라에게 주문서 건네기','judah','abdullah'],
  ['하얀 털의 범인','학교 4층 모리스에게 단서 보고하기','principal','morris'],
  ['독수리 마을의 조언','독수리 마을 시바에게 수상한 털 보여 주기','eaglevillage','shiva'],
  ['가루다의 명상','마을 꼭대기의 가루다에게 단서 묻기','eaglevillage','garuda'],
  ['폭포에 사는 동물','쟈칼의 폭포에서 도비엘에게 털 보여 주기','waterfall','dobiel'],
  ['늑대의 흔적','폭포 안쪽의 쟈칼에게 털의 주인 묻기','waterfall','jackal'],
  ['대마왕의 그림자','독수리 마을 가루다에게 조사 결과 전하기','eaglevillage','garuda'],
  ['에스타와 함께','얼음 마을에서 기다리는 에스타 만나기','icevillage','esta'],
  ['침묵의 검과 태양의 보석','마법사의 도시에서 글루글루 만나기','magecity','gluglu'],
  ['조커가 숨긴 보물','도시의 조커에게 태양의 보석 위치 묻기','magecity','joker'],
  ['태양 문양의 돌상자','난쟁이 광산 깊은 갱도에서 돌상자 찾기','minedepths','sunbox'],
  ['상자를 여는 방법','마법사의 도시 조커에게 다시 묻기','magecity','joker'],
  ['요정의 날개 가루','님펜의 레오나에게 상자 열 가루 받기','nymphen','leona'],
  ['사라진 돌상자','광산 깊은 갱도에서 돌상자 자리 확인하기','minedepths','sunbox'],
  ['또 기욤의 거래','광산 안쪽 기욤에게 목격담 묻기','minedepths','guillaume'],
  ['기욤에게 줄 금덩이','광산 갱도에서 금덩이 찾기','minedepths','gold1'],
  ['보석을 문 늑대','금덩이를 기욤에게 주고 목격담 듣기','minedepths','guillaume'],
  ['제10화 완료 · 침묵의 검','늑대의 털과 사라진 태양의 보석을 단서로 다음 조사를 준비합니다','campus','none']
 );
 x.chapters.push([133,152,'제10화 미지의 적 · 침묵의 검']);
 x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);
  if(sc.id==='eaglevillage'&&s.stage>=137&&s.stage<=141){sc.entities.push(n('shiva',219,233),n('garuda',296,140));}
  if(sc.id==='waterfall'&&s.stage>=139&&s.stage<=140){sc.entities.push(n('dobiel',305,374),n('jackal',488,149));}
  if(sc.id==='icevillage'&&s.stage===142)sc.entities.push(n('esta',480,390));
  if(sc.id==='magecity'&&s.stage>=143&&s.stage<=146)sc.entities.push(n('gluglu',450,324),n('joker',310,375));
  if(sc.id==='minedepths'&&s.stage>=145&&s.stage<=151){
   sc.entities.push({...n('sunbox',340,275),type:'fixture'},n('guillaume',650,270));
   if(s.stage===150)sc.entities.push(...[{...n('gold1',235,265),type:'fixture'}].filter(e=>!s.goldFound.includes(e.id)));
  }
 };
 x.questItems=s=>[...items(s),
  ...(s.merchantOrder?[['칠리의 주문서','항구도시 쥬다의 압둘라에게 마법 재료 기초 세트를 부탁하는 주문서']]:[]),
  ...(s.whiteFurClue?[['침묵의 검 자리의 하얀 털','거칠고 긴 털. 평범한 항구 동물의 것은 아닌 듯하다']]:[]),
  ...(s.sunGemClue?[['글루글루의 기록','침묵의 검은 태양의 보석 가까이에서 반응한다']]:[]),
  ...(s.fairyWingDust?[['요정의 날개 가루','태양 문양 돌상자의 봉인을 푸는 님펜의 마법 가루']]:[]),
  ...(s.goldNuggets&&s.stage>=150?[['광산의 금덩이',`기욤과 다시 거래하기 위해 모은 금덩이 ${s.goldNuggets}/1`]]:[])
 ];
 const ev={
  133:["materials","chilli",[["chilli","압둘라에게서 편지가 왔구나. 네가 가져간 다이아몬드를 마음에 들어 한 모양이야."],["you","개구리 가루와 바꾼 원석 말씀이죠?"],["chilli","그 차액으로 고급 체력물약을 보내왔어. 편지에 네게 전해 달라고 적혀 있구나."],["you","이렇게 다시 챙겨 주실 줄은 몰랐어요. 감사 인사를 전해야겠네요."],["chilli","항구에 갈 거라면 마침 부탁할 일이 있어. 주문서를 찾아 놓을 테니 잠깐만 기다려 다오."]]],
  134:["materials","chilli",[["chilli","여기 있구나. 압둘라에게 마법 재료 기초 세트를 주문하는 편지야."],["you","기초 세트… 적혀 있는 대로 부탁드리면 되겠네요."],["chilli","그래. 편지를 꼭 보여 주렴. 말로 전하다가 품목을 빠뜨리면 또 다녀와야 하니까."],["you","선생님도 이번에는 주문하신 걸 잊으시면 안 돼요."],["chilli","허허, 내 책상에도 적어 두마. 조심해서 다녀오너라."]]],
  135:["judah","abdullah",[["you","보내 주신 물약 잘 받았어요. 칠리 선생님의 주문서도 가져왔고요."],["abdullah","좋은 원석을 구해 준 손님에게 드리는 보너스요. 또 좋은 물건이 생기면 가져오시오."],["narrator","압둘라는 기초 세트 주문서를 확인하다가 비어 있는 진열장 쪽으로 시선을 돌렸다."],["abdullah","그런데 큰일이 났소. 내가 가지고 있던 침묵의 검을 도둑맞았다오."],["you","그 검은 어떤 물건인데요?"],["abdullah","평범한 검으로 생각하면 안 되오. 사라진 자리에는 이런 털만 남아 있었소."],["narrator","압둘라가 길고 하얀 털을 내밀었다. 부탁받은 심부름을 하러 왔다가 뜻밖의 사건을 만나게 되었다."],["you","모리스 교장 선생님께 보여 드릴게요. 이 털로 범인을 찾을 수 있을지도 몰라요."]]],
  136:['principal','morris',[['morris','침묵의 검을 훔치고 이 털만 남겼다라… 범상한 상대는 아니구나.'],['you','누구에게 털을 보여 주면 좋을까요?'],['morris','독수리 마을의 가루다라면 먼 땅의 동물을 많이 알지. 직접 추적해 보는 것도 좋은 공부가 될 게다.']]],
  137:['eaglevillage','shiva',[['shiva','다시 만났구나. 가루다는 명상 중이지만 모리스의 부탁이라면 깨워도 괜찮을 게다.'],['you','침묵의 검을 훔친 범인의 털을 알아봐야 해요.'],['shiva','먼 여행이 필요하면 내가 바람길을 열어 주마. 우선 가루다에게 가 보렴.']]],
  138:["eaglevillage","garuda",[["garuda","하얀 털을 가져왔군. 어디 보자… 쟈칼의 털이 아닌가?"],["you","쟈칼 님이요? 이건 침묵의 검이 사라진 자리에 남아 있던 거예요."],["garuda","쟈칼을 찾아가 직접 보여 주게. 시바가 데려다줄 게야."],["you","털이 닮았다는 이유만으로 도둑이라고 생각하면 안 되겠죠. 직접 확인해 볼게요."]]],
  139:["waterfall","dobiel",[["dobiel","또 무슨 일이야? 이번에는 무엇을 찾고 있어?"],["you","쟈칼 님께 확인할 게 있어. 누가 흘린 건지 모르는 털을 가져왔거든."],["dobiel","안쪽에 계셔. 무슨 일인지 제대로 설명해 드려."],["you","응. 섣불리 짐작하지 않고 여쭤볼게."]]],
  140:["waterfall","jackal",[["you","침묵의 검이 도둑맞았어요. 가루다 님이 현장에 남은 털을 보고 쟈칼 님께 가 보라고 하셨어요."],["jackal","가루다가? 내 털인지부터 물으러 온 건가? 이리 줘 보게."],["jackal","이건 아마도 내 기억이 맞다면 늑대의 털인 것 같아."],["you","쟈칼 님의 털은 아니었군요. 범인을 알아낼 단서는 얻었어요."],["jackal","겉모습이 비슷하다고 같은 짐승은 아니지. 가루다에게도 제대로 전하게."]]],
  141:["eaglevillage","garuda",[["you","쟈칼 님은 이게 늑대의 털이라고 하셨어요. 쟈칼 님의 털은 아니래요."],["garuda","그렇군. 직접 확인하고 온 보람이 있구나. 검을 훔친 까닭까지 알아내야 할 게야."],["you","늑대가 왜 마법검을 가져갔는지 모르겠어요."],["garuda","모리스에게 지금까지 알아낸 일을 전하마. 다음 조사는 선생님과 상의해 보게."],["shiva","에스타 선생님이 얼음 마을에서 기다린다더군. 그쪽으로 가는 길은 내가 도와주마."]]],
  142:["icevillage","esta",[["esta","모리스 교장 선생님께서 네가 마법사의 도시에서 글루글루 마법사를 만나게 될 거라고 하셨어. 그래서 기다리고 있었지."],["you","교장 선생님이 다음에 만날 분까지 알아봐 주셨군요."],["esta","검을 훔친 자가 무엇을 하려는지부터 알아보자. 글루글루라면 오래된 마법 도구에 관해 알려 줄 수 있을 거야."],["you","이번에는 엉뚱한 분을 의심하지 않도록 차근차근 확인할게요."]]],
  143:["magecity","gluglu",[["gluglu","침묵의 검과 반응하는 보석이 있지. 태양의 보석이다."],["you","검을 훔친 자가 그 보석도 노릴 수 있다는 건가요?"],["gluglu","500년 전 마법전쟁이 끝난 뒤, 아르피아 대마법사가 대마왕을 땅속 깊은 곳에 봉인했다는 이야기는 알고 있겠지?"],["you","학교에서 배웠어요. 그 오래된 일과 이번 도난이 관련 있을까요?"],["gluglu","그래서 검 하나가 없어졌다고 가볍게 볼 수 없는 거다. 태양의 보석이 안전한지 확인해야 해."],["you","어디서 찾을 수 있죠?"],["gluglu","보석을 숨긴 곳은 조커에게 물어보거라. 자세한 사정은 그가 알고 있을 게야."]]],
  144:['magecity','joker',[['joker','태양의 보석? 예전에 난쟁이 광산 깊은 곳 돌상자에 숨겼지.'],['you','정확히 어느 길이에요?'],['joker','초승달 문 너머였던 건 확실한데… 마름모 바위 전인지 뒤인지 헷갈리네. 태양 문양을 찾으면 될 거야.']]],
  146:['magecity','joker',[['joker','상자가 잠겨 있었어? 아, 맞다! 요정의 날개 가루를 뿌려야 열려.'],['you','그 중요한 말을 왜 이제 하세요?'],['joker','잊지 않으려고 지도에도 그려 뒀는데 지도 둔 곳을 잊었거든. 님펜의 레오나에게 가 봐.']]],
  147:["nymphen","leona",[["leona","나나나… 어머, 무슨 일이니?"],["you","조커 님이 숨긴 태양의 보석을 찾고 있어요. 돌상자를 여는 데 요정의 날개 가루가 필요하대요."],["leona","그 봉인이구나. 이 가루를 가져가렴."],["you","이번에야말로 상자를 열 수 있겠어요. 고맙습니다."],["leona","서두르다가 흘리지 않게 조심하렴. 나나나…"]]],
  149:["minedepths","guillaume",[["you","태양의 보석이 있던 돌상자가 깨져 있어요. 누가 가져가는 걸 보셨나요?"],["guillaume","그때 무슨 일이 있었는지 듣고 싶은가? 그렇다면 금덩이를 가져와야지."],["you","이런 때도 대가를 받으시는군요."],["guillaume","내가 아는 이야기를 그냥 내줄 수는 없지."],["you","알겠어요. 하지만 이번에는 작은 소리라도 빼놓지 말고 말씀해 주세요."]]],
  151:["minedepths","guillaume",[["guillaume","금덩이는 잘 받았네. 그럼 내가 아는 대로 말해 주지."],["you","누가 보석을 가져갔는지 보셨나요?"],["guillaume","직접 본 건 아니야. 광산 안에서 큰 소리가 났던 건 기억하네. 무슨 일이 벌어졌는지는 나도 모르지."],["you","범인의 얼굴이나 달아난 길은 모르신다는 거네요…"],["narrator","기대했던 답은 얻지 못했다. 부서진 상자와 사라진 보석만이 남아 있었다."],["esta","확인하지 못한 일을 목격담처럼 보고할 수는 없겠지. 학교로 돌아가 확실히 알아낸 것부터 전하자."]]]
 };
 x.interact=(e,a)=>{const s=a.state,q=s.stage;
  if(q===145&&s.scene==='minedepths'&&e.id==='sunbox'){a.talk([['narrator','바위 사이에 태양 문양이 새겨진 돌상자가 있다. 뚜껑은 마법으로 굳게 봉인되어 있다.'],['you','억지로 열면 보석이 상할 수 있어. 조커에게 봉인을 푸는 법을 물어보자.']],()=>{s.sunChestFound=true;a.advance(146,10);a.refresh();a.save();});return true;}
  if(q===148&&s.scene==='minedepths'&&e.id==='sunbox'){a.talk([['narrator','돌상자의 뚜껑이 깨져 있고 안은 텅 비어 있다. 애써 구해 온 요정의 날개 가루를 쓸 필요조차 없어졌다.'],['you','잠겨 있던 상자를 부수고 보석을 가져갔어… 기욤이라면 소리를 듣거나 무언가 봤을지도 몰라.']],()=>{s.sunChestGone=true;a.advance(149,10);a.refresh();a.save();});return true;}
  if(q===150&&s.scene==='minedepths'&&e.id==='gold1'){if(s.goldFound.includes(e.id))return true;s.goldFound.push(e.id);s.goldNuggets=s.goldFound.length;a.refresh();a.toast(`금덩이 ${s.goldNuggets} / 1`);if(s.goldNuggets===1){a.advance(151,15);a.talk([['you','금덩이를 찾았어. 기욤에게 그때 무슨 일이 있었는지 듣자.']]);}a.save();return true;}
  const row=ev[q];if(row&&s.scene===row[0]&&e.id===row[1]){a.talk(row[2],()=>{
   if(q===133){window.ARPIA_SYS.inv.add(s,'healthGift10',1);a.toast('고급 체력물약 1개를 받았습니다.');}
   if(q===134)s.merchantOrder=true;
   if(q===135){s.merchantOrder=false;s.whiteFurClue=true;s.silenceSwordMissing=true;}
   if(q===143)s.sunGemClue=true;
   if(q===147)s.fairyWingDust=true;
   if(q===149){s.goldFound=[];s.goldNuggets=0;}
   if(q===151){s.sunGemStolen=true;s.goldNuggets=0;}
   a.advance(q+1,q===151?35:10);a.refresh();
   if(q===151)a.finish('제10화 완료 · 미지의 적','침묵의 검 자리에서 늑대의 털을 찾았지만 범인은 만나지 못했습니다. 태양의 보석까지 사라져 다음 조사가 필요합니다.');
   a.save();
  });return true;}
  if(q>=133){const small={gluglu:'침묵의 검과 태양의 보석이 가까워지면 아주 오래된 봉인이 흔들릴 수 있어.',joker:'지도를 잃어버린 건 아니야. 어디에 두었는지만 모르는 거지.',sunbox:s.sunChestGone?'부서진 돌상자 안에는 아무것도 남아 있지 않다.':'태양 문양의 돌상자는 마법으로 봉인되어 있다.'};if(small[e.id]){a.talk([[e.id==='sunbox'?'narrator':e.id,small[e.id]]]);return true;}}
  return interact(e,a);
 };
})();
