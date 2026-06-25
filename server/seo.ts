import { resourceArticles } from "../client/src/content/resources";

export const SITE_NAME = "Veyra Group";
export const SITE_URL = "https://veyragroup.ai";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const SEO_LAST_MODIFIED = "2026-03-31";

// Real last-modified dates per path. Feeds sitemap <lastmod> and Article JSON-LD
// (datePublished/dateModified). Without this, every URL reported 2026-03-31, which
// suppressed re-crawl and made every article look stale to Google. Update the date
// here whenever a page's content materially changes.
const PAGE_LAST_MODIFIED: Record<string, string> = {
  "/": "2026-03-31",
  "/guides": "2026-06-03",
  "/property-management-automation-roi": "2026-06-16",
  "/automated-owner-reporting-for-property-managers": "2026-06-03",
  "/automate-maintenance-coordination-property-management": "2026-06-03",
  "/automate-tenant-communication-property-management": "2026-06-03",
  "/how-many-properties-can-one-manager-handle": "2026-06-09",
  "/property-management-challenges-2026": "2026-06-24",
  "/how-to-reduce-tenant-turnover": "2026-04-14",
  "/scale-property-management-business": "2026-04-28",
  "/maintenance-response-time-benchmark": "2026-06-17",
  "/property-management-kpis": "2026-05-12",
  "/appfolio-vs-buildium-small-pm": "2026-05-19",
  "/owner-communication-best-practices": "2026-05-26",
  "/property-management-workflow-automation": "2026-06-02",
  "/handle-maintenance-emergencies": "2026-06-09",
  "/reduce-property-management-overhead": "2026-06-16",
  "/property-management-ai": "2026-06-17",
  "/how-to-use-ai-in-property-management": "2026-06-23",
};

export function getLastModified(path: string): string {
  return PAGE_LAST_MODIFIED[path] ?? SEO_LAST_MODIFIED;
}

// Contextual internal links rendered into each article's prerendered snapshot as a
// crawlable "Related guides" block. Previously article snapshots linked only to
// /audit and /book, leaving every guide a crawl dead-end. Anchor labels are derived
// from the linked article's title at render time, so they stay accurate.
const RELATED_GUIDES: Record<string, string[]> = {
  "/property-management-automation-roi": [
    "/property-management-workflow-automation",
    "/reduce-property-management-overhead",
    "/property-management-ai",
  ],
  "/automated-owner-reporting-for-property-managers": [
    "/owner-communication-best-practices",
    "/property-management-automation-roi",
    "/property-management-kpis",
  ],
  "/automate-maintenance-coordination-property-management": [
    "/maintenance-response-time-benchmark",
    "/handle-maintenance-emergencies",
    "/property-management-ai",
  ],
  "/automate-tenant-communication-property-management": [
    "/how-to-reduce-tenant-turnover",
    "/how-to-use-ai-in-property-management",
    "/property-management-ai",
  ],
  "/how-many-properties-can-one-manager-handle": [
    "/scale-property-management-business",
    "/property-management-workflow-automation",
    "/property-management-kpis",
  ],
  "/property-management-challenges-2026": [
    "/property-management-ai",
    "/scale-property-management-business",
    "/reduce-property-management-overhead",
  ],
  "/how-to-reduce-tenant-turnover": [
    "/automate-tenant-communication-property-management",
    "/property-management-kpis",
    "/owner-communication-best-practices",
  ],
  "/scale-property-management-business": [
    "/how-many-properties-can-one-manager-handle",
    "/reduce-property-management-overhead",
    "/property-management-ai",
  ],
  "/maintenance-response-time-benchmark": [
    "/automate-maintenance-coordination-property-management",
    "/handle-maintenance-emergencies",
    "/property-management-kpis",
  ],
  "/property-management-kpis": [
    "/property-management-challenges-2026",
    "/maintenance-response-time-benchmark",
    "/scale-property-management-business",
  ],
  "/appfolio-vs-buildium-small-pm": [
    "/property-management-workflow-automation",
    "/property-management-automation-roi",
    "/property-management-ai",
  ],
  "/owner-communication-best-practices": [
    "/automated-owner-reporting-for-property-managers",
    "/how-to-reduce-tenant-turnover",
    "/property-management-kpis",
  ],
  "/property-management-workflow-automation": [
    "/property-management-ai",
    "/property-management-automation-roi",
    "/property-management-kpis",
  ],
  "/handle-maintenance-emergencies": [
    "/automate-maintenance-coordination-property-management",
    "/maintenance-response-time-benchmark",
    "/property-management-challenges-2026",
  ],
  "/reduce-property-management-overhead": [
    "/scale-property-management-business",
    "/property-management-automation-roi",
    "/property-management-kpis",
  ],
  "/property-management-ai": [
    "/how-to-use-ai-in-property-management",
    "/property-management-workflow-automation",
    "/property-management-automation-roi",
  ],
  "/how-to-use-ai-in-property-management": [
    "/property-management-ai",
    "/automate-maintenance-coordination-property-management",
    "/automate-tenant-communication-property-management",
  ],
};

