import type {
  ChatMessage,
  DemoPropertyData,
  DemoPropertyKey,
  DemoState,
  NotificationPlan,
} from "@/components/demo/types";

export const CHAT_RESPONSES = [
  {
    keywords: ["rent", "pay", "payment", "due"],
    response:
      "Your rent of $1,850 for Unit 12C is due on the 1st of each month. You can pay through the tenant portal, Zelle, or direct deposit. Want me to send you the payment link?",
  },
  {
    keywords: ["move out", "leaving", "vacate", "terminate", "break lease"],
    response:
      "To begin the move-out process for Unit 12C, we need 30 days written notice per your lease terms. I can send you the move-out checklist and schedule your final inspection. Would you like me to start that?",
  },
  {
    keywords: ["lease", "renew", "renewal", "contract"],
    response:
      "Your lease for Unit 12C runs through August 31, 2026. We'll send renewal options 60 days before expiration. Your current rate is $1,850/month. Would you like to discuss renewal terms?",
  },
  {
    keywords: ["maintenance", "repair", "fix", "broken", "not working"],
    response:
      "I've logged a maintenance request for Unit 12C. Can you describe the issue? I'll dispatch the right vendor and send you an ETA once it's scheduled.",
  },
  {
    keywords: ["noise", "neighbor", "loud", "complaint", "party"],
    response:
      "I'm sorry to hear that. I've flagged this as a noise complaint for Unit 12C. Our team will reach out to the neighboring unit within 24 hours. If it's an emergency, please call (302) 600-2625.",
  },
  {
    keywords: ["parking", "car", "tow", "spot"],
    response:
      "Your assigned parking spot is #12C in Lot B. For guest parking, use the visitor spots near the front entrance. Unauthorized vehicles may be towed. If you see an issue, let us know.",
  },
  {
    keywords: ["lock", "key", "lockout", "locked out"],
    response:
      "If you're locked out, our emergency maintenance line is available 24/7 at (302) 600-2625. During business hours, the office can provide a spare key. There's a $25 lockout fee after hours.",
  },
  {
    keywords: ["pet", "dog", "cat", "animal"],
    response:
      "Oakwood Apts allows pets with a $300 deposit and $35/month pet rent. Approved breeds only — I can send you the full pet policy. Do you have a pet or planning to get one?",
  },
  {
    keywords: ["pool", "gym", "amenity", "laundry"],
    response:
      "The pool is open daily 8 AM - 10 PM (closed Tuesdays for maintenance). The gym is 24/7 with your key fob. Laundry is on the ground floor, $1.50 wash / $1.25 dry. Let me know if you need anything else!",
  },
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon"],
    response:
      "Hi Sarah! How can I help you today? I can assist with rent payments, maintenance requests, lease questions, or anything else related to your unit.",
  },
];

export const DEFAULT_RESPONSE =
  "Thanks for reaching out! I've noted your message and will make sure the right person follows up within the hour. Is there anything urgent I can help with right now?";

export const NOTIFICATION_SEQUENCE: NotificationPlan[] = [
  {
    id: 1,
    delay: 8000,
    icon: "📱",
    title: "New message",
    description: 'Unit 5A — Alex P.: "Is the pool open this weekend?"',
  },
  {
    id: 2,
    delay: 15000,
    icon: "✅",
    title: "Auto-replied",
    description: "Unit 5A — Alex P. received automated response (Pool hours)",
  },
  {
    id: 3,
    delay: 25000,
    icon: "🔧",
    title: "Maintenance update",
    description: "Unit 12C — ABC Plumbing arrived on-site (Toilet overflow)",
  },
  {
    id: 4,
    delay: 40000,
    icon: "📊",
    title: "Report ready",
    description: "February Owner Report for Oakwood Apts is ready for review",
  },
  {
    id: 5,
    delay: 60000,
    icon: "💰",
    title: "Payment received",
    description: "Unit 7B — $1,650 rent payment received via tenant portal",
  },
];

const oakwoodChat: ChatMessage[] = [
  {
    id: 1,
    sender: "assistant",
    text: "Hi Sarah! I received your rent payment of $1,850 for Unit 12C. Thank you! Do you need anything else?",
  },
  {
    id: 2,
    sender: "user",
    text: "Thanks! Actually, when is the lease renewal coming up?",
  },
  {
    id: 3,
    sender: "assistant",
    text: "Your lease for Unit 12C ends on August 31, 2026. We'll send renewal options about 60 days before that. Would you like me to set a reminder?",
  },
];

