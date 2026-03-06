export default function CalculatorPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0f0a" }}>
      <iframe
        src="/roi-calculator.html"
        title="Veyra Group ROI Calculator"
        style={{ width: "100%", minHeight: "100vh", border: "0", display: "block" }}
      />
    </div>
  );
}
