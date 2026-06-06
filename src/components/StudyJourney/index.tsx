import React from "react";
import styles from "./styles.module.css";

type Track = {
  id: string;
  name: string;
  emoji: string;
  ringColor: string;
  bgColor: string;
  currentPhase: string;
  nextMilestone: string;
  totalDays: number;
  progressOverride?: number;
};

const START_DATE = new Date("2026-05-25");

const tracks: Track[] = [
  {
    id: "coding",
    name: "코딩 테스트",
    emoji: "🧩",
    ringColor: "#3182F6",
    bgColor: "#EEF4FF",
    currentPhase: "Arrays & Hashing",
    nextMilestone: "Two Pointers까지 ~7일",
    totalDays: 365,
  },
  {
    id: "english",
    name: "영어",
    emoji: "🌱",
    ringColor: "#22C55E",
    bgColor: "#ECFDF3",
    currentPhase: "정철엔진 1",
    nextMilestone: "쉐도잉 진입까지 ~90일",
    totalDays: 610,
  },
  {
    id: "writing",
    name: "글쓰기",
    emoji: "✍️",
    ringColor: "#EC4899",
    bgColor: "#FFF0F6",
    currentPhase: "PRD 기초",
    nextMilestone: "Minto 적용까지 ~14일",
    totalDays: 365,
  },
];

function ProgressRing({
  progress,
  color,
  size = 56,
}: {
  progress: number;
  color: string;
  size?: number;
}) {
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const c = 2 * Math.PI * radius;
  const safe = Math.max(0, Math.min(1, progress));
  const offset = c * (1 - safe);
  return (
    <svg width={size} height={size} className={styles.ring}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#F1F3F5"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={size * 0.28}
        fontWeight={700}
        fill="#191F28"
      >
        {Math.round(safe * 100)}%
      </text>
    </svg>
  );
}

function daysSince(start: Date) {
  const today = new Date();
  const diff = today.getTime() - start.getTime();
  return Math.max(1, Math.floor(diff / (1000 * 60 * 60 * 24)) + 1);
}

export default function StudyJourney() {
  const elapsed = daysSince(START_DATE);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerEmoji}>🌱</div>
        <div className={styles.headerText}>
          <div className={styles.headerSubtitle}>지속 학습</div>
          <div className={styles.headerTitle}>
            D<span className={styles.plus}>+</span>
            {elapsed}
          </div>
        </div>
        <div className={styles.headerStat}>오늘도 한 걸음</div>
      </div>

      <div className={styles.grid}>
        {tracks.map((t) => {
          const progress =
            t.progressOverride ?? Math.min(elapsed / t.totalDays, 1);
          return (
            <div
              key={t.id}
              className={styles.card}
              style={{ background: t.bgColor }}
            >
              <div className={styles.cardTop}>
                <div className={styles.cardEmoji}>{t.emoji}</div>
                <ProgressRing progress={progress} color={t.ringColor} />
              </div>
              <div className={styles.cardName}>{t.name}</div>
              <div className={styles.cardPhase}>{t.currentPhase}</div>
              <div className={styles.cardMilestone}>{t.nextMilestone}</div>
            </div>
          );
        })}
      </div>

      <div className={styles.footer}>
        매주 토요일에 한 번씩 진행도를 갱신해주세요 ✨
      </div>
    </div>
  );
}
