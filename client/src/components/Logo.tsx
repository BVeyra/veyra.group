/**
 * Veyra wordmark: monochrome, in Bricolage Grotesque, rendered as live text so
 * it stays crisp at any size. "Group" is sized and baseline-aligned so its cap
 * height matches the x-height of "eyra". Size by passing a text-size class
 * (e.g. "text-[1.7rem]"); width is automatic.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      aria-label="Veyra Group"
      role="img"
      className={`inline-flex items-baseline select-none whitespace-nowrap ${className}`}
    >
      <span
        className="text-[#f3f6f4]"
        style={{ fontFamily: '"Bricolage Grotesque", "Inter", system-ui, sans-serif', fontWeight: 700, letterSpacing: "-0.02em" }}
      >
        Veyra
      </span>
      <span
        className="ml-[0.34em] text-[0.72em] text-[#8b938f]"
        style={{ fontFamily: '"Inter", system-ui, sans-serif', fontWeight: 500 }}
      >
        Group
      </span>
    </span>
  );
}
