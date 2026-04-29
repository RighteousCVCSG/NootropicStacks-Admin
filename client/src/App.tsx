import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { captureUtmFromUrl } from "./lib/utm";
import Home from "./pages/Home";
import Library from "./pages/Library";
import SupplementDetail from "./pages/SupplementDetail";
import StackBuilder from "./pages/StackBuilder";
import MyStacks from "./pages/MyStacks";
import Guides from "./pages/Guides";
import GuideDetail from "./pages/GuideDetail";
import Admin from "./pages/Admin";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import StartHere from "./pages/StartHere";
import BestNootropics from "./pages/BestNootropics";
import BestStacks from "./pages/BestStacks";
import NootropicsForFocus from "./pages/NootropicsForFocus";
import NootropicsForAnxiety from "./pages/NootropicsForAnxiety";
import Reviews from "./pages/Reviews";
import FAQ from "./pages/FAQ";
import Glossary from "./pages/Glossary";
import ComparisonPage from "./pages/ComparisonPage";
import Videos from "./pages/Videos";
import ResearchLibrary from "./pages/ResearchLibrary";
import CelebrityStacks from "./pages/CelebrityStacks";
import Support from "./pages/Support";
import StarterGuide from "./pages/StarterGuide";
import Dashboard from "./pages/Dashboard";
import Nav from "./components/Nav";
import AffiliateDisclosure from "./components/AffiliateDisclosure";
import Footer from "./components/Footer";
import PixelBuddy from "./components/PixelBuddy";
import StackScoreWidget from "./components/StackScoreWidget";
import { QuickStackProvider } from "./contexts/QuickStackContext";

function Router() {
  useEffect(() => {
    captureUtmFromUrl();
  }, []);
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
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogArticle} />
        <Route path="/start-here" component={StartHere} />
        <Route path="/best-nootropics" component={BestNootropics} />
        <Route path="/best-stacks" component={BestStacks} />
        <Route path="/nootropics-for-focus" component={NootropicsForFocus} />
        <Route path="/nootropics-for-anxiety" component={NootropicsForAnxiety} />
        <Route path="/reviews" component={Reviews} />
        <Route path="/faq" component={FAQ} />
        <Route path="/glossary" component={Glossary} />
        <Route path="/compare-supplements" component={ComparisonPage} />
        <Route path="/videos" component={Videos} />
        <Route path="/research" component={ResearchLibrary} />
        <Route path="/celebrity-stacks" component={CelebrityStacks} />
        <Route path="/support" component={Support} />
        <Route path="/starter-guide" component={StarterGuide} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
      <AffiliateDisclosure />
      <Footer />
      <PixelBuddy />
      <StackScoreWidget />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster theme="dark" />
          <QuickStackProvider>
            <Router />
          </QuickStackProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
