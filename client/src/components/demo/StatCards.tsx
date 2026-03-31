import type { DemoStats } from "@/components/demo/types";
import { BarChart3, Clock3, MessageSquare, Wrench } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

type StatCardsProps = {
  stats: DemoStats;
  onOpenMessages: () => void;
  onSetAvgResponseInfo: (open: boolean) => void;
  onOpenMaintenance: () => void;
  onOpenOwnerReports: () => void;
  showAvgResponseInfo: boolean;
};

function StatCard({
  title,
  value,
  subtext,
  icon,
  onClick,
  children,
}: {
  title: string;
  value: string;
  subtext: string;
  icon: ReactNode;
  onClick: () => void;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative rounded-xl bg-white/[0.03] border border-white/5 p-4 text-left hover:border-emerald-500/30 transition-all duration-200 hover:scale-[1.02]"
    >
      <span className="inline-flex items-center gap-2 text-xs text-gray-500 mb-2">
        {icon}
        {title}
      </span>
      <div className="text-2xl lg:text-3xl font-bold text-white mb-1 tracking-tight">{value}</div>
      <div className="text-xs text-gray-400">{subtext}</div>
      {children}
    </button>
  );
}

export default function StatCards({
  stats,
  onOpenMessages,
  onSetAvgResponseInfo,
  onOpenMaintenance,
  onOpenOwnerReports,
  showAvgResponseInfo,
}: StatCardsProps) {
  const avgCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!showAvgResponseInfo) return;
    const handleOutside = (event: MouseEvent) => {
      if (!avgCardRef.current) return;
      if (!avgCardRef.current.contains(event.target as Node)) {
        onSetAvgResponseInfo(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [showAvgResponseInfo, onSetAvgResponseInfo]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
      <StatCard
        title="Messages Today"
        value={String(stats.messagesToday)}
        subtext={`↓ ${stats.autoHandled} auto-handled`}
        icon={<MessageSquare className="w-3.5 h-3.5" />}
        onClick={onOpenMessages}
      />

      <div ref={avgCardRef}>
        <StatCard
          title="Avg Response Time"
          value={stats.avgResponse}
          subtext="↓ significantly faster"
          icon={<Clock3 className="w-3.5 h-3.5" />}
          onClick={() => onSetAvgResponseInfo(!showAvgResponseInfo)}
        >
          {showAvgResponseInfo && (
            <div className="absolute z-20 left-3 right-3 top-[calc(100%+8px)] rounded-xl border border-white/10 bg-[#111] px-3 py-2 text-xs text-gray-300 shadow-2xl">
              Average across all auto-replies today. Significantly faster than typical manual response.
            </div>
          )}
        </StatCard>
      </div>

      <StatCard
        title="Open Tickets"
        value={String(stats.openTickets)}
        subtext={stats.openTickets === 0 ? "All completed" : "Needs attention"}
        icon={<Wrench className="w-3.5 h-3.5" />}
        onClick={onOpenMaintenance}
      />

      <StatCard
        title="Owner Reports Due"
        value={String(stats.ownerReportsDue)}
        subtext={stats.ownerReportsDue === 0 ? "✓ All sent" : "Action required"}
        icon={<BarChart3 className="w-3.5 h-3.5" />}
        onClick={onOpenOwnerReports}
      />
    </div>
  );
}
