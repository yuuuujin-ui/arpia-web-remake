/* Weila continent: walkable field between towns (tools/maps_weila.py).
   Town exits lead onto the continent in front of each town; the warp list in the map
   panel is kept for testing. */
(()=>{
 const x=ARPIA_EXTRA,T=window.ARPIA_TILEMAP,W=ARPIA_MAPS.weila;if(!W)return;
 const previous=x.decorate;
 const byScene={};for(const p of W.portals)if(p.to)byScene[p.to]=p;
 const home=s=>['firevillage','icevillage','earthvillage'][s.element];
 // scenes that sit on the continent: leaving them goes back to that spot
 const outer={campus:'campus',kingdom:'kingdom',magecity:'magecity',mine:'mine',asuria:'asuria',nymphen:'nymphen',eaglevillage:'eaglevillage',
  judah:'judah',curiousmansion:'curiousmansion',icevillage:'icevillage',earthvillage:'earthvillage',firevillage:'firevillage',eastgate:'eastgate',
  oak:'oak',waterfall:'waterfall',ghostforest:'ghostforest',mercden:'mercden'};
 const EXIT_NODE={oak:[520,470],waterfall:[218,407],ghostforest:[270,450]};
 function worldSpot(id,s){const key=id==='village'?home(s):id;if(key==='mercden'){const q=T.nearest({tilemap:'weila'},{x:3380,y:6824});return q?[q.x,q.y]:W.spots.campus;}const p=byScene[key];return p?[p.x,p.y+64]:W.spots.campus;}
 function gate(s,p){if(p.to===home(s))return 7;if(p.to==='village')return 7;return p.minStage;}
 x.scenes.weila=(s,n,portal)=>{
  const sc=T.scene('weila');sc.name='웨일라 대륙';
  for(const p of W.portals){
   if(!p.to){sc.entities.push({id:p.id,type:'landmark',label:p.label,x:p.x,y:p.y});continue;}
   let to=p.to;if(to===home(s)&&s.stage<167)to='village';
   sc.entities.push({...portal(p.id,p.label,p.x,p.y,to,null),minStage:gate(s,p),worldGate:true});
  }
  if(T.has('mercden')){const q=T.nearest(sc,{x:3380,y:6760});if(q)sc.entities.push({...portal('place_mercden','용병단의 소굴',q.x,q.y,'mercden',null),minStage:133});}
  return sc;
 };
 x.map.push(['weila','웨일라 대륙',W.spots.campus]);
 x.decorate=(sc,s,n,p)=>{previous(sc,s,n,p);
  if(sc.id==='weila')return;
  const here=sc.id==='village'?'village':outer[sc.id];
  if(!here)return;
  const spot=worldSpot(sc.id,s);
  if(sc.id==='campus'){
   // regional doors in the schoolyard are replaced by the road out of school
   sc.entities=sc.entities.filter(e=>!(e.type==='portal'&&(outer[e.to]||e.to==='village')&&e.to!=='campus'));
   sc.entities.push({...p('weilaExit','웨일라 대륙 · 학교 밖',200,685,'weila',spot),minStage:7});
   return;
  }
  let found=false;
  for(const e of sc.entities)if(e.type==='portal'&&e.to==='weila'){if(!e.spawn)e.spawn=[...spot];found=true;}
  const walkOut={kingdom:['magecity','ghostforest'],magecity:['kingdom'],ghostforest:['kingdom'],icevillage:['earthvillage'],earthvillage:['firevillage']};
  for(const e of sc.entities){if(e.type!=='portal')continue;if(e.to==='campus'||(walkOut[sc.id]||[]).includes(e.to)){const dest=e.to;e.to='weila';e.spawn=dest==='campus'?[...spot]:worldSpot(dest,s);e.label=dest==='campus'?'웨일라 대륙으로':(byScene[dest]?.label||'')+' 방면 · 대륙';found=true;}}
  if(!found){const node=EXIT_NODE[sc.id]||sc.nodes?.[0];if(node)sc.entities.push({...p('weilaExit','웨일라 대륙으로',node[0],node[1],'weila',[...spot])});}
 };
 window.ARPIA_WEILA={spot:worldSpot,data:W};
})();
