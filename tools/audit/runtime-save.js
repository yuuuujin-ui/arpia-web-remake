/* Runs only when serve-audit.cjs has replaced native storage with a temporary Map. */
document.getElementById('test-run').onclick=async()=>{
 const out=document.getElementById('test-output'),logs=[],ok=(v,m)=>{if(!v)throw Error(m);};
 try{
  ok(!(window.localStorage instanceof Storage),'Native storage detected: refusing all save writes');
  const G=ARPIA;for(let i=0;!G.ready&&i<100;i++)await new Promise(r=>setTimeout(r,50));
  const load=data=>{localStorage.setItem('arpia-slot-3',JSON.stringify(data));G.openSlots();document.getElementById('slot-3').click();ok(G.modal!=='slots','save refused');return G.state;};
  for(let hero=0;hero<6;hero++)for(const level of [35,60,100]){
   G.newGame(hero);const s=G.state;Object.assign(s,{level,xpTotal:30*level*(level-1),maxHp:[100,82,94][hero%3]+12*(level-1),maxMp:[24,36,29][hero%3]+5*(level-1),stage:974});s.hp=s.maxHp-31;s.mp=s.maxMp-17;
   const before=JSON.parse(JSON.stringify(s)),after=load(before);
   for(const k of ['stage','level','xpTotal','maxHp','maxMp','hp','mp'])ok(after[k]===before[k],'hero '+hero+' lv '+level+' '+k+' '+before[k]+' -> '+after[k]);
  }
  logs.push('PASS 18 high-level saves preserve HP/MP and experience');
  G.newGame();G.state.portraitDifferences16.push('staff');G.state.openedLetterChests11.push(2);G.newGame();ok(!G.state.portraitDifferences16.length&&!G.state.openedLetterChests11.length,'new character inherited puzzle progress');
  const flags=['lastSwordRecovered15','combatCaptureStored','secretCoalReceived21','cipherOpened24','flowerRoute25','archivePortrait25'];const arrays={portraitDifferences16:['staff'],portraitDifferences25:['hand','shoulder'],portraitDifferences33:['staff','hand'],openedLetterChests11:[0,6],palaceTrapChests8:[1],schoolChests12:[2,5]};
  const puzzle=JSON.parse(JSON.stringify(G.state));for(const flag of flags)puzzle[flag]=true;Object.assign(puzzle,arrays);const restored=load(puzzle);for(const flag of flags)ok(restored[flag]===true,'lost story flag '+flag);for(const [field,values]of Object.entries(arrays))ok(JSON.stringify(restored[field])===JSON.stringify(values),'lost puzzle progress '+field);
  const filtered=load({...puzzle,portraitDifferences16:['staff','staff','face',null,99],openedLetterChests11:[0,0,99,-1,'1']});ok(JSON.stringify(filtered.portraitDifferences16)==='["staff"]'&&JSON.stringify(filtered.openedLetterChests11)==='[0]','invalid puzzle entries accepted');
  logs.push('PASS new characters isolated; six story flags and six puzzle arrays restored; invalid or duplicate entries filtered');
  for(const c of ARPIA_MIDTERM.chapters){
   G.newGame();const s=G.state;Object.assign(s,{stage:c.start,storyRevision:3,festivalPoisoned36:true,fm_flame_hunt:1,errand_flame_hunt:1,fc_flame_hunt:7,errandVersion:4,fm_exam_mage:9,fd_exam_mage:1});ARPIA_SYS.inv.add(s,'mailRoughDiamond');
   const after=load(JSON.parse(JSON.stringify(s)));ok(after.stage===c.start,'chapter '+c.number+' stage moved');ok(after.festivalPoisoned36&&after.fc_flame_hunt===7&&after.errand_flame_hunt===1,'flags lost');ok(after.inv.mailRoughDiamond===1&&after.fm_exam_mage===9&&after.fd_exam_mage===1,'item or completed mission lost');
  }
  logs.push('PASS chapter saves preserve stages, transformation, hunt progress, held item and completed mission');
  for(const [revision,stage,number,key]of [[0,746,33,'mina'],[0,768,34,'show'],[0,791,35,'mina'],[1,769,34,'show'],[1,822,35,null]]){
   G.newGame();const s=JSON.parse(JSON.stringify(G.state));Object.assign(s,{stage,storyRevision:revision});const c=ARPIA_MIDTERM.chapters.find(c=>c.number===number),after=load(s);ok(after.stage===(key?c.keys[key]:c.end),'legacy stage '+revision+'/'+stage);const once=after.stage;ok(load(JSON.parse(JSON.stringify(after))).stage===once,'migration repeated');
  }
  logs.push('PASS previous numeric stages migrate once through chapter keys');
  out.textContent=logs.join('\n')+'\nALL PASS';
 }catch(e){out.textContent=logs.join('\n')+'\nFAIL '+e.stack;}
};
