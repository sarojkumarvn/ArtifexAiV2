import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from "./mainUi/LandingPage";
import { AiChatBotHome } from "./chatbotsec/AiChatBot/AiChatBotHome";
import { ImageGeneBotHome } from "./chatbotsec/ImageGeneChatBot/ImageGeneBotHome";
import { ImgToTextBotHome } from "./chatbotsec/ImgToTextBot/ImgToTextBotHome";
import { AppLayout } from "./pages/AppLayout";
import PrivacyPolicy from "./pages/policy/PrivacyPolicy";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<AppLayout />}>
          <Route path="aichatbot" element={<AiChatBotHome />} />
          <Route path="texttoimage" element={<ImageGeneBotHome />} />
          <Route path="imagetotext" element={<ImgToTextBotHome />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
