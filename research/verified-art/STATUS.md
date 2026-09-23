# Art correction — 2026-09-17

Appearance descriptions in ART-REQUESTS.md are superseded by the user's instruction: use names, locations and paths only. Do not regenerate placeholders with build_art_requests.py.

## Applied
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

## Pending — do not report complete
- Woody: original wooden-puppet reference found (wonavy-186-29.png), but image generator rejected two outputs. No usable replacement generated; do not retry to circumvent the rejection.
- Bubby and Garcia: appearance not verified. The newspaper image in wonavy-217-5.png is Cardia, not Bubby.
- Other item/status/navigation art and pet animation work remain pending original-reference review and generation. The six new furniture illustrations are reconstructions, not exact original-design matches.
- Uploaded pet MP4 first frames extracted; not integrated as hero animation.
- Zombie battle animation is still pending; new group is used for field/dialogue art only.

## Verification scope
Targeted image decoding, six hero opening dialogues and screenshots; no story changes and no full regression. Existing user saves were not modified (isolated browser profile).
