/* Runtime sprite decoding: generated chroma-key atlases retain source files intact. */
window.ARPIA_PORTRAITS={};
window.ARPIA_ART_READY=Promise.all(Object.entries(window.ARPIA_DIALOGUE_DATA).map(async([key,src])=>{
 const im=new Image();im.src=src;await im.decode();const ids=key==='matilda'?['matilda']:key==='npcs'?['george','edward','antonio']:['penguin','snake12'];
 ids.forEach((id,k)=>{const bounds=key==='npcs'?[[0,495],[495,1080],[1080,1536]]:ids.map((_,i)=>[i*im.width/ids.length,(i+1)*im.width/ids.length]),start=bounds[k][0],w=bounds[k][1]-start,h=im.height,c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(im,start,0,w,h,0,0,w,h);const p=ctx.getImageData(0,0,w,h);let x0=w,y0=h,x1=0,y1=0;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=(y*w+x)*4,r=p.data[i],g=p.data[i+1],b=p.data[i+2];if(r>140&&b>110&&g<Math.min(r,b)*.58){p.data[i+3]=0;continue;}if(p.data[i+3]>10){x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y);}}
 ctx.putImageData(p,0,0);const out=document.createElement('canvas');out.width=x1-x0+1;out.height=y1-y0+1;out.getContext('2d').drawImage(c,x0,y0,out.width,out.height,0,0,out.width,out.height);ARPIA_PORTRAITS[id]=out.toDataURL();});
}));

