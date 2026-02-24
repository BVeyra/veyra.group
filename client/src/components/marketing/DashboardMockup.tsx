import { motion } from "framer-motion";
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Wrench,
} from "lucide-react";
import type { ReactNode } from "react";

export default function DashboardMockup() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-medium pl-1">What you see</div>

      <div className="rounded-2xl border border-white/10 bg-[#0C0C0C] overflow-hidden shadow-2xl shadow-black/50 relative ring-1 ring-white/5">
        <div className="absolute inset-0 shadow-[0_0_100px_rgba(52,211,153,0.05)] pointer-events-none" />

        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-0 bottom-0 left-[-60%] w-[50%] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
            animate={{ x: ["-30%", "220%"] }}
            transition={{ duration: 4.8, ease: "linear", repeat: Infinity, repeatDelay: 0.8 }}
          />
        </div>

        <div className="h-10 bg-[#111] border-b border-white/5 flex items-center px-4 justify-between z-20 relative">
          <div className="flex items-center">
            <div className="flex gap-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="bg-white/5 rounded-md px-3 py-1 text-xs text-gray-500 flex items-center font-mono">
              app.veyragroup.ai/dashboard
            </div>
          </div>
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] font-medium text-emerald-400">
            BJ
          </div>
        </div>

        <div className="flex h-[640px] md:h-[580px] relative z-0">
          <div className="hidden md:flex flex-col w-[220px] bg-[#0A0A0A] border-r border-white/5 py-6 shrink-0">
            <div className="px-4 mb-8">
              <span className="text-emerald-400 font-bold text-sm tracking-wide">VEYRA</span>
            </div>

            <div className="flex flex-col gap-1 px-2">
              <NavItem icon={<LayoutDashboard size={16} />} label="Dashboard" active />
              <NavItem icon={<MessageSquare size={16} />} label="Messages" badge="12" badgeColor="bg-emerald-500 text-black" />
              <NavItem icon={<Wrench size={16} />} label="Maintenance" badge="5" />
              <NavItem icon={<FileText size={16} />} label="Leases" />
              <NavItem icon={<BarChart3 size={16} />} label="Owner Reports" />
              <NavItem icon={<Settings size={16} />} label="Settings" />
            </div>

            <div className="mt-auto pt-4 px-4 border-t border-white/5 mx-2">
              <div className="text-[10px] text-gray-600 font-medium mb-1">PROPERTY</div>
              <div className="flex items-center justify-between text-sm text-gray-300 cursor-pointer hover:text-white transition-colors">
                <span className="truncate">Oakwood Apts</span>
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          <div className="flex-1 bg-[#0C0C0C] p-6 overflow-y-auto scrollbar-hide">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard title="Messages Today" value="24" subtext="↓ 18 auto-handled" subtextClass="text-emerald-400" />
              <StatCard title="Avg Response Time" value="47s" subtext="↓ 94% faster" subtextClass="text-emerald-400" />
              <StatCard title="Open Tickets" value="3" subtext="2 in progress" subtextClass="text-gray-500" />
              <StatCard title="Owner Reports Due" value="0" subtext="✓ All sent Feb 1" subtextClass="text-emerald-400" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-auto lg:h-[320px]">
              <div className="lg:col-span-3 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-white flex items-center gap-2">
                    Approval Queue
                    <span className="bg-white/10 text-white text-[10px] px-1.5 py-0.5 rounded-full">3</span>
                  </h3>
                </div>

                <div className="flex-1 flex flex-col gap-3">
                  <MessageRow
                    unit="Unit 12C — Sarah M."
                    message="Rent payment confirmation"
                    tag="Auto-replied ✓"
                    time="2 min ago"
                  />
                  <MessageRow
                    unit="Unit 4B — James T."
                    message="When is rent due?"
                    tag="Auto-replied ✓"
                    time="8 min ago"
                  />

                  <div className="rounded-xl border-l-2 border-yellow-400/50 bg-yellow-500/[0.03] border-y border-r border-white/5 p-3 group hover:bg-yellow-500/[0.05] transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                        <span className="text-sm text-white font-medium">Unit 8A — Maria L.</span>
                      </div>
                      <span className="text-xs text-gray-600">12 min ago</span>
                    </div>
                    <div className="pl-3.5 mb-3">
                      <p className="text-sm text-gray-300 mb-2">Noise complaint — requesting lease break</p>
                      <span className="inline-flex items-center text-[10px] font-medium text-yellow-400 bg-yellow-500/10 rounded-full px-2 py-0.5 border border-yellow-500/20">
                        Needs Review ⚠️
                      </span>
                    </div>
                    <div className="pl-3.5 flex gap-2">
                      <button className="text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg px-3 py-1.5 hover:bg-emerald-500/20 transition-colors">
                        Approve AI Draft
                      </button>
                      <button className="text-xs font-medium bg-white/5 text-gray-400 border border-white/5 rounded-lg px-3 py-1.5 hover:bg-white/10 transition-colors">
                        Edit & Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-white flex items-center gap-2">
                    Maintenance
                    <span className="bg-white/10 text-white text-[10px] px-1.5 py-0.5 rounded-full">3 open</span>
                  </h3>
                </div>

                <div className="flex flex-col gap-3">
                  <TicketRow
                    priority="high"
                    title="Unit 12C — Toilet overflow"
                    meta="Vendor: ABC Plumbing · ETA 2hrs"
                    progress={60}
                    statusColor="bg-emerald-500"
                  />
                  <TicketRow
                    priority="medium"
                    title="Unit 3A — AC not cooling"
                    meta="Vendor: CoolAir HVAC · Scheduled tomorrow"
                    progress={30}
                    statusColor="bg-emerald-500"
                  />
                  <TicketRow
                    priority="done"
                    title="Unit 7B — Leaking faucet"
                    meta="Completed · $185 · Feb 19"
                    progress={100}
                    statusColor="bg-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-white/[0.03] border border-white/5 p-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
              <div className="text-gray-500 flex flex-wrap gap-x-3 gap-y-1">
                <span>
                  Last 24 hours: <span className="text-gray-300">24 messages</span>
                </span>
                <span className="hidden sm:inline">·</span>
                <span>
                  <span className="text-gray-300">21 auto-handled</span>
                </span>
                <span className="hidden sm:inline">·</span>
                <span>
                  <span className="text-gray-300">3 flagged</span>
                </span>
                <span className="hidden sm:inline">·</span>
                <span>
                  Avg response: <span className="text-gray-300">47 seconds</span>
                </span>
              </div>
              <div className="text-emerald-400 font-medium flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AI Confidence: 94.2%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active = false,
  badge,
  badgeColor = "bg-white/10 text-gray-400",
}: {
  icon: ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  badgeColor?: string;
}) {
  return (
    <div
      className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
        active ? "bg-white/5 text-white font-medium" : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]"
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
      {badge && <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${badgeColor}`}>{badge}</span>}
    </div>
  );
}

function StatCard({
  title,
  value,
  subtext,
  subtextClass,
}: {
  title: string;
  value: string;
  subtext: string;
  subtextClass: string;
}) {
  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4 flex flex-col justify-between hover:bg-white/[0.04] transition-colors group">
      <span className="text-xs text-gray-500 mb-2 group-hover:text-gray-400 transition-colors">{title}</span>
      <div>
        <div className="text-2xl lg:text-3xl font-bold text-white mb-1 tracking-tight">{value}</div>
        <div className={`text-xs ${subtextClass}`}>{subtext}</div>
      </div>
    </div>
  );
}

function MessageRow({
  unit,
  message,
  tag,
  time,
}: {
  unit: string;
  message: string;
  tag: string;
  time: string;
}) {
  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/5 p-3 flex items-center justify-between group hover:bg-white/[0.04] transition-colors">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0" />
        <div className="flex flex-col min-w-0">
          <span className="text-sm text-gray-400 font-medium truncate">{unit}</span>
          <span className="text-xs text-gray-500 truncate">{message}</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 ml-2 shrink-0">
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 rounded-full px-2 py-0.5 border border-emerald-500/10">
          {tag}
        </span>
        <span className="text-[10px] text-gray-600">{time}</span>
      </div>
    </div>
  );
}

function TicketRow({
  priority,
  title,
  meta,
  progress,
  statusColor,
}: {
  priority: "high" | "medium" | "done";
  title: string;
  meta: string;
  progress: number;
  statusColor: string;
}) {
  const StatusIcon = priority === "high" ? AlertTriangle : priority === "medium" ? Clock3 : CheckCircle2;
  const iconClass =
    priority === "high" ? "text-red-400" : priority === "medium" ? "text-amber-400" : "text-emerald-400";
  const titleClass = priority === "done" ? "text-gray-400" : "text-white";

  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/5 p-3 hover:bg-white/[0.04] transition-colors">
      <div className="flex items-start gap-2 mb-2">
        <StatusIcon className={`w-3.5 h-3.5 mt-0.5 ${iconClass}`} />
        <div>
          <div className={`text-sm font-medium ${titleClass}`}>{title}</div>
          <div className="text-xs text-gray-500 mt-0.5">{meta}</div>
        </div>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-2">
        <div className={`h-full ${statusColor} transition-all duration-1000 ease-out`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
