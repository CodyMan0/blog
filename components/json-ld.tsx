// 검색엔진용 구조화 데이터(JSON-LD)를 안전하게 주입한다.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // 콘텐츠는 우리가 생성하므로 XSS 위험 없음
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
