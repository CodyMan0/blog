import React, { useState, useEffect } from "react";

const DASHBOARD_URL = "https://me.lee2022.com";

function FloatingButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href={DASHBOARD_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-cta"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: isHovered ? 8 : 0,
        padding: isHovered ? "12px 20px" : "12px",
        borderRadius: 50,
        background: "linear-gradient(135deg, #C4622D 0%, #E8A849 100%)",
        color: "#fff",
        boxShadow: "0 4px 20px rgba(196, 98, 45, 0.4)",
        textDecoration: "none",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
        opacity: isVisible ? 1 : 0,
        overflow: "hidden",
        whiteSpace: "nowrap",
        fontWeight: 600,
        fontSize: 14,
        fontFamily: "inherit",
        border: "none",
        animation: "floating-pulse 3s ease-in-out infinite",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0 }}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span
        style={{
          maxWidth: isHovered ? 200 : 0,
          opacity: isHovered ? 1 : 0,
          transition: "all 0.3s ease",
          overflow: "hidden",
        }}
      >
        이 사람이 궁금하다면?
      </span>
    </a>
  );
}

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <FloatingButton />
    </>
  );
}
