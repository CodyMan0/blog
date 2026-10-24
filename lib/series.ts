// fs 의존 없는 시리즈 정의 (클라이언트 컴포넌트에서도 안전하게 import)
export type Series = "기울기" | "AI와 함께";

export const SERIES: Series[] = ["기울기", "AI와 함께"];

export const SERIES_META: Record<
  Series,
  {
    label: { ko: string; en: string };
    tagline: { ko: string; en: string };
    /** false 면 글 안의 시리즈 뱃지·목록을 그리지 않는다 (홈 섹션 묶음에만 쓰는 시리즈) */
    inPost?: boolean;
  }
> = {
  기울기: {
    label: { ko: "기울기", en: "Gradient" },
    tagline: {
      ko: "실무에서 만난 것 하나를 골라, 설계 의도가 보일 때까지 \u201c왜?\u201d 를 되묻는다.",
      en: "Take one thing I shipped at work and keep asking why until the design intent shows.",
    },
  },
  "AI와 함께": {
    label: { ko: "AI 잘쓰기 위한 고민 공유", en: "Thinking through how to use AI well" },
    inPost: false,
    tagline: {
      ko: "AI 시대에 해온 고민들이 어떻게 바뀌어 왔는지를 쌓아간다.",
      en: "A running log of how my questions have shifted in the AI era.",
    },
  },
};

export function isSeries(value: unknown): value is Series {
  return typeof value === "string" && SERIES.includes(value as Series);
}
