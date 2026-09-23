/* Boundary checks against the actual free-mission module, without browser saves. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const x={defaults:{},npcs:{},encounters:{},decorate(){},questItems(){return[];}};
const context={ARPIA_EXTRA:x};context.window=context;vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname,'..','free-missions.js'),'utf8'),context);
const F=context.ARPIA_FREE,d=F.defs.find(d=>d.id==='pet_contest1');
const scene=(stage,level=10,phase=0)=>{
 const state={...x.defaults,stage,level,scene:d.scene,fm_pet_contest1:phase};
 const sc={id:d.scene,entities:[]};x.decorate(sc,state,(id,x,y)=>({id,x,y}),()=>{});return{state,sc};
};
assert.equal(scene(d.minStage-1).sc.entities.some(e=>e.id===d.giver),false);
for(const stage of [d.minStage,125,126]){
 const {state,sc}=scene(stage);assert.equal(sc.entities.filter(e=>e.id===d.giver).length,1,'missing or duplicate receptionist at '+stage);
 assert.equal(F.objective(state,{id:d.giver}),true,'eligible contest not offered');
}
assert.equal(F.objective(scene(d.minStage,9).state,{id:d.giver}),false,'level requirement bypassed');
assert.equal(scene(d.minStage,10,1).sc.entities.some(e=>e.id===d.target),true,'accepted contest entrance missing');
console.log('PASS: receptionist unlock, level gate, active entrance, and no duplicate at old unlock boundary.');
