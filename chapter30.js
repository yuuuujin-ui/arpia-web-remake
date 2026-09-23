/* Original event order: https://wonavy.tistory.com/226 (episode 30).
   The temporary dog form uses the preserved original Arpia dog motion assets. */
(()=>{
 const x=ARPIA_EXTRA,m=ARPIA_MIDTERM,icon='assets/items/';
 const item=(id,name,desc,path)=>ARPIA_DATA.ITEMS['mt_'+id]={name,desc,kind:'quest',price:0,sell:0,icon:path};
 item('letter30','큐리어스의 편지','우유 피부 물약의 실험 대상이 되어 달라는 편지','assets/midterm/diary25.png');
 item('seaweed30','수중초','큐리어스가 찾는 수중 던전의 희귀 약초',icon+'herb.png');
 item('ruby30','루비 원석','쥬다 밖 몬스터를 잡고 발견한 붉은 원석',icon+'manastone_plus.png');
 item('banana30','은빛 바나나 한 조각','강아지 변신을 풀 수 있는 마지막 조각',icon+'lala.png');
 Object.assign(x.npcs,{
  letter30:{name:'큐리어스의 편지',artPath:'assets/midterm/diary25.png',height:34},potion30:{name:'우유 피부 마법 물약',artPath:icon+'potion.png',height:36},
  seaweed30:{name:'수중초',artPath:icon+'herb.png',height:34},silverBanana30:{name:'은빛 바나나 한 조각',artPath:icon+'lala.png',height:34}
 });
 const rows=[
  {key:'hina',title:'수정구슬 때문에 다시 모이다',scene:'campus',npc:'hina',pos:[610,316],lines:[['hina','건강센터 앞에서 기다렸어. 큐리어스가 연락을 줄 때까지 같이 있자.'],['you','실험 대상 이야기는 정말 모르는 척해야 해.']]},
  {key:'isaac',title:'또 넘어져 버린 아이작',scene:'campus',npc:'isaac',pos:[747,500],lines:[['isaac','으악! 또 너희 앞에서 넘어졌네. 아무튼 우체국에 편지가 와 있어.'],['hina','수정구슬에서 본 미래가 아직 이어지는 것 같아.']]},
  {key:'mail',title:'큐리어스의 실험 초대장',scene:'lobby',npc:'conrad',pos:[405,330],lines:[['conrad','큐리어스 마녀가 보낸 편지입니다. 받는 사람 이름은 두 분 모두 적혀 있군요.'],['narrator','물약이 완성되었으며 실험 대상이 되면 수정구슬을 돌려주겠다는 내용이었다.'],['you','그때 본 강아지가… 설마 나였던 건가?']],effect:s=>m.give(s,'letter30')},
  {key:'offer',title:'성공과 상관없는 거래',scene:'curiousmansion',npc:'curious',pos:[260,132],lines:[['curious','실험이 성공하든 실패하든 수정구슬은 고쳐서 주지. 둘 중 누가 물약을 마실지 정해.'],['hina','우리끼리 대결해서 정하자. 진 사람이 실험 대상이야!'],['you','좋아. 정정당당하게 승부하자.']],effect:s=>{m.take(s,'letter30');m.take(s,'brokenCrystal29');s.crystalRepaired30=true;}},
  {key:'duel',title:'실험 대상을 정하는 결투',scene:'arena',npc:'hina',pos:[710,375],lines:[['hina','미안하지만 강아지가 되는 건 싫어. 이번에는 내가 이길 거야!'],['you','나도 봐주지 않을 거야!']],battle:'hinaDuel30'},
  {key:'potion',title:'패자가 아닌 승자',scene:'curiousmansion',npc:'potion30',pos:[350,315],fixture:true,lines:[['curious','히나는 졌으니 실험 대상으론 마음에 안 들어. 이긴 네가 마셔.'],['you','그런 규칙이 어디 있어요!'],['narrator','달콤한 우유 냄새가 나는 물약을 마시자 팔다리가 줄어들고 온몸에 털이 돋았다.'],['hina','정말… 강아지가 됐어! 수정구슬의 미래가 맞았어.']],effect:s=>{s.dogForm30=true;s.direction='down';}},
  {key:'antonio',title:'큐리어스의 관심을 돌릴 물건',scene:'curiousmansion',npc:'antonio',pos:[350,315],lines:[['antonio','어머니 일이라 미안하군. 요즘 수중 던전의 수중초를 찾고 계셔.'],['antonio','그걸 구해 주면 원래 모습으로 돌려주실지도 몰라.'],['narrator','강아지 목소리로 짖었지만 안토니오는 뜻을 알아들은 듯 고개를 끄덕였다.']]},
  {key:'dobiel',title:'폭포를 막아선 도비엘',scene:'waterfall',npc:'dobiel',pos:[305,374],lines:[['dobiel','낯선 짐승은 수중 던전에 들어갈 수 없습니다. 돌아가세요.'],['narrator','몇 번이나 옆길로 빠지고 물보라 속을 달린 끝에 도비엘의 눈을 피해 입구로 들어갔다.']]},
  {key:'seaweed',title:'수중 던전의 수중초',scene:'divefoyer',npc:'seaweed30',pos:[700,405],fixture:true,lines:[['narrator','물길 가장 깊은 곳에서 푸른빛을 내는 수중초를 찾아 조심스럽게 물어 올렸다.']],effect:s=>m.give(s,'seaweed30')},
  {key:'antonioBack',title:'안토니오의 중재',scene:'curiousmansion',npc:'antonio',pos:[350,315],lines:[['antonio','수중초는 내가 어머니께 전해 드렸어. 이제 직접 말씀을 들어 봐.'],['antonio','히나에게는 고친 수정구슬을 먼저 바바라 할머니께 돌려드리라고 했어.']],effect:s=>m.take(s,'seaweed30')},
  {key:'friends',title:'수정구슬을 먼저 반납하다',scene:'curiousmansion',npc:'hina',pos:[420,300],lines:[['hina','아이작과 내가 수정구슬을 바바라 할머니께 반납하고 올게. 너는 여기서 원래 모습으로 돌아갈 방법을 찾아.'],['you','멍! 멍멍!'],['isaac','걱정 마. 네가 말하려는 뜻은 대충 알겠어.']],effect:s=>s.crystalReturned30=true},
  {key:'cure',title:'은빛 바나나의 행방',scene:'curiousmansion',npc:'curious',pos:[260,132],lines:[['curious','수중초는 잘 받았어. 강아지 변신을 풀려면 은빛 바나나가 필요하지.'],['curious','압둘라가 최근 물량을 전부 매입했으니 쥬다로 가 봐.']]},
  {key:'abdullah',title:'강아지에게는 팔 수 없는 물건',scene:'judah',npc:'abdullah',pos:[245,130],lines:[['abdullah','주인 없는 강아지에게 귀한 거래 물품을 넘길 수는 없소. 주인을 데려오시오.'],['narrator','아무리 짖어 설명해도 압둘라는 손사래를 쳤다.']]},
  {key:'wait',title:'친구들이 거래하는 동안',scene:'judah',npc:'hina',pos:[365,150],lines:[['hina','아이작과 내가 압둘라에게 이야기해 볼게. 기다리는 동안 주변 몬스터들이나 쫓아 줘.'],['isaac','강아지 모습이라도 마법은 쓸 수 있겠지?']]},
  {key:'hunt',title:'쥬다 밖의 몬스터',scene:'judah',npc:'curiouspet',pos:[420,220],lines:[['narrator','항구 밖에서 몬스터들이 짐마차 주변을 맴돌고 있었다.'],['narrator','강아지 몸으로 재빠르게 파고들어 몬스터들을 몰아냈다.']],battle:'rubyHunt30'},
  {key:'ruby',title:'몬스터가 떨어뜨린 루비',scene:'judah',npc:'abdullah',pos:[245,130],lines:[['narrator','강아지가 붉게 빛나는 루비 원석을 내밀자 압둘라의 눈빛이 달라졌다.'],['abdullah','은빛 바나나는 이미 전부 팔았소. 구매자는 원래 비밀이지만 이 루비라면 이야기가 다르지.'],['abdullah','데런 왕국의 세자르 3세가 사 갔소.']],effect:s=>m.take(s,'ruby30')},
  {key:'caesar',title:'왕에게 남은 마지막 한 조각',scene:'kingdom',npc:'caesar',pos:[390,215],lines:[['caesar','은빛 바나나는 거의 다 먹었고 한 조각만 남았구나.'],['hina','강아지로 변한 친구를 위해 꼭 필요해요.'],['caesar','공짜로 내주면 왕의 체면이 서지 않는다. 백성들이 즐거워할 일을 보여 다오.']]},
  {key:'showPlan',title:'왕국의 강아지 쇼',scene:'kingdom',npc:'isaac',pos:[546,590],lines:[['isaac','왕국 경기장에서 강아지 쇼를 하자! 훌라 버섯을 멋지게 잡으면 모두 좋아할 거야.'],['you','멍…!'],['hina','조금만 참아. 우리가 옆에서 응원할게.']]},
  {key:'dogShow',title:'강아지와 훌라 버섯 둘',scene:'royalarena',npc:'hula17',pos:[535,402],lines:[['narrator','관중의 환호 속에서 훌라 버섯 두 마리가 동시에 경기장으로 뛰어들었다.'],['narrator','작아진 몸으로 공격을 피해 이리저리 달리며 마법을 준비했다.']],battle:'dogShow30'},
  {key:'banana',title:'은빛 바나나 한 조각',scene:'kingdom',npc:'silverBanana30',pos:[390,215],fixture:true,lines:[['caesar','훌륭한 공연이었다! 약속대로 마지막 한 조각을 주마.'],['hina','이제 원래 모습으로 돌아갈 수 있어!']],effect:s=>m.give(s,'banana30')},
  {key:'restore',title:'강아지 얼굴은 이제 그만',scene:'curiousmansion',npc:'curious',pos:[260,132],lines:[['curious','은빛 바나나를 제대로 구했군. 한입에 먹어.'],['narrator','은빛 과육을 삼키자 눈부신 빛이 몸을 감쌌고, 손과 발이 본래 모습으로 돌아왔다.'],['you','드디어 말을 할 수 있어요! 다시는 멋대로 실험하지 마세요.']],effect:s=>{m.take(s,'banana30');s.dogForm30=false;s.milkSpellBrewing29=false;}},
  {key:'ending',title:'수정구슬 작전의 끝',scene:'campus',npc:'hina',pos:[610,316],lines:[['hina','수정구슬은 바바라 할머니께 무사히 돌려드렸어. 깨뜨린 일도 솔직하게 말씀드렸고.'],['isaac','미래를 함부로 보려다가 정말 그 미래를 만들어 버린 셈이네.'],['you','앞으로 수정구슬은 수업 시간에만 볼래. 강아지 생활은 한 번이면 충분해!']],effect:s=>{s.crystalArcComplete30=true;s.crystalRepaired30=false;},reward:125,ending:'수정구슬을 수리해 바바라에게 돌려주고, 은빛 바나나로 강아지 변신에서도 벗어났습니다.'}
 ];
 const captured30={
 "isaac": [
  [
   "isaac",
   "넘어지고 나니 우주만물의 근원을 깨우친 것 같아."
  ],
  [
   "hina",
   "넘어진 게 그렇게 대단한 일이야?"
  ],
  [
   "isaac",
   "아무튼 우체국에 너희 편지가 와 있더라. 큐리어스가 보냈대."
  ],
  [
   "you",
   "벌써 물약을 다 만든 건가?"
  ]
 ],
 "mail": [
  [
   "conrad",
   "큐리어스 마녀가 보낸 편지입니다. 받는 사람 이름은 두 분 모두 적혀 있군요."
  ],
  [
   "narrator",
   "아르피아 학교의 학생. 수정구슬은 잊어버린 것이냐? 마법 약이 다 완성되었으니 와서 실험 대상이 돼 주면 약속대로 수정구슬을 주마. 어서 와. 흐흐흐. 실험을 하고 싶다구. — 큐리어스 마녀"
  ],
  [
   "hina",
   "실험을 하고 싶다는 말이 제일 크게 보이는 것 같아."
  ],
  [
   "you",
   "그때 구슬에서 본 내 강아지 모습이 자꾸 생각나."
  ]
 ],
 "potion": [
  [
   "curious",
   "히나는 졌으니 실험 대상으론 마음에 안 들어. 이긴 네가 마셔."
  ],
  [
   "you",
   "그런 규칙이 어디 있어요! 지면 마시기로 했잖아요!"
  ],
  [
   "curious",
   "주문은 내가 하는 거야. 워리워리멍멍 도그아이 강아지. 얍!"
  ],
  [
   "narrator",
   "달콤한 우유 냄새 뒤로 눈부신 빛이 번졌다. 몸이 작아지며 손끝에 털이 돋았다."
  ],
  [
   "hina",
   "정말 강아지잖아! 구슬에서 본 그대로야!"
  ],
  [
   "you",
   "멍? 멍멍!"
  ]
 ],
 "antonio": [
  [
   "antonio",
   "어머니는 수중 던전에서 자라는 수중초라는 약초를 구하려 하고 있어요."
  ],
  [
   "you",
   "멍멍!"
  ],
  [
   "antonio",
   "그걸 가져다드리면 이야기를 들어 주실지도 몰라요. 어머니 일이라 미안해요."
  ],
  [
   "hina",
   "안토니오 씨… 볼수록 멋있어. 헤헤헤."
  ],
  [
   "you",
   "멍! 멍멍!"
  ],
  [
   "hina",
   "알았어, 알았어. 수중초부터 찾으러 가자."
  ]
 ],
 "seaweed": [
  [
   "narrator",
   "수중 던전 첫째 줄 다섯 번째 방에서 초록빛 수중초를 찾았다."
  ],
  [
   "you",
   "멍!"
  ],
  [
   "narrator",
   "줄기가 상하지 않도록 조심스럽게 물어 올렸다."
  ]
 ],
 "abdullah": [
  [
   "abdullah",
   "저 강아지 계속 여기를 맴도네. 빨리 잡아야 할 텐데…"
  ],
  [
   "you",
   "멍! 멍멍!"
  ],
  [
   "narrator",
   "은빛 바나나를 달라는 말은 짖는 소리로만 흘러나왔다. 압둘라는 주위를 두리번거렸다."
  ]
 ],
 "wait": [
  [
   "hina",
   "아이작과 내가 압둘라에게 이야기해 볼게. 기다리는 동안 몬스터 열 마리만 잡아 봐."
  ],
  [
   "you",
   "멍…?"
  ],
  [
   "isaac",
   "강아지 모습이어도 마법은 쓸 수 있잖아. 항구 밖에서 너무 멀리 가지는 마."
  ]
 ],
 "ruby": [
  [
   "you",
   "멍멍!"
  ],
  [
   "narrator",
   "반짝이는 보석을 발견한 강아지가 루비를 물고 압둘라에게 다가갔다."
  ],
  [
   "abdullah",
   "강아지가 반지를 물고 사고를 치는군요. 뭐요?"
  ],
  [
   "hina",
   "그걸 드릴 테니 은빛 바나나를 누가 사 갔는지 알려 주세요."
  ],
  [
   "abdullah",
   "데런 왕국의 세자르 전하가 은빛 바나나를 구입해 갔소."
  ],
  [
   "you",
   "멍멍!"
  ]
 ],
 "caesar": [
  [
   "caesar",
   "은빛 바나나? 거의 다 먹고 한 조각 남았구나."
  ],
  [
   "hina",
   "그 한 조각이면 돼요. 강아지로 변한 친구를 원래대로 돌려놓으려면 꼭 필요해요."
  ],
  [
   "caesar",
   "그렇다면 백성들이 즐거워할 재주를 보여 다오. 멋진 공연이면 마지막 조각을 내주겠다."
  ],
  [
   "you",
   "멍…!"
  ],
  [
   "isaac",
   "거의 다 왔어. 우리도 도울 테니까 조금만 더 참자."
  ]
 ]
};
 for(const row of rows)if(captured30[row.key])row.lines=captured30[row.key];
 Object.assign(rows.find(r=>r.key==="hunt"),{title:"쥬다 밖의 몬스터 열 마리",goal:"쥬다 바깥길 몬스터 10마리 제압하기"});
 const c=m.register(30,'수정구슬 작전 2부 · 강아지 얼굴은 싫어',rows,{crystalRepaired30:false,crystalReturned30:false,dogForm30:false,crystalArcComplete30:false});
 const items=x.questItems;x.questItems=s=>[...items(s),...(s.inv.mt_letter30?[['큐리어스의 편지','물약 실험 대상 모집']]:[]),...(s.inv.mt_seaweed30?[['수중초','큐리어스가 찾던 희귀 약초']]:[]),...(s.inv.mt_ruby30?[['루비 원석','압둘라에게 정보를 얻을 거래 물품']]:[]),...(s.inv.mt_banana30?[['은빛 바나나','강아지 변신을 풀 마지막 한 조각']]:[])];
 x.encounters.hinaDuel30={name:'실험 대상 결정전 · 히나',bg:'assets/maps-hires/colosseum.png',intro:'큐리어스의 실험 대상이 되지 않기 위해 히나와 정정당당하게 겨룹니다.',next:c.keys.potion,xp:390,gold:80,sp:52,enemies:[{name:'히나',element:0,hp:1200,maxHp:1200,atk:28,atb:16,npc:'hina',height:145}]};
 x.encounters.rubyHunt30={name:'쥬다 바깥길 · 루비 원석',bg:'assets/maps-hires/forest-battle.png',intro:'친구들이 거래하는 동안 항구 밖의 몬스터를 몰아내세요.',next:c.keys.ruby,xp:430,gold:135,sp:62,onWin:s=>m.give(s,'ruby30'),enemies:[{name:'항구 늑대',element:1,hp:690,maxHp:690,atk:25,atb:4,sprite:'fightDog'},{name:'모래 전갈',element:2,hp:640,maxHp:640,atk:24,atb:18,sprite:'scorpion'}]};
 x.encounters.dogShow30={name:'데런 왕국 · 강아지 쇼',bg:'assets/maps-hires/colosseum.png',intro:'강아지 몸의 민첩함으로 훌라 버섯 둘의 공격을 피하고 시민들에게 멋진 승부를 보여 주세요.',next:c.keys.banana,xp:470,gold:170,sp:70,enemies:[{name:'훌라 버섯',element:2,hp:720,maxHp:720,atk:25,atb:0,artPath:'assets/midterm/hula-large.png',height:150},{name:'훌라 버섯',element:2,hp:700,maxHp:700,atk:24,atb:16,artPath:'assets/midterm/hula-large.png',height:150}]};
 for(const [mood,lines]of Object.entries({surprised:['그때 본 강아지가… 설마 나였던 건가?','그런 규칙이 어디 있어요!'],embarrassed:['좋아. 정정당당하게 승부하자.','드디어 말을 할 수 있어요! 다시는 멋대로 실험하지 마세요.'],determined:['나도 봐주지 않을 거야!'],happy:['앞으로 수정구슬은 수업 시간에만 볼래. 강아지 생활은 한 번이면 충분해!']}))for(const text of lines)ARPIA_HERO_ART.annotations.set(text,mood);
})();
