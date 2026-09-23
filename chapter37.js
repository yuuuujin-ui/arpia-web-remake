/* 37.png: readable dialogue, two seaweed rooms, mucus, ingredients and gem return.
   Missing transitions follow https://wonavy.tistory.com/230; connective dialogue and balance are reconstructed. */
(()=>{
 const x=ARPIA_EXTRA,m=ARPIA_MIDTERM,I='assets/items/';
 for(const[id,name,icon]of [['soil37','오염된 늑대 도시의 흙','ghost_dust'],['ore37','네비니움 광석','manastone'],['weed37','해독용 수중초','herb'],['mucus37','헝거의 콧물','ether'],['gold37','금덩이','goldnugget'],['claw37','드래곤의 발톱 가루','dragon_scale'],['wing37','독수리의 날개 가루','bat_wing'],['spirit37','숲의 정기','manastone'],['sun37','프리드의 태양의 보석','goldnugget'],['dragona37','드래고나 변신 물약','potion']])ARPIA_DATA.ITEMS['mt_'+id]={name,desc:name,kind:'quest',price:0,sell:0,icon:I+icon+'.png'};
 Object.assign(x.npcs,{note37:{name:'이슈비케의 쪽지',artPath:'assets/midterm/certificate.png',height:30},seaweed37:{name:'수중초',artPath:I+'herb.png',height:30},mucus37:{name:'얼어붙은 헝거의 콧물',artPath:I+'ether.png',height:28},sunMirror37:{name:'프리드의 거울',artPath:'assets/frieds-mirror.png',height:80},festivalAudience37:{name:'축제의 관객들'}});
 const r=(key,title,scene,npc,lines,extra={})=>({key,title,scene,npc,lines,...extra});
 const rows=[
 r('amela','보통 약으로 고칠 수 없는 독','infirmary','amela',[['you','물약을 마신 뒤 몸이 이상해졌어요. 헝거가 준 흙에 독이 있었대요.'],['amela','마법의 독이라면 여기 있는 약으로는 고칠 수 없단다. 원인이 된 흙부터 정확히 조사해야 해.'],['you','칠리 선생님께 남은 흙을 받아 갈게요.']]),
 r('soil','검사를 위한 흙','materials','chilli',[['chilli','여기다. 시약을 뿌리지 않은 흙도 남겨 뒀어.'],['you','이걸 이슈비케 선생님께 보여 드리면 원인을 알 수 있겠죠?'],['chilli','무엇에 오염됐는지 알아야 해독제를 만들 수 있지. 서둘러 가 보렴.']],{effect:s=>{m.take(s,'wolfSoil36');m.give(s,'soil37');}}),
 r('note','수중초를 채취하러 간 선생님','library','note37',[['narrator','이슈비케의 자리에 쪽지 한 장이 놓여 있었다.'],['ishubike','전 수중초를 채취하러 떠납니다. 저를 급하게 찾는 분은 바바라 할머니 댁으로 가기 바랍니다.'],['you','바바라 할머니라면 선생님이 계신 곳으로 보내 주실 수 있겠어.']],{fixture:true}),
 r('barbara','텔레포트에 필요한 광석','barbarahouse','barbara',[['barbara','이슈비케가 간 곳은 알지. 다만 텔레포트에 쓸 네비니움이 모자라구나.'],['you','몸이 점점 이상해지는데… 난쟁이 광산에서 구해 올게요.'],['barbara','발디에게 먼저 물어보렴. 돌아오는 길은 열어 두마.']]),
 r('baldi','좀순이 세 자매의 광석','mine','baldi',[['baldi','광석을 들고 다니는 좀순이 세 자매가 있네. 광산 아래쪽에서 찾아보게.'],['you','네비니움을 받으면 선생님께 갈 수 있어요. 오래 싸우지 않고 끝내야겠어요.']]),
 r('ore','네비니움을 내놔','molemaze26','zombieSisters',[['you','네비니움 내놔~!'],['narrator','세 자매가 광석을 감싼 채 길을 가로막았다.']],{battle:'zombies37'}),
 r('teleport','남쪽 해안으로','barbarahouse','teleportCompass',[['barbara','광석이 준비됐구나. 이슈비케가 기다리는 해안으로 보내 주마.'],['you','이번에는 제대로 치료 방법을 알아올게요.']],{fixture:true,requires:{ore37:1},effect:(s,a)=>{m.take(s,'ore37');a.travel('judah');}}),
 r('analysis','늑대의 침으로 오염된 흙','judah','ishubike',[['ishubike','이 흙에서 마법 늑대의 침이 느껴지는구나. 변신 물약에 섞이면 위험하지.'],['you','헝거가 일부러 준 거예요. 해독할 수 있겠죠?'],['ishubike','수중초가 필요해. 쟈칼의 폭포 아래 수중 던전부터 함께 찾아보자.']],{requires:{soil37:1},effect:s=>m.take(s,'soil37')}),
 r('weed','깊은 방의 수중초','diveroom24','seaweed37',[['you','여기에 수중초가 있어요.'],['ishubike','좋아. 잎과 줄기를 함께 챙기렴.']],{fixture:true,goal:'수중 던전 맨 아래 줄의 왼쪽 첫 방에서 수중초 채집',effect:s=>m.give(s,'weed37')}),
 r('recipe','쉽게 구할 수 없는 재료','waterfall','ishubike',[['ishubike','남은 재료는 마법 늑대의 콧물이야. 흙을 오염시킨 독을 중화해 줄 수 있지.'],['you','헝거가 그걸 얌전히 줄 리 없는데…'],['ishubike','억지로 빼앗으려다 다시 당하면 안 된다. 방법을 잘 생각해 보렴.'],['you','추운 곳으로 나오게 하면 어떨까요? 얼음 던전으로 유인해 볼게요.']],{effect:s=>m.take(s,'weed37')}),
 r('challenge','헝거를 추운 곳으로','wolfcity31','hunger',[['you','흙에 독을 넣고 이긴 척하면 재미있어? 자신 있으면 얼음 던전으로 와.'],['hunger','그 몸으로 또 싸우겠다고? 어리석기는!'],['you','거기서 기다릴게. 이번에는 네가 도망가지 마.']]),
 r('coldFight','얼음 던전의 결투','icedungeon','hunger',[['hunger','왜 하필 이렇게 추운 곳이냐!'],['you','불만 있으면 나를 이겨 봐.'],['narrator','헝거의 거친 숨 사이로 코를 훌쩍이는 소리가 섞였다.']],{battle:'hungerCold37'}),
 r('mucus','싸운 자리에 남은 것','icedungeon','mucus37',[['you','헝거가 있던 자리에 콧물이 떨어져 있어. 어서 주워야지.'],['narrator','얼음 위에 남은 방울을 작은 병에 담았다.']],{fixture:true,effect:s=>m.give(s,'mucus37')}),
 r('return','싱싱한 수중초를 다시','waterfall','ishubike',[['ishubike','정말 구해 왔구나. 먼저 딴 수중초는 조사하는 데 썼으니 새로 채취하자.'],['you','이번에는 어느 방을 찾아보면 될까요?'],['ishubike','위쪽 방에도 자라고 있을 거야. 방을 헷갈리지 않게 지도에 표시해 두렴.']]),
 r('weedAgain','두 번째 수중초','diveroom4','seaweed37',[['you','아~ 찾았어요.'],['ishubike','이번 잎은 곧바로 약에 쓰자.']],{fixture:true,goal:'수중 던전 맨 위 줄의 왼쪽 다섯 번째 방에서 수중초 채집',effect:s=>m.give(s,'weed37')}),
 r('antidote','반씩 섞은 해독제','diveroom4','ishubike',[['ishubike','수중초와 콧물을 반씩 섞으면 해독제가 완성돼요.'],['you','정말 이걸 마셔야 한다는 거죠…?'],['ishubike','조금만 참으렴. 다른 비율로 섞으면 약효가 달라질 수 있어.']],{requires:{weed37:1,mucus37:1},choose:['해독제 조제','수중초와 헝거의 콧물을 어떤 비율로 섞을까?',['수중초 8 : 콧물 2','수중초 5 : 콧물 5','수중초 2 : 콧물 8'],1,'이슈비케는 두 재료를 반씩 섞으라고 했습니다.'],effect:s=>{m.take(s,'weed37');m.take(s,'mucus37');s.festivalPoisoned36=false;s.festivalCured37=true;}}),
 r('restart','다시 도전할 용기','magecity','joker',[['you','해독됐어요. 아직 축제 준비를 계속할 수 있겠죠?'],['joker','이번에는 더 큰 용으로 변신해 보세. 재료를 주는 이들에게는 미리 연락해 두었네.'],['you','흙 때문에 고생했는데, 다시 모을 생각을 하니 조금 겁나요.'],['joker','검사한 재료를 써야지. 마지막에는 태양의 보석에서 빛을 빌리겠네.']]),
 r('gold','다시 찾은 금덩이','minedepths','gold36',[['you','찾았다. 레오나에게 가져갈 금덩이야.']],{fixture:true,effect:s=>m.give(s,'gold37')}),
 r('claw','연락받은 레오나','nymphen','leona',[['leona','당신이 오면 드래곤의 발톱 가루를 전해 주라고요. 이것이에요.'],['you','조커가 미리 이야기해 줬군요. 이번에는 꼭 성공할게요.']],{requires:{gold37:1},effect:s=>{m.take(s,'gold37');m.give(s,'claw37');}}),
 r('wing','시바가 준비한 가루','eaglevillage','shiva',[['shiva','그래, 네가 오면 전해 주라고 하더구나. 여기다.'],['you','또 부탁드리게 됐네요. 이번에는 재료를 제대로 확인하고 쓸게요.']],{effect:s=>m.give(s,'wing37')}),
 r('spirit','오당카의 두 번째 도움','hut','odangka',[['you','다시 변신 물약을 만들어요. 숲의 정기를 한 번만 더 주세요.'],['odangka','시끄럽다. 이거나 받아 가라.'],['you','고마워요. 빌린 솥도 잊지 않고 돌려드릴게요.']],{effect:s=>m.give(s,'spirit37')}),
 r('spell','태양의 빛을 빌리는 주문','magecity','joker',[['joker','프리드의 거울 속 태양의 보석이 필요하네. 솔라커스 테드 온.'],['you','솔라커스 테드 온. 빛만 빌리고 다시 돌려놓는 거죠?'],['joker','물론이지. 학교 보일러실 지하에서 거울을 찾게. 보석을 오래 밖에 두면 안 되네.']]),
 r('sun','프리드의 거울에서 꺼내다','mirrorRoom37','sunMirror37',[['you','솔라커스 테드 온.'],['narrator','거울 표면이 잔물결처럼 흔들리며 황금빛 보석이 떠올랐다.']],{fixture:true,choose:['태양의 보석','조커에게 배운 주문을 고르세요.',['솔라커스 테드 온','홀리 라이트','효도'],0,'조커의 주문은 솔라커스 테드 온입니다.'],effect:s=>m.give(s,'sun37')}),
 r('dragona','태양의 빛이 깃든 물약','magecity','joker',[['joker','그럼, 자 재료들을 오당카의 솥에 넣고 조용한 곳에서 융합하도록 하시오.'],['you','태양의 보석은 물약에 넣어 녹이는 게 아니죠?'],['joker','그 빛을 비추는 걸세. 융합이 끝나면 보석은 그대로 돌아가야 해.'],['narrator','솥에서 피어오른 빛이 가라앉자 드래고나가 완성됐다.']],{requires:{claw37:1,wing37:1,spirit37:1,sun37:1,cauldron36:1},effect:s=>{for(const id of ['claw37','wing37','spirit37'])m.take(s,id);m.give(s,'dragona37');}}),
 r('escort','보석을 지킬 동행','shaiyatower','shaiya',[['shaiya','태양의 보석을 가지고 혼자 움직이는 건 위험해요. 거울까지 함께 가겠습니다.'],['you','곧바로 돌려놓으려고 했어요. 도와주셔서 고마워요.']],{effect:s=>s.sunEscort37=true}),
 r('ambush','천리안으로 지켜본 자','magecity','devileye35',[['devileye35','나의 천리안을 통해 네가 태양의 보석을 지니고 다니는 것을 봤다.'],['you','이 보석은 네게 줄 수 없어. 제자리로 돌려놓을 거야.'],['shaiya','물러서세요. 이 아이는 제가 지킵니다.']],{battle:'devileye37'}),
 r('returnSun','제자리로 돌아간 태양의 보석','mirrorRoom37','sunMirror37',[['you','이제 태양의 보석을 원래대로 돌려놓을게요.'],['narrator','보석이 거울 너머로 스며들자 방을 채우던 빛이 고요해졌다.'],['shaiya','잘했어요. 빌린 힘을 되돌려놓는 일도 마법사의 책임이에요.']],{fixture:true,requires:{sun37:1},effect:s=>{m.take(s,'sun37');s.sunReturned37=true;s.sunEscort37=false;}}),
 r('returnPot','잊지 않은 솥','hut','odangka',[['you','빌려주신 솥을 돌려드리러 왔어요. 덕분에 새 물약도 완성했어요.'],['odangka','허허, 이번엔 제대로 가져왔구나. 축제에서도 침착하게 하거라.']],{requires:{cauldron36:1},effect:s=>m.take(s,'cauldron36')}),
 r('festival','축제에 모인 사람들','magecity','festivalAudience37',[['you','어휴, 이 많은 사람들 좀 봐. 역시 마법사의 도시 축제라서 그런지 다르구나.'],['sofia','나 요즘 갈수록 예뻐지는 거 같지 않니? 호호.'],['you','오늘은 축제 구경보다 내 차례가 먼저 걱정돼. 손이 떨리네.'],['hina','여기까지 준비했잖아. 이번에는 잘될 거야.']],{fixture:true}),
 r('performance','어스 드래곤으로 변신','arena','festivalStage36',[['narrator','학교 대표의 이름이 불리자 관객들의 시선이 무대로 모였다.'],['you','아르피아에서 온 {name}입니다. 준비한 변신 마법을 보여 드리겠습니다.'],['narrator','드래고나를 마신 몸에서 황금빛이 번졌다. 거대한 날개와 비늘이 나타나자 콜로세움에 환호가 울렸다.'],['hina','성공했어! 정말 어스 드래곤이 됐어!']],{fixture:true,requires:{dragona37:1},effect:s=>{m.take(s,'dragona37');s.festivalDragon37=true;}}),
 r('applause','무대가 끝난 뒤','arena','festivalAudience37',[['narrator','날개를 펼쳐 인사를 하자 관객들이 다시 박수를 보냈다. 변신이 천천히 풀리며 익숙한 손발이 돌아왔다.'],['you','이제야 긴장이 풀린다. 도와주신 분들께도 성공했다고 알려 드려야겠어.']],{fixture:true,effect:s=>s.festivalDragon37=false}),
 r('report','학교를 빛낸 시범','principal','morris',[['morris','훌륭한 시범이었다. 학교의 이름을 빛내 주었구나.'],['you','한 번은 실패했지만 여러 분이 도와주셔서 끝까지 준비할 수 있었어요.'],['morris','도움을 잊지 않는 것도 배움의 일부란다. 정말 잘했다.']],{reward:180,effect:s=>s.festivalComplete37=true,ending:'마법 중독을 치료하고 태양의 보석과 솥을 돌려준 뒤, 드래고나로 어스 드래곤 변신 시범을 마쳤습니다.'})
 ];
 const c=m.register(37,'마법사의 도시 축제 2부 · 드래고나 변신',rows,{festivalCured37:false,sunReturned37:false,sunEscort37:false,festivalDragon37:false,festivalComplete37:false});
 x.encounters.zombies37={...x.encounters.zombieNews27,name:'네비니움 광석 · 좀순이 세 자매',next:c.keys.teleport,onWin:s=>m.give(s,'ore37')};
 x.encounters.hungerCold37={...x.encounters.wolfSoil36,name:'얼음 던전의 헝거',bg:'assets/maps-hires/colosseum.png',next:c.keys.mucus};
 x.encounters.devileye37={...x.encounters.devileyeFinal35,name:'태양의 보석을 노리는 데빌아이',next:c.keys.returnSun,onWin:undefined,enemies:x.encounters.devileyeFinal35.enemies.map(e=>({...e,artPath:'assets/restored/devileye-sprite.png'})),allies:[{id:'shaiya',npc:'shaiya',name:'샤이아',hp:900,maxHp:900,atk:55,skill:'attack',sprite:'assets/original/animation/npc_055_도트_샤이아/idle.gif'}]};
 x.map.push(['mirrorRoom37','학교 지하 · 프리드의 거울',[150,555]]);
 x.scenes.mirrorRoom37=(s,n,p)=>({id:'mirrorRoom37',name:'학교 지하 · 프리드의 거울',bg:'assets/restored/diamond-room.png',w:1000,h:667,zoom:1.05,nodes:[[150,555],[285,500],[410,425],[530,385],[650,320],[740,405]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,3]],entities:[p('back','보일러실',150,555,'boiler',[281,224])]});
 const decorate=x.decorate;x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);if(sc.id==='boiler'&&s.stage>=c.start)sc.entities.push(p('mirror-entry37','프리드의 거울',281,224,'mirrorRoom37',[150,555]));};
})();
