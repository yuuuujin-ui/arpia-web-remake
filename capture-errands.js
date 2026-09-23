/* Sources: alicer.tistory.com/178, /179, /144, /184, /157, /177, /85, /60, /118.
   Original NPC order/counts; paraphrased dialogue, compressed maps and new battle balance. */
window.ARPIA_CAPTURE_ERRANDS=(()=>{
 const x=ARPIA_EXTRA,F=ARPIA_FREE,D=ARPIA_DATA,I=ARPIA_SYS.inv;
 const R=(scene,npc,pos,title,lines,extra={})=>({scene,npc,pos,title,lines,...extra});
 const item=(id,name,icon)=>D.ITEMS[id]={name,kind:'quest',price:0,sell:0,desc:'프리 미션 전달 물품',icon};
 item('staffWood','뚫어나무','assets/items/firewood.png');item('ryomaNewStaff','료마의 새 지팡이','assets/items/staff_plus.png');
 item('mailRoughDiamond','분실 우편물 · 다이아몬드 원석','assets/items/diamond.png');item('eggManaStone','가루다에게 전할 마나스톤','assets/items/manastone.png');
 x.npcs.eggPatrol={name:'압둘라의 부탁 · 몬스터 사냥'};
 Object.assign(x.npcs,{staffPatrol100:{name:'나무를 지키기 위한 사냥'},staffPatrol50:{name:'조커의 몬스터 잼 재료'},staffHula:{name:'뚫어나무를 지닌 훌라 버섯',artPath:'assets/midterm/hula-large.png',height:80},patientUgauga:{...x.npcs.ugauga26,name:'다친 우가우가'},patientBand:{...x.npcs.bandmole26,name:'밴드 두더지'},ghostPatrolFree:{name:'왕국 미로의 몬스터'},ghostEdwardFree:{...x.npcs.edward,name:'미로의 에드워드'}});
 x.npcs.hubert.portrait='other/휴버트.png';Object.assign(x.npcs.ryoma,{portrait:'teacher/료마.png',anim:'npc_011_도트_료마'});
 const routes={
  ryoma_staff:[
   R('classroom','ryoma',[646,198],'료마의 부러진 지팡이',[['ryoma','마법은 힘을 많이 쓴다고 잘 되는 것이 아니다. 흐름을 한곳으로 모아…… 어?'],['narrator','작은 불꽃이 튀는 순간 지팡이 끝에서 마른 소리가 났다.'],['you','선생님, 지팡이가 부러졌어요!'],['ryoma','오래 쓰기는 했지. 새 지팡이를 만들 뚫어나무가 필요하구나. 라우라 촌장을 찾아가 보렴.']]),
   R('earthvillage','laura',[397,466],'희귀한 뚫어나무의 사정',[['laura','뚫어나무는 함부로 베면 안 되는 희귀한 나무란다.'],['you','료마 선생님의 지팡이가 부러졌어요. 조금만 구할 방법이 없을까요?'],['laura','우선 몬스터 100마리를 물리쳐 마을 일을 도와주렴. 그러면 나무를 구할 방법을 알려 주마.']]),
   R('forest','staffPatrol100',[500,355],'몬스터 100마리 사냥',[['you','주변을 살피며 몬스터들을 몰아내자. 다른 일을 하면서 만난 몬스터도 기록해 두면 되겠어.']],{hunt:{field:'staffFirstKills',max:100},battle:'errandStaff100'}),
   R('earthvillage','laura',[397,466],'훌라 버섯에게 나무 구하기',[['laura','마을을 도와주었구나. 뚫어나무는 훌라 버섯에게서 구해 보렴.'],['you','나무를 베어 오는 것보다 낫겠네요. 다녀올게요.']]),
   R('earthdungeon','staffHula',[1360,1540],'훌라 버섯과 대결',[['you','저 훌라 버섯이 나무를 지니고 있어. 먼저 공격을 피하자!']],{battle:'errandStaffHula',give:'staffWood',fixedTile:true}),
   R('classroom','ryoma',[646,198],'료마에게 뚫어나무 보여 주기',[['you','뚫어나무를 구했어요. 이제 지팡이를 만들 수 있겠죠?'],['ryoma','좋은 나무구나. 제작은 조커에게 부탁해 주렴. 그 방면에도 재주가 있단다.'],['you','장난감만 만드는 분인 줄 알았는데 지팡이도 만드시는군요.']]),
   R('magecity','joker',[430,325],'조커에게 제작 부탁하기',[['joker','료마가 보냈다고? 나무도 좋고, 만들 수 있겠군.'],['you','완성될 때까지 기다리면 될까요?'],['joker','그동안 몬스터 50마리만 잡아 오게. 몬스터 잼을 만들 재료가 필요해서 말이야.'],['you','또 사냥이군요. 이번에는 50마리, 잊지 않을게요.']],{take:'staffWood'}),
   R('forest','staffPatrol50',[500,355],'제작을 기다리며 몬스터 50마리',[['you','지팡이가 완성될 때까지 조커의 부탁을 마저 해결하자.']],{hunt:{field:'staffSecondKills',max:50},battle:'errandStaff50'}),
   R('magecity','joker',[430,325],'완성된 지팡이 받기',[['joker','약속한 일을 마쳤군. 지팡이도 다 되었네.'],['you','나뭇결이 예쁘게 살아 있네요. 선생님이 좋아하시겠어요.'],['joker','마력이 흐르는 길도 잘 잡아 두었지. 조심해서 전해 주게.']],{give:'ryomaNewStaff'}),
   R('classroom','ryoma',[646,198],'료마에게 새 지팡이 전달',[['ryoma','훌륭하구나. 수고가 많았다.'],['you','나무를 구하는 일부터 제작까지, 지팡이 하나에도 손이 많이 가네요.'],['ryoma','그러니 도구도 소중히 다루어야겠지. 다음 수업에서는 더 안정된 마법을 보여 주마.']],{take:'ryomaNewStaff'})
  ],
  hubert1:[
   R('campus','mina',[433,260],'미나의 급한 전갈',[['mina','휴버트 선생님이 너를 찾으셔. 급한 일인가 봐. 어서 펫 병원으로 가 봐.'],['you','환자에게 무슨 일이 생긴 걸까? 지금 가 볼게.']]),
   R('petcenter','hubert',[480,430],'사라진 환자 우가우가',[['hubert','다리를 다친 우가우가가 병원을 나가 버렸다. 치료가 끝나지 않았는데 걱정이구나.'],['you','아픈 다리로 멀리 갔을까요?'],['hubert','웨일라 대륙 북쪽을 살펴봐 다오. 발견하면 무리하게 뛰지 않도록 데려오렴.']]),
   R('weila','patientUgauga',[3600,3800],'얼음마을 근처의 우가우가',[['you','우가우가! 여기 있었구나. 그 다리로 계속 걸으면 더 아파져.'],['narrator','우가우가는 다친 다리를 움츠리며 주인공을 바라보았다.'],['you','혼내러 온 게 아니야. 천천히 걸어서 병원으로 돌아가자.']],{fixedTile:true}),
   R('petcenter','hubert',[480,430],'우가우가를 응급실로',[['hubert','다리 상태가 심각하구나. 우가우가, 어서 응급실로 가자.'],['you','다행히 멀리 달아나기 전에 찾았어요.'],['hubert','잘 데려와 주었다. 다시 걸을 수 있도록 끝까지 치료하마.']])
  ],
  hubert2:[
   R('campus','mina',[433,260],'미나와 두 번째 전갈',[['mina','왜 그렇게 졸린 얼굴이야? 휴버트 선생님이 또 너를 찾으셔.'],['you','쪽지시험 때문에 밤늦게 공부했거든. 이번에도 급한 일이야?'],['mina','직접 가서 들어 봐. 펫 병원에서 기다리고 계셔.']]),
   R('petcenter','hubert',[480,430],'밴드 두더지를 찾아라',[['hubert','이번에는 우가우가의 여자친구인 밴드 두더지가 사라졌단다.'],['you','또 대륙을 찾아봐야겠네요.'],['hubert','데런과 마법사의 도시 사이 길을 살펴보렴. 놀라서 공격할 수도 있으니 조심하고.']]),
   R('weila','patientBand',[2900,7400],'길목의 밴드 두더지',[['you','찾았다! 병원으로 같이 돌아가자.'],['narrator','밴드 두더지가 겁에 질린 채 공격해 왔다.'],['you','다치게 하려는 게 아니야. 먼저 진정시켜야겠어!']],{battle:'errandPatientBand',fixedTile:true}),
   R('petcenter','hubert',[480,430],'밴드 두더지의 귀환',[['hubert','둘 다 무사히 돌아왔구나. 정말 다행이다.'],['you','갑자기 공격해서 놀랐어요. 다시 달아나지 않도록 잘 보살펴 주세요.'],['hubert','치료뿐 아니라 마음도 편해지도록 돌보마. 수고했다.']])
  ],
  deren_ghost:[
   R('kingdom','matilda',[546,590],'미로에서 들리는 귀신 소리',[['matilda','왕국 미로에 귀신이 있다는 소문 때문에 사람들이 겁을 먹었어. 네가 가서 확인해 봐.'],['you','정말 귀신일까요? 먼저 흔적부터 살펴볼게요.'],['matilda','연잎니그로와 유령마를 각각 15마리씩 몰아내면 조사하기도 쉬워지겠지.']]),
   R('derenmaze38','ghostPatrolFree',[840,390],'미로의 두 몬스터 무리',[['you','모습이 비슷해도 두 종류를 따로 살펴보자. 귀신 소리도 계속 들리는지 확인해야 해.']],{hunt:{field:'ghostLilyKills',max:15,second:'ghostHorseKills',secondMax:15},battle:'errandGhostPatrol'}),
   R('kingdom','matilda',[546,590],'몬스터를 쫓아낸 뒤에도 들리는 소리',[['you','몬스터를 쫓아냈는데도 이상한 소리가 남아 있어요.'],['matilda','에드워드 경도 미로에 갔다던데…… 안쪽에서 찾아봐.'],['you','소리가 나는 곳을 아실지도 모르겠네요.']]),
   R('derenmaze38','ghostEdwardFree',[360,390],'귀신 소리의 정체',[['ghostEdwardFree','핫! 이야압!'],['you','에드워드 경? 귀신이 아니라 훈련 기합 소리였군요!'],['ghostEdwardFree','그렇게 멀리 들렸나? 이왕 왔으니 훈련 상대가 되어 주겠나.'],['you','대련을 마치고 공주님께 오해였다고 알려 드릴게요.']],{battle:'errandGhostEdward'}),
   R('kingdom','matilda',[546,590],'귀신 소동을 마무리하다',[['you','소리의 정체는 에드워드 경의 훈련 기합이었어요.'],['matilda','뭐야, 그런 일이었어? 괜히 다들 겁을 먹었잖아.'],['you','미로에서 울리니 다르게 들렸나 봐요. 이제 주민들께 안심하셔도 된다고 전해 주세요.'],['matilda','알았어. 어쨌든 잘 조사해 왔네.']])
  ]
 };
 routes.mail=[
  R('campus','hina',[520,370],'히나가 전하는 우체국 소식',[['hina','우체국의 콘라드 아저씨가 곤란한 일을 겪고 계신대. 가서 도와드리지 않을래?'],['you','무슨 일이 생겼는지 먼저 들어 봐야겠어.']]),
  R('shop','conrad',[596,335],'매에게 습격당한 배달 비둘기',[['conrad','배달 비둘기가 가던 중에 매에게 습격을 받았단다. 그때 다이아몬드 원석을 떨어뜨린 모양이야.'],['you','우편물이 사라져서 걱정하고 계셨군요. 어디로 가던 길이었나요?'],['conrad','웨일라 대륙 북쪽이란다. 독수리 마을과 얼음마을 사이를 살펴봐 주렴.'],['you','발밑도 잘 보면서 찾아볼게요.']]),
  R('weila','mailDiamond',[3450,3000],'북쪽 길에서 원석 찾기',[['narrator','풀 사이에서 작은 빛이 반짝였다. 우편물 표식이 남은 다이아몬드 원석이다.'],['you','여기에 떨어져 있었구나! 콘라드 아저씨께 돌려드리자.']],{give:'mailRoughDiamond',fixedTile:true}),
  R('shop','conrad',[596,335],'분실한 우편물 돌려주기',[['conrad','찾아 주었구나! 이제 기다리던 분께 배달할 수 있겠어.'],['you','북쪽 길의 풀 사이에 있었어요. 다음에는 비둘기도 무사히 다녀오면 좋겠네요.'],['conrad','그러게 말이다. 덕분에 큰 걱정을 덜었어. 고맙다.']],{take:'mailRoughDiamond'})
 ];
 routes.egg=[
  R('infirmary','buma',[255,204],'건강센터의 맥반석 계란',[['buma','건강센터의 맥반석 계란이 다 떨어졌어요. 공급을 맡은 압둘라에게 가서 사정을 알아봐 주시겠어요?'],['you','쥬다 항구로 가면 되죠? 다녀올게요.']]),
  R('judah','abdullah',[440,380],'공급처를 알려 주는 조건',[['abdullah','알의 공급처가 궁금하시오? 나도 먼저 부탁할 일이 있소.'],['you','어떤 일인데요?'],['abdullah','몬스터 30마리를 잡아 주시오. 일을 마치면 공급처를 알려 드리겠소.'],['you','알겠어요. 건강센터에서도 기다리고 있으니 서둘러야겠네요.']]),
  R('forest','eggPatrol',[500,355],'몬스터 30마리 사냥',[['you','압둘라와 약속한 30마리를 채우자.']],{hunt:{field:'fc_egg',max:30},battle:'errandEgg30'}),
  R('judah','abdullah',[440,380],'맥반석 계란의 정체',[['abdullah','수고했소. 알은 독수리 마을에서 공급받고 있소.'],['you','독수리 마을이라고요? 제가 알고 있던 그 계란이요?'],['abdullah','웨일라에서는 닭이 귀하오. 우리가 먹던 것은 독수리 알이지.'],['you','전혀 몰랐어요! 가루다님께 여쭤 봐야겠네요.']]),
  R('eaglevillage','garuda',[296,140],'가루다가 마나스톤을 쓰는 이유',[['you','건강센터에서 알을 기다리고 있어요. 그런데 가루다님이 공급해 주셨다니 놀랐어요.'],['garuda','내가 암컷인 줄 몰랐나 보구나. 겉모습만 보고 짐작해서는 안 되지.'],['you','제가 멋대로 생각했네요. 죄송해요.'],['garuda','나이가 많아 내 힘만으로 많은 알을 공급하기는 어렵단다. 그래서 마나스톤의 힘을 빌리고 있었지.'],['you','마나스톤이 떨어져서 공급이 끊겼군요. 시바님께 구할 곳을 여쭤볼게요.']]),
  R('eaglevillage','shiva',[219,233],'학교 지하의 비밀 방',[['shiva','마나스톤은 학교 지하의 비밀 방에서 구할 수 있을 게다.'],['you','학교 가까이에 있었군요. 제가 찾아서 가져올게요.'],['shiva','어두운 곳이니 발밑을 조심하렴. 가루다님께 바로 전해 드리면 된다.']]),
  R('basement','eggStone',[445,285],'지하에서 마나스톤 챙기기',[['narrator','지하의 물품 사이에서 마나스톤을 발견했다.'],['you','이걸 가루다님께 가져가면 알 공급을 다시 시작할 수 있겠어.']],{give:'eggManaStone'}),
  R('eaglevillage','garuda',[296,140],'가루다에게 마나스톤 전달',[['you','학교 지하에서 마나스톤을 찾았어요. 여기 있어요.'],['garuda','고맙구나. 이제 힘이 닿는 데까지 알을 공급해 주마.'],['you','압둘라에게도 준비됐다고 알려드릴게요. 무리하지는 마세요.']],{take:'eggManaStone'}),
  R('judah','abdullah',[440,380],'알 공급을 다시 시작하다',[['you','가루다님께 마나스톤을 드렸어요. 다시 알을 공급해 주신대요.'],['abdullah','그렇다면 건강센터에도 보낼 수 있겠군. 내가 배달을 준비하겠소.'],['you','부마님께도 이제 걱정하지 않으셔도 된다고 전할게요.']]),
  R('infirmary','buma',[255,204],'부마에게 공급 재개 소식 전하기',[['buma','덕분에 알을 다시 받을 수 있게 되었어요. 고마워요.'],['you','공급이 끊겼던 이유도 해결했어요. 이번 일로 모르던 사실을 많이 알았네요.'],['buma','직접 찾아가 이야기를 나누면 알게 되는 일이 있지요. 수고했어요.']])
 ];
 const contestOpponents=[['부두 인형','curseDoll',null,850],['누더기 인형','ragDoll',2,960],['진화한 강아지','dog',null,1080],['진화한 독수리','babyEagle',null,1180],['닌자 거북이','turtle',2,1350]];
 x.npcs.petContestRing={name:'펫 경연 대회 경기장'};
 routes.pet_contest2=[
  R('petcenter','felita',[420,320],'펠리타의 두 번째 경연 안내',[['felita','이번 경연은 마법사의 도시 콜로세움에서 열려요. 다섯 상대와 차례대로 싸우게 될 거예요.'],['you','진화한 펫들도 나온다면서요? 함께 잘 준비하고 갈게요.'],['felita','상대가 달라질 때마다 펫의 상태도 살펴 주세요. 모두 마치면 저에게 돌아오세요.']]),
  ...contestOpponents.map(([name],i)=>R('petColosseum','petContestRing',[535,402],`펫 경연 ${i+1}/5 · ${name}`,[['narrator',`${i+1}번째 상대, ${name}이 경기장에 들어섰다.`],['you',(['부두 인형이 첫 상대구나. 펫들과 호흡을 맞춰 보자.','누더기 인형도 만만치 않겠어. 작아 보여도 방심하지 말자.','진화한 강아지구나! 공격이 더 강해졌으니 조심하자.','독수리도 진화하니 위력이 다르네. 날개 움직임을 잘 봐야겠어.','드디어 마지막, 닌자 거북이야. 여기까지 왔으니 끝까지 함께 해 보자.'])[i]]],{battle:'errandContest2_'+i})),
  R('petcenter','felita',[420,320],'다섯 경기를 마치고 돌아오다',[['you','다섯 상대를 모두 이겼어요. 예상보다 훨씬 강했어요.'],['felita','잘했어요. 펫의 능력을 알고 함께 힘을 낸 덕분이지요.'],['you','함께 싸워 준 펫들에게도 고맙다고 해야겠어요.'],['felita','오늘은 푹 쉬게 해 주세요. 모두 수고 많았어요.']])
 ];
 routes.flame_hunt=[
  R('classroom','esta',[710,215],'에스타의 불꽃군 연구',[['esta','왔구나. 발걸음 소리만 들어도 누가 오는지 알 수 있지.'],['you','뒤도 안 돌아보셨는데 저인 줄 아셨어요?'],['esta','마법 선생님의 솜씨를 너무 얕보면 안 되지. 마침 네게 부탁할 연구가 있단다.'],['esta','불꽃군은 요즘 좀처럼 잡히지 않는 희귀한 몬스터야. 연구를 위해 열 마리가 필요해.'],['you','희귀한 몬스터라면 찾는 것부터 쉽지 않겠네요. 제가 할 수 있을까요?'],['esta','네 실력을 아니까 부탁하는 거란다. 거인의 오두막 근처를 살펴보렴.'],['you','열 마리, 거인의 오두막 근처군요. 준비하고 다녀올게요.']]),
  R('freeGiantHut','flamePatrol',[525,345],'거인의 오두막 근처 · 불꽃군 10마리',[['you','푸른 도깨비불이 떠다니는 곳이야. 에스타 선생님이 찾으시는 불꽃군을 확인하자.']],{hunt:{field:'fc_flame_hunt',max:10,species:'불꽃군'},battle:'errandFlame10'}),
  R('classroom','esta',[710,215],'에스타에게 연구 결과 보고',[['you','말씀하신 열 마리를 모두 찾았어요. 희귀하기도 했지만 공격도 꽤 매서웠어요.'],['esta','고생했구나. 덕분에 연구를 이어 갈 수 있겠어.'],['you','다음에는 불꽃이 움직이는 방식도 더 자세히 살펴보고 싶어요.'],['esta','좋은 자세구나. 관찰한 것을 잊기 전에 기록해 두렴.']])
 ];
 const defs=Object.fromEntries(Object.keys(routes).map(id=>[id,F.defs.find(d=>d.id===id)]));
 for(const[id,d]of Object.entries(defs)){d.kind='chain';d.sp=50;d.reward='선행 점수 50';delete d.staff;d.summary=routes[id].map(r=>r.title).join(' → ');x.defaults['errand_'+id]=0;}
 for(const id of ['hubert1','hubert2'])Object.assign(defs[id],{giver:'mina',scene:'campus'});
 Object.assign(defs.flame_hunt,{title:'불꽃군을 찾아라',targetScene:'freeGiantHut'});
 Object.assign(defs.pet_contest2,{giver:'felita',scene:'petcenter',sp:70,reward:'선행 점수 70'});
 Object.assign(x.defaults,{errandVersion:0,staffFirstKills:0,staffSecondKills:0,ghostLilyKills:0,ghostHorseKills:0});
 const active=(s,id)=>s['fm_'+id]===1,available=(s,id)=>!s['fm_'+id]&&s.stage>=defs[id].minStage&&s.level>=(defs[id].minLevel||1);
 function migrate(s){
  if(!s.errandVersion)for(const id of ['ryoma_staff','hubert1','hubert2','deren_ghost'])if([1,2].includes(s['fm_'+id])){const done=s['fm_'+id]===2;s['fm_'+id]=1;s['errand_'+id]=id==='ryoma_staff'?(done?3:2):id==='deren_ghost'?1:(done?3:2);if(id==='ryoma_staff')s.staffFirstKills=Math.min(100,s.fc_ryoma_staff||0);}
  if((s.errandVersion||0)<2){for(const id of ['mail','egg']){const v=s['fm_'+id]||0;if(v<=0||v>=9)continue;s['errand_'+id]=id==='mail'?v:({1:1,2:2,3:4,4:5,5:6,6:7,7:8,8:9}[v]);s['fm_'+id]=1;if(id==='mail'&&v===3&&!I.count(s,'mailRoughDiamond'))I.add(s,'mailRoughDiamond');if(id==='egg'&&v===6&&!I.count(s,'eggManaStone'))I.add(s,'eggManaStone');if(id==='egg'&&v===2&&s.fc_egg>=30)s.errand_egg=3;}}
  if((s.errandVersion||0)<3&&[1,2].includes(s.fm_pet_contest2)){s.errand_pet_contest2=s.fm_pet_contest2===2?6:1;s.fm_pet_contest2=1;}
  if((s.errandVersion||0)<4&&[1,2].includes(s.fm_flame_hunt)){s.errand_flame_hunt=s.fm_flame_hunt===2||s.fc_flame_hunt>=10?2:1;s.fm_flame_hunt=1;}
  s.errandVersion=4;
 }
 const current=(s,id)=>routes[id][s['errand_'+id]||0];
 const target=(s,id,e)=>{const r=current(s,id);if(!r||s.scene!==r.scene||e.id!==r.npc)return false;if(id==='deren_ghost'&&!active(s,id)&&s.fm_octopus===1)return false;return active(s,id)||available(s,id);};
 const save=a=>{a.save();a.refresh();};
 function advance(s,id){s['errand_'+id]++;if(s['errand_'+id]>=routes[id].length){s['fm_'+id]=9;s['fd_'+id]=(s['fd_'+id]||0)+1;s.sp+=defs[id].sp;}}
 const doneHunt=(s,h)=>s[h.field]>=h.max&&(!h.second||s[h.second]>=h.secondMax);
 for(const[id,d]of Object.entries(defs))d.progress=s=>{const r=current(s,id);return r.title+(r.hunt?' · '+s[r.hunt.field]+'/'+r.hunt.max+(r.hunt.second?' · '+s[r.hunt.second]+'/'+r.hunt.secondMax:''):'');};
 const before=F.interact;F.interact=(e,a)=>{const s=a.state;migrate(s);const id=Object.keys(routes).find(id=>target(s,id,e));if(!id)return before(e,a);const r=current(s,id);
  const play=()=>{if(r.take&&!I.count(s,r.take)){a.talk([['you','전달할 '+D.ITEMS[r.take].name+' 물품을 먼저 챙기자.']]);return;}
   a.talk(r.lines,()=>{if(r.battle){a.battle(r.battle);return;}if(r.take)I.remove(s,r.take);if(r.give)I.add(s,r.give);advance(s,id);save(a);if(s['fm_'+id]===9)a.toast(defs[id].title+' 완료 · '+defs[id].reward);});};
  if(available(s,id)){a.missionOffer(defs[id].title,r.npc,r.title+' 일을 맡아 주겠니?',()=>{s['fm_'+id]=1;s['errand_'+id]=0;save(a);play();});}else play();return true;
 };
 const enemy=(name,sprite,hp=270)=>({name,sprite,element:2,hp,maxHp:hp,atk:20,atb:0});
 function battle(key,id,make){x.encounters[key]={name:routes[id].find(r=>r.battle===key).title,bg:'assets/maps-hires/forest-battle.png',freeBattle:true,errandHunt:id,xp:80,gold:30,sp:0,prepare:s=>({enemies:make(s)}),onWin:s=>{const r=current(s,id);if(r.battle!==key||r.hunt)return;if(r.give)I.add(s,r.give);advance(s,id);}};}
 Object.assign(x.npcs.flamePatrol,{name:'불꽃군의 푸른 도깨비불',artPath:'assets/original/pet-images/fire/idle2.gif'});
 battle('errandFlame10','flame_hunt',s=>Array.from({length:Math.max(1,Math.min(3,10-s.fc_flame_hunt))},()=>({...enemy('불꽃군','fire',420),element:0,atk:24,artPath:'assets/original/pet-images/fire/idle2.gif',height:115})));
 battle('errandStaff100','ryoma_staff',s=>Array.from({length:Math.max(1,Math.min(3,100-s.staffFirstKills))},()=>enemy('몬스터 버섯','flower')));
 battle('errandStaff50','ryoma_staff',s=>Array.from({length:Math.max(1,Math.min(3,50-s.staffSecondKills))},()=>enemy('골렘','turtle')));
 battle('errandEgg30','egg',s=>Array.from({length:Math.max(1,Math.min(3,30-s.fc_egg))},()=>enemy('몬스터 버섯','flower')));
 battle('errandStaffHula','ryoma_staff',s=>[{...enemy('훌라 버섯','flower',800),artPath:'assets/midterm/hula-large.png',height:150}]);
 battle('errandPatientBand','hubert2',s=>[{...enemy('놀란 밴드 두더지','moll',600),artPath:'assets/chapter26/bandmole-idle.gif',height:85}]);
 battle('errandGhostPatrol','deren_ghost',s=>{const result=[];for(let i=0;i<3;i++){if(s.ghostLilyKills+result.filter(e=>e.name==='연잎니그로').length<15)result.push(enemy('연잎니그로','flower'));else if(s.ghostHorseKills+result.filter(e=>e.name==='유령마').length<15)result.push(enemy('유령마','shadow'));}return result;});
 battle('errandGhostEdward','deren_ghost',s=>[{...enemy('에드워드 경','earth',850),artPath:'assets/original/animation/npc_013_도트_에드워드 장군/idle.gif',height:125}]);
 contestOpponents.forEach(([name,sprite,element,hp],i)=>{const key='errandContest2_'+i;battle(key,'pet_contest2',s=>[{...enemy(name,sprite,hp),element,atk:30+i*5,artPath:'assets/original/pet-images/'+sprite+'/idle2.gif',height:110}]);x.encounters[key].bg='assets/maps-hires/colosseum.png';});
 x.scenes.petColosseum=(s,n,p)=>({id:'petColosseum',name:'마법사의 도시 · 펫 경연 콜로세움',bg:'assets/maps-hires/colosseum.png',w:1000,h:658,zoom:1.08,nodes:[[225,420],[365,413],[535,402],[710,375]],edges:[[0,1],[1,2],[2,3]],entities:[p('exit','마법사의 도시로',225,420,'magecity',[712,651])]});
 x.scenes.freeGiantHut=(s,n,p)=>({id:'freeGiantHut',name:'마우스웨일 · 거인의 오두막 근처',bg:'assets/maps-hires/forest-battle.png',w:960,h:540,zoom:1.05,nodes:[[160,450],[340,405],[525,345],[725,270]],edges:[[0,1],[1,2],[2,3]],entities:[p('back','어인마을 왼쪽 해안',160,450,'fishshoreRelief',[640,330])]});
 const victory=F.victory;F.victory=(s,b)=>{victory(s,b);migrate(s);for(const id of Object.keys(routes)){if(!active(s,id))continue;const r=current(s,id),h=r.hunt;if(!h||!b.spec?.repeatable&&b.spec?.errandHunt!==id)continue;const dead=(b.enemies||[]).filter(e=>e.hp<=0);if(id==='deren_ghost'){if(s.scene!=='derenmaze38')continue;s.ghostLilyKills=Math.min(15,s.ghostLilyKills+dead.filter(e=>e.name==='연잎니그로').length);s.ghostHorseKills=Math.min(15,s.ghostHorseKills+dead.filter(e=>e.name==='유령마').length);}else s[h.field]=Math.min(h.max,(s[h.field]||0)+dead.filter(e=>!h.species||e.name===h.species).length);if(doneHunt(s,h))advance(s,id);}};
 const objective=F.objective,marker=F.marker;F.objective=(s,e)=>{migrate(s);return Object.keys(routes).some(id=>target(s,id,e))||objective(s,e);};F.marker=(s,e)=>{migrate(s);return Object.keys(routes).some(id=>target(s,id,e))?'!':marker(s,e);};
 const decorate=x.decorate;x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);migrate(s);for(const id of Object.keys(routes)){if(!active(s,id)&&!available(s,id))continue;const r=current(s,id);if(r?.scene===sc.id&&!sc.entities.some(e=>e.id===r.npc))sc.entities.push({...n(r.npc,...r.pos),...(r.fixedTile?{fixedTile:true}:{})});}
  if(active(s,'deren_ghost')&&sc.id==='kingdom'&&!sc.entities.some(e=>e.to==='derenmaze38'))sc.entities.push(p('free-deren-maze','귀신 소문이 난 왕국 미로',265,465,'derenmaze38',[1090,640]));
  if(active(s,'flame_hunt')&&sc.id==='fishshoreRelief')sc.entities.push(p('free-giant-hut','거인의 오두막 근처',640,330,'freeGiantHut',[160,450]));
  if(active(s,'pet_contest2')&&sc.id==='magecity')sc.entities.push(p('free-pet-contest','펫 경연 콜로세움',712,651,'petColosseum',[225,420]));
 };
 return{routes,defs,migrate};
})();
