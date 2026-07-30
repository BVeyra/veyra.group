import { Footer, Navbar } from "@/components/layout";
import { SeoHead } from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { resourceArticles, type ResourceArticle } from "@/content/resources";
import { ArrowRight } from "lucide-react";

// The 5 articles tied directly to what Veyra sells.
const automationGuidePaths = [
  "/property-management-automation-roi",
  "/automated-owner-reporting-for-property-managers",
  "/automate-maintenance-coordination-property-management",
  "/automate-tenant-communication-property-management",
  "/property-management-workflow-automation",
];

const byPath = (paths: string[]) =>
  paths
    .map((path) => resourceArticles.find((article) => article.path === path))
    .filter((article): article is ResourceArticle => Boolean(article));

const automationGuides = byPath(automationGuidePaths);
// Everything else: broader PM operating content. Order preserved from resources.ts.
const operatingResources = resourceArticles.filter(
  (article) => !automationGuidePaths.includes(article.path),
);

function GuideCard({ article }: { article: ResourceArticle }) {
  return (
    <a
      href={article.path}
      className="glass-card rounded-2xl p-7"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Guide</p>
      <h3 className="mt-4 text-2xl font-semibold text-white">{article.title}</h3>
      <p className="mt-4 text-gray-400 leading-relaxed">{article.description}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-emerald-300 font-medium">
        Read the guide
        <ArrowRight className="w-4 h-4" />
      </span>
    </a>
  );
}

export default function GuidesPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Property Management Operations Guides",
      description:
        "Operator guides for independent property managers: where workflows stall, what to examine first, and how to scope an improvement before changing software.",
      url: "https://veyragroup.ai/guides",
      hasPart: resourceArticles.map((article) => ({
        "@type": "Article",
        headline: article.title,
        description: article.description,
        url: `https://veyragroup.ai${article.path}`,
      })),
    },
  ];

  return (
    <div className="min-h-screen text-white">
      <SeoHead
        title="Property Management Operations Guides"
        description="Operator guides for independent property managers running 50-500 doors: where the hours leak, what to automate first, and how to scope it before buying any software."
        canonicalPath="/guides"
        structuredData={structuredData}
      />
      <Navbar />

      <main className="pt-20">
        <section className="border-b border-white/5">
          <div className="max-w-5xl mx-auto px-6 py-14 md:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Guides</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-[-0.02em] md:text-6xl">
              Guides for independent property managers
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-400">
              Practical, operator-level breakdowns for independent property managers. Learn where a workflow
              stalls, what to examine first, and how to scope an improvement before changing software.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="bg-emerald-500 text-white font-semibold rounded-full px-8 py-4 hover:shadow-lg hover:shadow-emerald-500/25 transition-all group"
              >
                <a href="/audit?source=guides_hero">
                  Take the Free PMS Operations Snapshot
                  <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Workflow guides</h2>
              <p className="text-gray-400 mt-2">
                Practical workflow guidance. Start here if you already know a workflow is the problem.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {automationGuides.map((article) => (
                <GuideCard key={article.path} article={article} />
              ))}
            </div>

            <div className="mt-16 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white">PM operating resources</h2>
              <p className="text-gray-400 mt-2">
                Broader operator playbooks and benchmarks for running a tighter property-management operation.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {operatingResources.map((article) => (
                <GuideCard key={article.path} article={article} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-gradient-to-t from-emerald-500/10 via-emerald-500/5 to-transparent">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Know the workflow that keeps stalling? Start with a preliminary view.</h2>
            <p className="text-gray-400 mt-4">
              The free Snapshot identifies a likely discussion area from your self-reported inputs. A Fit Call determines whether a paid Audit is warranted.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-7 bg-emerald-500 text-white font-semibold text-lg px-8 py-4 rounded-full hover:shadow-lg hover:shadow-emerald-500/25 transition-all group"
            >
              <a href="/audit?source=guides_footer">
                Take the Free PMS Operations Snapshot
                <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
