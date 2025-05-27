import Link from "@docusaurus/Link";

function IconLink({
  icon,
  href,
  label,
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
}) {
  return (
    <Link
      to={href}
      className="text-xl md:text-2xl lg:text-3xl text-gray-600 transition-colors"
    >
      {icon}
    </Link>
  );
}

export default IconLink;
