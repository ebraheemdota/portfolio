"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "Work", id: "work" },
  { label: "Experience", id: "experience" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

function NavLink({ label, id, isActive }) {
  return (
    <a
      href={`#${id}`}
      className={`relative text-[15px] font-medium no-underline transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#f97316] after:transition-[width] after:duration-300 after:ease-out after:content-[''] hover:text-[#f5f5f0] hover:after:w-full ${
        isActive ? "text-[#f5f5f0]" : "text-[#888880]"
      }`}
    >
      {label}
      {isActive && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-1 left-0 h-[1.5px] w-full"
          style={{ backgroundColor: "#f97316" }}
        />
      )}
    </a>
  );
}

export default function Nav() {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const sections = LINKS.map((link) => document.getElementById(link.id)).filter(
      Boolean
    );
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="fixed top-0 z-[100] flex w-full items-center justify-between px-20 py-6"
      style={{ background: "transparent", backdropFilter: "blur(12px)" }}
    >
      <a
        href="#"
        className="text-[18px] font-bold no-underline"
        style={{ color: "#f5f5f0" }}
      >
        Ebraheem Ahmed
      </a>
      <ul className="flex list-none items-center gap-10">
        {LINKS.map((link) => (
          <li key={link.id}>
            <NavLink {...link} isActive={activeId === link.id} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
