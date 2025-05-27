import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import tailwindPlugin from "./plugins/tailwind-config.cjs";

type TItem = {
  type: string;
  id: string;
};

function reverseBasedOnDate(items: Array<TItem>) {
  return items.sort((a, b) => {
    const dateA = a.id.split("/")[1];
    const dateB = b.id.split("/")[1];
    return dateB.localeCompare(dateA);
  });
}

function reverseSidebarItems(items) {
  const result = items.map((item) => {
    if (item.type === "category") {
      return { ...item, items: reverseBasedOnDate(item.items) };
    }
    return item;
  });

  return result;
}

const config: Config = {
  title: "프로기네",
  favicon: "img/favicon.ico",
  url: "https://froggy1014.github.io",
  baseUrl: "/",
  projectName: "froggy1014.github.io", // Usually your repo name.
  organizationName: "froggy1014", // Usually your GitHub org/user name.
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  plugins: [tailwindPlugin],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          showLastUpdateTime: true,
          tags: "./tags.yml",
          async sidebarItemsGenerator({
            defaultSidebarItemsGenerator,
            ...args
          }) {
            const sidebarItems = await defaultSidebarItemsGenerator(args);
            return reverseSidebarItems(sidebarItems);
          },
        },
        blog: {
          showReadingTime: true,
          postsPerPage: 1,
          blogSidebarCount: "ALL",
          onUntruncatedBlogPosts: "ignore",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        sitemap: {
          lastmod: "date",
          changefreq: "daily",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes("/page/"));
          },
        },
        gtag: {
          trackingID: "G-L7XK3EPZ7C",
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: "/img/profile.webp",
    colorMode: {
      defaultMode: "dark",
    },
    metadata: [
      {
        name: "google-site-verification",
        content: "jyGDXJ29gIqX2cQC8u2gfMH24MpxDk8ROAx9QPWNLoY",
      },
      {
        name: "keywords",
        content:
          "프론트엔드 개발자, 이정민, 에반, 블리딩 엣지, 새로운 기술, 대외 활동, 사이드 프로젝트, 자동화, 문서화, 협업, 프로젝트 품질, 지속적 학습, 개발자 경험, 사회 기여, 개발자 성장, 블로그, 기술 블로그, 웹 개발, 자바스크립트, 리액트, 프론트엔드 기술, 웹 퍼포먼스, SEO, 검색 엔진 최적화, 웹 접근성, UI/UX, CSS, HTML, 웹 디자인, 프로그래밍, 코딩, 개발자 블로그, 기술 공유, 개발자 커뮤니티, 최신 기술, 개발자 도구, 오픈 소스, 코드 리뷰, 테스트 자동화, 프론트엔드 프레임워크, 웹 표준, 웹 보안, 웹 최적화, 프론트엔드 아키텍처, 웹 애플리케이션, 프론트엔드 성능, 웹 트렌드, 웹 개발 팁, 개발자 네트워킹, 기술 세미나, 기술 컨퍼런스, Frontend Developer, Jeongmin Lee, Evan, Bleeding Edge, New Technology, External Activities, Side Projects, Automation, Documentation, Collaboration, Project Quality, Continuous Learning, Developer Experience, Social Contribution, Developer Growth, Blog, Tech Blog, Web Development, JavaScript, React, Frontend Technology, Web Performance, SEO, Search Engine Optimization, Web Accessibility, UI/UX, CSS, HTML, Web Design, Programming, Coding, Developer Blog, Tech Sharing, Developer Community, Latest Technology, Developer Tools, Open Source, Code Review, Test Automation, Frontend Framework, Web Standards, Web Security, Web Optimization, Frontend Architecture, Web Application, Frontend Performance, Web Trends, Web Development Tips, Developer Networking, Tech Seminar, Tech Conference",
      },
      {
        name: "description",
        content:
          "안녕하세요. 프론트엔드 개발자 이정민입니다. 새로운 기술을 배우고 이를 실제 프로젝트에 적용하는 것을 좋아하며, 대외 활동과 사이드 프로젝트를 통해 빠르게 지식을 습득하고 반복적인 작업을 자동화하는 데 열정을 가지고 있습니다. 문서화를 통해 팀 협업을 원활하게 하고 프로젝트 품질을 향상하는 데 기여하고 있으며, 지속적으로 학습하고 배운 바를 적용함으로써 개발자 경험을 쌓고 사회에 기여하는 개발자로 성장하고 싶습니다.",
      },
    ],
    headTags: [
      {
        tagName: "link",
        attributes: {
          rel: "preconnect",
          href: "https://froggy1014.github.io",
        },
      },
      {
        tagName: "script",
        attributes: {
          type: "application/ld+json",
        },
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Froggy",
          url: "https://froggy1014.github.io",
          sameAs: ["https://github.com/froggy1014"],
          jobTitle: "Frontend Developer",
          worksFor: {
            "@type": "Organization",
            name: "CloudHospital",
          },
        }),
      },
      {
        tagName: "script",
        attributes: {
          type: "application/ld+json",
        },
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          url: "https://froggy1014.github.io",
          name: "프로기네",
          description: "프론트엔드 개발자 이정민의 기술 블로그",
          potentialAction: {
            "@type": "SearchAction",
            target:
              "https://froggy1014.github.io/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
    navbar: {
      title: "Evan",
      items: [
        {
          type: "docSidebar",
          sidebarId: "docSidebar",
          position: "left",
          label: "포스팅",
        },
        { to: "/blog", label: "회고", position: "left" },
        {
          href: "https://github.com/froggy1014",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    i18n: {
      defaultLocale: "ko",
      locales: ["ko"],
    },
    stylesheets: [
      {
        href: "https://fonts.googleapis.com/css2?family=Your+Font&display=swap",
        type: "text/css",
        crossorigin: "anonymous",
      },
    ],
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "json", "yaml", "markdown"],
    },
  } satisfies Preset.ThemeConfig,
  themes: ["@docusaurus/theme-mermaid"],
  markdown: {
    mermaid: true,
  },
};

export default config;