export const PROPERTY_DATA: Record<DemoPropertyKey, DemoPropertyData> = {
  oakwood: {
    name: "Oakwood Apts",
    units: 12,
    stats: {
      messagesToday: 24,
      autoHandled: 18,
      avgResponse: "47s",
      openTickets: 3,
      ownerReportsDue: 0,
      aiConfidence: 94.2,
    },
    approvalQueue: [
      {
        id: 1,
        unit: "12C",
        tenant: "Sarah M.",
        message: "Rent payment confirmation",
        status: "auto-replied",
        time: "2 min ago",
        draftText:
          "Hi Sarah, thank you for your rent payment of $1,850 for Unit 12C! Payment received and confirmed. Let us know if you need anything else. — Oakwood Apts Management",
        confidence: 96,
      },
      {
        id: 2,
        unit: "4B",
        tenant: "James T.",
        message: "When is rent due?",
        status: "auto-replied",
        time: "8 min ago",
        draftText:
          "Hi James, rent for Unit 4B is due on the 1st of each month. Your current monthly rent is $1,650. You can pay through the tenant portal, Zelle, or direct deposit. Let me know if you have any other questions! — Oakwood Apts Management",
        confidence: 94,
      },
      {
        id: 3,
        unit: "8A",
        tenant: "Maria L.",
        message: "Noise complaint — requesting lease break",
        status: "needs-review",
        time: "12 min ago",
        draftText:
          "Hi Maria, I understand this is frustrating. I've flagged your noise complaint and our team will reach out to the neighboring unit within 24 hours. If the situation is urgent or you feel unsafe, please call our emergency line at (302) 600-2625. We take these reports seriously and will follow up with you directly. — Oakwood Apts Management",
        confidence: 72,
      },
    ],
    maintenanceTickets: [
      {
        id: 1,
        unit: "12C",
        issue: "Toilet overflow",
        vendor: "ABC Plumbing",
        vendorPhone: "(302) 555-0147",
        eta: "2hrs",
        status: "urgent",
        progress: 33,
        cost: "$150-$300",
        description:
          "Tenant reports toilet in master bathroom is overflowing. Water on floor. Shut off valve engaged by tenant.",
        timeline: [
          { time: "10:14 AM", event: "Request received" },
          { time: "10:15 AM", event: "Auto-categorized: Plumbing/Urgent" },
          { time: "10:16 AM", event: "Vendor dispatched" },
          { time: "ETA 12:14 PM", event: "Arrival expected" },
        ],
        assignedAt: "10:16 AM",
      },
      {
        id: 2,
        unit: "3A",
        issue: "AC not cooling",
        vendor: "CoolAir HVAC",
        vendorPhone: "(302) 555-0298",
        eta: "Scheduled tomorrow",
        status: "in-progress",
        progress: 66,
        cost: "$200-$450",
        description:
          "AC running but not cooling below 78°F. Tenant reports issue started yesterday.",
        timeline: [
          { time: "Yesterday 3:22 PM", event: "Request received" },
          { time: "Yesterday 3:23 PM", event: "Auto-categorized: HVAC/Standard" },
          { time: "Today", event: "Vendor confirmed appointment" },
        ],
        assignedAt: "Yesterday 3:23 PM",
      },
      {
        id: 3,
        unit: "7B",
        issue: "Leaking faucet",
        vendor: "ABC Plumbing",
        vendorPhone: "(302) 555-0147",
        eta: "Completed",
        status: "completed",
        progress: 100,
        cost: "$185",
        description:
          "Kitchen faucet dripping constantly. Tenant reports increased water bill.",
        timeline: [
          { time: "Feb 17", event: "Request received" },
          { time: "Feb 17", event: "Vendor dispatched" },
          { time: "Feb 19", event: "Repair completed, washer replaced" },
        ],
        assignedAt: "Feb 17",
      },
    ],
    chatMessages: oakwoodChat,
    inboxMessages: [
      {
        id: 1,
        unit: "12C",
        tenant: "Sarah M.",
        lastMessage: "Thanks! Actually, when is the lease renewal coming up?",
        time: "2 min ago",
        status: "auto-replied",
        unread: false,
        thread: oakwoodChat,
      },
      {
        id: 2,
        unit: "4B",
        tenant: "James T.",
        lastMessage: "When is rent due?",
        time: "8 min ago",
        status: "auto-replied",
        unread: false,
        thread: [
          { id: 1, sender: "user", text: "When is rent due?" },
          {
            id: 2,
            sender: "assistant",
            text: "Rent for Unit 4B is due on the 1st. I can send your payment options if helpful.",
          },
        ],
      },
      {
        id: 3,
        unit: "8A",
        tenant: "Maria L.",
        lastMessage: "Noise complaint — requesting lease break",
        time: "12 min ago",
        status: "needs-review",
        unread: true,
        thread: [
          { id: 1, sender: "user", text: "Noise complaint — requesting lease break." },
          {
            id: 2,
            sender: "assistant",
            text: "I logged this for urgent manager review and attached your previous reports.",
          },
        ],
      },
      {
        id: 4,
        unit: "5A",
        tenant: "Alex P.",
        lastMessage: "Is the pool open this weekend?",
        time: "25 min ago",
        status: "auto-replied",
        unread: false,
        thread: [
          { id: 1, sender: "user", text: "Is the pool open this weekend?" },
          {
            id: 2,
            sender: "assistant",
            text: "Yes — pool hours are 8 AM to 10 PM, closed Tuesdays for maintenance.",
          },
        ],
      },
      {
        id: 5,
        unit: "7B",
        tenant: "Mike R.",
        lastMessage: "Thanks for fixing the faucet!",
        time: "1 hr ago",
        status: "resolved",
        unread: false,
        thread: [
          { id: 1, sender: "assistant", text: "Repair is complete and invoice is posted." },
          { id: 2, sender: "user", text: "Thanks for fixing the faucet!" },
        ],
      },
      {
        id: 6,
        unit: "2C",
        tenant: "Emily W.",
        lastMessage: "Can I get a parking spot closer to the building?",
        time: "2 hrs ago",
        status: "auto-replied",
        unread: false,
        thread: [
          { id: 1, sender: "user", text: "Can I get a parking spot closer to the building?" },
          {
            id: 2,
            sender: "assistant",
            text: "I added you to the waiting list and can notify you when one opens.",
          },
        ],
      },
      {
        id: 7,
        unit: "9A",
        tenant: "David K.",
        lastMessage: "My lease ends next month, what are my options?",
        time: "3 hrs ago",
        status: "auto-replied",
        unread: false,
        thread: [
          { id: 1, sender: "user", text: "My lease ends next month, what are my options?" },
          {
            id: 2,
            sender: "assistant",
            text: "I sent your renewal options and can schedule a quick call if you want to review terms.",
          },
        ],
      },
      {
        id: 8,
        unit: "6B",
        tenant: "Rachel S.",
        lastMessage: "Locked out of my unit",
        time: "Yesterday",
        status: "resolved",
        unread: false,
        thread: [
          { id: 1, sender: "user", text: "Locked out of my unit." },
          {
            id: 2,
            sender: "assistant",
            text: "Emergency line dispatched support and issue is now resolved.",
          },
        ],
      },
    ],
    leases: [
      {
        id: 1,
        unit: "12C",
        tenant: "Sarah M.",
        start: "Sep 1, 2025",
        end: "Aug 31, 2026",
        rent: "$1,850",
        status: "active",
      },
      {
        id: 2,
        unit: "4B",
        tenant: "James T.",
        start: "Jan 1, 2026",
        end: "Dec 31, 2026",
        rent: "$1,650",
        status: "active",
      },
      {
        id: 3,
        unit: "8A",
        tenant: "Maria L.",
        start: "Mar 1, 2025",
        end: "Feb 28, 2026",
        rent: "$1,750",
        status: "expired",
      },
      {
        id: 4,
        unit: "3A",
        tenant: "Chris H.",
        start: "Jun 1, 2025",
        end: "May 31, 2026",
        rent: "$1,550",
        status: "expiring-soon",
      },
      {
        id: 5,
        unit: "7B",
        tenant: "Mike R.",
        start: "Apr 1, 2025",
        end: "Mar 31, 2026",
        rent: "$1,650",
        status: "expiring-soon",
      },
      {
        id: 6,
        unit: "5A",
        tenant: "Alex P.",
        start: "Nov 1, 2025",
        end: "Oct 31, 2026",
        rent: "$1,900",
        status: "active",
      },
      {
        id: 7,
        unit: "2C",
        tenant: "Emily W.",
        start: "Jul 1, 2025",
        end: "Jun 30, 2026",
        rent: "$1,700",
        status: "active",
      },
      {
        id: 8,
        unit: "9A",
        tenant: "David K.",
        start: "Aug 1, 2025",
        end: "Jul 31, 2026",
        rent: "$1,800",
        status: "active",
      },
    ],
    reports: [
      {
        id: 1,
        month: "February 2026",
        property: "Oakwood Apts",
        status: "sent",
        date: "Feb 1, 2026",
        occupancy: "92%",
        rentCollected: "$19,200",
        expenses: "$2,450",
        netIncome: "$16,750",
      },
      {
        id: 2,
        month: "January 2026",
        property: "Oakwood Apts",
        status: "sent",
        date: "Jan 1, 2026",
        occupancy: "100%",
        rentCollected: "$20,400",
        expenses: "$1,800",
        netIncome: "$18,600",
      },
      {
        id: 3,
        month: "December 2025",
        property: "Oakwood Apts",
        status: "sent",
        date: "Dec 1, 2025",
        occupancy: "100%",
        rentCollected: "$20,400",
        expenses: "$3,200",
        netIncome: "$17,200",
      },
      {
        id: 4,
        month: "March 2026",
        property: "Oakwood Apts",
        status: "draft",
        date: null,
        occupancy: "92%",
        rentCollected: "$17,100",
        expenses: "$1,950",
        netIncome: "$15,150",
      },
    ],
  },
  mapleridge: {
    name: "Maple Ridge Condos",
    units: 8,
    stats: {
      messagesToday: 11,
      autoHandled: 9,
      avgResponse: "32s",
      openTickets: 1,
      ownerReportsDue: 0,
      aiConfidence: 97.1,
    },
    approvalQueue: [
      {
        id: 1,
        unit: "3B",
        tenant: "Tom R.",
        message: "Package delivery question",
        status: "auto-replied",
        time: "20 min ago",
        draftText:
          "Hi Tom — your package was delivered to the front office. You can pick it up before 5 PM today. Need anything else?",
        confidence: 95,
      },
    ],
    maintenanceTickets: [
      {
        id: 1,
        unit: "5A",
        issue: "Garage door opener",
        vendor: "HandyPro Services",
        vendorPhone: "(302) 555-0388",
        eta: "Scheduled Friday",
        status: "in-progress",
        progress: 50,
        cost: "$120-$200",
        description: "Garage door opener not responding to remote.",
        timeline: [
          { time: "Yesterday", event: "Request received" },
          { time: "Today", event: "Vendor scheduled for Friday" },
        ],
        assignedAt: "Today 9:20 AM",
      },
    ],
    chatMessages: [
      {
        id: 1,
        sender: "assistant",
        text: "Hi Tom! Your package was left at the front office. You can pick it up during office hours (9 AM - 5 PM). Need anything else?",
      },
      { id: 2, sender: "user", text: "Great, thanks! Can someone bring it to my unit?" },
      {
        id: 3,
        sender: "assistant",
        text: "Unfortunately we can't deliver to individual units, but the office is open until 5 PM today. We'll hold it for up to 7 days.",
      },
    ],
    inboxMessages: [
      {
        id: 1,
        unit: "3B",
        tenant: "Tom R.",
        lastMessage: "Great, thanks! Can someone bring it to my unit?",
        time: "20 min ago",
        status: "auto-replied",
        unread: false,
        thread: [
          {
            id: 1,
            sender: "assistant",
            text: "Hi Tom! Your package was left at the front office. You can pick it up during office hours (9 AM - 5 PM).",
          },
          {
            id: 2,
            sender: "user",
            text: "Great, thanks! Can someone bring it to my unit?",
          },
        ],
      },
      {
        id: 2,
        unit: "2C",
        tenant: "Nina P.",
        lastMessage: "Is guest parking full tonight?",
        time: "1 hr ago",
        status: "auto-replied",
        unread: false,
        thread: [
          { id: 1, sender: "user", text: "Is guest parking full tonight?" },
          { id: 2, sender: "assistant", text: "There are still 6 guest spots open in lot A." },
        ],
      },
      {
        id: 3,
        unit: "7A",
        tenant: "Evan R.",
        lastMessage: "Need review for lease transfer",
        time: "2 hrs ago",
        status: "needs-review",
        unread: true,
        thread: [
          { id: 1, sender: "user", text: "Need review for lease transfer." },
          { id: 2, sender: "assistant", text: "Flagged for manager review and queued for follow-up." },
        ],
      },
    ],
    leases: [
      {
        id: 1,
        unit: "3B",
        tenant: "Tom R.",
        start: "May 1, 2025",
        end: "Apr 30, 2026",
        rent: "$1,520",
        status: "expiring-soon",
      },
      {
        id: 2,
        unit: "2C",
        tenant: "Nina P.",
        start: "Oct 1, 2025",
        end: "Sep 30, 2026",
        rent: "$1,480",
        status: "active",
      },
      {
        id: 3,
        unit: "7A",
        tenant: "Evan R.",
        start: "Jan 1, 2025",
        end: "Dec 31, 2025",
        rent: "$1,600",
        status: "expired",
      },
    ],
    reports: [
      {
        id: 1,
        month: "February 2026",
        property: "Maple Ridge Condos",
        status: "sent",
        date: "Feb 1, 2026",
        occupancy: "100%",
        rentCollected: "$12,160",
        expenses: "$1,050",
        netIncome: "$11,110",
      },
      {
        id: 2,
        month: "March 2026",
        property: "Maple Ridge Condos",
        status: "draft",
        date: null,
        occupancy: "88%",
        rentCollected: "$10,540",
        expenses: "$980",
        netIncome: "$9,560",
      },
    ],
  },
  downtown: {
    name: "Downtown Lofts",
    units: 6,
    stats: {
      messagesToday: 8,
      autoHandled: 5,
      avgResponse: "55s",
      openTickets: 2,
      ownerReportsDue: 1,
      aiConfidence: 88.7,
    },
    approvalQueue: [
      {
        id: 1,
        unit: "2A",
        tenant: "Lisa K.",
        message: "Move-out notice",
        status: "needs-review",
        time: "1 hr ago",
        draftText:
          "Hi Lisa, thanks for your move-out notice for Unit 2A. Per your lease, we require 30 days written notice. I can send your move-out checklist and help schedule a final walkthrough.",
        confidence: 78,
      },
      {
        id: 2,
        unit: "4C",
        tenant: "Derek W.",
        message: "Parking complaint",
        status: "auto-replied",
        time: "3 hrs ago",
        draftText:
          "Hi Derek, I logged your parking complaint and notified onsite support. We'll follow up once this has been reviewed.",
        confidence: 90,
      },
    ],
    maintenanceTickets: [
      {
        id: 1,
        unit: "2A",
        issue: "Carpet staining",
        vendor: "CleanPro",
        vendorPhone: "(302) 555-0412",
        eta: "Scheduled next week",
        status: "in-progress",
        progress: 33,
        cost: "$300-$500",
        description:
          "Deep stains on bedroom carpet, likely needs replacement.",
        timeline: [
          { time: "2 days ago", event: "Request received" },
          { time: "Yesterday", event: "Vendor quoted job" },
        ],
        assignedAt: "Yesterday 11:20 AM",
      },
      {
        id: 2,
        unit: "6B",
        issue: "Window crack",
        vendor: "GlassFix",
        vendorPhone: "(302) 555-0455",
        eta: "3hrs",
        status: "urgent",
        progress: 20,
        cost: "$250-$400",
        description:
          "Crack in living room window, possibly from temperature stress.",
        timeline: [
          { time: "2 hrs ago", event: "Request received" },
          { time: "1 hr ago", event: "Vendor dispatched" },
        ],
        assignedAt: "1 hr ago",
      },
    ],
    chatMessages: [
      {
        id: 1,
        sender: "assistant",
        text: "Hi Lisa! I received your move-out notice for Unit 2A. I'll start the process — we need 30 days written notice per your lease. Want me to send the move-out checklist?",
      },
      { id: 2, sender: "user", text: "Yes please. When is my last day?" },
      {
        id: 3,
        sender: "assistant",
        text: "Based on today's notice, your last day would be April 3, 2026. I'll send the checklist and schedule your final walkthrough. We'll also process your security deposit within 30 days of move-out.",
      },
    ],
    inboxMessages: [
      {
        id: 1,
        unit: "2A",
        tenant: "Lisa K.",
        lastMessage: "Yes please. When is my last day?",
        time: "1 hr ago",
        status: "needs-review",
        unread: true,
        thread: [
          { id: 1, sender: "user", text: "I need to move out and break my lease." },
          { id: 2, sender: "assistant", text: "I can help start your move-out process." },
        ],
      },
      {
        id: 2,
        unit: "4C",
        tenant: "Derek W.",
        lastMessage: "Parking complaint",
        time: "3 hrs ago",
        status: "auto-replied",
        unread: false,
        thread: [
          { id: 1, sender: "user", text: "Parking complaint." },
          { id: 2, sender: "assistant", text: "Logged and escalated to onsite support." },
        ],
      },
    ],
    leases: [
      {
        id: 1,
        unit: "2A",
        tenant: "Lisa K.",
        start: "May 1, 2025",
        end: "Apr 30, 2026",
        rent: "$1,980",
        status: "expiring-soon",
      },
      {
        id: 2,
        unit: "4C",
        tenant: "Derek W.",
        start: "Sep 1, 2025",
        end: "Aug 31, 2026",
        rent: "$2,100",
        status: "active",
      },
      {
        id: 3,
        unit: "6B",
        tenant: "Nora F.",
        start: "Feb 1, 2025",
        end: "Jan 31, 2026",
        rent: "$2,050",
        status: "expired",
      },
    ],
    reports: [
      {
        id: 1,
        month: "February 2026",
        property: "Downtown Lofts",
        status: "overdue",
        date: null,
        occupancy: "83%",
        rentCollected: "$9,860",
        expenses: "$2,150",
        netIncome: "$7,710",
      },
      {
        id: 2,
        month: "January 2026",
        property: "Downtown Lofts",
        status: "sent",
        date: "Jan 1, 2026",
        occupancy: "100%",
        rentCollected: "$11,980",
        expenses: "$1,920",
        netIncome: "$10,060",
      },
    ],
  },
};

