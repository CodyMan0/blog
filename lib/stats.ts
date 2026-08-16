// 목록 페이지용 글별 지표(조회·좋아요·댓글) 배치 조회.
// 상세 페이지는 클라이언트에서 slug 하나씩 부르지만, 목록은 슬러그 전체를
// 서버에서 in.(...) 한 번으로 모아 온다 (요청 N×3 방지). 서버 전용.
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// 지표는 자주 안 바뀌므로 5분 캐시 (목록 페이지를 매 요청 동적으로 만들지 않기 위함)
const REVALIDATE = 300;

export type PostStats = { views: number; likes: number; comments: number };

function headers(): HeadersInit {
  return {
    apikey: SUPABASE_ANON_KEY as string,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  };
}

// slug는 영숫자·하이픈이라 그대로 in.(...) 목록에 넣어도 안전하다
function inList(slugs: string[]): string {
  return `in.(${slugs.join(",")})`;
}

// count 컬럼을 가진 테이블(blog_post_views / blog_post_likes) → slug당 1행
async function fetchCountColumn(
  table: string,
  slugs: string[],
): Promise<Record<string, number>> {
  try {
    const url = `${SUPABASE_URL}/rest/v1/${table}?slug=${inList(slugs)}&select=slug,count`;
    const res = await fetch(url, { headers: headers(), next: { revalidate: REVALIDATE } });
    if (!res.ok) return {};
    const rows: { slug: string; count: number }[] = await res.json();
    const map: Record<string, number> = {};
    for (const r of rows) map[r.slug] = r.count ?? 0;
    return map;
  } catch {
    return {};
  }
}

// 댓글은 행 단위 → slug별 행 개수를 센다
async function fetchCommentCounts(slugs: string[]): Promise<Record<string, number>> {
  try {
    const url = `${SUPABASE_URL}/rest/v1/blog_comments?slug=${inList(slugs)}&select=slug`;
    const res = await fetch(url, { headers: headers(), next: { revalidate: REVALIDATE } });
    if (!res.ok) return {};
    const rows: { slug: string }[] = await res.json();
    const map: Record<string, number> = {};
    for (const r of rows) map[r.slug] = (map[r.slug] ?? 0) + 1;
    return map;
  } catch {
    return {};
  }
}

// 슬러그로 결정되는 안정적인 더미 지표 — 로컬(env 없음)에서 디자인 확인용
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
function placeholderStats(slug: string): PostStats {
  const h = hash(slug);
  return { views: 30 + (h % 400), likes: h % 18, comments: h % 9 };
}

/**
 * 주어진 슬러그들의 지표를 한 번에 조회.
 * 환경변수가 없으면: 개발 환경에선 디자인 확인용 더미값, 그 외엔 빈 객체(지표 없이 렌더).
 */
export async function getPostStats(
  slugs: string[],
): Promise<Record<string, PostStats>> {
  const out: Record<string, PostStats> = {};
  if (slugs.length === 0) return out;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    // 로컬 개발에서 Supabase env가 없을 때만 더미 지표로 디자인을 볼 수 있게 한다
    if (process.env.NODE_ENV === "development") {
      for (const slug of slugs) out[slug] = placeholderStats(slug);
    }
    return out;
  }

  const [views, likes, comments] = await Promise.all([
    fetchCountColumn("blog_post_views", slugs),
    fetchCountColumn("blog_post_likes", slugs),
    fetchCommentCounts(slugs),
  ]);

  for (const slug of slugs) {
    out[slug] = {
      views: views[slug] ?? 0,
      likes: likes[slug] ?? 0,
      comments: comments[slug] ?? 0,
    };
  }
  return out;
}
