import { PROPERTY_DATA } from "@/components/demo/demoData";
import type { DemoPropertyKey, DemoView } from "@/components/demo/types";
import {
  BarChart3,
  Building2,
  Check,
  ChevronDown,
  FileText,
  LayoutDashboard,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Settings,
  Wrench,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";

type SidebarProps = {
  currentView: DemoView;
  onViewChange: (view: DemoView) => void;
  currentProperty: DemoPropertyKey;
  onPropertyChange: (property: DemoPropertyKey) => void;
  propertyMenuOpen: boolean;
  onPropertyMenuOpenChange: (open: boolean) => void;
  messagesUnreadCount: number;
  maintenanceOpenCount: number;
  sidebarCollapsed: boolean;
  onSidebarCollapsedChange: (collapsed: boolean) => void;
};

const navItems: Array<{ view: DemoView; label: string; icon: ComponentType<{ className?: string }> }> = [
  { view: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { view: "messages", label: "Messages", icon: MessageSquare },
  { view: "maintenance", label: "Maintenance", icon: Wrench },
  { view: "leases", label: "Leases", icon: FileText },
  { view: "ownerReports", label: "Owner Reports", icon: BarChart3 },
  { view: "settings", label: "Settings", icon: Settings },
];

const mobileTabs: Array<{ view: DemoView; label: string; icon: ComponentType<{ className?: string }> }> = [
  { view: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { view: "messages", label: "Messages", icon: MessageSquare },
  { view: "maintenance", label: "Maintenance", icon: Wrench },
  { view: "leases", label: "Leases", icon: FileText },
];

export default function Sidebar({
  currentView,
  onViewChange,
  currentProperty,
  onPropertyChange,
  propertyMenuOpen,
  onPropertyMenuOpenChange,
  messagesUnreadCount,
  maintenanceOpenCount,
  sidebarCollapsed,
  onSidebarCollapsedChange,
}: SidebarProps) {
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const propertyMenuRef = useRef<HTMLDivElement | null>(null);
  const currentPropertyData = PROPERTY_DATA[currentProperty];
  const propertyOptions = useMemo(
    () =>
      (Object.keys(PROPERTY_DATA) as DemoPropertyKey[]).map((key) => ({
        key,
        name: PROPERTY_DATA[key].name,
        units: PROPERTY_DATA[key].units,
      })),
    []
  );

  useEffect(() => {
    if (!propertyMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!propertyMenuRef.current) return;
      if (!propertyMenuRef.current.contains(event.target as Node)) {
        onPropertyMenuOpenChange(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [propertyMenuOpen, onPropertyMenuOpenChange]);

  return (
    <>
      <aside
        className={`hidden md:flex h-full flex-col border-r border-white/5 bg-[#0A0A0A] py-6 transition-all duration-200 md:w-[76px] ${
          sidebarCollapsed ? "xl:w-[76px]" : "xl:w-[240px]"
        }`}
      >
        <div className="px-4 mb-6 flex items-center justify-between gap-2">
          {!sidebarCollapsed ? (
            <>
              <span className="hidden xl:inline text-emerald-400 font-bold text-sm tracking-wide">VEYRA</span>
              <span className="inline xl:hidden w-full text-center text-emerald-400 font-bold text-sm tracking-wide">V</span>
            </>
          ) : (
            <span className="w-full text-center text-emerald-400 font-bold text-sm tracking-wide">V</span>
          )}
          <button
            type="button"
            onClick={() => onSidebarCollapsedChange(!sidebarCollapsed)}
            className="hidden xl:inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.view;
            const showBadge = item.view === "messages" || item.view === "maintenance";
            const badgeValue = item.view === "messages" ? messagesUnreadCount : maintenanceOpenCount;
            return (
              <button
                key={item.view}
                type="button"
                onClick={() => onViewChange(item.view)}
                className={`group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-white/10 text-white font-medium"
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]"
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span className="hidden xl:inline">{item.label}</span>}
                </div>
                {!sidebarCollapsed && showBadge && badgeValue > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500 text-black font-semibold">
                    {badgeValue}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-auto px-3">
          <div className="relative" ref={propertyMenuRef}>
            <button
              type="button"
              onClick={() => onPropertyMenuOpenChange(!propertyMenuOpen)}
              className={`w-full inline-flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.02] text-sm text-gray-300 hover:text-white hover:border-white/20 transition-colors ${
                sidebarCollapsed ? "px-2 py-2" : "px-3 py-2"
              }`}
              title="Switch Property"
            >
              <span className="inline-flex items-center gap-2 min-w-0">
                <Building2 className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && (
                  <span className="hidden xl:inline truncate">
                    {currentPropertyData.name}
                    <span className="text-gray-500"> · {currentPropertyData.units} units</span>
                  </span>
                )}
              </span>
              {!sidebarCollapsed && <ChevronDown className="w-4 h-4 text-gray-500 hidden xl:inline" />}
            </button>

            {propertyMenuOpen && (
              <div className="absolute left-0 right-0 bottom-[calc(100%+8px)] z-30 bg-[#111] border border-white/10 rounded-lg shadow-xl py-1">
                {propertyOptions.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => {
                      onPropertyChange(option.key);
                      onPropertyMenuOpenChange(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white inline-flex items-center justify-between gap-3"
                  >
                    <span>
                      {option.name}
                      <span className="text-gray-500"> · {option.units} units</span>
                    </span>
                    {option.key === currentProperty && <Check className="w-4 h-4 text-emerald-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>

      <div className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0A0A0A]/95 backdrop-blur-xl">
        {mobileMoreOpen && (
          <div className="px-4 pb-3 pt-2 border-b border-white/10">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  onViewChange("ownerReports");
                  setMobileMoreOpen(false);
                }}
                className="h-11 rounded-lg border border-white/10 bg-white/[0.02] text-sm text-gray-300"
              >
                Owner Reports
              </button>
              <button
                type="button"
                onClick={() => {
                  onViewChange("settings");
                  setMobileMoreOpen(false);
                }}
                className="h-11 rounded-lg border border-white/10 bg-white/[0.02] text-sm text-gray-300"
              >
                Settings
              </button>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-2">
              {(Object.keys(PROPERTY_DATA) as DemoPropertyKey[]).map((propertyKey) => (
                <button
                  key={propertyKey}
                  type="button"
                  onClick={() => {
                    onPropertyChange(propertyKey);
                    setMobileMoreOpen(false);
                  }}
                  className={`h-11 rounded-lg border text-sm ${
                    currentProperty === propertyKey
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                      : "border-white/10 bg-white/[0.02] text-gray-300"
                  }`}
                >
                  {PROPERTY_DATA[propertyKey].name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-5 gap-1 px-2 py-2">
          {mobileTabs.map((tab) => {
            const Icon = tab.icon;
            const active = currentView === tab.view;
            const badge =
              tab.view === "messages"
                ? messagesUnreadCount
                : tab.view === "maintenance"
                  ? maintenanceOpenCount
                  : 0;
            return (
              <button
                key={tab.view}
                type="button"
                onClick={() => {
                  onViewChange(tab.view);
                  setMobileMoreOpen(false);
                }}
                className={`relative h-12 rounded-lg inline-flex flex-col items-center justify-center text-[10px] ${
                  active ? "bg-emerald-500/15 text-emerald-300" : "text-gray-400"
                }`}
              >
                <Icon className="w-4 h-4 mb-0.5" />
                {tab.label}
                {badge > 0 && (
                  <span className="absolute top-1 right-2 min-w-[16px] h-4 px-1 rounded-full bg-emerald-500 text-black text-[9px] font-semibold inline-flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setMobileMoreOpen((prev) => !prev)}
            className={`h-12 rounded-lg inline-flex flex-col items-center justify-center text-[10px] ${
              mobileMoreOpen ? "bg-emerald-500/15 text-emerald-300" : "text-gray-400"
            }`}
          >
            <MoreHorizontal className="w-4 h-4 mb-0.5" />
            More
          </button>
        </div>
      </div>
    </>
  );
}
