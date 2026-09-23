/* Original event order: https://wonavy.tistory.com/216.
   Dialogue and encounter balance are reconstructed from the surviving recap. */
(()=>{
 const x=ARPIA_EXTRA,m=ARPIA_MIDTERM,root='assets/chapter26/';
 const item=(id,name,desc,icon)=>ARPIA_DATA.ITEMS['mt_'+id]={name,desc,kind:'quest',price:0,sell:0,icon};
 item('wood26','불꽃 마을 장작','빌리의 첫 번째 부탁으로 주운 마른 장작','assets/items/firewood.png');
 item('ore26','코비의 철광석','빌리에게 전할 광산의 철광석','assets/items/golem_core.png');
 item('lala26','랄라 열매','마음을 닫은 황토 두더지가 좋아하는 달콤한 열매','assets/cursed-fruit.png');
 item('gold26','광산 미로의 금덩이','기욤에게 길을 물어보기 위해 모은 금덩이','assets/items/goldnugget.png');
 Object.assign(x.npcs,{
  wonseogi26:{name:'원서기'},maxple26:{name:'맥스플'},celestine26:{name:'셀레스틴'},
  billy26:{name:'빌리',artPath:root+'billy-idle.gif',height:58},
  ugauga26:{name:'우가우가',artPath:root+'ugauga-idle.gif',portraitPath:root+'mole-pet.png',height:56},
  bandmole26:{name:'밴드 두더지',artPath:root+'bandmole-idle.gif',portraitPath:root+'mole-pet.png',height:58},
  wood26a:{name:'첫 번째 장작',artPath:'assets/objects/gather-firewood.png',height:34},
  wood26b:{name:'두 번째 장작',artPath:'assets/objects/gather-firewood.png',height:34},
  iron26:{name:'코비의 철광석',artPath:'assets/items/golem_core.png',height:34},
  lalaBush26:{name:'랄라 열매 나무',artPath:'assets/cursed-fruit.png',height:42},
  gold26a:{name:'첫 번째 금덩이',artPath:'assets/objects/gather-goldnugget.png',height:34},
  gold26b:{name:'두 번째 금덩이',artPath:'assets/objects/gather-goldnugget.png',height:34},
  gold26c:{name:'세 번째 금덩이',artPath:'assets/objects/gather-goldnugget.png',height:34}
 });
 const rows=[
  {key:'absence',title:'수업에 나오지 않는 원서기',scene:'classroom',npc:'julia',pos:[530,185],lines:[['julia','펫 센터의 원서기가 며칠째 수업에 나오지 않고 있단다. 무슨 일인지 알아봐 주겠니?'],['you','원서기를 만나서 직접 물어볼게요.']]},
  {key:'gibberish',title:'알아들을 수 없는 말',scene:'petcenter',npc:'wonseogi26',pos:[640,350],fixture:true,lines:[['narrator','원서기는 다급하게 손짓했지만 처음 듣는 말만 반복했다.'],['you','무슨 말인지 하나도 모르겠어. 줄리아 선생님이라면 방법을 아실 거야.']]},
  {key:'spellLesson',title:'소통 마법을 배우다',scene:'classroom',npc:'julia',pos:[530,185],lines:[['julia','서로 말이 통하지 않을 때 쓰는 소통 마법이 있단다. 주문은 “로바똑 라해말, 얼씨구나”야.'],['you','로바똑 라해말, 얼씨구나. 정확히 기억할게요.']]},
  {key:'communication',title:'소통 마법 시전',scene:'petcenter',npc:'wonseogi26',pos:[640,350],fixture:true,lines:[['narrator','원서기의 말에 귀를 기울이며 줄리아에게 배운 주문을 떠올렸다.']],choose:['소통 마법','올바른 주문을 고르세요.',['로바똑 라해말, 얼씨구나','가몬망도','산티아고 콤스텔로지아'],0,'줄리아 선생님이 알려 준 주문을 그대로 외웁니다.'],effect:s=>s.moleCommunication26=true},
  {key:'understood',title:'우가우가가 먹지 않아요',scene:'petcenter',npc:'wonseogi26',pos:[640,350],fixture:true,lines:[['wonseogi26','이제 내 말이 들리는구나! 내 펫 우가우가가 병원에서 아무것도 먹지 않아 수업에 갈 수 없었어.'],['you','우선 휴버트 선생님께 상태를 물어볼게요.']]},
  {key:'hospital',title:'아프지 않은 환자',scene:'petcenter',npc:'hubert',pos:[480,430],lines:[['hubert','몸에는 특별한 이상이 없는데 먹이를 완전히 거부하고 있어. 마음의 문제인지도 모르겠구나.'],['you','원서기와 함께 방법을 찾아볼게요.']]},
  {key:'journey',title:'우가우가와 치유 여행',scene:'petcenter',npc:'wonseogi26',pos:[640,350],fixture:true,lines:[['wonseogi26','복면 괴인 사건 때문에 너도 지쳤을 텐데, 우가우가와 함께 바람을 쐬어 주지 않을래?'],['you','저도 잠깐 쉬어 갈 겸 함께 여행해 볼게요. 어디로 가야 할까요?'],['wonseogi26','휴버트는 맥스플이 잘 알 거라고 했어.']],effect:s=>s.ugaugaTravelling26=true},
  {key:'maxple',title:'마법사의 도시로',scene:'petcenter',npc:'maxple26',pos:[360,470],fixture:true,lines:[['narrator','맥스플은 황토 두더지에 관해서라면 마법사의 도시의 셀레스틴이 가장 잘 안다고 알려 주었다.'],['you','우가우가, 함께 마법사의 도시로 가 보자.']]},
  {key:'celestine',title:'황토 두더지의 외로움',scene:'magecity',npc:'celestine26',pos:[470,455],fixture:true,lines:[['narrator','셀레스틴은 황토 두더지는 던전 깊은 곳에서 살며 원래 이성과 꼭 붙어 지내는 습성이 있다고 설명했다.'],['you','우가우가가 외로워서 마음을 닫은 거군요.'],['narrator','셀레스틴은 우선 불꽃 마을의 빌리에게 랄라 열매를 구해 배를 채워 주라고 했다.']]},
  {key:'billy',title:'빌리의 세 가지 부탁',scene:'firevillage',npc:'billy26',pos:[397,466],lines:[['billy26','랄라 열매 위치를 그냥 알려줄 수는 없지. 장작을 줍고, 근처 몬스터를 쫓고, 코비에게 철광석을 받아 오너라.'],['you','세 가지를 모두 해내면 알려주시는 거죠?']]},
  {key:'wood1',title:'마을 근처 장작 하나',scene:'firevillage',npc:'wood26a',pos:[280,565],fixture:true,lines:[['narrator','불꽃 마을 길가에서 잘 마른 장작을 한 묶음 주웠다.']],effect:s=>m.give(s,'wood26')},
  {key:'wood2',title:'마을 근처 장작 둘',scene:'firevillage',npc:'wood26b',pos:[342,372],fixture:true,lines:[['narrator','바위 틈에서 두 번째 장작 묶음을 찾았다.'],['you','장작은 충분해. 이제 마을 근처 몬스터를 쫓자.']],effect:s=>m.give(s,'wood26')},
  {key:'monster',title:'불꽃 마을의 난폭한 몬스터',scene:'firevillage',npc:'flamePatrol',pos:[270,164],lines:[['you','길을 막고 있구나. 우가우가, 뒤에서 기다려!']],battle:'moleFire26'},
  {key:'kobi',title:'코비의 철광석',scene:'mine',npc:'kobi',pos:[520,307],lines:[['kobi','빌리의 심부름이로군. 제련하기 좋은 철광석을 골라 두었네.'],['you','고맙습니다. 이것까지 가져가면 세 가지 부탁이 끝나요.']],effect:s=>m.give(s,'ore26')},
  {key:'billyReturn',title:'랄라 열매가 있는 곳',scene:'firevillage',npc:'billy26',pos:[397,466],lines:[['billy26','장작도 넉넉하고 몬스터도 물러갔군. 철광석까지 틀림없어.'],['billy26','랄라 열매는 항구마을 쥬다 근처의 따뜻한 바닷바람이 드는 곳에서 자란다.']],effect:s=>{m.take(s,'wood26',2);m.take(s,'ore26');}},
  {key:'lala',title:'쥬다의 랄라 열매',scene:'judah',npc:'lalaBush26',pos:[140,220],fixture:true,lines:[['narrator','항구의 볕 좋은 언덕에서 붉게 익은 랄라 열매를 찾았다.']],effect:s=>m.give(s,'lala26',2)},
  {key:'refusal',title:'먹지 않는 우가우가',scene:'judah',npc:'ugauga26',pos:[205,208],lines:[['you','우가우가, 네가 좋아하는 랄라 열매야. 한입만 먹어 볼래?'],['narrator','우가우가는 열매의 냄새만 맡고 고개를 돌렸다.']]},
  {key:'closedHeart',title:'닫혀 버린 마음',scene:'magecity',npc:'celestine26',pos:[470,455],fixture:true,lines:[['narrator','셀레스틴은 이대로 먹지 않으면 우가우가가 정말 위험하다며, 서두르지 말고 곁에서 계속 말을 걸어 보라고 했다.'],['you','우가우가가 스스로 마음을 열 때까지 기다려 볼게요.']]},
  {key:'firstBite',title:'마침내 먹은 한입',scene:'magecity',npc:'ugauga26',pos:[520,480],lines:[['you','억지로 데려가려는 게 아니야. 네가 다시 힘을 냈으면 좋겠어. 딱 한입만 먹어 줘.'],['narrator','한참 망설이던 우가우가는 랄라 열매 하나를 집어 천천히 먹었다. 눈빛에 조금 생기가 돌아왔다.']],effect:s=>{m.take(s,'lala26');s.ugaugaAte26=true;}},
  {key:'mazeClue',title:'여자친구가 있는 미로',scene:'magecity',npc:'celestine26',pos:[470,455],fixture:true,lines:[['narrator','셀레스틴은 짝이 될 두더지가 난쟁이 광산 미로의 오른쪽 끝 방에 있을 가능성이 높다고 말했다.'],['narrator','험한 길에는 우가우가를 데려가지 말고, 금덩이 세 개를 좋아하는 기욤에게 위치를 물어보라고 덧붙였다.']],effect:s=>s.ugaugaWaiting26=true},
  {key:'guillaume',title:'기욤의 익숙한 거래',scene:'minedepths',npc:'guillaume',pos:[650,270],lines:[['guillaume','두더지들이 미로에 구멍을 잔뜩 파서 골치였지. 금덩이 세 개를 가져오면 자주 나타나는 방을 알려주겠네.'],['you','이번에도 금덩이 세 개군요. 미로를 살펴볼게요.']]},
  {key:'gold1',title:'미로의 첫 금덩이',scene:'molemaze26',npc:'gold26a',pos:[320,610],fixture:true,lines:[['narrator','갈림길 아래쪽에서 첫 번째 금덩이를 찾았다.']],effect:s=>m.give(s,'gold26')},
  {key:'gold2',title:'미로의 두 번째 금덩이',scene:'molemaze26',npc:'gold26b',pos:[640,290],fixture:true,lines:[['narrator','막다른 길의 벽 틈에서 두 번째 금덩이를 꺼냈다.']],effect:s=>m.give(s,'gold26')},
  {key:'gold3',title:'미로의 세 번째 금덩이',scene:'molemaze26',npc:'gold26c',pos:[970,575],fixture:true,lines:[['narrator','오른쪽으로 굽은 통로에서 마지막 금덩이를 발견했다.']],effect:s=>m.give(s,'gold26')},
  {key:'rightRoom',title:'오른쪽 끝 방',scene:'minedepths',npc:'guillaume',pos:[650,270],lines:[['guillaume','약속한 세 개가 맞군. 밴드를 두른 두더지는 미로 오른쪽 끝 방에서 자주 보였네.'],['you','우가우가가 기다리고 있어요. 바로 찾아볼게요.']],effect:s=>m.take(s,'gold26',3)},
  {key:'bandFight',title:'경계하는 밴드 두더지',scene:'molemaze26',npc:'bandmole26',pos:[1110,350],lines:[['narrator','오른쪽 끝 방에서 밴드 두더지가 모습을 드러냈다. 지친 듯 보였지만 낯선 사람을 보자 거세게 달려들었다.'],['you','다치게 하려는 게 아니야. 진정시켜서 우가우가에게 데려가야 해!']],battle:'bandMole26'},
  {key:'reunion',title:'마법사의 도시에서 재회',scene:'magecity',npc:'ugauga26',pos:[510,465],lines:[['narrator','셀레스틴이 돌보던 우가우가 앞에 밴드 두더지를 내려놓았다. 두 두더지는 조심스럽게 서로의 냄새를 맡았다.'],['you','둘 다 아직 기운이 없어 보여. 남은 랄라 열매를 먹여야겠어.']]},
  {key:'shareFruit',title:'나누어 먹는 랄라 열매',scene:'judah',npc:'bandmole26',pos:[205,208],lines:[['narrator','우가우가와 밴드 두더지는 남은 랄라 열매를 반씩 나누어 먹었다. 꼬리가 가볍게 흔들리고 두 얼굴에 생기가 돌아왔다.'],['you','이제 정말 괜찮아진 것 같아. 원서기에게 돌아가자.']],effect:s=>m.take(s,'lala26')},
  {key:'home',title:'우가우가의 여자친구',scene:'petcenter',npc:'wonseogi26',pos:[640,350],fixture:true,lines:[['wonseogi26','우가우가가 다시 먹기 시작했구나! 정말 고마워. 밴드 두더지는 네가 직접 길러 보는 게 어때?'],['you','둘이 떨어지면 다시 시름시름하지 않을까요?'],['wonseogi26','펫 센터에 자주 들러 만나게 해 주면 돼. 이 아이도 너를 믿는 눈치야.'],['narrator','밴드 두더지가 새 펫으로 가족이 되었다. 우가우가는 여자친구와 다시 만날 날을 기다리며 건강을 되찾았다.']],effect:s=>{s.ugaugaTravelling26=false;s.ugaugaWaiting26=false;s.moleStoryComplete26=true;const i=ARPIA_SYS.pets.addPet(s,'moll');if(s.pets[i])s.pets[i].name='밴드 두더지';},reward:120,ending:'우가우가에게 랄라 열매와 새 친구를 찾아 주었습니다. 밴드 두더지가 새로운 펫 가족이 되었습니다.'}
 ];
 const captured26={
 "hospital": [
  [
   "hubert",
   "그건 정확한 진단이라는 거야. 진찰해 보면 특별히 아픈 곳은 없는데, 통 먹이를 먹지 않는단다. 휴우."
  ],
  [
   "you",
   "몸이 아픈 게 아니라면 왜 먹지 않을까요?"
  ],
  [
   "hubert",
   "먹지 못하는 까닭을 함께 찾아봐야겠지. 우선 우가우가를 잘 살펴보렴."
  ],
  [
   "you",
   "우웃, 귀엽다. 이렇게 작은데 계속 굶으면 안 될 텐데."
  ]
 ],
 "journey": [
  [
   "wonseogi26",
   "우가우가를 도와줘. 제발. 우가우가랑 함께 치유 여행을 떠나 줘."
  ],
  [
   "you",
   "데리고 나가도 괜찮을까요?"
  ],
  [
   "hubert",
   "일단 우가우가를 받거라. 상태가 나빠지면 바로 돌아오고. 펫에 관해서는 맥스플에게도 물어보렴."
  ],
  [
   "you",
   "우가우가, 서두르지 않을게. 네가 다시 먹을 수 있는 방법을 같이 찾아보자."
  ]
 ],
 "maxple": [
  [
   "maxple26",
   "황토 두더지구나. 마법사의 도시 셀레스틴에게 물어보는 게 좋겠어."
  ],
  [
   "you",
   "병원에서는 몸에 이상이 없대요. 그런데 전혀 먹지를 않아요."
  ],
  [
   "maxple26",
   "몸만 보아서는 모르는 일이 있을 수 있지. 셀레스틴은 이 아이들의 습성도 잘 알고 있어."
  ],
  [
   "you",
   "고맙습니다. 우가우가, 함께 가 보자."
  ]
 ],
 "celestine": [
  [
   "celestine26",
   "황토 두더지 펫은 던전 깊은 곳에서만 사는데, 원래 이성 친구랑 꼭 붙어 있거든."
  ],
  [
   "you",
   "혼자라서 외로워하는 걸까요?"
  ],
  [
   "celestine26",
   "그럴 수도 있겠지. 하지만 친구를 찾으러 가기 전에 기운부터 차려야 해."
  ],
  [
   "you",
   "좋아하는 먹이가 있나요?"
  ],
  [
   "celestine26",
   "랄라 열매를 구해 보렴. 불꽃 마을의 빌리라면 어디서 나는지 알 거야."
  ]
 ],
 "kobi": [
  [
   "kobi",
   "빌리가 철광석을 가져오라고 했다고? 대강 준비해 뒀다. 자, 가져가거라."
  ],
  [
   "you",
   "잘 전해 드릴게요. 장작과 몬스터 일도 끝냈으니, 이제 열매가 있는 곳을 알 수 있겠어요."
  ]
 ],
 "billyReturn": [
  [
   "billy26",
   "완벽히 다 했으니 약속대로 알려주마. 랄라 열매는 항구마을 쥬다의 입구에 있단다."
  ],
  [
   "you",
   "장작과 철광석은 여기 있어요. 정말 고맙습니다."
  ],
  [
   "billy26",
   "이번에는 그 작은 녀석도 맛있게 먹어야 할 텐데."
  ]
 ],
 "lala": [
  [
   "narrator",
   "쥬다 입구의 이동 마법진 부근에서 랄라 열매를 찾았다."
  ],
  [
   "you",
   "빌리가 알려 준 곳이 맞아. 우가우가에게 가져가자."
  ]
 ],
 "closedHeart": [
  [
   "celestine26",
   "열매를 가져왔는데도 먹지 않는다고? 마음을 단단히 닫아 버렸구나."
  ],
  [
   "you",
   "냄새는 맡았는데 고개를 돌렸어요."
  ],
  [
   "celestine26",
   "억지로 먹이려 하지 말고 곁에 있어 주렴. 아직 네가 낯설지도 몰라."
  ],
  [
   "you",
   "알겠어요. 우가우가가 먼저 다가올 때까지 기다릴게요."
  ]
 ],
 "firstBite": [
  [
   "you",
   "네가 좋아하는 거라며. 나 때문에 급하게 먹을 필요는 없어. 여기 두고 기다릴게."
  ],
  [
   "narrator",
   "우가우가는 한동안 열매와 주인공을 번갈아 바라보았다."
  ],
  [
   "celestine26",
   "앗, 우가우가가 랄라 열매를 집어 물었어!"
  ],
  [
   "you",
   "먹었다! 우가우가, 잘했어. 조금만 더 힘을 내자."
  ]
 ],
 "reunion": [
  [
   "bandmole26",
   "두더땅. 두더쿵."
  ],
  [
   "you",
   "너도 혼자 있으니 외롭잖아. 같이 간다는 뜻이지?"
  ],
  [
   "narrator",
   "밴드 두더지는 더 이상 달아나지 않고 주인공을 따라왔다. 기다리던 우가우가가 고개를 들었다."
  ],
  [
   "celestine26",
   "우가우가도 데리고 가. 같이 먹이를 나눠 먹으면 사이가 좋아질 거야."
  ],
  [
   "you",
   "남은 랄라 열매가 있어요. 둘이 나누어 먹게 할게요."
  ]
 ]
};
 for(const row of rows)if(captured26[row.key])row.lines=captured26[row.key];
 const c=m.register(26,'황토 두더지 우가우가 · 여자친구를 찾아라',rows,{moleCommunication26:false,ugaugaTravelling26:false,ugaugaAte26:false,ugaugaWaiting26:false,moleStoryComplete26:false});
 x.map.push(['molemaze26','난쟁이 광산 미로',[150,700]]);
 x.scenes.molemaze26=(s,n,p)=>({id:'molemaze26',name:'난쟁이 광산 · 두더지 미로',bg:'assets/dwarf-mine-depths.png',w:1200,h:760,zoom:1.12,tint:'#29180f35',navRadius:34,
  nodes:[[150,700],[245,650],[320,610],[405,560],[485,500],[560,430],[640,360],[640,290],[730,430],[820,490],[900,535],[970,575],[1040,500],[1110,420],[1110,350],[880,350],[805,300],[900,250],[475,630],[555,665]],
  edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[6,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[9,15],[15,16],[16,17],[3,18],[18,19]],
  entities:[p('back','광산 깊은 갱도',150,700,'minedepths',[700,340])]
 });
 const decorate=x.decorate;
 x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);
  const add=(e)=>{if(!sc.entities.some(v=>v.id===e.id))sc.entities.push(e);};
  if(sc.id==='minedepths'&&s.stage>=c.keys.guillaume)add({...p('molemaze26','두더지 미로',700,340,'molemaze26',[150,700]),minStage:c.keys.guillaume});
  if(s.ugaugaTravelling26&&!s.ugaugaWaiting26&&['firevillage','mine','judah','magecity'].includes(sc.id)&&!sc.entities.some(e=>e.id==='ugauga26')){
   const q=sc.nodes[Math.min(1,sc.nodes.length-1)];add(n('ugauga26',q[0]+26,q[1]+8));
  }
 };
 const items=x.questItems;
 x.questItems=s=>[...items(s),...(s.moleCommunication26?[['소통 마법','로바똑 라해말, 얼씨구나']]:[]),...(s.ugaugaTravelling26?[['치유 여행','우가우가가 마음을 열 수 있도록 함께 여행 중']]:[]),...(s.inv.mt_wood26?[['불꽃 마을 장작',`${s.inv.mt_wood26}/2 묶음`]]:[]),...(s.inv.mt_ore26?[['코비의 철광석','빌리에게 전할 광석']]:[]),...(s.inv.mt_lala26?[['랄라 열매',`${s.inv.mt_lala26}개`]]:[]),...(s.inv.mt_gold26?[['광산 미로 금덩이',`${s.inv.mt_gold26}/3개`]]:[]),...(s.moleStoryComplete26?[['우가우가의 치유 여행','밴드 두더지와 재회 · 임무 완료']]:[])];
 x.encounters.moleFire26={name:'불꽃 마을 길목 · 난폭한 불꽃병사',bg:'assets/maps-hires/fire-village.png',intro:'빌리의 두 번째 부탁입니다. 우가우가를 보호하며 길목의 몬스터를 물리치세요.',next:c.keys.kobi,xp:250,gold:95,sp:38,enemies:[{name:'불꽃병사',element:0,hp:540,maxHp:540,atk:22,atb:5,sprite:'flameSoldier'},{name:'불꽃병사',element:0,hp:500,maxHp:500,atk:21,atb:18,sprite:'flameSoldier'}]};
 x.encounters.bandMole26={name:'난쟁이 미로 · 밴드 두더지',bg:'assets/dwarf-mine-depths.png',intro:'겁에 질린 밴드 두더지를 다치지 않게 진정시키세요.',next:c.keys.reunion,xp:360,gold:110,sp:55,enemies:[{name:'밴드 두더지',element:2,hp:1080,maxHp:1080,atk:27,atb:12,artPath:root+'bandmole-attack.gif',height:150}]};
 for(const [mood,lines]of Object.entries({surprised:['무슨 말인지 하나도 모르겠어. 줄리아 선생님이라면 방법을 아실 거야.','우가우가가 외로워서 마음을 닫은 거군요.'],sad:['우가우가, 네가 좋아하는 랄라 열매야. 한입만 먹어 볼래?'],determined:['저도 잠깐 쉬어 갈 겸 함께 여행해 볼게요. 어디로 가야 할까요?','다치게 하려는 게 아니야. 진정시켜서 우가우가에게 데려가야 해!'],happy:['이제 정말 괜찮아진 것 같아. 원서기에게 돌아가자.']}))for(const text of lines)ARPIA_HERO_ART.annotations.set(text,mood);
})();
