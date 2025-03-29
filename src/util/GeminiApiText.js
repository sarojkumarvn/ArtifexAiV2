import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure the API key is correctly loaded from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const currentDate = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

// Function to get AI response
export const getAiResponse = async (userInput) => {
  try {
    const prompt = `You are a helpful AI chatbot. Please respond using Markdown formatting for better readability.
    
    Guidelines:
    1. Use **bold text** for emphasis or important points.
    2. Use proper markdown for code blocks with language specification:
       \`\`\`javascript
       // Example code
       const example = "This is formatted code";
       \`\`\`
    3. Use bullets or numbered lists where appropriate.
    4. If explaining code, provide code snippets with proper syntax highlighting.
    5. Keep explanations concise but thorough.
    6. Use headings (## or ###) to organize longer responses.
    7. For tables, use proper markdown table format.
    
    User: ${userInput}
    AI:`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "Sorry, something went wrong. Please try again.";
  }
};