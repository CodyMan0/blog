# 기여 그래프 대시보드 — "이주영의 기여 지도"

## 컨셉

GitHub 잔디처럼 생긴 히트맵이지만, 각 셀이 "코드 커밋"이 아니라 **사람에게 기여한 것들**을 나타내는 개인 대시보드.
따뜻한 내추럴 톤(베이지/크림/앰버)으로, 채용 담당자에게는 "이 사람 뭔가 다르다"를, 본인에게는 성장 셀프 리뷰를 제공.

---

## 타겟 & 스택

- **타겟**: 채용 담당자/면접관 + 셀프 리뷰
- **스택**: Next.js 15 (App Router) + D3.js + TailwindCSS + Framer Motion
- **디자인**: 따뜻한 내추럴 (베이지/크림 배경, 앰버~테라코타 포인트)
- **배포**: Vercel
- **프로젝트 위치**: `/Users/juyoung/Desktop/my-work/contribution-dashboard`

---

## 페이지 구성 (Single Page, 섹션 스크롤)

### 섹션 1: Hero — "나는 기여하는 사람입니다"
- 프로필 사진 + 한 줄 소개
- 핵심 수치 3개 애니메이션 카운터:
  - `17개월` 회고 기록
  - `32개` 기능 배포 (CRM)
  - `7.5x` SEO 클릭 증가
- 부드러운 스크롤 다운 유도

### 섹션 2: 기여 히트맵 (메인)
- **GitHub 잔디 스타일 히트맵** (D3.js)
- X축: 월 (2024.07 ~ 2026.03, 17개월+)
- Y축: 기여 카테고리 3행
  - 🟠 **업무 성과** — 정량적 임팩트 (LCP 50%↓, 리포트 99.6%↓ 등)
  - 🟡 **사람 영향** — 멘토링, Git 세션, QA 프로세스 개선
  - 🟢 **개인 성장** — 학습, 운동, 독서, 신앙
- 셀 색상 강도 = 기여 밀도 (따뜻한 톤: 연크림 → 앰버 → 테라코타)
- **셀 클릭 → 모달**: 해당 월의 기여 상세 카드
  - 제목, 설명, 정량 수치, 태그
  - 관련 회고 링크

### 섹션 3: 임팩트 타임라인
- **수평 타임라인** (D3.js + Framer Motion)
- 커리어 구간별 색상 밴드:
  - 광야기 (2022~2024.06) — 회색/안개
  - 퓨쳐리즘랩스 (2024.06~2025.07) — 연앰버
  - 오픈닥터 (2025.07~현재) — 진앰버
- 마일스톤 노드: 클릭하면 상세 팝업
  - "서류 200곳 지원", "멘토 만남", "첫 입사", "리포트 자동화 출시" 등
- 스크롤 트리거 애니메이션: 구간 진입 시 노드가 순차적으로 나타남

### 섹션 4: 스킬 레이더 & 성장 곡선
- **레이더 차트** (D3.js): 현재 역량 6축
  - Frontend, Backend, DevOps, Communication, Product Thinking, Security
- **성장 곡선 라인 차트**: 월별 종합 기여도 추이
  - 피크: 2025-03 (항해 수료), 2025-11 (SEO 7.5x), 2026-01 (CRM 완성)

### 섹션 5: 기여 카드 갤러리
- **핵심 기여 6~8개를 카드 형태로 배치**
- 각 카드:
  - 아이콘 + 제목 (예: "리포트 자동화")
  - Before → After 수치
  - 한 줄 설명
  - 카테고리 태그 (업무/사람/성장)
- 호버 시 카드 살짝 들어올리는 애니메이션

### 섹션 6: 나의 원칙 (Footer)
- 핵심 정체성 키워드 3개:
  - "기여 중심적 사고"
  - "고객의 불편을 발견하고 해결하는 과정"
  - "넘어져도 다시 일어나는 회복력"
- 연락처 / GitHub / 블로그 링크

---

## 데이터 구조

