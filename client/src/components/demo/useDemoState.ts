import { createInitialDemoState } from "@/components/demo/demoData";
import type {
  DemoPropertyKey,
  DemoSettings,
  DemoState,
  DemoView,
  NotificationItem,
} from "@/components/demo/types";
import { useMemo, useReducer } from "react";

type DemoAction =
  | { type: "RESET"; property?: DemoPropertyKey }
  | { type: "SET_VIEW"; view: DemoView }
  | { type: "SET_PROPERTY"; property: DemoPropertyKey }
  | { type: "SET_SIDEBAR_COLLAPSED"; collapsed: boolean }
  | { type: "SET_PROPERTY_MENU_OPEN"; open: boolean }
  | { type: "APPROVE_QUEUE_ITEM"; itemId: number }
  | { type: "SEND_EDITED_QUEUE_ITEM"; itemId: number; editedText: string }
  | { type: "REOPEN_QUEUE_ITEM"; itemId: number }
  | { type: "OPEN_EDIT_MODAL"; itemId: number }
  | { type: "CLOSE_EDIT_MODAL" }
  | { type: "TOGGLE_TICKET"; ticketId: number }
  | { type: "MARK_TICKET_COMPLETE"; ticketId: number }
  | { type: "SET_MESSAGE_SEARCH"; value: string }
  | { type: "SET_MESSAGE_FILTER"; value: DemoState["messageFilter"] }
  | { type: "SELECT_MESSAGE"; messageId: number }
  | { type: "SEND_INBOX_REPLY"; messageId: number; text: string }
  | { type: "SEND_CHAT_USER_MESSAGE"; message: string }
  | { type: "SET_CHAT_TYPING"; value: boolean }
  | { type: "SEND_CHAT_AI_MESSAGE"; message: string }
  | { type: "ADD_NOTIFICATION"; notification: NotificationItem }
  | { type: "DISMISS_NOTIFICATION"; id: number }
  | { type: "CLEAR_NOTIFICATIONS" }
  | { type: "TOGGLE_AVG_TOOLTIP" }
  | { type: "SET_AVG_TOOLTIP"; open: boolean }
  | { type: "SEND_RENEWAL_NOTICE"; leaseId: number }
  | { type: "TOGGLE_REPORT_EXPANDED"; reportId: number }
  | { type: "GENERATE_REPORT"; reportId: number }
  | { type: "SET_RESPONSE_TONE"; tone: DemoSettings["responseTone"] }
  | { type: "SET_AUTO_REPLY_THRESHOLD"; value: number }
  | { type: "SET_RESPONSE_DELAY"; value: number }
  | { type: "TOGGLE_SETTING_NOTIFICATION"; key: keyof DemoSettings["notifications"] };

function nextChatId(state: DemoState) {
  return (
    Math.max(
      0,
      ...state.chatMessages.map((message) => message.id),
      ...state.inboxMessages.flatMap((inbox) => inbox.thread.map((message) => message.id))
    ) + 1
  );
}

function reducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "RESET":
      return createInitialDemoState(action.property ?? state.currentProperty);
    case "SET_VIEW":
      return {
        ...state,
        currentView: action.view,
        showAvgResponseInfo: false,
        propertyMenuOpen: false,
      };
    case "SET_PROPERTY":
      return createInitialDemoState(action.property);
    case "SET_SIDEBAR_COLLAPSED":
      return { ...state, sidebarCollapsed: action.collapsed };
    case "SET_PROPERTY_MENU_OPEN":
      return { ...state, propertyMenuOpen: action.open };
    case "APPROVE_QUEUE_ITEM": {
      let handled = false;
      const approvalQueue = state.approvalQueue.map((item) => {
        if (item.id !== action.itemId || item.status !== "needs-review") return item;
        handled = true;
        return { ...item, status: "approved-sent" as const, time: "just now" as const };
      });

      if (!handled) return state;

      const inboxMessages = state.inboxMessages.map((message) =>
        message.unit === approvalQueue.find((item) => item.id === action.itemId)?.unit
          ? { ...message, status: "auto-replied" as const, unread: false }
          : message
      );

      return {
        ...state,
        approvalQueue,
        inboxMessages,
        stats: {
          ...state.stats,
          autoHandled: state.stats.autoHandled + 1,
          aiConfidence: Math.min(99.9, Number((state.stats.aiConfidence + 1.8).toFixed(1))),
        },
      };
    }
    case "SEND_EDITED_QUEUE_ITEM": {
      let handled = false;
      const approvalQueue = state.approvalQueue.map((item) => {
        if (item.id !== action.itemId || item.status !== "needs-review") return item;
        handled = true;
        return {
          ...item,
          status: "edited-sent" as const,
          draftText: action.editedText,
          time: "just now",
        };
      });

      if (!handled) return { ...state, editModalItemId: null };

      const target = approvalQueue.find((item) => item.id === action.itemId);
      const inboxMessages = state.inboxMessages.map((message) =>
        message.unit === target?.unit
          ? { ...message, status: "auto-replied" as const, unread: false }
          : message
      );

      return {
        ...state,
        approvalQueue,
        inboxMessages,
        editModalItemId: null,
        stats: {
          ...state.stats,
          autoHandled: state.stats.autoHandled + 1,
          aiConfidence: Math.min(99.9, Number((state.stats.aiConfidence + 1.2).toFixed(1))),
        },
      };
    }
    case "REOPEN_QUEUE_ITEM": {
      let reopened = false;
      const approvalQueue = state.approvalQueue.map((item) => {
        if (item.id !== action.itemId || item.status === "needs-review") return item;
        reopened = true;
        return { ...item, status: "needs-review" as const, time: "12 min ago" };
      });

      if (!reopened) return state;

      const target = approvalQueue.find((item) => item.id === action.itemId);
      const inboxMessages = state.inboxMessages.map((message) =>
        message.unit === target?.unit
          ? { ...message, status: "needs-review" as const, unread: true }
          : message
      );

      return {
        ...state,
        approvalQueue,
        inboxMessages,
        stats: {
          ...state.stats,
          autoHandled: Math.max(0, state.stats.autoHandled - 1),
          aiConfidence: Math.max(0, Number((state.stats.aiConfidence - 1.2).toFixed(1))),
        },
      };
    }
    case "OPEN_EDIT_MODAL":
      return { ...state, editModalItemId: action.itemId };
    case "CLOSE_EDIT_MODAL":
      return { ...state, editModalItemId: null };
    case "TOGGLE_TICKET":
      return {
        ...state,
        expandedTicketId: state.expandedTicketId === action.ticketId ? null : action.ticketId,
      };
    case "MARK_TICKET_COMPLETE": {
      let changed = false;
      const maintenanceTickets = state.maintenanceTickets.map((ticket) => {
        if (ticket.id !== action.ticketId || ticket.status === "completed") return ticket;
        changed = true;
        return {
          ...ticket,
          status: "completed" as const,
          progress: 100,
          eta: "Completed",
          timeline: [...ticket.timeline, { time: "Just now", event: "Marked as complete" }],
        };
      });
      if (!changed) return state;
      const openTickets = maintenanceTickets.filter((ticket) => ticket.status !== "completed").length;
      return {
        ...state,
        maintenanceTickets,
        stats: {
          ...state.stats,
          openTickets,
        },
      };
    }
    case "SET_MESSAGE_SEARCH":
      return { ...state, messageSearch: action.value };
    case "SET_MESSAGE_FILTER":
      return { ...state, messageFilter: action.value };
    case "SELECT_MESSAGE":
      return {
        ...state,
        selectedMessageId: action.messageId,
        inboxMessages: state.inboxMessages.map((message) =>
          message.id === action.messageId ? { ...message, unread: false } : message
        ),
      };
    case "SEND_INBOX_REPLY": {
      const reply = action.text.trim();
      if (!reply) return state;
      const id = nextChatId(state);
      return {
        ...state,
        inboxMessages: state.inboxMessages.map((message) =>
          message.id === action.messageId
            ? {
                ...message,
                status: "resolved" as const,
                unread: false,
                time: "just now",
                lastMessage: reply,
                thread: [...message.thread, { id, sender: "assistant" as const, text: reply }],
              }
            : message
        ),
      };
    }
    case "SEND_CHAT_USER_MESSAGE": {
      const id = nextChatId(state);
      return {
        ...state,
        chatMessages: [...state.chatMessages, { id, sender: "user" as const, text: action.message }].slice(
          -20
        ),
      };
    }
    case "SET_CHAT_TYPING":
      return { ...state, chatTyping: action.value };
    case "SEND_CHAT_AI_MESSAGE": {
      const id = nextChatId(state);
      return {
        ...state,
        chatTyping: false,
        chatMessages: [
          ...state.chatMessages,
          { id, sender: "assistant" as const, text: action.message },
        ].slice(-20),
      };
    }
    case "ADD_NOTIFICATION": {
      const notifications = [...state.notifications, action.notification];
      return {
        ...state,
        notifications: notifications.slice(-3),
      };
    }
    case "DISMISS_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter((notification) => notification.id !== action.id),
      };
    case "CLEAR_NOTIFICATIONS":
      return { ...state, notifications: [] };
    case "TOGGLE_AVG_TOOLTIP":
      return { ...state, showAvgResponseInfo: !state.showAvgResponseInfo };
    case "SET_AVG_TOOLTIP":
      return { ...state, showAvgResponseInfo: action.open };
    case "SEND_RENEWAL_NOTICE":
      return {
        ...state,
        leases: state.leases.map((lease) =>
          lease.id === action.leaseId ? { ...lease, noticeSent: true } : lease
        ),
      };
    case "TOGGLE_REPORT_EXPANDED":
      return {
        ...state,
        expandedReportId: state.expandedReportId === action.reportId ? null : action.reportId,
      };
    case "GENERATE_REPORT": {
      let changed = false;
      const reports = state.reports.map((report) => {
        if (report.id !== action.reportId || report.status !== "draft") return report;
        changed = true;
        return {
          ...report,
          status: "sent" as const,
          date: "Just now",
          generated: true,
        };
      });

      return {
        ...state,
        reports,
        stats: changed
          ? { ...state.stats, ownerReportsDue: Math.max(0, state.stats.ownerReportsDue - 1) }
          : state.stats,
      };
    }
    case "SET_RESPONSE_TONE":
      return { ...state, settings: { ...state.settings, responseTone: action.tone } };
    case "SET_AUTO_REPLY_THRESHOLD":
      return {
        ...state,
        settings: { ...state.settings, autoReplyThreshold: action.value },
      };
    case "SET_RESPONSE_DELAY":
      return { ...state, settings: { ...state.settings, responseDelay: action.value } };
    case "TOGGLE_SETTING_NOTIFICATION":
      return {
        ...state,
        settings: {
          ...state.settings,
          notifications: {
            ...state.settings.notifications,
            [action.key]: !state.settings.notifications[action.key],
          },
        },
      };
    default:
      return state;
  }
}

