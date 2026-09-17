/* Chapter 14: 숨어든 어둠 - 스콜. Plot order: https://wonavy.tistory.com/212 */
(()=>{
 const x=ARPIA_EXTRA,prior=x.interact,decorate=x.decorate,items=x.questItems;
 Object.assign(x.defaults,{friedsMirror:false,sunSealChecked:false,mantisDust:false,wingDust14:false,sunGemVerified:false,mirrorReturned:false,morrisStitch:false,stitchMissing:false,puppetFruit:false,isaacFreed:false,odangkaFreed:false,puppetClue:false,sunGemGone:false,scollFreed:false,hungerStoleGem:false});
 Object.assign(x.npcs,{
  friedsMirror:{name:'프리드의 거울',artPath:'assets/frieds-mirror.png',height:78},suncrate14:{name:'태양의 보석 봉인함'},cursedFruit:{name:'꼭두각시 과일',artPath:'assets/cursed-fruit.png',height:52},
  humphrey:{name:'험프리 촌장',anim:'npc_115_도트_케리',portraitPath:'assets/portraits/humphrey.webp'},hunger:{name:'헝거',artPath:'assets/hunger.webp',portraitPath:'assets/hunger.webp',height:92}
 });
 const rows=[
  ['교장 선생님의 긴급 호출','campus','mina','{name}, 교장 선생님이 급히 찾으셔. 학교 지하에 누군가 침입했대!'],
  ['봉인실의 침입자','principal','morris','태양의 보석을 둔 지하 봉인실에 침입 흔적이 있다. 최초 목격자인 스콜에게 자세히 물어보렴.'],
  ['스콜의 목격담','classroom','scoll','낯선 자가 지하에서 나오기에 손님인지 물었더니 곧바로 달아났다. 얼굴은 어둠에 가려 보지 못했어.'],
  ['프리드의 거울','principal','morris','코볼트 방으로 이어지는 보일러실 지하에서 프리드의 거울을 찾아라. 거울로 보석의 진위를 확인해야 한다.'],
  ['지하에 숨겨진 거울','underpass','friedsMirror','낡은 석벽 틈에서 서늘한 빛을 내는 프리드의 거울을 발견했다.'],
  ['닫힌 태양의 봉인함','basement','suncrate14','태양의 보석 봉인함은 겉보기엔 멀쩡하지만 새로운 마법 자물쇠가 걸려 있다. 료마 선생님께 물어보자.'],
  ['거꾸로 된 주문','classroom','ryoma','봉인을 푸는 주문은 ‘라려열좀발제’다. 사마귀 가루가 있어야 글자가 제 순서로 돌아올 거야.'],
  ['사마귀 가루','materials','chilli','사마귀 가루를 조금 나눠 주마. 상자를 열 때는 님펜의 요정 날개가루도 함께 뿌려야 안전해.'],
  ['요정의 날개가루','nymphen','leona','봉인함을 상하게 하지 않을 만큼 고운 날개가루란다. 거울에 비친 모습까지 꼭 확인하렴.'],
  ['봉인의 역순 주문','basement','suncrate14','퍼즐'],
  ['거울을 제자리에','underpass','friedsMirror','태양의 보석이 무사한 것을 확인했다. 프리드의 거울을 원래 있던 석벽 틈에 돌려놓았다.'],
  ['모리스의 십자수','principal','morris','수고했다. 이 십자수를 마법사의 도시 글루글루에게 전해 다오. 이번 일의 마법 흔적을 읽을 수 있을 게다.'],
  ['스콜과 동행','lobby','scoll','중대한 일이니 내가 함께 가지. 먼저 데런 왕국에서 잠시 정비하고 마법사의 도시로 향하자.'],
  ['데런에서 갈라진 길','kingdom','scoll','잠깐 확인할 일이 생겼다. 너는 먼저 글루글루에게 가거라. 금방 따라가마.'],
  ['사라진 십자수','magecity','gluglu','가방에 십자수가 없다고? 오는 길에 누군가 손댄 모양이군. 스콜 선생님을 다시 찾아봐.'],
  ['꼭두각시가 된 아이작','classroom','isaac','전투'],
  ['과일을 먹은 오당카','hut','odangka','전투'],
  ['비어 있는 교장실','principal','hina','모리스 교장 선생님은 급히 외출하셨어. 조지 아저씨라면 어디로 가셨는지 봤을지도 몰라.'],
  ['조지가 본 뒷모습','campus','george','교장 선생님이 서둘러 북쪽으로 가시는 건 봤지만 목적지는 말씀하지 않으셨어.'],
  ['꼭두각시 마법','magecity','gluglu','사람을 난폭하게 만든 과일이라면 꼭두각시 마법이다. 최초 목격자가 스콜이었다면 보석이 위험해!'],
  ['먼저 도착한 스콜','basement','suncrate14','스콜이 봉인함 앞에 서 있다. 모리스의 십자수에서 보석의 위치를 읽었다며 아이스 체인을 날리고 사라졌다.'],
  ['나오미의 도움','classroom','naomi','정신이 들었구나. 스콜이 어둠에 조종당했다면 고향인 얼음 마을로 향했을 가능성이 커. 함께 가자.'],
  ['험프리의 오래된 기억','icevillage','humphrey','스콜은 아직 오지 않았다. 예전엔 눈썰매장을 만든다며 산사태를 내고 불꽃을 가져와 얼음을 녹였지.'],
  ['카디쟈에게 갔을까','icevillage','naomi','스콜이 가장 먼저 떠올릴 사람은 카디쟈일 거야. 아수리아로 가서 편지를 받았는지 확인하자.'],
  ['스콜이 남긴 편지','cardiahome','cardia','스콜 선생님에게서 편지가 왔습니다. 태양의 보석을 선물로 가져오겠다고 적혀 있어 불길해요.'],
  ['어둠에 물든 스콜','asuria','scoll','스콜전투'],
  ['헝거의 기습','asuria','hunger','이제야 태양의 보석을 되찾았군. 복수하고 싶다면 북쪽으로 와라. 거기서 기다리지!']
 ];
 const start=241,end=start+rows.length;
 x.quests.splice(199,1,...rows.map(([title,scene,id])=>['제14화 · '+title,(x.npcs[id]?.name||title)+' 만나기',scene,id]),['제14화 완료 · 숨어든 어둠','헝거가 태양의 보석을 빼앗아 북쪽으로 달아났습니다.','campus','none']);
 x.chapters.push([start,end,'제14화 숨어든 어둠 · 스콜']);
 x.encounters.isaac14={name:'꼭두각시 아이작',bg:'assets/maps-hires/school-interior.webp',intro:'검은 실이 아이작의 움직임을 억지로 끌어당깁니다.',next:257,setFlag:'isaacFreed',xp:170,gold:80,sp:40,enemies:[{name:'꼭두각시 아이작',element:2,hp:500,maxHp:500,atk:21,atb:9,sprite:'isaac14'}]};
 x.encounters.odangka14={name:'꼭두각시 오당카',bg:'assets/maps-hires/witch-hut.webp',intro:'과일의 마법에 물든 오당카가 지팡이를 휘두릅니다.',next:258,setFlag:'odangkaFreed',xp:185,gold:90,sp:45,enemies:[{name:'꼭두각시 오당카',element:2,hp:590,maxHp:590,atk:23,atb:12,sprite:'odangka'}]};
 x.encounters.scoll14={name:'어둠에 물든 스콜',bg:'assets/maps-hires/asuria.webp',intro:'나오미와 함께 스콜의 꼭두각시 마법을 끊어야 합니다.',next:267,setFlag:'scollFreed',xp:235,gold:140,sp:65,enemies:[{name:'꼭두각시 스콜',element:1,hp:780,maxHp:780,atk:26,atb:16,sprite:'darkScoll'}]};
 x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);if(s.stage<start)return;
  const add=(id,xp,yp,fixture=false)=>{if(!sc.entities.some(e=>e.id===id))sc.entities.push({...n(id,xp,yp),...(fixture?{type:'fixture'}:{})});};
  if(sc.id==='classroom'&&[243,253,256].includes(s.stage))add(s.stage===256?'isaac':'scoll',s.stage===256?530:790,225);
  if(sc.id==='classroom'&&s.stage===247)add('ryoma',646,198);if(sc.id==='classroom'&&s.stage===262)add('naomi',530,185);
  if(sc.id==='underpass'&&[245,251].includes(s.stage))add('friedsMirror',905,375,true);
  if(sc.id==='basement'&&[246,250,261].includes(s.stage)){add('suncrate14',445,285,true);if(s.stage===261)add('scoll',305,305);}
  if(sc.id==='materials'&&s.stage===248)add('chilli',430,290);if(sc.id==='nymphen'&&s.stage===249)add('leona',596,206);
  if(sc.id==='lobby'&&s.stage===253)add('scoll',530,320);if(sc.id==='kingdom'&&s.stage===254)add('scoll',546,590);
  if(sc.id==='magecity'&&[255,260].includes(s.stage))add('gluglu',450,324);if(sc.id==='principal'&&s.stage===258)add('hina',520,260);
  if(sc.id==='icevillage'&&s.stage===263)add('humphrey',397,466);if(sc.id==='icevillage'&&s.stage===264)add('naomi',520,390);
  if(sc.id==='asuria'&&s.stage===266)add('scoll',408,342);if(sc.id==='asuria'&&s.stage===267)add('hunger',408,342);
  if(sc.id==='classroom'&&s.stage===256)add('cursedFruit',646,198,true);
 };
 x.questItems=s=>[...items(s),...(s.friedsMirror?[['프리드의 거울','진짜 물건을 비추면 거울 속에 가두는 오래된 마법 도구']]:[]),...(s.mantisDust?[['사마귀 가루','거꾸로 적힌 봉인 주문을 되돌리는 재료']]:[]),...(s.wingDust14?[['요정의 날개가루','태양의 보석 봉인함을 안전하게 여는 가루']]:[]),...(s.morrisStitch?[['모리스의 십자수','글루글루에게 전할 태양 문양 자수']]:[])];
 x.interact=(e,a)=>{const s=a.state,i=s.stage-start,r=rows[i];if(!r||r[1]!==s.scene||r[2]!==e.id)return prior(e,a);
  if(r[3]==='전투'){a.battle(e.id==='isaac'?'isaac14':e.id==='odangka'?'odangka14':'scoll14');return true;}
  if(r[3]==='스콜전투'){a.talk([['scoll','카디쟈에게 줄 최고의 선물을 가져왔다. 누구도 태양의 보석을 빼앗지 못하게 하겠다!'],['naomi','스콜, 그건 네 의지가 아니야. {name}, 꼭두각시의 검은 실을 함께 끊자!']],()=>a.battle('scoll14'));return true;}
  if(r[3]==='퍼즐'){a.choicePuzzle(['거꾸로 적힌 봉인 주문','사마귀 가루를 뿌리자 글자가 돌아가기 시작했다. 올바른 주문은?', ['제발 좀 열려라','열려라 태양의 문','라려열 좀 발제'],0,'‘라려열좀발제’를 뒤에서부터 읽어 보자.'],()=>{s.sunGemVerified=true;s.mantisDust=false;s.wingDust14=false;a.advance(s.stage+1,15);a.refresh();a.save();});return true;}
  const lines=e.id==='hunger'?[[e.id,r[3]],['naomi','헝거가 보석을 물고 북쪽으로 달아났어. 스콜은 정신을 차렸지만 추격은 다음 준비가 필요해.']]:[[e.id==='friedsMirror'||e.id==='suncrate14'?'narrator':e.id,r[3]],['you',i===26?'반드시 태양의 보석을 되찾겠어!':'흔적을 놓치지 않고 확인해 볼게요.']];
  a.talk(lines,()=>{const q=s.stage,flags={245:'friedsMirror',246:'sunSealChecked',248:'mantisDust',249:'wingDust14',251:'mirrorReturned',252:'morrisStitch',255:'stitchMissing',260:'puppetClue',261:'sunGemGone',267:'hungerStoleGem'};if(flags[q])s[flags[q]]=true;if(q===251)s.friedsMirror=false;if(q===255)s.morrisStitch=false;if(q===256)s.puppetFruit=true;
   a.advance(q+1,q===267?55:10);a.refresh();a.save();if(q===267)a.finish('제14화 완료 · 숨어든 어둠','꼭두각시 마법에 빠진 스콜을 구했지만 헝거가 태양의 보석을 빼앗아 북쪽으로 달아났습니다.');
  });return true;
 };
})();
