import EditModal from "@/components/demo/EditModal";
import NotificationToasts from "@/components/demo/NotificationToasts";
import Sidebar from "@/components/demo/Sidebar";
import StatCards from "@/components/demo/StatCards";
import { NOTIFICATION_SEQUENCE, getAIResponse } from "@/components/demo/demoData";
import { PROPERTY_DATA } from "@/components/demo/demoData";
import { useDemoState } from "@/components/demo/useDemoState";
import DashboardView from "@/components/demo/views/DashboardView";
import LeasesView from "@/components/demo/views/LeasesView";
import MaintenanceView from "@/components/demo/views/MaintenanceView";
import MessagesView from "@/components/demo/views/MessagesView";
import OwnerReportsView from "@/components/demo/views/OwnerReportsView";
import SettingsView from "@/components/demo/views/SettingsView";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, RefreshCw, Send } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";

export default function DemoPage() {
  const { state, actions } = useDemoState("oakwood");
  const [chatInput, setChatInput] = useState("");
  const [notificationRunToken, setNotificationRunToken] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const chatTimerRef = useRef<number | null>(null);

  const messagesUnreadCount = useMemo(
    () => state.inboxMessages.filter((message) => message.unread).length,
    [state.inboxMessages]
  );
  const maintenanceOpenCount = useMemo(
    () => state.maintenanceTickets.filter((ticket) => ticket.status !== "completed").length,
    [state.maintenanceTickets]
  );

  const selectedQueueItem = useMemo(
    () => state.approvalQueue.find((item) => item.id === state.editModalItemId) ?? null,
    [state.approvalQueue, state.editModalItemId]
  );

  const clearChatTimer = () => {
    if (chatTimerRef.current) {
      window.clearTimeout(chatTimerRef.current);
      chatTimerRef.current = null;
    }
  };

  const handleReset = () => {
    clearChatTimer();
    setChatInput("");
    actions.reset();
    actions.clearNotifications();
    setNotificationRunToken((value) => value + 1);
  };

  const handleSendChatMessage = () => {
    const trimmed = chatInput.trim();
    if (!trimmed) return;

    clearChatTimer();
    actions.sendUserChatMessage(trimmed);
    setChatInput("");
    actions.setChatTyping(true);

    const response = getAIResponse(trimmed);
    const delayMs = Math.max(200, state.settings.responseDelay * 1000);
    chatTimerRef.current = window.setTimeout(() => {
      actions.sendAssistantChatMessage(response);
      chatTimerRef.current = null;
    }, delayMs);
  };

  const showToast = (title: string, description: string, icon: string) => {
    actions.addNotification({
      id: Date.now() + Math.floor(Math.random() * 1000),
      title,
      description,
      icon,
    });
  };

  useEffect(() => {
    if (!chatContainerRef.current) return;
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [state.chatMessages, state.chatTyping]);

  useEffect(() => {
    clearChatTimer();
    return () => clearChatTimer();
  }, [state.currentProperty]);

  useEffect(() => {
    let elapsed = 0;
    let lastTick = Date.now();
    const fired = new Set<number>();

    const intervalId = window.setInterval(() => {
      const now = Date.now();
      if (!document.hidden) {
        elapsed += now - lastTick;
      }
      lastTick = now;

      for (const planned of NOTIFICATION_SEQUENCE) {
        if (fired.has(planned.id)) continue;
        if (elapsed >= planned.delay) {
          actions.addNotification({
            id: notificationRunToken * 100 + planned.id,
            icon: planned.icon,
            title: planned.title,
            description: planned.description,
          });
          fired.add(planned.id);
        }
      }
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [actions, notificationRunToken]);

  const currentAppPath = `app.veyragroup.ai/${state.currentView}`;

  const renderView = () => {
    switch (state.currentView) {
      case "dashboard":
        return (
          <DashboardView
            approvalQueue={state.approvalQueue}
            maintenanceTickets={state.maintenanceTickets}
            expandedTicketId={state.expandedTicketId}
            onApprove={(itemId) => {
              actions.approveQueueItem(itemId);
              showToast("Auto-approved", `Unit ${state.approvalQueue.find((item) => item.id === itemId)?.unit ?? ""} response sent`, "✅");
            }}
            onOpenEdit={actions.openEditModal}
            onReopen={(itemId) => {
              actions.reopenQueueItem(itemId);
              showToast("Re-opened for review", "Message moved back to manager queue", "↩️");
            }}
            onToggleTicket={actions.toggleTicket}
            onMarkComplete={(ticketId) => {
              actions.markTicketComplete(ticketId);
              showToast("Ticket completed", "Maintenance job marked complete", "🔧");
            }}
            onReassignVendor={(ticket) =>
              showToast("Vendor reassigned", `Unit ${ticket.unit} assigned to backup vendor`, "🛠️")
            }
            onContactTenant={(ticket) =>
              showToast("Tenant contacted", `Status update sent to Unit ${ticket.unit}`, "📱")
            }
          />
        );
      case "messages":
        return (
          <MessagesView
            inboxMessages={state.inboxMessages}
            selectedMessageId={state.selectedMessageId}
            messageSearch={state.messageSearch}
            messageFilter={state.messageFilter}
            onSearchChange={actions.setMessageSearch}
            onFilterChange={actions.setMessageFilter}
            onSelectMessage={actions.selectMessage}
            onSendReply={(messageId, message) => {
              actions.sendInboxReply(messageId, message);
              showToast("Reply sent", "Tenant thread updated", "✉️");
            }}
          />
        );
      case "maintenance":
        return (
          <MaintenanceView
            maintenanceTickets={state.maintenanceTickets}
            expandedTicketId={state.expandedTicketId}
            onToggleTicket={actions.toggleTicket}
            onMarkComplete={(ticketId) => {
              actions.markTicketComplete(ticketId);
              showToast("Ticket completed", "Maintenance status updated", "✅");
            }}
            onReassignVendor={(ticket) =>
              showToast("Vendor reassigned", `Unit ${ticket.unit} vendor updated`, "🔄")
            }
            onContactTenant={(ticket) =>
              showToast("Tenant contacted", `Sent status update to Unit ${ticket.unit}`, "📨")
            }
          />
        );
      case "leases":
        return (
          <LeasesView
            leases={state.leases}
            onSendNotice={(leaseId) => {
              actions.sendRenewalNotice(leaseId);
              showToast("Renewal notice sent", "Tenant received renewal reminder", "📄");
            }}
          />
        );
      case "ownerReports":
        return (
          <OwnerReportsView
            reports={state.reports}
            expandedReportId={state.expandedReportId}
            onToggleExpanded={actions.toggleReportExpanded}
            onGenerateReport={(reportId) => {
              actions.generateReport(reportId);
              showToast("Report generated", "Owner report is ready to send", "📊");
            }}
          />
        );
      case "settings":
        return (
          <SettingsView
            propertyName={PROPERTY_DATA[state.currentProperty].name}
            settings={state.settings}
            onSetResponseTone={actions.setResponseTone}
            onSetAutoReplyThreshold={actions.setAutoReplyThreshold}
            onSetResponseDelay={actions.setResponseDelay}
            onToggleNotification={actions.toggleSettingNotification}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden pb-20 md:pb-0">
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-grid-overlay" />
        <div className="hero-noise-overlay" />
      </div>

      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-flex items-center">
              <img src="/veyra-logo.svg" alt="Veyra Group" className="h-11 w-auto" loading="eager" draggable={false} />
            </Link>
            <span className="hidden md:inline-flex rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs tracking-[0.14em] uppercase text-emerald-300">
              Live Demo
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleReset}
              variant="outline"
              className="rounded-full border-white/15 text-gray-200 hover:text-white min-h-11"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset Demo</span>
            </Button>
            <Link
              href="/"
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.02] px-3 sm:px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:border-white/20 transition-colors min-h-11"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to site</span>
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center rounded-full bg-emerald-500 text-black font-semibold px-3 sm:px-4 py-2 min-h-11 text-sm hover:bg-emerald-400 transition"
            >
              Book a Free Audit
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10 md:py-12">
        <section className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-5xl font-bold tracking-[-0.02em] leading-[1.08]">
            Interactive Product Demo
          </h1>
          <p className="text-gray-400 text-lg mt-4 max-w-4xl leading-relaxed">
            This is a standalone mock environment for clients to test workflows. Use dashboard actions, send tenant messages, and reset the state anytime.
          </p>
        </section>

        <section className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
            <div className="h-12 bg-[#111] border-b border-white/10 px-4 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="truncate rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400 font-mono">
                  {currentAppPath}
                </span>
              </div>
              <div className="h-7 w-7 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold inline-flex items-center justify-center">
                BJ
              </div>
            </div>

            <div className="grid grid-cols-[auto_1fr]">
              <Sidebar
                currentView={state.currentView}
                onViewChange={actions.setView}
                currentProperty={state.currentProperty}
                onPropertyChange={(property) => {
                  clearChatTimer();
                  actions.setProperty(property);
                  actions.clearNotifications();
                  setNotificationRunToken((value) => value + 1);
                }}
                propertyMenuOpen={state.propertyMenuOpen}
                onPropertyMenuOpenChange={actions.setPropertyMenuOpen}
                messagesUnreadCount={messagesUnreadCount}
                maintenanceOpenCount={maintenanceOpenCount}
                sidebarCollapsed={state.sidebarCollapsed}
                onSidebarCollapsedChange={actions.setSidebarCollapsed}
              />

              <div className="bg-[#0C0C0C] p-4 md:p-6 overflow-x-hidden">
                <StatCards
                  stats={state.stats}
                  onOpenMessages={() => actions.setView("messages")}
                  onSetAvgResponseInfo={actions.setAvgTooltip}
                  onOpenMaintenance={() => actions.setView("maintenance")}
                  onOpenOwnerReports={() => actions.setView("ownerReports")}
                  showAvgResponseInfo={state.showAvgResponseInfo}
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={state.currentView}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="transition-opacity duration-150 pb-16 md:pb-0"
                  >
                    {renderView()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="pb-3 border-b border-white/10">
                <p className="text-sm text-white font-semibold">Tenant Chat Preview</p>
                <p className="text-xs text-gray-500 mt-1">
                  What your tenants see in real time.
                </p>
              </div>
              <div
                ref={chatContainerRef}
                className="h-[400px] overflow-y-auto scrollbar-hide py-4 space-y-3"
              >
                {state.chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`max-w-[88%] ${
                      message.sender === "assistant" ? "mr-auto" : "ml-auto text-right"
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                        message.sender === "assistant"
                          ? "bg-white/10 border border-white/10 text-gray-200 rounded-tl-none"
                          : "bg-emerald-600 text-white rounded-tr-none"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {state.chatTyping && (
                  <div className="max-w-[72%] mr-auto">
                    <div className="rounded-2xl rounded-tl-none bg-white/10 border border-white/10 px-3 py-2 inline-flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-300 animate-bounce [animation-delay:0ms]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-300 animate-bounce [animation-delay:120ms]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-300 animate-bounce [animation-delay:240ms]" />
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white/5 rounded-full px-3 py-2 flex items-center gap-2 border border-white/10 ring-1 ring-white/5">
                <input
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleSendChatMessage();
                    }
                  }}
                  placeholder="Type a tenant message..."
                  className="flex-1 bg-transparent text-sm text-gray-100 placeholder:text-gray-500 outline-none"
                />
                <button
                  type="button"
                  onClick={handleSendChatMessage}
                  disabled={!chatInput.trim()}
                  className="h-10 w-10 rounded-full bg-emerald-500 text-white inline-flex items-center justify-center disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-lg font-semibold text-white mb-3">How to test this demo</h2>
              <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
                <li>1. Switch views in the left sidebar.</li>
                <li>2. Approve or edit queued responses in Dashboard.</li>
                <li>3. Click tickets to expand maintenance timelines.</li>
                <li>4. Test keyword-based chat in Tenant Chat Preview.</li>
                <li>5. Use `Reset Demo` to restore all states.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <EditModal
        isOpen={Boolean(state.editModalItemId)}
        queueItem={selectedQueueItem}
        onClose={actions.closeEditModal}
        onSend={(editedText) => {
          if (!selectedQueueItem) return;
          actions.sendEditedQueueItem(selectedQueueItem.id, editedText);
          showToast("Edited response sent", "Custom response delivered to tenant", "✏️");
        }}
      />

      <NotificationToasts
        notifications={state.notifications}
        onDismiss={actions.dismissNotification}
      />
    </div>
  );
}
