import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { EyeOff } from "lucide-react";

type Mood = "idle" | "focused" | "calm" | "energized" | "sleepy" | "brainy";

const MOOD_LABELS: Record<Mood, string> = {
  idle: "Idle",
  focused: "Focused",
  calm: "Calm",
  energized: "Energized",
  sleepy: "Sleepy",
  brainy: "Brainy",
};

const MOOD_ANIM: Record<Mood, string> = {
  idle: "buddy-bob 2s ease-in-out infinite",
  focused: "buddy-bob 1.5s ease-in-out infinite",
  calm: "buddy-breathe 4s ease-in-out infinite",
  energized: "buddy-bounce 0.8s ease-in-out infinite",
  sleepy: "buddy-sway 5s ease-in-out infinite",
  brainy: "buddy-pulse 2s ease-in-out infinite",
};

const getPathMood = (path: string): Mood => {
  if (
    path.includes("/nootropics-for-focus") ||
    path.includes("/compare") ||
    path.includes("/builder") ||
    path.includes("/videos")
  )
    return "focused";
  if (path.includes("/nootropics-for-anxiety") || path.includes("/start-here"))
    return "calm";
  if (
    path.includes("/best-nootropics") ||
    path.includes("/research") ||
    path.includes("/glossary") ||
    path.includes("/best-stacks") ||
    path.includes("/guides") ||
    path.includes("/library")
  )
    return "brainy";
  if (
    path.includes("/supplements/melatonin") ||
    path.includes("/supplements/magnesium")
  )
    return "sleepy";
  if (
    path.includes("/supplements/caffeine") ||
    path.includes("/supplements/rhodiola")
  )
    return "energized";
  if (
    path.includes("/supplements/ashwagandha") ||
    path.includes("/supplements/l-theanine")
  )
    return "calm";
  if (
    path.includes("/supplements/lions-mane") ||
    path.includes("/supplements/bacopa") ||
    path.includes("/supplements/alpha-gpc") ||
    path.includes("/supplements/omega-3")
  )
    return "brainy";
  if (path.includes("/supplements/")) return "focused";
  return "idle";
};

const STYLE_TAG = `
@keyframes buddy-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }
@keyframes buddy-bounce { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
@keyframes buddy-breathe { 0%,100% { transform: scale(1) } 50% { transform: scale(1.02) } }
@keyframes buddy-sway { 0%,100% { transform: rotate(0deg) } 25% { transform: rotate(-3deg) } 75% { transform: rotate(3deg) } }
@keyframes buddy-pulse { 0%,100% { filter: drop-shadow(0 0 2px #A855F7) } 50% { filter: drop-shadow(0 0 8px #A855F7) } }
@keyframes buddy-zzz { 0% { opacity: 0; transform: translateY(0) } 50% { opacity: 1 } 100% { opacity: 0; transform: translateY(-12px) } }
@keyframes buddy-fadein { from { opacity: 0 } to { opacity: 1 } }
`;

interface BuddyFaceProps {
  mood: Mood;
}

