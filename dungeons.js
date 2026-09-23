/* Dungeon scene wiring for the tile maps (tools/maps_*.py). Story entities of chapters 4-16
   keep their ids; their positions come from each map's spots. */
(()=>{
 const x=ARPIA_EXTRA,T=window.ARPIA_TILEMAP;if(!T)return;
 const previous=x.decorate;
 // map id -> [[exit spot, target scene, label, minStage]]
 const EXITS={
  mineInside:[['back','mine','난쟁이 광산',0],['mineShaft','mineShaft','광산 갱도',96],['zombieRoom','zombieRoom','좀비 세자매의 방',96]],
  mineShaft:[['back','mineInside','광산 안 던전',0],['palaceStairs','palaceStairs','난쟁이 궁전 계단',104],['oldMine','minedepths','난쟁이의 옛 광산',96]],
  palaceStairs:[['back','mineShaft','광산 갱도',0],['dwarfpalace','dwarfpalace','미로 던전',104]],
  zombieRoom:[['back','mineInside','광산 안 던전',0]],
  earthdungeon:[['back','earthvillage','대지 마을',0]],
  mercden:[['back','weila','웨일라 대륙',0]],
 };
 const NAMES={mineInside:'난쟁이 광산 · 안 던전',mineShaft:'난쟁이 광산 · 갱도',palaceStairs:'난쟁이 궁전 계단',zombieRoom:'좀비 세자매의 방',earthdungeon:'대지 마을 던전 · 정령의 흙동굴',mercden:'용병단의 소굴'};
 for(const id of Object.keys(EXITS)){
  if(!T.has(id))continue;
  x.scenes[id]=(s,n,p)=>{const sc=T.scene(id);sc.name=NAMES[id];for(const[key,to,label,min]of EXITS[id]){const q=T.spot(id,key);if(q)sc.entities.push({...p(key,label,q[0],q[1],to,null),minStage:min});}return sc;};
 }
 // Fried's mirror: every entry reshuffles which room each door leads to; room 8 holds the seal.
 if(T.has('mirrormaze'))x.scenes.mirrormaze=(s,n,p)=>{
  const sc=T.scene('mirrormaze');const d=ARPIA_MAPS.mirrormaze;let seed=Math.floor(s.seconds/60)+s.stage*7;const rnd=()=>(seed=(seed*9301+49297)%233280)/233280;
  for(const key of d.mirrorDoors){const q=d.spots[key],room=+key[4];let to=Math.floor(rnd()*9);if(to===room)to=(to+1+Math.floor(rnd()*8))%9;const a=d.spots['room'+to];sc.entities.push({...p(key,'거울 문',q[0],q[1],'mirrormaze',[a[0],a[1]])});}
  const b=d.spots.room0;sc.entities.push({...p('back','거울 밖으로',b[0]-90,b[1]-40,'underpass',null)});
  const seal=d.spots.sunseal;sc.entities.push({id:'mirrorSeal',type:'landmark',label:'태양의 보석 봉인대',x:seal[0],y:seal[1]});
  sc.name='프리드의 거울 속';return sc;};
 x.map.push(['mineInside','광산 안 던전',null],['mineShaft','광산 갱도',null],['palaceStairs','궁전 계단',null],['earthdungeon','대지 마을 던전',null],['mirrormaze','프리드의 거울 속',null],['mercden','용병단의 소굴',null],['zombieRoom','좀비 세자매의 방',null]);
 const retarget={mine:{minedepths:'mineInside'},minedepths:{mine:'mineShaft'},dwarfpalace:{minedepths:'palaceStairs'}};
 x.decorate=(sc,s,n,p)=>{previous(sc,s,n,p);
  const map=retarget[sc.id];
  if(map&&T.has(Object.values(map)[0]))for(const e of sc.entities)if(e.type==='portal'&&map[e.to]){e.to=map[e.to];e.spawn=null;if(sc.id==='mine')e.label='광산 안 던전';if(sc.id==='minedepths')e.label='광산 갱도';if(sc.id==='dwarfpalace')e.label='궁전 계단';}
  if(sc.id==='earthvillage'&&T.has('earthdungeon')&&(s.stage>=170||s.fm_earth_king===1))sc.entities.push({...p('earthDungeonDoor','제단 뒤 토템 문',540,300,'earthdungeon',null)});
  if(sc.id==='icevillage'&&T.has('icedungeon')&&s.stage<306&&s.fm_ice_king===1&&!sc.entities.some(e=>e.to==='icedungeon'))sc.entities.push({...p('iceDungeonDoor','동상 아래 얼음 문',610,300,'icedungeon',null)});
  if(sc.id==='underpass'&&T.has('mirrormaze')&&s.stage>=292)sc.entities.push({...p('mirrorInside','프리드의 거울 속으로',0,0,'mirrormaze',null),fixedSpot:'friedsMirror'});
  if(sc.id==='minedepths'&&T.has('palaceStairs'))sc.entities=sc.entities.filter(e=>!(e.type==='portal'&&e.to==='dwarfpalace'));
 };
})();
