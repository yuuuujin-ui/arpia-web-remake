/* Chapter 12 plot: https://wonavy.tistory.com/210. Dialogue and balance reconstructed. */
(()=>{
 const x=ARPIA_EXTRA,prior=x.interact,decorate=x.decorate,items=x.questItems;
 Object.assign(x.defaults,{familyLetter:false,firstAid:false,royalReferral:false,royalMedicine:false,exchangeGold:false,exchangePin:0,fairyMedicine:false,pomegranate:false,snakeBlood:false,antonioSample:false,antidote:false,ownPenguin:false,activePenguin:false,penguinLevel:1,penguinXp:0,penguinHp:42,penguinMaxHp:42,penguinMp:12,penguinMaxMp:12,penguinAffection:45,penguinAgility:24});
 Object.assign(x.npcs,{ishubike:{name:'이슈비케',portrait:'teacher/이슈비케.png'},pomegranate:{name:'석류 바구니'},snake12:{name:'룡룡뱀',height:90},waitmonsters:{name:'저택 앞 몬스터'},fruit12:{name:'폭포의 과일'} });
 // Each row is one playable objective. Do not use main-stage state for free missions.
 const rows=[
 ['고향에서 온 급보','campus','mina','{name}, 고향에서 속달 편지가 왔대. 콘라드 아저씨가 너를 찾고 있어.'],
 ['우체국의 속달 편지','shop','conrad','가족이 많이 아프시다는 편지란다. 늦기 전에 고향으로 가 보렴.'],
 ['달라진 할아버지','village','family','누구냐! 시끄럽게 하지 말고 저리 가거라! 머리가 너무 아프다…'],
 ['촌장님의 걱정','village','elder','늘 다정하시던 분이 갑자기 저렇게 변했단다. 학교 선생님께 도움을 청해 보렴.'],
 ['선생님께 도움을','classroom','julia','평소와 다른 행동이라니 걱정이구나. 이슈비케 선생님께 응급 약초를 부탁하렴.'],
 ['응급 약초','classroom','ishubike','이 약초를 가져가렴. 효과가 없으면 원인을 더 찾아야 하니 꼭 알려 주고.'],
 ['함께 가는 친구','campus','kesno','혼자 걱정하지 마. 나도 함께 갈게. 마틸다도 도와주겠다고 했어.'],
 ['공주의 소개장','classroom','matilda','왕국의 약이 필요하면 이 소개장을 아버지께 보여 줘. 네 가족이 빨리 나으셨으면 좋겠어.'],
 ['약초가 듣지 않는다','village','family','으으… 약을 먹어도 머릿속이 뒤집히는구나. 대체 왜 이러는 게냐!'],
 ['왕국의 도움','kingdom','caesar','마틸다의 부탁이군. 에드워드가 왕실의 약을 들고 함께 가도록 하겠네.'],
 ['에드워드의 동행','kingdom','edward','준비를 마쳤습니다. 왕실의 약을 가지고 고향으로 출발합시다.'],
 ['낫지 않는 병','village','family','이번 약도 소용없구나… 몸 안에서 무언가 날뛰는 것 같다.'],
 ['요정의 약을 찾아서','nymphen','leona','전에 기욤에게 요정의 약을 준 적이 있단다. 광산에서 그를 찾아보렴.'],
 ['기욤의 거래','minedepths','guillaume','요정의 약을 주지. 대신 이 금덩이를 카디쟈에게 가져가 5만 핀으로 바꿔 오게. 기사는 여기서 기다리고.'],
 ['금덩이 환전','cardiahome','cardia','기욤의 금덩이가 맞네요. 여기 5만 핀이에요. 약을 받는 거래에만 사용하세요.'],
 ['요정의 약','minedepths','guillaume','약속대로 5만 핀을 가져왔군. 요정의 약을 받게. 에드워드도 이제 함께 가도 좋아.'],
 ['되살아난 기억','village','family','조금 정신이 드는구나… 숲에서 뱀에게 물렸던 일이 기억난다.'],
 ['독을 아는 마법사','classroom','ishubike','뱀의 독이라면 오당카가 잘 알 거야. 지하에서 석류를 챙겨 선물로 가져가렴.'],
 ['오당카의 선물','basement','pomegranate','신선한 석류를 바구니에 담았다. 오당카에게 가져가자.'],
 ['룡룡뱀의 독','hut','odangka','이 증상은 룡룡뱀의 독이다. 해독하려면 그 뱀의 피와 안토니오의 침이 필요해. 데런 근처 유령마의 숲을 찾아봐.'],
 ['독의 주인을 찾아라','ghostforest','snake12','전투'],
 ['안토니오에게 부탁','curiousmansion','antonio','내 침이 해독약 재료라고? 당황스럽군… 그래도 사람을 살리는 일이라면 도와야지. 밖의 몬스터를 정리하는 동안 준비할게.'],
 ['저택 앞의 기다림','ghostforest','waitmonsters','전투'],
 ['두 번째 해독 재료','curiousmansion','antonio','여기, 부탁한 재료야. 병을 단단히 닫아 두었어. 서둘러 오당카에게 가 봐.'],
 ['해독약을 만들자','hut','odangka','재료가 모두 모였군. 약을 달이는 동안 도비엘이 있는 폭포에서 과일을 가져오렴.'],
 ['폭포의 과일','waterfall','dobiel','오당카에게 줄 과일이구나. 잘 익은 것들로 챙겨 줄게. 약은 곧 완성될 거야.'],
 ['완성된 해독약','hut','odangka','과일 잘 받았다. 해독약이 완성됐으니 지금 바로 가족에게 전해라.'],
 ['돌아온 다정한 목소리','village','family','{name}, 걱정을 많이 시켰구나. 이제 머리가 맑아졌어. 너와 친구들 덕분이야.'],
 ['새로운 작은 친구','village','elder','정말 잘했구나. 감사의 뜻으로 이 펭귄을 맡기마. 펫 정보에서 함께할 친구를 고를 수 있단다.']
 ];
 x.quests.splice(140,1,...rows.map(([title,sc,id])=>['제12화 · '+title,(x.npcs[id]?.name||({mina:'미나',conrad:'콘라드',family:'할아버지',elder:'촌장님',julia:'줄리아',kesno:'케스노',matilda:'마틸다',caesar:'세자르 3세',edward:'에드워드',odangka:'오당카'}[id])||title)+' 만나기',sc,id]),['제12화 완료 · 뱀에게 물린 할아버지','고향에 평온이 돌아왔습니다. 프리미션과 펫 육성을 이어가세요.','campus','none']);
 const end=182+rows.length;x.chapters.push([182,end,'제12화 뱀에게 물린 할아버지']);
 x.map.push(['ghostforest','데런 근교 유령마의 숲',[180,435]]);
 x.scenes.ghostforest=(s,n,p)=>({id:'ghostforest',name:'데런 근교 · 유령마의 숲',bg:'assets/maps-hires/forest-battle.webp',w:1000,h:658,zoom:1.1,nodes:[[180,435],[270,450],[380,440],[490,380],[600,340],[720,305],[780,220],[630,440]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[4,7],[7,2]],entities:[p('back','데런 왕국',180,435,'kingdom',[465,650]),n(s.stage===204?'waitmonsters':'snake12',720,305)]});
 x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);if(s.stage>=182){if(sc.id==='classroom')sc.entities.push(n('ishubike',725,310));if(sc.id==='campus'&&!sc.entities.some(e=>e.id==='kesno'))sc.entities.push(n('kesno',747,500));if(sc.id==='kingdom'){if(!sc.entities.some(e=>e.id==='edward'))sc.entities.push(n('edward',465,650));sc.entities.push(p('ghostforest','유령마의 숲',400,600,'ghostforest',[180,435]));}if(sc.id==='basement'&&s.stage===200)sc.entities.push({...n('pomegranate',445,285),type:'fixture'});}};
 x.encounters.snake12={name:'룡룡뱀의 독',bg:'assets/maps-hires/forest-battle.webp',intro:'해독약 재료를 구하기 위해 룡룡뱀과 맞섭니다.',next:203,xp:170,gold:95,sp:45,enemies:[{name:'룡룡뱀',element:2,hp:480,maxHp:480,atk:20,atb:10,sprite:'snake12'}]};
 x.encounters.waitmonsters={name:'저택 앞 몬스터 소탕',bg:'assets/maps-hires/curious-mansion.webp',intro:'안토니오가 재료를 준비하는 동안 주변을 정리합니다.',next:205,xp:130,gold:80,sp:35,enemies:[{name:'숲의 독뱀',element:2,hp:200,maxHp:200,atk:16,atb:10,sprite:'snake12'},{name:'움직이는 나무 인형',element:0,hp:185,maxHp:185,atk:15,atb:0,sprite:'woodDoll'}]};
 x.questItems=s=>[...items(s),...(s.familyLetter?[['고향의 속달 편지','아픈 할아버지의 소식']]:[]),...(s.exchangeGold?[['기욤의 금덩이','카디쟈에게 환전할 미션 물품']]:[]),...(s.exchangePin?[['환전 대금 50,000 핀','기욤에게 전달할 별도 보관금']]:[]),...(s.snakeBlood?[['룡룡뱀의 피','해독약의 첫 재료']]:[]),...(s.antonioSample?[['안토니오의 작은 병','해독약의 두 번째 재료']]:[]),...(s.antidote?[['룡룡뱀 해독약','할아버지에게 전할 약']]:[])];
 x.interact=(e,a)=>{const s=a.state,i=s.stage-182,r=rows[i];if(!r||r[1]!==s.scene||r[2]!==e.id)return prior(e,a);if(r[3]==='전투'){a.battle(e.id);return true;}a.talk([[e.id==='pomegranate'?'narrator':e.id,r[3]],['you',i===28?'새 친구도 소중하게 돌볼게요. 모두 도와주셔서 고맙습니다!':i===27?'다행이에요! 도와준 친구들에게도 좋은 소식을 전할게요.':'알겠어요. 끝까지 포기하지 않을게요.']],()=>{const q=s.stage;const flags={183:'familyLetter',187:'firstAid',189:'royalReferral',192:'royalMedicine',195:'exchangeGold',197:'fairyMedicine',200:'pomegranate',205:'antonioSample',208:'antidote'};if(flags[q])s[flags[q]]=true;if(q===196){s.exchangeGold=false;s.exchangePin=50000;}if(q===197)s.exchangePin=0;if(q===203)s.snakeBlood=true;if(q===206){s.snakeBlood=false;s.antonioSample=false;}if(q===209){s.antidote=false;s.familyLetter=false;}if(q===210){s.ownPenguin=true;s.sp+=50;s.hp=s.maxHp;s.mp=s.maxMp;}a.advance(q+1,10);a.refresh();a.save();if(q===210)a.finish('제12화 완료 · 뱀에게 물린 할아버지','친구들의 도움으로 해독약을 완성했습니다. 펫 정보에 펭귄이 추가되었습니다.');});return true;};
})();
