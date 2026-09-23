/* alicer.tistory.com/117: four ingredient counts, waterway map, Meteor and 150 SP.
   Dialogue is paraphrased; shoreline layout and encounter balance are reconstructed. */
window.ARPIA_CAPTURE_JOKER=(()=>{
 const x=ARPIA_EXTRA,F=ARPIA_FREE,D=ARPIA_DATA,inv=ARPIA_SYS.inv;
 Object.assign(x.npcs.joker,{portraitPath:'assets/restored/joker-cutout-v1.png',artPath:'assets/restored/joker-cutout-v1.png',height:80});delete x.npcs.joker.portrait;
 const d=F.defs.find(d=>d.id==='joker_relief');
 Object.assign(d,{kind:'chain',title:'조커의 변비',minStage:ARPIA_MIDTERM.chapters.find(c=>c.number===19).end,unlockLabel:'제19화 완료 · 수중 던전 개방',summary:'네 가지 약재를 모은 뒤 신전에서 마법 휴지를 구해 조커에게 전달한다.',reward:'선행 점수 150',sp:150,ethers:0});
 const gather=[
  {id:'reliefMulberry',name:'누에 열매',total:3,scene:'curiousmansion',pos:[510,395],icon:'assets/items/grape.png'},
  {id:'reliefLala',name:'랄라 열매',total:3,scene:'fishshoreRelief',pos:[640,330],icon:'assets/items/lala.png'},
  {id:'reliefRuby',name:'루비 원석',total:5,scene:'mine',pos:[360,380],icon:'assets/items/manastone_plus.png'},
  {id:'reliefWeed',name:'수중초',total:4,scene:'divehall',pos:[1420,792],icon:'assets/items/herb.png'}
 ];
 for(const r of gather){D.ITEMS[r.id]={name:r.name,kind:'quest',sell:0,price:0,desc:'조커의 약재',icon:r.icon};x.npcs[r.id]={name:r.name+' 채집',artPath:r.icon,height:34};}
 D.ITEMS.reliefTissue={name:'마법 휴지',kind:'quest',sell:0,price:0,desc:'메테오를 물리치고 얻은 조커의 부탁 물품',icon:'assets/magic-tissue.png'};
 x.npcs.reliefMeteor={name:'휴지를 지키는 메테오',artPath:'assets/meteor-monster.png',height:110};
 Object.assign(x.defaults,{reliefPhase:0,reliefVersion:0});
 const active=s=>s.fm_joker_relief===1,available=s=>!s.fm_joker_relief&&s.stage>=d.minStage;
 function migrate(s){if(s.reliefVersion===1)return;if(s.fm_joker_relief===2){s.fm_joker_relief=1;s.reliefPhase=0;}s.reliefVersion=1;}
 const ready=s=>gather.every(r=>inv.count(s,r.id)>=r.total);
 const counts=s=>gather.map(r=>r.name+' '+inv.count(s,r.id)+'/'+r.total).join(' · ');
 const target=(s,e)=>{
  if(available(s))return s.scene==='curiousmansion'&&e.id==='joker';
  if(!active(s))return false;
  if(s.reliefPhase===0)return(s.scene==='curiousmansion'&&e.id==='joker')||gather.some(r=>r.id===e.id&&r.scene===s.scene&&inv.count(s,r.id)<r.total);
  return s.reliefPhase===1?s.scene==='gluglutemple'&&e.id==='gluglu':s.reliefPhase===2?s.scene==='reliefArena'&&e.id==='reliefMeteor':s.scene==='curiousmansion'&&e.id==='joker';
 };
 const save=a=>{a.save();a.refresh();};
 d.progress=s=>s.reliefPhase===0?counts(s):s.reliefPhase===1?'글루글루 신전에 마법 휴지 문의하기':s.reliefPhase===2?'신전 시험장에서 메테오와 대결':'조커에게 마법 휴지 전달하기';
 const before=F.interact;F.interact=(e,a)=>{const s=a.state;migrate(s);if(!target(s,e))return before(e,a);
  if(available(s)){a.missionOffer(d.title,'joker','배가 불편해서 아무 일도 손에 잡히지 않는군. 약재를 구해 주겠나?',()=>{s.fm_joker_relief=1;s.reliefPhase=0;s.fc_joker_relief=0;save(a);a.talk([['joker','누에 열매 3개, 랄라 열매 3개, 루비 원석 5개, 수중초 4개가 필요하네.'],['you','열매와 약초만 들어가는 약은 아니군요. 목록을 챙겨서 다녀올게요.'],['joker','누에 열매는 이 저택 근처, 랄라 열매는 어인마을 북쪽, 루비 원석은 난쟁이 광산 입구에서 구하게.'],['joker','수중초는 던전 네 번째 줄 오른쪽 물길에서 찾아보게.']]);});return true;}
  const r=gather.find(r=>r.id===e.id);
  if(r){a.talk([['narrator',r.name+' 하나를 상하지 않게 챙겼다.']],()=>{inv.add(s,r.id);save(a);});return true;}
  if(s.reliefPhase===0){if(!ready(s)){a.talk([['joker','약재가 아직 부족하네. '+counts(s)]]);return true;}a.talk([['joker','약재는 전부 모였군. 잠깐만 기다리게.'],['narrator','조커가 재료를 섞어 약을 만들고 한 모금 마셨다.'],['you','이제 좀 나아지셨어요?'],['joker','한 가지 더 부탁하지. 신전에서 마법 휴지를 가져와 주겠나?']],()=>{gather.forEach(r=>inv.remove(s,r.id,r.total));s.reliefPhase=1;save(a);});return true;}
  if(s.reliefPhase===1){a.talk([['gluglu','마법 휴지는 시험장의 메테오를 이겨야 얻을 수 있다.'],['you','심부름인 줄 알았는데 전투 준비도 필요하군요.'],['gluglu','준비를 마친 뒤 시험장으로 가거라.']],()=>{s.reliefPhase=2;save(a);});return true;}
  if(s.reliefPhase===2){a.talk([['you','메테오를 쓰러뜨리고 휴지를 가져가자.']],()=>a.battle('jokerReliefMeteor'));return true;}
  if(!inv.count(s,'reliefTissue')){a.talk([['joker','마법 휴지를 챙겨 왔는지 확인해 주게.']]);return true;}
  a.talk([['you','마법 휴지를 가져왔어요. 메테오까지 상대할 줄은 몰랐어요.'],['joker','덕분에 살았네. 이제 연구를 계속할 수 있겠군.']],()=>{inv.remove(s,'reliefTissue');s.sp+=150;s.fd_joker_relief=(s.fd_joker_relief||0)+1;s.fm_joker_relief=0;s.reliefPhase=0;s.fc_joker_relief=0;save(a);a.toast('조커의 변비 완료 · 선행 점수 150');});return true;
 };
 const obj=F.objective,mark=F.marker;F.objective=(s,e)=>{migrate(s);return target(s,e)||obj(s,e);};F.marker=(s,e)=>{migrate(s);return target(s,e)?'!':mark(s,e);};
 const decorate=x.decorate;x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);migrate(s);
  if(active(s)&&s.reliefPhase===0)for(const r of gather)if(r.scene===sc.id&&inv.count(s,r.id)<r.total)sc.entities.push({...n(r.id,...r.pos),type:'fixture'});
  if(sc.id==='gluglutemple'&&active(s)&&s.reliefPhase===1&&!sc.entities.some(e=>e.id==='gluglu'))sc.entities.push(n('gluglu',230,142));
  if(sc.id==='judah'&&active(s)&&s.reliefPhase===0)sc.entities.push(p('relief-shore','어인마을 북쪽 물가',490,350,'fishshoreRelief',[160,450]));
  if(sc.id==='gluglutemple'&&active(s)&&s.reliefPhase===2)sc.entities.push(p('relief-arena','메테오 시험장',360,340,'reliefArena',[150,430]));
  if(sc.id==='reliefArena'&&active(s)&&s.reliefPhase===2)sc.entities.push(n('reliefMeteor',530,330));
 };
 x.encounters.jokerReliefMeteor={name:'마법 휴지 · 메테오',bg:'assets/maps-hires/colosseum.png',freeBattle:true,xp:650,gold:100,sp:0,enemies:[{name:'메테오',element:0,hp:2600,maxHp:2600,atk:33,atb:0,artPath:'assets/meteor-monster.png',height:190}],onWin:s=>{inv.add(s,'reliefTissue');s.reliefPhase=3;}};
 x.map.push(['fishshoreRelief','어인마을 북쪽 물가',[160,450]],['reliefArena','신전 · 메테오 시험장',[150,430]]);
 x.scenes.fishshoreRelief=(s,n,p)=>({id:'fishshoreRelief',name:'어인마을 북쪽 물가',bg:'assets/maps-hires/judah-harbor.png',w:960,h:540,zoom:1.05,nodes:[[160,450],[330,400],[480,365],[640,330]],edges:[[0,1],[1,2],[2,3]],entities:[p('back','쥬다 해안길',160,450,'judah',[490,350])]});
 x.scenes.reliefArena=(s,n,p)=>({id:'reliefArena',name:'신전 · 메테오 시험장',bg:'assets/maps-hires/colosseum.png',w:960,h:540,zoom:1.05,nodes:[[150,430],[320,380],[530,330],[700,380]],edges:[[0,1],[1,2],[2,3]],entities:[p('back','글루글루 신전',150,430,'gluglutemple',[360,340])]});
 return{gather,definition:d,migrate};
})();
