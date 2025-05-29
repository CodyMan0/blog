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
  title: "이주영 블로그",
  favicon: "img/favicon.ico",
  url: "https://lee2022.com/",
  baseUrl: "/",
  projectName: "lee-2022", // Usually your repo name.
  organizationName: "codyMan0", // Usually your GitHub org/user name.
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
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: "/img/profile.webp",
    colorMode: {
      defaultMode: "light",
    },
    metadata: [
      {
        name: "google-site-verification",
        content: "AxsS2ygF2WicUs9-epbufPPEZ-mCAGWyxAv7I7Z98Jo",
      },
      {
        name: "keywords",
        content:
          "프론트엔드 개발자, 이주영, Brian, 주도적인 개발자, 사이드 프로젝트, 자동화, 문서화, 협업, 프로젝트 품질, 지속적 학습, 개발자 경험, 사회 기여, 개발자 성장, 블로그, 기술 블로그, 웹 개발, 자바스크립트, 리액트, 프론트엔드 기술, 웹 퍼포먼스, SEO, 검색 엔진 최적화, 웹 접근성, UI/UX, CSS, HTML, 웹 디자인, 프로그래밍, 코딩, 개발자 블로그, 기술 공유, 개발자 커뮤니티, 최신 기술, 개발자 도구, 오픈 소스, 코드 리뷰, 테스트 자동화, 프론트엔드 프레임워크, 웹 표준, 웹 보안, 웹 최적화, 프론트엔드 아키텍처, 웹 애플리케이션, 프론트엔드 성능, 웹 트렌드, 웹 개발 팁, 개발자 네트워킹, 기술 세미나, 기술 컨퍼런스, Frontend Developer, Jeongmin Lee, Evan, Bleeding Edge, New Technology, External Activities, Side Projects, Automation, Documentation, Collaboration, Project Quality, Continuous Learning, Developer Experience, Social Contribution, Developer Growth, Blog, Tech Blog, Web Development, JavaScript, React, Frontend Technology, Web Performance, SEO, Search Engine Optimization, Web Accessibility, UI/UX, CSS, HTML, Web Design, Programming, Coding, Developer Blog, Tech Sharing, Developer Community, Latest Technology, Developer Tools, Open Source, Code Review, Test Automation, Frontend Framework, Web Standards, Web Security, Web Optimization, Frontend Architecture, Web Application, Frontend Performance, Web Trends, Web Development Tips, Developer Networking, Tech Seminar, Tech Conference",
      },
      {
        name: "description",
        content:
          "안녕하세요. 프론트엔드 개발자 이주영입니다. 함께 성장하길 바라는 마음으로 블로그를 운영합니다.",
      },
    ],
    headTags: [
      {
        tagName: "link",
        attributes: {
          rel: "preconnect",
          href: "https://lee2022.com/",
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
          name: "CodyMan0",
          url: "https://lee2022.com/",
          sameAs: ["https://github.com/CodyMan0"],
          jobTitle: "Software Engineer",
          worksFor: {
            "@type": "Organization",
            name: "FuturismLabs",
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
          url: "https://lee2022.com/",
          name: "이주영 블로그",
          description: "프론트엔드 개발자 이주영의 기술 블로그",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://lee2022.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
    navbar: {
      title: "Since 2022",
      items: [
        {
          type: "docSidebar",
          sidebarId: "docSidebar",
          position: "left",
          label: "지식 학습",
        },
        { to: "/blog", label: "회고", position: "left" },
        {
          href: "https://github.com/CodyMan0",
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
