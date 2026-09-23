/* Source matching repairs. Story events remain in their chapter definitions. */
(()=>{
 const x=ARPIA_EXTRA, A='assets/original/';
 // Reconnect existing matching art; cake icons are new vector reconstructions.
 ARPIA_DATA.ITEMS.mt_navinium31.icon='assets/navinium.png';
 ARPIA_DATA.ITEMS.mt_lala26.icon='assets/items/lala.png';
 x.npcs.lalaBush26.artPath='assets/objects/gather-lala.png';
 ARPIA_DATA.ITEMS.mt_akaniaFlower32.icon='assets/midterm/akania.png';
 ARPIA_DATA.ITEMS.mt_cake32.icon='assets/story-icons/star-cake.svg';
 x.npcs.brokenCake32.artPath='assets/story-icons/broken-star-cake.svg';
 Object.assign(x.npcs.aaron29,{anim:'npc_009_도트_아론',portrait:'teacher/아론.png'});
 Object.assign(x.npcs.buma35,{anim:'npc_039_도트_부마',portrait:'worker/부마.png'});
 Object.assign(x.npcs.meli,{portrait:'worker/멜리.png'});
 Object.assign(x.npcs.billy35,{...x.npcs.billy26,name:'빌리'});
 const ally=(id,name,anim,hp,atk,skill)=>({id,name,sprite:A+'animation/'+anim+'/idle.gif',hp,maxHp:hp,atk,skill});
 const aaron=()=>ally('aron','아론','npc_009_도트_아론',1100,48,'attack');
 const team=()=>[ally('isaac','아이작','npc_005_도트_아이작',700,38,'mana'),ally('naomi','나오미','npc_008_도트_나오미',1000,42,'heal')];
 for(const id of ['hungerWolf31','wolfGuards33','hungerKey33'])x.encounters[id].allies=[aaron()];
 for(const id of ['hungerTrail35','devileyeFinal35'])x.encounters[id].allies=team();
 const c=ARPIA_MIDTERM.chapters.find(c=>c.number===35),m=ARPIA_MIDTERM;
 const portrait='assets/restored/devileye-portrait.png',sprite='assets/restored/devileye-sprite.png';
 Object.assign(x.npcs.devileye35,{portraitPath:portrait,artPath:sprite,height:82});ARPIA_PORTRAITS.devileye35=portrait;
 x.encounters.devileyeFinal35.enemies[0].artPath=sprite;
 const villain=()=>({name:'데빌아이',element:3,hp:99999,maxHp:99999,atk:420,atb:80,artPath:sprite,height:170});
 const defeat=(name,next,bg,onLose)=>({name,next,bg,mustLose:true,xp:0,gold:0,sp:0,intro:'수많은 눈에서 강한 마력이 모여듭니다.',loseTitle:'GAME OVER',loseText:'데빌아이의 마력을 견디지 못하고 쓰러졌다.',enemies:[villain()],onLose});
 x.encounters.devileyeAmbush35=defeat('불꽃 마을 앞 · 데빌아이',c.keys.memorialRaid,'assets/maps-hires/forest-battle.png',s=>{for(const id of ['memorialKey35','fireKeyTooth35','fireKeyShaft35','fireKeyRing35'])m.take(s,id);s.devileyeKeyStolen35=true;});
 x.encounters.devileyePalace35=defeat('난쟁이 궁전 · 두 번째 습격',c.keys.hungerTalk,'assets/restored/diamond-room.png');
 const hunts=[['fireGolemKey35','fireGolem34','fireKeyTooth35','열쇠의 이빨',c.keys.scorpionKey],['fireScorpionKey35','fireScorpion34','fireKeyShaft35','열쇠의 몸통',c.keys.goblinKey],['fireGoblinKey35','fireGoblin34','fireKeyRing35','열쇠의 고리',c.keys.firstLoss]];
 x.encounters.fireScorpion34.enemies[0].artPath='assets/restored/flame-scorpion.png';
 for(const[id,source,item,name,next]of hunts){
  const original=x.encounters[source];
  x.encounters[id]={...original,next,onWin:s=>m.give(s,item),enemies:original.enemies.map(e=>({...e}))};
  x.npcs[id]={name:original.enemies[0].name,artPath:original.enemies[0].artPath,height:78};
  const part={fireKeyTooth35:'tooth',fireKeyShaft35:'shaft',fireKeyRing35:'ring'}[item];
  ARPIA_DATA.ITEMS['mt_'+item]={name,desc:'파이티어 기념관의 열쇠 조각',kind:'quest',price:0,sell:0,icon:'assets/restored/fire-key-'+part+'.png'};
  const item34=item.replace('35','34');
  ARPIA_DATA.ITEMS['mt_'+item34]={...ARPIA_DATA.ITEMS['mt_'+item]};
  original.onWin=s=>m.give(s,item34);
 }
 const c34=m.chapters.find(c=>c.number===34),merge=c34.steps.find(r=>r.key==='merge');
 merge.effect=s=>{for(const id of ['fireKeyTooth34','fireKeyShaft34','fireKeyRing34'])m.take(s,id);m.give(s,'fireKey34');};
 x.npcs.emptyAltar35={name:'비어 있는 불꽃 제단'};
 const roomBg='assets/restored/paitier-memorial.png';
 x.scenes.paitierMemorial34=(s,n,p)=>({id:'paitierMemorial34',name:'파이티어 기념관',bg:roomBg,w:1000,h:750,zoom:1.05,nodes:[[225,590],[345,545],[460,500],[580,500],[685,510],[775,465],[620,400],[475,400]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,2],[3,6]],navRadius:40,entities:[p('back','불꽃 마을',225,590,'firevillage',[300,650])]});
 for(const chapter of m.chapters)for(const row of chapter.steps)if(row.scene==='paitierMemorial34')row.pos=row.npc==='memorialKey34'?[345,545]:[580,485];
 // Explicit connected rooms; the pursuit no longer appears in the palace entrance.
 x.scenes.diamondRoom35=(s,n,p)=>({id:'diamondRoom35',name:'난쟁이 궁전 · 다이아몬드 방',bg:'assets/restored/diamond-room.png',w:1000,h:667,zoom:1.05,nodes:[[150,555],[285,500],[410,425],[530,385],[650,320],[740,405]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,3]],entities:[p('back','별문 너머의 방',150,555,'palacechamber',null)]});
 x.scenes.westgate35=(s,n,p)=>({id:'westgate35',name:'큐리어스 저택 북쪽 · 금단의 서문',bg:'assets/restored/westgate-field.png',w:1000,h:667,zoom:1.05,nodes:[[850,580],[710,515],[560,430],[410,355],[280,280],[160,220],[430,510],[640,570]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[3,6],[6,7],[7,1]],entities:[p('back','큐리어스 저택',850,580,'curiousmansion',[470,370])]});
 c.steps.find(r=>r.key==='west').pos=[280,280];
 c.steps.find(r=>r.key==='hungerTalk').pos=[530,385];
 const westMap=x.map.find(r=>r[0]==='westgate35');if(westMap)westMap[2]=[850,580];
 // Painted rooms need floor collision: outside the room and the altar are solid.
 const inside=(px,py,poly)=>{let hit=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>py)!==(b[1]>py)&&px<(b[0]-a[0])*(py-a[1])/(b[1]-a[1])+a[0])hit=!hit;}return hit;};
 const mask=(id,w,h,polys,holes=[])=>{const cell=8,cols=Math.ceil(w/cell),rows=[];for(let y=0;y<Math.ceil(h/cell);y++){const run=[];let start=-1;for(let x=0;x<=cols;x++){const valid=x<cols&&polys.some(p=>inside(x*cell+4,y*cell+4,p))&&!holes.some(p=>inside(x*cell+4,y*cell+4,p));if(valid&&start<0)start=x;if(!valid&&start>=0){run.push(start,x-1);start=-1;}}rows.push(run);}window.ARPIA_MAPS=window.ARPIA_MAPS||{};window.ARPIA_MAPS['wm:'+id]={id:'wm:'+id,w,h,cell,cols,rows,objects:[]};};
 mask('paitierMemorial34',1000,750,[[[18,498],[522,278],[982,470],[495,729]],[[95,596],[174,554],[334,627],[232,681]]],[[[541,422],[592,391],[651,423],[649,467],[595,486],[542,463]]]);
 mask('diamondRoom35',1000,667,[[[35,377],[518,155],[966,374],[386,650]],[[55,638],[150,552],[267,483],[322,531],[219,601],[92,662]]],[[[533,164],[569,145],[612,167],[609,191],[574,206],[536,188]],[[738,260],[779,244],[817,262],[817,287],[780,307],[740,286]]]);
 mask('westgate35',1000,667,[[[12,275],[320,164],[580,233],[760,387],[980,314],[985,647],[352,648],[35,470]]]);
 const decorate=x.decorate;x.decorate=(sc,s,n,p)=>{
  decorate(sc,s,n,p);
  if(sc.id==='palacechamber'&&s.stage>=c.keys.baldi&&!sc.entities.some(e=>e.to==='diamondRoom35'))sc.entities.push(p('diamond35','다이아몬드 문',570,325,'diamondRoom35',[150,555]));
  if(sc.id==='firevillage'&&s.stage>=m.chapters.find(c=>c.number===34).keys.open&&!sc.entities.some(e=>e.to==='paitierMemorial34'))sc.entities.push(p('memorial35','파이티어 기념관',300,600,'paitierMemorial34',[225,590]));
  if(sc.id==='curiousmansion'&&s.stage>=c.keys.hungerClue&&!sc.entities.some(e=>e.to==='westgate35'))sc.entities.push(p('west35','금단의 서문으로',470,370,'westgate35',[850,580]));
  if(sc.id==='paitierMemorial34'&&(s.stage<c.keys.memorialRaid||s.stage>=c.keys.apology)&&!sc.entities.some(e=>e.id==='paitierFlame34'))sc.entities.push({...n('paitierFlame34',590,445),type:'fixture'});
 };
})();
