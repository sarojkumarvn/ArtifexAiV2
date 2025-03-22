import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./mainUi/LandingPage";
import { AiChatBotHome } from "./chatbotsec/AiChatBot/AiChatBotHome";
import { ImageGeneBotHome } from "./chatbotsec/ImageGeneChatBot/ImageGeneBotHome";
import { ImgToTextBotHome } from "./chatbotsec/ImgToTextBot/ImgToTextBotHome";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/text_generation" element={<div>Text Generation Page (Coming Soon)</div>} />
        <Route path="/image_generation" element={<div>Image Generation Page (Coming Soon)</div>} />
        <Route path="/image_analysis" element={<div>Image Analysis Page (Coming Soon)</div>} />
        <Route path="/aichatbot" element = {<AiChatBotHome />} />
        <Route path="/text-to-image" element = {<ImageGeneBotHome />} />
        <Route path = "/image-to-text" element = {<ImgToTextBotHome />} />
      </Routes>
    </Router>
  );
};

export default App;
