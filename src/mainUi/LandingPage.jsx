import Features from "../pages/Features";
import Pricing from "../pages/PricingSection";
import Footer from "../pages/Footer";
import { NavBar } from "../pages/NavBar";
import { Main } from "../pages/Main";
import HowItWorks from "../pages/WorkSteps";

const LandingPage = () => {

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <NavBar />

      <Main />
      <Features />
      <HowItWorks />

      <Pricing />

      <Footer />
    </div>
  );
};

export default LandingPage;
