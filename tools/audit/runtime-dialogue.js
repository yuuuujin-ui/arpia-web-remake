const logs=[],errors=[];window.addEventListener('error',e=>errors.push(e.message));
document.getElementById('test-run').onclick=async()=>{
 const out=document.getElementById('test-output'),ok=(v,msg)=>{if(!v)throw Error(msg);};
 try{
  const G=ARPIA,x=ARPIA_EXTRA;for(let i=0;!G.ready&&i<100;i++)await new Promise(r=>setTimeout(r,100));ok(G.ready,'ready');
  G.newGame();const s=G.state;Object.assign(s,{level:60,stage:133,maxHp:500,hp:500,maxMp:200,mp:200,spell:true,spellLevel:3,mineGateOpen:true,starGateOpen:true,discovered:['campus','mine','minedepths'],goldFound:[],goldNuggets:0});
  const oldEther=s.ethers;
  const drain=()=>{for(let i=0;G.dialog&&i<120;i++)G.next();ok(!G.dialog,'dialog stalled');};
  const win=()=>{for(let i=0;G.battle&&i<60;i++){G.battle.enemies.forEach(e=>{if(e.hp>0)e.hp=1;});G.battle.ready=true;G.battle.lock=0;G.action('attack');}ok(!G.battle,'battle stalled');G.close();};
  while(s.stage<182){
   const at=s.stage,q=x.quests[at-42];G.close();G.travel(q[2]);ok(G.scene.id===q[2],'scene '+at+' '+G.scene.id+'/'+q[2]);
   const targets=G.scene.entities.filter(e=>e.id===q[3]);ok(targets.length===1,'target '+at+' '+q[3]+' count '+targets.length);
   if(G.scene.tilemap||G.scene.walkmask)ok(ARPIA_TILEMAP.plan(G.scene,{x:s.x,y:s.y},targets[0])?.length,'route '+at);
   G.interact(q[3]);if(at===154)document.querySelectorAll('#puzzle-choices button')[5].click();drain();
   if(G.battle){if(at===165)ok(G.battle.enemies.length===1&&G.battle.enemies[0].name==='혼령강아지','spirit dog trial');if(at===179)ok(G.battle.spec.allies.length===2,'escort allies');win();}
   ok(s.stage===at+1,'advance '+at+' -> '+s.stage);
   if(at===133)ok(s.ethers===oldEther&&ARPIA_SYS.inv.count(s,'healthGift10')===1,'health reward');
   if(at===135)ok(!s.merchantOrder&&s.whiteFurClue,'letter delivery');
   if(at===150)ok(s.goldNuggets===1,'single gold nugget');
   if(at===162)ok(s.oracle&&!s.moonDust,'oracle dust consumption');
   if(at===173)ok(s.wingDust11===3,'three fairy dust');
   if(at===174)ok(s.wingDust11===0&&s.sunBox11,'stone box exchange');
   if(at===175)ok(s.sealCord,'gold thread');
   if(at===180)ok(s.sunGemSealed&&s.silentSwordRecovered&&!s.sealCord,'seal and sword');
   logs.push('PASS stage '+at+' '+q[2]+'/'+q[3]);out.textContent=logs.join('\n');
  }
  ok(errors.length===0,errors.join('; '));out.textContent=logs.join('\n')+'\nALL PASS: 49 episode 10–11 steps, rewards, items, escort battles and target routes.';
 }catch(e){out.textContent=logs.join('\n')+'\nFAIL '+e.stack;}
};
