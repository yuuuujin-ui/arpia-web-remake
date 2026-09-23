/* Original investigation sequence: wonavy.tistory.com/215. Dialogue rebuilt. */
(()=>{
 const x=ARPIA_EXTRA,m=ARPIA_MIDTERM;
 for(const[id,name,desc,icon]of[
 ['gift22','가루다에게 줄 뚫어나무','이슈비케가 준비한 명상용 선물','assets/midterm/plunger-wood.png'],
 ['medicine22','료마의 치료 물약','아멜라가 요정의 날개가루로 만든 치료약','assets/midterm/healing-potion.png'],
 ['list22','날개가루 수령 명단','아멜라 · 에드워드 · 라우라 · 샤이아 · 글루글루','assets/midterm/certificate.png'],
 ['gold22','기욤에게 줄 금덩이','광산에서 직접 모은 금덩이','assets/items/goldnugget.png'],
 ['powder22','라우라의 날개가루','전통 의식을 위해 훌라 버섯 갓에 보관한 가루','assets/midterm/fairy-powder.png']
 ])ARPIA_DATA.ITEMS['mt_'+id]={name,desc,kind:'quest',price:0,sell:0,icon};
 const rows=[
 {key:'call',title:'머피의 급한 부름',scene:'boiler',npc:'murphy',lines:[['murphy','코볼트가 몹시 놀란 모양이다. 지하에 누가 나타났다는데 네가 가 봐 주겠니?'],['you','복면 괴인이 다시 온 걸까요? 바로 내려갈게요.']]},
 {key:'kobold',title:'거울 방의 수상한 사람',scene:'koboldroom',npc:'kobold',lines:[['kobold','그 방에 또 누가 있소! 얼굴도 잘 보이지 않았소.'],['you','거울이 있는 곳이죠? 제가 확인할게요.']]},
 {key:'mistake',title:'어둠 속에서 멈춘 주문',scene:'underpass',npc:'ryoma',pos:[905,375],lines:[['you','거기 서! 더는 도망치게 두지 않겠어!'],['ryoma','멈춰라, {name}! 나다. 교장 선생님의 명으로 거울을 지키고 있었다.'],['you','선생님?! 죄송해요. 얼굴도 확인하지 않고…'],['ryoma','급할수록 상대를 확인해야 한다. 코볼트에게도 안심하라고 전해라.']]},
 {key:'reassure',title:'코볼트를 안심시키기',scene:'koboldroom',npc:'kobold',lines:[['you','복면 괴인이 아니라 료마 선생님이셨어요. 거울을 지키러 오셨대요.'],['kobold','그랬소? 이제야 마음이 놓이는구려.']]},
 {key:'murphy',title:'소동의 끝',scene:'boiler',npc:'murphy',lines:[['murphy','큰일이 아니라니 다행이다. 교장 선생님과도 복면 괴인 이야기를 나눠 보렴.'],['you','이번에는 차분하게 사실부터 확인하겠어요.']]},
 {key:'morris',title:'마법사들 사이의 적',scene:'principal',npc:'morris',lines:[['morris','복면 괴인은 우리 사정을 너무 잘 안다. 마법사들 사이에 적이 숨어 있을지도 모르겠구나.'],['morris','가루다에게 조언을 구해라. 이슈비케가 준비한 선물도 가져가고.']]},
 {key:'gift',title:'명상에 쓰는 귀한 나무',scene:'library',npc:'ishubike',pos:[450,260],lines:[['ishubike','명상에 도움이 되는 뚫어나무란다. 가루다께 정중히 전해 드리렴.'],['you','잘 전해드릴게요.']],effect:s=>m.give(s,'gift22')},
 {key:'shiva',title:'기다리고 있던 가루다',scene:'eaglevillage',npc:'shiva',lines:[['shiva','가루다님께서 네가 올 것을 알고 기다리고 계신다. 위로 올라가렴.']]},
 {key:'garuda',title:'거울을 가져온 비밀의 마법사',scene:'eaglevillage',npc:'garuda',lines:[['garuda','프리드의 거울을 학교 지하로 가져온 자는 비밀의 마법사다. 그 거울은 아무나 다룰 물건이 아니지.'],['you','그 사람을 찾으면 복면 괴인도 알 수 있나요?'],['garuda','너무 성급하구나. 대마도사보다 높은 경지의 마법사도 있다. 지금은 네 앞에 드러난 복면 괴인의 흔적을 좇아라.']],effect:s=>{m.take(s,'gift22');s.enemyGarudaAdvice=true;}},
 {key:'news',title:'료마가 쓰러졌다는 소식',scene:'principal',npc:'morris',lines:[['you','가루다님께 들은 이야기를 전하러 왔어요.'],['aron','교장 선생님! 료마 선생님이 쓰러진 채 발견되어 아수리아에 계십니다!'],['morris','아수리아라고? 아멜라에게 치료 물약을 받아 카디쟈의 집으로 가 보거라.']]},
 {key:'medicine',title:'아멜라의 치료 물약',scene:'infirmary',npc:'amela',lines:[['amela','상처가 깊다니 걱정이구나. 이 약을 료마 선생님께 가져가렴.'],['you','서둘러 다녀오겠어요.']],effect:s=>m.give(s,'medicine22')},
 {key:'cardia',title:'무역단이 발견한 마법사',scene:'cardiahome',npc:'cardia',lines:[['cardia','님펜과 난쟁이 광산 사이 구릉에서 우리 무역단이 발견했어요. 아직 쉬셔야 해요.'],['you','치료 물약을 가져왔어요. 잠시 이야기를 들을 수 있을까요?']]},
 {key:'ryoma',title:'봉인을 푸는 날개가루',scene:'cardiahome',npc:'ryoma',pos:[370,310],lines:[['ryoma','날 공격한 건 복면 괴인이었다. 놈은 상자의 봉인을 풀기 위해 여러 마법을 시험했지.'],['ryoma','마지막 단서는 요정의 날개가루다. 한 달이 지나면 못 쓰게 되니 최근 받아 간 자를 찾으면 된다.'],['you','레오나님께 명단을 부탁할게요.']],effect:s=>{m.take(s,'medicine22');s.enemyRyomaHealed=true;}},
 {key:'list',title:'다섯 명의 수령자',scene:'nymphen',npc:'leona',lines:[['leona','최근 날개가루를 가져간 분들이에요. 아멜라, 에드워드 경, 라우라, 샤이아, 글루글루.'],['you','고맙습니다. 한 분씩 사용처를 확인할게요.']],effect:s=>m.give(s,'list22')},
 {key:'amela',title:'첫 번째 확인 · 치료약',scene:'infirmary',npc:'amela',lines:[['amela','레오나와 같은 취미를 나누다 받은 가루란다. 아까 료마에게 가져간 치료약에 썼어.'],['you','직접 전해 드린 그 약이군요. 확인됐어요.']],effect:s=>s.enemyAlibis|=1},
 {key:'caesar',title:'보검을 수리하러 간 기사',scene:'kingdom',npc:'caesar',lines:[['caesar','에드워드는 검을 고치러 난쟁이 광산으로 갔다. 기욤에게 물어보거라.']]},
 {key:'guillaume',title:'기욤이 원하는 대가',scene:'minedepths',npc:'guillaume',lines:[['guillaume','기사의 행방? 금덩이 세 개면 알려 주지.'],['you','알겠어요. 갱도를 살펴볼게요.']]},
 ...[[235,265],[475,435],[670,430]].map((pos,i)=>({key:'gold'+i,title:'광산의 금덩이 '+(i+1),scene:'minedepths',npc:'gold'+(i+1),pos,fixture:true,lines:[['narrator','돌 틈의 금덩이를 조심스럽게 꺼냈다.']],effect:s=>m.give(s,'gold22')})),
 {key:'where',title:'왕국 경기장으로 돌아간 기사',scene:'minedepths',npc:'guillaume',lines:[['guillaume','세 개가 맞군. 에드워드는 철광석을 챙겨 왕국 경기장으로 돌아갔네.'],['you','알려 주셔서 고맙습니다.']],effect:s=>m.take(s,'gold22',3)},
 {key:'duel',title:'에드워드의 검 시험',scene:'royalarena',npc:'edward',lines:[['edward','마침 잘 왔다. 수리한 검을 시험해 보려던 참이다. 한 수 겨뤄 보자!'],['you','물어볼 것도 있으니, 대련 뒤에 이야기해요.']],battle:'enemyEdward22'},
 {key:'edward',title:'두 번째 확인 · 검 수리',scene:'royalarena',npc:'edward',lines:[['edward','철광석과 날개가루의 비율이 아직 맞지 않는군. 헝거와 싸운 뒤 더 좋은 검이 필요했지.'],['you','검을 만드는 데 쓰셨군요. 확인했어요.']],effect:s=>s.enemyAlibis|=2},
 {key:'laura',title:'세 번째 확인 · 전통 의식',scene:'earthvillage',npc:'laura',lines:[['laura','날개가루는 의식에 쓸 훌라 버섯 갓 안에 숨겼단다. 직접 확인해도 좋아.'],['you','숲의 버섯을 살펴보고 돌아올게요.']]},
 {key:'hula',title:'갓 속에 숨겨 둔 가루',scene:'earthdungeon',npc:'hula17',fixture:true,lines:[['you','가루를 확인하려면 버섯부터 진정시켜야겠어.']],battle:'enemyHula22'},
 {key:'powder',title:'봉지째 남은 날개가루',scene:'earthdungeon',npc:'hula17',fixture:true,lines:[['narrator','버섯 갓 안에 봉해진 날개가루가 그대로 남아 있었다.']],effect:s=>m.give(s,'powder22')},
 {key:'return',title:'의식의 재료 돌려드리기',scene:'earthvillage',npc:'laura',lines:[['you','가루가 그대로 있었어요. 돌려드릴게요.'],['laura','오해가 풀렸다니 다행이구나. 의식을 다시 준비해야겠어.']],effect:s=>{m.take(s,'powder22');s.enemyAlibis|=4;}},
 {key:'shaiya',title:'네 번째 확인 · 신탁의 재료',scene:'magecity',npc:'shaiya',pos:[555,490],lines:[['shaiya','신탁을 위해 항상 구비해 두고 있어요. 여기 있는 가루를 보세요.'],['you','확인시켜 주셔서 감사합니다.']],effect:s=>s.enemyAlibis|=8},
 {key:'gluglu',title:'사용처를 밝히지 않는 마법사',scene:'magecity',npc:'gluglu',pos:[450,324],lines:[['gluglu','이미 사용했다. 어디에 썼는지는 말할 수 없다.'],['you','복면 괴인을 찾는 데 중요한 단서예요.'],['gluglu','그렇더라도 말하지 않겠다. 돌아가게.']],effect:s=>s.enemyGlugluSuspected=true},
 {key:'overhear',title:'마을 밖에서 들은 약속',scene:'weila',npc:'masked21',pos:[2150,9080],lines:[['hunger','여기서까지 얼굴을 가리고 다녀야 하나?'],['masked21','날 찾는 마법사들이 많다. 이름으로 부르지 마라. 다음에는 얼음 던전에서 만나지.'],['you','헝거와 한패였어… 얼음 던전으로 간다는 말도 들었어.']],effect:s=>s.enemyIceMeetingKnown=true,reward:55,ending:'날개가루를 받은 다섯 사람을 조사했습니다. 복면 괴인과 헝거의 다음 접선 장소는 얼음 던전입니다.'}
 ];
 const captured22={
 "call": [
  [
   "murphy",
   "코볼트의 숯을 얻으러 갔다가 대단한 어려움을 겪었다더구나. 복면 괴인을 만났다면서?"
  ],
  [
   "you",
   "네. 거울 앞에서 무언가를 하다가 도망갔어요."
  ],
  [
   "murphy",
   "코볼트가 또 수상한 사람을 보았나 봐. 혼자 겁을 먹고 있으니 내려가 보렴."
  ]
 ],
 "mistake": [
  [
   "you",
   "예사로운가? 저 뒷모습… 거기 서!"
  ],
  [
   "ryoma",
   "나란 말이다. 모리스 교장 선생님의 명에 따라 수상한 사람이 누구였는지 이곳을 살펴보고 있었던 거다."
  ],
  [
   "you",
   "료마 선생님! 죄송해요. 어두워서 복면 괴인인 줄 알았어요."
  ],
  [
   "ryoma",
   "이 상자에는 요정의 날개가루가 묻어 있더군. 교장 선생님이 날개가루를 주시면서 봉인을 풀어 보라고 하셨다."
  ],
  [
   "you",
   "거울만 보고 도망친 게 아니라 상자에도 손을 댄 거군요. 코볼트에게 선생님이라고 알려 줄게요."
  ]
 ],
 "reassure": [
  [
   "you",
   "그 사람은 료마 선생님이었어요. 수상한 사람을 조사하러 오신 거래요."
  ],
  [
   "kobold",
   "코볼트는 그냥 아무에게도 방해받지 않았으면 좋겠어요. 코볼트는 혼자 있는 게 좋아요."
  ],
  [
   "you",
   "많이 놀랐죠? 선생님도 코볼트를 괴롭히러 오신 건 아니에요."
  ]
 ],
 "morris": [
  [
   "you",
   "료마 선생님은 프리드의 거울 옆 상자에 날개가루로 봉인을 풀려고 하고 계셨어요. 제가 다시 나타나서 놀라더라니까요."
  ],
  [
   "morris",
   "그 방에서 무슨 일이 벌어졌는지부터 알아야겠구나."
  ],
  [
   "morris",
   "나는 복면 괴인이 대마왕 아즈카의 부하로서 우리 선량한 마법사들을 나쁜 방향으로 이끌고 있다고 생각하고 있다."
  ],
  [
   "you",
   "우리가 믿는 사람들 사이에도 그 괴인을 도와주는 사람이 있을까요?"
  ],
  [
   "morris",
   "의심만으로 몰아붙여서는 안 된다. 가루다에게 조언을 구하렴. 이슈비케에게 맡겨 둔 선물도 가져가고."
  ]
 ],
 "gift": [
  [
   "ishubike",
   "가루다님께 드릴 선물을 찾으러 왔구나. 이 나무를 가져가렴."
  ],
  [
   "you",
   "혹시… 뚫어나무예요? 전에는 함부로 구할 수 없다고 하셨잖아요."
  ],
  [
   "ishubike",
   "맞아요. 뚫어나무예요. 이번에는 교장 선생님이 준비하신 정식 선물이랍니다."
  ],
  [
   "you",
   "부러뜨리지 않게 조심해서 가져갈게요."
  ]
 ],
 "shiva": [
  [
   "you",
   "선생님, 또 어디 가세요? 가루다님께 다녀오는 동안에는 소동이 없었으면 좋겠는데요."
  ],
  [
   "ryoma",
   "그럴 수 없다. 쓰레기는 휴지통에~ 오줌은 변기통에~"
  ],
  [
   "you",
   "그 말씀만 하시면… 알겠어요. 저는 먼저 다녀올게요."
  ]
 ],
 "news": [
  [
   "aron",
   "료마 선생님이 쓰러진 채 발견되셨다. 지금 아수리아의 카디쟈 집에서 쉬고 계신다."
  ],
  [
   "you",
   "료마 선생님은 지하에서 일하셨는데… 왜 아수리아 왕국에 계세요?"
  ],
  [
   "aron",
   "나도 자세한 사정은 듣지 못했다. 아멜라 선생님께 약을 받아서 가져가 드리렴."
  ],
  [
   "you",
   "아까까지만 해도 멀쩡하셨는데. 서둘러야겠어요."
  ]
 ],
 "medicine": [
  [
   "amela",
   "료마 선생님께 가져갈 약이지요? 상처를 치료하는 데 쓰는 고급 치료약이에요."
  ],
  [
   "you",
   "고맙습니다. 무슨 일이 있었는지도 알아볼게요."
  ],
  [
   "amela",
   "그럼 이걸 가져가요. 자요. 다친 분을 오래 붙잡고 이야기하지는 말고요."
  ]
 ],
 "cardia": [
  [
   "cardia",
   "료마 선생님을 난쟁이 광산과 오두막 섬 사이의 구릉 지대에서 우리 아수리아 왕국의 무역단이 발견했어요."
  ],
  [
   "you",
   "여기까지 옮겨 돌봐 주신 거군요. 아멜라 선생님의 약을 가져왔어요."
  ],
  [
   "cardia",
   "조심히 주세요. 아직 무리하시면 안 돼요. 조금만 더 쉬셨으면 좋겠는데…"
  ],
  [
   "you",
   "으잉? 카디쟈님이 료마 선생님께 대하는 게… 평소와는 조금 다르네."
  ],
  [
   "narrator",
   "카디쟈의 시선이 료마를 따라 오래 머물렀다. 주인공은 눈치를 보고 살짝 목소리를 낮췄다."
  ]
 ],
 "ryoma": [
  [
   "ryoma",
   "{name}, 이제 괜찮아졌다. 카디쟈가 붙잡기 전에 나가자꾸나."
  ],
  [
   "you",
   "아까 전 모습을 보니 카디쟈님이 우리 료마 선생님께 반한 모양인 것 같아."
  ],
  [
   "ryoma",
   "지금은 그보다 복면 괴인의 행적을 찾는 게 먼저다. 나를 공격한 것도 그놈이었다."
  ],
  [
   "you",
   "상자의 봉인을 노리고 있었던 건가요?"
  ],
  [
   "ryoma",
   "바바라 대사가 만드신 봉인 해제 주문을 이용하려던 흔적도 있더구나. 요정의 날개가루를 구한 자를 찾아야 한다."
  ],
  [
   "ryoma",
   "그 가루는 오래 보관할 수 없다. 최근 한 달 사이에 받아 간 사람부터 확인해 보자."
  ],
  [
   "you",
   "레오나님께 수령 명단을 여쭤볼게요."
  ]
 ],
 "gluglu": [
  [
   "gluglu",
   "요정의 날개가루는 이미 없네. 사용을 했다네. 쉿쉿쉿. 사용처를 알려줄 수는 없으네."
  ],
  [
   "you",
   "복면 괴인을 찾는 데 중요한 단서예요. 다른 분들께도 모두 확인했어요."
  ],
  [
   "gluglu",
   "그렇더라도 지금은 말해 줄 수 없네."
  ],
  [
   "you",
   "역시 글루글루님의 태도가 이상한걸. 날개가루를 어디에 썼는지도 알려 줄 수 없다니… 왜 숨기시는 거지?"
  ]
 ]
};
 for(const r of rows)if(captured22[r.key])r.lines=captured22[r.key];
 Object.assign(rows.find(r=>r.key==='shiva'),{scene:'lobby',npc:'ryoma',title:'로비에서 마주친 료마'});
 Object.assign(rows.find(r=>r.key==='news'),{scene:'lobby',npc:'aron'});
 for(const r of rows)if(['hula','powder'].includes(r.key)){r.scene='earthvillage';r.pos=[740,386];}
 const c=m.register(22,'내부의 적 1부 · 복면 괴인',rows,{enemyGarudaAdvice:false,enemyRyomaHealed:false,enemyAlibis:0,enemyGlugluSuspected:false,enemyIceMeetingKnown:false});
 x.encounters.enemyEdward22={name:'에드워드 경과의 대련',bg:'assets/maps-hires/colosseum.png',intro:'검을 시험하는 보호 마법 안의 대련입니다.',next:c.keys.edward,xp:250,gold:0,sp:35,enemies:[{name:'에드워드 경',element:0,hp:1100,maxHp:1100,atk:28,atb:0,npc:'edward'}]};
 x.encounters.enemyHula22={name:'전통 의식의 훌라 버섯',bg:'assets/maps-hires/forest-battle.png',intro:'버섯 갓 속의 날개가루를 확인하세요.',next:c.keys.powder,xp:260,gold:90,sp:35,enemies:[{name:'훌라 버섯',element:2,hp:1000,maxHp:1000,atk:28,atb:0,artPath:'assets/midterm/hula.png',height:135}]};
 const decorate=x.decorate;x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);if(sc.id==='weila'&&s.stage===c.keys.overhear){const e=sc.entities.find(e=>e.id==='masked21');if(e)sc.entities.push(n('hunger',e.x+85,e.y));}};
 const items=x.questItems;x.questItems=s=>[...items(s),...(s.stage>=c.keys.list&&s.stage<=c.end?[['날개가루 조사 기록',['아멜라: 치료약','에드워드: 검 수리','라우라: 의식 재료','샤이아: 신탁 재료'].filter((_,i)=>s.enemyAlibis&(1<<i)).join(' / ')||'수령자의 사용처를 확인하세요.']]:[])];
 window.ARPIA_ENEMY_CHAPTERS=[c];
})();
