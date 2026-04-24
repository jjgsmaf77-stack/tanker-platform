# 호원 2060 TANKer ON · 외부 배포 구성

호원대학교 RISE사업단 특성화 플랫폼.
**`matjobgo.co.kr` 과 동일한 이중 배포 아키텍처** (GitHub + Netlify + Vercel + 가비아).

---

## 🌐 배포 구성 개요

### 1. 소스 저장소 (GitHub)
```
github.com/<owner>/tanker-platform
```
- `main` 브랜치 push → Netlify / Vercel 자동 감지 → 배포
- PR push → Preview 배포 (커밋별 개별 URL)

### 2. 호스팅 플랫폼 (이중 구성)

Netlify와 Vercel **양쪽 모두 설정 완료**. 어느 쪽이든 원-클릭 배포.

#### 🅰️ Netlify — `netlify.toml`
```toml
[build]
  command = "echo 'Static site — no build step required'"
  publish = "."
```
- 정적 사이트 — 빌드 불필요
- 보안 헤더: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `HSTS`
- 404 폴백: `/index.html`

#### 🅱️ Vercel — `vercel.json`
```json
{
  "cleanUrls": true,
  "outputDirectory": ".",
  "regions": ["icn1"]
}
```
- 서울 리전(`icn1`) 고정 — 한국 사용자 응답 속도 최적화
- Clean URL + 동일한 보안 헤더

### 3. 커스텀 도메인 (예시)
```
tankeron.co.kr            ← 메인 (가비아 등록)
www.tankeron.co.kr        ← www 서브 → main 으로 301 리다이렉트
```
- 가비아 DNS 관리에서 CNAME 등록
- Let's Encrypt SSL 자동 발급 (Netlify · Vercel 양쪽 모두 자동)

> 도메인 미등록 시: `tanker-platform.netlify.app` / `tanker-platform.vercel.app` 무료 서브도메인 사용 가능.

### 4. 캐시 · MIME 헤더 (`_headers`)

| 대상 | 캐시 전략 |
|---|---|
| HTML · `/` | **1시간** (`max-age=3600`) — 콘텐츠 갱신 빠르게 반영 |
| JS · CSS | **1일** (`max-age=86400`) + UTF-8 명시 |
| 이미지 (jpg/png/svg) | **7일** (`max-age=604800`) |
| 폰트 (woff2/ttf) | **1년 immutable** |

### 5. 빌드 파이프라인

```
[로컬]
  git add -A
  git commit -m "feat: ..."
  git push origin main
    ↓
[GitHub]
  새 커밋 이벤트
    ↓
[Netlify / Vercel]
  (1) 저장소 fetch
  (2) 정적 파일 검증 (빌드 불필요)
  (3) CDN 에 업로드
  (4) 이전 배포 → 롤백 가능 상태로 보존
  (5) 새 배포 promote → tankeron.co.kr 반영
    ↓
[전 세계 사용자]
  1~2분 내 새 버전 접근 가능
```

---

## 🚀 초기 배포 단계

### [1단계] GitHub 레포 push (3분)
```bash
cd "tanker-platform"

# git 초기화
git init
git add -A
git commit -m "feat: 호원 2060 TANKer ON 특성화 플랫폼 초기 배포"

# GitHub CLI 로그인 (PAT 필요)
gh auth login --with-token < /c/Users/howon/gh_token.txt

# 레포 생성 + push
gh repo create tanker-platform --public --source=. --remote=origin --push
```

### [2단계-A] Netlify 연결 (옵션 A)
1. https://netlify.com → **Sign up with GitHub**
2. **Add new site** → **Import an existing project** → GitHub → `tanker-platform` 선택
3. 빌드 설정 자동 감지됨 (netlify.toml 기반)
4. **Deploy site** 클릭
5. 배포 완료 후 URL: `https://tanker-platform.netlify.app`

