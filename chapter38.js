/* User captures 38.png and 39.png; missing scene order cross-checked with wonavy.tistory.com/231.
   Dialogue bridges, maze rendering, encounter roster and balance are reconstructed. */
(()=>{
 const x=ARPIA_EXTRA,m=ARPIA_MIDTERM,I='assets/items/';
 const item=(id,name,icon)=>ARPIA_DATA.ITEMS['mt_'+id]={name,desc:name,kind:'quest',price:0,sell:0,icon:I+icon+'.png'};
 item('medicine38','칼라마의 마법 약','hipotion');ARPIA_DATA.ITEMS.mt_sword38={name:'미로에서 발견한 아수리아의 검',kind:'quest',price:0,sell:0,icon:'assets/silent-sword.png'};
 Object.assign(x.npcs,{bundle38:{name:'보따리 상인',artPath:'assets/midterm/certificate.png',height:38},mazeGuard38:{name:'미로의 몬스터',artPath:'assets/original/pet-images/examEarth/idle1.gif',height:65},sword38:{name:'수상한 아수리아의 검',artPath:'assets/silent-sword.png',height:35}});
 const r=(key,title,scene,npc,lines,extra={})=>({key,title,scene,npc,lines,...extra});
 const rows=[
 r('farewell','마틸다의 이상한 인사','campus','matilda',[['matilda','앞으로 친구들에게 마틸다 이름으로 불리지 못할 것 같아서… 날 영원히 기억해 줘.'],['you','갑자기 무슨 말이야? 어디 멀리 가는 거야?'],['matilda','지금은 길게 이야기할 수 없어. 나도 해야 할 일이 있으니까.'],['you','축제가 끝난 뒤부터 분위기가 달라졌어. 줄리아 선생님께 여쭤보자.']]),
 r('news','다가오는 두 왕국의 전쟁','classroom','julia',[['julia','마틸다 공주의 나라인 데런 왕국과 아수리아 왕국의 전쟁이 임박했다는 얘기가 돌고 있단다.'],['you','그래서 마지막 인사처럼 말한 거였군요. 왜 갑자기 싸우려는 거죠?'],['julia','우리도 이유를 알아보고 있어. 교장 선생님께 가 보렴.']]),
 r('mission','어느 편에도 서지 않는 학교','principal','morris',[['morris','우리는 두 왕국의 학생을 모두 가르치는 학교다. 어느 한쪽의 승리를 돕기 위해 마법을 써서는 안 된다.'],['you','전쟁이 일어나는 이유를 찾으면 막을 수 있을까요?'],['morris','쉽지는 않겠지만 시도해야 한다. 스콜과 나오미의 도움을 받거라.']]),
 r('teachers','스콜의 관심사','lobby','scoll',[['scoll','너도 알다시피 카디쟈가 나를 얼마나 좋아하니. 난 아직도 카디쟈에게 편지를 보내고 있단다.'],['naomi','스콜, 지금은 전쟁 이야기를 하고 있잖아요.'],['you','우선 데런 왕국에 가서 마틸다를 만나 봐야겠어요.'],['naomi','함께 가자. 들은 소문과 실제 사정이 다를 수도 있으니까.']]),
 r('caesar','거절해야 하는 제안','kingdom','caesar',[['caesar','우리와 함께 싸워 준다면 큰 힘이 되겠구나.'],['you','교장 선생님은 어느 편에도 서지 말라고 하셨어요. 무슨 일이 있었는지 확인하러 왔습니다.'],['caesar','마틸다는 쟈칼의 폭포로 갔다. 그 아이에게 물어보게.']]),
 r('jackal','오랜 우정의 무게','waterfall','jackal',[['jackal','나 쟈칼은 오랜 우정의 이름으로 데런 왕국의 편에 서서 전쟁에 참전하겠다. 이것이 데런 왕국의 부탁에 대한 나의 대답이다.'],['you','현자님까지 싸움에 나서면 피해가 더 커질 거예요. 마틸다는 어디 있나요?'],['jackal','수중 던전에 있다. 네 말을 들을지는 그 아이에게 달렸겠지.']]),
 r('matildaFight','이야기하기 전에 결투','diveroom9','matilda',[['matilda','나를 말리러 온 거라면 돌아가. 우리 왕국의 일에 끼어들지 마.'],['you','무슨 일인지도 듣지 못했잖아. 먼저 이야기해 줘.'],['matilda','그렇게 알고 싶으면 나를 이겨 봐!']],{goal:'수중 던전 위에서 두 번째 줄, 왼쪽 네 번째 방의 마틸다 찾기',battle:'matilda38'}),
 r('seal','사라진 옥새','diveroom9','matilda',[['matilda','왕의 권력을 상징하고 나라의 일을 결정하는 데 쓰이는 중요한 도장이야. 그 옥새가 사라졌어.'],['you','그래서 아수리아가 가져갔다고 생각하는 거야?'],['matilda','그 나라의 첩자가 남긴 증거가 있어. 가만히 있을 수는 없지.'],['you','증거가 무엇인지까지 확인해야 해. 전쟁부터 시작하면 돌이킬 수 없어.']]),
 r('report','같은 이야기를 다르게 듣는 사람들','waterfall','naomi',[['you','옥새를 훔친 범인을 아수리아의 첩자라고 생각하고 있어요.'],['naomi','아수리아 쪽의 이야기도 들어 보자. 아직 직접 본 것이 없잖니.'],['scoll','카디쟈님께서 얼마나 억울하시겠니. 어서 가자.']]),
 r('cardia','아수리아의 분노','cardiahome','cardia',[['cardia','우리가 옥새를 훔쳤다고 단정하다니 불쾌한 일입니다. 무함마드 알리 4세께서도 몹시 노하셨지요.'],['you','양쪽의 오해를 풀 방법을 찾고 있어요. 조금만 기다려 주세요.'],['scoll','아수리아가 마틸다에게 일방적으로 당하는 것을 막기 위해… 그러니까 힘의 균형을 위해서 아수리아 편에 설 수밖에 없단 말이지.'],['naomi','사적인 마음을 그런 말로 포장하지 마세요.']]),
 r('scoll','스콜을 말리는 나오미','cardiahome','scoll',[['scoll','으… 카디쟈 앞에서 웬 망신.'],['naomi','스콜은 정신이 있는 건지 없는 건지 모르겠네.'],['you','선생님까지 한쪽 편을 들면 저희가 어떻게 전쟁을 막아요!']],{battle:'scoll38'}),
 r('neutral','네 마을의 중립','principal','morris',[['morris','네 지금부터 얼음 마을, 대지 마을, 불꽃 마을, 독수리 마을로 가서 데런, 아수리아 어느 쪽에도 참전하지 않을 것을 약속받거라.'],['you','두 왕국의 싸움이 다른 마을로 번지는 것부터 막아야겠군요.']]),
 r('ice','얼음 마을의 사정','icevillage','humphrey',[['humphrey','방금 전에 에드워드 경이 다녀갔단다. 데런 왕국에 세금을 내고 있는 만큼 마음대로 결정할 수는 없지.'],['you','참전하면 마을 사람들도 위험해져요. 다시 생각해 주세요.'],['humphrey','네 뜻은 알겠다만, 지금 중립을 약속하기는 어렵구나.']],{effect:s=>s.neutralIce38=false}),
 r('fire','아수리아 편에 선 불꽃 마을','firevillage','delphin',[['delphin','우리는 아수리아 왕국 편이다. 이미 결정을 내렸지.'],['you','옥새가 사라진 이유도 아직 조사 중이에요. 사실이 밝혀질 때까지만 기다려 주세요.'],['delphin','나라 사이의 약속을 쉽게 뒤집을 수는 없다.']],{effect:s=>s.neutralFire38=false}),
 r('eagle','독수리 마을의 약속','eaglevillage','garuda',[['garuda','우리 마을은 이번 싸움에 끼어들지 않겠다. 그 약속은 지키마.'],['you','감사합니다. 대지 마을에도 같은 부탁을 전해야겠어요.'],['shiva','대지 마을까지 가야 한다고? 내가 등에 태워 데려다주마.']],{effect:s=>s.neutralEagle38=true}),
 r('laura','대지 마을의 조건','earthvillage','laura',[['laura','중립을 원한다면 먼저 마을을 시끄럽게 하는 훌라 버섯을 잠재워 다오.'],['you','버섯을 물리치면 어느 쪽에도 군사를 보내지 않겠다고 약속해 주세요.'],['laura','좋다. 약속하마.']]),
 r('hula','시끄러운 훌라 버섯','earthdungeon','hula17',[['narrator','소란스러운 훌라 버섯들이 길목을 막고 있었다.'],['you','이제 좀 잠잠해져라!']],{battle:'hula38'}),
 r('pledge','대지 마을의 중립 선언','earthvillage','laura',[['laura','약속대로 우리 마을은 참전하지 않겠다.'],['you','다른 사절이 와도 그 약속을 지켜 주세요.'],['laura','촌장의 말을 믿거라.']],{effect:s=>s.neutralEarth38=true}),
 r('royal','마틸다와 에드워드의 방문','earthvillage','matilda',[['matilda','우리가 먼저 이야기했어야 했는데. 대지 마을도 데런을 도와야 해.'],['edward','공주님, 중립을 청한 사람이 바로 이 학생이군요.'],['you','전쟁이 더 커지는 걸 막으려는 거야. 마을을 끌어들이지 마.']],{battle:'royal38'}),
 r('reassure','한 번 더 받아낸 약속','earthvillage','laura',[['you','데런의 사절이 왔어도 중립 약속은 그대로인 거죠?'],['laura','그렇다. 네가 두 번이나 확인하니 더 잊을 수 없겠구나.']]),
 r('scollAgain','이번에는 아수리아의 사절','earthvillage','scoll',[['scoll','말하기는. 아수리아 왕국의 일을 방해하는 자는 나의 적이다. 덤벼라.'],['you','우리는 어느 쪽도 돕지 않으려고 왔다고요!'],['naomi','또 이러시는군요. 물러나지 않으면 제압할 수밖에 없어요.']],{battle:'scollAgain38'}),
 r('advance','이미 움직인 태양 기사단','principal','morris',[['morris','마틸다와 에드워드가 이끄는 태양 기사단이 아수리아 쪽으로 진격하고 있다. 시간이 없구나.'],['you','중립 약속만으로는 멈추지 못했어요. 옥새 사건의 증거를 찾아볼게요.'],['aaron29','이번에는 내가 함께 가마. 데런의 보따리 상인이 무언가 알고 있을 게다.']],{effect:s=>s.aaronEscort38=true}),
 r('merchant','상인의 거래','kingdom','bundle38',[['bundle38','그럼 오아시스 칼라마 안에 있는 마법 약을 갖다 주십시오.'],['you','전쟁이 벌어질지도 모르는데 먼저 물건을 구해 달라니요?'],['aaron29','다툴 시간이 없구나. 약을 구해 오는 동안 상인도 기억을 정리해 두게.']]),
 r('medicine','오아시스의 마법 약','kalama31','halahala31',[['halahala31','먼 나라에서도 전쟁 이야기가 들려옵니다. 이 약이 싸움을 멈추는 데 도움이 된다면 가져가세요.'],['you','증언을 들을 수 있는 사람에게 전해 드릴 거예요. 감사합니다.']],{effect:s=>m.give(s,'medicine38')}),
 r('witness','미로에 남겨진 증거','kingdom','bundle38',[['bundle38','데런 왕국의 미로 안에서 아수리아 왕국의 첩자의 증거가 발견되었습니다.'],['bundle38','옥새를 훔친 범인을 봤다던 데런 왕국의 태양 기사단이 범인이 미로 안으로 들어가는 걸 본 겁니다.'],['you','그 안에 무엇이 있었나요?'],['aaron29','직접 확인하자. 악명 높은 몬스터 미로라 위험하니 내 곁에서 떨어지지 마라.']],{requires:{medicine38:1},effect:s=>m.take(s,'medicine38')}),
 r('maze','데런 왕국 미로 진입','derenmaze38','mazeGuard38',[['narrator','잘 다듬어진 울타리 안쪽에서 몬스터가 덤벼들었다.'],['aaron29','통로가 좁다. 뒤를 지킬 테니 앞쪽부터 상대하거라.']],{fixture:true,pos:[920,590],battle:'maze38'}),
 r('sword','너무 쉽게 드러난 증거','derenmaze38','sword38',[['you','아수리아 모양의 검이에요. 그래서 그쪽을 의심한 거군요.'],['aaron29','검을 발견한 장소만으로 소유자를 단정할 수는 없다.'],['you','범인이라면 이렇게 눈에 띄게 떨어뜨리고 갈까요? 다른 흔적도 찾아봐야겠어요.']],{fixture:true,pos:[690,250],effect:s=>m.give(s,'sword38'),reward:120,ending:'왕국 미로에서 아수리아의 검을 찾았습니다. 하지만 옥새를 훔친 자의 것인지, 누군가 놓은 거짓 증거인지는 아직 알 수 없습니다.'})
 ];
 const c=m.register(38,'데런 왕국의 미로 1부 · 전쟁의 기운',rows,{neutralEagle38:false,neutralEarth38:false,neutralIce38:false,neutralFire38:false,aaronEscort38:false});
 const npc=(name,id,hp,element=0)=>({name,npc:id,hp,maxHp:hp,atk:32,atb:12,element,height:145});
 const ally=(id,name,anim)=>({id,npc:id,name,hp:950,maxHp:950,atk:58,skill:'attack',sprite:'assets/original/animation/'+anim+'/idle.gif'});
 const naomi=ally('naomi','나오미','npc_008_도트_나오미'),aaron=ally('aaron29','아론','npc_009_도트_아론');
 window.ARPIA_WAR_HELPERS={npc,ally,aaron,naomi};
 const fight=(id,name,next,enemies,allies=[])=>x.encounters[id]={name,bg:'assets/maps-hires/forest-battle.png',next:c.keys[next],xp:520,gold:100,sp:60,enemies,allies};
 fight('matilda38','마틸다의 결심','seal',[npc('마틸다','matilda',1650)],[]);
 fight('scoll38','편을 든 스콜','neutral',[npc('스콜','scoll',2100,1)],[naomi]);
 fight('hula38','중립의 조건 · 훌라 버섯','pledge',[{name:'훌라 버섯',hp:1700,maxHp:1700,atk:30,element:2,artPath:'assets/midterm/hula-large.png',height:160}]);
 fight('royal38','데런의 두 사절','reassure',[npc('마틸다','matilda',1450),npc('에드워드','edward',1550,2)]);
 fight('scollAgain38','아수리아의 사절 스콜','advance',[npc('스콜','scoll',2200,1)],[naomi]);
 fight('maze38','왕국 미로의 몬스터','sword',Array.from({length:2},()=>({name:'미로의 대지 수호자',hp:850,maxHp:850,atk:28,element:2,sprite:'examEarth'})),[aaron]);
 const nodes=[[1090,640],[920,640],[920,590],[1050,510],[840,510],[690,510],[690,390],[840,390],[840,250],[1020,250],[1020,120],[840,120],[690,120],[690,250],[520,250],[520,120],[360,120],[180,120],[180,250],[360,250],[360,390],[180,390],[180,520],[360,520],[520,520],[520,640],[690,640],[690,560],[500,390],[500,330]];
 const edges=[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,15],[15,16],[16,17],[17,18],[18,19],[19,20],[20,21],[21,22],[22,23],[23,24],[24,25],[25,26],[26,27],[27,5],[6,28],[28,29],[29,14]];
 x.map.push(['derenmaze38','데런 왕국의 미로',nodes[0]]);
 x.scenes.derenmaze38=(s,n,p)=>({id:'derenmaze38',name:'데런 왕국의 미로',bg:'assets/chapter38/deren-maze.svg',w:1200,h:750,zoom:1,nodes,edges,entities:[p('back','데런 왕국',...nodes[0],'kingdom',[265,465])]});
 const decorate=x.decorate;x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);if(sc.id==='kingdom'&&s.stage>=c.keys.witness)sc.entities.push(p('deren-maze','왕국의 미로',265,465,'derenmaze38',nodes[0]));};
})();
