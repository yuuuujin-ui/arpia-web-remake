/* Original plot: https://wonavy.tistory.com/214. See research/MIDTERM-17-18.md. */
(()=>{
 const x=ARPIA_EXTRA,m=ARPIA_MIDTERM,{root,give,take,item}=m;
 item('scrubber','뽀득 수세미','불꽃 마을 호숫가에서 찾은 델핀의 수세미');
 item('lava-ladle','용암 국자','에머리에게 빌린 국자. 불을 담은 뒤 반드시 돌려준다.');
 item('fire','조제용 불','용암 국자로 안전하게 담은 불','fire-vial');
 item('ice','조제용 얼음','아이스 골렘을 물리치고 험프리에게 받은 얼음','ice-chunk');
 item('soil','조제용 흙','훌라 버섯을 제압하고 라우라에게 받은 흙','hula-gem');
 item('wind','조제용 바람','독수리 마을의 시바에게 받은 바람','fairy-powder');
 item('akania','아카니아 꽃','독감 등 병을 치료하는 귀한 약초. 난쟁이의 옛 광산에서 핀다.');
 item('healing-potion','아카니아 치료 물약','쓰러진 아이작에게 먹일 치료약');
 item('potion-certificate','마법약 시험 확인증','위급한 상황에 맞는 치료약을 만든 판단 · 100점','certificate');
 Object.assign(x.npcs,{
  emery:{name:'에머리',artPath:root+'emery.png',portraitPath:root+'emery-large.png',height:68},
  delphin:{name:'델핀',artPath:root+'delphin.png',portraitPath:root+'delphin-large.png',height:65},
  scrubber18:{name:'뽀득 수세미',artPath:root+'scrubber.png',height:27},
  lava18:{name:'용암을 뜨는 곳',artPath:root+'lava-ladle.png',height:40},
  iceGolem18:{name:'아이스 골렘',artPath:'assets/original/pet-images/cubic/idle1.gif',height:76},
  akania18:{name:'아카니아 꽃',artPath:root+'akania.png',height:32}
 });
 ARPIA_PORTRAITS.emery=root+'emery-large.png';ARPIA_PORTRAITS.delphin=root+'delphin-large.png';
 const rows=[
  {key:'nextExam',title:'두 번째 시험을 앞두고',scene:'lobby',npc:'isaac',pos:[470,335],lines:[['isaac','이번 시험에도 퀴즈포켓이 나온대. 모든 과목에 관여한다나 봐.'],['you','마법약 시험도? 칠리 선생님께 가 봐야겠다.']]},
  {key:'bringExaminer',title:'시험 감독을 모셔 오자',scene:'materials',npc:'chilli',lines:[['chilli','물약 시험을 시작하려면 감독이 필요해. 줄리아 선생님께 퀴즈포켓을 받아 오렴.'],['you','교실에 다녀올게요.']]},
  {key:'examiner',title:'퀴즈포켓의 의심',scene:'classroom',npc:'julia',pos:[420,290],lines:[['julia','퀴즈포켓을 칠리 선생님께 데려다주겠니?'],['quizpocket','첫 시험에서 그 어려운 문제를 바로 맞히다니… 아무래도 수상하단 말이지.'],['you','훌라 버섯 문제는 제가 직접 해 본 일이었는걸요.']],effect:s=>s.midtermExaminer=true},
  {key:'recipe',title:'마법 고급 물약',scene:'materials',npc:'chilli',lines:[['chilli','각자 만들 약의 조제서를 고르렴. 쇼우는 마비 치료제를 골랐구나.'],['you','저는 마법 고급 물약에 도전할게요.'],['chilli','불, 얼음, 흙, 바람과 강화 마나스톤이 필요해. 재료를 빠뜨리지 말고 준비해 와.']],effect:s=>{s.midtermExaminer=false;s.midtermRecipe=true;}},
  {key:'friends',title:'아이작의 현자의 물약',scene:'campus',npc:'hina',pos:[303,316],lines:[['isaac','나는 현자의 물약을 만들 거야! 제일 어려운 걸 해내면 모두 놀라겠지?'],['hina','자랑은 성공하고 해. 재료가 떨어지기 전에 도구점부터 가 봐.'],['you','나도 서둘러야겠어.']]},
  {key:'soldOut',title:'이미 팔린 조제 재료',scene:'shop',npc:'sam',lines:[['sam','시험 재료라면 반나절 전에 다 팔렸단다. 직접 산지에 가야겠구나.'],['sam','불꽃 마을에서 불, 얼음 마을에서 얼음, 대지 마을에서 흙, 독수리 마을에서 바람을 구하렴.'],['sam','마지막 강화 마나스톤은 쥬다의 압둘라에게 물어봐.'],['you','불꽃 마을부터 차례로 다녀올게요.']]},
  {key:'emeryRequest',title:'뜨거운 용암과 국자',scene:'firevillage',npc:'emery',pos:[295,255],lines:[['emery','용암은 맨손으로 뜰 수 없지. 우리 마을의 용암 국자를 써야 해.'],['you','잠시 빌릴 수 있을까요?'],['emery','먼저 델핀의 일을 도와주겠니? 끝내고 오면 빌려주마.']]},
  {key:'delphinRequest',title:'호숫가의 수세미',scene:'firevillage',npc:'delphin',pos:[260,440],lines:[['delphin','뽀득 수세미를 호숫가에 두고 왔어. 조각상에서 오른쪽으로 꺾으면 물가가 나온단다.'],['you','수세미를 찾아서 가져올게요.']]},
  {key:'scrubber',title:'뽀득 수세미 발견',scene:'firevillage',npc:'scrubber18',pos:[450,205],fixture:true,lines:[['narrator','물가 가까이 놓인 수세미를 발견했다. 흙을 털어 델핀에게 가져가기로 했다.']],effect:s=>give(s,'scrubber')},
  {key:'returnScrubber',title:'델핀의 심부름 완료',scene:'firevillage',npc:'delphin',pos:[260,440],lines:[['delphin','맞아, 내가 쓰던 수세미야. 고맙다. 에머리 촌장님께도 도와줬다고 전하렴.'],['you','이제 용암 국자를 빌릴 수 있겠네요.']],effect:s=>take(s,'scrubber')},
  {key:'ladle',title:'용암 국자 대여',scene:'firevillage',npc:'emery',pos:[295,255],lines:[['emery','델핀을 도와줬구나. 자, 용암 국자다. 꼭 되돌려 줘야 한다.'],['you','필요한 만큼만 담고 바로 가져올게요.']],effect:s=>give(s,'lava-ladle')},
  {key:'fire',title:'첫 재료 · 불',scene:'firevillage',npc:'lava18',pos:[420,180],fixture:true,lines:[['narrator','용암 국자로 불의 힘을 조제 용기에 옮겨 담았다.'],['you','첫 번째 재료를 구했어. 국자를 반납하러 가자.']],effect:s=>give(s,'fire')},
  {key:'returnLadle',title:'국자를 돌려주며',scene:'firevillage',npc:'emery',pos:[295,255],lines:[['you','국자 돌려드리러 왔어요. 중간고사 재료를 잘 구했어요.'],['emery','시험 때문이었니? 진작 말했으면 바로 빌려줬을 텐데! 얼음 마을도 무사히 다녀오렴.']],effect:s=>take(s,'lava-ladle')},
  {key:'iceRequest',title:'얼음 던전의 골렘',scene:'icevillage',npc:'humphrey',pos:[397,466],lines:[['humphrey','조제용 얼음이 필요한가? 그렇다면 지하의 아이스 골렘부터 퇴치해 주게.'],['you','쿨스톤이 있던 던전이군요. 다녀오겠습니다.']]},
  {key:'golem',title:'아이스 골렘 퇴치',scene:'icedungeon',npc:'iceGolem18',pos:[621,346],fixture:true,lines:[['narrator','쿨스톤이 있던 방으로 가는 길을 아이스 골렘이 막아섰다.'],['you','마을로 올라가지 못하게 여기서 막겠어.']],battle:'midtermIce18'},
  {key:'ice',title:'두 번째 재료 · 얼음',scene:'icevillage',npc:'humphrey',pos:[397,466],lines:[['humphrey','던전이 잠잠해졌군. 약속한 얼음을 받게. 시험에서도 좋은 결과가 있기를 바라네.'],['you','감사합니다. 이번에는 대지 마을로 갈게요.']],effect:s=>give(s,'ice')},
  {key:'soilRequest',title:'다시 만날 훌라 버섯',scene:'earthvillage',npc:'laura',pos:[355,592],lines:[['laura','약을 만들 흙을 원하느냐? 훌라 버섯이 다시 사나워졌다. 한 번 더 도와주렴.'],['you','이번에도 주문과 가루가 필요할까요?'],['laura','이미 깨어 있으니 필요 없단다. 네가 다가가면 바로 달려들지도 몰라.']]},
  {key:'hulaAgain',title:'두 번째 훌라 버섯 전투',scene:'earthvillage',npc:'hula17',pos:[530,700],fixture:true,lines:[['narrator','훌라 버섯은 주인공을 알아본 듯 주문을 외우기도 전에 달려들었다.'],['you','이번에는 가루 없이도 깨어 있구나!']],battle:'midtermHula18'},
  {key:'soil',title:'세 번째 재료 · 흙',scene:'earthvillage',npc:'laura',pos:[355,592],lines:[['laura','다시 평온해졌구나. 여기 조제에 알맞은 흙이다. 생명을 이롭게 하는 약을 만들거라.'],['you','잘 쓸게요. 이제 바람을 구하러 가야겠어요.']],effect:s=>give(s,'soil')},
  {key:'wind',title:'시바의 걱정',scene:'eaglevillage',npc:'shiva',pos:[219,233],lines:[['shiva','필요한 바람은 여기 있다. 그런데 가루다님이 독감에 걸리셔서 걱정이구나.'],['shiva','난쟁이의 옛 광산에 아카니아 꽃이 핀단다. 간호 때문에 떠날 수 없으니 대신 구해 주겠니?'],['you','시험 재료도 중요하지만 아픈 분을 그냥 두고 갈 수는 없죠.']],effect:s=>give(s,'wind')},
  {key:'flower',title:'옛 광산의 아카니아 꽃',scene:'minedepths',npc:'akania18',pos:[445,255],fixture:true,lines:[['narrator','어두운 갱도의 틈에서 주황빛 아카니아 꽃을 찾았다. 필요한 꽃을 조심스럽게 챙겼다.'],['you','시바님이 광산 앞에서 기다리고 계실 거야.']],effect:s=>give(s,'akania',2)},
  {key:'spareFlower',title:'한 송이의 답례',scene:'mine',npc:'shiva',pos:[360,470],lines:[['shiva','잘 찾아왔구나. 가루다님을 치료하기에 충분하겠어. 남는 한 송이는 네가 갖고 있으렴.'],['you','저도 가지고 있어도 되나요? 감사합니다. 가루다님이 빨리 나으셨으면 좋겠어요.']],effect:s=>take(s,'akania')},
  {key:'lastStone',title:'마지막 강화 마나스톤',scene:'judah',npc:'abdullah',pos:[460,400],lines:[['abdullah','강화 마나스톤? 마지막 것은 아이작이 사 갔어. 지금은 구해 줄 수가 없네.'],['you','결국 재료 하나가 부족해졌어… 그래도 학교로 돌아가야 해.']],effect:s=>s.midtermStoneSoldOut=true},
  {key:'incomplete',title:'미완성 조제서',scene:'materials',npc:'chilli',lines:[['chilli','조제서의 재료가 전부 준비되지 않았구나. 이대로라면 최하점을 받을 수도 있어.'],['you','강화 마나스톤이 다 팔려서 구할 수 없었어요.'],['chilli','곧 네 차례다. 우선 아이작이 만드는 것을 보면서 기다리렴.']]},
  {key:'explosion',title:'현자의 물약 폭발',scene:'materials',npc:'isaac',pos:[535,280],lines:[['isaac','현자의 물약만 완성하면 모두 나를 다시 보게 될 거야!'],['narrator','솥 안의 빛이 거칠게 흔들렸다. 순간 큰 폭발음과 함께 아이작이 쓰러졌다.'],['you','아이작! 대답해 봐!'],['chilli','침착해. 지금 무엇이 필요한지 생각하렴.']],effect:s=>s.midtermIsaacCollapsed=true},
  {key:'rescueChoice',title:'점수보다 먼저 할 일',scene:'materials',npc:'chilli',lines:[['you','시바님이 남겨 주신 아카니아 꽃이 있어요. 이걸로 치료 물약을 만들겠어요!'],['chilli','네 조제서에는 다른 물약이 적혀 있다. 그래도 결정한 거니?']],choose:['지금 만들 물약','아이작이 쓰러졌습니다. 남은 아카니아 꽃을 어떻게 쓸까요?',['원래 조제서를 끝낼 때까지 기다린다','꽃을 아껴 두고 시험 점수를 먼저 챙긴다','아카니아 꽃으로 치료 물약을 만든다'],2,'지금 필요한 것은 쓰러진 친구를 치료할 약입니다.'],effect:s=>{take(s,'akania');give(s,'healing-potion');}},
  {key:'treatment',title:'아이작을 깨운 약',scene:'materials',npc:'isaac',pos:[535,280],lines:[['narrator','아카니아 치료 물약을 먹이자 아이작의 호흡이 차츰 안정되었다.'],['isaac','으… 무슨 일이 있었지? 내가 만든 물약은?'],['you','지금은 쉬어. 네가 깨어나서 정말 다행이야.']],effect:s=>{take(s,'healing-potion');s.midtermIsaacCollapsed=false;s.midtermIsaacSaved=true;}},
  {key:'potionScore',title:'두 과목 연속 100점',scene:'materials',npc:'chilli',lines:[['chilli','아이작은 조제에 실패했으니 0점이다. 하지만 {name}, 너는 100점이야.'],['you','조제서의 물약을 만들지 못했는데도요?'],['chilli','위급한 순간에 필요한 약을 판단하고 제대로 만들었잖니. 그게 살아 있는 마법 지식이란다.'],['you','아카니아 꽃을 구하러 다녀오길 정말 잘했어요.']],effect:s=>{s.midtermPotionScore=100;give(s,'potion-certificate');for(const id of ['fire','ice','soil','wind'])take(s,id);s.midtermRecipe=false;},reward:60,ending:'친구를 구한 판단으로 마법약 시험에서도 100점을 받았습니다. 마법 기초학과 마법약 확인증은 미션 아이템에 보관됩니다. 다음 과목인 던전 탐험은 후속 이야기로 이어집니다.'}
 ];
 const captured18={
  recipe:[['chilli','자, 먼저 설명을 듣거라. 물약을 조제하기 위해서는 보통 다섯 가지의 마법 재료가 필요하지.'],['you','불, 얼음, 흙, 바람… 그리고 강화 마나스톤이군요.'],['chilli','각자 자신의 조제서를 고르렴. 난도가 높은 약일수록 좋은 점수를 받을 수 있지만, 완성하지 못하면 소용없어.'],['you','저는 고급 물약에 도전할게요. 재료부터 빠짐없이 모아 오겠습니다.']],
  returnLadle:[['you','국자를 돌려드리러 왔어요. 중간고사에 필요한 불을 담았어요.'],['emery','중간고사 때문이었니? 진작 말했으면 바로 빌려줬을 텐데.'],['you','네? 그럼 수세미를 찾으러 그렇게 돌아다니지 않아도 됐잖아요!'],['emery','그래도 델핀에게 큰 도움이 되었지. 남은 시험도 잘 보렴.']],
  iceRequest:[['humphrey','워낙 인기가 많이 있어서 아무에게나 그냥 얼음을 줄 수는 없지.'],['you','시험에 넣을 한 조각만 있으면 돼요.'],['humphrey','던전의 아이스 골렘 열 마리를 물리치고 오게. 그러면 주겠네.'],['you','한 조각을 얻으려면 열 마리라… 알겠어요. 다녀올게요.']],
  ice:[['humphrey','자, 여기다. 녹지 않는 얼음이야.'],['you','이 한 조각이 녹지 않는다고 생각하니 더 귀하게 보이네요. 시험 때 잘 쓰겠습니다.']],
  hulaAgain:[['you','어이구, 깜짝이야! 저번에 한 번 덤비더니 이번에는 옆에 다가가기만 해도 공격하네.'],['narrator','깨어 있는 훌라 버섯이 몸을 부풀렸다. 가루를 뿌릴 필요도 없이 싸움이 시작되었다.']],
  wind:[['shiva','시험이라면 독수리 마을의 바람이지. 여기 있다.'],['you','바로 주시는 거예요? 감사합니다!'],['shiva','그런데 가루다님이 독감에 걸리셔서 걱정이구나. 병에 좋다는 아카니아 꽃을 구하러 가야 하는데 간호 때문에 떠날 수가 없어서 말이다.'],['you','제가 다녀올게요. 어디에서 찾으면 되나요?'],['shiva','난쟁이의 옛 광산을 찾아보거라. 내가 입구까지 길을 안내해 주마.']],
  spareFlower:[['you','여기 있어요. 광산 안에서 찾았어요.'],['shiva','고맙구나. 하지만 이 꽃을 전부 쓸 필요는 없겠어.'],['you','남은 것은 어떻게 할까요?'],['shiva','언젠가 도움이 될지 모르니 가지고 가렴. 가루다님은 내가 돌보마.']]
 };
 for(const r of rows)if(captured18[r.key])r.lines=captured18[r.key];
 const hula=rows.find(r=>r.key==='hulaAgain');hula.scene='earthdungeon';delete hula.pos;
 rows.find(r=>r.key==='lastStone').lines=s=>[['isaac','강화 마나스톤? 좀 전에 내가 남은 걸 구입했거든. 현자의 물약에 써야 하니까!'],['abdullah','아이작 말대로야. 오늘 들여온 것은 전부 팔렸네.'],['you',ARPIA_SYS.inv.count(s,'manastone_plus')?'전에 받은 강화 마나스톤을 챙겨 두길 잘했어. 이제 학교로 돌아가자.':'마지막 재료를 못 구했어… 그래도 시험 시간에 늦을 수는 없지. 학교로 돌아가자.']];
 const preparation=rows.find(r=>r.key==='incomplete');preparation.title='조제 준비 확인';preparation.lines=s=>ARPIA_SYS.inv.count(s,'manastone_plus')?[['chilli','네 재료를 확인해 보자. 강화 마나스톤도 미리 챙겨 왔구나.'],['you','네. 전에 받은 것을 가지고 있었어요.'],['chilli','곧 네 차례다. 우선 아이작이 만드는 것을 보며 기다리렴.']]:[['chilli','강화 마나스톤이 빠졌구나. 조제서의 재료가 부족하면 최하점을 받을 수도 있어.'],['you','압둘라의 물건이 전부 팔려서 구할 수 없었어요.'],['chilli','우선 아이작의 순서가 끝날 때까지 기다리렴.']];
 const c=m.register(18,'아르피아 중간고사 2부 · 아카니아 꽃',rows,{midtermExaminer:false,midtermRecipe:false,midtermStoneSoldOut:false,midtermIsaacCollapsed:false,midtermIsaacSaved:false,midtermPotionScore:0,midtermIceWon:false,midtermHulaAgainWon:false});
 x.encounters.midtermIce18={name:'얼음 던전 · 아이스 골렘',bg:'assets/maps-hires/forest-battle.png',intro:'단단한 얼음 몸체가 길을 막습니다. 불꽃 마법과 펫의 도움을 활용하세요.',next:c.keys.ice,setFlag:'midtermIceWon',xp:185,gold:95,sp:40,enemies:[{name:'아이스 골렘',element:1,hp:540,maxHp:540,atk:22,atb:12,sprite:'cubic',height:145}]};
 x.encounters.midtermHula18={name:'다시 만난 훌라 버섯',bg:'assets/maps-hires/forest-battle.png',intro:'주문 없이 깨어난 훌라 버섯이 덤벼듭니다.',next:c.keys.soil,setFlag:'midtermHulaAgainWon',xp:190,gold:100,sp:40,enemies:[{name:'훌라 버섯',element:2,hp:550,maxHp:550,atk:22,atb:25,sprite:'midtermHula',artPath:root+'hula-large.png',height:158}]};
 const decorate=x.decorate,items=x.questItems;
 x.decorate=(sc,s,n,p)=>{
  // From this exam onward the flame-village elder uses her correct identity.
  if(sc.id==='firevillage'&&s.stage>=c.start)sc.entities=sc.entities.filter(e=>e.id!=='elder');
  decorate(sc,s,n,p);
 };
 x.questItems=s=>[...items(s),...(s.midtermHulaKnown?[['훌라 버섯 관찰 기록','개화 주문 → 요정의 발톱가루. 깨어나면 공격하므로 주의.']]:[]),...(s.midtermHolyKnown?[['홀리 라이트 암기장','십자가 → 성모의 눈물 → 산티아고 콤스텔로지아 홀리 라이트']]:[]),...(s.midtermRecipe?[['마법 고급 물약 조제서',['불','얼음','흙','바람','강화 마나스톤'].map((name,i)=>(ARPIA_SYS.inv.count(s,i===4?'manastone_plus':'mt_'+['fire','ice','soil','wind'][i])?'✓ ':'□ ')+name).join(' · ')]]:[]),...(s.midtermBasicScore?[['중간고사 성적표','마법 기초학 '+s.midtermBasicScore+'점 / 마법약 '+(s.midtermPotionScore?s.midtermPotionScore+'점':'미응시')]]:[])];
 for(const [mood,texts]of Object.entries({surprised:['아이작! 대답해 봐!','조제서의 물약을 만들지 못했는데도요?'],sad:['결국 재료 하나가 부족해졌어… 그래도 학교로 돌아가야 해.'],determined:['시바님이 남겨 주신 아카니아 꽃이 있어요. 이걸로 치료 물약을 만들겠어요!','마을로 올라가지 못하게 여기서 막겠어.'],happy:['지금은 쉬어. 네가 깨어나서 정말 다행이야.','아카니아 꽃을 구하러 다녀오길 정말 잘했어요.']}))for(const text of texts)ARPIA_HERO_ART.annotations.set(text,mood);
})();
