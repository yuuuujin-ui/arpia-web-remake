/* Original event order: https://wonavy.tistory.com/227 (episode 32).
   Dialogue, telescope puzzle and battles are reconstructed. */
(()=>{
 const x=ARPIA_EXTRA,m=ARPIA_MIDTERM,icon='assets/items/';
 const item=(id,name,desc,path)=>ARPIA_DATA.ITEMS['mt_'+id]={name,desc,kind:'quest',price:0,sell:0,icon:path};
 item('akaniaFlower32','아카니아 꽃','친구들이 할아버지께 드리려고 준비한 꽃',icon+'herb.png');
 item('starDust32','별가루','이시네스 여신상 앞에서 받은 케이크 재료',icon+'ghost_dust.png');
 item('cake32','오당카의 별가루 케이크','할아버지께 드릴 친구들의 정성이 담긴 케이크',icon+'soycrab.png');
 Object.assign(x.npcs,{
  observatory32:{name:'학교 전망대 망원경'},manure32:{name:'루돌프 우리 청소'},goddess32:{name:'이시네스 여신상',artPath:'assets/chapter31/isines-statue.png',height:118},
  starDust32:{name:'내려앉은 별가루',artPath:icon+'ghost_dust.png',height:36},brokenCake32:{name:'망가진 별가루 케이크',artPath:icon+'soycrab.png',height:36}
 });
 const rows=[
  {key:'mina',title:'전망대 앞에서 기다리는 케스노',scene:'campus',npc:'mina',pos:[610,316],lines:[['mina','케스노가 학교 전망대 앞에서 널 기다리고 있어. 줄리아 선생님이 찾으신다는 말도 전해 달래.'],['you','전망대에 먼저 다녀올게.']]},
  {key:'kesno',title:'친구들이 준비한 계획',scene:'observatory32',npc:'kesno',pos:[420,310],lines:[['kesno','줄리아 선생님이 교실에서 기다리셔. 우리도 네 할아버지께 드릴 파파데이 선물을 같이 준비할 거야.'],['you','다들 나 때문에 이러는 거야?']]},
  {key:'julia',title:'할아버지도 아버지 같은 분',scene:'classroom',npc:'julia',pos:[530,185],lines:[['julia','널 길러 주신 할아버지께 선물을 드리면 기뻐하지 않으실까? 친구들이 모두 돕겠다고 했단다.'],['you','할아버지가 좋아하실 만한 걸 함께 생각해 볼게요.']]},
  {key:'plan',title:'아카니아 꽃과 케이크',scene:'lobby',npc:'hina',pos:[530,335],lines:[['hina','꽃은 아카니아 꽃으로 정했어. 음식은 할아버지가 좋아하는 케이크!'],['matilda','왕실 요리사에게 맡기면 완벽할 텐데.'],['hina','정성이 더 중요해. 오당카님께 직접 부탁해 보자.']],effect:s=>m.give(s,'akaniaFlower32')},
  {key:'odangka',title:'마틸다의 권위도 통하지 않다',scene:'hut',npc:'odangka',pos:[420,315],lines:[['odangka','귀찮다. 왕실 공주의 명령이어도 케이크는 만들지 않겠다.'],['matilda','데런 왕실 공주의 부탁을 거절하는 거야?'],['hina','{name}을 길러 주신 할아버지께 드릴 파파데이 선물이에요.'],['odangka','그렇다면 뜻이 다르지. 대신 마틸다는 루돌프 우리부터 치워라.']]},
  {key:'cleanup',title:'공주님의 루돌프 우리 청소',scene:'hut',npc:'manure32',pos:[520,390],fixture:true,lines:[['matilda','나도 친구를 위해 이 정도 굴욕은 참을 수 있어. 빨리 끝내자!'],['narrator','마틸다는 코를 막고 우리 바닥을 깨끗하게 치웠다.']],choose:['루돌프 우리 청소','마지막으로 무엇을 해야 할까요?',['더 어지럽힌다','깨끗한 짚을 깔아 준다','그대로 도망친다'],1,'더러운 짚을 걷고 깨끗한 짚을 깔아야 합니다.']},
  {key:'secret',title:'특제 케이크의 비밀 재료',scene:'hut',npc:'odangka',pos:[420,315],lines:[['odangka','내 특제 케이크의 비밀은 별가루다. 요정의 성 님펜에 있는 레오나가 알 것이다.'],['you','별가루까지 꼭 구해 올게요.']]},
  {key:'leona',title:'아직 내려오지 않은 별가루',scene:'nymphen',npc:'leona',pos:[596,206],lines:[['leona','별이 가까워지는 시점이 아니라 아직 채취하지 못했어요. 아수리아 왕국의 써니라면 별의 위치를 알 거예요.']]},
  {key:'sunny',title:'오늘 가까워지는 별',scene:'asuria',npc:'sunny',pos:[445,345],lines:[['sunny','마침 오늘 별이 가까워집니다. 동경 27도, 위도 58도에 망원경을 맞추세요.'],['sunny','그 망원경은 아르피아 학교 전망대에 있습니다.']]},
  {key:'telescope',title:'동경 27도 위도 58도',scene:'observatory32',npc:'observatory32',pos:[560,210],fixture:true,lines:[['odangka','숫자를 틀리면 엉뚱한 곳만 보게 된다. 정확히 맞춰라.'],['you','써니가 알려 준 좌표를 기억하고 있어.']],choose:['학교 전망대 망원경','별이 가장 가까워지는 좌표는?',['동경 72도 · 위도 85도','동경 27도 · 위도 58도','동경 25도 · 위도 78도'],1,'써니가 알려 준 좌표는 동경 27도, 위도 58도입니다.']},
  {key:'naomi',title:'망원경에 비친 낯익은 동상',scene:'classroom',npc:'naomi',pos:[420,290],lines:[['you','망원경에서 본 동상이 어디 있는지 아세요?'],['naomi','처음 보는 형상이구나. 오래된 장소라면 바바라 할머니께 물어보는 게 좋겠어.'],['odangka','나오미 선생도 모르는 게 있군.'],['naomi','먼저 속을 긁는 건 늘 당신이잖아요!']]},
  {key:'barbara',title:'바바라도 모르는 동상',scene:'barbarahouse',npc:'barbara',pos:[579,299],lines:[['barbara','수백 년을 살았지만 그 동상 위치는 나도 모르겠구나. 요정의 별가루라면 레오나에게 다시 물어보렴.']]},
  {key:'leonaBack',title:'이시네스 여신의 성지',scene:'nymphen',npc:'leona',pos:[596,206],lines:[['leona','요정의 선조 이시네스 여신을 기념한 성지예요. 불꽃 마을 위쪽에 있습니다.'],['leona','동상 앞에서 “로으앞 다니습겠하 도효”라고 외우세요.']]},
  {key:'statue',title:'여신상 앞의 거꾸로 주문',scene:'goddess32',npc:'goddess32',pos:[840,260],fixture:true,lines:[['you','로으앞 다니습겠하 도효!'],['narrator','거꾸로 된 주문이 끝나자 밤하늘에서 은빛 별가루가 천천히 내려앉았다.']]},
  {key:'dust',title:'별가루를 노리는 용병단',scene:'goddess32',npc:'starDust32',pos:[840,340],fixture:true,lines:[['mercenary21','그 귀한 별가루를 내놓아라. 우리 단장이 큰돈을 줄 거다!'],['you','할아버지께 드릴 선물을 망치게 둘 수 없어!']],battle:'starMercenary32'},
  {key:'cake',title:'오당카의 별가루 케이크',scene:'hut',npc:'odangka',pos:[420,315],lines:[['odangka','케이크는 이미 구워 두었다. 마지막으로 별가루를 고르게 뿌려라.'],['narrator','은빛 가루가 크림 위에서 별자리처럼 반짝이며 특제 케이크가 완성되었다.']],effect:s=>{m.take(s,'starDust32');m.give(s,'cake32');}},
  {key:'ambush',title:'다시 나타난 떠돌이 용병단',scene:'oak',npc:'mercenary21',pos:[515,455],lines:[['mercenary21','별가루가 없다면 완성된 케이크를 가져가겠다!'],['hina','케이크에서 멀리 떨어져!'],['you','이번에는 절대 못 가져가!']],battle:'cakeMercenary32'},
  {key:'broken',title:'망가진 케이크',scene:'oak',npc:'brokenCake32',pos:[515,455],fixture:true,lines:[['narrator','용병단은 물러났지만 격한 싸움 사이에 케이크 상자가 떨어져 모양이 망가져 버렸다.'],['you','이렇게 열심히 준비했는데… 할아버지께 드릴 수 없겠어.']],effect:s=>m.take(s,'cake32')},
  {key:'grandpa',title:'이미 받은 가장 큰 선물',scene:'village',npc:'family',pos:[480,250],lines:[['you','할아버지, 파파데이 선물이에요. 케이크는 용병단 때문에 망가져서 꽃만 가져왔어요.'],['family','너와 친구들이 여기까지 와 준 것이 이미 가장 큰 선물이란다.'],['family','네가 최고의 마법사가 되었을 때 아버지도 자연스럽게 만나게 될 게다.'],['you','그날까지 더 열심히 배우고 모두를 지킬게요.']],effect:s=>{m.take(s,'akaniaFlower32');s.papaDayComplete32=true;},reward:140,ending:'친구들과 준비한 아카니아 꽃을 할아버지께 드렸습니다. 정성을 다한 마음이 파파데이의 가장 큰 선물이 되었습니다.'}
 ];
 const captured32={
 "julia": [
  [
   "julia",
   "널 길러 주신 할아버지께 선물을 드리면 기뻐하지 않으실까? 친구들이 모두 돕겠다고 했단다."
  ],
  [
   "you",
   "아버지를 찾겠다는 생각만 하느라 할아버지를 잊고 있었어요."
  ],
  [
   "julia",
   "마음을 전할 수 있는 분이 지금 곁에 계시잖니. 친구들과 천천히 준비해 보렴."
  ]
 ],
 "plan": [
  [
   "show",
   "나랑 소피아, 아이작, 케스노는 아카니아 꽃을 구하기로 하고, 너와 히나는 케이크를 구하기로 하자."
  ],
  [
   "you",
   "다들 도와주는 거야? 정말 고마워."
  ],
  [
   "hina",
   "할아버지가 좋아하실 케이크로 준비하자. 오당카님께 부탁해 보면 어때?"
  ],
  [
   "matilda",
   "나도 같이 갈래. 공주가 부탁하면 금방 해 줄 거야."
  ]
 ],
 "cleanup": [
  [
   "matilda",
   "악, 벌써 저쪽에서 루돌프가 실수를 날리고 있어!"
  ],
  [
   "you",
   "왕실에서는 이런 일을 해 본 적 없죠?"
  ],
  [
   "matilda",
   "없지! 그래도… 네가 좋아할 테니까 참는 거야. 얼른 재료나 구해 와!"
  ],
  [
   "narrator",
   "마틸다는 코를 막고 더러운 짚을 걷어 냈다. 친구를 위해서라며 다시 빗자루를 들었다."
  ]
 ],
 "sunny": [
  [
   "sunny",
   "아주 운이 좋으시네요. 바로 오늘이 웨일라에 가장 가까워지는 날이랍니다."
  ],
  [
   "you",
   "그럼 오늘 별가루를 구할 수 있겠네요! 어디를 봐야 하죠?"
  ],
  [
   "sunny",
   "위치는 잠시 계산을… 쓱싹쓱싹… 웨일라 대륙 동경 27도, 위도 58도에 가까워지겠군요."
  ],
  [
   "sunny",
   "망원경에 있는 눈금을 맞추면 되는 거예요. 잘 기억해 둬요. 동경 27도, 위도 58도. 순발력이 필요할 거예요."
  ]
 ],
 "telescope": [
  [
   "kesno",
   "써니가 알려 준 좌표로 눈금을 맞춰 봐. 별이 가까이 있는 동안 봐야 하잖아."
  ],
  [
   "you",
   "동경 27도, 위도 58도였지."
  ],
  [
   "narrator",
   "렌즈 너머로 별빛을 받은 석상의 윤곽이 보이기 시작했다."
  ],
  [
   "you",
   "어떤 형체가 보인다. 어떤 동상인데?"
  ]
 ],
 "leonaBack": [
  [
   "leona",
   "그곳은 우리 요정들에게 성지입니다. 그 조상은 바로 우리 요정들의 선조인 이시네스 여신을 기념한 거예요."
  ],
  [
   "you",
   "별가루가 그곳으로 내려오는 거군요."
  ],
  [
   "leona",
   "불꽃 마을 위쪽에서 찾을 수 있어요. 경건한 마음으로 두 손을 모으고 이렇게 말하세요. 로으앞 다니습겠하 도효!"
  ],
  [
   "you",
   "거꾸로 하면… 앞으로 효도하겠습니다? 할아버지께 드릴 선물에 딱 맞는 주문이네요."
  ]
 ],
 "statue": [
  [
   "you",
   "경건한 마음으로 두 손을 가슴에 모으고… 로으앞 다니습겠하 도효!"
  ],
  [
   "narrator",
   "손끝과 가슴 가까이에 작은 빛이 모였다. 은빛 가루가 천천히 내려앉았다."
  ],
  [
   "you",
   "파파성의 별가루다. 오당카님께 가져가면 돼!"
  ]
 ],
 "dust": [
  [
   "mercenary21",
   "파파성의 별가루. 그것은 금 이상으로 비싸게 거래되는 물건이야."
  ],
  [
   "you",
   "돈을 벌려고 구한 게 아니야. 할아버지께 드릴 선물에 쓸 거야."
  ],
  [
   "mercenary21",
   "그런 사정은 관심 없다. 이리 내놓아라!"
  ],
  [
   "you",
   "친구들이 함께 준비한 선물을 빼앗기지는 않을 거야."
  ]
 ],
 "cake": [
  [
   "matilda",
   "온… 이제야 돌아오는 거야? 네가 좋아할 테니까 루돌프의 실수도 참았다고!"
  ],
  [
   "you",
   "정말 고마워. 별가루도 무사히 구했어."
  ],
  [
   "odangka",
   "그럼 가져온 것을 이쪽으로 내라. 반죽은 준비해 뒀다."
  ],
  [
   "you",
   "그럼요. 여기에 있어요."
  ],
  [
   "narrator",
   "별가루를 뿌린 케이크 위에 작은 촛불이 켜졌다. 반짝이는 크림과 장식을 보며 친구들이 웃었다."
  ]
 ],
 "ambush": [
  [
   "mercenary21",
   "별가루는 어디 있지? 이미 케이크에 썼다고? 그렇다면 케이크라도 내놔!"
  ],
  [
   "hina",
   "오당카님 댁 앞까지 쫓아오다니!"
  ],
  [
   "you",
   "상자를 뒤로 옮겨. 이번에도 빼앗길 수 없어!"
  ]
 ]
};
 for(const row of rows)if(captured32[row.key])row.lines=captured32[row.key];
 Object.assign(rows.find(r=>r.key==="plan"),{scene:"classroom",npc:"show",pos:[690,370]});
 for(const key of ["ambush","broken"])Object.assign(rows.find(r=>r.key===key),{scene:"hut",pos:[520,390]});
 const c=m.register(32,'파파데이 2부 · 별가루 케이크',rows,{papaDayComplete32:false});
 x.map.push(['observatory32','학교 전망대',[250,520]],['goddess32','이시네스 여신상',[160,700]]);
 x.scenes.observatory32=(s,n,p)=>({id:'observatory32',name:'마법학교 · 별빛 전망대',bg:'assets/maps-hires/school-campus.png',w:900,h:600,zoom:1.04,tint:'#16224a36',nodes:[[250,520],[330,455],[420,390],[500,320],[560,210],[660,270],[735,360]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[2,6]],entities:[p('back','학교 앞',250,520,'campus',[515,450]),{...n('observatory32',560,210),type:'fixture'}]});
 x.scenes.goddess32=(s,n,p)=>({id:'goddess32',name:'불꽃 마을 북쪽 · 이시네스 여신상',bg:'assets/maps-hires/fire-village.png',w:1000,h:760,zoom:.95,tint:'#311c5b28',nodes:[[160,700],[265,620],[380,530],[505,445],[640,370],[760,320],[840,260],[840,340],[700,470],[550,570],[390,650]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,0],[4,8]],entities:[p('back','불꽃 마을',160,700,'firevillage',[300,744]) ]});
 const items=x.questItems;x.questItems=s=>[...items(s),...(s.inv.mt_akaniaFlower32?[['아카니아 꽃','할아버지께 드릴 파파데이 선물']]:[]),...(s.inv.mt_starDust32?[['별가루','오당카의 특제 케이크 재료']]:[]),...(s.inv.mt_cake32?[['별가루 케이크','할아버지께 드릴 정성의 케이크']]:[])];
 x.encounters.starMercenary32={name:'이시네스 성지 · 별가루 쟁탈전',bg:'assets/maps-hires/fire-village.png',intro:'귀한 별가루를 노리는 떠돌이 용병들을 물리치세요.',next:c.keys.cake,xp:500,gold:180,sp:74,onWin:s=>m.give(s,'starDust32'),enemies:[{name:'떠돌이 용병 대장',element:0,hp:1100,maxHp:1100,atk:30,atb:8,artPath:'assets/midterm/mercenary21.png',height:165},{name:'떠돌이 용병',element:2,hp:760,maxHp:760,atk:26,atb:20,artPath:'assets/midterm/mercenary21.png',height:145}]};
 x.encounters.cakeMercenary32={name:'오당카의 오두막 앞 · 케이크 습격',bg:'assets/maps-hires/forest-battle.png',intro:'완성된 별가루 케이크를 지키며 용병단의 두 번째 습격을 막으세요.',next:c.keys.broken,xp:530,gold:195,sp:80,enemies:[{name:'집요한 용병 대장',element:0,hp:920,maxHp:920,atk:26,atb:12,artPath:'assets/midterm/mercenary21.png',height:170},{name:'용병단 마법사',element:1,hp:610,maxHp:610,atk:23,atb:3,artPath:'assets/midterm/mercenary21.png',height:150}]};
 for(const [mood,lines]of Object.entries({surprised:['다들 나 때문에 이러는 거야?'],happy:['할아버지가 좋아하실 만한 걸 함께 생각해 볼게요.','그날까지 더 열심히 배우고 모두를 지킬게요.'],determined:['별가루까지 꼭 구해 올게요.','할아버지께 드릴 선물을 망치게 둘 수 없어!','이번에는 절대 못 가져가!'],sad:['이렇게 열심히 준비했는데… 할아버지께 드릴 수 없겠어.']}))for(const text of lines)ARPIA_HERO_ART.annotations.set(text,mood);
})();
