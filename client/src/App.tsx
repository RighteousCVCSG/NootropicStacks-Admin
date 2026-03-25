import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Library from "./pages/Library";
import SupplementDetail from "./pages/SupplementDetail";
import StackBuilder from "./pages/StackBuilder";
import MyStacks from "./pages/MyStacks";
import Guides from "./pages/Guides";
import GuideDetail from "./pages/GuideDetail";
import Admin from "./pages/Admin";
import Nav from "./components/Nav";
import AffiliateDisclosure from "./components/AffiliateDisclosure";

function Router() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/library" component={Library} />
        <Route path="/supplements/:slug" component={SupplementDetail} />
        <Route path="/builder" component={StackBuilder} />
        <Route path="/my-stacks" component={MyStacks} />
        <Route path="/guides" component={Guides} />
        <Route path="/guides/:slug" component={GuideDetail} />
        <Route path="/admin" component={Admin} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
      <AffiliateDisclosure />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster theme="dark" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
