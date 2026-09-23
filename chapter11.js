/* Episode 11: the Sun Jewel. Plot outline sourced; dialogue, routes and battles rebuilt. */
(()=>{
 const x=window.ARPIA_EXTRA,decorate=x.decorate,interact=x.interact,items=x.questItems;
 Object.assign(x.defaults,{codedLetter:false,decodedLetter:false,moonDust:false,oracle:false,curiousTrialWon:false,clayTablet:false,markIce:false,markEarth:false,markFire:false,wolfRepelled:false,sunGemLocated:false,spiderSilk:false,sealCord:false,sunGemSealed:false,silentSwordRecovered:false});
 Object.assign(x.npcs,{
  ryoma:{name:'료마',anim:'npc_011_도트_료마',portrait:'teacher/료마.png',height:68},antonio:{name:'안토니오',anim:'npc_016_도트_안토니오',height:70},
  shaiya:{name:'샤이아',anim:'npc_055_도트_샤이아',height:70},curious:{name:'큐리어스',portrait:'other/바바라.png',height:76},
  whitewolf:{name:'하얀 늑대',portraitPath:'assets/white-wolf.png',height:108},queenspider:{name:'여왕거미',portraitPath:'assets/queen-spider.png',height:105},
  codedchest:{name:'수수께끼 편지 궤짝'},curiouspet:{name:'큐리어스의 시험 몬스터'},suncrate:{name:'태양의 보석 봉인함'}
 });
 Object.assign(x.encounters,{
  curiouspet:{name:'큐리어스의 시험',bg:'assets/maps-hires/colosseum.png',intro:'큐리어스가 보낸 두 몬스터가 시험을 시작합니다.',next:166,xp:105,gold:75,sp:30,enemies:[{name:'불꽃의 시험수',element:0,hp:185,maxHp:185,atk:14,atb:12,sprite:'fire'},{name:'대지의 시험수',element:2,hp:210,maxHp:210,atk:15,atb:0,sprite:'earth'}]},
  wolf1:{name:'하얀 늑대 · 첫 추격전',bg:'assets/maps-hires/fire-village.png',intro:'침묵의 검을 문 하얀 늑대가 태양의 보석을 내놓으라며 달려듭니다.',next:171,xp:155,gold:90,sp:45,enemies:[{name:'침묵의 검을 문 늑대',element:1,hp:440,maxHp:440,atk:19,atb:14,sprite:'whiteWolf'}]},
  queenspider:{name:'쥬다의 여왕거미',bg:'assets/maps-hires/forest-battle.png',intro:'봉인에 쓸 거미줄을 얻으려면 여왕거미의 시험을 견뎌야 합니다.',next:177,xp:145,gold:105,sp:40,enemies:[{name:'여왕거미',element:2,hp:465,maxHp:465,atk:18,atb:8,sprite:'queenSpider'}]},
  wolf2:{name:'하얀 늑대 · 봉인실 결전',bg:'assets/maps-hires/basement-open.png',intro:'료마의 보호 마법과 함께 태양의 보석을 지키는 마지막 전투입니다.',next:180,xp:210,gold:150,sp:65,enemies:[{name:'아즈카의 하얀 늑대',element:1,hp:620,maxHp:620,atk:22,atb:18,sprite:'whiteWolf'}]}
 });
 x.quests.splice(110,1,
  ['제11화 · 드러난 정체','학교 앞 쇼우에게 늑대 습격 소문 듣기','campus','show'],
  ['먼저 도착한 편지','학교 4층 모리스에게 추적 방법 묻기','principal','morris'],
  ['읽을 수 없는 경고','난쟁이 광산 상자 방에서 편지 찾기','vault11','codedchest'],
  ['머피의 조언','보일러실 머피에게 수수께끼 편지 보여 주기','boiler','murphy'],
  ['숨은 글씨를 밝혀라','마법 재료실 칠리에게 편지 해독 부탁하기','materials','chilli'],
  ['서쪽 숲의 저택','학교 4층 모리스에게 해독한 편지 보고하기','principal','morris'],
  ['머리가 뱀으로 변하는 사람','큐리어스 저택의 안토니오 만나기','curiousmansion','antonio'],
  ['큐리어스의 첫 시험','저택 안쪽 큐리어스에게 도움 청하기','curiousmansion','curious'],
  ['샤이아의 신탁','마법사의 도시 샤이아에게 신탁 부탁하기','magecity','shaiya'],
  ['달빛 가루','요정의 섬 님펜에서 레오나에게 달빛 가루 받기','nymphen','leona'],
  ['내가 만드는 삶','샤이아에게 달빛 가루 전하고 신탁 듣기','magecity','shaiya'],
  ['조커에게 물어본 신탁','마법사의 도시 조커에게 신탁 이야기하기','magecity','joker'],
  ['큐리어스의 결투 시험','저택의 큐리어스에게 신탁 결과 전하기','curiousmansion','curious'],
  ['콜로세움의 시험','학교 대련장에서 큐리어스의 몬스터와 싸우기','arena','curiouspet'],
  ['세 왕국의 표식판','저택의 큐리어스에게 찰흙판 받기','curiousmansion','curious'],
  ['얼음 마을의 표식','얼음 마을 촌장에게 표식 받기','icevillage','elder'],
  ['대지 마을의 표식','대지 마을 촌장에게 표식 받기','earthvillage','elder'],
  ['불꽃 마을의 표식','불꽃 마을 촌장에게 마지막 표식 받기','firevillage','elder'],
  ['하얀 늑대의 습격','불꽃 마을에서 하얀 늑대와 맞서기','firevillage','whitewolf'],
  ['찰흙판이 가리킨 왕국','큐리어스 저택에서 상처 치료와 표식 해독하기','curiousmansion','antonio'],
  ['데런 왕국의 태양 보석','데런 왕국 세자르 3세에게 찰흙판 보여 주기','kingdom','caesar'],
  ['돌상자를 준비할 가루','님펜의 레오나에게 요정의 날개 가루 세 개 받기','nymphen','leona'],
  ['에드워드와 료마의 동행','데런 왕국 에드워드에게 가루를 주고 돌상자 받기','kingdom','edward'],
  ['봉인에 쓸 금실','쥬다 항구 압둘라에게 금실 받기','judah','abdullah'],
  ['상자 방으로 돌아와','난쟁이 광산의 상자 방에 돌상자 놓기','vault11','suncrate'],
  ['금실과 봉인 준비','광산 상자 방의 료마와 봉인 준비하기','vault11','ryoma'],
  ['태양의 보석을 지켜라','광산 상자 방의 돌상자 확인하기','vault11','suncrate'],
  ['늑대와 마지막 결전','료마·에드워드와 광산을 습격한 헝거 물리치기','vault11','whitewolf'],
  ['봉인 주문','침묵의 검을 회수하고 금실로 광산 방 봉인하기','vault11','suncrate'],
  ['추적을 마치고','교장실에서 침묵의 검을 전하고 결과 보고하기','principal','morris'],
  ['제11화 완료 · 태양의 보석','침묵의 검을 되찾고 태양의 보석을 안전하게 봉인했습니다','campus','none']
 );
 x.chapters.push([152,182,'제11화 드러난 정체 · 태양의 보석']);
 x.map.push(['curiousmansion','큐리어스 저택',[470,370]],['icevillage','얼음 마을',[300,744]],['earthvillage','대지 마을',[300,744]],['firevillage','불꽃 마을',[300,744]],['spiderden','쥬다 항구 아래 거미굴',[170,520]]);
 x.scenes.curiousmansion=(s,n,p)=>({id:'curiousmansion',name:'서쪽 깊은 숲 · 큐리어스 저택',bg:'assets/maps-hires/curious-mansion.png',w:559,h:431,zoom:1.42,nodes:[[470,370],[415,340],[350,315],[285,292],[220,270],[165,235],[140,190],[195,155],[260,132],[330,148],[395,120],[440,175],[470,245]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,1],[3,9]],entities:[p('back','학교 앞으로',470,370,'campus',[303,316]),n('antonio',350,315),n('curious',260,132)]});
 const village=(id,name,bg,s,n,p,next)=>({id,name,bg,w:id==='earthvillage'?800:600,h:id==='earthvillage'?1158:820,zoom:id==='earthvillage'?1.0:1.08,nodes:[[300,744],[245,680],[280,565],[260,460],[342,372],[295,255],[270,164],[355,592],[397,466]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[2,7],[7,8],[8,4]],entities:[n('elder',295,255),p('back',next?'다음 마을':'학교로',300,744,next||'campus',[300,744])]});
 x.scenes.icevillage=(s,n,p)=>village('icevillage','얼음 마을 · 첫 번째 표식','assets/maps-hires/ice-village.png',s,n,p,'earthvillage');
 x.scenes.earthvillage=(s,n,p)=>village('earthvillage','대지 마을 · 두 번째 표식','assets/maps-hires/earth-village.png',s,n,p,'firevillage');
 x.scenes.firevillage=(s,n,p)=>{const sc=village('firevillage','불꽃 마을 · 마지막 표식','assets/maps-hires/fire-village.png',s,n,p,null);if(s.stage===170)sc.entities.push(n('whitewolf',397,466));return sc;};
 x.scenes.spiderden=(s,n,p)=>({id:'spiderden',name:'쥬다 항구 아래 · 여왕거미의 굴',bg:'assets/maps-hires/forest-battle.png',w:1000,h:658,zoom:1.1,tint:'#23122b58',nodes:[[170,520],[270,500],[365,455],[455,410],[550,370],[650,330],[760,300],[825,250],[700,455],[570,500],[420,530]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[4,8],[8,9],[9,10],[10,2]],entities:[p('back','쥬다 항구',170,520,'judah',[492,183]),n('queenspider',760,300)]});
 x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);
  if(sc.id==='campus'){sc.entities.push({...p('curious','큐리어스 저택',303,316,'curiousmansion',[470,370]),minStage:158},{...p('threevillages','세 속성 마을',200,685,'icevillage',[300,744]),minStage:167});}
  if(sc.id==='minedepths'&&s.stage>=154)sc.entities.push(p('vault11','보물 상자의 방',555,245,'vault11',[120,500]));
  if(sc.id==='kingdom'&&s.stage===174)sc.entities.push(n('edward',530,380),n('ryoma',590,390));
  if(sc.id==='magecity'&&s.stage>=160&&s.stage<=163)sc.entities.push(n('shaiya',555,490),n('joker',310,375));
  if(sc.id==='arena'&&s.stage===165)sc.entities.push(n('curiouspet',710,375));
 };
 x.questItems=s=>[...items(s),...(s.codedLetter&&!s.decodedLetter?[['얼룩진 편지','칠리에게 빨간 꼬리 가루로 숨은 글씨를 밝혀 달라고 부탁하자']]:[]),...(s.moonDust?[['님펜의 달빛 가루','샤이아의 신탁에 필요한 은은한 요정 가루']]:[]),...(s.oracle?[['샤이아의 신탁','좋고 나쁨이 정해진 삶이 아니라 스스로 만들어 가는 삶']]:[]),...(s.clayTablet?[['세 왕국의 찰흙판',`표식: 얼음 ${s.markIce?'완료':'미완료'} · 대지 ${s.markEarth?'완료':'미완료'} · 불꽃 ${s.markFire?'완료':'미완료'}`]]:[]),...(s.decodedLetter?[['큐리어스의 편지','광산의 보석은 가짜이며, 진짜는 이미 다른 곳으로 옮겼다. 큐리어스 저택에서 기다리겠다는 편지']]:[]),...(s.wingDust11?[['요정의 날개 가루',`에드워드에게 건넬 가루 ${s.wingDust11}개`]]:[]),...(s.sunBox11&&!s.sunGemSealed?[['태양의 보석이 든 돌상자','에드워드에게 받은 돌상자. 난쟁이 광산의 상자 방에 보관한다']]:[]),...(s.sealCord?[['금실','압둘라에게 받은 봉인용 금실']]:[]),...(s.silentSwordRecovered?[['되찾은 침묵의 검','하얀 늑대가 떨어뜨린 소리를 삼키는 마법검']]:[])];
 const mineLayout=x.scenes.minedepths;
 x.map.push(['vault11','난쟁이 광산 · 보물 상자의 방',[120,500]]);
 x.scenes.vault11=(s,n,p)=>{const sc=mineLayout(s,n,p);sc.id='vault11';sc.name='난쟁이 광산 · 보물 상자의 방';sc.entities=[p('back','광산 깊은 갱도',120,500,'minedepths',[555,245])];if(s.stage===154)sc.entities.push({...n('codedchest',555,245),type:'fixture'});if(s.stage>=176&&s.stage<=180)sc.entities.push({...n('suncrate',445,255),type:'fixture'},n('edward',480,320),n('ryoma',340,275));if(s.stage===179)sc.entities.push(n('whitewolf',650,270));return sc;};
 const ev={
 176:["vault11","suncrate",[["you","바로 이곳이에요. 태양의 보석이 든 돌상자를 놓을게요."],["narrator","여러 보물 상자 앞에 돌상자를 조심스럽게 내려놓았다. 처음 편지를 찾았을 때와 같은 방이었다."],["edward","돌상자에는 이상 없습니다. 입구를 지킬 테니 금실을 준비하십시오."],["ryoma","문을 닫기 전에 마지막으로 안쪽을 확인하자."]]],
 152:["campus","show",[["show","{name}, 늑대를 쫓고 있다면서? 학교에도 이야기가 퍼졌어."],["you","벌써? 아직 범인을 만난 것도 아닌데 소문은 저보다 빠르네요."],["show","모리스 교장 선생님이 찾으셔. 이번에는 어떤 단서가 나왔는지 다녀와서 알려 줘."],["you","확실히 알아낸 것부터 이야기할게. 아직 짐작뿐인 일도 많거든."]]],
 153:["principal","morris",[["morris","태양의 보석을 찾으려면 편지 한 통부터 읽어야겠구나. 난쟁이 광산 안 보물 상자가 모인 방을 찾아보거라."],["you","지난번에 보석을 찾으러 갔던 광산이요? 이번에는 편지가 있나요?"],["morris","여러 상자를 차근차근 살펴보렴. 생각하지 못한 것이 들어 있을 수도 있으니 방심하지 말고."],["you","상자 속까지 조심해야 한다니… 알겠습니다. 이번 단서는 놓치지 않을게요."]]],
 155:["boiler","murphy",[["you","광산 상자에서 편지를 찾았는데 글씨를 읽을 수가 없어요. 따뜻한 곳에 대면 보일까요?"],["murphy","난로 가까이 가져오되 태우지는 말거라. 어디 보자… 이건 열을 쐬는 것만으로 될 잉크가 아니구나."],["you","다른 방법이 필요하겠네요."],["murphy","마법사들이 쓰는 마법재료를 뿌리면 글씨가 보이게 된다는 이야기를 들은 적이 있단다. 칠리 선생님께 물어보렴."]]],
 156:["materials","chilli",[["chilli","압둘라의 기초 세트가 이런 때 도움이 되는구나. 빨간 꼬리 가루를 이 편지 위에 뿌려 보자."],["narrator","희미하던 글자가 보라색 종이 위로 떠올랐다."],["you","난쟁이 족의 광산 안에 숨겨져 있는 태양의 보석은 가짜! 진짜는 이미 예전에 다른 곳으로 운반되어 보관 중!"],["you","이 편지를 받은 당신은 나 큐리어스 마녀를 찾아 큐리어스 저택으로! 당신을 기다리고 있겠음! 큐리어스 마녀."],["you","가짜를 찾으려고 그렇게 뛰어다녔다고요? 그래도 진짜가 안전하다니 다행이에요."],["chilli","이제는 편지를 쓴 사람에게 물어봐야겠구나. 해독한 편지를 챙겨 가렴."]]],
 157:["principal","morris",[["you","편지를 읽었어요. 광산의 태양의 보석은 가짜고, 진짜는 이미 다른 곳으로 옮겼대요."],["morris","그렇다면 큐리어스에게 가서 다음 이야기를 들어야겠구나."],["you","저택에서 기다린다고 적혀 있어요. 이번에는 보석의 행방을 제대로 알 수 있겠죠?"],["morris","상대가 무엇을 알고 있는지 차근차근 물어보렴. 서쪽 숲길을 따라가면 저택을 찾을 수 있을 게다."]]],
 158:['curiousmansion','antonio',[['antonio','어머니를 만나러 왔나? 가끔 내 머리가 뱀으로 변해도 놀라지 마. 금방 돌아오니까.'],['you','정말… 방금 머리카락이 움직인 것 같은데요.'],['antonio','하하, 저택에서는 흔한 일이야. 어머니는 위층에 계셔.']]],
 159:["curiousmansion","curious",[["curious","편지를 읽고 찾아왔군. 생각보다 어린 마법사잖아?"],["you","보석이 가짜라는 것까지 확인했어요. 진짜 태양의 보석은 어디에 있나요?"],["curious","서두르지 말게. 먼저 마법사의 도시 샤이아 마법사에게 가서 신탁을 받아오게. 그걸 보고 이야기하지."],["you","편지를 가져온 것만으로는 부족한가요?"],["curious","그 중요한 물건의 행방을 아무에게나 알려 줄 순 없잖나."],["you","알겠어요. 신탁을 받아 오면 꼭 다음 이야기를 해 주세요."]]],
 160:['magecity','shaiya',[['shaiya','신탁을 보는 일은 어렵지 않아요. 다만 님펜의 달빛 가루가 필요합니다.'],['you','레오나 님께 받아 오면 될까요?'],['shaiya','네. 달빛은 길을 정해 주기보다 네 마음을 비춰 줄 거예요.']]],
 161:['nymphen','leona',[['leona','샤이아의 신탁에 쓸 달빛 가루구나. 밤이슬을 머금은 잎에서 모았단다.'],['you','제 운명이 어떻게 나올지 조금 무서워요.'],['leona','신탁은 명령이 아니야. 네가 고르는 길을 이해하는 작은 빛이지.']]],
 162:["magecity","shaiya",[["shaiya","달빛 가루를 가져왔군요. 이제 당신의 앞날을 비춰 보겠습니다."],["narrator","가루가 희미한 빛을 내며 흩어졌다. 샤이아는 빛 속을 한동안 말없이 바라보았다."],["shaiya","당신의 앞에는 끝이 보이지 않는 모험이 기다리고 있습니다."],["you","그 모험은 잘 끝나나요? 제가 보석을 찾을 수 있을까요?"],["shaiya","당신의 미래는 좋다고도, 나쁘다고 할 수 없는 말 그대로 자신이 만들어가는 삶입니다."],["you","정해진 답을 받으러 왔는데, 결국 제가 만들어 가야 하는 거군요."],["shaiya","이 양피지에 신탁을 적어 두었습니다. 큐리어스에게 전해 주세요."]]],
 163:["magecity","joker",[["you","조커 님, 광산에 숨긴 보석은 가짜였대요. 큐리어스의 편지에 그렇게 적혀 있었어요."],["joker","음… 그랬던가? 오래된 일을 전부 기억하기는 어렵다네."],["you","이제는 신탁까지 받아 왔어요. 샤이아 님은 제가 제 미래를 만들어 간대요."],["joker","좋은 말이군. 자네 나름대로 신탁의 뜻을 생각해 보게."],["you","조커 님도 확실한 답을 주시지는 않는군요. 저택으로 돌아가 볼게요."]]],
 164:["curiousmansion","curious",[["you","샤이아의 신탁을 가져왔어요. 제 선택에 따라 미래가 달라진대요."],["curious","어디 보자. 흠, 앞날이 딱 정해졌다는 말은 아니로군. 그렇다면 자네 실력도 직접 봐야겠어."],["you","아직 시험이 더 남았어요?"],["curious","아르피아 학교 안 콜로세움에 내 몬스터를 보내 두었네. 거기서 치열한 싸움 끝에 살아 돌아오게."],["you","무서운 말씀이지만 피할 수는 없겠네요. 다녀와서 약속대로 다음 단서를 받을게요."]]],
 166:["curiousmansion","curious",[["curious","이제 자네에게 약속대로 표식을 주겠네. 이걸 받게."],["you","찰흙판에 세 군데 빈자리가 있어요. 지도 같기도 하고요."],["curious","불꽃 마을, 얼음 마을, 대지 마을에 가서 나머지 조각을 찾아오게. 모든 조각이 모여야 이 표식의 뜻을 읽을 수 있네."],["you","이번에는 세 마을이군요. 얻은 조각은 잃어버리지 않도록 잘 끼워 둘게요."]]],
 167:['icevillage','elder',[['elder','얼음 마을은 아르피아의 용기를 기억한단다. 이 눈꽃 표식을 받으렴.'],['you','태양의 보석을 안전하게 숨길 곳을 찾고 있어요.'],['elder','다음은 대지 마을로 가 보거라. 서로 다른 표식이 하나의 길을 만들 게다.']]],
 168:['earthvillage','elder',[['elder','대지의 표식은 흔들리지 않는 마음을 뜻한단다. 찰흙판에 끼우렴.'],['you','이제 불꽃 마을의 표식만 남았어요.'],['elder','마지막 길에서 성급히 뛰지 말고 주변을 살피거라.']]],
 169:['firevillage','elder',[['elder','불꽃의 표식은 두려움 속에서도 꺼지지 않는 마음이지. 세 표식이 모두 모였구나.'],['you','찰흙판이 따뜻해지고 있어요.'],['narrator','그 순간 마을 입구에서 낮은 으르렁거림이 들렸다. 하얀 늑대가 길을 막았다.']]],
 171:["curiousmansion","antonio",[["narrator","전투가 끝나자 주변 풍경이 흔들렸다. 정신을 차렸을 때는 다시 큐리어스의 저택이었다."],["curious","늑대와 마주쳤군. 우선 숨부터 돌리게. 완성한 찰흙판을 내게 보여 주고."],["antonio","상처부터 봐. 계속 걸어왔으면 더 힘들었을 거야."],["you","순식간에 여기로 온 건 큐리어스 님의 마법이었군요. 세 조각은 모두 모았어요."],["narrator","큐리어스가 찰흙판을 살피자 한 지점이 빛났다."],["curious","데런 왕국이군. 이제 세자르 국왕에게 이 표식을 가져가게."]]],
 172:["kingdom","caesar",[["you","큐리어스 님이 주신 찰흙판을 완성했어요. 이 표식이 데런 왕국을 가리켜요."],["caesar","그렇다면 자네에게 맡길 때가 되었군. 태양의 보석은 경기장 땅 아래에 보관하고 있었네."],["you","늑대가 계속 뒤쫓고 있어요. 옮길 때도 조심해야 해요."],["caesar","에드워드가 함께 가도록 하겠네. 돌상자를 준비하려면 요정의 날개 가루 세 개가 필요하니 먼저 구해 오게."],["you","레오나 님께 부탁드리고 에드워드 장군님께 돌아올게요."]]],
 173:["nymphen","leona",[["you","이번에는 진짜 태양의 보석을 옮겨야 해요. 돌상자를 준비하는 데 날개 가루 세 개가 필요하대요."],["leona","지난번 봉인을 풀 때와는 쓰임이 다르구나. 세 봉지를 따로 담아 주마."],["you","고맙습니다. 에드워드 장군님께 그대로 전달할게요."],["narrator","요정의 날개 가루 세 봉지를 챙겼다. 보석을 운반할 준비가 조금씩 갖춰지고 있었다."]]],
 174:["kingdom","edward",[["you","요정의 날개 가루 세 개를 가져왔어요."],["edward","확인했습니다. 여기 태양의 보석을 담은 돌상자가 있습니다. 저도 호위하겠습니다."],["ryoma","나도 동행하마. 물건을 받은 것으로 끝이 아니다. 안전한 곳에 두고 문을 봉인할 때까지 지켜야 한다."],["you","함께 가 주셔서 든든해요. 봉인에 필요한 재료는 더 없나요?"],["ryoma","쥬다의 압둘라에게 금실을 받아 가자. 준비를 마치면 난쟁이 광산의 상자 방으로 돌아간다."]]],
 175:["judah","abdullah",[["you","돌상자를 안전하게 보관하고 방을 봉인하려고 해요. 금실이 필요합니다."],["abdullah","마법에 사용할 금실이라면 여기 있소. 잘 챙기시오."],["edward","주변은 제가 살피겠습니다. 누군가 따라붙은 것 같군요."],["you","늑대가 또 노리는 걸까요?"],["ryoma","아직 단정하지 말자. 재료를 받았으니 함께 광산으로 이동하자꾸나."]]],
 177:["vault11","ryoma",[["you","금실을 준비했어요. 이제 문을 봉인하면 되죠?"],["ryoma","그래. 매듭이 풀리지 않도록 잡으렴. 마법이 흐르는 동안에는 손을 놓지 말고."],["edward","잠깐… 갱도에서 발소리가 들립니다."],["you","여기까지 따라온 걸까요? 상자는 제가 확인할게요."]]],
 178:["vault11","suncrate",[["narrator","돌상자를 확인하고 문을 닫으려는 순간, 갱도 입구를 거대한 늑대가 가로막았다."],["whitewolf","아우― 재미나게 돌아다니는군. 이런 기회가 오기를 기다렸다."],["you","보석을 찾는 동안 저희를 따라다녔군요. 이번에는 넘겨주지 않겠어요."],["edward","돌상자에서 떨어지십시오. 이곳은 제가 지킵니다."],["ryoma","{name}, 함께 맞서자. 서두르지 말고 배운 마법을 써 보렴."]]],
 180:["vault11","suncrate",[["narrator","늑대가 물러난 자리에 검 한 자루가 남아 있었다. 에드워드가 주워 건넸다."],["you","앗, 저건… 침묵의 검!"],["edward","확실히 챙기십시오. 오늘의 대결은 대마왕의 거사단에 경종이 되겠군요."],["ryoma","아직 문을 봉인해야 한다. 금실을 다시 준비하자꾸나."],["narrator","셋은 돌상자를 확인한 뒤 금실과 마법으로 방을 봉인했다. 안쪽의 빛이 잦아들고 무거운 문이 닫혔다."],["you","이제 검도 되찾았고, 보석도 지켰어요. 교장 선생님께 돌아가 보고해요."]]],
 181:["principal","morris",[["you","태양의 보석이 든 돌상자를 광산 방에 두고 봉인했어요. 늑대가 또 나타났지만 침묵의 검도 되찾았습니다."],["morris","료마와 에드워드도 함께 힘써 주었구나. 오래도록 수고했다."],["you","처음에는 편지 한 장을 찾는 일인 줄 알았는데, 여러 사람의 도움이 필요했어요."],["morris","중요한 물건을 지키는 일은 혼자만의 힘으로 해낼 수 없지. 그걸 직접 배운 셈이구나."],["you","다음에도 확인한 사실과 아직 모르는 일을 구별해서 보고할게요."]]]
 };
 x.interact=(e,a)=>{const s=a.state,q=s.stage;
  if(q===154&&s.scene==='vault11'&&e.id==='codedchest'){a.talk([['you','상자들이 줄지어 있어. 하나씩 살펴보자.'],['narrator','여섯 번째 상자 안에서 얼룩진 편지를 찾았다. 글씨가 흐려 내용을 알아볼 수 없다.'],['you','교장 선생님이 말씀하신 편지 같아. 함부로 문지르지 말고 읽을 방법을 찾아야겠어.']],()=>{s.codedLetter=true;a.advance(155,15);a.refresh();a.save();});return true;}
  if(q===165&&s.scene==='arena'&&e.id==='curiouspet'){a.battle('curiouspet');return true;}
  if(q===170&&s.scene==='firevillage'&&e.id==='whitewolf'){a.battle('wolf1');return true;}
    if(q===179&&s.scene==='vault11'&&e.id==='whitewolf'){a.battle('wolf2');return true;}
  const row=ev[q];if(row&&s.scene===row[0]&&e.id===row[1]){a.talk(row[2],()=>{
   if(q===156)s.decodedLetter=true;if(q===161)s.moonDust=true;if(q===162){s.oracle=true;s.moonDust=false;}if(q===166)s.clayTablet=true;
   if(q===167)s.markIce=true;if(q===168)s.markEarth=true;if(q===169)s.markFire=true;
   if(q===171){s.wolfRepelled=true;s.hp=s.maxHp;s.mp=s.maxMp;}if(q===172)s.sunGemLocated=true;
   if(q===173)s.wingDust11=3;if(q===174){s.wingDust11=0;s.sunBox11=true;}if(q===175)s.sealCord=true;if(q===180){s.sunGemSealed=true;s.silentSwordRecovered=true;s.sealCord=false;}
   a.advance(q+1,q===181?45:10);a.refresh();if(q===181)a.finish('제11화 완료 · 태양의 보석','세 왕국과 여러 친구의 힘을 모아 하얀 늑대를 물리치고 태양의 보석을 봉인했습니다. 침묵의 검도 학교로 돌아왔습니다.');a.save();
  });return true;}
  if(q>=152){const small={antonio:'어머니의 시험은 까다롭지만 통과한 사람은 반드시 도와줘.',curious:'운명보다 네 선택을 믿어라. 그래야 표식판도 답을 보여 줄 테니.',shaiya:'신탁은 가능성을 비추는 거울일 뿐이에요.',suncrate:s.sunGemSealed?'태양의 보석을 넣은 돌상자와 금실의 봉인이 조용히 빛난다.':'상자 틈에서 강한 금빛이 새어 나온다.'};if(small[e.id]){a.talk([[e.id==='suncrate'?'narrator':e.id,small[e.id]]]);return true;}}
  return interact(e,a);
 };
})();