const defaultSettings: DemoState["settings"] = {
  responseTone: "Professional",
  autoReplyThreshold: 85,
  responseDelay: 1,
  notifications: {
    email: true,
    sms: true,
    push: true,
  },
};

export function getAIResponse(userMessage: string) {
  const lower = userMessage.toLowerCase();

  for (const entry of CHAT_RESPONSES) {
    if (entry.keywords.some((keyword) => lower.includes(keyword))) {
      return entry.response;
    }
  }

  return DEFAULT_RESPONSE;
}

function clonePropertyData(propertyKey: DemoPropertyKey): DemoPropertyData {
  return JSON.parse(JSON.stringify(PROPERTY_DATA[propertyKey])) as DemoPropertyData;
}

export function createInitialDemoState(propertyKey: DemoPropertyKey = "oakwood"): DemoState {
  const property = clonePropertyData(propertyKey);

  return {
    currentView: "dashboard",
    currentProperty: propertyKey,
    propertyMenuOpen: false,
    sidebarCollapsed: false,
    stats: property.stats,
    approvalQueue: property.approvalQueue,
    maintenanceTickets: property.maintenanceTickets,
    chatMessages: property.chatMessages,
    inboxMessages: property.inboxMessages,
    selectedMessageId: property.inboxMessages[0]?.id ?? null,
    messageSearch: "",
    messageFilter: "all",
    leases: property.leases,
    reports: property.reports,
    expandedTicketId: null,
    expandedReportId: null,
    editModalItemId: null,
    notifications: [],
    settings: JSON.parse(JSON.stringify(defaultSettings)) as DemoState["settings"],
    showAvgResponseInfo: false,
    chatTyping: false,
  };
}
