/* Chapter 13: 웨일라 특선. Plot order: https://wonavy.tistory.com/211 */
(()=>{
 const x=ARPIA_EXTRA,prior=x.interact,decorate=x.decorate,items=x.questItems;
 Object.assign(x.defaults,{sunnyLetter:false,scollGift:false,recipeBook:false,soySauce:false,peaceFire:false,cookingPot:false,caveCrab:false,soyCrabDish:false,dishAging:false,dishStolen:false,dishRecovered:false,crabLeg:false,sunnyCured:false});
 Object.assign(x.npcs,{
  rudolph:{name:'루돌프',portrait:'other/루돌프.png'},meli:{name:'멜리',anim:'npc_038_도트_멜리',portrait:'worker/멜리.png'},joker:{name:'조커',portrait:'other/조커.png'},
  sunny:{name:'써니',anim:'npc_008_도트_나오미',portraitPath:'assets/sunny.webp'},soyjar:{name:'500년 묵은 간장 항아리',artPath:'assets/soy-jar.png'},peacefire:{name:'평온의 불',artPath:'assets/peace-fire.png'},
  cookingpot:{name:'쥬다의 큰 솥',artPath:'assets/cooking-pot.png'},cavecrab13:{name:'학교 지하의 큰 게',artPath:'assets/cave-crab.png',height:72},agingroom:{name:'숙성할 바위방'}
 });
 const rows=[
  ['오당카의 특별한 솜씨','principal','morris','오당카는 마법뿐 아니라 웨일라에서 손꼽히는 요리사란다. 특별한 요리로 누군가를 도울 수 있을지 물어보렴.'],
  ['기분이 좋지 않은 요리사','hut','rudolph','오늘 오당카 님은 귀족들의 무례한 부탁 때문에 무척 화가 나셨어. 조심해서 이야기해.'],
  ['거절당한 부탁','hut','odangka','귀족들을 위한 요리는 만들지 않겠다. 모리스에게 미안하다고 전해라.'],
  ['교장 선생님의 다른 길','principal','morris','아쉽지만 억지로 시킬 수는 없지. 밖에 아이작이 기다리니 무슨 소식인지 들어 보렴.'],
  ['아이작의 실수와 소식','principal','isaac','교장 선생님의 십자수를 태워서 혼날 참이야… 그런데 콘라드 아저씨가 널 찾으셔.'],
  ['아수리아에서 온 편지','shop','conrad','아수리아의 써니가 오당카의 요리를 꼭 먹고 싶다며 보낸 편지란다. 직접 전해 주겠니?'],
  ['스콜의 작은 부탁','shop','scoll','아수리아로 가는 길이라면 이 선물을 카디쟈에게 전해 주겠니? 이번 한 번만 부탁하마.'],
  ['카디쟈에게 전한 선물','cardiahome','cardia','직접 가져온 네 정성을 생각해 이번에는 받겠습니다. 스콜 선생님께도 내 뜻을 존중해 달라고 전해 주세요.'],
  ['감기에 걸린 써니','asuria','sunny','콜록… 오당카 님의 요리라면 기운을 되찾을 것 같아 편지를 보냈어요. 무리한 부탁이라면 미안해요.'],
  ['마음을 움직인 편지','hut','odangka','아픈 백성의 부탁이라면 이야기가 다르지. 간장게장을 만들겠다. 먼저 도서관에서 「웨일라 특선」을 빌려 와라.'],
  ['웨일라 특선','library','meli','이 책을 쓴 사람이 바로 오당카 님이에요. 오래된 조리법까지 꼼꼼히 기록돼 있답니다.'],
  ['기분이 풀린 오당카','hut','rudolph','책을 구했다는 말을 듣고 오당카 님이 웃으셨어. 안으로 들어가 봐!'],
  ['첫 재료, 500년 간장','hut','odangka','책에 적힌 간장은 학교 지하 코볼트 방에 숨겨 뒀다. 항아리가 많으니 코볼트가 좋아하는 숫자 9와 4를 기억해라.'],
  ['코볼트의 숫자','koboldroom','kobold','간장 항아리 말이오? 내가 좋아하는 숫자는 9와 4요. 두 숫자가 표시된 항아리를 찾아보시오.'],
  ['94번 항아리','koboldroom','soyjar','퍼즐'],
  ['평온의 불','firevillage','elder','요리가 타지 않게 오래 유지되는 평온의 불을 나누어 주마. 조심해서 가져가거라.'],
  ['쥬다의 큰 솥','judah','abdullah','오당카의 요리라면 이 묵직한 솥을 빌려드리겠소. 완성되면 맛을 조금 보여 주시오.'],
  ['게를 찾는 조커의 힌트','magecity','joker','게는 물가에만 산다는 생각을 버려. 학교 지하의 축축한 창고를 찾아보라고.'],
  ['학교 지하의 큰 게','basement','cavecrab13','전투'],
  ['간장게장 만들기','hut','odangka','간장, 평온의 불, 솥, 큰 게가 모두 모였군. 내가 조리하는 동안 밖의 몬스터를 정리해라.'],
  ['요리가 익는 동안','ghostforest','waitmonsters13','전투'],
  ['광산의 숙성 방','minedepths','guillaume','오당카의 팬인 내가 금을 요구할 리 없지! 서늘한 안쪽 바위방에서 숙성시키게.'],
  ['게장을 내려놓다','minedepths','agingroom','간장게장 항아리를 서늘한 바위방에 조심스럽게 내려놓았다.'],
  ['사라진 간장게장','hut','rudolph','누군가 협박해서 숙성 장소를 말해 버렸어. 미안해! 서둘러 광산으로 가 봐.'],
  ['에드워드가 가져간 요리','minedepths','guillaume','에드워드 경이 왕국으로 가져갔네. 되찾아 오면 게장 뒷다리 하나만 나눠 주게.'],
  ['왕국의 책임','kingdom','caesar','내 기사가 잘못했군. 에드워드와 정정당당히 대련해 이기면 즉시 돌려주게 하겠다.'],
  ['에드워드와의 대련','royalarena','edward','전투'],
  ['되찾은 간장게장','hut','odangka','요리는 무사하군. 이제 약속한 몫을 기욤에게 주고 써니에게 전해라.'],
  ['기욤과의 약속','minedepths','guillaume','역시 오당카의 간장게장이군! 약속한 뒷다리만 받고 나머지는 잘 포장해 주겠네.'],
  ['써니에게 전한 웨일라의 맛','asuria','sunny','따뜻하고 깊은 맛이에요… 신기하게도 기침도 멎었어요. 모두에게 정말 고맙다고 전해 주세요!']
 ];
 const start=211,end=start+rows.length;
 x.quests.splice(169,1,...rows.map(([title,scene,id])=>['제13화 · '+title,(x.npcs[id]?.name||title)+' 만나기',scene,id]),['제13화 완료 · 웨일라 특선','오당카의 요리로 써니가 건강을 되찾았습니다.','campus','none']);
 x.chapters.push([start,end,'제13화 웨일라 특선']);
 x.encounters.cavecrab13={name:'지하의 큰 게',bg:'assets/maps-hires/basement-open.webp',intro:'간장게장의 주재료가 될 큰 게가 집게를 세웁니다.',next:230,setFlag:'caveCrab',xp:175,gold:90,sp:45,enemies:[{name:'백년 동굴게',element:2,hp:520,maxHp:520,atk:21,atb:8,sprite:'caveCrab'}]};
 x.encounters.waitmonsters13={name:'오두막 주변 소탕',bg:'assets/maps-hires/forest-battle.webp',intro:'요리가 완성되는 동안 주변 몬스터를 물리칩니다.',next:232,setFlag:'soyCrabDish',xp:150,gold:80,sp:35,enemies:[{name:'숲의 애플링',element:2,hp:215,maxHp:215,atk:16,atb:12,sprite:'appling'},{name:'그림자 정령',element:0,hp:190,maxHp:190,atk:17,atb:0,sprite:'shadow'}]};
 x.encounters.edward13={name:'왕국 기사 에드워드',bg:'assets/maps-hires/colosseum.webp',intro:'간장게장을 되찾기 위한 정정당당한 대련입니다.',next:238,setFlag:'dishRecovered',xp:210,gold:120,sp:55,enemies:[{name:'에드워드 경',element:0,hp:680,maxHp:680,atk:23,atb:18,sprite:'edward13'}]};
 x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);if(s.stage<start)return;
  if(sc.id==='principal'&&s.stage===215)sc.entities.push(n('isaac',520,260));if(sc.id==='shop'&&s.stage===217)sc.entities.push(n('scoll',525,310));if(sc.id==='magecity'&&s.stage===228)sc.entities.push(n('joker',470,250));
  if(sc.id==='hut')sc.entities.push(n('rudolph',380,330));if(sc.id==='library')sc.entities.push(n('meli',440,280));if(sc.id==='asuria')sc.entities.push(n('sunny',314,375));
  if(sc.id==='koboldroom'&&s.stage===225)sc.entities.push({...n('soyjar',650,252),type:'fixture'});if(sc.id==='firevillage'&&s.stage===226)sc.entities.push({...n('peacefire',397,466),type:'fixture'});
  if(sc.id==='judah'&&s.stage===227)sc.entities.push({...n('cookingpot',420,215),type:'fixture'});if(sc.id==='basement'&&s.stage===229)sc.entities.push(n('cavecrab13',445,285));
  if(sc.id==='ghostforest'&&s.stage===231)sc.entities.push(n('waitmonsters13',600,340));if(sc.id==='minedepths'&&s.stage===233)sc.entities.push({...n('agingroom',700,340),type:'fixture'});
  if(sc.id==='royalarena'&&s.stage===237&&!sc.entities.some(e=>e.id==='edward'))sc.entities.push(n('edward',610,330));
 };
 x.questItems=s=>[...items(s),...(s.sunnyLetter?[['써니의 편지','오당카의 요리를 부탁하는 아수리아의 편지']]:[]),...(s.scollGift?[['스콜의 선물','카디쟈에게 전할 작은 꾸러미']]:[]),...(s.recipeBook?[['웨일라 특선','오당카가 직접 쓴 요리책']]:[]),...(s.soySauce?[['500년 묵은 간장','94번 항아리에서 찾은 간장']]:[]),...(s.peaceFire?[['평온의 불','오랫동안 일정하게 타는 불꽃']]:[]),...(s.cookingPot?[['쥬다의 큰 솥','압둘라가 빌려준 조리 도구']]:[]),...(s.caveCrab?[['백년 동굴게','학교 지하에서 구한 주재료']]:[]),...(s.soyCrabDish?[['오당카의 간장게장','써니에게 전할 특별한 요리']]:[])];
 x.interact=(e,a)=>{const s=a.state,i=s.stage-start,r=rows[i];if(!r||r[1]!==s.scene||r[2]!==e.id)return prior(e,a);
  if(r[3]==='전투'){a.battle(e.id==='edward'?'edward13':e.id);return true;}
  if(r[3]==='퍼즐'){a.choicePuzzle(['94번 항아리','코볼트가 좋아하는 두 숫자를 차례로 누르면?', ['49','94','99'],1,'코볼트가 말한 순서는 9, 4였다.'],()=>{s.soySauce=true;a.advance(s.stage+1,15);a.refresh();a.save();});return true;}
  a.talk([[e.id==='agingroom'?'narrator':e.id,r[3]],['you',i===29?'정말 다행이에요. 오당카 님께 꼭 전할게요!':'알겠어요. 다음 준비도 서두를게요.']],()=>{
   const q=s.stage,flags={216:'sunnyLetter',217:'scollGift',221:'recipeBook',226:'peaceFire',227:'cookingPot',233:'dishAging',234:'dishStolen',239:'crabLeg',240:'sunnyCured'};if(flags[q])s[flags[q]]=true;
   if(q===218)s.scollGift=false;if(q===220)s.sunnyLetter=false;if(q===230){s.soySauce=false;s.peaceFire=false;s.cookingPot=false;s.caveCrab=false;}if(q===238)s.dishStolen=false;if(q===239)s.crabLeg=false;if(q===240)s.soyCrabDish=false;
   a.advance(q+1,q===240?50:10);a.refresh();a.save();if(q===240)a.finish('제13화 완료 · 웨일라 특선','오당카의 간장게장을 되찾아 써니에게 전했습니다. 웨일라 최고의 맛이 아픈 마음까지 위로했습니다.');
  });return true;
 };
})();
