/* Episode 8: the forgotten palace. Plot outline sourced; dialogue and puzzles rebuilt. */
(()=>{
 const x=window.ARPIA_EXTRA,decorate=x.decorate,interact=x.interact,items=x.questItems;
 Object.assign(x.defaults,{palaceHint1:false,palaceHint2:false,starGateOpen:false,wormDefeated:false});
 Object.assign(x.npcs,{hint1:{name:'첫 번째 힌트 쪽지'},hint2:{name:'두 번째 힌트 쪽지'},stargate:{name:'별모양 돌문'},rainbowworm:{name:'레인보우 웜',portraitPath:'assets/rainbow-worm.webp',height:112},skeleton:{name:'해골 병사'}});
 Object.assign(x.encounters,{rainbowworm:{name:'잊힌 궁전 · 레인보우 웜',bg:'assets/forgotten-palace.webp',intro:'약물에 오염된 레인보우 웜이 길을 막았습니다. 긴 싸움에 대비하세요.',next:110,xp:140,gold:110,sp:40,enemies:[{name:'레인보우 웜',element:2,hp:420,maxHp:420,atk:18,atb:8,sprite:'rainbowWorm'}]}});
 x.quests.splice(60,1,
 ['제8화 · 난쟁이의 잊힌 궁전','학교 앞 스콜의 급한 부름 듣기','campus','scoll'],
 ['다시 모인 탐사대','난쟁이 광산 안쪽에서 쟈칼 만나기','minedepths','jackal'],
 ['어제 만난 기욤','광산 갱도의 기욤에게 궁전 길 다시 묻기','minedepths','guillaume'],
 ['마름모 미로의 첫 쪽지','잊힌 궁전에서 첫 번째 힌트 찾기','dwarfpalace','hint1'],
 ['미로 반대편의 쪽지','잊힌 궁전에서 두 번째 힌트 찾기','dwarfpalace','hint2'],
 ['별문 첫 번째 수수께끼','별모양 돌문에 첫 힌트 사용하기','dwarfpalace','stargate'],
 ['별문 두 번째 수수께끼','별모양 돌문에 두 번째 힌트 사용하기','dwarfpalace','stargate'],
 ['단지의 방','별문 너머에서 레인보우 웜과 맞서기','palacechamber','rainbowworm'],
 ['해골 병사의 증언','단지 옆 해골 병사에게 사건의 원인 묻기','palacechamber','skeleton'],
 ['광산 사건 보고','학교 2층 줄리아에게 조사 결과 보고하기','classroom','julia'],
 ['제8화 완료 · 잊힌 궁전의 비밀','오염된 철의 원인을 밝혔습니다. 아르피아의 다음 사건이 기다립니다','campus','none']);
 x.chapters.push([102,112,'제8화 난쟁이의 잊힌 궁전']);
 x.map.push(['dwarfpalace','잊힌 난쟁이 궁전',[125,520]],['palacechamber','궁전 단지의 방',[125,520]]);
 const palace=(id,s,n,p,chamber=false)=>({id,name:chamber?'잊힌 궁전 · 단지의 방':'난쟁이의 잊힌 궁전 · 마름모 미로',bg:'assets/forgotten-palace.webp',w:800,h:600,zoom:1.12,tint:chamber?'#240b3028':null,nodes:[[125,520],[225,485],[330,455],[435,470],[555,470],[665,430],[690,325],[635,255],[530,235],[425,270],[315,255],[210,300],[155,385],[315,370],[470,365],[570,325]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,0],[2,13],[13,14],[14,15],[15,7],[13,10],[14,9]],entities:chamber?[p('back','마름모 미로',125,520,'dwarfpalace',[635,255]),n('rainbowworm',530,235),{...n('skeleton',665,430),type:'fixture'}]:[p('back','광산 갱도',125,520,'minedepths',[650,270]),{...n('hint1',315,255),type:'fixture'},{...n('hint2',555,470),type:'fixture'},{...n('stargate',635,255),type:'fixture'},...(s.starGateOpen?[p('chamber','별문 너머',635,255,'palacechamber',[125,520])]:[])]});
 x.scenes.dwarfpalace=(s,n,p)=>palace('dwarfpalace',s,n,p,false);x.scenes.palacechamber=(s,n,p)=>palace('palacechamber',s,n,p,true);
 x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);if(sc.id==='minedepths'&&s.stage>=103){sc.entities.push(n('jackal',480,320));sc.entities.push({...p('dwarfpalace','잊힌 궁전',700,340,'dwarfpalace',[125,520]),minStage:104});}};
 x.questItems=s=>[...items(s),...(s.palaceHint1?[['미로 쪽지 1','-__-']]:[]),...(s.palaceHint2?[['미로 쪽지 2','AGBL']]:[]),...(s.wormDefeated?[['오염된 약물 조각','레인보우 웜과 철광석에서 같은 보랏빛 반응이 남아 있습니다']]:[])];
 const ev={
 102:['campus','scoll',[['scoll','{name}, 너무 늦은 건 아니겠지? 쟈칼이 기다리다 화가 났을까 걱정이군.'],['you','어제 알아낸 궁전 길을 확인하러 가는 거죠?'],['scoll','그래. 열쇠도 챙겼으니 광산에서 합류하세.']]],
 103:['minedepths','jackal',[['jackal','왔군. 기욤이라는 광부가 알려 준 길부터 확인하지.'],['scoll','이번에는 저를 물지 않으실 거죠?'],['jackal','자네가 조용히 따라온다면 생각해 보지.'],['you','기욤에게 어제의 약속을 확인해요.']]],
 104:['minedepths','guillaume',[['guillaume','누구시더라? 길을 알고 싶으면 금덩이 세 개를…'],['jackal','어제 이미 받지 않았나. 또 거래를 하겠다는 건가?'],['guillaume','아, 기억났습니다! 농담이었죠. 북쪽 길 끝의 계단으로 가시면 잊힌 궁전입니다.'],['scoll','이번에는 길을 잊지 말게.']]],
  110:['palacechamber','skeleton',[['skeleton','전투가… 끝났군. 누군가 지렁이에게 약물을 주입해 광석을 오염시켰다.'],['you','그래서 왕국에 간 철만 보랏빛 마력에 약해진 거군요.'],['naomi','이 약물 조각을 가져가면 광산과 왕국 모두에게 설명할 수 있겠어.'],['skeleton','범인은 더 깊은 어둠으로 사라졌다. 다음에는 조심해라.']]],
 111:['classroom','julia',[['you','레인보우 웜에 주입된 약물이 광석까지 오염시키고 있었어요. 증거도 가져왔어요.'],['julia','광산과 아수리아에 즉시 알리마. 두 곳의 오해도 풀 수 있겠구나.'],['naomi','궁전 안의 누군가가 고의로 한 일일 가능성은 남아 있습니다.'],['julia','잘했다. 오늘은 쉬고, 다음 단서를 기다리자.']]]
 };
 x.interact=(e,a)=>{const s=a.state,q=s.stage;
  if(q===105&&s.scene==='dwarfpalace'&&e.id==='hint1'){s.palaceHint1=true;a.advance(106,10);a.refresh();a.talk([['narrator','낡은 쪽지에는 네 자리 모양 “-__-”가 적혀 있다.']]);a.save();return true;}
  if(q===106&&s.scene==='dwarfpalace'&&e.id==='hint2'){s.palaceHint2=true;a.advance(107,10);a.refresh();a.talk([['narrator','두 번째 쪽지에는 글자 “AGBL”이 적혀 있다.']]);a.save();return true;}
  if(q===107&&e.id==='stargate'){a.choicePuzzle(['별문의 첫 수수께끼','“-__-”에서 양끝을 지키는 표시는?',['밑줄','짧은 선','별'],1,'쪽지의 양끝은 짧은 선이야.'],()=>{a.advance(108,10);a.refresh();a.save();});return true;}
  if(q===108&&e.id==='stargate'){a.choicePuzzle(['별문의 두 번째 수수께끼','두 번째 쪽지의 글자 순서를 그대로 고르세요.',['ABGL','AGBL','LABG'],1,'쪽지에는 A, G, B, L 순서로 적혀 있어.'],()=>{s.starGateOpen=true;a.advance(109,15);a.refresh();a.talk([['narrator','별의 여덟 갈래가 빛나며 문이 열린다. 안쪽에서 거대한 몸이 꿈틀거린다.']]);a.save();});return true;}
  if(q===109&&s.scene==='palacechamber'&&e.id==='rainbowworm'){a.battle('rainbowworm');return true;}
  const row=ev[q];if(row&&s.scene===row[0]&&e.id===row[1]){a.talk(row[2],()=>{if(q===110)s.wormDefeated=true;a.advance(q+1,q===111?35:10);a.refresh();if(q===111)a.finish('제8화 완료 · 잊힌 궁전의 비밀','레인보우 웜과 오염된 광석의 관계를 밝혀 두 왕국의 갈등을 풀 실마리를 찾았습니다.');a.save();});return true;}
  return interact(e,a);
 };
})();
