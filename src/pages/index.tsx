import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import ProfileSection from "../components/ProfileSection";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="기여에 집중하는 프론트엔드 개발자입니다."
    >
      <main className="bg-[var(--ifm-background-color)] flex flex-col items-center justify-center min-h-[calc(100vh-var(--ifm-navbar-height))]">
        <ProfileSection />
      </main>
    </Layout>
  );
}
