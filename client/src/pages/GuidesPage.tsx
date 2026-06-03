import { Footer, Navbar } from "@/components/layout";
import { SeoHead } from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { resourceArticles } from "@/content/resources";
import { ArrowRight } from "lucide-react";

export default function GuidesPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Property Management Automation Guides",
      description:
        "Operator guides for independent property managers running 50–500 doors: where the hours leak, what to automate first, and how to scope it.",
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
    <div className="min-h-screen bg-[#050505] text-white">
      <SeoHead
        title="Property Management Automation Guides"
        description="Operator guides for independent property managers running 50–500 doors — where the hours leak, what to automate first, and how to scope it before buying any software."
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
              Practical, operator-level breakdowns for firms running 50–500 doors — where the hours leak, what to
              automate first, and how to scope it before you buy any software.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="bg-emerald-500 text-black font-semibold rounded-full px-8 py-4 hover:shadow-lg hover:shadow-emerald-500/25 transition-all group"
              >
                <a href="/audit?source=guides_hero">
                  Get Your Free Audit
                  <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid gap-6 md:grid-cols-2">
              {resourceArticles.map((article) => (
                <a
                  key={article.path}
                  href={article.path}
                  className="rounded-3xl border border-white/6 bg-white/[0.02] p-7 hover:border-emerald-500/25 hover:bg-white/[0.04] transition-colors"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Guide</p>
                  <h2 className="mt-4 text-2xl font-semibold text-white">{article.title}</h2>
                  <p className="mt-4 text-gray-400 leading-relaxed">{article.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-emerald-300 font-medium">
                    Read the guide
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-gradient-to-t from-emerald-500/10 via-emerald-500/5 to-transparent">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Know the workflow that's costing you? Let's map it.</h2>
            <p className="text-gray-400 mt-4">
              Run the free PM Workflow Audit and see which workflow Veyra should fix first — no pitch, no software talk.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-7 bg-emerald-500 text-black font-semibold text-lg px-8 py-4 rounded-full hover:shadow-lg hover:shadow-emerald-500/25 transition-all group"
            >
              <a href="/audit?source=guides_footer">
                Get Your Free Audit
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
