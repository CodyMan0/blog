import React from "react";
import Giscus from "@giscus/react";
import { useColorMode } from "@docusaurus/theme-common";
import { PropBlogPostMetadata } from "@docusaurus/plugin-content-blog";

export default function GiscusComponent({
  metadata,
}: {
  metadata: PropBlogPostMetadata;
}) {
  const { colorMode } = useColorMode();

  return (
    <Giscus
      id={metadata.title}
      repo="CodyMan0/blog"
      repoId="R_kgDOOwz9qw"
      category="Announcements"
      categoryId="DIC_kwDOOwz9q84Cqt3c"
      mapping="url"
      strict="0"
      term="Welcome to juyoung's Blog"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={colorMode}
      lang="ko"
      loading="lazy"
    />
  );
}
