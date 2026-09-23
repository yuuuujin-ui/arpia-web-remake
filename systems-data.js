/* Original-system data: items, drops, spells, ranks, pets, status effects, furniture.
   Values marked (원작) come from arpia_game_reference.md; other numbers are this remake's balance. */
window.ARPIA_DATA=(()=>{
 const ITEMS={
  // consumables
  potion:{name:'회복약',kind:'consume',price:20,sell:8,desc:'체력 55 회복',hp:55,icon:'🧪'},
  healthGift10:{name:'고급 체력물약',kind:'consume',price:0,sell:0,desc:'압둘라가 거래의 답례로 보낸 물약 · 체력 100 회복',hp:100,icon:'🧴'},
  hipotion:{name:'슈퍼체력물약',kind:'consume',price:120,sell:40,desc:'체력 200 회복',hp:200,icon:'🧴'},
  ether:{name:'마력약',kind:'consume',price:25,sell:10,desc:'마력 18 회복',mp:18,icon:'💧'},
  hiether:{name:'슈퍼마력물약',kind:'consume',price:130,sell:45,desc:'마력 60 회복',mp:60,icon:'🔵'},
  antidote:{name:'해독제',kind:'consume',price:30,sell:10,desc:'중독·출혈 치료',cure:['poison','bleed'],icon:'🌿'},
  antipara:{name:'마비 치료제',kind:'consume',price:30,sell:10,desc:'마비 치료',cure:['paralyze'],icon:'⚡'},
  wakeup:{name:'각성초',kind:'consume',price:30,sell:10,desc:'수면 치료',cure:['sleep'],icon:'🍃'},
  voicewater:{name:'목소리 물약',kind:'consume',price:30,sell:10,desc:'침묵 치료',cure:['silence'],icon:'🔔'},
  eyedrop:{name:'안약',kind:'consume',price:30,sell:10,desc:'블라인드 치료',cure:['blind'],icon:'👁'},
  holywater:{name:'축복의 물',kind:'consume',price:90,sell:30,desc:'저주와 해골 표식 전부 해제',cure:['curse','slow','atkdown','defdown'],icon:'✨'},
  petfood:{name:'펫 간식',kind:'consume',price:40,sell:12,desc:'동행 펫 HP 40 회복 · 호감도 +2',petHp:40,petAff:2,icon:'🍖'},
  // materials (원작 재료명)
  manastone:{name:'마나스톤',kind:'material',sell:30,desc:'들쥐가 떨어뜨리는 작은 마력석. 코비가 7개를 강화 마나스톤 1개로 바꿔 준다.',icon:'💠'},
  manastone_plus:{name:'강화 마나스톤',kind:'material',sell:300,desc:'지팡이 강화 재료',icon:'💎'},
  icepiece:{name:'얼음조각',kind:'material',sell:200,desc:'얼음 몬스터가 남기는 조각. 오당카가 1000핀에 산다.',icon:'🧊'},
  iceblood:{name:'얼음 몬스터의 피',kind:'material',sell:200,desc:'얼음 정령왕의 시험 재료',icon:'🩸'},
  spirit_soil:{name:'정령의 흙',kind:'material',sell:15,desc:'보스쥐가 반드시 떨어뜨리는 흙. 대지 정령왕의 시험 재료',icon:'🟤'},
  soycrab:{name:'간장게장',kind:'material',sell:120,desc:'몬스터 게가 품은 별미',icon:'🦀'},
  lala:{name:'랄라열매',kind:'material',sell:60,desc:'님펜 옆에서 자라는 열매',icon:'🍒'},
  diamond:{name:'다이아몬드',kind:'material',sell:800,desc:'큐리어스 저택 왼쪽 숲에서 채집',icon:'💍'},
  firewood:{name:'장작',kind:'material',sell:10,desc:'불꽃 마을 동쪽 해안 절벽의 장작',icon:'🪵'},
  charcoal:{name:'코볼트의 숯',kind:'material',sell:25,desc:'보일러 연료',icon:'⚫'},
  grape:{name:'포도',kind:'material',sell:40,desc:'큐리어스 저택에서 파는 포도',price:60,icon:'🍇'},
  herb:{name:'약초',kind:'material',sell:12,desc:'숲과 동굴의 약초',icon:'🌱'},
  rat_tail:{name:'들쥐 꼬리',kind:'material',sell:5,desc:'',icon:'🐭'},
  wood_chip:{name:'나무 조각',kind:'material',sell:6,desc:'',icon:'🪵'},
  spider_silk:{name:'거미줄',kind:'material',sell:14,desc:'',icon:'🕸'},
  snake_scale:{name:'뱀 비늘',kind:'material',sell:18,desc:'',icon:'🐍'},
  scorpion_tail:{name:'전갈 꼬리',kind:'material',sell:20,desc:'',icon:'🦂'},
  wolf_fang:{name:'늑대 이빨',kind:'material',sell:45,desc:'',icon:'🦷'},
  ghost_dust:{name:'유령 가루',kind:'material',sell:60,desc:'',icon:'👻'},
  golem_core:{name:'골렘 조각',kind:'material',sell:70,desc:'',icon:'🪨'},
  dragon_scale:{name:'아기용 비늘',kind:'material',sell:150,desc:'',icon:'🐲'},
  octopus_ink:{name:'문어 먹물',kind:'material',sell:50,desc:'',icon:'🐙'},
  squid_ink:{name:'오징어 먹물',kind:'material',sell:50,desc:'',icon:'🦑'},
  bat_wing:{name:'박쥐 날개',kind:'material',sell:16,desc:'',icon:'🦇'},
  goldnugget:{name:'금덩이',kind:'material',sell:2000,desc:'옛 광산의 금덩이',icon:'🪙'},
  bone:{name:'해골 병사의 뼈',kind:'material',sell:80,desc:'',icon:'🦴'},
  // scrolls (원작: 고급 마법은 주문서를 해독해야 배움)
  scroll_fireburst:{name:'파이어 버스트 주문서',kind:'scroll',spell:'fireburst',sell:0,desc:'고급 불꽃 교실 아론에게 해독',icon:'📜'},
  scroll_icetrap:{name:'아이스 트랩 주문서',kind:'scroll',spell:'icetrap',sell:0,desc:'고급 얼음 교실 나오미에게 해독',icon:'📜'},
  scroll_earthshake:{name:'어쓰 쉐이킹 주문서',kind:'scroll',spell:'earthshake',sell:0,desc:'고급 대지 교실 료마에게 해독',icon:'📜'},
  scroll_snowstorm:{name:'스노우 스톰 주문서',kind:'scroll',spell:'snowstorm',sell:0,desc:'얼음 정령왕의 시험 보상',icon:'📜'},
  scroll_poisonbugs:{name:'포이즌 벅스 주문서',kind:'scroll',spell:'poisonbugs',sell:0,desc:'대지 정령왕의 시험 보상',icon:'📜'},
  scroll_firedragon:{name:'파이어 드래곤 주문서',kind:'scroll',spell:'firedragon',sell:0,desc:'대마도사 시험 보상',icon:'📜'},
  scroll_megafrozen:{name:'메가 프로즌 주문서',kind:'scroll',spell:'megafrozen',sell:0,desc:'대마도사 시험 보상',icon:'📜'},
  scroll_stonetrap:{name:'스톤 트랩 주문서',kind:'scroll',spell:'stonetrap',sell:0,desc:'대마도사 시험 보상',icon:'📜'},
  // gear (level restricted, 원작: 장비 대부분 레벨 제한)
  staff:{name:'속성 지팡이',kind:'gear',slot:'무기',icon:'🪄',physical:7,magic:4,price:0,sell:0,lv:1},
  staff_plus:{name:'강화 지팡이',kind:'gear',slot:'무기',icon:'🔮',physical:12,magic:14,price:0,sell:400,lv:15,desc:'코비에게 강화 마나스톤 3개로 강화'},
  boots:{name:'메탈 슈즈',kind:'gear',slot:'신발',icon:'👢',agility:2,price:120,sell:40,lv:6},
  robe:{name:'마법사 로브',kind:'gear',slot:'몸통',icon:'🧥',magicDefense:5,price:150,sell:50,lv:5},
  gloves:{name:'가죽 장갑',kind:'gear',slot:'손',icon:'🧤',physicalDefense:3,price:80,sell:25,lv:3},
  pendant:{name:'사파이어 목걸이',kind:'gear',slot:'목',icon:'📿',magic:5,price:180,sell:60,lv:8},
  hat:{name:'마법사 모자',kind:'gear',slot:'머리',icon:'🎩',magicDefense:3,price:90,sell:30,lv:4},
  silver_robe:{name:'은빛 로브',kind:'gear',slot:'몸통',icon:'🧥',magicDefense:12,physicalDefense:4,price:900,sell:300,lv:15},
  iron_gloves:{name:'강철 장갑',kind:'gear',slot:'손',icon:'🧤',physicalDefense:9,physical:3,price:600,sell:200,lv:12},
  guardian_ring:{name:'수호의 반지',kind:'gear',slot:'목',icon:'💍',magic:9,magicDefense:4,price:1500,sell:500,lv:20},
  wind_boots:{name:'바람 신발',kind:'gear',slot:'신발',icon:'👟',agility:6,price:1200,sell:400,lv:18},
  sage_hat:{name:'마도사의 모자',kind:'gear',slot:'머리',icon:'🎓',magicDefense:10,magic:6,price:2400,sell:800,lv:35},
  // furniture (버비 가구점)
  fur_bed:{name:'포근한 침대',kind:'furniture',price:800,sell:200,desc:'휴식 시 회복 후 5분간 최대 HP +10%',icon:'🛏'},
  fur_desk:{name:'공부 책상',kind:'furniture',price:600,sell:150,desc:'마이룸에서 매일 한 번 공부: 선행 점수 +5',icon:'🪑'},
  fur_plant:{name:'마법 화분',kind:'furniture',price:300,sell:80,desc:'물을 주면 자라고, 다 자라면 약초를 준다',icon:'🪴'},
  fur_rug:{name:'양탄자',kind:'furniture',price:450,sell:120,desc:'장식',icon:'🧶'},
  fur_lamp:{name:'등불',kind:'furniture',price:350,sell:90,desc:'장식',icon:'🏮'},
  fur_bookcase:{name:'책장',kind:'furniture',price:900,sell:250,desc:'마이룸에서 마법 복습: MP 완전 회복',icon:'📚'},
  fur_poster:{name:'아르피아 포스터',kind:'furniture',price:200,sell:50,desc:'장식',icon:'🖼'},
  fur_teapot:{name:'찻주전자',kind:'furniture',price:250,sell:60,desc:'장식',icon:'🫖'},
 pet_license:{name:'펫 관리 자격증',kind:'key',price:200,sell:0,desc:'펫 2마리 동행 허가. 플레이 2시간마다 갱신',icon:'📄'},
 };
 for(const id of Object.keys(ITEMS))ITEMS[id].icon='assets/items/'+id+'.png';
 // monster name -> [[item, chance, max qty]]
 const DROPS={
  '들쥐':[['manastone',.9,1],['rat_tail',.3,1]],'나무토막':[['wood_chip',.5,2]],'거미':[['spider_silk',.45,1],['antidote',.06,1]],'뱀':[['snake_scale',.4,1],['antipara',.05,1]],
  '전갈':[['scorpion_tail',.4,1],['antidote',.08,1]],'곰 인형':[['wood_chip',.4,2],['potion',.15,1]],'버섯':[['herb',.6,2]],'몬스터 게':[['soycrab',.35,1]],
  '고블린':[['herb',.4,1],['potion',.1,1]],'골렘':[['golem_core',.5,1]],'유령마':[['ghost_dust',.5,1],['ether',.1,1]],'얼음 유령마':[['iceblood',.5,1],['icepiece',.4,1]],
  '늑대':[['wolf_fang',.5,1]],'박쥐':[['bat_wing',.5,1]],'보스쥐':[['spirit_soil',1,1]],'아기 대지용':[['manastone_plus',.5,1],['dragon_scale',.35,1]],
  '아기 얼음용':[['icepiece',.6,1],['iceblood',.4,1]],'아이스 골렘':[['icepiece',.5,2],['iceblood',.5,1],['hipotion',.05,1]],'포악한 문어':[['octopus_ink',.6,1]],'먹물 오징어':[['squid_ink',.6,1]],
  '혼령강아지':[['ghost_dust',.4,1]],'지렁이':[['herb',.5,1]],'떠돌이 용병':[['potion',.4,1],['hiether',.08,1]],'카우보이 인형':[['hipotion',.3,1]],'불꽃병사':[['ether',.25,1]],
  '늪 개구리':[['herb',.4,1]],'좀비':[['herb',.3,1],['bone',.2,1]],'해골 전사':[['bone',.6,1]],'얼음양':[['icepiece',.3,1]],'선인장 괴물':[['herb',.5,2]],
 };
 // enemies whose attacks are magical (checked against magic defense)
 const MAGIC_ATTACKERS=new Set(['유령마','얼음 유령마','대지 유령마','아기 대지용','아기 얼음용','아이스 골렘','골렘','불꽃 정령','얼음 정령','대지 정령','떡갈나무의 마력','케스노','오당카','대지정령왕','얼음정령왕','분노한 대지정령왕','꼭두각시 스콜','침묵의 검을 든 헝거','대마도사 전직의 운석','레인보우 웜','유령마 니그로','마력 인형']);
 const RANKS=['견습 마법사','초보 마법사','숙련 마법사','마도사','대마도사'];
 const RANK_LEVEL=[1,10,20,35,50];
 // spells (원작 목록). tier: basic singles learn at 초급 교실, effect singles at 초급 교실 from rank 2, scroll spells at 고급 교실, neutral at 리에.
 // lv: learned level 0..3 (강화 단계는 basic 3종만). lessons: 반복 수업 횟수. sp: 수업당 선행 점수. mp per level [lv1,lv2,lv3].
 const S=(id,name,el,kind,o)=>Object.assign({id,name,el,kind},o);
 const SPELLS=[
  S('fire','파이어',0,'single',{rank:0,lessons:1,sp:30,mp:[3,5,7],power:[1,1.25,1.5],basic:true}),
  S('firearrow','파이어 애로우',0,'single',{rank:1,lessons:3,sp:20,mp:[6],power:[1.35]}),
  S('fireball','파이어 볼',0,'single',{rank:2,lessons:4,sp:30,mp:[10],power:[1.8]}),
  S('fireburst','파이어 버스트',0,'aoe',{rank:1,lessons:2,sp:40,mp:[15],power:[0.95],status:'burn',scroll:'scroll_fireburst'}),
  S('risingflare','라이징 플레어',0,'single',{rank:2,lessons:4,sp:35,mp:[12],power:[1.3],status:'burn'}),
  S('firedragon','파이어 드래곤',0,'aoe',{rank:4,lessons:5,sp:80,mp:[30],power:[1.7],scroll:'scroll_firedragon'}),
  S('ice','아이스',1,'single',{rank:0,lessons:1,sp:30,mp:[3,5,7],power:[1,1.25,1.5],basic:true}),
  S('icespear','아이스 스피어',1,'single',{rank:1,lessons:3,sp:20,mp:[6],power:[1.35]}),
  S('icestone','아이스 스톤',1,'single',{rank:2,lessons:4,sp:30,mp:[10],power:[1.8]}),
  S('icetrap','아이스 트랩',1,'aoe',{rank:1,lessons:2,sp:40,mp:[15],power:[0.95],status:'slow',scroll:'scroll_icetrap'}),
  S('frozenblast','프로즌 블래스트',1,'single',{rank:2,lessons:4,sp:35,mp:[12],power:[1.3],status:'slow'}),
  S('snowstorm','스노우 스톰',1,'aoe',{rank:3,lessons:3,sp:50,mp:[22],power:[1.1],status:'slow',scroll:'scroll_snowstorm'}),
  S('megafrozen','메가 프로즌',1,'aoe',{rank:4,lessons:5,sp:80,mp:[30],power:[1.7],scroll:'scroll_megafrozen'}),
  S('stonecrash','스톤 크래시',2,'single',{rank:0,lessons:1,sp:30,mp:[3,5,7],power:[1,1.25,1.5],basic:true}),
  S('stonehand','스톤 핸드',2,'single',{rank:1,lessons:3,sp:20,mp:[6],power:[1.35]}),
  S('stonegolem','스톤 골렘',2,'single',{rank:2,lessons:4,sp:30,mp:[10],power:[1.8]}),
  S('earthshake','어쓰 쉐이킹',2,'aoe',{rank:1,lessons:2,sp:40,mp:[15],power:[0.95],status:'defdown',scroll:'scroll_earthshake'}),
  S('dustblast','더스트 블래스트',2,'single',{rank:2,lessons:4,sp:35,mp:[12],power:[1.3],status:'random'}),
  S('poisonbugs','포이즌 벅스',2,'aoe',{rank:3,lessons:3,sp:50,mp:[22],power:[1.1],status:'random',scroll:'scroll_poisonbugs'}),
  S('stonetrap','스톤 트랩',2,'aoe',{rank:4,lessons:5,sp:80,mp:[30],power:[1.7],scroll:'scroll_stonetrap'}),
  S('healing','힐링',null,'heal',{rank:0,lessons:2,sp:20,mp:[5],heal:40}),
  S('restore','리스토어',null,'healall',{rank:2,lessons:4,sp:40,mp:[14],heal:35}),
  S('antiparalyze','안티페럴링',null,'cure',{rank:1,lessons:2,sp:25,mp:[4],cure:['paralyze']}),
  S('shout','샤우트',null,'cure',{rank:1,lessons:2,sp:25,mp:[4],cure:['silence']}),
  S('decleary','디클리어리',null,'cure',{rank:1,lessons:2,sp:25,mp:[4],cure:['poison','bleed']}),
  S('blessing','블레싱',null,'cure',{rank:2,lessons:3,sp:35,mp:[8],cure:['curse','slow','atkdown','defdown']}),
  S('powering','파워링',null,'buff',{rank:2,lessons:3,sp:35,mp:[8],buff:'power'}),
 ];
 const SPELL={};for(const sp of SPELLS)SPELL[sp.id]=sp;
 const BASIC=['fire','ice','stonecrash'],AOE_STORY=['fireburst','icetrap','earthshake'];
 // teachers: npc id -> spells they teach
 const TEACHERS={
  esta:{name:'에스타',spells:['fire','firearrow','fireball','risingflare'],desc:'초급 불꽃 교실'},
  scoll:{name:'스콜',spells:['ice','icespear','icestone','frozenblast'],desc:'초급 얼음 교실'},
  ishubike:{name:'이슈비케',spells:['stonecrash','stonehand','stonegolem','dustblast'],desc:'초급 대지 교실'},
  aron:{name:'아론',spells:['fireburst','firedragon'],desc:'고급 불꽃 교실 · 주문서 해독'},
  naomi:{name:'나오미',spells:['icetrap','snowstorm','megafrozen'],desc:'고급 얼음 교실 · 주문서 해독'},
  ryoma:{name:'료마',spells:['earthshake','poisonbugs','stonetrap'],desc:'고급 대지 교실 · 주문서 해독'},
  rie:{name:'리에',spells:['healing','restore','antiparalyze','shout','decleary','blessing','powering'],desc:'2층 비속성 교실'},
 };
 // status effects (원작 11종). target: who can carry it.
 const STATUS={
  bleed:{name:'출혈',icon:'🩸',color:'#e05555',dot:true},poison:{name:'중독',icon:'🫧',color:'#a855d8',dot:true},burn:{name:'화상',icon:'🔥',color:'#ff8a3d',dot:true},
  paralyze:{name:'마비',icon:'⚡',color:'#f2d84b',skip:true},sleep:{name:'수면',icon:'💤',color:'#9fc3ff',skip:true,wakeOnHit:true},silence:{name:'침묵',icon:'💬',color:'#c9c9c9'},
  blind:{name:'블라인드',icon:'🌫',color:'#5a5a6a'},slow:{name:'노란 해골',icon:'💀',color:'#e6d15a',desc:'민첩 감소'},atkdown:{name:'빨간 해골',icon:'💀',color:'#e04747',desc:'공격력 감소'},
  defdown:{name:'파란 해골',icon:'💀',color:'#4f7fe0',desc:'방어력 감소'},curse:{name:'저주',icon:'☠',color:'#2b2b2b',stack:true,desc:'모든 능력 감소 · 중첩'},
 power:{name:'파워링',icon:'💪',color:'#ffd86b',buff:true},reflect:{name:'오토 반사',icon:'🛡',color:'#b8e0ff',buff:true},regen:{name:'오토 리스토어',icon:'💚',color:'#8fe08f',buff:true},lucky:{name:'럭키찬스',icon:'🍀',color:'#7fd97f',buff:true},
 };
 for(const id of Object.keys(STATUS))STATUS[id].icon='assets/status/'+id+'.png';
 // pets (원작 목록 일부). el: 0 불꽃 1 얼음 2 대지 null 비속성. maxLevel/evolveAt 원작 규칙(만렙의 절반에서 진화). sprite: pet-images folder.
 const PSK={
  bolt:{id:'bolt',name:'원소탄',kind:'attack',mp:1,power:1,magic:true},storm:{id:'storm',name:'원소 폭풍',kind:'aoe',mp:4,power:.8,magic:true},
  wing:{id:'wing',name:'날개치기',kind:'attack',mp:1,power:1},goldwing:{id:'goldwing',name:'황금 날개',kind:'aoe',mp:4,power:.85},
  bite:{id:'bite',name:'물기',kind:'attack',mp:1,power:1},bleedbite:{id:'bleedbite',name:'출혈 공격',kind:'attack',mp:2,power:.9,status:'bleed'},bleedall:{id:'bleedall',name:'모두 출혈 공격',kind:'aoe',mp:5,power:.7,status:'bleed'},
  infect:{id:'infect',name:'감염 공격',kind:'attack',mp:2,power:.9,status:'poison'},infectall:{id:'infectall',name:'모두 감염 공격',kind:'aoe',mp:5,power:.7,status:'poison'},
  paraatk:{id:'paraatk',name:'마비 공격',kind:'attack',mp:2,power:.9,status:'paralyze'},silenceatk:{id:'silenceatk',name:'침묵 공격',kind:'attack',mp:2,power:.9,status:'silence'},
  scratch:{id:'scratch',name:'할퀴기',kind:'attack',mp:1,power:1.15},lullaby:{id:'lullaby',name:'자장가',kind:'debuffall',mp:4,status:'sleep'},quiet:{id:'quiet',name:'조용히',kind:'debuff',mp:3,status:'silence'},
  blindfold:{id:'blindfold',name:'장님',kind:'debuff',mp:3,status:'blind'},slowly:{id:'slowly',name:'천천히',kind:'debuff',mp:3,status:'slow'},softly:{id:'softly',name:'살살 때려',kind:'debuff',mp:3,status:'atkdown'},
  guardoff:{id:'guardoff',name:'가드 풀어',kind:'debuff',mp:3,status:'defdown'},curse:{id:'curse',name:'저주',kind:'debuff',mp:4,status:'curse'},
  ice:{id:'ice',name:'아이스',kind:'attack',mp:2,power:1.1,magic:true,el:1},frozen:{id:'frozen',name:'프로즌',kind:'attack',mp:3,power:1,magic:true,el:1,status:'slow'},frozencarol:{id:'frozencarol',name:'프로즌 캐롤',kind:'aoe',mp:6,power:.8,magic:true,el:1,status:'slow'},
  dust:{id:'dust',name:'더스트',kind:'attack',mp:3,power:1,magic:true,el:2,status:'random'},dustshower:{id:'dustshower',name:'더스트 샤워',kind:'aoe',mp:6,power:.8,magic:true,el:2,status:'random'},
  burning:{id:'burning',name:'버닝',kind:'attack',mp:3,power:1,magic:true,el:0,status:'burn'},burningwaltz:{id:'burningwaltz',name:'버닝 왈츠',kind:'aoe',mp:6,power:.8,magic:true,el:0,status:'burn'},
  restore:{id:'restore',name:'리스토어',kind:'healall',mp:4,heal:30},autorestore:{id:'autorestore',name:'오토 리스토어',kind:'buff',mp:5,status:'regen'},lucky:{id:'lucky',name:'럭키찬스',kind:'buff',mp:3,status:'lucky'},reflect:{id:'reflect',name:'오토 반사',kind:'buff',mp:5,status:'reflect'},
  mace:{id:'mace',name:'철퇴',kind:'attack',mp:2,power:1.6},shell:{id:'shell',name:'껍질 치기',kind:'attack',mp:1,power:1},kick:{id:'kick',name:'발차기',kind:'attack',mp:1,power:1.05},pollen:{id:'pollen',name:'꽃가루',kind:'debuff',mp:3,status:'sleep'},
  drop:{id:'drop',name:'물방울',kind:'attack',mp:1,power:1,magic:true,el:1},dig:{id:'dig',name:'땅파기',kind:'attack',mp:1,power:1.05},needle:{id:'needle',name:'바늘 찌르기',kind:'attack',mp:1,power:1,status:'bleed'},tackle:{id:'tackle',name:'몸통 박치기',kind:'attack',mp:1,power:1.1},
 };
 const P=(id,name,el,maxLevel,price,sprite,skills,evolved,o={})=>Object.assign({id,name,el,maxLevel,evolveAt:Math.ceil(maxLevel/2),price,sprite,skills,evolved},o);
 const PETS=[
  P('spirit_fire','불꽃 정령',0,10,0,'fire',['bolt'],['storm'],{story:true,hp:40,mp:12,agi:22}),
  P('spirit_ice','얼음 정령',1,10,0,'ice',['bolt'],['storm'],{story:true,hp:40,mp:12,agi:22}),
  P('spirit_earth','대지 정령',2,10,0,'earth',['bolt'],['storm'],{story:true,hp:40,mp:12,agi:22}),
  P('babyEagle','아기 독수리',null,10,0,'babyEagle',['wing'],['goldwing'],{story:true,hp:34,mp:10,agi:28,evolvedName:'황금날개 시바'}),
  P('dog','강아지',null,20,500,'dog',['bite','restore'],['autorestore'],{hp:36,mp:14,agi:24}),
  P('cat','고양이',null,40,3000,'cat',['scratch','paraatk'],['blindfold','silenceatk'],{hp:44,mp:16,agi:32}),
  P('turtle','거북',2,30,900,'turtle',['shell','guardoff'],['softly'],{hp:60,mp:10,agi:14}),
  P('rabbit','토끼',null,20,700,'rabbit',['kick','lullaby'],['quiet'],{hp:34,mp:14,agi:34}),
  P('penguin','펭귄',1,30,1200,'penguin',['drop','frozen'],['frozencarol'],{hp:42,mp:12,agi:24}),
  P('moll','두더지',2,30,1200,'moll',['dig','dust'],['dustshower'],{hp:44,mp:12,agi:20}),
  P('moth','독나방',2,30,0,'moth',['infect'],['infectall'],{mission:true,hp:32,mp:16,agi:36}),
  P('fightDog','불량견',0,30,1500,'fightDog',['bite','bleedbite'],['bleedall','burning'],{hp:50,mp:12,agi:26}),
  P('clam','조개',1,20,600,'clam',['drop','guardoff'],['ice'],{hp:52,mp:10,agi:12}),
  P('poin','포인',null,40,2500,'poin',['scratch','curse'],['curse','slowly'],{hp:40,mp:18,agi:28}),
  P('woodDoll','나무 인형',2,50,2000,'woodDoll',['tackle'],['mace'],{hp:48,mp:10,agi:18}),
  P('curseDoll','부두 인형',null,30,0,'curseDoll',['curse','infect'],['bleedbite','lullaby'],{mission:true,hp:38,mp:20,agi:24}),
  P('pillow','베개',null,20,800,'pillow',['tackle','lullaby'],['lullaby'],{hp:40,mp:16,agi:20,note:'자장가는 적 전체 수면'}),
  P('ragDoll','누더기 인형',2,40,0,'ragDoll',['needle'],['bleedall'],{mission:true,hp:46,mp:14,agi:22}),
  P('baekman','백만둥이',null,30,2200,'baekman',['tackle','reflect'],['lucky'],{hp:44,mp:16,agi:22}),
  P('sheep','밥양',1,20,900,'sheep',['tackle','slowly'],['frozen'],{hp:42,mp:12,agi:20}),
  P('flower','연지풀',2,20,600,'flower',['pollen'],['dust'],{hp:30,mp:18,agi:26}),
 ];
 const PET={};for(const p of PETS)PET[p.id]=p;
 const PET_SHOP=['dog','rabbit','clam','flower','pillow','sheep','turtle','penguin','moll','fightDog','woodDoll','baekman','poin','cat'];
 // shops: npc -> item ids
 const SHOPS={
  sam:{name:'사무엘의 마법 도구점',buy:['potion','ether','hipotion','hiether','antidote','antipara','wakeup','voicewater','eyedrop','holywater','petfood','gloves','hat','robe','boots','pendant','iron_gloves','silver_robe','wind_boots','guardian_ring','sage_hat'],sellAll:true},
  bubby:{name:'버비 가구점',buy:['fur_bed','fur_desk','fur_plant','fur_rug','fur_lamp','fur_bookcase','fur_poster','fur_teapot'],sellAll:false},
  curious:{name:'큐리어스 저택 · 포도',buy:['grape'],sellAll:false},
  abdullah:{name:'압둘라의 도매상',buy:['potion','ether','hipotion','petfood'],sellAll:true},
 };
 // colosseum opponents (딕)
 const COLOSSEUM=[
  {id:'col_kesno',name:'케스노',lv:1,enemies:[{name:'케스노',element:1,hp:200,atk:17,sprite:'kesno'}],gold:60},
  {id:'col_sofia',name:'소피아',lv:8,enemies:[{name:'소피아',element:2,hp:340,atk:20,sprite:'earth'},{name:'소피아의 정령',element:2,hp:120,atk:12,sprite:'earth'}],gold:120},
  {id:'col_edward',name:'에드워드 장군',lv:15,enemies:[{name:'에드워드 경',element:0,hp:680,atk:23,sprite:'flameSoldier'}],gold:250},
  {id:'col_squid',name:'먹물 오징어 군단',lv:22,enemies:[{name:'먹물 오징어',element:1,hp:285,atk:21,sprite:'sharkroon'},{name:'먹물 오징어',element:1,hp:285,atk:21,sprite:'sharkroon'},{name:'포악한 문어',element:1,hp:300,atk:22,sprite:'poisonFish'}],gold:400},
  {id:'col_gluglu',name:'글루글루',lv:30,enemies:[{name:'글루글루',element:0,hp:1100,atk:30,sprite:'fire'}],gold:700},
  {id:'col_jackal',name:'쟈칼',lv:40,enemies:[{name:'쟈칼',element:2,hp:1600,atk:36,sprite:'whiteWolf'}],gold:1200},
 ];
 // quiz pocket (교장실 형 · 오당카 오두막 동생) — 원작: 퀴즈로 선행 점수
 const QUIZ=[
  ['불꽃 마법이 강한 속성은?',['얼음','대지','불꽃'],0],['얼음 마법이 강한 속성은?',['불꽃','대지','얼음'],1],['대지 마법이 강한 속성은?',['불꽃','얼음','대지'],0],
  ['아르피아 학교의 교장 선생님은?',['모리스','자칼','가루다'],0],['웨일라의 3대 현자가 아닌 사람은?',['모리스','자칼','콘라드'],2],['데런 왕국의 왕은?',['세자르 3세','무함마드 알리 4세','제로니'],0],
  ['난쟁이 광산의 궁전 수호자는?',['기욤','코비','발디'],0],['펫은 몇 마리까지 동행할 수 있나요?',['1마리','2마리','3마리'],1],['마법을 배울 때 쓰는 점수는?',['핀','선행 점수','경험치'],1],
  ['들쥐가 자주 떨어뜨리는 것은?',['마나스톤','얼음조각','금덩이'],0],['얼음 던전에 들어가려면 필요한 것은?',['험프리가의 문장','비밀 열쇠','태양의 보석'],0],['대지 마을 던전의 안내 정령은?',['로티','클라우디','레오나'],0],
  ['500년 전 아즈카를 물리친 대마법사는?',['아르피아','오엔','발바도스'],0],['항구 도시 쥬다의 도매상은?',['압둘라','푸키','샤크'],0],['마법 재료실 선생님은?',['칠리','리에','펠리타'],0],
 ];
 // mailbox letters unlocked by stage (원작 우체국은 유저 간 우편 · 싱글에서는 미션 편지함)
 const LETTERS=[
  {id:'welcome',stage:0,from:'줄리아 선생님',title:'입학을 축하해요',body:'아르피아에 온 것을 환영해요. 모르는 것이 있으면 언제든 교실로 오세요.',gift:{potion:2}},
  {id:'deren',stage:33,from:'콘라드',title:'데런 왕국의 초대장이 도착했습니다',body:'세자르 3세의 서명이 있는 편지입니다. 학교 서쪽 다리를 건너 왕국으로 가세요.'},
  {id:'cardia',stage:62,from:'카디쟈',title:'감사의 편지',body:'소포 일을 도와줘서 고마웠어요. 작은 선물을 보냅니다.',gift:{ether:2,manastone:3}},
  {id:'kobi',stage:96,from:'코비',title:'마나스톤 교환 안내',body:'마나스톤 7개를 가져오면 강화 마나스톤 1개로 바꿔 드립니다. 강화 마나스톤 3개면 지팡이를 강화할 수 있어요.'},
  {id:'humphrey',stage:167,from:'험프리 촌장',title:'얼음 던전 출입 안내',body:'험프리가의 문장이 있는 사람만 동상 아래 얼음 문을 열 수 있습니다. 마을 밖 얼음 몬스터에게서 얼음조각 5개를 모아 오면 문장을 드리지요.'},
  {id:'barbara',stage:268,from:'바바라',title:'텔레포트 좌표',body:'세 마을 촌장에게 좌표를 받아 오면 내 항아리로 그 마을 앞까지 보내 줄게.'},
 ];
 return{ITEMS,DROPS,MAGIC_ATTACKERS,RANKS,RANK_LEVEL,SPELLS,SPELL,BASIC,AOE_STORY,TEACHERS,STATUS,PSK,PETS,PET,PET_SHOP,SHOPS,COLOSSEUM,QUIZ,LETTERS};
})();
