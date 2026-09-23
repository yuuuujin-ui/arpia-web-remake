/* Sources: user 36.png; wonavy.tistory.com/230. Dialogue and combat balance reconstructed. */
(()=>{
 const x=ARPIA_EXTRA,m=ARPIA_MIDTERM,I='assets/items/';
 const item=(id,name,icon,desc=name)=>ARPIA_DATA.ITEMS['mt_'+id]={name,desc,kind:'quest',price:0,sell:0,icon};
 for(const[id,name,icon]of [
 ['festivalInvite36','마법사의 도시 축제 초대장','assets/midterm/certificate.png'],['festivalPass36','학교 대표 참가증','assets/midterm/certificate.png'],
 ['gold36','레오나에게 줄 금덩이',I+'goldnugget.png'],['dragonPowder36','드래곤의 발톱 가루',I+'dragon_scale.png'],['eaglePowder36','독수리의 날개 가루',I+'bat_wing.png'],['forestSpirit36','숲의 정기',I+'manastone.png'],['wolfSoil36','늑대 도시의 흙',I+'ghost_dust.png'],
 ['fruit36','오당카에게 줄 던전 석류','assets/midterm/pomegranate.png'],['cauldron36','오당카의 마법 솥',I+'potion.png'],['transform36','아기 대지용 변신 물약',I+'potion.png'],['reagent36','칠리의 마법 시약',I+'ether.png']])item(id,name,icon);
 const row=(key,title,scene,npc,lines,extra={})=>({key,title,scene,npc,lines,...extra});
 Object.assign(x.npcs,{rio36:{name:'리오'},gold36:{name:'광산의 금덩이',artPath:I+'goldnugget.png',height:32},fruit36:{name:'던전 석류',artPath:'assets/midterm/pomegranate.png',height:34},festivalTrial36:{name:'축제 참가 자격 시험',artPath:'assets/white-wolf.png',height:65},festivalStage36:{name:'콜로세움의 빈 무대'}});
 const rows=[
 row('rio','학교 대표를 찾는 교장','lobby','rio36',[['rio36','교장 선생님이 너를 찾으셔. 축제에 관한 일인가 봐.']]),
 row('morris','먼저 도착한 초대장','principal','morris',[['morris','상점가 우체국에 네 이름으로 온 편지가 있단다. 읽고 돌아오너라.']]),
 row('mail','마법사의 도시에서 온 편지','shop','conrad',[['conrad','여기 축제 초대장이에요. 학교에서 선발한 대표가 준비한 마법을 선보이는 자리라고 하네요.']],{effect:s=>m.give(s,'festivalInvite36')}),
 row('representative','아르피아의 대표','principal','morris',[['morris','올해 학교 대표는 너다. 참가증을 가지고 글루글루를 만나거라.'],['you','모두 앞에서 시범을 보이는 거군요. 잘 준비하겠습니다.']],{effect:s=>{m.take(s,'festivalInvite36');m.give(s,'festivalPass36');}}),
 row('trialInfo','글루글루의 자격 확인','gluglutemple','gluglu',[['gluglu','도시 밖의 몬스터 스무 마리를 제압해 보게. 마법을 다루는 기본부터 확인하겠네.']]),
 row('trial','축제 준비 · 몬스터 20마리','forest','festivalTrial36',[['you','스무 마리를 제압하고 글루글루에게 돌아가자.']],{fixture:true,battle:'festivalTrial36'}),
 row('trialReport','시범 준비 허가','gluglutemple','gluglu',[['gluglu','실력은 확인했네. 샤이아에게 축제의 뜻을 듣고 어떤 마법을 선보일지 정하게.']]),
 row('meaning','축제를 여는 이유','shaiyatower','shaiya',[['shaiya','이 축제는 새로운 마법을 자랑하는 자리이기도 하지만, 어둠의 마법에 맞설 지식을 나누는 자리이기도 해요.']]),
 row('advice','이슈비케의 조언','library','ishubike',[['ishubike','아론 선생님과 상의해 보렴. 지금은 아수리아 왕국에 계실 거야.']]),
 row('aaron','마법 시범의 아이디어','asuria','aaron29',[['aaron29','화려한 불꽃이나 힘을 보여 주는 건 어떠니?'],['you','조금 더 특별한 마법을 해 보고 싶어요. 조커에게도 물어볼게요.']]),
 row('joker','아기 대지용으로 변신하기','magecity','joker',[['joker','용으로 변신해 보면 어떻겠나? 드래곤 발톱 가루, 독수리 날개 가루, 숲의 정기, 늑대 도시의 흙을 모아 오게.']]),
 row('leona','가루를 얻기 위한 금덩이','nymphen','leona',[['leona','드래곤의 발톱 가루가 필요하군요. 난쟁이 광산의 금덩이를 가져다주겠어요?']]),
 row('gold','광산 미로의 금덩이','minedepths','gold36',[['you','레오나에게 가져갈 금덩이를 찾았어.']],{fixture:true,effect:s=>m.give(s,'gold36')}),
 row('powder','드래곤의 발톱 가루','nymphen','leona',[['leona','금덩이는 잘 받았어요. 이 가루를 가져가세요.']],{requires:{gold36:1},effect:s=>{m.take(s,'gold36');m.give(s,'dragonPowder36');}}),
 row('shiva','독수리의 날개 가루','eaglevillage','shiva',[['shiva','축제에 나간다고? 내 날개에서 얻은 가루가 도움이 될 거야.']],{effect:s=>m.give(s,'eaglePowder36')}),
 row('odangka','숲의 정기','hut','odangka',[['odangka','학교 대표라니 기특하구나. 숲의 정기를 조금 나누어 주마.']],{effect:s=>m.give(s,'forestSpirit36')}),
 row('hunger','흙을 지키는 헝거','wolfcity31','hunger',[['hunger','변신 물약을 만들러 왔지? 조커와 이야기하는 걸 다 들었다!'],['you','그렇다면 흙을 나눠 줘.'],['hunger','먼저 내 상대가 되어 봐라!']],{battle:'wolfSoil36'}),
 row('soil','너무 순순한 선물','wolfcity31','hunger',[['hunger','좋다. 이 흙을 가져가라. 축제에서 꼭 써야 한다.'],['you','평소보다 순순한데… 일단 조커에게 돌아가자.']],{effect:s=>m.give(s,'wolfSoil36')}),
 row('mixInfo','재료를 합칠 마법 솥','magecity','joker',[['joker','재료가 다 모였군. 오당카의 마법 솥이 있어야 안전하게 합칠 수 있네.']]),
 row('potRequest','오당카가 좋아하는 석류','hut','odangka',[['odangka','솥을 빌려주마. 대신 학교 지하 던전에서 석류를 가져다주렴.']]),
 row('fruit','학교 지하의 석류','underpass','fruit36',[['you','잘 익은 석류야. 오당카에게 가져가자.']],{fixture:true,effect:s=>m.give(s,'fruit36')}),
 row('pot','빌린 마법 솥','hut','odangka',[['odangka','고맙구나. 솥은 조심해서 쓰고 꼭 돌려다오.']],{requires:{fruit36:1},effect:s=>{m.take(s,'fruit36');m.give(s,'cauldron36');}}),
 row('mix','첫 번째 변신 물약','magecity','joker',[['joker','재료를 솥에 넣고 마력을 섞겠네. 시범 전에 사람이 없는 콜로세움에서 먼저 시험해 보게.']],{requires:{dragonPowder36:1,eaglePowder36:1,forestSpirit36:1,wolfSoil36:1,cauldron36:1},effect:s=>{for(const id of ['dragonPowder36','eaglePowder36','forestSpirit36'])m.take(s,id);m.give(s,'transform36');}}),
 row('test','용이 아니라 고블린','arena','festivalStage36',[['narrator','물약을 마시자 몸이 변하기 시작했다. 하지만 날개도 용의 비늘도 생기지 않았다.'],['you','이건 고블린이잖아! 무슨 재료가 잘못된 거지?']],{fixture:true,requires:{transform36:1},effect:s=>{m.take(s,'transform36');s.festivalPoisoned36=true;}}),
 row('suspicion','늑대 도시의 흙','magecity','joker',[['joker','흙이 수상하군. 칠리의 마법 시약으로 검사해 보게.']]),
 row('reagent','칠리의 검사 시약','materials','chilli',[['chilli','남은 흙에 이 시약을 떨어뜨려라. 색이 변하면 오염된 것이다.']],{effect:s=>m.give(s,'reagent36')}),
 row('diagnosis','헝거가 놓은 함정','magecity','joker',[['narrator','시약을 떨어뜨린 흙이 붉게 변했다.'],['joker','마법 독에 중독됐어. 서둘러 치료하지 않으면 위험하네!'],['you','헝거가 일부러 준 흙이었어. 양호실로 가야겠어.']],{requires:{reagent36:1},effect:s=>m.take(s,'reagent36'),reward:100,ending:'학교 대표의 변신 시범 준비는 헝거의 함정 때문에 중단되었습니다. 양호실에서 해독 방법을 찾아야 합니다.'})
 ];
 // Readable phrases from 36.png are retained; connective lines are reconstruction.
 const captured={
 representative:[['morris','축제에서는 우리 학교에서 배운 마법을 여러 사람에게 보여 주게 될 게다.'],['you','제가 학교 대표라니… 친구들 몫까지 잘하고 싶어요.'],['morris','자, 여기에 우리 학교를 대표한다는 참가증을 준다.'],['morris','먼저 글루글루에게 참가 자격을 확인받고, 어떤 마법을 보여 줄지 차근차근 준비하거라.']],
 meaning:[['shaiya','축제는 남보다 강한 힘을 자랑하기 위해서만 여는 것이 아니에요.'],['shaiya','어둠의 마법이 새로 나타났을 때 그것을 막을 방법을 함께 찾는 것도 선한 마법사들의 일이죠.'],['you','그동안 연구한 마법을 보여 주고 서로 배우는 자리군요.'],['shaiya','그래요. 여러분의 시범도 누군가에게 새로운 생각을 줄 수 있어요.']],
 joker:[['you','불꽃을 크게 피우는 것 말고, 보는 사람도 놀랄 만한 마법을 해 보고 싶어요.'],['joker','그렇다면 아기 대지용으로 변신해 보면 어떻겠나?'],['you','제가 용이 된다고요? 그런 물약도 만들 수 있어요?'],['joker','드래곤의 발톱 가루, 독수리의 날개 가루, 숲의 정기, 늑대 도시의 흙이 필요하지. 레오나에게 줄 금덩이도 구해야 할 게야.'],['you','재료마다 도와줄 사람이 떠오르네요. 하나씩 찾아가 볼게요.']],
 odangka:[['you','학교 대표로 축제에 나가게 됐어요. 변신 물약에 숲의 정기가 필요하대요.'],['odangka','그 조커가 또 어려운 걸 시켰군.'],['you','이번에는 제가 하고 싶다고 했어요. 아기 대지용으로 변신해 볼 거예요.'],['odangka','자, 옛다. 재료를 아무렇게나 섞지는 말거라.']],
 hunger:[['hunger','아기 대지용이 되려고 늑대 도시의 흙을 구하러 왔지?'],['you','내가 올 줄 어떻게 알았어?'],['hunger','너와 조커가 이야기하는 걸 들었다. 내 땅의 흙을 그냥 가져갈 생각이냐?'],['you','조커와의 대화를 엿듣고 있었구나. 조금만 나눠 주면 되잖아.'],['hunger','말만 잘해서는 안 되지. 덤벼 봐라!']],
 soil:[['hunger','좋아. 여기 늑대 도시의 흙이다. 네 물약에 넣어라.'],['you','정말 주는 거야? 고마워.'],['hunger','케케케~~~'],['you','헝거가 날 기다리고 있었다니… 조커와 이야기할 때부터 엿듣고 있었나 봐. 웃는 것도 이상하네.']],
 potRequest:[['you','재료들을 융합하려면 할아버지의 마법 솥이 필요하대요.'],['odangka','그렇다면 던전 석류를 가져오너라. 입이 심심하구나.'],['you','던전 석류는 아르피아의 학교 지하 비밀 던전에 있으니, 그리로 가야겠다.']],
 pot:[['odangka','오~ 맛있는 던전 석류. 냠냠.'],['you','이제 솥을 빌려도 되죠?'],['odangka','가져가거라. 아주 오래 쓴 솥이니 일을 마치면 꼭 돌려다오.']],
 mix:[['joker','재료를 오당카의 솥에 넣고 조용한 곳에서 섞어 보게. 서두르면 마력이 한쪽으로 뭉칠 수 있어.'],['you','다 섞은 다음 바로 축제에서 마시면 될까요?'],['joker','먼저 콜로세움에서 시험해 보게. 아무도 없을 때 제대로 변신하는지 확인해야지.'],['you','시범 전에 연습부터 하는 거군요.']],
 diagnosis:[['narrator','칠리의 시약이 닿은 흙이 붉게 변했다.'],['you','흙에 독이 섞여 있었어! 헝거가 웃었던 건 이 때문이야.'],['joker','마법 중독이군. 그냥 두면 몸이 점점 쇠약해질 걸세.'],['you','이대로 축제를 기다릴 수는 없겠어요. 양호실로 가야겠어.']]
 };
 for(const r of rows)if(captured[r.key])r.lines=captured[r.key];
 const c=m.register(36,'마법사의 도시 축제 1부 · 마법 시범 준비',rows,{festivalKills36:0,festivalPoisoned36:false});
 x.encounters.festivalTrial36={name:'축제 자격 시험 · 몬스터 무리',bg:'assets/maps-hires/forest-battle.png',next:s=>s.festivalKills36>=20?c.keys.trialReport:c.keys.trial,xp:100,gold:30,sp:6,onWin:s=>s.festivalKills36=Math.min(20,s.festivalKills36+4),enemies:Array.from({length:4},(_,i)=>({name:'숲의 늑대',element:1,hp:420,maxHp:420,atk:19,atb:i*10,artPath:'assets/white-wolf.png',height:105}))};
 x.encounters.wolfSoil36={...x.encounters.hungerTrail35,next:c.keys.soil,allies:[],name:'늑대 도시의 흙 · 헝거',enemies:x.encounters.hungerTrail35.enemies.map(e=>({...e,hp:1600,maxHp:1600}))};
 const trial=x.encounters.festivalTrial36,pool=trial.enemies;
 trial.prepare=s=>({enemies:pool.slice(0,Math.max(1,Math.min(4,20-(s.festivalKills36||0))))});
 trial.onWin=(s,b)=>s.festivalKills36=Math.min(20,(s.festivalKills36||0)+b.enemies.filter(e=>e.hp<=0).length);
 trial.progress=s=>`몬스터 ${s.festivalKills36||0}/20마리`;
 const q=x.questItems;x.questItems=s=>[...q(s),...(s.stage===c.keys.trial?[['축제 참가 자격',`몬스터 ${s.festivalKills36}/20마리`]]:[]),...(s.festivalPoisoned36?[['마법 중독','변신 물약의 독을 치료해야 합니다.']]:[])];
})();
