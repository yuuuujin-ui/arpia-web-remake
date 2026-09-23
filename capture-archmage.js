/* Promotion walkthrough: user-supplied take1231-90035832101.png.
   Requirements and sequence are readable in the montage; dialogue is paraphrase
   and reconstruction where the underlying conversation text is too small. */
window.ARPIA_CAPTURE_ARCHMAGE=(()=>{
 const x=ARPIA_EXTRA,F=ARPIA_FREE,D=ARPIA_DATA,inv=ARPIA_SYS.inv,d=F.defs.find(d=>d.id==='archmage');
 Object.assign(d,{giver:'julia',scene:'classroom',kind:'chain',minStage:ARPIA_MIDTERM.chapters.find(c=>c.number===24).end,minLevel:50,rank:4,summary:'운석 조각·불멸의 마법석·생명의 보석으로 봉인을 풀고, 마법사의 도시에서 메테오를 물리친다.',reward:'대마도사 계급 · 선행 점수 300'});
 Object.assign(x.defaults,{archmageRoute:0,archmageGhosts:0,archmageIce:0,archmageRouteVersion:0});
 for(const[id,name,icon]of [['archCertificate','대마도사 시험 추천서','certificate'],['archFragment','운석의 조각','certificate'],['archImmortal','불멸의 마법석','certificate'],['archLife','생명의 보석','certificate']])D.ITEMS[id]={name,desc:'메테오의 봉인을 풀기 위한 승급시험 물품',kind:'quest',price:0,sell:0,icon:'assets/midterm/'+icon+'.png'};
 D.ITEMS.archFragment.icon='assets/items/golem_core.png';D.ITEMS.archImmortal.icon='assets/items/manastone_plus.png';D.ITEMS.archLife.icon='assets/items/manastone.png';
 Object.assign(x.npcs,{archGhost:{name:'승급 과제 · 유령마',artPath:'assets/original/pet-images/shadow/idle1.gif',height:75},archIce:{name:'승급 과제 · 아이스 골렘',artPath:'assets/original/pet-images/cubic/idle1.gif',height:75},archIceKing:{name:'생명의 보석 · 얼음정령왕',artPath:'assets/ice-spirit-king.png',height:85},archMeteor:{name:'봉인에서 풀려난 메테오',artPath:'assets/meteor-monster.png',height:105}});
 const R=(key,scene,npc,pos,title,lines,extra={})=>({key,scene,npc,pos,title,lines,...extra});
 d.unlockLabel='Lv.50 · 마도사 · 제24화 완료';
 const rows=[
 R('apply','classroom','julia',[530,185],'줄리아에게 대마도사 시험 추천받기',[['julia','이제 대마도사 시험에 도전할 준비가 되었구나. 모리스 교장 선생님께 이 추천서를 가져가렴.'],['you','지금까지 배운 것을 모두 써야 하는 시험이겠죠?'],['julia','힘만으로 해결하려 하지 말고, 누구에게 무엇을 배웠는지도 기억하렴.']],{effect:s=>inv.add(s,'archCertificate')}),
 R('morris','principal','morris',[470,220],'교장에게 메테오 시험 안내받기',[['morris','대마도사가 되기 위해서는 마법사의 도시에 봉인된 메테오를 물리쳐야 한다.'],['you','봉인을 풀어야 싸울 수 있군요.'],['morris','글루글루가 방법을 알려 줄 게다. 준비 없이 가까이 가지 말거라.']],{need:{archCertificate:1}}),
 R('gluglu','gluglutemple','gluglu',[230,142],'봉인을 풀 세 가지 물품 알아보기',[['gluglu','메테오의 봉인을 푸는 데는 세 가지가 필요하다. 운석의 조각, 불멸의 마법석, 생명의 보석이지.'],['you','차례로 구해 올게요. 첫 번째 조각은 어디에 있나요?'],['gluglu','조커를 만나 보게. 준비하는 과정도 시험의 일부라네.']]),
 R('joker','magecity','joker',[430,325],'조커의 두 가지 사냥 과제',[['joker','운석 조각을 구하려면 유령마 50마리와 아이스 골렘 30마리를 상대해 보게.'],['you','수가 많네요. 한꺼번에 덤비지 않고 나누어 싸워야겠어요.'],['joker','그렇지. 서로 다른 마력에 대처하는 법을 익히게나.']]),
 R('ghosts','ghostforest','archGhost',[720,305],'유령마 50마리 처치하기',[['you','유령마의 움직임부터 살피자. 무리 사이에 갇히지 않게 조심해야 해.']],{battle:'archGhosts'}),
 R('ice','icedungeon','archIce',[621,346],'아이스 골렘 30마리 처치하기',[['you','이번에는 아이스 골렘이야. 얼음의 힘을 끊어 가며 싸우자.']],{battle:'archIce'}),
 R('fragment','magecity','joker',[430,325],'조커에게 운석 조각 받기',[['joker','두 과제를 모두 마쳤군. 약속한 운석의 조각이다.'],['you','이 조각으로 메테오의 봉인에 가까이 갈 수 있겠죠?'],['joker','나머지 재료도 빠뜨리지 말게. 큐리어스가 다음 일을 알려 줄 걸세.']],{effect:s=>inv.add(s,'archFragment')}),
 R('curious','curiousmansion','curious',[260,132],'불멸의 마법석 재료 확인하기',[['curious','불멸의 마법석이 필요하다고? 마나스톤 30개와 강화 마나스톤 20개를 가져와.'],['you','강화된 것도 따로 필요한 거군요.'],['curious','평범한 돌만 잔뜩 모아 와서는 안 돼. 마력의 농도가 다르니까.']]),
 R('stones','curiousmansion','curious',[260,132],'마나스톤 30개·강화 마나스톤 20개 전달',[['you','말씀하신 두 종류의 마나스톤을 가져왔어요.'],['curious','좋아. 이제 이 돌들의 마력을 하나로 묶어 주지.'],['narrator','서로 다른 빛을 내던 돌들이 불멸의 마법석 안으로 스며들었다.']],{need:{manastone:30,manastone_plus:20},effect:s=>inv.add(s,'archImmortal')}),
 R('lifeInfo','curiousmansion','curious',[260,132],'세 개의 생명의 보석',[['curious','마지막은 생명의 보석 세 개야. 세자르 3세와 모리스 교장에게 먼저 부탁해 봐.'],['you','두 분이 가진 보석을 받을 수 있겠네요. 나머지 하나는요?'],['curious','얼음 마을의 던전에서 얼음정령왕을 상대해야 해. 준비를 잘하고 가.']]),
 R('royalGem','kingdom','caesar',[390,215],'세자르 3세의 생명의 보석',[['caesar','대마도사 시험이라니 대견하구나. 왕국에서 간직하던 생명의 보석을 내주겠다.'],['you','소중한 물건인 만큼 조심해서 쓰겠습니다.']],{effect:s=>inv.add(s,'archLife')}),
 R('schoolGem','principal','morris',[470,220],'모리스의 생명의 보석',[['morris','학교의 보석도 가져가거라. 이제 마지막 하나를 구해야겠구나.'],['you','얼음정령왕을 만나러 갈 거예요. 치료약도 넉넉히 준비할게요.']],{effect:s=>inv.add(s,'archLife')}),
 R('iceKing','icedungeon','archIceKing',[650,430],'얼음정령왕의 생명의 보석',[['you','봉인을 풀 마지막 보석이 필요해요. 시험을 치르겠습니다.'],['narrator','얼음정령왕이 차가운 기운을 모았다. 바닥을 따라 서리가 번졌다.']],{battle:'archIceKing'}),
 R('seal','gluglutemple','gluglu',[230,142],'세 가지 물품으로 봉인 풀기',[['gluglu','운석 조각, 불멸의 마법석, 생명의 보석 세 개. 빠짐없이 가져왔군.'],['you','이제 메테오와 싸울 수 있나요?'],['gluglu','봉인을 해제하겠네. 마법사의 도시 콜로세움으로 가게. 마지막 순간까지 집중해야 하네.']],{need:{archFragment:1,archImmortal:1,archLife:3}}),
 R('meteor','archmageArena','archMeteor',[530,330],'마법사의 도시 · 메테오와 대결',[['narrator','봉인에서 풀린 거대한 운석이 콜로세움 한가운데 떠올랐다. 갈라진 돌 사이로 뜨거운 빛이 번졌다.'],['you','여기까지 도와준 분들을 생각하자. 마지막 시험도 끝까지 해내겠어!']],{battle:'captureArchMeteor'}),
 R('report','principal','morris',[470,220],'대마도사 승급 인정받기',[['you','메테오를 물리쳤어요. 봉인에 필요한 물품을 모으며 배운 것이 전투에도 도움이 됐어요.'],['morris','훌륭하다. 이제 너를 대마도사로 인정하마.'],['you','앞으로 더 어려운 일이 있어도 오늘처럼 준비하고 도전하겠습니다.'],['morris','그 마음을 잊지 말거라. 큰 힘에는 그만큼 깊은 생각도 필요한 법이니.']])
 ];
 function migrate(s){if(s.archmageRouteVersion===1)return;if(s.archmage||s.fm_archmage===9){s.fm_archmage=9;s.archmage=true;s.rank=Math.max(4,s.rank||0);}else if(s.fm_archmage>0){s.fm_archmage=1;s.archmageRoute=1;inv.add(s,'archCertificate');}s.archmageRouteVersion=1;}
 const eligible=s=>!s.fm_archmage&&s.stage>=d.minStage&&s.level>=50&&(s.rank||0)===3,active=s=>s.fm_archmage===1;
 const row=s=>rows[s.archmageRoute||0],target=(s,e)=>{const r=row(s);return r&&r.scene===s.scene&&r.npc===e.id&&(active(s)||eligible(s));};
 const save=a=>{a.save();a.refresh();};
 d.progress=s=>{const r=row(s);return(r?.title||'모리스에게 보고하기')+(r?.key==='ghosts'?` · ${s.archmageGhosts||0}/50`:r?.key==='ice'?` · ${s.archmageIce||0}/30`:'');};
 const before=F.interact;F.interact=(e,a)=>{const s=a.state;migrate(s);if(!target(s,e))return before(e,a);const r=row(s);
  if(eligible(s)){a.missionOffer(d.title,'julia','레벨 50, 마도사 계급, 제24화 완료 조건을 갖췄구나. 메테오를 물리치는 대마도사 시험에 도전하겠니?',()=>{s.fm_archmage=1;s.archmageRoute=0;save(a);a.talk(r.lines,()=>{r.effect(s);s.archmageRoute=1;save(a);});});return true;}
  if(r.need&&Object.entries(r.need).some(([id,n])=>inv.count(s,id)<n)){a.talk([[r.npc,'아직 재료가 부족하구나. '+Object.entries(r.need).map(([id,n])=>`${D.ITEMS[id].name} ${inv.count(s,id)}/${n}`).join(' · ')]]);return true;}
  a.talk(r.lines,()=>{if(r.battle){a.battle(r.battle);return;}if(r.need)for(const[id,n]of Object.entries(r.need))inv.remove(s,id,n);r.effect?.(s);if(r.key==='report'){s.archmage=true;s.rank=Math.max(s.rank,4);s.fm_archmage=9;s.fd_archmage=(s.fd_archmage||0)+1;s.sp+=300;a.toast('대마도사 승급시험 완료');}else s.archmageRoute++;save(a);});return true;
 };
 const objective=F.objective,marker=F.marker;F.objective=(s,e)=>{migrate(s);return target(s,e)||objective(s,e);};F.marker=(s,e)=>{migrate(s);return target(s,e)?'!':marker(s,e);};
 const decorate=x.decorate;x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);migrate(s);const r=row(s);if((active(s)||eligible(s))&&r?.scene===sc.id&&!sc.entities.some(e=>e.id===r.npc))sc.entities.push(n(r.npc,...r.pos));if(sc.id==='magecity'&&active(s)&&s.archmageRoute>=14)sc.entities.push(p('archmage-arena','메테오의 콜로세움',555,490,'archmageArena',[150,430]));};
 const E=(name,sprite,element,hp=600)=>({name,sprite,element,hp,maxHp:hp,atk:27,atb:0});
 function counted(id,field,total,index,enemy,bg){x.encounters[id]={name:enemy.name+' · 승급 과제',bg,freeBattle:true,xp:110,gold:35,sp:0,enemies:[enemy],prepare:s=>({enemies:Array.from({length:Math.min(3,total-(s[field]||0))},()=>({...enemy}))}),onWin:(s,b)=>{s[field]=Math.min(total,(s[field]||0)+b.enemies.filter(e=>e.hp<=0).length);if(s[field]===total)s.archmageRoute=index+1;},progress:s=>`${s[field]||0}/${total}마리`};}
 counted('archGhosts','archmageGhosts',50,4,E('유령마','shadow',0),'assets/maps-hires/forest-battle.png');
 counted('archIce','archmageIce',30,5,E('아이스 골렘','cubic',1),'assets/maps-hires/ice-village.png');
 x.encounters.archIceKing={name:'생명의 보석 · 얼음정령왕',bg:'assets/maps-hires/ice-village.png',freeBattle:true,xp:600,gold:160,sp:0,enemies:[{...E('얼음정령왕','iceSpiritKing',1,2400),artPath:'assets/ice-spirit-king.png',height:170}],onWin:s=>{inv.add(s,'archLife');s.archmageRoute=13;}};
 x.encounters.captureArchMeteor={name:'대마도사 승급시험 · 메테오',bg:'assets/maps-hires/colosseum.png',freeBattle:true,xp:1100,gold:200,sp:0,enemies:[{...E('메테오','meteorMonster',0,4200),artPath:'assets/meteor-monster.png',atk:44,height:220}],onWin:s=>s.archmageRoute=15};
 x.map.push(['archmageArena','마법사의 도시 콜로세움',[150,430]]);x.scenes.archmageArena=(s,n,p)=>({id:'archmageArena',name:'마법사의 도시 · 메테오의 콜로세움',bg:'assets/maps-hires/colosseum.png',w:960,h:540,zoom:1.05,nodes:[[150,430],[320,380],[530,330],[700,380]],edges:[[0,1],[1,2],[2,3]],entities:[p('back','마법사의 도시',150,430,'magecity',[555,490])]});
 return{rows,definition:d,migrate};
})();
