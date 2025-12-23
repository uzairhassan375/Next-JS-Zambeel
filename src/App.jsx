import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppPopup from "./components/WhatsAppPopup";
import WhatsAppFloat from "./components/WhatsAppFloat";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TeamPage from "./pages/TeamPage";
import Zambeel360Page from "./pages/Zambeel360Page";
import Zambeel3PLPage from "./pages/Zambeel3PLPage";
import DropshippingPage from "./pages/DropshippingPage";
import LearnEcommercePage from "./pages/LearnEcommercePage";
import StakingCardsDemo from "./pages/StakingCardsDemo";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const shouldHavePadding = location.pathname === "/" || location.pathname === "/about" || location.pathname === "/team";
  
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <ScrollToTop />
      <WhatsAppPopup />
      <WhatsAppFloat />
      <Header theme={location.pathname === "/zambeel-360" || location.pathname === "/dropshipping" || location.pathname === "/zambeel-3pl" || location.pathname === "/learn-ecommerce" ? "light" : "dark"} />
      <main className={`flex-grow bg-transparent ${shouldHavePadding ? "pt-20" : ""}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/zambeel-360" element={<Zambeel360Page />} />
            <Route path="/zambeel-3pl" element={<Zambeel3PLPage />} />
            <Route path="/dropshipping" element={<DropshippingPage />} />
            <Route path="/learn-ecommerce" element={<LearnEcommercePage />} />
            <Route path="/staking-cards-demo" element={<StakingCardsDemo />} />
          </Routes>
        </main>
        <div className="w-full" style={{ backgroundColor: '#4F66C8' }}>
          <Footer />
        </div>
      </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
