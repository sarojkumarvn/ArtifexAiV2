import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./mainUi/LandingPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/text_generation" element={<div>Text Generation Page (Coming Soon)</div>} />
        <Route path="/image_generation" element={<div>Image Generation Page (Coming Soon)</div>} />
        <Route path="/image_analysis" element={<div>Image Analysis Page (Coming Soon)</div>} />
      </Routes>
    </Router>
  );
};

export default App;
