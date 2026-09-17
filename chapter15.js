/* Chapter 15: 진짜 적은 누구 - 프리드의 거울. Plot order: https://wonavy.tistory.com/212 */
(()=>{
 const x=ARPIA_EXTRA,prior=x.interact,decorate=x.decorate,items=x.questItems;
 Object.assign(x.defaults,{silenceLetters:false,teleportReplies:false,navinium:false,teleportReady:false,teleportCoords:false,swordIce:false,swordDeren:false,swordAsuria:false,swordCurious:false,silenceSwordsStored:false,jackalFlask:false,lastSwordClue:false,hungerDefeated:false,mirrorSecret:false});
 Object.assign(x.npcs,{barbara:{name:'바바라',anim:'npc_038_도트_멜리',portraitPath:'assets/portraits/barbara.webp'},navinium:{name:'네비니움 광석',artPath:'assets/navinium.png',height:60},teleportCompass:{name:'텔레포트 좌표기',artPath:'assets/teleport-compass.webp'},eastGate:{name:'금단의 동문'},hunger15:{name:'헝거',artPath:'assets/hunger.webp',portraitPath:'assets/hunger.webp',height:96}});
 x.scenes.barbarahouse=(s,n,p)=>({id:'barbarahouse',name:'바바라의 집 · 텔레포트 공방',bg:'assets/cardia-study.webp',w:800,h:600,zoom:1.15,nodes:[[116,409],[230,416],[347,408],[467,362],[579,299],[636,325],[376,281],[288,224]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[2,6],[6,7]],entities:[p('back','학교 앞으로',116,409,'campus',[303,316]),n('barbara',579,299),{...n('teleportCompass',376,281),type:'fixture'}]});
 x.scenes.eastgate=(s,n,p)=>({id:'eastgate',name:'금단의 동문 · 헝거의 도전',bg:'assets/maps-hires/forest-battle.webp',w:1000,h:658,zoom:1.1,tint:'#16102a55',nodes:[[160,530],[275,490],[390,450],[510,398],[630,350],[750,300],[835,245]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]],entities:[p('back','학교 앞으로',160,530,'campus',[925,315]),...(s.stage===291?[n('hunger15',750,300)]:[])]});
 x.map.push(['barbarahouse','바바라의 집',[116,409]],['eastgate','금단의 동문',[160,530]]);
 const rows=[
  ['빼앗긴 태양의 보석','principal','morris','스콜은 구했지만 헝거가 보석을 가져갔구나. 그러나 진짜 적을 찾으려면 먼저 료마의 도움이 필요하다.'],
  ['여섯 자루 침묵의 검','classroom','ryoma','웨일라 곳곳에는 침묵의 검이 여섯 자루 있어. 각 보관자에게 이 긴급 편지를 보내 회수해야 해.'],
  ['긴급 편지 발송','shop','conrad','네 왕국과 마을에 긴급편지를 보냈단다. 숫자 열을 세기도 전에 답장이 올 거야.'],
  ['네 곳에서 온 답장','shop','conrad','얼음 마을, 데런 왕국, 아수리아 왕국, 큐리어스 저택에서 답장이 왔어. 아주 급한 모양이구나.'],
  ['히나의 텔레포트','campus','hina','난 바바라의 집에 텔레포트로 갈 거야. 너도 먼 곳을 빨리 다녀와야 한다면 함께 갈래?'],
  ['바바라의 조건','barbarahouse','barbara','네 곳을 잇는 텔레포트라면 네비니움이 필요해. 난쟁이 광산 발디에게 어디서 캘 수 있는지 물어봐.'],
  ['광산 안쪽의 푸른 광석','mine','baldi','기욤이 지키는 깊은 갱도에서 푸른 별빛을 내는 광석이 네비니움이야. 한 덩이만 가져오렴.'],
  ['네비니움 채굴','minedepths','navinium','암벽에서 별빛처럼 반짝이는 네비니움 한 덩이를 조심스럽게 떼어 냈다.'],
  ['좌표가 없는 텔레포트','barbarahouse','barbara','광석은 충분하지만 정확한 좌표가 없으면 시공간 미로에 빠져. 이슈비케 선생님께 좌표를 받아 와.'],
  ['네 왕국의 좌표','classroom','ishubike','얼음 마을, 데런, 아수리아, 큐리어스 저택의 좌표를 적어 주마. 순서대로 이동하면 흔들림이 적을 게다.'],
  ['료마가 보내는 신호','classroom','ryoma','편지의 마력 신호는 내가 유지할게. 바바라의 좌표기에 네비니움을 끼우면 바로 출발할 수 있어.'],
  ['텔레포트 기동','barbarahouse','teleportCompass','네비니움을 끼우자 네 방향의 좌표가 푸른빛으로 이어졌다. 첫 목적지는 얼음 마을이다.'],
  ['얼음 마을의 침묵의 검','icevillage','humphrey','스콜이 맡겼던 침묵의 검이 여기 있다. 헝거가 오기 전에 텔레포트로 가져가거라.'],
  ['데런 왕국의 침묵의 검','kingdom','caesar','왕국 경기장에 보관한 검을 내주겠네. 헝거가 성문을 엿보았으니 오래 머물지 말게.'],
  ['아수리아의 침묵의 검','asuria','kingAsuria','아수리아가 지켜 온 검이오. 태양의 보석을 되찾는 데 사용해 주시오.'],
  ['큐리어스의 침묵의 검','curiousmansion','curious','검을 모은다고 진짜 적이 저절로 보이진 않아. 프리드의 거울이 무엇을 바꿨는지 생각해 봐.'],
  ['시공간 미로를 벗어나','barbarahouse','barbara','조금만 늦었으면 좌표가 닫힐 뻔했어. 네비니움도 버텼고 네 자루의 검도 무사하구나.'],
  ['침묵의 검을 한자리에','principal','morris','학교에 있던 두 자루와 네가 모은 네 자루, 모두 여섯 자루를 봉인실에 보관하겠다.'],
  ['쟈칼이 주는 대비책','principal','morris','헝거와 싸우기 전 쟈칼의 폭포로 가거라. 쟈칼이 어둠의 후각을 흐리는 대비책을 줄 게다.'],
  ['소피아와 함께','dining','sofia','혼자 보내지 않겠어요. 폭포까지 같이 가죠. 헝거에게 기습할 틈을 주면 안 돼요.'],
  ['쟈칼의 호리병','waterfall','jackal','싸우기 직전에 이 호리병을 뿌려라. 헝거의 코가 마비되면 태양의 보석을 놓칠 거다.'],
  ['마지막 검의 행방','waterfall','sofia','남은 단서는 쥬다의 압둘라가 가진 침묵의 검이에요. 바로 항구로 가죠.'],
  ['금단의 동문','judah','abdullah','마지막 검은 헝가리의 헝, 거지의 거가 가져갔소. 헝거는 금단의 동문에서 기다린다고 했소.'],
  ['헝거와 가짜 보석','eastgate','hunger15','전투'],
  ['프리드의 거울의 비밀','principal','morris','프리드의 거울은 진짜를 거울 속에 가두고 가짜를 밖으로 내보낸다. 네가 보석을 확인한 순간 이미 바뀐 것이지. 이제 학교 안의 진짜 적을 찾아야 한다.']
 ];
 const start=268,end=start+rows.length;
 x.quests.splice(226,1,...rows.map(([title,scene,id])=>['제15화 · '+title,(x.npcs[id]?.name||title)+' 만나기',scene,id]),['제15화 완료 · 진짜 적은 누구','프리드의 거울이 만든 가짜 보석과 학교 내부의 적을 알게 되었습니다.','campus','none']);
 x.chapters.push([start,end,'제15화 진짜 적은 누구 · 프리드의 거울']);
 x.encounters.hunger15={name:'헝거 · 금단의 동문 결전',bg:'assets/maps-hires/forest-battle.webp',intro:'쟈칼의 호리병으로 헝거의 후각을 흐리고 소피아와 함께 공격합니다.',next:292,setFlag:'hungerDefeated',xp:270,gold:180,sp:80,enemies:[{name:'침묵의 검을 든 헝거',element:0,hp:920,maxHp:920,atk:28,atb:18,sprite:'hunger'}]};
 x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);if(s.stage<start)return;const add=(id,xp,yp,fixture=false)=>{if(!sc.entities.some(e=>e.id===id))sc.entities.push({...n(id,xp,yp),...(fixture?{type:'fixture'}:{})});};
  if(sc.id==='classroom'&&[269,278].includes(s.stage))add('ryoma',646,198);if(sc.id==='classroom'&&s.stage===277)add('ishubike',530,185);
  if(sc.id==='campus'&&s.stage>=272)sc.entities.push(p('barbaraDoor','바바라의 집',303,316,'barbarahouse',[116,409]));if(sc.id==='campus'&&s.stage>=290)sc.entities.push(p('eastDoor','금단의 동문',925,315,'eastgate',[160,530]));
  if(sc.id==='minedepths'&&s.stage===275)add('navinium',445,255,true);if(sc.id==='icevillage'&&s.stage===280)add('humphrey',397,466);if(sc.id==='magecity'&&s.stage===277)add('ishubike',450,324);
  if(sc.id==='dining'&&s.stage===287)add('sofia',470,320);
  if(sc.id==='waterfall'&&s.stage===289)add('sofia',379,337);
 };
 x.questItems=s=>[...items(s),...(s.silenceLetters?[['료마의 긴급 편지','침묵의 검 보관자들에게 보낼 편지']]:[]),...(s.teleportReplies?[['네 곳의 답장','얼음·데런·아수리아·큐리어스에서 온 회신']]:[]),...(s.navinium?[['네비니움','텔레포트 좌표기에 사용할 별빛 광석']]:[]),...(s.teleportCoords?[['텔레포트 좌표','이슈비케가 적어 준 네 지역의 좌표']]:[]),...((s.swordIce||s.swordDeren||s.swordAsuria||s.swordCurious)?[['침묵의 검 묶음',[s.swordIce,s.swordDeren,s.swordAsuria,s.swordCurious].filter(Boolean).length+'/4 회수']]:[]),...(s.jackalFlask?[['쟈칼의 호리병','헝거의 후각을 흐리는 비장의 물건']]:[])];
 x.interact=(e,a)=>{const s=a.state,i=s.stage-start,r=rows[i];if(!r||r[1]!==s.scene||r[2]!==e.id)return prior(e,a);
  if(r[3]==='전투'){a.talk([['hunger15','침묵의 검으로 태양의 보석을 깨뜨려 아즈카 님을 부활시키겠다!'],['sofia','지금이에요. 쟈칼의 호리병을 뿌리고 검을 든 손을 노려요!']],()=>a.battle('hunger15'));return true;}
  a.talk([[['navinium','teleportCompass'].includes(e.id)?'narrator':e.id,r[3]],['you',i===24?'학교 안에 우리를 지켜본 사람이 있었다는 뜻이군요.':'서두르되 좌표와 단서를 하나씩 확인할게요.']],()=>{const q=s.stage,flags={269:'silenceLetters',271:'teleportReplies',275:'navinium',277:'teleportCoords',278:'teleportReady',280:'swordIce',281:'swordDeren',282:'swordAsuria',283:'swordCurious',288:'jackalFlask',290:'lastSwordClue',292:'mirrorSecret'};if(flags[q])s[flags[q]]=true;if(q===279)s.navinium=false;if(q===284)s.teleportReady=false;if(q===285){s.silenceSwordsStored=true;s.swordIce=s.swordDeren=s.swordAsuria=s.swordCurious=false;}if(q===292)s.jackalFlask=false;
   a.advance(q+1,q===292?60:10);a.refresh();a.save();if(q===292)a.finish('제15화 완료 · 프리드의 거울','헝거를 물리치고 태양의 보석이 이미 거울 속 진짜와 바뀌었다는 사실을 알아냈습니다. 학교 안의 적을 찾을 차례입니다.');
  });return true;
 };
})();
