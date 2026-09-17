/* Denser navigation only where roaming encounters need room to pass. */
window.refineArpiaNavigation=sc=>{
 const connectGrid=(xs,ys)=>{const nodes=[],edges=[],cols=xs.length;for(const y of ys)for(const x of xs)nodes.push([x,y]);for(let row=0;row<ys.length;row++)for(let col=0;col<cols;col++){const i=row*cols+col;if(col+1<cols)edges.push([i,i+1]);if(row+1<ys.length)edges.push([i,i+cols]);}return{nodes,edges};};
 if(sc.id==='forest'){const graph=connectGrid([110,190,270,350,430,510,590,670,750,830,910],[425,470,515,560,605]);Object.assign(sc,graph,{navRadius:24});}
 if(['tunnel','underpass','woodhall'].includes(sc.id)){
  const middle=[[190,275],[300,292],[410,287],[500,335],[610,372],[740,386],[905,375],[1055,356],[1200,330],[1280,325]],nodes=[],edges=[],count=middle.length;
  for(const offset of [-24,22])for(const [x,y] of middle)nodes.push([x,y+offset]);
  for(let lane=0;lane<2;lane++)for(let i=0;i<count;i++){const n=lane*count+i;if(i+1<count)edges.push([n,n+1]);}
  for(let i=0;i<count;i++)edges.push([i,count+i]);
  const centerStart=nodes.length;for(const p of middle)nodes.push(p);
  for(let i=0;i<count;i++){if(i+1<count)edges.push([centerStart+i,centerStart+i+1]);edges.push([centerStart+i,i],[centerStart+i,count+i]);}
  Object.assign(sc,{nodes,edges,navRadius:23});
 }
 return sc;
};
