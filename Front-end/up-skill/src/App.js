import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/navbar";
import HomePage from "./components/HomePage";
import CoursesPage from "./components/CoursesPage";
import CertificationsPage from "./components/CertificationsPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import VerifyEmailPage from "./components/VerifyEmailPage";
import VerifyPhonePage from "./components/VerifyPhonePage";
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={<PageWrapper><HomePage /></PageWrapper>}
        />
        <Route
          path="/courses"
          element={<PageWrapper><CoursesPage /></PageWrapper>}
        />
        <Route
          path="/certifications"
          element={<PageWrapper><CertificationsPage /></PageWrapper>}
        />
        <Route
          path="/about"
          element={<PageWrapper><AboutPage /></PageWrapper>}
        />
        <Route
          path="/contact"
          element={<PageWrapper><ContactPage /></PageWrapper>}
        />
        <Route path="/login" 
        element={<PageWrapper><LoginPage /></PageWrapper>} />
        <Route path="/register" 
        element={<PageWrapper><RegisterPage /></PageWrapper>} />
        <Route path="/verify-email" element={<PageWrapper><VerifyEmailPage /></PageWrapper>} />
  <Route path="/verify-phone" element={<PageWrapper><VerifyPhonePage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

// Wrapper component to animate page transitions
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
