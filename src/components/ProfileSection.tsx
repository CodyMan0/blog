import { useThemeConfig } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import IconLink from "./ui/iconLink";
import { Skeleton } from "./ui/skeleton";

export default function ProfileSection() {
  const themeConfig = useThemeConfig();
  const name = "Ju young Lee";
  const avatarUrl = useBaseUrl(themeConfig.image);

  return (
    <section className="flex flex-col items-center p-4 md:p-6 lg:p-8 text-center">
      <Avatar className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mb-2">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>
          <Skeleton className="w-full h-full" />
        </AvatarFallback>
      </Avatar>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
        {name}
      </h1>
      <div className="flex gap-2 md:gap-3 lg:gap-4 mb-2">
        <IconLink
          icon={<GitHubLogoIcon className="w-8 h-8 md:w-10 md:h-10" />}
          href="https://github.com/CodyMan0"
          label="GitHub"
        />
        <IconLink
          icon={<LinkedInLogoIcon className="w-8 h-8 md:w-10 md:h-10" />}
          href="https://www.linkedin.com/in/brian0"
          label="LinkedIn"
        />
      </div>
      <p className="max-w-md md:max-w-lg text-gray-600 text-base md:text-lg lg:text-xl">
        기여에 집중하는
        <br />
        프론트엔드 개발자{" "}
        <span className="font-bold text-pretty dark:text-white">이주영</span>
        입니다.
      </p>
    </section>
  );
}
