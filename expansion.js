/* Later chapters use the same local engine. Original plot sources: RESEARCH.md. */
window.ARPIA_EXTRA={
 defaults:{advanced:false},
 npcs:{hina:{name:'히나',anim:'npc_002_도트_히나',portrait:'friend/히나.png'},douglas:{name:'더글라스',anim:'npc_036_도트_더글라스'},murphy:{name:'머피',anim:'npc_037_도트_머피',portrait:'worker/머피.png'},chilli:{name:'칠리',anim:'npc_035_도트_칠리',portrait:'teacher/칠리.png'},baldi:{name:'발디',anim:'npc_023_도트_발디',portrait:'other/발디.png'},kobold:{name:'코볼트',extra:'kobold',height:70,portrait:'other/코볼트.png'},moon:{name:'초승달 돌문',extra:'moon',height:120},scorpions:{name:'길을 막는 전갈',extra:'scorpion',height:80},wood:{name:'마른 장작'},stove:{name:'꺼진 난로'}},
 quests:[
 ['제4화 · 화장실에서 들리는 메아리','학교 앞에서 안색이 좋지 않은 히나 만나기','campus','hina'],
 ['히나의 걱정','학교 로비 → 양호실의 아멜라 선생님','infirmary','amela'],
 ['벽 너머의 울음소리','양호실 옆 화장실의 더글라스에게 묻기','bathroom','douglas'],
 ['보일러실의 비밀','학교 로비 → 보일러실의 머피 만나기','boiler','murphy'],
 ['어두운 계단 아래','보일러실 비밀계단 → 통로 끝 돌문 조사하기','underpass','moon'],
 ['초승달 문양','머피에게 닫힌 돌문에 대해 묻기','boiler','murphy'],
 ['문을 여는 마법 재료','학교 2층 → 마법 재료실의 칠리 찾기','materials','chilli'],
 ['잊어버린 주문','학교 서쪽 길 → 난쟁이 광산의 발디 찾기','mine','baldi'],
 ['따뜻한 배려','보일러실의 머피에게 주문 전하기','boiler','murphy'],
 ['지하의 친구를 위한 빵','학교 식당에서 빵 챙기기','dining','bread'],
 ['열려라, 초승달 돌문','지하 돌문에 송진 가루와 주문 사용하기','underpass','moon'],
 ['울음소리의 주인','돌문 안의 코볼트에게 빵 건네기','koboldroom','kobold'],
 ['추운 방에서','양호실 아멜라에게 코볼트의 상태 전하기','infirmary','amela'],
 ['코볼트에게 약을','지하 방으로 돌아가 약 건네기','koboldroom','kobold'],
 ['장작길을 되찾자','지하 복도에서 전갈들 제압하기','woodhall','scorpions'],
 ['작은 불씨의 준비','전갈이 떠난 복도 끝에서 장작 챙기기','woodhall','wood'],
 ['방을 따뜻하게','코볼트의 방에 장작을 놓고 난로 켜기','koboldroom','stove'],
 ['더는 무섭지 않은 소리','따뜻해진 방에서 코볼트와 이야기하기','koboldroom','kobold'],
 ['머피의 답례','보일러실 머피에게 해결 소식 전하기','boiler','murphy'],
 ['한 걸음 깊어진 마법','학교 2층 속성 선생님에게 주문서 보여 주기','classroom','teacher'],
 ['제4화 완료 · 자유 탐험','네 번째 이야기를 마쳤습니다. 지하의 친구도 찾아가 보세요','campus','none']
 ],
 chapters:[[42,62,'제4화 화장실에서 들리는 메아리']],
 map:[['infirmary','양호실',[390,300]],['bathroom','화장실',[480,395]],['boiler','보일러실',[180,460]],['underpass','지하 계단',[190,275]],['materials','마법 재료실',[250,380]],['mine','난쟁이 광산',[290,590]],['koboldroom','코볼트의 방',[260,370]],['woodhall','장작 보관 복도',[190,275]]],
 decorate(sc,s,n,p){
  const door=(id,label,x,y,to,spawn,minStage)=>({...p(id,label,x,y,to,spawn),minStage});
  if(sc.id==='campus'){sc.entities.push(n('hina',445,540),door('mine','난쟁이 광산',318,271,'mine',[290,590],49));}
  if(sc.id==='lobby')sc.entities.push(door('health','양호실',330,260,'infirmary',[390,300],43),door('boiler','보일러실',650,280,'boiler',[180,460],45));
  if(sc.id==='classroom')sc.entities.push(door('materials','마법 재료실',935,260,'materials',[250,380],48));
 },
 scenes:{
 infirmary:(s,n,p)=>({id:'infirmary',name:'학교 양호실 · 히나의 걱정',bg:'assets/maps-hires/health-center.webp',w:1000,h:400,zoom:1.12,nodes:[[390,300],[470,255],[560,218],[650,190],[360,227],[255,204]],edges:[[0,1],[1,2],[2,3],[1,4],[4,5]],entities:[{...n('amela',560,218),type:'fixture'},n('hina',470,255),p('back','학교 로비',390,300,'lobby',[430,215]),p('bath','화장실',650,190,'bathroom',[480,395])]}),
 bathroom:(s,n,p)=>({id:'bathroom',name:'학교 화장실 · 이상한 메아리',bg:'assets/maps-hires/bathroom.webp',w:720,h:480,zoom:1.12,nodes:[[480,395],[430,320],[320,310],[225,266],[505,266],[560,237]],edges:[[0,1],[1,2],[2,3],[1,4],[4,5]],entities:[n('douglas',560,237),n('hina',320,310),p('back','양호실',480,395,'infirmary',[650,190])]}),
 boiler:(s,n,p)=>({id:'boiler',name:'학교 보일러실 · 머피의 일터',bg:'assets/maps-hires/boiler-room.webp',w:820,h:504,zoom:1.2,nodes:[[180,460],[255,397],[350,373],[447,351],[510,394],[330,258],[281,224]],edges:[[0,1],[1,2],[2,3],[3,4],[2,5],[5,6]],entities:[{...n('murphy',447,351),type:'fixture'},p('back','학교 로비',180,460,'lobby',[205,278]),{...p('stairs','비밀계단',281,224,'underpass',[190,275]),minStage:46}]}),
 underpass:(s,n,p)=>({id:'underpass',name:'학교 지하 · 초승달의 문',bg:'assets/maps-hires/academy-underground.webp',w:1400,h:476,zoom:1.35,tint:'#06092355',nodes:[[190,275],[300,292],[410,287],[500,335],[610,372],[740,386],[905,375],[1055,356],[1200,330]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8]],entities:[p('back','보일러실',190,275,'boiler',[281,224]),n('hina',410,287),n('moon',1200,330),...(s.stage>=53?[p('opened','코볼트의 방',1280,325,'koboldroom',[260,370])]:[])]}),
 materials:(s,n,p)=>({id:'materials',name:'학교 마법 재료실 · 칠리의 수업',bg:'assets/maps-hires/materials-room.webp',w:800,h:480,zoom:1.15,nodes:[[250,380],[350,330],[430,290],[535,280],[620,245]],edges:[[0,1],[1,2],[2,3],[3,4]],entities:[n('chilli',430,290),p('back','학교 2층',250,380,'classroom',[935,260])]}),
 mine:(s,n,p)=>({id:'mine',name:'난쟁이 광산 · 발디의 작업장',bg:'assets/maps-hires/dwarf-mine.webp',w:800,h:650,zoom:1.15,nodes:[[290,590],[350,531],[457,543],[585,474],[660,407],[617,342],[520,307],[416,274],[300,279],[320,185]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9]],entities:[n('baldi',300,279),p('back','학교 앞으로',290,590,'campus',[318,271])]}),
 koboldroom:(s,n,p)=>({id:'koboldroom',name:s.stage>=59?'코볼트의 방 · 따뜻한 불빛':'코볼트의 방 · 차가운 난로',bg:'assets/maps-hires/materials-room.webp',w:800,h:480,zoom:1.2,tint:s.stage>=59?'#df93331a':'#071b4970',nodes:[[260,370],[350,330],[430,290],[550,280],[650,252]],edges:[[0,1],[1,2],[2,3],[3,4]],entities:[n('kobold',430,290),{...n('stove',650,252),type:'fixture'},p('back','지하 계단',260,370,'underpass',[1200,330]),{...p('woodhall','장작 보관 복도',550,280,'woodhall',[190,275]),minStage:56}]}),
 woodhall:(s,n,p)=>({id:'woodhall',name:'지하 복도 · 장작을 찾아서',bg:'assets/maps-hires/academy-underground.webp',w:1400,h:476,zoom:1.35,tint:'#100e2840',nodes:[[190,275],[300,292],[410,287],[500,335],[610,372],[740,386],[905,375],[1055,356],[1200,330]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8]],entities:[p('back','코볼트의 방',190,275,'koboldroom',[550,280]),...(s.stage<=56?[n('scorpions',740,386)]:[]),{...n('wood',1200,330),type:'fixture'}]})
 },
 encounters:{scorpions:{name:'장작길의 전갈들',bg:'assets/maps-hires/academy-underground.webp',intro:'전갈들이 복도를 막고 있습니다. 상성과 회복약을 활용하세요.',next:57,xp:85,gold:65,sp:25,enemies:[{name:'큰 전갈',element:2,hp:165,maxHp:165,atk:16,atb:0,sprite:'scorpion'},{name:'푸른 전갈',element:1,hp:135,maxHp:135,atk:12,atb:20,sprite:'scorpion'}]}},
 interact(e,a){
  const {state:s,talk,advance,refresh,toast,choicePuzzle}=a,q=s.stage;
  const events={
   42:['hina','campus',[['hina','{name}… 잠깐 같이 있어 줄래?'],['you','히나, 얼굴이 안 좋아 보여. 어디 아픈 거야?'],['hina','아픈 건 아닌데… 양호실까지 같이 가 줘. 선생님께 물어볼 게 있어.'],['you','알겠어. 천천히 가자. 로비에서 양호실로 가면 되지?']]],
   43:['amela','infirmary',[['amela','히나, 아직도 화장실에 못 갔니?'],['hina','거기서 또 이상한 울음소리가 나면 어떡해요…'],['you','화장실에서 울음소리가 난다고요?'],['amela','나도 들었단다. 어디서 나는 소리인지 몰라 모두 조금 불안해하지.'],['you','히나, 내가 함께 갈게. 그동안 더글라스 아저씨께 소리를 물어보자.']]],
   44:['douglas','bathroom',[['douglas','무슨 일이니? 뭔가 고장이라도 났어?'],['you','이 벽에서 울음소리가 들린대요. 무슨 소리인지 아세요?'],['hina','아까도 작게 끙끙거리는 소리가 났어요.'],['douglas','내가 살펴봤지만 변기나 세면대는 멀쩡해. 배관 아래쪽에서 울리는 것 같더구나.'],['douglas','보일러실의 머피에게 물어보렴. 지하 구조는 그 친구가 잘 알지.']]],
   45:['murphy','boiler',[['murphy','화장실에서 들리는 소리라… 그 바로 아래에 코볼트의 방이 있지.'],['you','그럼 유령의 소리는 아닌가요?'],['murphy','아마 코볼트일 거야. 이쪽 비밀계단을 따라 내려가면 방이 나오는데 문이 잠겨 있을지도 모르겠구나.'],['hina','정말 누가 아파서 내는 소리라면 도와줘야겠지?'],['murphy','횃불을 가져가렴. 어두운 곳에서는 떨어지지 말고 함께 다녀야 한다.']]],
   46:['moon','underpass',[['narrator','막다른 길을 돌아 통로 끝에 닿자, 초승달이 새겨진 무거운 돌문이 나타났다.'],['hina','손잡이도 열쇠 구멍도 없어. 어떻게 열지?'],['you','억지로 밀어서는 안 열리겠어. 머피 아저씨께 문양을 설명해 보자.']]],
   47:['murphy','boiler',[['murphy','초승달이 그려진 문이라고? 오래된 마법 자물쇠구나.'],['you','문 너머에서 희미한 소리가 들렸어요.'],['murphy','마법 재료가 필요할 거야. 2층 마법 재료실에 있는 칠리 선생님께 물어보렴.'],['hina','칠리 선생님이라면 분명 방법을 아실 거야.']]],
   48:['chilli','materials',[['chilli','초승달 돌문? 송진 가루를 뿌리고 주문을 외우면 되지. 여기, 조금 가져가렴.'],['you','어떤 주문을 외우면 되나요?'],['chilli','주문이… 분명 아주 간단한 말이었는데. 이런, 생각이 안 나는구나.'],['hina','선생님도 잊어버릴 때가 있으시네요.'],['chilli','난쟁이 광산의 발디라면 기억할 게다. 학교 서쪽 길로 가 보렴.']]],
   49:['baldi','mine',[['baldi','하하, 그 주문을 찾으러 여기까지 왔다고?'],['you','칠리 선생님이 송진 가루를 주셨는데 주문을 잊으셨대요.'],['baldi','주문은 딱 한마디다. 열려라!'],['hina','정말 그것뿐이에요?'],['baldi','간단하다고 얕보면 안 되지. 올바른 재료와 문을 열려는 마음이 함께해야 해.'],['you','잘 기억할게요. 송진 가루를 뿌리고, 열려라!']]],
   50:['murphy','boiler',[['you','송진 가루도 구했고 주문도 알아왔어요.'],['murphy','잘했구나. 그런데 코볼트가 오랫동안 밖으로 나오지 않았네. 배가 많이 고플 거야.'],['hina','그럼 식당에서 빵을 챙겨 갈게요.'],['murphy','좋은 생각이야. 돌아오는 길도 잘 기억해 두렴.']]],
   51:['bread','dining',[['hina','따뜻한 빵을 챙겼어. 혼자 지하에 있었다면 많이 배고팠을 거야.'],['you','이제 돌문을 열 수 있겠어. 송진 가루와 주문도 준비됐고.'],['narrator','두 사람은 코볼트에게 줄 빵을 소중히 가방에 넣었다.']]],
   53:['kobold','koboldroom',[['kobold','누, 누구요? 콜록…'],['you','저희는 아르피아 학생이에요. 소리가 들려서 찾아왔어요. 우선 이 빵을 드세요.'],['kobold','고맙소. 며칠째 제대로 먹지도, 불을 피우지도 못했소.'],['hina','방이 너무 차가워. 왜 난로를 켜지 않으셨어요?'],['kobold','장작을 가지러 가는 길을 전갈들이 막았소. 추워서 앓는 소리가 배관을 타고 위층까지 갔나 보오.'],['you','먼저 양호 선생님께 약을 받아 올게요. 조금만 기다려 주세요.']]],
   54:['amela','infirmary',[['you','울음소리는 코볼트가 아파서 내는 소리였어요. 전갈 때문에 장작을 구하지 못해 추운 방에 계셨어요.'],['amela','그랬구나. 이 약을 전해 주렴. 방도 따뜻하게 해 줘야 할 텐데.'],['hina','장작을 가져올 방법도 찾아볼게요.'],['amela','무리하지는 말고. 너희도 잠깐 쉬렴. 체력과 마력을 회복해 주마.']]],
   55:['kobold','koboldroom',[['you','아멜라 선생님이 주신 약이에요.'],['kobold','이렇게 도와주다니… 고맙소. 조금 몸이 편해지는군.'],['hina','이제 장작을 구해 올게요. 복도 끝으로 가면 되죠?'],['kobold','그렇소. 전갈을 조심하시오. 이 빚을 어떻게 갚아야 할지…'],['you','학교에서 들리는 소리도 해결하고, 코볼트 님도 따뜻해지면 저희도 기뻐요.']]],
   57:['wood','woodhall',[['narrator','전갈이 떠난 자리 너머로 마른 장작이 쌓여 있다. 두 사람이 나누어 들 만큼만 챙겼다.'],['hina','이제 코볼트의 방에 불을 피울 수 있겠다.'],['you','장작을 가져가서 난로를 살펴보자.']]],
   59:['kobold','koboldroom',[['kobold','아, 따뜻하구나. 이제야 몸이 녹는 것 같소.'],['hina','위층에서는 무서운 소리라고만 생각했어요. 도와달라는 소리였는데…'],['you','직접 와서 이야기를 들어 보길 잘했어.'],['kobold','너희가 아니었다면 아직도 추위에 떨고 있었겠지. 정말 고맙소.'],['you','이제 편히 쉬세요. 머피 아저씨께도 소식을 전할게요.']]],
   60:['murphy','boiler',[['murphy','드디어 배관이 조용해졌구나. 코볼트도 괜찮아졌다니 다행이야.'],['you','약을 드리고 장작으로 불을 피웠어요.'],['murphy','수고했다. 고맙다는 뜻으로 이 주문서를 주마. 고급 마법을 배우는 데 도움이 될 거야.'],['hina','{name}, 좋은 일을 하고 새 마법도 배우네!'],['murphy','2층의 속성 선생님께 가져가 보렴. 잘 쓰면 친구들을 돕는 힘이 될 게다.']]],
   61:['teacher','classroom',[['teacher','머피가 준 주문서로구나. 겉모습보다 깊은 곳을 살핀 학생에게 어울리는 가르침이지.'],['you','무섭다고 피하기만 했다면 코볼트 님을 돕지 못했을 거예요.'],['teacher','옳다. 오늘은 더 많은 마력을 모아 주문의 힘을 높이는 방법을 배우자.'],['teacher','강화 마법은 MP 7을 사용한다. 기본 주문보다 강하지만 마력을 잘 관리해야 해.'],['you','네. 새로운 힘도 누군가를 돕는 데 사용할게요.'],['hina','화장실도 이제 무섭지 않아. 함께 가 줘서 고마워!']]]
  };
  if(q===52&&e.id==='moon'&&s.scene==='underpass'){
   const steps=[['마법 재료 준비','발디에게 들은 순서를 떠올려 보세요. 먼저 돌문의 초승달 문양에 무엇을 해야 할까요?',['송진 가루를 뿌린다','돌문을 부순다','빵을 문틈에 넣는다'],0,'칠리 선생님이 준 송진 가루를 사용해야 해.'],['돌문을 여는 주문','송진 가루가 달빛처럼 빛납니다. 발디에게 배운 주문은?',['잘 자라','열려라','날아라'],1,'발디가 알려 준 간단한 말, 문을 여는 말이었어.']];
   const step=Math.min(1,s.puzzleStep);choicePuzzle(steps[step],()=>{if(step===0){s.puzzleStep=1;a.save();a.again('moon');}else{s.puzzleStep=0;advance(53,15);refresh();talk([['narrator','초승달 문양이 빛나더니 돌문이 천천히 열렸다. 안쪽에서 작은 기침 소리가 들려왔다.']]);}});return true;
  }
  if(q===56&&e.id==='scorpions'){talk([['hina','전갈들이 길을 막고 있어. 무리하지 말고 마법과 정령을 함께 써 봐.'],['you','장작이 바로 저 너머야. 준비하고 시작하자.']],()=>a.battle('scorpions'));return true;}
  if(q===58&&e.id==='stove'){choicePuzzle(['따뜻한 불씨','마른 장작을 난로 안에 놓았습니다. 방을 따뜻하게 만들려면?',['난로 문을 닫고 작은 불씨를 붙인다','장작을 다시 복도로 가져간다','방바닥에 불을 붙인다'],0,'장작은 난로 안에서 태워야 해. 작은 불씨면 충분해.'],()=>{advance(59,15);refresh();talk([['narrator','난로 안에서 불이 타오르자 방 안에 부드러운 온기가 퍼졌다.']]);});return true;}
  const ev=events[q];if(ev&&s.scene===ev[1]&&(e.id===ev[0]||(ev[0]==='teacher'&&['aron','scoll','esta'].includes(e.id)))){talk(ev[2],()=>{advance(q+1,q===61?30:10);if(q===54||q===51){s.hp=s.maxHp;s.mp=s.maxMp;}if(q===61){s.advanced=true;a.finish('제4화 완료 · 따뜻한 마음','보이지 않는 곳의 작은 목소리에 귀를 기울였습니다. 코볼트의 방에 다시 온기가 돌아왔습니다.');}refresh();a.save();});return true;}
  if(e.id==='moon'){talk([['narrator',q>=53?'초승달 돌문은 열려 있다.':'무거운 돌문이 길을 막고 있다. 머피에게 물어보자.']]);return true;}
  if(e.id==='wood'||e.id==='stove'){talk([['narrator',q>=59?'따뜻한 방을 위해 남겨 둔 장작이다.':'장작과 난로는 코볼트를 도울 때 사용할 수 있다.']]);return true;}
  const small={hina:q>=62?'이제 이상한 소리가 나면 먼저 누구의 목소리인지 생각해 보려고.':'혼자 가기 무서운 곳도 함께라면 조금 용기가 나.',murphy:'보일러와 배관을 돌보는 일도 학교를 지키는 일이지.',douglas:'모두가 편하게 지내도록 매일 둘러보고 있단다.',chilli:'마법 재료는 이름과 쓰임을 정확히 기억해야 한단다.',baldi:'아주 간단한 말에도 마법이 담길 수 있지.',kobold:q>=59?'오늘은 따뜻한 방에서 편히 쉴 수 있겠소.':'콜록… 장작만 구할 수 있다면 좋으련만.'};
  if(small[e.id]){talk([[e.id,small[e.id]]]);return true;}return false;
 }
};
