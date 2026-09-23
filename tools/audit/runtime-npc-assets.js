document.getElementById('test-run').onclick=async()=>{
 const out=document.getElementById('test-output'),refs=[];
 for(const[id,n]of Object.entries(ARPIA_EXTRA.npcs)){
  for(const key of ['artPath','portraitPath'])if(n[key])refs.push({id,key,path:n[key]});
  if(n.portrait)refs.push({id,key:'portrait',path:'assets/original/character/'+n.portrait});
  if(n.anim)refs.push({id,key:'anim',path:'assets/original/animation/'+n.anim+'/idle.gif'});
 }
 out.textContent=JSON.stringify(refs);
};
