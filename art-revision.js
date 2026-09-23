/* ImageGen art revision. Source provenance: research/verified-art/STATUS.md. */
(()=>{
 const heroes=['fire-male','ice-male','earth-male','fire-female','ice-female','earth-female'];
 const root='assets/art-revision/portraits/';
 const lines=new Map();
 const add=(mood,texts)=>texts.forEach(text=>lines.set(text,mood));
 // Deliberate dialogue annotations, not keyword-based sentiment guessing.
 add('happy',[
  '네! 저는 {name}이에요. 여기가 정말 마법학교 아르피아인가요?',
  '고마워, 미나. 다녀올게!',
  '나와 함께 가 줄래? 잘 부탁해!',
  '해냈다, 케스노! 우리 둘 다 해냈어!',
  '강물이 다시 흐르고 있어요! 마을에도 물이 돌아가겠죠?',
  '교장 선생님! 오당카 님이 약을 드시고 괜찮아지셨어요. 강물도 다시 흐르고 있어요.',
  '새 친구가 생긴 거네요. 만나러 갈게요!',
  '알겠어, 마틸다. 앞으로 잘 부탁해!',
  '{spell}! …와, 성공했어요!',
  '알려 주셔서 고맙습니다.',
  '코볼트 님이라면 저희가 알아요! 학교 지하로 다녀올게요.',
  '태양의 보석을 봉인했고 침묵의 검도 되찾았습니다.',
  '두 곳이 다투기 전에 원인을 찾을 수 있어서 다행이에요.',
  '도움이 되어서 기뻐요. 다음 의뢰도 맡겨 주세요!'
 ]);
 add('surprised',[
  '선생님도 보셨어요? 토끼가 제 말을 알아들었어요!',
  '특별한 기회요?',
  '케스노요? 제 친구와 싸워야 하나요?',
  '저를요? 혹시 고향에서 편지가 왔나요?',
  '교장 선생님이 직접 만드셨어요? 정성껏 전해 드릴게요.',
  '공주님? 배지까지… 설마 학교로 가신 건가? 우선 왕께 알려 드려야겠어.',
  '그럼 공주님도 아르피아 학생이 되나요?',
  '이름도 남기지 않고요? 선생님께 여쭤볼게요.',
  '가루를 구하러 간 사이 누군가 상자를 가져갔어! 기욤이라면 무언가 봤을지도 몰라.',
  '정말… 방금 머리카락이 움직인 것 같은데요.',
  '교장 선생님이 처음부터 늑대의 움직임을 예상하신 거예요?'
 ]);
 add('embarrassed',[
  '학교가 생각했던 것보다 훨씬 커요. 어디로 가야 할지 모르겠어요.',
  '벌써? 혹시 내가 뭘 잘못한 건 아니겠지?',
  '아직 많이 서툴러요. 케스노와 대결도 해야 하고요.',
  '친구들과 선생님이 도와주신 건데 저 혼자 초대를 받아서 조금 어색해요.',
  '왕국에서는 어떻게 인사해야 할지도 모르겠어요.',
  '미안해. 선생님께 확인하고 오해를 풀게.',
  '사실 스콜 선생님의 편지를 광산에서 잃어버렸어.',
  '광산 길이 험해서 그랬을 거예요. 답장부터 읽어 보세요.',
  '제 운명이 어떻게 나올지 조금 무서워요.'
 ]);
 add('sad',[
  '응. 그런데 친구와 겨룬다고 생각하니 조금 이상해.',
  '하지만 강 아래쪽 사람들과 동물들은 어떡하나요? 마을에 물이 부족해요.',
  '그럼 지금까지의 추적은 헛수고였나요?'
 ]);
 add('determined',[
  '열심히 배울게요!',
  '정말요? 저, 정말 열심히 하겠습니다!',
  '그렇다면 저도 정정당당하게 해 볼게요.',
  '친구를 위해 쓸 수 있는 마법사가 되고 싶어요.',
  '물론이지. 그러니까 끝까지 최선을 다하자!',
  '약속할게. 함께 더 멋진 마법사가 되자.',
  '돌아올 길을 표시할 몫은 남겨 둬. 그리고 위험하면 바로 돌아오는 거야.',
  '저와 정령도 준비됐어요. 모두 함께해요!',
  '돌아올 길에 빵 부스러기를 남기자. 서로 떨어지지 않는 거야.',
  '늑대가 보석을 먼저 찾기 전에 서둘러야 해요.',
  '크기로 마법사의 힘을 판단하지 마세요. 태양의 보석을 찾고 있어요.',
  '하얀 늑대가 계속 노리고 있어요. 아르피아에서 더 강한 봉인을 준비하겠습니다.',
  '세 왕국의 약속과 아르피아의 이름으로, 태양의 빛을 이 안에 봉인한다!',
  '이번 무리도 맡겨 주세요!',
  '준비됐어요. 시작할게요!'
 ]);
 window.ARPIA_HERO_ART={
  portrait:(hero,mood='neutral')=>heroes[hero]?root+heroes[hero]+'/'+mood+'.png':null,
  emotion:(line,who)=>who==='you'?(lines.get(line)||'neutral'):'neutral',
  annotations:lines,
  availableHeroes:heroes.map((name,i)=>name?i:null).filter(i=>i!==null)
 };
 const npcs=window.ARPIA_EXTRA.npcs;
 const embedded=window.ARPIA_WALK_EMBED||{};   // data URIs: file paths taint the canvas under file://
 for(const [hero,name]of [[0,'fire-male'],[2,'earth-male'],[3,'fire-female'],[5,'earth-female']]){
  window.ARPIA_WALKS[hero]=embedded[hero]||'assets/art-revision/walk-candidates/'+name+'.png';
 }
 window.ARPIA_WALKS[1]=embedded[1]||'assets/art-revision/sources/ice-male-walk.png';
 window.ARPIA_WALKS[4]=embedded[4]||'assets/art-revision/sources/ice-female-walk.png';
 const furniture=['fur_bed','fur_desk','fur_plant','fur_rug','fur_lamp','fur_bookcase','fur_poster','fur_teapot'];
 window.ARPIA_ROOM_ART=Object.fromEntries(furniture.map(id=>[id,'assets/art-revision/room/'+id+(id==='fur_bed'||id==='fur_desk'?'':'-v1')+'.png']));
 for(const id of furniture)if(window.ARPIA_DATA.ITEMS[id])window.ARPIA_DATA.ITEMS[id].icon=window.ARPIA_ROOM_ART[id];
 for(const id of ['staff','staff_plus','boots','robe','gloves','pendant','silver_robe','iron_gloves','guardian_ring','wind_boots']){
  if(window.ARPIA_DATA.ITEMS[id])window.ARPIA_DATA.ITEMS[id].icon='assets/art-revision/items/'+id+'.png';
 }
 if(npcs.zombieSisters)npcs.zombieSisters.artPath='assets/art-revision/npcs/zombieSisters.png';
 window.ARPIA_PORTRAITS.zombieSisters='assets/art-revision/npcs/zombieSisters-large.png';
 for(const [id,file,portrait]of [
  ['bani','bani-v2','worker/바니.png'],['dick','dick','worker/딕.png'],
  ['rie','rie','teacher/리에.png'],['hubert','hubert','other/휴버트.png'],
  ['quizpocket','quizpocket','other/퀴즈포켓(형).png']
 ]){
  if(npcs[id])Object.assign(npcs[id],{artPath:'assets/art-revision/npcs/'+file+'.png',portrait});
 }
})();
