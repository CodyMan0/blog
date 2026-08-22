// fs 의존 없는 시리즈 정의 (클라이언트 컴포넌트에서도 안전하게 import)
export type Series = "기울기";

export const SERIES: Series[] = ["기울기"];

export const SERIES_META: Record<
  Series,
  { label: { ko: string; en: string }; tagline: { ko: string; en: string } }
> = {
  기울기: {
    label: { ko: "기울기", en: "Gradient" },
    tagline: {
      ko: "실무에서 만난 것 하나를 골라, 설계 의도가 보일 때까지 \u201c왜?\u201d 를 되묻는다.",
      en: "Take one thing I shipped at work and keep asking why until the design intent shows.",
    },
  },
};

export function isSeries(value: unknown): value is Series {
  return typeof value === "string" && SERIES.includes(value as Series);
}
