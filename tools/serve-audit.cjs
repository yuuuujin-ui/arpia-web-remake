/* Local, read-only content test server. Test pages keep saves in memory only. */
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const project=path.resolve(__dirname,'..'),root=process.argv.includes('--dist')?path.join(project,'dist'):project;
const port=Number(process.env.ARPIA_AUDIT_PORT||8801);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.gif':'image/gif','.jpg':'image/jpeg','.json':'application/json','.wav':'audio/wav'};
http.createServer((req,res)=>{
 const cases=fs.readdirSync(path.join(__dirname,'audit')).filter(n=>/^runtime.*\.js$/.test(n));
 let url;try{url=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end();return;}
 if(url==='/__audit__/'){
  res.setHeader('Content-Type',mime['.html']);res.end('<!doctype html><meta charset="utf-8"><h1>Arpia content audit</h1><p>These pages use temporary saves and accelerated combat. Normal game saves are untouched.</p>'+cases.map(n=>`<p><a href="/__audit__/${n.replace('.js','.html')}">${n}</a></p>`).join(''));return;
 }
 if(url.startsWith('/__audit__/')){
  const name=path.basename(url).replace(/\.html$/,'.js');if(!cases.includes(name)){res.writeHead(404).end();return;}
  if(url.endsWith('.js')){res.setHeader('Content-Type',mime['.js']);res.end(fs.readFileSync(path.join(__dirname,'audit',name)));return;}
  const isolation='<script>const memory=new Map();Object.defineProperty(window,"localStorage",{value:{getItem:k=>memory.get(k)??null,setItem:(k,v)=>memory.set(k,String(v)),removeItem:k=>memory.delete(k),clear:()=>memory.clear()}});</script>';
  let html=fs.readFileSync(path.join(root,'index.html'),'utf8').replace('<head>','<head><base href="/">'+isolation).replace('<body>','<body><button id="test-run">Run audit</button><pre id="test-output"></pre>').replace('</body>',`<script src="/__audit__/${name}"></script></body>`);
  res.setHeader('Content-Type',mime['.html']);res.end(html);return;
 }
 let file=path.resolve(root,'.'+url);if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
 fs.readFile(file,(error,data)=>{if(error){res.writeHead(404).end();return;}res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(data);});
}).listen(port,'127.0.0.1',()=>console.log(`Audit server: http://127.0.0.1:${port}/__audit__/ (${root})`));