// Short, descriptive anchor text from an article's title (drops the part after a colon).
function relatedGuideLabel(path: string): string {
  const article = resourceArticles.find((a) => a.path === path);
  if (!article) return path;
  return article.title.split(":")[0].trim();
}

type PageType = "website" | "article";

type StructuredData = Record<string, unknown> | Array<Record<string, unknown>>;

type SeoPage = {
  path: string;
  title: string;
  description: string;
  type: PageType;
  noindex?: boolean;
  lastModified?: string;
};

type SnapshotSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  links?: Array<{ href: string; label: string; description?: string }>;
};

type SnapshotConfig = {
  eyebrow: string;
  title: string;
  description: string;
  primaryLink: { href: string; label: string };
  secondaryLinks?: Array<{ href: string; label: string }>;
  sections: SnapshotSection[];
  footerNote?: string;
};

const STATIC_PAGES: SeoPage[] = [
  {
    path: "/",
    title: "Done-For-You Workflow Automation for Property Managers",
    description:
      "Run the free PM Workflow Audit, get the report by email, and see which workflow Veyra should fix first.",
    type: "website",
  },
  {
    path: "/guides",
    title: "Property Management Automation Guides",
    description:
      "Operator guides for independent property managers running 50-500 doors: where the hours leak, what to automate first, and how to scope it before buying any software.",
    type: "website",
  },
  {
    path: "/pricing",
    title: "Pricing",
    description:
      "Veyra pricing is custom and value-based. We scope your build and monthly management to the workflows you need and quote it on a free audit. No annual contracts. The audit and first call are free.",
    type: "website",
  },
  {
    path: "/audit",
    title: "Free PM Workflow Audit",
    description:
      "Run Veyra's PM Workflow Audit, get the report by email, and see which workflow should be fixed first.",
    type: "website",
  },
  {
    path: "/book",
    title: "Book a Workflow Audit Call",
    description:
      "Schedule a 15-minute workflow audit call with Veyra to map where your property management team is bleeding time.",
    type: "website",
  },
  {
    path: "/privacy",
    title: "Privacy Policy",
    description:
      "Review how Veyra Group collects, uses, and protects information across the website, audits, and connected services.",
    type: "website",
  },
  {
    path: "/terms-of-service",
    title: "Terms of Service",
    description:
      "Read the Veyra Group terms covering workflow audits, automation build services, billing, cancellation, and support.",
    type: "website",
  },
  {
    path: "/not-found",
    title: "Page Not Found",
    description:
      "The page you requested does not exist. Return to the Veyra homepage or start the workflow audit instead.",
    type: "website",
    noindex: true,
  },
];

const REDIRECTS = new Map<string, string>([
  ["/calculator", "/audit"],
  ["/privacy-policy", "/privacy"],
  ["/demo", "/audit"],
]);

const pageLookup = new Map<string, SeoPage>(
  STATIC_PAGES.map((page) => [page.path, page]),
);

