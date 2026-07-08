"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const EXPERIENCES = [
  {
    role: "GTM STRATEGY",
    company: "Beam AI",
    logo: "/logos/beam.png",
    date: "2024",
    description:
      "Ran a data-driven industry analysis across multiple verticals to identify the highest-potential market for Beam's agentic AI product. Built the go-to-market strategy from the ground up — ICP definition, segmentation, and pipeline architecture.",
  },
  {
    role: "PRODUCT MANAGEMENT",
    company: "Rencore",
    logo: "/logos/rencore.png",
    date: "2025",
    description:
      "Took 250+ Microsoft 365 governance policies and collapsed them into 12 actionable root causes. Built product tutorials for a new Teams app feature and a recommended automation policy tool — both designed to drive adoption with existing customers rather than acquire new ones.",
  },
  {
    role: "PRODUCT MANAGEMENT",
    company: "Daimler Truck",
    logo: "/logos/daimler-truck.png",
    date: "2024",
    description:
      "Worked on Treasure, Daimler Truck's internal analytics platform — writing PRDs, user stories, and product change presentations for internal customers. Ran cloud cost analysis across vendors including Databricks, Palantir, and Microsoft Fabric, segmenting network costs for better controlling. Helped implement a cost automation API to streamline the entire process.",
  },
];

function ExperienceCard({ experience, delay }) {
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
    <div
      ref={ref}
      className="flex h-full flex-col rounded-2xl border border-[#222222] px-7 py-8 hover:border-[#f97316] hover:shadow-[0_0_24px_rgba(249,115,22,0.08)]"
      style={{
        backgroundColor: "#141414",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, border-color 0.3s ease, box-shadow 0.3s ease`,
      }}
    >
      <div className="mb-4 flex h-12 items-center justify-center">
        <Image
          src={experience.logo}
          alt={experience.company}
          width={140}
          height={48}
          style={{
            objectFit: "contain",
            objectPosition: "left center",
            filter: "brightness(0) invert(1)",
            maxHeight: "48px",
            width: "auto",
          }}
        />
      </div>

      <div className="my-4 h-px w-full" style={{ backgroundColor: "#1e1e1e" }} />

      <p
        className="mb-2 text-[10px] font-semibold tracking-[0.18em]"
        style={{ color: "#f97316" }}
      >
        {experience.role}
      </p>
      <p className="mb-0 text-xs" style={{ color: "#888880" }}>
        {experience.date}
      </p>

      <p className="mt-4 flex-1 text-sm leading-[1.75]" style={{ color: "#888880" }}>
        {experience.description}
      </p>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="w-full">
      <div className="mx-auto max-w-[900px] px-20 pb-[60px] pt-[120px] text-center">
        <p
          className="text-xs font-semibold tracking-[0.2em]"
          style={{ color: "var(--accent)" }}
        >
          EXPERIENCE
        </p>
        <h2
          className="mt-4 text-[48px] font-bold leading-[1.1]"
          style={{ color: "var(--text)" }}
        >
          Where the thinking was tested.
        </h2>
      </div>

      <div className="mx-auto max-w-[1200px] px-20 pb-[120px]">
        <div className="grid grid-cols-3 items-stretch gap-5">
          {EXPERIENCES.map((experience, index) => (
            <ExperienceCard
              key={experience.company}
              experience={experience}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
