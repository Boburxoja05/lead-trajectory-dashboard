"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/crm", label: "CRM Dashboard" },
  { href: "/ads", label: "FB Ads Dashboard" },
  { href: "/settings", label: "Sozlamalar" },
];

export default function NavBar() {
  const path = usePathname();

  return (
    <nav
      style={{
        background: "var(--panel)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1800,
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          height: 56,
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 24 }}>
          <span style={{ color: "var(--accent)", fontSize: 18, lineHeight: 1 }}>◆</span>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 15, letterSpacing: "-0.02em" }}>
            Lead Dashboard
          </span>
          <span
            style={{
              background: "var(--accent-soft)",
              color: "var(--accent)",
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: 20,
              letterSpacing: "0.05em",
            }}
          >
            DEMO
          </span>
        </div>

        <div style={{ display: "flex", gap: 4 }}>
          {links.map(({ href, label }) => {
            const active = path === href || path.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                style={{
                  padding: "6px 16px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                  background: active ? "var(--accent)" : "transparent",
                  color: active ? "#000" : "var(--muted)",
                  transition: "all 0.15s",
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
