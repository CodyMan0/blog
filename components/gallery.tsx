"use client";

import { useState } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/gallery";
import { siteConfig, type Lang } from "@/lib/config";

const t = {
  ko: {
    title: "갤러리",
    empty: (group: string) =>
      `아직 사진이 없어요. public/gallery/${group} 에 이미지를 넣으면 여기 나옵니다.`,
    hint: "파일명을 2026-08-23-제목.jpg 로 두면 최신순으로 정렬되고, content/gallery.json 에 \"일상/파일명\" 키로 설명을 적을 수 있어요.",
  },
  en: {
    title: "Gallery",
    empty: (group: string) => `No photos yet. Drop images into public/gallery/${group}.`,
    hint: "",
  },
} as const;

export type GalleryGroup = { group: string; photos: Photo[] };

export function Gallery({ groups, lang = "ko" }: { groups: GalleryGroup[]; lang?: Lang }) {
  const tx = t[lang];
  const [selected, setSelected] = useState(groups[0]?.group ?? "");
  const current = groups.find((g) => g.group === selected) ?? groups[0];

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{tx.title}</h1>
        <p className="flex items-center gap-1.5 text-sm text-muted">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden
            className="shrink-0"
          >
            <path
              d="M6 1.2c-1.9 0-3.4 1.5-3.4 3.4 0 2.5 3.4 6.2 3.4 6.2s3.4-3.7 3.4-6.2c0-1.9-1.5-3.4-3.4-3.4z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <circle cx="6" cy="4.6" r="1.2" fill="currentColor" />
          </svg>
          {siteConfig.location[lang]}
        </p>
      </div>

      {groups.length > 1 && (
        <div role="tablist" className="mt-6 flex gap-1 border-b border-border">
          {groups.map(({ group, photos }) => (
            <button
              key={group}
              type="button"
              role="tab"
              aria-selected={selected === group}
              onClick={() => setSelected(group)}
              className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                selected === group
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {group}
              {photos.length > 0 && (
                <span className="ml-1.5 text-xs tabular-nums text-muted">{photos.length}</span>
              )}
            </button>
          ))}
        </div>
      )}

      {current === undefined || current.photos.length === 0 ? (
        <div className="mt-8 max-w-xl text-sm leading-relaxed text-muted">
          <p>{tx.empty(current?.group ?? "일상")}</p>
          {tx.hint !== "" && <p className="mt-2">{tx.hint}</p>}
        </div>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {current.photos.map((photo) => {
            const title = lang === "en" ? photo.titleEn : photo.title;
            const place = lang === "en" ? photo.placeEn : photo.place;
            return (
            <li key={photo.key} className="flex flex-col gap-2">
              <div className="relative aspect-square overflow-hidden rounded-lg border border-border">
                <Image
                  src={photo.src}
                  alt={title || photo.key}
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                />
              </div>
              {title !== "" && <p className="text-sm font-medium leading-snug">{title}</p>}
              {(photo.date !== "" || place !== "") && (
                <p className="-mt-1 text-xs text-muted">
                  {photo.date !== "" && (
                    <span className="font-mono tabular-nums">{photo.date}</span>
                  )}
                  {photo.date !== "" && place !== "" && <span className="mx-1.5">·</span>}
                  {place}
                </p>
              )}
            </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
