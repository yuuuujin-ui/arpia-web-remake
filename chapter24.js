/* Original mystery resolution: wonavy.tistory.com/215. Reconstructed dialogue. */
(()=>{
 const x=ARPIA_EXTRA,m=ARPIA_MIDTERM;
 for(const[id,name,desc,icon]of[
 ['warrant24','글루글루 수배장','우체국에서 각지에 발송할 수배장','assets/midterm/certificate.png'],
 ['bind24','구속 마법의 사마귀 가루','주문 가몬망도와 함께 사용하는 재료','assets/midterm/fairy-powder.png'],
 ['gold24','기욤에게 줄 금덩이','목격담과 교환할 금덩이 세 개','assets/items/goldnugget.png'],
 ['prison24','학교 감옥 열쇠','료마가 맡긴 지하 감옥 열쇠','assets/underwater/keys.png']
 ])ARPIA_DATA.ITEMS['mt_'+id]={name,desc,kind:'quest',price:0,sell:0,icon};
 const bind=['구속 마법을 시전하세요','준비한 사마귀 가루를 뿌리고 올바른 주문을 외워야 합니다.',['가몬망도','홀리 라이트','훌라 피어나라'],0,'칠리 선생님께 배운 구속 주문은 가몬망도입니다.'];
 const rows=[
 {key:'wake',title:'료마에게 발견되다',scene:'boiler',npc:'ryoma',pos:[500,350],lines:[['ryoma','상처가 심하다. 먼저 머피에게 무슨 일이 있었는지 듣고 양호실로 가거라.'],['you','글루글루 마법사님이 저를 공격했어요…']]},
 {key:'kobold',title:'처음 지상으로 올라온 코볼트',scene:'boiler',npc:'murphy',lines:[['murphy','지하를 떠난 적 없는 코볼트가 여기까지 올라와 도움을 청했단다. 덕분에 널 찾았어.'],['you','코볼트가 저를 구해 줬군요. 꼭 고맙다고 전하고 싶어요.']]},
 {key:'heal',title:'양호실의 치료',scene:'infirmary',npc:'amela',lines:[['amela','지금은 몸을 회복하는 게 먼저야. 잠시 쉬렴.'],['narrator','치료를 받고 나자 정신이 맑아지고 통증도 가라앉았다.']],effect:s=>{s.hp=s.maxHp;s.mp=s.maxMp;s.enemyMirrorInjured=false;}},
 {key:'report',title:'믿을 수 없는 의혹',scene:'principal',npc:'morris',lines:[['you','신전에서 헝거의 털을 찾았고 거울 방에서 공격을 받았어요.'],['morris','글루글루가 복면 괴인이라니 믿기 어렵구나. 아직 설명되지 않은 사실이 있다.'],['ryoma','무리해서 혼자 판단하지 마라. 몸도 막 회복했으니 조심하고.']]},
 {key:'empty',title:'주인이 없는 신전',scene:'gluglutemple',npc:'templeSearch',pos:[520,650],fixture:true,lines:[['narrator','신전은 조용했다. 글루글루는 어디에도 보이지 않았다.'],['you','샤이아님께 행방을 물어보자.']]},
 {key:'doubt',title:'너무 쉽게 물러난 헝거',scene:'magecity',npc:'shaiya',pos:[555,490],lines:[['you','수중 던전에서 헝거가 힘을 전부 쓰지 않았던 것 같아요. 계속 마음에 걸려요.'],['shaiya','그 녀석을 너무 강하게 생각하는 것 아닐까요? 물속에서는 힘을 못 썼다고 했잖아요.']]},
 {key:'flee',title:'함정에 빠졌다는 글루글루',scene:'weila',npc:'gluglu',pos:[2150,9080],lines:[['gluglu','널 다치게 해서 미안하다. 복면 괴인이 만든 함정에 빠졌어. 지금은 나를 보내 주게.'],['you','기다리세요! 설명을…'],['narrator','발을 묶는 마법이 잠깐 움직임을 막았다. 글루글루는 텔레포트로 사라졌다.']],effect:s=>s.enemyGlugluFled=true},
 {key:'warrant',title:'수배장을 받다',scene:'principal',npc:'morris',lines:[['morris','직접 만나 사실을 확인해야겠다. 이 수배장을 우체국에 전해라.'],['morris','칠리에게 구속 마법도 배워 두거라. 생포해서 데려와야 한다.']],effect:s=>m.give(s,'warrant24')},
 {key:'binding',title:'구속 주문 가몬망도',scene:'materials',npc:'chilli',lines:[['chilli','사마귀 가루를 뿌리고 가몬망도라고 외우렴. 상대의 움직임을 묶는 구속 마법이다.'],['you','가몬망도. 꼭 기억할게요.']],effect:s=>{m.give(s,'bind24',2);s.enemyBindingLearned=true;}},
 {key:'post',title:'대륙에 보내는 수배장',scene:'shop',npc:'conrad',lines:[['conrad','각 마을에 곧바로 발송하겠습니다. 목격 소식이 오면 알려 드리죠.'],['you','부탁드립니다.']],effect:s=>{m.take(s,'warrant24');s.enemyWarrantSent=true;}},
 {key:'reply',title:'광산에서 온 답장',scene:'shop',npc:'ryoma',pos:[450,385],lines:[['ryoma','난쟁이 광산에서 목격했다는 답장이 왔다. 나와 함께 가자.']]},
 {key:'baldi',title:'갱도 안쪽으로 간 마법사',scene:'mine',npc:'baldi',lines:[['baldi','수배장에 그려진 마법사라면 갱도 안쪽으로 들어갔지. 기욤이 봤을 거야.']]},
 {key:'guillaume',title:'또 한 번의 거래',scene:'minedepths',npc:'guillaume',lines:[['guillaume','나도 먹고살아야 하지 않겠나. 금덩이 세 개면 어디로 갔는지 알려 주겠네.'],['you','이번에도 세 개군요. 찾아올게요.']]},
 ...[[235,265],[475,435],[670,430]].map((pos,i)=>({key:'gold'+i,title:'기욤의 금덩이 '+(i+1),scene:'minedepths',npc:'gold'+(i+1),pos,fixture:true,lines:[['narrator','갱도에서 금덩이를 하나 찾았다.']],effect:s=>m.give(s,'gold24')})),
 {key:'location',title:'수수께끼의 방',scene:'minedepths',npc:'guillaume',lines:[['guillaume','약속대로 말해 주지. 궁전의 수수께끼 방으로 들어갔다네.'],['ryoma','생포가 우선이다. 배운 주문을 잊지 마라.']],effect:s=>m.take(s,'gold24',3)},
 {key:'capture',title:'글루글루를 구속하다',scene:'dwarfpalace',npc:'gluglu',pos:[500,400],lines:[['gluglu','복면 괴인의 증거를 찾으러 온 거다. 난 결백해!'],['you','그 말씀은 교장 선생님 앞에서 해 주세요. 함께 가셔야 해요.']],choose:bind,effect:s=>{m.take(s,'bind24');s.enemyGlugluArrested=true;}},
 {key:'hearing',title:'교장실의 네 가지 질문',scene:'principal',npc:'morris',lines:[['morris','날개가루의 사용처, 신전의 헝거 털, 학생을 공격한 이유, 그리고 복면 괴인이라는 의혹. 차례로 설명하게.'],['gluglu','날개가루는 변비약에 썼네. 아수리아 국왕이 증명해 줄 거야.'],['ryoma','곧바로 확인하고 오겠습니다.']]},
 {key:'answers',title:'증거처럼 보였던 함정',scene:'principal',npc:'gluglu',pos:[590,280],lines:[['gluglu','헝거의 털은 누군가가 나를 범인으로 몰려고 둔 거야.'],['gluglu','거울 방에서는 복면 괴인이 결투를 요청해 기다리고 있었네. 어둠 속 학생을 그자로 착각했지.'],['you','저도 처음에는 료마 선생님을 괴인으로 착각했었어요…']]},
 {key:'confirmation',title:'확인된 약의 사용처',scene:'principal',npc:'ryoma',pos:[510,305],lines:[['ryoma','무함마드 알리 4세께 확인했습니다. 변비약에 썼다는 말은 사실입니다.'],['gluglu','진짜 복면 괴인은 샤이아야. 그녀가 자리를 비울 때마다 비밀과 주문서가 도난당했어.'],['shaiya','그건 억측이에요!'],['morris','주장만으로 결론을 낼 수는 없네. 혐의가 풀릴 때까지 감옥에서 기다리게.']],effect:s=>s.enemyMedicineAlibiConfirmed=true},
 {key:'escort',title:'샤이아를 데려다주기',scene:'magecity',npc:'shaiya',pos:[555,490],lines:[['shaiya','많이 지쳐 보이네요. 이 마나스톤을 쓰세요.'],['you','고맙습니다. 그런데 이 돌은…']],effect:s=>m.give(s,'invitation23')},
 {key:'recognize',title:'돌아온 히나의 초대장',scene:'magecity',npc:'letter23',pos:[310,375],fixture:true,lines:[['narrator','마나스톤을 살피자 히나가 건넸던 파티 초대장이 드러났다. 얼음 던전에서 잃어버린 바로 그 물건이었다.'],['you','샤이아님은 그곳에 없었다고 했는데… 왜 이 초대장을 가지고 있지?']],choose:['초대장이 말해 주는 사실','얼음 던전에서 잃어버린 내 초대장을 샤이아가 건넸습니다.',['그냥 같은 모양의 돌일 뿐이다','샤이아가 얼음 던전 현장에 있었던 단서다','글루글루가 다시 가져온 것이다'],1,'히나의 초대장은 고유한 물건이며 복면 괴인을 만난 자리에서 잃었습니다.'],effect:s=>s.enemyInvitationEvidence=true},
 {key:'key',title:'감옥 열쇠를 빌리다',scene:'lobby',npc:'ryoma',pos:[530,335],lines:[['you','이 초대장이 샤이아님에게 있었어요. 글루글루님을 만나 확인해야 해요.'],['ryoma','좋다. 이 열쇠로 지하 감옥에 가 보거라.']],effect:s=>{m.give(s,'prison24');s.enemyPrisonAccess=true;}},
 {key:'prison',title:'글루글루가 미행한 곳',scene:'schoolprison',npc:'gluglu',pos:[768,470],lines:[['gluglu','샤이아를 미행했더니 광산의 수수께끼 방으로 자주 가더군. 그 증거를 찾다 자네에게 잡힌 거야.'],['you','그다음 방까지 찾아볼게요. 누명을 꼭 벗겨 드릴게요.']]},
 {key:'reveal',title:'불타 사라진 복면',scene:'palacechamber',npc:'masked21',pos:[600,355],lines:[['masked21','글루글루가 누명을 썼으니 이 복면도 필요 없겠지.'],['narrator','불꽃이 복면을 삼켰다. 그 아래 드러난 얼굴은 샤이아였다.'],['you','찾았다! 모두를 속인 건 당신이었어!']],effect:s=>s.enemyShaiyaRevealed=true},
 {key:'hunger',title:'샤이아를 지키는 헝거',scene:'palacechamber',npc:'hunger',pos:[550,380],lines:[['hunger','여기서 살아 나가게 둘 줄 아느냐!'],['you','더는 다른 사람에게 누명을 씌우게 두지 않겠어!']],battle:'enemyHunger24'},
 {key:'shaiya',title:'저항하는 샤이아',scene:'palacechamber',npc:'shaiya',pos:[600,355],lines:[['shaiya','내 계획을 전부 망쳐 놓다니!'],['you','료마 선생님, 제가 구속 마법을 준비할게요!']],battle:'enemyShaiya24'},
 {key:'bind',title:'진짜 복면 괴인을 붙잡다',scene:'palacechamber',npc:'shaiya',pos:[600,355],lines:[['ryoma','지금이다! 움직임이 둔해졌다.'],['you','사마귀 가루를 뿌리고…']],choose:bind,effect:s=>{m.take(s,'bind24');s.enemyShaiyaArrested=true;}},
 {key:'verdict',title:'누명을 벗은 글루글루',scene:'principal',npc:'morris',lines:[['morris','글루글루의 혐의는 풀렸다. 샤이아는 감옥에 구금했다. 끝까지 진실을 밝혀냈구나.'],['gluglu','내 결백을 밝혀 줘서 고맙네. 다치게 한 일도 다시 사과하겠네.'],['you','저도 성급하게 의심했어요. 다음에는 사실을 더 신중하게 살필게요.'],['morris','네가 우리 학교 학생이라는 것이 자랑스럽다. 수고했다.']],effect:s=>{s.enemyGlugluArrested=false;s.enemyCaseSolved=true;m.take(s,'fur23');m.take(s,'letter23');},reward:90,ending:'히나의 초대장으로 진짜 복면 괴인 샤이아의 정체를 밝혔습니다. 글루글루는 석방되고 샤이아는 구금되었습니다.'}
 ];
 const captured24={
 "doubt": [
  [
   "you",
   "그때 헝거가 멍청한 척하고 진 것 같았어요. 너무 시원찮게 물러나서 계속 마음에 걸렸어요."
  ],
  [
   "shaiya",
   "겁낼 것 없어요. 우리가 힘을 합쳐 물리쳤잖아요."
  ],
  [
   "you",
   "글루글루님은 저에게 복면 괴인이 아니냐고 하셨어요. 마치 자기는 절대 복면 괴인이 아니라는 것처럼요."
  ],
  [
   "shaiya",
   "당황하게 해서 시간을 벌려던 말일 수도 있어요. 함부로 믿으면 안 돼요."
  ]
 ],
 "flee": [
  [
   "you",
   "글루글루 마법사님! 거기 계셨군요. 왜 저를 공격하셨어요?"
  ],
  [
   "gluglu",
   "진짜 복면 괴인이 만들어 놓은 함정에 걸려들어 빠지게 됐던 거야. 자네를 다치게 하려던 게 아니었네."
  ],
  [
   "you",
   "그렇다면 같이 교장 선생님께 가서 설명해 주세요."
  ],
  [
   "gluglu",
   "지금 붙잡히면 증거를 찾을 수 없어. 잠깐만 참게."
  ],
  [
   "narrator",
   "발밑을 묶는 마법 때문에 몸이 굳었다. 주문을 풀었을 때 글루글루는 이미 사라진 뒤였다."
  ]
 ],
 "binding": [
  [
   "chilli",
   "구속 마법을 하려면 사마귀 가루를 뿌린 다음 이 주문을 외우면 된단다."
  ],
  [
   "chilli",
   "주문은 바로 가몬망도란다. 거꾸로 외워 보면 외우기가 쉬울 거야."
  ],
  [
   "you",
   "가몬망도… 도망 못 가! 이제 잊어버리지 않겠어요."
  ],
  [
   "chilli",
   "마법은 상대가 약해졌을 때 사용해야 한다. 저항이 강한 상대에게 무턱대고 다가가지 말고."
  ]
 ],
 "post": [
  [
   "conrad",
   "이 수배장에 그려진 분은 글루글루 대마법사님 아닌가요? 무슨 일이죠?"
  ],
  [
   "you",
   "교장 선생님께서 각 마을에 보내 달라고 하셨어요. 사실을 확인하려면 먼저 찾으셔야 해요."
  ],
  [
   "conrad",
   "이러고 있을 때가 아니야. 그럼 이 일을 제일 먼저 처리해야겠군요."
  ]
 ],
 "baldi": [
  [
   "baldi",
   "들어왔소, 들어왔어. 심상치 않은 기운의 마법사가 안쪽으로 들어갔소."
  ],
  [
   "ryoma",
   "그림 속 인물이 맞습니까? 혼자였습니까?"
  ],
  [
   "baldi",
   "맞소. 더 안쪽은 기욤이 보았을 거요."
  ],
  [
   "you",
   "선생님, 기욤에게 가 봐요. 이번에는 그냥 알려 주려나…"
  ]
 ],
 "location": [
  [
   "guillaume",
   "알려 드리지. 늙은 마법사는 별로 된 문을 두 번 통과했소."
  ],
  [
   "you",
   "기욤 위의 별문을 지나고, 난쟁이 함정 위의 별문을 또 지나면 되는 거죠?"
  ],
  [
   "ryoma",
   "수수께끼의 방이군. 내 뒤를 따라오너라. 생포가 우선이다."
  ]
 ],
 "capture": [
  [
   "gluglu",
   "나는 자네들이 생각하는 복면 괴인이 아니라네. 난 도둑을 잡으려다 함정에 빠진 것이야."
  ],
  [
   "ryoma",
   "그렇다면 교장 선생님 앞에서 소명하십시오. 더 도망치게 둘 수는 없습니다."
  ],
  [
   "you",
   "죄송해요. 움직이지 마세요. 사마귀 가루를 뿌리고… 가몬망도!"
  ]
 ],
 "hearing": [
  [
   "shaiya",
   "마지막까지 속이려 했군요. 진짜 글루글루 마법사님이 맞네요."
  ],
  [
   "morris",
   "차분하게 하나씩 확인하세. 요정의 날개가루는 어디에 썼나?"
  ],
  [
   "gluglu",
   "그간 대답을 못 했던 것은 요정의 날개가루를 민망한 곳에 썼기 때문이야."
  ],
  [
   "gluglu",
   "요정의 날개가루는 변비에 탁월한 효과가 있지. 흠흠."
  ],
  [
   "you",
   "그래서 말해 주실 수 없다고 하셨던 거군요…"
  ],
  [
   "gluglu",
   "아수리아 국왕께 물어보면 사실인지 알 수 있을 걸세."
  ],
  [
   "ryoma",
   "제가 직접 확인하고 오겠습니다."
  ]
 ],
 "answers": [
  [
   "morris",
   "그렇다면 신전에서 나온 헝거의 털은 어떻게 설명하겠나?"
  ],
  [
   "gluglu",
   "나를 범인으로 몰려고 누군가 가져다 놓은 거겠지. 학생이 찾아낼 수 있는 곳에 말이야."
  ],
  [
   "morris",
   "거울 방에서 학생을 공격한 이유는?"
  ],
  [
   "gluglu",
   "나는 복면 괴인으로부터 만나서 결판을 내자는 도전장을 받았네. 어둠 속에서 들어오는 이를 그자로 착각했어."
  ],
  [
   "you",
   "저도 지하에서 료마 선생님을 보고 괴인인 줄 알았어요. 그래도… 제가 본 건 공격하시는 모습이었으니까요."
  ],
  [
   "gluglu",
   "그 점은 미안하네. 하지만 진짜 복면 괴인은 따로 있어. 바로 샤이아 마법사라네!"
  ]
 ],
 "confirmation": [
  [
   "ryoma",
   "무함마드 알리 4세가 눈물을 흘리셨습니다. 무려 마흔세 병의 변비약으로 드셨더라고요."
  ],
  [
   "morris",
   "약에 대한 설명은 사실이었군. 그래도 다른 의혹까지 저절로 풀리는 것은 아니네."
  ],
  [
   "gluglu",
   "최근 우리 마법사 조합의 비밀이나 주문서 등을 복면 괴인이 훔쳐 가는 일이 계속됐지."
  ],
  [
   "gluglu",
   "복면 괴인은 샤이아 마법사가 일을 비워야 나타나는 것을 보고 그녀를 의심할 수밖에 없었네."
  ],
  [
   "shaiya",
   "저를 모함하시는군요!"
  ],
  [
   "morris",
   "서로의 주장만으로 결정할 수는 없네. 사실을 더 확인할 때까지 감옥에서 기다리게."
  ],
  [
   "gluglu",
   "아니야, 나는 아니야. 복면 괴인은 바로 샤이아 마법사야…"
  ]
 ],
 "escort": [
  [
   "shaiya",
   "오늘은 정말 지치는 하루였어요. 탑까지 데려다줘서 고마워요."
  ],
  [
   "you",
   "같이 다니며 신경 쓰시느라 힘드셨죠. 들어가서 쉬세요."
  ],
  [
   "shaiya",
   "이 마나스톤을 받아 두세요. 도움이 될 거예요."
  ],
  [
   "you",
   "고맙습니다. 그런데 이 색과 표시는…"
  ]
 ],
 "recognize": [
  [
   "narrator",
   "마나스톤에 붙은 표식을 돌려 보자 히나가 적어 준 파티 초대장이 드러났다."
  ],
  [
   "you",
   "히나의 마나스톤 초대장! 분명 얼음 던전에서 싸우다가 잃어버렸는데…"
  ],
  [
   "you",
   "그곳에는 헝거와 복면 괴인이 있었어. 샤이아님이 어떻게 이걸 갖고 계셨지?"
  ],
  [
   "you",
   "글루글루님이 하신 말씀을 다시 확인해야겠어."
  ]
 ],
 "prison": [
  [
   "gluglu",
   "이제야 내 말을 들으러 왔나?"
  ],
  [
   "you",
   "샤이아님이 제가 잃어버린 초대장을 가지고 계셨어요. 무슨 일이 있었는지 더 알려 주세요."
  ],
  [
   "gluglu",
   "샤이아를 몰래 미행하던 나는 그녀가 자주 수수께끼의 방으로 간다는 것을 알았지."
  ],
  [
   "you",
   "글루글루님을 붙잡았던 바로 그 방이군요."
  ],
  [
   "gluglu",
   "그래. 안쪽까지 조사해 보게. 그곳에서 증거를 찾으려던 참에 자네들에게 붙잡힌 거야."
  ],
  [
   "you",
   "이번에는 겉으로 보이는 것만 믿지 않을게요. 꼭 확인하고 오겠어요."
  ]
 ],
 "reveal": [
  [
   "you",
   "…소리 없이 들어와서 아직 눈치채지 못했어."
  ],
  [
   "hunger",
   "크르르… 이제 글루글루 마법사가 복면 괴인이 되어 버렸으니 우리의 작전은 한층 쉬워지겠군."
  ],
  [
   "masked21",
   "몰래 신전에 들어가서 너의 털을 글루글루 마법사의 옷에다 묻혀 둔 것은 잘했어."
  ],
  [
   "masked21",
   "이건 글루글루가 진짜 범인의 누명을 뒤집어썼으니, 더 옷을 바꿔 입을 필요도 없군."
  ],
  [
   "narrator",
   "복면과 겉옷이 불꽃에 휩싸였다. 그 아래 드러난 얼굴은 샤이아였다."
  ],
  [
   "you",
   "찾았다! 남을 범인으로 만들려고 전부 꾸민 일이었어!"
  ]
 ]
};
 for(const r of rows)if(captured24[r.key])r.lines=captured24[r.key];
 Object.assign(rows.find(r=>r.key==='escort'),{scene:'shaiyatower',pos:[768,470]});
 const c=m.register(24,'내부의 적 3부 · 드러난 진실',rows,{cipherOpened24:false,enemyGlugluFled:false,enemyBindingLearned:false,enemyWarrantSent:false,enemyGlugluArrested:false,enemyMedicineAlibiConfirmed:false,enemyInvitationEvidence:false,enemyPrisonAccess:false,enemyShaiyaRevealed:false,enemyShaiyaArrested:false,enemyCaseSolved:false});ARPIA_ENEMY_CHAPTERS.push(c);
 x.encounters.enemyHunger24={name:'단지의 방 · 헝거',bg:'assets/forgotten-palace.png',intro:'복면 괴인의 도주를 막으세요.',next:c.keys.shaiya,xp:320,gold:110,sp:45,enemies:[{name:'헝거',element:1,hp:1250,maxHp:1250,atk:31,atb:0,artPath:'assets/original/character/other/헝거.png',height:160}]};
 x.encounters.enemyShaiya24={name:'진짜 복면 괴인 · 샤이아',bg:'assets/forgotten-palace.png',intro:'마법사를 약하게 만든 뒤 구속 주문으로 생포해야 합니다.',next:c.keys.bind,xp:340,gold:120,sp:45,enemies:[{name:'샤이아',element:1,hp:1200,maxHp:1200,atk:32,atb:0,npc:'shaiya'}]};
 const beforeCipher=x.interact;
 x.interact=(e,a)=>{const s=a.state;if(s.stage===c.keys.reveal&&e.id==='masked21'&&s.scene==='palacechamber'&&!s.cipherOpened24){a.talk([['narrator','안쪽 방을 가로막은 봉인에는 네 글자의 빈칸이 새겨져 있었다.'],['you','이 수수께끼는 전에도 풀었어. 문양의 순서대로 A, G, B, L…']],()=>a.choicePuzzle(['수수께끼 방의 봉인','기억한 네 글자를 올바른 순서로 고르세요.',['A B G L','A G B L','A L B G'],1,'문양의 순서는 A G B L입니다.','제24화 · 수수께끼의 방'],()=>{s.cipherOpened24=true;a.save();beforeCipher(e,a);}));return true;}return beforeCipher(e,a);};
 const deco=x.decorate;x.decorate=(sc,s,n,p)=>{deco(sc,s,n,p);if(sc.id==='schoolprison'&&s.enemyShaiyaArrested&&!sc.entities.some(e=>e.id==='shaiya'))sc.entities.push(n('shaiya',768,470));if(sc.id==='magecity'&&s.enemyShaiyaArrested)sc.entities=sc.entities.filter(e=>e.id!=='shaiya');};
 window.ARPIA_INVESTIGATION={bind,chapters:ARPIA_ENEMY_CHAPTERS};
})();
