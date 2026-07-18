// fs 의존 없는 카테고리 정의 (클라이언트 컴포넌트에서도 안전하게 import)
export type Category = "회고" | "기술" | "영어";

export const CATEGORIES: Category[] = ["회고", "기술", "영어"];

export const CATEGORY_LABEL: Record<Category, { ko: string; en: string }> = {
  회고: { ko: "회고", en: "Notes" },
  기술: { ko: "기술", en: "Engineering" },
  영어: { ko: "영어", en: "English" },
};
