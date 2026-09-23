/* Original event order: https://wonavy.tistory.com/228 (episode 33).
   Dialogue, archive search and battles are reconstructed around the preserved world. */
(()=>{
 const x=ARPIA_EXTRA,m=ARPIA_MIDTERM,icon='assets/items/';
 const item=(id,name,desc,path)=>ARPIA_DATA.ITEMS['mt_'+id]={name,desc,kind:'quest',price:0,sell:0,icon:path};
 item('kalamaLetter33','바다에서 건진 편지','칼라마 주민들이 구조를 청하며 흘려보낸 편지','assets/midterm/diary25.png');
 item('sagePermit33','세 현자의 허가','모리스·가루다·쟈칼이 승인한 금단의 문 개방 허가','assets/midterm/certificate.png');
 item('jackalUrine33','쟈칼의 잃어버린 호리병','수중 던전에서 되찾은 냄새가 강한 호리병',icon+'potion.png');
 item('eastKey33','금단의 동문 열쇠','헝거가 떨어뜨린 동문 초입의 열쇠',icon+'pendant.png');
 Object.assign(x.npcs,{
  kalamaLetter33:{name:'바다에서 건진 편지',artPath:'assets/midterm/diary25.png',height:36},
  forbiddenBook33:{name:'금단의 문 고서',artPath:'assets/ancient-ice-book.png',height:54},
  lostFlask33:{name:'쟈칼의 잃어버린 호리병',artPath:icon+'potion.png',height:38},
  eastLock33:{name:'금단의 동문 자물쇠',artPath:'assets/teleport-compass.png',height:58}
 });
 const rows=[
  {key:'mina',title:'우체국에 도착한 뜻밖의 편지',scene:'campus',npc:'mina',pos:[610,316],lines:[['mina','{name}, 콘라드님이 우체국에서 널 찾고 있어. 멀리서 온 편지가 있대.'],['you','칼라마에서 온 소식일지도 몰라. 바로 가 볼게.']]},
  {key:'conrad',title:'수신인이 압둘라인 편지',scene:'shop',npc:'conrad',pos:[513,380],lines:[['conrad','편지는 네게 온 게 아니라 쥬다 항구의 압둘라 앞으로 왔단다.'],['conrad','바닷물에 젖었지만 아주 먼 곳에서 흘러온 모양이야. 직접 확인해 보렴.']]},
  {key:'abdullah',title:'바다가 전한 구조 요청',scene:'judah',npc:'abdullah',pos:[245,130],lines:[['abdullah','바다에서 이 편지를 건졌소. 내가 읽을 글이 아닌 듯해 당신을 불렀지.'],['narrator','편지에는 헝거의 협박을 견디기 어렵다며 칼라마를 구해 달라는 말이 적혀 있었다.'],['you','할라할라 촌장님과 약속했어. 이번에는 꼭 문을 열 거야.']],effect:s=>m.give(s,'kalamaLetter33')},
  {key:'aaron',title:'금단의 문은 함부로 열 수 없다',scene:'classroom',npc:'aaron29',pos:[530,185],fixture:true,lines:[['aaron29','칼라마 사람들이 보낸 편지가 맞구나. 하지만 금단의 문은 학교의 판단 없이 열 수 없다.'],['you','그대로 두면 또 헝거에게 괴롭힘을 당해요. 다른 방법을 찾아볼게요.']]},
  {key:'sofia',title:'책 속에 있을 해답',scene:'lobby',npc:'sofia',pos:[470,335],lines:[['sofia','고민이 있으면 기록부터 확인해 보세요. 도서관의 멜리라면 금단의 문에 관한 책을 알 거예요.'],['you','왜 문이 만들어졌는지부터 알아봐야겠어.']]},
  {key:'melli',title:'고서 보관실로 몰래',scene:'library',npc:'meli',pos:[365,335],lines:[['meli','고서 보관실은 교장 선생님의 허락이 있어야 들어갈 수 있어요.'],['you','사람들의 생명이 걸린 일이에요. 딱 한 권만 확인하게 해 주세요.'],['meli','이번만 모른 척할게요. 눈꽃 문양이 있는 안쪽 문으로 가세요.']]},
  {key:'history',title:'세 개의 금단의 문',scene:'oldlibrary',npc:'forbiddenBook33',pos:[455,225],fixture:true,lines:[['narrator','오백 년 전 아즈카를 따르던 북쪽의 악한 무리를 막으려고 대륙을 가르는 세 문을 세웠다.'],['narrator','그 과정에서 펠리오와 크리스탈 왕국, 소수의 선한 이들이 북쪽에 고립되었다. 각 문에는 세 개의 열쇠가 필요하다. 동문·북문·서문의 열쇠 행방은 알 수 없다.'],['you','누군가를 희생한 채 끝난 봉인이었어. 지금이라도 길을 열 방법을 찾아야 해.']]},
  {key:'melliBack',title:'교장 선생님의 호출',scene:'library',npc:'meli',pos:[365,335],lines:[['meli','교장 선생님이 널 찾으세요. 고서 보관실에 들어간 걸 벌써 아신 것 같아요.'],['you','혼날 일이 있더라도 칼라마 편지를 보여 드릴게요.']]},
  {key:'morris',title:'칼라마 해방 명령',scene:'principal',npc:'morris',pos:[545,187],lines:[['morris','고서 보관실에 들어간 일은 옳지 않았지만, 외면하지 않은 뜻은 알겠다.'],['morris','금단의 동문을 열어 칼라마 사람들을 해방하거라. 다만 세 현자의 허가가 모두 필요하다.'],['you','가루다님과 쟈칼님의 허가도 받아 오겠습니다.']]},
  {key:'garuda',title:'가루다의 흔쾌한 허락',scene:'eaglevillage',npc:'garuda',pos:[296,140],lines:[['garuda','그들과 만난 것이 운명이라면 내가 막을 이유는 없지. 동문 개방을 허락하겠다.'],['garuda','문이 열리면 남과 북 모두 더 위험해질 수 있음을 잊지 마라.']]},
  {key:'dobiel',title:'심기가 불편한 쟈칼',scene:'waterfall',npc:'dobiel',pos:[305,374],lines:[['dobiel','오늘 쟈칼님의 심기가 좋지 않아요. 허락을 구하려면 말을 조심하세요.'],['you','그래도 칼라마 사람들을 위해 꼭 설득해야 해.']]},
  {key:'jackal',title:'쟈칼이 내건 조건',scene:'waterfall',npc:'jackal',pos:[488,149],lines:[['jackal','모리스와 가루다가 허락했다면 깊은 뜻이 있겠지. 나도 무턱대고 반대하지는 않겠다.'],['jackal','대신 수중 던전에 잃어버린 내 물건을 찾아오너라. 그러면 허락하지.']]},
  {key:'flask',title:'수중 던전의 수상한 호리병',scene:'diveroom11',npc:'lostFlask33',pos:[720,390],fixture:true,lines:[['narrator','공기 방울 옆에서 쟈칼의 문양이 새겨진 작은 호리병을 찾았다. 뚜껑을 여는 순간 지독한 냄새가 번졌다.'],['you','설마 이 안에 든 게… 빨리 닫고 가져가자.']],effect:s=>m.give(s,'jackalUrine33')},
  {key:'permit',title:'세 번째 현자의 허가',scene:'waterfall',npc:'jackal',pos:[488,149],lines:[['jackal','찾아왔군. 내 오줌을 담아 둔 호리병이다. 헝거의 코를 마비시키는 데 쓸 수 있을 게다.'],['you','이걸 찾으라고 수중 던전에 보낸 거였어요?'],['jackal','허허! 약속대로 동문 개방을 허락하마.']],effect:s=>m.give(s,'sagePermit33')},
  {key:'coords',title:'칼라마 좌표 211·24·56',scene:'principal',npc:'morris',pos:[545,187],lines:[['morris','세 현자의 허가가 모였구나. 칼라마 좌표는 211·24·56이다.'],['morris','아론과 함께 바바라의 텔레포트를 이용하거라. 반드시 주민들을 지켜야 한다.']]},
  {key:'teleport',title:'다시 금단의 동문 너머로',scene:'barbarahouse',npc:'teleportCompass',pos:[376,281],fixture:true,lines:[['barbara','좌표 211·24·56 확인. 아론 선생님과 함께 칼라마로 보낼게.'],['aaron29','이번에는 수정구슬이 아니라 사람들을 구하러 간다. 준비됐니?'],['you','네. 약속을 지키러 가요.']],effect:s=>m.take(s,'sagePermit33')},
  {key:'chief',title:'헝거의 협박을 견딘 칼라마',scene:'kalama31',npc:'halahala31',pos:[760,305],lines:[['halahala31','편지를 받아 주셨군요. 그 뒤로 헝거의 협박이 더 심해졌습니다.'],['you','세 현자의 허가를 받았어요. 열쇠를 되찾아 동문을 열겠습니다.']],effect:s=>m.take(s,'kalamaLetter33')},
  {key:'guards',title:'늑대의 도시 수하들',scene:'wolfcity31',npc:'hunger',pos:[970,230],lines:[['narrator','늑대의 도시 골목마다 헝거의 수하들이 길을 막았다.'],['aaron29','정면을 맡으마. 너는 오른쪽 경비부터 끊어라!'],['you','칼라마로 가는 길을 비켜!']],battle:'wolfGuards33'},
  {key:'boss',title:'열쇠를 건 헝거와의 결전',scene:'wolfcity31',npc:'hunger',pos:[970,230],lines:[['hunger','또 네 녀석이냐! 칼라마는 영원히 내 손아귀에 있을 것이다.'],['you','쟈칼님이 준 호리병이다. 받아라!'],['narrator','매캐한 냄새가 번지자 헝거가 코를 감싸며 비틀거렸다.'],['aaron29','지금이다! 동문의 열쇠를 되찾자!']],beforeBattle:s=>{if(!s.usedJackalFlask33){m.take(s,'jackalUrine33');s.usedJackalFlask33=true;}},battle:'hungerKey33'},
  {key:'key',title:'헝거가 떨어뜨린 열쇠',scene:'wolfcity31',npc:'eastKey33',pos:[970,230],fixture:true,lines:[['narrator','도망친 헝거가 있던 자리에 오래된 청동 열쇠가 떨어져 있었다.'],['you','이 열쇠로 칼라마 사람들에게 길을 열 수 있어.']],effect:s=>m.give(s,'eastKey33')},
  {key:'gate',title:'금단의 동문 초입 해방',scene:'eastgate',npc:'eastLock33',pos:[835,245],fixture:true,lines:[['aaron29','동문 앞 마법진에 열쇠의 힘을 전해라. 초입의 봉인을 풀어 칼라마를 오갈 길을 되찾는 것이다.'],['narrator','발밑의 마법진이 빛나며 동문 초입을 막던 봉인이 풀렸다. 칼라마 사람들도 이 길을 오갈 수 있게 되었다.'],['you','할라할라 촌장님, 이제 이 길로 나갈 수 있어요!']],effect:s=>{m.take(s,'eastKey33');s.eastGateLiberated33=true;}},
  {key:'freedom',title:'칼라마에 열린 첫 번째 길',scene:'kalama31',npc:'halahala31',pos:[760,305],lines:[['halahala31','약속을 지켜 주셨군요. 칼라마 사람들이 다시 남쪽과 오갈 수 있게 되었습니다.'],['aaron29','아직 동문의 초입만 열린 것이다. 북문과 서문도 남아 있고, 악의 세력도 이 길을 이용할 수 있다.'],['you','더 어려운 모험이 오더라도 오늘 연 길을 지킬게요.']],effect:s=>s.kalamaLiberated33=true,reward:0,ending:'세 현자의 허가를 모아 헝거에게서 열쇠를 되찾고 금단의 동문 초입을 열었습니다. 칼라마 해방의 첫 길이 이어졌습니다.'}
 ];
 rows.push({key:'aaronReport',title:'칼라마 해방 보고',scene:'kalama31',npc:'aaron29',pos:[670,390],lines:[['aaron29','촌장님께 이야기를 듣고 왔니? 이제 칼라마 사람들도 문 밖으로 나갈 수 있게 되었구나.'],['you','약속을 지켜서 다행이에요. 도와주셔서 감사합니다.'],['aaron29','잘했다. 오늘 한 일을 잊지 말거라.']],reward:100,ending:'헝거에게서 되찾은 열쇠로 동문 초입을 열고 아론에게 칼라마 해방을 보고했습니다.'});
 const captured33={
 "conrad": [
  [
   "conrad",
   "항구의 압둘라에게서 전갈이 왔어. 이상한 내용이라 직접 보여 주고 싶다더구나."
  ],
  [
   "you",
   "제 편지가 우체국에 도착한 줄 알았어요."
  ],
  [
   "conrad",
   "바다에서 건진 편지라네. 무슨 사연인지 항구에 가 보렴."
  ]
 ],
 "abdullah": [
  [
   "abdullah",
   "어서오시오. 보시오. 바다에서 건진 편지요."
  ],
  [
   "narrator",
   "도와주신 은혜에 감사드립니다. 그러나 헝거의 협박이 심해졌습니다. 금단의 동문을 열어 저희를 구해 주십시오. 칼라마의 할라할라."
  ],
  [
   "you",
   "할라할라 촌장님이야. 지난번에 돌아온 뒤로도 계속 괴롭힘을 당하셨구나."
  ],
  [
   "abdullah",
   "멀리서 흘려보낸 구조 요청 같소. 학교에 먼저 알리는 게 좋겠소."
  ]
 ],
 "aaron": [
  [
   "aaron29",
   "칼라마에서 온 편지로구나. 주민들이 아직 헝거의 위협 아래 있단 말이지?"
  ],
  [
   "you",
   "제가 구해 드리겠다고 약속했어요. 동문을 열면 안전하게 나올 수 있잖아요."
  ],
  [
   "aaron29",
   "그 문을 세운 데는 이유가 있다. 열쇠를 안다고 해서 마음대로 열 수 있는 곳이 아니야."
  ],
  [
   "you",
   "그럼 누가 허락해야 하나요?"
  ],
  [
   "aaron29",
   "교장 선생님과 현자들의 판단이 필요하다. 우선 그 문에 관해 알아보렴."
  ]
 ],
 "sofia": [
  [
   "sofia",
   "그럴 때는 도서관에서 방법을 알아보는 게 어때. 책에는 많은 지식이 담겨 있잖아."
  ],
  [
   "you",
   "금단의 문에 관한 책을 찾으면 선생님을 설득할 수 있을까?"
  ],
  [
   "sofia",
   "왜 닫았는지 알아야 어떻게 열지도 생각할 수 있겠지. 멜리 선생님께 물어봐."
  ]
 ],
 "melli": [
  [
   "meli",
   "금단의 문 기록은 고서 보관실에 있어요. 교장 선생님의 허락이 필요한 곳인데…"
  ],
  [
   "you",
   "헝거에게 위협받는 사람들이 있어요. 왜 문이 막혔는지 읽고 싶어요."
  ],
  [
   "meli",
   "이번에는 먼저 살펴보도록 해요. 안쪽의 초상화 두 장을 비교하면 입구를 찾을 수 있을 거예요."
  ],
  [
   "you",
   "전에도 봤던 초상화구나. 달라진 곳부터 찾아보자."
  ]
 ],
 "morris": [
  [
   "morris",
   "나는 네 뜻을 알겠다. 사람의 고난에 눈을 감을 수는 없지."
  ],
  [
   "you",
   "허락 없이 고서를 읽은 건 죄송해요. 그래도 편지에 답하고 싶었어요."
  ],
  [
   "morris",
   "동문을 열어 칼라마 사람들을 구하도록 하여라. 내 허락만으로는 부족하니 가루다와 쟈칼에게도 허락을 구하거라."
  ],
  [
   "you",
   "두 분께도 사정을 말씀드리겠습니다."
  ]
 ],
 "garuda": [
  [
   "garuda",
   "그대의 용기가 칼라마 사람들에게 길을 열어 주겠군. 내 허락은 받았네."
  ],
  [
   "you",
   "정말요? 고맙습니다. 이제 쟈칼님만 남았어요."
  ],
  [
   "garuda",
   "문을 열면 좋은 이들만 드나드는 것은 아니네. 그 책임도 잊지 말게."
  ]
 ],
 "jackal": [
  [
   "jackal",
   "모리스와 가루다에게 허락을 받았다고? 그럼 마지막은 내 차례로군."
  ],
  [
   "you",
   "칼라마 주민들이 헝거에게 시달리고 있어요. 도와주고 싶습니다."
  ],
  [
   "jackal",
   "알겠네. 먼저 수중 던전에서 잃어버린 물건을 찾아 와 주겠나. 작은 병일세."
  ],
  [
   "you",
   "지금은 급한데 또 물건 찾기인가요?"
  ],
  [
   "jackal",
   "찾아오면 왜 필요한지도 알게 될 걸세."
  ]
 ],
 "permit": [
  [
   "jackal",
   "잘 찾았군. 헝거와 싸울 때 쓰게. 이 안에 든 내 오줌 냄새를 맡으면 정신을 못 차릴 게야."
  ],
  [
   "you",
   "그냥 심부름을 시키신 게 아니었군요. 그런데 뚜껑을 여는 제가 먼저 쓰러질 것 같아요."
  ],
  [
   "jackal",
   "허허. 그러니 바람을 잘 보고 쓰게나. 약속대로 동문 개방도 허락하겠네."
  ]
 ],
 "chief": [
  [
   "halahala31",
   "편지를 읽고 와 주셨군요. 그 사이에 헝거의 협박이 더 심해졌답니다."
  ],
  [
   "you",
   "이번에는 아론 선생님과 함께 왔어요. 세 현자께 허락도 받았고요."
  ],
  [
   "aaron29",
   "늑대의 도시에서 열쇠를 되찾아 봉인을 풀겠습니다. 주민들은 안전한 곳에 계십시오."
  ],
  [
   "halahala31",
   "우리에게 다시 희망이 생겼군요. 부디 조심하십시오."
  ]
 ],
 "freedom": [
  [
   "halahala31",
   "정말 동문의 길이 열렸군요! 이제 우리도 이곳을 나갈 수 있는 것입니까?"
  ],
  [
   "you",
   "네. 헝거에게서 되찾은 열쇠로 봉인을 풀었어요."
  ],
  [
   "halahala31",
   "고맙습니다. 주민들에게도 알려야겠습니다. 칼라마를 잊지 않고 돌아와 주셨군요."
  ],
  [
   "you",
   "처음 만났을 때 한 약속을 지킬 수 있어서 저도 기뻐요."
  ]
 ],
 "aaronReport": [
  [
   "aaron29",
   "잘했다. 사람들을 위해 끝까지 움직였구나. 선행점수 100점을 주마."
  ],
  [
   "you",
   "선생님이 함께 오셔서 용기가 났어요."
  ],
  [
   "aaron29",
   "길이 열렸으니 앞으로 지켜야 할 일도 늘겠지. 오늘 배운 책임을 잊지 말거라."
  ]
 ]
};
 for(const row of rows)if(captured33[row.key])row.lines=captured33[row.key];
 const c=m.register(33,'칼라마 해방작전 · 열쇠를 찾아라',rows,{eastGateLiberated33:false,kalamaLiberated33:false,usedJackalFlask33:false});
 Object.assign(x.defaults,{archivePortrait33:false,portraitDifferences33:[]});
 const beforePortrait33=x.interact;
 x.interact=(e,a)=>{const s=a.state;if(s.stage===c.keys.history&&s.scene==='oldlibrary'&&e.id==='forbiddenBook33'&&!s.archivePortrait33){ARPIA_PORTRAIT_PUZZLE(a,{field:'portraitDifferences33',complete:()=>{s.archivePortrait33=true;a.save();beforePortrait33(e,a);}});return true;}return beforePortrait33(e,a);};
 const items=x.questItems;x.questItems=s=>[...items(s),...(s.inv.mt_kalamaLetter33?[['칼라마 구조 요청 편지','바다를 건너온 오아시스 주민들의 편지']]:[]),...(s.inv.mt_sagePermit33?[['세 현자의 허가','금단의 동문 개방 승인']]:[]),...(s.inv.mt_jackalUrine33?[['쟈칼의 호리병','헝거의 후각을 흐리는 강한 냄새']]:[]),...(s.inv.mt_eastKey33?[['금단의 동문 열쇠','동문 초입의 봉인을 여는 청동 열쇠']]:[])];
 x.encounters.wolfGuards33={name:'늑대의 도시 · 헝거의 수하',bg:'assets/chapter31/wolf-city.png',intro:'오아시스로 이어지는 길을 막는 늑대 경비들을 돌파하세요.',next:c.keys.boss,xp:550,gold:210,sp:82,enemies:[{name:'늑대 도시 경비',element:2,hp:760,maxHp:760,atk:25,atb:4,artPath:'assets/white-wolf.png',height:140},{name:'늑대 도시 추격자',element:1,hp:720,maxHp:720,atk:25,atb:18,artPath:'assets/white-wolf.png',height:135}]};
 x.encounters.hungerKey33={name:'칼라마 해방전 · 헝거',bg:'assets/chapter31/wolf-city.png',intro:'쟈칼의 호리병으로 후각을 흐린 헝거에게서 동문의 열쇠를 되찾으세요.',next:c.keys.key,xp:650,gold:245,sp:95,enemies:[{name:'열쇠지기 헝거',element:1,hp:1880,maxHp:1880,atk:31,atb:12,artPath:'assets/original/character/other/헝거.png',height:185},{name:'헝거의 호위 늑대',element:2,hp:620,maxHp:620,atk:24,atb:2,artPath:'assets/white-wolf.png',height:130}]};
 for(const [mood,lines]of Object.entries({determined:['할라할라 촌장님과 약속했어. 이번에는 꼭 문을 열 거야.','가루다님과 쟈칼님의 허가도 받아 오겠습니다.','칼라마로 가는 길을 비켜!','더 어려운 모험이 오더라도 오늘 연 길을 지킬게요.'],surprised:['이걸 찾으라고 수중 던전에 보낸 거였어요?'],happy:['할라할라 촌장님, 이제 이 길로 나갈 수 있어요!']}))for(const text of lines)ARPIA_HERO_ART.annotations.set(text,mood);
})();
