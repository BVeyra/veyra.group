/**
 * Veyra wordmark rendered as live text in the Outfit font, so it stays crisp at
 * any size and on any display (no rasterized/img fallback). Size it by passing a
 * text-size class (e.g. "text-[1.7rem]"); width is automatic.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      aria-label="Veyra Group"
      role="img"
      className={`inline-flex items-baseline font-extrabold leading-none tracking-[-0.02em] select-none whitespace-nowrap ${className}`}
      style={{ fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
    >
      <span className="bg-gradient-to-br from-[#34d8ab] to-[#2bc89f] bg-clip-text text-transparent">V</span>
      <span className="text-[#e8f0ec]">EYRA</span>
      <span className="ml-[0.2em] font-semibold text-[#9caea8]">GROUP</span>
    </span>
  );
}
