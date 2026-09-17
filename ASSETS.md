# 에셋 기록

## 보존된 원작 자료

`assets/original/`의 자료는 [jsh6269/arpia-web](https://github.com/jsh6269/arpia-web) 공개 보존 저장소에서 2026-09-10~11에 확보했습니다. 원작 아르피아 관련 그림의 출처를 기록한 것이며, 새로 만든 그림으로 주장하지 않습니다. 게임 코드에는 보존 사이트의 JavaScript, 추적 스크립트, Google Analytics를 포함하지 않았습니다.

개별 파일의 저장소 경로, 원본 주소, SHA-256 해시는 `research/asset-manifest.json`에 기록했습니다. 자료 확인용으로 내려받은 것 중 사용하지 않은 파일은 게임 패키지 밖 작업 폴더로 옮겼습니다.

주요 사용 파일:

- `map/학교 맵.png`, `map/학교내부 맵.png`: 학교 외부와 층별 실내 배경
- `map/불꽃마을.jpg`, `map/얼음마을.png`, `map/대지마을.png`: 세 고향
- `map/상점가.jpg`, `map/펫센터.jpg`, `map/미니룸.png`: 부가 장소
- `map/식당.png`, `map/지하 창고.png`, `map/지하 창고 2.png`, `map/학교 지하.png`: 제2화 탐험
- `map/오당카.png`, `map/오당카의 오두막.png`: 떡갈나무 숲과 오두막
- `map/데런왕국.jpg`, `map/마법사의 도시.jpg`: 제3화 여행
- `background/title.png`: 원작 로고
- `background/dungeon1.png`, `background/colosseum.png`: 숲과 전투 배경
- `character/hero/`: 여섯 원작 선택·대화 초상화
- `character/friend/`, `character/teacher/`, `character/other/`: NPC 대화 그림
- `animation/`: 쇼우, 케스노, 미나, 스콜, 칠리, 조지, 아이작, 아론, 오당카, 시바, 에드워드의 원작 GIF
- `pet-images/`: 불꽃·얼음·대지 정령, 나무 인형, 아기독수리 GIF

## 이미지 생성 도구로 새로 만든 자료

OpenAI 내장 `image_gen` 도구를 사용했습니다. CLI/API 키 방식은 사용하지 않았습니다.

| 파일 | 용도 |
|---|---|
| `assets/title-generated.png` | 학교를 바라보는 세 마법사의 타이틀 배경 |
| `assets/hero-atlas.png` | 이전 버전 6종 시트. 참고·보관용이며 현재 필드 렌더링에는 사용하지 않음 |
| `assets/nav-atlas.png` | 정보·지도·가방·미션·마법·마이룸의 채색된 메뉴 버튼 여섯 개 |
| `assets/shiva-flight.png` | 시바와 아기독수리의 학교 귀환 장면 및 제2화 완료 삽화 |
| `assets/royal-atlas.png` | 원작 초상화를 참고한 마틸다·세자르·콘라드 필드 그림 |
| `assets/royal-data.js` | 로컬 파일에서도 새 NPC 시트를 합성하는 base64 포장본 |
| `assets/atlas-data.js` | 로컬 파일 환경에서 스프라이트 시트를 읽기 위한 base64 포장본 |

이미지 생성 과정에서 두 차례 투명 배경 출력이 얻어지지 않아, 최종 스프라이트는 단색 자홍색 배경으로 생성했습니다. 게임 엔진이 이를 크로마키로 합성합니다. 0.6에서는 별도 생성한 6종의 4방향 걷기 시트로 교체했습니다. 각 방향에 서로 다른 다리·팔 자세 4프레임이 있습니다. 게임은 크로마키를 제거하고 발 위치를 맞춘 뒤 작은 픽셀 크기로 렌더링합니다.

최종 사용 이미지의 정확한 프롬프트는 `research/image-prompts.json`에 보관했습니다. 채택하지 않은 콘셉트 시트는 실행본에 참조하지 않습니다.

## 새로 작성한 요소

게임 코드, 한국어 대사, UI 스타일, 저장 기능, 수업 퀴즈, 전투 수치와 합성 음악은 이번 구현을 위해 작성했습니다. 로컬 실행 중 외부 서버로 요청하거나 데이터를 전송하지 않습니다. 자료 링크를 직접 누르는 경우에만 외부 페이지가 열립니다.

하단 버튼의 그림 자체는 생성한 PNG이며, CSS는 시트에서 해당 그림을 보여 주고 배치·테두리·선택 효과를 적용합니다. 새 NPC 시트도 게임 엔진에서 자홍색 배경을 제거해 표시합니다. 시바 삽화는 모든 주인공 선택에서 함께 쓰는 상징적 장면으로, 특정 주인공의 모습은 그리지 않았습니다.

## 0.6 추가 자료

- `assets/walk/`: 여섯 캐릭터의 4×4 생성 PNG. 불꽃 남녀만 사용자 첨부 콘셉트의 디자인을 반영했습니다. 얼음 남자의 안경을 보완한 `ice-male-v2.png`가 실행용이고 처음 시트는 보관용입니다.
- `assets/walk-data.js`: 여섯 실행용 PNG의 로컬용 base64 포장. 정확한 프롬프트는 `research/walk-prompts.json`입니다.
- `assets/underground-atlas.png`, `underground-data.js`: 제4화 코볼트·전갈·초승달 돌문을 생성한 시트와 로컬 포장. 프롬프트는 `research/episode4-prompt.json`입니다.
- 원작 추가 지도 5종: 건강센터, 화장실, 보일러실, 마법 재료실, 난쟁이 광산. 추가 NPC: 히나·발디·더글라스·머피.
- 세 속성 정령의 `moveFront1.gif`, `moveBack1.gif`, `back1.gif`, `stand1.gif`를 원작 공개 자료에서 추가했습니다. 기존 옆 이동 GIF와 함께 사용합니다.

걷기와 정령의 추적 코드는 새 구현입니다. 원작의 정확한 프레임 타이밍이나 경로 알고리즘을 복원한 것은 아닙니다. 기존 초상화·타이틀·하단 메뉴·지도 파일은 이번 이동 개선에서 변경하지 않았습니다.

## 0.7 추가 자료와 확인

원작 선택 화면은 [보존 저장소 wallpaper](https://github.com/jsh6269/arpia-web/tree/main/wallpaper)의 종족·성별 선택창 JPG 6장을 사용했습니다. 원작 화면 위 버튼 위치에 투명한 HTML 버튼을 연결했으며 키보드 포커스와 접근성 이름을 추가했습니다. [주인공 소개 기록](https://wonavy.tistory.com/183)도 비교했습니다.

새 이미지: `assets/walk/earth-male-v2.png`, `earth-female-v2.png`는 원작 일러스트를 참고해 이미지 생성 도구로 만든 4방향×4프레임입니다. `assets/selection/name-book.png`는 원작 선택창을 참고해 생성한 빈 책 배경입니다. 정확한 프롬프트는 `research/selection-v7-prompts.json`에 보관했습니다. 불꽃·얼음 캐릭터와 기존 초상화·게임 지도·하단 메뉴 이미지는 변경하지 않았습니다.

## 0.8 제5화와 반복 조우 · 2026-09-14

[제5화 플레이 기록](https://wonavy.tistory.com/206)을 바탕으로 마틸다의 편지, 카디쟈의 소포, 요구르트 구매자 조사, 님펜의 마법 가루, 광산·아수리아 검 비교와 마지막 방문을 연결했습니다. 대사는 새로 썼으며 아멜라의 확인 단계와 검사 선택지는 이 버전의 추가 구성입니다. 원작 대사를 전부 옮기지 않았습니다.

님펜·아수리아 지도, 나오미·레오나 필드 그림, 애플링·게·그림자 몬스터 그림은 보존 저장소의 자료입니다. 출처·해시는 `research/asset-manifest.json`에 기록했습니다. 카디쟈 초상화는 위 플레이 기록의 공개 이미지를 사용했습니다. 카디쟈와 국왕의 필드 그림(`assets/chapter5-npcs.png`), 집 배경(`assets/cardia-study.png`)은 원작 레퍼런스를 참고해 OpenAI 내장 이미지 생성 도구로 제작했습니다. 정확한 생성 프롬프트는 `research/chapter5-prompts.json`, 이미지 출처·해시는 `research/chapter5-manifest.json`에 있습니다. 필드 그림은 오프라인 Canvas에서 사용하도록 `assets/story-data.js`에도 포함했습니다.

반복 조우의 네 구역, 이동 경로, 적 편성, 보상, 승리 후 45초·도망 후 12초 재등장, 진입 보호 시간은 새 코드와 수치입니다. 실제 이동 중 보이는 몬스터 구름과 접촉해 전투에 들어가며, 반복 승리는 이야기 단계를 진행시키지 않습니다. 전투는 기존 행동 게이지·속성·정령 시스템을 사용합니다. 원작의 조우 확률, 적 전체 데이터, 정확한 전투 수식과 동일하다고 주장하지 않습니다.

## 0.9 제6화 · 비밀의 열쇠

제5화 이후 학교 2층 줄리아에게 보고하면 시작합니다. 모리스 → 지하 통로 동쪽 궤짝 → 나오미 → 모리스 → 학교 북동쪽 독수리 마을 → 시바·가루다 → 마을 동쪽 폭포 길 → 도비엘·쟈칼 → 광산 스콜·발디 → 코볼트 → 장작 복도의 숯 순서입니다. 열쇠·엽서·숯은 가방과 저장에 남습니다. 광산 내부 탐사는 다음 제7화입니다.

원작 사건 개요: https://wonavy.tistory.com/207 . 대사·선택 퍼즐·지도 연결은 새 구성입니다. 독수리 마을과 가루다·도비엘·쟈칼 GIF는 보존 저장소 원본을 사용했습니다. 폭포 원작 배경은 확보하지 못해 내장 이미지 생성으로 `assets/jackal-waterfall.png`를 제작했습니다. 정확한 프롬프트: `research/chapter6-prompts.json`. 쟈칼은 이야기 장소에 합류하는 NPC이며 이번 버전에서 이동 동행·전투 지원은 추가하지 않았습니다.

## 1.1 제7–11화 추가 자료

- 보존 저장소 원본: 도서관, 쥬다 항구, 큐리어스 저택, 세 속성 마을 지도와 소피아·멜리·압둘라·에스타·글루글루·료마·안토니오·샤이아 GIF.
- 내장 이미지 생성: `dwarf-mine-depths.png`, `guillaume.png`, `forgotten-palace.png`, `rainbow-worm.png`, `silent-sword.png`, `joker.png`, `white-wolf.png`, `queen-spider.png`.
- 위 생성 파일의 정확한 프롬프트와 모드는 `research/chapter7-11-prompts.json`에 기록했습니다. 모두 OpenAI 내장 이미지 생성 기능을 사용했습니다.
- 제7–9화 사건 개요: https://wonavy.tistory.com/207, https://wonavy.tistory.com/208
- 제10–11화 사건 개요: https://wonavy.tistory.com/209

원작 실행용 충돌 데이터, 전체 대사, 전투 수식은 확보하지 못했습니다. 배경 위 이동 그래프, 선택 퍼즐, 대사, 전투 수치와 보상은 이 재구성에서 새로 작성했습니다.
