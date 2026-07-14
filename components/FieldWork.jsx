"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";

const PEEC = {
  initial: "P",
  category: "GEO AUDIT",
  title: "Peec AI — GTM Audit",
  teaser:
    "Mapping the gap between AI visibility and AI recommendation — and what it means for B2B SaaS brands.",
  deliverables: ["Notion", "Google Sheets", "Loom"],
  ctaLabel: "Explore the Gap →",
};

const BEYOND_PRESENCE = {
  initial: "B",
  category: "USE CASE DISCOVERY",
  title: "Beyond Presence — GTM Project",
  teaser:
    "Building the use case that turns AI avatar technology into a recurring revenue motion.",
  deliverables: ["Loom"],
  ctaLabel: "Meet Maya →",
};

const PEEC_TOOL_LINKS = {
  Notion:
    "https://fate-nectarine-2fb.notion.site/The-Recommendation-Vacuum-How-AI-Search-Fails-European-B2B-SaaS-at-the-Moment-of-Purchase-392f852bfaa6802cb4abfc84f970871b",
  "Google Sheets":
    "https://docs.google.com/spreadsheets/d/1tmZqRnO91lV2LEZUyGYUCLhMLKCypiF0fW4GyOPzFMU/edit?usp=sharing",
  Loom: "https://www.loom.com/share/dd65088e04b4426b94611ed3f6aa5035",
};

const BEYOND_PRESENCE_LOOM_LINK =
  "https://www.loom.com/share/cf9f18fb26eb4afa9aa49acb6476b9bb";

const PEEC_STEPS = [
  { label: "THE PROBLEM", icon: "ti-search" },
  { label: "WHAT I FOUND", icon: "ti-bulb" },
  { label: "WHAT I BUILT", icon: "ti-hammer" },
];

const PEEC_COUNTERS = [
  { target: 48, duration: 1200, label: "QUERIES RUN" },
  { target: 2, duration: 800, label: "AI PLATFORMS" },
  { target: 6, duration: 1000, label: "CRITICAL GAPS" },
];

const PEEC_FINDINGS = [
  {
    icon: "ti-eye-off",
    title: "High-intent invisibility",
    desc: "When buyers ask how to solve a problem, vendors vanish. Highest intent = least visible.",
  },
  {
    icon: "ti-link",
    title: "The citation trap",
    desc: "Cited but never recommended — funding content that drives traffic to competitors.",
  },
  {
    icon: "ti-trending-down",
    title: "Differentiation collapse",
    desc: "Key differentiators don't surface in AI search. Brands get reduced to price.",
  },
  {
    icon: "ti-shadow",
    title: "Shadow standing",
    desc: "Only appearing as alternatives to competitors — no independent brand presence.",
  },
  {
    icon: "ti-user-off",
    title: "ICP invisibility gap",
    desc: "Invisible on the exact queries their ideal customers are typing.",
  },
  {
    icon: "ti-world-off",
    title: "US default bias",
    desc: "Neutral queries erase European brands from results entirely.",
  },
];

const STEP0_STATS = ["2 AI platforms", "4 categories audited"];

const BEYOND_PRESENCE_STEPS = [
  { label: "THE PROBLEM", icon: "ti-question-mark" },
  { label: "WHAT I BUILT", icon: "ti-robot" },
  { label: "THE INSIGHT", icon: "ti-arrows-right" },
];

const BEYOND_PRESENCE_COUNTERS = [
  { target: 1, duration: 600, label: "WORKING AVATAR" },
  { target: 5, duration: 900, label: "ORIENTATION TOPICS" },
  { target: 2, duration: 700, label: "TARGET ICPs" },
];

const STEP0_COMPARISON_PILLS = [
  { text: "👁 What buyers see — cool technology", accent: false },
  { text: "✦ What's missing — where it actually fits", accent: true },
];

const MAYA_CAPABILITY_TAGS = [
  "Housing guidance",
  "Health insurance",
  "City registration",
  "Community finder",
  "Legal compliance",
];

const ICP_LEFT_CARD = {
  header: "UNIVERSITIES",
  rows: [
    { label: "Procurement cycle", value: "Slow" },
    { label: "Deployment", value: "Seasonal" },
    { label: "Revenue model", value: "One-time" },
  ],
};

const ICP_RIGHT_CARD = {
  header: "EOR FIRMS & GLOBAL HIRING",
  badge: "Better fit →",
  rows: [
    { label: "Procurement cycle", value: "Fast" },
    { label: "Deployment", value: "Rolling" },
    { label: "Revenue model", value: "Recurring" },
  ],
};

const TAXHUB_URL = "https://taxhub-omega.vercel.app";

const TAXHUB = {
  initial: "T",
  category: "VENTURE BUILD",
  title: "TaxHub — AI Tax Assistant",
  teaser:
    "Built a live AI assistant for German tax firms in one day — grounded in real law, escalates to humans, and turns deflected questions into booked consultations.",
  deliverables: ["Live app"],
  deliverableLinks: { "Live app": TAXHUB_URL },
  ctaLabel: "See the Build →",
};

const TAXHUB_STEPS = [
  { label: "THE PROBLEM", icon: "ti-alert-triangle" },
  { label: "WHAT I BUILT", icon: "ti-hammer" },
  { label: "THE INSIGHT", icon: "ti-bulb" },
];

const TAXHUB_COUNTERS = [
  { target: 3, duration: 600, label: "INTAKE QUESTIONS" },
  { target: 5, duration: 800, label: "LAW SOURCES CITED" },
];

const TAXHUB_STEP0_STATS = [
  "72% of firms understaffed",
  "E-invoicing mandatory by 2025",
  "DATEV gap: client comms",
];

