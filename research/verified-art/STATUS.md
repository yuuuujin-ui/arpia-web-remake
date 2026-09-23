# Art correction — 2026-09-17

Appearance descriptions in ART-REQUESTS.md are superseded by the user's instruction: use names, locations and paths only. Do not regenerate placeholders with build_art_requests.py.

## Applied
- 2026-09-23: 버비·가르시아의 보존된 도트 스프라이트를 참고해 전신 투명 그림을 제작하고 필드·대화에 연결했다. 별도의 원작 초상화는 확인되지 않아 도트 기반 재구성으로 분류한다. 우디는 wonavy-186-29 원작 그림을 직접 연결했다. 배경이 포함된 원본 이미지이며 거부된 투명화 생성 작업을 우회하거나 재시도하지 않았다.
- 2026-09-23: 좀비 세자매의 단체 일러스트를 전투에서 첫째·둘째·셋째 각 부분으로 나누어 렌더링한다. 27·37화와 프리 미션의 적 세 명 모두 적용된다. 전투 중 기존 부유 동작은 유지되며 개별 프레임 애니메이션을 새로 생성한 것은 아니다.
- 2026-09-23: 누락된 고급 체력물약 아이콘을 기존 물약 도트 스타일로 만들었다. 사용 중인 아이템 67종·상태 15종·펫 21종의 기본/진화 대기·시전·피격 GIF 6종씩 경로를 검사해 누락 0개를 확인했다. 상태·이동 버튼·채집 그림은 이미 구현되어 있었다.
- 2026-09-23: 마이룸의 남은 여섯 가구(마법 화분·양탄자·등불·책장·포스터·찻주전자)를 투명 배경의 새 일러스트로 보완하고, 배치 슬롯과 상점·가방 아이콘에 연결했다. 기존 침대·책상과 원본 미니룸 화면의 색감을 참고했다. 여섯 물품의 원작 개별 디자인을 확인한 결과는 아니므로 재구성 그림으로 표시한다.
- 2026-09-23 status correction: Younger Quizpocket is already recreated in assets/midterm/younger.png and younger-large.png and wired by chapter17.js for chapters 17 and 21. Compared with wonavy-214-17.png: pink pouch, glasses and forehead 弟 retained; proportions are a generated approximation. Prompt: research/midterm-image-prompts.json.
- Six heroes, six expressions each (36 PNGs). Earth female completed first, with actual opening-dialogue screenshot verification. Pose consistency is approximate ImageGen output, not mathematically identical bodies.
- Explicit dialogue annotations; unannotated lines default neutral. This is not a claim that every episode has been exhaustively annotated.
- Confirmed fire designs now route through the shared hero portrait function for dialogue, HUD, save slots and naming.
- Ice male/female 4×4 directional walk sheets, preserving original illustration identity.
- Bani, Dick, Rie, Hubert and elder Quizpocket field art; zombie sisters are three bandaged mummies, not dress-wearing substitutes.
- Original miniroom bed and desk, ten equipment icons. Equipment is a recreation informed by the supplied inventory reference, not a verified exact tier-by-tier match. Two speculative hats were deliberately excluded.
- Live index.html loads art-revision.js. Backups: artifacts/before-art-revision-20260917.

## Sources
- https://wonavy.tistory.com/186 — NPC images
- https://wonavy.tistory.com/214 — younger Quizpocket (pink pouch, forehead 弟)
- https://alicer.tistory.com/153 — mummy sisters
- https://jsh6269.github.io/arpia-web/character.html — preservation archive
- Original local hero/worker/teacher portraits and map/미니룸.png
- User-supplied inventory screenshot
- Download URLs and generation manifests are stored alongside this file.

## Fidelity boundaries
- 우디는 원작 인물 이미지를 그대로 쓰기 때문에 배경도 함께 보인다. 버비·가르시아와 가구 6종은 고유 원작 초상화/개별 디자인을 확인한 복원이 아니라 보존된 스프라이트와 방 분위기를 따른 재구성이다.
- 추출된 별도 pet MP4 첫 프레임은 게임 자산으로 연결하지 않았다. 게임 펫은 이미 보존된 원작 GIF로 대기·진화·시전·피격 동작을 수행한다.
- 좀비 세자매 전투는 세 명을 구별해 그리지만 새 프레임 애니메이션은 만들지 않았다.

## Verification scope
Targeted image decoding, six hero opening dialogues and screenshots; no story changes and no full regression. Existing user saves were not modified (isolated browser profile).
