/* Visible symbol encounters.
   Tile maps: symbols (purple mist / grey cloud / cyan flame / blue wisp) wander inside the
   zones exported with each map, chase the player on sight and never enter the magic circles
   in front of towns. Monster groups follow arpia_world_design.md section 4; numbers are
   this remake's balance. The image-based west forest keeps its patrol routes. */
window.createArpiaEncounters=()=>{
 const X=window.ARPIA_EXTRA,TM=window.ARPIA_TILEMAP,MAPS=window.ARPIA_MAPS||{};
 const M=(name,element,hp,atk,sprite)=>[name,element,hp,atk,sprite];
 const MON={
  rat:M('들쥐',0,62,8,'moll'),wood:M('나무토막',0,72,9,'woodDoll'),spider:M('거미',2,96,11,'spider'),snake:M('뱀',2,112,12,'snake'),
  scorpion:M('전갈',2,122,12,'scorpion'),teddy:M('곰 인형',0,160,15,'ragDoll'),mushroom:M('버섯',0,104,11,'flower'),crab:M('몬스터 게',2,130,13,'crab'),
  goblin:M('고블린',0,120,12,'curseDoll'),golem:M('골렘',2,230,17,'turtle'),ghost:M('유령마',0,260,19,'shadow'),iceghost:M('얼음 유령마',1,280,20,'ice'),
  wolf:M('늑대',1,200,18,'fightDog'),bat:M('박쥐',0,90,11,'moth'),bossrat:M('보스쥐',0,190,16,'moll'),dragon:M('아기 대지용',2,330,22,'earthdon'),
  icedragon:M('아기 얼음용',1,300,21,'penguin'),icegolem:M('아이스 골렘',1,360,24,'cubic'),octopus:M('포악한 문어',1,300,22,'poisonFish'),squid:M('먹물 오징어',1,285,21,'sharkroon'),
  spiritdog:M('혼령강아지',1,170,16,'fightDog'),worm:M('지렁이',2,140,14,'snail'),mercenary:M('떠돌이 용병',0,260,21,'flameSoldier'),cowboy:M('카우보이 인형',0,320,23,'curseDoll'),
  flamesoldier:M('불꽃병사',0,170,15,'flameSoldier'),frog:M('늪 개구리',2,110,12,'frog'),zombie:M('좀비',2,150,15,'shadow'),skeleton:M('해골 전사',0,210,18,'shadow'),
  sheep:M('얼음양',1,120,12,'sheep'),cactus:M('선인장 괴물',2,150,14,'cactus'),orc:M('오크',2,230,19,'curseDoll'),
 };
 const g=(...ids)=>ids.map(i=>MON[i]);
 const TABLES={
  weila_school:{xp:20,gold:16,sp:4,groups:[g('rat','rat'),g('rat','wood'),g('wood','wood'),g('rat','rat','wood'),g('spider','rat')]},
  weila_oak:{xp:30,gold:22,sp:6,groups:[g('goblin','goblin'),g('golem'),g('goblin','golem'),g('orc','golem')]},
  weila_snake:{xp:26,gold:20,sp:5,groups:[g('snake'),g('snake','rat'),g('snake','spider')]},
  weila_ghost:{xp:44,gold:34,sp:8,groups:[g('ghost'),g('ghost','ghost'),g('ghost','snake')]},
  weila_snow:{xp:46,gold:34,sp:8,groups:[g('iceghost'),g('wolf','wolf'),g('iceghost','wolf'),g('sheep','sheep')]},
  weila_earth:{xp:28,gold:22,sp:5,groups:[g('rat','worm'),g('frog','frog'),g('worm','spider')]},
  weila_plain:{xp:30,gold:24,sp:6,groups:[g('spider','spider'),g('snake','frog'),g('rat','spider','wood')]},
  weila_dragon:{xp:60,gold:48,sp:10,groups:[g('dragon','dragon'),g('dragon','dragon','dragon'),g('dragon')]},
  weila_golem:{xp:62,gold:50,sp:10,groups:[g('icegolem'),g('icegolem','icegolem')]},
  weila_coast:{xp:58,gold:46,sp:10,groups:[g('octopus','squid'),g('octopus','octopus'),g('squid','squid'),g('octopus','squid','octopus')]},
  weila_fire:{xp:34,gold:26,sp:6,groups:[g('flamesoldier'),g('flamesoldier','goblin'),g('cactus','goblin')]},
  school_basement:{xp:26,gold:21,sp:6,groups:[g('scorpion','spider'),g('snake','mushroom'),g('spider','spider'),g('mushroom','mushroom')]},
  school_b2:{xp:30,gold:24,sp:7,groups:[g('teddy'),g('teddy','spider'),g('snake','scorpion')]},
  school_b2_lair:{xp:32,gold:25,sp:7,groups:[g('scorpion','scorpion'),g('scorpion','crab'),g('scorpion','scorpion','spider')]},
  school_tunnel:{xp:26,gold:21,sp:6,groups:[g('spider','bat'),g('crab','spider'),g('bat','bat'),g('mushroom','spider')]},
  mine_inside:{xp:40,gold:30,sp:8,groups:[g('zombie','bat'),g('worm','worm'),g('bat','zombie','bat')]},
  mine_shaft:{xp:44,gold:32,sp:8,groups:[g('spiritdog','spiritdog'),g('spiritdog'),g('spiritdog','bat')]},
  mine_old:{xp:46,gold:34,sp:8,groups:[g('worm','bat'),g('spiritdog','worm'),g('skeleton')]},
  mine_maze:{xp:52,gold:38,sp:9,groups:[g('skeleton','bat'),g('skeleton','skeleton'),g('worm','skeleton','bat')]},
  ice_dungeon:{xp:58,gold:44,sp:10,groups:[g('iceghost'),g('icedragon'),g('iceghost','icedragon'),g('sheep','iceghost')]},
  earth_dungeon:{xp:50,gold:36,sp:9,groups:[g('bossrat','bat'),g('bossrat','bossrat'),g('dragon'),g('bat','bat','bossrat')]},
  mirror_maze:{xp:54,gold:40,sp:9,groups:[g('ghost','bat'),g('skeleton'),g('ghost','skeleton')]},
  merc_den:{xp:64,gold:60,sp:10,groups:[g('mercenary','mercenary'),g('cowboy'),g('mercenary','cowboy')]},
  spider_canyon:{xp:56,gold:44,sp:9,groups:[g('spider','spider','spider'),g('scorpion','spider')]},
 };
 const SYMBOL={purple:0,grey:1,cyan:2,blue:3};
 // legacy image-scene patrol (west practice forest)
 const legacy={forest:{minStage:14,name:'서쪽 숲',bg:'assets/maps-hires/forest-battle.png',routes:[[[430,445],[590,445]],[[590,560],[750,560]],[[270,605],[430,605]]],enemies:[MON.rat,MON.wood],xp:22,gold:18,sp:5}};
 const known=new Set();let graceUntil=0;
 const register=(key,name,bg,table,groupIndex)=>{X.encounters['wild_'+key]={name:name+' · 몬스터 조우',intro:'몬스터와 마주쳤습니다. 마법과 펫을 활용하거나 도망칠 수 있습니다.',bg,repeatable:true,fieldKey:key,xp:table.xp,gold:table.gold,sp:table.sp,enemies:table.groups[groupIndex%table.groups.length].map(([name,element,hp,atk,sprite],j)=>({name,element,hp,maxHp:hp,atk,sprite,atb:j*12}))};};
 for(const[id,z]of Object.entries(legacy))z.routes.forEach((r,i)=>{const key=id+':'+i;known.add(key);register(key,z.name,z.bg,{xp:z.xp,gold:z.gold,sp:z.sp,groups:[z.enemies]},0);});
 const battleBg={weila:'assets/maps-hires/forest-battle.png'};
 const live=new Map();   // scene id -> symbol list
 let rng=1;const rand=()=>((rng=(rng*16807)%2147483647)/2147483647);
 function inSafe(d,x,y){return(d.safe||[]).some(([sx,sy,r])=>Math.hypot(x-sx,y-sy)<r);}
 function spawnPoint(scene,d,z){for(let k=0;k<40;k++){const x=z.rect[0]+rand()*z.rect[2],y=z.rect[1]+rand()*z.rect[3];if(TM.standable(scene,x,y)&&!inSafe(d,x,y))return{x,y};}return null;}
 function build(s,scene){
  const d=MAPS[scene.tilemap];const list=[];
  (d.zones||[]).forEach((z,zi)=>{const table=TABLES[z.table];if(!table)return;for(let i=0;i<(z.count||2);i++){const key=`${scene.id}:${z.id}:${i}`;known.add(key);const p=spawnPoint(scene,d,z);if(!p)continue;
   const group=Math.floor(rand()*table.groups.length);register(key,d.name,battleBg[scene.id]||'assets/maps-hires/forest-battle.png',table,group);
   list.push({key,zone:z,x:p.x,y:p.y,vx:0,vy:0,turn:0,idx:SYMBOL[z.symbol]??0,minStage:z.minStage||0,hidden:false});}});
  live.set(scene.id,list);return list;
 }
 function step(s,scene,list,dt){
  const d=MAPS[scene.tilemap],playerSafe=inSafe(d,s.x,s.y);
  for(const m of list){
   const until=s.encounterCooldowns[m.key]||0;
   if(until>s.seconds){m.hidden=true;continue;}
   if(m.hidden){const p=spawnPoint(scene,d,m.zone);if(p){m.x=p.x;m.y=p.y;}const t=TABLES[m.zone.table];register(m.key,d.name,battleBg[scene.id]||'assets/maps-hires/forest-battle.png',t,Math.floor(rand()*t.groups.length));m.hidden=false;}
   const dx=s.x-m.x,dy=s.y-m.y,dist=Math.hypot(dx,dy);let speed=34;
   if(dist<250&&!playerSafe&&s.seconds>=graceUntil){m.vx=dx/dist;m.vy=dy/dist;speed=88;}
   else{m.turn-=dt;if(m.turn<=0){const a=rand()*Math.PI*2;m.vx=Math.cos(a);m.vy=Math.sin(a);m.turn=1.2+rand()*2.4;if(rand()<.3){m.vx=m.vy=0;}}}
   const nx=m.x+m.vx*speed*dt,ny=m.y+m.vy*speed*dt,r=m.zone.rect,leash=dist<250?420:0;
   const inside=nx>r[0]-leash&&ny>r[1]-leash&&nx<r[0]+r[2]+leash&&ny<r[1]+r[3]+leash;
   if(inside&&TM.standable(scene,nx,ny)&&!inSafe(d,nx,ny)){m.x=nx;m.y=ny;}else if(TM.standable(scene,nx,m.y)&&!inSafe(d,nx,m.y)&&inside)m.x=nx;else if(TM.standable(scene,m.x,ny)&&!inSafe(d,m.x,ny)&&inside)m.y=ny;else m.turn=0;
  }
 }
 let lastT=null;
 function enter(s,scene){graceUntil=s.seconds+2.5;if(scene?.tilemap&&!live.has(scene.id))build(s,scene);lastT=s.seconds;}
 function entities(s,scene){
  if(!s.spell)return[];
  if(scene.tilemap&&MAPS[scene.tilemap]?.zones?.length){
   const list=live.get(scene.id)||build(s,scene);const dt=Math.min(.1,Math.max(0,s.seconds-(lastT??s.seconds)));lastT=s.seconds;step(s,scene,list,dt);
   return list.filter(m=>!m.hidden&&s.stage>=m.minStage).map(m=>({id:'wild:'+m.key,type:'roaming',fieldKey:m.key,encounter:'wild_'+m.key,label:'몬스터',x:m.x,y:m.y,idx:m.idx,hit:26}));
  }
  const z=legacy[scene.id];if(!z||s.stage<z.minStage)return[];
  return z.routes.flatMap(([a,b],i)=>{const key=scene.id+':'+i,until=s.encounterCooldowns[key]||0;if(until>s.seconds)return[];const t=(Math.sin(s.seconds*.48+i*2.1)+1)/2,x=a[0]+(b[0]-a[0])*t,y=a[1]+(b[1]-a[1])*t;if(until&&Math.hypot(x-s.x,y-s.y)<68)return[];return[{id:'wild:'+key,type:'roaming',fieldKey:key,encounter:'wild_'+key,label:'몬스터 구름',x,y,idx:i%3}];});
 }
 function normalize(value){const out={};if(value&&typeof value==='object'&&!Array.isArray(value))for(const[key,v]of Object.entries(value))if(/^[\w-]+:[\w-]+(:\d+)?$/.test(key)&&Number.isFinite(v)&&v>=0&&v<=1000000)out[key]=v;return out;}
 function ready(s){return s.seconds>=graceUntil;}
 function finish(s,key,won){s.encounterCooldowns[key]=s.seconds+(won?40:10);graceUntil=s.seconds+3;}
 function snapshot(s,scene){return{zone:scene.tilemap?(MAPS[scene.tilemap]?.zones||[]).map(z=>z.id):legacy[scene.id]?.name||null,grace:Math.max(0,graceUntil-s.seconds),cooldowns:{...s.encounterCooldowns},visible:entities(s,scene)};}
 return{enter,entities,normalize,ready,finish,snapshot,tables:TABLES,monsters:MON};
};
