import type { MaintenanceTicket } from "@/components/demo/types";
import { AlertTriangle, CheckCircle2, Clock3 } from "lucide-react";

type MaintenanceViewProps = {
  maintenanceTickets: MaintenanceTicket[];
  expandedTicketId: number | null;
  onToggleTicket: (ticketId: number) => void;
  onMarkComplete: (ticketId: number) => void;
  onReassignVendor: (ticket: MaintenanceTicket) => void;
  onContactTenant: (ticket: MaintenanceTicket) => void;
};

function statusClasses(status: MaintenanceTicket["status"]) {
  if (status === "urgent") {
    return {
      badge: "bg-red-500/15 text-red-300 border border-red-500/30",
      progress: "bg-red-500",
      icon: <AlertTriangle className="w-4 h-4 text-red-400" />,
      label: "Urgent",
    };
  }

  if (status === "completed") {
    return {
      badge: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
      progress: "bg-emerald-500",
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
      label: "Completed",
    };
  }

  return {
    badge: "bg-yellow-500/15 text-yellow-300 border border-yellow-500/30",
    progress: "bg-yellow-400",
    icon: <Clock3 className="w-4 h-4 text-yellow-400" />,
    label: "In Progress",
  };
}

export default function MaintenanceView({
  maintenanceTickets,
  expandedTicketId,
  onToggleTicket,
  onMarkComplete,
  onReassignVendor,
  onContactTenant,
}: MaintenanceViewProps) {
  return (
    <div className="space-y-3">
      {maintenanceTickets.map((ticket) => {
        const expanded = expandedTicketId === ticket.id;
        const status = statusClasses(ticket.status);
        const completed = ticket.status === "completed";
        return (
          <div
            key={ticket.id}
            className="rounded-xl border border-white/10 bg-[#0C0C0C] overflow-hidden"
          >
            <button
              type="button"
              onClick={() => onToggleTicket(ticket.id)}
              className="w-full px-4 py-4 text-left hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2 text-white font-medium">
                    {status.icon}
                    Unit {ticket.unit} — {ticket.issue}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Vendor: {ticket.vendor} · ETA {ticket.eta}
                  </p>
                </div>
                <span className={`text-[11px] px-2 py-1 rounded-full ${status.badge}`}>
                  {status.label}
                </span>
              </div>

              <div className="mt-3 h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                <div
                  className={`h-full ${status.progress}`}
                  style={{ width: `${ticket.progress}%` }}
                />
              </div>
            </button>

            {expanded && (
              <div className="border-t border-white/5 bg-white/[0.02] p-4 space-y-3">
                <p className="text-sm text-gray-300">{ticket.description}</p>
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-gray-400">
                  <span>
                    {ticket.vendor} · {ticket.vendorPhone}
                  </span>
                  <span>Assigned {ticket.assignedAt}</span>
                </div>

                <div className="space-y-2">
                  {ticket.timeline.map((item, index) => (
                    <div key={`${ticket.id}-${item.time}-${index}`} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            index <= ticket.timeline.length - 2 || completed
                              ? "bg-emerald-400"
                              : "bg-gray-500/60"
                          }`}
                        />
                        {index < ticket.timeline.length - 1 && (
                          <span className="w-px flex-1 bg-white/10 mt-1" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{item.time}</p>
                        <p className="text-sm text-gray-300">{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-gray-300">
                  {completed ? "Final" : "Estimated"}:{" "}
                  <span className="text-white">{ticket.cost}</span>
                </p>

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
  );
}
