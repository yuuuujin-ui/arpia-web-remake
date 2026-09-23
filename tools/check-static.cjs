/* Check the shipped entrypoint and literal asset paths without executing browser code. */
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]);
const errors=[],assets=new Set();
for(const file of scripts){
 const absolute=path.join(root,file);
 if(!fs.existsSync(absolute)){errors.push('Missing script '+file);continue;}
 const result=spawnSync(process.execPath,['--check',absolute],{encoding:'utf8',windowsHide:true});
 if(result.status!==0)errors.push(file+': '+result.stderr);
 // New audit modules use complete literal paths. Other scripts compose atlas paths dynamically.
 if(!/^(capture-|restoration|chapter(?:3[6-9]|40))/.test(file))continue;
 const text=fs.readFileSync(absolute,'utf8');
 for(const m of text.matchAll(/['"](assets\/[^'"\n]+\.(?:png|gif|svg|jpg|webp))['"]/g))assets.add(m[1]);
}
for(const asset of assets)if(!fs.existsSync(path.join(root,asset)))errors.push('Missing asset '+asset);
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
else console.log(`PASS: ${scripts.length} script syntax checks and ${assets.size} literal audit asset paths.`);