```typescript
// 기여 데이터
interface Contribution {
  id: string;
  month: string;           // "2025-01"
  category: "work" | "people" | "growth";
  title: string;
  description: string;
  metrics?: {
    before?: string;
    after?: string;
    improvement?: string;  // "99.6%↓"
  };
  tags: string[];
  intensity: 1 | 2 | 3 | 4;  // 히트맵 색상 강도
  company?: "futurism" | "opendoctor";
}

// 타임라인 마일스톤
interface Milestone {
  date: string;
  title: string;
  description: string;
  type: "struggle" | "breakthrough" | "achievement";
  emoji: string;
}

// 스킬 레이더
interface SkillRadar {
  axis: string;
  value: number;  // 0~100
}
```

**데이터 소스**: 회고 17편 + 옵시디언 커리어 노트에서 추출하여 JSON으로 정적 번들링

---

## 디자인 토큰

```css
/* 컬러 팔레트 — 따뜻한 내추럴 */
--bg-primary: #FDF8F0;       /* 크림 화이트 */
--bg-secondary: #F5EDE3;     /* 연베이지 */
--text-primary: #2C2418;     /* 다크 브라운 */
--text-secondary: #6B5B4D;   /* 미디엄 브라운 */
--accent-light: #F5D5A0;     /* 연앰버 */
--accent-medium: #E8A849;    /* 앰버 */
--accent-strong: #C4622D;    /* 테라코타 */
--accent-deep: #8B3A1F;      /* 딥 테라코타 */
--growth-green: #7A9E6D;     /* 세이지 그린 */
--people-gold: #D4A84B;      /* 골드 */
--card-bg: #FFFFFF;
--card-border: #E8DDD0;
--heatmap-empty: #F0E8DC;    /* 히트맵 빈 셀 */

/* 타이포 */
--font-heading: 'Pretendard', sans-serif;
--font-body: 'Pretendard', sans-serif;
--font-mono: 'JetBrains Mono', monospace;  /* 수치 표시용 */
```

---

## 태스크 분해

### Phase 1: 프로젝트 셋업 (Task 1-2)
1. **Next.js 프로젝트 생성** — App Router, TypeScript, TailwindCSS, Framer Motion
2. **디자인 토큰 & 레이아웃** — 글로벌 스타일, 폰트, 컬러 시스템

### Phase 2: 데이터 구축 (Task 3-4)
3. **기여 데이터 JSON 작성** — 회고 17편 + 커리어 노트에서 추출
4. **타임라인 & 스킬 데이터** — 마일스톤, 레이더 차트 데이터

### Phase 3: 핵심 UI (Task 5-8)
5. **Hero 섹션** — 프로필, 카운터 애니메이션
6. **기여 히트맵** — D3.js 히트맵 + 클릭 모달
7. **임팩트 타임라인** — D3.js 수평 타임라인 + 스크롤 애니메이션
8. **스킬 레이더 & 성장 곡선** — D3.js 레이더 + 라인 차트

### Phase 4: 보조 UI (Task 9-10)
9. **기여 카드 갤러리** — 카드 컴포넌트 + 호버 애니메이션
10. **나의 원칙 Footer** — 키워드 + 링크

### Phase 5: 마무리 (Task 11-12)
11. **반응형 & 애니메이션 폴리시** — 모바일 대응, 스크롤 트리거
12. **Vercel 배포 준비** — 메타데이터, OG 이미지, 최종 점검

---

## 독특한 포인트 (차별화)

1. **"기여"라는 프레임**: 기술 스킬이 아니라 "이 사람이 주변에 어떤 영향을 주었나"를 보여줌
2. **히트맵 → 스토리**: GitHub 잔디처럼 익숙한 형태지만, 클릭하면 사람 이야기가 나옴
3. **정량 + 정성**: "480분→2분" 같은 숫자와 "동료의 야근을 줄이고 싶었다" 같은 맥락이 공존
4. **광야기 포함**: 실패와 고난을 숨기지 않고, 회색 구간으로 시각화하여 회복력을 보여줌
5. **따뜻한 톤**: 차가운 개발자 포트폴리오가 아닌, 사람 냄새나는 대시보드
