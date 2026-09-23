/* alicer.tistory.com/94: fifteen named species, one specimen each, 50 SP and metal shoes. */
window.ARPIA_CAPTURE_CATALOG=(()=>{
 const x=ARPIA_EXTRA,F=ARPIA_FREE,d=F.defs.find(d=>d.id==='aron_catalog');
 const species=['들쥐','나무토막','거미','뱀','늑대','곰 인형','떠돌이 용병','카우보이 인형','몬스터 버섯','웜','오크','골렘','아기 대지용','유령마','아이스 골렘'];
 const aliases={'곰인형':'곰 인형','카우보이인형':'카우보이 인형','버섯':'몬스터 버섯','지렁이':'웜','어린대지용':'아기 대지용','어린 대지용':'아기 대지용','골램':'골렘','아이스골렘':'아이스 골렘'};
 Object.assign(d,{kind:'chain',scene:'classroom',max:15,summary:'서로 다른 몬스터 15종의 표본을 한 마리씩 모아 아론에게 가져간다.'});
 Object.assign(x.defaults,{catalogMask:0,catalogVersion:0});
 const missing=s=>species.filter((_,i)=>!((s.catalogMask||0)&(1<<i)));
 const count=s=>15-missing(s).length;
 function migrate(s){if(s.catalogVersion===1)return;if(s.fm_aron_catalog===2&&s.catalogMask!==32767)s.fm_aron_catalog=1;s.catalogVersion=1;}
 const available=s=>!s.fm_aron_catalog&&s.stage>=d.minStage;
 const target=(s,e)=>e.id==='aron'&&s.scene===d.scene&&(available(s)||[1,2].includes(s.fm_aron_catalog));
 d.progress=s=>s.fm_aron_catalog===2?'아론에게 도감 표본 전달하기':count(s)+'/15종 · 남은 표본: '+missing(s).join(', ');
 const before=F.interact;F.interact=(e,a)=>{const s=a.state;migrate(s);if(!target(s,e))return before(e,a);
  if(available(s)){a.missionOffer(d.title,'aron','몬스터 도감을 만들려고 한다. 같은 몬스터만 잡아서는 서로 비교할 수 없겠지? 열다섯 종류를 한 마리씩 조사해 다오.',()=>{s.fm_aron_catalog=1;s.catalogMask=0;s.fc_aron_catalog=0;a.save();a.refresh();a.talk([['aron','필요한 몬스터는 미션 수첩에 적어 두었다. 학교 주변과 지하부터 둘러보거라.'],['you','다른 종인지 살펴보면서 기록할게요.'],['aron','용병과 카우보이는 용병단 근처, 유령마는 호수 주변, 아이스 골렘은 항구 쪽에서 찾아보렴.']]);});return true;}
  if(s.catalogMask!==32767){a.talk([['aron','아직 빠진 표본이 있구나. '+missing(s).join(', ')]]);return true;}
  a.talk([['aron','각각의 특징이 잘 드러나는 표본이구나. 이걸로 도감을 더 채울 수 있겠다.'],['you','겉모습이 비슷해도 움직이는 방식은 다르더라고요.'],['aron','잘 관찰했구나. 이 메탈 슈즈를 받아라. 다음 탐험에 도움이 될 게다.']],()=>{s.sp+=50;s.own_boots=true;s.fm_aron_catalog=9;s.fd_aron_catalog=(s.fd_aron_catalog||0)+1;a.save();a.refresh();a.toast('도감 표본 전달 완료 · 선행 점수 50 · 메탈 슈즈');});return true;
 };
 const victory=F.victory;F.victory=(s,b)=>{victory(s,b);migrate(s);if(s.fm_aron_catalog!==1||!b.spec?.repeatable)return;for(const e of b.enemies||[]){if(e.hp>0)continue;const i=species.indexOf(aliases[e.name]||e.name);if(i>=0)s.catalogMask|=1<<i;}s.fc_aron_catalog=count(s);if(s.catalogMask===32767)s.fm_aron_catalog=2;};
 const objective=F.objective,marker=F.marker;F.objective=(s,e)=>{migrate(s);return target(s,e)||objective(s,e);};F.marker=(s,e)=>{migrate(s);return target(s,e)?s.fm_aron_catalog===2?'?':'!':marker(s,e);};
 const decorate=x.decorate;x.decorate=(sc,s,n,p)=>{decorate(sc,s,n,p);migrate(s);if(sc.id===d.scene&&(available(s)||[1,2].includes(s.fm_aron_catalog))&&!sc.entities.some(e=>e.id==='aron'))sc.entities.push(n('aron',700,300));};
 return{species,aliases,missing,migrate};
})();
