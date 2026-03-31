export type ResourceArticle = {
  path: string;
  title: string;
  description: string;
  directAnswer: string;
  intro: string[];
  summaryBullets: string[];
  sections: Array<{
    title: string;
    paragraphs: string[];
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const resourceArticles: ResourceArticle[] = [
  {
    path: "/property-management-automation-roi",
    title: "Property Management Automation ROI",
    description:
      "How independent property managers should think about automation ROI, where the hours leak, and what to audit first before buying.",
    directAnswer:
      "Property management automation ROI usually comes from removing repeat admin work, reducing vacancy drag, and tightening response times before the team gets buried. For most independent firms, the right starting point is not a broad software rollout. It is a workflow audit that finds the 2-3 repeated tasks eating hours every week.",
    intro: [
      "Property managers rarely lose margin in one dramatic place. It leaks out through delayed prospect replies, manual owner reports, maintenance follow-up, and routine tenant communication that somebody on the team keeps touching by hand.",
      "The right ROI conversation starts with workflow volume, response speed, and staffing pressure. If you cannot point to those three clearly, you are guessing.",
    ],
    summaryBullets: [
      "Measure repeated work before you price software.",
      "Response-time improvements affect both leasing speed and tenant experience.",
      "The first automation should remove handoffs, not add another tool the team has to babysit.",
    ],
    sections: [
      {
        title: "Where the return usually shows up first",
        paragraphs: [
          "For independent PM companies, the first returns usually appear in faster prospect follow-up, fewer manual maintenance handoffs, and owner reporting that no longer depends on late-night spreadsheet work.",
          "Those are operational choke points. They cost time directly and they also delay revenue, frustrate owners, and stretch a small team thinner than it should be.",
        ],
      },
      {
        title: "How to evaluate ROI without fake precision",
        paragraphs: [
          "Start with units, team size, average response speed, vacancy timing, and the specific workflows your team repeats every day. That gives you a usable baseline.",
          "Then ask which workflow can be removed or shortened first. If the answer is unclear, you are still too early to talk about platform ROI in a serious way.",
        ],
      },
      {
        title: "What to automate first",
        paragraphs: [
          "The first build should target the workflow that combines high repetition with high business impact. In many PM shops, that means prospect response, maintenance coordination, or owner reporting.",
          "The best first win is the one Bruno can show back to the prospect in a simple before-and-after report. It should be obvious, operational, and easy to explain on a call.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is a realistic first ROI target for a small PM company?",
        answer:
          "A realistic first target is time back for the team and a measurable reduction in slow handoffs. If the workflow audit does not produce a clear weekly-hours and response-time story, the target is not concrete enough yet.",
      },
      {
        question: "Should property managers automate everything at once?",
        answer:
          "No. A broad rollout creates noise. Start with one high-friction workflow, prove the result, then expand.",
      },
      {
        question: "Why use an audit before booking a build?",
        answer:
          "The audit creates the baseline and shows which workflow is worth fixing first. Without that, the conversation turns into generic software talk instead of an operational decision.",
      },
    ],
  },
  {
    path: "/automated-owner-reporting-for-property-managers",
    title: "Automated Owner Reporting For Property Managers",
    description:
      "What automated owner reporting should actually replace, what a good workflow looks like, and how PM teams should evaluate it.",
    directAnswer:
      "Automated owner reporting should replace the monthly scramble to export, reformat, rewrite, and resend the same updates by hand. The goal is not prettier reports alone. The goal is consistent delivery, less admin drag, and owner communication that no longer steals evenings from the operations team.",
    intro: [
      "Owner reporting becomes expensive when every owner wants a slightly different format and the team has to stitch together exports manually at the end of the month.",
      "That is why owner reporting is often one of the best first workflows to automate. It is repeated, visible, and easy for a prospect to understand immediately.",
    ],
    summaryBullets: [
      "The win is consistency plus hours back, not just visual polish.",
      "A good reporting workflow keeps data extraction, formatting, and delivery together.",
      "If the process still depends on memory, it is not automated enough.",
    ],
    sections: [
      {
        title: "What the manual version usually looks like",
        paragraphs: [
          "Someone exports data from the PM system, copies it into a spreadsheet, rewrites notes, adjusts formatting for specific owners, and sends everything manually. That repeats every month.",
          "The problem is not one report. It is the cumulative drag across the full owner base, especially when the same coordinator is also handling tenant and vendor work.",
        ],
      },
      {
        title: "What a good automated reporting workflow includes",
        paragraphs: [
          "A good workflow collects the right data source, formats it to the owner's preferred structure, adds the operating notes that matter, and sends it on a predictable schedule.",
          "The PM team should only step in when something needs judgment, not to rebuild the report from scratch every time.",
        ],
      },
      {
        title: "How this helps the sales conversation",
        paragraphs: [
          "Owner reporting is easy to show and easy to price. It gives the prospect a concrete artifact and makes the value visible fast.",
          "For Veyra, that makes it a strong proof workflow in discovery, proposals, and follow-up because the output itself is client-facing.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is owner reporting a better first automation than tenant communication?",
        answer:
          "Sometimes. If the prospect is clearly losing evenings to report prep and can describe the pain in detail, owner reporting can be the cleaner first win.",
      },
      {
        question: "Do owners need to know AI is involved?",
        answer:
          "Not necessarily. What matters is that the report is accurate, consistent, and aligned with the manager's communication style.",
      },
      {
        question: "What makes owner reporting a high-intent topic?",
        answer:
          "It signals a prospect who is already thinking about process quality, service consistency, and operational scale rather than generic software curiosity.",
      },
    ],
  },
  {
    path: "/automate-maintenance-coordination-property-management",
    title: "Automate Maintenance Coordination In Property Management",
    description:
      "How PM teams should approach maintenance coordination automation, what it should handle, and where the first gains come from.",
    directAnswer:
      "Maintenance coordination should be automated where the work is repetitive: intake, triage, routing, status updates, and follow-up. The goal is not to remove judgment from repair decisions. It is to stop burning team hours on the same handoffs, missed updates, and vendor chasing every week.",
    intro: [
      "Maintenance is one of the most operationally expensive workflows in a PM business because it creates back-and-forth in every direction: tenant, coordinator, vendor, and owner.",
      "When it stays manual, the team loses time and the tenant experience gets worse at the same time.",
    ],
    summaryBullets: [
      "The bottleneck is usually routing and follow-up, not the repair itself.",
      "A good system gives tenants updates without making the PM team type each one.",
      "The highest-value automation reduces phone tag and status chasing first.",
    ],
    sections: [
      {
        title: "Where coordination breaks down",
        paragraphs: [
          "Manual maintenance workflows usually break in triage, dispatch, and status visibility. The same request gets repeated to multiple people before anything actually moves.",
          "That creates extra touches for the team and uncertainty for the tenant. Both are signals that the workflow is ready for automation.",
        ],
      },
      {
        title: "What the automation should own",
        paragraphs: [
          "A good workflow should capture the issue, classify urgency, route to the right vendor or queue, and keep the tenant updated without waiting on manual follow-up.",
          "Managers still need control over exceptions, approvals, and edge cases. The system should reduce noise, not make decisions it cannot justify.",
        ],
      },
      {
        title: "Why this is a strong fit for Veyra",
        paragraphs: [
          "Maintenance coordination is concrete. Prospects can describe the pain quickly, and the before-and-after story is easy to show in an audit or proposal.",
          "That makes it a high-signal angle for both discovery calls and outbound follow-up assets.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can maintenance coordination be automated without changing PM software?",
        answer:
          "Often yes. The key is connecting the existing tools and replacing the manual handoffs between them, not forcing a full platform migration.",
      },
      {
        question: "What should still stay manual?",
        answer:
          "Escalations, unusual approvals, high-risk repairs, and anything that genuinely needs judgment should still route to a human.",
      },
      {
        question: "Why do PM owners search this topic before buying?",
        answer:
          "Because maintenance coordination pain is usually obvious in day-to-day operations. When someone is searching it directly, they are usually close to feeling the cost.",
      },
    ],
  },
  {
    path: "/automate-tenant-communication-property-management",
    title: "Automate Tenant Communication In Property Management",
    description:
      "How property managers should think about tenant communication automation, what to automate first, and what still needs a human.",
    directAnswer:
      "Tenant communication should be automated where the questions are repeated, the response patterns are predictable, and the team is wasting time typing the same answers again and again. The best systems handle routine responses fast, escalate exceptions cleanly, and keep the manager in control of anything sensitive or judgment-heavy.",
    intro: [
      "Independent property managers do not usually need more messages. They need fewer messages that require human effort.",
      "That is why tenant communication is a strong automation candidate. It is frequent, repetitive, and directly tied to service quality.",
    ],
    summaryBullets: [
      "Fast first response matters more than perfect formatting.",
      "The workflow should separate routine questions from sensitive issues.",
      "A manager should review exceptions, not every single message.",
    ],
    sections: [
      {
        title: "What to automate first",
        paragraphs: [
          "Start with questions already answered in policy docs, onboarding packets, lease terms, or routine maintenance flows. Those are the cleanest wins.",
          "If the team is still typing the same rent-due, parking, access, or status-update answers every week, the system has not been built tightly enough.",
        ],
      },
      {
        title: "What still needs a human",
        paragraphs: [
          "Complaints, disputes, unusual lease issues, and anything with legal or safety implications should still move to a human review path.",
          "Automation should reduce the volume hitting the team so the real judgment calls get faster and better attention.",
        ],
      },
      {
        title: "Why this matters commercially",
        paragraphs: [
          "Tenant communication affects workload, retention, and brand perception at the same time. That makes it more than a convenience play.",
          "For Veyra, it also creates useful outbound proof because faster response is easy to explain and easy for a PM owner to value.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will tenants know they are talking to an automated workflow?",
        answer:
          "They do not need to, as long as the response is accurate, useful, and escalates cleanly when a person should step in.",
      },
      {
        question: "Is tenant communication automation risky?",
        answer:
          "It is risky only when everything is treated the same. The safe version handles routine cases automatically and routes edge cases to review.",
      },
      {
        question: "Why is response time such a common buying trigger?",
        answer:
          "Because response delays hit leasing, satisfaction, and workload all at once. Prospects feel that pain every day.",
      },
    ],
  },
];

export function getResourceArticle(path: string) {
  return resourceArticles.find((article) => article.path === path);
}
