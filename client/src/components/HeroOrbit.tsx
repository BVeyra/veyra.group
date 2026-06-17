import { Workflow } from "lucide-react";

/**
 * Animated integration orbit: the tools Veyra plugs into circle a glowing core.
 *
 * All rings rotate at ONE speed/direction, so the icons hold their formation and
 * never drift past each other. Rings are spaced wider than a chip and the angles
 * are interleaved, so no two logos ever crowd. Pure CSS rotation with per-chip
 * counter-rotation keeps the logos upright. Decorative only (aria-hidden); paused
 * for reduced-motion users via CSS.
 */
const DUR = 60; // seconds for one full rotation of the whole constellation

const RINGS: { r: number; diameter: number; offset: number; logos: string[] }[] = [
  {
    r: 84,
    diameter: 168,
    offset: 0,
    logos: [
      "https://www.google.com/s2/favicons?domain=appfolio.com&sz=64",
      "https://www.google.com/s2/favicons?domain=buildium.com&sz=64",
      "https://cdn.simpleicons.org/gmail/EA4335",
    ],
  },
  {
    r: 162,
    diameter: 324,
    offset: 45,
    logos: [
      "https://cdn.simpleicons.org/quickbooks/2CA01C",
      "https://cdn.simpleicons.org/stripe/635BFF",
      "https://api.iconify.design/simple-icons:microsoftoutlook.svg?color=%230078D4",
      "https://cdn.simpleicons.org/zillow/006AFF",
    ],
  },
  {
    r: 240,
    diameter: 480,
    offset: 22,
    logos: [
      "https://www.google.com/s2/favicons?domain=docusign.com&sz=64",
      "https://api.iconify.design/simple-icons:twilio.svg?color=%23F22F46",
      "https://cdn.simpleicons.org/zapier/FF4A00",
      "https://www.google.com/s2/favicons?domain=plaid.com&sz=64",
      "https://cdn.simpleicons.org/google/4285F4",
    ],
  },
];

export function HeroOrbit() {
  return (
    <div className="hero-orbit" aria-hidden="true">
      {RINGS.map((ring) => (
        <div key={`ring-${ring.r}`} className="ring" style={{ width: ring.diameter, height: ring.diameter }} />
      ))}

      <div className="orbit-core-pulse" />
      <div className="orbit-core">
        <Workflow className="w-8 h-8 text-emerald-50" />
      </div>

      {RINGS.map((ring) => (
        <div
          key={`orbit-${ring.r}`}
          className="orbit"
          style={{ ["--dur" as string]: `${DUR}s` } as React.CSSProperties}
        >
          {ring.logos.map((src, i) => {
            const a = ring.offset + (360 / ring.logos.length) * i;
            return (
              <div
                key={i}
                className="orbit-item"
                style={{ ["--a" as string]: `${a}deg`, ["--r" as string]: `${ring.r}px` } as React.CSSProperties}
              >
                <div className="orbit-counter" style={{ ["--dur" as string]: `${DUR}s` } as React.CSSProperties}>
                  <div className="orbit-upright" style={{ ["--a" as string]: `${a}deg` } as React.CSSProperties}>
                    <span className="orbit-chip">
                      <img src={src} alt="" loading="lazy" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
