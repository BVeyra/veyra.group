export type DemoView =
  | "dashboard"
  | "messages"
  | "maintenance"
  | "leases"
  | "ownerReports"
  | "settings";

export type DemoPropertyKey = "oakwood" | "mapleridge" | "downtown";

export type ApprovalStatus =
  | "auto-replied"
  | "needs-review"
  | "approved-sent"
  | "edited-sent";

export type MessageStatus = "auto-replied" | "needs-review" | "resolved";

export type MaintenanceStatus = "urgent" | "in-progress" | "completed";

export type LeaseStatus = "active" | "expiring-soon" | "expired";

export type ReportStatus = "sent" | "draft" | "overdue";

export type MessageFilter = "all" | "needs-review" | "auto-replied";

export type ChatRole = "assistant" | "user";

export type NotificationItem = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

export type NotificationPlan = {
  id: number;
  delay: number;
  icon: string;
  title: string;
  description: string;
};

export type ApprovalItem = {
  id: number;
  unit: string;
  tenant: string;
  message: string;
  status: ApprovalStatus;
  time: string;
  draftText: string;
  confidence: number;
};

export type MaintenanceTimelineEvent = {
  time: string;
  event: string;
};

export type MaintenanceTicket = {
  id: number;
  unit: string;
  issue: string;
  vendor: string;
  vendorPhone: string;
  eta: string;
  status: MaintenanceStatus;
  progress: number;
  cost: string;
  description: string;
  timeline: MaintenanceTimelineEvent[];
  assignedAt: string;
};

export type DemoStats = {
  messagesToday: number;
  autoHandled: number;
  avgResponse: string;
  openTickets: number;
  ownerReportsDue: number;
  aiConfidence: number;
};

export type ChatMessage = {
  id: number;
  sender: ChatRole;
  text: string;
};

export type InboxMessage = {
  id: number;
  unit: string;
  tenant: string;
  lastMessage: string;
  time: string;
  status: MessageStatus;
  unread: boolean;
  thread: ChatMessage[];
};

export type LeaseItem = {
  id: number;
  unit: string;
  tenant: string;
  start: string;
  end: string;
  rent: string;
  status: LeaseStatus;
  noticeSent?: boolean;
};

export type OwnerReportItem = {
  id: number;
  month: string;
  property: string;
  status: ReportStatus;
  date: string | null;
  occupancy: string;
  rentCollected: string;
  expenses: string;
  netIncome: string;
  generated?: boolean;
};

export type DemoSettings = {
  responseTone: "Professional" | "Friendly" | "Casual";
  autoReplyThreshold: number;
  responseDelay: number;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
};

export type DemoPropertyData = {
  name: string;
  units: number;
  stats: DemoStats;
  approvalQueue: ApprovalItem[];
  maintenanceTickets: MaintenanceTicket[];
  chatMessages: ChatMessage[];
  inboxMessages: InboxMessage[];
  leases: LeaseItem[];
  reports: OwnerReportItem[];
};

export type DemoState = {
  currentView: DemoView;
  currentProperty: DemoPropertyKey;
  propertyMenuOpen: boolean;
  sidebarCollapsed: boolean;
  stats: DemoStats;
  approvalQueue: ApprovalItem[];
  maintenanceTickets: MaintenanceTicket[];
  chatMessages: ChatMessage[];
  inboxMessages: InboxMessage[];
  selectedMessageId: number | null;
  messageSearch: string;
  messageFilter: MessageFilter;
  leases: LeaseItem[];
  reports: OwnerReportItem[];
  expandedTicketId: number | null;
  expandedReportId: number | null;
  editModalItemId: number | null;
  notifications: NotificationItem[];
  settings: DemoSettings;
  showAvgResponseInfo: boolean;
  chatTyping: boolean;
};
