function buildReviews() {
  const regions = ['마포구','강남구','송파구','서초구','강서구','노원구','성동구','영등포구','은평구','관악구','인천 미추홀구','인천 연수구','부천시','고양 일산','성남 분당','수원 영통','용인 수지','안양시','김포시','하남시','광명시','남양주시','의정부시','화성 동탄','시흥시'];
  const pyeongs = ['24평','25평','29평','32평','33평','34평','38평','41평','45평','49평','18평','52평'];
  const nicks = ['깔끔한새집','민트초코','포근한하루','봄날햇살','정리왕','반짝창문','김O영','이O준','박O은','최O호','정O아','강O수','조O미','윤O래','장O빈','임O설','한O진','오O규','서O연','신O우','권O하','황O름','안O결','송O찬','류O나','문O경','배O림','백O호','유O정','전O우','고O은','하O수','노O아','심O빈','구O현','명랑주부','새출발','우리집최고','청소요정','반려집사','두아이맘','신혼J','살림구단','미니멀리','햇살가득','깨끗한아침','정갈한손','포근홈','러블리홈','굿모닝','제니맘','토리대디','해피니스','블루문','슈가맘'];
  const subj = ['신축 아파트 입주 전에 맡겼는데','이사 앞두고 급하게 예약했는데','새 집 잔금 치르고 바로 신청했어요.','인테리어 마감 후 분진이 걱정돼 맡겼는데','오피스텔 입주청소로 이용했는데','아파트 확장형이라 걱정했지만','첫 내 집 마련이라 신경 써서 골랐는데','전세 재계약으로 대청소 맡겼는데','부모님 새 아파트 선물로 예약했는데','복층 구조라 까다로웠을 텐데','반전세 이사와 함께 맡겼는데','리모델링 끝나고 신청했는데'];
  const praise = ['창틀과 새시 구석 먼지 하나 없이','주방 기름때와 후드까지 싹','화장실 물때·석회질이 완전히','베란다 시멘트·페인트 자국까지','바닥에 광이 날 정도로','유리창이 비칠 만큼 깨끗하게','붙박이장 안쪽까지','싱크대 밑 곰팡이 흔적까지','도배 풀자국과 스티커 자국까지','문틀과 걸레받이까지','조명·환풍구 먼지까지','현관·타일 줄눈까지','실리콘 곰팡이 자국까지','거실 몰딩 위 먼지까지'];
  const service = ['팀장님이 꼼꼼히 체크하며 진행해주셨어요.','시간 약속을 정확히 지켜주셔서 좋았어요.','친환경 세제라 아이 키우는 집도 안심됐습니다.','결과를 함께 확인하고 결제해서 믿음이 갔어요.','빠진 곳 없이 검수까지 확실했습니다.','견적이 투명해서 추가금 걱정이 없었어요.','응대가 친절하고 전문적이었습니다.','독일 타나세제라 확실히 다르더라고요.','작업 후 정리정돈까지 완벽했어요.','전후 사진을 보여주셔서 신뢰가 갔어요.','재청소 요청도 흔쾌히 해주셨어요.','위생 장비 착용 등 배려가 느껴졌어요.'];
  const closer = ['강력 추천합니다!','다음에도 꼭 부탁드릴게요.','지인들에게도 소개했어요.','재이용 의사 100%입니다.','믿고 맡기셔도 됩니다.','후회 없는 선택이었어요.','비용이 전혀 아깝지 않았습니다.','별 다섯도 부족해요.','입주청소는 여기가 정답이에요.','완전 만족합니다.'];
  const out = [];
  for (let i = 0; i < 100; i++) {
    const star = i % 11 === 0 ? 4 : 5;
    const region = regions[(i * 2) % regions.length];
    const py = pyeongs[(i * 5) % pyeongs.length];
    const nick = nicks[i % nicks.length];
    const m = 5 + (i % 3);
    const d = 1 + ((i * 7) % 28);
    out.push({
      stars: '★★★★★'.slice(0, star),
      text: `${subj[i % subj.length]} ${praise[(i * 3) % praise.length]} 처리해주셔서 만족스러웠어요. ${service[(i * 5) % service.length]} ${closer[(i * 7) % closer.length]}`,
      nick,
      initial: nick.charAt(0),
      region: `${region} · ${py}`,
      date: `2026.0${m}.${String(d).padStart(2, '0')}`,
    });
  }
  return out;
}

function cardHtml(r) {
  return `<div style="flex:0 0 300px; background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.22); backdrop-filter:blur(12px); border-radius:16px; padding:22px 22px 18px;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;"><span style="color:#E53935; letter-spacing:2px; font-size:.92rem;">${r.stars}</span><span style="color:rgba(255,255,255,0.4); font-size:.74rem;">${r.date}</span></div>
    <p style="color:rgba(255,255,255,0.84); font-size:.9rem; line-height:1.65; font-weight:300; margin-bottom:16px;">${r.text}</p>
    <div style="display:flex; align-items:center; gap:10px; padding-top:14px; border-top:1px solid rgba(255,255,255,0.08);">
      <span style="width:34px; height:34px; border-radius:50%; background:#B71C1C; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:.85rem;">${r.initial}</span>
      <div><div style="color:#fff; font-weight:600; font-size:.84rem;">${r.nick}</div><div style="color:rgba(255,255,255,0.5); font-size:.74rem;">${r.region}</div></div>
    </div>
  </div>`;
}

export function initReviews() {
  const all = buildReviews().slice(0, 30); // 1줄이므로 개수를 줄여서 부드럽게 돌아가도록 설정 (무한 복제되므로 30개로 충분함)
  
  document.querySelectorAll('[data-rev-row]').forEach((container) => {
    const data = [...all, ...all]; // 무한 롤링을 위해 2번 반복
    container.innerHTML = data.map(cardHtml).join('');
  });

  document.querySelectorAll('[data-rev-track]').forEach((t) => {
    t.addEventListener('mouseenter', () => { t.style.animationPlayState = 'paused'; });
    t.addEventListener('mouseleave', () => { t.style.animationPlayState = 'running'; });
  });
}
