import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import GlobalBackground from "./components/GlobalBackground";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import InteractiveCursor from "./components/InteractiveCursor";
import AdminPage from "./admin/AdminPage";
import { ContentProvider } from "./store/ContentStore";

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

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
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
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <div className="min-h-screen text-white font-sans">
          <GlobalBackground />
          <Navbar />
          <main>
            <AnimatedRoutes />
          </main>
          <InteractiveCursor />
        </div>
      </BrowserRouter>
    </ContentProvider>
  );
}
