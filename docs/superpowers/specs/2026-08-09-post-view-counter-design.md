# 글별 조회수·좋아요·댓글 설계

- 날짜: 2026-08-09
- 상태: 승인됨
- 목적: 블로그 각 글에 조회수를 세고 표시한다. Next.js route handler + Supabase로 직접 구현 (백엔드 학습 겸).

## 결정 사항

| 항목 | 결정 |
| --- | --- |
| 범위 | 글별 조회수 표시만. 통계 대시보드·유입 분석은 제외 (후속 확장) |
| DB | 기존 COS Supabase 프로젝트 재사용 (사용자 확정). 블로그에는 **anon key만** 사용 — service_role 금지 |
| 테이블 | `blog_post_views(slug text pk, count bigint default 0, updated_at)` — COS 테이블과 구분되는 `blog_` 접두사 |
| 쓰기 경로 | RLS로 직접 쓰기 전부 차단. 증가는 `increment_post_view(p_slug)` security definer 함수(RPC)로만 |
| 읽기 경로 | select는 anon 허용 (공개 수치) |
| API | `app/api/views/[slug]/route.ts` — POST: slug 존재 검증(getPostSlugs) 후 RPC 증가, GET: 현재 count. 없는 slug는 404 (쓰레기 row 방지) |
| 클라이언트 | `ViewCounter` 클라 컴포넌트 — 글 헤더 "N분 읽기" 옆에 `조회 N` / `N views`. 마운트 시 POST 1회 |
| 중복 방지 | sessionStorage 가드 — 같은 브라우저 세션에서 같은 글 +1은 한 번만. 이미 본 글은 GET으로 조회만 |
| 표시 실패 시 | 숫자 미표시 (깨진 UI 없음). SSG 페이지라 조회수는 하이드레이션 후 표시 |
| 집계 단위 | slug 기준 — ko/en 합산 |
| env | `SUPABASE_URL`, `SUPABASE_ANON_KEY` (`.env.local` + Vercel). `NEXT_PUBLIC_` 접두사 쓰지 않음 — 서버 route에서만 접근 |

## 데이터 흐름

글 페이지 로드 → ViewCounter 마운트 → sessionStorage 확인
→ (처음이면) POST /api/views/[slug] → slug 검증 → supabase.rpc(increment_post_view) → count 반환
→ (이미 봤으면) GET /api/views/[slug] → count 반환
→ "조회 N" 렌더

## 보안 경계

- 블로그 서버는 anon key만 보유 — COS 테이블은 각자 RLS(auth.uid())로 보호되므로 anon으로 접근 불가
- blog_post_views는 anon select만 열림. insert/update/delete 정책 없음
- 카운터 조작 가능성: RPC를 반복 호출하면 +1 스팸 가능 — 개인 블로그 수준에서 수용 (rate limit은 YAGNI)

## SQL (Supabase에 적용)

```sql
create table if not exists blog_post_views (
  slug text primary key,
  count bigint not null default 0,
  updated_at timestamptz not null default now()
);

alter table blog_post_views enable row level security;

create policy "blog views public read"
  on blog_post_views for select using (true);

create or replace function increment_post_view(p_slug text)
returns bigint
language sql
security definer
set search_path = public
as $$
  insert into blog_post_views (slug, count)
  values (p_slug, 1)
  on conflict (slug)
  do update set count = blog_post_views.count + 1, updated_at = now()
  returning count;
$$;
```

## 확장 1: 좋아요 (같은 날 추가, 사용자 승인)

- `blog_post_likes(slug pk, count, updated_at)` + RLS(select만 공개)
- RPC `change_post_like(p_slug, p_delta)` — **delta는 부호만 반영(±1 클램프), 0 미만 불가** → anon이 직접 호출해도 대량 조작 불가
- API `app/api/likes/[slug]/route.ts` — GET/POST(delta는 1|-1만, 그 외 400)
- UI `components/like-button.tsx` — 글 최하단 하트 토글, localStorage로 브라우저 기준 기억, 낙관적 업데이트+실패 롤백

## 확장 2: 익명 댓글 (같은 날 추가, 사용자 선택 = giscus 대신 자체 구현)

- `blog_comments(id uuid, slug, nickname ≤20, content ≤1000, password_hash, is_hidden, created_at)` — 길이는 DB check 제약 + 서버 이중 검증
- **비밀번호 방식 수정·삭제**: 작성 시 비밀번호(4~50자) → bcrypt(pgcrypto `crypt`) 해시 저장. 수정/삭제는 security definer RPC(`add/update/delete_blog_comment`)에서 해시 대조로만 가능
- **password_hash 노출 차단**: 테이블 select 권한을 회수하고 컬럼 단위로만 grant (anon REST로 해시 조회 불가)
- 직접 insert 정책 제거 — 쓰기는 RPC 경유만
- API `app/api/comments/[slug]/route.ts` — GET(목록)/POST(작성)/PATCH(수정)/DELETE(삭제), 비번 불일치 403
- UI `components/comments.tsx` — 좋아요 아래 최하단. 이름+비밀번호+내용 폼, 각 댓글에 수정·삭제 인라인 폼. 플레인 텍스트 렌더(XSS 안전)
- 모더레이션: `is_hidden` 플래그 — 운영자가 psql/대시보드에서 숨김 (select 정책이 자동 제외)

## 후속 확장 (지금 안 함)

- `blog_view_events` 이벤트 테이블 → 일별 추이·인기 글 통계 (비공개 페이지)
- 앰플리튜드 연동 (1년 계획 축 2 연습용)
- 댓글 스팸이 실제로 생기면: rate limit 또는 간단한 휴리스틱
