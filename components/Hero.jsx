"use client";

import { useEffect, useRef, useState } from "react";

const HEADLINE =
  "I do GTM with an unfair advantage: I've been on the side that builds the product.";

const FLOATING_CARDS = [
  { text: "ICP defined ✓", top: "12%", left: "5%", duration: "4s", delay: "0s", multiplier: 0.3 },
  { text: "Pipeline: 30 accounts", top: "25%", right: "6%", duration: "5s", delay: "0.5s", multiplier: 0.5 },
  { text: "Clay table: synced ✓", top: "40%", left: "3%", duration: "6s", delay: "1s", multiplier: 0.8 },
  { text: "Outbound sequences: 3", top: "55%", right: "5%", duration: "4.5s", delay: "1.5s", multiplier: 0.4 },
  { text: "AI enrichment: on", top: "70%", left: "6%", duration: "5.5s", delay: "0.8s", multiplier: 0.6 },
  { text: "Demo booked: 2", top: "80%", right: "8%", duration: "6.5s", delay: "1.2s", multiplier: 0.7 },
  { text: "New leads enriched: 22", top: "18%", left: "72%", duration: "5.2s", delay: "0.3s", multiplier: 0.45 },
  { text: "Apollo synced ✓", top: "65%", right: "18%", duration: "7s", delay: "1.7s", multiplier: 0.55 },
  { text: "HubSpot updated ✓", top: "85%", left: "35%", duration: "4.8s", delay: "0.6s", multiplier: 0.35 },
];

const TERMINAL_LINES = [
  "Finding the ICP...",
  "Building the motion...",
  "Closing the gap...",
  "Shipping the GTM...",
];

const GLITCH_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";

function randomScramble(length) {
  let result = "";
  for (let i = 0; i < length; i += 1) {
    result += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
  }
  return result;
}

export default function Hero() {
  const heroRef = useRef(null);

  const [mounted, setMounted] = useState(false);
  const [typedLength, setTypedLength] = useState(0);
  const typingDone = mounted && typedLength >= HEADLINE.length;

  const [terminalStarted, setTerminalStarted] = useState(false);
  const [terminalIndex, setTerminalIndex] = useState(0);
  const [terminalVisible, setTerminalVisible] = useState(true);

  const [glitching, setGlitching] = useState(true);
  const [glitchDone, setGlitchDone] = useState(false);
  const [scrambledText, setScrambledText] = useState("");

  const [mousePercent, setMousePercent] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- detects client mount for hydration safety; no external system to sync with
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !glitchDone || typingDone) return;
    const timeout = setTimeout(() => {
      setTypedLength((length) => length + 1);
    }, 40);
    return () => clearTimeout(timeout);
  }, [mounted, glitchDone, typedLength, typingDone]);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setTerminalStarted(true);
    }, 4000);
    return () => clearTimeout(startTimeout);
  }, []);

  useEffect(() => {
    if (!terminalStarted) return undefined;

    const interval = setInterval(() => {
      setTerminalVisible(false);
      setTimeout(() => {
        setTerminalIndex((index) => (index + 1) % TERMINAL_LINES.length);
        setTerminalVisible(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, [terminalStarted]);

  useEffect(() => {
    const scrambleInterval = setInterval(() => {
      setScrambledText(randomScramble(HEADLINE.length));
    }, 40);

    const stopTimeout = setTimeout(() => {
      clearInterval(scrambleInterval);
      setGlitching(false);
      setGlitchDone(true);
    }, 600);

    return () => {
      clearInterval(scrambleInterval);
      clearTimeout(stopTimeout);
    };
  }, []);

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return undefined;

    const handleMouseMove = (event) => {
      setMousePercent({
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      });

      const rect = node.getBoundingClientRect();
      setCursorPos({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    };

    node.addEventListener("mousemove", handleMouseMove);
    return () => node.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-20 py-[120px]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, color-mix(in srgb, var(--accent) 15%, transparent), transparent 70%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(10,10,10,0.5) 0%, transparent 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-0">
        {FLOATING_CARDS.map((card) => {
          const offsetX = -(mousePercent.x - 0.5) * 30 * card.multiplier;
          const offsetY = -(mousePercent.y - 0.5) * 20 * card.multiplier;
          return (
            <div
              key={card.text}
              className="pointer-events-none absolute flex items-center gap-2 whitespace-nowrap rounded-[10px] border px-4 py-2.5 text-xs"
              style={{
                top: card.top,
                left: card.left,
                right: card.right,
                backgroundColor: "#141414",
                borderColor: "#222222",
                color: "#888880",
                opacity: 0.7,
                animationName: "float",
                animationDuration: card.duration,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationDirection: "alternate",
                animationDelay: card.delay,
                translate: `${offsetX}px ${offsetY}px`,
                transition: "translate 0.1s ease-out",
              }}
            >
              <span
                className="h-[5px] w-[5px] shrink-0 rounded-full"
                style={{ backgroundColor: "#f97316" }}
              />
              {card.text}
            </div>
          );
        })}
      </div>

      <div
        className="pointer-events-none absolute z-0 rounded-full"
        style={{
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          left: cursorPos.x,
          top: cursorPos.y,
          transition: "left 0.15s ease-out, top 0.15s ease-out",
        }}
      />

      <div className="container relative z-[1] flex flex-col items-center text-center">
        <h1
          className="text-2xl font-semibold leading-snug sm:text-3xl"
          style={{ color: "var(--text)" }}
        >
          {glitching ? scrambledText : HEADLINE.slice(0, mounted ? typedLength : 0)}
          <span
            className="ml-1 inline-block h-[1em] w-[2px] animate-[blink_1s_step-end_infinite] align-middle"
            style={{ backgroundColor: "var(--accent)" }}
          />
        </h1>

        {typingDone && (
          <>
            <p
              className="mt-6 animate-[fadeIn_0.5s_ease-out]"
              style={{ color: "var(--muted)" }}
            >
              GTM operator. Product background. Based in Munich.
            </p>

            <div className="mt-8 flex animate-[fadeIn_0.5s_ease-out] gap-4 [animation-delay:200ms]">
              <a
                href="#work"
                className="rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
              >
                See My Work
              </a>
              <a
                href="#contact"
                className="rounded-full border px-6 py-3 text-sm font-medium transition-colors"
                style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
              >
                Get In Touch
              </a>
            </div>

            <div className="mt-10 flex items-center gap-2.5">
              <span
                className="shrink-0 font-mono text-[13px]"
                style={{ color: "#f97316" }}
              >
                &gt;
              </span>
              <span
                className="font-mono text-[13px]"
                style={{
                  color: "#888880",
                  opacity: terminalVisible ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                {TERMINAL_LINES[terminalIndex]}
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
