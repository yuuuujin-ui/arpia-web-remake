/* Prepare a reviewable GitHub tree without changing the checkout or its index.
   This script neither commits nor pushes. Run build-static.cjs first. */
const fs=require('node:fs/promises'),path=require('node:path'),crypto=require('node:crypto'),os=require('node:os'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
async function main(){
 const scratch=process.argv[3]||await fs.mkdtemp(path.join(os.tmpdir(),'arpia-publish-'));
 console.log(JSON.stringify({phase:'prepare',index:path.join(scratch,'index')}));
 const index=path.join(scratch,'index'),env={...process.env,GIT_INDEX_FILE:index};
 const git=(...args)=>{const r=spawnSync('git',['-c','safe.directory='+root,'-c','core.autocrlf=false','-c','core.whitespace=blank-at-eol,blank-at-eof,space-before-tab,cr-at-eol',...args],{cwd:root,env,encoding:'utf8',windowsHide:true,maxBuffer:8*1024*1024});if(r.status!==0)throw Error(args[0]+': '+(r.error?.message||'')+' status='+r.status+' signal='+r.signal+' '+r.stderr+' '+r.stdout);return r.stdout.trim();};
 const base=git('rev-parse','--verify',(process.argv[2]||'FETCH_HEAD')+'^{commit}');
 const manifest=JSON.parse(await fs.readFile(path.join(root,'dist','build-manifest.json'),'utf8'));
 const files=Object.keys(manifest.files);
 for(const relative of files){
  if(relative.includes('..')||path.isAbsolute(relative))throw Error('Unsafe runtime path');
  const bytes=await fs.readFile(path.join(root,relative));
  if(crypto.createHash('sha256').update(bytes).digest('hex')!==manifest.files[relative].sha256)throw Error('Rebuild needed: '+relative);
 }
 files.push('README.md','PROGRESS.md','TEST-RESULTS.md','RESEARCH.md','research/DIALOGUE-VISUAL-AUDIT.md','research/capture-runtime-results.json','research/generated-joker.json','research/generated-scenes-36-40.json','research/npc-asset-audit.json','research/midterm-image-prompts.json','research/verified-art/STATUS.md','research/verified-art/furniture-prompts-20260923.json','research/verified-art/npc-and-item-prompts-20260923.json','tools/check-static.cjs','tools/build-static.cjs','tools/serve-audit.cjs','tools/prepare-github-index.cjs');
 files.push('tools/check-free-unlock.cjs');
 for(const name of await fs.readdir(path.join(root,'tools','audit')))if(/^runtime.*\.js$/.test(name))files.push('tools/audit/'+name);
 const pathspec=path.join(scratch,'paths');await fs.writeFile(pathspec,files.join('\0')+'\0');
 if(!process.argv[3])git('read-tree',base);git('add','--pathspec-from-file='+pathspec,'--pathspec-file-nul');
 const manifestHash=git('hash-object','-w','dist/build-manifest.json');git('update-index','--add','--cacheinfo','100644,'+manifestHash+',build-manifest.json');
 git('diff','--cached','--check');
 const tree=git('write-tree'),summary=git('diff','--cached','--shortstat',base);
 const result={base,tree,index,files:files.length+1,summary,createdAt:new Date().toISOString(),committed:false,pushed:false};
 await fs.writeFile(path.join(root,'research','github-publish-preparation.json'),JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify(result));
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
