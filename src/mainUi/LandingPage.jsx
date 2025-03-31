import Features from "../pages/Features";
import Pricing from "../pages/PricingSection";
import Footer from "../pages/Footer";
import { NavBar } from "../pages/NavBar";
import { Main } from "../pages/Main";
import HowItWorks from "../pages/WorkSteps";
import { useState } from "react";

const LandingPage = () => {
  const [isOpened, setisOpened] = useState(true);

  return (
    <>
      {isOpened ? (
        <>
          
          <div className="min-h-screen w-full flex justify-center items-center flex-col">
            <h2 className="text-2xl">This app is under developement</h2>
            <p>Please come back later</p>

          </div>
        </>
      ) : (
        <>
          <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-x-hidden w-full">
            <NavBar />
            <Main />
            <Features />
            <HowItWorks />
            <Pricing />
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default LandingPage;
