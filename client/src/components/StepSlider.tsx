import { useCallback, useEffect, useRef } from "react";

interface StepSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  label?: string;
  suffix?: string;
  prefix?: string;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function StepSlider({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  suffix = "",
  prefix = "",
}: StepSliderProps) {
  const holdTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const latestRef = useRef({ value, onChange, min, max, step });

  useEffect(() => {
    latestRef.current = { value, onChange, min, max, step };
  }, [value, onChange, min, max, step]);

  const clearHold = useCallback(() => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }

    window.removeEventListener("mouseup", clearHold);
    window.removeEventListener("touchend", clearHold);
    window.removeEventListener("touchcancel", clearHold);
    window.removeEventListener("blur", clearHold);
  }, []);

  useEffect(() => clearHold, [clearHold]);

  const nudge = useCallback((direction: number) => {
    const { value: current, min: minValue, max: maxValue, step: stepValue, onChange: handleChange } = latestRef.current;
    const next = clamp(current + direction * stepValue, minValue, maxValue);
    if (next !== current) {
      handleChange(next);
    }
  }, []);

  const startHold = useCallback(
    (direction: number) => {
      clearHold();
      nudge(direction);

      holdTimeoutRef.current = setTimeout(() => {
        holdIntervalRef.current = setInterval(() => {
          nudge(direction);
        }, 100);
      }, 400);

      window.addEventListener("mouseup", clearHold);
      window.addEventListener("touchend", clearHold);
      window.addEventListener("touchcancel", clearHold);
      window.addEventListener("blur", clearHold);
    },
    [clearHold, nudge]
  );

  const canDecrease = value > min;
  const canIncrease = value < max;
  const labelText = label || "value";
  const fill = max === min ? 0 : ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-[rgba(255,255,255,0.5)]">{label}</span>
        <span
          className="tabular-nums tracking-tight leading-none text-xl sm:text-2xl"
          style={{ fontVariantNumeric: "tabular-nums", letterSpacing: "-0.025em", lineHeight: 1 }}
        >
          {prefix && <span className="font-bold text-white">{prefix}</span>}
          <span className="font-bold text-white">{value}</span>
          {suffix && <span className="font-normal text-[rgba(255,255,255,0.5)]">{suffix}</span>}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`Decrease ${labelText}`}
          disabled={!canDecrease}
          onMouseDown={() => startHold(-1)}
          onMouseUp={clearHold}
          onMouseLeave={clearHold}
          onTouchStart={(event) => {
            event.preventDefault();
            startHold(-1);
          }}
          onTouchEnd={clearHold}
          className="w-11 h-11 sm:w-9 sm:h-9 rounded-xl sm:rounded-lg border bg-[rgba(5,150,105,0.08)] border-[rgba(5,150,105,0.25)] text-[#059669] flex items-center justify-center touch-manipulation select-none transition-all duration-200 active:scale-95 disabled:border-[rgba(5,150,105,0.08)] disabled:text-[rgba(255,255,255,0.2)] disabled:cursor-not-allowed disabled:active:scale-100"
        >
          <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" aria-hidden="true">
            <path d="M3.5 8h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <div className="relative flex-1 h-11 sm:h-9 flex items-center">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[6px] rounded-full bg-[rgba(255,255,255,0.08)]" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[6px] rounded-full bg-[linear-gradient(90deg,rgba(5,150,105,0.5),#059669)]"
            style={{ width: `${fill}%` }}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(event) => onChange(Number(event.target.value))}
            aria-label={label}
            className="relative z-10 w-full touch-manipulation"
            style={{ background: "transparent" }}
          />
        </div>

        <button
          type="button"
          aria-label={`Increase ${labelText}`}
          disabled={!canIncrease}
          onMouseDown={() => startHold(1)}
          onMouseUp={clearHold}
          onMouseLeave={clearHold}
          onTouchStart={(event) => {
            event.preventDefault();
            startHold(1);
          }}
          onTouchEnd={clearHold}
          className="w-11 h-11 sm:w-9 sm:h-9 rounded-xl sm:rounded-lg border bg-[rgba(5,150,105,0.08)] border-[rgba(5,150,105,0.25)] text-[#059669] flex items-center justify-center touch-manipulation select-none transition-all duration-200 active:scale-95 disabled:border-[rgba(5,150,105,0.08)] disabled:text-[rgba(255,255,255,0.2)] disabled:cursor-not-allowed disabled:active:scale-100"
        >
          <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" aria-hidden="true">
            <path d="M8 3.5v9M3.5 8h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
