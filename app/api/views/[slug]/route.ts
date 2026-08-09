import { NextResponse } from "next/server";
import { getPostSlugs } from "@/lib/posts";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

type Params = { slug: string };

// 실제 존재하는 글만 카운트 — 임의 slug로 쓰레기 row가 쌓이는 것을 방지
function isKnownSlug(slug: string): boolean {
  return getPostSlugs("ko").includes(slug) || getPostSlugs("en").includes(slug);
}

function supabaseHeaders(): HeadersInit {
  return {
    apikey: SUPABASE_ANON_KEY as string,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
  };
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params;
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return NextResponse.json({ count: null });
  if (!isKnownSlug(slug)) return NextResponse.json({ count: null }, { status: 404 });

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/blog_post_views?slug=eq.${encodeURIComponent(slug)}&select=count`,
    { headers: supabaseHeaders(), cache: "no-store" },
  );
  if (!res.ok) return NextResponse.json({ count: null });
  const rows: { count: number }[] = await res.json();
  return NextResponse.json({ count: rows[0]?.count ?? 0 });
}

export async function POST(
  _req: Request,
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params;
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return NextResponse.json({ count: null });
  if (!isKnownSlug(slug)) return NextResponse.json({ count: null }, { status: 404 });

  // 증가는 security definer RPC로만 가능 (테이블 직접 쓰기는 RLS로 차단)
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_post_view`, {
    method: "POST",
    headers: supabaseHeaders(),
    body: JSON.stringify({ p_slug: slug }),
    cache: "no-store",
  });
  if (!res.ok) return NextResponse.json({ count: null });
  const count: unknown = await res.json();
  return NextResponse.json({ count: typeof count === "number" ? count : null });
}
