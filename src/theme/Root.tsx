import React, { useState, useEffect } from "react";

const DASHBOARD_URL = "https://me.lee2022.com";

function FloatingButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href={DASHBOARD_URL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="floating-about-btn"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        gap: 8,
        height: 48,
        padding: "0 20px",
        borderRadius: 24,
        background: "#222",
        color: "#fff",
        boxShadow: isHovered
          ? "0 12px 32px rgba(0, 0, 0, 0.3)"
          : "0 4px 16px rgba(0, 0, 0, 0.2)",
        textDecoration: "none",
        cursor: "pointer",
        transition: "all 0.2s ease",
        transform: isVisible
          ? isHovered ? "translateY(-3px) scale(1.03)" : "translateY(0)"
          : "translateY(80px)",
        overflow: "hidden",
        whiteSpace: "nowrap",
        fontSize: 14,
        fontWeight: 600,
        fontFamily: "inherit",
        border: "none",
        letterSpacing: "-0.01em",
      }}
    >
      <span style={{ fontSize: 15, lineHeight: 1, flexShrink: 0 }}>
        &#10024;
      </span>
      <span>어떤 기여를 해왔을까?</span>
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
