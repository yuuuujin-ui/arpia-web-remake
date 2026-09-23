document.getElementById('test-run').onclick=async()=>{
 const out=document.getElementById('test-output'),logs=[],ok=(v,m)=>{if(!v)throw Error(m);};
 try{ok(!(localStorage instanceof Storage),'Refusing native storage');const G=ARPIA;for(let i=0;!G.ready&&i<100;i++)await new Promise(r=>setTimeout(r,50));
 for(const id of ['exam_novice','exam_skilled','royal_arena','zombie_sisters']){
  G.newGame();const s=G.state,d=ARPIA_FREE.defs.find(d=>d.id===id);Object.assign(s,{stage:974,level:60,rank:d.rank?d.rank-1:0,['fm_'+id]:2});G.travel(d.scene);G.interact(d.giver);
  ok((s['fd_'+id]||0)===1,'reward not granted '+id);const disk=JSON.parse(localStorage.getItem('arpia-slot-'+G.slot));
  for(const key of ['rank','gold','sp'])ok(disk[key]===s[key],id+' unsaved '+key+' '+s[key]+' -> '+disk[key]);
  if(d.gift&&typeof d.gift==='object')for(const [key,n]of Object.entries(d.gift))ok(disk.inv[key]===s.inv[key]&&s.inv[key]>=n,id+' unsaved item '+key);
  for(let i=0;G.dialog&&i<30;i++)G.next();logs.push('PASS '+id+' rewards immediately persisted');
 }
 out.textContent=logs.join('\n')+'\nALL PASS';
 }catch(e){out.textContent=logs.join('\n')+'\nFAIL '+e.stack;}
};
