import type { LeaseItem } from "@/components/demo/types";

type LeasesViewProps = {
  leases: LeaseItem[];
  onSendNotice: (leaseId: number) => void;
};

function statusMeta(status: LeaseItem["status"]) {
  if (status === "active") {
    return {
      badge:
        "text-emerald-300 bg-emerald-500/10 border border-emerald-500/30",
      label: "Active",
      rowClass: "",
    };
  }
  if (status === "expired") {
    return {
      badge: "text-red-300 bg-red-500/10 border border-red-500/30",
      label: "Expired",
      rowClass: "bg-red-500/[0.02] border-l-2 border-l-red-400/60",
    };
  }
  return {
    badge: "text-yellow-300 bg-yellow-500/10 border border-yellow-500/30",
    label: "Expiring Soon",
    rowClass: "bg-yellow-500/[0.03] border-l-2 border-l-yellow-400",
  };
}

export default function LeasesView({ leases, onSendNotice }: LeasesViewProps) {
  const expiringCount = leases.filter((lease) => lease.status === "expiring-soon").length;
  const expiredCount = leases.filter((lease) => lease.status === "expired").length;
  const activeCount = leases.filter((lease) => lease.status === "active").length;

  return (
    <div className="rounded-xl border border-white/10 bg-[#0C0C0C] p-4 md:p-5">
      <div className="mb-4 text-sm text-gray-400">
        {activeCount} Active Leases · {expiringCount} Expiring Within 60 Days ·{" "}
        {expiredCount} Expired
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[840px] text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-white/10">
              <th className="py-2 pr-3">Unit</th>
              <th className="py-2 pr-3">Tenant</th>
              <th className="py-2 pr-3">Lease Start</th>
              <th className="py-2 pr-3">Lease End</th>
              <th className="py-2 pr-3">Rent/Month</th>
              <th className="py-2 pr-3">Status</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {leases.map((lease) => {
              const meta = statusMeta(lease.status);
              const canSend = lease.status !== "active";
              return (
                <tr key={lease.id} className={`border-b border-white/5 ${meta.rowClass}`}>
                  <td className="py-3 pr-3 text-white">{lease.unit}</td>
                  <td className="py-3 pr-3 text-gray-300">{lease.tenant}</td>
                  <td className="py-3 pr-3 text-gray-400">{lease.start}</td>
                  <td className="py-3 pr-3 text-gray-400">{lease.end}</td>
                  <td className="py-3 pr-3 text-gray-200">{lease.rent}</td>
                  <td className="py-3 pr-3">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full ${meta.badge}`}>
                      {meta.label}
                    </span>
                  </td>
                  <td className="py-3">
                    {canSend ? (
                      <button
                        type="button"
                        onClick={() => onSendNotice(lease.id)}
                        disabled={lease.noticeSent}
                        className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-gray-200 hover:bg-white/5 disabled:opacity-60"
                      >
                        {lease.noticeSent ? "Notice Sent ✓" : "Send Renewal Notice"}
                      </button>
                    ) : (
                      <span className="text-xs text-gray-500">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
