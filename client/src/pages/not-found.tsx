import { Link } from "wouter";
import { Logo } from "@/components/Logo";
import { ArrowLeft, Home } from "lucide-react";
import { SeoHead } from "@/components/SeoHead";

export default function NotFound() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden flex flex-col">
      <SeoHead
        title="Page Not Found"
        description="The page you requested does not exist. Return to the Veyra homepage or start the operations audit instead."
        canonicalPath="/not-found"
        robots="noindex, nofollow"
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-grid-overlay" />
        <div className="hero-noise-overlay" />
      </div>

      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center">
            <Logo className="text-[1.7rem]" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:border-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to site
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <div className="text-[120px] md:text-[160px] font-bold leading-none tracking-tighter bg-gradient-to-b from-white/20 to-white/5 bg-clip-text text-transparent select-none">
            404
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mt-2 mb-4">
            Page not found
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 text-white font-semibold px-6 py-3 text-sm hover:bg-emerald-400 transition-colors"
            >
              <Home className="w-4 h-4" />
              Go to Homepage
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 text-gray-200 hover:text-white px-6 py-3 text-sm font-medium hover:border-white/25 transition-colors"
            >
              Get the Free Operations Audit
            </Link>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-6 text-center">
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Veyra Group Inc.
        </p>
      </footer>
    </div>
  );
}
