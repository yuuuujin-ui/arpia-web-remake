/* Chapter 16: 얼음 마을의 위기 - 사라진 쿨스톤. Plot order: https://wonavy.tistory.com/213 */
(()=>{
 const x=ARPIA_EXTRA,prior=x.interact,decorate=x.decorate,items=x.questItems;
 Object.assign(x.defaults,{iceGuardianWon16:false,portraitDifferences16:[],iceMail:false,iceVillageSurvey:false,iceCrest:false,coolstoneTainted:false,libraryKey:false,icePuzzleStep:0,ancientIceBook:false,coolstoneSpell:false,coolstonePurified:false,coolstoneReturned:false,iceCake:false});
 Object.assign(x.npcs,{scarlet:{name:'스칼렛',anim:'npc_100_도트_스칼렛',portraitPath:'assets/portraits/scarlet.png'},adelio:{name:'아델리오',anim:'npc_077_도트_아델리오',portraitPath:'assets/portraits/adelio.png'},nell:{name:'넬 할머니',anim:'npc_109_도트_루시',portraitPath:'assets/portraits/nell.png'},talisha:{name:'탈리샤',anim:'npc_116_도트_제스퍼',portraitPath:'assets/portraits/talisha.png'},iceStatue:{name:'험프리 백작의 동상',artPath:'assets/ice-crest.png',height:90},coolstone:{name:'오염된 쿨스톤',artPath:'assets/coolstone.png',height:100},oldLibraryDoor:{name:'고서 도서관의 문',artPath:'assets/ice-crest.png',height:75},ancientIceBook:{name:'고대 얼음 마법의 책',artPath:'assets/ancient-ice-book.png',height:76},iceCake:{name:'얼음 케이크',artPath:'assets/ice-cake.png',height:62}});
 x.scenes.icedungeon=(s,n,p)=>({id:'icedungeon',name:'얼음 마을 지하 · 쿨스톤의 방',bg:'assets/maps-hires/forest-battle.png',w:1000,h:658,zoom:1.08,tint:'#67c9ff44',nodes:[[158,525],[273,485],[390,446],[505,394],[621,346],[736,294],[834,238]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]],entities:[p('back','얼음 마을',158,525,'icevillage',[300,744]),...(s.stage===307?[{...n('coolstone',736,294),type:'fixture'}]:[])]});
 x.scenes.oldlibrary=(s,n,p)=>({id:'oldlibrary',name:'도서관 2층 · 고서 보관실',bg:'assets/maps-hires/library.png',w:559,h:431,zoom:1.42,tint:'#18335a44',nodes:[[275,390],[205,360],[125,330],[72,285],[133,250],[215,260],[285,300],[365,335],[445,322],[500,270],[455,225],[390,205],[340,155]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[6,11]],entities:[p('back','도서관 1층',275,390,'library',[275,390]),...(s.stage===311?[{...n('oldLibraryDoor',133,250),type:'fixture'}]:[]),...(s.stage===312?[{...n('ancientIceBook',455,225),type:'fixture'}]:[])]});
 x.map.push(['icedungeon','쿨스톤의 방',[158,525]],['oldlibrary','고서 도서관',[275,390]]);
 const rows=[
 [
  "녹아 버린 얼음 케이크",
  "campus",
  "isaac",
  [
   [
    "isaac",
    "이것 좀 봐. 얼음 마을의 케이크를 가져왔는데 상자 안에 물만 남았어."
   ],
   [
    "you",
    "절대로 녹지 않는 얼음으로 만든다고 하지 않았어?"
   ],
   [
    "isaac",
    "맞아. 너도 맛보게 하려고 가져온 건데… 이상하네."
   ],
   [
    "you",
    "장난친 거 아니지? 히나도 알고 있을까?"
   ]
  ]
 ],
 [
  "얼음 마을의 특급 우편",
  "campus",
  "hina",
  [
   [
    "hina",
    "얼음 케이크? 얼음 마을에서 녹지 않는 얼음으로 만든다는 그 케이크 말이야?"
   ],
   [
    "you",
    "아이작이 가져온 건 전부 녹아 버렸어."
   ],
   [
    "hina",
    "네 앞으로 얼음 마을의 편지도 왔다던데. 우체국에서 확인해 봐. 관계가 있을지도 몰라."
   ]
  ]
 ],
 [
  "자존심 강한 마을의 요청",
  "shop",
  "conrad",
  [
   [
    "conrad",
    "험프리 촌장이 보낸 긴급 편지란다."
   ],
   [
    "narrator",
    "얼음 마을 큰 위기! 도와다오! — 얼음 마을 촌장 험프리."
   ],
   [
    "you",
    "설명도 없이 이 한마디뿐이네. 케이크가 녹은 일과 관련이 있겠어. 직접 가 봐야겠다."
   ]
  ]
 ],
 [
  "험프리의 초청",
  "icevillage",
  "humphrey",
  [
   [
    "you",
    "마을이 생각보다 따뜻하네요. 길가에 꽃까지 피었어요."
   ],
   [
    "humphrey",
    "본래 이곳은 바람과 서리의 마법을 사용해도 끄떡없는 얼음으로 뒤덮여 있었네."
   ],
   [
    "you",
    "그래서 얼음 케이크도 녹지 않았군요. 그런데 무슨 일이 생긴 거예요?"
   ],
   [
    "humphrey",
    "그걸 알아봐 달라고 불렀다네. 이렇게 녹다가는 마을이 무너지고 말겠어."
   ]
  ]
 ],
 [
  "스칼렛이 본 따뜻한 바람",
  "icevillage",
  "scarlet",
  [
   [
    "scarlet",
    "눈이 물러져서 평소에 다니던 길도 미끄러워졌어요."
   ],
   [
    "you",
    "동상 옆에도 물이 고였네. 언제부터 이렇게 됐어요?"
   ],
   [
    "scarlet",
    "갑자기 따뜻해졌어요. 주민들도 이유를 몰라 불안해하고 있어요."
   ]
  ]
 ],
 [
  "아델리오의 관측",
  "icevillage",
  "adelio",
  [
   [
    "adelio",
    "밤이 되어도 예전처럼 차가워지지 않아요. 날씨가 조금 바뀐 정도가 아닙니다."
   ],
   [
    "you",
    "얼음을 계속 얼려 주던 힘이 사라진 걸까요?"
   ],
   [
    "adelio",
    "오래된 일은 어른들이 더 잘 아실 겁니다. 마을의 옛 기록도 찾아봐 주세요."
   ]
  ]
 ],
 [
  "기숙사로 들어간 아이작",
  "campus",
  "hina",
  [
   [
    "you",
    "아이작에게 물어볼 게 있는데 어디 갔어?"
   ],
   [
    "hina",
    "아이작은 기숙사로 들어가 버렸어. 단단히 삐쳤나 봐."
   ],
   [
    "you",
    "장난 아니냐고 한 걸 사과하려고 했는데… 얼음 마을도 정말 큰일이야."
   ],
   [
    "hina",
    "나오미 선생님께 먼저 여쭤봐. 마을에 관한 이야기를 아실 거야."
   ]
  ]
 ],
 [
  "독수리 마을의 옛 기록",
  "classroom",
  "naomi",
  [
   [
    "naomi",
    "얼음 마을은 오래전부터 그렇게 차가웠던 곳이 아니야. 독수리 마을에 가서 물어보렴."
   ],
   [
    "you",
    "사람들이 살기 전의 이야기인가요?"
   ],
   [
    "naomi",
    "오랜 세월을 지켜본 신수라면 그 변화를 기억하겠지."
   ]
  ]
 ],
 [
  "시바가 느낀 변화",
  "eaglevillage",
  "shiva",
  [
   [
    "shiva",
    "맞아. 얼음 마을은 본래 독수리 마을의 일부였지."
   ],
   [
    "you",
    "그런데 왜 얼음으로 뒤덮인 거예요?"
   ],
   [
    "shiva",
    "녹지 않는 얼음이 생기면서 그곳에서 살던 사람들이 다른 곳으로 옮겨 갔단다. 가루다에게 더 물어보거라."
   ]
  ]
 ],
 [
  "사라진 쿨스톤",
  "eaglevillage",
  "garuda",
  [
   [
    "garuda",
    "얼음 마을은 추운 날씨나 눈보라 때문에 얼어붙은 곳이 아니오. 쿨스톤이라는 마법의 돌이 냉기를 일으킨 것이지."
   ],
   [
    "you",
    "그 돌이 사라졌거나 힘을 잃었을 수도 있겠네요."
   ],
   [
    "garuda",
    "맞소. 얼음이 녹고 있다면 쿨스톤을 찾아야 하오. 마을의 넬 할머니에게 오래된 이야기를 물어보시오."
   ]
  ]
 ],
 [
  "넬 할머니의 기억",
  "icevillage",
  "nell",
  [
   [
    "nell",
    "그렇고 보니 할머니께서도 그런 말씀을 하셨지. 동상의 발치에 지하로 통하는 입구가 있다고."
   ],
   [
    "you",
    "험프리 백작의 동상이요? 거기 아래에 쿨스톤이 있는지 살펴볼게요."
   ],
   [
    "nell",
    "오래된 곳이니 발밑을 조심하렴."
   ]
  ]
 ],
 [
  "비어 있는 문양 홈",
  "icevillage",
  "iceStatue",
  [
   [
    "narrator",
    "동상 받침의 안내판에 문장이 끼워질 만한 홈이 나 있었다."
   ],
   [
    "you",
    "여기 험프리 가문의 문장을 끼우는 것 같아. 촌장님께 빌려야겠네."
   ]
  ]
 ],
 [
  "얼음 마을의 문장",
  "icevillage",
  "humphrey",
  [
   [
    "you",
    "동상 아래 입구를 찾았어요. 이 홈에 맞는 가문의 문장이 필요해요."
   ],
   [
    "humphrey",
    "문장이 탐나는 것은 아니겠지? 자, 여기 있네. 잘 간수해야 한다."
   ],
   [
    "you",
    "입구를 여는 데 쓰고 돌려드릴게요."
   ]
  ]
 ],
 [
  "동상 아래의 입구",
  "icevillage",
  "iceStatue",
  [
   [
    "narrator",
    "문장을 안내판의 홈에 끼우자 지하로 내려가는 통로가 열렸다."
   ],
   [
    "you",
    "얼음 마을 아래에 이런 곳이 있었구나. 쿨스톤이 있는지 찾아보자."
   ]
  ]
 ],
 [
  "탁해진 쿨스톤",
  "icedungeon",
  "coolstone",
  [
   [
    "narrator",
    "동굴 안쪽에서 눈꽃 문양이 새겨진 돌을 발견했다. 푸른빛이 흐려지고 검은 기운이 감돌고 있었다."
   ],
   [
    "you",
    "이게 바로 쿨스톤이구나. 가루다가 말한 것처럼 맑지가 않아. 오염된 것 같아."
   ],
   [
    "you",
    "조심해서 가져가자. 돌을 찾았다고 끝난 일이 아니겠어."
   ]
  ]
 ],
 [
  "가루다에게 맡긴 쿨스톤",
  "eaglevillage",
  "garuda",
  [
   [
    "garuda",
    "쿨스톤은 아주 오래된 마법의 돌이오. 정화하려면 만들 때 사용한 고대 주문을 알아야 하오."
   ],
   [
    "you",
    "모리스 교장 선생님이라면 아시지 않을까요?"
   ],
   [
    "garuda",
    "그동안 쿨스톤은 내가 맡겠소. 오염이 더 퍼지지 않도록 붙들어 두겠소."
   ]
  ]
 ],
 [
  "숨겨진 도서관",
  "principal",
  "morris",
  [
   [
    "morris",
    "도서관에는 고대의 책들을 따로 보관한 장소가 있단다. 분명히 그곳에 쿨스톤을 만든 주문이 적힌 책도 있을 거야."
   ],
   [
    "you",
    "평소 다니던 책장에서는 못 본 것 같아요."
   ],
   [
    "morris",
    "멜리에게 고서 보관실의 열쇠를 빌리렴. 찾은 책은 함부로 주문을 외우지 말고 먼저 살펴보고."
   ]
  ]
 ],
 [
  "멜리의 열쇠",
  "library",
  "meli",
  [
   [
    "meli",
    "자, 여기 열쇠예요. 하나뿐인 열쇠니까 잃어버리면 곤란해요."
   ],
   [
    "you",
    "필요한 책을 찾으면 바로 돌려드릴게요."
   ],
   [
    "meli",
    "복도 끝의 두 초상화를 잘 비교해 보세요. 서로 다른 세 곳을 찾아야 보관실로 들어갈 수 있어요."
   ]
  ]
 ],
 [
  "고서 복도의 틀린 그림",
  "oldlibrary",
  "oldLibraryDoor",
  "퍼즐"
 ],
 [
  "다섯 권 중 파란 책",
  "oldlibrary",
  "ancientIceBook",
  [
   [
    "narrator",
    "책상 위에 서로 다른 빛깔의 마법서 다섯 권이 놓여 있다."
   ],
   [
    "you",
    "회색은 바람 마법서… 찾는 것은 얼음에 관한 책이야. 표지와 제목을 같이 살펴보자."
   ]
  ]
 ],
 [
  "열쇠 반납",
  "library",
  "meli",
  [
   [
    "you",
    "고대 얼음 마법서를 찾았어요. 빌린 열쇠부터 돌려드릴게요."
   ],
   [
    "meli",
    "잘 가져왔군요. 오래된 글씨라 읽기가 쉽지 않겠어요. 탈리샤에게 해독을 부탁해 보세요."
   ],
   [
    "you",
    "틀리게 읽었다가 쿨스톤이 더 상하면 안 되겠죠. 감사합니다."
   ]
  ]
 ],
 [
  "쿨스톤 정화 주문",
  "shop",
  "talisha",
  [
   [
    "talisha",
    "이 부분이 쿨스톤에 관한 기록이군요. 정화할 때 외우는 주문도 적혀 있어요."
   ],
   [
    "you",
    "제가 적어 갈 테니 천천히 읽어 주세요."
   ],
   [
    "talisha",
    "쿨스톤 옴스쿠렌자 무스카우니타 고골리."
   ],
   [
    "you",
    "가루다에게 그대로 전할게요."
   ],
   [
    "talisha",
    "책은 내가 멜리에게 돌려주지요. 적은 주문을 다시 한번 확인해 보세요."
   ]
  ]
 ],
 [
  "쿨스톤 정화",
  "eaglevillage",
  "garuda",
  [
   [
    "you",
    "고대 얼음 마법서에서 주문을 찾았어요. 쿨스톤 옴스쿠렌자 무스카우니타 고골리."
   ],
   [
    "narrator",
    "주문이 끝나자 쿨스톤을 감싸던 탁한 기운이 흩어졌다. 눈꽃 문양 사이로 맑은 빛이 돌아왔다."
   ],
   [
    "garuda",
    "이제 냉기가 되살아났소. 당분간 내가 쿨스톤을 지키겠소. 얼음 마을에도 소식을 전해 주시오."
   ]
  ]
 ],
 [
  "시바에게 인사",
  "eaglevillage",
  "shiva",
  [
   [
    "shiva",
    "바람결이 다시 차가워졌구나. 쿨스톤을 되찾았느냐?"
   ],
   [
    "you",
    "오염되어 있었어요. 지금은 정화해서 가루다가 맡고 있어요."
   ],
   [
    "shiva",
    "그럼 마을 사람들이 기다리겠군. 얼음 마을로 데려다주마."
   ]
  ]
 ],
 [
  "돌아온 겨울",
  "icevillage",
  "humphrey",
  [
   [
    "humphrey",
    "눈과 얼음이 다시 단단해졌네. 정말 큰일을 해 주었어."
   ],
   [
    "you",
    "쿨스톤은 가루다가 안전하게 지키고 있어요. 이제 마을도 괜찮을 거예요."
   ],
   [
    "humphrey",
    "얼음 마을의 녹지 않는 얼음으로 만든 케이크야. 감사의 뜻으로 받아 주게."
   ],
   [
    "you",
    "이번에는 학교까지 가도 녹지 않겠네요!"
   ]
  ]
 ],
 [
  "가루다의 새로운 보관소",
  "eaglevillage",
  "garuda",
  [
   [
    "you",
    "촌장님께 소식을 전했어요. 마을의 얼음도 원래대로 돌아왔고요."
   ],
   [
    "garuda",
    "수고했소. 쿨스톤은 내가 맡아 두겠소. 다시 이런 일이 일어나지 않도록 살펴보겠소."
   ],
   [
    "you",
    "그럼 저는 아이작에게도 알려 주러 갈게요."
   ]
  ]
 ],
 [
  "아이작과 얼음 케이크",
  "campus",
  "isaac",
  [
   [
    "you",
    "사과의 뜻으로 받아 줘, 아이작. 네가 준 케이크가 녹은 건 장난이 아니었어. 얼음 마을에 문제가 있었거든."
   ],
   [
    "isaac",
    "그래서 직접 다녀온 거야? 이번 건 정말 하나도 안 녹았네."
   ],
   [
    "you",
    "마을도 구했고 케이크도 받아 왔어. 아까 의심해서 미안해."
   ],
   [
    "isaac",
    "자, 이건 내 화해의 선물이야. 받아 줘."
   ],
   [
    "narrator",
    "아이작이 강화 마나스톤을 건넸다. 두 사람은 케이크를 앞에 놓고 얼음 마을에서 있었던 이야기를 나누었다."
   ]
  ]
 ]
];
 window.ARPIA_EPISODE16={rows};
 const start=293,end=start+rows.length;
 x.quests.splice(251,1,...rows.map(([title,scene,id])=>['제16화 · '+title,(x.npcs[id]?.name||title)+' 만나기',scene,id]),['제16화 완료 · 사라진 쿨스톤','쿨스톤을 정화해 얼음 마을과 웨일라의 겨울을 되찾았습니다.','campus','none']);
 x.chapters.push([start,end,'제16화 얼음 마을의 위기 · 사라진 쿨스톤']);
 x.encounters.iceGuardians16={name:'쿨스톤 동굴의 길목',intro:'유령강아지와 늑대가 길을 막고 있습니다.',bg:'assets/maps-hires/forest-battle.png',next:307,setFlag:'iceGuardianWon16',xp:150,gold:35,sp:10,enemies:[{name:'유령강아지',sprite:'fightDog',element:1,hp:230,maxHp:230,atk:17,atb:12},{name:'늑대',sprite:'fightDog',element:2,hp:270,maxHp:270,atk:19,atb:4}]};
 x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);if(s.stage<start)return;const add=(id,xp,yp,fixture=false)=>{if(!sc.entities.some(e=>e.id===id))sc.entities.push({...n(id,xp,yp),...(fixture?{type:'fixture'}:{})});};
  if(sc.id==='campus'&&[293,294,299,319].includes(s.stage))add([294,299].includes(s.stage)?'hina':'isaac',[294,299].includes(s.stage)?303:610,316);
  if(sc.id==='icevillage'){if([296,305,317].includes(s.stage))add('humphrey',397,466);if(s.stage===297)add('scarlet',510,410);if(s.stage===298)add('adelio',610,355);if(s.stage===303)add('nell',520,390);if([304,306].includes(s.stage))add('iceStatue',610,300,true);if(s.stage>=306)sc.entities.push(p('iceDungeonDoor','동상 아래 지하',610,300,'icedungeon',[158,525]));}
  if(sc.id==='classroom'&&s.stage===300)add('naomi',530,185);if(sc.id==='eaglevillage'&&[301,302,308,315,316,318].includes(s.stage))add([301,316].includes(s.stage)?'shiva':'garuda',[301,316].includes(s.stage)?219:296,[301,316].includes(s.stage)?233:140);
  if(sc.id==='library'&&s.stage>=310)sc.entities.push(p('oldLibrary','고서 도서관 2층',340,155,'oldlibrary',[275,390]));if(sc.id==='shop'&&s.stage===314)add('talisha',255,263);
 };
 x.questItems=s=>[...items(s),...(s.iceMail?[['얼음 마을 특급 우편','마을 전체가 녹고 있다는 긴급 요청']]:[]),...(s.iceCrest?[['얼음 마을의 문장','험프리 백작 동상을 여는 눈꽃 문장']]:[]),...(s.coolstoneTainted?[['오염된 쿨스톤','가루다에게 가져가 정화 방법을 물어볼 돌']]:[]),...(s.libraryKey?[['고서 도서관 열쇠','멜리에게 빌린 오래된 열쇠']]:[]),...(s.ancientIceBook?[['고대 얼음 마법서','쿨스톤 정화 주문이 기록된 파란 책']]:[]),...(s.iceCake?[['얼음 케이크','이번에는 녹지 않은 아이작의 케이크']]:[])];
 // Original puzzle compares a staff ornament, shoulder and hand. The vector art is a reconstruction.
 function portraitPuzzle16(a,options={}){
  const s=a.state;const field=options.field||'portraitDifferences16';const found=s[field]||(s[field]=[]);
  const portrait=changed=>`<svg viewBox="0 0 200 250" role="img" aria-label="${changed?'오른쪽':'왼쪽'} 고대 마법사의 초상화" style="width:100%;display:block;background:#817869"><rect x="5" y="5" width="190" height="240" fill="#504d44" stroke="#b9a375" stroke-width="8"/><path d="M34 229L53 151 76 116 63 83Q67 36 96 45L128 78 120 128 159 159 174 229Z" fill="#aaa596" stroke="#302e2c" stroke-width="3"/><path d="M80 60Q59 82 78 116L105 114 115 83Z" fill="#3e3b37"/><path d="M84 77Q103 70 101 102L86 106Z" fill="#c3bb9e"/><path d="M77 116L104 114 143 210M76 133L53 170 85 183 131 176M55 188L88 207 126 190" fill="none" stroke="#706b5e" stroke-width="6"/><path d="M137 38V223" stroke="#d7cbaa" stroke-width="5"/>${changed?'<path d="M126 38Q123 22 137 27Q151 22 148 38"':'<path d="M124 34L137 17 151 34 137 46Z"'} fill="none" stroke="#d7cbaa" stroke-width="4"/><path d="M${changed?'125 135L151 153':'117 139L151 147'}" fill="none" stroke="#e2d6b6" stroke-width="6"/><path d="M112 179L${changed?'132 197':'140 187'} 140 175" fill="#c9bda0" stroke="#4b463d" stroke-width="3"/></svg>`;
  a.choicePuzzle(['두 초상화의 차이','오른쪽 그림에서 다른 부분 세 곳을 찾아보세요.',['문 열기'],0,'','고서 보관실'],()=>{if(options.complete){options.complete();return;}s.icePuzzleStep=0;a.advance(312,15);a.refresh();a.save();});
  const area=document.getElementById('puzzle-choices'),complete=area.querySelector('button'),feedback=document.getElementById('puzzle-feedback');complete.disabled=found.length<3;
  const pair=document.createElement('div');pair.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:12px;max-width:420px;margin:auto';
  pair.innerHTML='<div>'+portrait(false)+'</div><div style="position:relative">'+portrait(true)+'</div>';area.before(pair);
  const right=pair.lastElementChild;
  const spots=[['staff','지팡이 장식',67,13,true],['shoulder','어깨 장식',69,58,true],['hand','손의 모양',65,75,true],['face','얼굴',45,35,false],['cloak','망토 아래',36,88,false],['frame','액자',8,53,false]];
  const update=()=>{feedback.textContent=found.length+' / 3곳 발견';complete.disabled=found.length<3;};
  for(const[id,label,left,top,correct]of spots){const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',label+' 비교');b.dataset.difference=id;b.style.cssText=`position:absolute;left:${left-9}%;top:${top-7}%;width:18%;height:14%;padding:0;border:2px solid #e8dab680;border-radius:50%;background:transparent;color:#ffe173;font-size:24px;cursor:pointer`;b.textContent=found.includes(id)?'✓':'';b.onclick=()=>{if(!correct){feedback.textContent='이 부분은 두 그림이 같습니다. 다른 곳을 살펴보세요.';return;}if(!found.includes(id)){found.push(id);b.textContent='✓';a.save();}update();};right.appendChild(b);}
  update();
 }

 window.ARPIA_PORTRAIT_PUZZLE=portraitPuzzle16;
 x.interact=(e,a)=>{const s=a.state,i=s.stage-start,r=rows[i];if(!r||r[1]!==s.scene||r[2]!==e.id)return prior(e,a);
  if(s.stage===311){portraitPuzzle16(a);return true;}
  if(s.stage===307&&!s.iceGuardianWon16){a.talk([['you','동굴 길목에 유령강아지와 늑대가 있어. 돌을 꺼내려면 먼저 길을 확보해야겠어.']],()=>a.battle('iceGuardians16'));return true;}
  if(s.stage===312){a.talk(r[3],()=>a.choicePuzzle(['다섯 권의 고대 마법서','회색 책의 제목은 고대 바람 마법서였다. 얼음의 주문을 찾으려면 어떤 책을 살펴볼까?',['회색 책','주황색 책','붉은색 책','파란색 책','노란색 책'],3,'이 책은 얼음 마법서가 아니다. 파란 표지에 눈꽃 문양이 보인다.','고서 보관실'],()=>{s.ancientIceBook=true;a.advance(313,10);a.refresh();a.save();}));return true;}

  a.talk(r[3],()=>{const q=s.stage,flags={294:'iceMail',298:'iceVillageSurvey',305:'iceCrest',307:'coolstoneTainted',310:'libraryKey',312:'ancientIceBook',314:'coolstoneSpell',315:'coolstonePurified',317:'coolstoneReturned',319:'iceCake'};if(flags[q])s[flags[q]]=true;if(q===306)s.iceCrest=false;if(q===308)s.coolstoneTainted=false;if(q===313)s.libraryKey=false;if(q===314)s.ancientIceBook=false;
   if(q===295)s.iceMail=false;if(q===317)s.iceCake=true;if(q===319){s.iceCake=false;ARPIA_SYS.inv.add(s,'manastone_plus',1);}a.advance(q+1,q===319?50:10);a.refresh();if(q===316)a.travel('icevillage',[397,510]);a.save();if(q===319)a.finish('제16화 완료 · 사라진 쿨스톤','오염된 쿨스톤을 정화해 얼음 마을과 웨일라의 겨울을 되찾았습니다.');
  });return true;
 };
})();
