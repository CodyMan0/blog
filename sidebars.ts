import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docSidebar: [
    {
      type: "category",
      label: "Study",
      link: {
        type: "generated-index",
        title: "스터디",
        description: "공부하다가 정리한 내용들을 모아두는 곳입니다.",
        keywords: ["스터디", "노트", "스터디 노트"],
      },
      items: [
        {
          type: "category",
          label: "Docker & Kubernetes",
          items: [
            "study/docker-kubernetes/overview",
            "study/docker-kubernetes/image-and-container",
            "study/docker-kubernetes/volume",
            "study/docker-kubernetes/container-and-networking",
          ],
        },
        "study/swr",
        "study/llm",
        "study/pre-commit",
      ],
    },
    {
      type: "category",
      label: "Troubleshooting",
      link: {
        type: "generated-index",
        title: "Troubleshooting",
        description: "마주했던 문제를 해결한 내용을 적어놓는 곳입니다.",
        keywords: ["트러블슈팅"],
      },
      items: [
        "troubleshooting/automation",
        "troubleshooting/hls",
        "troubleshooting/ios-input-zoom-in",
        "troubleshooting/vectordb-migration",
      ],
    },
    {
      type: "category",
      label: "Reading",
      link: {
        type: "generated-index",
        title: "Reading",
        description: "기술서적 읽고 정리한 내용을 모아두는 곳입니다.",
        keywords: ["독서", "기술서적"],
      },
      items: ["reading/front-optimize-performance"],
    },
  ],
};

export default sidebars;
