import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  careerSidebar: [
    "intro",
    "career-description",
    {
      type: "category",
      label: "퓨쳐리즘랩스",
      link: {
        type: "doc",
        id: "futurism-labs/overview",
      },
      items: [
        "futurism-labs/tether-guy",
        "futurism-labs/vision-system",
        "futurism-labs/report-automation",
        "futurism-labs/aum-optimization",
        "futurism-labs/rbac",
        "futurism-labs/cicd",
      ],
    },
    {
      type: "category",
      label: "오픈닥터",
      link: {
        type: "doc",
        id: "opendoctor/overview",
      },
      items: [
        "opendoctor/flutter-migration",
        "opendoctor/design-system",
        "opendoctor/prototype-build",
      ],
    },
    {
      type: "category",
      label: "커리어 인사이트",
      items: ["insights/resume-tips"],
    },
  ],
};

export default sidebars;
