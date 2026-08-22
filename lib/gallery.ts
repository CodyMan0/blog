import fs from "node:fs";
import path from "node:path";

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const CAPTIONS = path.join(process.cwd(), "content", "gallery.json");
const IMAGE = /\.(jpe?g|png|webp|avif|gif)$/i;

/** 폴더 이름이 곧 묶음. 아래 순서대로 먼저 보여주고, 나머지는 뒤에 이름순 */
const GROUP_ORDER = ["일상", "회사"];

/**
 * macOS 파일시스템은 한글 파일명을 NFD(자모 분리)로 돌려주는데
 * JSON 에 적은 키는 NFC 다. 양쪽을 NFC 로 맞춰야 캡션이 붙는다.
 */
const nfc = (s: string) => s.normalize("NFC");

export type Photo = {
  /** public 기준 경로 */
  src: string;
  /** "묶음/파일명" — 캡션 키이자 식별자 */
  key: string;
  group: string;
  title: string;
  titleEn: string;
  /** 어디서 찍었나 — 해외 독자를 위해 영문도 함께 */
  place: string;
  placeEn: string;
  /** 파일명이 2026-08-23-… 로 시작하면 그 날짜 */
  date: string;
};

type Entry = { title?: string; titleEn?: string; place?: string; placeEn?: string };

function readCaptions(): Record<string, Entry> {
  if (!fs.existsSync(CAPTIONS)) return {};
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(CAPTIONS, "utf8"));
    if (parsed === null || typeof parsed !== "object") return {};
    return Object.fromEntries(
      Object.entries(parsed as Record<string, unknown>).map(([k, v]) => [
        nfc(k),
        // 문자열만 적어두면 제목으로 본다
        typeof v === "string" ? { title: v } : ((v ?? {}) as Entry),
      ]),
    );
  } catch {
    // 캡션이 깨져도 사진은 보여야 한다
    return {};
  }
}

function readGroup(group: string, captions: Record<string, Entry>): Photo[] {
  const dir = path.join(GALLERY_DIR, group);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE.test(f))
    .sort((a, b) => (a < b ? 1 : a > b ? -1 : 0))
    .map((name) => {
      const key = nfc(`${group}/${name}`);
      const entry = captions[key] ?? {};
      const dateMatch = /^(\d{4}-\d{2}-\d{2})/.exec(name);
      return {
        src: `/gallery/${encodeURIComponent(group)}/${encodeURIComponent(name)}`,
        key,
        group,
        title: entry.title ?? "",
        titleEn: entry.titleEn ?? entry.title ?? "",
        place: entry.place ?? "",
        placeEn: entry.placeEn ?? entry.place ?? "",
        date: dateMatch?.[1] ?? "",
      };
    });
}

/** public/gallery 아래 폴더별 사진. 폴더 = 묶음(일상·회사 …) */
export function getGallery(): { group: string; photos: Photo[] }[] {
  if (!fs.existsSync(GALLERY_DIR)) return [];
  const captions = readCaptions();
  const found = fs
    .readdirSync(GALLERY_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => nfc(e.name));

  const ordered = [
    ...GROUP_ORDER.filter((g) => found.includes(g)),
    ...found.filter((g) => !GROUP_ORDER.includes(g)).sort(),
  ];

  return ordered.map((group) => ({ group, photos: readGroup(group, captions) }));
}
