/* Episode 6: original plot outline, new dialogue and routes. See RESEARCH.md. */
(()=>{
 const x=window.ARPIA_EXTRA,decorate=x.decorate,interact=x.interact,items=x.questItems;
 Object.assign(x.defaults,{secretKey:false,morrisPostcard:false,jackalJoined:false,koboldCharcoal:false});
 Object.assign(x.npcs,{garuda:{name:'가루다',anim:'npc_027_도트_가루다',height:90},dobiel:{name:'도비엘',anim:'npc_026_도트_도비엘',height:60},jackal:{name:'쟈칼',anim:'npc_025_도트_쟈칼',height:76},secretchest:{name:'오래된 궤짝'},charcoal:{name:'코볼트의 숯 바구니'}});
 x.quests.splice(39,1,
 ['제6화 · 비밀의 열쇠','학교 2층 줄리아에게 두 검의 조사 보고하기','classroom','julia'],
 ['교장 선생님의 판단','4층 모리스 교장 선생님 만나기','principal','morris'],
 ['지하의 오래된 궤짝','로비 지하 창고 → 비밀 통로 동쪽의 궤짝 조사하기','tunnel','secretchest'],
 ['작은 비밀 열쇠','학교 2층 나오미에게 열쇠 보여 주기','classroom','naomi'],
 ['오래된 친구에게','4층 모리스에게 엽서 받기','principal','morris'],
 ['독수리 마을로','학교 북동쪽 독수리 마을 길 → 시바 만나기','eaglevillage','shiva'],
 ['가루다의 기억','마을 꼭대기 가루다에게 모리스의 엽서 전달하기','eaglevillage','garuda'],
 ['쟈칼의 폭포','마을 동쪽 시바의 비행길 → 폭포의 도비엘 만나기','waterfall','dobiel'],
 ['잠든 동물의 제왕','폭포 안쪽 쟈칼에게 모리스의 이름 전하기','waterfall','jackal'],
 ['광산에서 다시 만나다','난쟁이 광산의 스콜 만나기','mine','scoll'],
 ['닫힌 광산의 입구','광산 발디에게 들어갈 방법 묻기','mine','baldi'],
 ['코볼트와의 인연','학교 보일러실 지하 코볼트에게 숯 부탁하기','koboldroom','kobold'],
 ['탐사를 위한 준비','장작 보관 복도에서 숯 바구니 챙기기','woodhall','charcoal'],
 ['제6화 완료 · 광산으로 갈 준비','열쇠와 숯을 준비했습니다. 다음 이야기는 광산 깊은 곳으로 이어집니다','mine','none']);
 x.chapters.push([81,94,'제6화 비밀의 열쇠']);
 x.map.push(['eaglevillage','독수리 마을',[110,382]],['waterfall','쟈칼의 폭포',[170,475]]);
 x.scenes.eaglevillage=(s,n,p)=>({id:'eaglevillage',name:'독수리 마을 · 하늘과 가까운 둥지',bg:'assets/maps-hires/eagle-village.png',w:560,h:431,zoom:1.55,nodes:[[110,382],[165,349],[236,312],[262,269],[219,233],[310,243],[363,234],[395,188],[351,150],[296,140],[451,180]],edges:[[0,1],[1,2],[2,3],[3,4],[3,5],[5,6],[6,7],[7,8],[8,9],[7,10]],entities:[p('back','학교로 내려가기',110,382,'campus',[855,270]),n('shiva',219,233),n('garuda',296,140),{...p('waterfall','시바를 타고 폭포로',451,180,'waterfall',[170,475]),minStage:88}]});
 x.scenes.waterfall=(s,n,p)=>({id:'waterfall',name:'쟈칼의 폭포 · 오래된 약속',bg:'assets/jackal-waterfall.png',w:800,h:600,zoom:1.2,nodes:[[170,475],[218,407],[305,374],[379,337],[438,273],[496,209],[488,149],[571,217]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[5,7]],entities:[p('back','독수리 마을',170,475,'eaglevillage',[451,180]),n('dobiel',305,374),n('jackal',488,149),n('naomi',438,273)]});
 x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);
  if(sc.id==='campus')sc.entities.push({...p('eaglevillage','독수리 마을',855,270,'eaglevillage',[110,382]),minStage:86});
  if(sc.id==='tunnel'&&s.stage>=83)sc.entities.push({...n('secretchest',1090,353),type:'fixture'});
  if(sc.id==='woodhall'&&s.stage>=93)sc.entities.push({...n('charcoal',1130,359),type:'fixture'});
  if(sc.id==='mine'&&s.jackalJoined)sc.entities.push(n('jackal',577,407));
  if(sc.id==='koboldroom'&&s.jackalJoined)sc.entities.push(n('jackal',338,337));
 };
 x.questItems=s=>[...items(s),...(s.secretKey?[['비밀 열쇠','모리스가 맡긴 오래된 열쇠. 광산의 비밀과 관련이 있습니다']]:[]),...(s.morrisPostcard?[['모리스의 엽서','오래된 친구에게 도움을 청하는 글']]:[]),...(s.koboldCharcoal?[['코볼트의 숯','발디에게 광산 탐사 협조를 구하기 위한 물품']]:[])];
 const ev={
 81:['classroom','julia',[['you','광산의 검은 멀쩡했지만 왕국의 검에는 이상한 마력이 남아 있었어요. 두 기록을 가져왔어요.'],['julia','그렇다면 단순한 품질 문제로 끝나지 않겠구나. 교장 선생님께 직접 보고해 주겠니?']]],
 82:['principal','morris',[['morris','잘 조사했구나. 오래전 광산과 관련된 물건을 하나 보관해 두었지.'],['you','그 물건이 이번 일의 단서인가요?'],['morris','학교 지하 통로의 오른쪽 궤짝을 열어 보렴. 작은 열쇠를 찾으면 나오미에게 보여 주거라.']]],
 84:['classroom','naomi',[['you','이렇게 작은 열쇠가 깊은 지하에 있었어요.'],['naomi','오래된 봉인의 열쇠 같구나. 스콜 선생님과 의논하려 했는데 또 아수리아로 갔다네.'],['you','그럼 교장 선생님께 돌아가 다음 일을 여쭤볼게요.']]],
 85:['principal','morris',[['morris','이번에는 오래된 친구들에게 도움을 청해야겠구나. 이 엽서를 독수리 마을의 가루다에게 전해 주렴.'],['you','시바가 있는 마을이죠?'],['morris','그래. 학교 북동쪽 길로 갈 수 있단다. 나오미도 함께 갈 거야.']]],
 86:['eaglevillage','shiva',[['shiva','다시 만났구나! 전에 우리 아이를 도와준 일을 잊지 않았단다.'],['you','오늘은 가루다 님께 모리스 교장 선생님의 엽서를 전하러 왔어요.'],['shiva','가장 높은 둥지로 가 보렴. 다음 여행도 내가 도와주마.']]],
 87:['eaglevillage','garuda',[['garuda','모리스의 글씨로군. 광산의 철에 낯선 마력이 남아 있다니…'],['naomi','예전에도 비슷한 일이 있었습니까?'],['garuda','쟈칼이라면 오래된 광산의 일을 기억할 게다. 시바를 타고 동쪽 폭포로 가 보게.']]],
 88:['waterfall','dobiel',[['dobiel','쉿! 쟈칼 님이 안에서 주무시고 계셔.'],['you','급한 일이 있어요. 모리스 교장 선생님과 가루다 님이 보내셨어요.'],['dobiel','그 두 분의 부탁이라면 다르지. 안쪽 바위로 가되 큰 소리부터 지르지는 마.']]],
 89:['waterfall','jackal',[['jackal','내 잠을 깨운 자가 누구냐?'],['you','아르피아에서 왔어요. 모리스 교장 선생님의 부탁으로 광산을 조사하고 있어요.'],['jackal','모리스라고? 허허, 오래된 친구의 이름을 듣는군.'],['naomi','철이 변한 원인을 찾으려면 광산 안을 살펴봐야 합니다.'],['jackal','그렇다면 나도 함께하지. 광산에서 만나자.']]],
 90:['mine','scoll',[['scoll','돌아왔군! 그런데 옆의 큰 동물은 새 펫인가?'],['jackal','누구를 펫이라고 부르는가?'],['scoll','쟈, 쟈칼 님! 제가 몰라뵈었습니다.'],['you','함께 광산의 일을 조사해 주시기로 했어요. 우선 발디 님께 들어갈 수 있는지 여쭤봐요.']]],
 91:['mine','baldi',[['baldi','밖에서 검사하는 것과 광산 안으로 들어가는 건 다르네. 작업을 함부로 멈출 수는 없어.'],['scoll','코볼트의 좋은 숯을 가져오면 어떻겠나? 제련 작업에도 도움이 될 텐데.'],['baldi','그 숯이라면 이야기가 다르지. 가져오면 길을 안내해 주겠네.'],['you','코볼트 님이라면 저희가 알아요! 학교 지하로 다녀올게요.']]],
 92:['koboldroom','kobold',[['kobold','은인들이 다시 왔구려! 그런데 저 호랑이는…'],['jackal','걱정 말게. 숯이 필요해 찾아왔네.'],['you','광산을 조사할 수 있게 도와주세요. 필요한 만큼만 가져갈게요.'],['kobold','옆 장작 복도에 식혀 둔 숯이 있소. 바구니를 가져가시오. 지난번 받은 도움에 비하면 작은 일이오.']]]
 };
 x.interact=(e,a)=>{const s=a.state,q=s.stage;
  if(q===83&&s.scene==='tunnel'&&e.id==='secretchest'){a.choicePuzzle(['오래된 궤짝','교장 선생님이 찾으라고 한 것은?',['반짝이는 금화','작은 열쇠','새 마법 지팡이'],1,'광산과 관련된 작은 열쇠를 찾고 있어.'],()=>{s.secretKey=true;a.advance(84,15);a.refresh();a.talk([['narrator','천에 싸인 작은 열쇠를 꺼냈다. 잃어버리지 않도록 가방 안쪽에 넣었다.']]);a.save();});return true;}
  if(q===93&&s.scene==='woodhall'&&e.id==='charcoal'){a.choicePuzzle(['코볼트의 숯','가져갈 숯을 살펴봅니다. 어느 것을 챙길까요?',['아직 붉게 타는 숯','젖은 장작','완전히 식은 마른 숯'],2,'안전하게 식혀 둔 숯 바구니를 찾아보자.'],()=>{s.koboldCharcoal=true;a.advance(94,30);a.refresh();a.talk([['you','열쇠도 있고 숯도 준비됐어. 이제 발디 님과 약속한 거래를 할 수 있겠어.'],['jackal','잘했네. 다음에는 광산 깊은 곳으로 들어가 보세.']],()=>a.finish('제6화 완료 · 비밀의 열쇠','오래된 친구들의 도움을 얻고 광산 탐사를 준비했습니다. 열쇠와 숯은 가방에 보관됩니다.'));a.save();});return true;}
  const row=ev[q];if(row&&s.scene===row[0]&&e.id===row[1]){a.talk(row[2],()=>{if(q===85)s.morrisPostcard=true;if(q===89)s.jackalJoined=true;a.advance(q+1,10);a.refresh();a.save();});return true;}
  if(q>=81&&['garuda','dobiel','jackal','secretchest','charcoal'].includes(e.id)){a.talk([[['secretchest','charcoal'].includes(e.id)?'narrator':e.id,{garuda:'오래된 친구들이 힘을 모으면 길이 보일 게다.',dobiel:'폭포 안쪽에서는 발밑을 살펴.',jackal:'광산에는 아직 밝혀지지 않은 일이 남아 있지.',secretchest:s.secretKey?'열쇠를 꺼낸 궤짝이다.':'닫힌 궤짝이다.',charcoal:s.koboldCharcoal?'필요한 숯은 가방에 챙겼다.':'코볼트가 식혀 둔 숯이다.'}[e.id]]]);return true;}
  return interact(e,a);
 };
})();
