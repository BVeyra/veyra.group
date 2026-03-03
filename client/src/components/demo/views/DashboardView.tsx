import type { ApprovalItem, MaintenanceTicket } from "@/components/demo/types";
import { AlertTriangle, CheckCircle2, Clock3, MoreHorizontal } from "lucide-react";

type DashboardViewProps = {
  approvalQueue: ApprovalItem[];
  maintenanceTickets: MaintenanceTicket[];
  expandedTicketId: number | null;
  onApprove: (itemId: number) => void;
  onOpenEdit: (itemId: number) => void;
  onReopen: (itemId: number) => void;
  onToggleTicket: (ticketId: number) => void;
  onMarkComplete: (ticketId: number) => void;
  onReassignVendor: (ticket: MaintenanceTicket) => void;
  onContactTenant: (ticket: MaintenanceTicket) => void;
};

function getQueueBadge(status: ApprovalItem["status"]) {
  if (status === "needs-review") {
    return {
      label: "Needs Review ⚠️",
      classes:
        "text-yellow-400 bg-yellow-500/10 border border-yellow-500/20",
    };
  }

  if (status === "edited-sent") {
    return {
      label: "Edited & Sent ✓",
      classes:
        "text-emerald-300 bg-emerald-500/10 border border-emerald-500/20",
    };
  }

  if (status === "approved-sent") {
    return {
      label: "Approved & Sent ✓",
      classes:
        "text-emerald-300 bg-emerald-500/10 border border-emerald-500/20",
    };
  }

  return {
    label: "Auto-replied ✓",
    classes:
      "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20",
  };
}

function TicketStatusIcon({ status }: { status: MaintenanceTicket["status"] }) {
  if (status === "urgent") {
    return <AlertTriangle className="w-3.5 h-3.5 mt-0.5 text-red-400" />;
  }

  if (status === "completed") {
    return <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-emerald-400" />;
  }

  return <Clock3 className="w-3.5 h-3.5 mt-0.5 text-yellow-400" />;
}

function progressColor(status: MaintenanceTicket["status"]) {
  if (status === "urgent") return "bg-red-500";
  if (status === "completed") return "bg-emerald-500";
  return "bg-yellow-400";
}

function timelineDotClass(index: number, total: number, completed: boolean) {
  if (!completed) return "bg-gray-500/50";
  if (index === total - 1) return "bg-emerald-300";
  return "bg-emerald-500";
}

