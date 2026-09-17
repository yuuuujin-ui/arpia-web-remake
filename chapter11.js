/* Episode 11: the Sun Jewel. Plot outline sourced; dialogue, routes and battles rebuilt. */
(()=>{
 const x=window.ARPIA_EXTRA,decorate=x.decorate,interact=x.interact,items=x.questItems;
 Object.assign(x.defaults,{codedLetter:false,decodedLetter:false,moonDust:false,oracle:false,curiousTrialWon:false,clayTablet:false,markIce:false,markEarth:false,markFire:false,wolfRepelled:false,sunGemLocated:false,spiderSilk:false,sealCord:false,sunGemSealed:false,silentSwordRecovered:false});
 Object.assign(x.npcs,{
  ryoma:{name:'료마',anim:'npc_011_도트_료마',portrait:'teacher/료마.png',height:68},antonio:{name:'안토니오',anim:'npc_016_도트_안토니오',height:70},
  shaiya:{name:'샤이아',anim:'npc_055_도트_샤이아',height:70},curious:{name:'큐리어스',portrait:'other/바바라.png',height:76},
  whitewolf:{name:'하얀 늑대',portraitPath:'assets/white-wolf.webp',height:108},queenspider:{name:'여왕거미',portraitPath:'assets/queen-spider.webp',height:105},
  codedchest:{name:'수수께끼 편지 궤짝'},curiouspet:{name:'큐리어스의 시험 몬스터'},suncrate:{name:'태양의 보석 봉인함'}
 });
 Object.assign(x.encounters,{
  curiouspet:{name:'큐리어스의 시험',bg:'assets/maps-hires/colosseum.webp',intro:'큐리어스가 보낸 두 몬스터가 시험을 시작합니다.',next:166,xp:105,gold:75,sp:30,enemies:[{name:'불꽃의 시험수',element:0,hp:185,maxHp:185,atk:14,atb:12,sprite:'fire'},{name:'대지의 시험수',element:2,hp:210,maxHp:210,atk:15,atb:0,sprite:'earth'}]},
  wolf1:{name:'하얀 늑대 · 첫 추격전',bg:'assets/maps-hires/fire-village.webp',intro:'침묵의 검을 문 하얀 늑대가 태양의 보석을 내놓으라며 달려듭니다.',next:171,xp:155,gold:90,sp:45,enemies:[{name:'침묵의 검을 문 늑대',element:1,hp:440,maxHp:440,atk:19,atb:14,sprite:'whiteWolf'}]},
  queenspider:{name:'쥬다의 여왕거미',bg:'assets/maps-hires/forest-battle.webp',intro:'봉인에 쓸 거미줄을 얻으려면 여왕거미의 시험을 견뎌야 합니다.',next:177,xp:145,gold:105,sp:40,enemies:[{name:'여왕거미',element:2,hp:465,maxHp:465,atk:18,atb:8,sprite:'queenSpider'}]},
  wolf2:{name:'하얀 늑대 · 봉인실 결전',bg:'assets/maps-hires/basement-open.webp',intro:'료마의 보호 마법과 함께 태양의 보석을 지키는 마지막 전투입니다.',next:180,xp:210,gold:150,sp:65,enemies:[{name:'아즈카의 하얀 늑대',element:1,hp:620,maxHp:620,atk:22,atb:18,sprite:'whiteWolf'}]}
 });
 x.quests.splice(110,1,
  ['제11화 · 드러난 정체','학교 앞 쇼우에게 늑대 습격 소문 듣기','campus','show'],
  ['먼저 도착한 편지','학교 4층 모리스에게 추적 방법 묻기','principal','morris'],
  ['읽을 수 없는 경고','학교 지하 통로의 오래된 궤짝 열기','tunnel','codedchest'],
  ['머피의 조언','보일러실 머피에게 수수께끼 편지 보여 주기','boiler','murphy'],
  ['숨은 글씨를 밝혀라','마법 재료실 칠리에게 편지 해독 부탁하기','materials','chilli'],
  ['서쪽 숲의 저택','학교 4층 모리스에게 해독한 편지 보고하기','principal','morris'],
  ['머리가 뱀으로 변하는 사람','큐리어스 저택의 안토니오 만나기','curiousmansion','antonio'],
  ['큐리어스의 첫 시험','저택 안쪽 큐리어스에게 도움 청하기','curiousmansion','curious'],
  ['샤이아의 신탁','마법사의 도시 샤이아에게 신탁 부탁하기','magecity','shaiya'],
  ['달빛 가루','요정의 섬 님펜에서 레오나에게 달빛 가루 받기','nymphen','leona'],
  ['내가 만드는 삶','샤이아에게 달빛 가루 전하고 신탁 듣기','magecity','shaiya'],
  ['가짜 태양의 보석','마법사의 도시 조커에게 광산 보석 확인하기','magecity','joker'],
  ['큐리어스의 결투 시험','저택의 큐리어스에게 신탁 결과 전하기','curiousmansion','curious'],
  ['콜로세움의 시험','학교 대련장에서 큐리어스의 몬스터와 싸우기','arena','curiouspet'],
  ['세 왕국의 표식판','저택의 큐리어스에게 찰흙판 받기','curiousmansion','curious'],
  ['얼음 마을의 표식','얼음 마을 촌장에게 표식 받기','icevillage','elder'],
  ['대지 마을의 표식','대지 마을 촌장에게 표식 받기','earthvillage','elder'],
  ['불꽃 마을의 표식','불꽃 마을 촌장에게 마지막 표식 받기','firevillage','elder'],
  ['하얀 늑대의 습격','불꽃 마을에서 하얀 늑대와 맞서기','firevillage','whitewolf'],
  ['찰흙판이 가리킨 왕국','큐리어스 저택에서 상처 치료와 표식 해독하기','curiousmansion','antonio'],
  ['데런 왕국의 태양 보석','데런 왕국 세자르 3세에게 찰흙판 보여 주기','kingdom','caesar'],
  ['보석을 봉인할 실','학교 4층 모리스에게 수송 계획 듣기','principal','morris'],
  ['료마의 보호 마법','학교 앞 료마 선생님과 합류하기','campus','ryoma'],
  ['여왕거미의 거미줄','쥬다 항구 압둘라에게 봉인 재료 묻기','judah','abdullah'],
  ['항구 아래 거미굴','쥬다 지하에서 여왕거미의 시험 통과하기','spiderden','queenspider'],
  ['마법 봉인실 만들기','압둘라에게 거미줄로 봉인끈 만들어 달라고 하기','judah','abdullah'],
  ['태양의 보석을 지켜라','학교 지하 봉인함을 확인하기','basement','suncrate'],
  ['늑대와 마지막 결전','지하 봉인실을 습격한 하얀 늑대 물리치기','basement','whitewolf'],
  ['봉인 주문','거미줄 봉인끈으로 태양의 보석 봉인하기','basement','suncrate'],
  ['모리스의 큰 그림','교장실에서 침묵의 검을 전하고 진실 듣기','principal','morris'],
  ['제11화 완료 · 태양의 보석','침묵의 검을 되찾고 태양의 보석을 안전하게 봉인했습니다','campus','none']
 );
 x.chapters.push([152,182,'제11화 드러난 정체 · 태양의 보석']);
 x.map.push(['curiousmansion','큐리어스 저택',[470,370]],['icevillage','얼음 마을',[300,744]],['earthvillage','대지 마을',[300,744]],['firevillage','불꽃 마을',[300,744]],['spiderden','쥬다 항구 아래 거미굴',[170,520]]);
 x.scenes.curiousmansion=(s,n,p)=>({id:'curiousmansion',name:'서쪽 깊은 숲 · 큐리어스 저택',bg:'assets/maps-hires/curious-mansion.webp',w:559,h:431,zoom:1.42,nodes:[[470,370],[415,340],[350,315],[285,292],[220,270],[165,235],[140,190],[195,155],[260,132],[330,148],[395,120],[440,175],[470,245]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,1],[3,9]],entities:[p('back','학교 앞으로',470,370,'campus',[303,316]),n('antonio',350,315),n('curious',260,132)]});
 const village=(id,name,bg,s,n,p,next)=>({id,name,bg,w:id==='earthvillage'?800:600,h:id==='earthvillage'?1158:820,zoom:id==='earthvillage'?1.0:1.08,nodes:[[300,744],[245,680],[280,565],[260,460],[342,372],[295,255],[270,164],[355,592],[397,466]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[2,7],[7,8],[8,4]],entities:[n('elder',295,255),p('back',next?'다음 마을':'학교로',300,744,next||'campus',[300,744])]});
 x.scenes.icevillage=(s,n,p)=>village('icevillage','얼음 마을 · 첫 번째 표식','assets/maps-hires/ice-village.webp',s,n,p,'earthvillage');
 x.scenes.earthvillage=(s,n,p)=>village('earthvillage','대지 마을 · 두 번째 표식','assets/maps-hires/earth-village.webp',s,n,p,'firevillage');
 x.scenes.firevillage=(s,n,p)=>{const sc=village('firevillage','불꽃 마을 · 마지막 표식','assets/maps-hires/fire-village.webp',s,n,p,null);if(s.stage===170)sc.entities.push(n('whitewolf',397,466));return sc;};
 x.scenes.spiderden=(s,n,p)=>({id:'spiderden',name:'쥬다 항구 아래 · 여왕거미의 굴',bg:'assets/maps-hires/forest-battle.webp',w:1000,h:658,zoom:1.1,tint:'#23122b58',nodes:[[170,520],[270,500],[365,455],[455,410],[550,370],[650,330],[760,300],[825,250],[700,455],[570,500],[420,530]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[4,8],[8,9],[9,10],[10,2]],entities:[p('back','쥬다 항구',170,520,'judah',[492,183]),n('queenspider',760,300)]});
 x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);
  if(sc.id==='campus'){sc.entities.push({...p('curious','큐리어스 저택',303,316,'curiousmansion',[470,370]),minStage:158},{...p('threevillages','세 속성 마을',200,685,'icevillage',[300,744]),minStage:167});if(s.stage===174)sc.entities.push(n('ryoma',747,500));}
  if(sc.id==='tunnel'&&s.stage===154)sc.entities.push({...n('codedchest',1090,353),type:'fixture'});
  if(sc.id==='magecity'&&s.stage>=160&&s.stage<=163)sc.entities.push(n('shaiya',555,490),n('joker',310,375));
  if(sc.id==='arena'&&s.stage===165)sc.entities.push(n('curiouspet',710,375));
  if(sc.id==='judah'&&s.stage>=175&&s.stage<=177)sc.entities.push({...p('spiderden','항구 아래 거미굴',120,112,'spiderden',[170,520]),minStage:176});
  if(sc.id==='basement'&&s.stage>=178&&s.stage<=180){sc.entities.push({...n('suncrate',445,285),type:'fixture'});if(s.stage===179)sc.entities.push(n('whitewolf',305,305),n('ryoma',540,350));}
 };
 x.questItems=s=>[...items(s),...(s.codedLetter?[['암호 편지','토마토를 먹고 자란 생쥐 꼬리 가루로 숨은 글씨를 밝힐 수 있다']]:[]),...(s.moonDust?[['님펜의 달빛 가루','샤이아의 신탁에 필요한 은은한 요정 가루']]:[]),...(s.oracle?[['샤이아의 신탁','좋고 나쁨이 정해진 삶이 아니라 스스로 만들어 가는 삶']]:[]),...(s.clayTablet?[['세 왕국의 찰흙판',`표식: 얼음 ${s.markIce?'완료':'미완료'} · 대지 ${s.markEarth?'완료':'미완료'} · 불꽃 ${s.markFire?'완료':'미완료'}`]]:[]),...(s.spiderSilk?[['여왕거미의 거미줄','강한 마법 물체를 묶는 데 쓰는 진주빛 실']]:[]),...(s.sealCord?[['압둘라의 봉인끈','태양의 보석 상자를 닫을 마법 거미줄 끈']]:[]),...(s.silentSwordRecovered?[['되찾은 침묵의 검','하얀 늑대가 떨어뜨린 소리를 삼키는 마법검']]:[])];
 const ev={
 152:['campus','show',[['show','{name}, 서쪽 마을에서 하얀 늑대가 사람들을 습격한다는 소문이 있어.'],['you','침묵의 검과 태양의 보석을 가져간 그 늑대일 거야.'],['show','혼자 쫓지 마. 교장 선생님께 먼저 알려야 해.']]],
 153:['principal','morris',[['morris','늑대가 모습을 드러냈구나. 하지만 바로 뒤쫓기보다 먼저 도착한 경고를 읽어야 한다.'],['you','경고가 이미 와 있었나요?'],['morris','지하 통로의 오래된 궤짝에 편지를 넣어 두었단다. 가져와 보렴.']]],
 155:['boiler','murphy',[['murphy','이 글씨는 기름도 잉크도 아니구나. 마법 재료를 쓴 암호 같아.'],['you','누가 읽을 수 있을까요?'],['murphy','칠리 선생님이라면 특이한 재료를 알아볼 게다.']]],
 156:['materials','chilli',[['chilli','토마토를 먹고 자란 생쥐 꼬리 가루를 살살 뿌리면… 자, 글씨가 보이는구나.'],['you','“서쪽 깊은 숲, 큐리어스 저택으로 오라.”라고 적혀 있어요.'],['chilli','편지를 쓴 사람은 우리가 움직일 것을 알고 있었던 것 같구나.']]],
 157:['principal','morris',[['morris','큐리어스는 태양의 보석을 오래 연구한 마녀란다. 이 편지는 네가 마법사의 도시에 처음 갔을 때 이미 와 있었지.'],['you','그럼 지금까지의 추적은 헛수고였나요?'],['morris','직접 만난 이들과 배운 단서는 헛되지 않다. 서쪽 숲의 저택으로 가 보렴.']]],
 158:['curiousmansion','antonio',[['antonio','어머니를 만나러 왔나? 가끔 내 머리가 뱀으로 변해도 놀라지 마. 금방 돌아오니까.'],['you','정말… 방금 머리카락이 움직인 것 같은데요.'],['antonio','하하, 저택에서는 흔한 일이야. 어머니는 위층에 계셔.']]],
 159:['curiousmansion','curious',[['curious','네가 늑대를 쫓는 마법사라고? 너무 작은데.'],['you','크기로 마법사의 힘을 판단하지 마세요. 태양의 보석을 찾고 있어요.'],['curious','그럼 샤이아에게 신탁을 받아 와. 운명조차 감당할 수 있는지 보겠어.']]],
 160:['magecity','shaiya',[['shaiya','신탁을 보는 일은 어렵지 않아요. 다만 님펜의 달빛 가루가 필요합니다.'],['you','레오나 님께 받아 오면 될까요?'],['shaiya','네. 달빛은 길을 정해 주기보다 네 마음을 비춰 줄 거예요.']]],
 161:['nymphen','leona',[['leona','샤이아의 신탁에 쓸 달빛 가루구나. 밤이슬을 머금은 잎에서 모았단다.'],['you','제 운명이 어떻게 나올지 조금 무서워요.'],['leona','신탁은 명령이 아니야. 네가 고르는 길을 이해하는 작은 빛이지.']]],
 162:['magecity','shaiya',[['shaiya','당신의 삶은 좋다고도 나쁘다고도 정해져 있지 않습니다. 당신이 선택하며 만들어 가는 삶입니다.'],['you','결국 제가 어떤 선택을 하느냐가 중요하다는 뜻이군요.'],['shaiya','맞아요. 늑대를 두려워하더라도 친구와 함께 앞으로 갈 수 있어요.']]],
 163:['magecity','joker',[['joker','광산에서 늑대가 문 보석? 안심해. 그건 내가 바꿔 둔 가짜였어.'],['you','진짜 태양의 보석은 어디 있죠?'],['joker','큐리어스가 알 거야. 나는 가짜를 잘 숨겼다는 칭찬만 받으면 돼.']]],
 164:['curiousmansion','curious',[['curious','신탁을 받아오고 가짜 보석도 알아냈군. 그래도 힘을 직접 보지 않고는 믿을 수 없어.'],['you','어떤 시험이죠?'],['curious','학교 콜로세움에 내 몬스터를 보내 두었다. 이기고 돌아와.']]],
 166:['curiousmansion','curious',[['curious','시험을 통과했으니 인정하지. 이 찰흙판을 가져가.'],['you','세 개의 홈이 있네요.'],['curious','불꽃, 얼음, 대지 마을의 촌장에게 표식을 받아 끼워. 진짜 보석이 있는 방향을 알려 줄 거야.']]],
 167:['icevillage','elder',[['elder','얼음 마을은 아르피아의 용기를 기억한단다. 이 눈꽃 표식을 받으렴.'],['you','태양의 보석을 안전하게 숨길 곳을 찾고 있어요.'],['elder','다음은 대지 마을로 가 보거라. 서로 다른 표식이 하나의 길을 만들 게다.']]],
 168:['earthvillage','elder',[['elder','대지의 표식은 흔들리지 않는 마음을 뜻한단다. 찰흙판에 끼우렴.'],['you','이제 불꽃 마을의 표식만 남았어요.'],['elder','마지막 길에서 성급히 뛰지 말고 주변을 살피거라.']]],
 169:['firevillage','elder',[['elder','불꽃의 표식은 두려움 속에서도 꺼지지 않는 마음이지. 세 표식이 모두 모였구나.'],['you','찰흙판이 따뜻해지고 있어요.'],['narrator','그 순간 마을 입구에서 낮은 으르렁거림이 들렸다. 하얀 늑대가 길을 막았다.']]],
 171:['curiousmansion','antonio',[['antonio','상처가 깊지만 늑대를 물러나게 한 것만으로 대단해. 여기서 쉬어.'],['curious','세 표식을 끼우니 찰흙판이 데런 왕국을 가리키는군. 진짜 태양의 보석은 왕국에 있어.'],['you','몸이 나아지면 바로 세자르 국왕을 만나러 갈게요.']]],
 172:['kingdom','caesar',[['caesar','태양의 보석은 왕국 경기장 깊은 곳에 안전하게 보관하고 있었네.'],['you','하얀 늑대가 계속 노리고 있어요. 아르피아에서 더 강한 봉인을 준비하겠습니다.'],['caesar','호위대가 보석 상자를 학교까지 수송하도록 하겠네.']]],
 173:['principal','morris',[['morris','보석은 곧 도착한다. 평범한 밧줄로는 늑대의 검을 막을 수 없지.'],['you','어떤 재료가 필요한가요?'],['morris','여왕거미의 마법 거미줄이 필요하다. 료마와 함께 쥬다의 압둘라를 찾아가렴.']]],
 174:['campus','ryoma',[['ryoma','이번 상대는 혼자 감당하기 어렵다. 내가 보호 마법으로 함께하마.'],['you','쥬다에서 여왕거미의 거미줄을 구해야 해요.'],['ryoma','좋아. 전투가 벌어지면 공격만 서두르지 말고 체력과 마력을 관리하자.']]],
 175:['judah','abdullah',[['abdullah','여왕거미는 항구 아래 오래된 굴에 사오. 힘으로 빼앗으려 하면 줄을 주지 않을 거요.'],['ryoma','마법 대결로 자격을 보이면 되겠군.'],['abdullah','굴 입구를 열어 두겠소. 이기면 거미줄 한 다발을 가져오시오.']]],
 177:['judah','abdullah',[['abdullah','아주 좋은 여왕거미의 실이군. 여러 겹 꼬아 봉인끈으로 만들었소.'],['you','이 끈이면 태양의 보석 상자를 지킬 수 있나요?'],['abdullah','올바른 주문과 함께라면 침묵의 검도 쉽게 끊지 못할 거요.']]],
 178:['basement','suncrate',[['narrator','왕국에서 보낸 태양의 보석 상자가 지하 봉인실에 놓여 있다. 틈 사이로 금빛이 새어 나온다.'],['ryoma','늑대가 냄새를 맡기 전에 봉인끈을 준비하자.'],['narrator','말이 끝나기도 전에 창고 문이 부서지고 하얀 늑대가 뛰어들었다.']]],
 180:['basement','suncrate',[['ryoma','지금이야. 거미줄 봉인끈으로 상자를 감고 주문을 외워!'],['you','세 왕국의 약속과 아르피아의 이름으로, 태양의 빛을 이 안에 봉인한다!'],['narrator','금빛이 잦아들고 봉인끈에 세 속성의 표식이 차례로 떠올랐다. 늑대가 떨어뜨린 침묵의 검도 회수했다.']]],
 181:['principal','morris',[['you','태양의 보석을 봉인했고 침묵의 검도 되찾았습니다.'],['morris','잘 해냈구나. 사실 보석을 데런 왕국에 숨기고 큐리어스에게 편지를 부탁한 것도 나였단다.'],['you','교장 선생님이 처음부터 늑대의 움직임을 예상하신 거예요?'],['morris','모든 것을 알지는 못했지만 친구들이 힘을 모을 길을 준비했지. 마지막 선택과 승리는 네가 만든 것이란다.']]]
 };
 x.interact=(e,a)=>{const s=a.state,q=s.stage;
  if(q===154&&s.scene==='tunnel'&&e.id==='codedchest'){a.choicePuzzle(['수수께끼 편지 궤짝','모리스가 알려 준 오래된 궤짝을 여는 표식은?',['태양','초승달','세 속성의 소용돌이'],2,'불꽃·얼음·대지가 함께 그려진 표식을 찾아보자.'],()=>{s.codedLetter=true;a.advance(155,15);a.refresh();a.talk([['narrator','궤짝 안에서 문자가 전혀 보이지 않는 낡은 편지를 발견했다.']]);a.save();});return true;}
  if(q===165&&s.scene==='arena'&&e.id==='curiouspet'){a.battle('curiouspet');return true;}
  if(q===170&&s.scene==='firevillage'&&e.id==='whitewolf'){a.battle('wolf1');return true;}
  if(q===176&&s.scene==='spiderden'&&e.id==='queenspider'){a.battle('queenspider');return true;}
  if(q===179&&s.scene==='basement'&&e.id==='whitewolf'){a.battle('wolf2');return true;}
  const row=ev[q];if(row&&s.scene===row[0]&&e.id===row[1]){a.talk(row[2],()=>{
   if(q===156)s.decodedLetter=true;if(q===161)s.moonDust=true;if(q===162)s.oracle=true;if(q===166)s.clayTablet=true;
   if(q===167)s.markIce=true;if(q===168)s.markEarth=true;if(q===169)s.markFire=true;
   if(q===171){s.wolfRepelled=true;s.hp=s.maxHp;s.mp=s.maxMp;}if(q===172)s.sunGemLocated=true;
   if(q===177){s.spiderSilk=true;s.sealCord=true;}if(q===180){s.sunGemSealed=true;s.silentSwordRecovered=true;s.sealCord=false;}
   a.advance(q+1,q===181?45:10);a.refresh();if(q===181)a.finish('제11화 완료 · 태양의 보석','세 왕국과 여러 친구의 힘을 모아 하얀 늑대를 물리치고 태양의 보석을 봉인했습니다. 침묵의 검도 학교로 돌아왔습니다.');a.save();
  });return true;}
  if(q>=152){const small={antonio:'어머니의 시험은 까다롭지만 통과한 사람은 반드시 도와줘.',curious:'운명보다 네 선택을 믿어라. 그래야 표식판도 답을 보여 줄 테니.',shaiya:'신탁은 가능성을 비추는 거울일 뿐이에요.',suncrate:s.sunGemSealed?'태양의 보석은 세 속성의 빛 안에 조용히 봉인되어 있다.':'상자 틈에서 강한 금빛이 새어 나온다.'};if(small[e.id]){a.talk([[e.id==='suncrate'?'narrator':e.id,small[e.id]]]);return true;}}
  return interact(e,a);
 };
})();
