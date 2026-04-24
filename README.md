# 호원 2060 TANKer ON 특성화 플랫폼

호원대학교 RISE사업단 — **TANK + ANCHOR**로 지역 내 취·창업 앵커 정착을 향한 플랫폼.

> **슬로건**: 대학이 바뀌면 지역이 바뀐다 — 호원 2060 취·창업 탱커(TANK+ANCHOR) ON

---

## 🧭 플랫폼 개요

- **비전**: 전북 K-컬처 웰니스 평생교육 분야를 선도하는 글로컬 창의인재양성
- **목표**: 호원성취 POWER UP + 지역동행 인재양성 선도대학
- **TANK 4대 추진방향**: **T**alent · **A**ction · **N**etwork · **K**-Culture
- **+ ANCHOR**: 지역 정착 → **TANKer ON**

---

## 🗂 페이지 구성

| 경로 | 내용 |
|---|---|
| `/index.html` | 메인 — TANK 다이아몬드 비주얼, 슬로건, 비전·목표, POWERUP+ 7개 카드, 4트랙, 5추진계획, 10달성전략, 협력기관, 13세부활동 |
| `/pages/about.html` | 플랫폼 소개 — TANK 4요소 분해, 비전·목표·슬로건 |
| `/pages/powerup.html` | POWERUP+ 7대 핵심분야 (P·O·W·E·R·U·P+) |
| `/pages/tracks.html` | 4대 운영 트랙 / 8개 세부과제 |
| `/pages/strategy.html` | 5대 추진계획 + 10대 달성전략 + 13대 자율지표 세부활동 |
| `/pages/partners.html` | 유관 협력기관 + 대학 운영 부서 |
| `/pages/news.html` | 사업 소식 · 자료실 |

---

## 🛠 기술 스택

- **순수 HTML / CSS / JavaScript** (정적 사이트 — 빌드 단계 없음)
- **폰트**: KoddiUDOnGothic (Bold · Regular)
- **반응형**: 모바일·태블릿·데스크탑 대응
- **접근성**: ARIA 라벨, 키보드 네비게이션

## 📁 디렉터리 구조

```
tanker-platform/
├── index.html                       ← 메인
├── pages/                           ← 서브페이지
│   ├── about.html
│   ├── powerup.html
│   ├── tracks.html
│   ├── strategy.html
│   ├── partners.html
│   └── news.html
├── assets/
│   ├── css/style.css                ← 통합 스타일시트
│   ├── js/main.js                   ← 인터랙션
│   ├── fonts/                       ← KoddiUDOnGothic TTF
│   └── img/                         ← 이미지
├── netlify.toml                     ← Netlify 빌드·헤더·리다이렉트
├── vercel.json                      ← Vercel 빌드·헤더·리전(icn1)
├── _headers                         ← Netlify 정적 헤더
├── DEPLOY.md                        ← 배포 가이드
└── README.md
```

---

## 🚀 로컬 실행

```bash
# 방법 1 — http-server (Node)
npx http-server tanker-platform -p 5181 -c-1

# 방법 2 — Python
cd tanker-platform && python -m http.server 5181

# 방법 3 — Claude preview
# .claude/launch.json 의 "tanker" 항목 사용 → http://localhost:5181
```

---

## 🌐 배포

Netlify · Vercel **이중 배포** + 가비아 도메인. 자세한 절차는 [DEPLOY.md](./DEPLOY.md) 참고.

```bash
git add -A
git commit -m "feat: ..."
git push origin main
# → 1~3분 내 Netlify · Vercel 자동 배포
```

---

## 🎨 디자인 시스템

- **컬러 팔레트**: 딥네이비(`#0A2540`) + 틸(`#1C7293`) + 골드(`#F5B700`)
- **메타포**: 탱커(닻 + 바다)
- **타이포**: KoddiUDOnGothic — 한글 가독성 최적화
- **모듈**: section / hero / cards (powerup · track · strategy · activity · partner)

---

## 📜 라이선스

호원대학교 RISE사업단 내부 사용. 외부 활용 시 사전 협의.

---

## 🔗 관련 사이트

- [JB 로컬콘텐츠 창업가 양성 플랫폼](../jb-localcontent-platform/)
- [맛 Job Go 플랫폼](../matjobgo-platform/)
- [호원 RISE 성과관리 플랫폼](../성과관리플랫폼/)
