import { ColorModeProvider } from "@docusaurus/theme-common/internal";
import type { WrapperProps } from "@docusaurus/types";
import BlogPostPage from "@theme-original/BlogPostPage";
import type BlogPostPageType from "@theme/BlogPostPage";
import { type ReactNode } from "react";

type Props = WrapperProps<typeof BlogPostPageType>;

export default function BlogPostPageWrapper(props: Props): ReactNode {
  return (
    <ColorModeProvider>
      <BlogPostPage {...props} />
    </ColorModeProvider>
  );
}
