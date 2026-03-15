import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  careerSidebar: [
    "intro",
    {
      type: "category",
      label: "퓨쳐리즘랩스",
      link: {
        type: "doc",
        id: "futurism-labs/overview",
      },
      items: [
        { type: "doc", id: "futurism-labs/vision-system", customProps: { status: "wip" } },
        { type: "doc", id: "futurism-labs/report-automation", customProps: { status: "wip" } },
        { type: "doc", id: "futurism-labs/aum-optimization", customProps: { status: "wip" } },
        { type: "doc", id: "futurism-labs/rbac", customProps: { status: "wip" } },
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
        { type: "doc", id: "opendoctor/flutter-migration", customProps: { status: "wip" } },
        { type: "doc", id: "opendoctor/design-system", customProps: { status: "wip" } },
        { type: "doc", id: "opendoctor/prototype-build", customProps: { status: "wip" } },
        { type: "doc", id: "opendoctor/crm-migration", customProps: { status: "wip" } },
      ],
    },
    {
      type: "category",
      label: "커리어 인사이트",
      items: [
        "insights/resume-tips",
        "career-description",
      ],
    },
    {
      type: "html",
      value: `<div class="sidebar-legend">
        <span class="sidebar-legend-item"><span class="sidebar-badge sidebar-badge--done"></span>작성 완료</span>
        <span class="sidebar-legend-item"><span class="sidebar-badge sidebar-badge--wip"></span>작성 중</span>
      </div>`,
      defaultStyle: false,
    },
  ],
};

export default sidebars;
