/* Original event order: wonavy.tistory.com/214. Dialogue and numerical balance rebuilt. */
(()=>{
 const x=ARPIA_EXTRA,m=ARPIA_MIDTERM,root='assets/midterm/';
 Object.assign(x.npcs,{dragon20:{name:'어스 드래곤',artPath:root+'earth-dragon.png',height:105},boundDragon20:{name:'구속된 어스 드래곤',artPath:root+'earth-dragon-bound.png',height:105},examMonster20:{name:'중급 시험 몬스터',artPath:'assets/original/pet-images/woodDoll/idle1.gif',height:65}});
 ARPIA_DATA.ITEMS.mt_capture20={name:'중급 몬스터 캡슐',desc:'학교 지하에서 포획한 시험 몬스터. 딕에게 전달한다.',kind:'quest',price:0,sell:0,icon:'assets/items/golem_core.png'};
 ARPIA_DATA.ITEMS.mt_combatCertificate={name:'마법 전투 확인증',desc:'탈출한 어스 드래곤을 다시 봉인함 · 100점',kind:'quest',price:0,sell:0,icon:root+'certificate.png'};
 x.npcs.aron={...(x.npcs.aron||{}),name:'아론',anim:'npc_009_도트_아론',portrait:'teacher/아론.png'};
 const rows=[
  {key:'call',title:'마법 전투 시험의 시작',scene:'lobby',npc:'aron',lines:[['aron','중간고사도 절반을 넘겼구나. 이번 시험은 전보다 훨씬 어렵다. 콜로세움의 딕에게 가 보거라.'],['sofia','쇼우와 저도 가려던 참이에요. 같이 설명을 들어요.']]},
  {key:'restraints',title:'절반의 힘을 묶은 몬스터',scene:'arena',npc:'dick',pos:[470,300],lines:[['dick','이번 최상급 상대는 너무 강해. 퀴즈포켓이 왜 이런 녀석을 데려왔는지 모르겠군.'],['dick','구속구로 힘을 절반쯤 묶어 두었지만 방심하면 안 돼. 료마 선생님께 시험 설명을 들어.'],['you','구속구까지 필요한 상대라니… 어떤 몬스터일까?']]},
  {key:'tiers',title:'초급부터 최상급까지',scene:'classroom',npc:'ryoma',pos:[646,198],lines:[['ryoma','초급, 중급, 상급, 최상급 순으로 실력을 확인한다. 마지막은 금단의 문 너머에서 온 몬스터다.'],['ryoma','최상급에 도전할 수 있는 학생은 두 명뿐이다. 끝까지 집중해라.']]},
  {key:'researchPlan',title:'친구들과 정보 나누기',scene:'lobby',npc:'show',pos:[470,335],lines:[['show','정체를 알면 준비도 할 수 있겠지. 각자 알아보고 도서관에서 만나자.'],['sofia','저는 관련 책부터 찾아볼게요.'],['you','나는 콜로세움에서 단서를 찾아볼게.']]},
  {key:'shadow',title:'막 뒤의 커다란 그림자',scene:'arena',npc:'dick',pos:[470,300],lines:[['narrator','가려진 우리 안에서 커다란 날개와 긴 꼬리의 그림자가 움직였다.'],['dick','가까이 가지 마. 시험이 시작될 때까지 접근 금지다.'],['you','그림자만으로는 정체를 모르겠어. 조지 아저씨께 물어보자.']]},
  {key:'george',title:'더글라스의 옛 지식',scene:'campus',npc:'george',lines:[['george','금단의 문 너머 몬스터라… 더글라스가 그런 이야기를 많이 알지. 찾아가 보렴.']]},
  {key:'douglas',title:'다시 동생에게',scene:'bathroom',npc:'douglas',lines:[['douglas','오당카에게 있는 퀴즈포켓 동생이라면 정체를 알 거야. 시험 문제도 형과 같으니까.'],['you','또 동생에게 물어보는 게 마음에 걸리지만… 상대를 알아야 준비할 수 있어.']]},
  {key:'identity',title:'최상급 상대의 이름',scene:'hut',npc:'quizpocket2',lines:[['quizpocket2','최상급 몬스터는 어스 드래곤입니다. 아주 오랫동안 이 대륙에 나타나지 않았던 용이지요.'],['you','어스 드래곤… 친구들에게 알려줘야겠어.']],effect:s=>s.combatDragonKnown=true},
  {key:'book',title:'목주머니가 부푸는 순간',scene:'library',npc:'sofia',pos:[365,335],lines:[['sofia','찾았어요. 강철처럼 단단한 피부와 날카로운 발톱, 그리고 몸에 달라붙는 불꽃을 내뿜는다고 해요.'],['show','여기 중요한 부분이 있어. 불꽃을 뿜기 직전에 목주머니가 부푼대.'],['you','그 신호를 보면 공격보다 방어를 먼저 해야겠어.']],effect:s=>s.combatBreathHint=true},
  {key:'beginner',title:'초급 몬스터 대전',scene:'arena',npc:'dick',pos:[470,300],lines:[['dick','마법 전투 시험을 시작한다. 먼저 초급 상대다. 기본부터 보여 줘.'],['you','배운 마법과 펫의 힘을 차근차근 쓰겠어요.']],battle:'examBeginner20'},
  {key:'captureOrder',title:'중급 몬스터 포획 과제',scene:'arena',npc:'dick',pos:[470,300],lines:[['dick','다음 상대는 직접 데려와야 한다. 학교 지하 비밀 던전의 몬스터를 제압해서 캡슐에 담아 와.'],['you','지하의 몬스터 방으로 다녀올게요.']]},
  {key:'captureBattle',title:'지하 몬스터 방',scene:'woodhall',npc:'examMonster20',pos:[740,386],fixture:true,lines:[['narrator','지하 비밀 통로 안쪽에서 시험 대상으로 지정된 몬스터 무리를 발견했다.'],['you','제압한 뒤 캡슐에 담아서 돌아가자.']],battle:'examCapture20'},
  {key:'capsule',title:'캡슐에 담은 몬스터',scene:'woodhall',npc:'examMonster20',pos:[740,386],fixture:true,lines:[['narrator','약해진 몬스터를 시험용 캡슐에 담았다.'],['you','이제 딕에게 포획 결과를 보여 주자.']],effect:s=>m.give(s,'capture20')},
  {key:'intermediateResult',title:'탈락한 두 친구',scene:'arena',npc:'dick',pos:[470,300],lines:[['dick','확인했다. 중급 통과다. 아이작은 기절했고 마틸다도 더 진행하지 못했어.'],['you','두 사람은 괜찮은가요?'],['dick','치료를 받고 있으니 걱정하지 마. 너는 상급을 준비해.']],effect:s=>m.take(s,'capture20')},
  {key:'advanced',title:'상급 몬스터 대전',scene:'arena',npc:'dick',pos:[470,300],lines:[['dick','이번에는 상대의 속성과 행동을 함께 살펴라. 준비됐다면 시작하지.'],['you','한 마리씩 침착하게 상대할게요.']],battle:'examAdvanced20'},
  {key:'specialOffer',title:'남은 세 사람',scene:'arena',npc:'dick',pos:[470,300],lines:[['dick','히나와 케스노는 여기까지다. 남은 건 너와 쇼우, 소피아야. 특별 단계에 도전하겠나?'],['you','도전하겠어요. 무엇을 하면 되나요?'],['dick','얼음 마을 던전의 아이스 골렘을 잡아 와. 그 결과로 마지막 도전자를 정하겠다.']]},
  {key:'golem',title:'특별 단계 · 아이스 골렘',scene:'icedungeon',npc:'iceGolem18',pos:[621,346],fixture:true,lines:[['you','전에 싸웠던 상대야. 그래도 방심하지 말자.']],battle:'examIce20'},
  {key:'finalists',title:'소피아의 기권',scene:'arena',npc:'sofia',pos:[535,402],lines:[['sofia','저는 여기서 그만하려고요. 전투에서 다친 몸으로 계속하는 건 위험해요.'],['you','쉬면서 치료받아. 무리하지 않는 것도 중요한 판단이야.'],['show','이제 우리 둘이 남았네. 마지막까지 최선을 다하자.']]},
  {key:'showDefeat',title:'구속구를 찬 용',scene:'arena',npc:'quizpocket',pos:[610,300],lines:[['quizpocket','최상급 몬스터, 어스 드래곤을 소환합니다! 먼저 쇼우 학생입니다.'],['narrator','구속된 용의 힘도 엄청났다. 쇼우는 결국 더 버티지 못하고 물러났다.'],['show','정말 강해… {name}, 목주머니의 신호를 잊지 마.']]},
  {key:'boundDragon',title:'최상급 몬스터와의 승부',scene:'arena',npc:'boundDragon20',pos:[710,375],fixture:true,lines:[['dick','다음은 {name}. 구속구가 있다고 가까이 붙지 마!'],['you','움직임을 보고 빈틈을 찾겠어요.']],battle:'examBoundDragon20'},
  {key:'escape',title:'기절한 척한 어스 드래곤',scene:'arena',npc:'dick',pos:[470,300],lines:[['you','생각보다 빨리 쓰러졌는데… 이상해.'],['narrator','쓰러진 용이 갑자기 몸을 일으켰다. 느슨해진 구속구를 부수고 하늘로 날아올랐다.'],['dick','기절한 척해서 방심하게 만든 거였어! 모두 학교에서 대기해!']],effect:s=>s.combatDragonEscaped=true},
  {key:'protest',title:'데런 왕국의 항의',scene:'lobby',npc:'edward',pos:[470,335],lines:[['edward','아르피아가 풀어 준 용이 데런 왕국에 나타났다! 모리스 교장께 정식으로 항의하겠다.'],['you','교장실로 안내할게요. 저희도 용을 찾고 있어요.']]},
  {key:'principal',title:'교장실로 안내',scene:'principal',npc:'edward',pos:[665,202],lines:[['edward','왕국 사람들을 위협하는 용을 즉시 회수해 주시오.'],['morris','사태를 수습하겠소. {name}, 료마에게 가서 수색을 도와라.']]},
  {key:'searchTeams',title:'서쪽과 남쪽으로',scene:'classroom',npc:'ryoma',pos:[646,198],lines:[['ryoma','나는 쇼우와 서쪽을 수색하겠다. 너는 퀴즈포켓과 함께 남쪽을 살펴라.'],['quizpocket','이번에는 제 지시를 잘 따라야 합니다.'],['you','먼저 데런 왕국 병사들에게 목격한 방향을 물어볼게요.']]},
  {key:'soldiers',title:'왕국 병사의 목격담',scene:'kingdom',npc:'edward',lines:[['edward','병사들이 용이 불꽃 마을 쪽으로 날아가는 것을 보았다. 주민들을 다치게 해서는 안 된다.'],['you','바로 불꽃 마을로 가 볼게요.']]},
  {key:'fireVillage',title:'이미 지나간 용',scene:'firevillage',npc:'emery',pos:[295,255],lines:[['emery','큰 용이 지나갔어. 이곳에 머물지는 않고 서쪽으로 날아갔단다.'],['quizpocket','금단의 서문 쪽이겠군요. 그 문 너머로 넘어가게 두어서는 안 됩니다.'],['you','서문 서쪽을 찾아보자.']],effect:s=>s.combatWestClue=true},
  {key:'freeDragon',title:'금단의 서문 앞 결전',scene:'weila',npc:'dragon20',pos:[1300,5200],fixture:true,goal:'금단의 서문 서쪽에서 어스 드래곤 제압하기',lines:[['narrator','구속구를 벗어난 어스 드래곤이 금단의 서문 근처에 내려앉아 있었다.'],['quizpocket','먼저 힘을 약하게 만드세요. 봉인은 제가 하겠습니다!'],['you','목주머니가 부풀면 방어… 배운 대로 침착하게!']],battle:'examFreeDragon20'},
  {key:'seal',title:'퀴즈포켓의 봉인',scene:'weila',npc:'quizpocket',pos:[1370,5230],lines:[['quizpocket','지금입니다. 저를 용 쪽으로 향하게 하세요!'],['narrator','거대한 용이 빛으로 변해 퀴즈포켓 속으로 빨려 들어갔다.'],['quizpocket','무모했지만 끝까지 해냈군요. 마법 전투 시험은 100점입니다.'],['you','이번에는 정말 다시 나오지 못하게 봉인해 주세요.']],effect:s=>{s.combatDragonSealed=true;s.combatDragonEscaped=false;s.midtermCombatScore=100;m.give(s,'combatCertificate');}},
  {key:'bounty',title:'왕국의 현상금',scene:'lobby',npc:'aron',lines:[['aron','어스 드래곤을 되찾았다는 소식은 들었다. 데런 왕국이 내건 현상금 5,000핀도 네게 전하마.'],['you','주민들이 무사해서 다행이에요.'],['aron','마지막 비밀 시험이 남았다. 교장 선생님의 말씀을 잘 새겨듣거라.']],effect:s=>{if(!s.combatBountyPaid){s.gold+=5000;s.combatBountyPaid=true;}},reward:75,ending:'탈출한 어스 드래곤을 찾아 다시 봉인했습니다. 마법 전투 100점과 현상금 5,000핀을 받았습니다. 다음 이야기는 중간고사의 마지막 비밀 시험입니다.'}
 ];
 const captured20={
 "call": [
  [
   "aron",
   "모리스 교장 선생님께서 말씀하시길, 중간고사를 통해 어떤 학생은 마도사가 될 수도 있다고 하셨다. 그러니 정말 열심히 하길 바란다."
  ],
  [
   "sofia",
   "이번에 우리가 싸워야 할 몬스터는 이제까지 본 적이 없는 무시무시한 괴물이라는 소문이 있어요."
  ],
  [
   "show",
   "직접 알아보자. 콜로세움부터 가 보는 게 좋겠어."
  ],
  [
   "you",
   "소피아, 쇼우도 함께 가자. 무엇을 준비해야 할지 확인해 보자."
  ]
 ],
 "restraints": [
  [
   "dick",
   "너희가 시험을 치를 때는 녀석이 강한 힘을 못 쓰도록 힘의 절반을 구속구로 억제해 둘 거야."
  ],
  [
   "you",
   "힘을 절반이나 묶어야 한다고요? 도대체 어떤 상대죠?"
  ],
  [
   "dick",
   "정체는 시험 전에 알려 줄 수 없다. 먼저 료마 선생님에게 규칙을 듣도록."
  ]
 ],
 "shadow": [
  [
   "narrator",
   "막 너머에서 낮은 울음소리가 들렸다. 빛에 드러난 거대한 그림자에는 뿔과 날개가 있었다."
  ],
  [
   "you",
   "이것만으로는 어떤 몬스터인지 모르겠어. 가까이 가도 될까요?"
  ],
  [
   "dick",
   "안 된다. 구속구가 있어도 위험하니까 물러나."
  ],
  [
   "you",
   "그러면 다른 사람에게 물어봐야겠네. 조지 아저씨는 아실까?"
  ]
 ],
 "george": [
  [
   "george",
   "하지만 더글라스에게 가서 물어보거라. 그 친구는 수완이 좋아서 아는 게 많은 편이니까."
  ],
  [
   "you",
   "또 더글라스 아저씨군요. 화장실로 가 볼게요."
  ]
 ],
 "douglas": [
  [
   "douglas",
   "얼마나 자주 막히는지… 휴우. 하지만 뚫고 나면 정말 보람이 느껴진다니까."
  ],
  [
   "you",
   "지금은 시험에 나올 비밀 몬스터 때문에 왔어요. 정체를 알 방법이 없을까요?"
  ],
  [
   "douglas",
   "오당카의 오두막에 있는 퀴즈포켓 동생에게 물어봐. 형이 알고 있는 건 그 녀석도 알 수 있으니까."
  ],
  [
   "you",
   "또 퀴즈포켓 동생에게 물어보라고요? 들키면 형이 더 화낼 텐데…"
  ]
 ],
 "identity": [
  [
   "quizpocket2",
   "응, 마지막 몬스터는 바로 용이다. 그중에서도 어스 드래곤이지."
  ],
  [
   "you",
   "용이라고? 그림자가 왜 그렇게 컸는지 알겠네."
  ],
  [
   "quizpocket2",
   "예전에는 대륙에서도 보였지만 지금은 좀처럼 나타나지 않아. 친구들과 자료를 더 찾아보는 게 좋겠어."
  ]
 ],
 "book": [
  [
   "sofia",
   "어스 드래곤은 최상급 몬스터 중 하나로 최근 몇 년간 대륙에서는 출현한 적이 없다고 되어 있어요."
  ],
  [
   "sofia",
   "피부는 강철 같고 손톱과 발톱은 금속 병기에 못지않아요. 강한 화염 공격도 쓰는데, 불길이 몸에 붙으면 쉽게 꺼지지 않는대요."
  ],
  [
   "you",
   "단단한 몸에 불꽃까지… 정면에서 무작정 공격하면 안 되겠다."
  ],
  [
   "show",
   "여기 마지막 문장도 봐. 화염 공격을 쓰기 전에 목주머니가 부풀어 오른대."
  ],
  [
   "you",
   "그 신호를 기억해 둘게. 목이 부풀면 공격을 멈추고 방어하자."
  ]
 ],
 "captureOrder": [
  [
   "dick",
   "초급은 통과다. 중급부터는 직접 몬스터를 찾아서 캡슐에 담아 와야 해."
  ],
  [
   "narrator",
   "딕이 비어 있는 몬스터 캡슐을 건넸다."
  ],
  [
   "dick",
   "학교 지하 비밀 던전에서 곰인형, 늑대, 뱀을 찾아라. 세 종류 모두 제압해야 한다."
  ],
  [
   "you",
   "몬스터 방에서 포획해서 돌아올게요."
  ]
 ],
 "advanced": [
  [
   "dick",
   "이번 상급 대상은 오크, 전갈, 떠돌이 용병이다. 학교 지하의 다른 몬스터 방에 있어."
  ],
  [
   "narrator",
   "아래쪽 방으로 내려가자 세 몬스터가 출구를 막아섰다."
  ],
  [
   "you",
   "상대가 바뀌었어. 공격 순서를 살피면서 한 마리씩 제압하자."
  ]
 ],
 "finalists": [
  [
   "dick",
   "이제 남아 있는 학생 중 최상급에 도전하는 사람은 {name}와 쇼우 둘뿐이다."
  ],
  [
   "you",
   "소피아는요? 아까까지 같이 준비했는데요."
  ],
  [
   "dick",
   "다친 몸으로 무리하게 서두르다 다쳤어. 양호실에서 쉬고 있으니 걱정하지 마."
  ],
  [
   "show",
   "남은 우리라도 끝까지 해 보자. 책에서 읽은 내용을 잊으면 안 돼."
  ]
 ],
 "showDefeat": [
  [
   "quizpocket",
   "이제 최상급 몬스터를 소환하겠습니다. 쇼우 학생, 준비하세요."
  ],
  [
   "narrator",
   "구속구를 찬 어스 드래곤이 모습을 드러냈다. 쇼우는 지팡이를 고쳐 잡고 맞섰지만 끝내 물러나고 말았다."
  ],
  [
   "dick",
   "끝났다, 쇼우가 졌어. 아무리 구속구를 채운다고 해도 역시 용은 용이구나."
  ],
  [
   "show",
   "{name}, 목주머니의 신호를 꼭 봐. 가까이 다가오는 것도 조심하고."
  ]
 ],
 "escape": [
  [
   "dick",
   "{name}, 네가 이렇게 강했었나? 어스 드래곤이 거품을 물고 기절할 줄이야."
  ],
  [
   "you",
   "생각보다 너무 쉽게 쓰러졌는데…"
  ],
  [
   "narrator",
   "어스 드래곤의 목이 움찔했다. 구속구를 살피려고 다가간 순간, 용이 벌떡 일어나 묶인 고리를 부수고 날아올랐다."
  ],
  [
   "you",
   "앗! 딕, 용이 날아가요!"
  ],
  [
   "dick",
   "일부러 진 것처럼 기절한 척한 거였어! 모두 학교로 돌아가 대기해!"
  ]
 ],
 "protest": [
  [
   "you",
   "어스 드래곤 녀석, 기절한 척하고 날 속였어. 으, 화난다 정말!"
  ],
  [
   "edward",
   "공주님 무사해서 다행입니다. 어스 드래곤이 나타났습니다."
  ],
  [
   "edward",
   "데런 왕국의 세자르 폐하께서 어스 드래곤을 놓친 아르피아 마법학교의 책임을 묻고자 저를 보내셨습니다."
  ],
  [
   "you",
   "지금 교장 선생님께 안내하겠습니다. 용은 어느 쪽으로 갔나요?"
  ],
  [
   "edward",
   "병사들의 말에 따르면 불꽃 마을 쪽으로 사라졌다고 합니다. 서둘러 주십시오."
  ]
 ]
};
 for(const r of rows)if(captured20[r.key])r.lines=captured20[r.key];
 rows.find(r=>r.key==='captureOrder').effect=s=>m.give(s,'capture20');
 rows.find(r=>r.key==='capsule').effect=s=>s.combatCaptureStored=true;
 Object.assign(rows.find(r=>r.key==='advanced'),{scene:'woodhall',npc:'examMonster20',pos:[740,386],fixture:true});
 const c=m.register(20,'아르피아 중간고사 4부 · 비밀의 몬스터',rows,{combatCaptureStored:false,combatDragonKnown:false,combatBreathHint:false,combatDragonEscaped:false,combatWestClue:false,combatDragonSealed:false,combatBountyPaid:false,midtermCombatScore:0,combatBeginnerWon:false,combatCaptureWon:false,combatAdvancedWon:false,combatIceWon:false,combatBoundWon:false,combatFreeWon:false});
 const mon=(name,element,hp,atk,sprite)=>({name,element,hp,maxHp:hp,atk,atb:10,sprite});
 const battle=(id,name,next,flag,enemies,xp,bg='assets/maps-hires/colosseum.png')=>x.encounters[id]={name,bg,intro:name+' · 속성과 행동 게이지를 확인하세요.',next:c.keys[next],setFlag:flag,xp,gold:0,sp:30,enemies};
 battle('examBeginner20','초급 시험','captureOrder','combatBeginnerWon',[mon('나무 인형',0,190,14,'woodDoll')],100);
 battle('examCapture20','중급 포획 시험','capsule','combatCaptureWon',[mon('나무 인형',0,230,17,'woodDoll'),mon('박쥐',0,165,14,'moth')],150,'assets/maps-hires/academy-underground.png');
 battle('examAdvanced20','상급 시험','specialOffer','combatAdvancedWon',[mon('늑대',1,330,21,'fightDog'),mon('거미',2,230,18,'spider')],200);
 battle('examIce20','특별 단계 · 아이스 골렘','finalists','combatIceWon',[mon('아이스 골렘',1,600,24,'cubic')],210,'assets/maps-hires/forest-battle.png');
 const dragon=(bound)=>({...mon('어스 드래곤',2,bound?650:1120,bound?21:29,'earthDragon'),artPath:root+(bound?'earth-dragon-bound.png':'earth-dragon.png'),height:190,breathAttack:true});
 battle('examBoundDragon20','구속된 어스 드래곤','escape','combatBoundWon',[dragon(true)],230);
 battle('examFreeDragon20','해방된 어스 드래곤','seal','combatFreeWon',[dragon(false)],350,'assets/maps-hires/forest-battle.png');
 x.encounters.examFreeDragon20.intro='구속구가 사라진 용입니다. 목주머니가 부푸는 신호를 보면 대기로 방어하세요.';
 const old=x.questItems;x.questItems=s=>[...old(s),...(s.combatBreathHint?[['어스 드래곤 관찰 기록','불꽃을 뿜기 전 목주머니가 부푼다. 신호 뒤에는 대기로 방어.']]:[]),...(s.midtermCombatScore?[['마법 전투 성적','100점 · 어스 드래곤 재봉인']]:[])];
 for(const [mood,texts]of Object.entries({surprised:['구속구까지 필요한 상대라니… 어떤 몬스터일까?','생각보다 빨리 쓰러졌는데… 이상해.'],embarrassed:['또 동생에게 물어보는 게 마음에 걸리지만… 상대를 알아야 준비할 수 있어.'],determined:['목주머니가 부풀면 방어… 배운 대로 침착하게!','한 마리씩 침착하게 상대할게요.'],happy:['주민들이 무사해서 다행이에요.']}))for(const text of texts)ARPIA_HERO_ART.annotations.set(text,mood);
 window.ARPIA_COMBAT_EXAM=c;
})();
