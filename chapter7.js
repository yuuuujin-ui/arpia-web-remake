/* Episode 7: original plot outline, new dialogue, exploration and puzzles. */
(()=>{
 const x=window.ARPIA_EXTRA,decorate=x.decorate,interact=x.interact,items=x.questItems;
 Object.assign(x.defaults,{mineResin:false,mineGateOpen:false,goldNuggets:0,goldFound:[]});
 Object.assign(x.npcs,{kobi:{name:'코비',anim:'npc_024_도트_코비',portrait:'other/코비.png'},guillaume:{name:'기욤',portraitPath:'assets/guillaume.webp',height:72},minegate:{name:'초승달 광산문'},gold1:{name:'첫 번째 금덩이'},gold2:{name:'두 번째 금덩이'},gold3:{name:'세 번째 금덩이'}});
 x.quests.splice(52,1,
 ['제7화 · 난쟁이 광산','숯을 가지고 광산의 발디 만나기','mine','baldi'],
 ['광산 안내자 코비','광산 작업장의 코비에게 깊은 갱도 묻기','mine','kobi'],
 ['또 하나의 초승달 문','광산 안쪽의 초승달 돌문 조사하기','minedepths','minegate'],
 ['문을 여는 가루','코비에게 광산문의 여는 법 묻기','mine','kobi'],
 ['열려라, 광산문','광산 안쪽 돌문에 송진 가루와 주문 사용하기','minedepths','minegate'],
 ['수상한 광부 기욤','열린 문 너머에서 기욤 만나기','minedepths','guillaume'],
 ['금덩이 세 개','광산 통로에 흩어진 금덩이 3개 찾기','minedepths','gold1'],
 ['거래의 대가','금덩이 세 개를 기욤에게 건네기','minedepths','guillaume'],
 ['제7화 완료 · 정비하고 다시','광산 깊은 곳으로 가는 길을 확인했습니다. 다음 탐사를 준비하세요','mine','none']);
 x.chapters.push([94,102,'제7화 난쟁이 광산']);
 x.map.push(['minedepths','광산 깊은 갱도',[120,500]]);
 x.scenes.minedepths=(s,n,p)=>({id:'minedepths',name:s.mineGateOpen?'난쟁이 광산 · 열린 초승달문':'난쟁이 광산 · 봉인된 갱도',bg:'assets/dwarf-mine-depths.webp',w:800,h:600,zoom:1.15,nodes:[[120,500],[200,470],[290,455],[380,425],[475,435],[575,465],[670,430],[700,340],[650,270],[555,245],[445,255],[340,275],[235,265],[145,235],[380,340],[480,320]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[3,14],[14,15],[15,9],[11,14],[4,15]],entities:[p('back','광산 작업장',120,500,'mine',[660,407]),{...n('minegate',145,235),type:'fixture'},...(s.stage>=99?[n('guillaume',650,270)]:[]),...(s.stage===100?[{...n('gold1',265,455),type:'fixture'},{...n('gold2',445,255),type:'fixture'},{...n('gold3',670,430),type:'fixture'}].filter(e=>!s.goldFound.includes(e.id)):[])]});
 x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);if(sc.id==='mine'&&s.stage>=95){sc.entities.push(n('kobi',520,307));sc.entities.push({...p('minedepths','광산 안쪽',660,407,'minedepths',[120,500]),minStage:96});}};
 x.questItems=s=>[...items(s),...(s.koboldCharcoal&&s.stage<95?[['코볼트의 숯','발디와 약속한 광산 탐사 교환품']]:[]),...(s.mineResin?[['코비의 송진 가루','광산의 초승달 돌문을 여는 가루']]:[]),...(s.goldNuggets?[['광산의 금덩이',`기욤과 거래하기 위해 모은 금덩이 ${s.goldNuggets}/3`]]:[])];
 const ev={
 94:['mine','baldi',[['you','코볼트 님이 내어 주신 숯을 가져왔어요.'],['baldi','좋은 숯이군. 약속대로 안쪽 갱도로 가는 길을 열어 주지.'],['baldi','광산 사정은 코비가 더 잘 아니 먼저 이야기를 들어 보게.']]],
 95:['mine','kobi',[['kobi','철이 변한 까닭을 찾는다고? 안쪽 갱도에 초승달이 새겨진 돌문이 있네.'],['you','학교 지하에서도 비슷한 문을 열어 본 적이 있어요.'],['kobi','그럼 직접 확인해 보게. 입구는 발디 옆에 열어 두었어.']]],
 97:['mine','kobi',[['you','역시 그냥은 열리지 않았어요. 학교에서 쓴 송진 가루가 필요할까요?'],['kobi','눈치가 빠르군. 광산용으로 곱게 간 가루를 가져가게.'],['jackal','옛날이나 지금이나 주문은 같겠지.'],['kobi','가루를 문양에 뿌리고 “열려라”라고 외치면 될 걸세.']]],
 99:['minedepths','guillaume',[['guillaume','더 깊은 곳으로 가는 길을 찾나? 공짜로 알려 줄 수는 없지.'],['you','무엇을 원하세요?'],['guillaume','이 갱도에 떨어진 금덩이 세 개를 가져오게. 그러면 궁전으로 가는 길을 알려 주지.'],['naomi','필요한 만큼만 찾고 위험한 곳에는 손대지 말자.']]],
 101:['minedepths','guillaume',[['guillaume','하나, 둘, 셋. 약속한 금덩이가 맞군.'],['you','이제 길을 알려 주세요.'],['guillaume','북쪽 폐광 너머로 오래된 난쟁이 궁전의 계단이 이어져 있네. 하지만 오늘은 준비가 부족해.'],['scoll','교장 선생님께 보고할 것도 있네. 학교로 돌아가 정비한 뒤 다시 오세.'],['jackal','폭포도 너무 오래 비웠군. 다음 탐사 때 광산에서 만나지.']]]
 };
 x.interact=(e,a)=>{const s=a.state,q=s.stage;
  if(q===96&&s.scene==='minedepths'&&e.id==='minegate'){a.talk([['narrator','초승달이 새겨진 돌문은 손잡이도 틈도 없이 굳게 닫혀 있다.'],['you','학교의 돌문과 닮았어. 코비에게 여는 법을 확인해 보자.']],()=>{a.advance(97,10);a.refresh();});return true;}
  if(q===98&&s.scene==='minedepths'&&e.id==='minegate'){a.choicePuzzle(['광산의 초승달 문','학교 지하에서 배운 순서를 떠올려 보세요.',['주문부터 외친다','송진 가루를 문양에 뿌린 뒤 “열려라”라고 외친다','곡괭이로 문을 두드린다'],1,'가루와 주문을 함께 써야 해.'],()=>{s.mineGateOpen=true;a.advance(99,15);a.refresh();a.talk([['narrator','달빛 같은 선이 문을 따라 흐르더니 무거운 돌문이 안쪽으로 열린다.']]);a.save();});return true;}
  if(q===100&&s.scene==='minedepths'&&/^gold[123]$/.test(e.id)){
   if(s.goldFound.includes(e.id))return true;s.goldFound.push(e.id);s.goldNuggets=s.goldFound.length;a.refresh();a.toast(`금덩이 ${s.goldNuggets} / 3`);if(s.goldNuggets===3){a.advance(101,15);a.talk([['you','세 개를 모두 찾았어. 기욤에게 돌아가자.']]);}a.save();return true;
  }
  const row=ev[q];if(row&&s.scene===row[0]&&e.id===row[1]){a.talk(row[2],()=>{if(q===97)s.mineResin=true;a.advance(q+1,q===101?30:10);a.refresh();if(q===101)a.finish('제7화 완료 · 난쟁이 광산','기욤과 거래해 잊힌 궁전으로 가는 길을 알아냈습니다. 다음 탐사를 위해 잠시 학교로 돌아갑니다.');a.save();});return true;}
  return interact(e,a);
 };
})();
