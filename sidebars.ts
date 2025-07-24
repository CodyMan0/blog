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
          label: "Network",
          items: [
            "study/network/http-1",
            "study/network/lecture-1",
            "study/network/dns",
          ],
        },
        {
          type: "category",
          label: "OS",
          items: ["study/os/http-1", "study/os/docker"],
        },

        {
          type: "category",
          label: "Framework",
          items: [
            "study/framework/virtaul-dom",
            "study/framework/spa",
            "study/framework/react-beyond-the-basic",
            "study/framework/zustand",
            "study/framework/nextjs",
          ],
        },
        {
          type: "category",
          label: "Tanstack-query",
          items: ["study/react-query/prefetch-query"],
        },
        {
          type: "category",
          label: "Test Code",
          items: [
            "study/test-code/is-not-difficult-to-write-test-code",
            "study/test-code/tdd-1",
          ],
        },
        {
          type: "category",
          label: "Web Browser",
          items: [
            "study/web-browser/critical-rendering-path",
            "study/web-browser/critical-rendering-path-navigation",
          ],
        },
        {
          type: "category",
          label: "Security",
          items: [
            "study/security/jump-in",
            {
              type: "category",
              label: "OAuth",
              items: ["study/security/o-auth/start"],
            },
            {
              type: "category",
              label: "Linux",
              items: ["study/security/linux"],
            },

            "study/security/xss",
          ],
          link: {
            type: "generated-index",
            title: "Security",
            description: "웹 보안에 대한 내용을 정리한 곳입니다.",
            keywords: ["스터디", "웹", "보안"],
          },
        },
        "study/cdn-effect",
        "study/fsd-1",
        "study/db-1",
        "study/mono-repo",
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
      items: ["troubleshooting/automation", "troubleshooting/lcp"],
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
      items: [
        "reading/object-oriented-programming",
        "reading/unit-test",
        "reading/logical-tech",
      ],
    },
  ],
};

export default sidebars;
