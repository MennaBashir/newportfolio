import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "./components/Navbar";
import GlobalBackground from "./components/GlobalBackground";
import Hero from "./components/Hero";
import InteractiveCursor from "./components/InteractiveCursor";
import { ContentProvider } from "./store/ContentStore";

const TechStack = lazy(() => import("./components/TechStack"));
const Projects = lazy(() => import("./components/Projects"));
const Experience = lazy(() => import("./components/Experience"));
const Achievements = lazy(() => import("./components/Achievements"));
const Contact = lazy(() => import("./components/Contact"));
const AdminPage = lazy(() => import("./admin/AdminPage"));

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

const pageTransition = { duration: 0.35, ease: "easeInOut" as const };

function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="min-h-screen pt-16"
    >
      {children}
    </motion.div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium tracking-[0.2em] uppercase text-sky-400/80 mb-4">
        404 — Lost in space
      </p>
      <h1
        className="font-bold tracking-tight text-transparent bg-clip-text mb-6"
        style={{
          fontSize: "clamp(3rem, 8vw, 6rem)",
          backgroundImage:
            "linear-gradient(135deg, #3b82f6 0%, #38bdf8 40%, #a78bfa 100%)",
        }}
      >
        Page Not Found
      </h1>
      <p className="text-slate-400 max-w-md mb-10">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300"
        style={{
          background:
            "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #7c3aed 100%)",
          boxShadow:
            "0 0 0 1px rgba(99,102,241,0.3), 0 0 30px 6px rgba(59,130,246,0.2)",
        }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back Home
      </Link>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 mt-12 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-center">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} Menna Bashir. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Page>
              <Hero />
            </Page>
          }
        />
        <Route
          path="/tech-stack"
          element={
            <Page>
              <TechStack />
            </Page>
          }
        />
        <Route
          path="/projects"
          element={
            <Page>
              <Projects />
            </Page>
          }
        />
        <Route
          path="/experience"
          element={
            <Page>
              <Experience />
            </Page>
          }
        />
        <Route
          path="/achievements"
          element={
            <Page>
              <Achievements />
            </Page>
          }
        />
        <Route
          path="/contact"
          element={
            <Page>
              <Contact />
            </Page>
          }
        />
        <Route
          path="/admin"
          element={
            <Page>
              <AdminPage />
            </Page>
          }
        />
        <Route
          path="*"
          element={
            <Page>
              <NotFound />
            </Page>
          }
        />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen text-white font-sans">
          <GlobalBackground />
          <Navbar />
          <main>
            <AnimatedRoutes />
          </main>
          <Footer />
          <InteractiveCursor />
        </div>
      </BrowserRouter>
    </ContentProvider>
  );
}
