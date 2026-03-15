import React from "react";

const dnaItems = [
  {
    keyword: "First Hand Up",
    title: "먼저 손 든다",
    desc: "기다리지 않고 먼저 움직인다",
  },
  {
    keyword: "Depth",
    title: "깊이",
    desc: "표면이 아니라 근본을 판다",
  },
  {
    keyword: "Daily Reflect",
    title: "매일 회고한다",
    desc: "어제보다 나은 오늘을 만든다",
  },
  {
    keyword: "Gratitude Loop",
    title: "감사 루프",
    desc: "부족함을 인정하고, 다시 달린다",
  },
  {
    keyword: "Resilience",
    title: "회복력",
    desc: "넘어져도 다시 일어난다",
  },
  {
    keyword: "Cross Borders",
    title: "경계를 넘는다",
    desc: "직무의 벽을 넘어 필요한 곳에 기여한다",
  },
];

export default function CareerMVC() {
  return (
    <div className="career-mvc">
      <p className="mvc-origin">
        오픈닥터의 MVC를 보며 나도 나만의 기준을 세우고 싶었다.{" "}
      </p>
      <div className="mvc-header">
        <p className="mvc-mission">기술로 사람을 돕는다</p>
        <p className="mvc-vision">
          "이 사람이랑 일하면 편하다"고 느끼게 하는 개발자
        </p>
      </div>
      <div className="mvc-dna-grid">
        {dnaItems.map((item, i) => (
          <div key={i} className="mvc-dna-card">
            <span className="mvc-dna-keyword">{item.keyword}</span>
            <strong className="mvc-dna-title">{item.title}</strong>
            <p className="mvc-dna-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
