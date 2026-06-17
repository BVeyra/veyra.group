import { lazy, Suspense, useEffect, useLayoutEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { Analytics } from "@vercel/analytics/react";

const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/home"));
const CalculatorPage = lazy(() => import("@/pages/CalculatorPage"));
const BookPage = lazy(() => import("@/pages/BookPage"));
const PropertyManagementAutomationROIPage = lazy(() => import("@/pages/PropertyManagementAutomationROIPage"));
const PropertyManagementAIPage = lazy(() => import("@/pages/PropertyManagementAIPage"));
const OwnerReportingAutomationPage = lazy(() => import("@/pages/OwnerReportingAutomationPage"));
const MaintenanceCoordinationAutomationPage = lazy(() => import("@/pages/MaintenanceCoordinationAutomationPage"));
const TenantCommunicationAutomationPage = lazy(() => import("@/pages/TenantCommunicationAutomationPage"));
const PrivacyPolicyPage = lazy(() => import("@/pages/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("@/pages/TermsOfServicePage"));
const HowManyPropertiesCanOneManagerHandlePage = lazy(() => import("@/pages/HowManyPropertiesCanOneManagerHandlePage"));
const PropertyManagementChallenges2026Page = lazy(() => import("@/pages/PropertyManagementChallenges2026Page"));
const HowToReduceTenantTurnoverPage = lazy(() => import("@/pages/HowToReduceTenantTurnoverPage"));
const ScalePropertyManagementBusinessPage = lazy(() => import("@/pages/ScalePropertyManagementBusinessPage"));
const MaintenanceResponseTimeBenchmarkPage = lazy(() => import("@/pages/MaintenanceResponseTimeBenchmarkPage"));
const PropertyManagementKpisPage = lazy(() => import("@/pages/PropertyManagementKpisPage"));
const AppfolioVsBuildiumSmallPmPage = lazy(() => import("@/pages/AppfolioVsBuildiumSmallPmPage"));
const OwnerCommunicationBestPracticesPage = lazy(() => import("@/pages/OwnerCommunicationBestPracticesPage"));
const PropertyManagementWorkflowAutomationPage = lazy(() => import("@/pages/PropertyManagementWorkflowAutomationPage"));
const HandleMaintenanceEmergenciesPage = lazy(() => import("@/pages/HandleMaintenanceEmergenciesPage"));
const ReducePropertyManagementOverheadPage = lazy(() => import("@/pages/ReducePropertyManagementOverheadPage"));
const GuidesPage = lazy(() => import("@/pages/GuidesPage"));
const PricingPage = lazy(() => import("@/pages/PricingPage"));

function RedirectPage({ to }: { to: string }) {
  const [, navigate] = useLocation();

  useEffect(() => {
    const search = window.location.search;
    navigate(`${to}${search}`, { replace: true });
  }, [navigate, to]);

  return null;
}

function ScrollManager() {
  const [location] = useLocation();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}`
      );
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollManager />

      <Switch>
        <Route path="/demo">
          {() => <RedirectPage to="/audit" />}
        </Route>
        <Route path="/book" component={BookPage} />
        <Route path="/audit" component={CalculatorPage} />
        <Route path="/calculator">
          {() => <RedirectPage to="/audit" />}
        </Route>
        <Route path="/property-management-automation-roi" component={PropertyManagementAutomationROIPage} />
        <Route path="/property-management-ai" component={PropertyManagementAIPage} />
        <Route
          path="/automated-owner-reporting-for-property-managers"
          component={OwnerReportingAutomationPage}
        />
        <Route
          path="/automate-maintenance-coordination-property-management"
          component={MaintenanceCoordinationAutomationPage}
        />
        <Route
          path="/automate-tenant-communication-property-management"
          component={TenantCommunicationAutomationPage}
        />
        <Route
          path="/how-many-properties-can-one-manager-handle"
          component={HowManyPropertiesCanOneManagerHandlePage}
        />
        <Route
          path="/property-management-challenges-2026"
          component={PropertyManagementChallenges2026Page}
        />
        <Route
          path="/how-to-reduce-tenant-turnover"
          component={HowToReduceTenantTurnoverPage}
        />
        <Route
          path="/scale-property-management-business"
          component={ScalePropertyManagementBusinessPage}
        />
        <Route
          path="/maintenance-response-time-benchmark"
          component={MaintenanceResponseTimeBenchmarkPage}
        />
        <Route
          path="/property-management-kpis"
          component={PropertyManagementKpisPage}
        />
        <Route
          path="/appfolio-vs-buildium-small-pm"
          component={AppfolioVsBuildiumSmallPmPage}
        />
        <Route
          path="/owner-communication-best-practices"
          component={OwnerCommunicationBestPracticesPage}
        />
        <Route
          path="/property-management-workflow-automation"
          component={PropertyManagementWorkflowAutomationPage}
        />
        <Route
          path="/handle-maintenance-emergencies"
          component={HandleMaintenanceEmergenciesPage}
        />
        <Route
          path="/reduce-property-management-overhead"
          component={ReducePropertyManagementOverheadPage}
        />
        <Route path="/guides" component={GuidesPage} />
        <Route path="/pricing" component={PricingPage} />
        <Route path="/privacy" component={PrivacyPolicyPage} />
        <Route path="/privacy-policy">
          {() => <RedirectPage to="/privacy" />}
        </Route>
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
      <Analytics />
    </Suspense>
  );
}

export default App;
