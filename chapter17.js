/* Original event order: https://wonavy.tistory.com/214.
   Dialogue, combat balance and choices are reconstructed, not an original script dump. */
(()=>{
 const x=ARPIA_EXTRA,root='assets/midterm/',chapters=[];
 const inv=ARPIA_SYS.inv;
 const give=(s,id,n=1)=>inv.add(s,'mt_'+id,n),take=(s,id,n=1)=>inv.remove(s,'mt_'+id,n);
 const item=(id,name,desc,art)=>ARPIA_DATA.ITEMS['mt_'+id]={name,desc,kind:'quest',price:0,sell:0,icon:root+(art||id)+'.png'};
 item('letter','마틸다의 편지','데런 왕실 서재에 마법 백과사전을 부탁하는 편지','certificate');
 item('encyclopedia','왕실 마법 백과사전','마틸다에게 가져다줄 왕실 서재의 책');
 item('fairy-powder','요정의 발톱가루','레오나에게 받은 훌라 버섯 개화 재료');
 item('hula-gem','훌라보석','훌라 버섯을 제압한 자리에 남은 보석');
 item('plunger-wood','뚫어나무','더글라스의 뚫어뻥을 고칠 단단한 나무');
 item('pomegranate','석류','오당카에게 가져갈 선물');
 item('basic-certificate','마법 기초학 확인증','중간고사 첫 번째 과목 · 100점','certificate');
 Object.assign(x.defaults,{midtermRabbit:false,midtermBasicScore:0,midtermHolyKnown:false,midtermHulaKnown:false,midtermHulaWon:false});
 Object.assign(x.npcs,{
  laura:{name:'라우라',portrait:'other/라우라촌장.png'},
  hula17:{name:'훌라 버섯',artPath:root+'hula.png',height:62},
  hulaGem17:{name:'훌라보석',artPath:root+'hula-gem.png',height:35},
  pomegranate17:{name:'석류',artPath:root+'pomegranate.png',height:30}
 });
 Object.assign(x.npcs.quizpocket2,{artPath:root+'younger.png',height:57,portraitPath:root+'younger-large.png'});
 // Chapter 13's legacy portrait path points to a file not present in the archive.
 Object.assign(x.npcs.joker,{portraitPath:'assets/joker.png'});
 Object.assign(x.npcs.ryoma,{anim:'npc_011_도트_료마',portrait:'teacher/료마.png'});
 ARPIA_PORTRAITS.quizpocket2=root+'younger-large.png';

 // A small shared chapter adapter keeps rewards, dialog completion and reloads atomic.
 function register(number,title,steps,defaults={}){
  Object.assign(x.defaults,defaults);
  if(new Set(steps.map(r=>r.key)).size!==steps.length)throw Error('Duplicate chapter step key: '+number);
  const start=42+x.quests.length-1,end=start+steps.length;
  const keys=Object.fromEntries(steps.map((r,i)=>[r.key,start+i]));
  const chapter={number,title,start,end,steps,keys};chapters.push(chapter);
  x.quests.splice(start-42,1,...steps.map(r=>['제'+number+'화 · '+r.title,r.goal||(x.npcs[r.npc]?.name?(x.npcs[r.npc].name+(r.fixture?' 확인하기':' 만나기')):(r.title+' 진행하기')),r.scene,r.npc]),['제'+number+'화 완료 · '+title,'이번 이야기를 모두 마쳤습니다. 자유롭게 탐험할 수 있습니다.','campus','none']);
  x.chapters.push([start,end,'제'+number+'화 '+title]);
  const before=x.interact,decorate=x.decorate;
  x.decorate=(sc,s,n,p)=>{
   decorate(sc,s,n,p);
   const r=steps[s.stage-start];
   if(!r||r.scene!==sc.id||r.npc==='none')return;
   // Goal NPCs are placed on existing walkable nodes; map adoption handles tile maps.
   if(!sc.entities.some(e=>e.id===r.npc)){
    const pos=r.pos||sc.nodes[Math.min(2,sc.nodes.length-1)];
    sc.entities.push({...n(r.npc,pos[0],pos[1]),...(r.fixture?{type:'fixture'}:{})});
   }
  };
  x.interact=(e,a)=>{
   const s=a.state,at=s.stage,r=steps[at-start];
   if(!r||r.scene!==s.scene||r.npc!==e.id)return before(e,a);
   if(r.requires){const missing=Object.entries(r.requires).filter(([id,count])=>(s.inv['mt_'+id]||0)<count);if(missing.length){a.talk([['you',missing.map(([id,count])=>(ARPIA_DATA.ITEMS['mt_'+id]?.name||id)+' '+count+'개가 필요해.').join(' ')]]);return true;}}
   const complete=()=>{
    if(s.stage!==at)return; // repeated UI events cannot duplicate gifts or rewards
    r.effect?.(s,a);
    a.advance(at+1,r.reward??8);a.refresh();a.save();
    if(at+1===end)a.finish('제'+number+'화 완료 · '+title,r.ending||'시험을 마쳤습니다. 다음 이야기를 계속할 수 있습니다.');
   };
   const proceed=()=>{if(s.stage!==at)return;if(r.battle){r.beforeBattle?.(s,a);a.save();a.battle(r.battle);}else if(r.choose)a.choicePuzzle([...r.choose,'제'+number+'화 · '+title],complete);else complete();};
   a.talk(typeof r.lines==='function'?r.lines(s):r.lines,proceed);return true;
  };
  return chapter;
 }
 window.ARPIA_MIDTERM={register,chapters,give,take,item,root};
 const steps=[
  {key:'rabbit',title:'교장 선생님의 선물',scene:'principal',npc:'morris',lines:[['morris','그동안 여러 마을을 위해 애썼구나. 이 토끼를 너의 새 동료로 맡기마.'],['you','새 친구도 잘 돌볼게요. 감사합니다!'],['morris','곧 중요한 발표가 있다. 1층에 모인 친구들에게 가 보거라.']],effect:s=>{if(!s.midtermRabbit){ARPIA_SYS.pets.addPet(s,'rabbit');s.midtermRabbit=true;}}},
  {key:'announcement',title:'다섯 과목의 중간고사',scene:'lobby',npc:'ryoma',pos:[530,335],lines:[['ryoma','아르피아의 중간고사가 시작된다. 마법 기초학, 물약 조제, 던전 탐험, 마법 전투, 그리고 비밀 시험이다.'],['hina','다섯 과목이나? 먼저 어떤 시험인지 알아보자.'],['kesno','줄리아 선생님부터 찾아가면 되겠지?']]},
  {key:'basicInfo',title:'마법 기초학 안내',scene:'classroom',npc:'julia',pos:[420,290],lines:[['julia','주문과 마법 도구에 관한 지식을 확인할 거야. 문제는 퀴즈포켓이 내 준단다.'],['you','어떤 문제가 나올지 전부 준비해야겠네요.'],['julia','물약 시험은 칠리 선생님께 설명을 들으렴.']]},
  {key:'potionInfo',title:'난이도와 점수',scene:'materials',npc:'chilli',lines:[['chilli','조제서를 골라 재료를 모으고 물약을 만드는 시험이야. 어려운 약일수록 성공했을 때 점수도 높지.'],['hina','욕심만 내다가 실패하면 곤란하겠다.'],['chilli','맞아. 자기 실력을 알고 선택하렴. 다음은 나오미 선생님을 찾아가 봐.']]},
  {key:'dungeonInfo',title:'던전 탐험 안내',scene:'classroom',npc:'naomi',pos:[530,185],lines:[['naomi','던전에서는 길을 찾는 것뿐 아니라 위험을 판단하는 능력도 필요해. 동료의 목숨까지 책임지는 시험이야.'],['kesno','시험이라고 방심하면 안 되겠네.'],['naomi','마법 전투 안내는 콜로세움의 딕에게 받으렴.']]},
  {key:'battleInfo',title:'콜로세움의 시험',scene:'arena',npc:'dick',pos:[470,300],lines:[['dick','몬스터와 싸운다. 설명은 간단하지만 실전은 만만하지 않아. 마법과 펫을 잘 준비해 둬.'],['you','싸우는 순서와 속성도 생각해야겠군요.']]},
  {key:'secretInfo',title:'개인별 비밀 시험',scene:'principal',npc:'morris',lines:[['morris','마지막 시험은 각자의 능력에 맞추어 따로 내겠다. 무엇을 시험할지는 그때 알게 될 게다.'],['you','모두 똑같은 문제가 아니군요.'],['morris','마법사라면 배운 것을 스스로 활용할 줄 알아야 한다.']]},
  {key:'study',title:'수업을 놓친 친구들',scene:'lobby',npc:'kesno',pos:[470,335],lines:[['kesno','그동안 수업을 너무 많이 빠졌어. 마법 백과사전이라도 읽어야겠는데.'],['hina','우리도 다른 마을에 다녀오느라 놓친 수업이 많잖아.'],['you','도서관에서 책을 빌려 올게. 같이 준비하자.']]},
  {key:'library',title:'한발 늦은 대출',scene:'library',npc:'meli',lines:[['meli','마법 백과사전은 소피아가 먼저 빌려 갔어요. 남은 책이 없네요.'],['you','시험 전까지 읽어야 하는데… 다른 방법이 없을까요?'],['meli','마틸다가 왕실 서재 이야기를 하던데 한번 물어보세요.']]},
  {key:'letter',title:'마틸다의 부탁',scene:'library',npc:'matilda',pos:[365,335],lines:[['matilda','데런 왕실 서재에도 그 책이 있어. 내 편지를 세자르 3세께 전해 줘.'],['you','가져오면 나도 읽을 수 있지?'],['matilda','내가 먼저 읽고 빌려줄게. 서둘러 다녀와.']],effect:s=>give(s,'letter')},
  {key:'royalBook',title:'왕실 서재의 백과사전',scene:'kingdom',npc:'caesar',lines:[['caesar','마틸다가 시험 공부에 필요한 책을 부탁했구나. 이 백과사전을 전해 주거라.'],['you','편지는 여기 있어요. 책은 조심히 가져가겠습니다.']],effect:s=>{take(s,'letter');give(s,'encyclopedia');}},
  {key:'returnBook',title:'먼저 읽겠다는 약속',scene:'library',npc:'matilda',pos:[365,335],lines:[['matilda','고마워. 이제 내가 읽을 차례야. 다 읽고 나면 빌려줄게.'],['you','시험까지 얼마 안 남았는데… 기다릴 수밖에 없나?']],effect:s=>take(s,'encyclopedia')},
  {key:'isaacHint',title:'아이작의 묘안',scene:'campus',npc:'isaac',pos:[610,316],lines:[['isaac','책만 보고 준비할 필요는 없지! 조지 아저씨께 가 봐. 재미있는 걸 아셔.'],['you','이번에는 믿어도 되는 정보겠지?']]},
  {key:'twins',title:'같은 문제를 내는 쌍둥이',scene:'campus',npc:'george',lines:[['george','퀴즈포켓은 사실 쌍둥이란다. 형과 동생은 반드시 똑같은 질문을 하지.'],['you','동생의 문제를 알면 시험 준비에 도움이 되겠네요.'],['george','어디 있는지는 더글라스가 알 게다.']]},
  {key:'brokenPlunger',title:'부러진 뚫어뻥',scene:'bathroom',npc:'douglas',lines:[['douglas','동생의 위치? 그 전에 이것 좀 봐. 뚫어뻥 자루가 부러졌어.'],['douglas','대지 마을의 뚫어나무가 있어야 고칠 수 있지. 구해 오면 알려주마.'],['you','라우라 촌장님께 여쭤볼게요.']]},
  {key:'lauraRequest',title:'훌라 버섯을 피워라',scene:'earthvillage',npc:'laura',pos:[355,592],lines:[['laura','뚫어나무는 귀한 물건이다. 훌라 버섯을 피워 보석을 가져온다면 나무를 주마.'],['you','버섯을 피우는 마법이라면 조커님이 아실까요?'],['laura','그 조커도 포기한 일이니 만만하게 생각하지는 말거라.']]},
  {key:'hulaMethod',title:'조커가 포기한 이유',scene:'magecity',npc:'joker',pos:[310,375],lines:[['joker','피우는 방법은 안다. 먼저 주문을 외우고 요정의 발톱가루를 뿌려라.'],['you','그럼 가루만 구하면 되겠네요?'],['joker','방법을 안다고 끝나는 일이 아니라니까! 가루는 님펜의 레오나에게 물어봐.']],effect:s=>s.midtermHulaKnown=true},
  {key:'powder',title:'요정의 발톱가루',scene:'nymphen',npc:'leona',pos:[596,206],lines:[['leona','조커에게 주문을 배웠군요. 이 가루를 쓰세요. 훌라 버섯이 깨어난 뒤에도 조심해야 해요.'],['you','먼저 주문, 그다음 가루. 잘 기억해 둘게요.']],effect:s=>give(s,'fairy-powder')},
  {key:'bloom',title:'훌라 버섯의 개화',scene:'earthvillage',npc:'hula17',pos:[530,700],fixture:true,lines:[['narrator','숲 가장자리의 훌라 버섯이 잠들어 있다. 조커에게 배운 방법을 떠올렸다.'],['you','차근차근 순서대로 해 보자.']],choose:['훌라 버섯을 피우는 순서','조커에게 배운 방법을 고르세요.',['찬물을 붓고 기다린다','주문을 외운 뒤 요정의 발톱가루를 뿌린다','보석을 먼저 꺼낸다'],1,'조커는 주문 뒤에 요정의 발톱가루를 쓰라고 했습니다.'],effect:s=>take(s,'fairy-powder')},
  {key:'hulaFight',title:'깨어난 훌라 버섯',scene:'earthvillage',npc:'hula17',pos:[530,700],fixture:true,lines:[['narrator','갓의 무늬가 빛나더니 훌라 버섯이 거칠게 몸을 일으켰다.'],['you','조커님이 포기한 건 이 때문이었구나!']],battle:'midtermHula17'},
  {key:'hulaGem',title:'버섯이 남긴 보석',scene:'earthvillage',npc:'hulaGem17',pos:[530,700],fixture:true,lines:[['narrator','훌라 버섯이 물러난 자리에 옅은 노란빛의 보석이 남았다.'],['you','이제 라우라 촌장님께 가져가자.']],effect:s=>give(s,'hula-gem')},
  {key:'wood',title:'뚫어나무와 교환',scene:'earthvillage',npc:'laura',pos:[355,592],lines:[['laura','정말 훌라보석을 가져왔구나. 약속한 뚫어나무다. 더글라스에게 전해 주렴.'],['you','직접 해 보니 왜 어려운 일인지 알겠어요.']],effect:s=>{take(s,'hula-gem');give(s,'plunger-wood');}},
  {key:'location',title:'오당카의 퀴즈포켓',scene:'bathroom',npc:'douglas',lines:[['douglas','이 나무라면 튼튼하겠어. 퀴즈포켓 동생은 오당카의 오두막에 있다.'],['douglas','가는 길에 석류도 하나 챙겨 가거라. 오당카가 좋아할 게야.'],['you','고장 난 뚫어뻥도 고치고, 단서도 찾았네요!']],effect:s=>take(s,'plunger-wood')},
  {key:'fruit',title:'오두막에 가져갈 선물',scene:'hut',npc:'pomegranate17',pos:[420,410],fixture:true,lines:[['narrator','오두막으로 가는 길에서 잘 익은 석류를 하나 챙겼다.'],['you','더글라스 아저씨가 말씀하신 선물이야.']],effect:s=>give(s,'pomegranate')},
  {key:'younger',title:'동생의 어려운 문제',scene:'hut',npc:'quizpocket2',lines:[['quizpocket2','문제를 뽑으세요! 대륙 너머 신성 기사단이 사용하는 홀리 라이트의 시전 방법은?'],['you','처음 듣는 마법이야… 어떻게 쓰는 거지?'],['odangka','그 문제라면 내가 알고 있지. 가져온 것은 무엇이냐?']]},
  {key:'holyLesson',title:'석류와 홀리 라이트',scene:'hut',npc:'odangka',lines:[['odangka','석류를 가져왔구나. 답을 알려주마. 허공에 십자가를 그리고 성모의 눈물을 뿌린다.'],['odangka','그다음 산티아고 콤스텔로지아 홀리 라이트, 성스러운 빛이여 타올라라, 하고 외우는 게다.'],['you','십자가, 성모의 눈물, 그리고 홀리 라이트 주문. 잊지 않을게요.']],effect:s=>{take(s,'pomegranate');s.midtermHolyKnown=true;}},
  {key:'examStart',title:'첫 번째 시험 시작',scene:'classroom',npc:'julia',pos:[420,290],lines:[['hina','문제가 너무 어려워! 내가 아는 게 하나도 안 나왔어.'],['julia','다음은 {name}. 준비가 됐다면 퀴즈포켓에게 가렴.'],['you','직접 알아본 것들을 침착하게 떠올리자.']]},
  {key:'holyQuestion',title:'홀리 라이트의 시전',scene:'classroom',npc:'quizpocket',pos:[610,290],lines:[['quizpocket','홀리 라이트를 사용하는 방법을 순서대로 말해 보세요.'],['you','오당카에게 배운 바로 그 문제야.']],choose:['마법 기초학 · 홀리 라이트','시전 순서로 맞는 것을 고르세요.',['원 그리기 → 요정의 발톱가루 → 개화 주문','십자가 그리기 → 성모의 눈물 → 홀리 라이트 주문','성모의 눈물 → 불꽃으로 가열 → 냉기 주문'],1,'오당카의 설명: 먼저 허공에 십자가를 그립니다.']},
  {key:'bonusQuestion',title:'형의 추가 질문',scene:'classroom',npc:'quizpocket',pos:[610,290],lines:[['quizpocket','정답입니다만… 이상하군요. 하나 더! 훌라 버섯은 어떻게 피웁니까?'],['you','그건 직접 해 봤어요. 깨어난 뒤 공격해 오는 것도요!']],choose:['마법 기초학 · 추가 문제','훌라 버섯을 피우는 데 필요한 것은?',['얼음과 강화 마나스톤','석류와 성모의 눈물','개화 주문과 요정의 발톱가루'],2,'조커에게 주문을 배우고 레오나에게 재료를 받았습니다.']},
  {key:'certificate',title:'마법 기초학 100점',scene:'classroom',npc:'julia',pos:[420,290],lines:[['julia','정답이야. 마법 기초학은 100점! 여기 시험 확인증을 받으렴.'],['you','멀리 다녀온 경험이 정말 도움이 됐어요!'],['julia','배운 것을 실제로 이해하는 일이 중요하지. 다음은 칠리 선생님의 마법약 시험이야.']],effect:s=>{s.midtermBasicScore=100;give(s,'basic-certificate');},reward:50,ending:'홀리 라이트와 훌라 버섯 문제를 풀어 마법 기초학 100점을 받았습니다. 이어서 제18화 마법약 시험이 시작됩니다.'}
 ];
 // Source: user capture 17.png. Unchanged scenes already agree with the captured sequence.
 const captured17={
  announcement:[['ryoma','흠! 흠! 모두 조용히. 중간고사 일정을 발표하겠다.'],['hina','벌써 중간고사라고?'],['kesno','그동안 수업을 얼마나 빠졌는데…'],['ryoma','마법 기초학, 마법약 조제, 던전 탐험, 마법 전투, 그리고 개인별 시험이다. 담당 선생님께 자세한 안내를 받도록.']],
  basicInfo:[['julia','퀴즈포켓은 마력을 지니고 있는 신성한 포켓이지. 그 안에 손을 넣으면 마법 기초학에 대한 질문을 받게 돼.'],['you','어떤 질문이 나올지는 미리 알 수 없는 거군요.'],['julia','수업에서 배운 것을 차근차근 떠올려 보렴. 첫 시험을 통과하고 나서 마법약 조제 시험을 받으면 돼.']],
  royalBook:[['you','마틸다 공주님의 편지를 전하러 왔습니다. 받아 주시겠어요?'],['narrator','편지에는 중간고사를 준비할 책이 없으니 왕실 서재에서 빌려 달라는 부탁이 적혀 있었다. 끝에는 책을 편지 배달 심부름꾼에게 주라는 말도 덧붙어 있었다.'],['caesar','마틸다가 공부할 책이 필요하다는군. 이 마법 백과사전을 전해 주게.'],['you','저도 읽어야 하는데… 우선 약속대로 공주님께 가져가겠습니다.']],
  returnBook:[['matilda','그 책 맞아. 여기 줘.'],['you','왕국까지 다녀왔으니 이제 저도 같이 봐도 되죠?'],['matilda','내가 먼저 읽어야지. 다 읽으면 빌려줄게.'],['you','시험은 곧인데… 알겠어요. 마틸다 공주님.'],['narrator','책을 구해 왔는데도 정작 읽을 수가 없었다. 다른 방법을 찾아야 했다.']],
  brokenPlunger:[['douglas','퀴즈포켓 동생 말이지? 그 전에 곤란한 일이 생겼어.'],['narrator','더글라스가 중간이 부러진 뚫어뻥 자루를 들어 보였다.'],['douglas','얼마 전 잘못 눌렀다가 부러졌지 뭐야. 대지 마을의 뚫어나무라면 튼튼하게 고칠 수 있을 텐데.'],['you','나무를 가져오면 동생이 어디 있는지 알려 주시는 거죠?']],
  powder:[['leona','요정의 발톱가루라면 잠깐만 기다려요.'],['narrator','레오나는 발톱을 조금 갈아 작은 봉지에 담았다.'],['leona','자, 다 됐어요. 훌라 버섯을 피울 때 살살 뿌려 주세요.'],['you','지금 바로 만드신 거예요? 감사합니다. 주문 다음에 가루를 쓰는 거였죠.']],
  hulaGem:[['you','정말 세구나. 겨우 이겼네.'],['narrator','버섯이 몸을 웅크린 자리에서 노란빛 훌라보석을 얻었다.'],['you','버섯인 줄만 알았는데 아주 거친 몬스터였잖아. 조커가 끝까지 설명해 줬으면 좋았을 텐데!']],
  fruit:[['narrator','대지 마을 던전의 가지 끝에 잘 익은 석류가 남아 있었다.'],['you','오당카에게 드릴 선물은 이걸로 됐어. 이번에는 문제의 답을 꼭 알아내야 해.']],
  holyLesson:[['you','할아버지, 일단 이것부터 드세요. 석류를 가져왔어요.'],['odangka','흠, 좋아. 아까 퀴즈포켓이 낸 문제를 다시 말해 보거라.'],['you','다른 나라의 신성 기사단에서 쓰는 홀리 라이트를 어떻게 해야 하냐고 했어요.'],['odangka','허공에 십자가를 긋고, 성모의 눈물을 뿌린 다음 주문을 외우는 거다.'],['odangka','산티아고 콤스텔로지아 홀리 라이트. 성스러운 빛이여 타올라라.'],['you','순서를 잘 기억해야겠어요. 십자가, 성모의 눈물, 그리고 주문.']]
 };
 for(const step of steps)if(captured17[step.key])step.lines=captured17[step.key];
 for(const key of ['bloom','hulaFight','hulaGem','fruit']){const r=steps.find(r=>r.key===key);r.scene='earthdungeon';delete r.pos;}
 const c=register(17,'아르피아 중간고사 · 첫 번째 시험',steps);
 x.encounters.midtermHula17={name:'깨어난 훌라 버섯',bg:'assets/maps-hires/forest-battle.png',intro:'개화한 훌라 버섯이 공격합니다. 대지 속성에 맞춰 마법을 선택하세요.',next:c.keys.hulaGem,setFlag:'midtermHulaWon',xp:170,gold:90,sp:35,enemies:[{name:'훌라 버섯',element:2,hp:490,maxHp:490,atk:20,atb:15,sprite:'midtermHula',artPath:root+'hula-large.png',height:158}]};
 for(const [mood,texts]of Object.entries({happy:['새 친구도 잘 돌볼게요. 감사합니다!','멀리 다녀온 경험이 정말 도움이 됐어요!'],sad:['시험까지 얼마 안 남았는데… 기다릴 수밖에 없나?'],surprised:['조커님이 포기한 건 이 때문이었구나!','처음 듣는 마법이야… 어떻게 쓰는 거지?'],determined:['차근차근 순서대로 해 보자.','직접 알아본 것들을 침착하게 떠올리자.']}))for(const text of texts)ARPIA_HERO_ART.annotations.set(text,mood);
})();
