document.getElementById('test-run').onclick=async()=>{
 const logs=[],out=document.getElementById('test-output'),ok=(v,m)=>{if(!v)throw Error(m);};
 try{
  const G=ARPIA;for(let i=0;!G.ready&&i<100;i++)await new Promise(r=>setTimeout(r,100));G.newGame();const s=G.state;
  Object.assign(s,{level:60,maxHp:1000,hp:1000,maxMp:400,mp:400,spell:true,spellLevel:3,mineGateOpen:true,starGateOpen:true});
  const drain=()=>{for(let i=0;G.dialog&&i<120;i++)G.next();ok(!G.dialog,'dialog stalled');};
  for(const[start,end]of [[42,62],[112,133]]){
   s.stage=start;
   while(s.stage<end){const at=s.stage,q=ARPIA_EXTRA.quests[at-42],gold=s.gold;G.close();G.travel(q[2]);const id=q[3]==='teacher'?['aron','scoll','esta'].find(id=>G.scene.entities.some(e=>e.id===id)):q[3];
    const targets=G.scene.entities.filter(e=>e.id===id);ok(targets.length===1,'target '+at+' '+id+' '+targets.length);
    if(G.scene.tilemap||G.scene.walkmask)ok(ARPIA_TILEMAP.plan(G.scene,{x:s.x,y:s.y},targets[0])?.length,'route '+at);
    G.interact(id);drain();
    if(at===52){document.querySelectorAll('#puzzle-choices button')[0].click();document.querySelectorAll('#puzzle-choices button')[1].click();drain();}
    if(at===58||at===125){document.querySelectorAll('#puzzle-choices button')[0].click();drain();}
    if(G.battle){for(let i=0;G.battle&&i<80;i++){G.battle.enemies.forEach(e=>e.hp=Math.min(e.hp,1));G.battle.ready=true;G.battle.lock=0;G.action('attack');}ok(!G.battle,'battle');G.close();}
    ok(s.stage===at+1,'advance '+at+' -> '+s.stage);if(at===57)ok(s.gold===gold+100,'100 pins');
    if(at===126)ok(!s.pledgeAsuria,'king wrote pledge');if(at===127)ok(s.pledgeAsuria,'Cardia pledge');
    logs.push('PASS '+at+' '+q[2]+'/'+id);
   }
  }
  out.textContent=logs.join('\n')+'\nALL PASS: episodes 4 and 9, paths, spell puzzle, 100 pins, letter assembly, pledges, reply.';
 }catch(e){out.textContent=logs.join('\n')+'\nFAIL '+e.stack;}
};