function BuddyFace({ mood }: BuddyFaceProps) {
  // Eyes vary by mood
  const renderEyes = () => {
    switch (mood) {
      case "calm":
        // half-closed (short rects)
        return (
          <>
            <rect x="9" y="10" width="4" height="2" fill="#1a0033" />
            <rect x="19" y="10" width="4" height="2" fill="#1a0033" />
          </>
        );
      case "sleepy":
        // nearly closed lines
        return (
          <>
            <rect x="9" y="11" width="4" height="1" fill="#1a0033" />
            <rect x="19" y="11" width="4" height="1" fill="#1a0033" />
          </>
        );
      case "energized":
        // wide + sparkle pixels
        return (
          <>
            <rect x="9" y="8" width="4" height="4" fill="#1a0033" />
            <rect x="19" y="8" width="4" height="4" fill="#1a0033" />
            <rect x="10" y="9" width="2" height="2" fill="#FFFFFF" />
            <rect x="20" y="9" width="2" height="2" fill="#FFFFFF" />
            <rect x="7" y="7" width="1" height="1" fill="#FFD700" />
            <rect x="24" y="7" width="1" height="1" fill="#FFD700" />
            <rect x="13" y="6" width="1" height="1" fill="#FFD700" />
          </>
        );
      case "focused":
        // normal + red intensity marks
        return (
          <>
            <rect x="9" y="8" width="4" height="4" fill="#1a0033" />
            <rect x="19" y="8" width="4" height="4" fill="#1a0033" />
            <rect x="10" y="9" width="2" height="2" fill="#FFFFFF" />
            <rect x="20" y="9" width="2" height="2" fill="#FFFFFF" />
            <rect x="8" y="7" width="1" height="1" fill="#EF4444" />
            <rect x="13" y="7" width="1" height="1" fill="#EF4444" />
            <rect x="18" y="7" width="1" height="1" fill="#EF4444" />
            <rect x="23" y="7" width="1" height="1" fill="#EF4444" />
          </>
        );
      case "brainy":
        // star pupils (colored pixels)
        return (
          <>
            <rect x="9" y="8" width="4" height="4" fill="#1a0033" />
            <rect x="19" y="8" width="4" height="4" fill="#1a0033" />
            <rect x="10" y="9" width="2" height="2" fill="#A855F7" />
            <rect x="20" y="9" width="2" height="2" fill="#A855F7" />
            <rect x="11" y="8" width="1" height="1" fill="#FFD700" />
            <rect x="21" y="8" width="1" height="1" fill="#FFD700" />
            <rect x="11" y="11" width="1" height="1" fill="#FFD700" />
            <rect x="21" y="11" width="1" height="1" fill="#FFD700" />
          </>
        );
      case "idle":
      default:
        // normal dots with white highlight
        return (
          <>
            <rect x="9" y="8" width="4" height="4" fill="#1a0033" />
            <rect x="19" y="8" width="4" height="4" fill="#1a0033" />
            <rect x="10" y="9" width="2" height="2" fill="#FFFFFF" />
            <rect x="20" y="9" width="2" height="2" fill="#FFFFFF" />
          </>
        );
    }
  };

  // Mouth varies by mood
  const renderMouth = () => {
    switch (mood) {
      case "idle":
        // slight smile path
        return (
          <path
            d="M12 19 L14 20 L18 20 L20 19"
            stroke="#1a0033"
            strokeWidth="1"
            fill="none"
          />
        );
      case "focused":
        // flat line
        return (
          <rect x="13" y="19" width="6" height="1" fill="#1a0033" />
        );
      case "calm":
        // gentle curve smile
        return (
          <path
            d="M12 19 Q16 21 20 19"
            stroke="#1a0033"
            strokeWidth="1"
            fill="none"
          />
        );
      case "energized":
        // open smile + pink fill
        return (
          <>
            <path
              d="M12 18 Q16 22 20 18 L20 19 Q16 22 12 19 Z"
              fill="#FF7AAA"
              stroke="#1a0033"
              strokeWidth="1"
            />
          </>
        );
      case "sleepy":
        // flat + drooping
        return (
          <path
            d="M12 20 Q16 19 20 20"
            stroke="#1a0033"
            strokeWidth="1"
            fill="none"
          />
        );
      case "brainy":
        // purple smile
        return (
          <path
            d="M12 19 Q16 21 20 19"
            stroke="#A855F7"
            strokeWidth="1"
            fill="none"
          />
        );
      default:
        return null;
    }
  };

  return (
    <svg
      width="64"
      height="80"
      viewBox="0 0 32 40"
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`Neuro the brainy mascot — ${MOOD_LABELS[mood]}`}
    >
      {/* Brain bumps */}
      <rect x="8" y="0" width="6" height="4" fill="#C8A8FF" rx="1" />
      <rect x="18" y="0" width="6" height="4" fill="#C8A8FF" rx="1" />

      {/* Brain head */}
      <rect x="4" y="2" width="24" height="16" fill="#D4B8FF" rx="2" />

      {/* Texture lines */}
      <rect
        x="10"
        y="4"
        width="1"
        height="12"
        fill="#9B7EC8"
        opacity="0.35"
      />
      <rect
        x="16"
        y="4"
        width="1"
        height="12"
        fill="#9B7EC8"
        opacity="0.35"
      />
      <rect
        x="22"
        y="4"
        width="1"
        height="12"
        fill="#9B7EC8"
        opacity="0.35"
      />

      {/* Face base */}
      <rect x="8" y="16" width="16" height="6" fill="#E8D5FF" rx="1" />

      {/* Body (lab coat) */}
      <rect x="8" y="22" width="16" height="10" fill="#F0E8FF" rx="1" />

      {/* Collar */}
      <rect x="14" y="22" width="4" height="3" fill="white" />

      {/* Arms */}
      <rect x="0" y="24" width="8" height="3" fill="#C8A8FF" rx="1" />
      <rect x="24" y="24" width="8" height="3" fill="#C8A8FF" rx="1" />

      {/* Legs */}
      <rect x="10" y="32" width="5" height="7" fill="#C8A8FF" rx="1" />
      <rect x="17" y="32" width="5" height="7" fill="#C8A8FF" rx="1" />

      {/* Feet */}
      <rect x="8" y="37" width="7" height="3" fill="#9B7EC8" rx="1" />
      <rect x="17" y="37" width="7" height="3" fill="#9B7EC8" rx="1" />

      {/* Eyes */}
      {renderEyes()}

      {/* Mouth */}
      {renderMouth()}
    </svg>
  );
}

