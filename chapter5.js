/* Chapter 5 extension. New dialogue and puzzle design; source notes in RESEARCH.md. */
(()=>{
 const x=window.ARPIA_EXTRA,oldDecorate=x.decorate,oldInteract=x.interact;
 Object.assign(x.defaults,{fairyPowder:false,mineSample:false,royalSample:false});
 Object.assign(x.npcs,{naomi:{name:'나오미',anim:'npc_008_도트_나오미',portrait:'teacher/나오미.png'},leona:{name:'레오나',anim:'npc_019_도트_레오나'},kingAsuria:{name:'무함마드 알리 4세',extra:'kingAsuria',height:72,portrait:'other/무함마드_알리4세.png'},cardia:{name:'카디쟈',extra:'cardia',height:66,portraitPath:'assets/cardia-portrait.jpg'},scollnote:{name:'스콜의 외출 메모'},mineblade:{name:'광산의 새 검'},royalblade:{name:'왕국에 납품된 검'}});
 x.quests.splice(20,1,
  ['제5화 · 카디쟈의 편지','학교 2층 마틸다의 편지 받기','classroom','matilda'],
  ['우체국의 소포','상점가 우체국의 콘라드 만나기','shop','conrad'],
  ['선생님을 찾아서','학교 앞 스콜의 외출 메모 확인하기','campus','scollnote'],
  ['의문의 열세 병','학교 2층 나오미에게 상담하기','classroom','naomi'],
  ['요구르트의 행방','상점가 사무엘에게 구매 기록 묻기','shop','sam'],
  ['아이작의 사정','학교 로비의 아이작에게 묻기','lobby','isaac'],
  ['성급한 추측 대신','양호실 아멜라에게 사실 확인하기','infirmary','amela'],
  ['히나의 급한 전갈','학교 앞 히나 만나기','campus','hina'],
  ['두 왕국 사이','학교 2층 줄리아에게 상황 듣기','classroom','julia'],
  ['요정의 마법 가루','학교 앞 님펜 길 → 레오나 만나기','nymphen','leona'],
  ['광산의 자부심','난쟁이 광산의 발디 만나기','mine','baldi'],
  ['첫 번째 검 조사','발디 옆 새 검에 마법 가루 사용하기','mine','mineblade'],
  ['변화가 없는 검','광산의 나오미와 조사 결과 비교하기','mine','naomi'],
  ['뜻밖의 발신인','광산에 돌아온 스콜과 이야기하기','mine','scoll'],
  ['아수리아의 항의','학교 정문에서 아수리아로 → 국왕 만나기','asuria','kingAsuria'],
  ['두 번째 검 조사','국왕 앞 납품된 검에 마법 가루 사용하기','asuria','royalblade'],
  ['같은 철, 다른 반응','아수리아의 나오미와 증거 정리하기','asuria','naomi'],
  ['마지막 한 병','아수리아의 스콜과 이야기하기','asuria','scoll'],
  ['카디쟈의 답장','왕국 서쪽 카디쟈의 집 방문하기','cardiahome','cardia'],
  ['제5화 완료 · 남겨진 의문','편지의 주인은 밝혔습니다. 철의 이상은 다음 모험으로 이어집니다','classroom','none']
 );
 x.chapters.push([62,81,'제5화 카디쟈의 편지']);
 x.map.push(['nymphen','요정의 섬 님펜',[525,568]],['asuria','아수리아 왕국',[610,600]],['cardiahome','카디쟈의 집',[116,409]]);
 x.scenes.nymphen=(s,n,p)=>({id:'nymphen',name:'요정의 섬 님펜 · 나무 위의 길',bg:'assets/maps-hires/nymphen.webp',w:780,h:602,zoom:1.2,nodes:[[525,568],[515,492],[437,433],[363,374],[383,296],[350,234],[254,285],[153,237],[69,323],[107,447],[232,452],[278,385],[554,310],[653,300],[688,235],[596,206]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[4,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,3],[2,12],[12,13],[13,14],[14,15]],entities:[p('back','학교 앞으로',525,568,'campus',[963,221]),n('leona',596,206),n('naomi',554,310)]});
 x.scenes.asuria=(s,n,p)=>({id:'asuria',name:'아수리아 왕국 · 황금빛 궁전',bg:'assets/maps-hires/asuria.webp',w:896,h:691,zoom:1.12,nodes:[[610,600],[559,541],[450,512],[364,490],[273,450],[214,382],[314,375],[408,342],[517,351],[597,324],[650,283],[626,216],[151,288],[111,221]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[5,12],[12,13]],entities:[p('back','학교 앞으로',610,600,'campus',[290,582]),n('kingAsuria',650,283),{...n('royalblade',597,324),type:'fixture'},n('naomi',517,351),n('scoll',408,342),{...p('cardiahome','카디쟈의 집',111,221,'cardiahome',[116,409]),minStage:80}]});
 x.scenes.cardiahome=(s,n,p)=>({id:'cardiahome',name:'카디쟈의 집 · 전하지 못한 마음',bg:'assets/cardia-study.webp',w:800,h:600,zoom:1.15,nodes:[[116,409],[230,416],[347,408],[467,362],[579,299],[636,325],[376,281],[288,224]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[2,6],[6,7]],entities:[p('back','왕국 거리',116,409,'asuria',[151,288]),n('cardia',579,299),n('scoll',467,362),n('naomi',376,281)]});
 x.decorate=(sc,s,n,p)=>{oldDecorate(sc,s,n,p);const door=(id,label,x,y,to,spawn,minStage)=>({...p(id,label,x,y,to,spawn),minStage});
  if(sc.id==='campus'){if(s.stage>=64&&s.stage<76){sc.entities=sc.entities.filter(e=>e.id!=='scoll');sc.entities.push({...n('scollnote',585,324),type:'fixture'});}sc.entities.push(door('nymphen','요정의 섬 님펜',963,221,'nymphen',[525,568],71),door('asuria','아수리아 왕국',238,611,'asuria',[610,600],76));}
  if(sc.id==='classroom'&&s.stage>=65){const book=sc.entities.find(e=>e.id==='book');if(book){book.x=335;book.y=239;}sc.entities.push(n('naomi',375,211));}
  if(sc.id==='mine'&&s.stage>=72)sc.entities.push({...n('mineblade',416,274),type:'fixture'},n('naomi',520,307),...(s.stage>=75?[n('scoll',617,342)]:[]));
 };
 x.questItems=s=>[
  ...(s.stage===63?[['마틸다의 편지','아버지에게 부치는 첫 학교 소식']]:[]),
  ...(s.stage>=64?[['카디쟈의 문의서','발신인을 알 수 없는 열세 번의 소포']]:[]),
  ...(s.fairyPowder?[['레오나의 마법 가루','같은 재료를 나누어 두 검을 비교합니다']]:[]),
  ...(s.mineSample?[['광산 검의 조사 기록','단단한 날 · 가루의 변화 없음']]:[]),
  ...(s.royalSample?[['왕국 검의 조사 기록','부서진 날 · 보랏빛 이상 반응']]:[])
 ];
 const events={
 62:['classroom','matilda',[['matilda','{name}, 잠깐! 아버지께 학교 이야기를 써 봤어.'],['you','직접 쓴 편지야? 왕국에 계신 아버지도 좋아하시겠다.'],['matilda','그런데 우체국에서는 뭘 해야 하지? 궁에서는 늘 다른 사람이 해 줬거든.'],['you','이번에는 내가 부쳐 줄게. 다음에는 함께 가 보자.']]],
 63:['shop','conrad',[['conrad','데런 왕국으로 가는 편지로군요. 잘 전달할게요. 그리고 미스 콘라드라고 불러 주세요.'],['you','고맙습니다, 미스 콘라드! 그런데 그 소포들은 뭐예요?'],['conrad','아수리아의 재상 카디쟈가 보낸 문의서예요. 누군가 요구르트를 열세 번이나 보냈다네요.'],['you','이름도 남기지 않고요? 선생님께 여쭤볼게요.']]],
 64:['campus','scollnote',[['narrator','평소 스콜이 있던 자리에 외출 메모가 남아 있다.'],['you','꼭 찾을 때 안 계시네. 같은 얼음 마법을 가르치는 나오미 선생님이라면 아실까?']]],
 65:['classroom','naomi',[['naomi','추측만으로 사람을 지목해서는 안 된단다. 먼저 물건이 어디서 왔는지 보자.'],['you','요구르트를 판 사람부터 찾으면 되겠네요.'],['naomi','그래. 사무엘에게 최근에 누가 샀는지 물어보렴.']]],
 66:['shop','sam',[['sam','요구르트? 최근에는 아이작과 스콜 선생님이 사 갔지.'],['you','혹시 누구에게 보낼 거라는 말도 했나요?'],['sam','그것까지는 모르겠구나. 물건을 샀다는 것만으로 이유까지 알 수는 없잖니.'],['you','맞아요. 직접 물어볼게요.']]],
 67:['lobby','isaac',[['isaac','내가 카디쟈에게 소포를 보냈다고? 아니야!'],['you','요구르트를 샀다길래 물어본 거야.'],['isaac','그건… 배가 불편해서 아멜라 선생님이 권해 주신 거야. 자세히는 묻지 말아 줘.'],['you','미안해. 선생님께 확인하고 오해를 풀게.']]],
 68:['infirmary','amela',[['amela','아이작에게 음식에 관해 조언한 것은 맞단다. 다른 사람에게 보낸 소포와는 관계없어.'],['you','알려 주셔서 고맙습니다.'],['amela','걱정이 풀렸으면 좋겠구나. 너도 잠시 쉬었다 가렴.']]],
 69:['campus','hina',[['hina','{name}! 줄리아 선생님이 급히 찾으셔.'],['you','무슨 일이야?'],['hina','난쟁이 광산과 아수리아 사이에 문제가 생겼대. 얼른 가 보자.']]],
 70:['classroom','julia',[['julia','아수리아에서 받은 검들이 쉽게 부서진다는 항의가 왔단다. 광산은 품질에 문제가 없다고 하고.'],['you','같은 검을 두고 말이 다른 거네요.'],['julia','님펜의 레오나에게 검사에 쓸 가루를 받아 오렴. 서로 다른 곳의 검을 같은 방법으로 살펴봐야 해.'],['naomi','조사는 내가 함께하마. 학교 북동쪽 길로 출발하자.']]],
 71:['nymphen','leona',[['leona','멀리서 왔구나. 이 가루는 금속에 남은 낯선 마력을 드러낸단다.'],['you','어느 쪽 말이 맞는지 알 수 있을까요?'],['leona','결론을 먼저 정하지는 말렴. 적은 양을 뿌리고 색과 검의 상태를 기록해 봐.'],['naomi','고맙습니다. 광산부터 확인하겠습니다.']]],
 72:['mine','baldi',[['baldi','우리 검은 대륙 밖에서도 찾는 물건이야. 쉽게 부서진다니 믿기 어렵군.'],['naomi','그래서 직접 확인하러 왔습니다. 새로 만든 검을 볼 수 있을까요?'],['baldi','저기 놓아 두었네. 얼마든지 살펴보게.']]],
 74:['mine','naomi',[['you','가루를 뿌려도 달라진 게 없어요. 날도 단단해요.'],['naomi','그대로 기록하자. 아직 왕국에 도착한 검을 확인하지 않았으니까.'],['narrator','광산 입구에서 익숙한 목소리가 들린다. 스콜이 돌아왔다.']]],
 75:['mine','scoll',[['scoll','다들 여기 있었군! 무슨 조사인가?'],['naomi','그 전에 하나만 묻죠. 카디쟈에게 요구르트를 보낸 사람이 선생님인가요?'],['scoll','그걸 어떻게… 아니, 정성을 보이려던 것뿐이라네.'],['naomi','그 이야기는 나중에 하죠. 지금은 왕국의 검을 살펴봐야 해요.']]],
 76:['asuria','kingAsuria',[['kingAsuria','아르피아에서 왔는가. 이 검을 보게. 호위병에게 맡길 수가 없네.'],['narrator','가볍게 두드린 검의 날이 조각나 버렸다.'],['you','광산에서 본 검과는 전혀 달라요.'],['naomi','같은 가루로 검사해 보겠습니다. 결과를 먼저 확인하지요.']]],
 78:['asuria','naomi',[['you','이번 검에서는 보랏빛이 올라왔어요. 광산의 검과 반응이 달라요.'],['naomi','좋아. 기록을 나란히 놓으면 차이가 분명하구나. 철이 변한 경위를 더 조사해야겠어.'],['kingAsuria','원인을 찾아 주게. 성급한 다툼으로 번지지 않도록 기다리겠네.']]],
 79:['asuria','scoll',[['scoll','중요한 일이 하나 더 남았네. 마지막 요구르트는 직접 전해야 하거든.'],['you','소포의 발신인을 알려 드리는 거죠?'],['naomi','상대가 원하지 않으면 더 보내지 말아야 한다는 것도 기억하세요.'],['scoll','흠… 우선 이야기를 들어 보세. 서쪽 집으로 가면 되네.']]],
 80:['cardiahome','cardia',[['cardia','열세 번의 소포가 모두 스콜 선생님의 일이었군요.'],['scoll','마지막 한 병은 직접 전하고 싶었소. 마음이 전해지길 바라며…'],['cardia','고맙지만 더는 보내지 마세요. 지금은 왕국의 일을 해결하는 데 힘을 써 주셨으면 합니다.'],['scoll','알겠소. 더 번거롭게 하지 않겠소.'],['you','편지의 수수께끼는 풀렸어. 이제 남은 건 검이 왜 달라졌는지야.'],['naomi','학교로 돌아가 이번 조사 결과를 보고하자.']]]
 };
 x.interact=(e,a)=>{const s=a.state,q=s.stage;
  if((q===73&&s.scene==='mine'&&e.id==='mineblade')||(q===77&&s.scene==='asuria'&&e.id==='royalblade')){
   if(!s.fairyPowder){a.toast('먼저 레오나에게 마법 가루를 받아 오세요.');return true;}
   a.choicePuzzle(['검의 성분 조사','검을 상하게 하지 않고 두 곳의 결과를 비교하려면?',['검에 다른 금속을 섞는다','같은 양의 마법 가루를 조금 뿌린다','검을 뜨거운 불에 녹인다'],1,'같은 조건으로 조사해야 두 검의 차이를 알 수 있어.'],()=>{if(q===73)s.mineSample=true;else s.royalSample=true;a.advance(q+1,15);a.refresh();a.talk([['narrator',q===73?'가루는 그대로 흩어진다. 검의 날은 단단하고 낯선 빛도 보이지 않는다.':'가루가 닿자 검 조각에서 보랏빛이 피어오른다. 광산의 검과는 다른 반응이다.']]);a.save();});return true;
  }
  const ev=events[q];if(ev&&s.scene===ev[0]&&e.id===ev[1]){a.talk(ev[2],()=>{if(q===71)s.fairyPowder=true;if(q===68){s.hp=s.maxHp;s.mp=s.maxMp;}a.advance(q+1,q===80?35:10);a.refresh();if(q===80)a.finish('제5화 완료 · 편지의 주인','발신인의 수수께끼를 풀고 두 검의 차이를 밝혔습니다. 아직 드러나지 않은 광산의 비밀이 다음 이야기를 기다립니다.');a.save();});return true;}
  if(q>=62){const fallback={naomi:'확인한 사실과 아직 모르는 것을 나누어 기록해 두렴.',leona:'다른 반응을 보았다고 서둘러 결론을 내리지는 말렴.',kingAsuria:'조사가 끝나기 전에는 두 왕국의 다툼을 키우지 않겠네.',cardia:'마음을 전할 때는 상대의 이야기도 들어야 해요.',scollnote:'스콜의 외출 메모가 남아 있다.',mineblade:'광산에서 만든 새 검이다.',royalblade:'아수리아에 도착한 검의 조각이다.'};if(fallback[e.id]){a.talk([[['scollnote','mineblade','royalblade'].includes(e.id)?'narrator':e.id,fallback[e.id]]]);return true;}}
  return oldInteract(e,a);
 };
})();
