import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";

const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/home"));
const CalculatorPage = lazy(() => import("@/pages/CalculatorPage"));
const BookPage = lazy(() => import("@/pages/BookPage"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/book" component={BookPage} />
      <Route path="/calculator" component={CalculatorPage} />
      <Route component={NotFound} />
    </Switch>
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
