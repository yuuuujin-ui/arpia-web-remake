/* User captures 35.png and m.blog.naver.com-kde3735-80063912906.png.
   Visible events restored; connective dialogue and combat values reconstructed.
   See research/DIALOGUE-VISUAL-AUDIT.md for unreadable/uncertain source details. */
window.ARPIA_CAPTURE_FREE=(()=>{
 const x=ARPIA_EXTRA,F=ARPIA_FREE,D=ARPIA_DATA;
 const mage=F.defs.find(d=>d.id==='exam_mage'),wood=F.defs.find(d=>d.id==='firewood');
 Object.assign(mage,{title:'마도사 승급시험',kind:'chain',summary:'왕국의 추천과 선생님들의 과제를 마치고, 왕국 경기장에서 친구들과 실력을 겨룬다.'});
 Object.assign(wood,{title:'나무꾼괴물의 장작 더미',kind:'chain',summary:'코볼트에게 연료 사정을 듣고, 나무꾼괴물의 도끼를 마련해 장작 한 묶음과 바꾼다.'});
 const item=(id,name,desc,icon)=>D.ITEMS[id]={name,desc,icon,kind:'quest',price:0,sell:0};
 item('fw_ore','도끼를 만들 철광석','옛 광산에서 찾아 발디에게 가져갈 철광석','assets/items/golem_core.png');
 item('fw_axe','새 도끼','발디가 만든 도끼. 마법사의 도시에서 날을 갈아야 한다.','assets/midterm/certificate.png');
 item('fw_sharpaxe','날을 간 새 도끼','나무꾼괴물에게 전할 도끼','assets/midterm/certificate.png');
 item('fw_bundle','나무꾼괴물의 장작','머피에게 전달할 잘 마른 장작 한 묶음','assets/items/firewood.png');
 item('mage_supplies','사무엘의 시험 물품','승급시험을 준비하며 사무엘에게 받은 물품','assets/midterm/certificate.png');
 item('mage_letter','스콜의 편지','아수리아의 카디쟈에게 전할 편지','assets/midterm/certificate.png');
 item('mage_recommendation','승급시험 추천서','왕국 경기장 참가 자격을 확인하는 추천서','assets/midterm/certificate.png');
 const count=(s,id)=>window.ARPIA_SYS.inv.count(s,id),give=(s,id)=>window.ARPIA_SYS.inv.add(s,id,1),take=(s,id)=>window.ARPIA_SYS.inv.remove(s,id,1);
 Object.assign(x.defaults,{woodRoute:0,mageRoute:0,mageGolems:0,captureFreeVersion:0});
 Object.assign(x.npcs,{
  woodcutterFree:{name:'나무꾼괴물',artPath:'assets/objects/gather-firewood.png',height:48},
  woodOreFree:{name:'도끼용 철광석',artPath:'assets/items/golem_core.png',height:35},
  axeGrindFree:{name:'하수도 옆 도끼 숫돌',artPath:'assets/objects/exam-seal.png',height:45},
  mageGolemFree:{name:'승급 과제 · 골렘 무리',artPath:'assets/objects/exam-seal.png',height:52},
  mageTrialFree:{name:'줄리아의 실전 시험',artPath:'assets/objects/exam-seal.png',height:52},
  mageKesnoFree:{name:'승급 경기 · 케스노',anim:'npc_003_도트_케스노',portrait:'friend/케스노.png'},
  mageMatildaFree:{name:'승급 경기 · 마틸다',royal:0,portrait:'friend/마틸다.png'},
  mageIsaacFree:{name:'승급 경기 · 아이작',anim:'npc_005_도트_아이작',portrait:'friend/아이작.png'}
 });
 const W=[
  ['boiler','murphy','머피에게 장작 의뢰받기',[380,245]],
  ['koboldroom','kobold','코볼트에게 연료 사정 묻기',[470,290]],
  ['oak','woodcutterFree','오당카 오두막 근처 나무꾼괴물 만나기',[270,173]],
  ['minedepths','guillaume','기욤에게 철광석이 있는 곳 묻기',[650,270]],
  ['minedepths','woodOreFree','옛 광산의 철광석 줍기',[555,245]],
  ['mine','baldi','발디에게 도끼 제작 부탁하기',[300,279]],
  ['magecity','axeGrindFree','도시 하수도 옆에서 도끼 날 갈기',[555,490]],
  ['oak','woodcutterFree','나무꾼괴물에게 새 도끼 전달하기',[270,173]],
  ['boiler','murphy','머피에게 장작 한 묶음 전달하기',[380,245]]
 ];
 const M=[
  ['principal','morris','모리스에게 승급시험 신청하기',[470,220]],
  ['kingdom','caesar','세자르 3세에게 대회 참가 허락받기',[390,215]],
  ['shop','sam','사무엘에게 시험 준비 물품 받기',[485,265]],
  ['classroom','scoll','스콜에게 추천 부탁하기',[445,240]],
  ['asuria','cardia','카디쟈에게 스콜의 편지 전달하기',[520,285]],
  ['oak','mageGolemFree','오두막 근처 골렘 10마리 처치하기',[341,224]],
  ['classroom','julia','줄리아에게 사냥 결과 보고하기',[530,185]],
  ['arena','mageTrialFree','줄리아의 실전 시험 통과하기',[710,375]],
  ['kingdom','caesar','세자르 3세에게 서류 제출하기',[390,215]],
  ['royalarena','mageKesnoFree','왕국 경기장 · 케스노와 대전하기',[535,402]],
  ['royalarena','mageMatildaFree','왕국 경기장 · 마틸다와 대전하기',[535,402]],
  ['royalarena','mageIsaacFree','왕국 경기장 · 아이작과 대전하기',[535,402]],
  ['royalarena','caesar','국왕에게 경기 결과 확인받기',[710,375]],
  ['royalarena','morris','모리스에게 마도사 승급 인정받기',[790,455]]
 ];
 function migrate(s){
  if(s.captureFreeVersion===1)return;
  // Preserve completed ranks and repeat counts. An unfinished old one-battle exam
  // becomes the full route; old collection items remain ordinary inventory.
  if(s.fm_exam_mage>0&&s.fm_exam_mage<9){s.fm_exam_mage=1;s.mageRoute=1;}
  if(s.fm_firewood>0&&s.fm_firewood<9){s.fm_firewood=1;s.woodRoute=1;}
  s.captureFreeVersion=1;
 }
 function route(s,d){return d===mage?M[s.mageRoute||0]:W[s.woodRoute||0];}
 function eligible(s,d){return !s['fm_'+d.id]&&s.stage>=d.minStage&&s.level>=(d.minLevel||1)&&(!d.rank||(s.rank||0)===d.rank-1);}
 function active(s,d){return s['fm_'+d.id]===1;}
 function target(s,d,e){const r=route(s,d);return r&&s.scene===r[0]&&e.id===r[1]&&(active(s,d)||eligible(s,d));}
 wood.progress=s=>W[s.woodRoute||0]?.[2]||'머피에게 장작 전달하기';
 mage.progress=s=>(M[s.mageRoute||0]?.[2]||'모리스에게 결과 보고하기')+(s.mageRoute===5?` · ${s.mageGolems||0}/10`:'');
 const save=a=>{a.save();a.refresh();};
 function start(d,a){const s=a.state;s['fm_'+d.id]=1;s[d===mage?'mageRoute':'woodRoute']=1;if(d===mage)s.mageGolems=0;save(a);a.toast(`프리 미션 시작 · ${d.title}`);}
 function finish(d,a){const s=a.state;s.sp+=d.sp||0;s['fd_'+d.id]=(s['fd_'+d.id]||0)+1;s['fm_'+d.id]=d.repeatable?0:9;s[d===mage?'mageRoute':'woodRoute']=0;
  ARPIA_MISSIONS2.onFinish(d,s,a);save(a);a.toast(`${d.title} 완료 · ${d.reward}`);
 }
 function say(a,lines,next,effect){a.talk(lines,()=>{if(effect)effect(a.state);if(next!==undefined)a.state[next[0]]=next[1];save(a);});return true;}
 const woodLines={
  1:[['you','머피 아저씨가 연료가 부족하다고 하셨어요. 여기 장작을 조금 가져가도 될까요?'],['kobold','그건 내가 겨울을 나려고 아껴 둔 거야. 조금 떼어 가면 금방 없어져.'],['you','그럼 더 구할 곳이라도 알려 주세요. 보일러가 멈추면 학교도 추워져요.'],['kobold','나무꾼 괴물이 있는 곳을 알려드리겠소. 그는 오당카의 숲 근처에 살고 있답니다.'],['you','알겠어요. 제가 찾아가 볼게요.']],
  2:[['you','학교 보일러에 쓸 장작을 구하고 있어요. 잘 마른 나무가 필요해요.'],['woodcutterFree','요즘 도끼가 좀 무뎌졌어. 그래서 새 도끼를 가져오면 하는데… 만들어 줄 수 있어?'],['you','장작을 받으려면 먼저 도끼를 마련해야 하는군요. 난쟁이 광산에 가 볼게요.'],['woodcutterFree','날이 제대로 서야 나무도 깨끗하게 쪼개지지. 도끼를 가져오면 장작을 내주겠어.']],
  3:[['guillaume','도끼를 만들 철을 찾는가? 오른쪽 옛 광산을 살펴보게.'],['you','철광석을 구하면 여기서 도끼도 만들어 주시나요?'],['guillaume','그 쇳덩어리를 발디영감에게 가져가렴. 그럼 도끼로 만들어 줄 거야.'],['you','광석부터 찾아서 발디 아저씨께 부탁드릴게요.']],
  4:[['narrator','옛 광산의 돌무더기 사이에서 철광석을 한 덩이 찾았다.'],['you','찾았다. 이제 발디 아저씨께 가져가자.']],
  5:[['you','나무꾼괴물에게 줄 도끼를 부탁드리려고요. 철광석도 가져왔어요.'],['baldi','좋아. 쓸 만한 철이군. 잠깐 기다려 보게.'],['narrator','망치 소리가 몇 번 울리고 새 도끼가 모습을 드러냈다.'],['baldi','날은 아직 덜 섰으니 마법사의 도시 하수도 옆에서 갈아 오게. 무딘 채로 쓰면 위험하니까.'],['you','만들어 주셔서 고맙습니다. 마지막 손질까지 받고 갈게요.']],
  6:[['narrator','하수도 옆에서 도끼의 날을 갈아 달라고 부탁했다. 숫돌에 닿은 날이 조금씩 매끈해졌다.'],['you','이제 쓸 수 있겠어요. 나무꾼괴물에게 돌아가자.']],
  7:[['you','나무꾼 괴물님, 새 도끼를 가져왔어요.'],['woodcutterFree','철도 단단하고 날도 잘 섰군! 덕분에 다시 일할 수 있겠어.'],['narrator','나무꾼괴물이 약속한 장작 한 묶음을 내주었다.'],['you','이 장작이면 보일러도 다시 따뜻해지겠죠. 잘 전해 드릴게요.']],
  8:[['you','장작을 가져왔어요. 도끼가 없어서 나무를 못 하고 계셨더라고요.'],['murphy','그래서 이렇게 늦었구나. 코볼트의 숯만 재촉한다고 해결될 일이 아니었군.'],['you','기욤 아저씨가 광석을 알려 주시고, 발디 아저씨가 도끼를 만들어 주셨어요.'],['murphy','여러 사람 손을 거쳤구먼. 수고했다. 이 장작은 잘 말라서 화력도 좋겠어.'],['you','따뜻한 교실에서 다들 편히 공부할 수 있으면 좋겠어요.']]
 };
 const mageLines={
  1:[['caesar','아르피아에서 열리는 대회라지? 참가하려면 추천서를 먼저 받아 오게.'],['you','힘만 시험하는 대회는 아닌가 봐요.'],['caesar','그렇지. 맡은 일을 끝까지 해낼 줄도 알아야 하네. 준비를 마치면 경기장 참가를 허락하지.']],
  2:[['sam','승급시험을 준비하는구나. 필요한 물품을 챙겨 줄 테니 잘 간수하렴.'],['you','감사합니다. 추천서를 받으러 선생님들도 찾아뵐 거예요.'],['sam','서두르다가 부탁받은 일을 잊어버리면 안 되겠지? 다음은 스콜 선생님께 가 보렴.']],
  3:[['scoll','추천서 말인가? 마침 카디쟈에게 전할 편지가 있네. 이것을 전달해 주겠나?'],['you','선생님, 시험 준비 중인데 또 편지 배달인가요?'],['scoll','상대에게 말을 정확히 전하는 것도 중요한 일이지. 받아 주었는지도 꼭 확인해 주게.'],['you','알겠어요. 편지가 다른 사람에게 가지 않도록 조심할게요.']],
  4:[['you','스콜 선생님이 보내신 편지예요. 제가 추천을 부탁드렸더니 전해 달라고 하셨어요.'],['cardia','뭐, 어쩔 수 없지. 이번만은 받아 줄 테니 더는 보내지 말라고 하거라.'],['you','네. 말씀도 그대로 전할게요.'],['narrator','편지를 전달하고 다음 시험 과제를 확인했다. 골렘 열 마리를 물리쳐야 한다.'],['you','이제 실제로 마법을 시험할 차례구나. 오당카 오두막 근처부터 살펴보자.']],
  6:[['julia','열 마리를 모두 물리쳤구나. 사냥 중에 무리하지는 않았니?'],['you','한꺼번에 달려들지 않고, 펫과 차례를 맞춰 싸웠어요.'],['julia','좋아. 이번에는 대련장에서 실전 시험을 보자. 숫자를 채우는 것만으로 끝나지는 않는단다.'],['you','준비한 마법을 제대로 써 볼게요.']],
  8:[['you','선생님들의 과제와 실전 시험을 마쳤어요. 추천서도 여기 있습니다.'],['caesar','그래, 잘 서류를 갖췄네. 이제 데런 왕국 왕국 경기장으로 가 보도록 하게.'],['you','여태 배운 것을 친구들 앞에서 보여 주는 거군요. 다녀오겠습니다.']],
  9:[['narrator','첫 상대가 기권하여 부전승이 선언되었다. 이어 케스노가 경기장에 들어섰다.'],['kesno','운이 좋았네. 하지만 다음 승리는 그냥 얻을 수 없을걸?'],['you','너와는 제대로 겨루고 싶었어. 서로 다치지 않게 끝까지 해 보자.']],
  10:[['matilda','다음은 나야. 호호호.'],['you','공주라고 봐주면 오히려 화낼 거지?'],['matilda','당연하지! 여기서는 나도 똑같이 시험을 보는 학생이야.']],
  11:[['isaac','나다, {name}.'],['you','이제 네 차례구나. 연습 때와는 기분이 다른걸.'],['isaac','옆에서 네 싸움을 보고 있었어. 나도 전보다 많이 늘었다고!'],['you','나도 방심하지 않을게. 끝나면 같이 쉬자.']],
  12:[['caesar','훌륭한 경기였다. 상대가 바뀔 때마다 침착하게 맞섰군.'],['you','친구들의 마법을 아니까 쉬울 줄 알았는데, 직접 겨루니 다르네요.'],['caesar','그렇게 서로에게 배우는 것이지. 모리스에게 가 보게. 마지막 말을 기다리고 있네.']],
  13:[['morris','친구들과 과제를 거치며 실력을 보여 주었구나. 이제 마도사의 이름을 걸고 마법을 쓸 준비가 되었다.'],['you','혼자 강해지는 것만 생각하면 놓치는 게 많았어요.'],['morris','배운 힘을 어디에 쓸지도 항상 생각하거라. 아르피아의 마도사로서 너의 성장을 기대하마.'],['you','앞으로도 친구들과 함께 배우겠습니다!']]
 };
 const priorInteract=F.interact;
 F.interact=(e,a)=>{const s=a.state;migrate(s);
  for(const d of [wood,mage])if(target(s,d,e)){
   if(eligible(s,d)){a.missionOffer(d.title,d.giver,d===wood?'학생들이 더운물을 많이 써서 보일러를 돌릴 연료가 모자라다. 코볼트에게 사정을 묻고 장작을 구해다 주겠니?':'왕국 경기장에서 친구들과 실력을 겨룰 때가 되었구나. 추천서와 과제를 준비해 마도사 승급시험에 도전하겠니?',()=>start(d,a));return true;}
   if(d===wood){const v=s.woodRoute;const changes={4:s=>give(s,'fw_ore'),5:s=>{take(s,'fw_ore');give(s,'fw_axe');},6:s=>{take(s,'fw_axe');give(s,'fw_sharpaxe');},7:s=>{take(s,'fw_sharpaxe');give(s,'fw_bundle');}};
    if(v===8){a.talk(woodLines[v],()=>{take(s,'fw_bundle');finish(d,a);});return true;}
    return say(a,woodLines[v],['woodRoute',v+1],changes[v]);
   }
   const v=s.mageRoute;
   if(v===5){a.talk([['you',`골렘 과제는 ${s.mageGolems||0}/10마리. 남은 골렘도 침착하게 상대하자.`]],()=>a.battle('captureMageGolems'));return true;}
   if(v===7){a.talk([['you','줄리아 선생님의 시험이야. 상대의 움직임부터 살피자.']],()=>a.battle('captureMageTrial'));return true;}
   if(v>=9&&v<=11){a.talk(mageLines[v],()=>a.battle(['captureMageKesno','captureMageMatilda','captureMageIsaac'][v-9]));return true;}
   if(v===13){a.talk(mageLines[v],()=>finish(d,a));return true;}
   const changes={2:s=>give(s,'mage_supplies'),3:s=>give(s,'mage_letter'),4:s=>take(s,'mage_letter'),8:s=>{take(s,'mage_supplies');take(s,'mage_recommendation');}};
   return say(a,mageLines[v],['mageRoute',v+1],changes[v]);
  }
  return priorInteract(e,a);
 };
 const objective=F.objective,marker=F.marker;
 F.objective=(s,e)=>{migrate(s);return [wood,mage].some(d=>target(s,d,e))||objective(s,e);};
 F.marker=(s,e)=>{migrate(s);return [wood,mage].some(d=>target(s,d,e))?'!':marker(s,e);};
 const decorate=x.decorate;
 x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);migrate(s);for(const d of [wood,mage]){
  if(!active(s,d)&&!eligible(s,d))continue;const r=route(s,d);if(!r||sc.id!==r[0])continue;
  if(!sc.entities.some(e=>e.id===r[1]))sc.entities.push(n(r[1],...r[3]));
 }};
 const mon=(name,hp,atk,sprite,element=2)=>({name,hp,maxHp:hp,atk,sprite,element,atb:0});
 const encounter=(id,name,enemies,onWin,bg='assets/maps-hires/colosseum.png')=>x.encounters[id]={name,enemies,onWin,bg,freeBattle:true,xp:100,gold:35,sp:0,intro:name};
 encounter('captureMageGolems','마도사 과제 · 골렘 사냥',[mon('골렘',320,20,'examGolem'),mon('골렘',320,20,'examGolem'),mon('골렘',320,20,'examGolem')],(s,b)=>{s.mageGolems=Math.min(10,(s.mageGolems||0)+b.enemies.filter(e=>e.hp<=0).length);if(s.mageGolems===10)s.mageRoute=6;},'assets/maps-hires/forest-battle.png');
 x.encounters.captureMageGolems.prepare=s=>({enemies:Array.from({length:Math.min(3,10-(s.mageGolems||0))},()=>mon('골렘',320,20,'examGolem'))});
 x.encounters.captureMageGolems.progress=s=>`골렘 ${s.mageGolems}/10마리`;
 encounter('captureMageTrial','줄리아의 실전 시험',[mon('대지 아기용',620,25,'earth',2)],s=>{s.mageRoute=8;give(s,'mage_recommendation');});
 for(const [id,name,anim,next,el]of [['Kesno','케스노','npc_003_도트_케스노',10,0],['Matilda','마틸다',null,11,1],['Isaac','아이작','npc_005_도트_아이작',12,2]]){
  const enemy={...mon(name,650,25,'earth',el),...(anim?{artPath:'assets/original/animation/'+anim+'/idle.gif'}:{artPath:'assets/original/character/friend/마틸다.png'})};
  encounter('captureMage'+id,'승급 경기 · '+name,[enemy],s=>s.mageRoute=next);
 }
 const items=x.questItems;x.questItems=s=>[...items(s),...['fw_ore','fw_axe','fw_sharpaxe','fw_bundle','mage_supplies','mage_letter','mage_recommendation'].filter(id=>count(s,id)>0).map(id=>[D.ITEMS[id].name,D.ITEMS[id].desc])];
 return{wood:W,mage:M,migrate};
})();
