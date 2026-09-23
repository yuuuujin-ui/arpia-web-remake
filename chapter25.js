/* Repentance journey verified from wonavy.tistory.com/215; dialogue rebuilt. */
(()=>{
 const x=ARPIA_EXTRA,m=ARPIA_MIDTERM;
 for(const[id,name,desc,icon]of[
 ['letter25','글루글루의 편지','샤이아를 원래의 모습으로 돌려놓을 방법을 함께 찾자는 부탁','assets/midterm/certificate.png'],
 ['diary25','샤이아의 회색책','마법의 가루를 뿌려야 숨겨진 글씨가 나타나는 일기장','assets/midterm/diary25.png'],
 ['dust25','글씨를 드러내는 가루','칠리에게 받은 마법의 가루','assets/midterm/fairy-powder.png'],
 ['book25','고대 번개 마법서','고서 보관실에서 빌린 고대 마법 연구서','assets/midterm/encyclopedia.png'],
 ['flower25','아카니아 꽃','사념 마법을 푸는 데 필요한 약초','assets/midterm/akania.png'],
 ['tears25','참회의 눈물','천년 빙하가 녹은 물에 자연의 마법이 깃든 물','assets/midterm/tears25.png'],
 ['capsule25','샤이아의 몬스터 캡슐','저항하는 샤이아를 안전하게 이동시키기 위한 캡슐','assets/items/golem_core.png']
 ])ARPIA_DATA.ITEMS['mt_'+id]={name,desc,kind:'quest',price:0,sell:0,icon};
 Object.assign(x.npcs,{diary25:{name:'회색책',artPath:'assets/midterm/diary25.png',height:36},tears25:{name:'참회의 눈물',artPath:'assets/midterm/tears25.png',height:36},book25:{name:'고대 번개 마법서',artPath:'assets/midterm/encyclopedia.png',height:36}});
 const rows=[
 {key:'letterNotice',title:'우체국에 도착한 편지',scene:'principal',npc:'morris',lines:[['morris','글루글루가 네게 편지를 보낸 모양이다. 우체국에서 받아 보거라.'],['you','샤이아님에 관한 이야기일까요? 다녀오겠습니다.']]},
 {key:'letter',title:'용서를 위한 부탁',scene:'shop',npc:'conrad',lines:[['conrad','글루글루 마법사님께서 보낸 편지입니다.'],['narrator','편지에는 샤이아를 도울 방법을 함께 찾고 싶다는 부탁이 적혀 있었다.']],effect:s=>m.give(s,'letter25')},
 {key:'gluglu',title:'회색책을 찾아오게',scene:'gluglutemple',npc:'gluglu',pos:[768,470],lines:[['gluglu','샤이아가 처음부터 악한 마법사였다고 생각하지 않네. 그녀의 탑에서 회색책을 찾아와 주게.'],['you','그분을 용서하시려는 건가요?'],['gluglu','먼저 무슨 일이 있었는지 알아야겠지.']],effect:s=>m.take(s,'letter25')},
 {key:'diary',title:'탑에 남겨진 회색책',scene:'shaiyatower',npc:'diary25',pos:[1150,460],fixture:true,lines:[['narrator','책상 아래에서 회색 표지의 책을 찾았다. 펼쳐 보아도 글씨가 보이지 않았다.']],effect:s=>m.give(s,'diary25')},
 {key:'thought',title:'아즈카의 사념 마법',scene:'gluglutemple',npc:'gluglu',pos:[768,470],lines:[['gluglu','봉인된 아즈카도 사념 마법은 쓸 수 있다네. 남의 마음에 파고들어 바꾸는 무서운 마법이지.'],['gluglu','책에 글씨가 없다면 마법의 가루를 뿌려 보게. 칠리가 가지고 있을 거야.']]},
 {key:'dust',title:'감춰진 글씨를 드러내기',scene:'materials',npc:'chilli',lines:[['chilli','이 가루를 얇게 뿌리면 감춰진 글씨가 보일 거다.'],['you','개인적인 일기니까 탑에서 조용히 읽어볼게요.']],effect:s=>m.give(s,'dust25')},
 {key:'read',title:'조금씩 바뀌어 간 마음',scene:'shaiyatower',npc:'diary25',pos:[1150,460],fixture:true,lines:[['narrator','가루를 뿌리자 평범한 일상의 기록이 나타났다. 머리 감기를 미루던 작은 투정 다음에는 반복되는 악몽이 적혀 있었다.'],['narrator','꿈속의 불꽃과 목소리는 날마다 더 선명해졌다. 두려움은 미움으로 바뀌고, 마지막에는 아즈카에게 모든 것을 바치겠다는 다짐이 남아 있었다.'],['you','처음부터 원해서 그런 게 아니었어. 사념 마법을 풀 방법을 찾아야 해.']],effect:s=>{m.take(s,'dust25');s.enemyDiaryRead=true;}},
 {key:'hope',title:'원래의 모습으로 돌려놓기',scene:'gluglutemple',npc:'gluglu',pos:[768,470],lines:[['you','일기에 마음이 변한 과정이 남아 있었어요. 샤이아님은 사념 마법에 걸리셨어요.'],['gluglu','그렇다면 돌려놓을 희망이 있네. 가루다가 방법을 알고 있을지도 모르겠군.']]},
 {key:'ancient',title:'고대 마법의 기록',scene:'eaglevillage',npc:'garuda',lines:[['garuda','아즈카의 번개 마법은 고대의 힘이다. 그것을 풀려면 고대 마법을 알아야 하지. 학교의 고서 보관실을 찾아라.']]},
 {key:'meli',title:'미리 도착한 교장의 허락',scene:'library',npc:'meli',pos:[440,280],lines:[['meli','교장 선생님께 연락을 받았단다. 고서실 출입을 허락하셨어. 안쪽의 보호 문제를 풀고 들어가렴.']],effect:s=>s.enemyArchivePermission=true},
 {key:'archive',title:'고서실 보호 문제',scene:'oldlibrary',npc:'book25',fixture:true,lines:[['narrator','책장 앞의 보호 문양이 빛났다. 고대 마법서를 가져가려면 탐구 목적을 분명히 해야 한다.']],choose:['고서 보관실의 보호 문양','지금 고대 마법서를 찾는 목적은 무엇인가요?',['사념 마법에 걸린 사람을 회복시키기 위해','누군가의 마음을 지배하기 위해','아즈카의 봉인을 풀기 위해'],0,'가루다는 사념 마법을 풀 방법을 찾으라고 했습니다.'],effect:s=>m.give(s,'book25')},
 {key:'recipe',title:'꽃과 참회의 눈물',scene:'eaglevillage',npc:'garuda',lines:[['garuda','아카니아 꽃과 참회의 눈물이 필요하다. 눈물은 천년 빙하가 녹은 물에 자연의 힘이 깃든 것이지.'],['garuda','먼저 꽃을 구해라. 시바가 광산까지 데려다줄 것이다.']]},
 {key:'flight',title:'시바의 등을 타고',scene:'eaglevillage',npc:'shiva',lines:[['shiva','꽉 잡아라. 난쟁이 광산으로 날아간다.'],['you','고마워요. 옛 광산에서 꽃을 구할게요.']],effect:(s,a)=>a.travel('mine',[660,407])},
 {key:'flower',title:'옛 광산의 아카니아 꽃',scene:'minedepths',npc:'akania18',pos:[445,255],fixture:true,lines:[['narrator','갱도 바위 사이에 핀 아카니아 꽃을 조심스럽게 채집했다.']],effect:s=>m.give(s,'flower25')},
 {key:'instructions',title:'사념 마법을 푸는 순서',scene:'eaglevillage',npc:'garuda',lines:[['garuda','먼저 꽃의 향기를 맡게 하고 참회의 눈물을 마시게 해야 한다. 순서를 잊지 마라.'],['you','꽃의 향기, 그리고 참회의 눈물. 기억했어요.']],effect:s=>s.enemyCureKnown=true},
 {key:'permission',title:'샤이아를 데려갈 허락',scene:'principal',npc:'morris',lines:[['morris','방법을 찾았구나. 빌린 책부터 제자리에 돌려놓고 료마에게 열쇠를 받거라. 혼자 데려가지는 마라.']]},
 {key:'returnBook',title:'고대 마법서 반납',scene:'oldlibrary',npc:'book25',fixture:true,lines:[['narrator','고대 번개 마법서를 원래 책장에 조심스럽게 돌려놓았다.']],effect:s=>{m.take(s,'book25');s.enemyBookReturned=true;}},
 {key:'key',title:'료마와 함께 감옥으로',scene:'lobby',npc:'ryoma',pos:[530,335],lines:[['ryoma','감옥 열쇠를 가져가라. 나도 함께 가겠다. 칠리에게 구속 마법 재료도 받아 두고.']],effect:s=>s.enemyPrisonAccess=true},
 {key:'dustBind',title:'만일을 위한 사마귀 가루',scene:'materials',npc:'chilli',lines:[['chilli','샤이아가 저항할 수도 있다. 사마귀 가루를 준비해 두렴. 주문은 가몬망도다.']],effect:s=>m.give(s,'bind24')},
 {key:'struggle',title:'여전히 저항하는 샤이아',scene:'schoolprison',npc:'shaiya',pos:[768,470],lines:[['shaiya','다가오지 마! 날 속박할 수 있을 것 같아?'],['you','당신을 도우려는 거예요. 우선 진정시켜야겠어.']],choose:ARPIA_INVESTIGATION.bind,effect:s=>m.take(s,'bind24')},
 {key:'capsule',title:'안전한 이동을 위한 캡슐',scene:'schoolprison',npc:'ryoma',pos:[650,570],lines:[['ryoma','저항이 너무 심하다. 이 몬스터 캡슐로 이동시키자. 얼음 던전에서 다시 꺼내면 된다.'],['narrator','료마의 도움으로 샤이아를 캡슐 안에 안전하게 넣었다.']],effect:s=>{m.give(s,'capsule25');s.enemyShaiyaInCapsule=true;}},
 {key:'tears',title:'천년 빙하의 물',scene:'icedungeon',npc:'tears25',pos:[621,346],fixture:true,lines:[['narrator','얼음 틈의 맑은 물에서 푸른 마력이 피어올랐다. 천년 빙하에서 생긴 참회의 눈물이었다.']],effect:s=>m.give(s,'tears25')},
 {key:'cure',title:'참회의 눈물을 마시다',scene:'icedungeon',npc:'shaiya',pos:[550,410],lines:[['narrator','캡슐을 열자 샤이아가 다시 저항했다. 료마가 곁에서 움직임을 막아 주었다.'],['ryoma','가루다에게 배운 순서대로 해라.'],['you','먼저 아카니아 꽃의 향기를 맡게 하고…']],choose:['치료의 다음 단계','꽃의 향기를 맡게 했습니다. 다음으로 무엇을 해야 하나요?',['참회의 눈물을 마시게 한다','곧바로 다시 캡슐에 넣는다','사념 마법을 더 강하게 건다'],0,'꽃의 향기 다음에는 천년 빙하의 참회의 눈물이 필요합니다.'],effect:s=>{m.take(s,'capsule25');m.take(s,'flower25');m.take(s,'tears25');s.enemyShaiyaInCapsule=false;s.enemyShaiyaArrested=false;s.enemyShaiyaHealed=true;}},
 {key:'wake',title:'돌아온 샤이아',scene:'icedungeon',npc:'shaiya',pos:[550,410],lines:[['shaiya','여긴… 왜 제가 여기 있죠? 머릿속의 목소리가 사라졌어요.'],['you','사념 마법이 풀렸어요. 이제 함께 돌아가요.'],['ryoma','마을 밖까지 내가 동행하겠다.']]},
 {key:'hunger',title:'돌아가는 길의 헝거',scene:'icevillage',npc:'hunger',pos:[430,570],lines:[['hunger','샤이아를 되돌려 놓았단 말이냐!'],['ryoma','이제 네 편은 없다. 물러서라.'],['you','다시는 그분을 데려가게 두지 않겠어!']],battle:'repentHunger25'},
 {key:'apology',title:'글루글루 앞에서의 사과',scene:'gluglutemple',npc:'gluglu',pos:[768,470],lines:[['shaiya','정말 죄송해요. 제가 한 일을 어떻게 갚아야 할지…'],['gluglu','네가 선한 마법사라는 걸 믿고 있었다. 돌아온 것으로 충분하네.'],['you','이제 모두 제자리로 돌아왔네요.']],effect:s=>s.enemyShaiyaForgiven=true},
 {key:'diaryReturn',title:'회색책에 남은 작은 비밀',scene:'shaiyatower',npc:'shaiya',pos:[768,470],lines:[['shaiya','제가 사념 마법에 걸린 건 어떻게 알았나요?'],['you','회색책을 읽었어요. 여기 돌려드릴게요.'],['shaiya','그 책에는 제 비밀도 적혀 있는데…!'],['you','머리 감는 걸 싫어한다는 이야기요?'],['shaiya','그건 잊어 주세요!'],['narrator','익숙한 목소리가 탑 안을 울렸다. 비로소 긴 사건이 끝난 것 같았다.']],effect:s=>{m.take(s,'diary25');m.take(s,'prison24');s.enemyArcComplete=true;},reward:100,ending:'아카니아 꽃과 참회의 눈물로 사념 마법을 풀었습니다. 샤이아는 본래의 모습으로 돌아왔고 글루글루의 용서를 받았습니다.'}
 ];
 const captured25={
 "gluglu": [
  [
   "gluglu",
   "반갑구먼. 회색책을 찾아오면 무엇이 어떻게 변했는지 알 수 있을 걸세. 샤이아의 탑을 살펴봐 주게."
  ],
  [
   "you",
   "그분을 원래 모습으로 돌려놓고 싶으신 거죠?"
  ],
  [
   "gluglu",
   "그렇다네. 내가 알던 샤이아는 그런 일을 할 사람이 아니었어. 먼저 그녀에게 무슨 일이 생겼는지 알아야겠지."
  ]
 ],
 "thought": [
  [
   "gluglu",
   "난 알고 있었어. 샤이아는 대마왕 아즈카의 강력한 사념 마법에 걸렸다는 것을."
  ],
  [
   "you",
   "대마왕은 봉인되어 있잖아요. 그런데도 다른 사람에게 마법을 걸 수 있나요?"
  ],
  [
   "gluglu",
   "봉인된 그가 쓸 수 있는 마법은 제한되어 있어. 현재 그가 쓸 수 있는 마법 중 하나가 사념 마법이지."
  ],
  [
   "gluglu",
   "사념 마법은 상대의 마음속으로 파고드는 것이야. 스스로 선택했다고 믿게 만들 수도 있지."
  ],
  [
   "you",
   "책을 읽으면 그 변화를 알 수 있겠군요. 하지만 아무 글씨도 없었어요."
  ],
  [
   "gluglu",
   "마법의 가루를 뿌려 보게. 칠리가 가지고 있을 거야."
  ]
 ],
 "dust": [
  [
   "chilli",
   "마법가루? 아, 마법사의 책에서도 보는 모양이군. 자, 여기다."
  ],
  [
   "you",
   "글씨가 나타나면 샤이아님에게 무슨 일이 생겼는지 알 수 있을 거예요."
  ],
  [
   "chilli",
   "한꺼번에 쏟지 말고 펼친 종이 위에 조금씩 뿌리렴."
  ]
 ],
 "read": [
  [
   "you",
   "그럼 시작해 볼까. 일단 회색책을 꺼내서 펴고, 그 위에 마법가루를 솔솔 뿌리는 거야."
  ],
  [
   "narrator",
   "빈 종이 위로 날짜와 글씨가 서서히 떠올랐다."
  ],
  [
   "you",
   "○월 ○일. 머리를 삼 일째 안 감았다. 난 머리 감는 게 제일 싫다."
  ],
  [
   "you",
   "○월 ○일. 이상한 꿈을 꾸었다. 기분 나쁜 불꽃이 나를 휘어감는 것이었다."
  ],
  [
   "you",
   "○월 ○일. 어제와 같은 꿈을 꾸었다. 불꽃 속에서 이상한 목소리가 들렸다. 악의 마법사가 되어라, 악의 마법사가 되어라… 기분 나쁜 꿈이었다."
  ],
  [
   "you",
   "○월 ○일. 밤이 되어 잠드는 게 두렵다. 눈만 감으면 악의 마법사가 되라는 목소리가 들려온다. 꿈이 길어지고 미움이 마음에 점점 커진다."
  ],
  [
   "you",
   "○월 ○일. 악의 마법사가 되라는 목소리가 대마왕 아즈카님의 목소리임을 알게 되었다. 난 그분의 종이 되어 가는 중이다."
  ],
  [
   "you",
   "○월 ○일. 난 대마왕 아즈카님 덕분에 악의 마법사가 되었다. 선한 마법사들이 밉다. 이제 대마왕 아즈카님의 부활을 위해 모든 걸 바치겠다."
  ],
  [
   "narrator",
   "평범했던 필체가 뒤로 갈수록 거칠어져 있었다. 주인공은 마지막 장을 덮고 한동안 말이 없었다."
  ],
  [
   "you",
   "처음부터 원해서 그런 게 아니었어. 밤마다 무서웠겠지… 사념 마법을 풀 방법을 찾아야 해."
  ]
 ],
 "hope": [
  [
   "you",
   "처음에는 악몽을 무서워하는 내용이었어요. 나중에는 그 목소리를 따르게 됐고요."
  ],
  [
   "gluglu",
   "두려워하던 마음까지 바꿔 버린 것이군. 늦기 전에 되돌려야 하네."
  ],
  [
   "gluglu",
   "독수리 마을의 가루다를 찾아가도록 하게. 그는 방법이나 답을 알 걸세."
  ]
 ],
 "ancient": [
  [
   "garuda",
   "사념 마법을 푸는 방법을 찾으러 왔소? 먼저 그 마법의 뿌리부터 알아야 하오."
  ],
  [
   "garuda",
   "대마왕의 마법은 과거의 고대 마법에 닿아 있소. 특히 그가 쓰는 힘은 고대의 번개 마법에서 비롯되었소."
  ],
  [
   "you",
   "고대 번개 마법서를 찾아오면 되겠군요. 학교 고서실에 가 볼게요."
  ]
 ],
 "meli": [
  [
   "meli",
   "교장 선생님께 미리 연락을 받았어요. 샤이아님을 돕기 위해 고대 마법서를 찾는 거지요?"
  ],
  [
   "you",
   "네. 고대 번개 마법서가 필요해요."
  ],
  [
   "meli",
   "열쇠는 여기 있어요. 두 초상화의 다른 점을 찾는 문을 기억하죠? 책은 꼭 제자리에 돌려주세요."
  ]
 ],
 "archive": [
  [
   "you",
   "두 그림의 지팡이, 어깨, 손이 달라. 문이 열렸어."
  ],
  [
   "narrator",
   "다섯 권의 고대 마법서가 탁자 위에 놓여 있었다."
  ],
  [
   "you",
   "음… 번개 마법서는 노란 표지였지. 이 책을 가져가 볼까?"
  ]
 ],
 "recipe": [
  [
   "garuda",
   "참회의 눈물은 천 년 된 빙하가 녹은 물에 자연의 마법이 더해져 생긴 것이오."
  ],
  [
   "you",
   "그 물을 마시면 사념 마법이 풀리나요?"
  ],
  [
   "garuda",
   "먼저 아카니아 꽃도 필요하오. 일단 꽃을 찾아오면 참회의 눈물이 어디 있는지 알려 주겠소."
  ],
  [
   "you",
   "시바에게 길을 물어보고 올게요."
  ]
 ],
 "flight": [
  [
   "shiva",
   "요즘 내가 날개에 털이 빠져 날갯짓하기가 참 힘들다."
  ],
  [
   "you",
   "괜찮으세요? 무리해서 태워 주실 필요는 없어요. 난쟁이 광산 가는 길은 알고 있어요."
  ],
  [
   "shiva",
   "조심해서 다녀오너라. 갱도 안쪽에 아카니아 꽃이 피는 곳이 있을 거다."
  ]
 ],
 "instructions": [
  [
   "garuda",
   "꽃을 잘 가져왔소. 참회의 눈물은 얼음 던전 안에 있소."
  ],
  [
   "garuda",
   "가서 아카니아 꽃의 향기를 맡게 하고, 참회의 눈물을 먹이시오."
  ],
  [
   "you",
   "꽃의 향기를 맡게 하고 눈물을 마시게 한다… 차례대로 기억할게요."
  ],
  [
   "garuda",
   "그래. 그러면 걸려 있는 대마왕 아즈카의 사념 마법이 풀릴 것이오."
  ]
 ],
 "struggle": [
  [
   "shaiya",
   "오지 마! 날 여기서 꺼내려는 것도 또 다른 속임수겠지!"
  ],
  [
   "you",
   "으아, 다짜고짜 욕부터 하시네. 저희는 도와드리러 온 거예요."
  ],
  [
   "ryoma",
   "지금은 말이 통하지 않는구나. 배운 구속 주문으로 움직임을 멈춰라."
  ],
  [
   "you",
   "사마귀 가루를 쓰고… 가몬망도!"
  ]
 ],
 "capsule": [
  [
   "ryoma",
   "반항이 너무 심하구나! 여기 몬스터 캡슐이 있으니 가두자."
  ],
  [
   "you",
   "이렇게 데려가도 괜찮을까요?"
  ],
  [
   "ryoma",
   "지금은 안전하게 옮기는 것이 먼저다. 참회의 눈물 앞에서 꺼내도록 하자."
  ],
  [
   "narrator",
   "료마가 방어 마법으로 샤이아를 감싼 사이 캡슐을 열었다."
  ]
 ],
 "cure": [
  [
   "shaiya",
   "놓아라. 어서 뭘 하는 것이야. 대마왕 아즈카님께서…!"
  ],
  [
   "you",
   "샤이아님, 잠깐만 참으세요. 꽃의 향기를 맡고 물을 마시면 괜찮아질 거예요."
  ],
  [
   "narrator",
   "료마가 저항하는 샤이아를 붙잡았다. 주인공은 꽃을 가까이 가져간 뒤 참회의 눈물을 준비했다."
  ],
  [
   "you",
   "선생님, 지금이에요. 가루다님이 알려 주신 다음 순서대로…"
  ]
 ]
};
 for(const r of rows)if(captured25[r.key])r.lines=captured25[r.key];
 Object.assign(rows.find(r=>r.key==='flight'),{title:'시바에게 광산의 길을 묻다',effect:s=>{s.flowerRoute25=true;}});
 rows.find(r=>r.key==='archive').choose=['다섯 권의 고대 마법서','고대 번개 마법서의 표지를 고르세요.',['회색 책','주황색 책','붉은색 책','파란색 책','노란색 책'],4,'번개 문양이 새겨진 노란 책을 찾아보세요.'];
 const c=m.register(25,'참회의 눈물 · 용서받은 샤이아',rows,{flowerRoute25:false,archivePortrait25:false,portraitDifferences25:[],enemyDiaryRead:false,enemyArchivePermission:false,enemyCureKnown:false,enemyBookReturned:false,enemyShaiyaInCapsule:false,enemyShaiyaHealed:false,enemyShaiyaForgiven:false,enemyArcComplete:false});ARPIA_ENEMY_CHAPTERS.push(c);
 x.encounters.repentHunger25={name:'얼음 마을 밖 · 헝거의 퇴각',bg:'assets/maps-hires/ice-village.png',intro:'료마와 샤이아가 함께 막아섭니다. 헝거를 물러나게 하세요.',next:c.keys.apology,xp:340,gold:130,sp:50,enemies:[{name:'헝거',element:1,hp:1000,maxHp:1000,atk:26,atb:0,artPath:'assets/original/character/other/헝거.png',height:160}]};
 const beforePortrait25=x.interact;
 x.interact=(e,a)=>{const s=a.state;if(s.stage===c.keys.archive&&s.scene==='oldlibrary'&&e.id==='book25'&&!s.archivePortrait25){ARPIA_PORTRAIT_PUZZLE(a,{field:'portraitDifferences25',complete:()=>{s.archivePortrait25=true;a.save();beforePortrait25(e,a);}});return true;}return beforePortrait25(e,a);};
 x.encounters.repentHunger25.allies=[{id:'ryoma',npc:'ryoma',name:'료마',hp:800,maxHp:800,atk:32,skill:'heal',sprite:'assets/original/animation/npc_011_도트_료마/idle.gif'},{id:'shaiya',npc:'shaiya',name:'샤이아',hp:850,maxHp:850,atk:27,skill:'heal',sprite:'assets/original/animation/'+x.npcs.shaiya.anim+'/idle.gif'}];
 const deco=x.decorate;x.decorate=(sc,s,n,p)=>{deco(sc,s,n,p);if(sc.id==='schoolprison'&&s.enemyShaiyaInCapsule)sc.entities=sc.entities.filter(e=>e.id!=='shaiya');};
 const items=x.questItems;x.questItems=s=>[...items(s),...(s.enemyCaseSolved?[['복면 괴인 사건',s.enemyArcComplete?'샤이아의 사념 마법 해제 · 글루글루 석방 · 사건 종결':s.enemyShaiyaHealed?'사념 마법이 풀린 샤이아와 귀환':'글루글루 석방 · 샤이아 구금']]:[])];
 window.ARPIA_STORY_GATES={allowTravel(s,to){
  if(['gluglutemple','shaiyatower'].includes(to)&&s.stage<ARPIA_ENEMY_CHAPTERS[1].start)return '복면 괴인의 흔적을 더 조사한 뒤 방문하세요.';
  if(to==='schoolprison'&&!s.enemyPrisonAccess)return '료마 선생님께 감옥 열쇠를 받아야 합니다.';
  return null;
 }};
 // Exact scene annotations keep the same portrait pose and select only its expression.
 for(const[mood,lines]of Object.entries({
  surprised:['선생님?! 죄송해요. 얼굴도 확인하지 않고…','헝거! 역시 함정이었어.','고맙습니다. 그런데 이 돌은…','샤이아님은 그곳에 없었다고 했는데… 왜 이 초대장을 가지고 있지?'],
  sad:['글루글루 마법사님이 저를 공격했어요…','처음부터 원해서 그런 게 아니었어. 사념 마법을 풀 방법을 찾아야 해.'],
  embarrassed:['저도 처음에는 료마 선생님을 괴인으로 착각했었어요…','저도 성급하게 의심했어요. 다음에는 사실을 더 신중하게 살필게요.'],
  determined:['이번에는 차분하게 사실부터 확인하겠어요.','더는 다른 사람에게 누명을 씌우게 두지 않겠어!','다시는 그분을 데려가게 두지 않겠어!','그다음 방까지 찾아볼게요. 누명을 꼭 벗겨 드릴게요.'],
  happy:['이제 모두 제자리로 돌아왔네요.','사념 마법이 풀렸어요. 이제 함께 돌아가요.','머리 감는 걸 싫어한다는 이야기요?']
 }))for(const line of lines)ARPIA_HERO_ART.annotations.set(line,mood);
})();
