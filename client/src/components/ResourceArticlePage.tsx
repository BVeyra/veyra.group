import { Footer, Navbar } from "@/components/layout";
import { SeoHead } from "@/components/SeoHead";
import type { ResourceArticle } from "@/content/resources";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/lib/calendly";
import { ArrowRight, FileText } from "lucide-react";
import { Link } from "wouter";
import type { ReactNode } from "react";

type ResourceArticlePageProps = {
  article: ResourceArticle;
};

const INLINE_LINK_CLASS =
  "text-emerald-400 underline underline-offset-2 transition-colors hover:text-emerald-300";

// Parses inline links inside article copy. Supports both markdown `[text](/path)`
// and raw `<a href="...">text</a>`. Internal paths (starting with "/") render as
// wouter <Link> for client-side nav; external URLs render as standard anchors.
// Anything that isn't a link is returned as plain text.
const INLINE_LINK_RE =
  /\[([^\]]+)\]\(([^)]+)\)|<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;

function renderRichText(text: string): ReactNode {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  INLINE_LINK_RE.lastIndex = 0;

  while ((match = INLINE_LINK_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const label = match[1] ?? match[4] ?? "";
    const href = match[2] ?? match[3] ?? "";
    if (href.startsWith("/")) {
      nodes.push(
        <Link key={key++} href={href} className={INLINE_LINK_CLASS}>
          {label}
        </Link>,
      );
    } else {
      nodes.push(
        <a
          key={key++}
          href={href}
          className={INLINE_LINK_CLASS}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>,
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length ? nodes : text;
}

export function ResourceArticlePage({ article }: ResourceArticlePageProps) {
  const articleUrl = `https://veyragroup.ai${article.path}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      url: articleUrl,
      mainEntityOfPage: articleUrl,
      datePublished: "2026-03-31",
      dateModified: "2026-03-31",
      author: {
        "@type": "Organization",
        name: "Veyra Group",
      },
      publisher: {
        "@type": "Organization",
        name: "Veyra Group",
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

  return (
    <div className="min-h-screen text-white">
      <SeoHead
        title={article.title}
        description={article.description}
        type="article"
        canonicalPath={article.path}
        structuredData={structuredData}
      />
      <Navbar />

      <main className="pt-20">
        <section className="border-b border-white/5">
          <div className="max-w-5xl mx-auto px-6 py-14 md:py-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
              <FileText className="h-4 w-4" />
              Bottom-funnel guide for independent property managers
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-[-0.02em] md:text-6xl">
              {article.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-400">
              {article.description}
            </p>

            <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Direct Answer
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-100">{renderRichText(article.directAnswer)}</p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-emerald-500 px-8 py-4 font-semibold text-white hover:bg-emerald-400"
              >
                <a href={`/audit?source=${encodeURIComponent(article.path.replace(/^\//, ""))}`}>
                  Get Your Free Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/15 bg-white/[0.02] px-8 py-4 text-gray-100 hover:bg-white/[0.05]"
              >
                <a href={BOOKING_URL}>Book Your Audit Call</a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-10">
                <div className="space-y-5 text-gray-300">
                  {article.intro.map((paragraph) => (
                    <p key={paragraph} className="text-lg leading-relaxed">
                      {renderRichText(paragraph)}
                    </p>
                  ))}
                </div>

                {article.sections.map((section) => (
                  <section key={section.title} className="glass-card rounded-2xl p-7">
                    <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="leading-7 text-gray-400">
                          {renderRichText(paragraph)}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <aside className="space-y-6">
                <div className="glass-card rounded-2xl p-7">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
                    What To Keep In Mind
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-300">
                    {article.summaryBullets.map((bullet) => (
                      <li key={bullet} className="rounded-2xl border border-white/5 bg-black/20 px-4 py-3">
                        {renderRichText(bullet)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-7">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
                    Use Veyra's Audit First
                  </p>
                  <p className="mt-4 text-sm leading-6 text-gray-300">
                    The fastest path is not adding more software. It is mapping the workflow, quantifying the drag,
                    and showing which automation to build first.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="mt-5 w-full rounded-full bg-emerald-500 font-semibold text-white hover:bg-emerald-400"
                  >
                    <a href={`/audit?source=${encodeURIComponent(`${article.path}-sidebar`)}`}>
                      Get Your Free Audit
                    </a>
                  </Button>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-white">FAQ</h2>
            <div className="mt-8 space-y-4">
              {article.faqs.map((faq) => (
                <div key={faq.question} className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                  <p className="mt-3 leading-7 text-gray-400">{renderRichText(faq.answer)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 bg-gradient-to-t from-emerald-500/10 via-emerald-500/[0.06] to-transparent py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Want the numbers for your workflow instead of general advice?
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Run the PM Workflow Audit, get the report, then book a call if the first-build recommendation justifies it.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-emerald-500 px-8 py-4 font-semibold text-white hover:bg-emerald-400"
              >
                <a href={`/audit?source=${encodeURIComponent(`${article.path}-footer`)}`}>
                  Get Your Free Audit
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/15 bg-white/[0.02] px-8 py-4 text-gray-100 hover:bg-white/[0.05]"
              >
                <a href="/">Back to Home</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
