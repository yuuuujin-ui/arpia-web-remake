/* Chapter 15: 진짜 적은 누구 - 프리드의 거울. Plot order: https://wonavy.tistory.com/212 */
(()=>{
 const x=ARPIA_EXTRA,prior=x.interact,decorate=x.decorate,items=x.questItems;
 Object.assign(x.defaults,{lastSwordRecovered15:false,silenceLetters:false,teleportReplies:false,navinium:false,teleportReady:false,teleportCoords:false,swordIce:false,swordDeren:false,swordAsuria:false,swordCurious:false,silenceSwordsStored:false,hungerWeakened15:false,jackalFlask:false,lastSwordClue:false,hungerDefeated:false,mirrorSecret:false});
 Object.assign(x.npcs,{barbara:{name:'바바라',anim:'npc_038_도트_멜리',portraitPath:'assets/portraits/barbara.png'},navinium:{name:'네비니움 광석',artPath:'assets/navinium.png',height:60},teleportCompass:{name:'텔레포트 좌표기',artPath:'assets/teleport-compass.png'},eastGate:{name:'금단의 동문'},hunger15:{name:'형거',artPath:'assets/original/character/other/헝거.png',portraitPath:'assets/original/character/other/헝거.png',height:96}});
 x.scenes.barbarahouse=(s,n,p)=>({id:'barbarahouse',name:'바바라의 집 · 텔레포트 공방',bg:'assets/cardia-study.png',w:800,h:600,zoom:1.15,nodes:[[116,409],[230,416],[347,408],[467,362],[579,299],[636,325],[376,281],[288,224]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[2,6],[6,7]],entities:[p('back','학교 앞으로',116,409,'campus',[303,316]),n('barbara',579,299),{...n('teleportCompass',376,281),type:'fixture'}]});
 x.scenes.eastgate=(s,n,p)=>({id:'eastgate',name:'금단의 동문 · 헝거의 도전',bg:'assets/maps-hires/forest-battle.png',w:1000,h:658,zoom:1.1,tint:'#16102a55',nodes:[[160,530],[275,490],[390,450],[510,398],[630,350],[750,300],[835,245]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]],entities:[p('back','학교 앞으로',160,530,'campus',[925,315]),...(s.stage===291?[n('hunger15',750,300)]:[])]});
 x.map.push(['barbarahouse','바바라의 집',[116,409]],['eastgate','금단의 동문',[160,530]]);
 const rows=[
 [
  "빼앗긴 태양의 보석",
  "principal",
  "morris",
  [
   [
    "you",
    "교장 선생님, 스콜 선생님은 구했지만 태양의 보석을 빼앗겼어요. 십자수를 잃어버리지 않았다면…"
   ],
   [
    "morris",
    "네가 겪은 일을 차례로 말해 보렴. 스콜 뒤에 누가 있었는지 알아야 하니 말이다."
   ],
   [
    "you",
    "형거가 나타나 보석을 가지고 달아났어요. 제가 쫓아가서 되찾겠어요."
   ],
   [
    "morris",
    "서둘러 뛰어들 일은 아니다. 우선 료마에게 가거라. 침묵의 검을 모아야겠다."
   ]
  ]
 ],
 [
  "여섯 자루 침묵의 검",
  "classroom",
  "ryoma",
  [
   [
    "ryoma",
    "웨일라에 있는 침묵의 검은 모두 여섯 자루야. 왕족과 부유한 수집가들이 나누어 가지고 있지."
   ],
   [
    "you",
    "그 검으로 태양의 보석을 되찾을 수 있나요?"
   ],
   [
    "ryoma",
    "적에게 넘어가지 않도록 먼저 회수해야 해. 보관자들에게 편지를 보내자."
   ],
   [
    "narrator",
    "편지에는 웨일라의 평화를 위한 급한 일이니, 침묵의 검을 가지고 있다면 즉시 회신해 달라고 적혀 있었다."
   ]
  ]
 ],
 [
  "긴급 편지 발송",
  "shop",
  "conrad",
  [
   [
    "you",
    "이 편지들을 급히 보내 주세요. 답장도 바로 받아야 해요."
   ],
   [
    "conrad",
    "그렇다면 가장 빠른 비둘기를 보내야겠구나. 자, 하나부터 열까지 세어 보렴."
   ],
   [
    "you",
    "그렇게 빨라요? 하나, 둘… 정말 벌써 돌아오네요!"
   ]
  ]
 ],
 [
  "네 곳에서 온 답장",
  "shop",
  "conrad",
  [
   [
    "conrad",
    "여기 답장들이 왔구나. 한 통씩 확인해 보렴."
   ],
   [
    "you",
    "얼음 마을, 데런 왕국, 아수리아의 카디쟈, 큐리어스… 네 곳에서 검을 가지고 있다고 했어요."
   ],
   [
    "conrad",
    "전부 먼 곳이니 발품이 꽤 들겠는걸."
   ],
   [
    "you",
    "나머지 검도 찾아야 하지만 우선 위치가 확인된 것부터 회수해야겠어요."
   ]
  ]
 ],
 [
  "히나의 텔레포트",
  "campus",
  "hina",
  [
   [
    "hina",
    "바바라에게 가려던 참인데. 먼 곳을 돌아다닐 일이라면 텔레포트가 편하지."
   ],
   [
    "you",
    "검 네 자루를 회수해야 해. 왕국을 전부 걸어서 다녀오면 늦을지도 몰라."
   ],
   [
    "hina",
    "그럼 바바라에게 부탁해 봐. 준비할 것이 있는지는 직접 물어보고."
   ]
  ]
 ],
 [
  "바바라의 조건",
  "barbarahouse",
  "barbara",
  [
   [
    "barbara",
    "공간 이동을 하려면 네비니움이 필요해. 장치를 움직이는 데 쓰거든."
   ],
   [
    "you",
    "어디에서 구할 수 있나요?"
   ],
   [
    "barbara",
    "난쟁이 광산이야. 발디에게 말하면 위치를 알려 줄 거야."
   ]
  ]
 ],
 [
  "광산 안쪽의 푸른 광석",
  "mine",
  "baldi",
  [
   [
    "baldi",
    "네비니움은 값어치가 별로 없는 광석이지. 광산에서도 제련하고 남은 것을 다시 캐곤 해."
   ],
   [
    "you",
    "바바라는 공간 이동에 필요하다고 하셨어요."
   ],
   [
    "baldi",
    "그렇다면 안쪽 갱도를 찾아보게. 전에 금덩이를 찾았던 쪽을 기억하나? 그곳에 남아 있을 거야."
   ]
  ]
 ],
 [
  "네비니움 채굴",
  "minedepths",
  "navinium",
  [
   [
    "narrator",
    "어두운 갱도 바닥에 초록빛이 도는 광석이 박혀 있었다."
   ],
   [
    "you",
    "과연 이것이 네비니움인가 보다. 한 덩이만 가져오라고 했지."
   ],
   [
    "narrator",
    "광석을 떼어 주머니에 넣었다."
   ]
  ]
 ],
 [
  "좌표가 없는 텔레포트",
  "barbarahouse",
  "barbara",
  [
   [
    "barbara",
    "네비니움은 잘 가져왔네. 하지만 정확한 좌표가 있어야 공간 이동을 할 수 있지."
   ],
   [
    "you",
    "왕궁이나 마을 이름만으로는 안 되나요?"
   ],
   [
    "barbara",
    "대강 어림잡았다가는 엉뚱한 곳에 떨어져. 이슈비케에게 정확한 좌표를 받아 와."
   ]
  ]
 ],
 [
  "네 왕국의 좌표",
  "classroom",
  "ishubike",
  [
   [
    "ishubike",
    "바바라가 보냈구나. 좌표는 여기 있단다."
   ],
   [
    "you",
    "얼음 마을과 데런, 아수리아, 큐리어스 저택이에요."
   ],
   [
    "ishubike",
    "그 네 곳을 적어 두었다. 글자가 번지면 곤란하니 접어서 잘 챙기렴."
   ]
  ]
 ],
 [
  "료마가 보내는 신호",
  "classroom",
  "ryoma",
  [
   [
    "you",
    "출발하기 전에 여쭤보려고요. 마지막 남은 침묵의 검은 찾으셨어요?"
   ],
   [
    "ryoma",
    "아직이야. 답장이 온 곳부터 다녀와. 나는 남은 검의 행방을 더 알아볼게."
   ],
   [
    "you",
    "알겠어요. 빈손으로 돌아오지 않도록 서두를게요."
   ]
  ]
 ],
 [
  "텔레포트 기동",
  "barbarahouse",
  "teleportCompass",
  [
   [
    "barbara",
    "좌표를 맞췄어. 장치를 통해 검의 보관자들에게 갈 수 있어."
   ],
   [
    "you",
    "돌아올 때에도 이 좌표를 쓰면 되죠?"
   ],
   [
    "barbara",
    "그래. 좌표기를 잃어버리지 마. 우선 얼음 마을로 보내 줄게."
   ],
   [
    "narrator",
    "네비니움이 빛나자 눈앞의 공기가 둥글게 접혔다."
   ]
  ]
 ],
 [
  "얼음 마을의 침묵의 검",
  "icevillage",
  "humphrey",
  [
   [
    "you",
    "료마 선생님의 편지를 받고 왔어요. 침묵의 검을 맡겨 주세요."
   ],
   [
    "humphrey",
    "급히 회수해야 한다고 했지. 여기 준비해 두었네."
   ],
   [
    "you",
    "감사합니다. 다른 검들도 모아서 학교에 안전하게 보관할게요."
   ]
  ]
 ],
 [
  "데런 왕국의 침묵의 검",
  "kingdom",
  "caesar",
  [
   [
    "you",
    "학교에서 보낸 편지는 받으셨나요?"
   ],
   [
    "caesar",
    "받았네. 검을 내주겠으니 잃어버리지 않도록 주의하게."
   ],
   [
    "narrator",
    "왕국에서 보관하던 침묵의 검을 인계받았다."
   ],
   [
    "you",
    "여기에도 수상한 자가 오지 않았는지 살펴봐 주세요. 다른 보관자에게 바로 가 보겠습니다."
   ]
  ]
 ],
 [
  "아수리아의 침묵의 검",
  "cardiahome",
  "cardia",
  [
   [
    "you",
    "카디쟈, 답장을 보고 왔어요. 침묵의 검을 가지러 왔어요."
   ],
   [
    "cardia",
    "침묵의 검입니다."
   ],
   [
    "narrator",
    "카디쟈가 준비해 둔 검을 건넸다."
   ],
   [
    "you",
    "학교에 잘 전달할게요. 스콜 선생님 때문에 또 소란이 생기지 않았으면 좋겠네요."
   ]
  ]
 ],
 [
  "큐리어스의 침묵의 검",
  "curiousmansion",
  "curious",
  [
   [
    "curious",
    "아르피아 마법 학교의 료마 선생님으로부터 편지는 받았다. 자, 침묵의 검이야."
   ],
   [
    "you",
    "협조해 주셔서 감사합니다. 이제 네 곳의 검은 전부 모았어요."
   ],
   [
    "curious",
    "급한 일이라도 물건을 확인하는 버릇은 잊지 말게. 귀한 검들이니 말이야."
   ]
  ]
 ],
 [
  "시공간 미로를 벗어나",
  "barbarahouse",
  "barbara",
  [
   [
    "narrator",
    "돌아오는 길에 형거의 그림자가 나타났다. 검을 노리는 듯했지만, 텔레포트의 빛이 먼저 몸을 감쌌다."
   ],
   [
    "barbara",
    "왔구나. 검은 전부 챙겼어?"
   ],
   [
    "you",
    "네. 그런데 형거가 나타났어요. 검을 모으는 걸 알고 있는 것 같아요."
   ],
   [
    "barbara",
    "좌표기는 여기 두고, 학교로 가 봐. 혼자서 뒤쫓지는 말고."
   ]
  ]
 ],
 [
  "침묵의 검을 한자리에",
  "principal",
  "morris",
  [
   [
    "you",
    "답장이 온 네 곳의 검을 가져왔어요. 나머지는 어떻게 됐나요?"
   ],
   [
    "morris",
    "아직 마지막 검의 행방이 분명하지 않구나. 가져온 검은 내가 보관하마."
   ],
   [
    "you",
    "형거도 검을 찾는 것 같았어요. 태양의 보석까지 가져갔는데…"
   ],
   [
    "morris",
    "그 녀석이 또 나타날 테지. 그때를 대비해야겠다."
   ]
  ]
 ],
 [
  "쟈칼이 주는 대비책",
  "principal",
  "morris",
  [
   [
    "morris",
    "형거와 맞서기 전에 쟈칼에게 가 보거라. 그 녀석과 싸워 이긴 적이 있으니 도움이 될 게다."
   ],
   [
    "you",
    "쟈칼에게 수련을 받으면 저도 이길 수 있을까요?"
   ],
   [
    "morris",
    "상대가 누구인지 아는 것이 먼저란다. 네가 모르는 약점을 알고 있을지도 모르지."
   ]
  ]
 ],
 [
  "소피아와 함께",
  "dining",
  "sofia",
  [
   [
    "you",
    "형거와 싸울 방법을 여쭤보러 쟈칼에게 가려고 해요."
   ],
   [
    "sofia",
    "폭포에 계세요. 저도 그쪽으로 가던 참이니 같이 가요."
   ],
   [
    "you",
    "마지막 검도 아직 못 찾았어요. 더 늦기 전에 모두 찾아야 하는데."
   ],
   [
    "sofia",
    "쟈칼과 이야기하고 나면 남은 검에 대해서도 생각해 보죠."
   ]
  ]
 ],
 [
  "쟈칼의 호리병",
  "waterfall",
  "jackal",
  [
   [
    "jackal",
    "반갑기도 하고 귀찮기도 한 녀석이 또 왔구나. 또 나의 코털을 건드리러 왔느냐?"
   ],
   [
    "you",
    "이번에는 형거를 이기는 방법을 배우러 왔어요. 수련을 받으면 이길 수 있겠죠?"
   ],
   [
    "jackal",
    "난 중립이지 누구의 제자도 받지 않아. 대신 약점을 하나 알려 주마. 형거는 냄새에 민감하다."
   ],
   [
    "narrator",
    "쟈칼이 작은 호리병을 내밀었다. 안에 든 것은 쟈칼의 오줌이었다."
   ],
   [
    "you",
    "설마… 이게 다예요?"
   ],
   [
    "jackal",
    "시키는 대로 해라. 싸우기 전에 그 녀석의 코에 뿌리면 효과를 볼 거다."
   ]
  ]
 ],
 [
  "마지막 검의 행방",
  "waterfall",
  "sofia",
  [
   [
    "sofia",
    "참, 마지막 검은 압둘라에게 물어보세요. 아직 만나지 않았잖아요."
   ],
   [
    "you",
    "압둘라는 검이 없다고 답장한 줄 알았는데… 다시 확인해야겠어요."
   ],
   [
    "jackal",
    "호리병을 네 얼굴에 쏟지는 말고."
   ],
   [
    "you",
    "그건 걱정하지 마세요. 뚜껑도 단단히 닫았어요!"
   ]
  ]
 ],
 [
  "금단의 동문",
  "judah",
  "abdullah",
  [
   [
    "abdullah",
    "검은 내 아들이 가지고 갔소. 귀한 물건이니 나중에 비싸게 팔 수 있을 거라고 하더군."
   ],
   [
    "you",
    "아드님이요? 이름이 뭔데요?"
   ],
   [
    "abdullah",
    "형거."
   ],
   [
    "you",
    "형거라고요?! 어디로 갔어요?"
   ],
   [
    "abdullah",
    "침묵의 검을 가지고 금단의 문 앞에서 기다리겠다고 했소. 모렌스 신전에서 동쪽으로 가면 나오는 문이지."
   ],
   [
    "you",
    "이제 어디로 가야 하는지 알겠어요. 마지막 검을 가져올게요."
   ]
  ]
 ],
 [
  "헝거와 가짜 보석",
  "eastgate",
  "hunger15",
  [
   [
    "hunger15",
    "거대한 힘을 지배하는 순간이 왔구나."
   ],
   [
    "you",
    "침묵의 검을 넘겨. 네게 맡길 수는 없어!"
   ],
   [
    "hunger15",
    "하찮은 꼬마가 여기까지 쫓아오다니. 너를 그 검으로 없애 주마."
   ],
   [
    "narrator",
    "형거가 다가오는 순간 호리병의 뚜껑을 열어 코앞에 뿌렸다."
   ],
   [
    "hunger15",
    "으윽… 이 냄새는!"
   ],
   [
    "you",
    "쟈칼이 말한 대로야. 몸을 제대로 못 움직이고 있어. 지금이 기회야!"
   ]
  ]
 ],
 [
  "프리드의 거울의 비밀",
  "principal",
  "morris",
  [
   [
    "you",
    "형거와 싸워서 이겼어요. 다 쟈칼의 도움 덕분이에요. 그런데 태양의 보석은 어떻게 하죠?"
   ],
   [
    "morris",
    "너는 내 명령에 따라 진짜 태양의 보석을 프리드의 거울에 비췄지. 진짜는 이미 거울 속에 있단다."
   ],
   [
    "you",
    "그럼 형거가 가져간 것은 가짜였어요? 처음부터 알고 계셨군요!"
   ],
   [
    "morris",
    "프리드는 오래전 많은 보물을 수집하던 마법사였지. 도둑맞을까 걱정한 끝에 거울 속에 보물을 감추었단다."
   ],
   [
    "morris",
    "하지만 거울 속 미로는 나날이 복잡해져, 자신조차 어디에 무엇을 감췄는지 모르게 되었어. 들어간 사람은 길을 잃고 보물도 찾지 못했지."
   ],
   [
    "you",
    "그럼 보석을 훔치려던 사람도 쉽게 꺼내지 못하겠네요."
   ],
   [
    "morris",
    "그렇다고 안심할 수는 없다. 아주 교활하고 못된 자이지. 지금 이 순간에도 우릴 지켜보고 있을 걸세."
   ],
   [
    "you",
    "학교 안에 있는 누군가일까요? 스콜 선생님도, 다른 선생님들도… 아직은 아무것도 확신할 수 없겠어요."
   ]
  ]
 ]
];
 window.ARPIA_EPISODE15={rows};
 const start=268,end=start+rows.length;
 x.quests.splice(226,1,...rows.map(([title,scene,id])=>['제15화 · '+title,(x.npcs[id]?.name||title)+' 만나기',scene,id]),['제15화 완료 · 진짜 적은 누구','프리드의 거울이 만든 가짜 보석과 학교 내부의 적을 알게 되었습니다.','campus','none']);
 x.chapters.push([start,end,'제15화 진짜 적은 누구 · 프리드의 거울']);
 x.encounters.hunger15={name:'헝거 · 금단의 동문 결전',bg:'assets/maps-hires/forest-battle.png',intro:'쟈칼의 오줌을 코에 맞은 형거가 비틀거립니다. 약해진 틈을 노리세요.',next:292,setFlag:'hungerDefeated',xp:270,gold:180,sp:80,enemies:[{name:'침묵의 검을 든 헝거',element:0,hp:920,maxHp:920,atk:28,atb:18,sprite:'hunger'}]};
 x.encounters.hunger15.prepare=s=>({enemies:x.encounters.hunger15.enemies.map(e=>({...e,name:'침묵의 검을 든 형거',atk:s.hungerWeakened15?14:e.atk,atb:s.hungerWeakened15?9:e.atb}))});
 x.encounters.hunger15.onWin=s=>{s.lastSwordRecovered15=true;};
 x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);if(s.stage<start)return;const add=(id,xp,yp,fixture=false)=>{if(!sc.entities.some(e=>e.id===id))sc.entities.push({...n(id,xp,yp),...(fixture?{type:'fixture'}:{})});};
  if(sc.id==='classroom'&&[269,278].includes(s.stage))add('ryoma',646,198);if(sc.id==='classroom'&&s.stage===277)add('ishubike',530,185);
  if(sc.id==='campus'&&s.stage>=272)sc.entities.push(p('barbaraDoor','바바라의 집',303,316,'barbarahouse',[116,409]));if(sc.id==='campus'&&s.stage>=290)sc.entities.push(p('eastDoor','금단의 동문',925,315,'eastgate',[160,530]));
  if(sc.id==='minedepths'&&s.stage===275)add('navinium',445,255,true);if(sc.id==='icevillage'&&s.stage===280)add('humphrey',397,466);if(sc.id==='magecity'&&s.stage===277)add('ishubike',450,324);
  if(sc.id==='dining'&&s.stage===287)add('sofia',470,320);
  if(sc.id==='waterfall'&&s.stage===289)add('sofia',379,337);
 };
 x.questItems=s=>[...items(s),...(s.silenceLetters?[['료마의 긴급 편지','침묵의 검 보관자들에게 보낼 편지']]:[]),...(s.teleportReplies?[['네 곳의 답장','얼음·데런·아수리아·큐리어스에서 온 회신']]:[]),...(s.navinium?[['네비니움','텔레포트 좌표기에 사용할 별빛 광석']]:[]),...(s.teleportCoords?[['텔레포트 좌표','이슈비케가 적어 준 네 지역의 좌표']]:[]),...((s.swordIce||s.swordDeren||s.swordAsuria||s.swordCurious)?[['침묵의 검 묶음',[s.swordIce,s.swordDeren,s.swordAsuria,s.swordCurious].filter(Boolean).length+'/4 회수']]:[]),...(s.jackalFlask?[['쟈칼의 오줌','형거의 코에 뿌릴 호리병']]:[])];
 x.interact=(e,a)=>{const s=a.state;if(e.id==='teleportCompass'&&s.scene==='barbarahouse'&&s.stage>=280&&s.stage<=283){const dest=rows[s.stage-start][1];a.talk([['barbara','회신에 적힌 다음 목적지로 보내 줄게. 검을 잘 챙겨.']],()=>a.travel(dest));return true;}const i=s.stage-start,r=rows[i];if(!r||r[1]!==s.scene||r[2]!==e.id)return prior(e,a);
  if(s.stage===291){a.talk(r[3],()=>{if(!s.jackalFlask&&!s.hungerWeakened15){a.toast('쟈칼에게 받은 호리병이 필요합니다.');return;}s.jackalFlask=false;s.hungerWeakened15=true;a.save();a.battle('hunger15');});return true;}
  a.talk(r[3],()=>{const q=s.stage,flags={269:'silenceLetters',271:'teleportReplies',275:'navinium',277:'teleportCoords',278:'teleportReady',280:'swordIce',281:'swordDeren',282:'swordAsuria',283:'swordCurious',288:'jackalFlask',290:'lastSwordClue',292:'mirrorSecret'};if(flags[q])s[flags[q]]=true;if(q===270)s.silenceLetters=false;if(q===276)s.navinium=false;if(q===279)s.teleportReplies=false;if(q===284){s.teleportReady=false;s.teleportCoords=false;}if(q===285){s.silenceSwordsStored=true;s.swordIce=s.swordDeren=s.swordAsuria=s.swordCurious=false;}if(q===292)s.jackalFlask=false;
   a.advance(q+1,q===292?50:10);a.refresh();if(q===279)a.travel('icevillage',[397,510]);a.save();if(q===292)a.finish('제15화 완료 · 프리드의 거울','헝거를 물리치고 태양의 보석이 이미 거울 속 진짜와 바뀌었다는 사실을 알아냈습니다. 학교 안의 적을 찾을 차례입니다.');
  });return true;
 };
})();