export default function DashboardView({
  approvalQueue,
  maintenanceTickets,
  expandedTicketId,
  onApprove,
  onOpenEdit,
  onReopen,
  onToggleTicket,
  onMarkComplete,
  onReassignVendor,
  onContactTenant,
}: DashboardViewProps) {
  const queueCount = approvalQueue.filter(
    (item) => item.status !== "approved-sent" && item.status !== "edited-sent"
  ).length;
  const openTicketsCount = maintenanceTickets.filter((ticket) => ticket.status !== "completed").length;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 md:gap-6 h-auto">
      <div className="xl:col-span-3 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-white inline-flex items-center gap-2">
            Approval Queue
            <span className="bg-white/10 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {queueCount}
            </span>
          </h3>
        </div>

        <div className="flex-1 flex flex-col gap-3">
          {approvalQueue.map((item) => {
            const badge = getQueueBadge(item.status);
            const needsReview = item.status === "needs-review";
            const hasResolvedAction = item.status === "approved-sent" || item.status === "edited-sent";

            return (
              <div
                key={item.id}
                className={`rounded-xl border p-3 transition-colors ${
                  needsReview
                    ? "border-yellow-500/20 border-l-2 border-l-yellow-400/50 bg-yellow-500/[0.03]"
                    : "border-white/5 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      Unit {item.unit} — {item.tenant}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{item.message}</p>
                  </div>
                  <span className="text-xs text-gray-600 shrink-0">{item.time}</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className={`inline-flex text-[10px] font-medium rounded-full px-2 py-0.5 ${badge.classes}`}>
                    {badge.label}
                  </span>

                  <div className="inline-flex items-center gap-2">
                    {needsReview && (
                      <>
                        <button
                          type="button"
                          onClick={() => onApprove(item.id)}
                          className="text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg px-3 py-1.5 hover:bg-emerald-500/20 transition-colors min-h-11"
                        >
                          Approve AI Draft
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenEdit(item.id)}
                          className="text-xs font-medium bg-white/5 text-gray-300 border border-white/10 rounded-lg px-3 py-1.5 hover:bg-white/10 transition-colors min-h-11"
                        >
                          Edit & Send
                        </button>
                      </>
                    )}

                    {hasResolvedAction && (
                      <button
                        type="button"
                        onClick={() => onReopen(item.id)}
                        className="text-xs font-medium bg-white/5 text-gray-300 border border-white/10 rounded-lg px-3 py-1.5 hover:bg-white/10 transition-colors min-h-11"
                      >
                        Re-open for Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="xl:col-span-2 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-white inline-flex items-center gap-2">
            Maintenance
            <span className="bg-white/10 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {openTicketsCount}
            </span>
          </h3>
        </div>

        <div className="flex flex-col gap-3">
          {maintenanceTickets.map((ticket) => {
            const expanded = expandedTicketId === ticket.id;
            const completed = ticket.status === "completed";

            return (
              <div
                key={ticket.id}
                className="rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => onToggleTicket(ticket.id)}
                  className="w-full p-3 text-left hover:bg-white/[0.03] transition-colors"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <TicketStatusIcon status={ticket.status} />
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-white">
                        Unit {ticket.unit} — {ticket.issue}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        Vendor: {ticket.vendor} · {ticket.eta}
                      </div>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-gray-500 ml-auto shrink-0" />
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-2">
                    <div
                      className={`h-full ${progressColor(ticket.status)} transition-all duration-300`}
                      style={{ width: `${ticket.progress}%` }}
                    />
                  </div>
                </button>

                {expanded && (
                  <div className="bg-white/[0.02] border-t border-white/5 p-4 space-y-3">
                    <p className="text-sm text-gray-300">{ticket.description}</p>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
                      <span>
                        {ticket.vendor} · {ticket.vendorPhone}
                      </span>
                      <span>Assigned {ticket.assignedAt}</span>
                    </div>

                    <div className="space-y-2">
                      {ticket.timeline.map((entry, index) => {
                        const isCompleted = ticket.status === "completed" || index < ticket.timeline.length - 1;
                        return (
                          <div key={`${entry.time}-${entry.event}`} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <span
                                className={`w-2 h-2 rounded-full ${timelineDotClass(
                                  index,
                                  ticket.timeline.length,
                                  isCompleted
                                )}`}
                              />
                              {index < ticket.timeline.length - 1 && (
                                <span className="w-px flex-1 bg-white/10 mt-1" />
                              )}
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">{entry.time}</p>
                              <p className="text-sm text-gray-300">{entry.event}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="text-sm text-gray-300">
                      {completed ? "Final" : "Estimated"}:{" "}
                      <span className="text-white">{ticket.cost}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {!completed && (
                        <button
                          type="button"
                          onClick={() => onMarkComplete(ticket.id)}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg px-4 py-2 text-sm min-h-11"
                        >
                          Mark Complete
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => onReassignVendor(ticket)}
                        className="border border-white/10 text-gray-300 hover:bg-white/5 rounded-lg px-4 py-2 text-sm min-h-11"
                      >
                        Reassign Vendor
                      </button>
                      <button
                        type="button"
                        onClick={() => onContactTenant(ticket)}
                        className="border border-white/10 text-gray-300 hover:bg-white/5 rounded-lg px-4 py-2 text-sm min-h-11"
                      >
                        Contact Tenant
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
