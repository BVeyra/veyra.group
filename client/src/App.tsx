import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";

const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/home"));
const CalculatorPage = lazy(() => import("@/pages/CalculatorPage"));
const BookPage = lazy(() => import("@/pages/BookPage"));
const DemoPage = lazy(() => import("@/pages/DemoPage"));
const PrivacyPolicyPage = lazy(() => import("@/pages/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("@/pages/TermsOfServicePage"));

function CanonicalManager() {
  const [location] = useLocation();

  useEffect(() => {
    const canonicalHref = `https://veyragroup.ai${location === "/" ? "/" : location}`;
    let canonical = document.querySelector<HTMLLinkElement>("link[rel='canonical']");

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.href = canonicalHref;
  }, [location]);

  return null;
}

function ScrollManager() {
  const [location] = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <CanonicalManager />
      <ScrollManager />

      <Switch>
        <Route path="/demo" component={DemoPage} />
        <Route path="/book" component={BookPage} />
        <Route path="/calculator" component={CalculatorPage} />
        <Route path="/privacy-policy" component={PrivacyPolicyPage} />
        <Route path="/terms-of-service" component={TermsOfServicePage} />
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  );
}

export default App;
