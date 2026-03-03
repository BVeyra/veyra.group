import type { OwnerReportItem } from "@/components/demo/types";
import { ChevronDown } from "lucide-react";

type OwnerReportsViewProps = {
  reports: OwnerReportItem[];
  expandedReportId: number | null;
  onToggleExpanded: (reportId: number) => void;
  onGenerateReport: (reportId: number) => void;
};

function statusBadge(status: OwnerReportItem["status"]) {
  if (status === "sent") {
    return {
      label: "Sent",
      className: "text-emerald-300 bg-emerald-500/10 border border-emerald-500/30",
    };
  }
  if (status === "overdue") {
    return {
      label: "Overdue",
      className: "text-red-300 bg-red-500/10 border border-red-500/30",
    };
  }
  return {
    label: "Draft",
    className: "text-yellow-300 bg-yellow-500/10 border border-yellow-500/30",
  };
}

function metricCard(label: string, value: string) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-white">{value}</p>
    </div>
  );
}

export default function OwnerReportsView({
  reports,
  expandedReportId,
  onToggleExpanded,
  onGenerateReport,
}: OwnerReportsViewProps) {
  return (
    <div className="space-y-3">
      {reports.map((report) => {
        const expanded = expandedReportId === report.id;
        const meta = statusBadge(report.status);
        const isDraft = report.status === "draft";
        return (
          <div key={report.id} className="rounded-xl border border-white/10 bg-[#0C0C0C] overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 p-4">
              <button
                type="button"
                onClick={() => onToggleExpanded(report.id)}
                className="inline-flex min-w-0 flex-1 items-center gap-3 text-left"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {report.month} · {report.property}
                  </p>
                  <p className="text-xs text-gray-500">{report.date ?? "Not sent yet"}</p>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform ${expanded ? "rotate-180" : ""}`}
                />
              </button>

              <div className="inline-flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[11px] ${meta.className}`}>
                  {meta.label}
                </span>
                {isDraft && (
                  <button
                    type="button"
                    onClick={() => onGenerateReport(report.id)}
                    className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs text-white hover:bg-emerald-600 min-h-11"
                  >
                    {report.generated ? "Report Generated ✓" : "Generate Report"}
                  </button>
                )}
              </div>
            </div>

            {expanded && (
              <div className="border-t border-white/5 bg-white/[0.02] p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {metricCard("Occupancy", report.occupancy)}
                  {metricCard("Rent Collected", report.rentCollected)}
                  {metricCard("Maintenance Expenses", report.expenses)}
                  {metricCard("Net Income", report.netIncome)}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
