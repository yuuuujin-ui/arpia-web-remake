/* Sources: alicer.tistory.com/127 and /132; dialogue paraphrased and expanded.
   Shore, lake and Shark's room use compact reconstructed layouts and existing backgrounds. */
window.ARPIA_CAPTURE_SEASIDE=(()=>{
 const x=ARPIA_EXTRA,F=ARPIA_FREE,fish=F.defs.find(d=>d.id==='fish_village'),oct=F.defs.find(d=>d.id==='octopus');
 Object.assign(fish,{kind:'chain',title:'어인마을의 부탁',summary:'푸키와 나꺼에게 사정을 듣고 샤크를 돕는다. 문어와 오징어 각각 50마리를 물리친 뒤 우디에게 보상을 받는다.'});
 Object.assign(oct,{kind:'chain',title:'포악한 문어를 잡자',summary:'줄리아의 안내로 마틸다를 만나고, 어인마을 근처의 포악한 문어 30마리를 물리친다.'});
 F.defs.find(d=>d.id==='flame_hunt').targetScene='fishshoreRelief';
 Object.assign(x.defaults,{seasideVersion:0,fishPhase:0,octopusPhase:0,freeFishOctopus:0,freeFishSquid:0});
 Object.assign(x.npcs,{nakkeFree:{name:'나꺼'},sharkFree:{name:'샤크'},seaOctopus:{name:'포악한 문어 무리',artPath:'assets/original/pet-images/poisonFish/idle1.gif',height:55},seaSquid:{name:'포악한 오징어 무리',artPath:'assets/original/pet-images/sharkroon/idle1.gif',height:60}});
 function migrate(s){if(s.seasideVersion===1)return;
  if([1,2].includes(s.fm_fish_village)){s.fm_fish_village=1;s.fishPhase=0;s.freeFishOctopus=Math.min(50,s.freeFishOctopus||0);s.freeFishSquid=Math.min(50,s.freeFishSquid||0);}
  if([1,2].includes(s.fm_octopus)){s.fm_octopus=1;s.octopusPhase=0;s.fc_octopus=Math.min(30,s.fc_octopus||0);}
  s.seasideVersion=1;
 }
 const available=(s,d)=>!s['fm_'+d.id]&&s.stage>=d.minStage;
 const fishReady=s=>s.freeFishOctopus>=50&&s.freeFishSquid>=50;
 const counts=s=>'문어 '+s.freeFishOctopus+'/50 · 오징어 '+s.freeFishSquid+'/50';
 const huntingFish=s=>s.fm_fish_village===1&&s.fishPhase===2;
 const huntingOct=s=>s.fm_octopus===1&&s.octopusPhase===1;
 fish.progress=s=>['데런 북쪽 호숫가에서 나꺼 만나기','마우스웨일 · 샤크의 방으로 가기',counts(s)+' · 완료 후 샤크에게 보고','펫 센터의 우디에게 보상 받기'][s.fishPhase||0];
 oct.progress=s=>s.octopusPhase===0?'데런 왕국에서 마틸다 만나기':'포악한 문어 '+s.fc_octopus+'/30 · 마틸다에게 보고';
 const targets=s=>{
  const t=[];
  if(available(s,fish))t.push(['judah','puki']);
  if(available(s,oct))t.push(['classroom','julia']);
  if(s.fm_fish_village===1)t.push([['freeNorthLake','nakkeFree'],['freeSharkRoom','sharkFree'],['freeSharkRoom','sharkFree'],['petcenter','woody']][s.fishPhase||0]);
  if(s.fm_octopus===1)t.push(['kingdom','matilda']);
  if(huntingOct(s)&&s.fc_octopus<30||huntingFish(s)&&s.freeFishOctopus<50)t.push(['fishshoreRelief','seaOctopus']);
  if(huntingFish(s)&&s.freeFishSquid<50)t.push(['fishshoreRelief','seaSquid']);
  return t;
 };
 const target=(s,e)=>targets(s).some(t=>t[0]===s.scene&&t[1]===e.id);
 const save=a=>{a.save();a.refresh();};
 const before=F.interact;F.interact=(e,a)=>{const s=a.state;migrate(s);const mageRow=ARPIA_CAPTURE_FREE.mage[s.mageRoute||0];if(s.fm_exam_mage===1&&mageRow?.[0]===s.scene&&mageRow[1]===e.id)return before(e,a);const promotion=F.defs.find(d=>d.id==='archmage');if(e.id==='julia'&&s.scene==='classroom'&&!s.fm_archmage&&s.rank===3&&s.level>=promotion.minLevel&&s.stage>=promotion.minStage)return before(e,a);if(!target(s,e))return before(e,a);
  if(e.id==='puki'){a.missionOffer(fish.title,'puki','호수에서 만난 아저씨가 어인마을 이야기를 하셨어. 나 대신 무슨 일인지 알아봐 줄래?',()=>{s.fm_fish_village=1;s.fishPhase=0;s.freeFishOctopus=0;s.freeFishSquid=0;s.fc_fish_village=0;save(a);a.talk([['you','무슨 부탁인지 듣기도 전에 돌아온 거야?'],['puki','조금 무서워 보여서 그만……. 데런 북쪽 호숫가의 나꺼 아저씨야.'],['you','직접 만나서 이야기해 볼게.']]);});return true;}
  if(e.id==='julia'){a.missionOffer(oct.title,'julia','마틸다 공주가 어인마을 근처에서 곤란한 일을 겪었다는구나. 왕국으로 가서 도와주겠니?',()=>{s.fm_octopus=1;s.octopusPhase=0;s.fc_octopus=0;save(a);a.talk([['you','공주님은 괜찮으신가요?'],['julia','돌아오기는 했지만 몹시 화가 나 있다더구나. 먼저 무슨 일이 있었는지 들어 보렴.']]);});return true;}
  if(e.id==='nakkeFree'){a.talk([['nakkeFree','어인마을의 문어와 오징어들이 이상해졌어요. 마을 사람들이 곤란을 겪고 있지요.'],['you','푸키에게 부탁하셨던 일이 그거였군요. 어디로 가면 되나요?'],['nakkeFree','마우스웨일 어인마을에서 샤크를 찾아보세요. 마을 사정을 자세히 알려줄 거예요.']],()=>{s.fishPhase=1;save(a);});return true;}
  if(e.id==='sharkFree'){
   if(s.fishPhase===1){a.talk([['sharkFree','나꺼가 보냈구나. 포악해진 문어와 오징어 때문에 마을 밖으로 다니기가 어려워졌어.'],['you','주민들이 안심하고 다닐 수 있게 돕고 싶어요.'],['sharkFree','문어와 오징어를 각각 50마리씩 쫓아내 줘. 마을을 나와 왼쪽 해안으로 가면 만날 수 있을 거야.'],['you','두 무리를 따로 확인하면서 다녀올게요.']],()=>{s.fishPhase=2;save(a);});return true;}
   if(!fishReady(s)){a.talk([['sharkFree','아직 마을 밖에 남은 무리가 있어. '+counts(s)]]);return true;}
   a.talk([['sharkFree','덕분에 길이 한결 조용해졌어. 주민들도 다시 밖으로 나갈 수 있겠군.'],['you','문어와 오징어가 한꺼번에 몰려들 때는 꽤 힘들었어요.'],['sharkFree','수고한 보답으로 펫을 주고 싶어. 펫 센터의 우디를 찾아가. 내가 부탁했다고 말하면 돼.']],()=>{s.fishPhase=3;save(a);});return true;
  }
  if(e.id==='woody'){a.talk([['woody','샤크에게 이야기는 들었어. 마을을 위해 고생했다면서?'],['you','새로운 친구를 소개해 주신다고 해서 왔어요.'],['woody','이 독나방을 데려가. 아직 어린 녀석이니 잘 돌봐 줘.'],['you','같이 여행하면서 차근차근 키울게요. 고마워요!']],()=>{if(!s.pets.some(p=>p.id==='moth'))ARPIA_SYS.pets.addPet(s,'moth');s.poisonMoth=true;s.pet2=true;s.sp+=200;s.fm_fish_village=9;s.fd_fish_village=(s.fd_fish_village||0)+1;save(a);a.toast('어인마을의 부탁 완료 · 독나방 · 선행 점수 200');});return true;}
  if(e.id==='matilda'){
   if(s.octopusPhase===0){a.talk([['matilda','문어들이 갑자기 나를 둘러싸고 공격했어. 정말 괘씸하지 뭐야!'],['you','다치신 곳은 없으세요? 먼저 치료부터 받으시는 게…….'],['matilda','그 녀석들을 그냥 둘 수 없어. 데런의 공주를 몰라보다니! 네가 가서 혼내 줘.'],['you','다른 사람까지 공격하면 위험하겠네요. 어인마을 근처를 살펴볼게요.'],['matilda','포악한 문어 30마리야. 제대로 혼내 주고 와!']],()=>{s.octopusPhase=1;save(a);});return true;}
   if(s.fc_octopus<30){a.talk([['matilda','아직 다 혼내 주지 못했잖아. '+s.fc_octopus+'/30마리야.']]);return true;}
   a.talk([['you','말씀하신 문어 30마리를 물리쳤어요. 이제 그 길로 다닐 때도 조금은 안심하셔도 돼요.'],['matilda','흥, 다시는 나한테 덤비지 못하겠지. 그래도…… 도와줘서 고마워.'],['you','다음에는 혼자 무리 속으로 들어가지 마세요.']],()=>{s.sp+=80;s.fm_octopus=9;s.fd_octopus=(s.fd_octopus||0)+1;save(a);a.toast('포악한 문어를 잡자 완료 · 선행 점수 80');});return true;
  }
  a.talk([['you',e.id==='seaOctopus'?'문어들이 길을 막고 있어. 한 무리씩 몰아내자.':'오징어들이 먹물을 뿜으며 다가온다. 시야를 확보하면서 싸우자.']],()=>a.battle(e.id==='seaOctopus'?'freeSeaOctopus':'freeSeaSquid'));return true;
 };
 const victory=F.victory;F.victory=(s,b)=>{victory(s,b);migrate(s);if(!b.spec?.repeatable&&!b.spec?.seasideHunt)return;const dead=(b.enemies||[]).filter(e=>e.hp<=0),o=dead.filter(e=>/문어/.test(e.name)).length,q=dead.filter(e=>/오징어/.test(e.name)).length;
  if(huntingFish(s)){s.freeFishOctopus=Math.min(50,s.freeFishOctopus+o);s.freeFishSquid=Math.min(50,s.freeFishSquid+q);s.fc_fish_village=s.freeFishOctopus+s.freeFishSquid;}
  if(huntingOct(s))s.fc_octopus=Math.min(30,s.fc_octopus+o);
 };
 for(const [key,name,sprite,remain]of [['freeSeaOctopus','포악한 문어','poisonFish',s=>Math.max(huntingFish(s)?50-s.freeFishOctopus:0,huntingOct(s)?30-s.fc_octopus:0)],['freeSeaSquid','포악한 오징어','sharkroon',s=>huntingFish(s)?50-s.freeFishSquid:0]]){
  x.encounters[key]={name:name+' 무리',bg:'assets/maps-hires/forest-battle.png',freeBattle:true,seasideHunt:true,xp:90,gold:30,sp:0,prepare:s=>({enemies:Array.from({length:Math.max(1,Math.min(3,remain(s)))},(_,i)=>({name,element:1,hp:300,maxHp:300,atk:22,atb:i*10,sprite}))})};
 }
 const objective=F.objective,marker=F.marker;F.objective=(s,e)=>{migrate(s);return target(s,e)||objective(s,e);};F.marker=(s,e)=>{migrate(s);return target(s,e)?'!':marker(s,e);};
 const decorate=x.decorate;x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);migrate(s);const add=(id,a,b)=>{if(!sc.entities.some(e=>e.id===id))sc.entities.push(n(id,a,b));};
  if(sc.id==='kingdom'&&s.fm_fish_village===1)sc.entities.push(p('free-north-lake','데런 북쪽 호숫가',600,560,'freeNorthLake',[160,450]));
  if(sc.id==='judah'&&([1,2].includes(s.fm_flame_hunt)||s.fm_octopus===1||s.fm_fish_village===1)&&!sc.entities.some(e=>e.to==='fishshoreRelief'||e.id==='relief-shore'))sc.entities.push(p('sea-shore','어인마을 북쪽 물가',490,350,'fishshoreRelief',[160,450]));
  if(sc.id==='classroom'&&available(s,oct))add('julia',580,290);
  if(sc.id==='kingdom'&&s.fm_octopus===1)add('matilda',546,590);
  if(sc.id==='fishshoreRelief'){
   sc.nodes.push([440,270],[540,270],[740,340]);sc.edges.push([2,4],[4,5],[3,6]);
   sc.entities.push(p('fish-village','마우스웨일 · 샤크의 방',740,340,'freeSharkRoom',[160,450]));
   for(const [scene,id]of targets(s))if(scene===sc.id)add(id,id==='seaOctopus'?440:540,270);
  }
  if(sc.id==='freeNorthLake'&&s.fm_fish_village===1)add('nakkeFree',480,330);
  if(sc.id==='freeSharkRoom'&&s.fm_fish_village===1)add('sharkFree',500,330);
 };
 for(const [id,name,bg,extra]of [['freeNorthLake','데런 북쪽 · 웨일라 호숫가','judah-harbor',p=>[p('back','데런 왕국',160,450,'kingdom',[600,560]),p('village','마우스웨일 어인마을',700,350,'freeSharkRoom',[160,450])]],['freeSharkRoom','마우스웨일 · 샤크의 방','judah-harbor',p=>[p('back','어인마을 왼쪽 해안',160,450,'fishshoreRelief',[640,330]),p('lake','웨일라 호숫가',700,350,'freeNorthLake',[160,450])]]]){
  x.map.push([id,name,[160,450]]);x.scenes[id]=(s,n,p)=>({id,name,bg:'assets/maps-hires/'+bg+'.png',w:960,h:540,zoom:1.05,nodes:[[160,450],[330,400],[480,330],[500,330],[700,350]],edges:[[0,1],[1,2],[2,3],[3,4]],entities:extra(p)});
 }
 return{migrate,fish,oct};
})();