export function normalizeSeoPath(input: string) {
  const [pathname] = input.split(/[?#]/, 1);
  if (!pathname || pathname === "/") {
    return "/";
  }
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function getSeoRedirect(pathname: string) {
  return REDIRECTS.get(normalizeSeoPath(pathname)) ?? null;
}

export function getResourceArticleForPath(pathname: string) {
  const normalizedPath = normalizeSeoPath(pathname);
  return resourceArticles.find((article) => article.path === normalizedPath) ?? null;
}

export function getSeoPage(pathname: string): SeoPage | null {
  const normalizedPath = normalizeSeoPath(pathname);
  const staticPage = pageLookup.get(normalizedPath);
  if (staticPage) {
    return staticPage;
  }

  const article = getResourceArticleForPath(normalizedPath);
  if (!article) {
    return null;
  }

  return {
    path: article.path,
    title: article.title,
    description: article.description,
    type: "article",
    lastModified: getLastModified(article.path),
  };
}

export function getRenderableSeoPaths() {
  return [
    ...STATIC_PAGES.filter((page) => page.path !== "/not-found").map((page) => page.path),
    ...resourceArticles.map((article) => article.path),
  ];
}

export function getIndexableSeoPages() {
  return [
    ...STATIC_PAGES.filter((page) => !page.noindex && page.path !== "/not-found").map(
      (page) => ({ ...page, lastModified: page.lastModified ?? getLastModified(page.path) }),
    ),
    ...resourceArticles.map((article) => ({
      path: article.path,
      title: article.title,
      description: article.description,
      type: "article" as const,
      lastModified: getLastModified(article.path),
    })),
  ];
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderStructuredDataScripts(structuredData: StructuredData | undefined) {
  if (!structuredData) {
    return "";
  }

  const payloads = Array.isArray(structuredData) ? structuredData : [structuredData];
  return payloads
    .map(
      (payload) =>
        `<script type="application/ld+json">${JSON.stringify(payload)}</script>`,
    )
    .join("\n");
}

function renderSnapshotLinks(
  links: Array<{ href: string; label: string; description?: string }>,
) {
  if (links.length === 0) {
    return "";
  }

  return `
    <div class="snapshot-links">
      ${links
        .map((link) => {
          const description = link.description
            ? `<span>${escapeHtml(link.description)}</span>`
            : "";
          return `
            <a href="${escapeHtml(link.href)}">
              <strong>${escapeHtml(link.label)}</strong>
              ${description}
            </a>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderSnapshotSection(section: SnapshotSection) {
  const paragraphs = (section.paragraphs ?? [])
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
  const bullets =
    section.bullets && section.bullets.length > 0
      ? `<ul>${section.bullets
          .map((bullet) => `<li>${escapeHtml(bullet)}</li>`)
          .join("")}</ul>`
      : "";

  return `
    <section class="snapshot-section">
      <h2>${escapeHtml(section.title)}</h2>
      ${paragraphs}
      ${bullets}
      ${renderSnapshotLinks(section.links ?? [])}
    </section>
  `;
}

function renderSnapshotPage(config: SnapshotConfig) {
  const secondaryLinks =
    config.secondaryLinks && config.secondaryLinks.length > 0
      ? config.secondaryLinks
          .map(
            (link) =>
              `<a class="secondary-link" href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`,
          )
          .join("")
      : "";

  return `
    <style>
      :root {
        color-scheme: dark;
      }

      body {
        margin: 0;
        background: #050505;
        color: #f5f5f5;
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      [data-veyra-snapshot] {
        min-height: 100vh;
        background:
          radial-gradient(circle at top left, rgba(16, 185, 129, 0.16), transparent 32%),
          radial-gradient(circle at top right, rgba(110, 231, 183, 0.08), transparent 28%),
          #050505;
      }

      .snapshot-shell {
        max-width: 980px;
        margin: 0 auto;
        padding: 32px 24px 72px;
      }

      .snapshot-badge {
        display: inline-flex;
        align-items: center;
        border: 1px solid rgba(52, 211, 153, 0.28);
        border-radius: 999px;
        background: rgba(16, 185, 129, 0.12);
        color: #86efac;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.16em;
        padding: 10px 14px;
        text-transform: uppercase;
      }

      .snapshot-shell h1 {
        font-size: clamp(2.4rem, 6vw, 4.7rem);
        line-height: 1.04;
        letter-spacing: -0.03em;
        margin: 20px 0 0;
      }

      .snapshot-lede {
        color: #cbd5e1;
        font-size: 1.08rem;
        line-height: 1.75;
        max-width: 760px;
        margin: 18px 0 0;
      }

      .snapshot-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin: 26px 0 0;
      }

      .snapshot-actions a,
      .snapshot-links a {
        text-decoration: none;
      }

      .primary-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        background: #34d399;
        color: #03130d;
        font-weight: 700;
        padding: 14px 20px;
      }

      .secondary-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 999px;
        color: #e5e7eb;
        padding: 14px 20px;
      }

      .snapshot-grid {
        display: grid;
        gap: 18px;
        margin-top: 30px;
      }

      .snapshot-section {
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 28px;
        background: rgba(255, 255, 255, 0.03);
        padding: 24px;
      }

      .snapshot-section h2 {
        margin: 0 0 12px;
        font-size: 1.3rem;
      }

      .snapshot-section p,
      .snapshot-section li,
      .snapshot-links span {
        color: #cbd5e1;
        line-height: 1.72;
      }

      .snapshot-section p {
        margin: 10px 0 0;
      }

      .snapshot-section ul {
        margin: 14px 0 0;
        padding-left: 20px;
      }

      .snapshot-links {
        display: grid;
        gap: 12px;
        margin-top: 16px;
      }

      .snapshot-links a {
        display: grid;
        gap: 6px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 20px;
        background: rgba(0, 0, 0, 0.22);
        color: #f8fafc;
        padding: 16px;
      }

      .snapshot-links strong {
        color: #86efac;
      }

      .snapshot-footnote {
        color: #94a3b8;
        font-size: 0.94rem;
        margin: 24px 0 0;
      }
    </style>
    <div data-veyra-snapshot="true">
      <main class="snapshot-shell">
        <p class="snapshot-badge">${escapeHtml(config.eyebrow)}</p>
        <h1>${escapeHtml(config.title)}</h1>
        <p class="snapshot-lede">${escapeHtml(config.description)}</p>
        <div class="snapshot-actions">
          <a class="primary-link" href="${escapeHtml(config.primaryLink.href)}">${escapeHtml(config.primaryLink.label)}</a>
          ${secondaryLinks}
        </div>
        <div class="snapshot-grid">
          ${config.sections.map(renderSnapshotSection).join("")}
        </div>
        <p class="snapshot-footnote">${escapeHtml(
          config.footerNote ??
            "The full interactive page loads automatically when JavaScript is available.",
        )}</p>
      </main>
    </div>
  `;
}

function getStaticSnapshot(pathname: string): SnapshotConfig | null {
  switch (pathname) {
    case "/":
      return {
        eyebrow: "Workflow Automation For Property Managers",
        title: "Stop running your PM company like an after-hours inbox.",
        description:
          "Veyra helps independent property managers automate tenant communication, maintenance coordination, owner reporting, and other repeat admin workflows without forcing a platform migration.",
        primaryLink: { href: "/audit", label: "Get the free PM audit report" },
        secondaryLinks: [
          { href: "/book", label: "Book the workflow audit call" },
          { href: "/property-management-automation-roi", label: "Read the ROI guide" },
        ],
        sections: [
          {
            title: "What Veyra fixes first",
            bullets: [
              "Tenant communication that keeps hitting the same person with the same questions.",
              "Maintenance coordination that depends on manual triage, vendor chasing, and status updates.",
              "Owner reporting that still turns into spreadsheet cleanup at the end of the month.",
            ],
          },
          {
            title: "Why the audit comes first",
            paragraphs: [
              "The first useful automation is the workflow that combines high repetition with visible business impact. Veyra's audit maps the drag, estimates the repeat admin load, and recommends the first build before any proposal or software talk.",
              "That keeps the conversation grounded in the work your team is already doing instead of abstract AI claims.",
            ],
          },
          {
            title: "Bottom-funnel guides",
            links: resourceArticles.map((article) => ({
              href: article.path,
              label: article.title,
              description: article.description,
            })),
          },
        ],
      };
    case "/guides": {
      const automationPaths = [
        "/property-management-automation-roi",
        "/automated-owner-reporting-for-property-managers",
        "/automate-maintenance-coordination-property-management",
        "/automate-tenant-communication-property-management",
        "/property-management-workflow-automation",
      ];
      const toLink = (article: { path: string; title: string; description: string }) => ({
        href: article.path,
        label: article.title,
        description: article.description,
      });
      return {
        eyebrow: "Guides",
        title: "Guides for independent property managers",
        description:
          "Practical, operator-level breakdowns for firms running 50-500 doors. Where the hours leak, what to automate first, and how to scope it before you buy any software.",
        primaryLink: { href: "/audit", label: "Get the free PM audit report" },
        secondaryLinks: [
          { href: "/book", label: "Book the workflow audit call" },
          { href: "/", label: "Back to the homepage" },
        ],
        sections: [
          {
            title: "Automation guides",
            paragraphs: ["Tied directly to what we build. Start here if you already know a workflow is the problem."],
            links: resourceArticles.filter((a) => automationPaths.includes(a.path)).map(toLink),
          },
          {
            title: "PM operating resources",
            paragraphs: ["Broader operator playbooks and benchmarks for running a tighter 50-500 door operation."],
            links: resourceArticles.filter((a) => !automationPaths.includes(a.path)).map(toLink),
          },
        ],
      };
    }
    case "/pricing":
      return {
        eyebrow: "Pricing",
        title: "Every build is different. So is the price.",
        description:
          "Custom, value-based pricing. We scope your build and monthly management to the workflows you need and the size of your operation, then quote it on a free audit. No annual contracts.",
        primaryLink: { href: "/audit", label: "Get the free PM audit report" },
        secondaryLinks: [
          { href: "/book", label: "Book the workflow audit call" },
          { href: "/", label: "Back to the homepage" },
        ],
        sections: [
          {
            title: "How pricing works",
            bullets: [
              "Pricing is custom. Your build and monthly management are scoped to the workflows you need and the size of your operation.",
              "We don't post a flat rate. The free audit maps your workflows and gives you an exact build and monthly quote.",
              "No annual contract. You only pay once we agree on a workflow worth building.",
            ],
          },
          {
            title: "What we automate",
            paragraphs: [
              "Tenant communications, maintenance coordination, lease tracking and renewals, rent-collection follow-ups, vendor management, prospect auto-response, and owner reporting. Build any combination, and we scope the setup and monthly management to the ones you need.",
            ],
          },
        ],
      };
    case "/audit":
      return {
        eyebrow: "Free PM Workflow Audit",
        title: "Run the workflow audit first. Book the call second.",
        description:
          "The audit report points to the workflow Veyra should fix first, shows the repeatable admin load sitting on the team, and gives a cleaner starting point for a sales conversation.",
        primaryLink: { href: "/book", label: "Book the workflow audit call" },
        secondaryLinks: [{ href: "/", label: "Back to the homepage" }],
        sections: [
          {
            title: "What the report includes",
            bullets: [
              "A first-build recommendation tied to your workflow answers.",
              "Directional workload math instead of a generic automation score.",
              "A clean next step for maintenance, tenant communication, owner reporting, or related admin work.",
            ],
          },
          {
            title: "When this is valuable",
            paragraphs: [
              "Use the audit when you know your team is buried in repeat admin work but you do not want another broad software rollout.",
              "The strongest use case is founder-led discovery: run the audit, review the report, and only take the call if the wedge looks real enough to justify it.",
            ],
          },
        ],
      };
    case "/book":
      return {
        eyebrow: "15 Minute Call",
        title: "Book the workflow audit call.",
        description:
          "Use the call to map the workflow that is leaking the most hours, see what Veyra would automate first, and decide whether a build makes sense.",
        primaryLink: {
          href: "https://calendly.com/veyragroup/15min",
          label: "Open the scheduling page",
        },
        secondaryLinks: [{ href: "/audit", label: "Run the free audit first" }],
        sections: [
          {
            title: "What happens on the call",
            bullets: [
              "Walk through where your PM team is losing time each week.",
              "Pressure-test whether the best first automation is tenant communication, maintenance coordination, owner reporting, or another workflow.",
              "Decide whether there is enough value to move into a scoped build.",
            ],
          },
        ],
      };
    case "/privacy":
      return {
        eyebrow: "Legal",
        title: "Privacy policy for audits, website forms, and connected services.",
        description:
          "Veyra's privacy policy covers what information is collected, how it is used to deliver audits and services, how connected platform data is handled, and how to contact the company with privacy requests.",
        primaryLink: { href: "mailto:contact@veyragroup.ai", label: "Email privacy requests" },
        secondaryLinks: [{ href: "/", label: "Return to the site" }],
        sections: [
          {
            title: "What information Veyra may collect",
            bullets: [
              "Contact details and workflow information provided through the website, audits, onboarding, or support.",
              "Account and authentication data from third-party sign-ins when a user authorizes access.",
              "Usage and technical data such as browser, device, referring URLs, and pages visited.",
            ],
          },
          {
            title: "How the information is used",
            paragraphs: [
              "Veyra uses collected information to provide workflow audits, operate and improve services, communicate with clients, and keep the product secure.",
              "Requests related to deletion, access, or correction can be sent to contact@veyragroup.ai.",
            ],
          },
        ],
      };
    case "/terms-of-service":
      return {
        eyebrow: "Legal",
        title: "Terms for workflow audits, automation builds, and support.",
        description:
          "The Veyra terms describe the services offered, client responsibilities, billing expectations, cancellation terms, and the general legal framework for working together.",
        primaryLink: { href: "mailto:contact@veyragroup.ai", label: "Ask a contract question" },
        secondaryLinks: [{ href: "/", label: "Return to the site" }],
        sections: [
          {
            title: "What the terms cover",
            bullets: [
              "Workflow audits, automation build services, and ongoing optimization support.",
              "Fee and billing expectations defined in the applicable service agreement.",
              "Client responsibilities for accurate information, system access, and legal use of the services.",
            ],
          },
          {
            title: "Operational summary",
            paragraphs: [
              "The signed agreement governs deliverables, ownership, and service details. The public terms provide the default legal baseline for billing, cancellation, disclaimers, and liability limits.",
            ],
          },
        ],
      };
    case "/not-found":
      return {
        eyebrow: "404",
        title: "Page not found.",
        description:
          "That URL does not map to a live Veyra page. Return to the homepage or start the PM workflow audit instead.",
        primaryLink: { href: "/", label: "Go to the homepage" },
        secondaryLinks: [{ href: "/audit", label: "Start the PM audit" }],
        sections: [
          {
            title: "Best next step",
            paragraphs: [
              "If you were looking for Veyra's main offer, the workflow audit is the cleanest entry point. It explains the wedge before asking for a call.",
            ],
          },
        ],
        footerNote: "This route returns a proper 404 status so search engines do not index it.",
      };
    default:
      return null;
  }
}

function renderArticleSnapshot(pathname: string) {
  const article = getResourceArticleForPath(pathname);
  if (!article) {
    return null;
  }

  return renderSnapshotPage({
    eyebrow: "Bottom Funnel Guide",
    title: article.title,
    description: article.directAnswer,
    primaryLink: { href: "/audit", label: "Get the free PM audit report" },
    secondaryLinks: [
      { href: "/book", label: "Book the workflow audit call" },
      { href: "/", label: "Return to the homepage" },
    ],
    sections: [
      {
        title: "Why this topic matters",
        paragraphs: article.intro,
        bullets: article.summaryBullets,
      },
      ...article.sections.map((section) => ({
        title: section.title,
        paragraphs: section.paragraphs,
      })),
      ...((RELATED_GUIDES[article.path] ?? []).length > 0
        ? [
            {
              title: "Related guides",
              links: (RELATED_GUIDES[article.path] ?? []).map((href) => ({
                href,
                label: relatedGuideLabel(href),
              })),
            },
          ]
        : []),
      {
        title: "FAQ",
        links: article.faqs.map((faq) => ({
          href: "/audit",
          label: faq.question,
          description: faq.answer,
        })),
      },
    ],
  });
}

function getStructuredData(pathname: string): StructuredData | undefined {
  const article = getResourceArticleForPath(pathname);
  if (article) {
    const articleUrl = `${SITE_URL}${article.path}`;
    return [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.description,
        url: articleUrl,
        mainEntityOfPage: articleUrl,
        datePublished: getLastModified(article.path),
        dateModified: getLastModified(article.path),
        author: {
          "@type": "Organization",
          name: SITE_NAME,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/veyra-logo.svg`,
          },
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: article.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ];
  }

  const page = getSeoPage(pathname);
  if (!page || page.path === "/not-found") {
    return undefined;
  }

  if (page.path === "/") {
    return [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/veyra-logo.svg`,
        description: page.description,
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
      },
    ];
  }

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    url: `${SITE_URL}${page.path}`,
  };
}

function replaceHeadTag(
  html: string,
  pattern: RegExp,
  replacement: string,
  fallback: string,
) {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement);
  }
  return html.replace("</head>", `${fallback}\n</head>`);
}

function upsertLinkTag(
  html: string,
  rel: string,
  href: string,
) {
  const escapedRel = rel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `<link\\s+[^>]*rel=["']${escapedRel}["'][^>]*href=["'][^"']*["'][^>]*\\/?>`,
    "i",
  );
  const tag = `<link rel="${rel}" href="${href}" />`;
  return replaceHeadTag(html, pattern, tag, tag);
}

export function renderSeoHtml(template: string, requestPath: string) {
  const normalizedPath = normalizeSeoPath(requestPath);
  const page = getSeoPage(normalizedPath) ?? pageLookup.get("/not-found")!;
  const bodyHtml =
    renderArticleSnapshot(page.path) ??
    renderSnapshotPage(getStaticSnapshot(page.path) ?? getStaticSnapshot("/not-found")!);
  const pageUrl = `${SITE_URL}${page.path === "/" ? "/" : page.path}`;
  const fullTitle = page.title.includes(SITE_NAME)
    ? page.title
    : `${page.title} | ${SITE_NAME}`;

  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(fullTitle)}</title>`);
  html = replaceHeadTag(
    html,
    /<meta\s+name=["']description["'][^>]*content=["'][^"']*["'][^>]*\/?>/i,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
  );
  html = upsertLinkTag(html, "canonical", pageUrl);
  html = replaceHeadTag(
    html,
    /<meta\s+property=["']og:title["'][^>]*content=["'][^"']*["'][^>]*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`,
  );
  html = replaceHeadTag(
    html,
    /<meta\s+property=["']og:description["'][^>]*content=["'][^"']*["'][^>]*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
  );
  html = replaceHeadTag(
    html,
    /<meta\s+property=["']og:type["'][^>]*content=["'][^"']*["'][^>]*\/?>/i,
    `<meta property="og:type" content="${page.type}" />`,
    `<meta property="og:type" content="${page.type}" />`,
  );
  html = replaceHeadTag(
    html,
    /<meta\s+property=["']og:url["'][^>]*content=["'][^"']*["'][^>]*\/?>/i,
    `<meta property="og:url" content="${pageUrl}" />`,
    `<meta property="og:url" content="${pageUrl}" />`,
  );
  html = replaceHeadTag(
    html,
    /<meta\s+property=["']og:image["'][^>]*content=["'][^"']*["'][^>]*\/?>/i,
    `<meta property="og:image" content="${DEFAULT_OG_IMAGE}" />`,
    `<meta property="og:image" content="${DEFAULT_OG_IMAGE}" />`,
  );
  html = replaceHeadTag(
    html,
    /<meta\s+name=["']twitter:card["'][^>]*content=["'][^"']*["'][^>]*\/?>/i,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  );
  html = replaceHeadTag(
    html,
    /<meta\s+name=["']twitter:title["'][^>]*content=["'][^"']*["'][^>]*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`,
  );
  html = replaceHeadTag(
    html,
    /<meta\s+name=["']twitter:description["'][^>]*content=["'][^"']*["'][^>]*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
  );
  html = replaceHeadTag(
    html,
    /<meta\s+name=["']twitter:image["'][^>]*content=["'][^"']*["'][^>]*\/?>/i,
    `<meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`,
    `<meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`,
  );
  html = html.replace(/<meta\s+name=["']twitter:site["'][^>]*\/?>\s*/i, "");

  const robotsMeta = page.noindex
    ? `<meta name="robots" content="noindex, nofollow" />`
    : `<meta name="robots" content="index, follow" />`;
  html = replaceHeadTag(
    html,
    /<meta\s+name=["']robots["'][^>]*content=["'][^"']*["'][^>]*\/?>/i,
    robotsMeta,
    robotsMeta,
  );

  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi,
    "",
  );
  const structuredDataScripts = renderStructuredDataScripts(getStructuredData(page.path));
  if (structuredDataScripts) {
    html = html.replace("</head>", `${structuredDataScripts}\n</head>`);
  }

  html = html.replace(/<div id="root"><\/div>/i, `<div id="root">${bodyHtml}</div>`);

  return { html, page };
}

export function buildSitemapXml() {
  const urls = getIndexableSeoPages()
    .map((page) => {
      const loc = `${SITE_URL}${page.path === "/" ? "/" : page.path}`;
      const lastmod = page.lastModified ?? SEO_LAST_MODIFIED;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function buildRobotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}
