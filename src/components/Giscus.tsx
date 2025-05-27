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
      repo="froggy1014/froggy1014.github.io"
      repoId="R_kgDOMHhVWw"
      category="Announcements"
      categoryId="DIC_kwDOMHhVW84CmeL7"
      mapping="url"
      strict="0"
      term="Welcome to Froggy's Blog"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={colorMode}
      lang="ko"
      loading="lazy"
    />
  );
}
