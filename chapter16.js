/* Chapter 16: 얼음 마을의 위기 - 사라진 쿨스톤. Plot order: https://wonavy.tistory.com/213 */
(()=>{
 const x=ARPIA_EXTRA,prior=x.interact,decorate=x.decorate,items=x.questItems;
 Object.assign(x.defaults,{iceMail:false,iceVillageSurvey:false,iceCrest:false,coolstoneTainted:false,libraryKey:false,icePuzzleStep:0,ancientIceBook:false,coolstoneSpell:false,coolstonePurified:false,coolstoneReturned:false,iceCake:false});
 Object.assign(x.npcs,{scarlet:{name:'스칼렛',anim:'npc_100_도트_스칼렛',portraitPath:'assets/portraits/scarlet.webp'},adelio:{name:'아델리오',anim:'npc_077_도트_아델리오',portraitPath:'assets/portraits/adelio.webp'},nell:{name:'넬 할머니',anim:'npc_109_도트_루시',portraitPath:'assets/portraits/nell.webp'},talisha:{name:'탈리샤',anim:'npc_116_도트_제스퍼',portraitPath:'assets/portraits/talisha.webp'},iceStatue:{name:'험프리 백작의 동상',artPath:'assets/ice-crest.webp',height:90},coolstone:{name:'오염된 쿨스톤',artPath:'assets/coolstone.webp',height:100},oldLibraryDoor:{name:'고서 도서관의 문',artPath:'assets/ice-crest.webp',height:75},ancientIceBook:{name:'고대 얼음 마법의 책',artPath:'assets/ancient-ice-book.webp',height:76},iceCake:{name:'얼음 케이크',artPath:'assets/ice-cake.webp',height:62}});
 x.scenes.icedungeon=(s,n,p)=>({id:'icedungeon',name:'얼음 마을 지하 · 쿨스톤의 방',bg:'assets/maps-hires/forest-battle.webp',w:1000,h:658,zoom:1.08,tint:'#67c9ff44',nodes:[[158,525],[273,485],[390,446],[505,394],[621,346],[736,294],[834,238]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]],entities:[p('back','얼음 마을',158,525,'icevillage',[300,744]),...(s.stage===307?[{...n('coolstone',736,294),type:'fixture'}]:[])]});
 x.scenes.oldlibrary=(s,n,p)=>({id:'oldlibrary',name:'도서관 2층 · 고서 보관실',bg:'assets/maps-hires/library.webp',w:559,h:431,zoom:1.42,tint:'#18335a44',nodes:[[275,390],[205,360],[125,330],[72,285],[133,250],[215,260],[285,300],[365,335],[445,322],[500,270],[455,225],[390,205],[340,155]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[6,11]],entities:[p('back','도서관 1층',275,390,'library',[275,390]),...(s.stage===311?[{...n('oldLibraryDoor',133,250),type:'fixture'}]:[]),...(s.stage===312?[{...n('ancientIceBook',455,225),type:'fixture'}]:[])]});
 x.map.push(['icedungeon','쿨스톤의 방',[158,525]],['oldlibrary','고서 도서관',[275,390]]);
 const rows=[
  ['녹아 버린 얼음 케이크','campus','isaac','얼음 마을에서 가져온 케이크인데 상자 안에 물만 남았어. 분명 꽁꽁 얼어 있었는데!'],
  ['얼음 마을의 특급 우편','campus','hina','네 앞으로 특급 우편이 왔어. 얼음 마을 인장이 찍혀 있으니 우체국에서 바로 받아 봐.'],
  ['자존심 강한 마을의 요청','shop','conrad','얼음 마을이 먼저 도움을 청하는 일은 드물단다. 마을 전체가 녹고 있다니 서둘러 가 보렴.'],
  ['험프리의 초청','icevillage','humphrey','쿨스톤을 잃은 뒤 눈과 얼음이 계속 녹고 있네. 주민들의 말을 듣고 원인을 찾아 주게.'],
  ['스칼렛이 본 따뜻한 바람','icevillage','scarlet','북쪽 동상 아래에서 따뜻한 바람이 올라왔어요. 그 뒤로 얼음길이 무너지기 시작했죠.'],
  ['아델리오의 관측','icevillage','adelio','밤에도 기온이 내려가지 않아요. 마을의 냉기를 붙잡던 무언가가 사라진 게 틀림없습니다.'],
  ['기숙사로 들어간 아이작','campus','hina','아이작은 녹은 케이크 때문에 풀이 죽어 기숙사로 들어갔어. 나오미 선생님께 얼음 마을 역사를 물어보자.'],
  ['독수리 마을의 옛 기록','classroom','naomi','수백 년 전 얼음 마을은 독수리 마을과 이어져 있었단다. 가루다라면 냉기의 근원을 기억할 거야.'],
  ['시바가 느낀 변화','eaglevillage','shiva','바람이 전보다 따뜻해졌구나. 높은 둥지의 얼음도 녹고 있어. 가루다에게 바로 가 보렴.'],
  ['사라진 쿨스톤','eaglevillage','garuda','웨일라의 겨울은 쿨스톤이 지켜 왔다. 얼음 마을의 넬 할머니가 그 보관 장소를 알고 있을 게다.'],
  ['넬 할머니의 기억','icevillage','nell','험프리 백작 동상의 문양 아래에 쿨스톤으로 가는 길이 있단다. 촌장의 문장이 열쇠일 게야.'],
  ['비어 있는 문양 홈','icevillage','iceStatue','동상 받침의 눈꽃 모양 홈에서 미지근한 바람이 새어 나온다. 정확히 맞는 문장이 필요하다.'],
  ['얼음 마을의 문장','icevillage','humphrey','가문의 눈꽃 문장을 빌려주겠네. 동상에 끼우면 지하 통로가 열릴 걸세.'],
  ['동상 아래의 입구','icevillage','iceStatue','눈꽃 문장이 푸르게 빛나자 동상이 움직이고 얼음 지하로 내려가는 계단이 나타났다.'],
  ['탁해진 쿨스톤','icedungeon','coolstone','푸른빛을 잃고 회색으로 흐려진 쿨스톤을 발견했다. 정화 주문을 알아내야 한다.'],
  ['가루다에게 맡긴 쿨스톤','eaglevillage','garuda','내가 쿨스톤의 냉기를 붙잡고 있겠다. 학교에서 오래된 정화 주문을 찾아오너라.'],
  ['숨겨진 도서관','principal','morris','나도 정확한 주문은 모른다. 멜리에게 고서 도서관의 열쇠를 받아 2층 기록을 찾아보거라.'],
  ['멜리의 열쇠','library','meli','고서 보관실의 열쇠예요. 복도의 틀린 부분 세 곳을 모두 찾아야 마지막 문이 열려요.'],
  ['고서 복도의 틀린 그림','oldlibrary','oldLibraryDoor','퍼즐'],
  ['다섯 권 중 파란 책','oldlibrary','ancientIceBook','다섯 권 가운데 눈꽃 은장이 새겨진 파란 책이 고대 얼음 마법서다.'],
  ['열쇠 반납','library','meli','무사히 찾았군요. 열쇠는 제가 보관할게요. 책의 오래된 글자는 탈리샤가 읽을 수 있을 거예요.'],
  ['쿨스톤 정화 주문','shop','talisha','주문은 “쿨스톤 옴스쿠렌자 무스카우니타 고골리”예요. 책은 제가 제자리에 돌려놓을게요.'],
  ['쿨스톤 정화','eaglevillage','garuda','주문이 맞다. 탁한 마력이 걷히고 쿨스톤의 푸른빛이 돌아왔구나. 얼음 마을에 소식을 전하자.'],
  ['시바에게 인사','eaglevillage','shiva','차가운 바람이 다시 불기 시작했구나. 얼음 마을로 데려다주마.'],
  ['돌아온 겨울','icevillage','humphrey','눈과 얼음이 다시 단단해졌네. 쿨스톤은 가루다가 지키는 편이 안전하겠어. 마을의 감사를 전해 주게.'],
  ['가루다의 새로운 보관소','eaglevillage','garuda','쿨스톤은 내가 안전하게 지키마. 마을 사람들은 이제 그 존재를 잊지 않을 것이다.'],
  ['아이작과 얼음 케이크','campus','isaac','이번 케이크는 하나도 녹지 않았어! 얼음 마을을 구한 기념으로 우리 둘이 나눠 먹자.']
 ];
 const start=293,end=start+rows.length;
 x.quests.splice(251,1,...rows.map(([title,scene,id])=>['제16화 · '+title,(x.npcs[id]?.name||title)+' 만나기',scene,id]),['제16화 완료 · 사라진 쿨스톤','쿨스톤을 정화해 얼음 마을과 웨일라의 겨울을 되찾았습니다.','campus','none']);
 x.chapters.push([start,end,'제16화 얼음 마을의 위기 · 사라진 쿨스톤']);
 x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);if(s.stage<start)return;const add=(id,xp,yp,fixture=false)=>{if(!sc.entities.some(e=>e.id===id))sc.entities.push({...n(id,xp,yp),...(fixture?{type:'fixture'}:{})});};
  if(sc.id==='campus'&&[293,294,299,319].includes(s.stage))add([294,299].includes(s.stage)?'hina':'isaac',[294,299].includes(s.stage)?303:610,316);
  if(sc.id==='icevillage'){if([296,305,317].includes(s.stage))add('humphrey',397,466);if(s.stage===297)add('scarlet',510,410);if(s.stage===298)add('adelio',610,355);if(s.stage===303)add('nell',520,390);if([304,306].includes(s.stage))add('iceStatue',610,300,true);if(s.stage>=306)sc.entities.push(p('iceDungeonDoor','동상 아래 지하',610,300,'icedungeon',[158,525]));}
  if(sc.id==='classroom'&&s.stage===300)add('naomi',530,185);if(sc.id==='eaglevillage'&&[301,302,308,315,316,318].includes(s.stage))add([301,316].includes(s.stage)?'shiva':'garuda',[301,316].includes(s.stage)?219:296,[301,316].includes(s.stage)?233:140);
  if(sc.id==='library'&&s.stage>=310)sc.entities.push(p('oldLibrary','고서 도서관 2층',340,155,'oldlibrary',[275,390]));if(sc.id==='shop'&&s.stage===314)add('talisha',255,263);
 };
 x.questItems=s=>[...items(s),...(s.iceMail?[['얼음 마을 특급 우편','마을 전체가 녹고 있다는 긴급 요청']]:[]),...(s.iceCrest?[['얼음 마을의 문장','험프리 백작 동상을 여는 눈꽃 문장']]:[]),...(s.coolstoneTainted?[['오염된 쿨스톤','가루다가 냉기를 붙잡아 두고 있다']]:[]),...(s.libraryKey?[['고서 도서관 열쇠','멜리에게 빌린 오래된 열쇠']]:[]),...(s.ancientIceBook?[['고대 얼음 마법서','쿨스톤 정화 주문이 기록된 파란 책']]:[]),...(s.iceCake?[['얼음 케이크','이번에는 녹지 않은 아이작의 케이크']]:[])];
 x.interact=(e,a)=>{const s=a.state,i=s.stage-start,r=rows[i];if(!r||r[1]!==s.scene||r[2]!==e.id)return prior(e,a);
  if(r[3]==='퍼즐'){const puzzles=[['고서 복도 · 첫 번째 차이','두 그림 중 고서관에 어울리지 않는 것은?',['파란 얼음 문양','초록 새싹 화분','은빛 촛대'],1,'차가운 고서관에 싱싱한 화분은 없었다.'],['고서 복도 · 두 번째 차이','책장 그림에서 방향이 뒤집힌 것은?',['오른쪽을 보는 부엉이','왼쪽을 보는 부엉이','닫힌 파란 책'],0,'원래 부엉이 문장은 왼쪽을 본다.'],['고서 복도 · 마지막 차이','문 위 숫자 중 하나만 달라졌다. 무엇일까?',['149','194','94'],1,'아르피아 고서관의 표식은 149다.']];const step=Math.min(2,s.icePuzzleStep||0);a.choicePuzzle(puzzles[step],()=>{if(step<2){s.icePuzzleStep=step+1;a.save();a.again('oldLibraryDoor');}else{s.icePuzzleStep=0;a.advance(312,15);a.refresh();a.save();}});return true;}
  a.talk([[['iceStatue','coolstone','ancientIceBook'].includes(e.id)?'narrator':e.id,r[3]],['you',i===26?'얼음 마을의 겨울과 케이크까지 모두 돌아왔네!':'기록과 단서를 차례대로 확인할게요.']],()=>{const q=s.stage,flags={294:'iceMail',298:'iceVillageSurvey',305:'iceCrest',307:'coolstoneTainted',310:'libraryKey',312:'ancientIceBook',314:'coolstoneSpell',315:'coolstonePurified',317:'coolstoneReturned',319:'iceCake'};if(flags[q])s[flags[q]]=true;if(q===306)s.iceCrest=false;if(q===308)s.coolstoneTainted=false;if(q===313)s.libraryKey=false;if(q===314)s.ancientIceBook=false;
   a.advance(q+1,q===319?60:10);a.refresh();a.save();if(q===319)a.finish('제16화 완료 · 사라진 쿨스톤','오염된 쿨스톤을 정화해 얼음 마을과 웨일라의 겨울을 되찾았습니다.');
  });return true;
 };
})();
