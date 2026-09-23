/* Verified event order: https://wonavy.tistory.com/214. Reconstructed dialogue. */
(()=>{
 const x=ARPIA_EXTRA,m=ARPIA_MIDTERM,D=ARPIA_DIVE;
 const item=(id,name,desc,icon)=>ARPIA_DATA.ITEMS['mt_'+id]={name,desc,kind:'quest',price:0,sell:0,icon};
 item('bread21','코볼트에게 줄 식빵','학교 식당에서 챙긴 따뜻한 빵','assets/midterm/bread21.png');
 item('wood21','코볼트의 장작','숯을 만들 마른 장작','assets/midterm/plunger-wood.png');
 item('coal21','오당카에게 줄 숯','코볼트에게 받은 선물용 숯','assets/items/charcoal.png');
 item('medicine21','아카니아 치료약','칠리가 조제한 오당카의 치료약','assets/midterm/healing-potion.png');
 item('map21','용병 소굴 지도','난쟁이 광산과 아수리아 사이의 협곡을 가리킨다.','assets/midterm/certificate.png');
 item('sand21','소굴의 모래','아이작이 갇힌 상자에서 발견한 모래','assets/midterm/sand21.png');
 item('helmet21','탈리샤의 안전모','큐리어스가 맡아 두었던 조사용 안전모','assets/midterm/helmet21.png');
 item('results21','중간고사 최종 성적표','기초학·전투 무효 / 마법약·던전 탐험·비밀 시험 100점 / 시험 승급 없음','assets/midterm/certificate.png');
 Object.assign(x.npcs,{
  mercenary21:{name:'떠돌이 용병',artPath:'assets/midterm/mercenary21.png',portraitPath:'assets/midterm/mercenary21-large.png',height:72},
  masked21:{name:'복면 괴인',artPath:'assets/midterm/masked21.png',portraitPath:'assets/midterm/masked21-large.png',height:80},
  wood21:{name:'마른 장작',artPath:'assets/midterm/plunger-wood.png',height:32},
  chest21:{name:'용병의 상자',artPath:'assets/midterm/chest21.png',height:37}
 });
 const rows=[
 {key:'rumor',title:'마지막 과목을 앞두고',scene:'lobby',npc:'sofia',lines:[['sofia','어스 드래곤을 다시 봉인했다면서요? 벌써 네 과목이 모두 만점이에요.'],['isaac','나는 이번 시험까지 놓치면 큰일인데…'],['you','아직 마지막 시험이 남았어. 교장 선생님께 가 볼게.']]},
 {key:'order',title:'동생 퀴즈포켓을 데려와라',scene:'principal',npc:'morris',lines:[['morris','마지막은 각자 다른 과제를 수행하는 비밀 시험이다. 퀴즈포켓에서 네 과제를 꺼내 보거라.'],['quizpocket','오당카의 오두막에 있는 제 동생을 이곳으로 데려오십시오.'],['you','동생을… 네, 다녀오겠습니다.']]},
 {key:'hina',title:'숨길 수 없는 고민',scene:'campus',npc:'hina',lines:[['hina','얼굴이 왜 그래? 시험 때문에 고민이면 머피 아저씨께 이야기해 봐.'],['you','응. 먼저 머피 아저씨를 만나 볼게.']]},
 {key:'murphy',title:'마지막 시험의 뜻',scene:'boiler',npc:'murphy',lines:[['you','퀴즈포켓 동생에게 시험 내용을 미리 들었어요. 지금이라도 말씀드려야 할까요?'],['murphy','답을 미리 알았다면 정당하게 치른 시험이라고 할 수 없겠지. 남은 과제를 하면서 네 행동을 생각해 보렴.'],['murphy','오당카에게 갈 거라면 코볼트의 숯을 선물로 가져가거라. 식당에서 그 친구에게 줄 빵도 챙기고.']]},
 {key:'bread',title:'지하의 친구를 위한 빵',scene:'dining',npc:'bread',pos:[435,400],fixture:true,lines:[['narrator','코볼트에게 줄 따뜻한 식빵을 챙겼다.'],['you','지하 통로를 지나 코볼트에게 가자.']],effect:s=>m.give(s,'bread21')},
 {key:'kobold',title:'지하를 돌아다니는 사람',scene:'koboldroom',npc:'kobold',lines:[['kobold','요즘 누군가 지하를 돌아다녀서 무섭소. 빵 냄새가 나는군… 고맙소.'],['you','누군지 봤나요? 오당카 님께 드릴 숯도 구하고 싶어요.'],['kobold','얼굴은 못 봤소. 장작방에서 나무를 가져다주면 숯을 주겠소.']],effect:s=>m.take(s,'bread21')},
 {key:'wood',title:'장작방의 마른 나무',scene:'woodhall',npc:'wood21',pos:[740,386],fixture:true,lines:[['narrator','잘 마른 장작을 골라 묶었다.'],['you','코볼트에게 가져가자.']],effect:s=>m.give(s,'wood21')},
 {key:'coal',title:'코볼트의 답례',scene:'koboldroom',npc:'kobold',lines:[['kobold','좋은 장작이오. 이 숯을 오당카 님께 가져가시오.'],['you','고마워요. 나가는 길에 거울이 있는 곳도 확인해 볼게요.']],effect:s=>{if(!s.secretCoalReceived21){m.take(s,'wood21');m.give(s,'coal21');s.secretCoalReceived21=true;}}},
 {key:'mirror',title:'거울 앞의 복면 괴인',scene:'underpass',npc:'friedsMirror',pos:[905,375],fixture:true,lines:[['narrator','거울 방에서 나온 복면 괴인이 손을 들어 주문을 외웠다. 붙잡으려는 순간 모습이 사라졌다.'],['you','프리드의 거울은 그대로 있어. 그래도 이 일은 교장 선생님께 알려야 해.']],effect:s=>s.secretMirrorWitness=true},
 {key:'report',title:'교장에게 목격 사실 보고',scene:'principal',npc:'morris',lines:[['you','지하 거울 방에서 복면을 쓴 사람을 봤어요. 곧바로 텔레포트해서 사라졌어요.'],['morris','거울 속 미로는 아즈카조차 쉽게 풀 수 없다. 이 일은 내가 살피마. 너는 마지막 시험을 계속하거라.']]},
 {key:'rudolph',title:'습격당한 오두막',scene:'hut',npc:'rudolph',lines:[['rudolph','큰일이야! 오당카 님이 습격당했어. 퀴즈포켓 동생도 없어졌고!'],['you','우선 오당카 님을 치료해야 해. 곁에 있는 훌라 버섯부터 몰아내자.']]},
 {key:'hula',title:'쓰러진 마법사 곁의 버섯',scene:'hut',npc:'hula17',pos:[315,265],fixture:true,lines:[['you','오당카 님께 가까이 오지 마!']],battle:'secretHula21'},
 {key:'firstAid',title:'오당카의 응급처치',scene:'hut',npc:'odangka',lines:[['narrator','버섯을 물리치고 오당카에게 응급약을 먹였다. 숨은 안정됐지만 아직 의식이 흐렸다.'],['you','더 강한 치료약이 필요해. 아카니아 물약이라면… 칠리 선생님께 가자.']]},
 {key:'medicine',title:'다시 만드는 아카니아 치료약',scene:'materials',npc:'chilli',pos:[430,290],lines:[['chilli','오당카가 다쳤다고? 시험 때 네가 썼던 아카니아 치료약을 준비해 주마.'],['you','감사합니다. 바로 가져가겠어요.']],effect:s=>m.give(s,'medicine21')},
 {key:'heal',title:'납치된 퀴즈포켓',scene:'hut',npc:'odangka',lines:[['odangka','이제 좀 정신이 드는군. 떠돌이 용병들이 퀴즈포켓 동생을 노리고 들이닥쳤다.'],['you','제가 찾아올게요. 코볼트가 만든 숯도 가져왔어요. 몸부터 회복하세요.'],['odangka','이 와중에 선물까지… 고맙구나. 놈들을 얕보지 마라.']],effect:s=>{m.take(s,'medicine21');m.take(s,'coal21');s.secretOdangkaHealed=true;}},
 {key:'direction',title:'루돌프가 엿들은 말',scene:'hut',npc:'rudolph',lines:[['rudolph','숨었을 때 들었어. 데런 왕국 쪽으로 간다고 했어!'],['you','좋은 단서야. 에드워드 경에게 도움을 청할게.']]},
 {key:'edward',title:'여행자를 습격하는 용병들',scene:'kingdom',npc:'edward',lines:[['edward','그 무리라면 여행자를 상대로 강도질을 일삼고 있다. 나도 추적 중이지. 함께 불꽃 마을로 가자.'],['you','납치된 퀴즈포켓도 꼭 찾아야 해요.']]},
 {key:'emery',title:'불꽃 마을의 소식',scene:'firevillage',npc:'emery',pos:[295,255],lines:[['emery','우리 마을에는 그런 피해가 없었단다. 에드워드 경은 온천에서 몸을 풀고 계시던데?'],['you','이럴 때 온천이라니… 얼음 마을 쪽도 확인해 봐야겠어요.']]},
 {key:'humphrey',title:'얼음 마을의 피해',scene:'icevillage',npc:'humphrey',pos:[397,466],lines:[['humphrey','용병들이 마을 근처를 어슬렁거리며 사람들을 괴롭힌다네. 왕국에 세금을 내는 이유가 무엇인가!'],['you','주변을 수색해서 붙잡을게요.']]},
 {key:'patrol',title:'마을 밖 떠돌이 용병',scene:'weila',npc:'mercenary21',pos:[3680,4350],fixture:true,lines:[['mercenary21','학교 학생이 무슨 배짱으로 우리 앞을 막느냐?'],['you','오당카 님을 습격한 동료들은 어디 있어?']],battle:'secretPatrol21'},
 {key:'map',title:'용병 소굴의 지도',scene:'weila',npc:'edward',pos:[3680,4390],lines:[['edward','놈들에게서 지도를 찾았다. 소굴은 난쟁이 광산과 아수리아 사이 협곡에 있군.'],['you','제가 먼저 가 볼게요. 포로들은 부탁드려요.'],['edward','나는 이들을 감옥으로 압송하겠다. 조심해라.']],effect:s=>m.give(s,'map21')},
 {key:'den',title:'협곡의 용병 소굴',scene:'mercden',npc:'mercenary21',fixture:true,lines:[['mercenary21','여기까지 따라왔단 말이냐!'],['you','납치한 친구를 돌려줘!']],battle:'secretDen21'},
 {key:'chest',title:'상자에서 나온 아이작',scene:'mercden',npc:'chest21',fixture:true,lines:[['narrator','상자를 열자 모래가 쏟아지고, 안에서 아이작이 몸을 일으켰다.'],['isaac','아이스 골렘을 잡으러 갔다가 잡혔어. 시험은 아직 끝내지도 못했는데…'],['you','무사해서 다행이야. 쥬다 근처 분지에서 함께 잡자.']],effect:s=>{s.secretIsaacRescued=true;m.give(s,'sand21');}},
 {key:'golems',title:'아이작과 함께하는 사냥',scene:'weila',npc:'iceGolem18',pos:[10500,9170],fixture:true,lines:[['isaac','이번에는 나도 도울게!'],['you','무리해서 앞서가지 마. 서로 지켜주면서 싸우자.']],battle:'secretGolems21'},
 {key:'isaac',title:'모래를 아는 사람',scene:'lobby',npc:'isaac',lines:[['isaac','덕분에 살았어. 그 모래는 마법사의 도시의 탈리샤에게 물어봐.'],['you','네가 알려줬다고 말하면 되지?'],['isaac','아니! 내 이름은 말하지 마. 전에 지질조사를 돕다가… 아무튼 부탁이야.']]},
 {key:'talisha',title:'탈리샤의 지질 조사',scene:'magecity',npc:'talisha',pos:[450,324],lines:[['talisha','모래를 조사해 달라고? 그러지. 먼저 큐리어스에게 맡긴 물건을 가져다주렴.'],['talisha','지난번엔 어떤 학생이 내 머리 위로 횃불을 떨어뜨렸지. 조사에는 준비가 필요하단다.'],['you','네… 조심해서 다녀올게요.']]},
 {key:'helmet',title:'큐리어스가 맡은 안전모',scene:'curiousmansion',npc:'curious',lines:[['curious','탈리샤의 안전모? 여기 있다. 이걸 쓰면 머리카락 걱정은 덜겠지.'],['you','잘 전해드릴게요.']],effect:s=>m.give(s,'helmet21')},
 {key:'sand',title:'모래가 가리키는 해안',scene:'magecity',npc:'talisha',pos:[450,324],lines:[['talisha','이건 내륙의 모래가 아니야. 쥬다 해안에서 온 바다 모래란다.'],['you','용병들이 해안에도 있었군요. 바로 가 볼게요.']],effect:s=>{m.take(s,'helmet21');m.take(s,'sand21');s.secretCoastKnown=true;}},
 {key:'coast',title:'쥬다 해안의 용병',scene:'weila',npc:'mercenary21',pos:[10940,9820],fixture:true,lines:[['you','퀴즈포켓을 어디로 데려갔지?'],['mercenary21','그걸 순순히 말해 줄 것 같으냐!']],battle:'secretCoast21'},
 {key:'interrogate',title:'복면을 쓴 고용주',scene:'weila',npc:'mercenary21',pos:[10940,9820],lines:[['mercenary21','얼굴은 몰라! 복면을 쓰고 있었다고. 주머니는 수중 던전에 숨겨 놨어.'],['you','시험을 치렀던 그곳이구나. 쟈칼의 폭포로 가자.']],effect:s=>s.secretDiveKnown=true},
 {key:'dive',title:'다시 수중 던전으로',scene:'divefoyer',npc:'diveEntrance',pos:[700,405],fixture:true,lines:[['you','이번엔 시험이 아니라 구출이야. 입구의 공기 방울을 기억해 두자.'],['narrator','안쪽에서 희미한 목소리가 들린다. 첫째 줄 오른쪽에서 네 번째 방을 찾아보자.']],effect:(s,a)=>{s.diveActive=true;s.diveOxygen=120;a.travel('divehall',D.exitPos);}},
 {key:'masked',title:'도망치는 복면 괴인',scene:'diveroom2',npc:'masked21',pos:[540,385],lines:[['you','거울 앞에서 봤던 자야! 퀴즈포켓에게서 떨어져!'],['narrator','복면 괴인은 대답 없이 지팡이를 들었다. 푸른 섬광과 함께 모습이 사라졌다.']],effect:s=>s.secretMaskedGone=true},
 {key:'rescue',title:'숨길 수 있었던 진실',scene:'diveroom2',npc:'quizpocket2',pos:[500,385],lines:[['quizpocket2','저를 잃어버렸다고 하세요. 그러면 시험 내용을 미리 들은 사실도 묻힐 수 있습니다.'],['you','너를 데려오는 게 내 시험이야. 여기 두고 갈 수는 없어.'],['quizpocket2','정말 저를 데려가시겠습니까?'],['you','함께 나가자. 나머지는 내가 결정할게.']],effect:s=>s.secretPouchRescued=true},
 {key:'exit',title:'동생과 함께 나가는 길',scene:'divehall',npc:'diveExit',pos:D.exitPos,fixture:true,lines:[['narrator','퀴즈포켓 동생을 소중히 안고 출구의 쇠창살을 지나갔다.'],['you','이제 교장 선생님께 돌아가자.']],effect:(s,a)=>{s.diveActive=false;a.travel('divefoyer',[500,590]);}},
 {key:'deliver',title:'비밀 시험의 완수',scene:'principal',npc:'morris',lines:[['morris','납치된 동생을 무사히 데려왔구나. 어려운 일이었을 텐데 끝까지 해냈다.'],['quizpocket2','이 학생은 저를 버리지 않았습니다.'],['you','저… 잠깐 머피 아저씨를 만나고 올게요.']],effect:s=>s.midtermSecretScore=100},
 {key:'reflect',title:'아직 괴로운 마음',scene:'boiler',npc:'murphy',lines:[['murphy','과제를 끝냈는데도 눈이 괴로워 보이는구나. 네가 해야 할 일을 알고 있는 게 아니냐?'],['you','네. 이제는 알아요.'],['murphy','1층이 시끄럽더구나. 올라가 보렴.']]},
 {key:'congratulations',title:'친구들의 축하',scene:'lobby',npc:'sofia',lines:[['sofia','전 과목 만점이라면서요! 우리 중 처음으로 대마법사가 되는 건가요?'],['isaac','나도 네 덕분에 비밀 시험을 통과했어. 고마워!'],['you','축하해 줘서 고마워. 하지만 먼저 교장 선생님께 할 말이 있어.']]},
 {key:'confession',title:'스스로 밝힌 사실',scene:'principal',npc:'morris',lines:[['quizpocket','그동안 의심해서 미안합니다. 제 동생도 당신을 믿고 있더군요.'],['you','아니에요. 저는 첫 번째 시험 문제와 네 번째 시험의 몬스터를 동생에게 미리 들었어요.'],['you','정당하게 얻은 점수가 아니에요. 사실대로 말씀드리고 싶어요.'],['morris','실망스럽구나. 하지만 스스로 잘못을 인정한 마음까지 외면하지는 않겠다.']],effect:s=>s.secretConfessed=true},
 {key:'verdict',title:'중간고사의 마지막 성적표',scene:'principal',npc:'morris',lines:[['morris','기초학과 마법 전투 성적은 무효다. 나머지 세 과목의 만점은 인정하마. 이번 시험으로 계급이 오르지는 않는다.'],['morris','다시 이런 일이 생기면 퇴학이다. 오늘의 선택을 잊지 말거라.'],['you','네. 앞으로는 제 힘으로 배우고 시험을 치르겠어요.']],effect:s=>{s.midtermBasicScore=0;s.midtermCombatScore=0;s.midtermBasicVoided=true;s.midtermCombatVoided=true;s.midtermSecretScore=100;s.secretExamComplete=true;m.take(s,'basic-certificate');m.take(s,'combatCertificate');m.take(s,'map21');m.give(s,'results21');},reward:60,ending:'중간고사를 마쳤습니다. 기초학·마법 전투는 무효, 마법약·던전 탐험·비밀 시험은 100점으로 확정되었습니다. 시험으로 인한 계급 승급은 없습니다.'}
 ];
 const captured21={
 "rumor": [
  [
   "show",
   "{name}, 소식 들었어. 어스 드래곤을 상대해서 이겼다면서."
  ],
  [
   "you",
   "혼자 알아낸 건 아니잖아. 너희가 찾아 준 책이 도움이 됐어."
  ],
  [
   "aron",
   "좋아, 좋아. 저번에 말한 대로 시험 성적이 걱정되는 학생이 몇몇 있다."
  ],
  [
   "isaac",
   "그중에서도 제일 위험한 건 나라는 거죠… 마지막 과목은 꼭 잘해야 하는데."
  ],
  [
   "you",
   "나도 교장 선생님께 마지막 과제를 받으러 갈게."
  ]
 ],
 "hina": [
  [
   "hina",
   "그래, 보일러실의 머피 아저씨는 정말 친절하고 사정을 잘 들어 주시잖아."
  ],
  [
   "you",
   "내가 잘못한 일이어도 들어 주실까?"
  ],
  [
   "hina",
   "고민이 있으면 찾아가서 상담을 받아 봐. 혼자 끙끙 앓고 있으면 더 힘들어."
  ]
 ],
 "murphy": [
  [
   "you",
   "저의 고민은 비록 시험 문제를 미리 아는 도움을 받기는 했지만, 그래도 힘들게 받은 점수인데…"
  ],
  [
   "murphy",
   "그래. 우선 교장 선생님께 받은 다섯 번째 시험의 과제를 하면서 자신이 어떻게 행동했는지 생각해 봐."
  ],
  [
   "you",
   "오당카 님의 오두막으로 가야 해요."
  ],
  [
   "murphy",
   "빈손으로 가지 말고 코볼트의 숯을 가져가렴. 아주 귀한 거니까 오당카 마법사도 좋아할 거야. 코볼트에게 줄 빵은 식당에서 챙기고."
  ]
 ],
 "kobold": [
  [
   "kobold",
   "으악, 없어요. 없어요. 코볼트는 죽었어요. 쉿, 쉿!"
  ],
  [
   "you",
   "앗, 미안해요. 빵을 가져왔다는 말을 먼저 못 했네요. 자, 여기요."
  ],
  [
   "kobold",
   "휴… 요즘 누군가 코볼트가 사는 이 지하에 돌아다니고 있어요. 얼굴을 가려서 더 무서워요."
  ],
  [
   "you",
   "복면을 쓴 사람인가요? 장작을 가져다드릴게요."
  ],
  [
   "kobold",
   "밖에 나가면 복면 괴인을 조심하세요."
  ]
 ],
 "mirror": [
  [
   "you",
   "이곳에 숨겨져 있는 프리드의 거울을 노린 것은 아닐까?"
  ],
  [
   "narrator",
   "거울이 있는 방 앞에서 복면 괴인과 마주쳤다. 괴인은 주인공을 보자마자 주문을 외웠다."
  ],
  [
   "you",
   "저럴 수가, 사라졌어. 거울부터 확인해야겠어."
  ],
  [
   "narrator",
   "프리드의 거울은 그대로 있었다. 코볼트에게 돌아간 뒤 교장에게 보고하기로 했다."
  ]
 ],
 "coal": [
  [
   "you",
   "장작을 가져왔어요. 그런데 정말로 복면 괴인을 봤어요. 바로 사라져서 붙잡지는 못했어요."
  ],
  [
   "kobold",
   "그러니까 조심하라고 했잖아요! 장작은 이리 주세요."
  ],
  [
   "narrator",
   "코볼트가 장작불을 지피고 잘 구워진 숯을 꺼내 주었다."
  ],
  [
   "kobold",
   "이게 코볼트의 숯이에요. 오당카 님께 전해 주세요."
  ],
  [
   "you",
   "고마워요. 먼저 교장 선생님께 복면 괴인 이야기를 해야겠어요."
  ]
 ],
 "report": [
  [
   "you",
   "지하에서 복면 괴인을 봤어요. 거울 방 앞에 있다가 텔레포트로 도망쳤어요."
  ],
  [
   "morris",
   "대마왕 아즈카라고 해도 프리드의 거울 속 미로에 숨겨져 있는 태양의 보석을 쉽게 찾을 수는 없을 게다."
  ],
  [
   "you",
   "그래도 학교 안까지 들어왔다는 게 마음에 걸려요."
  ],
  [
   "morris",
   "그 일은 내가 살피마. 너는 맡은 시험을 계속하거라."
  ]
 ],
 "firstAid": [
  [
   "you",
   "오당카 마법사님, 입 벌려 봐요. 응급약을 천천히 먹여 드릴게요."
  ],
  [
   "narrator",
   "오당카의 호흡이 조금 편안해졌지만 의식은 완전히 돌아오지 않았다."
  ],
  [
   "you",
   "응급약만으로는 부족해. 아카니아 치료약이라면 더 효과가 있을 거야. 칠리 선생님께 가자."
  ]
 ],
 "medicine": [
  [
   "chilli",
   "오당카 님이 쓰러지셨다고? 지난번 아카니아 치료약을 써야겠구나."
  ],
  [
   "you",
   "응급약은 먹였지만 아직 힘들어하세요."
  ],
  [
   "chilli",
   "여기 있다. 웬만한 상처나 병은 단번에 나을 거다. 바로 가져가거라."
  ]
 ],
 "heal": [
  [
   "you",
   "아카니아 꽃으로 만든 치료약이에요. 드셔 보세요."
  ],
  [
   "odangka",
   "휴… 이제 정신이 좀 드는군. 떠돌이 용병 놈들이 퀴즈포켓 동생을 빼앗으러 들이닥쳤다."
  ],
  [
   "you",
   "퀴즈포켓 동생을요? 어디로 갔는지 봤나요?"
  ],
  [
   "odangka",
   "그 전에 쓰러져 버렸다. 루돌프가 뭔가 들었을 거야."
  ],
  [
   "you",
   "코볼트가 만든 숯도 가져왔어요. 제가 찾는 동안 몸부터 회복하세요."
  ]
 ],
 "map": [
  [
   "mercenary21",
   "난쟁이 옛 광산과 아수리아 왕국 사이 협곡 지대에 동료들의 소굴이 있어요. 길이 비슷해서 지도가 있어야 찾을 수 있어요."
  ],
  [
   "narrator",
   "붙잡은 용병이 구겨진 지도를 내밀었다."
  ],
  [
   "edward",
   "나는 이들을 감옥으로 압송하겠다. 지도를 가지고 먼저 가 보도록."
  ],
  [
   "you",
   "납치된 퀴즈포켓을 찾아올게요."
  ]
 ],
 "chest": [
  [
   "narrator",
   "상자 뚜껑을 열자 모래가 쏟아졌다. 안에서 기침 소리가 났다."
  ],
  [
   "you",
   "살아 있는 사람이 들어 있어! 아이작?"
  ],
  [
   "isaac",
   "아이스 골렘 열 마리를 잡으러 이곳으로 왔다가 잡혀 버렸어."
  ],
  [
   "you",
   "나도 비밀 시험이라 바쁘긴 하지만 너부터 도와줄게. 혼자 다시 들어가면 위험하잖아."
  ]
 ],
 "golems": [
  [
   "isaac",
   "열 마리를 잡아야 시험을 마칠 수 있어. 이번에는 나도 제대로 싸울게."
  ],
  [
   "you",
   "같이 힘을 합치자. 남은 수를 세면서 무리하지 말고."
  ]
 ],
 "isaac": [
  [
   "isaac",
   "도와줘서 고마워. 이제 시험을 마칠 수 있겠어. 너는 퀴즈포켓을 계속 찾는 거지?"
  ],
  [
   "you",
   "응. 상자에서 나온 모래가 신경 쓰여서 어디 모래인지 알아보려고."
  ],
  [
   "isaac",
   "모래? 그럼 마법사의 도시에 있는 탈리샤에게 가 봐."
  ],
  [
   "you",
   "네가 소개했다고 말할게."
  ],
  [
   "isaac",
   "그 말은 하지 마! 지질 조사 때문에 조금… 공포를 느끼고 싶다면 말해도 되지만."
  ]
 ],
 "talisha": [
  [
   "talisha",
   "모래가 어디서 왔는지 알아봐 달라고요? 지질 조사라면 내 전문이지요."
  ],
  [
   "talisha",
   "전에 근처를 조사하러 갔다가 아이작이라는 학생 때문에 얼마나 고생했는지 몰라요. 도와주겠다고 따라왔다가 횃불을 내 머리 위에 떨어뜨려서 머리칼이 다 타고…"
  ],
  [
   "you",
   "아, 그래서 자기 이름은 말하지 말라고 했구나… 아니, 아무것도 아니에요."
  ],
  [
   "talisha",
   "일단 모래를 주세요. 조사하는 동안 큐리어스 저택에서 내 안전모를 받아 와 줄래요?"
  ]
 ],
 "sand": [
  [
   "you",
   "탈리샤 님, 부탁하신 안전모 가져왔어요."
  ],
  [
   "talisha",
   "고마워요. 그 모래는 바다 모래예요. 난쟁이 광산 아래쪽 내륙에서는 나올 수 없는 거지요."
  ],
  [
   "you",
   "그러면 용병들이 해안에서 옮겨 온 건가요?"
  ],
  [
   "talisha",
   "대륙 남쪽 항구도시 쥬다 근처 해안과 같은 모래예요. 그쪽을 찾아보세요."
  ]
 ],
 "interrogate": [
  [
   "mercenary21",
   "의뢰인이 누구냐고? 얼굴을 가리고 있어서 몰라! 주머니는 그자가 지정한 수중 던전에 넘겼어."
  ],
  [
   "you",
   "아직 손에 넣지 못했을 수도 있겠군. 그 수중 던전이 어디지?"
  ],
  [
   "mercenary21",
   "쟈칼의 폭포 아래 있는 곳이야!"
  ],
  [
   "you",
   "시험을 치렀던 곳이네. 더 늦기 전에 가야겠어."
  ]
 ],
 "masked": [
  [
   "you",
   "오른쪽에서 네 번째 방… 여기 있었구나! 거울 앞에서 본 복면 괴인이지!"
  ],
  [
   "narrator",
   "괴인이 지팡이를 들어 올리자 주인공이 급히 방어 자세를 취했다."
  ],
  [
   "you",
   "이번에는 놓칠 수 없어!"
  ],
  [
   "narrator",
   "푸른 빛이 번쩍였다. 빛이 가셨을 때 괴인은 사라지고 퀴즈포켓 동생만 남아 있었다."
  ]
 ]
};
 for(const r of rows)if(captured21[r.key])r.lines=captured21[r.key];
 const coalAt=rows.findIndex(r=>r.key==='coal'),mirrorAt=rows.findIndex(r=>r.key==='mirror');[rows[coalAt],rows[mirrorAt]]=[rows[mirrorAt],rows[coalAt]];
 rows.find(r=>r.key==='talisha').effect=s=>m.take(s,'sand21');
 const c=m.register(21,'아르피아 중간고사 5부 · 마지막 시험',rows,{secretMirrorWitness:false,secretOdangkaHealed:false,secretIsaacRescued:false,secretCoastKnown:false,secretDiveKnown:false,secretMaskedGone:false,secretPouchRescued:false,secretConfessed:false,secretExamComplete:false,midtermSecretScore:0,midtermBasicVoided:false,midtermCombatVoided:false});
 const mon=(name,hp,atk,sprite,element=0)=>({name,hp,maxHp:hp,atk,sprite,element,atb:0});
 const merc=()=>({...mon('떠돌이 용병',340,22,'flameSoldier'),artPath:'assets/midterm/mercenary21.png',height:110});
 for(const[id,name,next,enemies,bg]of[
  ['secretHula21','오당카의 오두막 · 훌라 버섯','firstAid',[{...mon('훌라 버섯',850,25,'woodDoll',2),artPath:'assets/midterm/hula.png',height:115}],'assets/maps-hires/forest-battle.png'],
  ['secretPatrol21','얼음 마을의 떠돌이 용병','map',[merc(),merc()],'assets/maps-hires/forest-battle.png'],
  ['secretDen21','용병 소굴 돌파','chest',[merc(),merc(),merc()],'assets/maps-hires/academy-underground.png'],
  ['secretGolems21','아이작의 아이스 골렘 사냥','isaac',[mon('아이스 골렘',500,24,'cubic',1),mon('아이스 골렘',500,24,'cubic',1)],'assets/maps-hires/forest-battle.png'],
  ['secretCoast21','쥬다 해안의 용병','interrogate',[merc(),merc()],'assets/maps-hires/forest-battle.png']
 ])x.encounters[id]={name,intro:name,next:c.keys[next],xp:240,gold:85,sp:30,enemies,bg};
 const golemHunt=x.encounters.secretGolems21;
 Object.assign(x.defaults,{huntCount21:0,secretCoalReceived21:false});
 golemHunt.prepare=s=>({enemies:Array.from({length:Math.min(2,Math.max(1,10-(s.huntCount21||0)))},()=>mon('아이스 골렘',500,24,'cubic',1))});
 golemHunt.onWin=(s,b)=>s.huntCount21=Math.min(10,(s.huntCount21||0)+b.enemies.filter(e=>e.hp<=0).length);
 golemHunt.next=s=>(s.huntCount21||0)>=10?c.keys.isaac:c.keys.golems;
 golemHunt.progress=s=>'아이작의 과제 · '+(s.huntCount21||0)+'/10마리';
 golemHunt.allies=[{id:'isaac',npc:'isaac',name:'아이작',sprite:'assets/original/animation/npc_005_도트_아이작/idle.gif',hp:420,maxHp:420,atk:24,skill:'attack'}];
 x.encounters.secretPatrol21.allies=[{id:'edward',npc:'edward',name:'에드워드',sprite:'assets/original/animation/npc_013_도트_에드워드 장군/idle.gif',hp:700,maxHp:700,atk:35,skill:'attack'}];
 x.encounters.secretCoast21.enemies.push(merc());
 const prior=x.interact;
 x.interact=(e,a)=>{
  const s=a.state;
  if(s.stage>=c.keys.dive&&s.stage<=c.keys.exit){
   if(e.id==='diveExit'&&D.inside(s.scene)&&s.stage!==c.keys.exit){s.diveActive=false;a.travel('divefoyer',[500,590]);a.save();return true;}
   if(e.id==='diveEntrance'&&s.scene==='divefoyer'&&s.stage>c.keys.dive){s.diveActive=true;s.diveOxygen=120;a.travel('divehall',D.exitPos);a.save();return true;}
  }
  return prior(e,a);
 };
 const oldTick=D.tick,oldGoal=D.isGoal;
 D.tick=(a,dt)=>{const v=oldTick(a,dt),s=a.state;if(s.stage>=c.keys.masked&&s.stage<=c.keys.exit&&D.inside(s.scene)){
  document.querySelector('#dive-key-text').textContent=s.secretPouchRescued?'동생 구출 완료':'퀴즈포켓 수색';
  document.querySelector('#dive-signal-text').textContent=s.secretPouchRescued?'동생과 함께 중앙 출구로 돌아가자.':'북동쪽 끝 방에서 희미한 목소리가 들린다.';
 }return v;};
 D.isGoal=(s,e)=>oldGoal(s,e)||(s.scene==='diveroom2'&&((s.stage===c.keys.masked&&e.id==='masked21')||(s.stage===c.keys.rescue&&e.id==='quizpocket2')));
 const decorate=x.decorate;x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);if(sc.id==='hut'&&s.stage>=c.keys.rudolph&&s.stage<c.keys.deliver)sc.entities=sc.entities.filter(e=>e.id!=='quizpocket2');if(sc.id==='underpass'&&s.stage===c.keys.mirror){const e=sc.entities.find(e=>e.id==='friedsMirror');if(e)sc.entities.push(n('masked21',e.x+65,e.y));}};
 const oldItems=x.questItems;x.questItems=s=>[...oldItems(s).filter(r=>!(s.midtermBasicVoided&&r[0].includes('기초학'))&&!(s.midtermCombatVoided&&r[0].includes('마법 전투 성적'))),...(s.secretExamComplete?[['중간고사 최종 성적','기초학 무효 · 마법약 100 · 던전 탐험 100 · 마법 전투 무효 · 비밀 시험 100 / 시험 승급 없음']]:[])];
 for(const [mood,words]of Object.entries({embarrassed:['동생을… 네, 다녀오겠습니다.','네… 조심해서 다녀올게요.'],sad:['정당하게 얻은 점수가 아니에요. 사실대로 말씀드리고 싶어요.'],determined:['너를 데려오는 게 내 시험이야. 여기 두고 갈 수는 없어.','네. 앞으로는 제 힘으로 배우고 시험을 치르겠어요.']}))for(const t of words)ARPIA_HERO_ART.annotations.set(t,mood);
 window.ARPIA_SECRET_EXAM=c;
})();