### [2단계-B] Vercel 연결 (옵션 B · 둘 다 가능)
1. https://vercel.com → **Sign up with GitHub**
2. **Add New Project** → `tanker-platform` Import
3. Framework Preset: **Other** (정적)
4. Build Command 비움 / Output Directory: `.`
5. **Deploy** 클릭
6. URL: `https://tanker-platform.vercel.app`

### [3단계] 가비아 DNS 연결 (3분, 옵션)
가비아 My페이지 → `tankeron.co.kr` → **DNS 관리**:

**Netlify 사용 시**:
```
호스트    타입     값
@         ALIAS    apex-loadbalancer.netlify.com
www       CNAME    <your-site>.netlify.app
```

**Vercel 사용 시**:
```
호스트    타입     값
@         A        76.76.21.21
www       CNAME    cname.vercel-dns.com
```

Netlify/Vercel 대시보드 → Domains → Add custom domain → `tankeron.co.kr` 입력 →
안내되는 정확한 레코드 값으로 가비아에 등록.

### [4단계] DNS 전파 대기 + SSL 자동 발급
- 전파: 15분 ~ 24시간
- SSL: Let's Encrypt 자동 (90일 자동 갱신)
- 확인: `nslookup tankeron.co.kr` · 브라우저에서 https:// 확인

---

## 🔄 향후 업데이트는 push 한 번

```bash
git add -A
git commit -m "feat: 트랙별 모집 공고 추가"
git push origin main
```

1~2분 내:
- Netlify → `tanker-platform.netlify.app` 업데이트
- Vercel → `tankeron.co.kr` 반영

---

## 📁 배포 관련 파일 구조

```
tanker-platform/
├── netlify.toml              ← Netlify 빌드·헤더·리다이렉트
├── vercel.json               ← Vercel 빌드·헤더·리전
├── _headers                  ← Netlify 정적 헤더
├── README.md                 ← 프로젝트 소개
└── DEPLOY.md                 ← 이 문서
```

---

## 🆘 트러블슈팅

### 한글 폰트가 깨짐
- `assets/fonts/` 의 TTF 파일이 함께 push 됐는지 확인 (`git ls-files assets/fonts/`)
- `_headers` 의 `/*.ttf` 캐시 정책이 적용됐는지 확인

### 페이지 새로고침 시 404
- `netlify.toml` 의 `[[redirects]]` (404 → /index.html) 가 활성화됐는지 확인
- Vercel은 `cleanUrls: true` 가 설정되어 있어 자동 처리

### 도메인 안 붙음
- DNS 전파 `nslookup tankeron.co.kr` 로 확인
- Netlify/Vercel "Verify" 재시도
- 가비아 DNS 반영 대기 (최대 24시간)

### 미리보기는 되는데 본 사이트는 캐시 이슈
- 브라우저 강력 새로고침 (Ctrl+Shift+R)
- Netlify → **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

---

## 💰 예상 운영 비용 (3개년)

| 항목 | 플랜 | 월 | 3년 |
|---|---|---|---|
| 가비아 도메인 `.co.kr` | — | — | 66,000원 |
| Netlify | Free | 0원 | 0원 |
| Vercel | Hobby | 0원 | 0원 |
| **합계** | | **0원** | **66,000원** |

정적 사이트라 서버·DB 비용 없음. 무료 티어로 트래픽 100GB+/월 커버.

---

## ✅ 이 구성의 장점

- **관리 불필요**: 서버 패치 · SSL 갱신 · 백업 모두 자동
- **이중화**: Netlify/Vercel 둘 다 설정되어 있어 한쪽 장애 시 대체 가능
- **Git 중심**: 버전 관리 + 롤백 모두 GitHub 에서
- **미리보기**: PR마다 고유 URL 자동 생성 → 리뷰 편리
- **전 세계 CDN**: 아시아 · 미국 · 유럽 edge 자동 캐시
- **보안**: HSTS · XSS · 클릭재킹 방지 헤더 기본
- **빌드 없음**: 정적 HTML이라 배포 시간 30초 미만
