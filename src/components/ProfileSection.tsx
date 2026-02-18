import { useThemeConfig } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import IconLink from "./ui/iconLink";
import { Skeleton } from "./ui/skeleton";

export default function ProfileSection() {
  const themeConfig = useThemeConfig();
  const name = "Ju young Lee";
  const avatarUrl = useBaseUrl(themeConfig.image);

  return (
    <section className="flex flex-col items-center px-6 pt-16 pb-12 md:pt-20 md:pb-16 text-center max-w-2xl mx-auto">
      <Avatar className="w-20 h-20 md:w-24 md:h-24 mb-4">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>
          <Skeleton className="w-full h-full" />
        </AvatarFallback>
      </Avatar>

      <h1
        className="text-2xl md:text-3xl font-bold mb-1 tracking-tight"
        style={{ color: "var(--ifm-heading-color)" }}
      >
        {name}
      </h1>

      <p
        className="text-base md:text-lg leading-relaxed mt-3 max-w-sm"
        style={{ color: "var(--ifm-color-content-secondary, var(--ifm-font-color-secondary))" }}
      >
        기여에 집중하는 프론트엔드 개발자{" "}
        <span className="font-semibold" style={{ color: "var(--ifm-color-content, var(--ifm-font-color-base))" }}>
          이주영
        </span>
        입니다.
      </p>

      <div className="flex gap-3 mt-4">
        <IconLink
          icon={<GitHubLogoIcon className="w-5 h-5" />}
          href="https://github.com/CodyMan0"
          label="GitHub"
        />
        <IconLink
          icon={<LinkedInLogoIcon className="w-5 h-5" />}
          href="https://www.linkedin.com/in/brian0"
          label="LinkedIn"
        />
      </div>
    </section>
  );
}
