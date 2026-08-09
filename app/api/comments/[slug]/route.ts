import { NextResponse } from "next/server";
import { getPostSlugs } from "@/lib/posts";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

type Params = { slug: string };

export type BlogComment = {
  id: string;
  nickname: string;
  content: string;
  created_at: string;
};

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

function rpc(name: string, args: Record<string, unknown>) {
  return fetch(`${SUPABASE_URL}/rest/v1/rpc/${name}`, {
    method: "POST",
    headers: supabaseHeaders(),
    body: JSON.stringify(args),
    cache: "no-store",
  });
}

const validNickname = (v: string) => v.length >= 1 && v.length <= 20;
const validContent = (v: string) => v.length >= 1 && v.length <= 1000;
const validPassword = (v: string) => v.length >= 4 && v.length <= 50;

export async function GET(
  _req: Request,
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params;
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return NextResponse.json({ comments: [] });
  if (!isKnownSlug(slug)) return NextResponse.json({ comments: [] }, { status: 404 });

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/blog_comments?slug=eq.${encodeURIComponent(slug)}&select=id,nickname,content,created_at&order=created_at.asc`,
    { headers: supabaseHeaders(), cache: "no-store" },
  );
  if (!res.ok) return NextResponse.json({ comments: [] });
  const comments: BlogComment[] = await res.json();
  return NextResponse.json({ comments });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params;
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY)
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  if (!isKnownSlug(slug)) return NextResponse.json({ error: "unknown slug" }, { status: 404 });

  const body: Record<string, unknown> = await req.json().catch(() => ({}));
  const nickname = typeof body.nickname === "string" ? body.nickname.trim() : "";
  const content = typeof body.content === "string" ? body.content.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!validNickname(nickname)) return NextResponse.json({ error: "nickname" }, { status: 400 });
  if (!validContent(content)) return NextResponse.json({ error: "content" }, { status: 400 });
  if (!validPassword(password)) return NextResponse.json({ error: "password" }, { status: 400 });

  const res = await rpc("add_blog_comment", {
    p_slug: slug,
    p_nickname: nickname,
    p_content: content,
    p_password: password,
  });
  if (!res.ok) return NextResponse.json({ error: "insert failed" }, { status: 500 });
  const rows: BlogComment[] = await res.json();
  return NextResponse.json({ comment: rows[0] ?? null });
}

// 수정 — 비밀번호가 일치하는 본인 댓글만
export async function PATCH(
  req: Request,
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params;
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY)
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  if (!isKnownSlug(slug)) return NextResponse.json({ error: "unknown slug" }, { status: 404 });

  const body: Record<string, unknown> = await req.json().catch(() => ({}));
  const id = typeof body.id === "string" ? body.id : "";
  const content = typeof body.content === "string" ? body.content.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!id || !validContent(content) || !validPassword(password))
    return NextResponse.json({ error: "invalid" }, { status: 400 });

  const res = await rpc("update_blog_comment", {
    p_id: id,
    p_password: password,
    p_content: content,
  });
  if (!res.ok) return NextResponse.json({ error: "update failed" }, { status: 500 });
  const rows: BlogComment[] = await res.json();
  if (!rows[0]) return NextResponse.json({ error: "wrong password" }, { status: 403 });
  return NextResponse.json({ comment: rows[0] });
}

// 삭제 — 비밀번호가 일치하는 본인 댓글만
export async function DELETE(
  req: Request,
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params;
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY)
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  if (!isKnownSlug(slug)) return NextResponse.json({ error: "unknown slug" }, { status: 404 });

  const body: Record<string, unknown> = await req.json().catch(() => ({}));
  const id = typeof body.id === "string" ? body.id : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!id || !validPassword(password))
    return NextResponse.json({ error: "invalid" }, { status: 400 });

  const res = await rpc("delete_blog_comment", { p_id: id, p_password: password });
  if (!res.ok) return NextResponse.json({ error: "delete failed" }, { status: 500 });
  const ok: unknown = await res.json();
  if (ok !== true) return NextResponse.json({ error: "wrong password" }, { status: 403 });
  return NextResponse.json({ deleted: true });
}