const TAXHUB_BUILD_CARDS = [
  {
    icon: "ti-list-check",
    title: "Rule engine",
    desc: "Permutation-combination logic across company size, revenue, and invoicing method generates a personalized compliance roadmap.",
  },
  {
    icon: "ti-shield",
    title: "Sensitivity scoring",
    desc: "Keyword and liability model decides what gets answered vs escalated — no hallucination risk on high-stakes queries.",
  },
  {
    icon: "ti-file-text",
    title: "Handoff brief",
    desc: "Every escalation generates an AI brief for the advisor — turning a cost into a conversion-ready consultation.",
  },
];

const TAXHUB_INSIGHT_ROWS = [
  {
    label: "What firms think they're buying",
    value: "Time savings",
    valueColor: "#f5f5f0",
  },
  {
    label: "What they actually get",
    value: "Revenue growth",
    valueColor: "#f97316",
  },
  {
    label: "The real business model",
    value: "Deflection → Conversion",
    valueColor: "#f97316",
  },
];

const TOOL_TAGS = [
  {
    name: "Notion",
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
        <path fill="#ffffff" d="M4 4h16v16H4z" />
        <path fill="#000000" d="M6 6h5v2H6zm0 4h12v2H6zm0 4h8v2H6z" />
      </svg>
    ),
  },
  {
    name: "Google Sheets",
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
        <path
          fill="#0f9d58"
          d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z"
        />
      </svg>
    ),
  },
  {
    name: "Loom",
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
        <circle cx="12" cy="12" r="10" fill="#625DF5" />
        <circle cx="12" cy="12" r="4" fill="white" />
        <line x1="12" y1="2" x2="12" y2="8" stroke="white" strokeWidth="2" />
        <line x1="12" y1="16" x2="12" y2="22" stroke="white" strokeWidth="2" />
        <line x1="2" y1="12" x2="8" y2="12" stroke="white" strokeWidth="2" />
        <line x1="16" y1="12" x2="22" y2="12" stroke="white" strokeWidth="2" />
      </svg>
    ),
  },
];

function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    let frame = null;

    const measure = () => {
      frame = null;
      const rect = node.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      const raw = maxScroll > 0 ? -rect.top / maxScroll : 0;
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      if (frame === null) {
        frame = requestAnimationFrame(measure);
      }
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [ref]);

  return progress;
}

function useCountUp(target, duration, active) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- resets the counter so it restarts from 0 next time this step becomes active
      setValue(0);
      return undefined;
    }

    let raf;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      setValue(Math.round(progress * target));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

function Monogram({ initial }) {
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold"
      style={{
        backgroundColor: "#1a1a1a",
        border: "1.5px solid #f97316",
        color: "#f97316",
      }}
    >
      {initial}
    </span>
  );
}

function CollapsedCard({ project, onExpand }) {
  const [mounted, setMounted] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleClick = () => {
    if (!onExpand) return;
    setClosing(true);
    setTimeout(onExpand, 300);
  };

  return (
    <div
      className="mx-auto w-full max-w-[860px] rounded-2xl border px-11 py-9 hover:border-[#f97316] hover:shadow-[0_0_24px_rgba(249,115,22,0.08)]"
      style={{
        backgroundColor: "#141414",
        borderColor: "#222222",
        opacity: closing ? 0 : mounted ? 1 : 0,
        transform: closing ? "scale(0.98)" : "scale(1)",
        transition: "all 0.3s ease",
      }}
    >
      <div className="flex items-center">
        <Monogram initial={project.initial} />
        <span
          className="ml-3 text-[10px] font-semibold tracking-[0.18em]"
          style={{ color: "#f97316" }}
        >
          {project.category}
        </span>
      </div>

      <h3 className="mt-[18px] text-[26px] font-bold" style={{ color: "#f5f5f0" }}>
        {project.title}
      </h3>
      <p className="mt-2 text-[15px] leading-[1.6]" style={{ color: "#888880" }}>
        {project.teaser}
      </p>

      <div className="mt-7">
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {project.deliverables.map((name) => {
            const href = project.deliverableLinks?.[name];
            if (href) {
              return (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[20px] px-3 py-[5px] text-[11px] no-underline transition-colors duration-200 hover:border-[#f97316]"
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #2a2a2a",
                    color: "#888880",
                    cursor: "pointer",
                  }}
                >
                  {name}
                </a>
              );
            }
            return (
              <span
                key={name}
                className="rounded-[20px] px-3 py-[5px] text-[11px]"
                style={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                  color: "#888880",
                }}
              >
                {name}
              </span>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleClick}
          className="hover:bg-[#f97316] hover:text-[#0a0a0a]"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            border: "1.5px solid #f97316",
            color: "#f97316",
            background: "transparent",
            padding: "10px 22px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
            marginTop: "16px",
          }}
        >
          {project.ctaLabel}
        </button>
      </div>
    </div>
  );
}

function CounterCard({ target, duration, label, active }) {
  const value = useCountUp(target, duration, active);
  const isMobile = useIsMobile();

  return (
    <div
      className="flex-1 rounded-xl border px-7 py-6 text-center"
      style={{
        backgroundColor: "#141414",
        borderColor: "#222222",
        padding: isMobile ? "10px 8px" : undefined,
      }}
    >
      <div
        className="text-[48px] font-bold leading-none"
        style={{ color: "#f97316", fontSize: isMobile ? "24px" : undefined }}
      >
        {value}
      </div>
      <div
        className="mt-2 text-[11px] font-semibold tracking-[0.12em]"
        style={{ color: "#888880", fontSize: isMobile ? "8px" : undefined }}
      >
        {label}
      </div>
    </div>
  );
}

