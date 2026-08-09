"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/lib/config";

type BlogComment = {
  id: string;
  nickname: string;
  content: string;
  created_at: string;
};

const t = {
  ko: {
    title: "댓글",
    nickname: "이름",
    password: "비밀번호 (수정·삭제용)",
    placeholder: "댓글을 남겨주세요",
    submit: "등록",
    edit: "수정",
    del: "삭제",
    save: "저장",
    cancel: "취소",
    confirmPw: "비밀번호",
    empty: "첫 댓글을 남겨보세요.",
    error: "실패했어요. 잠시 후 다시 시도해주세요.",
    wrongPw: "비밀번호가 일치하지 않아요.",
    pwHint: "4자 이상",
  },
  en: {
    title: "Comments",
    nickname: "Name",
    password: "Password (for edit/delete)",
    placeholder: "Leave a comment",
    submit: "Post",
    edit: "Edit",
    del: "Delete",
    save: "Save",
    cancel: "Cancel",
    confirmPw: "Password",
    empty: "Be the first to comment.",
    error: "Something went wrong. Please try again.",
    wrongPw: "Password does not match.",
    pwHint: "4+ characters",
  },
} as const;

function formatDateTime(iso: string, lang: Lang): string {
  return new Date(iso).toLocaleDateString(lang === "en" ? "en-US" : "ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const inputCls =
  "rounded-md border border-border bg-transparent px-3 py-2 text-sm outline-none focus:border-accent";
const btnCls =
  "rounded-md border border-border px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-50";

// 수정/삭제 대상 상태: 어떤 댓글에서 어떤 동작을 진행 중인지
type Action = { id: string; mode: "edit" | "delete" } | null;

export function Comments({ slug, lang }: { slug: string; lang: Lang }) {
  const tx = t[lang];
  const [comments, setComments] = useState<BlogComment[] | null>(null);

  // 작성 폼
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // 수정/삭제 폼
  const [action, setAction] = useState<Action>(null);
  const [actionPw, setActionPw] = useState("");
  const [editContent, setEditContent] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/comments/${slug}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { comments: BlogComment[] } | null) => {
        if (data) setComments(data.comments);
      })
      .catch(() => {});
  }, [slug]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setFormError(null);
    try {
      const res = await fetch(`/api/comments/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, password, content }),
      });
      const data: { comment: BlogComment | null } | null = res.ok
        ? await res.json()
        : null;
      if (!data?.comment) throw new Error("post failed");
      setComments((prev) => [...(prev ?? []), data.comment as BlogComment]);
      setContent("");
    } catch {
      setFormError(tx.error);
    } finally {
      setBusy(false);
    }
  };

  const startAction = (c: BlogComment, mode: "edit" | "delete") => {
    setAction({ id: c.id, mode });
    setActionPw("");
    setActionError(null);
    if (mode === "edit") setEditContent(c.content);
  };

  const runAction = async () => {
    if (!action || busy) return;
    setBusy(true);
    setActionError(null);
    try {
      const res = await fetch(`/api/comments/${slug}`, {
        method: action.mode === "edit" ? "PATCH" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          action.mode === "edit"
            ? { id: action.id, password: actionPw, content: editContent }
            : { id: action.id, password: actionPw },
        ),
      });
      if (res.status === 403) {
        setActionError(tx.wrongPw);
        return;
      }
      if (!res.ok) throw new Error("action failed");
      if (action.mode === "edit") {
        const data: { comment: BlogComment } = await res.json();
        setComments((prev) =>
          (prev ?? []).map((c) => (c.id === action.id ? data.comment : c)),
        );
      } else {
        setComments((prev) => (prev ?? []).filter((c) => c.id !== action.id));
      }
      setAction(null);
    } catch {
      setActionError(tx.error);
    } finally {
      setBusy(false);
    }
  };

  if (comments === null) return null;

  return (
    <section className="mt-14 border-t border-border pt-10">
      <h2 className="text-lg font-semibold">
        {tx.title}
        {comments.length > 0 && (
          <span className="ml-2 text-sm font-normal text-muted">{comments.length}</span>
        )}
      </h2>

      <ul className="mt-6 space-y-5">
        {comments.length === 0 && <li className="text-sm text-muted">{tx.empty}</li>}
        {comments.map((c) => (
          <li key={c.id}>
            <div className="flex items-baseline gap-2 text-sm">
              <span className="font-medium">{c.nickname}</span>
              <time className="text-xs text-muted" dateTime={c.created_at}>
                {formatDateTime(c.created_at, lang)}
              </time>
              <span className="flex gap-2 text-xs text-muted">
                <button type="button" onClick={() => startAction(c, "edit")} className="hover:text-accent">
                  {tx.edit}
                </button>
                <button type="button" onClick={() => startAction(c, "delete")} className="hover:text-accent">
                  {tx.del}
                </button>
              </span>
            </div>

            {action?.id === c.id ? (
              <div className="mt-2 space-y-2">
                {action.mode === "edit" && (
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    maxLength={1000}
                    rows={3}
                    className={`${inputCls} w-full resize-y`}
                  />
                )}
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="password"
                    value={actionPw}
                    onChange={(e) => setActionPw(e.target.value)}
                    placeholder={tx.confirmPw}
                    maxLength={50}
                    className={`${inputCls} w-36`}
                  />
                  <button
                    type="button"
                    onClick={runAction}
                    disabled={busy || actionPw.length < 4 || (action.mode === "edit" && !editContent.trim())}
                    className={btnCls}
                  >
                    {action.mode === "edit" ? tx.save : tx.del}
                  </button>
                  <button type="button" onClick={() => setAction(null)} className={btnCls}>
                    {tx.cancel}
                  </button>
                  {actionError && <span className="text-sm text-red-500">{actionError}</span>}
                </div>
              </div>
            ) : (
              <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">{c.content}</p>
            )}
          </li>
        ))}
      </ul>

      <form onSubmit={submit} className="mt-8 space-y-3">
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder={tx.nickname}
            maxLength={20}
            required
            className={`${inputCls} w-36`}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={tx.password}
            maxLength={50}
            minLength={4}
            required
            className={`${inputCls} w-48`}
            title={tx.pwHint}
          />
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={tx.placeholder}
          maxLength={1000}
          rows={3}
          required
          className={`${inputCls} w-full resize-y`}
        />
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={busy || !nickname.trim() || password.length < 4 || !content.trim()}
            className={btnCls}
          >
            {tx.submit}
          </button>
          {formError && <span className="text-sm text-red-500">{formError}</span>}
        </div>
      </form>
    </section>
  );
}
