"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const QUADRANTS = [
  {
    label: "HOW I WORK",
    text: "Work starts with a hypothesis, not a task list. Before anything else, I form a view of what actually needs doing — then I go test it against reality.",
  },
  {
    label: "WHAT I WATCH FOR",
    text: "When results stall, the instinct is to question the method — not repeat it louder. Effort is linear. A sharper approach compounds.",
  },
  {
    label: "WHERE I'M WRONG",
    text: "I hold conviction loosely. If the evidence says the assumption was off, I rebuild — I don't defend. Being right eventually beats being right in the moment.",
  },
  {
    label: "WHAT PULLS ME IN",
    text: "Building systems that keep working after I've moved on. GTM workflows, automations, engines that compound. Watching something I built actually produce results — that never gets old.",
  },
];

const TRAITS = [
  {
    icon: "ti-radar",
    title: "Hypothesis first",
    desc: "Shows up with a point of view, not a blank notebook. Forms a view fast and updates it faster.",
  },
  {
    icon: "ti-refresh",
    title: "Method over effort",
    desc: "When results stall, questions the approach before increasing the output. Volume is not a strategy.",
  },
  {
    icon: "ti-adjustments",
    title: "Loose conviction",
    desc: "Holds positions firmly enough to act on them, loosely enough to abandon them when the evidence shifts.",
  },
  {
    icon: "ti-robot",
    title: "Systems thinker",
    desc: "Drawn to work that compounds — automations, workflows, GTM engines that keep producing after the build is done.",
  },
];

function useRevealOnScroll() {
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

  return [ref, visible];
}

function Quadrant({ label, text, delay }) {
  const [ref, visible] = useRevealOnScroll();

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      <p
        className="mb-2 text-[9px] font-semibold tracking-[0.18em]"
        style={{ color: "#f97316" }}
      >
        {label}
      </p>
      <p className="text-[13px] leading-[1.7]" style={{ color: "#888880" }}>
        {text}
      </p>
    </div>
  );
}

function TraitCard({ icon, title, desc, delay }) {
  const [ref, visible] = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className="flex h-full flex-col self-stretch rounded-[10px] border border-[#222222] p-3.5 hover:border-[#f97316] hover:shadow-[0_0_20px_rgba(249,115,22,0.06)]"
      style={{
        backgroundColor: "#141414",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, border-color 0.3s ease, box-shadow 0.3s ease`,
      }}
    >
      <div className="mb-2 flex h-8 items-center">
        <i
          className={`ti ${icon} text-[18px]`}
          style={{ color: "#f97316" }}
          aria-hidden="true"
        />
      </div>
      <div className="mb-1 flex min-h-11 items-start">
        <p className="text-xs font-semibold" style={{ color: "#f5f5f0" }}>
          {title}
        </p>
      </div>
      <p className="flex-1 text-[11px] leading-[1.5]" style={{ color: "#888880" }}>
        {desc}
      </p>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-[1100px] px-20 py-[120px]"
      style={{ background: "transparent" }}
    >
      <div
        className="grid items-center gap-12"
        style={{ gridTemplateColumns: "320px 1fr" }}
      >
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            width: "320px",
            height: "420px",
            border: "1px solid #222222",
            boxShadow: "0 0 30px rgba(249,115,22,0.08)",
          }}
        >
          <Image
            src="/me-cropped.jpg"
            alt="Ebraheem"
            fill
            style={{ objectFit: "cover", objectPosition: "top center" }}
          />
        </div>

        <div>
          <p
            className="mb-2 text-[10px] font-semibold tracking-[0.2em]"
            style={{ color: "#f97316" }}
          >
            ABOUT
          </p>
          <h2
            className="mb-6 text-[48px] font-bold leading-[1.2]"
            style={{ color: "#f5f5f0" }}
          >
            The person behind the work.
          </h2>

          <div className="mb-6 grid grid-cols-2 gap-6">
            {QUADRANTS.map((quadrant, index) => (
              <Quadrant key={quadrant.label} {...quadrant} delay={index * 150} />
            ))}
          </div>

          <div className="my-5 h-px w-full" style={{ backgroundColor: "#1e1e1e" }} />

          <div className="grid grid-cols-4 items-stretch gap-[10px]">
            {TRAITS.map((trait, index) => (
              <TraitCard key={trait.title} {...trait} delay={index * 100} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
