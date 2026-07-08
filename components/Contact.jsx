"use client";

import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="contact"
      className="mx-auto w-full max-w-[1100px] px-20 py-[120px] text-center"
      style={{
        background: "transparent",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <p
        className="mb-6 text-[10px] font-semibold tracking-[0.2em]"
        style={{ color: "#f97316" }}
      >
        CONTACT
      </p>
      <h2
        className="mx-auto mb-4 max-w-[700px] text-[48px] font-bold leading-[1.2]"
        style={{ color: "#f5f5f0" }}
      >
        Open to finding execution gaps in GTM.
      </h2>
      <p className="mb-12 text-base" style={{ color: "#888880" }}>
        Based in Munich.
      </p>

      <div className="mb-20 flex items-center justify-center gap-4">
        <a
          href="mailto:mohammadebrahim.779@gmail.com"
          className="flex items-center gap-2 rounded-[10px] bg-[#f97316] px-8 py-3.5 text-[15px] font-semibold hover:bg-[#ea6a0a]"
          style={{ color: "#0a0a0a", cursor: "pointer", transition: "background-color 0.2s ease" }}
        >
          <i className="ti ti-mail text-[16px]" aria-hidden="true" />
          Send an email
        </a>

        <a
          href="https://www.linkedin.com/in/ebraheem-ahmed/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-[10px] bg-transparent px-8 py-3.5 text-[15px] font-semibold text-[#f97316] hover:bg-[#f97316] hover:text-[#0a0a0a]"
          style={{
            border: "1.5px solid #f97316",
            cursor: "pointer",
            transition: "background-color 0.2s ease, color 0.2s ease",
          }}
        >
          <i className="ti ti-brand-linkedin text-[16px]" aria-hidden="true" />
          LinkedIn
        </a>
      </div>

      <div className="mb-10 h-px w-full" style={{ backgroundColor: "#1e1e1e" }} />

      <div className="flex items-center justify-between">
        <span className="text-[13px]" style={{ color: "#444444" }}>
          © 2025 Ebraheem
        </span>
        <span className="text-[13px]" style={{ color: "#444444" }}>
          Built with Next.js · Deployed on Vercel
        </span>
      </div>
    </section>
  );
}