export default function PixelBuddy() {
  const [location] = useLocation();
  const [mounted, setMounted] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [mood, setMood] = useState<Mood>(() => getPathMood(location));

  // On mount: check localStorage for hidden state
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("pixelbuddy_hidden");
    if (stored === "1") {
      setHidden(true);
      return;
    }
    setMounted(true);

    // Fade in after 3-second delay
    const fadeTimer = window.setTimeout(() => {
      setVisible(true);
    }, 3000);

    // Tooltip fades in 1s after character appears
    const tooltipTimer = window.setTimeout(() => {
      setShowTooltip(true);
    }, 4000);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(tooltipTimer);
    };
  }, []);

  // Mood transitions: 800ms delay on location change
  useEffect(() => {
    if (typeof window === "undefined") return;
    const targetMood = getPathMood(location);
    if (targetMood === mood) return;
    const timer = window.setTimeout(() => {
      setMood(targetMood);
    }, 800);
    return () => window.clearTimeout(timer);
  }, [location, mood]);

  const handleHide = () => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("pixelbuddy_hidden", "1");
    setHidden(true);
  };

  if (hidden || !mounted) return null;

  const moodLabel = MOOD_LABELS[mood];

  return (
    <>
      <style>{STYLE_TAG}</style>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 50,
          opacity: visible ? 1 : 0,
          transition: "opacity 1.5s ease-in-out",
          pointerEvents: visible ? "auto" : "none",
          width: "64px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        aria-live="polite"
      >
        {/* Tooltip */}
        <div
          style={{
            opacity: showTooltip && visible ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            marginBottom: "4px",
            background: "rgba(26, 0, 51, 0.85)",
            color: "#E8D5FF",
            fontSize: "10px",
            fontFamily: "monospace",
            padding: "2px 6px",
            borderRadius: "4px",
            whiteSpace: "nowrap",
            border: "1px solid #A855F7",
          }}
        >
          {moodLabel}
        </div>

        {/* Character wrapper with hide button */}
        <div style={{ position: "relative" }}>
          <button
            type="button"
            onClick={handleHide}
            aria-label="Hide PixelBuddy"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "12px",
              height: "12px",
              padding: 0,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "#9B7EC8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <EyeOff size={6} />
          </button>

          <div
            style={{
              animation: MOOD_ANIM[mood],
              transformOrigin: "center bottom",
              willChange: "transform, filter",
            }}
          >
            <BuddyFace mood={mood} />
          </div>

          {/* Sleepy ZZZ */}
          {mood === "sleepy" && (
            <div
              style={{
                position: "absolute",
                top: "-8px",
                right: "-4px",
                fontSize: "10px",
                fontFamily: "monospace",
                color: "#A855F7",
                fontWeight: "bold",
                animation: "buddy-zzz 2.5s ease-in-out infinite",
                pointerEvents: "none",
              }}
            >
              ZZZ
            </div>
          )}
        </div>
      </div>
    </>
  );
}
