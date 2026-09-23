/* 40.png: Hina's letter, classmates' 20-monster assignments, Dobiel's 20-monster
   request and Hunger/Hina confrontations. Ending order: wonavy.tistory.com/232.
   Chief's scorpion count is not legible: the three-enemy encounter is reconstruction. */
(()=>{
 const x=ARPIA_EXTRA,m=ARPIA_MIDTERM,h=ARPIA_WAR_HELPERS;
 ARPIA_DATA.ITEMS.mt_letter40={name:'히나에게 보낸 특급 편지',desc:'할라할라 촌장의 이름으로 온 편지',kind:'quest',price:0,sell:0,icon:'assets/midterm/certificate.png'};
 Object.assign(x.npcs,{
  fireHunt40:{name:'숙제 · 파이어 골렘',artPath:'assets/original/pet-images/examFire/idle1.gif',height:70},
  dragonHunt40:{name:'숙제 · 아기 대지용',artPath:'assets/midterm/earth-dragon.png',height:80},
  iceHunt40:{name:'아이스 골렘',artPath:'assets/original/pet-images/cubic/idle1.gif',height:70},
  scorpionHunt40:{name:'오아시스를 위협하는 화염 전갈',artPath:'assets/restored/flame-scorpion.png',height:65},
  waterfallHunt40:{name:'폭포 주변의 몬스터',artPath:'assets/white-wolf.png',height:65}
 });
 const r=(key,title,scene,npc,lines,extra={})=>({key,title,scene,npc,lines,...extra});
 const rows=[
 r('absence','칭찬받는 날의 빈자리','classroom','julia',[['julia','두 왕국의 전쟁을 막느라 수고했어. 서로를 의심하던 사람들이 네 덕분에 이야기를 나눌 수 있게 되었구나.'],['you','그런데 히나는요? 오늘도 자리가 비어 있어요.'],['julia','학교에 나오지 않고 있단다. 같은 숙제 조였던 마틸다에게 물어보겠니?']]),
 r('matilda','힌트보다 먼저 나온 숙제','campus','matilda',[['you','히나를 찾고 있어. 마지막으로 어디서 봤어?'],['matilda','나, 내 숙제는 칼라마 사막에서 파이어 골렘 20마리 잡기야.'],['you','그걸 내가 대신 해 달라는 거야? 히나 소식이 급한데.'],['matilda','도와주면 이야기해 줄게. 난 데런 왕국의 미로에 있을 거야.']]),
 r('fireHunt','마틸다의 숙제 · 파이어 골렘 20마리','kalama31','fireHunt40',[['you','먼저 골렘들을 정리하자. 끝나면 미로의 마틸다에게 가는 거야.']],{fixture:true,pos:[1120,490],battle:'fireHunt40'}),
 r('matildaBack','미로 북동쪽의 마틸다','derenmaze38','matilda',[['matilda','아이작은 항구 마을 동물이 멋지고 항구 도시 쥬다로 갔어. 그곳으로 가봐.'],['you','이제야 알려 주는구나. 히나와 함께 있었는지는 아이작에게 물어봐야겠네.']],{pos:[1020,120]}),
 r('isaac','아이작의 어려운 숙제','judah','isaac',[['you','히나가 어디로 갔는지 알아? 너와 함께 있었다고 들었어.'],['isaac','아기 대지용 20마리 잡기야. 으… 생각만 해도 끔찍해. 내 실력으론 어림없어.'],['you','너도 숙제부터 도와 달라는 거지?'],['isaac','응. 계곡에서 잡아 주면 내가 본 걸 말해 줄게.']]),
 r('dragonHunt','아이작의 숙제 · 아기 대지용 20마리','dragonValley39','dragonHunt40',[['you','이번에는 아기 대지용 스무 마리야. 물약을 챙기고 차례로 상대하자.']],{fixture:true,battle:'dragonHunt40'}),
 r('isaacBack','급히 떠난 히나','judah','isaac',[['isaac','그런데 히나에게 특급 편지가 배달되어 온 거야. 히나는 그 편지를 보더니 급히 어디로 떠났어.'],['you','누가 보낸 편지였어?'],['isaac','그건 못 봤어. 우체국에 물어보면 알 수 있지 않을까?']]),
 r('post','다른 사람에게 온 편지','shop','conrad',[['you','히나에게 온 특급 편지의 발신인을 알고 싶어요. 그 편지를 읽고 사라졌대요.'],['conrad','수신인의 우편물을 마음대로 보여 줄 수는 없습니다. 학교의 확인을 받아 오세요.'],['you','교장 선생님께 히나의 소식이 끊겼다고 말씀드려야겠어요.']]),
 r('permission','교장의 확인을 받기 전에','principal','morris',[['you','히나가 특급 편지를 받고 떠났대요. 우체국에서 학교의 확인이 필요하다고 했어요.'],['morris','알겠다. 우선 아이스 골렘 스무 마리를 잡고 오너라. 추적에 나설 준비가 되었는지 확인하겠다.'],['you','학교 밖까지 찾아가야 할지도 모르니 준비해서 다녀올게요.']]),
 r('iceHunt','아이스 골렘 20마리','icedungeon','iceHunt40',[['you','아이스 골렘 스무 마리를 쓰러뜨리고 교장 선생님께 돌아가자.']],{fixture:true,pos:[621,346],battle:'iceHunt40'}),
 r('permissionBack','학교의 확인','principal','morris',[['morris','우체국에 학교에서 보냈다고 전하거라. 히나가 위험에 빠졌다면 혼자 무리하지 말고 도움을 청해야 한다.'],['you','우선 편지를 보낸 사람부터 확인하겠습니다.']]),
 r('letter','할라할라 촌장의 특급 편지','shop','conrad',[['conrad','학교의 확인을 받았군요. 발신인은 칼라마의 할라할라 촌장입니다. 히나에게 급히 와 달라는 내용이었어요.'],['you','오아시스에서 무슨 일이 생긴 걸까요? 촌장님을 직접 만나 봐야겠어요.']],{effect:s=>m.give(s,'letter40')}),
 r('chief','편지를 쓰지 않았다는 촌장','kalama31','halahala31',[['halahala31','아르피아의 히나 마법사? 난 그녀에게 편지 보낸 적이 없는데.'],['you','분명 촌장님 이름으로 온 편지였어요. 누군가 이름을 빌린 걸까요?'],['halahala31','최근 칼라마 사막에 화염 전갈이 늘어나서 우리 부족 사람들이 위험을 겪고 있다오.'],['you','오아시스 쪽 전갈을 물리치고 다시 이야기를 들어 볼게요.']],{pos:[760,305]}),
 r('scorpions','오아시스의 화염 전갈','kalama31','scorpionHunt40',[['narrator','오아시스로 이어지는 길에 화염 전갈들이 몰려 있었다.'],['you','사람들이 물을 길으러 나올 수 있게 길부터 열자.']],{fixture:true,pos:[950,360],battle:'scorpions40'}),
 r('forgery','쭐루쭐루가 털어놓은 협박','kalama31','jjullu31',[['jjullu31','저에게는 아버지의 이름으로 히나님에게 편지를 보내라고 협박을 했지요…'],['you','누가 그렇게 하라고 했나요?'],['jjullu31','늑대의 도시를 지배하는 헝거예요. 거절하면 마을을 가만두지 않겠다고 했어요.'],['you','촌장님은 모르셨던 거군요. 히나는 헝거에게 속아서 간 거야.']],{pos:[560,430],requires:{letter40:1},effect:s=>m.take(s,'letter40')}),
 r('princess','늑대의 도시에서 만난 히나','wolfcity31','hina',[['you','히나! 모두 걱정하고 있어. 그 편지는 가짜였어.'],['hina','난 이제 늑대의 도시 공주야. 호호호~'],['you','여기서 무슨 일이 있었던 거야? 헝거는 어디 있어?'],['hina','집 안에 있겠지. 난 지금 돌아갈 생각 없어.']],{pos:[805,260]}),
 r('hunger','헝거의 엉뚱한 심부름','hungerHouse40','hunger',[['you','쭐루쭐루를 협박해서 히나에게 가짜 편지를 보냈지? 무슨 속셈이야?'],['hunger','사실 내가 물고기를 좋아하는데, 웨일라에서 제일 맛있는 물고기가 산다는 곳은 쟈칼의 폭포야.'],['you','물어본 말에 대답부터 해!'],['hunger','아니… 물고기 중 가장 맛있다는 황금잉어를 10마리 잡아다 줘. 그때 이야기하자.'],['you','왜 이렇게 말을 돌리지? 폭포의 도비엘이라면 뭔가 알지도 몰라.']]),
 r('dobiel','물고기를 잘 잡는 도비엘','waterfall','dobiel',[['dobiel','난 물고기를 잘 잡아요. 쟈칼의 폭포 근처에서 얼쩡거리는 몬스터 20마리를 잡아야 해요.'],['you','주변이 시끄러워서 물고기가 다 도망간 거야? 먼저 길을 정리할게.']],{pos:[305,374]}),
 r('waterfallHunt','폭포 주변 몬스터 20마리','waterfall','waterfallHunt40',[['you','물가를 어지럽히는 몬스터들부터 잡자. 도비엘이 안심하고 나올 수 있게.']],{fixture:true,pos:[379,337],battle:'waterfallHunt40'}),
 r('warning','황금잉어보다 먼저 할 일','waterfall','dobiel',[['dobiel','그런데 왜 헝거가 먹을 물고기를 네가 구해 줘요? 히나를 찾으러 왔다면서요.'],['you','맞아. 편지 이야기는 한마디도 안 하고 자꾸 심부름만 시켰어.'],['dobiel','시간을 끌려는 것 같아요. 집으로 돌아가서 제대로 물어봐요.'],['you','더는 엉뚱한 부탁에 끌려다니지 않을 거야.']],{pos:[305,374]}),
 r('confront','더는 말을 돌리지 마','hungerHouse40','hunger',[['you','황금잉어 이야기는 그만해. 가짜 편지로 히나를 부른 이유를 말해!'],['hunger','아앗! 이 녀석, 갑자기 덤벼들면…'],['you','또 도망가려고? 이번에는 끝까지 듣겠어!']],{battle:'hunger40'}),
 r('complaint','납치범의 뜻밖의 하소연','hungerHouse40','hunger',[['hunger','나의 음모를 얘기하는 건… 제발 히나라는 저 여자애 좀 데려가 줘… 못 살겠어.'],['you','네가 가짜 편지까지 써서 데려왔잖아.'],['hunger','잡혀온 첫날부터 나한테 목욕을 안 한다, 청소를 안 한다… 부하 늑대들에게는 털을 빗지 않는다며 온갖 잔소리를 하는 것도 모자라…'],['hunger','나의 소굴을 차지하고는 잠을 자는 바람에, 나는 추운 밖에서 잠을 잘 수밖에 없는 처지가 됐지.'],['hunger','또, 먹는 건 얼마나 까다롭고 많이 먹는지… 부하 늑대들이 히나의 먹을거리를 마련하느라 다 힘들어 말라버렸어.'],['you','황금잉어도 히나에게 줄 음식이었구나.'],['hunger','쟤 좀 제발 데려가.']]),
 r('hinaDuel','돌아가지 않겠다는 히나','hungerHouse40','hina',[['you','히나, 이제 학교로 돌아가자. 선생님들도 친구들도 걱정해.'],['hina','싫어. 여기가 얼마나 편한데. 먹을 것도 맛있는 걸로만 알아서 척척 구해 오고…'],['you','그래도 가짜 편지로 널 데려온 곳이야. 이대로 있을 수는 없어.'],['hina','그렇게 데려가고 싶으면 나부터 이겨 봐!']],{battle:'hina40'}),
 r('thanks','찾으러 온 친구','wolfcity31','hina',[['hina','정말 끝까지 나를 데리러 왔네.'],['you','당연하지. 말도 없이 사라졌는데 걱정했어.'],['hina','알았어. 이번에는 같이 돌아갈게. …찾으러 와 준 건 고마워.'],['you','다음에 수상한 편지를 받으면 혼자 떠나기 전에 말해 줘.'],['hina','너도 잔소리가 늘었어. 어서 가자.']],{pos:[805,260],effect:s=>s.hinaRescued40=true}),
 r('report','다시 채워진 교실의 자리','classroom','julia',[['julia','둘 다 무사히 돌아왔구나. 히나, 모두 네 소식을 기다렸단다.'],['hina','걱정 끼쳐서 죄송해요. 다음에는 먼저 말씀드릴게요.'],['you','헝거가 촌장님 이름을 빌려 편지를 보냈어요. 칼라마 사람들도 협박을 받았고요.'],['julia','이번에는 무사해서 다행이지만, 그 사실도 교장 선생님께 알려야겠구나. 수고했다.']],{effect:s=>s.chapter40Complete=true,ending:'가짜 편지를 추적해 늑대의 도시에서 히나를 데려왔습니다. 헝거의 음모와 심부름 소동을 끝내고 친구와 함께 학교로 돌아왔습니다.'})
 ];
 const c=m.register(40,'늑대의 도시 히나',rows,{fireKills40:0,dragonKills40:0,iceKills40:0,waterfallKills40:0,hinaRescued40:false,chapter40Complete:false});
 const counted=(id,key,field,next,enemy,bg)=>{const e=x.encounters[id]={name:x.npcs[id].name,bg,next:s=>s[field]>=20?c.keys[next]:c.keys[key],xp:90,gold:20,sp:6,enemies:[enemy],prepare:s=>({enemies:Array.from({length:Math.min(3,20-(s[field]||0))},()=>({...enemy}))}),onWin:(s,b)=>s[field]=Math.min(20,(s[field]||0)+b.enemies.filter(e=>e.hp<=0).length),progress:s=>`${s[field]||0}/20마리`};return e;};
 counted('fireHunt40','fireHunt','fireKills40','matildaBack',{name:'파이어 골렘',hp:620,maxHp:620,atk:24,element:0,sprite:'examFire'},'assets/chapter31/kalama-oasis.png');
 counted('dragonHunt40','dragonHunt','dragonKills40','isaacBack',{name:'아기 대지용',hp:660,maxHp:660,atk:24,element:2,artPath:'assets/midterm/earth-dragon.png',height:130},'assets/maps-hires/forest-battle.png');
 counted('iceHunt40','iceHunt','iceKills40','permissionBack',{name:'아이스 골렘',hp:620,maxHp:620,atk:24,element:1,sprite:'cubic'},'assets/maps-hires/ice-village.png');
 counted('waterfallHunt40','waterfallHunt','waterfallKills40','warning',{name:'폭포의 야생 늑대',hp:600,maxHp:600,atk:24,element:1,artPath:'assets/white-wolf.png',height:115},'assets/jackal-waterfall.png');
 x.encounters.scorpions40={name:'칼라마의 화염 전갈',bg:'assets/chapter31/kalama-oasis.png',next:c.keys.forgery,xp:500,gold:100,sp:65,enemies:Array.from({length:3},()=>({name:'화염 전갈',hp:700,maxHp:700,atk:25,element:0,artPath:'assets/restored/flame-scorpion.png',height:110}))};
 x.encounters.hunger40={name:'늑대의 집 · 헝거',bg:'assets/chapter40/hunger-house-v1.png',next:c.keys.complaint,xp:650,gold:150,sp:75,enemies:[{name:'헝거',hp:3100,maxHp:3100,atk:35,element:1,sprite:'hunger',height:175}]};
 x.encounters.hina40={name:'늑대의 도시 공주 히나',bg:'assets/chapter40/hunger-house-v1.png',next:c.keys.thanks,xp:650,gold:100,sp:75,enemies:[h.npc('히나','hina',2900,0)]};
 const q=x.questItems;x.questItems=s=>{const row=c.steps[s.stage-c.start],e=row&&x.encounters[row.battle];return [...q(s),...(e?.progress?[[row.title,e.progress(s)]]:[])];};
 x.map.push(['hungerHouse40','늑대의 도시 · 헝거의 집',[155,440]]);
 x.scenes.hungerHouse40=(s,n,p)=>({id:'hungerHouse40',name:'늑대의 도시 · 헝거의 집',bg:'assets/chapter40/hunger-house-v1.png',w:960,h:540,zoom:1.05,nodes:[[155,440],[310,385],[460,350],[600,285],[745,330]],edges:[[0,1],[1,2],[2,3],[3,4]],entities:[p('back','늑대의 도시',155,440,'wolfcity31',[805,260])]});
 const decorate=x.decorate;x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);if(sc.id==='wolfcity31'&&s.stage>=c.keys.princess)sc.entities.push(p('hunger-house40','헝거의 집',805,130,'hungerHouse40',[155,440]));};
})();
