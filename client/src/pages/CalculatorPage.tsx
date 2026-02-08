import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { openCalendly } from "@/lib/calendly";

interface SavingsResults {
  weeklyHours: number;
  monthlySavings: number;
  yearlySavings: number;
}

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValue = useRef(value);
  
  useEffect(() => {
    const startValue = prevValue.current;
    const endValue = value;
    const duration = 400;
    let startTime: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(startValue + (endValue - startValue) * easeOut));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        prevValue.current = endValue;
      }
    };
    
    requestAnimationFrame(animate);
  }, [value]);
  
  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{prefix}{displayValue.toLocaleString()}{suffix}</span>;
}

export default function CalculatorPage() {
  const [mounted, setMounted] = useState(false);
  const [teamSize, setTeamSize] = useState(10);
  const [hoursPerPerson, setHoursPerPerson] = useState(8);
  const [hourlyValue, setHourlyValue] = useState(50);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<SavingsResults | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculateSavings = () => {
    const weeklyHours = Math.round(teamSize * hoursPerPerson * 0.5);
    const monthlySavings = weeklyHours * 4 * hourlyValue;
    const yearlySavings = monthlySavings * 12;

    setResults({ weeklyHours, monthlySavings, yearlySavings });
    setShowResults(true);
  };

  const getSliderBackground = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    return `linear-gradient(to right, #10b981 0%, #64748b ${percentage}%, rgba(255,255,255,0.1) ${percentage}%, rgba(255,255,255,0.1) 100%)`;
  };

  return (
    <>
      <style>{`
        @keyframes meshMove {
          0%, 100% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(15deg); }
        }
        .mesh-bg {
          background: 
            radial-gradient(at 40% 20%, hsla(160, 80%, 40%, 0.2) 0px, transparent 50%),
            radial-gradient(at 80% 0%, hsla(215, 25%, 50%, 0.15) 0px, transparent 50%),
            radial-gradient(at 0% 50%, hsla(160, 70%, 35%, 0.15) 0px, transparent 50%),
            radial-gradient(at 80% 50%, hsla(215, 30%, 45%, 0.15) 0px, transparent 50%);
          animation: meshMove 20s ease-in-out infinite;
        }
        .animated-border::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: inherit;
          padding: 3px;
          background: conic-gradient(from 0deg, #10b981, #64748b, #10b981);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: spinGradient 3s linear infinite;
        }
        @keyframes spinGradient {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      
      <div style={{
        minHeight: "100vh",
        background: "#0a0a0f",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        position: "relative",
      }}>
        <div className="mesh-bg" style={{ position: "fixed", inset: 0, zIndex: 0 }} />
        
        <header style={{
          padding: "24px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "900px",
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
        }}>
          <Link href="/" style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
          }}>
            <img
              src="/veyra-logo.svg"
              alt="Veyra Group"
              style={{ height: "50px", width: "auto", display: "block" }}
              draggable={false}
            />
          </Link>
        </header>

        <main style={{
          padding: "24px 24px 64px",
          maxWidth: "800px",
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(10px)",
          transition: "all 0.4s ease-out",
        }}>
          <h1 className="gradient-text" style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: "700",
            marginBottom: "12px",
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
            textAlign: "center",
          }}>
            How Many Hours Could You Save?
          </h1>
          <p style={{
            color: "#71717a",
            fontSize: "18px",
            fontWeight: "400",
            marginBottom: "48px",
            textAlign: "center",
          }}>
            Most small teams spend 10-20 hours a week on work AI could handle.
          </p>

          <div className="glass-card" style={{ position: "relative", padding: "40px", marginBottom: "24px" }}>
            <div style={{ marginBottom: "36px" }}>
              <label style={{ color: "#ffffff", fontSize: "16px", fontWeight: "600", marginBottom: "16px", display: "block" }}>
                How many people on your team?
              </label>
              <div style={{ textAlign: "center", marginBottom: "16px" }}>
                <span className="gradient-text-blue" style={{ fontSize: "56px", fontWeight: "700" }}>{teamSize}</span>
                <span style={{ color: "#71717a", marginLeft: "8px" }}>people</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value))}
                data-testid="slider-team"
                style={{
                  width: "100%",
                  height: "8px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  WebkitAppearance: "none",
                  appearance: "none",
                  background: getSliderBackground(teamSize, 30),
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", color: "#52525b", fontSize: "13px" }}>
                <span>1</span>
                <span>30</span>
              </div>
            </div>

            <div style={{ marginBottom: "36px" }}>
              <label style={{ color: "#ffffff", fontSize: "16px", fontWeight: "600", marginBottom: "8px", display: "block" }}>
                Hours per person spent on repetitive tasks weekly
              </label>
              <p style={{ color: "#71717a", fontSize: "14px", marginBottom: "16px" }}>
                Think: emails, scheduling, data entry, reports, research
              </p>
              <div style={{ textAlign: "center", marginBottom: "16px" }}>
                <span className="gradient-text-blue" style={{ fontSize: "56px", fontWeight: "700" }}>{hoursPerPerson}</span>
                <span style={{ color: "#71717a", marginLeft: "8px" }}>hours/week</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={hoursPerPerson}
                onChange={(e) => setHoursPerPerson(parseInt(e.target.value))}
                data-testid="slider-hours"
                style={{
                  width: "100%",
                  height: "8px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  WebkitAppearance: "none",
                  appearance: "none",
                  background: getSliderBackground(hoursPerPerson, 20),
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", color: "#52525b", fontSize: "13px" }}>
                <span>1</span>
                <span>20</span>
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ color: "#ffffff", fontSize: "16px", fontWeight: "600", marginBottom: "16px", display: "block" }}>
                What's an hour of your team's time worth?
              </label>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
                {[25, 50, 75, 100, 150].map((value) => (
                  <button
                    key={value}
                    onClick={() => setHourlyValue(value)}
                    data-testid={`button-hourly-${value}`}
                    style={{
                      padding: "12px 24px",
                      borderRadius: "12px",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      backgroundColor: hourlyValue === value ? "rgba(0, 255, 255, 0.2)" : "transparent",
                      borderColor: hourlyValue === value ? "#10b981" : "rgba(255,255,255,0.1)",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      color: hourlyValue === value ? "#10b981" : "#71717a",
                      boxShadow: hourlyValue === value ? "0 0 20px rgba(0, 255, 255, 0.3)" : "none",
                    }}
                  >
                    ${value}/hr
                  </button>
                ))}
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <button
                onClick={calculateSavings}
                className="glow-button"
                data-testid="button-calculate"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "18px 40px",
                  border: "none",
                  borderRadius: "12px",
                  color: "#ffffff",
                  fontSize: "17px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Calculate My Savings
              </button>
            </div>
          </div>

          {showResults && results && (
            <div className="glass-card glow-border" style={{ padding: "40px", marginBottom: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
                <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "16px", padding: "24px", textAlign: "center", border: "1px solid rgba(0, 255, 255, 0.3)" }}>
                  <p style={{ fontSize: "13px", fontWeight: "500", marginBottom: "8px", color: "#10b981" }}>Weekly Hours Saved</p>
                  <p style={{ fontSize: "28px", fontWeight: "700", lineHeight: "1.2", color: "#10b981" }}>
                    <AnimatedNumber value={results.weeklyHours} suffix=" hrs" />
                  </p>
                </div>
                <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "16px", padding: "24px", textAlign: "center", border: "1px solid rgba(0, 255, 255, 0.3)" }}>
                  <p style={{ fontSize: "13px", fontWeight: "500", marginBottom: "8px", color: "#10b981" }}>Monthly Savings</p>
                  <p style={{ fontSize: "28px", fontWeight: "700", lineHeight: "1.2", color: "#10b981" }}>
                    <AnimatedNumber value={results.monthlySavings} prefix="$" />
                  </p>
                </div>
                <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "16px", padding: "24px", textAlign: "center", border: "1px solid rgba(0, 255, 255, 0.3)" }}>
                  <p style={{ fontSize: "13px", fontWeight: "500", marginBottom: "8px", color: "#10b981" }}>Yearly Savings</p>
                  <p style={{ fontSize: "28px", fontWeight: "700", lineHeight: "1.2", color: "#10b981" }}>
                    <AnimatedNumber value={results.yearlySavings} prefix="$" />
                  </p>
                </div>
              </div>

              <div style={{ background: "rgba(0, 255, 255, 0.08)", border: "1px solid rgba(0, 255, 255, 0.2)", borderRadius: "16px", padding: "28px", textAlign: "center", marginBottom: "32px" }}>
                <p style={{ color: "#ffffff", fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>
                  You could save {results.weeklyHours} hours every week
                </p>
                <p style={{ color: "#71717a", fontSize: "15px" }}>
                  I typically automate 40-60% of repetitive work in the first project.
                </p>
              </div>

              <div style={{ textAlign: "center" }}>
                <button
                  type="button"
                  onClick={openCalendly}
                  className="glow-button"
                  data-testid="button-book-call"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "18px 40px",
                    border: "none",
                    borderRadius: "12px",
                    color: "#ffffff",
                    fontSize: "17px",
                    fontWeight: "600",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  Book a Free Call →
                </button>
              </div>
            </div>
          )}
        </main>

        <footer style={{
          padding: "32px 24px",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          marginTop: "48px",
          position: "relative",
          zIndex: 10,
        }}>
          <p style={{ color: "#52525b", fontSize: "13px" }}>
            © 2026 Veyra Group Inc. · <Link href="/" style={{ color: "#71717a", textDecoration: "none" }}>Back to main site</Link>
          </p>
        </footer>
      </div>
    </>
  );
}
