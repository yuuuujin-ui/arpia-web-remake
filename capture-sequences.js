/* Corrections from the user's original captures, 2026-09-22.
   Applied before registration so quests, chapter ranges and battle destinations agree. */
(()=>{
 const m=ARPIA_MIDTERM,x=ARPIA_EXTRA,register=m.register;
 const edit=(rows,key,patch)=>Object.assign(rows.find(r=>r.key===key),patch);
 const after=(rows,key,...added)=>rows.splice(rows.findIndex(r=>r.key===key)+1,0,...added);
 m.register=(number,title,rows,defaults={})=>{
  if(number===18){
   edit(rows,'golem',{title:'아이스 골렘 열 마리',goal:'얼음 던전에서 아이스 골렘 10마리 제압하기',lines:[['you','얼음 한 조각을 받으려면 골렘 열 마리를 물리쳐야 해. 남은 수를 확인하면서 싸우자.']]});
  }
  if(number===19){
   after(rows,'assemble',{key:'edwardChallenge',title:'출발 전 에드워드와의 대결',scene:'royalarena',npc:'edward',pos:[535,402],lines:[['isaac','시험 장소도 알아냈는데 이 정도 대결은 금방 끝낼 수 있겠죠?'],['edward','자신감만으로 던전에 들어가면 위험합니다. 함께 싸우는 준비가 되었는지 보여 주세요.'],['you','대결을 마치면 바로 폭포로 가자.']],battle:'edwardDive19'});
  }
  if(number===20){
   edit(rows,'beginner',{title:'초급 시험 · 첫 번째 조'});
   after(rows,'beginner',...['두 번째','세 번째'].map((label,i)=>({key:'beginner'+(i+2),title:'초급 시험 · '+label+' 조',scene:'arena',npc:'dick',pos:[470,300],lines:[['dick','다음 조다. 세 몬스터의 공격 순서를 살펴라.']],battle:'examBeginner'+(i+2)+'20'})));
   edit(rows,'golem',{title:'특별 단계 · 아이스 골렘 세 마리',lines:[['you','이번에는 세 마리가 함께 있어. 한 마리씩 상대하며 빈틈을 만들자.']]});
  }
  if(number===24){
   const at=rows.findIndex(r=>r.key==='capture'),r=rows[at];
   rows.splice(at,0,{key:'glugluBattle',title:'체포에 저항하는 글루글루',scene:r.scene,npc:r.npc,pos:r.pos,lines:[['gluglu','나는 함정을 쫓고 있었다. 여기서 잡혀 갈 수는 없다!'],['ryoma','일단 멈추십시오. 교장 선생님 앞에서 해명하셔야 합니다.'],['you','도망치지 못하도록 먼저 힘을 빼야겠어.']],battle:'glugluArrest24'});
  }
  if(number===26){
   edit(rows,'billy',{lines:[['billy26','장작을 구하고, 마을 근처 몬스터 다섯 마리를 쫓고, 코비에게 철광석을 받아 오너라. 그러면 랄라 열매가 있는 곳을 알려주마.']]});
   edit(rows,'monster',{title:'길목의 몬스터 다섯 마리',goal:'불꽃 마을 길목의 몬스터 5마리 제압하기'});
   edit(rows,'shareFruit',{scene:'magecity',pos:[510,465]});
   edit(rows,'bandFight',{scene:'palacechamber',pos:[665,430]});
   edit(rows,'rightRoom',{lines:[['guillaume','약속한 세 개가 맞군. 난쟁이 궁전 미로를 지나 오른쪽 끝 다이아몬드 문 안을 찾아보게. 밴드를 두른 두더지가 숨어 있더군.'],['you','광산 미로보다 더 안쪽이네요. 우가우가에게 무사히 데려갈게요.']],effect:s=>{m.take(s,'gold26',3);s.bandMoleRoomKnown26=true;}});
  }
  if(number===27)edit(rows,'waterfall',{npc:'emptyWaterfallAudit',fixture:true});
  if(number===28){
   edit(rows,'matilda',{scene:'campus',pos:[610,316]});
   edit(rows,'caesar',{npc:'edward',pos:[342,304],lines:[['edward','두 분을 수색하러 간다고 들었습니다. 왕국에서 준비한 마법 물약입니다. 구조한 분께 필요하면 쓰십시오.']]});
   edit(rows,'waterfall',{npc:'emptyWaterfallAudit',fixture:true});
   const places=[14,6,29,15,10],base=rows.find(r=>r.key==='underwater');
   const searches=places.map((room,i)=>({key:i?'underwater'+(i+1):'underwater',title:'수중 던전 수색 · '+(i+1)+'/5',scene:room===14?'divehall':'diveroom'+room,npc:'emptyDive28',pos:room===14?[637,576]:[500,420],fixture:true,lines:[['narrator','방 안과 벽 뒤를 살폈지만 두 사람의 흔적은 없었다.'],['matilda',i===4?'다섯 방을 모두 확인했어. 우선 폭포 밖으로 돌아가자.':'다음 방도 살펴보자. 아직 수색이 끝나지 않았어.']],effect:s=>s.searchRooms28=(s.searchRooms28||0)|(1<<i)}));
   rows.splice(rows.indexOf(base),1,...searches);
   edit(rows,'jackal',{scene:'dwarfpalace',pos:[315,255]});
   for(const key of ['door','clueA','clueB','riddle'])edit(rows,key,{scene:'dwarfpalace'});
   edit(rows,'door',{pos:[635,255]});edit(rows,'riddle',{pos:[635,255]});
   edit(rows,'clueA',{pos:[315,255]});edit(rows,'clueB',{pos:[555,470]});
   edit(rows,'snakes',{scene:'palacechamber',pos:[530,235]});
   edit(rows,'dobiel',{scene:'palacechamber',pos:[665,430],requires:{potion28:1}});
  }
  if(number===29)edit(rows,'yard',{title:'저택 주변 몬스터 열 마리',goal:'큐리어스 저택 주변 몬스터 10마리 제압하기'});
  if(number===30){
   edit(rows,'mail',{scene:'shop',pos:[513,380]});
   edit(rows,'dobiel',{lines:[['dobiel','낯선 짐승은 던전에 들어갈 수 없습니다. 돌아가세요.'],['you','말로 설명할 수가 없어. 물보라 뒤의 좁은 길로 돌아가 보자.']]});
   after(rows,'dobiel',{key:'waterfallBypass',title:'물보라 뒤의 좁은 길',scene:'waterfall',npc:'dogBypass30',pos:[680,470],fixture:true,lines:[['narrator','낮은 바위 아래로 몸을 낮춰 물보라를 지나갔다. 도비엘의 시선을 벗어나 던전 입구에 닿았다.']],effect:s=>s.dogBypass30=true});
   edit(rows,'seaweed',{scene:'diveroom4',pos:[700,380]});
  }
  if(number===31){
   edit(rows,'proof',{title:'상인에게 전할 확인',lines:[['family','상인에게 전할 확인 주문을 알려주마. 잘 기억하고 가거라.'],['narrator','가족임을 확인하는 말을 배웠다. 할아버지는 아버지의 이야기를 꺼내려다 다시 말을 멈추었다.']],effect:s=>s.familyProof31=true});
   edit(rows,'fruit',{lines:[['narrator','할아버지에게 배운 확인 주문을 상인에게 전했다.'],['bundleMerchant31','마을의 특산품인 누에 열매다. 차가운 몸을 덥게 하고, 해열에 아주 효과가 좋지. 마법 재료로도 널리 쓰인다.'],['you','큐리어스 마녀께 잘 전해 드릴게요.']]});
  }
  if(number===33)edit(rows,'dobiel',{title:'쟈칼에게 안내하는 시바',scene:'eaglevillage',npc:'shiva',pos:[219,233],lines:[['shiva','가루다님의 허락을 받았군. 이제 쟈칼님을 만나러 폭포로 가자.'],['you','마지막 허가도 꼭 받아야 해.']]});
  if(number===34){
   const r=rows.find(r=>r.key==='spell'),effect=r.effect;
   r.effect=s=>{effect(s);m.give(s,'lavaLadle34');};
   after(rows,'spell',{key:'returnLadle',title:'빌린 용암 국자 반납',scene:'mine',npc:'baldi',pos:[300,279],requires:{lavaLadle34:1},lines:[['you','빌려주신 국자를 돌려드리러 왔어요. 덕분에 수업을 마쳤어요.'],['baldi','잘 썼다니 다행이군. 이제 선생님이 내 준 실전 과제를 마저 하게.']],effect:s=>m.take(s,'lavaLadle34')});
   edit(rows,'flame',{reward:100});
  }
  return register(number,title,rows,defaults);
 };
})();