export function useDemoState(initialProperty: DemoPropertyKey = "oakwood") {
  const [state, dispatch] = useReducer(reducer, createInitialDemoState(initialProperty));

  const actions = useMemo(
    () => ({
      reset: () => dispatch({ type: "RESET", property: "oakwood" }),
      setView: (view: DemoView) => dispatch({ type: "SET_VIEW", view }),
      setProperty: (property: DemoPropertyKey) => dispatch({ type: "SET_PROPERTY", property }),
      setSidebarCollapsed: (collapsed: boolean) =>
        dispatch({ type: "SET_SIDEBAR_COLLAPSED", collapsed }),
      setPropertyMenuOpen: (open: boolean) =>
        dispatch({ type: "SET_PROPERTY_MENU_OPEN", open }),
      approveQueueItem: (itemId: number) => dispatch({ type: "APPROVE_QUEUE_ITEM", itemId }),
      sendEditedQueueItem: (itemId: number, editedText: string) =>
        dispatch({ type: "SEND_EDITED_QUEUE_ITEM", itemId, editedText }),
      reopenQueueItem: (itemId: number) => dispatch({ type: "REOPEN_QUEUE_ITEM", itemId }),
      openEditModal: (itemId: number) => dispatch({ type: "OPEN_EDIT_MODAL", itemId }),
      closeEditModal: () => dispatch({ type: "CLOSE_EDIT_MODAL" }),
      toggleTicket: (ticketId: number) => dispatch({ type: "TOGGLE_TICKET", ticketId }),
      markTicketComplete: (ticketId: number) => dispatch({ type: "MARK_TICKET_COMPLETE", ticketId }),
      setMessageSearch: (value: string) => dispatch({ type: "SET_MESSAGE_SEARCH", value }),
      setMessageFilter: (value: DemoState["messageFilter"]) =>
        dispatch({ type: "SET_MESSAGE_FILTER", value }),
      selectMessage: (messageId: number) => dispatch({ type: "SELECT_MESSAGE", messageId }),
      sendInboxReply: (messageId: number, text: string) =>
        dispatch({ type: "SEND_INBOX_REPLY", messageId, text }),
      sendUserChatMessage: (message: string) =>
        dispatch({ type: "SEND_CHAT_USER_MESSAGE", message }),
      setChatTyping: (value: boolean) => dispatch({ type: "SET_CHAT_TYPING", value }),
      sendAssistantChatMessage: (message: string) =>
        dispatch({ type: "SEND_CHAT_AI_MESSAGE", message }),
      addNotification: (notification: NotificationItem) =>
        dispatch({ type: "ADD_NOTIFICATION", notification }),
      dismissNotification: (id: number) => dispatch({ type: "DISMISS_NOTIFICATION", id }),
      clearNotifications: () => dispatch({ type: "CLEAR_NOTIFICATIONS" }),
      toggleAvgTooltip: () => dispatch({ type: "TOGGLE_AVG_TOOLTIP" }),
      setAvgTooltip: (open: boolean) => dispatch({ type: "SET_AVG_TOOLTIP", open }),
      sendRenewalNotice: (leaseId: number) => dispatch({ type: "SEND_RENEWAL_NOTICE", leaseId }),
      toggleReportExpanded: (reportId: number) =>
        dispatch({ type: "TOGGLE_REPORT_EXPANDED", reportId }),
      generateReport: (reportId: number) => dispatch({ type: "GENERATE_REPORT", reportId }),
      setResponseTone: (tone: DemoSettings["responseTone"]) =>
        dispatch({ type: "SET_RESPONSE_TONE", tone }),
      setAutoReplyThreshold: (value: number) =>
        dispatch({ type: "SET_AUTO_REPLY_THRESHOLD", value }),
      setResponseDelay: (value: number) => dispatch({ type: "SET_RESPONSE_DELAY", value }),
      toggleSettingNotification: (key: keyof DemoSettings["notifications"]) =>
        dispatch({ type: "TOGGLE_SETTING_NOTIFICATION", key }),
    }),
    []
  );

  return { state, dispatch, actions };
}
