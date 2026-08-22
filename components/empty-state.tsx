/**
 * 아직 글이 없는 자리. 문장만 덩그러니 두면 깨진 화면처럼 보여서
 * 로고(핀)를 연한 선화로 얹고 가운데 정렬한다.
 */
export function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-muted">
      <svg
        width="52"
        height="52"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden
        className="text-border"
      >
        <path
          d="M16 2.5c-5.52 0-10 4.3-10 9.7 0 7.2 8.53 16.2 9 16.7.55.6 1.45.6 2 0 .47-.5 9-9.5 9-16.7 0-5.4-4.48-9.7-10-9.7Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <p className="text-sm">{label}</p>
    </div>
  );
}
