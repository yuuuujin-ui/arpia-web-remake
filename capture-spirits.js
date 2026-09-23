/* Original guides: alicer.tistory.com/95 and /193. Named conditions and NPC order
   are sourced; dialogue, battle balance, drops and random gift quantities are reconstructed. */
window.ARPIA_CAPTURE_SPIRITS=(()=>{
 const x=ARPIA_EXTRA,F=ARPIA_FREE,D=ARPIA_DATA,inv=ARPIA_SYS.inv;
 const earth=F.defs.find(d=>d.id==='earth_king'),ice=F.defs.find(d=>d.id==='ice_king');
 for(const d of [earth,ice]){d.kind='chain';delete d.need;delete d.gift;}
 Object.assign(earth,{title:'성난 대지의 정령',summary:'라우라의 열쇠를 빌리고 로티의 세 가지 시험을 거쳐 대지정령왕을 진정시킨다.'});
 Object.assign(ice,{title:'얼음 정령왕의 시험',summary:'클라우디의 안내로 얼음 재료와 최고급 포도를 모아 아이스 주얼을 만들고 정령왕에게 도전한다.'});
 Object.assign(x.defaults,{spiritRouteVersion:0,earthPhase:0,earthRat:0,earthBat:0,earthDragon:0,icePhase:0,iceJewelOffered:0});
 const item=(id,name,icon)=>D.ITEMS[id]={name,kind:'quest',sell:0,price:0,desc:'정령왕 의뢰 물품',icon};
 item('earthLoanKey','대지 동굴의 비밀 열쇠','assets/underwater/keys.png');
 item('spiritGrape','최고급 포도','assets/items/grape.png');
 item('iceJewel','아이스 주얼','assets/items/diamond.png');
 Object.assign(x.npcs,{rotiFree:{name:'로티',anim:'npc_110_도트_로티'},claudieFree:{name:'클라우디'},spiritGrapeMerchant:{name:'도매리 상인'},earthRatPatrol:{name:'보스 쥐 무리'},earthBatPatrol:{name:'미스터리 박쥐 무리'},earthDragonPatrol:{name:'아기 대지용 무리'},iceTrialPatrol:{name:'얼음 던전의 몬스터'},grapeDragonPatrol:{name:'포도를 지닌 아기 대지용'}});
 function migrate(s){if(s.spiritRouteVersion===1)return;
  if([1,2].includes(s.fm_earth_king)){s.earthPhase=s.fm_earth_king===2?4:0;s.fm_earth_king=1;if(!inv.count(s,'earthLoanKey'))inv.add(s,'earthLoanKey');if(s.fo_earth_king)inv.add(s,'spirit_soil',2);}
  if([1,2].includes(s.fm_ice_king)){s.icePhase=s.fm_ice_king===2?4:0;s.fm_ice_king=1;if(s.fo_ice_king){inv.add(s,'icepiece');inv.add(s,'iceblood');}}
  delete s.fo_earth_king;delete s.fo_ice_king;s.spiritRouteVersion=1;
 }
 const active=(s,d)=>s['fm_'+d.id]===1,available=(s,d)=>!s['fm_'+d.id]&&s.stage>=d.minStage;
 const trials=[['earthRat','보스 쥐','earthRatPatrol','보스쥐','moll'],['earthBat','미스터리 박쥐','earthBatPatrol','미스터리 박쥐','moth'],['earthDragon','아기 대지용','earthDragonPatrol','아기 대지용','earthdon']];
 const trialDone=s=>trials.every(([key])=>(s[key]||0)>=15),trialText=s=>trials.map(([key,name])=>name+' '+(s[key]||0)+'/15').join(' · ');
 earth.progress=s=>['대지 동굴 입구의 로티 만나기',trialText(s)+' · 로티에게 보고','대지정령왕에게 도전','진정된 대지정령왕과 대화','로티에게 돌아가기','라우라에게 열쇠와 정령의 흙 전달'][s.earthPhase||0];
 ice.progress=s=>['얼음 던전의 클라우디 만나기','오당카에게 얼음조각·피·최고급 포도 5개 가져가기','아이스 주얼을 가지고 얼음정령왕에게 도전','진정된 얼음정령왕과 대화','얼음마을 촌장에게 보고'][s.icePhase||0];
 const target=(s,e)=>{
  if((available(s,earth)||active(s,earth)&&s.earthPhase===5)&&s.scene==='earthvillage'&&e.id==='laura')return true;
  if((available(s,ice)||active(s,ice)&&s.icePhase===4)&&s.scene==='icevillage'&&e.id==='iceChief')return true;
  if(active(s,earth)&&s.scene==='earthdungeon')return (e.id==='rotiFree'&&[0,1,4].includes(s.earthPhase))||(e.id==='earthSpiritKing'&&[2,3].includes(s.earthPhase))||(s.earthPhase===1&&trials.some(([key,,id])=>id===e.id&&s[key]<15));
  if(active(s,ice))return s.scene==='icedungeon'&&(e.id==='claudieFree'&&s.icePhase===0||e.id==='iceTrialPatrol'&&s.icePhase===1||e.id==='iceSpiritKing'&&[2,3].includes(s.icePhase))||s.icePhase===1&&(s.scene==='hut'&&e.id==='odangka'||s.scene==='campus'&&e.id==='spiritGrapeMerchant'||s.scene==='forest'&&e.id==='grapeDragonPatrol');
  return false;
 };
 const save=a=>{a.save();a.refresh();};
 function gift(s,amount){const id=['hipotion','hiether','manastone_plus','holywater'][Math.floor(Math.random()*4)],n=Math.max(1,Math.min(10,1+Math.floor(amount/5)));inv.add(s,id,n);return D.ITEMS[id].name+' '+n+'개';}
 const before=F.interact;F.interact=(e,a)=>{const s=a.state;migrate(s);if(!target(s,e))return before(e,a);
  if(e.id==='laura'){
   if(available(s,earth)){a.missionOffer(earth.title,'laura','사람들이 대지를 함부로 대하여 정령이 화가 났단다. 동굴로 가서 정령왕을 진정시켜 주겠니?',()=>{s.fm_earth_king=1;s.earthPhase=0;for(const[key]of trials)s[key]=0;inv.add(s,'earthLoanKey');save(a);a.talk([['laura','이 비밀 열쇠를 빌려 주마. 동굴에서 로티의 안내를 받으렴.'],['you','정령왕에게 무슨 일이 있었는지 직접 듣고 올게요.'],['laura','돌아올 때 열쇠를 꼭 돌려다오. 정령의 흙도 모아 오면 그에 맞는 선물을 준비하마.']]);});return true;}
   if(!inv.count(s,'earthLoanKey')){a.talk([['laura','빌려준 열쇠가 없구나. 잃어버리지 않게 챙겼는지 확인해 보렴.']]);return true;}
   a.talk([['you','정령왕이 진정하셨어요. 동굴에서 빌린 열쇠도 돌려드릴게요.'],['laura','고맙구나. 대지가 상처받지 않도록 우리도 더 조심해야겠어.'],['laura','모아 온 흙은 내게 주렴. 선물은 매번 달라질 수 있단다.']],()=>{const amount=inv.count(s,'spirit_soil');inv.remove(s,'earthLoanKey');if(amount)inv.remove(s,'spirit_soil',amount);const reward=gift(s,amount);s.sp+=10;s.fm_earth_king=0;s.earthPhase=0;s.fd_earth_king=(s.fd_earth_king||0)+1;save(a);a.toast('대지 정령 의뢰 완료 · 선행 점수 10 · '+reward);});return true;
  }
  if(e.id==='rotiFree'){
   if(s.earthPhase===0){a.talk([['rotiFree','정령왕을 만나려면 먼저 네 실력을 확인해야겠어.'],['you','싸우러 온 것만은 아니에요. 하지만 위험에 대비할 준비는 됐어요.'],['rotiFree','보스 쥐, 미스터리 박쥐, 아기 대지용을 각각 15마리씩 물리치고 돌아와.']],()=>{s.earthPhase=1;save(a);});return true;}
   if(s.earthPhase===1){if(!trialDone(s)){a.talk([['rotiFree','아직 시험이 남아 있어. '+trialText(s)]]);return true;}a.talk([['rotiFree','세 무리를 모두 상대했구나. 이제 안쪽 정령왕의 방으로 가도 좋아.'],['you','정령왕도 제 말을 들어 주셨으면 좋겠어요.']],()=>{s.earthPhase=2;save(a);});return true;}
   a.talk([['rotiFree','정령왕의 기운이 가라앉았어. 정말 잘해 냈구나.'],['you','다시는 이렇게 화내시지 않도록 사람들도 노력해야겠죠.'],['rotiFree','라우라 촌장에게 소식을 전해 줘. 빌린 열쇠도 잊지 말고.']],()=>{s.earthPhase=5;save(a);});return true;
  }
  if(e.id==='iceChief'){
   if(available(s,ice)){a.missionOffer(ice.title,'iceChief','얼음정령왕의 시험에 도전해 보겠나? 던전의 클라우디에게 가면 준비할 것을 알려줄 걸세.',()=>{s.fm_ice_king=1;s.icePhase=0;s.iceJewelOffered=0;save(a);a.talk([['you','무작정 정령왕을 찾아가면 안 되는군요.'],['iceChief','그래. 시험에 필요한 것을 갖추고 가게. 무사히 돌아오면 선물도 준비하지.']]);});return true;}
   a.talk([['iceChief','얼음정령왕의 시험을 마쳤구나. 고생했네.'],['you','재료를 모으고 아이스 주얼을 만드는 일부터 쉽지 않았어요.'],['iceChief','그 준비도 시험의 일부였을 게야. 약속한 선물을 받게.']],()=>{const reward=gift(s,s.iceJewelOffered||1);s.sp+=10;s.fm_ice_king=0;s.icePhase=0;s.iceJewelOffered=0;s.fd_ice_king=(s.fd_ice_king||0)+1;save(a);a.toast('얼음정령왕의 시험 완료 · 선행 점수 10 · '+reward);});return true;
  }
  if(e.id==='claudieFree'){a.talk([['claudieFree','정령왕을 만나려면 아이스 주얼이 필요해. 던전 몬스터들이 남기는 얼음조각과 피를 모아 봐.'],['you','두 재료만 모으면 주얼을 만들 수 있나요?'],['claudieFree','조합은 오당카에게 부탁해. 아기 얼음용, 얼음 유령마, 아이스 골렘을 조심하고.']],()=>{s.icePhase=1;save(a);});return true;}
  if(e.id==='spiritGrapeMerchant'){
   a.missionOffer('최고급 포도 구매','spiritGrapeMerchant','최고급 포도 5개에 1000핀이야. 아기 대지용에게서 구하기 어렵다면 여기서 사 가도 좋아.',()=>{if(s.gold<1000){a.talk([['spiritGrapeMerchant','1000핀이 필요해. 지금은 핀이 모자라는구나.']]);return;}s.gold-=1000;inv.add(s,'spiritGrape',5);save(a);a.talk([['spiritGrapeMerchant','최고급 포도 5개야. 조심히 가져가.']]);},'1000핀에 구매');return true;
  }
  if(e.id==='odangka'){
   const pairs=Math.min(inv.count(s,'icepiece'),inv.count(s,'iceblood'));
   if(pairs<1||inv.count(s,'spiritGrape')<5){a.talk([['odangka','아이스 주얼을 만들고 싶다고? 얼음조각과 얼음 몬스터의 피를 짝지어 가져오너라.'],['odangka','그리고 최고급 포도 5개! 그 정도는 있어야 이 오당카님이 솜씨를 발휘하지.'],['you','포도는 아기 대지용에게서 구하거나 학교 앞 도매리 상인에게 살 수 있겠네요.'],['odangka','얼음조각 '+inv.count(s,'icepiece')+'개, 피 '+inv.count(s,'iceblood')+'개, 포도 '+inv.count(s,'spiritGrape')+'/5개로군.']]);return true;}
   a.talk([['odangka','좋아. 포도도 있고 재료도 준비됐군. 잠시 기다리거라.'],['narrator','차가운 조각과 푸른 액체가 섞이며 작은 주얼들이 반짝였다.'],['odangka','아이스 주얼 '+pairs+'개다. 정령왕을 만나러 가거라.']],()=>{inv.remove(s,'spiritGrape',5);inv.remove(s,'icepiece',pairs);inv.remove(s,'iceblood',pairs);inv.add(s,'iceJewel',pairs);s.icePhase=2;save(a);});return true;
  }
  if(e.id==='earthSpiritKing'||e.id==='iceSpiritKing'){
   const isEarth=e.id==='earthSpiritKing',phase=isEarth?'earthPhase':'icePhase';
   if(s[phase]===3){a.talk([[e.id,isEarth?'분노에 휩쓸려 잠시 이성을 잃었구나. 나를 깨워 주어서 고맙다.':'준비와 용기를 모두 보여 주었구나. 시험을 잘 견뎌 냈다.'],['you',isEarth?'사람들이 대지를 아끼도록 저도 말씀드릴게요.':'돌아가서 시험을 마쳤다고 전할게요.']],()=>{s[phase]=4;save(a);});return true;}
   if(!isEarth&&!s.iceJewelOffered){const amount=inv.count(s,'iceJewel');if(!amount){a.talk([['iceSpiritKing','아이스 주얼을 갖추고 다시 찾아오너라.']]);return;}inv.remove(s,'iceJewel',amount);s.iceJewelOffered=amount;save(a);}
   a.talk([[e.id,isEarth?'대지의 울림을 들을 준비가 되었느냐!':'그대의 힘과 의지를 보여 보아라!'],['you','침착하게 마력의 흐름을 살피자.']],()=>a.battle(isEarth?'free_earth_king':'free_ice_king'));return true;
  }
  a.talk([['you','한 무리씩 상대하며 주변을 살피자.']],()=>a.battle(e.id==='iceTrialPatrol'?'iceTrialMaterials':e.id==='grapeDragonPatrol'?'iceGrapeDragons':'spirit_'+e.id));return true;
 };
 const victory=F.victory;F.victory=(s,b)=>{victory(s,b);migrate(s);if(!b.spec?.repeatable&&!b.spec?.spiritHunt)return;const dead=(b.enemies||[]).filter(e=>e.hp<=0);
  if(active(s,earth)&&s.earthPhase===1)for(const e of dead){const row=trials.find(r=>r[3]===e.name||r[0]==='earthBat'&&e.name==='박쥐');if(row)s[row[0]]=Math.min(15,(s[row[0]]||0)+1);}
 };
 const enemy=(name,sprite,element=2)=>({name,sprite,element,hp:280,maxHp:280,atk:20,atb:0});
 for(const[key,,id,name,sprite]of trials)x.encounters['spirit_'+id]={name:name+' 시험',freeBattle:true,spiritHunt:true,bg:'assets/maps-hires/forest-battle.png',xp:75,gold:30,sp:0,prepare:s=>({enemies:Array.from({length:Math.max(1,Math.min(3,15-s[key]))},()=>enemy(name,sprite))})};
 x.encounters.iceTrialMaterials={name:'아이스 주얼 재료 수집',freeBattle:true,spiritHunt:true,bg:'assets/maps-hires/forest-battle.png',xp:100,gold:35,sp:0,enemies:[enemy('아기 얼음용','penguin',1),enemy('얼음 유령마','ice',1),enemy('아이스 골렘','cubic',1)]};
 x.encounters.iceGrapeDragons={name:'최고급 포도를 찾아서',freeBattle:true,spiritHunt:true,bg:'assets/maps-hires/forest-battle.png',xp:80,gold:30,sp:0,enemies:[enemy('아기 대지용','earthdon'),enemy('아기 대지용','earthdon')],onWin:s=>inv.add(s,'spiritGrape',1)};
 for(const id of ['earth','ice']){const e=x.encounters['free_'+id+'_king'];delete e.freeMission;e.onWin=s=>{s[id+'Phase']=3;};}
 const objective=F.objective,marker=F.marker;F.objective=(s,e)=>{migrate(s);return target(s,e)||objective(s,e);};F.marker=(s,e)=>{migrate(s);return target(s,e)?'!':marker(s,e);};
 const decorate=x.decorate;x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);migrate(s);const add=(id,pos)=>{if(!sc.entities.some(e=>e.id===id))sc.entities.push({...n(id,...pos),...(['earthdungeon','icedungeon'].includes(sc.id)?{fixedTile:true}:{})});};
  if(sc.id==='earthdungeon'&&active(s,earth)){
   if([0,1,4].includes(s.earthPhase))add('rotiFree',ARPIA_TILEMAP.spot('earthdungeon','roti'));
   if([2,3].includes(s.earthPhase))add('earthSpiritKing',ARPIA_TILEMAP.spot('earthdungeon','earthSpiritKing'));
   if(s.earthPhase===1)for(const [i,[key,,id]]of trials.entries())if(s[key]<15)add(id,[[640,800],[2040,850],[1360,1540]][i]);
  }
  if(sc.id==='icedungeon'&&active(s,ice)){if(s.icePhase===0)add('claudieFree',[1488,2138]);if(s.icePhase===1)add('iceTrialPatrol',[1488,1850]);if([2,3].includes(s.icePhase))add('iceSpiritKing',ARPIA_TILEMAP.spot('icedungeon','iceSpiritKing'));}
  if(active(s,ice)&&s.icePhase===1){if(sc.id==='campus')add('spiritGrapeMerchant',[390,325]);if(sc.id==='forest')add('grapeDragonPatrol',[500,355]);}
 };
 return{migrate,trials,earth,ice};
})();
