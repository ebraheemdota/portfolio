"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const FEATURE_TAGS = [
  "Task management",
  "Team analytics",
  "Project tracking",
  "Performance scoring",
];

const STATS = [
  { target: 6, duration: 800, label: "SCREENS DESIGNED" },
  { target: 4, duration: 600, label: "CORE MODULES" },
  { target: 1, duration: 400, label: "DESIGN SYSTEM" },
];

const SCREENSHOTS = [
  { src: "/screens/dashboard.png", label: "Dashboard view" },
  { src: "/screens/team-creation.png", label: "Team creation" },
  { src: "/screens/team-management.png", label: "Team management" },
  { src: "/screens/task-creation.png", label: "Task creation" },
  { src: "/screens/projects.png", label: "Projects" },
  { src: "/screens/member-selection.png", label: "Member selection" },
];

function useCountUp(target, duration, active) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- resets the counter so it can replay from 0 if this ever re-triggers
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

function FigmaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="8" cy="6" r="3" fill="#f24e1e" />
      <circle cx="8" cy="12" r="3" fill="#a259ff" />
      <circle cx="8" cy="18" r="3" fill="#1abcfe" />
      <circle cx="14" cy="9" r="3" fill="#0acf83" />
    </svg>
  );
}

function ScreenshotCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageVisible, setImageVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageVisible(false);
      setTimeout(() => {
        setActiveIndex((index) => (index + 1) % SCREENSHOTS.length);
        setImageVisible(true);
      }, 400);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setActiveIndex(index);
    setImageVisible(true);
  };

  const active = SCREENSHOTS[activeIndex];

  return (
    <div>
      <div
        className="relative w-full max-w-full overflow-hidden rounded-2xl"
        style={{
          border: "1px solid #222222",
          boxShadow: "0 0 40px rgba(249,115,22,0.08)",
        }}
      >
        <div
          className="relative w-full"
          style={{
            aspectRatio: "1280 / 832",
            opacity: imageVisible ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          <Image
            src={active.src}
            alt={active.label}
            fill
            style={{ objectFit: "cover", objectPosition: "top left" }}
          />
        </div>

        <div
          className="absolute right-4 top-4 rounded-[20px] px-3.5 py-1.5 text-[11px]"
          style={{
            backgroundColor: "rgba(10,10,10,0.8)",
            backdropFilter: "blur(8px)",
            border: "1px solid #222222",
            color: "#888880",
            opacity: imageVisible ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          {active.label}
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {SCREENSHOTS.map((screenshot, index) => (
          <button
            key={screenshot.src}
            type="button"
            aria-label={`Show ${screenshot.label}`}
            onClick={() => handleDotClick(index)}
            className="h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor: index === activeIndex ? "#f97316" : "#333333",
              transform: index === activeIndex ? "scale(1.3)" : "scale(1)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function StatCard({ target, duration, label, active }) {
  const value = useCountUp(target, duration, active);

  return (
    <div
      className="min-w-[140px] rounded-xl border px-10 py-6"
      style={{ backgroundColor: "#141414", borderColor: "#222222" }}
    >
      <div className="text-[36px] font-bold leading-none" style={{ color: "#f97316" }}>
        {value}
      </div>
      <div
        className="mt-1.5 text-[10px] font-semibold tracking-[0.12em]"
        style={{ color: "#888880" }}
      >
        {label}
      </div>
    </div>
  );
}

export default function SideProjects() {
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
      id="projects"
      className="w-full px-20 py-[120px]"
      style={{
        background: "transparent",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <div
        className="grid items-end gap-[60px]"
        style={{ gridTemplateColumns: "1fr 1fr" }}
      >
        <div>
          <p
            className="mb-4 text-[10px] font-semibold tracking-[0.2em]"
            style={{ color: "#f97316" }}
          >
            SIDE PROJECTS
          </p>
          <h2
            className="mb-4 text-[48px] font-bold leading-[1.1]"
            style={{ color: "#f5f5f0" }}
          >
            Built for fun. Finished anyway.
          </h2>
          <p className="mb-[60px] text-base" style={{ color: "#888880" }}>
            A team management tool designed end to end in Figma.
          </p>

          <div>
            <p
              className="mb-3 text-[10px] font-semibold tracking-[0.18em]"
              style={{ color: "#f97316" }}
            >
              PRODUCT DESIGN
            </p>
            <h3 className="text-[40px] font-bold" style={{ color: "#f5f5f0" }}>
              Versacruit
            </h3>
            <div
              className="mb-6 mt-1.5 h-[3px] rounded-[2px]"
              style={{
                backgroundColor: "#f97316",
                width: visible ? "200px" : "0px",
                transition: "width 0.7s ease",
              }}
            />
            <p
              className="max-w-[700px] text-base leading-[1.75]"
              style={{ color: "#888880" }}
            >
              Managing teams across multiple projects means tracking
              performance, deadlines, and people in three different tools.
              Versacruit is a unified team management interface that puts
              project health, team performance, and task assignment in one
              place.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {FEATURE_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-[20px] px-3.5 py-1.5 text-xs"
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
          </div>

          <div className="mb-14 mt-8 flex flex-col gap-3">
            <div className="flex gap-4">
              {STATS.map((stat) => (
                <StatCard key={stat.label} {...stat} active={visible} />
              ))}
            </div>

            <div
              className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-[10px] border border-[#2a2a2a] px-5 py-[10px] hover:border-[#f97316]"
              style={{ backgroundColor: "#141414", transition: "border-color 0.2s ease" }}
            >
              <FigmaIcon />
              <span className="text-[13px]" style={{ color: "#888880" }}>
                Designed in Figma
              </span>
            </div>
          </div>
        </div>

        <div style={{ alignSelf: "end" }}>
          <ScreenshotCarousel />
        </div>
      </div>
    </section>
  );
}
