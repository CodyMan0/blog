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
  i18n: {
    defaultLocale: "ko",
    locales: ["ko", "en"],
    localeConfigs: {
      ko: {
        label: "한국어",
        htmlLang: "ko",
      },
    },
  },
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
          blogPostComponent: "@theme/BlogPostPage",
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
    image: "/img/profile.png",
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
          "프론트엔드 개발자, 이주영, Ju young Lee, 소프트웨어 엔지니어, AI, 금융, 트러블슈팅, 프론트엔드 기본기, 사이드 프로젝트, 자동화, 문서화, 협업, 지속적 학습, 개발자 성장, 블로그, 기술 블로그, 웹 개발, 자바스크립트, 리액트, 프론트엔드 기술, 웹 퍼포먼스, SEO, UI/UX, CSS, HTML, 프로그래밍, 개발자 블로그, 기술 공유, 오픈 소스, 테스트 자동화, 프론트엔드 프레임워크, 웹 보안, 프론트엔드 아키텍처, Frontend Developer, Ju young Lee, Software Engineer, AI, Finance, Troubleshooting, Web Development, JavaScript, React, Next.js, TypeScript, Web Performance, Tech Blog, Developer Blog, Open Source, Frontend Architecture",
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
      title: "나만의 온실",
      items: [
        {
          type: "docSidebar",
          sidebarId: "docSidebar",
          position: "left",
          label: "관심사",
        },
        { to: "/blog", label: "회고", position: "left" },
        {
          href: "https://github.com/CodyMan0",
          label: "GitHub",
          position: "right",
        },
        {
          type: "localeDropdown",
          position: "right",
        },
      ],
    },
    i18n: {
      defaultLocale: "ko",
      locales: ["ko", "en"],
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