function TaxHubCounterCard({ target, duration, label, active }) {
  const value = useCountUp(target, duration, active);
  const isMobile = useIsMobile();

  return (
    <div
      className="rounded-xl border text-center"
      style={{
        backgroundColor: "#141414",
        borderColor: "#222222",
        padding: isMobile ? "10px 16px" : "24px 40px",
      }}
    >
      <div
        className="font-bold leading-none"
        style={{ color: "#f97316", fontSize: isMobile ? "28px" : "48px" }}
      >
        {value}
      </div>
      <div
        className="font-semibold"
        style={{
          color: "#888880",
          fontSize: "11px",
          letterSpacing: "0.12em",
          marginTop: "8px",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function ExpandedPeecBlock({ onClose }) {
  const containerRef = useRef(null);
  const progress = useScrollProgress(containerRef);
  const isMobile = useIsMobile();
  const activeStep = isMobile
    ? progress < 0.15
      ? 0
      : progress < 0.65
      ? 1
      : 2
    : progress < 0.33
    ? 0
    : progress < 0.66
    ? 1
    : 2;
  const isLastStep = activeStep === PEEC_STEPS.length - 1;

  const [underlineOn, setUnderlineOn] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const [sheetIndex, setSheetIndex] = useState(0);
  const [sheetVisible, setSheetVisible] = useState(true);

  const sheets = [
    { src: "/hr.png", label: "HR SaaS Analysis" },
    { src: "/spend-management.png", label: "Spend Management Analysis" },
  ];

  useEffect(() => {
    const frame = requestAnimationFrame(() => setUnderlineOn(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restarts the fade/translate transition on every step change
    setContentVisible(false);
    const frame = requestAnimationFrame(() => setContentVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [activeStep]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSheetVisible(false);
      setTimeout(() => {
        setSheetIndex((index) => (index + 1) % sheets.length);
        setSheetVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [sheets.length]);

  const handleClose = () => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(onClose, 800);
  };

  const fillWidth = activeStep === 0 ? "0%" : activeStep === 1 ? "50%" : "100%";

  const renderStepContent = (index, countersActive) => {
    if (index === 0) {
      return (
        <div>
          <p
            className="max-w-[900px] font-bold leading-[1.2]"
            style={{ color: "#f5f5f0", fontSize: isMobile ? "20px" : "52px" }}
          >
            Most brands track whether AI mentions them. Almost none
            track whether those mentions actually drive recommendations
            — and that gap was what this audit set out to map.
          </p>
          <div
            className="mt-10 h-px w-full"
            style={{ backgroundColor: "#1e1e1e" }}
          />
          <div
            className="mt-6 flex gap-3"
            style={{
              flexWrap: isMobile ? "wrap" : undefined,
              gap: isMobile ? "8px" : undefined,
            }}
          >
            {STEP0_STATS.map((stat) => (
              <span
                key={stat}
                className="rounded-[20px] px-5 py-2 text-[13px]"
                style={{
                  backgroundColor: "#141414",
                  border: "1px solid #222222",
                  color: "#888880",
                }}
              >
                {stat}
              </span>
            ))}
          </div>
        </div>
      );
    }

    if (index === 1) {
      return (
        <>
          <div
            className="mb-10 flex gap-6"
            style={{
              display: isMobile ? "grid" : "flex",
              gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : undefined,
              gap: isMobile ? "8px" : undefined,
            }}
          >
            {PEEC_COUNTERS.map((counter) => (
              <CounterCard
                key={counter.label}
                {...counter}
                active={countersActive}
              />
            ))}
          </div>
          <div
            className="grid grid-cols-3 gap-3"
            style={{ gridTemplateColumns: isMobile ? "1fr" : undefined }}
          >
            {PEEC_FINDINGS.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border px-[22px] py-5 transition-colors duration-200 hover:border-[#f97316]"
                style={{
                  backgroundColor: "#141414",
                  borderColor: "#1e1e1e",
                  padding: isMobile ? "12px 14px" : undefined,
                }}
              >
                <div className="flex items-center">
                  <i
                    className={`ti ${item.icon} text-[18px]`}
                    style={{ color: "#f97316" }}
                    aria-hidden="true"
                  />
                  <span
                    className="ml-2 text-[13px] font-semibold"
                    style={{ color: "#f97316" }}
                  >
                    {item.title}
                  </span>
                </div>
                <p
                  className="mt-[10px] text-[13px] leading-[1.6]"
                  style={{ color: "#888880" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </>
      );
    }

    return (
      <div>
        <p
          className="mb-10 max-w-[800px] text-[28px] font-medium leading-[1.65]"
          style={{ color: "#f5f5f0" }}
        >
          A full audit across 48 queries on ChatGPT and Perplexity,
          covering HR SaaS and Spend Management categories.
        </p>
        <div
          style={{
            width: isMobile ? "100%" : "65%",
            height: isMobile ? "auto" : undefined,
            margin: "0 auto",
            marginTop: "28px",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #222",
            position: "relative",
            boxShadow: "0 0 24px rgba(249,115,22,0.08)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- simple fading carousel image, next/image not needed here */}
          <img
            src={sheets[sheetIndex].src}
            alt={sheets[sheetIndex].label}
            style={{
              width: "100%",
              display: "block",
              opacity: sheetVisible ? 1 : 0,
              transition: "opacity 0.3s ease",
              aspectRatio: "16/9",
              objectFit: "cover",
              objectPosition: "top left",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "rgba(10,10,10,0.8)",
              backdropFilter: "blur(8px)",
              border: "1px solid #222",
              borderRadius: "20px",
              padding: "5px 12px",
              fontSize: "11px",
              color: "#888880",
              opacity: sheetVisible ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            {sheets[sheetIndex].label}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "12px",
          }}
        >
          {sheets.map((sheet, i) => (
            <div
              key={sheet.src}
              onClick={() => {
                setSheetVisible(false);
                setTimeout(() => {
                  setSheetIndex(i);
                  setSheetVisible(true);
                }, 300);
              }}
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: sheetIndex === i ? "#f97316" : "#333",
                transform: sheetIndex === i ? "scale(1.3)" : "scale(1)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
        <div
          className="relative mt-5 flex justify-center gap-3"
          style={{ zIndex: 10 }}
        >
          {TOOL_TAGS.map((tool) =>
            tool.name === "Google Sheets" ? (
              <div
                key={tool.name}
                className="flex items-center gap-2 rounded-[10px] border px-5 py-[10px]"
                style={{ backgroundColor: "#141414", borderColor: "#2a2a2a" }}
              >
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center">
                  {tool.logo}
                </span>
                <div>
                  <div
                    className="text-[13px] font-medium"
                    style={{ color: "#888880" }}
                  >
                    {tool.name}
                  </div>
                  <div className="text-[10px]" style={{ color: "#444444" }}>
                    Available on request
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={tool.name}
                href={PEEC_TOOL_LINKS[tool.name]}
                target="_blank"
                rel="noopener noreferrer"
                title="Open in new tab"
                className="flex cursor-pointer items-center gap-2 rounded-[10px] border px-5 py-[10px] transition-colors duration-200 hover:border-[#f97316]"
                style={{ backgroundColor: "#141414", borderColor: "#2a2a2a" }}
              >
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center">
                  {tool.logo}
                </span>
                <div>
                  <div
                    className="text-[13px] font-medium"
                    style={{ color: "#888880" }}
                  >
                    {tool.name}
                  </div>
                  <div className="text-[10px]" style={{ color: "#444444" }}>
                    Open document
                  </div>
                </div>
              </a>
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        height: isMobile ? "500vh" : "300vh",
        position: "relative",
        zIndex: 100,
        margin: 0,
        padding: 0,
        marginBottom: "120px",
      }}
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          background: "transparent",
          zIndex: 100,
          overflow: "visible",
        }}
      >
        <div
          className="absolute left-0 top-0 flex w-full items-center justify-between"
          style={{
            background: "rgba(10,10,10,0.5)",
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid #1a1a1a",
            padding: isMobile ? "16px 20px" : "28px 48px",
          }}
        >
          <div className="flex items-center gap-3">
            <Monogram initial={PEEC.initial} />
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="font-bold"
                  style={{ color: "#f5f5f0", fontSize: isMobile ? "14px" : "24px" }}
                >
                  {PEEC.title}
                </span>
                <span
                  className="text-[12px] font-semibold tracking-[0.18em]"
                  style={{ color: "#f97316" }}
                >
                  {PEEC.category}
                </span>
              </div>
              <div
                className="mt-1 h-[3px]"
                style={{
                  backgroundColor: "#f97316",
                  width: underlineOn ? "100%" : "0%",
                  transition: "width 0.7s ease",
                }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Collapse"
            className="text-xl leading-none"
            style={
              isMobile
                ? { color: "#888880", position: "absolute", top: "16px", right: "16px" }
                : { color: "#888880" }
            }
          >
            ×
          </button>
        </div>

        <div
          className="absolute left-0 right-0"
          style={{
            background: "transparent",
            padding: isMobile ? "0 20px" : "0 120px",
            top: isMobile ? "80px" : "100px",
          }}
        >
          <div className="relative flex items-center justify-between">
            <div
              className="absolute left-0 h-[1.5px] w-full"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "#2a2a2a",
              }}
            />
            <div
              className="absolute left-0 h-[1.5px]"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "#f97316",
                width: fillWidth,
                transition: "width 0.5s ease",
              }}
            />
            {PEEC_STEPS.map((step, index) => {
              const isActive = index === activeStep;
              const isDone = index < activeStep;
              return (
                <div
                  key={step.label}
                  className="relative flex flex-col items-center gap-2"
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-[15px]"
                    style={{
                      borderColor: isActive || isDone ? "#f97316" : "#333333",
                      backgroundColor: isActive
                        ? "#f97316"
                        : isDone
                        ? "rgba(249,115,22,0.15)"
                        : "rgba(10,10,10,0.4)",
                      color: isActive ? "#0a0a0a" : isDone ? "#f97316" : "#444444",
                    }}
                  >
                    <i className={`ti ${step.icon}`} aria-hidden="true" />
                  </span>
                  <span
                    className="text-[9px] font-semibold tracking-[0.18em]"
                    style={{ color: isActive ? "#f97316" : "#555555" }}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="absolute left-0 right-0 text-left"
          style={{
            background: "transparent",
            paddingLeft: isMobile ? "20px" : "120px",
            paddingRight: isMobile ? "20px" : "120px",
            paddingBottom: "100px",
            overflow: isMobile ? undefined : "visible",
            overflowY: isMobile ? "auto" : undefined,
            maxHeight: isMobile ? "calc(100vh - 200px)" : undefined,
            bottom: 0,
            top: isMobile ? "160px" : "200px",
          }}
        >
          <p
            className="mb-7 text-[10px] font-semibold tracking-[0.22em]"
            style={{ color: "#f97316" }}
          >
            {PEEC_STEPS[activeStep].label}
          </p>

          <div
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.45s ease, transform 0.45s ease",
              paddingBottom: "40px",
            }}
          >
            {renderStepContent(activeStep, activeStep === 1)}
          </div>
        </div>

        <p
          className="absolute bottom-6 left-0 w-full animate-[softPulse_2s_ease-in-out_infinite] text-center text-[11px] tracking-[0.1em]"
          style={{
            color: "#333333",
            background: "transparent",
            borderTop: "none",
            pointerEvents: "none",
          }}
        >
          {isLastStep ? "scroll to next project ↓" : "scroll to continue ↓"}
        </p>
      </div>
    </div>
  );
}

function ExpandedBeyondPresenceBlock({ onClose }) {
  const containerRef = useRef(null);
  const progress = useScrollProgress(containerRef);
  const activeStep = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2;
  const isLastStep = activeStep === BEYOND_PRESENCE_STEPS.length - 1;
  const isMobile = useIsMobile();

  const [underlineOn, setUnderlineOn] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setUnderlineOn(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restarts the fade/translate transition on every step change
    setContentVisible(false);
    const frame = requestAnimationFrame(() => setContentVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [activeStep]);

  const handleClose = () => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(onClose, 800);
  };

  const fillWidth = activeStep === 0 ? "0%" : activeStep === 1 ? "50%" : "100%";
  const loomTool = TOOL_TAGS.find((tool) => tool.name === "Loom");

  const renderStepContent = (index, countersActive) => {
    if (index === 0) {
      return (
        <div>
          <p
            className="max-w-[900px] font-bold leading-[1.2]"
            style={{ color: "#f5f5f0", fontSize: isMobile ? "20px" : "52px" }}
          >
            The biggest barrier to AI avatar adoption isn&apos;t the
            technology. It&apos;s that most buyers can&apos;t picture
            where it fits.
          </p>
          <div
            className="mt-10 h-px w-full"
            style={{ backgroundColor: "#1e1e1e" }}
          />
          <div
            className="mt-6 flex gap-3"
            style={{
              flexDirection: isMobile ? "column" : undefined,
              gap: isMobile ? "8px" : undefined,
            }}
          >
            {STEP0_COMPARISON_PILLS.map((pill) => (
              <span
                key={pill.text}
                className="rounded-[20px] px-6 py-[10px] text-[13px]"
                style={{
                  backgroundColor: "#141414",
                  border: pill.accent
                    ? "1px solid #f97316"
                    : "1px solid #222222",
                  color: pill.accent ? "#f97316" : "#888880",
                }}
              >
                {pill.text}
              </span>
            ))}
          </div>
        </div>
      );
    }

    if (index === 1) {
      return (
        <>
          <div
            className="mb-10 flex gap-6"
            style={{
              display: isMobile ? "grid" : "flex",
              gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : undefined,
              gap: isMobile ? "8px" : undefined,
            }}
          >
            {BEYOND_PRESENCE_COUNTERS.map((counter) => (
              <CounterCard
                key={counter.label}
                {...counter}
                active={countersActive}
              />
            ))}
          </div>

          <div
            className="w-full rounded-2xl border px-8 py-7"
            style={{
              backgroundColor: "#141414",
              borderColor: "#222222",
              padding: isMobile ? "16px" : undefined,
            }}
          >
            <div
              className="grid items-start gap-10"
              style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}
            >
              <div>
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[18px] font-bold"
                    style={{
                      backgroundColor: "#1a1a1a",
                      border: "2px solid #f97316",
                      color: "#f97316",
                    }}
                  >
                    M
                  </span>
                  <div>
                    <div
                      className="text-xl font-bold"
                      style={{ color: "#f5f5f0" }}
                    >
                      Maya
                    </div>
                    <div
                      className="mt-[2px] text-[13px]"
                      style={{ color: "#888880" }}
                    >
                      International Student Guide
                    </div>
                  </div>
                </div>

                <div
                  className="my-5 h-px w-full"
                  style={{ backgroundColor: "#1e1e1e" }}
                />

                <div className="flex flex-wrap gap-[10px]">
                  {MAYA_CAPABILITY_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-[20px] px-4 py-[6px] text-xs"
                      style={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #2a2a2a",
                        color: "#888880",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p
                  className="mt-4 text-sm leading-[1.7]"
                  style={{ color: "#888880" }}
                >
                  Maya replaces the PDF nobody reads. From housing and
                  health insurance to city registration and student
                  communities — everything an international student
                  needs to feel at home, delivered through a single
                  conversational AI avatar.
                </p>

                <div className="mt-5 flex items-center gap-3">
                {loomTool && (
                  <a
                    href={BEYOND_PRESENCE_LOOM_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open in new tab"
                    className="flex w-fit cursor-pointer items-center gap-2 rounded-[10px] border px-5 py-[10px] transition-colors duration-200 hover:border-[#f97316]"
                    style={{ backgroundColor: "#141414", borderColor: "#2a2a2a" }}
                  >
                    <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center">
                      {loomTool.logo}
                    </span>
                    <div>
                      <div
                        className="text-[13px] font-medium"
                        style={{ color: "#888880" }}
                      >
                        {loomTool.name}
                      </div>
                      <div className="text-[10px]" style={{ color: "#444444" }}>
                        Open demo
                      </div>
                    </div>
                  </a>
                )}
                <a
                  href="https://bey.chat/583b843a-3cc4-4366-8c3d-ef454ee68209"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Talk to Maya"
                  className="flex w-fit cursor-pointer items-center gap-2 rounded-[10px] border border-[#f97316] bg-[#f97316] px-5 py-[10px] transition-colors duration-200 hover:bg-[#ea6a0a]"
                >
                  <i
                    className="ti ti-message-circle text-[16px]"
                    style={{ color: "#0a0a0a" }}
                    aria-hidden="true"
                  />
                  <div>
                    <div
                      className="text-[13px] font-semibold"
                      style={{ color: "#0a0a0a" }}
                    >
                      Talk to Maya →
                    </div>
                    <div
                      className="text-[10px]"
                      style={{ color: "rgba(0,0,0,0.6)" }}
                    >
                      Have a live conversation
                    </div>
                  </div>
                </a>
              </div>
              </div>

              <div>
                <div
                  style={{
                    width: "100%",
                    height: "320px",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid #222",
                    marginTop: "24px",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- next/image strips GIF animation; plain img preserves it */}
                  <img
                    src="/maya.gif"
                    alt="Maya avatar demo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <div>
        <p
          className="mb-10 max-w-[800px] font-medium leading-[1.65]"
          style={{ color: "#f5f5f0", fontSize: isMobile ? "18px" : "28px" }}
        >
          Universities are the obvious buyer — but slow procurement
          cycles and seasonal intakes break the recurring revenue
          model. The same use case maps directly to companies hiring
          international talent.
        </p>

        <div className="flex gap-4" style={{ flexDirection: isMobile ? "column" : "row" }}>
          <div
            className="flex-1 rounded-xl border px-7 py-6"
            style={{ backgroundColor: "#141414", borderColor: "#222222" }}
          >
            <p
              className="mb-4 text-[13px] font-semibold tracking-[0.05em]"
              style={{ color: "#888880" }}
            >
              {ICP_LEFT_CARD.header}
            </p>
            {ICP_LEFT_CARD.rows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between py-2 text-[13px]"
                style={{
                  borderBottom: "1px solid #1a1a1a",
                  color: "#888880",
                }}
              >
                <span>{row.label}</span>
                <span>{row.value}</span>
              </div>
            ))}
          </div>

          <div
            className="flex-1 rounded-xl border px-7 py-6"
            style={{
              backgroundColor: "#141414",
              border: "1.5px solid #f97316",
              boxShadow: "0 0 20px rgba(249,115,22,0.08)",
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <p
                className="text-[13px] font-semibold tracking-[0.05em]"
                style={{ color: "#f97316" }}
              >
                {ICP_RIGHT_CARD.header}
              </p>
              <span
                className="rounded-[20px] px-[10px] py-[3px] text-[10px]"
                style={{
                  backgroundColor: "rgba(249,115,22,0.1)",
                  border: "1px solid #f97316",
                  color: "#f97316",
                }}
              >
                {ICP_RIGHT_CARD.badge}
              </span>
            </div>
            {ICP_RIGHT_CARD.rows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between py-2 text-[13px]"
                style={{
                  borderBottom: "1px solid #1e1e1e",
                  color: "#f97316",
                }}
              >
                <span>{row.label}</span>
                <span>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        height: "300vh",
        position: "relative",
        zIndex: 50,
        margin: 0,
        padding: 0,
      }}
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          background: "transparent",
          zIndex: 50,
        }}
      >
        <div
          className="absolute left-0 top-0 flex w-full items-center justify-between"
          style={{
            background: "rgba(10,10,10,0.5)",
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid #1a1a1a",
            padding: isMobile ? "16px 20px" : "28px 48px",
          }}
        >
          <div className="flex items-center gap-3">
            <Monogram initial={BEYOND_PRESENCE.initial} />
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="font-bold"
                  style={{ color: "#f5f5f0", fontSize: isMobile ? "14px" : "24px" }}
                >
                  {BEYOND_PRESENCE.title}
                </span>
                <span
                  className="text-[12px] font-semibold tracking-[0.18em]"
                  style={{ color: "#f97316" }}
                >
                  {BEYOND_PRESENCE.category}
                </span>
              </div>
              <div
                className="mt-1 h-[3px]"
                style={{
                  backgroundColor: "#f97316",
                  width: underlineOn ? "100%" : "0%",
                  transition: "width 0.7s ease",
                }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Collapse"
            className="text-xl leading-none"
            style={
              isMobile
                ? { color: "#888880", position: "absolute", top: "16px", right: "16px" }
                : { color: "#888880" }
            }
          >
            ×
          </button>
        </div>

        <div
          className="absolute left-0 right-0"
          style={{
            background: "transparent",
            padding: isMobile ? "0 20px" : "0 120px",
            top: isMobile ? "80px" : "100px",
          }}
        >
          <div className="relative flex items-center justify-between">
            <div
              className="absolute left-0 h-[1.5px] w-full"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "#2a2a2a",
              }}
            />
            <div
              className="absolute left-0 h-[1.5px]"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "#f97316",
                width: fillWidth,
                transition: "width 0.5s ease",
              }}
            />
            {BEYOND_PRESENCE_STEPS.map((step, index) => {
              const isActive = index === activeStep;
              const isDone = index < activeStep;
              return (
                <div
                  key={step.label}
                  className="relative flex flex-col items-center gap-2"
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-[15px]"
                    style={{
                      borderColor: isActive || isDone ? "#f97316" : "#333333",
                      backgroundColor: isActive
                        ? "#f97316"
                        : isDone
                        ? "rgba(249,115,22,0.15)"
                        : "rgba(10,10,10,0.4)",
                      color: isActive ? "#0a0a0a" : isDone ? "#f97316" : "#444444",
                    }}
                  >
                    <i className={`ti ${step.icon}`} aria-hidden="true" />
                  </span>
                  <span
                    className="text-[9px] font-semibold tracking-[0.18em]"
                    style={{ color: isActive ? "#f97316" : "#555555" }}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="absolute left-0 right-0 text-left"
          style={{
            background: "transparent",
            padding: isMobile ? "0 20px" : "0 120px",
            maxHeight: "calc(100vh - 220px)",
            overflowY: "auto",
            top: isMobile ? "160px" : "200px",
          }}
        >
          <p
            className="mb-7 text-[10px] font-semibold tracking-[0.22em]"
            style={{ color: "#f97316" }}
          >
            {BEYOND_PRESENCE_STEPS[activeStep].label}
          </p>

          <div
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.45s ease, transform 0.45s ease",
            }}
          >
            {renderStepContent(activeStep, activeStep === 1)}
          </div>
        </div>

        <p
          className="absolute bottom-6 left-0 w-full animate-[softPulse_2s_ease-in-out_infinite] text-center text-[11px] tracking-[0.1em]"
          style={{ color: "#444444" }}
        >
          {isLastStep
            ? "scroll down to continue ↓"
            : "scroll to continue ↓"}
        </p>
      </div>
    </div>
  );
}

function ExpandedTaxHubBlock({ onClose }) {
  const containerRef = useRef(null);
  const progress = useScrollProgress(containerRef);
  const activeStep = progress < 0.2 ? 0 : progress < 0.65 ? 1 : 2;
  const isLastStep = activeStep === TAXHUB_STEPS.length - 1;
  const isMobile = useIsMobile();

  const [underlineOn, setUnderlineOn] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setUnderlineOn(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restarts the fade/translate transition on every step change
    setContentVisible(false);
    const frame = requestAnimationFrame(() => setContentVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [activeStep]);

  const handleClose = () => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(onClose, 800);
  };

  const fillWidth = activeStep === 0 ? "0%" : activeStep === 1 ? "50%" : "100%";

  const renderStepContent = (index, countersActive) => {
    if (index === 0) {
      return (
        <div>
          <p
            className="max-w-[900px] font-bold leading-[1.2]"
            style={{ color: "#f5f5f0", fontSize: isMobile ? "20px" : "52px" }}
          >
            Germany&apos;s mandatory e-invoicing transition is flooding tax
            firms with repetitive client questions. 72% can&apos;t find
            staff. DATEV owns the accounting core — but leaves the entire
            client communication layer wide open.
          </p>
          <div
            className="mt-10 h-px w-full"
            style={{ backgroundColor: "#1e1e1e" }}
          />
          <div
            className="mt-6 flex"
            style={{
              gap: isMobile ? "8px" : "12px",
              flexWrap: isMobile ? "wrap" : undefined,
            }}
          >
            {TAXHUB_STEP0_STATS.map((stat) => (
              <span
                key={stat}
                className="rounded-[20px] px-5 py-2 text-[13px]"
                style={{
                  backgroundColor: "#141414",
                  border: "1px solid #222222",
                  color: "#888880",
                }}
              >
                {stat}
              </span>
            ))}
          </div>
        </div>
      );
    }

    if (index === 1) {
      return (
        <>
          <div
            style={{
              display: "flex",
              gap: "24px",
              justifyContent: "center",
              maxWidth: "500px",
              margin: "0 auto 40px",
            }}
          >
            {TAXHUB_COUNTERS.map((counter) => (
              <TaxHubCounterCard
                key={counter.label}
                {...counter}
                active={countersActive}
              />
            ))}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '28px',
            marginTop: '8px'
          }}>
            <span style={{
              background: '#141414',
              border: '1px solid #f97316',
              borderRadius: '20px',
              padding: '6px 18px',
              fontSize: '12px',
              color: '#f97316',
              fontWeight: '600',
              letterSpacing: '0.05em'
            }}>
              RAG-based · Grounded in BMF & IHK documents
            </span>
          </div>

          <div style={{
            width: isMobile ? '100%' : '65%',
            margin: '0 auto',
            marginTop: '28px',
            marginBottom: '32px',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid #222',
            boxShadow: '0 0 24px rgba(249,115,22,0.08)',
            position: 'relative'
          }}>
            <Image
              src='/Taxhub.png'
              alt='TaxHub app screenshot'
              width={1200}
              height={800}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover',
                objectPosition: 'top'
              }}
            />
          </div>

          <div
            className="grid grid-cols-3 gap-3"
            style={{ gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", marginTop: '32px' }}
          >
            {TAXHUB_BUILD_CARDS.map((card) => (
              <div
                key={card.title}
                className="rounded-[10px] border transition-colors duration-200 hover:border-[#f97316]"
                style={{
                  backgroundColor: "#141414",
                  borderColor: "#1e1e1e",
                  padding: "16px",
                }}
              >
                <div className="flex items-center" style={{ gap: "8px" }}>
                  <i
                    className={`ti ${card.icon}`}
                    style={{ fontSize: "16px", color: "#f97316" }}
                    aria-hidden="true"
                  />
                  <span
                    style={{ fontSize: "12px", fontWeight: 600, color: "#f97316" }}
                  >
                    {card.title}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#888880",
                    lineHeight: 1.55,
                    marginTop: "8px",
                  }}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </>
      );
    }

    return (
      <div>
        <p
          className="max-w-[800px] font-medium leading-[1.75]"
          style={{
            color: "#f5f5f0",
            fontSize: isMobile ? "18px" : "28px",
            marginBottom: "40px",
          }}
        >
          It sells as a deflection tool. It works as a revenue engine. Every
          escalation the firm expected to cost time becomes a briefed,
          conversion-ready consultation.
        </p>

        <div
          className="w-full rounded-xl"
          style={{
            backgroundColor: "#141414",
            border: "1.5px solid #f97316",
            padding: "28px 32px",
            boxShadow: "0 0 20px rgba(249,115,22,0.08)",
          }}
        >
          {TAXHUB_INSIGHT_ROWS.map((row, index) => (
            <div
              key={row.label}
              className="flex items-center justify-between"
              style={{
                display: isMobile ? "flex" : undefined,
                justifyContent: "space-between",
                alignItems: isMobile ? "flex-start" : undefined,
                gap: isMobile ? "12px" : undefined,
                padding: "10px 0",
                borderBottom:
                  index < TAXHUB_INSIGHT_ROWS.length - 1
                    ? "1px solid #1e1e1e"
                    : "none",
                fontSize: "14px",
              }}
            >
              <span style={{ color: "#888880", flex: isMobile ? 1 : undefined }}>
                {row.label}
              </span>
              <span
                style={{
                  color: row.valueColor,
                  textAlign: isMobile ? "right" : undefined,
                  flexShrink: isMobile ? 0 : undefined,
                  maxWidth: isMobile ? "50%" : undefined,
                }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}
        >
          <a
            href={TAXHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-[#f97316] hover:text-[#0a0a0a]"
            style={{
              display: "inline-flex",
              alignItems: "center",
              border: "1.5px solid #f97316",
              color: "#f97316",
              background: "transparent",
              padding: "10px 24px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            Try TaxHub →
          </a>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        height: "450vh",
        position: "relative",
        zIndex: 25,
        margin: 0,
        padding: 0,
        marginBottom: "120px",
      }}
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          background: "transparent",
          zIndex: 25,
          overflow: "visible",
        }}
      >
        <div
          className="absolute left-0 top-0 flex w-full items-center justify-between"
          style={{
            background: "rgba(10,10,10,0.5)",
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid #1a1a1a",
            padding: isMobile ? "16px 20px" : "28px 48px",
          }}
        >
          <div className="flex items-center gap-3">
            <Monogram initial={TAXHUB.initial} />
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="font-bold"
                  style={{ color: "#f5f5f0", fontSize: isMobile ? "14px" : "24px" }}
                >
                  {TAXHUB.title}
                </span>
                <span
                  className="text-[12px] font-semibold tracking-[0.18em]"
                  style={{ color: "#f97316" }}
                >
                  {TAXHUB.category}
                </span>
              </div>
              <div
                className="mt-1 h-[3px]"
                style={{
                  backgroundColor: "#f97316",
                  width: underlineOn ? "100%" : "0%",
                  transition: "width 0.7s ease",
                }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Collapse"
            className="text-xl leading-none"
            style={
              isMobile
                ? { color: "#888880", position: "absolute", top: "16px", right: "16px" }
                : { color: "#888880" }
            }
          >
            ×
          </button>
        </div>

        <div
          className="absolute left-0 right-0"
          style={{
            background: "transparent",
            padding: isMobile ? "0 20px" : "0 120px",
            top: isMobile ? "80px" : "100px",
          }}
        >
          <div className="relative flex items-center justify-between">
            <div
              className="absolute left-0 h-[1.5px] w-full"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "#2a2a2a",
              }}
            />
            <div
              className="absolute left-0 h-[1.5px]"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "#f97316",
                width: fillWidth,
                transition: "width 0.5s ease",
              }}
            />
            {TAXHUB_STEPS.map((step, index) => {
              const isActive = index === activeStep;
              const isDone = index < activeStep;
              return (
                <div
                  key={step.label}
                  className="relative flex flex-col items-center gap-2"
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-[15px]"
                    style={{
                      borderColor: isActive || isDone ? "#f97316" : "#333333",
                      backgroundColor: isActive
                        ? "#f97316"
                        : isDone
                        ? "rgba(249,115,22,0.15)"
                        : "rgba(10,10,10,0.4)",
                      color: isActive ? "#0a0a0a" : isDone ? "#f97316" : "#444444",
                    }}
                  >
                    <i className={`ti ${step.icon}`} aria-hidden="true" />
                  </span>
                  <span
                    className="text-[9px] font-semibold tracking-[0.18em]"
                    style={{ color: isActive ? "#f97316" : "#555555" }}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="absolute left-0 right-0 text-left"
          style={{
            background: "transparent",
            paddingLeft: isMobile ? "20px" : "120px",
            paddingRight: isMobile ? "28px" : "128px",
            paddingBottom: "40px",
            overflowY: "auto",
            maxHeight: "calc(100vh - 280px)",
            scrollbarWidth: "thin",
            scrollbarColor: "#f97316 #1a1a1a",
            bottom: 0,
            top: isMobile ? "160px" : "200px",
          }}
        >
          <p
            className="mb-7 text-[10px] font-semibold tracking-[0.22em]"
            style={{ color: "#f97316" }}
          >
            {TAXHUB_STEPS[activeStep].label}
          </p>

          <div
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.45s ease, transform 0.45s ease",
              paddingBottom: "40px",
            }}
          >
            {renderStepContent(activeStep, activeStep === 1)}
          </div>
        </div>

        <p
          className="absolute bottom-6 left-0 w-full animate-[softPulse_2s_ease-in-out_infinite] text-center text-[11px] tracking-[0.1em]"
          style={{
            color: "#333333",
            background: "transparent",
            borderTop: "none",
            pointerEvents: "none",
          }}
        >
          {isLastStep ? "scroll down ↓" : "scroll to continue ↓"}
        </p>
      </div>
    </div>
  );
}

export default function FieldWork() {
  const [peecExpanded, setPeecExpanded] = useState(false);
  const [beyondPresenceExpanded, setBeyondPresenceExpanded] = useState(false);
  const [taxHubExpanded, setTaxHubExpanded] = useState(false);
  const isMobile = useIsMobile();
  const sectionPadding = { paddingLeft: isMobile ? "16px" : "80px", paddingRight: isMobile ? "16px" : "80px" };

  return (
    <section id="work" className="w-full" style={{ background: "transparent" }}>
      <div
        className="mx-auto max-w-[900px] pb-[60px] pt-[120px] text-center"
        style={sectionPadding}
      >
        <p
          className="text-xs font-semibold tracking-[0.2em]"
          style={{ color: "var(--accent)" }}
        >
          FIELD WORK
        </p>
        <h2
          className="mt-4 text-[56px] font-bold leading-[1.1]"
          style={{ color: "var(--text)" }}
        >
          Field Work
        </h2>
      </div>

      <div className="flex flex-col gap-6 pb-[120px]">
        {peecExpanded ? (
          <ExpandedPeecBlock onClose={() => setPeecExpanded(false)} />
        ) : (
          <div style={sectionPadding}>
            <CollapsedCard
              project={PEEC}
              onExpand={() => setPeecExpanded(true)}
            />
          </div>
        )}

        {beyondPresenceExpanded ? (
          <ExpandedBeyondPresenceBlock
            onClose={() => setBeyondPresenceExpanded(false)}
          />
        ) : (
          <div className="relative" style={{ position: "relative", zIndex: 10, ...sectionPadding }}>
            <CollapsedCard
              project={BEYOND_PRESENCE}
              onExpand={() => setBeyondPresenceExpanded(true)}
            />
          </div>
        )}

        {taxHubExpanded ? (
          <ExpandedTaxHubBlock onClose={() => setTaxHubExpanded(false)} />
        ) : (
          <div className="relative" style={{ position: "relative", zIndex: 5, ...sectionPadding }}>
            <CollapsedCard
              project={TAXHUB}
              onExpand={() => setTaxHubExpanded(true)}
            />
          </div>
        )}
      </div>
    </section>
  );
}
